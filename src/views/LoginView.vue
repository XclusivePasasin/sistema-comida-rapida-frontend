<template>
    <v-container fluid class="fill-height pa-0">
      <v-row no-gutters>
        <v-col
          cols="12"
          md="5"
          class="d-none d-md-flex"
          style="background-color: #26a69a; height: 100vh"
        >
          <v-sheet
            class="d-flex align-center justify-center"
            color="transparent"
            width="100%"
          >
            <h1 class="text-h2 font-weight-bold text-white">Fast!</h1>
          </v-sheet>
        </v-col>
  
        <v-col
          cols="12"
          md="7"
          class="d-flex align-center justify-center"
          style="height: 100vh"
        >
          <v-sheet color="transparent" max-width="500px" width="100%">
            <h1
              class="text-h3 font-weight-bold mb-12 text-center"
              style="color: #26a69a"
            >
              Welcome
            </h1>
            <h3 class="text-center mb-6" style="color: #6c757d">
              Sign in to your account
            </h3>
            <v-form @submit.prevent="onSubmit">
              <v-text-field
                v-model="username"
                label="Username"
                placeholder="Enter your username"
                prepend-inner-icon="mdi-account"
                variant="outlined"
                class="mb-4"
                rounded
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                placeholder="Enter your password"
                prepend-inner-icon="mdi-lock"
                :type="showPassword ? 'text' : 'password'"
                :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append-inner="showPassword = !showPassword"
                variant="outlined"
                class="mb-4"
                rounded
                required
              ></v-text-field>
              <v-btn
                block
                color="teal-lighten-1"
                rounded
                size="large"
                type="submit"
              >
                Login
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-in"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/></svg>
              </v-btn>
            </v-form>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        username: "",
        password: "",
        showPassword: false,
      };
    },
    methods: {
      async onSubmit() {
        try {
          const response = await axios.post("http://127.0.0.1:8000/api/users/login", {
            username: this.username,
            password: this.password,
          });
  
          if (response.data.code === 200) {
            console.log("Login Successful", response.data);
            alert("Login Successful");
            // Puedes redireccionar a otra página o almacenar los datos según tu lógica
          } else {
            alert(response.data.message || "Invalid username or password");
          }
        } catch (error) {
          console.error("Error al iniciar sesión", error);
          alert("Error en el inicio de sesión");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .fill-height {
    height: 100%;
  }
  </style>
  