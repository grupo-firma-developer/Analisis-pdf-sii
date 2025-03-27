import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UploadComponent } from './upload/upload.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UploadComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontpdf';
}
