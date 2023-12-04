import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent {
  studentInfo!: FormGroup;
  firstname: any;

  isOnline: boolean = true;

  constructor(private rout: Router, private dataService: DataService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.studentInfo = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern('[a-zA-Z].*'),
      ]),
      gender: new FormControl(''),
      dob: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      regfee: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]+$/),
      ]),
      clgfee: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]+$/),
      ]),
      examfee: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]+$/),
      ]),
      totalfee: new FormControl(),
      address: new FormControl('', [
        Validators.required,
        Validators.minLength(5), // Adjust the minimum length as needed
      ]),
      passyear: new FormControl(),
      mobile: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern(/^[0-9]{10}$/),
      ]),
    });
  }

  calculateTotalFee() {
    // You can adjust the calculation based on your business logic
    const regFee = parseFloat(this.studentInfo.get('regfee')?.value || '0');
    const clgFee = parseFloat(this.studentInfo.get('clgfee')?.value || '0');
    const examFee = parseFloat(this.studentInfo.get('examfee')?.value || '0');

    const totalFee = regFee + clgFee + examFee;
    this.studentInfo.patchValue({ totalfee: totalFee.toFixed(2) });
  }

  onSubmit() {
    if (this.studentInfo.valid) {
      const formData = this.studentInfo.value;
      // console.log(formData);
      this.dataService.addStudent(formData).then(() => {
        console.log('Saved:', formData);
        alert('Student data saved successfully');
      });
    } else {
      // Handle form validation errors
      alert('Student data saved faild');
    }
  }

  deleteForm() {
    this.resetForm();
    console.log('Form deleted');
  }

  resetForm() {
    this.initForm();
    this.studentInfo.reset();
  }
}
