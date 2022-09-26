const nodemailer = require("nodemailer");
const Course = require('../models/Course');
const User = require('../models/User');


exports.getIndexPage = async (req, res) => {
  
  const courses = await Course.find().sort('-createdAt').limit(2);
  const totalCourses = await Course.find().countDocuments();
  const totalStudents = await User.countDocuments({role: 'student'});
  const totalTeachers = await User.countDocuments({role: 'teacher'});

  res.status(200).render('index', {
    page_name: 'index',
    courses,
    totalCourses,
    totalStudents,
    totalTeachers
  });
};

exports.getAboutPage = (req, res) => {
  res.status(200).render('about', {
    page_name: 'about',
  });
};

exports.getRegisterPage = (req, res) => {
  res.status(200).render('register', {
    page_name: 'register',
  });
};

exports.getLoginPage = (req, res) => {
  res.status(200).render('login', {
    page_name: 'login',
  });
};

exports.getContactPage = (req, res) => {
  res.status(200).render('contact', {
    page_name: 'contact',
  });
};

exports.sendEmail = async (req, res) => {

  try{

  const outputMessage = `
  
  <h1>Mail Details </h1>
  <ul>
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
  </ul>
  <h1>Message</h1>
  <p>${req.body.message}</p>
  `

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
      user: "ylmgrbz@gmail.com", 
      pass: "987654", 
    },
  });

  let info = await transporter.sendMail({
    from: '"Smart EDU Contact Form" <ylmgrbz@gmail.com>', 
    to: "yalim1999@hotmail.com", 
    subject: "Smart EDU", 
    html: outputMessage,
  })

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  req.flash("success", "We Received your message succesfully");

  res.status(200).redirect('contact');

} catch (err) {
  req.flash("error", `Something happened!`);
  res.status(200).redirect('contact');
}

};