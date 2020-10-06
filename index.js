const nodemailer = require('nodemailer');
const express=require('express');
const app=express();
const SalesforceConnection = require("node-salesforce-connection");
(async () => {
 
    let sfConn = new SalesforceConnection();
   console.log('connecting')
    await sfConn.soapLogin({
      hostname: "test.salesforce.com",
      apiVersion: "49.0",
      username: "hermann@noeli-it.net",
      password: "Noeli$2020xZOaCcB9qjVluYfvVCjLNAZw",
    });
    console.log('connected')
    let result = await sfConn.rest("/services/apexrest/gestione-comuni-aree/send-email?customerEmail=liburialgaius@gmail.com");
    console.log(result)
   
})().catch(ex => console.error(ex.stack));
const basicAuth = require('express-basic-auth');

// const transporter = nodemailer.createTransport({
//     host:'az1-ss34.a2hosting.com',
//     port:465,
//     secure:true,
//     auth:{
//         user:'platform@muphac.com',
//         pass:'muphacemail123'
//     },
//     tls: {
//         rejectUnauthorized: false
//     }
// });

app.use(basicAuth({
    users: { 'admin': 'supersecret' }
}));

const transporter = nodemailer.createTransport({
    "service": "gmail",
    "auth": {
      "user": "trips@airbooks.co.za",
      "_pass": "ameen*3n",
      "pass": "byjwtavalixofmlv"
    }
});



app.get('/',(req,res)=>{
    const mail={
        from: 'trips@airbooks.co.za', // sender address 
        to: 'liburialgaius@gmail.com', // list of receivers
        subject: "Test sending mail!", // Subject line
        // text: "Hello world?", // plain text body
        html: `Mail Sent!` // html body
    };
    transporter.sendMail(mail,(error,info)=>{
        if(error){
            res.status(400).send('Oups!');
            console.log('Error when sending the mail!',error); 
        }else{
            res.status(200).send('Good!');
            console.log('Mail sent successfully! ',info);
        }
    });
    
});

app.listen(3000);