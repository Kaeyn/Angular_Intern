import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PHrComponent } from './p-hr/p-hr.component';
import { PHrQuestionBankComponent } from './p-hr/pages/p-hr-question-bank/p-hr-question-bank.component';
import { PHrCompetenceBankComponent } from './p-hr/pages/p-hr-competence-bank/p-hr-competence-bank.component';
import { PBlankComponent } from './p-blank/p-blank.component';
import { PHrDatePickerComponent } from './p-hr/pages/p-hr-date-picker/p-hr-date-picker.component';

const routes: Routes = [
  { path: '', redirectTo: 'HR', pathMatch: 'full' },
  {
    path: 'HR', component: PHrComponent,
    children: [
      { path: '', redirectTo: 'question-bank', pathMatch: 'full' },
      { path: 'question-bank', component: PHrQuestionBankComponent},
      { path: 'competence-bank', component: PHrCompetenceBankComponent },
    ]
  },
  {path: 'Blank', component: PHrDatePickerComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
