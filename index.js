const express = require("express")
const ejs = require("ejs")
const path = require("path")
const nodemailer = require("nodemailer");
const app = express()

const PORT = 5000


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: 'REPLACE-WITH-YOUR-ALIAS@YOURDOMAIN.COM',
    pass: 'REPLACE-WITH-YOUR-GENERATED-PASSWORD'
  }
});

app.get("/send",async(req, res)=>{

    let html = await ejs.renderFile(path.join(__dirname,"/template.ejs"), {user: {
        name:"Vova"
    }});
    
    
    await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "bar@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: html, // html body
      });

    res.send(html)
})

app.listen(PORT,()=>{
    console.log("Server started on port",PORT);
})