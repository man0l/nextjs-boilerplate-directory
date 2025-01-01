import { Resend } from 'resend';
import { EmailTemplate } from '../../../components/email-template';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!resend) {
      console.warn('Resend API key not configured. Skipping email send.');
      return Response.json({ success: true, message: 'Email subscription recorded (email sending disabled)' });
    }

    const data = await resend.emails.send({
      from: 'Best AI Tools <newsletter@yourdomain.com>',
      to: email,
      subject: 'Welcome to Best AI Tools Newsletter!',
      react: EmailTemplate({ email }),
    });

    return Response.json({ success: true, data });
  } catch (error) {
    console.error('Error in subscribe route:', error);
    return Response.json({ error: 'Failed to process subscription' });
  }
}