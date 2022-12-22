import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LikeWidgetComponent } from './like-widget.component';
import { LikeWidgetModule } from './like-widget.module';

describe(LikeWidgetComponent.name, () => {
  let fixture: ComponentFixture<LikeWidgetComponent> = null;
  let component: LikeWidgetComponent = null;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LikeWidgetModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LikeWidgetComponent);
    component = fixture.componentInstance;
  });

  it('Should create component', () => {
    expect(component).toBeTruthy();
  });

  it('Should auto-generate ID during ngOnInit when (@Input id) is not assigned', () => {
    fixture.detectChanges();
    expect(component.id).toBeTruthy();
  });

  it('Should NOT auto-generate ID during ngOnInit when (@Input id) is assigned', () => {
    const someId = 'someId';
    component.id = someId;
    fixture.detectChanges();
    expect(component.id).toBe(someId);
  });

  it(`#${LikeWidgetComponent.prototype.like.name}
    should trigger (@Output liked) when called`, () => {
    spyOn(component.liked, 'emit');
    fixture.detectChanges();
    component.like();
    expect(component.liked.emit).toHaveBeenCalled();
  });

  it(`(D) Should display number of likes when clicked`, done => {
    fixture.detectChanges();
    component.liked.subscribe(()=>{ //Se inscreve no atributo para quando for clicado gerar as ações
      component.likes++;
      fixture.detectChanges();
      const countEl:HTMLElement =  fixture.nativeElement.querySelector('.like-counter');
      expect(countEl.textContent.trim()).toBe('1');
      done(); //Indica ao Jasmine quando o teste deve acabar;
    });

    const likeWidgetContainer: HTMLElement = fixture.nativeElement.querySelector('.like-widget-container'); // Pega o elemento do html
    likeWidgetContainer.click(); // Simula o evento de clique no botão
  });

  it(`(D) Should display number of likes when ENTER key is pressed`, done => {
    fixture.detectChanges();
    component.liked.subscribe(()=>{ //Se inscreve no atributo para quando for clicado gerar as ações
      component.likes++;
      fixture.detectChanges();
      const countEl:HTMLElement =  fixture.nativeElement.querySelector('.like-counter');
      expect(countEl.textContent.trim()).toBe('1');
      done(); //Indica ao Jasmine quando o teste deve acabar;
    });

    const likeWidgetContainer: HTMLElement = fixture.nativeElement.querySelector('.like-widget-container'); // Pega o elemento do html

    const event = new KeyboardEvent('keyup', { key: 'Enter'}); // Cria um evento do botão enter
    likeWidgetContainer.dispatchEvent(event); // Dispacha o evento enter no botão
  });


});
