const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000
const path = require('path')

// var http = require('http');
// server = {};
// server.httpServer = http.createServer(app);

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(__dirname + '/views'))
app.use(express.urlencoded({ extended: true }))

numbers = [];
temps = new Array(100).fill(0);
humidities = new Array(100).fill(0);

function appendToList(req, res, next) {
    if (numbers.length > 10) {
        numbers.shift();
    }
    numbers.push(req.body.data);
    // console.log("appendToList");
    next()
}

function appendToListGet(req, res, next) {
    if (numbers.length > 10) {
        numbers.shift();
    }
    numbers.push(req.query.data);
    // console.log("appendToList");
    next()
}

function appendTemp(req, res, next) {
    temps.shift();
    temps.push(req.query.t);
    // console.log("appendToList");
    next()
}

function appendHumidity(req, res, next) {
    humidities.shift();
    humidities.push(req.query.rh);
    // console.log("appendToList");
    next()
}

app.get("/", (req, res) => {
    res.render('index')
})

app.get("/home", (req, res) => {
    res.render('index')
})

app.post("/home", (req, res) => {
    res.render('index')
})

app.get("/about", (req, res) => {
    res.render('about')
})

app.get("/contact", (req, res) => {
    res.render('contact')
})

app.post("/something", appendToList, (req, res) => {
    console.log("POST request received")
    console.log(req.body.data)
    res.render('index', 
    {data: numbers
    })
})

app.get("/something", appendToListGet, (req, res) => {
    console.log("GET request received")
    console.log(req.query)
    res.render('index', 
    {data: numbers
    })
})

// WORK ON THIS TO RECEIVE DATA FROM SENSOR
app.get("/sensor", appendTemp, appendHumidity, (req, res) => {
    console.log("GET request received")
    console.log(req.query)
    if (req.query.rh < 45) {
        res.send("on")
    } else {
        res.send("off")
    }
})

// This is just for the button on the website
app.post("/sensor", appendToListGet, (req, res) => {
    console.log("POST request received")
    res.render('sensor', 
    {temps: temps, humidities: humidities
    })
})

app.listen(port, function(error) { 
    if (error) { 
        console.log("something went wrong", error)
    } else { 
        console.log("server is listening on port " + port)
    }
})

/*
--ssh (make sure youre in the dir with the pem file)
ssh -i "aiden-mac.pem" ubuntu@ec2-18-222-177-2.us-east-2.compute.amazonaws.com

--this lets you transfer files from local to remote
rsync -avz --exclude 'node_modules' --exclude '.git' --exclude '.env' \
-e "ssh -i aiden-mac.pem" /Users/aiden/VSCodeProjects/nodeServer/
. ubuntu@ec2-18-222-177-2.us-east-2.compute.amazonaws.com:~/app

--this restarts the server
sudo systemctl status myapp.service

--how to look at logs
sudo journalctl -u myapp.service

--stop and start the server
sudo systemctl stop caddy
sudo systemctl stop myapp.service
sudo systemctl start myapp.service
sudo systemctl start caddy
*/