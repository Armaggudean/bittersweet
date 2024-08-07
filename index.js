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
const axios = require("axios");
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
const userSessions = {};

client.on(Events.MessageCreate, async message => {
	if(message.author.bot) return;
	if(message.channel.id !== '1268534290703061034') return;

	const userId = message.author.id;

	if (!userSessions[userId]) {
        userSessions[userId] = {
            messages: [],
			sesId: ""
        };
    }

	userSessions[userId].messages.push(message.content);

	const prompt = message.content;

	try {
		message.channel.sendTyping();
		let resp = await axios.get(`https://skizo.tech/api/cai/chat?apikey=${process.env.skizo}&characterId=${process.env.charId}&text=${prompt}&sessionId=${userSessions[userId].sesId}&token=${process.env.charToken}`);
		const { data } = resp;
		const get = data.result;
		const reply = get.text;
		userSessions[userId].sesId = get.sessionId;
		message.reply(reply)
	} catch (e) { console.log(e) }
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

		case 'ig' :
			const iguser = args[0];
			const igresp = await axios.get(`https://skizo.tech/api/igstalk?apikey=confutatis3000&user=${iguser}`);
			const userdata = igresp.data
			if(userdata.username === "") return message.reply('usernya gada/private account');

			const canvas = createCanvas(800, 450);
	        	const ctx = canvas.getContext('2d');

			ctx.fillStyle = '#fff';
        		ctx.fillRect(0, 0, canvas.width, canvas.height);

			try {
				const image = await loadImage(userdata.photo_profile);
				ctx.save();
				ctx.beginPath();
				ctx.arc(150, 150, 75, 0, Math.PI * 2, true);
				ctx.closePath();
				ctx.clip();
				ctx.drawImage(image, 75, 75, 150, 150);
				ctx.restore();
			} catch (err) {
				console.error('Failed to load image:', err);
			}

			ctx.fillStyle = '#333';
        		ctx.font = 'bold 32px Arial';
        		ctx.textAlign = 'center';
        		ctx.fillText(userdata.username, 150, 250);

			ctx.font = '24px Arial';
			ctx.fillStyle = '#333';
			ctx.textAlign = 'center';
			ctx.fillText(userdata.posts, 350, 150);
			ctx.fillText(userdata.followers, 550, 150);
			ctx.fillText(userdata.following, 720, 150);
			ctx.font = 'bold 24px Arial';
			ctx.fillStyle = '#333';
			ctx.textAlign = 'center';
			ctx.fillText('Posts', 350, 200);
			ctx.fillText('Followers', 550, 200);
			ctx.fillText('Following', 720, 200);
			ctx.font = 'bold 18px Arial';
			ctx.fillStyle = '#333';
			ctx.textAlign = 'left';
			ctx.fillText('Bio:', 50, 300);
			ctx.font = '18px Arial';
			ctx.fillStyle = '#666';
			ctx.textAlign = 'left';
			ctx.fillText(userdata.bio, 55, 325)

			const buffer = canvas.toBuffer('image/png')

			message.channel.send({ files: [{ attachment: buffer, name: 'profile-canvas.png' }] })
          		  .then(() => {
            		    console.log('Profile canvas sent!');
           		 })
           		 .catch(console.error);

			break;

		case "tiktok" :
			const ttURL = args[0];
			const ttValid = /^https?:\/\/(www\.)?(tiktok\.com|vt\.tiktok\.com)\/(?:@[\w\.]+\/video\/\d+|[\w\.]+\/video\/\d+|video\/\d+|[\w\.]+|@[\w\.]+|[A-Za-z0-9]+)(\/)?(\?.*)?$/;

			if(ttValid.test(ttURL) === true) {
				const res = await axios.get(`https://skizo.tech/api/tiktok?apikey=confutatis3000&url=${ttURL}`);
				message.reply({
					files: [{
						attachment: res.data.data.play,
						name: 'donglot.mp4',
					}]
				});
			} else if(ttValid.test(ttURL) === false) {
				message.reply('yg bener url nya pepej');
			}
			break;

		case 'instagram' :
			const instaURL = args[0];
			const instaValid = /^https?:\/\/(?:www\.)?instagram\.com\/(?:p\/[\w-]+|reel\/[\w-]+)(?:\/\?.*)?$/;

			if(instaValid.test(instaURL) === true) {
				const res = await axios.get(`https://skizo.tech/api/instagram?apikey=confutatis3000&url=${instaURL}`);
				for(let i = 0; i < res.data.length; i++) {
					message.reply({
						files: [{
							attachment: res.data[i].url,
							name: 'donglot.mp4'
						}]
					});
				}
			} else if (instaValid.test(instaURL) === false) {
				message.reply('yg bener url nya pepej')
			}
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
