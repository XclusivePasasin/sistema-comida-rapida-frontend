<template>
    <v-app>
      <!-- Header -->
      <v-app-bar app color="primary" dark>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Mi Aplicación</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-app-bar>
  
      <!-- Sidebar -->
      <v-navigation-drawer v-model="drawer" app temporary>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              Menú de Navegación
            </v-list-item-title>
            <v-list-item-subtitle>
              Opciones de usuario
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
  
        <v-divider></v-divider>
  
        <v-list dense nav>
          <v-list-item v-for="item in items" :key="item.title" link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
  
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
  
      <!-- Main Content -->
      <v-main>
        <v-container fluid>
          <v-row>
            <v-col cols="12">
              <v-card>
                <v-card-title>Bienvenido</v-card-title>
                <v-card-text>
                  Este es el contenido principal de tu aplicación. Puedes añadir más componentes o rutas aquí.
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script>
  export default {
    name: 'AppLayout',
    data: () => ({
      drawer: false,
      items: [
        { title: 'Inicio', icon: 'mdi-home' },
        { title: 'Acerca de', icon: 'mdi-information' },
        { title: 'Contacto', icon: 'mdi-email' },
        { title: 'Configuración', icon: 'mdi-cog' },
      ],
    }),
  }
  </script>