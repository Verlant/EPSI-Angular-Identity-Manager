import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core'
import {MatTableDataSource} from "@angular/material/table";
import {UserLdap} from "../models/user-ldap";
import {MatPaginator} from "@angular/material/paginator";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {UsersService} from "../service/users.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ldap-list',
  templateUrl: './ldap-list.component.html',
  styleUrls: ['./ldap-list.component.css']
})
export class LdapListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nomComplet', 'mail', 'employeNumero'];
  dataSource = new MatTableDataSource<UserLdap>([]);
  unactiveSelected: boolean;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | null;

  constructor(private userService: UsersService, private router: Router) {
    this.paginator = null;
    this.unactiveSelected = false;
  }

  ngOnInit(): void {
    console.log('Values on ngOnInit():');
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: UserLdap, filter: string) => this.filterPredicate(data, filter);
    this.getUsers();
    console.log('Mat Paginator:', this.paginator);
  }

  filterPredicate(data: UserLdap, filter: string): boolean {
    return !filter || data.nomComplet.toLowerCase().startsWith(filter);
  }

  applyFilter($event: KeyboardEvent): void {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit(): void {
    console.log('Values on ngAfterViewInit():');
    console.log('Mat Paginator:', this.paginator);
  }

  private getUsers(): void {
    this.userService.getUsers().subscribe(
      users => {
        if (this.unactiveSelected) {
          this.dataSource.data = users.filter(user => !user.active);
        } else {
          this.dataSource.data = users;
        }
      }
    )
  }

  unactiveChange($event: MatSlideToggleChange): void {
    this.unactiveSelected = $event.checked;
    this.getUsers();
  }

  edit(login: string) {
    this.router.navigate(['user/', login]).then((e) => {
      if (!e) {
        console.error('Navigation has failed !');
      }
    })
  }
}
