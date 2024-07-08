
let tareas = [ // Tareas
  { id: 1, description: "Terminar el desafío de código", completed: false },
  { id: 2, description: "Ir a comprar al supermercado", completed: true },
  { id: 3, description: "Limpiar la casa", completed: false },
];

let totalDeTareas = tareas.length;
let tareasCompletadas = tareas.filter(tarea => tarea.completed).length;

const listaDeTareas = document.querySelector('#task-list'); // Lista de tareas
const totalDeTareasSpan = document.querySelector('#total-tasks'); // Total de tareas
const tareasCompletadasSpan = document.querySelector('#completed-tasks'); // Tareas completadas

updateTaskList();

document.getElementById('add-task-button').addEventListener('click', addTask);
const inputDescripcionTarea = document.getElementById('task-description'); // Entrada descripción tarea

// Agregar event listener para presionar Enter en el campo de entrada
inputDescripcionTarea.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    addTask();
  }
});

function addTask() {
  const descripcionTarea = inputDescripcionTarea.value;

  if (descripcionTarea) {
    const nuevaTarea = {
      id: Math.max(...tareas.map(tarea => tarea.id)) + 1,
      description: descripcionTarea,
      completed: false
    };

    tareas.push(nuevaTarea);
    totalDeTareas++;

    updateTaskList();
    inputDescripcionTarea.value = '';
  }
}

function updateTaskList() {
  listaDeTareas.innerHTML = ''; // Limpiar el contenido de la lista de tareas

  tareas.forEach(tarea => {
    const itemLista = document.createElement('li');
    itemLista.id = tarea.id;

    const spanIDTarea = document.createElement('span');
    spanIDTarea.textContent = `ID: ${tarea.id} - `;
    itemLista.appendChild(spanIDTarea);

    itemLista.textContent += tarea.description;

    if (tarea.completed) {
      itemLista.classList.add('completed');
    }

    const botonCompletar = document.createElement('button');
    botonCompletar.textContent = tarea.completed ? 'Terminada' : 'Completar';
    botonCompletar.addEventListener('click', () => toggleTaskCompletion(tarea.id));

    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Borrar';
    botonEliminar.addEventListener('click', () => deleteTask(tarea.id));

    // Función para eliminar tarea al hacer clic en el botón eliminar
    function deleteTask(idTarea) {
      const indiceTarea = tareas.findIndex(tarea => tarea.id === idTarea);
      if (indiceTarea !== -1) {
        tareas.splice(indiceTarea, 1); // Eliminar tarea del arreglo de tareas
        totalDeTareas--;
        tareasCompletadas = tareas.filter(tarea => tarea.completed).length;
        updateTaskList(); // Actualizar la lista después de la eliminación
      }
    }

    itemLista.appendChild(botonCompletar);
    itemLista.appendChild(botonEliminar);

    listaDeTareas.appendChild(itemLista);
  });

  totalDeTareasSpan.textContent = totalDeTareas;
  tareasCompletadasSpan.textContent = tareasCompletadas;
}