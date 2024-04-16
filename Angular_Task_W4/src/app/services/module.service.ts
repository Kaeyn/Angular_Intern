import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from '../app-model/Category';
import { HttpClient } from '@angular/common/http';
import { NavigationEnd, Router } from '@angular/router';
import { Module } from '../app-model/Module';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private modulesSubject = new BehaviorSubject<Module[]>([]);
  modules$: Observable<Module[]> = this.modulesSubject.asObservable();

  private categoriesSubject = new BehaviorSubject<Category[]>([]);
  categories$: Observable<Category[]> = this.categoriesSubject.asObservable();

  private modulesURL = 'http://localhost:3200/modules';
  private categoriesURL = 'http://localhost:3200/categories';

  constructor(private http: HttpClient, private router: Router) {
    this.getModules();
    router.events.subscribe((event) =>{
      if(event instanceof NavigationEnd){
        const segments: string[] = event.url.split('/');
        this.getModuleCategory(segments[1])
      }
    })
    
  }

  getModules(): void{
    this.http.get<Module[]>(this.modulesURL).subscribe(data => this.modulesSubject.next(data));
  }

  getModuleCategory(modulePath : string) : void{
    this.http.get<Category[]>(this.categoriesURL).subscribe(data => this.categoriesSubject.next(data));
  }

}
