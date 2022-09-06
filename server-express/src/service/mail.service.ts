import nodemailer, { TransportOptions } from 'nodemailer'

class MailService {
  private static instance = new MailService()
  private transporter
  private host = process.env.SMTP_HOST
  private port = process.env.SMTP_PORT
  private user = process.env.SMTP_USER
  private pass = process.env.SMTP_PASS
  private urlSite = process.env.CLIENT_URL_PRODUCTION

  static getInstance (): MailService {
    if (!MailService.instance) {
      MailService.instance = new MailService()
    }
    return MailService.instance
  }

  constructor () {
    this.transporter = nodemailer.createTransport({
      host: this.host,
      port: this.port,
      secure: false,
      auth: {
        user: this.user,
        pass: this.pass
      }
    } as TransportOptions)
  }

  async sendActivationMail (to: string, link: string) {
    await this.transporter.sendMail({
      from: this.user,
      to,
      subject: 'Активация аккаунта на ' + this.urlSite,
      text: '',
      html:
        `
        <div>
        <div style="text-align: center;">
        <h2>
        Для активации аккаунта
        перейдите по
        <a href="${this.urlSite}/activate/${link}" target="_blank">ссылке</a>
        </h2>
        </div>
        </div>
        `
    })
  }
}

export default MailService.getInstance()
