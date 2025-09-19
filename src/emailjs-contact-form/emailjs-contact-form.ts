import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';
@Component({
  selector: 'app-emailjs-contact-form',
  standalone: true,      
  imports: [CommonModule, FormsModule],
  templateUrl: './emailjs-contact-form.html',
  styleUrl: './emailjs-contact-form.css'
})
export class EmailJSContactFormComponent {
  formData = {
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  };

  services = [
    { id: '1c-development', name: 'Phát triển 1C' },
    { id: 'accounting', name: 'Kế toán Quản trị' },
    { id: 'lowcode', name: 'Lowcode Development' },
    { id: 'financial-reports', name: 'Báo cáo Tài chính' },
    { id: 'erp', name: 'ERP Solutions' },
    { id: 'support', name: 'Hỗ trợ & Bảo trì' },
    { id: 'consultation', name: 'Tư vấn' }
  ];

  isSubmitting = false;
  isSuccess = false;
  isError = false;
  submitMessage = '';
  private isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
  async onSubmit() {
    if (!this.formData.name || !this.formData.email || !this.formData.service || !this.formData.message) {
      this.isError = true;
      this.submitMessage = 'Vui lòng điền đầy đủ thông tin!';
      return;
    }
    if (!this.isValidEmail(this.formData.email)) {
    this.isError = true;
    this.submitMessage = 'Email không hợp lệ!';
    return;
  }
    this.isSubmitting = true;
    this.isError = false;
    this.isSuccess = false;
    this.submitMessage = '';

    try {
      await emailjs.send(
        'service_jirdb8h',   // Service ID
        'template_s6a2gyf',  // Template ID
        {
          to_email: 'Hanhthuy.cpa@gmail.com',
          from_name: this.formData.name,
          from_email: this.formData.email,
          phone: this.formData.phone,
          service: this.getServiceName(this.formData.service),
          message: this.formData.message,
          timestamp: new Date().toLocaleString('vi-VN')
        },
        'MoM3FyW9MNlBWtqG4'  // Public Key
      );

      this.isSuccess = true;
      this.submitMessage = 'Email đã được gửi thành công!';
      this.formData = { name: '', email: '', phone: '', service: '', message: '' };

    } catch (error) {
      console.error('EmailJS error:', error);
      this.isError = true;
      this.submitMessage = 'Có lỗi xảy ra khi gửi email. Vui lòng thử lại.';
    } finally {
      this.isSubmitting = false;
    }
  }

  private getServiceName(serviceValue: string): string {
    const servicesMap: { [key: string]: string } = {
      '1c-development': 'Phát triển 1C',
      'accounting': 'Kế toán Quản trị',
      'lowcode': 'Lowcode Development',
      'financial-reports': 'Báo cáo Tài chính',
      'erp': 'ERP Solutions',
      'support': 'Hỗ trợ & Bảo trì',
      'consultation': 'Tư vấn'
    };
    return servicesMap[serviceValue] || serviceValue;
  }
}
