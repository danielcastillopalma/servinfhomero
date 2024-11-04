export interface Usuario {
    nombre: string;
    correo: string;
    contrasena: string;
    tipoUsuario: 'administrador' | 'supervisor' | 'normal';
    organizacion: string;
    servidoresSeleccionados: string[];
}