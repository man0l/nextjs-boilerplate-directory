import * as React from 'react';

interface EmailTemplateProps {
  email: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  email,
}) => (
  <div>
    <h1>Welcome to Best AI Tools!</h1>
    <p>Thank you for subscribing with {email}.</p>
    <p>You'll now receive updates about the latest AI tools and trends.</p>
  </div>
); 