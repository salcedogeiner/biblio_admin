
import { Biblioteca } from './../../../@core/data/models/biblioteca';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BibliotecasService } from '../../../@core/data/bibliotecas.service';
import { FORM_BIBLIOTECA } from './form-biblioteca';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';
// import { DinamicformComponent } from '../../../@theme/components/dinamicform/dinamicform.component';

@Component({
  selector: 'ngx-crud-biblioteca',
  templateUrl: './crud-biblioteca.component.html',
  styleUrls: ['./crud-biblioteca.component.scss'],
})
export class CrudBibliotecaComponent implements OnInit {
  config: ToasterConfig;
  biblioteca_id: string;
  lng = -74.15503194700922;
  lat = 4.643026768049774;

  // biblioteca_id for search and load on forms
  @Input('biblioteca_id')
  set name(biblioteca_id: string) {
    this.biblioteca_id = biblioteca_id;
    this.loadBiblioteca();
  }

  // eventChange for notify any changes events
  @Output() eventChange = new EventEmitter();

  // params for controller
  info_biblioteca: Biblioteca;  // main model
  formBiblioteca: any;  // form json
  regBiblioteca: any;
  clean: boolean; // flag for clean

  /* CrudBibliotecaComponent
   * @service TranslateService
   * @service bibliotecasService
   * @service ToasterService
  */
  constructor(private translate: TranslateService, private bibliotecasService: BibliotecasService, private toasterService: ToasterService) {
    this.formBiblioteca = FORM_BIBLIOTECA;
    this.construirForm();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.construirForm();
    });
   }

  /* construirForm
   * Description:
   * Use json form and implements i18n
   */
  construirForm() {
    this.formBiblioteca.titulo = this.translate.instant('GLOBAL.biblioteca');
    this.formBiblioteca.btn = this.translate.instant('GLOBAL.guardar');
    for (let i = 0; i < this.formBiblioteca.campos.length; i++) {
      this.formBiblioteca.campos[i].label = this.translate.instant('GLOBAL.' + this.formBiblioteca.campos[i].label_i18n);
      this.formBiblioteca.campos[i].placeholder = this.translate.instant('GLOBAL.placeholder_' + this.formBiblioteca.campos[i].label_i18n);
    }
  }

  /* useLanguage
   * Description:
   * capture language opt
   */
  useLanguage(language: string) {
    this.translate.use(language);
  }

  /* getIndexForm
   * Description:
   * obtain index from element in form
   */
  getIndexForm(nombre: String): number {
    for (let index = 0; index < this.formBiblioteca.campos.length; index++) {
      const element = this.formBiblioteca.campos[index];
      if (element.nombre === nombre) {
        return index
      }
    }
    return 0;
  }

  /* loadBiblioteca
   * Description:
   * load model from web service
   */
  public loadBiblioteca(): void {
    this.info_biblioteca = new Biblioteca();
    delete this.info_biblioteca._id;
    this.clean = !this.clean;
    if (this.biblioteca_id !== undefined && this.biblioteca_id !== '' ) {
      this.bibliotecasService.get('biblioteca/' + this.biblioteca_id)
        .subscribe(res => {
          if (res !== null) {
            this.info_biblioteca = <Biblioteca>res;
          }
        });
    }
  }

  /* updateBiblioteca
   * Description:
   * update model from web service
   */
  updateBiblioteca(biblioteca: any): void {
    const opt: any = {
      title: 'Update?',
      text: 'Update Biblioteca!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        this.info_biblioteca = <Biblioteca>biblioteca;
        this.bibliotecasService.put('biblioteca', this.info_biblioteca)
          .subscribe(res => {
            this.loadBiblioteca();
            this.eventChange.emit(true);
            this.showToast('info', 'updated', 'Biblioteca updated');
          });
      }
    });
  }

  /* createBiblioteca
   * Description:
   * create model from web service
   */
  createBiblioteca(biblioteca: any): void {
    const opt: any = {
      title: 'Create?',
      text: 'Create Biblioteca!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {
      if (willDelete.value) {
        this.info_biblioteca = <Biblioteca>biblioteca;
        this.bibliotecasService.post('biblioteca', this.info_biblioteca)
          .subscribe(res => {
            this.info_biblioteca = <Biblioteca>res;
            this.eventChange.emit(true);
            this.showToast('info', 'created', 'Biblioteca created');
          });
      }
    });
  }

  ngOnInit() {
    this.loadBiblioteca();
  }

  /* validarForm
   * @param event
   * Description:
   * when event is valid update or create a model
   */
  validarForm(event) {
    if (event.valid) {
      if (this.info_biblioteca._id === undefined) {
        this.createBiblioteca(event.data.Biblioteca);
      } else {
        this.updateBiblioteca(event.data.Biblioteca);
      }
    }
  }

  /* binding
   * @param event
   * Description:
   * capture changes on form
   */
  binding(event) {
    if (event.nombre === 'CordX') {
      this.info_biblioteca.CordX = event.valor;
    }
    if (event.nombre === 'CordY') {
      this.info_biblioteca.CordY = event.valor;
    }
  }

  /* update_pos
   * @param event
   * Description:
   * update pos in model
   */
  update_pos(event) {
    this.info_biblioteca.CordX = event.coords.lat;
    this.info_biblioteca.CordY = event.coords.lng;
  }

  private showToast(type: string, title: string, body: string) {
    this.config = new ToasterConfig({
      // 'toast-top-full-width', 'toast-bottom-full-width', 'toast-top-left', 'toast-top-center'
      positionClass: 'toast-top-center',
      timeout: 5000,  // ms
      newestOnTop: true,
      tapToDismiss: false, // hide on click
      preventDuplicates: true,
      animation: 'slideDown', // 'fade', 'flyLeft', 'flyRight', 'slideDown', 'slideUp'
      limit: 5,
    });
    const toast: Toast = {
      type: type, // 'default', 'info', 'success', 'warning', 'error'
      title: title,
      body: body,
      showCloseButton: true,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }

}
