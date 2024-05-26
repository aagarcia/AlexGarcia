import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { FormularioComponent } from './pages/formulario/formulario.component';

const routes: Routes = [
  {path: '', component: ConsultaComponent}, //ruta home
  {path: 'post', component: FormularioComponent}, //ruta para insertar
  {path: 'put/:id', component: FormularioComponent}, //ruta para actualizar
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
