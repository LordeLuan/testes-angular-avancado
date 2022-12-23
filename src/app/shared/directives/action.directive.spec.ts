import { ActionDirectiveModule } from './action.module';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ActionDirective } from './action.directive';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
describe(ActionDirective.name, () => {

  let fixture: ComponentFixture<ActionDirectiveTestComponent>;
  let component: ActionDirectiveTestComponent
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations:[ActionDirectiveTestComponent],
      imports: [ActionDirectiveModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ActionDirectiveTestComponent);
    component = fixture.componentInstance;
  });

  it(`(D) (@Output appAction) should emit event with payload when ENTER key is pressed`, ()=>{
    const div: HTMLDivElement = fixture.nativeElement.querySelector('.dummy-component');

    // Cria um evento do tipo enter e dispara ele na div onde tem a diretiva
    const event = new KeyboardEvent('keyup', {key: 'Enter'});
    div.dispatchEvent(event);

    expect(component.hasEvent()).toBe(true);
  });

  it(`(D) (@Output appAction) should emit event with payload when CLICKED key is pressed`, ()=>{
    // const div: HTMLDivElement = fixture.nativeElement.querySelector('.dummy-component');

    // Forma de busca do proprio angular para localizar pelo tipo como a diretiva.
    const div = fixture.debugElement.query(By.directive(ActionDirective)).nativeElement;
    // Cria um evento do tipo click e dispara ele na div onde tem a diretiva
    const event = new Event('click');
    div.dispatchEvent(event);

    expect(component.hasEvent()).toBe(true);
  });

});

// Componente para testar a diretiva
@Component({
  template:`<div class="dummy-component" (appAction)="actionHandler($event)"></div>`
})
class ActionDirectiveTestComponent{

  private event: Event = null;
  // Passa o evento gerado na chamada da diretiva ao atributo
  public actionHandler(event: Event): void {
    this.event = event;
  }
  //Verifica se a diretiva foi chamada
  public hasEvent():boolean{
    return !!this.event;
  }
}
