import { Message } from '.';

export class Contact {
   contactId: string;
   firstName: string;
   lastName: string;
   emailAddress: string;
   company: string;
   address: string;
   isLoggedIn: boolean;
   phoneNumber: string;
   messages: Message[];
   isSelected: boolean;

   constructor(
    contactId: string,
    firstName: string,
    lastName: string,
    emailAddress: string,
    company: string,
    address: string,
    isLoggedIn: boolean,
    phoneNumber: string,
    messages: Message[],
    isSelected: boolean,
   ) {
      this.contactId = contactId;
      this.firstName = firstName;
      this.lastName = lastName;
      this.emailAddress = emailAddress;
      this.company = company;
      this.address = address;
      this.isLoggedIn = isLoggedIn;
      this.phoneNumber = phoneNumber;
      this.messages = messages;
      this.isSelected = isSelected;
   }
}
