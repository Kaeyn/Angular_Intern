import { Injectable } from '@angular/core';
import { QuestionGroup } from '../../app-model/QuestionGroup';
import { Question } from '../../app-model/Question';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionBankService {
  private questionsSubject = new BehaviorSubject<Question[]>([]);
  questions$: Observable<Question[]> = this.questionsSubject.asObservable();

  private questionsGroupSubject = new BehaviorSubject<QuestionGroup[]>([]);
  questionsGroups$: Observable<QuestionGroup[]> = this.questionsGroupSubject.asObservable();

  private questionlistURL = 'http://localhost:3200/questionlist';
  private questiongroupURL = 'http://localhost:3200/grouplist';

  constructor(private http: HttpClient) {
    this.getQuestionList();
    this.getQuestionGroup();
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getQuestionList() : void{
    this.http.get<Question[]>(this.questionlistURL).subscribe(data => this.questionsSubject.next(data));
  }

  getQuestionGroup() : void{
    this.http.get<QuestionGroup[]>(this.questiongroupURL).subscribe(data => this.questionsGroupSubject.next(data));
  }
  
  addQuestion(newQuestion: Question): void{
    console.log(newQuestion)
    this.http.post<Question>(`${this.questionlistURL}/add`, newQuestion, this.httpOptions).pipe(
      tap((addedQuestion: Question) => {
        console.log("Added new Question")
        console.log(addedQuestion);
        
      }),
      catchError(this.handleError<Question>('addQuestion'))
    ).subscribe(question => this.getQuestionList());
  }

  updateQuestion(toUpdateQuestion: Question): void{
    const url = `${this.questionlistURL}/${toUpdateQuestion.code}`
    this.http.put<String>(url, toUpdateQuestion, this.httpOptions).pipe(  
      catchError(this.handleError<String>('updateQuestion'))
    ).subscribe(question => this.getQuestionList());
  }

  updateListQuestion(question: Question[], newStatus : number): Observable<String>{
    let updateMessage = "";
        switch(newStatus) {
          case 1:
            updateMessage = "Gửi duyệt"; break;
          case 2:
            updateMessage = "Phê duyệt"; break;
          case 3:
            updateMessage = "Ngưng hiển thị"; break;
          case 4:
            updateMessage = "Trả về"; break;
        }
    const url = `${this.questionlistURL}/updatelist/${newStatus}`
    return this.http.put<String>(url, question, this.httpOptions).pipe(  
      tap(_ => console.log(updateMessage + ` questions =${question}`)),
      catchError(this.handleError<String>('updateQuestion'))
    )
  }

  deleteQuestion(question: Question[]) : Observable<String>{
    const url = `${this.questionlistURL}/delete`;
    const options = {
      headers: this.httpOptions.headers,
      body: question // Send an object with an array of ids to delete
    };
    return this.http.delete<string>(url, options).pipe(
      tap(_ => console.log(`Deleted ${question.length} question(s)`)),
      catchError(this.handleError<string>('deleteQuestion'))
    );
    
  }

  // getPaginatedQuestionList(page: number, pageSize: number) {
  //   const url = `${this.questionlistURL}?page=${page}&pageSize=${pageSize}`;
  //   this.http.get<Question[]>(url).subscribe(data => this.questionsSubject.next(data));
  // }

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> =>{
      console.error(error)
      return of(result as T)
    }
  }
}
