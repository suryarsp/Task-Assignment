import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { Contact } from '../../models';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnChanges, AfterViewInit {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @Input() contacts: Contact[];
  @Output() editClicked: EventEmitter<Contact> = new EventEmitter();
  @Output() contactSelectionChange: EventEmitter<{checked: boolean , contact: Contact}> = new EventEmitter();
  @Output() deleteClicked: EventEmitter<string> = new EventEmitter();
  @Output() sendMessage: EventEmitter<Contact> = new EventEmitter();
  displayedColumns: string[] = ['add', 'basicInfo', 'company', 'chat', 'edit', 'delete'];
  dataSource: MatTableDataSource<Contact>;

  ngAfterViewInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      if (changes.contacts.previousValue !== changes.contacts.currentValue) {
        this.setTableEntries();
      }
    }
  }

  setTableEntries() {
    this.dataSource = new MatTableDataSource(this.contacts);
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    }, 0);
  }

}
