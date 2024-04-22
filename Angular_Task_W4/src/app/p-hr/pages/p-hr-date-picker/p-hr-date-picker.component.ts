import { Component, DoCheck, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-p-hr-date-picker',
  templateUrl: './p-hr-date-picker.component.html',
  styleUrl: './p-hr-date-picker.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PHrDatePickerComponent),
    multi: true,
  }]
})
export class PHrDatePickerComponent implements OnInit, ControlValueAccessor {


  @ViewChild('dateInput') dateInput!: ElementRef;

  currentDate: Date = new Date();
  currentDateInputFormat: string = new Date().toLocaleDateString('en-CA');
  private dateChanges = new Subject<string>();

  currentDayObj = {
    day: this.currentDate.getDate(),
    month: this.currentDate.getMonth() + 1,
    year: this.currentDate.getFullYear()
  }

  day: number = new Date().getDate();
  month: number = new Date().getMonth() + 1;
  year: number = new Date().getFullYear();

  selectedDay: { day: number, month: number, year: number } = { day: this.day, month: this.month, year: this.year };
  isOpen: boolean = false;
  isDisable : boolean = false;
  private onChange?: ((value: any) => void);
  private onTouched?: (() => void);

  protected dayList: number[] = [];
  vieMonth: string[] = ["", "Tháng một", "Tháng hai", "Tháng ba", "Tháng tư", "Tháng năm", "Tháng sáu", "Tháng bảy", "Tháng tám", "Tháng chín", "Tháng mười", "Tháng mười một", "Tháng mười hai",]

  @Output() close = new EventEmitter<any>;
  @Output() blur = new EventEmitter<any>;
  @Output() focus = new EventEmitter<any>;
  @Output() open = new EventEmitter<any>;
  @Output() valueChange = new EventEmitter<Date>;

  constructor(private elementRef: ElementRef) { }

  writeValue(date: string): void {
    console.log(date)
    this.currentDateInputFormat = date;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisable = isDisabled;
  }

  ngOnInit(): void {
    this.dateGenerate();
  }

  dateGenerate() {
    this.dayList = []
    const totalDay = this.getTotalDayOfMonth(this.month, this.year);
    const dayOfMonth = this.getDayOfMonth(this.month, this.year) -1;
    for (let i = 1; i <= totalDay; i++) {
      this.dayList.push(i);
    }
    for (let i = 0; i < dayOfMonth; i++) {
      this.dayList.unshift(-1);
    }
  }

  getTotalDayOfMonth(month: number, year: number) {
    switch (month) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12: return 31;
      case 4:
      case 6:
      case 9:
      case 11: return 30;
      case 2: if (this.isLeapYear(year)) return 29; else return 28;
      default: return 0;
    }
  }

  getDayOfMonth(month: number, year: number): number {
    const convertDay = new Date(year, month - 1, 1)
    return convertDay.getDay();
  }

  isLeapYear(year: number): boolean {
    return ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0);
  }

  isSelectedDay(mapDay: number): boolean {
    return (this.selectedDay.day === mapDay && this.selectedDay.month === this.month && this.selectedDay.year === this.year)
  }

  isDisabledDay(mapDay: number): boolean {
    const convertDay = new Date(this.year, this.month - 1, mapDay)
    convertDay.setHours(0, 0, 0, 0);
    this.currentDate.setHours(0, 0, 0, 0);
    return convertDay < this.currentDate;
  }

  isToday(mapDay: number): boolean {
    return (this.currentDayObj.day === mapDay && this.currentDayObj.month === this.month && this.currentDayObj.year === this.year)
  }

  formatMonth(month: number): string {
    return this.vieMonth[month];
  }

  selectDay(selectDay: number) {
    this.day = selectDay;
    this.selectedDay = { day: selectDay, month: this.month, year: this.year }
    this.setInputValue(this.selectedDay.day, this.selectedDay.month, this.selectedDay.year);
    this.dateGenerate();
  }

  handleChange(dateInputValue : string) {
    // Update selectedDate when input value changes
    if (dateInputValue) {
      this.onChange?.(dateInputValue); 
    }
  }

  onFocusInput() {
    this.focus.emit("focus")
  }

  onBlurInput(event: Event) {
    let inputDate = (event.target as HTMLInputElement).valueAsDate;
    console.log(typeof((event.target as HTMLInputElement).value))
    inputDate?.setHours(0, 0, 0, 0); 
    this.currentDate.setHours(0, 0, 0, 0);
    if (inputDate) {
      if (inputDate < this.currentDate || inputDate.getFullYear() > 9999) {
        inputDate = this.currentDate;
        const formattedDate = inputDate.toLocaleDateString('en-CA');
        this.currentDateInputFormat = formattedDate;
        this.writeValue(formattedDate)
        this.onChange?.(formattedDate); 
        this.day = this.currentDayObj.day;
        this.month = this.currentDayObj.month;
        this.year = this.currentDayObj.year;
        this.selectedDay = { day: this.currentDayObj.day, month: this.currentDayObj.month, year: this.currentDayObj.year }
      } else {
        const formattedDate = inputDate.toLocaleDateString('en-CA');
        this.currentDateInputFormat = formattedDate;
        this.writeValue(formattedDate)
        this.onChange?.(formattedDate);       
        this.day = inputDate.getDate();
        this.month = inputDate.getMonth() + 1;
        this.year = inputDate.getFullYear();
        this.selectedDay = { day: inputDate.getDate(), month: inputDate.getMonth() + 1, year: inputDate.getFullYear() }
      }
    } else {
      inputDate = this.currentDate;
      const formattedDate = inputDate.toLocaleDateString('en-CA');
      this.currentDateInputFormat = formattedDate;
      this.writeValue(formattedDate)
      this.onChange?.(formattedDate);
      this.day = this.currentDayObj.day;
      this.month = this.currentDayObj.month;
      this.year = this.currentDayObj.year;
      this.selectedDay = { day: this.currentDayObj.day, month: this.currentDayObj.month, year: this.currentDayObj.year }
    }
    this.dateGenerate();
  }

  @HostListener('document:click', ['$event'])
  bluredClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    const isClickedInsideComponent = this.elementRef.nativeElement.contains(clickedElement);
    if (!isClickedInsideComponent) {
      this.handleClose()
      this.blur.emit("blur");
    }
  }

  setInputValue(day: number, month: number, year: number) {
    const date = new Date(year, month - 1, day);
    const formattedDate = date.toLocaleDateString('en-CA');
    this.currentDateInputFormat = formattedDate;
    this.writeValue(formattedDate)
    this.onChange?.(formattedDate)

  }

  prevMonth() {
    this.month -= 1
    if (this.month == 0) {
      this.year -= 1;
      this.month = 12;
    }
    this.dateGenerate();
  }

  nextMonth() {
    this.month += 1;
    if (this.month == 13) {
      this.year += 1;
      this.month = 1;
    }
    this.dateGenerate();
  }

  handleCalendarOpen() {
    if (this.isOpen == false) {
      this.handleOpen();
      this.dateGenerate();
    } else {
      this.handleClose();
      
    }
  }

  handleOpen() {
    this.isOpen = true;  
    this.open.emit("open")
  }

  handleClose() {
    this.isOpen = false;
    this.day = this.selectedDay.day;
    this.month = this.selectedDay.month;
    this.year = this.selectedDay.year;
    this.close.emit("close")
  }





}
