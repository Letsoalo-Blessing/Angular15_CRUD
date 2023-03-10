import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddEditComponent } from './components/add-edit/add-edit.component';
import { CoreService } from './services/core.service';
import { EmployeeService } from './services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  displayedColumns: string[] =
    ['id',
      'firstName',
      'lastname',
      'email',
      'dob',
      'gender',
      'education',
      'company',
      'experience',
      'package',
      'action'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _empService: EmployeeService,
    private _coreService:CoreService) { }


  ngOnInit(): void {
    this.getEmployeeList();
  }

  openAddEditEmpForm() {
    const dialogRef =this._dialog.open(AddEditComponent)
    dialogRef.afterClosed().subscribe({
      next:(val) =>{
        if(val){
          this.getEmployeeList();
        }
      },
    });
  }

  getEmployeeList() {

    this._empService.getEmployees().subscribe({
      next: (response) => {

        console.log(response);

        this.dataSource = new MatTableDataSource(response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  deleteEmployee(id:number){

    this._empService.deleteEmployee(id).subscribe({
      
      next: (res) => {
        this._coreService.openSnackBar('Employee deleted!','done');
        this.getEmployeeList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any){

    const dialogRef=this._dialog.open(AddEditComponent,{
      data,
    });

    dialogRef.afterClosed().subscribe({
      next:(val) =>{
        if(val){
          this.getEmployeeList();
        }
      },
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
