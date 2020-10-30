var tmi = require("tmi.js")
var channelName = "noot_gaming"
var prefix = "!"

var config1 = {
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

const client = new tmi.client(config1)
client.connect().catch(console.error);
// client.connect();


client.on("connected", (address, port) => {
    client.action(channelName, "shitter has connected to chat on" + address + ":" + port)
})

client.on("chat", (channel, user, message, self) => {
    if (self) return;
    if (message == ("!hi")){
        client.say(channelName, "Hello Chat Person")
    }


    // cmd handler code
    const args = message.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    try {
        let commandfile = require(`./commands/${cmd}.js`)
        commandfile.run(client, message, args, user, channel, self)
    } catch (err) {
        // client.say(channelName, "Command doesnt exist?")
        return;
    }

})

// Events tripper 

client.on("subscription", (channel, username, method, message, userstate) => {
    console.log("subscription", { channel, username, method, message, userstate });
    client.say(channelName, 'Thanks for Subscribing, ${username}');
});

client.on("resub", (channel, username, _months, method, message, userstate, methods) => {
    console.log("resub", { channel, username, _months, method, message, userstate, methods });
    let streakMonths = userstate["msg-param-streak-months"];
    let cumulativeMonths = userstate["msg-param-cumulative-months"];
    let sharedStreak = userstate["msg-param-should-share-streak"];
    if(sharedStreak) {
       client.say(channelName, `Thanks for Resubing for ${streakMonths} consecutive months, @${username}!`); 
    }
       else {
       client.say(channelName, `Thanks for resubscribing for ${cumulativeMonths} months, @${user.username}!`);
    }
});