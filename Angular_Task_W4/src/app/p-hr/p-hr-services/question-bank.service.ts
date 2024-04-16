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

  updateQuestion(question: Question, newStatus : number): void{
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
    question.status = newStatus;
    const url = `${this.questionlistURL}/${question.id}`
    const updatedQuestion = {...question, newStatus};
    this.http.put<Question>(url, updatedQuestion, this.httpOptions).pipe(  
      tap(_ => console.log(updateMessage + ` question id=${question.id}`)),
      catchError(this.handleError<Question>('updateQuestion'))
    ).subscribe(updatedQuestion => {
    });

  }

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> =>{
      console.error(error)
      return of(result as T)
    }
  }
}
