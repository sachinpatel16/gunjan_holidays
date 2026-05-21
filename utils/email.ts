interface EmailParams {
  name: string;
  email: string;
  message: string;
  destination?: string;
  subject?: string;
}

export async function sendEmail({ name, email, message, destination, subject }: EmailParams): Promise<boolean> {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message, destination, subject }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to send inquiry.');
    }

    return true;
  } catch (error: any) {
    console.error('sendEmail client error:', error);
    throw new Error(error.message || 'Something went wrong. Please try again later.');
  }
}
