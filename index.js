const winston = require('winston');
const TelegramBot = require('node-telegram-bot-api');

winston.add(winston.transports.File, {
  filename: 'bot.log'
});

// replace the value below with the Telegram token you receive from @BotFather
const token = require('./env.json').API_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {
  polling: true
});

bot.onText(/\/getrandomquestion/, (msg, match) => {
  bot.sendMessage(msg.chat.id, "O que é o que é caí em pé e corre deitado?\nA. Cadeira\nB. Chuva\n C.Fogo \n D.Vento", {
    "reply_markup": {
      "keyboard": [
        ["a", "b"],
        ["c", "d"]
      ]
    }
  }).then((obj)=>{
    console.log(obj);
    // bot.onReplyToMessage(chatId, messageId, callback)
  })
})

winston.info('Bot started')
