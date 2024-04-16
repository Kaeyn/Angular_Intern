import { Injectable } from '@angular/core';
import { Module } from './app-model/Module';
import { HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Category } from './app-model/Category';
import { SubCategory } from './app-model/SubCategory';
import { DTOApi } from './app-model/DTOApi';
@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  private modulesSubject = new BehaviorSubject<Module[]>([]);
  modules$: Observable<Module[]> = this.modulesSubject.asObservable();

  private modulesURL = 'http://localhost:3200/modules';
  private categoriesURL = 'http://localhost:3200/categories';
  private subcategoriesURL = 'http://localhost:3200/subcategories';

  constructor(private http:HttpClient) {}

  getModules(): Observable<Module[]>{
    return this.http.get<DTOApi>(this.modulesURL).pipe(
      map(api => api.data as Module[])
    );
  }

  getModuleCategory(modulePath : string): Observable<Category[]>{
    // return this.http.get<Category[]>(this.categoriesURL).pipe(   
    //   map(categories => categories.filter(category => category.modulePath === modulePath))
    // );
    return new Observable<Category[]>;
  }

  getSubCategoryByCategoryCode(categoryCode : number): Observable<SubCategory[]>{
    // return this.http.get<SubCategory[]>(this.subcategoriesURL).pipe(
    //   map(subcategories => subcategories.filter(subcategory => subcategory.categoryCode === categoryCode))
    // );
    return new Observable<SubCategory[]>;
  }
  
}
