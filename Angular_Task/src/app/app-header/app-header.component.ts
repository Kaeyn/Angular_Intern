import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ModuleService } from '../module.service';
import { Observable, Subscription } from 'rxjs';
import { Module } from '../app-model/Module';
@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss'
})
export class AppHeaderComponent implements OnInit, OnDestroy{
  selectedModule : number = 7;
  modules : Module[] = [];
  subscriptions : Subscription[] = [];
   
  constructor(private moduleService:ModuleService){}

  ngOnInit(): void {
    this.getModules();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getModules():void{
    this.subscriptions.push(this.moduleService.getModules().subscribe(data => this.modules = data));
  }

  selectModule(moduleCode : number){
    this.selectedModule = moduleCode;
  }

}
