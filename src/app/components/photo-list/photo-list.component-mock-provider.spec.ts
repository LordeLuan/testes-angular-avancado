import { PhotoBoardServiceMock } from './../../shared/components/photo-board/services/photo-board-mock.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoListComponent } from './photo-list.component';
import { PhotoBoardService } from 'src/app/shared/components/photo-board/services/photo-board.service';

describe('PhotoListComponent MOCK PROVIDER', () => {
  let component: PhotoListComponent;
  let fixture: ComponentFixture<PhotoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        PhotoListComponent ,
      ], 
      imports:[
        HttpClientTestingModule
      ],
      providers: [  
        // Quando chamar o PhotoBoardService, deverá usar a classe MOCK que tem o metodo getPhotos() e valor de retorno do metodo buildPhotoList
        { 
          provide: PhotoBoardService, 
          useClass: PhotoBoardServiceMock
        }
      ]
    })
    .compileComponents();
 
    fixture = TestBed.createComponent(PhotoListComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it(`(D) Should display board when data arrives`, ()=>{
    // Só chama depois do spyOn MOCKAR a resposta do metodo antes do ngOnInit ser chamado
    fixture.detectChanges();

    const board = fixture.nativeElement.querySelector('app-photo-board');
    const loader = fixture.nativeElement.querySelector('.loader');

    expect(board).withContext('Should display board').not.toBeNull();
    expect(loader).withContext('Should not display loader').toBeNull();
  });

});
