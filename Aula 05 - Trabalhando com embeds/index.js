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
    embedServerOnline: function(lista){
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Status do servidor:')
            .setDescription('Lorem ipsum')
            .setThumbnail('https://i.imgur.com/wSTFkRM.png')
            .addFields(
                { name: 'Jogadores Online', value: `${this.data.players.online}/${this.data.players.max}` },
                { name: 'Lista de jogadores online', value: lista }
            )
            .setTimestamp()
            .setFooter('Última verificação', 'https://i.imgur.com/wSTFkRM.png');

            this.message.channel.send(exampleEmbed);
    },
    embedServerOffline: function(){
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Status do servidor:')
            .setDescription('Atuamente o servidor está offline')
            .setTimestamp()
            .setFooter('Última verificação', 'https://i.imgur.com/wSTFkRM.png');

            this.message.channel.send(exampleEmbed);
    },
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
               let listPlayers = this.replaceAll(this.data.players.list.toString(), ",", "\n");
               this.embedServerOnline(listPlayers)
           }else{
                this.embedServerOffline();
           }
        }
    },
    init: function(){
        const data = axios({
            url: 'https://api.mcsrvstat.us/1/play.pokegaming.com:255651',
            headers: {'accept': 'application/json'}
        }).then((result) => {
            this.data = result.data;
        }).catch((error) => {
            console.error(error)
        });
    }
}

client.login(token);