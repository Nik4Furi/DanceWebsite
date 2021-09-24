const express = require('express');
const app = express();

const path =  require('path');
const fs = require('fs');
const port = 80;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance',{useNewurlParser:true,useUnifiedTopology:true});

const bodyParser = require('body-parser');






// Define Mongoose Schima


var contactSchema = new mongoose.Schema({
    name:String,
    phone:String,
    email:String,
    address:String,
    more:String
});
var Contact = mongoose.model('Contact',contactSchema)

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'));
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine ', 'pug');
app.set('views',path.join(__dirname,'views'));


// ENDPOINTS
app.get('/',(req,res)=> {
    const params = {};    
    res.status(200).render('home.pug',params);

})
app.get('/contact',(req,res)=> {
    const params = {};
    res.status(200).render('contact.pug',params);

})
app.post('/contact',(req,res)=> {
    let myData = new Contact(req.body)
    myData.save().then(()=>{
        res.send('This item has been saved in the dbs');
    }) .catch(()=>{
        res.status(404).render('Item has not been saved in memory ')
    })
    // console.log(req.body)
    //  let name= req.body.name;
    //  let email= req.body.email;
    //  let phone= req.body.phone;
    //  let address= req.body.address;
    //  let more= req.body.more;

    // let outputToWrite = `The name of cilent is ${name} , Email address is ${email} . Contact No.--${phone} , Address is--${address} , More about him/her--${more}`;
    // fs.writeFileSync('Cilent.txt',outputToWrite);
   
})

// START SERVER 
app.listen(port,()=>{
    console.log(`The application is started on ${port}`);
})