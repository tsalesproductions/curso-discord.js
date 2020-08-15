const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const axios = require('axios')
const {prefix, token} = require('./config.json');

client.once('ready', () => {
    console.log('Ready!');
    
    serverInfos.init(); 
    setInterval(function(){
        serverInfos.init(); 
    }, 60000 * 3)
});

client.on('message', async (message) => {
    serverInfos.commands(message);
});

const serverInfos = {
    data: null,
    message: null,
    replaceAll: function(str, de, para){
        var pos = str.indexOf(de)

        while(pos > -1){
            str = str.replace(de, para)
            pos = str.indexOf(de)
        }
        return str;
    },
    commands: function(message){
        this.message = message;

        if(this.message.content.startsWith("!status")){
           if(this.data.offline !== true){
               this.message.reply("O servidor está online!")
           }else{
            this.message.reply("O servidor está offline :(")
           }
        }
    
        if(this.message.content.startsWith("!players")){
            let listPlayers = this.replaceAll(this.data.players.list.toString(), ",", "\n");
            this.message.reply(`Atualmente tem ${this.data.players.online} players onlines\n\n ${listPlayers}`);
        }
    },
    init: function(){
        const data = axios({
            url: 'https://api.mcsrvstat.us/1/play.pokegaming.com:25565',
            headers: {'accept': 'application/json'}
        }).then((result) => {
            this.data = result.data;
        }).catch((error) => {
            console.error(error)
        });
    }
}

client.login(token);