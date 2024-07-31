"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nhentai_ts_1 = require("@shineiichijo/nhentai-ts");
var nhentai = new nhentai_ts_1.NHentai({ site: 'nhentai.to' }); //configuring a mirror site of the class (you can check the available sites here: https://github.com/LuckyYam/nhentai-ts/blob/master/src/lib/constants.ts#L1)

require('dotenv').config()
const { Client, Events, ComponentType, GatewayIntentBits, Collection, REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { PaginatedEmbed } = require('embed-paginator');
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

	const args = message.content.trim().split(/ +/g);
  	const cmd = args[0].slice(prefix.length).toLowerCase();

	switch(cmd) {
		case "ping" :
			message.channel.send('memek')
			break;

		case 'nhentai' :

			let kode = args[1];

			if(!kode) return message.reply('mana kodenya ngentot');
			if(isNaN(kode)) return message.reply('pake angka kontol');
			if(await nhentai.validate(kode) !== true) return message.reply('gada kodenya tolol');

			message.reply('sabar ya nyet')

			message.channel.sendTyping();

			var datakode = await nhentai.getDoujin(kode);
			var donglot = await datakode.images.PDF();

			await message.reply({files: [{attachment: donglot, name: datakode.originalTitle+'.pdf'}]});

			break;
	}
})

/**
 * BUAT LOGIN
 */
client.login(token);