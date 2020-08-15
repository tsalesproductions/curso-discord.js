const Discord = require('discord.js');
const client = new Discord.Client();
const {prefix, token} = require('./config.json');

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if(message.content.startsWith("!avise")){
        let mention
s = message.mentions.users.map((item) => {
            var userId = item.id;
                userId = client.users.cache.get(userId);
    
            var m = message.content.split("<");
                m = m[m.length - 1].replace(">", "");
            
            client.setTimeout(() => {
                (`@${message.author.username} mencionou você com a seguinte mensagem: ${m}`)
            }, 3000);
        });
    }
    
});

client.login(token);