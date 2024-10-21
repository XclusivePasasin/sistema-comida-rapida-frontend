<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar Component -->
    <Sidebar :sidebarOpen="sidebarOpen" />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header Component -->
      <Header @toggleSidebar="toggleSidebar" />

      <!-- Dynamic Content Area -->
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div class="p-4">
          <v-card class="p-6"> 
            <h1 class="text-2xl font-semibold text-center">User management </h1>
            <v-container>
              <v-row>
                <!-- Primera fila -->
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.username"
                    label="Username"
                    variant="outlined"
                    rounded
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.name_employee"
                    label="Name Employee"
                    variant="outlined"
                    rounded
                    required
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <!-- Segunda fila -->
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    rounded
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.phone"
                    label="Phone"
                    variant="outlined"
                    rounded
                    required
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <!-- Tercera fila -->
                <v-col cols="12" md="6">
                  <v-select
                    v-model="form.rol"
                    :items="roles"
                    label="Rol"
                    variant="outlined"
                    @change="handleRoleChange"
                    rounded
                    required
                  ></v-select>
                </v-col>

                <v-col cols="12" md="6">
                  <v-btn
                    color="primary"
                    variant="elevated"
                    rounded
                    block
                    class="same-size-btn"
                    style="height: 50px;"
                    @click="addUser"
                  >
                    Save
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </div>
      </main>
    </div>
  </div>
</template>
<script>
import Sidebar from "@/components/SidebarComponent.vue";
import Header from "@/components/HeaderComponent.vue";

export default {
  name: "UsersView",
  components: {
    Sidebar,
    Header,
  },
  data() {
    return {
      form: {
        username: "",
        name_employee: "",
        password: "",
        phone: "",
        rol: null,
      },
      roles: ["Administrator", "Cashier", "Waiter"],
      sidebarOpen: true,
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    addUser() {
      console.log('Selected Role:', this.form.rol);
      console.log("Usuario agregado:", this.form);
    },
    parseRole(role) {
      switch (role) {
        case "Administrator":
          return "A";
        case "Cashier":
          return "C";
        case "Waiter":
          return "M";
        default:
          return "Unknown";
      }
    },
    handleRoleChange(selectedRole) {
      this.form.rol = this.parseRole(selectedRole);
      console.log(this.form.rol);
    },
  },
};
</script>
