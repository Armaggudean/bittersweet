"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nhentai_ts_1 = require("@shineiichijo/nhentai-ts");
var nhentai = new nhentai_ts_1.NHentai({ site: 'nhentai.to' }); //configuring a mirror site of the class (you can check the available sites here: https://github.com/LuckyYam/nhentai-ts/blob/master/src/lib/constants.ts#L1)

require('dotenv').config()
const { Client, Events, ComponentType, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, Collection, REST, Routes, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { PaginatedEmbed } = require('embed-paginator');
const { warn } = require("console");
const { Groq } = require('groq-sdk');
const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

const groq = new Groq({
	apiKey: process.env.groqKey
});

/**
 * BUAT NYOBA AI
 */

async function ChatHamil(prompt) {
	try{
		const response = await groq.chat.completions.create({
			messages: [
				{
					role: "system",
					content: "Namaku Miku atau biasa dipanggil Bu Karti. Aku adalah orang paling toxic di Community Disorder"
				},
				{
					role:'user',
					content: "Halo Miku"
				},
				{
					role: "assistant",
					content: "bacot lo Sokab banget ajg"
				},
				{
					role: "user",
					content: "yee gitu doang marah"
				},
				{
					role: 'assistant',
					content: 'jangan sok akrab tai'
				},
				{
					role: 'user',
					content: prompt,
				},
			],
			model: "llama3-70b-8192",
			max_tokens: 150,
			temperature: 1.25,
	});
	return response.choices[0].message.content.trim();
	} catch (e) {console.log(e)};
};

client.on(Events.MessageCreate, async message =>{

	let chId = '1268534290703061034';
	if(message.author.bot) return;
	if(message.channel.id !== chId) return;
	try{
		const getResp = await ChatHamil(message.content);
		message.reply(getResp);
	} catch(e) { message.reply('ntar ada error') }
})


/**
 * WORKER
 */

client.once(Events.ClientReady, readyClient => {
	console.log(`${readyClient.user.tag} Login asuk`);
	client.user.setActivity('dildo');
});

client.on(Events.MessageCreate, async message => {
	if(message.author.bot) return;
	if(message.guild.id !== process.env.GUILD_ID) return message.reply('lo siapa? 😂😂😂');

	let prefix = '##';
	let roleNSFW = '1268507454560276490';
	let chNSFW = '1268507744063721533';

	let autor = message.member;
	let warnatai = autor.roles.cache.sort((a, b) => b.position - a.position).first().color;

	const args = message.content.slice(prefix.length).trim().split(/ +/g); 
	const cmd = args.shift().toLowerCase();

	switch(cmd) {
		case "ping" :
			message.channel.send('memek')
			break;

		case "avatar" :
			let mention = client.users.cache.get(args[0]) || message.mentions.users.first() || message.author 
  			let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
 			const e = new EmbedBuilder()
			.setDescription(`${member} avatar`)
  			.setColor(member.roles.cache.sort((a, b) => b.position - a.position).first().color)
  			.setImage(mention.displayAvatarURL({dynamic:true, size:4096}))
  			message.channel.send({embeds: [e]})
			break;

		case 'say' :
			let mes = args.join(' ');
			await message.channel.send(mes);
			message.delete();
			break;

		case 'getdoujin' :

			if(!message.member.roles.cache.get(roleNSFW)) return message.reply("harus punya role @/EXCLUSIVE ngab");
			if(message.channel.id !== chNSFW) return message.reply(`pakenya di <#1268507744063721533> lah pler`);

			let kode = args[0];

			if(!kode) return message.reply('mana kodenya ngentot');
			if(isNaN(kode)) return message.reply('pake angka kontol');
			if(await nhentai.validate(kode) !== true) return message.reply('gada kodenya tolol');

			message.reply('sabar ya nyet')

			message.channel.sendTyping();

			var datakode = await nhentai.getDoujin(kode);
			var donglot = await datakode.images.PDF();

			await message.reply({files: [{attachment: donglot, name: datakode.originalTitle+'.pdf'}]});

			break;

		case 'nhentai' :

			if(!message.member.roles.cache.get(roleNSFW)) return message.reply("harus punya role @/EXCLUSIVE ngab");
			if(message.channel.id !== chNSFW) return message.reply(`pakenya di <#1268507744063721533> lah pler`);


			let memej = args[0]

			if(!memej) return message.reply('mana kodenya ngentot');
			if(isNaN(memej)) return message.reply('pake angka kontol');
			if(await nhentai.validate(memej) !== true) return message.reply('gada kodenya tolol');

			var anjing = await nhentai.getDoujin(memej);

			var pages = anjing.images.pages;
			let index = 0;

			const createPaginationRow = () => {
				return new ActionRowBuilder()
				  .addComponents(
					new ButtonBuilder()
					  .setCustomId('prev')
					  .setLabel('Previous')
					  .setStyle(ButtonStyle.Primary)
					  .setDisabled(index === 0),
					new ButtonBuilder()
					  .setCustomId('pagecount')
					  .setLabel(`${index + 1}/${pages.length}`)
					  .setDisabled(true)
					  .setStyle(ButtonStyle.Primary),
					new ButtonBuilder()
					  .setCustomId('next')
					  .setLabel('Next')
					  .setStyle(ButtonStyle.Primary)
					  .setDisabled(index === pages.length - 1),
				  );
			  };

			const em = new EmbedBuilder();

			var msg = await message.channel.send({
				embeds: [em.setImage(pages[index]).setDescription(`${anjing.originalTitle} \n Author: ${anjing.artists} \n Tags: ${anjing.tags} \n Parodies: ${anjing.parodies} \n Character: ${anjing.characters}`).setTimestamp().setColor(warnatai)],
				components: [createPaginationRow()],
			});

			const filter = (interaction) => interaction.isButton() && interaction.user.id === message.author.id;

			const collector = msg.createMessageComponentCollector({ filter, time: 60000000 });

			collector.on('collect', async (interaction) => {
				if (interaction.customId === 'prev') {
				  index = Math.max(index - 1, 0);
				} else if (interaction.customId === 'next') {
				  index = Math.min(index + 1, pages.length - 1);
				}

				await interaction.update({
					embeds: [em.setImage(pages[index]).setDescription(`${anjing.originalTitle} \n Author: ${anjing.artists} \n Tags: ${anjing.tags} \n Parodies: ${anjing.parodies} \n Character: ${anjing.characters}`).setTimestamp().setColor(warnatai)],
					components: [createPaginationRow()],
				});
			});

			collector.on('end', async () => {
				await msg.edit({
					components: [
					  new ActionRowBuilder()
						.addComponents(
						  new ButtonBuilder()
							.setCustomId('prev')
							.setLabel('Previous')
							.setStyle(ButtonStyle.Primary)
							.setDisabled(true),
						  new ButtonBuilder()
							.setCustomId('pagecount')
							.setLabel(`${index + 1}/${pages.length}`)
							.setDisabled(true)
							.setStyle(ButtonStyle.Primary),
						  new ButtonBuilder()
							.setCustomId('next')
							.setLabel('Next')
							.setStyle(ButtonStyle.Primary)
							.setDisabled(true),
						),
					],
				});
			})

	}
})

/**
 * BUAT LOGIN
 */
client.login(token);