import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModuleService } from '../module.service';
import { Observable } from 'rxjs';
import { Module } from '../app-model/Module';
@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss'
})
export class AppHeaderComponent implements OnInit{
  selectedModule : number = 7;
  modules : Module[] = [];

  constructor(private moduleService:ModuleService){}

  ngOnInit(): void {
    this.getModules();
  }

  getModules():void{
    this.moduleService.getModules().subscribe(data => this.modules = data);
  }

  selectModule(moduleCode : number){
    this.selectedModule = moduleCode;
  }

}
