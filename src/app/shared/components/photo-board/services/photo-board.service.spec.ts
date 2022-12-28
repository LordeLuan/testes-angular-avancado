import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PhotoBoardService } from './photo-board.service';

const mockData = {
  api: 'http://localhost:3000/photos', // endpoint para fazer a requisição
  data:[{ //Dado que vai ser retornado da requisição
    id: 1,
    description: 'example 1',
    src: ''
  },
  {
    id: 2,
    description: 'example 2',
    src: ''
  }]
}


describe('PhotoBoardService', () => {
  let service: PhotoBoardService;
  let httpController: HttpTestingController; //Controlador de requisição HTTP
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PhotoBoardService],
    });

    service = TestBed.inject(PhotoBoardService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(()=> {
    //Verifica se tem alguma requisição passando sem interceptada pelo controller  
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`#${PhotoBoardService.prototype.getPhotos.name} should return photos with description in uppercase`, done =>{

    // chama o metodo e compara o retorno
    service.getPhotos().subscribe(photos =>{
      expect(photos[0].description).toBe('EXAMPLE 1');
      expect(photos[1].description).toBe('EXAMPLE 2');
      done(); // finaliza o metodo
    });

    // Chamada do httpController depois da chamada da API para o httpController 'interceptar' a requisição
    httpController
      .expectOne(mockData.api) //Espera uma requisição na url passada 
      .flush(mockData.data);   // Moca esses dados como resposta da requisição
  });


});
