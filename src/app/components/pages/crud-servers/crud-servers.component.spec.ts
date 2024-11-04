import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudServersComponent } from './crud-servers.component';

describe('CrudServersComponent', () => {
  let component: CrudServersComponent;
  let fixture: ComponentFixture<CrudServersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudServersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudServersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
