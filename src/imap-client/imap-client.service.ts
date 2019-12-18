import { Injectable } from '@nestjs/common';
import ImapClient from 'emailjs-imap-client'
import {ImapUser} from './imap.model';

@Injectable()
export class ImapClientService {

    client: any[];

    constructor() {}

    public connectClient(imapUser: ImapUser): Promise<any> {
        const config = {
            imap: {
                host: imapUser.host,
                port: imapUser.port,
                options: {
                  auth: {
                    user: imapUser.user,
                    pass: imapUser.pass
                  },
                  requireTLS: imapUser.requireTLS
                }
              }
        };

        this.client[imapUser.user] = new ImapClient(config.imap.host, config.imap.port, config.imap.options)

        return new Promise((resolve, reject) => {
            this.client[imapUser.user].onerror = (error) => {
                console.log("client " + imapUser.user + "disconnected")
                reject({connected: true, error: error})
            }
            this.client[imapUser.user].connect().then(() => {
                resolve({connected: true})
            });  
        })
        
        
    }


    public async getInboxBoxByfields(user: string) {
        let arra = [];
        await this.client[user].search('INBOX',{unseen: true}, {byUid: true}).then((result) => {
            result.forEach((uid) => {
                console.log('Message ' + uid + ' is unread')
                arra.push(uid)
                
            });
        });
        return arra;
    }

    public async getInboxBox(user: string ,pageSize?: number) {
        return this.client[user].listMessages('INBOX', '*', ['uid' ,'flags', 'envelope','body.peek[]'], {byUid: true}).then((messages) => {
            console.log(messages)
            let latestMail = messages[0].uid
            if (pageSize) {
                let page = latestMail - pageSize
                return this.client[user].listMessages('INBOX', page +':*', ['uid' ,'flags', 'envelope','body.peek[]'], {byUid: true}).then((messages) => {
                    return messages.sort(function(a, b){return b.uid - a.uid});
                 });
            }else {
                let page = latestMail - 20
                return this.client[user].listMessages('INBOX', page + ':*', ['uid' ,'flags', 'envelope','body.peek[]'], {byUid: true}).then((messages) => {
                    return messages.sort(function(a, b){return b.uid - a.uid});
                 });
            }
        });

        
    }

    public getMailBoxes(user:string) {
        try {
            this.client[user].listMailboxes().then((mailboxes) => { 
                return mailboxes
            })
        } catch (error) {
            return { error: error}
        }
    }

    public getMailDetail(user:string) {
        try {
            this.client[user].listMessages('INBOX', '1:10', ['uid', 'flags', 'body[]']).then((messages) => {
                messages.forEach((message) => console.log('Flags for ' + message.uid + ': ' + message.flags.join(', ')));
            });
        } catch (error) {
            return { error: error}
        }
    }

    public markAsSeen(uid: string, user:string) {
        try {
            this.client[user].setFlags('INBOX', uid, {set: ['\\Seen']}, {byUid: true}).then((messages) => { 
                console.log('marked')
                return {marked: true}
            })
        } catch (error) {
            return {error: error}
        }
    }
}
