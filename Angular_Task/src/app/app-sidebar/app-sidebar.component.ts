import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Category } from '../app-model/Category';
import { SubCategory } from '../app-model/SubCategory';
import { ModuleService } from '../module.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './app-sidebar.component.html',
  styleUrl: './app-sidebar.component.scss'
})
export class AppSidebarComponent implements OnInit, OnChanges, OnDestroy {
  @Input() moduleCode?: number;
  categories: Category[] = [];
  subCategories: SubCategory[] = [];

  //Default selected category will be 0
  expandedCategory: number[] = [0];
  selectedCategory: number = 0;
  selectedSubCategory: number = 0;

  private subscriptions: Subscription[] = [];


  constructor(private moduleService: ModuleService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getDataAndSetDefault();
  }

  // Unsubcribe all subcription on component destroy
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


  ngOnChanges(changes: SimpleChanges): void {
    
  }

  // Get data from API and set default
  getDataAndSetDefault(): void {
    // Get current URL
    const currentUrl: string = this.router.url;
    // Extract the current path segment
    const segments: string[] = currentUrl.split('/');
    const currentPath: string = segments[segments.length - 1];
    
    // Call getCategories and chain the subsequent logic inside the subscription
    this.getCategories(currentPath).subscribe(categories => {
      this.categories = categories;
      if (this.categories && this.categories.length > 0) {
        // Push the first category code to expandedCategory array
        this.expandedCategory.push(this.categories[0].code);
  
        // Check if the first category has subcategories and if it does, select the first subcategory
        if (this.categories[0].subCategory && this.categories[0].subCategory.length > 0) {
          this.selectSubCategory(
            this.categories[0].subCategory[0].categoryCode,
            this.categories[0].subCategory[0].code,
            this.categories[0].subCategory[0].path,
            this.categories[0].subCategory[0].categoryPath
          );
        }
      }
    });
  }
  

  // Fetch categories of a module
  getCategories(modulePath: string): Observable<Category[]> {
    return this.moduleService.getModuleCategory(modulePath);
  }


  //Select a category to expand child of it
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
    this.router.navigate([categoryPath + '/' + subCategoryPath], { relativeTo: this.route })
  }


  
}
