import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { sendAdminNotification, EmailRequest, EmailResponse } from '../api/email-api';

export interface EmailData {
  to_email: string;
  from_name: string;
  from_email: string;
  phone: string;
  service: string;
  message: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = '/api/send-email';

  constructor(private http: HttpClient) {}

  sendContactEmail(emailData: EmailData): Observable<any> {
    return this.http.post(this.apiUrl, emailData);
  }

  // Phương thức gửi email thông báo đến admin
  async sendContactNotification(emailData: EmailData): Promise<EmailResponse> {
    const requestData: EmailRequest = {
      to_email: emailData.to_email,
      from_name: emailData.from_name,
      from_email: emailData.from_email,
      phone: emailData.phone,
      service: emailData.service,
      message: emailData.message,
      timestamp: emailData.timestamp
    };
    
    return await sendAdminNotification(requestData);
  }

  // Phương thức dự phòng sử dụng EmailJS
  async sendEmailWithEmailJS(emailData: EmailData): Promise<void> {
    // Cấu hình EmailJS
    const serviceId = 'YOUR_SERVICE_ID'; // Thay bằng Service ID của bạn
    const templateId = 'YOUR_TEMPLATE_ID'; // Thay bằng Template ID của bạn
    const publicKey = 'YOUR_PUBLIC_KEY'; // Thay bằng Public Key của bạn

    const templateParams = {
      to_email: emailData.to_email,
      from_name: emailData.from_name,
      from_email: emailData.from_email,
      phone: emailData.phone,
      service: emailData.service,
      message: emailData.message,
      timestamp: emailData.timestamp
    };

    try {
      // Load EmailJS library nếu chưa có
      if (typeof (window as any).emailjs === 'undefined') {
        await this.loadEmailJSLibrary();
      }

      // Gửi email
      const response = await (window as any).emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      console.log('Email sent successfully:', response);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }

  private loadEmailJSLibrary(): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
      script.onload = () => {
        (window as any).emailjs.init('YOUR_PUBLIC_KEY');
        resolve();
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // Phương thức gửi email đơn giản (không cần EmailJS)
  async sendSimpleEmail(emailData: EmailData): Promise<void> {
    const mailtoLink = `mailto:${emailData.to_email}?subject=Liên hệ từ ${emailData.from_name}&body=Thông tin liên hệ:%0D%0A%0D%0ATên: ${emailData.from_name}%0D%0AEmail: ${emailData.from_email}%0D%0AĐiện thoại: ${emailData.phone}%0D%0ADịch vụ quan tâm: ${emailData.service}%0D%0A%0D%0ANội dung:%0D%0A${emailData.message}%0D%0A%0D%0AThời gian: ${emailData.timestamp}`;
    
    window.open(mailtoLink, '_blank');
  }
}
