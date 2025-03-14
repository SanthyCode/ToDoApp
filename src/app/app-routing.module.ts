import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
