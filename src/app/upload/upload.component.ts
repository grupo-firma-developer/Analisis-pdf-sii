import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-upload',
  imports: [CommonModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {
  selectedFile: File | null = null;
  uploadedFile: string | null = null;
  excelFile: string | null = null;
  pdfFile: string | null = null;
  downloadUrl: string = '';

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (!this.selectedFile) return;
    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post<{ mensaje: string; nombre: string }>('http://127.0.0.1:8000/subir_pdf/', formData)
      .subscribe(response => {
        this.uploadedFile = response.nombre;
      });
  }

  processFile() {
    if (!this.uploadedFile) return;
    this.http.get<{ mensaje: string; archivo_excel: string }>(`http://127.0.0.1:8000/procesar_pdf/${this.uploadedFile}`)
      .subscribe(response => {
        this.excelFile = response.archivo_excel;
        this.downloadUrl = `http://127.0.0.1:8000/descargar_excel/${this.excelFile}`;
        this.pdfFile = this.excelFile.replace('.xlsx', '.pdf');
      });
  }
  downloadPdf() {
    if (!this.excelFile) return;
  
    const pdfUrl = `http://127.0.0.1:8000/descargar_pdf/${this.excelFile}`;
    window.open(pdfUrl, '_blank');
  }
  /*
  reloadPage() {
    setTimeout(() => {
      window.location.reload();
    }, 4000); 
  }*/
}

