import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-p-blank',
  templateUrl: './p-blank.component.html',
  styleUrl: './p-blank.component.scss'
})
export class PBlankComponent implements OnDestroy{

  constructor(private router : Router){}
  ngOnDestroy(): void {
    this.router.navigateByUrl("/HR")
  }
}
