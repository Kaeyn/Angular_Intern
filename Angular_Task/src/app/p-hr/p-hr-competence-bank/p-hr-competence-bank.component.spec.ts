import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PHrCompetenceBankComponent } from './p-hr-competence-bank.component';

describe('PHrCompetenceBankComponent', () => {
  let component: PHrCompetenceBankComponent;
  let fixture: ComponentFixture<PHrCompetenceBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PHrCompetenceBankComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PHrCompetenceBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
