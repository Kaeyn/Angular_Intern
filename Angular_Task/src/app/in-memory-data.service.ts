import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Module } from './app-model/Module';
import { Category } from './app-model/Category';
import { SubCategory } from './app-model/SubCategory';
@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const modules: Module[] = [
      {
        "id": "M.001",
        "code": 0,
        "name": "------------",
        "path" : ""
      },
      {
        "id": "M.002",
        "code": 1,
        "name": "------------",
        "path" : ""
      },
      {
        "id": "M.003",
        "code": 2,
        "name": "------------",
        "path" : ""
      },
      {
        "id": "M.004",
        "code": 3,
        "name": "------------",
        "path" : ""
      },
      {
        "id": "M.005",
        "code": 4,
        "name": "------------",
        "path" : ""
      },
      {
        "id": "M.006",
        "code": 5,
        "name": "------------",
        "path" : ""
      },
      {
        "id": "M.007",
        "code": 6,
        "name": "------------",
        "path" : ""
      },
      {
        "id": "M.008",
        "code": 7,
        "name": "NHÂN SỰ",
        "path" : "HR"
      }
    ]

    const categories : Category[] = [
      {
        "id" : "C.001",
        "code": 0,
        "moduleCode": 7,
        "name" : "ĐÁNH GIÁ NHÂN SỰ",
        "icon" : "fa-solid fa-list-check",
        "path" : "hr-evaluation",
        "modulePath" : "HR",
        "subCategory" : [
          {
            "id" : "SC.001",
            "code": 0,
            "categoryCode" : 0,
            "name" : "Ngân hàng câu hỏi",
            "path" : "question-bank",
            "categoryPath" : 'hr-evaluation',
            "icon" : "fa-solid fa-question",
          }
        ]
      },
      {
        "id" : "C.002",
        "code": 1,
        "moduleCode": 7,
        "name" : "ĐÁNH GIÁ NĂNG LỰC",
        "path" : "competence-evaluation",
        "modulePath" : "HR",
        "icon" : "fa-solid fa-list-check",
        "subCategory" : [
          {
            "id" : "SC.002",
            "code": 1,
            "categoryCode" : 1,
            "name" : "Ngân hàng năng lực",
            "path" : "competence-bank",
            "categoryPath" : 'competence-evaluation',
            "icon" : "fa-solid fa-question",
          }
        ]
      }
    ]
    return {modules, categories};
  }
}
