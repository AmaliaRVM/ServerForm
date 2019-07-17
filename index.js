//request for express framework, bodyParses and cors
//express syntax
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
//configuration variable enviroment
const dotenv= require('dotenv')
dotenv.config()
const cors = require('cors')
//nodemailer import
const nodemailer = require('nodemailer')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false})) //midleware
app.use(cors())
app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next();
});

app.get('/api/form', (req,res)=>{
    console.log(req.query)
    nodemailer.createTestAccount((err,account)=>{
        console.log(err, account)
        const htmlMail = `
            <div>
                firstName: ${req.query.firstName}
                message: ${req.query.message}
                email: ${req.query.email}
            </div>
        `
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            auth: {
                user:'amaliarvm@gmail.com',
                pass: process.env.GMAIL_PASSWORD
            }
        })

        let mailOptions = {
            from: 'test@gmail.com',
            to:'amaliarvm@gmail.com',
            subject:'heroku messages',
            text: req.body.message,
            html: htmlMail
        }

        transporter.sendMail(mailOptions, (err, info)=>{
            if(err){
                console.log(err)
            }else{
                console.log('message ok', info)
            }
        })
    })
    console.log('send')
    res.send('/')
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
})




