import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Module } from './app-model/Module';
import { Category } from './app-model/Category';
import { SubCategory } from './app-model/SubCategory';
import { Question } from './app-model/Question';
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
        "path": ""
      },
      {
        "id": "M.002",
        "code": 1,
        "name": "------------",
        "path": ""
      },
      {
        "id": "M.003",
        "code": 2,
        "name": "------------",
        "path": ""
      },
      {
        "id": "M.004",
        "code": 3,
        "name": "------------",
        "path": ""
      },
      {
        "id": "M.005",
        "code": 4,
        "name": "------------",
        "path": ""
      },
      {
        "id": "M.006",
        "code": 5,
        "name": "------------",
        "path": ""
      },
      {
        "id": "M.007",
        "code": 6,
        "name": "------------",
        "path": ""
      },
      {
        "id": "M.008",
        "code": 7,
        "name": "NHÂN SỰ",
        "path": "HR"
      }
    ]

    const categories: Category[] = [
      {
        "id": "C.001",
        "code": 0,
        "moduleCode": 7,
        "name": "ĐÁNH GIÁ NHÂN SỰ",
        "icon": "fa-solid fa-list-check",
        "path": "hr-evaluation",
        "modulePath": "HR",
        "subCategory": [
          {
            "id": "SC.001",
            "code": 0,
            "categoryCode": 0,
            "name": "Ngân hàng câu hỏi",
            "path": "question-bank",
            "categoryPath": 'hr-evaluation',
            "icon": "fa-solid fa-question",
          }
        ]
      },
      {
        "id": "C.002",
        "code": 1,
        "moduleCode": 7,
        "name": "ĐÁNH GIÁ NĂNG LỰC",
        "path": "competence-evaluation",
        "modulePath": "HR",
        "icon": "fa-solid fa-list-check",
        "subCategory": [
          {
            "id": "SC.002",
            "code": 1,
            "categoryCode": 1,
            "name": "Ngân hàng năng lực",
            "path": "competence-bank",
            "categoryPath": 'competence-evaluation',
            "icon": "fa-solid fa-question",
          }
        ]
      }
    ]

    const questionlist: Question[] = [
      {
        "id": "Q.001",
        "code" : 0,
        "stringques": "Hệ thống cửa hàng Hachi Hachi có mặt từ năm nào? Hiện nay có bao nhiêu cửa hàng? Có bao nhiêu mặt hàng",
        "type": "Dạng một câu hỏi lựa chọn",
        "group": 0,
        "timelimit": 30,
        "status": 0
      },
      {
        "id": "Q.002",
        "code" : 1,
        "stringques": "Hệ thống cửa hàng Hachi Hachi có mặt từ năm nào? Hiện nay có bao nhiêu cửa hàng? Có bao nhiêu mặt hàng",
        "type": "Dạng một câu hỏi lựa chọn",
        "group": 1,
        "timelimit": 30,
        "status": 1
      },
      {
        "id": "Q.003",
        "code" : 2,
        "stringques": "Hệ thống cửa hàng Hachi Hachi có mặt từ năm nào? Hiện nay có 1 tỷ mặt hàng đúng không?",
        "type": "Dạng một câu hỏi lựa chọn",
        "group": 2,
        "timelimit": 30,
        "status": 2
      },
      {
        "id": "Q.004",
        "code" : 3,
        "stringques": "Hệ thống cửa hàng Hachi Hachi có mặt từ năm nào? Hiện nay có bao nhiêu cửa hàng? Có bao nhiêu mặt hàng",
        "type": "Dạng một câu hỏi lựa chọn",
        "group": 1,
        "timelimit": 30,
        "status": 3
      },
      {
        "id": "Q.005",
        "code" : 4,
        "stringques": "Hệ thống cửa hàng Hachi Hachi có mặt từ năm nào? Hiện nay có bao nhiêu cửa hàng? Có bao nhiêu mặt hàng",
        "type": "Dạng một câu hỏi lựa chọn",
        "group": 0,
        "timelimit": 30,
        "status": 4
      },
      {
        "id": "Q.006",
        "code": 5,
        "stringques": "Hệ thống cửa hàng Hachi Hachi có mặt từ năm nào? Hiện nay có bao nhiêu cửa hàng? Có bao nhiêu mặt hàng",
        "type": "Dạng một câu hỏi lựa chọn",
        "group": 2,
        "timelimit": 30,
        "status": 0
      },
      {
        "id": "Q.007",
        "code": 6,
        "stringques": "Hệ thống cửa hàng Hachi Hachi có mặt từ năm nào? Hiện nay có bao nhiêu cửa hàng? Có bao nhiêu mặt hàng",
        "type": "Dạng một câu hỏi lựa chọn",
        "group": 1,
        "timelimit": 30,
        "status": 1
      },
      {
        "id": "Q.008",
        "code": 7,
        "stringques": "Hệ thống cửa hàng Hachi Hachi có mặt từ năm nào? Hiện nay có bao nhiêu cửa hàng? Có bao nhiêu mặt hàng",
        "type": "Dạng một câu hỏi lựa chọn",
        "group": 0,
        "timelimit": 30,
        "status": 2
      },
      {
        "id": "Q.009",
        "code": 8,
        "stringques": "Hệ thống cửa hàng Hachi Hachi có mặt từ năm nào? Hiện nay có bao nhiêu cửa hàng? Có bao nhiêu mặt hàng",
        "type": "Dạng một câu hỏi lựa chọn",
        "group": 2,
        "timelimit": 30,
        "status": 3
      },
      {
        "id": "Q.010",
        "code": 9,
        "stringques": "Hệ thống cửa hàng Hachi Hachi có mặt từ năm nào? Hiện nay có bao nhiêu cửa hàng? Có bao nhiêu mặt hàng",
        "type": "Dạng một câu hỏi lựa chọn",
        "group": 1,
        "timelimit": 30,
        "status": 4
      },
      {
        "id": "Q.011",
        "code": 10,
        "stringques": "Hệ thống cửa hàng Hachi Hachi có mặt từ năm nào? Hiện nay có bao nhiêu cửa hàng? Có bao nhiêu mặt hàng",
        "type": "Dạng một câu hỏi lựa chọn",
        "group": 0,
        "timelimit": 30,
        "status": 0
      },
      {
        "id": "Q.012",
        "code": 11,
        "stringques": "Hệ thống cửa hàng Hachi Hachi có mặt từ năm nào? Hiện nay có bao nhiêu cửa hàng? Có bao nhiêu mặt hàng",
        "type": "Dạng một câu hỏi lựa chọn",
        "group": 2,
        "timelimit": 30,
        "status": 1
      },
      {
        "id": "Q.013",
        "code": 12,
        "stringques": "Hệ thống cửa hàng Hachi Hachi có mặt từ năm nào? Hiện nay có bao nhiêu cửa hàng? Có bao nhiêu mặt hàng",
        "type": "Dạng một câu hỏi lựa chọn",
        "group": 1,
        "timelimit": 30,
        "status": 2
      },
      {
        "id": "Q.014",
        "code": 13,
        "stringques": "Hệ thống cửa hàng Hachi Hachi có mặt từ năm nào? Hiện nay có bao nhiêu cửa hàng? Có bao nhiêu mặt hàng",
        "type": "Dạng một câu hỏi lựa chọn",
        "group": 0,
        "timelimit": 30,
        "status": 3
      },
      {
        "id": "Q.015",
        "code": 14,
        "stringques": "Hệ thống cửa hàng Hachi Hachi có mặt từ năm nào? Hiện nay có bao nhiêu cửa hàng? Có bao nhiêu mặt hàng",
        "type": "Dạng một câu hỏi lựa chọn",
        "group": 2,
        "timelimit": 30,
        "status": 4
      },
      {
        "id": "Q.016",
        "code": 15,
        "stringques": "Hệ thống cửa hàng Hachi Hachi có mặt từ năm nào? Hiện nay có bao nhiêu cửa hàng? Có bao nhiêu mặt hàng",
        "type": "Dạng một câu hỏi lựa chọn",
        "group": 1,
        "timelimit": 30,
        "status": 0
      },
      {
        "id": "Q.017",
        "code": 16,
        "stringques": "Hệ thống cửa hàng Hachi Hachi có mặt từ năm nào? Hiện nay có bao nhiêu cửa hàng? Có bao nhiêu mặt hàng",
        "type": "Dạng một câu hỏi lựa chọn",
        "group": 0,
        "timelimit": 30,
        "status": 1
      },
      {
        "id": "Q.018",
        "code": 17,
        "stringques": "Hệ thống cửa hàng Hachi Hachi có mặt từ năm nào? Hiện nay có bao nhiêu cửa hàng? Có bao nhiêu mặt hàng",
        "type": "Dạng một câu hỏi lựa chọn",
        "group": 2,
        "timelimit": 30,
        "status": 2
      },
      {
        "id": "Q.019",
        "code": 18,
        "stringques": "Hệ thống cửa hàng Hachi Hachi có mặt từ năm nào? Hiện nay có bao nhiêu cửa hàng? Có bao nhiêu mặt hàng",
        "type": "Dạng một câu hỏi lựa chọn",
        "group": 1,
        "timelimit": 30,
        "status": 3
      },
      {
        "id": "Q.020",
        "code": 19,
        "stringques": "Hệ thống cửa hàng Hachi Hachi có mặt từ năm nào? Hiện nay có bao nhiêu cửa hàng? Có bao nhiêu mặt hàng",
        "type": "Dạng một câu hỏi lựa chọn",
        "group": 0,
        "timelimit": 30,
        "status": 4
      },
      {
        "id": "Q.021",
        "code": 20,
        "stringques": "Hệ thống cửa hàng Hachi Hachi có mặt từ năm nào? Hiện nay có bao nhiêu cửa hàng? Có bao nhiêu mặt hàng",
        "type": "Dạng một câu hỏi lựa chọn",
        "group": 2,
        "timelimit": 30,
        "status": 0
      },
      {
        "id": "Q.022",
        "code": 21,
        "stringques": "Hệ thống cửa hàng Hachi Hachi có mặt từ năm nào? Hiện nay có bao nhiêu cửa hàng? Có bao nhiêu mặt hàng",
        "type": "Dạng một câu hỏi lựa chọn",
        "group": 1,
        "timelimit": 30,
        "status": 1
      },
      {
        "id": "Q.023",
        "code": 22,
        "stringques": "Hệ thống cửa hàng Hachi Hachi có mặt từ năm nào? Hiện nay có bao nhiêu cửa hàng? Có bao nhiêu mặt hàng",
        "type": "Dạng một câu hỏi lựa chọn",
        "group": 0,
        "timelimit": 30,
        "status": 2
      },
      {
        "id": "Q.024",
        "code": 23,
        "stringques": "Hệ thống cửa hàng Hachi Hachi có mặt từ năm nào? Hiện nay có bao nhiêu cửa hàng? Có bao nhiêu mặt hàng",
        "type": "Dạng một câu hỏi lựa chọn",
        "group": 2,
        "timelimit": 30,
        "status": 3
      },
      {
        "id": "Q.025",
        "code": 24,
        "stringques": "Hệ thống cửa hàng Hachi Hachi có mặt từ năm nào? Hiện nay có bao nhiêu cửa hàng? Có bao nhiêu mặt hàng",
        "type": "Dạng một câu hỏi lựa chọn",
        "group": 1,
        "timelimit": 30,
        "status": 4
      },
      {
        "id": "Q.026",
        "code": 25,
        "stringques": "Hệ thống cửa hàng Hachi Hachi có mặt từ năm nào? Hiện nay có bao nhiêu cửa hàng? Có bao nhiêu mặt hàng",
        "type": "Dạng một câu hỏi lựa chọn",
        "group": 0,
        "timelimit": 30,
        "status": 0
      },
      {
        "id": "Q.027",
        "code": 26,
        "stringques": "Hệ thống cửa hàng Hachi Hachi có mặt từ năm nào? Hiện nay có bao nhiêu cửa hàng? Có bao nhiêu mặt hàng",
        "type": "Dạng một câu hỏi lựa chọn",
        "group": 2,
        "timelimit": 30,
        "status": 1
      },
      {
        "id": "Q.028",
        "code": 27,
        "stringques": "Hệ thống cửa hàng Hachi Hachi có mặt từ năm nào? Hiện nay có bao nhiêu cửa hàng? Có bao nhiêu mặt hàng",
        "type": "Dạng một câu hỏi lựa chọn",
        "group": 1,
        "timelimit": 30,
        "status": 2
      },
      {
        "id": "Q.029",
        "code": 28,
        "stringques": "Hệ thống cửa hàng Hachi Hachi có mặt từ năm nào? Hiện nay có bao nhiêu cửa hàng? Có bao nhiêu mặt hàng",
        "type": "Dạng một câu hỏi lựa chọn",
        "group": 0,
        "timelimit": 30,
        "status": 3
      },
      {
        "id": "Q.030",
        "code": 29,
        "stringques": "Hệ thống cửa hàng Hachi Hachi có mặt từ năm nào? Hiện nay có bao nhiêu cửa hàng? Có bao nhiêu mặt hàng",
        "type": "Dạng một câu hỏi lựa chọn",
        "group": 2,
        "timelimit": 30,
        "status": 4
      }
    ]

    const grouplist: {id: number, name: string}[] = [
      {
        "id" : 0,
        "name" : "Thương hiệu văn hoá cty"
      },
      {
        "id" : 1,
        "name" : "Chất lượng sản phẩm"
      },
      {
        "id" : 2,
        "name" : "Chất lượng dịch vụ"
      },
    ]

    return { modules, categories , questionlist, grouplist};
  }
}
