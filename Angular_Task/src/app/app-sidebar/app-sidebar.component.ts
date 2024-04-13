import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Category } from '../app-model/Category';
import { SubCategory } from '../app-model/SubCategory';
import { ModuleService } from '../module.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './app-sidebar.component.html',
  styleUrl: './app-sidebar.component.scss'
})
export class AppSidebarComponent implements OnInit, OnChanges{
  @Input() moduleCode? : number;
  categories : Category[] = [];
  subCategories: SubCategory[] = [];

  //Default selected category will be 0
  expandedCategory : number[] = [];
  selectedCategory : number = 0;
  selectedSubCategory : number = 0;


  constructor(private moduleService:ModuleService, private router: Router, private route : ActivatedRoute){  }

  ngOnInit(): void {
    // Get current URL
    const currentUrl: string = this.router.url;
    // Extract the current path segment
    const segments: string[] = currentUrl.split('/');
    const currentPath: string = segments[segments.length - 1];
    this.getCategories(currentPath);
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }


  getCategories(modulePath : string) : void{
    
    this.moduleService.getModuleCategory(modulePath).subscribe(data => this.categories = data);
  }


  selectCategory(categoryCode : number) : void{
    const isExpanded = this.expandedCategory.indexOf(categoryCode);
    if(isExpanded === -1){
      this.expandedCategory.push(categoryCode);
    }else{
      this.expandedCategory.splice(isExpanded, 1);
    }

  }

  selectSubCategory(categoryCode : number, subCategoryCode : number, subCategoryPath : string, categoryPath: string) : void{
    this.selectedCategory = categoryCode;
    this.selectedSubCategory = subCategoryCode;
    this.router.navigate([categoryPath + '/' + subCategoryPath], {relativeTo: this.route})
  }

}
