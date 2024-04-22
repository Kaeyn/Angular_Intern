import { Component, ElementRef, HostListener, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { QuestionBankService } from '../../p-hr-services/question-bank.service';
import { Router } from '@angular/router';
import { Question } from '../../../app-model/Question';
import { QuestionGroup } from '../../../app-model/QuestionGroup';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { MatSidenav } from '@angular/material/sidenav';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-p-hr-question-bank',
  templateUrl: './p-hr-question-bank.component.html',
  styleUrl: './p-hr-question-bank.component.scss'
})
export class PHrQuestionBankComponent implements OnChanges, OnInit, OnDestroy {
  @Input() questionList: Question[] = [];
  filteredQuestionList: Question[] = [];
  questionGroup: QuestionGroup[] = [];
  questionCheckedList: Question[] = [];
  questionToDelete: Question[] = [];
  noneDisabledStatus: { id: number, text: string, ofStatus: number[] }[] = []
  selectedQuestion: Question = new Question();

  isLoading: boolean = false;

  searchTerms: string = '';

  parentCheckBoxChecked: boolean = false;
  showQuestionToolTip: number = -1;
  showConfirmPopup: boolean = false;
  showSideNav: boolean = false;
  isEditQuestion: boolean = false;
  isAddNewQuestion: boolean = false;
  isSeeDetailQuestion: boolean = false;
  isExpandLimitSelector: boolean = false;
  pageList: number[] = [];
  dataLimit: number = 25;
  currentPage: number = 1;
  totalPages: number = 1;

  selectedDate : string = new Date().toLocaleDateString('vi-VN');

  questionForm = new FormGroup({
    id: new FormControl('', Validators.required),
    code: new FormControl(0),
    stringques: new FormControl('', Validators.required),
    type: new FormControl(-1),
    group: new FormControl(-1),
    timelimit: new FormControl(30, Validators.min(0)),
    scoring: new FormControl(-1),
    status: new FormControl(0),

  });

  toolTipFunc: { id: number, icon: string, text: string, ofStatus: number[] }[] = [];
  multiToolTipFunc: { id: number, icon: string, text: string, ofStatus: number[] }[] = [];

  statusList: { id: number, name: string, checked: boolean }[] = [
    { id: 0, name: 'Đang soạn thảo', checked: true },
    { id: 1, name: 'Gửi duyệt', checked: false },
    { id: 2, name: 'Đã duyệt', checked: false },
    { id: 3, name: 'Ngưng áp dụng', checked: false },
    { id: 4, name: 'Trả về', checked: true }
  ];

  questionType: { id: number, type: string }[] = [
    { id: 0, type: 'Nhiều lựa chọn' },
    { id: 1, type: 'Một lựa chọn' },
    { id: 2, type: 'Câu hỏi mở' },
    { id: 3, type: 'Câu hỏi yes/no' },
  ]

  scoringList: { id: number, type: string }[] = [
    { id: 0, type: 'Đúng hết đáp án' },
    { id: 1, type: 'Từng đáp án đúng' },
    { id: 2, type: 'Từng đáp án sai' },
  ]

  availableStatusList: { id: number, text: string, ofStatus: number[] }[] = [
    { id: 1, text: "Gửi duyệt", ofStatus: [0, 4] },
    { id: 2, text: "Duyệt áp dụng", ofStatus: [1, 3] },
    { id: 3, text: "Ngưng áp dụng", ofStatus: [2] },
    { id: 4, text: "Trả về", ofStatus: [1, 3] },
  ]

  funcList: { id: number, icon: string, text: string, ofStatus: number[] }[] = [
    { id: 0, icon: "fa-solid fa-eye", text: "Xem chi tiết", ofStatus: [2, 3] },
    { id: 1, icon: "fa-solid fa-pencil", text: "Chỉnh sửa", ofStatus: [0, 1, 4] },
    { id: 2, icon: "fa-solid fa-share", text: "Gửi duyệt", ofStatus: [0, 4] },
    { id: 3, icon: "fa-regular fa-circle-check", text: "Phê duyệt", ofStatus: [1, 3] },
    { id: 4, icon: "fa-solid fa-circle-minus", text: "Ngưng hiển thị", ofStatus: [2] },
    { id: 5, icon: "fa-solid fa-arrow-rotate-left", text: "Trả về", ofStatus: [1, 3] },
    { id: 6, icon: "fa-solid fa-trash", text: "Xoá câu hỏi", ofStatus: [0] }
  ];

  multiFuncList: { id: number, icon: string, text: string, ofStatus: number[] }[] = [
    { id: 2, icon: "fa-solid fa-share", text: "Gửi duyệt", ofStatus: [0, 4] },
    { id: 5, icon: "fa-solid fa-arrow-rotate-left", text: "Trả về", ofStatus: [1, 3] },
    { id: 3, icon: "fa-regular fa-circle-check", text: "Phê duyệt", ofStatus: [1, 3] },
    { id: 4, icon: "fa-solid fa-circle-minus", text: "Ngưng hiển thị", ofStatus: [2] },
    { id: 6, icon: "fa-solid fa-trash", text: "Xoá câu hỏi", ofStatus: [0] }
  ];


  orgLimitList: number[] = [
    25, 50, 75, 100
  ]

  dataLimitList: number[] = [
    100, 75, 50
  ];

  constructor(private questionService: QuestionBankService, private router: Router, private toastService: ToastrService) {
  }

  ngOnInit(): void {
    const savedStatusListJSON = sessionStorage.getItem('statusList');
    if (savedStatusListJSON !== null) {
      this.statusList = JSON.parse(savedStatusListJSON);
      const allUnchecked = this.statusList.every(item => !item.checked);
      if (allUnchecked) {
        const itemWithIdZero = this.statusList.find(item => item.id === 0);
        if (itemWithIdZero) {
          itemWithIdZero.checked = true;
        }
      }
    }
    this.initCompontent();
    this.filterData();
  }

  initCompontent(): void {
    this.questionService.questions$.subscribe(data => { this.questionList = data; this.filterData() })
    this.filteredQuestionList = [...this.questionList]
    this.questionService.questionsGroups$.subscribe(data => this.questionGroup = data)
    this.filterData();
  }

  ngOnChanges(changes: SimpleChanges): void {

  }
  @HostListener("window:beforeunload")
  ngOnDestroy(): void {
    // Convert the statusList to a JSON string
    console.log('yes')
    const statusListJSON = JSON.stringify(this.statusList);
    sessionStorage.setItem('statusList', statusListJSON);
  }

  //#region Status Filter
  // Hàm toggle checkbox của status
  toggleCheckbox(status: { id: number, name: string, checked: boolean }): void {
    status.checked = !status.checked;
    this.goToPage(1)
    this.filterData();
  }

  addNewQuestion(sidenav: MatSidenav) {
    this.isAddNewQuestion = true;
    const defaultForm = {
      id: '',
      code: 0,
      stringques: '',
      type: -1,
      group: -1,
      timelimit: 30,
      scoring: -1,
      status: 0,
    }
    this.questionForm.setValue(defaultForm)
    this.questionForm.get('type')?.disable({ onlySelf: true, emitEvent: false });
    this.questionForm.get('scoring')?.disable({ onlySelf: true, emitEvent: false });
    sidenav.open()
  }


  selectionChange() {
    const curStatus = this.selectedQuestion.status;
    this.getNoneDisableStatus(curStatus);

    if (this.questionForm.get('group')?.value == -1) {
      this.questionForm.get('type')?.disable({ onlySelf: true, emitEvent: false });
      this.questionForm.get('type')?.setValue(-1);
    } else {
      this.questionForm.get('type')?.enable({ onlySelf: true, emitEvent: false });
    }
    if (this.questionForm.get('type')?.value == -1) {
      this.questionForm.get('scoring')?.disable({ onlySelf: true, emitEvent: false });
      this.questionForm.get('scoring')?.setValue(-1);
    } else {
      console.log(this.questionForm.get('type')?.value)
      if(this.questionForm.get('type')?.value == 0){
        this.questionForm.get('scoring')?.enable({ onlySelf: true, emitEvent: false });
      }else{
        this.questionForm.get('scoring')?.disable({ onlySelf: true, emitEvent: false });
      }
    }
  }

  getNoneDisableStatus(currentStatus: number) {
    const noneDisableStatus: { id: number; text: string; ofStatus: number[]; }[] = [];
    this.availableStatusList.forEach(status => {
      if (status.ofStatus.includes(currentStatus)) {
        noneDisableStatus.push(status)
      }
    });
    this.noneDisabledStatus = noneDisableStatus;
    console.log(this.noneDisabledStatus)
  }

  shouldDisableOption(id: number): boolean {
    if (!this.isAddNewQuestion) {
      // Check if 'id' exists in any 'ofStatus' array in 'disabledStatus'
      return !this.noneDisabledStatus.some(status => status.id == id);
    } else {
      return false;
    }

  }

  // Hàm thêm câu hỏi nếu như được submit / validate
  onSubmit(sidenav: MatSidenav) {
    if (this.isAddNewQuestion) {
      console.log(this.questionForm.value)
      const newQuestion = this.questionForm.value as Question;
      if (newQuestion.status != 0) {
        if (newQuestion.group == -1 || newQuestion.type == -1 || newQuestion.scoring == -1 || newQuestion.timelimit <= 0) {
          this.showStyledToast("Vui lòng nhập đầy đủ các trường khi chọn các trạng thái không phải đang soạn thảo !", false)
          return;
        }
      }
      sidenav.close();
      console.log(newQuestion)
      this.questionService.addQuestion(newQuestion);
      this.showStyledToast("Đã thêm mới câu hỏi với mã là: " + this.questionForm.get('id')?.value, true)
    } else if (this.isEditQuestion) {
      const newQuestion = this.questionForm.value as Question;
      if (newQuestion.status != 0) {
        if (newQuestion.group == -1 || newQuestion.type == null || newQuestion.scoring == -1 || newQuestion.scoring == null || newQuestion.timelimit <= 0) {
          this.showStyledToast("Vui lòng nhập đầy đủ các trường khi chọn các trạng thái không phải đang soạn thảo !", false)
          return;
        }
      }
      sidenav.close();
      this.questionService.updateQuestion(newQuestion);
      this.showStyledToast("Đã cập nhập câu hỏi: " + this.questionForm.get('id')?.value, true)
    }

  }

  submitForm(form: HTMLFormElement) {
    if (this.questionForm.valid) {
      // If form is valid, submit it
      form.requestSubmit();
    } else {
      // If form is invalid, log an error
      this.showStyledToast('Lỗi xảy ra khi thêm mới: không được để trống trường tên câu hỏi và mã câu hỏi', false);
    }
  }

  closeSideNav(sidenav: MatSidenav) {
    this.isEditQuestion = false;
    this.isAddNewQuestion = false;
    this.isSeeDetailQuestion = false
    console.log(this.selectedDate);
    this.questionForm.enable();
    sidenav.close();
  }


  //#endregion

  //#region Search Filter
  // Chức năng search
  searchData() {
    this.filterData();
    this.goToPage(1);
  }

  // Reset bộ lọc
  resetFilter() {
    this.searchTerms = '';
    this.statusList.forEach(item => item.id == 0 ? item.checked = true : item.checked = false);
    this.filterData();
    this.goToPage(1);
  }

  // Format chuỗi được nhập để search không cần dấu
  removeDiacritics(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  //#endregion

  //#region Data List

  // Lọc data
  filterData() {
    this.isLoading = true;
    let tempStatusList: number[] = []
    let filterByStatus: Question[] = [];

    if (this.statusList[0].checked == true) {
      this.statusList[4].checked = true
    } else {
      this.statusList[4].checked = false
    }



    this.statusList.forEach(item => {
      if (item.checked == true) {
        tempStatusList.push(item.id)
      }
    });

    if (tempStatusList.length <= 0) {
      filterByStatus = this.questionList
    } else {
      const tempListData = this.questionList.filter(question => tempStatusList.includes(question.status))
      filterByStatus = tempListData;
    }

    let filterBySearch: Question[] = [];
    if (this.searchTerms.trim() === "") {
      filterBySearch = filterByStatus;
    } else {
      let searchText = this.removeDiacritics(this.searchTerms.toLowerCase());
      filterBySearch = filterByStatus.filter(item =>
        this.removeDiacritics(item.id.toLowerCase()).includes(searchText) ||
        this.removeDiacritics(item.stringques.toLowerCase()).includes(searchText)
      );
    }


    
    setTimeout(() => {
      this.isLoading = false;
      this.filteredQuestionList = filterBySearch;
      this.totalPages = this.getTotalPages();
      this.pageList = this.getPageNumbers();
      this.getPaginatedQuestions();
      this.catchAllCheckboxChecked();
      if(this.filteredQuestionList.length <= 0) this.goToPage(this.currentPage - 1);
    }, 200);
  }

  formatTypeQuestion(idType: number) {
    const group = this.questionType.find(question => question.id === idType)
    return group ? group.type : '';
  }

  // Hàm format group từ number sang string
  formatGroupName(idGroup: number) {
    const group = this.questionGroup.find(question => question.id === idGroup)
    return group ? group.name : '';
  }

  // Hàm check tất cả checkbox
  handleCheckAllCheckbox(): void {

    if (this.parentCheckBoxChecked == false) {
      this.parentCheckBoxChecked = true;
      this.filteredQuestionList.forEach(question => {
        if (!this.questionCheckedList.includes(question)) {
          this.questionCheckedList.push(question);
        }
      });
      this.getMultiToolTipFunction();
    } else {
      this.parentCheckBoxChecked = false;
      this.questionCheckedList = this.questionCheckedList.filter(question => !this.filteredQuestionList.includes(question));
    }

    this.catchAllCheckboxChecked()
  }

  // Thêm item vào list câu hỏi và xoá khỏi nếu như đã có trong list
  addToCheckedList(question: Question): void {
    if (!this.questionCheckedList.includes(question)) {
      this.questionCheckedList.push(question);
    } else {
      const questionIndex = this.questionCheckedList.indexOf(question);
      this.questionCheckedList.splice(questionIndex, 1);
    }
    this.getMultiToolTipFunction();
    this.catchAllCheckboxChecked();
  }

  // Kiểm tra các checkbox nếu tất cả được check thì check cho checkbox tổng
  catchAllCheckboxChecked() {
    if (this.filteredQuestionList.length == 0) {
      this.parentCheckBoxChecked = false
    } else {
      if (this.filteredQuestionList.every(question => this.questionCheckedList.includes(question))) {
        this.parentCheckBoxChecked = true
      } else {
        this.parentCheckBoxChecked = false
      }
    }

  }

  // Hàm hiện các function của một item
  showToolTip(question: Question) {
    if (this.showQuestionToolTip == question.code) {
      this.showQuestionToolTip = -1
    } else {
      this.showQuestionToolTip = question.code;
    }
    this.getToolTipFunction(question);
  }

  // Lấy tất cả các chức năng của một câu hỏi dựa trên status
  getToolTipFunction(question: Question) {
    let funcList: { id: number; icon: string; text: string; ofStatus: number[] }[] = []
    this.funcList.forEach(func => {
      if (func.ofStatus.includes(question.status)) {
        funcList.push(func)
      }
    });
    this.toolTipFunc = funcList;
  }

  // Lấy tất cả các chức năng của các câu hỏi được chọn dựa trên status
  getMultiToolTipFunction() {
    if (this.questionCheckedList.length > 0) {
      let funcList: { id: number; icon: string; text: string; ofStatus: number[] }[] = []
      this.multiFuncList.forEach(func => {
        this.questionCheckedList.forEach(question => {
          if (func.ofStatus.includes(question.status)) {
            if (!funcList.includes(func)) {
              funcList.push(func);
            }
          }
        })
      });
      this.multiToolTipFunc = funcList;
    }
  }

  // Chức năng xem chi tiết
  seeDetailsItem(question: Question, sidenav: MatSidenav) {
    this.questionForm.disable();
    this.questionForm.setValue(question)
    sidenav.open();
  }

  // Chức năng chỉnh sửa item
  editItem(question: Question, sidenav: MatSidenav) {
    console.log(question)
    this.isEditQuestion = true;
    this.selectedQuestion = question;
    this.questionForm.setValue(question)
    this.selectionChange();
    sidenav.open();
  }

  // Gửi duyệt một item
  requestApproveItem(question: Question) {
    if (question.id == null || question.stringques == null || question.type == null || question.type == null || question.timelimit == null) {
      this.showStyledToast("Gửi duyệt thất bại ! Các trường của câu hỏi chưa đầy đủ ! ", false)
      return;
    }

    const foundQuestion = this.questionList.find(dataquest => dataquest.id == question.id);

    if (foundQuestion) {
      foundQuestion.status = 1
      this.questionService.updateQuestion(foundQuestion)
      this.showStyledToast("Phê duyệt thành công ! Câu hỏi: " + foundQuestion.id, true)
    } else {
      this.showStyledToast("Gửi duyệt thất bại ! Không tìm thấy câu hỏi", false)
    }

  }

  // Phê duyệt một item
  approveItem(question: Question) {
    if (question.stringques == null || question.type == null || question.type == null || question.timelimit == null) {
      this.showStyledToast("Phê duyệt thất bại ! Các trường của câu hỏi chưa đầy đủ ! ", false)
      return;
    }
    const foundQuestion = this.filteredQuestionList.find(dataquest => dataquest.id == question.id);
    if (foundQuestion) {

      foundQuestion.status = 2;
      this.questionService.updateQuestion(foundQuestion);
      this.showStyledToast("Phê duyệt thành công ! Câu hỏi: " + foundQuestion.id, true);

    } else {
      this.showStyledToast("Phê duyệt thất bại ! Không tìm thấy câu hỏi", false)
    }

  }

  // Ngưng hiển thị một item
  stopDisplayItem(question: Question) {
    if (question.stringques == null || question.type == null || question.type == null || question.timelimit == null) {
      this.showStyledToast("Ngưng hiển thị thất bại ! Các trường của câu hỏi chưa đầy đủ ! ", false)
      return;
    }
    const foundQuestion = this.filteredQuestionList.find(dataquest => dataquest.id == question.id);
    if (foundQuestion) {
      foundQuestion.status = 3;
      this.questionService.updateQuestion(foundQuestion)
      this.showStyledToast("Ngưng hiển thị thành công ! Câu hỏi: " + foundQuestion.id, true);

    } else {
      this.showStyledToast("Ngưng hiển thị thất bại ! Không tìm thấy câu hỏi", false)
    }

  }

  // Trả về một item
  returnItem(question: Question) {
    if (question.id == null || question.stringques == null || question.type == null || question.type == null || question.timelimit == null) {
      this.showStyledToast("Trả về thất bại ! Các trường của câu hỏi chưa đầy đủ ! ", false)
      return;
    }
    const foundQuestion = this.filteredQuestionList.find(dataquest => dataquest.id == question.id);
    if (foundQuestion) {
      foundQuestion.status = 4;
      this.questionService.updateQuestion(foundQuestion)
      this.showStyledToast("Trả về thành công ! Câu hỏi: " + foundQuestion.id, true)
    } else {
      this.showStyledToast("Trả về thất bại ! Không tìm thấy câu hỏi", false)
    }
  }

  // Xoá một item
  deleteItem(question: Question) {
    this.handleShowConfirmPopup(question);
  }

  // Gửi duyệt nhiều item
  requestApproveListItem() {

    let errorItems: Question[] = []
    let successItems: Question[] = []
    this.questionCheckedList.forEach(question => {
      if (question.id == null || question.stringques == null || question.type == null || question.type == null || question.timelimit == null) {
        errorItems.push(question)
      } else {
        successItems.push(question)
      }
    });
    this.questionService.updateListQuestion(successItems, 1).subscribe(status => {
      if (status == 'success') {
        const updatedQuestionIds = successItems.map(question => question.id);
        successItems.forEach(successitem => {
          const questionToUpdate = this.questionList.find(question => question == successitem);
          if (questionToUpdate) {
            questionToUpdate.status = 1;
          }
        });
        this.questionCheckedList = [];
        this.showStyledToast("Gửi duyệt thành công ! Câu hỏi: " + updatedQuestionIds.join(', '), true);
        this.filterData();
      }
    })
  }

  // Phê duyệt nhiều item
  approveListItem() {
    let errorItems: Question[] = []
    let successItems: Question[] = []
    this.questionCheckedList.forEach(question => {
      if (question.id == null || question.stringques == null || question.type == null || question.type == null || question.timelimit == null) {
        errorItems.push(question)
      } else {
        successItems.push(question)
      }
    });
    this.questionService.updateListQuestion(successItems, 2).subscribe(status => {
      if (status == 'success') {
        const updatedQuestionIds = successItems.map(question => question.id);
        successItems.forEach(successitem => {
          const questionToUpdate = this.questionList.find(question => question == successitem);
          if (questionToUpdate) {
            questionToUpdate.status = 2;
          }
        });
        this.questionCheckedList = [];
        this.showStyledToast("Phê duyệt thành công ! Câu hỏi: " + updatedQuestionIds.join(', '), true);
        this.filterData();
      }
    })
  }

  // Ngưng hiển thị nhiều item
  stopDisplayListItem() {
    console.log("Test")
    let errorItems: Question[] = []
    let successItems: Question[] = []
    this.questionCheckedList.forEach(question => {
      if (question.id == null || question.stringques == null || question.type == null || question.type == null || question.timelimit == null) {
        errorItems.push(question)
      } else {
        successItems.push(question)
      }
    });
    this.questionService.updateListQuestion(successItems, 3).subscribe(status => {
      if (status == 'success') {
        const updatedQuestionIds = successItems.map(question => question.id);
        successItems.forEach(successitem => {
          const questionToUpdate = this.questionList.find(question => question == successitem);
          if (questionToUpdate) {
            questionToUpdate.status = 3;
          }
        });
        this.questionCheckedList = [];
        this.showStyledToast("Ngưng hiển thị thành công ! Câu hỏi: " + updatedQuestionIds.join(', '), true);
        this.filterData();
      }
    })
  }

  // Trả về nhiều item
  returnListItem() {

    let errorItems: Question[] = []
    let successItems: Question[] = []
    this.questionCheckedList.forEach(question => {
      if (question.id == null || question.stringques == null || question.type == null || question.type == null || question.timelimit == null) {
        errorItems.push(question)
      } else {
        successItems.push(question)
      }
    });
    this.questionService.updateListQuestion(successItems, 4).subscribe(status => {
      if (status == 'success') {
        const updatedQuestionIds = successItems.map(question => question.id);
        successItems.forEach(successitem => {
          const questionToUpdate = this.questionList.find(question => question == successitem);
          if (questionToUpdate) {
            questionToUpdate.status = 4;
          }
        });
        this.questionCheckedList = [];
        this.showStyledToast("Trả về thành công ! Câu hỏi: " + updatedQuestionIds.join(', '), true);
        this.filterData();
      }
    })
  }

  // Xoá nhiều item
  deleteListItem() {
    this.questionCheckedList.forEach(question => {
      if (question.status == 0) {
        this.questionToDelete.push(question);
      }
    });
    this.showConfirmPopup = true;
  }

  // Xử lí chức năng dựa trên chức năng cửa tooltip được chọn
  handleAction(func: number, question: Question, sidenav: MatSidenav) {
    switch (func) {
      case 0: this.seeDetailsItem(question, sidenav); break;
      case 1: this.editItem(question, sidenav); break;
      case 2: this.requestApproveItem(question); break;
      case 3: this.approveItem(question); break;
      case 4: this.stopDisplayItem(question); break;
      case 5: this.returnItem(question); break;
      case 6: this.deleteItem(question); break;
    }

    this.showQuestionToolTip = -1;
  }

  // Xử lí chức năng dựa trên chức năng cửa multitooltip được chọn
  handleMultiToolAction(func: number) {
    switch (func) {
      case 2: this.requestApproveListItem(); break;
      case 3: this.approveListItem(); break;
      case 4: this.stopDisplayListItem(); break;
      case 5: this.returnListItem(); break;
      case 6: this.deleteListItem(); break;
    }
  }

  // Đóng tooltip
  handleCloseToolTip() {
    this.showQuestionToolTip = -1;
  }

  // Đóng multitooltip
  handleCloseMultiTool() {
    this.questionCheckedList = [];
    this.catchAllCheckboxChecked();
  }

  // Hiển thị popup xác nhận xoá
  handleShowConfirmPopup(question: Question) {
    this.showConfirmPopup = true;
    this.questionToDelete.push(question);
  }

  // Xác nhận xoá
  confirmDelete() {
    this.questionService.deleteQuestion(this.questionToDelete).subscribe(status => {
      if (status == 'success') {
        const deletedQuestionIds = this.questionToDelete.map(question => question.id);
        this.questionList = this.filteredQuestionList.filter(question => !this.questionToDelete.includes(question));
        this.showConfirmPopup = false;
        this.questionToDelete = [];
        this.questionCheckedList = [];
        this.filterData();
        this.showStyledToast("Xoá thành công ! Câu hỏi: " + deletedQuestionIds.join(', '), true)
      }
    })

  }

  // Huỷ xoá
  abortDelete() {
    this.showConfirmPopup = false;
    this.questionToDelete = [];
  }

  //#endregion

  //#region Pagination
  // Hiển thị các lựa chọn giới hạn số trang
  handleExpandLimitSelector() {
    if (this.isExpandLimitSelector == true) {
      this.isExpandLimitSelector = false
    } else {
      this.isExpandLimitSelector = true
    }

  }

  // Chọn giới hạn số trang
  handleSelectDataLimit(value: number) {
    this.dataLimit = value;
    const templist = this.orgLimitList.filter((limit) => limit != value);
    this.dataLimitList = templist.sort((a, b) => b - a)
    this.handleExpandLimitSelector();
    this.goToPage(1)
    this.filterData()
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.filterData();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.filterData();
    }
  }

  goToPage(pageNum: number): void {
    if (pageNum > 0 && pageNum <= this.totalPages) {
      this.currentPage = pageNum;
      this.filterData();
    }
  }

  handleLeftEllipsisClick() {
    this.currentPage = (Math.ceil(this.currentPage / 3) - 1) * 3;
  }

  handleRightEllipsisClick() {
    this.currentPage = Math.min(this.totalPages, (Math.ceil(this.currentPage / 3) + 1) * 3 - 2);
  }

  getPageNumbers(): number[] {
    const pages: {pagesItem : number[]}[] = [];
    let pagesItem: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pagesItem.push(i);
      if (pagesItem.length === 3 || i === this.totalPages) {
        pages.push({pagesItem});
        pagesItem = [];
      }
      
    }
    const currentPageIndex = Math.ceil(this.currentPage / 3);
    return pages[currentPageIndex - 1]?.pagesItem || [];
  }

  getTotalPages(): number {
    return Math.ceil(this.filteredQuestionList.length / this.dataLimit);
  }

  getPaginatedQuestions(): void {
    const startIndex = (this.currentPage - 1) * this.dataLimit;
    const endIndex = Math.min(startIndex + this.dataLimit, this.filteredQuestionList.length);
    const paginatedQuestions = this.filteredQuestionList.slice(startIndex, endIndex)
    this.filteredQuestionList = paginatedQuestions;
  }



  //#endregion

  //#region Toast
  // Hiển thị thông báo khi người dùng hoàn thành tương tác với item
  showStyledToast(message: string, isSuccess: boolean) {
    const toastOptions: Partial<IndividualConfig> = {
      timeOut: 2000, // Duration for displaying the toast
      positionClass: 'toast-bottom-left', // Position of the toast
      closeButton: false, // Whether to show close button
      progressBar: false, // Whether to show progress bar
      enableHtml: true, // Whether HTML is allowed in the message
      toastClass: isSuccess ? 'custom-toast success' : 'custom-toast failure'
    };
    const iconClass = isSuccess ? 'fa-solid fa-check-circle' : 'fa-solid fa-exclamation-circle';

    this.toastService.show(
      `  
        <div class="toast-message">
          <i class="${iconClass} icon-toast"></i>
          ${message}
        </div>
    `, '', toastOptions);

  }
  //#endregion
}
