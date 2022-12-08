import nodemailer from "nodemailer";
import { buildSendMail } from "mailing-core";

import { htmlToText } from 'html-to-text'

export const emailHtmlToText = (html: string) => {
  return htmlToText(html, {
    whitespaceCharacters: ' \t\r\n\f\u200b\u200A\u00A0\u202f',
    selectors: [
      { selector: 'img', format: 'skip' },
      { selector: 'div[style*="display:none"i]', format: 'skip' },
      { selector: '[data-table]', format: 'dataTable' },
    ],
  })
}

const transport = nodemailer.createTransport({
  pool: true,
  host: "smtp.example.com",
  port: 465,
  secure: true, // use TLS
  auth: {
    user: "username",
    pass: "password",
  },
});

const sendMail = buildSendMail({
  transport,
  defaultFrom: "replace@me.with.your.com",
  configPath: "./mailing.config.json",
});

export default sendMail;
