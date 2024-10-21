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
          <div class="p-10">
            <h1 class="text-2xl font-semibold">Dashboard</h1>
          </div>
        </main>
      </div>
    </div>
  </template>
  
  <script>
  import Sidebar from '@/components/SidebarComponent.vue'
  import Header from '@/components/HeaderComponent.vue'
  
  export default {
    name: 'DashboardView',
    components: {
      Sidebar,
      Header
    },
    data() {
      return {
        sidebarOpen: true
      }
    },
    methods: {
      toggleSidebar() {
        this.sidebarOpen = !this.sidebarOpen
      }
    }
  }
  </script>
  