const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config();

// TOKEN fetched using @BOTFATHER to create a new bot.
const TOKEN = process.env.BOT_TOKEN;

const bot = new TelegramBot(TOKEN, { polling: true });

bot.on('message', (msg) => {
    const text = msg.text;

//     console.log("Message received:", text);
    
    bot.sendMessage(msg.chat.id, "You said: " + text);
});

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Hello! I am a bot. How can I help you?");
});

bot.onText(/\/joke/, async (msg) => {
     try {
         const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
         const setup = response.data.setup;
         const punchline = response.data.punchline;
 
         bot.sendMessage(msg.chat.id, `${setup}\n\n${punchline}`);
     } catch (error) {
         console.error('Error fetching joke:', error);
         bot.sendMessage(msg.chat.id, "Sorry, I couldn't fetch a joke at the moment.");
     }
 });
