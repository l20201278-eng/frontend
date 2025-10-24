import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Importa tu modelo Tarea
import { Tarea } from '../models/tarea'; 

// URL de la API: APUNTA AL PUERTO 8082
const URL_API = 'http://localhost:8082/api/tareas'; 

@Injectable({
  providedIn: 'root' 
})
export class TareaService { // <-- La clase debe ser exportada

  constructor(private http: HttpClient) { }

  // 1. OBTENER TODAS las tareas (GET)
  obtenerTareas(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(URL_API);
  }
  
  // 2. OBTENER UNA SOLA tarea por ID (GET /api/tareas/:id)
  // ¡ATENCIÓN! La función debe aceptar un 'number' si Spring Boot usa 'Long' (que mapea a number en TS).
  obtenerTarea(id: number): Observable<Tarea> {
      return this.http.get<Tarea>(`${URL_API}/${id}`);
  }

  // 3. CREAR una nueva tarea (POST)
  crearTarea(tarea: Tarea): Observable<Tarea> { // Cambiamos 'any' por 'Tarea' para tipado
    return this.http.post<Tarea>(URL_API, tarea);
  }

  // 4. ELIMINAR una tarea (DELETE)
  // ¡ATENCIÓN! La función debe aceptar un 'number'
  eliminarTarea(id: number): Observable<void> { // Cambiamos 'any' por 'void' para tipado
    return this.http.delete<void>(`${URL_API}/${id}`);
  }

  // 5. EDITAR/ACTUALIZAR una tarea (PUT)
  // ¡ATENCIÓN! La función debe aceptar 'number' para el ID. Usaremos el ID de la tarea
  editarTarea(tarea: Tarea): Observable<Tarea> { // Cambiamos 'any' por 'Tarea'
    // Spring Boot espera un 'id' (number), no un 'string' como Node.js/MongoDB.
    // Usamos el operador de no-nulo (!) para asegurar a TS que 'id' existe aquí.
    return this.http.put<Tarea>(`${URL_API}/${tarea.id!}`, tarea); 
  }
}