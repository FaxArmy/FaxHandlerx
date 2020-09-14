require("express")().listen(1343);

const db = require("quick.db");
const discord = require("discord.js");
const client = new discord.Client({ disableEveryone: true });
client.login("");
const fetch = require("node-fetch");
const fs = require('fs')


setInterval(() => {
  var links = db.get("linkler");
  if(!links) return;
  var linkA = links.map(c => c.url)
  linkA.forEach(link => {
    try {
      fetch(link)
    } catch(e) { console.log("" + e) };
  })
  console.log("Başarıyla Pinglendi.")
}, 60000)

client.on("ready", () => {
if(!Array.isArray(db.get("linkler"))) {
db.set("linkler", [])
}
})

client.on("ready", () => {
  client.user.setActivity(`hu!yardım | Handler bot ile`)
  console.log(`Logined`)
})

client.on("message", msg => {
       if (msg.content.toLowerCase() === "h!sil") {
       msg.channel.send('Bir Handler bot komudu kullanildi')
       msg.channel.bulkDelete(`100`)
       }
    });

client.on("message", message => {
  if(message.author.id !== `414033672455585792`) return;
  if(message.author.bot) return;
  var spl = message.content.split(" ");
  if(spl[0] == "hu!add") {
  if (message.channel.type === "dm") return message.channel.send(`i dont like dm`);
  var link = spl[1]
  fetch(link).then(() => {
    if(db.get("linkler").map(z => z.url).includes(link)) return message.channel.send("already added link !!")
    message.channel.send("Nice you added link");
    db.push("linkler", { url: link, owner: message.author.id})
  }).catch(e => {
    return message.channel.send(" - " + e)
  })
  }
})


client.on("message", message => {
  if(message.author.id !== `414033672455585792`) return;
  if(message.author.bot) return;
  var spl = message.content.split(" ");
  if(spl[0] == "hu!links") {
  var link = spl[1]
 message.channel.send(`${db.get("linkler").length} / ${client.guilds.size}`)
}})



const Discord = require('discord.js');

client.on("message", message => {
  if(message.author.id !== `414033672455585792`) return;
  if(message.author.bot) return;
    var spl = message.content.split(" ");
  if(spl[0] == "hu!help") {
let embed = new Discord.RichEmbed()
.setColor('#444444')
.addField(`Handler Uptime v0.1`, `Link your website and bot & Monitor bot monitoring you bot`)
.addField(`General Commands`,`

\`hu!help\` # help menu see all commands
\`hu!add\` # add bot system
\`hu!links\` # linked all bots
`)
.setThumbnail(client.user.avatarURL)
.setAuthor(`Uptime`, client.user.avatarURL)
.setFooter(`© Uptime `, client.user.avatarURL)
return message.channel.send(embed);
    }
 
})


client.on("message", async message => {
  if(message.author.id !== `414033672455585792`) return;
  if(!message.content.startsWith("hux!eval")) return;
  if(!["414033672455585792","414033672455585792"].includes(message.author.id)) return;
  var args = message.content.split("u.eval")[1]
  if(!args) return message.channel.send("<:asuna_no:732219380795965471> ..")
  
      const code = args
    
    
      function clean(text) {
          if (typeof text !== 'string')
              text = require('util').inspect(text, { depth: 3 })
          text = text
              .replace(/`/g, '`' + String.fromCharCode(8203))
              .replace(/@/g, '@' + String.fromCharCode(8203))
          return text;
      };
  
      var evalEmbed = ""
      try {
          var evaled = await clean(await eval(await code));
          if (evaled.constructor.name === 'Promise') evalEmbed = `\`\`\`\n${evaled}\n\`\`\``
          else evalEmbed = `\`\`\`js\n${evaled}\n\`\`\``
          
  if(evaled.length < 1900) { 
     message.channel.send(`\`\`\`js\n${evaled}\`\`\``);
  } else {
    var hast = await require("hastebin-gen")(evaled, { url: "https://hasteb.in" } )
  message.channel.send(hast)
  }
      } catch (err) {
          message.channel.send(`\`\`\`js\n${err}\n\`\`\``);
      }
  })
  
  const log = message => {
  console.log(`${message}`);
}
  
  