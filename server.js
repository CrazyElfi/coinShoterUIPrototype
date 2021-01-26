const WebSocket = require('ws');

const server = new WebSocket.Server({port: 3000});

server.on('connection', ws => {
  console.log('connected')
  ws.on('message', data => {
    const message = JSON.parse(data);
    console.log('message2', message)

    switch (message.event) {
      case "drop_coin": {
        console.log('drop_coin!!!!!');
        ws.send('понял, принял, упала монетка')
        break;
      }
      case "hole_number": {
        console.log('hole_number');
        const ledId = message.data + 1
        ws.send(ledId)
        break;
      }
      default : {
        console.log('use slomalos');
      }
    }
  })
  ws.send('hi, work')
})

