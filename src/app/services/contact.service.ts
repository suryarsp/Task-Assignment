import { Injectable } from '@angular/core';
import { Contact } from '../contacts/models';
import { MOCKCONTACTS as MOCK_CONTACTS } from 'src/assets/mockData/contacts';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ContactsModule } from '../contacts/contacts.module';

@Injectable({
  providedIn: "root"
})
export class ContactService {
  contacts: BehaviorSubject<Contact[]> = new BehaviorSubject(MOCK_CONTACTS);;
  currentContacts = this.contacts.asObservable();

  /**
   * @param  {Contact} newContact
   */
  createContact(newContact: Contact) {
    const contacts = [newContact, ...this.contacts.getValue()];
    this.contacts.next(contacts);
  }
  /**
   * @param  {Contact} existingContact
   */
  updateContact(existingContact: Contact) {
    const contacts = this.contacts.getValue().map(c => c.contactId === existingContact.contactId ? existingContact : c);
    this.contacts.next(contacts);
  }
  /**
   * @param  {string} contactId
   */
  deleteContacts(contactIdCollection: string[]) {
    let contacts = this.contacts.getValue();
    contactIdCollection.forEach((id) => {
      contacts = contacts.filter(c => c.contactId !== id);
    });
    this.contacts.next(contacts);
  }
  /**
   * @param  {string} contactId
   */
  isLoggedIn(contactId: string) {
    const contacts = this.contacts.getValue().map( contact => {
      if (contact.contactId === contactId) {
        contact.isLoggedIn = true;
      } else {
        contact.isLoggedIn = false;
      }
      return contact;
    }
    );
    this.contacts.next(contacts);
  }
}
