import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
  standalone: false,
})
export class QuizPage implements OnInit {

  currentIndex = 0;
  score = 0;

  selected = '';
  answered = false;
  isCorrect = false;
  isFinished = false;

  questions = [
    { question: 'Apa yang harus dilakukan saat gugup?', options: ['Bicara cepat', 'Tarik napas', 'Diam'], answer: 'Tarik napas' },
    { question: 'Eye contact penting untuk?', options: ['Gaya', 'Koneksi audience', 'Tidak penting'], answer: 'Koneksi audience' },
    { question: 'Pause saat bicara berguna untuk?', options: ['Cepat selesai', 'Penekanan', 'Tidak ada'], answer: 'Penekanan' },
    { question: 'Postur tubuh yang baik adalah?', options: ['Bungkuk', 'Tegak', 'Santai'], answer: 'Tegak' },
    { question: 'Gesture tangan berfungsi untuk?', options: ['Ganggu', 'Memperjelas', 'Tidak penting'], answer: 'Memperjelas' },

    { question: 'Apa yang harus dihindari saat presentasi?', options: ['Kontak mata', 'Baca teks terus', 'Senyum'], answer: 'Baca teks terus' },
    { question: 'Volume suara harus?', options: ['Pelan', 'Jelas', 'Tidak stabil'], answer: 'Jelas' },
    { question: 'Intonasi penting untuk?', options: ['Variasi suara', 'Cepat selesai', 'Tidak penting'], answer: 'Variasi suara' },
    { question: 'Senyum saat bicara?', options: ['Tidak perlu', 'Penting', 'Mengganggu'], answer: 'Penting' },
    { question: 'Latihan terbaik?', options: ['Tidak latihan', 'Sering latihan', 'Sekali saja'], answer: 'Sering latihan' },

    { question: 'Cara mengatasi blank?', options: ['Panik', 'Pause & napas', 'Diam'], answer: 'Pause & napas' },
    { question: 'Storytelling membuat?', options: ['Bosan', 'Menarik', 'Tidak penting'], answer: 'Menarik' },
    { question: 'Kontak mata terlalu lama?', options: ['Baik', 'Menyeramkan', 'Normal'], answer: 'Menyeramkan' },
    { question: 'Persiapan sebelum tampil?', options: ['Tidak perlu', 'Penting', 'Opsional'], answer: 'Penting' },
    { question: 'Opening yang baik?', options: ['Membosankan', 'Menarik', 'Diam'], answer: 'Menarik' },

    { question: 'Closing speech harus?', options: ['Tidak jelas', 'Kuat', 'Cepat'], answer: 'Kuat' },
    { question: 'Audiens bosan karena?', options: ['Monoton', 'Interaktif', 'Lucu'], answer: 'Monoton' },
    { question: 'Gerakan berlebihan?', options: ['Baik', 'Mengganggu', 'Normal'], answer: 'Mengganggu' },
    { question: 'Nada suara naik turun?', options: ['Membosankan', 'Menarik', 'Tidak penting'], answer: 'Menarik' },
    { question: 'Kontak mata membantu?', options: ['Koneksi', 'Tidak penting', 'Ganggu'], answer: 'Koneksi' },

    { question: 'Percaya diri datang dari?', options: ['Latihan', 'Tidak latihan', 'Menebak'], answer: 'Latihan' },
    { question: 'Pitch suara penting?', options: ['Ya', 'Tidak', 'Opsional'], answer: 'Ya' },
    { question: 'Audience engagement?', options: ['Diam', 'Interaksi', 'Abaikan'], answer: 'Interaksi' },
    { question: 'Public speaking itu?', options: ['Skill', 'Bakat saja', 'Sulit'], answer: 'Skill' },
    { question: 'Improvisasi penting?', options: ['Ya', 'Tidak', 'Jarang'], answer: 'Ya' },

    { question: 'Bicara terlalu cepat?', options: ['Jelas', 'Sulit dipahami', 'Baik'], answer: 'Sulit dipahami' },
    { question: 'Pause terlalu lama?', options: ['Baik', 'Aneh', 'Normal'], answer: 'Aneh' },
    { question: 'Latihan depan kaca?', options: ['Bermanfaat', 'Tidak', 'Aneh'], answer: 'Bermanfaat' },
    { question: 'Ekspresi wajah?', options: ['Penting', 'Tidak', 'Opsional'], answer: 'Penting' },
    { question: 'Gestur natural?', options: ['Baik', 'Tidak', 'Aneh'], answer: 'Baik' },

    { question: 'Overthinking sebelum tampil?', options: ['Membantu', 'Mengganggu', 'Normal'], answer: 'Mengganggu' },
    { question: 'Percaya diri palsu?', options: ['Boleh', 'Tidak efektif', 'Bagus'], answer: 'Tidak efektif' },
    { question: 'Latihan rekam suara?', options: ['Bermanfaat', 'Tidak', 'Aneh'], answer: 'Bermanfaat' },
    { question: 'Kontrol napas?', options: ['Penting', 'Tidak', 'Opsional'], answer: 'Penting' },
    { question: 'Audience fokus jika?', options: ['Menarik', 'Monoton', 'Cepat'], answer: 'Menarik' },

    { question: 'Suara terlalu pelan?', options: ['Jelas', 'Tidak terdengar', 'Baik'], answer: 'Tidak terdengar' },
    { question: 'Humor dalam speech?', options: ['Menarik', 'Tidak boleh', 'Ganggu'], answer: 'Menarik' },
    { question: 'Gerakan tangan?', options: ['Bantu', 'Ganggu', 'Tidak penting'], answer: 'Bantu' },
    { question: 'Konten penting?', options: ['Ya', 'Tidak', 'Opsional'], answer: 'Ya' },
    { question: 'Practice makes?', options: ['Perfect', 'Tidak penting', 'Bingung'], answer: 'Perfect' },

    { question: 'Fokus ke audience?', options: ['Ya', 'Tidak', 'Jarang'], answer: 'Ya' },
    { question: 'Improvement datang dari?', options: ['Latihan', 'Diam', 'Menunggu'], answer: 'Latihan' },
    { question: 'Berhenti mendadak?', options: ['Aneh', 'Baik', 'Normal'], answer: 'Aneh' },
    { question: 'Speech bagus itu?', options: ['Jelas', 'Cepat', 'Panjang'], answer: 'Jelas' },
    { question: 'Skill speaking bisa?', options: ['Dilatih', 'Tidak', 'Sulit'], answer: 'Dilatih' },

    { question: 'Body language?', options: ['Penting', 'Tidak', 'Opsional'], answer: 'Penting' },
    { question: 'Kontak mata?', options: ['Penting', 'Tidak', 'Opsional'], answer: 'Penting' },
    { question: 'Latihan rutin?', options: ['Efektif', 'Tidak', 'Membosankan'], answer: 'Efektif' },
    { question: 'Kepercayaan diri?', options: ['Dilatih', 'Tidak', 'Random'], answer: 'Dilatih' },
    { question: 'Skill speaking?', options: ['Bisa diasah', 'Tidak', 'Sulit'], answer: 'Bisa diasah' }
  ];

  ngOnInit() {
    // 🔀 random soal
    this.questions = this.questions.sort(() => Math.random() - 0.5);
  }

  selectAnswer(option: string) {
    if (this.answered) return;

    this.selected = option;
    this.answered = true;

    if (option === this.questions[this.currentIndex].answer) {
      this.isCorrect = true;
      this.score++;
    } else {
      this.isCorrect = false;
    }
  }

  nextQuestion() {
    this.selected = '';
    this.answered = false;

    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
    } else {
      this.isFinished = true;
      localStorage.setItem('lastScore', this.score.toString());
    }
  }

  restartQuiz() {
    this.currentIndex = 0;
    this.score = 0;
    this.selected = '';
    this.answered = false;
    this.isFinished = false;

    // 🔀 random ulang
    this.questions = this.questions.sort(() => Math.random() - 0.5);
  }
}