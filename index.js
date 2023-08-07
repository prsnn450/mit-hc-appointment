const express= require('express');
const app=express();

const bodyParser = require('body-parser');

const mongoose= require('mongoose');
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
const dburl="mongodb://127.0.0.1:27017/healthcentrre";
mongoose.connect( dburl, connectionParams);

const student= require('./routes/studentLogin');
const staff= require('./routes/staffLogin');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send('Hello');
  });

app.use('/api/Student',student);
app.use('/api/Staff',staff);

app.listen(5000,function(req,res){
    console.log('connected to port:5000');
});