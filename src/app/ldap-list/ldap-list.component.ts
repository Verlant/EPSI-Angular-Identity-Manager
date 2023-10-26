import {Component, OnInit, ViewChild} from '@angular/core'
import {MatTableDataSource} from "@angular/material/table";
import {UserLdap} from "../models/user-ldap";
import {MatPaginator} from "@angular/material/paginator";
import {LDAP_USERS} from "../models/ldap-mock-data";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";

@Component({
  selector: 'app-ldap-list',
  templateUrl: './ldap-list.component.html',
  styleUrls: ['./ldap-list.component.css']
})
export class LdapListComponent implements OnInit {
  unactiveSelected: boolean;
  displayedColumns: string[] = ['nomComplet', 'mail', 'employeNumero'];
  dataSource = new MatTableDataSource<UserLdap>([]);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | null;

  constructor() {
    this.paginator = null;
    this.unactiveSelected = false;
  }
  ngOnInit(): void {
    // console.log('Values on ngOnInit():');
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: UserLdap, filter: string) => this.filterPredicate(data, filter);
    this.getUsers();
    // console.log('Mat Paginator:', this.paginator);
  }

  filterPredicate(data: UserLdap, filter: string): boolean {
    return !filter || data.nomComplet.toLowerCase().startsWith(filter);
  }

  applyFilter($event: KeyboardEvent): void {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // ngAfterViewInit(): void {
  //   console.log('Values on ngAfterViewInit():');
  //   console.log('Mat Paginator:', this.paginator);
  // }

  private getUsers(): void {
    if (this.unactiveSelected) {
    this.dataSource.data = LDAP_USERS.filter(user => !user.active);
    } else {
      this.dataSource.data = LDAP_USERS;
    }
  }

  unactiveChange($event: MatSlideToggleChange): void {
    this.unactiveSelected = $event.checked;
    this.getUsers();
  }
}
