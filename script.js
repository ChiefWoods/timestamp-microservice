const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static(__dirname));

app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;

  const date = dateParam
    ? !isNaN(Date.parse(dateParam))
      ? new Date(dateParam)
      : new Date(parseInt(dateParam))
    : new Date();

  const obj = !isNaN(date.getTime())
    ? {
        unix: date.getTime(),
        utc: date.toUTCString(),
      }
    : { error: 'Invalid Date' };

  res.json(obj);
});

app.listen(3000, () => {
  console.log('Your app is listening on port 3000');
});
