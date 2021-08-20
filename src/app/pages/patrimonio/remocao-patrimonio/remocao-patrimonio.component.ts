import { RemocaoPatrimonio } from './../../../../models/remocao-patrimonio';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Patrimonio } from 'src/models/patrimonio';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-remocao-patrimonio',
  templateUrl: './remocao-patrimonio.component.html',
  styleUrls: ['./remocao-patrimonio.component.css']
})
export class RemocaoPatrimonioComponent implements OnInit {
  @Input() patrimonio: Patrimonio;
  @Input() controller;
  @Input() isVisible;
  @Input()  remocao:RemocaoPatrimonio;
  @Output() emitir: EventEmitter<RemocaoPatrimonio> = new EventEmitter();

  dateFormat = 'dd/MM/yyyy';

  validateForm!: FormGroup;
  constructor(
    private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      motivo: [null, [Validators.required]],
      dataRemocao: [null, [Validators.required]],
      a3: [null, [Validators.required]],
      a4: [null, [Validators.required]],
    })
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  handleOk(): void {

    this.isVisible = false;
    this.emitir.emit(this.remocao);

  }
enviar(){

}
}
