import { Photo } from './models/photo';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoBoardComponent } from './photo-board.component';
import { SimpleChange, SimpleChanges } from '@angular/core';
import { buildPhotosList } from './test/build-photo-list';

describe('PhotoBoardComponent', () => {
  let fixture: ComponentFixture<PhotoBoardComponent>;
  let component: PhotoBoardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoBoardComponent ],
      imports:[]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`Should display rows and columns when (@Input photos) has value`, ()=>{
    //Seta a lista mocada da função na propriedade do componente
    component.photos = buildPhotosList(); 
    fixture.detectChanges();

    // Para forçar o ngOnChanges a rodar é necessário criar um objeto para passar como parametro com as alterações (nova lista mocada)
    const change: SimpleChanges = {
      photos: new SimpleChange([], component.photos, true)
    }
    component.ngOnChanges(change);

    expect(component.rows.length).withContext('Number of rows').toBe(2);
    expect(component.rows[0].length).withContext('Number of columns from the first row').toBe(4);
    expect(component.rows[1].length).withContext('Number of columns from the second row').toBe(4);
  });
});
