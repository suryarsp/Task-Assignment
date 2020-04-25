import { Injectable } from '@angular/core';
import { Contact } from '../contacts/models';
import { MOCKCONTACTS as MOCK_CONTACTS } from 'src/assets/mockData/contacts';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: BehaviorSubject<Contact[]>;

  constructor() {
      this.contacts = new BehaviorSubject(MOCK_CONTACTS);
  }

  createContact(newContact: Contact) {
    const contacts = this.contacts.value.splice( 0, 0, newContact);
    this.contacts.next(contacts);
  }

  updateContact(existingContact: Contact) {
    const contacts = this.contacts.value.map(c => c.contactId === existingContact.contactId ? existingContact : c);
    this.contacts.next(contacts);
  }

  deleteContact(contactId: string) {
    const contacts = this.contacts.value.filter(c => c.contactId !== contactId);
    this.contacts.next(contacts);
  }
}
