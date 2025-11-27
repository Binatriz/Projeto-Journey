import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanheiroFordComponent } from './companheiro-ford.component';

describe('CompanheiroFordComponent', () => {
  let component: CompanheiroFordComponent;
  let fixture: ComponentFixture<CompanheiroFordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanheiroFordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanheiroFordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
