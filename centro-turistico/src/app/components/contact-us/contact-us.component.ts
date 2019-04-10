import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService} from './../../services/index'

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  formGroup: FormGroup;
  constructor(private Fb: FormBuilder, private alert: AlertService) { }

  initForm(){
    this.formGroup = this.Fb.group({
      nombre: ['',[Validators.required]],
      correo: ['',[Validators.required, Validators.minLength(2), Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      asunto: ['',[Validators.required]] 
    });
  }

  get FG() {
    return this.formGroup.controls;
  }

  ngOnInit() {
    this.initForm();
  }

  sendEmail() {
    this.formGroup.reset();
    this.alert.successInfoAlert("Gracias, informacion enviada correctamente... pronto le estaremos contestando");
  }

}
