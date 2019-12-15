import { Injectable } from '@nestjs/common';
import ImapClient from 'emailjs-imap-client'


@Injectable()
export class ImapClientService {

    client: any;

    constructor() {}

    public connectClient(): Promise<any> {
        const config = {
            imap: {
                host: 'imap.gmail.com',
                port: 993,
                options: {
                  auth: {
                    user: 'mail',
                    pass: 'pass'
                  },
                  requireTLS: true
                }
              }
        };

        this.client = new ImapClient(config.imap.host, config.imap.port, config.imap.options)

        return new Promise((resolve, reject) => {
            this.client.onerror = (error) => {
                reject({connected: true, error: error})
            }
            this.client.connect().then(() => {
                resolve({connected: true})
            });  
        })
        
        
    }


    public async getInboxBoxByfields() {
        let arra = [];
        await this.client.search('INBOX',{unseen: true}, {byUid: true}).then((result) => {
            result.forEach((uid) => {
                console.log('Message ' + uid + ' is unread')
                arra.push(uid)
                
            });
           // return result;
        });
        return arra;
    }

    public async getInboxBox(pageSize?: number) {
        return this.client.listMessages('INBOX', '*', ['uid' ,'flags', 'envelope','body.peek[]'], {byUid: true}).then((messages) => {
            console.log(messages)
            let latestMail = messages[0].uid
            if (pageSize) {
                let page = latestMail - pageSize
                return this.client.listMessages('INBOX', page +':*', ['uid' ,'flags', 'envelope','body.peek[]'], {byUid: true}).then((messages) => {
                    return messages.sort(function(a, b){return b.uid - a.uid});
                    //return messages
                 });
            }else {
                let page = latestMail - 20
                return this.client.listMessages('INBOX', page + ':*', ['uid' ,'flags', 'envelope','body.peek[]'], {byUid: true}).then((messages) => {
                    return messages.sort(function(a, b){return b.uid - a.uid});
                    //return messages
                 });
            }
        });

        
    }

    public getMailDetail() {
        this.client.listMessages('INBOX', '1:10', ['uid', 'flags', 'body[]']).then((messages) => {
            messages.forEach((message) => console.log('Flags for ' + message.uid + ': ' + message.flags.join(', ')));
        });
    }

    public markAsSeen(uid: string) {
        this.client.setFlags('INBOX', uid, {set: ['\\Seen']}, {byUid: true}).then((messages) => { 
            console.log('marked')
            return {marked: true}
        })
    }
}
