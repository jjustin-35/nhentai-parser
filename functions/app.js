import linebot from 'linebot';
import * as dotenv from 'dotenv';
import functions from 'firebase-functions';

import './config/firebase.js';
import login from './apis/login.js';
import parser from './helpers/parser.js';
import { getData, updateBookData } from './apis/database.js';
dotenv.config();

login(process.env.FIREBASE_EMAIL, process.env.FIREBASE_PASSWORD);

const bot = linebot({
    channelId: process.env.CHANNEL_ID,
    channelSecret: process.env.CHANNEL_SECRET,
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});

bot.on('message', async function (event) {
    if (event.message.type !== 'text') return;

    const userId = event.source.userId;

    if (event.message.text === 'history') {
        try {
            const data = await getData(userId);
            if (!data) return event.reply('沒有資料！');
            return event.reply(data);
        } catch (error) {
            console.log(error);
            return event.reply('oops! 出了點問題，請稍後再試。');
        }
    }

    try {
        const numbers = event.message.text;
        const urls = parser(numbers);
        const urlMsgArr = urls.map((url) => {
            const urlRegex = new RegExp('https://nhentai.net/g/\\d{6}/');
            if (!urlRegex.test(url)) return `沒有找到"${url}"這本本子！`;
            return url;
        });
        const urlsMsg = urlMsgArr.join('\n');

        const filteredUrls = urls.filter((url) => {
            const urlRegex = new RegExp('https://nhentai.net/g/\\d{6}/');
            return urlRegex.test(url);
        });
        await updateBookData(userId, filteredUrls);

        return event.reply(urlsMsg);
    } catch (error) {
        console.log(error);
        return event.reply('oops! 出了點問題，請稍後再試。');
    }
});

bot.listen('/linewebhook', process.env.PORT || 3000, function () {
    console.log('LineBot is running.');
});

export const linebotWebhook = functions.https.onRequest(bot.parser());
