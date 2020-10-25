var tmi = require("tmi.js")
var channelName = "noot_gaming"
var prefix = "!"

var config = {
    options: {
        debug: true
    },

    connection: {
        cluster: "aws",
        reconnect: true,
        secure: true
    },

    identity: 
    {
        username: "noot_gaming",
        //oauth grab @ https://twitchapps.com/tmi
        password: "oauth:welwx9fvntnnjof5r4b6wqnzo6z5jh",
    },
    channels: [channelName]

}

const client = new tmi.client(config)
// client.connect().catch(console.error);
client.connect();


client.on("connected", (address, port) => {
    client.action(channelName, "shitter has connected to chat on" + address + ":" + port)
})

client.on("chat", (channel, user, message, self) => {
    // if (self) return;
    if (message == ("!hi" || "!hello" )){
        client.say(channelName, "Hello Chat Person")
    }


    // cmd handler code
    const args = message.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    try{
        let commandfile = require('./commands/${cmd}.js')
        commandfile.run(client, message, args, user, channel, self)
    }catch (err){
        // client.say(channelName, "Command doesnt exist?")
        return;
    }

})