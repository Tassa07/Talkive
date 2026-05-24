import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.page.html',
  styleUrls: ['./progress.page.scss'],
  standalone: false,
})
export class ProgressPage implements OnInit {

  history: any[] = [];
  chart: any; // Variabel untuk menyimpan instance chart

  constructor() {}

  ngOnInit() {
    this.loadData();
  }

  // Fungsi untuk mengambil data dari LocalStorage
  loadData() {
    const data = localStorage.getItem('history');
    this.history = data ? JSON.parse(data) : [];

    // Gunakan timeout agar canvas siap sebelum chart di-load
    setTimeout(() => {
      this.loadChart();
    }, 150);
  }

  loadChart() {
    const labels = this.history.map((item, index) => `#${index + 1}`);
    const scores = this.history.map(item => item.score);

    const canvas: any = document.getElementById('progressChart');
    if (!canvas) return;

    // Hancurkan chart lama jika sudah ada (agar tidak tumpang tindih saat update)
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Your Score Progress',
          data: scores,
          borderColor: '#6c63ff', // Warna garis ungu
          backgroundColor: 'rgba(108, 99, 255, 0.1)',
          fill: true,
          borderWidth: 3,
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: '#6c63ff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false } // Sembunyikan label kotak atas agar clean
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            grid: { display: true, color: '#f0f0f0' }
          },
          x: {
            grid: { display: false }
          }
        }
      }
    });
  }

  // FUNGSI HAPUS HISTORY
  deleteHistory(index: number) {
    // 1. Hapus dari array lokal
    this.history.splice(index, 1);

    // 2. Simpan kembali array yang baru ke LocalStorage
    localStorage.setItem('history', JSON.stringify(this.history));

    // 3. Update grafik agar langsung berubah
    this.loadChart();
    
    console.log('Item deleted and chart updated');
  }
}