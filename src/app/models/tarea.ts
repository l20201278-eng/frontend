// Archivo: frontend/src/app/models/tarea.ts

export interface Tarea {
    // CORREGIDO: El ID debe ser de tipo 'number' para coincidir con el Long/bigint de Spring Boot/JPA.
    id?: number; 
    
    titulo: string;
    descripcion?: string; // Opcional
    completada: boolean;
    fechaCreacion?: Date; // Opcional
}