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
		subject: 'Welcome To Farmplace',
		html: '<p>Thank you for signing up for Farm Place!</p>'
	});
};

exports.forgotPasswordMail = function beginPasswordResetMail(userEmail) {
	transporter.sendMail({
		from: config.emailUsername + '@gmail.com',
		to: userEmail,
		subject: 'Reset Your Farm Place Password',
		html: '<p>We received a request to reset the password for your account on Farm Place.<p/> \n\
			If you made this request, please click the link below.<p/> \n\
			If you did not make this request, please ignore this email.<p/>'
	});
};

exports.resetPasswordMail = function resetPasswordMail(userEmail) {
	transporter.sendMail({
		from: config.emailUsername + '@gmail.com',
		to: userEmail,
		subject: 'Your Farm Place Password Has Been Changed',
		html: '<p>This is confirm that your Farm Place password has been successfully changed.<p/> \n\
			If you did not make this request, please contact us immediately.<p/>'
	});
};