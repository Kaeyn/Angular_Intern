import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ModuleService } from '../services/module.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SubCategory } from '../app-model/SubCategory';
import { Category } from '../app-model/Category';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-p-sidebar',
  templateUrl: './p-sidebar.component.html',
  styleUrl: './p-sidebar.component.scss'
})
export class PSidebarComponent{
  @Input() categories: Category[] = [];

  //Default selected category will be 0
  expandedCategory: number[] = [0];
  selectedCategory: number = 0;
  selectedSubCategory: number = 0;

  constructor(private moduleService: ModuleService, private router: Router, private route: ActivatedRoute) {}

  selectCategory(categoryCode: number): void {
    const isExpanded = this.expandedCategory.indexOf(categoryCode);
    if (isExpanded === -1) {
      this.expandedCategory.push(categoryCode);
    } else {
      this.expandedCategory.splice(isExpanded, 1);
    }
  }

  // Select a child of a category in module
  selectSubCategory(categoryCode: number, subCategoryCode: number, subCategoryPath: string, categoryPath: string): void {
    this.selectedCategory = categoryCode;
    this.selectedSubCategory = subCategoryCode;
    this.router.navigate([subCategoryPath], { relativeTo: this.route })
  }
}
