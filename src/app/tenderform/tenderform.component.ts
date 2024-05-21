import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-tenderform',
  templateUrl: './tenderform.component.html',
  styleUrl: './tenderform.component.css'
})
export class TenderformComponent implements OnInit {
  listofuser: any = [];

  tenderform!: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getTenderInfo();
  }

  initializeForm(): void {
    this.tenderform = this.fb.group({
      type: ['', Validators.required],
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      district: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern('\\d{6}')]],
      mobileNumber: ['', [Validators.required, Validators.pattern('\\d{10}')]],
      email: ['', [Validators.required, Validators.email]],
      licenseNumber: [false, Validators.required],
      gstNumber: [false, Validators.required],
      goodsType: ['', Validators.required],
      goodsDemand: ['', Validators.required],
      saleRatePerQuantity: ['', Validators.required],
      passportSizePhoto: [''],
      aadharCopy: [''],
      panCopy: [''],
      gstCertificate: [''],
      licenseCertificate: [''],
      remarks: ['']
    });
  }

  backendurl = "http://localhost:8080/";

  submitForm(): void {
    if (this.tenderform.valid) {
     
      const formData = {
        ...this.tenderform.value,
        licenseNumber: this.tenderform.value.licenseNumber === 'YES',
        gstNumber: this.tenderform.value.gstNumber === 'YES'
      };
  
      this.http.post(this.backendurl + "user/addtender", formData)
        .subscribe(
          data => {
            console.log(data);
            alert("Added Successfully...!");
          },
          error => {
            console.log(error);
            alert("Sorry! Something went wrong.");
          }
        );
    } else {
      alert("Please fill in all required fields correctly.");
    }
  }
  
  getTenderInfo() {
    this.http.get(this.backendurl + "user/get/tender")
      .subscribe(
        (data: any) => {
          this.listofuser = data;
          console.log(this.listofuser);
        },
        error => {
          console.log(error);
          alert("Failed to fetch tender information.");
        }
      );
  }
  exportToExcel(): void {
    const data: any[] = this.listofuser; 
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Tender Data');

    XLSX.writeFile(wb, 'tender_data.xlsx');
  }
}

