import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { FormularioComponent } from './pages/formulario/formulario.component';

const routes: Routes = [
  {path: '', component: ConsultaComponent},
  {path: 'post', component: FormularioComponent},
  {path: 'put/:id', component: FormularioComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
