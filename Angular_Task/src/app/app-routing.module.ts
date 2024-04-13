import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PHrComponent } from './p-hr/p-hr.component';
import { PHrQuestionBankComponent } from './p-hr/p-hr-question-bank/p-hr-question-bank.component';
import { PHrCompetenceBankComponent } from './p-hr/p-hr-competence-bank/p-hr-competence-bank.component';

const routes: Routes = [
  {path:'HR', component: PHrComponent,
    children:[
      {path:'hr-evaluation/question-bank', component: PHrQuestionBankComponent},
      {path:'competence-evaluation/competence-bank', component: PHrCompetenceBankComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
