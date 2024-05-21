import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderformComponent } from './tenderform.component';

describe('TenderformComponent', () => {
  let component: TenderformComponent;
  let fixture: ComponentFixture<TenderformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TenderformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TenderformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
