import { Component } from '@angular/core';
import {FormGroup,FormControl,FormBuilder} from'@angular/forms';
import { Employee } from './module/Employee';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crud';
  employeeForm!:FormGroup;
  empobj:Employee= new Employee();
  employelist:Employee[]=[];
  isEditing = false;
  constructor(private fb:FormBuilder)
  {
    this.createForm();
   

    const olddata=localStorage.getItem("EmpData");
    if(olddata!=null)
    {
      const parseData=JSON.parse(olddata);
    
      this.employelist=parseData;
    }

  }
  createForm()
  {
     this.employeeForm=new FormGroup(
      {
        emailId:new FormControl(this.empobj.emailId),
        name:new FormControl(this.empobj.name),
        city:new FormControl(this.empobj.city),
        contactno:new FormControl(this.empobj.contactno),
        empId:new FormControl(this.empobj.empId),
        state:new FormControl(this.empobj.state),
         address:new FormControl(this.empobj.address),
          pincode:new FormControl(this.empobj.pincode),


      }
    )
    
  }

  reset()
  {
    console.log(this.employeeForm.value)
  }
  save()
  {
    debugger;
    const olddata = localStorage.getItem("EmpData");
    if(olddata!=null)
    {
      const parseData=JSON.parse(olddata);
      this.employeeForm.controls['empId'].setValue(parseData.length+1);
      this.employelist.push(this.employeeForm.value);
    }
    else
    {
      this.employelist.push(this.employeeForm.value);
    }
    localStorage.setItem("EmpData",JSON.stringify(this.employelist))
  }
  edit(item:Employee)
  {
                this.empobj=item;
                this.createForm();
                this.isEditing=true;


  }
  update()
  {
    const record=this.employelist.find(m=>m.empId=this.employeeForm.controls['empId'].value);
    if(record!=undefined)
    {
      record.address=this.employeeForm.controls['address'].value;
      record.pincode=this.employeeForm.controls['pincode'].value;
      record.name=this.employeeForm.controls['name'].value;
    }
    localStorage.setItem("EmpData",JSON.stringify(record));
    this.empobj=new Employee();
    this.createForm();

  }
  delete(item:Employee)
  {
const isdelete=confirm("are you sure you wnat to delete");
if(isdelete)
{
const index=this.employelist.findIndex(m=>m.empId);
this.employelist.splice(index,1)
 
 localStorage.setItem("EmpData",JSON.stringify(this.employelist));
}

  }



}
