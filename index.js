"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nhentai_ts_1 = require("@shineiichijo/nhentai-ts");
var nhentai = new nhentai_ts_1.NHentai({ site: 'nhentai.to' }); //configuring a mirror site of the class (you can check the available sites here: https://github.com/LuckyYam/nhentai-ts/blob/master/src/lib/constants.ts#L1)

require('dotenv').config()
const { Client, Events, ComponentType, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, Collection, REST, Routes, EmbedBuilder } = require('discord.js');
const axios = require("axios");
const { createCanvas, loadImage } = require('canvas');
const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;
const util = require('./utils');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

/**
 * BUAT NYOBA AI
 */

client.on(Events.MessageCreate, async message => {
	if(message.author.bot) return;
	if(message.channel.id !== '1090823940148035694') return;

	util.characterAI(message);
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

	let prefix = '##';
	const autor = message.member;
    const warnatai = autor.roles.cache.sort((a, b) => b.position - a.position).first().color;

	const args = message.content.slice(prefix.length).trim().split(/ +/g); 
	const cmd = args.shift().toLowerCase();

	switch(cmd) {
		case "ping" :

			util.clientping(client, message);

			break;

		case 'ig' :
			
			util.igStalk(message, args);

			break;

		case "tiktok" :

			util.ttdl(message, args);

			break;

		case 'instagram' :
			
			util.instadl(message, args);

			break;

		case "avatar" :
			
			util.displayavatar(client, message, warnatai, args);

			break;

		case 'say' :

			util.botsay(message, args);
			
			break;

		case 'getdoujin' :

			util.doujindl(message, args);

			break;

		case 'nhentai' :

			util.getdoujin(message, args, warnatai);

			break;

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
