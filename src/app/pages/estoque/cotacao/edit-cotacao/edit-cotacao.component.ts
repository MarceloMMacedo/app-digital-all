import { UtilsService } from 'src/services/utils.service';
import { SeviceGeralService } from 'src/services/sevice-geral.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EditGeneric } from 'src/app/pages/genericclasses/edit-generic';


@Component({
  selector: 'app-edit-cotacao',
  templateUrl: './edit-cotacao.component.html',
  styleUrls: ['./edit-cotacao.component.css']
})
export class EditCotacaoComponent extends EditGeneric implements OnInit {
  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public servicegeral: SeviceGeralService,
    public utilservice: UtilsService,
    public message: NzMessageService,
  ) {
    super(router, servicegeral, 'cotacoes', activatedRoute, utilservice);
  }
  ngOnInit(): void {
    this.index = this.activatedRoute.snapshot.paramMap.get('id');
    let i = 1;
     this.load();
    this.time = setInterval(async () => {
      this.isrealy = false;
      try {
      await  this.load();
      } catch (error) {

      }
    }, 500);
  }
  async load() {
    this.servicegeral.getAny(`${this.controller}/cotacao/${this.index}` )
      .then(
        (response) => {
          this.isrealy = true;
          this.obj = response;
          console.log(this.obj);

          if (this.time) {
            clearInterval(this.time);
          }

          this.isrealy = true;

        },
        (error) => { }
      );

  }

}
