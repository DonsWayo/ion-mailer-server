export interface Mail {
    smtp: string;
    host: string;
    user: string, 
    pass: string,
    tls: boolean,
    requireTLS: boolean,
    port: number,
    secure: boolean,
    to: string;
    subject: string,
    text: string  
}