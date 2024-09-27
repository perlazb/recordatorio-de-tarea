<template>
  <div class="task-manager-container">
   
    <div class="task-list">
      <router-link to="/"><button >Regresar</button></router-link>
      <h2>Administrar Tareas</h2>
      
      
      <label for="userSelect">Seleccionar Usuario:</label>
      <select v-model="selectedUserId" id="userSelect" required>
        <option disabled value="">Seleccione un usuario</option>
        <option v-for="user in registeredUsers" :key="user.email" :value="user.email">
          {{ user.email }}
        </option>
      </select>

  
      <form @submit.prevent="addTask" class="task-form" v-if="selectedUserId">
        <input v-model="description" placeholder="descripción" required />
        <input type="date" v-model="dueDate" required />
        <button type="submit">Agregar Tarea</button>
      </form>

      <p v-if="message" class="success-message">{{ message }}</p>

  
      <h3>Tareas</h3>
      <ul class="task-items" v-if="userTasks.length">
        <li v-for="task in userTasks" :key="task.id" class="task-item">
          <div class="task-info">
            <span class="task-description">{{ task.description }}</span>
            <span class="task-due">{{ task.dueDate }}</span>
            <span class="task-status">{{ task.status }}</span>
          </div>
          <div class="task-actions">
            <button @click="updateTaskStatus(task.id)">
              {{ task.status === 'completado' ? 'En Proceso' : 'Completado' }}
            </button>
            <button @click="confirmDeleteTask(task.id)">Borrar</button>
          </div>
        </li>
      </ul>
      <p v-else>No hay tareas para el usuario seleccionado.</p>
    </div>

  
    <div class="user-list">
      <h2>Usuarios Registrados</h2>
      <ul>
        <li v-for="user in registeredUsers" :key="user.email">
          {{ user.email }}
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
import { ref, computed } from 'vue';
import { useTaskStore } from '../stores/taskStore';

export default {
  setup() {
    const taskStore = useTaskStore();

    const description = ref('');
    const dueDate = ref('');
    const message = ref('');

    const selectedUserId = ref('');

    
    const registeredUsers = computed(() => taskStore.registeredUsers);

   
    const userTasks = computed(() => {
      if (selectedUserId.value) {
        return taskStore.getUserTasks(selectedUserId.value) || [];
      }
      return [];
    });

 
    function addTask() {
      if (!selectedUserId.value) {
        alert("Selecciona un usuario para agregar una tarea.");
        return;
      }

      const newTask = {
        id: Date.now(),
        description: description.value,
        dueDate: dueDate.value,
        status: 'en proceso',
      };
      taskStore.addTask(selectedUserId.value, newTask);
      resetForm();
      showMessage('Tarea creada exitosamente');
    }

   
    function updateTaskStatus(taskId) {
      const task = userTasks.value.find(t => t.id === taskId);
      if (task) {
        const nextStatus = task.status === 'completado' ? 'en proceso' : 'completado';
        taskStore.updateTask(selectedUserId.value, taskId, { status: nextStatus });
      }
    }

    function confirmDeleteTask(taskId) {
      const confirmed = confirm("¿Estás seguro de que deseas eliminar esta tarea?");
      if (confirmed) {
        deleteTask(taskId);
      }
    }


    function deleteTask(taskId) {
      taskStore.deleteTask(selectedUserId.value, taskId);
    }


    function resetForm() {
      description.value = '';
      dueDate.value = '';
    }

  
    function showMessage(msg) {
      message.value = msg;
      setTimeout(() => {
        message.value = '';
      }, 3000);
    }

    return {
      description,
      dueDate,
      userTasks,
      registeredUsers,
      selectedUserId,
      message,
      addTask,
      updateTaskStatus,
      confirmDeleteTask,
    };
  },
};
</script>


<style scoped>
.task-manager-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #f0f8ff; 
  padding: 20px;
  border-radius: 15px; 
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  height: 100vh; 
}

.task-list {
  flex: 1;
  margin-right: 20px;
  color: #2c3e50; 
}

h2, h3 {
  text-align: center;
  font-family: 'Comic Sans MS', cursive, sans-serif; 
  color: #ffcc00;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.task-form {
  display: flex;
  flex-direction: column;
  background-color: #34495e; 
  padding: 20px;
  border-radius: 10px; 
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

select {
  margin-bottom: 15px;
  padding: 12px;
  border-radius: 5px;
  border: 2px solid #1abc9c;
  background-color: #ecf0f1;
  font-size: 16px;
  color: #2c3e50;
  width: 100%; 
}

select:focus {
  outline: none;
  border-color: #ff5733; 
}

option {
  background-color: #34495e;
  color: #ecf0f1;
  padding: 10px;
}

label {
  font-size: 16px;
  color: #2c3e50;
  font-family: 'Comic Sans MS', cursive, sans-serif; 
  margin-bottom: 10px;
}

input {
  margin-bottom: 15px;
  padding: 12px;
  border-radius: 5px;
  border: 2px solid #1abc9c; 
  background-color: #ecf0f1; 
  font-size: 16px;
  color: #2c3e50; 
}

input:focus {
  outline: none;
  border-color: #ff5733; 
}

button {
  padding: 12px;
  background-color: #ff5733; 
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #c70039; 
}

.task-items {
  list-style: none;
  padding: 0;
}

.task-item {
  background-color: #34495e; 
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.task-info {
  flex: 1;
  display: flex;
  justify-content: space-between;
  margin-right: 20px;
}

.task-description {
  font-size: 16px;
  font-weight: bold;
  color: #ecf0f1; 
}

.task-due, .task-status {
  font-size: 14px;
  color: #bdc3c7; 
}

.task-actions {
  display: flex;
  gap: 10px;
}

.success-message {
  color: #2ecc71; 
  text-align: center;
  font-weight: bold;
  margin-top: 10px;
}

.user-list {
  width: 250px;
  background-color: #34495e; 
  padding: 20px;
  border-radius: 10px; 
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  color: #ecf0f1; 
}

.user-list ul {
  list-style: none;
  padding: 0;
}

.user-list li {
  padding: 10px 0;
  border-bottom: 1px solid #7f8c8d;
  color: #ecf0f1; 
  font-family: 'Comic Sans MS', cursive, sans-serif; 
}
</style>

