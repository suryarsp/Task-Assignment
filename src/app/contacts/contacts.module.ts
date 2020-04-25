
// Angular Imports
import { NgModule } from '@angular/core';

// 3rd party imports
import { AvatarModule } from 'ngx-avatar';

// Local Imports
import { ContactContainerComponent } from './contact-container/contact-container.component';
import { Routes, RouterModule } from '@angular/router';
import { ContactHeaderComponent } from './contact-container/contact-header/contact-header.component';
import { ContactListComponent } from './contact-container/contact-list/contact-list.component';
import { ContactInformationComponent } from './contact-container/contact-information/contact-information.component';
import { SharedModule } from '../shared/shared/shared.module';



const routes: Routes = [ {
  path: '',
  component: ContactContainerComponent
}];

@NgModule({
  declarations: [
    ContactContainerComponent,
    ContactHeaderComponent,
    ContactListComponent,
    ContactInformationComponent
    ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ContactsModule { }
