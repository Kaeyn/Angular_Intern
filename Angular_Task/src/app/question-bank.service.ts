import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, switchMap, tap } from 'rxjs';
import { Question } from './app-model/Question';

@Injectable({
  providedIn: 'root'
})
export class QuestionBankService {

  private questionlistURL = 'api/questionlist';
  private questiongroupURL = 'api/grouplist';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getQuestionList() : Observable<Question[]>{
    return this.http.get<Question[]>(this.questionlistURL);
  }

  getQuestionGroup() : Observable<[]>{
    return this.http.get<[]>(this.questiongroupURL);
  }

  getQuestion(question : Question) : Observable<Question>{
    const url = `${this.questionlistURL}/${question.id}`;
    return this.http.get<Question>(url)
  }

  updateQuestion(question: Question, newStatus : number):Observable<any>{
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
    return this.http.put(url, question, this.httpOptions).pipe(  
      tap(_ => console.log(updateMessage + ` question id=${question.id}}`)),
      catchError(this.handleError<Question>('updateQuestion'))
    );

  }

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> =>{
      console.error(error)
      return of(result as T)
    }
  }
}
