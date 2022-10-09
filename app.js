const express = require("express");
const path = require("path");
const app = express();
const port = 8000;
const bodyparser=require("body-parser");

const mongoose = require('mongoose');
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1/Laundary_Contact'); 
//   console.log("We are connected");
}

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String
  });

const Contact = mongoose.model('Contact', contactSchema);


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded({ extended: true }))
// app.locals.basedir = path.join(__dirname, 'views');

// PUG SPECIFIC STUFF
app.engine('pug', require('pug').__express)
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>
{
        var myData = new Contact(req.body);
        myData.save().then(()=>{
        res.send("Thanku for contacting us our team will call you back!!")
        }).catch(()=>{
        res.status(400).send("item was not saved to the database")
        })
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`)
})
