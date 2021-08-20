import { BaseAnuncioProduto } from './../../base-anuncio-produto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-anuncio-loja',
  templateUrl: './edit-anuncio-loja.component.html',
  styleUrls: ['./edit-anuncio-loja.component.css']
})
export class EditAnuncioLojaComponent extends BaseAnuncioProduto implements OnInit {


  ngOnInit(): void {
    this.controller = 'anunciosloja';
    super.ngOnInit();
  }

}
