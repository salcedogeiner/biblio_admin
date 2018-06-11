import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BibliotecaComponent } from './biblioteca.component';
import { ListBibliotecaComponent } from './list-biblioteca/list-biblioteca.component';
import { CrudBibliotecaComponent } from './crud-biblioteca/crud-biblioteca.component';



const routes: Routes = [{
  path: '',
  component: BibliotecaComponent,
  children: [{
    path: 'list-biblioteca',
    component: ListBibliotecaComponent,
  }, {
    path: 'crud-biblioteca',
    component: CrudBibliotecaComponent,
  }],
}];

@NgModule({
  imports: [
      RouterModule.forChild(routes),
  ],
  exports: [
      RouterModule,
  ],
})

export class BibliotecaRoutingModule { }

export const routedComponents = [
  BibliotecaComponent,
  ListBibliotecaComponent,
  CrudBibliotecaComponent,
];
