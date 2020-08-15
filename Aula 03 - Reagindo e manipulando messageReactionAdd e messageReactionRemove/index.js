const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const {prefix, token} = require('./config.json');

client.once('ready', () => {
	console.log('Ready!');
});

client.on('messageReactionAdd', async (reaction, user) => {
    if(reaction.message.id === "731619243249893417"){
        //692177977705889845
       const guildMember = reaction.message.guild.members.cache.get(user.id)
       if(!guildMember.roles.cache.get("692177977705889845")){
           guildMember.roles.add("692177977705889845");
       }
    }
});

client.on('messageReactionRemove', async (reaction, user) => {
    if(reaction.message.id === "731619243249893417"){
        //692177977705889845
       const guildMember = reaction.message.guild.members.cache.get(user.id)
       if(guildMember.roles.cache.get("692177977705889845")){
           guildMember.roles.remove("692177977705889845");
       }
    }
});

client.login(token);