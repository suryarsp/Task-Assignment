import { Component, ChangeDetectorRef } from '@angular/core';
import { Navigation } from './models';
import { ContactService } from './services/contact.service';
import { MatSelectChange } from '@angular/material/select';
import { Contact } from './contacts/models';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  navigations: Navigation[];
  loggedInControl = new FormControl('');

  constructor(public contactService: ContactService) {
    this.navigations = [
      {
        displayName: 'Home',
        routePath: 'home',
        iconName: 'home'
      },
      {
        displayName: 'Contacts',
        routePath: 'contacts',
        iconName: 'person'
      },
      {
        displayName: 'Sheets',
        routePath: 'sheets',
        iconName: 'description'
      },
      {
        displayName: 'Storage',
        routePath: 'storage',
        iconName: 'storage'
      },
      {
        displayName: 'Calendar',
        routePath: 'calendar',
        iconName: 'date_range'
      },
      {
        displayName: 'Settings',
        routePath: 'settings',
        iconName: 'settings'
      }
    ];

    this.contactService.currentContacts.subscribe((contacts) => {
      this.loggedInControl.setValue(contacts.find(c => c.isLoggedIn));
    });
  }

  onCloseSideNav() {
      const container = document.querySelector('.example-container');
      toggleClass(container, 'collapsed');
  }

  onSelectLoginContact(contact: Contact) {
    this.contactService.isLoggedIn(contact.contactId);
  }
}


export function addClass(el, className) {
  if (!el)
    return;
  if (!el.length) {
    el.classList.add(className);
  } else {
    for (var i = 0; i < el.length; i++) {
      el[i].classList.add(className);
    }
  }
}

export function removeClass(el, className) {
  if (!el || el.length === 0)
    return;
  if (!el.length) {
    el.classList.remove(className);
  } else {
    for (var i = 0; i < el.length; i++) {
      el[i].classList.remove(className)
    }
  }
}

export function toggleClass(el, className) {
  if (!el)
    return;
  if (el.length !== undefined) {
    if (hasClass(el[0], className)) {
      removeClass(el, className);
    } else {
      addClass(el, className);
    }
  } else {
    if (hasClass(el, className)) {
      removeClass(el, className);
    } else {
      addClass(el, className);
    }
  }
}

  export function hasClass(el, className) {
    if (!el)
      return;
    return (` ${el.className} `).replace(/[\n\t]/g, ' ').indexOf(` ${className} `) > -1;
  }
