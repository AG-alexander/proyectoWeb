import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  formGroup: FormGroup;
  constructor(private Fb: FormBuilder) { }

  initForm(){
    this.formGroup = this.Fb.group({
      nombre: ['',[Validators.required]],
      correo: ['',[Validators.required]],
      asunto: ['',[Validators.required]] 
    });
    console.log(this.formGroup);
  }

  get FG() {
    return this.formGroup.controls;
  }

  ngOnInit() {
    this.initForm();
  }

}
