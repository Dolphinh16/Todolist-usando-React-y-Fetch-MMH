
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const TodoTareawithFetch = () => {
  const [tarea, setTarea] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState('');
  const username = 'miguel';

  
  useEffect(() => {
    todoFetchTareas();
  }, []);

  const todoFetchTareas = async () => {
    try {
      const response = await fetch(`https://playground.4geeks.com/todo/users/${username}`);

      const data = await response.json();
      setTarea(data.todos || []);

    } catch (error) {
      console.error('Error al cargar tareas:', error);
    }
  };


  const creandoUsuario = async () => {
    try {
      const response = await fetch(`https://playground.4geeks.com/todo/users/${username}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('No se pudo crear el usuario');

      const data = await response.json();

      console.log('Usuario creado:', data);
      todoFetchTareas();

    } catch (error) {
      console.error('Error al crear usuario:', error);
    }
  };

  const agregarTareas = async () => {

    if (!nuevaTarea.trim()) return;

    const datosTarea = { label: nuevaTarea, is_done: false };

    try {
      const response = await fetch(`https://playground.4geeks.com/todo/todos/${username}`, {
        method: 'POST',

        body: JSON.stringify(datosTarea),

        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error('Error al crear tarea');
      const dato = await response.json();

      console.log('Tarea creada:', dato);

      setTarea((prev) => [...prev, dato]); 

      setNuevaTarea("") // limpiar informacion

    } catch (error) {
      console.error('Error creando tarea:', error);
    }
  };



  const borrandoTareas = async (id) => {
    try {
      const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error al eliminar tarea');
      setTarea((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error al borrar tarea:', error);
    }
  };


  const limpiarTodasTareas = async () => {
    try {
      await fetch(`https://playground.4geeks.com/todo/users/${username}`, {
        method: 'DELETE',
      });
      setTarea([]); // limpiar lista 
      creandoUsuario(); // recrear usuario vacío

    } catch (error) {
      console.error('Error borrando usuario:', error);
    }
  };



  return (
    <div className="container mt-3">
  <h2 className="text-center">Todo list with Fetch</h2>
  <div className="input-group mb-2">

    <input
      type="text" className="form-control"  value={nuevaTarea} placeholder="Escriba su información..."

      onChange={(e) => setNuevaTarea(e.target.value)}
      
    />

    <button className="btn btn-primary" onClick={agregarTareas}>Agregar</button>

  </div>
  
  <ul className="list-group">
    {tarea.map((todo) => (
      <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
        {todo.label}
        <button className="btn btn-sm btn-danger" onClick={() => borrandoTareas(todo.id)}>Borrar</button>
      </li>
    ))}
  </ul>
  <button className="btn btn-warning mt-3 w-20" onClick={limpiarTodasTareas}>Borrar todos</button>

</div>
  );
};

export default TodoTareawithFetch;