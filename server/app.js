const { ok } = require('assert');
const express = require('express');
const fs = require('fs');
const app = express();

app.set('json spaces', 2);

app.use((req, res, next) => {
    let agent = req.header('user-agent').replace(',', '');

        let time = new Date().toISOString()
        let method = req.method
        let resource = req.url
        let version ='HTTP/' + req.httpVersion
        let status = '200'
    
        let logLine = `${agent},${time},${method},${resource},${version},${status}\n`;
    console.log(logLine)
        fs.appendFile('server/log.csv', logLine, err => {
            if (err) throw err;        
        
       

});
next();
});
app.get('/', (req, res) => {
// write your code to respond "ok" here
res.send("ok")
});


app.get('/logs', (req, res) => {
// write your code to return a json object containing the log data here
     fs.readFile('server/log.csv', 'utf8', (err, data) => {
         if (err) throw err;
   console.log("read", data)      
         let lines = data.split('\n');
         console.log("cat", lines)
         let jsonData = [];
         lines.forEach(line => {
                     let contents = line.split(',');
                     console.log("41", contents)
                     let lineJson = {
                        "Agent": contents[0],
                        "Time": contents[1],
                        "Method": contents[2],
                        "Resource": contents[3],
                        "Version": contents[4],
                        "Status": contents[5],
                    };
                    if (contents[0] !== ''){
                        jsonData.push(lineJson);
                    }
                });
                res.json(jsonData);
                
    });
});
module.exports = app;
