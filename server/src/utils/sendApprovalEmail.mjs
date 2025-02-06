import nodemailer from "nodemailer";

export const sendApprovalEmail = async (recipients, taskTitle) => {
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "441866e2fcc4b7",
      pass: "8b4037c2f01159",
    },
  });

  const mailOptions = {
    from: "noreply@multiuser.com",
    to: recipients.join(", "),
    subject: "Task Fully Approved",
    text: `The task "${taskTitle}" has been fully approved by all required users.`,
  };

  await transporter.sendMail(mailOptions);
};
