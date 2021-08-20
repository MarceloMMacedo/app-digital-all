import { SampleDto } from './../../../../../models/sample-dto';
import { HistoricoContaPagar } from './../../../../../models/historico-conta-pagar';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SeviceGeralService } from './../../../../../services/sevice-geral.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-edit-hintoricocontaspagar',
  templateUrl: './edit-hintoricocontaspagar.component.html',
  styleUrls: ['./edit-hintoricocontaspagar.component.css']
})
export class EditHintoricocontaspagarComponent implements OnInit {

  @Input() historico: HistoricoContaPagar;
  @Input() isVisible:boolean;
  @Output() onsave:EventEmitter<any> = new EventEmitter();
  bancos: SampleDto[];
  centrocustos: SampleDto[];

  validateFormHS: FormGroup;

  constructor(  private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private modalService: NzModalService,
    private router: Router,
    private servicegeral: SeviceGeralService,
    private message: NzMessageService, ) {


     }

  ngOnInit(): void {
    this.servicegeral.getAllsampledto('bancos')
    .then(
      rest=>{
        this.bancos=rest;
        console.log(rest);

      }
    )
    this.servicegeral.getAllsampledto('centrocustos')
    .then(
      rest=>{
        this.centrocustos=rest
      }
    )
    this.validateFormHS = this.fb.group({
      nome: [null, [Validators.required]],
      banco: [null, [Validators.required]],
      centrocusto: [null, [Validators.required]],
    });
  }
  public errorHandling = (control: string, error: string) => {
    return this.validateFormHS.controls[control].hasError(error);
 }
 submitForm(): void {
   /*for (const i in this.validateForm.controls) {
     this.validateForm.controls[i].markAsDirty();
     this.validateForm.controls[i].updateValueAndValidity();
   }
   */
 }
 handleOk(): void {
  this.onsave.emit();
  this.isVisible = false;

}

handleCancel(): void {
  this.isVisible = false;
}
}
