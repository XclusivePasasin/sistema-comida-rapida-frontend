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
                                <div class="flex justify-between items-center mb-6 sticky top-0 bg-white">
                                    <div class="relative">
                                        <input v-model="searchTerm" @input="debouncedSearchCategorias" type="text"
                                            placeholder="Search categories..."
                                            class="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm rounded-xl"
                                            style="width: 100%" />
                                        <div
                                            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <button @click="openCreateModal"
                                        class="flex px-4 py-2 bg-emerald-500 text-white rounded-xl text-medium hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round"
                                            class="lucide lucide-user-round-plus ml-2 mr-2">
                                            <path d="M2 21a8 8 0 0 1 13.292-6" />
                                            <circle cx="10" cy="8" r="5" />
                                            <path d="M19 16v6" />
                                            <path d="M22 19h-6" />
                                        </svg>

                                        Create Category
                                    </button>
                                </div>

                                <!-- Table Section with Scroll -->
                                <div
                                    class="overflow-y-auto max-h-[400px] scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-500">
                                    <table class="min-w-full divide-y divide-gray-200">
                                        <thead class="bg-gray-50 sticky top-0">
                                            <tr>
                                                <th scope="col"
                                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Id
                                                </th>
                                                <th scope="col"
                                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Categories Name
                                                </th>
                                                <th scope="col"
                                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Edit
                                                </th>
                                                <th scope="col"
                                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Delete
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody class="bg-white divide-y divide-gray-200">
                                            <tr v-for="categories in categories" :key="categories.id_category">
                                                <td
                                                    class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600">
                                                    {{ categories.id_category }}
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {{ categories.name }}
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button @click="openEditModal(categories)"
                                                        class="text-blue-600 hover:text-blue-900">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            class="lucide lucide-user-round-pen">
                                                            <path d="M2 21a8 8 0 0 1 10.821-7.487" />
                                                            <path
                                                                d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
                                                            <circle cx="10" cy="8" r="5" />
                                                        </svg>
                                                    </button>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button @click="openDeleteModal(categories)"
                                                        class="text-red-600 hover:text-red-900">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round">
                                                            <path d="M2 21a8 8 0 0 1 13.292-6"></path>
                                                            <circle cx="10" cy="8" r="5"></circle>
                                                            <path d="M22 19h-6"></path>
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <!-- Pagination Controls -->
                                <div class="flex justify-between items-center mt-4">
                                    <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
                                        class="px-4 py-2 bg-gray-200 rounded-lg text-sm">
                                        Previous
                                    </button>

                                    <span>Page {{ currentPage }} of {{ totalPages }}</span>

                                    <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages"
                                        class="px-4 py-2 bg-gray-200 rounded-lg text-sm">
                                        Next
                                    </button>
                                </div>

                                <!-- Modal Create User -->
                                <CreateCategoriesModal :isOpen="isCreateModalOpen" ref="CreateCategoriesModal"
                                    @close="closeCreateModal" @create-category="createCategory" />
                                <!-- Modal Edit User -->
                                <EditCategoriesModal v-if="selectedCategory && isEditModalOpen"
                                    :isOpen="isEditModalOpen" :categories="selectedCategory" @close="closeEditModal"
                                    @submit-update="updateCategories" />
                                <!-- Modal Delete User -->
                                <DeleteCategoriesModal :isOpen="isDeleteModalOpen" :categories="selectedCategory"
                                    @close="closeDeleteModal" @confirm-delete="deleteCategory" />
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
import { debounce } from "lodash";
// Import modals
import CreateCategoriesModal from "@/components/CreateCategoriesModal.vue";
import EditCategoriesModal from "@/components/EditCategoriesModal.vue";
import DeleteCategoriesModal from "@/components/DeleteCategoriesModal.vue";

export default {
    name: "UsersView",
    components: {
        Sidebar,
        Header,
        CreateCategoriesModal,
        EditCategoriesModal,
        DeleteCategoriesModal,
    },
    data() {
        return {
            sidebarOpen: true,
            isCreateModalOpen: false,
            isEditModalOpen: false,
            isDeleteModalOpen: false,
            category: [],
            errorMessage: "",
            selectedCategory: null,
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
            this.$refs.CreateCategoriesModal.clearErrors();
            this.$refs.CreateCategoriesModal.clearForm();
            this.isCreateModalOpen = true;
        },
        closeCreateModal() {
            this.errorMessage = "";
            this.isCreateModalOpen = false;
        },
        openEditModal(categories) {
            console.log("categories selected para editar:", categories);
            this.selectedCategory = { ...categories, id_category: categories.id_category, name: categories.name };
            this.isEditModalOpen = true;
        },
        closeEditModal() {
            this.selectedCategory = null;
            this.isEditModalOpen = false;
        },
        openDeleteModal(categories) {
            this.selectedCategory = categories;
            this.isDeleteModalOpen = true;
        },
        closeDeleteModal() {
            this.isDeleteModalOpen = false;
            this.selectedCategory = null;
        },
        async fetchCategories(page = 1) {
            try {
                const response = await axios.get(
                    "http://127.0.0.1:8000/api/categories",
                    {
                        params: {
                            page: page,
                        },
                    }
                );
                this.categories = response.data.categories.data;
                this.currentPage = response.data.categories.current_page;
                this.totalPages = response.data.categories.last_page;
                console.log("Users fetched:", this.categories);
            } catch (error) {
                console.error(
                    "Error fetching users:",
                    error.response?.data || error.message
                );
            }
        },
        async createCategory(categories) {
            try {
                const response = await axios.post(
                    "http://127.0.0.1:8000/api/categories/create",
                    {
                        name: categories.name,
                    }
                );
                console.log(response);
                this.fetchCategories();
                this.closeCreateModal();
            } catch (error) {
                console.error(
                    "Error creating categorie:",
                    (this.errorMessage =
                        error.response?.data?.message || "Error creating categorie."),
                    error.response?.data || error.message
                );
            }
        },
        async updateCategories(categories) {
            try {
                const payload = {
                    id_category: categories.id_category,
                    name: categories.name,
                };


                const response = await axios.put(
                    "http://127.0.0.1:8000/api/categories/update",
                    payload
                );

                console.log("User updated:", response.data);
                this.fetchCategories();
                this.closeEditModal();
            } catch (error) {
                console.error(
                    "Error updating categories:",
                    error.response?.data || error.message
                );
            }
        },
        async deleteCategory(categories) {
            try {
                const response = await axios.delete(
                    "http://127.0.0.1:8000/api/categories/delete",
                    {
                        data: { id_category: categories.id_category },
                    }
                );
                console.log("User deleted:", response.data);
                this.fetchCategories();
            } catch (error) {
                console.error(
                    "Error deleting user:",
                    error.response?.data || error.message
                );
            }
        },
        async searchCategories() {
            try {
                if (!this.searchTerm) {
                    // Si no hay término de búsqueda, traer todas las categorías
                    this.fetchCategories();
                } else {
                    // Si hay término de búsqueda, realiza la solicitud al endpoint de búsqueda
                    const response = await axios.get(
                        "http://127.0.0.1:8000/api/categories/search",
                        {
                            params: {
                                category: this.searchTerm, // El parámetro de búsqueda
                            },
                        }
                    );
                    this.categories = response.data.categories; // Asigna los resultados al array de categorías
                    console.log("Categories searched:", this.categories);
                }
            } catch (error) {
                // Manejo de errores en caso de que falle la solicitud
                console.error(
                    "Error searching categories:",
                    error.response?.data || error.message
                );
            }
        },

        debouncedSearchCategorias: debounce(function () {
            this.searchCategories();
        }, 300),

        // Method for change page
        goToPage(page) {
            this.fetchCategories(page);
        },
    },
    mounted() {
        this.fetchCategories();
    },
};
</script>