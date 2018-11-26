var nodemailer = require("nodemailer");
var aws = require("aws-sdk");

var ses = new aws.SES();

var optionalSubjects = [
  [
    "DON'T CUT YOUR FUCKING HAIR",
    "JUST DON'T MATE, IT WILL LOOK GREAT WHEN IT'S GROWN OUT!!!"
  ],
  [
    "YOUR LONG HAIR WILL LOOK GREAT",
    "EVEN AUTOSTRADDLE AGREES THAT ALTERNATIVE LIFESTYLE HAIRCUTS SUCK"
  ],
  [
    "I BELIEVE IN YOU HAVING LONG HAIR!",
    "I KNOW IT'S HARD BUT I BELIEVE YOU WILL LOOK GREAT!"
  ],
  ["IMAGING IF THE GOYS HAD HAIR LIKE YOURS", "BITCHES BE JEWLOUS"]
];

function getRandomInt(max) {
  return Math.round(Math.random() * Math.floor(max));
}

var seedArray = optionalSubjects[getRandomInt(optionalSubjects.length)];

exports.handler = function(event, context, callback) {
  var mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: seedArray[0],
    text: seedArray[1]
  };
  var transporter = nodemailer.createTransport({ SES: ses });
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      callback(error);
    } else {
      console.log("Email sent:");
      callback();
    }
  });
};
