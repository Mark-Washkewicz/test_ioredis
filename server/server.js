const express = require('express');
const Redis = require('ioredis');


const app = express();
const channel = "hi"
//use to add subscriber to certain channel
//for now always being added to channel "hi"
app.use('/sub',(req, res)=>{
    const redis = new Redis();
    redis.subscribe(channel, (error, count) => {
        if (error) {
            throw new Error(error);
        }
        console.log(`Subscribed to ${count} channel. Listening for updates on the ${channel} channel.`);
    });
    redis.on('message', (channel, message) => {
        console.log(`Received the following message from ${channel}: ${message}`);
    });
    // console.log(redis)
    res.send('sub')
})

//use to publish to channel
//rn always publishing to "hi"
app.use('/pub',(req, res)=>{
    let redis = new Redis();
    redis.publish(channel, "hi")
    res.send('pub')
})

//get all channels
app.use('/getchannels',(req, res)=>{
    let redis = new Redis();
    redis.pubsub('channels', (err, channels) => {
        if (err) {
          
        } else {
          console.log('Channels:', channels); // array
        }
    });

    res.send('getchannels')
})

//get subscribers to certain channel
//rn always hi
app.use('/numsub',(req, res)=>{
    let redis = new Redis();
    redis.pubsub('numsub', channel,(err, channels) => {
        if (err) {
          
        } else {
          console.log('Channels:', channels); // array
        }
    });

    res.send('numsub')
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});