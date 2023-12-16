import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private service:ServiceService,private route:Router) { }

  librarylist:any=[];
  editlist:any={};
  editmode=false;
  filterTerm:any;
  filtereddata:any=[]
 
  
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
        console.log('libraryformdetails',data);
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


  applyFilter() {
    if (!this.filterTerm) {
      this.filtereddata = this.librarylist;
    } else {
      this.filtereddata = this.librarylist.filter((item:any) =>
        this.dataFilterTerm(item, this.filterTerm)
      );
    }
  }
  
  dataFilterTerm(data: any, term: any): boolean {
    // Customize this function based on your data structure and filtering requirements
    return (
      data.title.toLowerCase().includes(term.toLowerCase()) ||
      data.author.toLowerCase().includes(term.toLowerCase()) ||
      data.designation.toLowerCase().includes(term.toLowerCase()) ||
      data.publicationyear.toLowerCase().includes(term.toLowerCase()) ||
      data.isbn.toLowerCase().includes(term.toLowerCase()) 
  
    );
  }


}
