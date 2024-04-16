import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PHrComponent } from './p-hr/p-hr.component';
import { PHeaderComponent } from './p-header/p-header.component';
import { PSidebarComponent } from './p-sidebar/p-sidebar.component';
import { PHrCompetenceBankComponent } from './p-hr/pages/p-hr-competence-bank/p-hr-competence-bank.component';
import { PHrQuestionBankComponent } from './p-hr/pages/p-hr-question-bank/p-hr-question-bank.component';
import { HttpClientModule } from '@angular/common/http';
import { StatusInfoPipe } from './p-hr/pages/p-hr-question-bank/p-hr-pipes/StatusInfoPipe';
import { PBlankComponent } from './p-blank/p-blank.component';

@NgModule({
  declarations: [
    AppComponent,
    PHrComponent,
    PHeaderComponent,
    PSidebarComponent,
    PHrCompetenceBankComponent,
    PHrQuestionBankComponent,
    StatusInfoPipe,
    PBlankComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
