import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory storage for MVP (replace with database later)
const submissions: Array<{
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}> = [];

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    // Validation
    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return NextResponse.json(
        { message: 'All fields are required.' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email address.' },
        { status: 400 }
      );
    }

    // Store submission (for MVP, we're storing in memory)
    const submission = {
      id: Date.now().toString(),
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
    };
    submissions.push(submission);

    // TODO: Send email via SendGrid
    // This would be integrated when SendGrid API key is available
    console.log('Contact form submission:', submission);

    // For MVP, we're storing submissions in memory
    // In production, integrate with:
    // 1. Database to persist submissions
    // 2. SendGrid to send confirmation email to user
    // 3. SendGrid to send notification email to admin

    return NextResponse.json(
      { 
        message: 'Message received! We will get back to you soon.',
        id: submission.id 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { message: 'Failed to process your request. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // For development: view submissions (remove in production)
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.json({ submissions });
  }
  return NextResponse.json({ message: 'Not found' }, { status: 404 });
}
