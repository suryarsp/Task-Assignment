import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contact } from 'src/app/contacts/models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-create-contact-dialog',
  templateUrl: './create-contact-dialog.component.html',
  styleUrls: ['./create-contact-dialog.component.scss']
})
export class CreateContactDialogComponent implements OnInit {
  contactForm: FormGroup;
  contact: Contact;
  headerTitle: string;
  constructor(public dialogRef: MatDialogRef<CreateContactDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { contact: Contact, title: string},
              public formBuilder: FormBuilder) {
                this.contact = data.contact;
                this.headerTitle = data.title;
               }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      firstName: [this.contact.firstName, Validators.compose([Validators.required, Validators.maxLength(50)]) ],
      lastName: [this.contact.lastName, Validators.compose([Validators.required, Validators.maxLength(50)])],
      emailAddress: [this.contact.emailAddress, Validators.compose([Validators.required, Validators.email])],
      phoneNumber: [this.contact.phoneNumber],
      company: [this.contact.company],
      address: [this.contact.address],
    });
  }

}
