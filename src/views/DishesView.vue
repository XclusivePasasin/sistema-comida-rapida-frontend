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
        <div class="bg-gray-100 p-8">
          <div class="max-w-full mx-auto">
            <div class="bg-white shadow-sm rounded-lg overflow-hidden">
              <div class="p-6">
                <!-- Fixed Search and Button Section -->
                <div
                  class="flex justify-between items-center mb-6 sticky top-0 bg-white"
                >
                  <div class="relative">
                    <input
                      v-model="searchTerm"
                      @input="debouncedSearchDishes"
                      type="text"
                      placeholder="Search dishes..."
                      class="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm rounded-xl"
                      style="width: 100%"
                    />
                    <div
                      class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    >
                      <svg
                        class="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <button
                    @click="openCreateModal"
                    class="flex px-4 py-2 bg-emerald-500 text-white rounded-xl text-medium hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-utensils-crossed mr-2"
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
                    Create Dish
                  </button>
                </div>

                <!-- Table Section with Scroll -->
                <div
                  class="overflow-y-auto max-h-[500px] scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-500"
                >
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50 sticky top-0">
                      <tr>
                        <th
                          scope="col"
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Dish Name
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Category
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Description
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Edit
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Delete
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr v-for="dish in dishes" :key="dish.id_dish">
                        <td
                          class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600"
                        >
                          {{ dish.dish_name }}
                        </td>
                        <td
                          class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                        >
                          ${{ dish.price.toFixed(2) }}
                        </td>
                        <td
                          class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                        >
                          {{ dish.category.name }}
                        </td>
                        <td
                          class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                        >
                          {{ dish.description }}
                        </td>
                        <td
                          class="px-6 py-4 whitespace-nowrap text-sm font-medium"
                        >
                          <button
                            @click="openEditModal(dish)"
                            class="text-blue-600 hover:text-blue-900"
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
                              class="lucide lufwcide-square-pen"
                            >
                              <path
                                d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                              />
                              <path
                                d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"
                              />
                            </svg>
                          </button>
                        </td>
                        <td
                          class="px-6 py-4 whitespace-nowrap text-sm font-medium"
                        >
                          <button
                            @click="openDeleteModal(dish)"
                            class="text-red-600 hover:text-red-900"
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
                              class="lucide lucide-trash-2"
                            >
                              <path d="M3 6h18" />
                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                              <line x1="10" x2="10" y1="11" y2="17" />
                              <line x1="14" x2="14" y1="11" y2="17" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <!-- Pagination Controls -->
                <div class="flex justify-between items-center mt-4">
                  <button
                    @click="goToPage(currentPage - 1)"
                    :disabled="currentPage === 1"
                    class="px-4 py-2 bg-gray-200 rounded-lg text-sm"
                  >
                    Previous
                  </button>

                  <span>Page {{ currentPage }} of {{ totalPages }}</span>

                  <button
                    @click="goToPage(currentPage + 1)"
                    :disabled="currentPage === totalPages"
                    class="px-4 py-2 bg-gray-200 rounded-lg text-sm"
                  >
                    Next
                  </button>
                </div>

                <!-- Modal Create Dish -->
                <CreateDishModal
                  :isOpen="isCreateModalOpen"
                  ref="createDishModal"
                  @close="closeCreateModal"
                  @create-dish="createDish"
                />
                <!-- Modal Edit Dish -->
                <EditDishModal
                  v-if="selectedDish && isEditModalOpen"
                  :isOpen="isEditModalOpen"
                  :dishData="selectedDish"
                  @close="closeEditModal"
                  @submit-update="updateDish"
                />
                <!-- Modal Delete Dish -->
                <DeleteDishModal
                  :isOpen="isDeleteModalOpen"
                  :dish="selectedDish"
                  @close="closeDeleteModal"
                  @confirm-delete="deleteDish"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Sidebar from "@/components/SidebarComponent.vue";
import Header from "@/components/HeaderComponent.vue";
import CreateDishModal from "@/components/CreateDishModal.vue";
import EditDishModal from "@/components/EditDishModal.vue";
import DeleteDishModal from "@/components/DeleteDishModal.vue";
import { debounce } from "lodash";

export default {
  name: "DishesView",
  components: {
    Sidebar,
    Header,
    CreateDishModal,
    EditDishModal,
    DeleteDishModal,
  },
  data() {
    return {
      sidebarOpen: true,
      isCreateModalOpen: false,
      isEditModalOpen: false,
      isDeleteModalOpen: false,
      dishes: [],
      selectedDish: null,
      searchTerm: "",
      currentPage: 1,
      totalPages: 0,
      perPage: 10,
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    openCreateModal() {
      this.isCreateModalOpen = true;
    },
    closeCreateModal() {
      this.isCreateModalOpen = false;
    },
    openEditModal(dish) {
      this.selectedDish = { ...dish };
      this.isEditModalOpen = true;
    },
    closeEditModal() {
      this.isEditModalOpen = false;
      this.selectedDish = null;
    },
    openDeleteModal(dish) {
      this.selectedDish = dish;
      this.isDeleteModalOpen = true;
    },
    closeDeleteModal() {
      this.isDeleteModalOpen = false;
      this.selectedDish = null;
    },
    async fetchDishes(page = 1) {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/dishes", {
          params: { page: page },
        });
        this.dishes = response.data.dishes.data;
        this.currentPage = response.data.dishes.current_page;
        this.totalPages = response.data.dishes.last_page;
      } catch (error) {
        console.error(
          "Error fetching dishes:",
          error.response?.data || error.message
        );
      }
    },
    async createDish(dish) {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/dishes/create",
          dish
        );
        console.log(response);
        this.fetchDishes();
        this.closeCreateModal();
      } catch (error) {
        console.error(
          "Error creating dish:",
          error.response?.data || error.message
        );
      }
    },
    async updateDish(dish) {
      try {
        const response = await axios.put(
          `http://127.0.0.1:8000/api/dishes/update`,
          dish
        );
        console.log("Dish updated:", response.data);
        this.fetchDishes();
        this.closeEditModal();
      } catch (error) {
        if (error.response?.data?.errors) {
          this.$refs.editDishModal.errors = error.response.data.errors;
        } else {
          console.error(
            "Error updating dish:",
            error.response?.data || error.message
          );
        }
      }
    },
    async deleteDish(dish) {
      try {
        const response = await axios.delete(
          `http://127.0.0.1:8000/api/dishes/delete`,
          {
            data: { id_dish: dish.id_dish },
          }
        );
        console.log("Dish deleted:", response.data);
        this.fetchDishes();
        this.closeDeleteModal();
      } catch (error) {
        console.error(
          "Error deleting dish:",
          error.response?.data || error.message
        );
      }
    },
    async searchDishes() {
      if (!this.searchTerm) {
        this.fetchDishes(); 
        return;
      }

      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/dishes/search",
          { params: { dish: this.searchTerm } }
        );
        this.dishes = response.data.dishes;
      } catch (error) {
        console.error(
          "Error searching dishes:",
          error.response?.data || error.message
        );
      }
    },
    debouncedSearchDishes: debounce(function () {
      this.searchDishes();
    }, 300),
    goToPage(page) {
      this.fetchDishes(page);
    },
  },
  mounted() {
    this.fetchDishes();
  },
};
</script>
