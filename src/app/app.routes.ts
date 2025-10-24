// Archivo: frontend/src/app/app.routes.ts

import { Routes } from '@angular/router';

// CORRECCIÓN CLAVE: Las importaciones deben apuntar solo al nombre del archivo
// (sin la extensión .ts ni .component)
import { TareaListadoComponent } from './components/tarea-listado/tarea-listado'; 
import { TareaFormComponent } from './components/tarea-form/tarea-form'; 

export const routes: Routes = [
    { 
        // Ruta raíz. Carga la lista de tareas.
        path: '', 
        component: TareaListadoComponent 
    },
    { 
        // Ruta para crear una nueva tarea
        path: 'crear', 
        component: TareaFormComponent 
    },
    { 
        // Ruta para editar una tarea existente (usa un ID)
        path: 'editar/:id', 
        component: TareaFormComponent 
    },
    { 
        // Cualquier otra ruta que no coincida, redirige a la raíz
        path: '**', 
        redirectTo: '' 
    } 
];