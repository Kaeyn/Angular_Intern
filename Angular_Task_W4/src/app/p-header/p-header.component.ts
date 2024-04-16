import { Component, OnInit } from '@angular/core';
import { ModuleService } from '../services/module.service';
import { Module } from '../app-model/Module';


@Component({
  selector: 'app-p-header',
  templateUrl: './p-header.component.html',
  styleUrl: './p-header.component.scss'
})
export class PHeaderComponent implements OnInit{
  selectedModule : number = 7;
  modules : Module[] = [];
   
  constructor(private moduleService: ModuleService){}

  ngOnInit(): void {
    this.getModules();
  }

  getModules():void{
    this.moduleService.modules$.subscribe(data => this.modules = data);
  }

  selectModule(moduleCode : number){
    this.selectedModule = moduleCode;
  }
}
