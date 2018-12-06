process.env.NTBA_FIX_319 = 1

require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const token = process.env.appToken
const userID = process.env.userID
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

let logStatus = false

if (process.env.logPath) {
  var { spawn } = require('child_process');
  var tailOut = spawn('tail', ["-f"].concat(process.env.logPath + 'onDutySchedule-out.log'));
  var tailError = spawn('tail', ["-f"].concat(process.env.logPath + 'onDutySchedule-error.log'));
}

// start
bot.onText(/\/start/, function (msg, match) {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message
  var chatId = msg.chat.id; //用戶的ID
  var resp = '✨ Hi, I am 👊🏻 Puncher. Your chatID is <code>' + chatId + '</code>'; //括號裡面的為回應內容，可以隨意更改
  bot.sendMessage(chatId, resp, {parse_mode: 'HTML'}); //發送訊息的function
});

// help
bot.onText(/\/help/, function (msg, match) {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message
  var chatId = msg.chat.id;
  var resp = '' +
  '⚡️ <code>/start</code> - Start message.\n' +
  '⚡️ <code>/log</code>: <strong>' + logStatus + '</strong> - Return output log.\n' +
  '⚡️ <code>/help</code> - List all commands.\n' +
  '⚡️ <code>/myid</code> - echo your chatID.\n' +
  '⚡️ <code>/echo [msg]</code> - echo your [msg].';
  bot.sendMessage(chatId, resp, {parse_mode: 'HTML'}); //發送訊息的function
});

// myid
bot.onText(/\/myid/, (msg, match) => {
  const chatId = msg.chat.id;
  // const resp = match[1]; // the captured "whatever"
  const resp = `✨ Your id is <code>${msg.chat.id}</code>`; // the captured "whatever"

  bot.sendMessage(chatId, resp, {parse_mode: 'HTML'});
});

bot.onText(/\/log (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  let resp = ''
  switch (match[1]) {
    case 'on':
      logStatus = true
      break
    case 'off':
      logStatus = false
      break
  }
  // const chatId = msg.chat.id;
  // const resp = '✨ ' + match[1]; // the captured "whatever"
  // bot.sendMessage(chatId, resp, {parse_mode: 'HTML'});
});

bot.onText(/\/log/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = '' +
    '<pre>OPTION: on / of </pre>\n\n' +
    '<strong>LOG STATUS:</strong> <code>' + logStatus + '</code>'
    ''
  bot.sendMessage(chatId, resp, {parse_mode: 'HTML'});
})

tailOut.stdout.on("data", function (data) {
  const resp = `✨ <strong>onDutySchedule-out.log</strong>✨ \n\n<pre>${data.toString()}</pre>`
  if (logStatus) {
    bot.sendMessage(userID, resp, {parse_mode: 'HTML'});
  }
});

tailError.stdout.on("data", function (data) {
  const resp = `✨ <strong>onDutySchedule-error.log</strong>✨ \n\n<pre>${data.toString()}</pre>`
  if (logStatus) {
    bot.sendMessage(userID, resp, {parse_mode: 'HTML'});
  }
});

// echo [msg]
bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = '✨ ' + match[1]; // the captured "whatever"
  bot.sendMessage(chatId, resp, {parse_mode: 'HTML'});
});

function botAlert (text) {
  const resp = '🚨 ' + text
  bot.sendMessage(userID, resp, {parse_mode: 'HTML'});
}

function botSuccess (text) {
  const resp = '🎉 ' + text
  bot.sendMessage(userID, resp, {parse_mode: 'HTML'});
}

module.exports.bot = bot
module.exports.botAlert = botAlert
module.exports.botSuccess = botSuccess