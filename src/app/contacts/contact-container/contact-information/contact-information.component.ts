import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../../models';

@Component({
  selector: 'app-contact-information',
  templateUrl: './contact-information.component.html',
  styleUrls: ['./contact-information.component.scss']
})
export class ContactInformationComponent implements OnInit {
  @Input() contactSelected: Contact;
  constructor() { }

  ngOnInit(): void {
  }

}
