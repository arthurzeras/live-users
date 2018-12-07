const app = require('http').createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Kintegra live users esta rodando');
    res.end();
  }
});

const io = require('socket.io')(app);

app.listen(3000);

const logados = [];

io.on('connection', socket => {
  setInterval(() => {
    socket.emit('Ta ai');
    socket.emit('Logados', logados)
  }, 1000)

  socket.on('Estou', data => {
    if (!logados.filter(l => l.id === data.id).length) {
      logados.push(data)
      console.log('Novo login: ', data)
      console.log('Logados: ', logados)
    }
  });

  socket.on('Desliguei', data => {
    logados.splice(logados.indexOf(data), 1)
    console.log('Desconectado: ', data)
    console.log('Logados: ', logados)
  });
});