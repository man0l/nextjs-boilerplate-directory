import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@yourdomain.com';

export async function POST(request: Request) {
  try {
    const toolData = await request.json();

    if (!resend) {
      console.warn('Resend API key not configured. Skipping email send.');
      return Response.json({ success: true, message: 'Tool submission recorded (email notification disabled)' });
    }

    // Send email to admin
    await resend.emails.send({
      from: 'Best AI Tools <notifications@yourdomain.com>',
      to: ADMIN_EMAIL,
      subject: 'New AI Tool Submission',
      html: `
        <h2>New Tool Submission</h2>
        <p><strong>Name:</strong> ${toolData.title}</p>
        <p><strong>URL:</strong> ${toolData.url}</p>
        <p><strong>Description:</strong> ${toolData.description}</p>
        <p><strong>Category:</strong> ${toolData.category}</p>
        <p><strong>Logo URL:</strong> ${toolData.imageUrl}</p>
        <p><strong>Tags:</strong> ${toolData.tags}</p>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Submission error:', error);
    return Response.json({ error: 'Submission failed' }, { status: 500 });
  }
}