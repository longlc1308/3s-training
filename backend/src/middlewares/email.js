const sgMail = require("@sendgrid/mail");
const API_KEY = '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';
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