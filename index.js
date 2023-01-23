const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const todo = require('./routes/todo.route');
const port = process.env.PORT || 5000;

// express app initialization
const app = express();
// const router = express.Router()
app.use(cors());
app.use(express.json());

// database connection with mongoose
mongoose.set('strictQuery', false);
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/todos')
    .then(() => console.log('connection successfull'))
    .catch(err => console.log(err));
// mongodb://localhost:27017

// application routes
app.use("/todo", todo);

// default error handler
function errorHandler(err, req, res, next) {
    if (res.headerSent) {
        return next(err);
    }
    res.status(500).json({ error: err });
  }

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})