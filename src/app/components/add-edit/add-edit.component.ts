import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from 'src/app/services/core.service';
import { EmployeeService } from 'src/app/services/employee.service';


@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {

  empForm: FormGroup;

  education: string[] =[
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate'
    
  ]
  constructor(private _fb:FormBuilder,
     private _empService: EmployeeService,
      private _dialogRef:MatDialogRef<AddEditComponent>,
      @Inject(MAT_DIALOG_DATA) public data:any,
      private _coreService: CoreService) {

    this.empForm=this._fb.group({
      firstName:'',
      lastname:'',
      email:'',
      dob:'',
      gender:'',
      education:'',
      company:'',
      experience:'',
      package:'',
    })
   }

  ngOnInit(): void {

    this.empForm.patchValue(this.data);
  }

  onFormSubmit(){

    if(this.empForm.valid){
      // console.log(this.empForm.value)

      if(this.data){

        this._empService.UpdateEmployee(this.data.id, this.empForm.value).subscribe({

          next:(val:any) =>{
           
            this._coreService.openSnackBar('Employee updated successfully', 'done')
            this._dialogRef.close(true);
          },
          error: (err:any) =>{
            console.error(err);
          },
        }
      );
      }else{

        this._empService.addEmployee(this.empForm.value).subscribe({

          next:(val:any) =>{
            
            this._coreService.openSnackBar('Employee added successfully !', 'done');
            this._dialogRef.close(true);
          },
          error: (err:any) =>{
            console.error(err);
          },
        }
      );
      }
      
    }
  }
}
