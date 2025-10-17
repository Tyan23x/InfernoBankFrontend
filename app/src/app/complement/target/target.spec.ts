import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Target } from './target';

describe('Target', () => {
  let component: Target;
  let fixture: ComponentFixture<Target>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Target]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Target);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
