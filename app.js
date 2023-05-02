import linebot from 'linebot';
import * as dotenv from 'dotenv';
import './config/firebase.js';

import login from './apis/login.js';
import parser from './helpers/parser.js';
import { getData, setData, updateBookData } from './apis/database.js';
dotenv.config();

login(process.env.FIREBASE_EMAIL, process.env.FIREBASE_PASSWORD);

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
});

bot.on('message', async function (event) {
  if (event.message.type !== 'text') return;
  console.log(event);
  const numbers = event.message.text;
  const userId = event.source.userId;
  const urls = parser(numbers);

  const userData = await getData(userId);
  if (!userData) {
    await setData(userId, { books: urls });
  } else {
    await updateBookData(userId, urls);
  }

  event.reply(urls);
});

bot.listen('/linewebhook', process.env.PORT || 3000, function () {
  console.log('LineBot is running.');
});
