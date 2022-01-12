import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ChartsComponent } from './charts/charts.component';
import { StartPageComponent } from './start-page/start-page.component';
import { NoteComponent } from './note/note.component';

const routes: Routes = [
  { path: 'charts', component: ChartsComponent},
  { path: 'addition', component: NoteComponent},
  { path: '', component: StartPageComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
