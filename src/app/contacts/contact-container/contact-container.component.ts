import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { Contact } from '../models';
import { Subscription, Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-contact-container',
  templateUrl: './contact-container.component.html',
  styleUrls: ['./contact-container.component.scss']
})
export class ContactContainerComponent implements OnInit {
  contacts: Contact[];
  selectedContact: Contact;
  selectedCount: number;
  subscription: Subscription;
  searchControl = new FormControl();
  filteredContacts: Observable<Contact[]>;
  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.subscription = this.contactService.contacts.subscribe((contacts) => {
      this.contacts = contacts;
      this.selectedContact = null;
      this.selectedCount = 0;
    });

    this.filteredContacts = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.firstName),
        map(name => name ? this._filter(name) : this.contacts.slice())
    );
  }


  deleteContact(contactId: string) {

  }

  editContact(contact: Contact) {

  }

  createContact(contact: Contact) {

  }

  resetValue() {
    this.selectedContact = null;
    this.selectedCount = 0;
  }

  contactSelectionChange({checked, contact}: {checked: boolean, contact: Contact}) {
    contact.isSelected = checked;
    this.contacts = this.contacts.map(c => c.contactId === contact.contactId ? this.selectedContact : c);
  }

  private _filter(value: string): Contact[] {
    const filterValue = value.toLowerCase();
    return this.contacts.filter(c => c.emailAddress.toLowerCase().indexOf(filterValue) === 0);
  }

  displayFn(contact: Contact): string {
    return contact && contact.contactId ? contact.firstName + contact.lastName : '';
  }
}
