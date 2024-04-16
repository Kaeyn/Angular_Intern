import { Component, Input, OnChanges, OnDestroy, OnInit, Pipe, PipeTransform, SimpleChanges } from '@angular/core';
import { QuestionBankService } from '../../question-bank.service';
import { Question } from '../../app-model/Question';
import { Subject, Subscription, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Event, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-p-hr-question-bank',
  templateUrl: './p-hr-question-bank.component.html',
  styleUrl: './p-hr-question-bank.component.scss'
})

export class PHrQuestionBankComponent implements OnInit, OnChanges, OnDestroy {

  subcriptions : Subscription[] = [];

  @Input() questionList: Question[] = [];
  filteredQuestionList : Question[] = [];
  questionGroup: { id: number; name: string }[] = [];
  questionCheckedList: Question[] = [];

  searchTerms : string = '';

  parentCheckBoxChecked: boolean = false;
  showQuestionToolTip: number = -1;

  isExpandLimitSelector : boolean = false;
  dataLimit : number = 25;

  toolTipFunc: {id: number, icon : string, text : string, ofStatus : number[], action : any}[] = [];

  statusList: { id: number, name: string, checked: boolean }[] = [
    { id: 0, name: 'Đang soạn thảo', checked: true },
    { id: 1, name: 'Gửi duyệt', checked: false },
    { id: 2, name: 'Đã duyệt', checked: false },
    { id: 3, name: 'Ngưng áp dụng', checked: false }
  ];

  funcList : {id: number, icon : string, text : string, ofStatus : number[], action : any}[] = [
    { id: 0, icon: "fa-solid fa-eye", text: "Xem chi tiết", ofStatus : [2, 3], action: this.seeDetailsItem },
    { id: 1, icon: "fa-solid fa-pencil", text: "Chỉnh sửa", ofStatus : [0, 1, 4], action: this.editItem },
    { id: 2, icon: "fa-solid fa-share", text: "Gửi duyệt", ofStatus : [0, 4], action: this.requestApproveItem },
    { id: 3, icon: "fa-regular fa-circle-check", text: "Phê duyệt", ofStatus : [1, 3], action: this.approveItem },
    { id: 4, icon: "fa-solid fa-circle-minus", text: "Ngưng hiển thị", ofStatus : [2], action: this.stopDisplayItem },
    { id: 5, icon: "fa-solid fa-arrow-rotate-left", text: "Trả về", ofStatus : [1, 3], action: this.returnItem },
    { id: 6, icon: "fa-solid fa-trash", text: "Xoá câu hỏi", ofStatus : [0], action: "" }
  ];

  orgLimitList : number[] = [
    25, 50, 75, 100
  ]

  dataLimitList : number[] = [
    100, 75, 50
  ];

  constructor(private questionService : QuestionBankService, private router: Router){
    // this.router.events.subscribe((event : Event) =>{
    //   if(event instanceof NavigationEnd){
    //     const segments: string[] = event.url.split('/');
    //     const currentPath: string = segments[segments.length - 1];    
    //     if(currentPath == 'question-bank'){
    //       this.initCompontent();
    //       console.log(currentPath)
    //     }
    //   }
    // })
   }

  ngOnInit(): void {
    this.initCompontent();
  }

  initCompontent() : void{
    this.subcriptions.push(this.questionService.getQuestionList().subscribe(data => this.questionList = data))
    this.filteredQuestionList = [...this.questionList]
    this.subcriptions.push(this.questionService.getQuestionGroup().subscribe(data => this.questionGroup = data))
    this.filterData();
  }

  ngOnDestroy(): void {
    this.subcriptions.forEach(subcription => {
      subcription.unsubscribe();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['filteredQuestionList'] && !changes['filteredQuestionList'].firstChange) {
    this.catchAllCheckboxChecked()
  }
    }

  //#region Status Filter
  // Hàm toggle checkbox của status
  toggleCheckbox(status: { id: number, name: string, checked: boolean }): void {
    status.checked = !status.checked;
    this.filterData();
  }

  //#endregion

  //#region Search Filter
  searchData(){
    this.filterData();
  }

  resetFilter(){
    this.searchTerms = '';
    this.statusList.forEach(item => item.id == 0 ? item.checked = true : item.checked = false);
  }

  //#endregion

  //#region Data List

  // Hàm format group từ number sang string
  formatGroupName(idGroup : number){
    const group = this.questionGroup.find(question => question.id === idGroup)
    return group ? group.name : '';
  }

  // Hàm check tất cả checkbox
  handleCheckAllCheckbox() : void {
    if(this.parentCheckBoxChecked == false){
    this.parentCheckBoxChecked = true;
    this.filteredQuestionList.forEach(question => {
      if (!this.questionCheckedList.includes(question)) {
        this.questionCheckedList.push(question);
      }
    });
    }else {
      this.parentCheckBoxChecked = false;
      this.questionCheckedList = [];
      
    }
    
    this.catchAllCheckboxChecked()
  }

  // Thêm item vào list câu hỏi và xoá khỏi nếu như đã có trong list
  addToCheckedList(question: Question) : void {
    if(!this.questionCheckedList.includes(question)){
    this.questionCheckedList.push(question);
  }else {
    const questionIndex = this.questionCheckedList.indexOf(question);
    this.questionCheckedList.splice(questionIndex, 1);
  }
  this.catchAllCheckboxChecked();
    }

  // Kiểm tra các checkbox nếu tất cả được check thì check cho checkbox tổng
  catchAllCheckboxChecked(){
    if (this.filteredQuestionList.every(question => this.questionCheckedList.includes(question))) {
      this.parentCheckBoxChecked = true
    } else {
      this.parentCheckBoxChecked = false
    }
  }

  // Hàm hiện các function của một item
  showToolTip(question : Question){
    if (this.showQuestionToolTip == question.code) {
      this.showQuestionToolTip = -1
    } else {
      this.showQuestionToolTip = question.code;
    }
    this.getToolTipFunction(question);
  }

  // Lấy tất cả các chức năng của một câu hỏi dựa trên status
  getToolTipFunction(question : Question){
    let funcList: { id: number; icon: string; text: string; ofStatus: number[]; action: any; }[] = []
    this.funcList.forEach(func => {
      if(func.ofStatus.includes(question.status)){
        funcList.push(func)
      }
    });
    this.toolTipFunc = funcList;
  }

  seeDetailsItem(question : Question) {
    const message = "Đã chọn xem chi tiết item: " + question.id
    const type = "success"
    console.log(message)
  }

  editItem(question : Question) {      
    const message = "Đã chọn chỉnh sửa item: " + question.id
    const type = "success"
    console.log(message)
  }

  requestApproveItem(question : Question){
      if (question.id == null || question.stringques == null || question.type == null || question.type == null || question.timelimit == null) {     
        return 0;
      }
      
      const foundQuestion = this.questionList.find(dataquest => dataquest.id == question.id);
      if(foundQuestion){
        
        this.questionService.updateQuestion(foundQuestion, 1).subscribe();
        return 1;
      }else{
        return 0
      }
      
  }

  approveItem(question : Question){
    if (question.id == null || question.stringques == null || question.type == null || question.type == null || question.timelimit == null) {     
      return 0;
    }
    const foundQuestion = this.filteredQuestionList.find(dataquest => dataquest.id == question.id);
    if(foundQuestion){
      this.questionService.updateQuestion(foundQuestion, 2).subscribe();
      return 1;
    }else{
      return 0
    }
    
}

  stopDisplayItem(question : Question){
    if (question.id == null || question.stringques == null || question.type == null || question.type == null || question.timelimit == null) {     
      return 0;
    }
    const foundQuestion = this.filteredQuestionList.find(dataquest => dataquest.id == question.id);
    if(foundQuestion){
      this.questionService.updateQuestion(foundQuestion, 3).subscribe();
      return 1;
    }else{
      return 0
    }
    
  }

    
  returnItem(question : Question){
    if (question.id == null || question.stringques == null || question.type == null || question.type == null || question.timelimit == null) {     
      return 0;
    }
    const foundQuestion = this.filteredQuestionList.find(dataquest => dataquest.id == question.id);
    if(foundQuestion){
      this.questionService.updateQuestion(foundQuestion, 4).subscribe();
      return 1;
    }else{
      return 0
    }
    
  }

  handleAction(func : number, question : Question){
    switch(func){
      case 0: this.seeDetailsItem(question); this.filterData();break;
      case 1: this.editItem(question); this.filterData();break;
      case 2: this.requestApproveItem(question); this.filterData();break;
      case 3: this.approveItem(question); this.filterData();break;
      case 4: this.stopDisplayItem(question); this.filterData();break;
      case 5: this.returnItem(question); this.filterData();break;
    }

    this.showQuestionToolTip = -1;
  }

  //#endregion


  filterData() {
    let tempStatusList : number[] = []
    let filterByStatus : Question[] = [];

    this.statusList.forEach(item => {
      if(item.checked == true){
        tempStatusList.push(item.id)
      }
    });
    if(this.statusList[0].checked == true){
      tempStatusList.push(4);
    }

    console.log(tempStatusList)
    if(tempStatusList.length <= 0){
      filterByStatus = this.questionList
    }else{    
      const tempListData = this.questionList.filter(question => tempStatusList.includes(question.status))
      filterByStatus = tempListData;
    }

    let filterBySearch = [];
    if(this.searchTerms.trim() === ""){
      filterBySearch = filterByStatus;
    }else{
      let searchText = this.removeDiacritics(this.searchTerms.toLowerCase());
      filterBySearch = filterByStatus.filter(item =>
        this.removeDiacritics(item.id.toLowerCase()).includes(searchText) ||
        this.removeDiacritics(item.stringques.toLowerCase()).includes(searchText)
      );
    }

    this.filteredQuestionList = filterBySearch;
     
  }

  removeDiacritics(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  handleExpandLimitSelector(){
    if(this.isExpandLimitSelector == true){
      this.isExpandLimitSelector = false
    }else{
      this.isExpandLimitSelector = true
    }
    console.log(this.isExpandLimitSelector)
  }

  handleSelectDataLimit(value : number){
    this.dataLimit = value;
    const templist = this.orgLimitList.filter((limit) => limit != value);
    this.dataLimitList = templist.sort((a,b) => b - a)
    this.handleExpandLimitSelector();
  }

}
