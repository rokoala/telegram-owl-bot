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


var questions = [{
  text: "O que é o que é caí em pé e corre deitado?\nA. Cadeira\nB. Chuva\n C.Fogo \n D.Vento",
  answer: "b"
}]

var answerCallbacks = {};

bot.onText(/\/getrandomquestion/, (msg, match) => {

  var question = questions[0]

  answerCallbacks[msg.chat.id] = (answer) => {
    if (answer.text === question.answer) {
      console.log('correct!')
      bot.sendMessage(answer.chat.id, 'acertou!')
    } else {
      console.log('error')
      bot.sendMessage(answer.chat.id, 'errou!')
    }
  }

  bot.sendMessage(msg.chat.id, question.text, {
    "reply_markup": {
      "keyboard": [
        [{
          text: "a"
        }, {
          text: "b"
        }],
        [{
          text: "c"
        }, {
          text: "d"
        }]
      ],
      "one_time_keyboard": true
    }
  })

})

bot.on("message", (msg) => {
  var cb = answerCallbacks[msg.chat.id];
  if (cb) {
    delete answerCallbacks[msg.chat.id];
    return cb(msg);
  }
})

winston.info('Bot started')
