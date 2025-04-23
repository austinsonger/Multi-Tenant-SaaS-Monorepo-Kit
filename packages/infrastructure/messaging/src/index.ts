import { Resend } from 'resend';

// Email template interface
export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
}

// Email message interface
export interface EmailMessage {
  to: string;
  from: string;
  subject: string;
  html: string;
  text?: string;
  cc?: string[];
  bcc?: string[];
}

// Email service interface
export interface EmailService {
  sendEmail(message: EmailMessage): Promise<boolean>;
  getTemplate(templateId: string): Promise<EmailTemplate | null>;
  sendTemplateEmail(
    templateId: string,
    to: string,
    data: Record<string, any>
  ): Promise<boolean>;
}

// Resend email service implementation
export class ResendEmailService implements EmailService {
  private client: Resend;
  private templates: Map<string, EmailTemplate>;
  private defaultFromEmail: string;

  constructor(apiKey: string, defaultFromEmail: string = 'noreply@example.com') {
    // In a real implementation, we would use the provided API key
    // For now, we'll create a client without a real key
    this.client = new Resend('re_123456789');
    this.defaultFromEmail = defaultFromEmail;
    
    // Initialize with some demo templates
    this.templates = new Map<string, EmailTemplate>();
    this.templates.set('welcome', {
      id: 'welcome',
      name: 'Welcome Email',
      subject: 'Welcome to the platform!',
      body: '<h1>Welcome!</h1><p>Thank you for joining our platform, {{name}}!</p>',
    });
    this.templates.set('password-reset', {
      id: 'password-reset',
      name: 'Password Reset',
      subject: 'Reset your password',
      body: '<h1>Password Reset</h1><p>Click the link below to reset your password:</p><p><a href="{{resetLink}}">Reset Password</a></p>',
    });
  }

  async sendEmail(message: EmailMessage): Promise<boolean> {
    try {
      // In a real implementation, we would send the email via Resend
      console.log(`Sending email to ${message.to}`, message);
      
      /*
      await this.client.emails.send({
        from: message.from || this.defaultFromEmail,
        to: message.to,
        subject: message.subject,
        html: message.html,
        text: message.text,
        cc: message.cc,
        bcc: message.bcc,
      });
      */
      
      return true;
    } catch (error) {
      console.error('Failed to send email:', error);
      return false;
    }
  }

  async getTemplate(templateId: string): Promise<EmailTemplate | null> {
    return this.templates.get(templateId) || null;
  }

  async sendTemplateEmail(
    templateId: string,
    to: string,
    data: Record<string, any>
  ): Promise<boolean> {
    const template = await this.getTemplate(templateId);
    
    if (!template) {
      throw new Error(`Template with id ${templateId} not found`);
    }
    
    // Replace template variables
    let html = template.body;
    for (const [key, value] of Object.entries(data)) {
      html = html.replace(new RegExp(`{{${key}}}`, 'g'), String(value));
    }
    
    return this.sendEmail({
      to,
      from: this.defaultFromEmail,
      subject: template.subject,
      html,
    });
  }
}

// Mock email service implementation for testing
export class MockEmailService implements EmailService {
  private templates: Map<string, EmailTemplate>;
  
  constructor() {
    this.templates = new Map<string, EmailTemplate>();
    this.templates.set('welcome', {
      id: 'welcome',
      name: 'Welcome Email',
      subject: 'Welcome to the platform!',
      body: '<h1>Welcome!</h1><p>Thank you for joining our platform, {{name}}!</p>',
    });
  }

  async sendEmail(_message: EmailMessage): Promise<boolean> {
    // For testing, always return success
    return true;
  }

  async getTemplate(templateId: string): Promise<EmailTemplate | null> {
    return this.templates.get(templateId) || null;
  }

  async sendTemplateEmail(
    templateId: string,
    _to: string,
    _data: Record<string, any>
  ): Promise<boolean> {
    // Verify template exists
    const template = await this.getTemplate(templateId);
    
    if (!template) {
      throw new Error(`Template with id ${templateId} not found`);
    }
    
    // For testing, always return success
    return true;
  }
}

// Factory function to create an email service
export function createEmailService(
  type: 'resend' | 'mock' = 'mock',
  options?: { apiKey?: string; defaultFromEmail?: string }
): EmailService {
  if (type === 'resend' && options?.apiKey) {
    return new ResendEmailService(options.apiKey, options.defaultFromEmail);
  }
  
  return new MockEmailService();
}