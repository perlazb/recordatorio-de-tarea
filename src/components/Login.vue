<template>
  <div class="login-container">
    <h3 class="title">Iniciar Sesión</h3>
    <div class="card-body">
      <div class="input-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" />
        <span v-if="emailError" class="error-message">{{ emailError }}</span>
      </div>
      <div class="input-group">
        <label for="password">Contraseña</label>
        <input type="password" id="password" v-model="password" />
        <span v-if="passwordError" class="error-message">{{ passwordError }}</span>
      </div>
      <button @click="login">Ingresar</button>
      <span v-if="error" class="error-message">{{ error }}</span>
    
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTaskStore } from '../stores/taskStore'; 

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const error = ref('');
    const emailError = ref('');
    const passwordError = ref('');
    const router = useRouter();
    const taskStore = useTaskStore(); 
    const validateEmail = () => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value) {
        emailError.value = 'El email es requerido';
        return false;
      } else if (!emailPattern.test(email.value)) {
        emailError.value = 'El formato del email es inválido';
        return false;
      }
      emailError.value = '';
      return true;
    };

    const validatePassword = () => {
      if (!password.value) {
        passwordError.value = 'La contraseña es requerida';
        return false;
      } else if (password.value.length < 6) {
        passwordError.value = 'La contraseña debe tener al menos 6 caracteres';
        return false;
      }
      passwordError.value = '';
      return true;
    };

    const login = () => {
      const isEmailValid = validateEmail();
      const isPasswordValid = validatePassword();

      if (isEmailValid && isPasswordValid) {
        const token = true;
        localStorage.setItem('token', token);
        
        // se registra el usuario al hacer login
        taskStore.registerUser({ email: email.value }); //llama

        
        router.push('/task');
      }
    };

    return {
      email,
      password,
      error,
      emailError,
      passwordError,
      login,
    };
  },
};
</script>


<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; 
  background-color: #f0f8ff; 
  font-family: 'Comic Sans MS', cursive, sans-serif; 
  padding: 0 20px; 
}

.title {
  font-size: 2.5rem;
  color: #ffcc00; 
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  margin-bottom: 20px;
}

.card-body {
  background-color: #ffffff; 
  border-radius: 15px; 
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  padding: 30px;
  width: 100%; 
  max-width: 400px; 
  text-align: center;
}

.input-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #333; 
}

input {
  width: 100%;
  padding: 10px;
  border-radius: 10px; 
  border: 2px solid #ffcc00; 
  font-size: 1rem;
}

input:focus {
  outline: none;
  border-color: #00ccff; 
}

button {
  padding: 10px;
  background-color: #ff5733;
  color: white;
  font-size: 1.2rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #c70039; 
}

.error-message {
  color: #ff3333; 
  font-size: 0.9rem;
  margin-top: 5px;
}
</style>


