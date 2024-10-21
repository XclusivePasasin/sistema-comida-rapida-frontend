<template>
  <header class="flex justify-between items-center p-4 bg-white border-b">
    <div class="flex items-center">
      <button @click="$emit('toggleSidebar')" class="mr-4 text-gray-500 hover:text-gray-700">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </div>

    <div class="flex items-center space-x-4 pr-4">
      <!-- Avatar -->
      <img class="w-10 h-10 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWDSOJsC-AJ21ww3nOVDD910tTvAoa9dEP8w&s" alt="User Avatar" />

      <div>
        <div class="text-gray-900 font-semibold">{{ user.username || 'Unknown' }}</div>
        <div class="text-gray-500 text-sm">
          {{ user_role }}
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderSection',
  data() {
    return {
      user: {
        username: '',
        role: '',
        employee_name: '',
      }
    };
  },
  computed: {
    user_role() {
      switch (this.user.role) {
        case 'A':
          return 'Administrator';
        case 'C':
          return 'Cashier';
        case 'M':
          return 'Waiter';
        default:
          return 'Unknown';
      }
    }
  },
  mounted() {
    const store_user = JSON.parse(localStorage.getItem('user'));
    if (store_user) {
      this.user = store_user;
    }
  },
}
</script>

<style scoped>
/* Puedes agregar estilos específicos aquí si lo necesitas */
</style>
