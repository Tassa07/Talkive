import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
  standalone: false,
})
export class ResultPage implements OnInit {

  score: number = 0;
  topic: string = '';
  feedback: string = 'Great job! Your pronunciation is clear and confident.';
  audioFile: SafeUrl | null = null;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    // 🎧 Ambil audio dari localStorage
    const savedAudio = localStorage.getItem('lastAudio');
    if (savedAudio) {
      this.audioFile = this.sanitizer.bypassSecurityTrustUrl(savedAudio);
    }

    // 📥 Ambil data dari route
    this.route.queryParams.subscribe(params => {
      if (params['topic']) {
        this.topic = params['topic'];
      }

      if (params['score']) {
        this.score = +params['score']; // pastikan number
      }
    });

    // 🔥 SIMPAN KE HISTORY (UNTUK PROGRESS PAGE)
    this.saveToHistory();
  }

  // 💾 SIMPAN DATA KE LOCALSTORAGE
  saveToHistory() {
    const history = JSON.parse(localStorage.getItem('history') || '[]');

    const newData = {
      topic: this.topic,
      score: this.score,
      audio: localStorage.getItem('lastAudio'),
      date: new Date().toLocaleString()
    };

    history.unshift(newData); // masuk paling atas

    localStorage.setItem('history', JSON.stringify(history));
  }

}