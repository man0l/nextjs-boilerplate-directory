import { Resend } from 'resend';
import { EmailTemplate } from '../../../components/email-template';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    const data = await resend.emails.send({
      from: 'Best AI Tools <newsletter@yourdomain.com>',
      to: email,
      subject: 'Welcome to Best AI Tools Newsletter!',
      react: EmailTemplate({ email }),
    });

    return Response.json({ success: true, data });
  } catch (error) {
    return Response.json({ error });
  }
}