const winston = require('winston');
const TelegramBot = require('node-telegram-bot-api');

winston.add(winston.transports.File, {filename:'bot.log'})
winston.remove(winston.transports.Console);

// replace the value below with the Telegram token you receive from @BotFather
const token = require('./env.json').API_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message
  winston.log('info',msg);
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

bot.onText('/\/getrandomquestion (.+)/', (msg, match) =>{
  bot.sendMessage(msg.chat.id, "O que é o que é caí em pé e corre deitado ?")
  bot.sendMessage(msg.chat.id, "A. Cadeira\n B. Chuva \n C. Fogo \n D. Vento", {
    "reply_markup":{
      "keyboard":[["a","b","c","d"]]
    }
  });

  bot.onText(/.+/g, function(msg, match) {
    bot.sendMessage(msg.chat.id, "You selected " + match);
    winston.log(msg)
  });
})

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Received your message');
});

winston.info('Bot started')
