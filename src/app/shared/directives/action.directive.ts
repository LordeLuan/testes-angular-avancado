import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[appAction]',
})
export class ActionDirective {
  //O objetivo dessa diretiva é pegar o evento no componente onde foi chamado seja ele clique ou keyboad e repassa o evento para o metodo

  @Output()
  public appAction: EventEmitter<Event> = new EventEmitter();

  @HostListener('click', ['$event'])  // Quando tiver um evento click na diretiva, pega o evento gerado e passa como parametro
  public handleClick(event: Event): void {
    this.appAction.emit(event);
  }

  @HostListener('keyup', ['$event'])  // Quando tiver um evento click na diretiva, pega o evento gerado e passa como parametro
  public handleKeyUp(event: KeyboardEvent): void {
    this.appAction.emit(event);
  }
}
