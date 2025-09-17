import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmailJSContactFormComponent } from '../emailjs-contact-form/emailjs-contact-form';
// ...existing code...
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, EmailJSContactFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Tín Phát Software');
}
