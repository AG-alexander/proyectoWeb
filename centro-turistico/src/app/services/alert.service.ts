import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

// llama la funcion de alert con estado success
  // recibe el mensaje que se quiere mostrar
  successAlert(message: string) {
    this.AlertaErrorMessage(message, 'success');
  }
  // llama la funcion del toast con estado success
  // recibe el mensaje que se quiere mostrar
  successInfoAlert(message: string) {
    this.AlertMessage(message, 'success');
  }
  // llama la funcion de alert con estado error
  // recibe el mensaje que se quiere mostrar
  errorAlert(message: string) {
    this.AlertaErrorMessage(message, 'error');
  }
  // llama la funcion del toast con estado error
  // recibe el mensaje que se quiere mostrar
  errorInfoAlert(message: string) {
    this.AlertMessage(message, 'error');
  }

  // llama la funcion de alert con estado info
  // recibe el mensaje que se quiere mostrar
  infoAlert(message: string) {
    this.AlertaErrorMessage(message, 'info');
  }
  // llama la funcion del toast con estado info
  // recibe el mensaje que se quiere mostrar
  infoInfoAlert(message: string) {
    this.AlertMessage(message, 'info');
  }

  // llama la funcion de alert con estado warning
  // recibe el mensaje que se quiere mostrar
  warningAlert(message: string) {
    this.AlertaErrorMessage(message, 'warning');
  }
  // llama la funcion del toast con estado warning
  // recibe el mensaje que se quiere mostrar
  warningInfoAlert(message: string) {
    this.AlertMessage(message, 'warning');
  }
  // muestra un toad en la parte superior de la pantalla informado sobre un determinado mensaje.
  // recibe el mensaje que se quiere mostrar y el tipo de mensaje, ya sea success, error, warning, info
  private AlertMessage(msn: any, tipo: any) {
    const toast = swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });
    toast.fire({
      type: tipo,
      title: msn
    });
  }

  // muestra el mensaje de alerta  en el centro de la pagina
  // recibe el mensaje que se quiere mostrar y el tipo de mensaje, ya sea success, error, warning, info
  private AlertaErrorMessage(msn: any, tipo: any) {
    swal.fire({
      type: tipo,
      text: msn,
    });
  }
}

