const express = require('express');
const Redis = require('ioredis');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser({ urlencoded: true }));
app.use(express.json())

const channel = "hi"
//use to add subscriber to certain channel
//for now always being added to channel "hi"
app.use('/sub', (req, res) => {
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
app.use('/pub', (req, res) => {
    let redis = new Redis();
    redis.publish(channel, "hi")
    res.send('pub')
})

//get all channels
app.use('/getchannels', (req, res) => {
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
app.use('/numsub', (req, res) => {
    let redis = new Redis();
    redis.pubsub('numsub', channel, (err, channels) => {
        if (err) {

        } else {
            console.log('Channels:', channels); // array
        }
    });

    res.send('numsub')
})

// LOGIN PAGE ROUTES
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});


app.get('/login', (req, res) => {
    //check the credenitals user and pw from req.body
    let username = req.body.user;
    let pw = req.body.pw;
    //if the user is an admin --> redirect to adminview?
    if (username === 'codesmith' && pw === 'ilovetesting') {
        res.redirect('/adminview')
    }
    //if the user is a user --> redirect to userview?
    else if (username === 'asdfasdf') {
        res.redirect('/userview')
    } else {
        // res.send('wrong password')
        res.redirect('/yo')
    }

});

app.get('/userview', /**send userid? and sendFile userview? */(req, res) => {
    //send file for userview
})

app.get('/adminview', /**send userid? and sendFile adminview? */(req, res) => {
    //send file for adminview
})

// NEWSFEED ROUTES

//getmysubs
//getallchannels
//
/*
sub
unsub
body: {userID, channel}
*/
// /newsfeed/getmysubs


//PUBLISH ROUTES


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});