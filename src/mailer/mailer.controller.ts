import { Controller, Post, Body } from '@nestjs/common';
import { MailerService } from './mailer.service';
import * as nodemailer from 'nodemailer';
import { Mail } from './mailer.model';

@Controller('mailer')
export class MailerController {

    constructor(private mailerService: MailerService){}

    @Post()
    async sendMail(@Body() mail: Mail) {
        console.log(mail)


        let transporter = nodemailer.createTransport({
           host: mail.smtp,
           port: mail.port,
           secure: mail.secure,
           tls: {
             rejectUnauthorized: mail.tls
           },
          requireTLS: mail.requireTLS,
          auth: {
            user: mail.user,
            pass: mail.pass
          }
        });
        
        
      
        transporter.verify((err, success) => {
            if (err) console.error(err);
            console.log('Your config is correct');
        });

        let mailOptions = {
            from: mail.user, 
            to: mail.to, // list of receivers (separated by ,)
            subject: mail.subject, 
            text: mail.text
        };

        const sent = await new Promise<boolean>(async function(resolve, reject) {
            return await transporter.sendMail(mailOptions, async (error, info) => {
                if (error) {      
                  console.log('Message sent: %s', error);
                  return reject(false);
                }
                console.log('Message sent: %s', info.messageId);
                resolve(true);
            });      
          })
        

        return sent;
    }
}
