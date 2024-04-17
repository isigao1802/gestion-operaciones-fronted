import { Directive, HostListener, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[appFormatoFecha]'
})
export class FormatoFechaDirective {

  constructor(private el: ElementRef, private control: NgControl, private ngModel: NgModel) { }

  @HostListener('input')

  onInputChange(event: any) {
    if (event) {
      // Formatear la fecha al formato dd/mm/aaaa
      const parts = event.split('-');
      const formattedDate = parts.reverse().join('/');
      this.ngModel.valueAccessor.writeValue(formattedDate);
    }
  }
  onModelChange() {
    let inputValue: string = this.el.nativeElement.value;
    const fecha = new Date(inputValue);
    if (!isNaN(fecha.getTime())) {
      const fechaFormateada = this.formatDate(fecha);
      this.control.valueAccessor.writeValue(fechaFormateada);
    }
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
