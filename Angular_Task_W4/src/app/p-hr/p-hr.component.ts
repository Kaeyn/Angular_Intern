import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Category } from '../app-model/Category';
import { SubCategory } from '../app-model/SubCategory';
import { Subscription } from 'rxjs';
import { ModuleService } from '../services/module.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PSidebarComponent } from '../p-sidebar/p-sidebar.component';

@Component({
  selector: 'app-p-hr',
  templateUrl: './p-hr.component.html',
  styleUrl: './p-hr.component.scss'
})
export class PHrComponent implements OnInit, OnDestroy{
  categories: Category[] = [];
  subscriptions : Subscription[] = [];

  @ViewChild(PSidebarComponent) sidebarComponent!: PSidebarComponent;
  constructor(private moduleService : ModuleService, private router:Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.getCategories()
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe()
    });
  }

  getCategories(): void {
    this.subscriptions.push(this.moduleService.categories$.subscribe(data => {     
      this.categories = data;
    }));
    
  }


}
