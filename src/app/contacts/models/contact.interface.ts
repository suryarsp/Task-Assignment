import { Message } from '.';

export interface Contact {
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
}
