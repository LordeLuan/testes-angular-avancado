import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PhotoBoardService } from 'src/app/shared/components/photo-board/photo-board.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoListComponent } from './photo-list.component';
import { buildPhotosList } from 'src/app/shared/components/photo-board/test/build-photo-list';
import { of } from 'rxjs/internal/observable/of';

describe('PhotoListComponent', () => {
  let component: PhotoListComponent;
  let fixture: ComponentFixture<PhotoListComponent>;
  let service: PhotoBoardService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        PhotoListComponent ,
      ], 
      imports:[
        HttpClientTestingModule
      ]
    })
    .compileComponents();
 
    fixture = TestBed.createComponent(PhotoListComponent);
    component = fixture.componentInstance;
    // o testbed permite instanciar o service caso ele esteja disponível como provider no test bed ou em algum modulo importado nele.
    service = TestBed.inject(PhotoBoardService); 
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it(`(D) Should display board when data arrives`, ()=>{
    // O Metodo OF é para transformar a lista num observable com uma lista
    const photos = buildPhotosList();
    spyOn(service, 'getPhotos').and.returnValue(of(photos)); 

    // Só chama depois do spyOn MOCKAR a resposta do metodo antes do ngOnInit ser chamado
    fixture.detectChanges();

    const board = fixture.nativeElement.querySelector('app-photo-board');
    const loader = fixture.nativeElement.querySelector('.loader');

    expect(board).withContext('Should display board').not.toBeNull();
    expect(loader).withContext('Should not display loader').toBeNull();
  });

  it(`(D) Should display loader while waiting for data arrives`, ()=>{
    // O Metodo OF é para transformar a lista num observable com uma lista
    const photos = buildPhotosList();
    spyOn(service, 'getPhotos').and.returnValue(null); 

    // Só chama depois do spyon MOCKAR a resposta do metodo antes do ngOnInit ser chamado
    fixture.detectChanges();

    const board = fixture.nativeElement.querySelector('app-photo-board');
    const loader = fixture.nativeElement.querySelector('.loader');
    
    expect(board).withContext('Should not display board').toBeNull();
    expect(loader).withContext('Should display loader').not.toBeNull();
  });
});
