var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var config = require('../../config/config');

var transporter = nodemailer.createTransport(smtpTransport({
	service: 'Gmail',
	auth: {
	  user: config.emailUsername,
	  pass: config.emailPassword
	}
}));

exports.welcomeMail = function welcomeMail(userEmail) {
	transporter.sendMail({
		from: config.emailUsername + '@gmail.com',
		to: userEmail,
		subject: 'hello',
		html: '<b>hello world!</b>'
	});
};