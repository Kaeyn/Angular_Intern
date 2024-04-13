import { Injectable } from '@angular/core';
import { Module } from './app-model/Module';
import { HttpClient} from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { Category } from './app-model/Category';
import { SubCategory } from './app-model/SubCategory';
@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  private modulesURL = 'api/modules';
  private categoriesURL = 'api/categories';
  private subcategoriesURL = 'api/subcategories';

  constructor(private http:HttpClient) {}

  getModules(): Observable<Module[]>{
    return this.http.get<Module[]>(this.modulesURL);
  }

  getModuleCategory(modulePath : string): Observable<Category[]>{
    return this.http.get<Category[]>(this.categoriesURL).pipe(   
      map(categories => categories.filter(category => category.modulePath === modulePath))
    );
  }

  getSubCategoryByCategoryCode(categoryCode : number): Observable<SubCategory[]>{
    return this.http.get<SubCategory[]>(this.subcategoriesURL).pipe(
      map(subcategories => subcategories.filter(subcategory => subcategory.categoryCode === categoryCode))
    );
  }
  
}
