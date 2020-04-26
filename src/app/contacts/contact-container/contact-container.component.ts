import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { Contact } from '../models';
import { Subscription, Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CreateContactDialogComponent } from 'src/app/shared/shared/create-contact-dialog/create-contact-dialog.component';
import { Guid } from 'guid-typescript';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/shared/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-contact-container',
  templateUrl: './contact-container.component.html',
  styleUrls: ['./contact-container.component.scss']
})
export class ContactContainerComponent implements OnInit {
  contacts: Contact[] = [];
  selectedContact: Contact;
  selectedCount: number;
  subscription: Subscription;
  searchControl = new FormControl();
  filteredContacts: Observable<Contact[]>;
  constructor(private contactService: ContactService,
              private matSnackBar: MatSnackBar,
              private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.subscription = this.contactService.currentContacts.subscribe((contacts) => {
      this.contacts = contacts.filter(c => !c.isLoggedIn);
      this.selectedContact = null;
      this.selectedCount = 0;
    });

    this.filteredContacts = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.firstName),
        map(name => name ? this._filter(name) : this.contacts.slice())
    );
  }

  deleteContacts() {
    const selectedContacts = this.contacts.filter(c => c.isSelected);
    const contactIdCollection = selectedContacts.map(c => c.contactId);

    const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
      data: `Are you sure want to delete ${selectedContacts.length} contact(s)?`
      ,
      disableClose: true,
      minHeight: '20%',
      minWidth: '30%'
    });

    dialogRef.afterClosed().subscribe((canDelete) => {
      if (canDelete) {
        this.contactService.deleteContacts(contactIdCollection);
        this.matSnackBar.open(`${ selectedContacts.length} contact(s) deleted`, 'close', { duration: 2000});
      }
    });
  }

  deleteContact(contact: Contact) {
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
      data: `Are you sure want to delete ${contact.firstName} ${contact.lastName} ?`,
      disableClose: true,
      minHeight: '20%',
      minWidth: '30%'
    });

    dialogRef.afterClosed().subscribe((canDelete) => {
      if (canDelete) {
        this.contactService.deleteContacts([contact.contactId]);
        this.matSnackBar.open(`${ contact.firstName} ${ contact.lastName} deleted`, 'close', { duration: 2000});
      }
    });
  }

  editContact(contact: Contact) {
    const dialogRef = this.matDialog.open(CreateContactDialogComponent, {
      data: {
        contact,
        title: 'Edit Contact'
      },
      disableClose: true,
      minHeight: '50%',
      minWidth: '50%'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result && typeof result === 'string') {
        return;
      }
      const newContact: Contact = Object.assign({}, contact, result);
      this.contactService.createContact(newContact);
      this.matSnackBar.open(`${newContact.firstName} ${ newContact.lastName} updated`, 'close', { duration: 2000});
    });
  }

  createContact() {
    const contact = new Contact(Guid.create().toString(), '', '', '', '', '', false, '', [], false);
    const dialogRef = this.matDialog.open(CreateContactDialogComponent, {
      data: {
        contact,
        title: 'Create Contact'
      },
      disableClose: true,
      minHeight: '50%',
      minWidth: '50%'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result && typeof result === 'string') {
        return;
      }
      const newContact: Contact = Object.assign({}, contact, result);
      this.contactService.createContact(newContact);
      this.matSnackBar.open(`${newContact.firstName} ${ newContact.lastName} created`, 'close', { duration: 2000});
    });
  }

  resetValue() {
    this.selectedContact = null;
    this.selectedCount = 0;
  }

  contactSelectionChange({checked, contact}: {checked: boolean, contact: Contact}) {
    contact.isSelected = checked;
    this.selectedContact = { ...contact};
    this.contacts = this.contacts.map(c => c.contactId === contact.contactId ? this.selectedContact : c);
    this.selectedCount = this.getSelectedCount();
  }

  getSelectedCount() {
    return this.contacts.filter(c => c.isSelected).length;
  }

  private _filter(value: string): Contact[] {
    const filterValue = value.toLowerCase();
    return this.contacts.filter(c => c.emailAddress.toLowerCase().indexOf(filterValue) === 0);
  }

  displayFn(contact: Contact): string {
    return contact && contact.contactId ? contact.firstName + contact.lastName : '';
  }
}
