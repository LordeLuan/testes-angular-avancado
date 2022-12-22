import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { PhotoFrameComponent } from './photo-frame.component';
import { PhotoFrameModule } from './photo-frame.module';

describe(PhotoFrameComponent.name, () => {
  let fixture: ComponentFixture<PhotoFrameComponent> = null;
  let component: PhotoFrameComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoFrameModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoFrameComponent);
    component = fixture.componentInstance;
  });

  it('Should create component', () => {
    expect(component).toBeTruthy();
  });

  it(`#${PhotoFrameComponent.prototype.like.name}
    should trigger (@Output liked) once when called
    multiple times within debounce time`, fakeAsync(() => { //FakeAsync util quando precisa aguardar uma ação para continuar o teste
      fixture.detectChanges(); //Inicia o fluxo de vida ddo component, chamando o ngOnInit
      let times = 0;
      component.liked.subscribe(() => times++); //Toda vez que o liked for emitido irá incrementar o times
      component.like();
      component.like();
      tick(500);  //Para a execução do teste por 500milisegundos por causa do debounce para dar tempo de emitir um like
      expect(times).toBe(1);
  }));

  it(`#${PhotoFrameComponent.prototype.like.name}
    should trigger (@Output liked) two times when
    called outside debounce time`, fakeAsync(() => {
      fixture.detectChanges();
      let times = 0;
      component.liked.subscribe(() => times++);
      component.like();
      tick(500);
      component.like();
      tick(500);
      expect(times).toBe(2);
    }));

    it(`(D) Should display number of likes when (@input likes) is incremented`, () => {
      fixture.detectChanges();
      component.likes++;
      fixture.detectChanges(); // Atualiza o número de likes no DOM (html)

      // nativeElement é o DOM do componente
      const element: HTMLElement = fixture.nativeElement.querySelector('.like-counter'); //Pega o elemento HTML com essa classe
      expect(element.textContent.trim()).toBe('1');
      expect(component.likes).toBe(1);
    });

    it(`(D) Should update aria-label when (@Input likes) is incremented`, () => {
      fixture.detectChanges();
      component.likes++;
      fixture.detectChanges();

      const element: HTMLElement = fixture.nativeElement.querySelector('span'); //Pega o elemento HTML span
      expect(element.getAttribute('aria-label')).toBe('1: people liked'); // Testa o aria-label do elemento
    });

    it(`(D) Should have aria-label with 0 (@Input likes) when iniciate a component `, () => {
      fixture.detectChanges();

      const element: HTMLElement = fixture.nativeElement.querySelector('span'); //Pega o elemento HTML span
      expect(element.getAttribute('aria-label')).toBe('0: people liked'); // Testa o aria-label do elemento
    });

    it(`(D) Should display image with src and description when bound to properties`, () => {
      const description = 'some description';
      const src = 'http://somesite.com/img.jpg';

      // Moca a informação no componente
      component.src = src;
      component.description = description;

      fixture.detectChanges(); // Atualiza o DOM

      const img: HTMLImageElement = fixture.nativeElement.querySelector('img'); // Pega a imagem

      expect(img.getAttribute('src')).toBe(src);
      expect(img.getAttribute('alt')).toBe(description);
    });


});
