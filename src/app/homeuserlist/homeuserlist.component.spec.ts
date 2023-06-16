import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeuserlistComponent } from './homeuserlist.component';

describe('HomeuserlistComponent', () => {
  let component: HomeuserlistComponent;
  let fixture: ComponentFixture<HomeuserlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeuserlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeuserlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
