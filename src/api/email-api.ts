// API endpoint giả lập để gửi email
// Trong thực tế, bạn có thể sử dụng các service như:
// - EmailJS
// - SendGrid
// - AWS SES
// - Nodemailer với Node.js backend

export interface EmailRequest {
  to_email: string;
  from_name: string;
  from_email: string;
  phone: string;
  service: string;
  message: string;
  timestamp: string;
}

export interface EmailResponse {
  success: boolean;
  message: string;
  id?: string;
}

// Mock API function
export async function sendEmailAPI(emailData: EmailRequest): Promise<EmailResponse> {
  // Giả lập delay của API
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Log thông tin email để debug
  console.log('Email data received:', emailData);
  
  // Trong thực tế, đây sẽ là nơi gửi email thật
  // Ví dụ với EmailJS:
  /*
  try {
    const response = await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      {
        to_email: emailData.to_email,
        from_name: emailData.from_name,
        from_email: emailData.from_email,
        phone: emailData.phone,
        service: emailData.service,
        message: emailData.message,
        timestamp: emailData.timestamp
      },
      'YOUR_PUBLIC_KEY'
    );
    
    return {
      success: true,
      message: 'Email sent successfully',
      id: response.text
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to send email: ' + error
    };
  }
  */
  
  // Mock response
  return {
    success: true,
    message: 'Email notification sent successfully',
    id: 'mock-' + Date.now()
  };
}

// Hàm gửi email thông báo đến admin
export async function sendAdminNotification(emailData: EmailRequest): Promise<EmailResponse> {
  const adminEmailData: EmailRequest = {
    to_email: 'Hanhthuy.cpa@gmail.com', // Email của bạn
    from_name: 'Tín Phát Website',
    from_email: 'noreply@tinphat.com.vn',
    phone: 'System',
    service: 'New Contact Form Submission',
    message: `
Có khách hàng mới liên hệ qua website:

Thông tin khách hàng:
- Tên: ${emailData.from_name}
- Email: ${emailData.from_email}
- Điện thoại: ${emailData.phone}
- Dịch vụ quan tâm: ${emailData.service}

Nội dung tin nhắn:
${emailData.message}

Thời gian: ${emailData.timestamp}

Vui lòng liên hệ lại khách hàng trong thời gian sớm nhất.
    `,
    timestamp: new Date().toLocaleString('vi-VN')
  };
  
  return await sendEmailAPI(adminEmailData);
}
