import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterLink, Router } from '@angular/router'; 
import { Subscription } from 'rxjs'; 

// Rutas de importación
import { Tarea } from '../../models/tarea'; 
import { TareaService } from '../../services/tarea'; 

@Component({
  selector: 'app-tarea-listado',
  standalone: true, 
  imports: [CommonModule, RouterLink], 
  templateUrl: './tarea-listado.html', 
  styleUrl: './tarea-listado.css'       
})
export class TareaListadoComponent implements OnInit, OnDestroy {
  tareas: Tarea[] = [];
  private subscriptions: Subscription[] = []; 

  constructor(private tareaService: TareaService, private router: Router) { } 

  ngOnInit(): void {
    this.cargarTareas();
  }

  cargarTareas(): void {
    // CORRECCIÓN TS7006: Tipado explícito de 'data' y 'error'
    const sub = this.tareaService.obtenerTareas().subscribe({
      next: (data: Tarea[]) => { // <-- Tipado: Tarea[]
        this.tareas = data;
      },
      error: (error: any) => { // <-- Tipado: any
        console.error('Error al cargar tareas:', error);
      }
    });
    this.subscriptions.push(sub);
  }

  // FUNCIÓN CORREGIDA para Spring Boot (ID es tipo number)
  eliminarTarea(id: number | string | undefined): void { 
    // 1. Verificar si el ID existe
    if (!id) {
        console.error('No se pudo eliminar: ID no definido.');
        return; 
    }

    // 2. CONVERSIÓN CRUCIAL: El ID debe ser un NUMBER para Spring Boot.
    // Esto resuelve el error TS2345 (string a number).
    const idNumerico = Number(id);

    if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
        const sub = this.tareaService.eliminarTarea(idNumerico).subscribe({ // <-- ID NUMÉRICO
            next: () => {
                console.log('Tarea eliminada con éxito.');
                this.cargarTareas(); // Recargar la lista
            },
            error: (error: any) => { // <-- Tipado: any
                console.error('Error al eliminar tarea:', error);
            }
        });
        this.subscriptions.push(sub);
    }
  }

  // Lógica para marcar como completada/incompleta
  toggleCompletada(tarea: Tarea): void {
    // Si el ID no existe, o no es un número válido, salimos
    if (typeof tarea.id !== 'number') {
        console.error('No se puede actualizar la tarea: ID no válido.');
        return;
    }
    
    // Cambia el estado en el modelo
    tarea.completada = !tarea.completada;

    // CORRECCIÓN TS7006: Tipado explícito de 'error'
    const sub = this.tareaService.editarTarea(tarea).subscribe({
        next: () => {
            console.log('Tarea actualizada con éxito.');
        },
        error: (error: any) => { // <-- Tipado: any
            console.error('Error al actualizar tarea:', error);
            // Revertir el estado si la actualización falla
            tarea.completada = !tarea.completada; 
        }
    });
    this.subscriptions.push(sub);
  }

  // Limpieza de suscripciones
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}