import express from 'express';
const app = express();

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.listen(5050, () => {
  console.log('Listening on http://localhost:5050');
});
