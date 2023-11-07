require("dotenv").config();
import nodemailer from "nodemailer";

let sendSimpleEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });
  let info = await transporter.sendMail({
    from: '"Ba la ba la ba la 👻" <tranminhquandz1999@gmail.com>', // sender address
    to: dataSend.reciverEmail, // list of receivers
    subject: "Thông tin đặt lịch khám bệnh",
    html: getBodyHTMLEmail(dataSend),
  });
};

let getBodyHTMLEmail = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `<H3>Xin chào ${dataSend.patientName}</H3>
<p>Bạn nhận được email thì đã đặt lịch khám bệnh online trên Hỏi Dân It</p>
<p>Thông tin đặt lịch khám bệnh: </p>
<h4><b>Thời gian: ${dataSend.time}</b></h4>
<h4><b>Bác sĩ: ${dataSend.doctorName}</b></h4>

<p>Nếu các thông trên là đúng sự thật vui lòng clich vào đường link bên dưới để xác nhận và hoàng tất thủ tục đặt lịch khám bệnh</p>
<div>
<a href="${dataSend.redirectLink}" target="black">Click here</a></div>
<div>Xin chân thành cảm ơn</div>
`;
  }
  if (dataSend.language === "en") {
    result = `<H3>Dear ${dataSend.patientName}</H3>
<p>If you receive an email, you have booked an online medical examination appointment on Ask Dan It
</p>
<p>Information for scheduling medical examination:
</p>
<h4><b>Time: ${dataSend.time}</b></h4>
<h4><b>Doctor: ${dataSend.doctorName}</b></h4>

<p>If the above information is true, please click on the link below to confirm and complete the procedure to schedule a medical examination.
</p>
<div>
<a href="${dataSend.redirectLink}" target="black">Click here</a></div>
<div>Sincerely thank!
</div>
`;
  }
  return result;
};
module.exports = {
  sendSimpleEmail: sendSimpleEmail,
};
