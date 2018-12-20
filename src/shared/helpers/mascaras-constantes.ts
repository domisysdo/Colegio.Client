export class MascarasConstantes {
    static maskTelefono = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    static maskFecha = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
    static maskHora = [/[0-9]/, /\d/, ':', /\d/, /\d/];
}


