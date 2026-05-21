interface EmailParams {
  name: string;
  email: string;
  message: string;
  destination?: string;
  subject?: string;
}

export async function sendEmail({ name, email, message, destination, subject }: EmailParams) {
  console.log("SUCCESS: Form submission received!");
  console.log("Submission Details:", {
    name,
    email,
    message,
    destination,
    subject: subject || 'New Inquiry'
  });
  return true;
}
