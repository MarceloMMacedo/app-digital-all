import { Observable } from 'rxjs';

import { Pages } from '../models/pages';


import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { UtilsService } from './utils.service';
import { BaseDto } from '../models/base-dto';
import { SampleDto } from '../models/sample-dto';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class SeviceGeralService {
  constructor(
    private utilservice: UtilsService,
    private hhtp: HttpClient,
    private notification: NzNotificationService
  ) { }
_obj:any;
  /*get lista geral deternimdo pela variavel controllet*/
  async listany(controller: string): Promise<any> {
    return this.hhtp.get<any>(`${API_CONFIG.baseUrl}/${controller}/listany`).toPromise();
  }

  async putobj(controller: string, obj: any): Promise<any> {
    return this.hhtp.put(`${API_CONFIG.baseUrl}/${controller}`, obj, { observe: 'response', responseType: 'text' }).toPromise();
  }
  async getcnpj(controller: string, id, cnpj): Promise<any> {
    return this.hhtp.get<any>(`${API_CONFIG.baseUrl}/${controller}/${id}/receitaws?cnpj=${cnpj}`).toPromise();
  }
  async getlistageral(controller: string, lista): Promise<any> {
    return this.hhtp.get<any>(`${API_CONFIG.baseUrl}/${controller}/${lista}`).toPromise();
  }

  async findbynome(controller: string, nome): Promise<any> {
    return this.hhtp.get<any>(`${API_CONFIG.baseUrl}/${controller}/findbynome?nome=${nome}`).toPromise();
  }

  async getnomes(controller: string): Promise<string[]> {
    return this.hhtp.get<string[]>(`${API_CONFIG.baseUrl}/${controller}/getnomes`).toPromise();
  }
  async getAll(controller: string): Promise<any> {
    return this.hhtp.get<any>(`${API_CONFIG.baseUrl}/${controller}`).toPromise();
  }
  async getAny(controller: string): Promise<any> {
    return this.hhtp.get<any>(`${API_CONFIG.baseUrl}/${controller}`).toPromise();
  }
  async getAllsample(controller: string): Promise<BaseDto[]> {
    return this.hhtp.get<BaseDto[]>(`${API_CONFIG.baseUrl}/${controller}/getallsample`).toPromise();
  }
  async getAllsampledto(controller: string): Promise<SampleDto[]> {
    return this.hhtp.get<SampleDto[]>(`${API_CONFIG.baseUrl}/${controller}/getallsampledto`).toPromise();
  }
  async getAnyPage(controller: string, find: string, page): Promise<Pages> {
    return this.hhtp.get<Pages>(`${API_CONFIG.baseUrl}/${controller}?nome=${find}&page=${page}&size=10`).toPromise();
  }

  async getallpagesampledto(controller: string, find: string, page): Promise<Pages> {
    return this.hhtp.get<Pages>(`${API_CONFIG.baseUrl}/${controller}/getallpagesampledto?nome=${find}&page=${page}&size=10`).toPromise();
  }

  async pagesample(controller: string, find: string, page): Promise<Pages> {
    return await this.hhtp.get<Pages>(`${API_CONFIG.baseUrl}/${controller}/pagesample?nome=${find}&page=${page}&size=10`).toPromise();
  }

  async findallpage(controller: string, find: string, page): Promise<any> {
    return this.hhtp.get<any>(`${API_CONFIG.baseUrl}/${controller}/page?nome=${find}&page=${page}&size=10`).toPromise();
  }
  async fingbyid(controller: string, find: string): Promise<any> {
    return this.hhtp.get<any>(`${API_CONFIG.baseUrl}/${controller}/fingbyid?fingbyid=${find}`).toPromise();
  }
  async fingbynome(controller: string, find: string): Promise<any[]> {
    return this.hhtp.get<any[]>(`${API_CONFIG.baseUrl}/${controller}/fingbynome?fingbynome=${find}`).toPromise();
  }
  async newobj(controller: string, obj: any): Promise<any> {
    return this.hhtp.put(`${API_CONFIG.baseUrl}/${controller}/newobj`, obj, { observe: 'response', responseType: 'text' }).toPromise();
  }
  async saveobj(controller: string, obj: any, id): Promise<any> {
    return this.hhtp.post(`${API_CONFIG.baseUrl}/${controller}/saveobj/${id}`, obj, { observe: 'response', responseType: 'text' }).toPromise();
  }
  async excluirbyid(controller: string, id): Promise<any> {
    return this.hhtp.delete(`${API_CONFIG.baseUrl}/${controller}/${id}`).toPromise();
  }
  /*uploadfile(event, controller: string, id, obj: any) {
    const foto = event.target.files[0];
    const formData = new FormData();
    formData.set('file', foto);
    this.hhtp.post(`${API_CONFIG.baseUrl}/${controller}/${id}/uploadfile`, formData, { observe: 'response', responseType: 'text', reportProgress: true })
      .toPromise()
      .then(
        (rest) => {
          console.log(rest);
          this.utilservice.createNotification('success', 'Imagem Atualizado com sucesso', 'Sucesso');
          obj.imagem = rest.body;
        }
      )
    return obj;
  }
  */
  uploadfile(controller,id,formData: FormData): Promise<any>  {
    return this.hhtp.post(`${API_CONFIG.baseUrl}/${controller}/${id}/uploadfile`, formData, { observe: 'response', responseType: 'text', reportProgress: true })
      .toPromise() ;
  }
  //Empresa
  empresaUpload(formData: FormData): Promise<any> {
    return this.hhtp.post(`${API_CONFIG.baseUrl}/empresas/uploadfile`, formData, { observe: 'response', responseType: 'text' })
      .toPromise();
  }
  createNotification(type, msg, title): void {
    // this.messageService.add({ severity: type, summary: title, detail: msg });
    switch (type) {
      case 'success':
        this.notification.success(title, msg);
        break;
      case "info":
        this.notification.info(title, msg);
        break;
      case "warn":
        this.notification.warning(title, msg);
        break;
      case "error":
        this.notification.error(title, msg);
        break;
      default:
    }
  }

    getAnyObservable(controller: string): Observable<any> {
    return this.hhtp.get<any>(`${API_CONFIG.baseUrl}/${controller}`) ;
  }
}
