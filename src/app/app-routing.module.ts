import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactContainerComponent } from './contacts/contact-container/contact-container.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  {
  path: '',
  redirectTo: 'contacts',
  pathMatch: 'full'
  },
  {
    path: 'contacts',
    loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
