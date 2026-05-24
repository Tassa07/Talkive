import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.page.html',
  styleUrls: ['./practice.page.scss'],
  standalone: false,
})
export class PracticePage implements OnInit {

  // Data topik latihan tambahan
  topics = [
    { title: 'Introduce Yourself', desc: 'Practice how to introduce yourself fluently.' },
    { title: 'Daily Routine', desc: 'Talk about what you do from morning to night.' },
    { title: 'My Hobby', desc: 'Share why you love your favorite activities.' },
    { title: 'Dream Job', desc: 'Describe your future career and ambitions.' },
    { title: 'Travel Experience', desc: 'Recall your favorite trip and what made it special.' },
    { title: 'Tech Trends', desc: 'Discuss how technology is changing our daily lives.' },
    { title: 'Healthy Lifestyle', desc: 'Talk about your habits for staying fit and mindful.' },
    { title: 'Future Plans', desc: 'Share your goals for the next five years.' },
    { title: 'Giving Opinions', desc: 'Practice how to agree or disagree on popular topics.' },
    { title: 'Ordering Food', desc: 'Simulate a conversation in a restaurant or cafe.' }
  ];

  constructor(private router: Router) {}

  ngOnInit() {}

  // Navigasi ke halaman Record sambil membawa data topik
  goToRecord(topic: any) {
    this.router.navigate(['/record'], {
      queryParams: { topic: topic.title }
    });
  }

}