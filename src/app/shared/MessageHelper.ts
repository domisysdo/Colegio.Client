import { Injectable } from '@angular/core';
import swal from 'sweetalert2';
import { FormGroup } from '@angular/forms';

@Injectable()
export class MessageHelper {

  public static async confirm(
    text: string,
    title?: string,
    siCallback?: () => void,
    noCallback?: () => void,
    cancelButtonText?: string,
    confirmButtonText?: string) {

    try {
      const result_2 = await swal({
        text: text,
        title: (title) ? title : 'Confirmación',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: (cancelButtonText) ? cancelButtonText : 'No',
        confirmButtonText: (confirmButtonText) ? confirmButtonText : 'Sí',
      });
      if (result_2.value) {
        if (siCallback) {
          siCallback();
        }
      } else {
        if (noCallback) {
          noCallback();
        }
      }
    } catch (reason) {
      return this.handleError(reason);
    }
  }

  public static async confirmHtml(
    textHtml: string,
    title?: string,
    siCallback?: () => void,
    noCallback?: () => void,
    cancelButtonText?: string,
    confirmButtonText?: string) {

    try {
      const result_2 = await swal({
        html: textHtml,
        title: (title) ? title : 'Confirmación',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: (cancelButtonText) ? cancelButtonText : 'No',
        confirmButtonText: (confirmButtonText) ? confirmButtonText : 'Sí',
      });
      if (result_2.value) {
        if (siCallback) {
          siCallback();
        }
      } else {
        if (noCallback) {
          noCallback();
        }
      }
    } catch (reason) {
      return this.handleError(reason);
    }
  }

  public static registroCorrecto(title?: string, text?: string, okCallBack?: () => void) {
    swal({
      title: (title) ? title : 'Registro Completado',
      text: (text) ? text : 'Datos Registrados Correctamente!',
      type: 'success'
    }).then(value => {
      if (okCallBack) {
        okCallBack();
      }
    }).catch((reason: any) => this.handleError(reason));
  }

  public static registroIncorrecto(title?: string, text?: string, okCallBack?: () => void) {
    swal({
      title: (title) ? title : 'Registro Incompleto',
      text: (text) ? text : 'No Se Pudo Registrar la Información!',
      type: 'error'
    }).then(value => {
      if (okCallBack) {
        okCallBack();
      }
    }).catch((reason: any) => this.handleError(reason));
  }

  public static async confirmDataLose(title?: string, text?: string, okCallback?: () => void) {
    try {
      const result_1 = await swal({
        text: (text) ? text : 'Se perderán los cambios realizados, desea continuar?',
        title: (title) ? title : 'Advertencia',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No, volver',
        confirmButtonText: 'Sí, continuar!',
      });
      if (result_1.value) {
        if (okCallback) {
          okCallback();
        }
      }
    } catch (reason) {
      return this.handleError(reason);
    }
  }

  public static show(text: string, title?: string, okCallBack?: () => void) {
    swal({
      title: (title) ? title : 'Información',
      text: text,
      type: 'info'
    }).then(value => {
      if (okCallBack) {
        okCallBack();
      }
    }).catch((reason: any) => this.handleError(reason));
  }

  public static showError(error: Response, okCallBack?: () => void) {
    console.log('No se pudo conectar ' + error.statusText);
    console.log(error);

    if (error.ok === true) {
      return;
    }

    let text = '';

    if (error.status === 400) {
      text = (<any> error).error;
    }

    swal({
      title: 'Mensaje de Validación',
      text: text,
      type: 'warning'
    }).then(value => {
      if (okCallBack) {
        okCallBack();
      }
    }).catch((reason: any) => this.handleError(reason));
  }

  public static showFormError(form: FormGroup) {
    swal({
      title: 'Información',
      text: 'Debe completar los campos mínimos requeridos.',
      type: 'info'
    }).then(value => { })
    .catch((reason: any) => this.handleError(reason));
  }

  private static handleError(reason: any) {
    console.log('Error en AlertasHelper:');
    console.log(reason);
  }
}
