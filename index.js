const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config()

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const userRoutes = require('./routes/user');

mongoose.connect(`mongodb+srv://rest:rest@cluster0.j1vm8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,  { useUnifiedTopology: true, useNewUrlParser: true })
.then(()=>{
    console.log('sss')
}).catch((err)=>{
    console.log(err)
});


app.use('/api/users/', userRoutes);
// app.use('/api/auth/', authRoutes);
app.listen(process.env.PORT || 5000, () =>{
    console.log('ss')
})