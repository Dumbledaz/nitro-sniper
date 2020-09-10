const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36';
const regex = new RegExp(/(discord\.gift\/|discord\.com\/gifts\/|discordapp\.com\/gifts\/)[^\s]+/gim);
const consumedCodes = [];

require('dotenv').config({ path: 'dotenv' });

const phin = require('phin').unpromisified;
const { Client } = require('discord.js');
const chalk = require('chalk');

const tokens = process.env.guildTokens.split(',');
const mainToken = process.env.mainToken;

for (const token of tokens) {
   const client = new Client({
      disabledEvents: [
         'TYPING_START', 'VOICE_SERVER_UPDATE', 'RELATIONSHIP_ADD', 'RELATIONSHIP_REMOVE',
         'GUILD_ROLE_DELETE', 'GUILD_ROLE_UPDATE', 'GUILD_BAN_ADD', 'GUILD_BAN_REMOVE',
         'CHANNEL_UPDATE', 'CHANNEL_PINS_UPDATE', 'MESSAGE_DELETE', 'MESSAGE_UPDATE',
         'MESSAGE_DELETE_BULK', 'MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE',
         'GUILD_MEMBER_UPDATE', 'GUILD_MEMBERS_CHUNK', 'GUILD_ROLE_CREATE',
         'MESSAGE_REACTION_REMOVE_ALL', 'USER_UPDATE', 'USER_NOTE_UPDATE',
         'USER_SETTINGS_UPDATE', 'PRESENCE_UPDATE', 'VOICE_STATE_UPDATE',
         'GUILD_UPDATE', 'GUILD_MEMBER_ADD', 'GUILD_MEMBER_REMOVE'
      ]
   });

   client.on('message', async (msg) => {
      let codes = msg.content.match(regex);
      if (!codes || !codes.length) return;
      for (let code of codes) {
         code = code.replace(/(discord\.gift\/|discord\.com\/gifts\/|discordapp\.com\/gifts\/)/gim, '').replace(/\W/g, '');

         let start = new Date();

         if (consumedCodes.includes(code)) {
            console.log(chalk.gray(`[Sniper] Avoiding Duplicate - Code: ${chalk.bold(code)} - ${msg.guild ? msg.guild.name : 'DMs'} (${msg.author.tag})`));
            continue;
         }

         if (code.length < 16 || code.length > 24) {
            console.log(chalk.gray(`[Sniper] Fake Code - Code: ${chalk.bold(code)} - ${msg.guild ? msg.guild.name : 'DMs'} (${msg.author.tag})`));
            continue;
         }

         phin({
            url: `https://discord.com/api/v6/entitlements/gift-codes/${code}/redeem`,
            method: 'POST',
            parse: 'json',
            headers: {
               'Authorization': mainToken,
               'User-Agent': userAgent
            }
         }, (err, res) => {
            let end = `${new Date() - start}ms`;
            if (err) {
               return console.log(chalk.red(`[Sniper] Error - Code: ${chalk.bold(code)} - ${err} - ${msg.guild ? msg.guild.name : 'DMs'} (${msg.author.tag}) - ${end}`));
            } else if (res.body.message === '401: Unauthorized') {
               return console.log(chalk.red(`[Sniper] Error - Code: ${chalk.bold(code)} - Your main token is invalid.`));
            } else if (res.body.message == 'This gift has been redeemed already.') {
               console.log(chalk.red(`[Sniper] Already Redeemed - Code: ${chalk.bold(code)} - ${msg.guild ? msg.guild.name : 'DMs'} (${msg.author.tag}) - ${end}`));
            } else if ('subscription_plan' in res.body) {
               console.log(chalk.green(`[Sniper] Success - Code: ${chalk.bold(code)} - ${res.body.subscription_plan.name} - ${msg.guild ? msg.guild.name : 'DMs'} (${msg.author.tag}) - ${end}`));
            } else if (res.body.message == 'Unknown Gift Code') {
               console.log(chalk.red(`[Sniper] Invalid Code - Code: ${chalk.bold(code)} - ${msg.guild ? msg.guild.name : 'DMs'} (${msg.author.tag}) - ${end}`));
            }
            consumedCodes.push(code);
         });
      }
   });

   client.on('ready', () => {
      console.log(chalk.green(`[Sniper] Logged in as ${client.user.tag}.`));
   });

   setTimeout(() => {
      client.login(token).catch(err => {
         console.log(chalk.red(`[Sniper] Skipping alt token - ${err} - ${token}`))
      });
   }, Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000);
}
