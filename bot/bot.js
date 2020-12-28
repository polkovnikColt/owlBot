const TelegramBot = require('node-telegram-bot-api');
const User = require('./user/user.js');
const fs = require('fs');

fs.writeFileSync('users.txt', [].toString());

let userArray = fs.readFileSync('users.txt','utf8');

let user = null;
const token = '1443303192:AAGdLRxnCJc2RPfMQUdVbztiBZy1HhxFl6o';

const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start (.+)/, (msg, match) => {
    if (user === null) {
        const chatId = msg.chat.id;
        const resp = match[1];
        user = new User.User(resp);
        fs.writeFileSync('users.txt', JSON.stringify({id: chatId,data: user.getUserData()}));
        bot.sendMessage(chatId, user.print());
    }
    else {
        bot.sendMessage(chatId, "У вас уже есть сова!!! Можно взять новую написав команду /reset");
        bot.sendMessage(chatId, user.print());
    }
});

bot.onText(/\/reset (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1];
    user = new User.User(resp);
    bot.sendMessage(chatId, user.print());
});


bot.on('message', (msg) => {

    let data = fs.readFileSync('users.txt','utf8');
    console.log(data);

    const chatId = msg.chat.id;
    const command = msg.text.toLowerCase().trim();

    if (command.startsWith('/')) return;

    if (user !== null) {
        commandSwitcher(command, chatId);
    } else {
        bot.sendMessage(chatId, "Совы нету(( Просто напиши /start \"имя\" и она появиться!!")
    }

});

function commandSwitcher(command, chatId) {
    switch (command) {
        case "покормить совушку":
            user.owl.feed(1);
            user.owl.hunger === 10 ?
                bot.sendMessage(chatId, "Теперь cовушка сыта") :
                bot.sendMessage(chatId, "Вы покормили совушку");
            break;
        case "сово-инфо" :
            bot.sendMessage(chatId, user.print());
            break;
        case "отправить сову на охоту":
            bot.sendMessage(chatId, "Сова засела в кустах и ищет мышей...");
            const mouses = nextInt();
            user.earnMoney(mouses);
            Math.random() > 0.08
                ? bot.sendMessage(chatId, "Сова знатно потрудилась и теперь у нее плюс "
                + mouses + " мышек!!!")
                : bot.sendMessage(chatId, "Пока сова летела домой все вышки сбежали через задний карман :(");
                break;
    }
}

function nextInt() {
    return Math.floor((Math.random() * (30 - 5) + 5));
}