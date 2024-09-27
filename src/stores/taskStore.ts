import { defineStore } from 'pinia';

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [], // guarda las tareas
    userTasks: {} as Record<string, any[]>, // guardalas tareas
    registeredUsers: [] as Array<{ email: string }> // guarda usuarios registrados
  }),
  actions: {
   
    addTask(userId: string, task: any) {
      if (!this.userTasks[userId]) {
        this.userTasks[userId] = [];
      }
      this.userTasks[userId].push(task); 
    },

    // Devuelve las tareas 
    getUserTasks(userId: string) {
      return this.userTasks[userId] || []; 
    },

  
    registerUser(user: { email: string }) {
      if (!this.registeredUsers.some(u => u.email === user.email)) {
        this.registeredUsers.push(user); 
      }
    },

    deleteTask(userId: string, taskId: string) {
      this.userTasks[userId] = this.userTasks[userId].filter(task => task.id !== taskId);
    },

  
    getRegisteredUsers() {
      return this.registeredUsers; 
    }
  }
});
