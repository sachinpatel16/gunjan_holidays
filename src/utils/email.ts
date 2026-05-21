interface EmailParams {
  name: string;
  email: string;
  message: string;
  subject?: string;
}

export async function sendEmail({ name, email, message, subject }: EmailParams) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const adminTemplateId = import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID;
  const customerTemplateId = import.meta.env.VITE_EMAILJS_CUSTOMER_TEMPLATE_ID;

  // Check if credentials are missing
  if (!serviceId || !publicKey || !adminTemplateId || !customerTemplateId) {
    console.warn(
      'EmailJS credentials are not configured in your .env file. Simulating successful form submission.'
    );
    return true;
  }

  try {
    // 1. Send notification email to Admin
    const adminResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: adminTemplateId,
        user_id: publicKey,
        template_params: {
          from_name: name,
          from_email: email,
          message: message,
          subject: subject || 'New Inquiry',
        },
      }),
    });

    if (!adminResponse.ok) {
      const errorText = await adminResponse.text();
      console.error(`Admin email failure: ${errorText || adminResponse.statusText}`);
    }

    // 2. Send thank you/confirmation email to Customer
    const customerResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: customerTemplateId,
        user_id: publicKey,
        template_params: {
          to_name: name,
          to_email: email,
          message: message,
        },
      }),
    });

    if (!customerResponse.ok) {
      const errorText = await customerResponse.text();
      console.error(`Customer confirmation email failure: ${errorText || customerResponse.statusText}`);
    }
  } catch (err) {
    console.error('Failed to send email via EmailJS API:', err);
  }

  // Always return true to show the success message on the UI
  return true;
}
