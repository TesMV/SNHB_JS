const Discord = require('discord.js'); 
const interactions = require("discord-slash-commands-client");
const client = new Discord.Client(); 
const comms = require("./comms.js"); 
const fs = require('fs'); // я не помню зачем это
let config = require('./config.json');
let token = config.token; 
let prefix = config.prefix;
let client_id = config.client_id;


client.interactions = new interactions.Client(
    token,
    client_id
);

client.on("ready", function () {   
    console.log(client.user.username + " запустился!");

    client.interactions
        .createCommand({
            name: "ping",
            description: "ping pong",
        })
        .then(console.log)
        .catch(console.error);
});

client.on("interactionCreate", (interaction) => {
    if (interaction.name === "ping") {
        interaction.channel.send("pong");
    }
});

client.on('message', (msg) => { // реагирование на сообщения
    if (msg.author.username != client.user.username && msg.author.discriminator != client.user.discriminator) {
        var comm = msg.content.trim() + " ";
        var comm_name = comm.slice(0, comm.indexOf(" "));
        var messArr = comm.split(" ");
        for (comm_count in comms.comms) {
            var comm2 = prefix + comms.comms[comm_count].name;
            if (comm2 == comm_name) {
                comms.comms[comm_count].out(client, msg, messArr);
            }
        }
    }
});


client.login(token); // авторизация бота