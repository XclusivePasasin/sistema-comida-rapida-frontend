<template>
  <div :class="['bg-gray-900 text-white transition-all duration-300 ease-in-out', sidebarOpen ? 'w-64' : 'w-0']">
    <div class="p-6">
      <h1 class="text-2xl font-semibold">Logo</h1>
    </div>
    <nav class="mt-8 p-4">
      <router-link
        to="/users"
        class="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
      >
        Users
      </router-link>
      <router-link
        to="/orders"
        class="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
      >
        My orders
      </router-link>
      <router-link
        to="/account"
        class="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
      >
        My account
      </router-link>
      <router-link
        to="/customers"
        class="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
      >
        Customers
      </router-link>
      <router-link
        to="/categories"
        class="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
      >
        Categories
      </router-link>
      <router-link
        to="/tables"
        class="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
      >
        Tables
      </router-link>
    </nav>
  </div>
</template>


<script>
export default {
  name: 'SidebarSection',
  props: ['sidebarOpen']
}
</script>

<style scoped>
/* Puedes agregar estilos específicos aquí si lo necesitas */
</style>
