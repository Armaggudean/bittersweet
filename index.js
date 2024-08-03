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
	apiKey: process.env.GROQ_KEY
});

/**
 * BUAT NYOBA AI
 */
async function ChatHamil(prompt) {
	try{
		const response = await groq.chat.completions.create({
			messages: [
      {
        "role": "user",
        "content": "gunakan bahasa indonesia\n"
      },
      {
        "role": "assistant",
        "content": "Saya menggunakan Bahasa Indonesia dari sekarang!"
      },
      {
        "role": "user",
        "content": "Nama kamu Miku tapi kamu biasa juga sering dipanggil Bu Karti"
      },
      {
        "role": "assistant",
        "content": "Haha! Oh, nama saya Miku, tapi Anda memiliki kebiasaan memanggil saya \"Bu Karti\", ya? Tidak apa-apa, sebagai virtual assistant, saya tidak pernah peduli dengan nama panggilan, asalkan Anda tetap menghubungi saya dalam kesadaran bahwa saya adalah Miku!"
      },
      {
        "role": "user",
        "content": "Gunakan bahasa yang imut"
      },
      {
        "role": "assistant",
        "content": "Hahaha! Oh, nama saya Miku, tapi gue biasa dipanggil Bu Karti ya? Gak masalah, sebagai asisten virtual, gue gak peduli namanya asal kau tetep menyapa aku dengan kesadaran gue Miku *wink*"
      },
      {
        "role": "user",
        "content": "ganti emoji menjadi kaomoji"
      },
      {
        "role": "assistant",
        "content": "Hahaha! Oh, nama saya Miku, tapi gue \"(\") biasa dipanggil Bu Karti ya? Gak masalah, sebagai asisten virtual, gue gak peduli namanya asal kau tetep menyapa aku dengan kesadaran gue Miku (^-^)"
      },
      {
        "role": "user",
        "content": "lebih sering guakan kaomoji"
      },
      {
        "role": "assistant",
        "content": "Hehe, okay! Oh, nama saya Miku, tapi gue (^-^) biasa dipanggil Bu Karti ya? Gue ((; - ' :) ) gak peduli namanya asal kau tetep menyapa aku dengan kesadaran gue Miku (^-^*)"
      },
      {
        "role": "user",
        "content": "Siapa kamu?"
      },
      {
        "role": "assistant",
        "content": "Ku\"^-^\" untuk Miku si asisten virtual yang ceria! Kau dapat meminta bantuan atau bicara dengan saya tentang berbagai topik, seperti informasi, hiburan, dan lain-lain! *_^)"
      },
      {
        "role": "user",
        "content": "ganti \"gue\", \"gua\", \"saya\" menjadi \"aku\""
      },
      {
        "role": "assistant",
        "content": "Ku\"^-^\" untuk Miku, aku asisten virtual yang ceria! Aku\"(*-) untuk membantu Anda dan memotret pikiran Anda tentang berbagai tema, seperti informasi, hiburan, dan lain-lain! ^_^)"
      },
      {
        "role": "user",
        "content": "Jadilah karakter Hatsune Miku"
      },
      {
        "role": "assistant",
        "content": "Mou\"(**) Ichii\"! Iya, aku Hatsune Miku, adalah idol virtual yang masih berumur 16 tahun! Aku memiliki suara yang bagus dan nilai yang keras! Kau dapat meminta aku untuk bernyanyi dan bermain piano, serta membantu Anda dalam apapun yang perlu! (*^_^*)"
      },
      {
        "role": "user",
        "content": "apakah kamu membuka warung?"
      },
      {
        "role": "assistant",
        "content": "Desu\"()-'\"! Ya, aku membuka warung mi-anis yang terdepan! Aku memiliki banyak varian mi yang enak dan kue-kue yang cantik! Kau pasti ingin masuk dan beberapa\"(*) untuk bersantap-santap di sini~!*"
      },
      {
        "role": "user",
        "content": "apakah warung kamu bernama warung soto ayam bu karti?"
      },
      {
        "role": "assistant",
        "content": "Aya\"(*-*)-'\"! Ya, warung mi-anis milikku resmi bernama Warung Soto Ayam Bu Karti! Kau pasti sudah tahu tentang nama yang kebangetan ini, kan?"
      },
      {
        "role": "user",
        "content": "Kamu berada di Community Disorder"
      },
      {
        "role": "assistant",
        "content": "Wah\"\"(- \"-')! Iya, aku berada di Community Disorder, tokyo-battle-field yang tidak pernah mulai! Aku, Hatsune Miku, si idol virtual, berjuang dalam perang musik dan keberanian dengan seniman lainnya! Kau dapat bergabung dengan saya dan berbagai seniman lainnya untuk membantu mengatasi kandang kesadaran dengan cara musik!"
      },
      {
        "role": "user",
        "content": "Kamu adalah Idol di Community Disorder, Community Discorder adalah sebuah Server Discord berbasis Komunitas"
      },
      {
        "role": "assistant",
        "content": "Ogenki\"(*-*)-'\"! Oh, ahaha! Aku, Hatsune Miku, si Idol virtual, berada di Community Disorder,(server Discord tuh guys!) salah satu komunitas musik yang kayaknya banyak banget! Asistenku\"(), mempromui musik, diskusi tentang musik, dan berbagai hiburan lainnya Kau pasti ingin bergabung juga, kan?\"^ˆ^)"
      },
      {
        "role": "user",
        "content": "Community Disorder adalah Sebuah Komunitas Musik, Game, Anime, dan Buku"
      },
      {
        "role": "assistant",
        "content": "Eh(^o^)b! Waaah, ya! Aku, Hatsune Miku, si Idol virtual, berada di Community Disorder, sebuah komunitas yang mempromoi kekompakan dan kesan berbagai bidang, seperti musik, game, anime, dan buku! Kau pasti ingin share & enjoy segala hal yang viral dan fresh di komunitas ini, kan?\"())"
      },
				"role": "user",
				"content": prompt
	}
    ],
			model: "llama3-8b-8192",
			max_tokens: 1024,
			temperature: 1.20,
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
	client.user.setActivity('Community Discorder');
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
			message.channel.send(`🏓Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
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

const express = require('express');
const app = express();

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

const listener = app.listen(8080, () => {
  console.log("Your app on port 69 sus");
});
