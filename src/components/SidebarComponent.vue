<template>
  <div
    :class="[
      'bg-gray-900 text-white transition-all duration-300 ease-in-out',
      sidebarOpen ? 'w-64' : 'w-0',
    ]"
  >
    <div class="p-9">
      <h1 class="text-3xl font-bold text-left">Fast!</h1>
    </div>
    <nav v-if="role === 'A'" class="mt-2 p-4">
      <router-link
        to="/dashboard"
        class="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-gauge mr-4"
        >
          <path d="m12 14 4-4" />
          <path d="M3.34 19a10 10 0 1 1 17.32 0" />
        </svg>
        Dashboard
      </router-link>
      <router-link
        to="/users"
        class="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-users-round mr-4"
        >
          <path d="M18 21a8 8 0 0 0-16 0" />
          <circle cx="10" cy="8" r="5" />
          <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" />
        </svg>
        Users
      </router-link>
      <router-link
        to="/orders"
        class="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-notebook-pen mr-4"
        >
          <path
            d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4"
          />
          <path d="M2 6h4" />
          <path d="M2 10h4" />
          <path d="M2 14h4" />
          <path d="M2 18h4" />
          <path
            d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"
          />
        </svg>
        Orders
      </router-link>
      <router-link
        to="/dishes"
        class="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-utensils-crossed mr-4"
        >
          <path
            d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8"
          />
          <path
            d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7"
          />
          <path d="m2.1 21.8 6.4-6.3" />
          <path d="m19 5-7 7" />
        </svg>
        Dishes
      </router-link>
      <router-link
        to="/customers"
        class="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-blocks mr-4"
        >
          <rect width="7" height="7" x="14" y="3" rx="1" />
          <path
            d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3"
          />
        </svg>
        Customers
      </router-link>
      <router-link
        to="/categories"
        class="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-layout-template mr-4"
        >
          <rect width="18" height="7" x="3" y="3" rx="1" />
          <rect width="9" height="7" x="3" y="14" rx="1" />
          <rect width="5" height="7" x="16" y="14" rx="1" />
        </svg>
        Categories
      </router-link>
      <router-link
        to="/tables"
        class="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-rectangle-horizontal mr-4"
        >
          <rect width="20" height="12" x="2" y="6" rx="2" />
        </svg>
        Tables
      </router-link>
      <router-link
        to="/ordersPending"
        class="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-notebook-text mr-4"
        >
          <path d="M2 6h4" />
          <path d="M2 10h4" />
          <path d="M2 14h4" />
          <path d="M2 18h4" />
          <rect width="16" height="20" x="4" y="2" rx="2" />
          <path d="M9.5 8h5" />
          <path d="M9.5 12H16" />
          <path d="M9.5 16H14" />
        </svg>
        Orders Pending
      </router-link>
      <router-link
        to="/ordersDelivered"
        class="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-notebook-text mr-4"
        >
          <path d="M2 6h4" />
          <path d="M2 10h4" />
          <path d="M2 14h4" />
          <path d="M2 18h4" />
          <rect width="16" height="20" x="4" y="2" rx="2" />
          <path d="M9.5 8h5" />
          <path d="M9.5 12H16" />
          <path d="M9.5 16H14" />
        </svg>
        Orders Delivered
      </router-link>
      <router-link
        to="/ordersAll"
        class="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-notebook-text mr-4"
        >
          <path d="M2 6h4" />
          <path d="M2 10h4" />
          <path d="M2 14h4" />
          <path d="M2 18h4" />
          <rect width="16" height="20" x="4" y="2" rx="2" />
          <path d="M9.5 8h5" />
          <path d="M9.5 12H16" />
          <path d="M9.5 16H14" />
        </svg>
        Orders All
      </router-link>

      <div
        @click="toggleMenu"
        class="flex items-center text-white py-2.5 px-4 cursor-pointer rounded transition duration-200 hover:bg-gray-700 hover:text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-folder mr-4"
        >
          <path
            d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
          />
        </svg>
        <span class="mr-12">Reports</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 transition-transform ml-6"
          :class="{ 'rotate-180': isMenuOpen }"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      <div
        v-show="isMenuOpen"
        class="pl-8 transition-all duration-300 ease-in-out overflow-hidden"
      >
        <router-link
          to="/salesCategories"
          class="flex items-center py-2 px-4 text-white rounded transition duration-200 hover:bg-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-file-spreadsheet mr-2"
          >
            <path
              d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"
            />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <path d="M8 13h2" />
            <path d="M14 13h2" />
            <path d="M8 17h2" />
            <path d="M14 17h2" />
          </svg>
          Sales Categories
        </router-link>

        <router-link
          to="/salesDaily"
          class="flex items-center py-2 px-4 text-white rounded transition duration-200 hover:bg-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-file-spreadsheet mr-2"
          >
            <path
              d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"
            />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <path d="M8 13h2" />
            <path d="M14 13h2" />
            <path d="M8 17h2" />
            <path d="M14 17h2" />
          </svg>
          Sales Daily
        </router-link>

        <router-link
          to="/salesPeriodic"
          class="flex items-center py-2 px-4 text-white rounded transition duration-200 hover:bg-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-file-spreadsheet mr-2"
          >
            <path
              d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"
            />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <path d="M8 13h2" />
            <path d="M14 13h2" />
            <path d="M8 17h2" />
            <path d="M14 17h2" />
          </svg>
          Sales Periodic
        </router-link>
      </div>
    </nav>

    <nav v-else-if="role === 'M'" class="mt-2 p-4">
      <router-link
        to="/dashboard"
        class="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-gauge mr-4"
        >
          <path d="m12 14 4-4" />
          <path d="M3.34 19a10 10 0 1 1 17.32 0" />
        </svg>
        Dashboard
      </router-link>
      <router-link
        to="/orders"
        class="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-notebook-pen mr-4"
        >
          <path
            d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4"
          />
          <path d="M2 6h4" />
          <path d="M2 10h4" />
          <path d="M2 14h4" />
          <path d="M2 18h4" />
          <path
            d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"
          />
        </svg>
        Orders
      </router-link>
      <router-link
        to="/ordersPending"
        class="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-notebook-text mr-4"
        >
          <path d="M2 6h4" />
          <path d="M2 10h4" />
          <path d="M2 14h4" />
          <path d="M2 18h4" />
          <rect width="16" height="20" x="4" y="2" rx="2" />
          <path d="M9.5 8h5" />
          <path d="M9.5 12H16" />
          <path d="M9.5 16H14" />
        </svg>
        Orders Pending
      </router-link>
    </nav>

    <nav v-else class="mt-2 p-4">
      <router-link
        to="/dashboard"
        class="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-gauge mr-4"
        >
          <path d="m12 14 4-4" />
          <path d="M3.34 19a10 10 0 1 1 17.32 0" />
        </svg>
        Dashboard
      </router-link>
      <router-link
        to="/orders"
        class="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-notebook-pen mr-4"
        >
          <path
            d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4"
          />
          <path d="M2 6h4" />
          <path d="M2 10h4" />
          <path d="M2 14h4" />
          <path d="M2 18h4" />
          <path
            d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"
          />
        </svg>
        Orders
      </router-link>
      <router-link
        to="/ordersDelivered"
        class="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-notebook-text mr-4"
        >
          <path d="M2 6h4" />
          <path d="M2 10h4" />
          <path d="M2 14h4" />
          <path d="M2 18h4" />
          <rect width="16" height="20" x="4" y="2" rx="2" />
          <path d="M9.5 8h5" />
          <path d="M9.5 12H16" />
          <path d="M9.5 16H14" />
        </svg>
        Orders Delivered
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: "SidebarSection",
  props: ["sidebarOpen"],
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    loadUserRole() {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData && userData.role) {
        this.role = userData.role;
      }
    },
  },
  created() {
    this.loadUserRole();
  },
};
</script>

<style scoped></style>
