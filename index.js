const express = require('express')
const cors = require('cors')

const db = require('./config/database')
const {PORT} = require('./config/envir')
const userRouter = require('./routes/user')

const bodyParser = require('body-parser')
const app = express()
const port = PORT || 3000

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req, res) => res.send('Bujang In action'));


db.then(() => {
    console.log(`connected to database`);
  })
  .catch(error => {
    console.log("error happened when to reach mongodb connection", error);
  })

  app.use(userRouter);

app.listen(port, () => {
  console.log(`udah jalan di port ${port}`);
});