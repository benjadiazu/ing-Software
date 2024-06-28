const mensajesErr =  {
    required: 'Este campo es obligatorio',
    requiredTrue: 'Este campo es obligatorio',
    email: 'Email incorrecto',
    minlength: 'Mínimo de caracteres no alcanzado',
    maxlength: 'Límite de caracteres alcanzado',
    pattern: 'Formato invalido',
    password: 'Contraseña invalida',
    passwordConfirm: 'Las contraseñas no coinciden',
    min: 'Mínimo valor requerido',
    max: 'Máximo valor requerido'
}


type FormError = keyof typeof mensajesErr;

export {mensajesErr};
export type {FormError};