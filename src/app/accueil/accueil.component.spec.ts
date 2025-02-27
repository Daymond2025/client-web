import { ComponentFixture, TestBed } from '@angular/core/testing';
import {provideHttpClientTesting, HttpClientTestingModule } from '@angular/common/http/testing'
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { AccueilComponent } from './accueil.component';



describe('AccueilComponent', () => {
  let component: AccueilComponent;
  let fixture: ComponentFixture<AccueilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccueilComponent,HttpClientTestingModule],
      providers:[
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap: of({ get: (key: string) => '123' }) // Simule queryParamMap

          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
