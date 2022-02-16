const sgMail = require("@sendgrid/mail");
const API_KEY = process.env.SENDGRID_KEY;
sgMail.setApiKey(API_KEY)

module.exports.sendTemplate = (to, from, templateId, dynamic_template_data) => {
  const msg = {
    to,
    from: { name: 'MobileS', email: from },
    templateId,
    dynamic_template_data
  };
  console.log(msg)
  sgMail.send(msg)
    .then((response) => {
      console.log('mail-sent-successfully', {templateId, dynamic_template_data });
      console.log('response', response);
    })
    .catch((error) => {
      console.error('send-grid-error: ', error.toString());
    });
};