const mongoose = require('mongoose')

const DB_URL ='mongodb://localhost:27017/eventsDatabase'

mongoose.connect(DB_URL, { useUnifiedTopology: true , useNewUrlParser: true }, (err) => {
  if (err) console.log(err);
  else console.log('connected to DB');
})