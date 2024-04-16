import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'Angular_Task';

  constructor(private router : Router){}

  ngOnInit(): void {
    if (this.router.url === '/') {
      // If the current URL is just the base URL, navigate to '/HR'
      this.router.navigate(['/HR']);
    }
  }
}
