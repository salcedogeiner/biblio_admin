import { BibliotecaRoutingModule, routedComponents } from './biblioteca-routing.module';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { BibliotecasService } from '../../@core/data/bibliotecas.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';
import { CrudBibliotecaComponent } from './crud-biblioteca/crud-biblioteca.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    ThemeModule,
    BibliotecaRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCpVhQiwAllg1RAFaxMWSpQruuGARy0Y1k',
      libraries: ['places'],
    }),
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    BibliotecasService,
  ],
  exports: [
    CrudBibliotecaComponent,
  ],
})
export class BibliotecaModule { }
