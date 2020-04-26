import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contact } from 'src/app/contacts/models';

@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.scss']
})
export class ChatDialogComponent implements OnInit {
  messageControl = new FormControl('', Validators.required);
  sender: Contact;
  reciever: Contact;
  constructor(public dialogRef: MatDialogRef<ChatDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { sender: Contact, reciever: Contact}) {
                this.sender = data.sender;
                this.reciever = data.reciever;
              }

  ngOnInit(): void {
  }
}
