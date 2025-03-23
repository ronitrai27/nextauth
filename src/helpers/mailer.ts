import user from "@/models/userModal";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";

export const sendEmail =  async({email, emailType, userId}:any) => {
    try {
     const hashedToken =  await bcryptjs.hash(userId.toString(),10)

      if (emailType === "VERIFY") {
        await user.findByIdAndUpdate(userId, {
          $set: {
            verifyToken : hashedToken, verifyTokenExpiry: Date.now() + 3600000
          }
        
        })
      } else if(emailType === "Reset"){
        await user.findByIdAndUpdate(userId, {
          $set: {
            forgotPasswordToken : hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000
          }
       
        })
      }


      const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "64ec9c3b1530e5",
          pass: "7657876d9ec904"
        }
      });

          const mailOptions = {
            from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', 
            to: email, 
            subject: emailType === 'VERIFY' ? "Verify Your Email" : "Rest Your Password", 
            // text: "Hello world?", 
            html: `<p>Click  <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">HERE</a> to ${emailType === "VERIFY" ? "Verify you email": "Reset Your Password"}
            or copy and paste the link below in your browser 
            <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`, 
          }

         const mailResponse =  await transport.sendMail(mailOptions)
         return mailResponse
        
    } catch (error:any) {
        throw new Error(error.message)
    }
}