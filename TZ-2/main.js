//before run program add env var TIMES_INTERVALS & INTERVAL_VAL by using command in terminal
//export TIMES_INTERVALS=5
//export INTERVAL_VAL=2000
const http = require('http')
const port = 3000;
const times = process.env.TIMES_INTERVALS || 5
const interval = process.env.INTERVAL_VAL || 2000
const server = http.createServer((req, res) => {
  if (req.url != '/favicon.ico') {
    let i = 0
    new Promise((resolve, reject) => {
      var sint = setInterval(()=> {
          i++
          if (i <= times){
            console.log((new Date()).toUTCString())
            if (i == times) {
              resolve((new Date()).toUTCString());
              //clearInterval(sint)
            }
          }
      }, interval)  
    })
    .then(result => {
    res.end('data received ' + result)
    })
  }
})
server.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})
