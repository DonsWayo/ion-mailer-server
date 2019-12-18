export interface ImapUser {
    host: string,
    user: string, 
    pass: string,
    requireTLS: boolean,
    port: number,  
}