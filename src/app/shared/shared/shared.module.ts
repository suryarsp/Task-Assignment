// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule} from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatRippleModule} from '@angular/material/core';
import {
  DEFAULT_BREAKPOINTS,
  BREAKPOINTS,
  BreakPoint
} from '@angular/flex-layout'


// 3rd party imports
import { AvatarModule } from 'ngx-avatar';

import {  ReactiveFormsModule } from '@angular/forms';
import { CreateContactDialogComponent } from './create-contact-dialog/create-contact-dialog.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ChatDialogComponent } from './chat-dialog/chat-dialog.component';


/**
 * For mobile and tablet, reset ranges
 */
function updateBreakpoints(bp:BreakPoint) {
  switch (bp.alias) {
    case 'xs' : bp.mediaQuery =  '(max-width: 700px)'; break;
    case 'xsl' : bp.mediaQuery =  '(min-width: 376px) and (max-width: 425px)'; break;
    case 'xsm' : bp.mediaQuery =  '(min-width: 321px) and (max-width: 375px)'; break;
    case 'xss' : bp.mediaQuery =  '(min-width: 320px)'; break;
  }
  return bp;
}
@NgModule({
  declarations: [CreateContactDialogComponent, ConfirmationDialogComponent, ChatDialogComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    AvatarModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatCardModule,
    MatDividerModule,
    MatRippleModule
  ],
  exports: [
    CommonModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    AvatarModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatCardModule,
    MatDividerModule,
    MatRippleModule
  ],
  providers: [
    {
      provide: BREAKPOINTS,
      useFactory : function customizeBreakPoints() {
        return DEFAULT_BREAKPOINTS.map( updateBreakpoints );
      }
    }
  ]
})
export class SharedModule { }
