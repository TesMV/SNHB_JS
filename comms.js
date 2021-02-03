const config = require('./config.json');
const Discord = require('discord.js'); 
const prefix = config.prefix; // «Вытаскиваем» префикс

// Команды //

function flip_coin(robot, mess, args) {
    mess.channel.send('Монета подбрасывается...')

    var random = Math.floor(Math.random() * 4) + 1; // Объявление переменной random - она вычисляет случайное число от 1 до 3

    if (random === 1) { // Если вычислено число 1, то выпадает орёл.
        mess.channel.send(':full_moon: Орёл!')
    } else if (random === 2) { // Если вычислено число 2, то выпадает решка.
        mess.channel.send(':new_moon: Решка!')
    } else if (random === 3) { // Если вычислено число 3, то монета падает ребром.
        mess.channel.send(':last_quarter_moon: Монета упала ребром!')
    }
}

function ping(robot, mess, args) {
    var timeTaken = Date.now() - mess.createdTimestamp;
    mess.channel.send(`Пинг до бота равен ${timeTaken}ms.`);
}

function roll(robot, mess, args) {
    if (args[1] === "d6") {
        var random = Math.floor(Math.random() * 6) + 1;
        mess.reply("Выкинул " + random);
    }

    if (args[1] === "d20") {
        var random = Math.floor(Math.random() * 20) + 1;
        mess.reply("Выкинул " + random);
    }

    if (args[1] === "d100") {
        var random = Math.floor(Math.random() * 100) + 1;
        mess.reply("Выкинул " + random);
    }
}

// Список команд //

var comms_list = [{
    name: "flip_coin",
    out: flip_coin,
    about: "Орёл или решка"
},
{
    name: "ping",
    out: ping,
    about: "Пинг"
},
{
    name: "roll",
    out: roll,
    about: "Кинуть куб"
}];

// Name - название команды, на которую будет реагировать бот
// Out - название функции с командой
// About - описание команды 

module.exports.comms = comms_list;