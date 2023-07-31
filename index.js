const express = require("express")
const ejs = require("ejs")
const path = require("path")
const nodemailer = require("nodemailer");
const app = express()
require("dotenv").config()
const PORT = 5000


const transporter = nodemailer.createTransport({
  service: "Gmail",
  secure: false,

  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: 'bandvov@gmail.com',
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

app.get("/send", async (req, res) => {

  let html = await ejs.renderFile(path.join(__dirname, "/template.ejs"), {
    user: {
      name: "Vova"
    }
  });


  await transporter.sendMail({
    from: '"Fred Foo 👻" <bandvov@gmail.com>', // sender address
    to: "stadniuk.roman@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: html, // html body
  });

  res.send(html)
})

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
})