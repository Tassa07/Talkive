import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VoiceRecorder, RecordingData } from 'capacitor-voice-recorder';

@Component({
  selector: 'app-record',
  templateUrl: './record.page.html',
  styleUrls: ['./record.page.scss'],
  standalone: false,
})
export class RecordPage implements OnInit {

  isRecording: boolean = false;
  audioFile: string | null = null;
  selectedTopic: string = 'General Practice';

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    // 📥 Ambil topic dari Practice
    this.route.queryParams.subscribe(params => {
      if (params['topic']) {
        this.selectedTopic = params['topic'];
      }
    });

    // 🎤 Minta izin mic saat pertama masuk
    try {
      const status = await VoiceRecorder.requestAudioRecordingPermission();
      console.log('Permission Status:', status.value);

      if (!status.value) {
        alert('Izin microphone diperlukan untuk rekaman.');
      }
    } catch (e) {
      console.error('Gagal meminta izin', e);
    }
  }

  async startRecording() {
    try {
      // 🔍 Cek device support
      const canRecord = await VoiceRecorder.canDeviceVoiceRecord();
      if (!canRecord.value) {
        alert('Device tidak mendukung perekaman suara.');
        return;
      }

      // ▶️ Mulai rekam
      const result = await VoiceRecorder.startRecording();

      if (result.value) {
        this.isRecording = true;
        console.log('Recording started...');
      }

    } catch (error) {
      console.error('Gagal mulai rekam', error);
      alert('Gagal mengakses microphone.');
    }
  }

  async stopRecording() {
    try {
      const result: RecordingData = await VoiceRecorder.stopRecording();
      this.isRecording = false;

      if (result.value && result.value.recordDataBase64) {

        // 🎧 Convert ke audio
        this.audioFile = `data:audio/aac;base64,${result.value.recordDataBase64}`;

        // 💾 Simpan untuk Result Page
        localStorage.setItem('lastAudio', this.audioFile);

        // 🎯 Generate score random (sementara)
        const randomScore = Math.floor(Math.random() * 21) + 80;

        // 🚀 Pindah ke Result + kirim data
        this.router.navigate(['/result'], {
          queryParams: {
            topic: this.selectedTopic,
            score: randomScore
          }
        });
      }

    } catch (error) {
      console.error('Gagal stop rekam', error);
      this.isRecording = false;
    }
  }

  toggleRecord() {
    if (this.isRecording) {
      this.stopRecording();
    } else {
      this.startRecording();
    }
  }

}