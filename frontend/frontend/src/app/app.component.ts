import { Component } from '@angular/core';
import { ServiceService } from './service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  constructor(private service:ServiceService,private route:Router) { }

  librarylist:any=[];
  editlist:any={};
  editmode=false;
 
  
    ngOnInit(): void {
      this.get();
    }
  
    libraryform={
      title:'',
      author:'',
      genre:'',
      publicationyear:'',
      isbn:''
      
    }
  
    add(){
      this.service.create(this.libraryform).subscribe((data:any)=>{
        alert("Successfully added");
        console.log('employeedetails',data);
        this.get();
        window.location.reload()
      })
    }
  
    get(){
      this.service.get().subscribe((data:any)=>{
  this.librarylist=data;
  console.log(this.librarylist)
      })
    }
  
  
  
    delete(id:any){
      this.service.delete(id).subscribe((data:any)=>{
        alert("Deleted Succesffully");
        console.log('deleted successfully');
        this.get();
      })
    }
  
  
  
 
  
  edit(library:any){
  this.editmode=true;
  this.editlist={...library}
  }
  
  update(){
    this.service.update(this.editlist).subscribe((data:any)=>{
      const index=this.librarylist.findIndex((res:any)=>res._id===data._id)
      this.librarylist[index]=data;
      this.editmode=false;
    this.get();
    window.location.reload();
    })
  }
}
