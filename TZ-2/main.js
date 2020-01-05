//before run program add env var TIMES_INTERVALS & INTERVAL_VAL by using command in terminal
//export TIMES_INTERVALS=5
//export INTERVAL_VAL=2000
const http = require('http')
const port = 3000;
const times = process.env.TIMES_INTERVALS
const interval = process.env.INTERVAL_VAL
let promise = new Promise((resolve, reject) => {
    let i = 0
    var sint = setInterval(()=> {
    console.log((new Date()).toUTCString())
        i++
        if (i == times) {
            resolve((new Date()).toUTCString());
            clearInterval(sint)
        }
    }, interval)  
  });
const server = http.createServer((req, res) => {
    promise.then(result => {
          res.end('data received ' + result)
        })
    })
server.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})


