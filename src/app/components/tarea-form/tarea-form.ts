import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { ActivatedRoute, Router, RouterLink } from '@angular/router'; 
import { Subscription } from 'rxjs'; 

// Importa tu modelo y servicio
import { Tarea } from '../../models/tarea'; 
import { TareaService } from '../../services/tarea'; 

@Component({
  selector: 'app-tarea-form',
  standalone: true, 
  imports: [CommonModule, FormsModule, RouterLink], 
  templateUrl: './tarea-form.html',
  styleUrl: './tarea-form.css'
})
export class TareaFormComponent implements OnInit, OnDestroy {
  
  // Inicializa la tarea para el formulario.
  tarea: Tarea = {
    titulo: '',
    descripcion: '',
    completada: false
  };

  // Variable para almacenar el ID si estamos editando (viene como string de la URL)
  tareaId: string | null = null;
  private subscriptions: Subscription[] = []; 

  // CORRECCIÓN 1: Declarar la propiedad que faltaba en el componente.
  modoEdicion: boolean = false; 

  constructor(
    private tareaService: TareaService, 
    private router: Router, 
    private route: ActivatedRoute 
  ) { } 

  ngOnInit(): void {
    // Suscribe a los parámetros de la ruta para ver si hay un ID (modo edición)
    const routeSub = this.route.params.subscribe(params => {
        const id = params['id'];

        if (id) {
            this.tareaId = id; // Guarda el ID como string (de la ruta)
            
            // CORRECCIÓN 2: Establecer modoEdicion a true si se encuentra un ID.
            this.modoEdicion = true; 
            
            // CORRECCIÓN DE TIPO: Llama a obtenerTarea con el ID convertido a NUMBER
            const sub = this.tareaService.obtenerTarea(Number(id)).subscribe({ 
                next: (data) => {
                    this.tarea = data;
                },
                error: (error: any) => { 
                    console.error('Error al cargar la tarea para edición:', error);
                    this.router.navigate(['/']); 
                }
            });
            this.subscriptions.push(sub);
        }
    });
    this.subscriptions.push(routeSub);
  }

  guardarTarea(): void {
    // Asegura que el campo de descripción no sea nulo si Spring lo espera
    if (this.tarea.descripcion === undefined || this.tarea.descripcion === null) {
        this.tarea.descripcion = '';
    }

    if (this.tareaId) {
        // MODO EDICIÓN
        
        // CORRECCIÓN DE TIPO: Convierte this.tareaId a NUMBER antes de asignarlo
        this.tarea.id = Number(this.tareaId); 

        const sub = this.tareaService.editarTarea(this.tarea).subscribe({
            next: () => {
                console.log('Tarea actualizada con éxito.');
                this.router.navigate(['/']); // Volver al listado
            },
            error: (error: any) => { 
                console.error('Error al actualizar tarea:', error);
            }
        });
        this.subscriptions.push(sub);

    } else {
        // MODO CREACIÓN
        const sub = this.tareaService.crearTarea(this.tarea).subscribe({
            next: () => {
                console.log('Tarea creada con éxito.');
                this.router.navigate(['/']); // Volver al listado
            },
            error: (error: any) => { 
                console.error('Error al crear tarea:', error);
            }
        });
        this.subscriptions.push(sub);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}