const status = document.getElementById('status');
const messages = document.getElementById('messages');
const coinBtn =document.getElementById('coinBtn')
const shooterBtn =document.getElementById('shooterBtn')

const ws = new WebSocket('ws://localhost:3000');

function changeStatus (value) {
    status.innerHTML = value;
}

function changeMessages (value) {
  messages.innerHTML = value;
}

coinBtn.addEventListener('click', (e) => {
  changeValCoinBtn(e)
  console.log(coinBtn.value)
})

ws.onopen = () => changeStatus('online');
ws.onclose = () => changeStatus('disconnected');
ws.onmessage =  response => {
  changeMessages(response.data);
}

function changeValCoinBtn (e) {
  const message = {
    data: 3,
    event: "drop_coin"
  }
  ws.send(JSON.stringify(message))
}

shooterBtn.addEventListener('click', () => {
  const registerNumber = intervalGoal();
  const message = {
    data: registerNumber,
    event: "hole_number"
  }
  ws.send(JSON.stringify(message));
})

function intervalGoal () {
  const min = 1;
  const max = 15;
  return Math.floor(min + Math.random() * (max + 1 - min));
}
