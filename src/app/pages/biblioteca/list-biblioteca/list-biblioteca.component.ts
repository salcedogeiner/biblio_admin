import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { BibliotecasService } from '../../../@core/data/bibliotecas.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-list-biblioteca',
  templateUrl: './list-biblioteca.component.html',
  styleUrls: ['./list-biblioteca.component.scss'],
  })
export class ListBibliotecaComponent implements OnInit {
  uid: string;
  cambiotab: boolean = false;
  config: ToasterConfig;
  settings: any;

  source: LocalDataSource = new LocalDataSource();

  /* ListBibliotecaComponent
   * @service TranslateService
   * @service bibliotecasService
   * @service ToasterService
  */
  constructor(private translate: TranslateService, private bibliotecasService: BibliotecasService, private toasterService: ToasterService) {
    this.loadData();
    this.cargarCampos();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.cargarCampos();
    });
  }

  /* cargarCampos
  * Description:
  * Load model in table
  */
  cargarCampos() {
    this.settings = {
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      mode: 'external',
      columns: {
       /* _id: {
          title: this.translate.instant('GLOBAL.id'),
          // type: 'number;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },*/
        TipoClasificación: {
          title: this.translate.instant('GLOBAL.tipo_clasificación'),
          // type: 'number;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        Nombre: {
          title: this.translate.instant('GLOBAL.nombre'),
          // type: 'string;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        Telefonos: {
          title: this.translate.instant('GLOBAL.telefonos'),
          // type: 'string;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        HorarioGeneral: {
          title: this.translate.instant('GLOBAL.horario_general'),
          // type: 'string;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        Fax: {
          title: this.translate.instant('GLOBAL.fax'),
          // type: 'string;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        SitioWeb: {
          title: this.translate.instant('GLOBAL.sitio_web'),
          // type: 'string;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        Correo: {
          title: this.translate.instant('GLOBAL.correo'),
          // type: 'string;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        Direccion: {
          title: this.translate.instant('GLOBAL.direccion'),
          // type: 'string;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        CordX: {
          title: this.translate.instant('GLOBAL.cord_x'),
          // type: 'number;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
        CordY: {
          title: this.translate.instant('GLOBAL.cord_y'),
          // type: 'number;',
          valuePrepareFunction: (value) => {
            return value;
          },
        },
      },
    };
  }

  /* useLanguage
   * Description:
   * capture language opt
   */
  useLanguage(language: string) {
    this.translate.use(language);
  }

  /* loadData
   * Description:
   * load records from service
   */
  loadData(): void {
    this.bibliotecasService.get('biblioteca/?limit=0').subscribe(res => {
      if (res !== null) {
        const data = <Array<any>>res;
        this.source.load(data);
          }
    });
  }

  ngOnInit() {
  }

  /* onEdit
   * @param event
   * Description:
   * on edit event capture id record on uid
   */
  onEdit(event): void {
    this.uid = event.data._id;
    this.activetab();
  }

  /* onCreate
   * @param event
   * Description:
   * on edit event reset uid
   */
  onCreate(event): void {
    this.uid = undefined;
    this.activetab();
  }

  /* onDelete
   * @param event
   * Description:
   * delete record using service
   */
  onDelete(event): void {
    const opt: any = {
      title: 'Deleting?',
      text: 'Delete Biblioteca!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    };
    Swal(opt)
    .then((willDelete) => {

      if (willDelete.value) {
        this.bibliotecasService.delete('biblioteca/', event.data).subscribe(res => {
          if (res !== null) {
            this.loadData();
            this.showToast('info', 'deleted', 'Biblioteca deleted');
            }
         });
      }
    });
  }

  activetab(): void {
    this.cambiotab = !this.cambiotab;
  }

  selectTab(event): void {
    if (event.tabTitle === this.translate.instant('GLOBAL.lista')) {
      this.cambiotab = false;
    } else {
      this.cambiotab = true;
    }
  }

  onChange(event) {
    if (event) {
      this.loadData();
      this.cambiotab = !this.cambiotab;
    }
  }


  itemselec(event): void {
    // console.log(event);
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
