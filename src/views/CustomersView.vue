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
                <div class="min-h-screen bg-gray-100 p-8">
                    <div class="max-w-full mx-auto">
                        <div class="bg-white shadow-sm rounded-lg overflow-hidden">
                            <div class="p-6">
                                <div class="flex justify-between items-center mb-6">
                                    <div class="relative">
                                        <input v-model="searchTerm" @input="debouncedSearchUsers" type="text"
                                            placeholder="Search costumers..."
                                            class="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm rounded-xl"
                                            style="width: 100%;" />
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

                                        Create customers
                                    </button>
                                </div>
                                <table class="min-w-full divide-y divide-gray-200">
                                    <thead class="bg-gray-50">
                                        <tr>
                                            <th scope="col"
                                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Dui
                                            </th>
                                            <th scope="col"
                                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Firt Name
                                            </th>
                                            <th scope="col"
                                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Last Name
                                            </th>
                                            <th scope="col"
                                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Address
                                            </th>
                                            <th scope="col"
                                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Phone
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
                                        <tr v-for="customer in customers" :key="customer.dui">
                                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600">
                                                {{ customer.dui }}
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {{ customer.first_name }}
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {{ customer.last_name }}
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {{ customer.address }}
                                            </td>

                                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {{ customer.phone }}
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button @click="openEditModal(customer)"
                                                    class="text-blue-600 hover:text-blue-900">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                        class="lucide lucide-user-round-pen">
                                                        <path d="M2 21a8 8 0 0 1 10.821-7.487" />
                                                        <path
                                                            d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
                                                        <circle cx="10" cy="8" r="5" />
                                                    </svg>
                                                </button>
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button @click="openDeleteModal(customer)"
                                                    class="text-red-600 hover:text-red-900">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                        <path d="M2 21a8 8 0 0 1 13.292-6"></path>
                                                        <circle cx="10" cy="8" r="5"></circle>
                                                        <path d="M22 19h-6"></path>
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <!-- Modal Create User -->
                                <CreateCostumersModal :isOpen="isCreateModalOpen" ref="CreateCostumersModal"
                                    @close="closeCreateModal" @create-customer="createUser" />
                                <!-- Modal Edit User -->
                                <EditUserModal v-if="selectedUser && isEditModalOpen" :isOpen="isEditModalOpen"
                                    :userData="selectedUser" @close="closeEditModal" @submit-update="updateUser" />
                                <!-- Modal Delete User -->
                                <DeleteCostumerModal :isOpen="isDeleteModalOpen" :customer="selectedCostumer"
                                    @close="closeDeleteModal" @confirm-delete="deleteCostumer" />
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
import CreateCostumersModal from "@/components/CreateCostumerModal.vue";
import EditUserModal from "@/components/EditUserModal.vue";
import DeleteCostumerModal from "@/components/DeleteCostumerModal.vue";

export default {
    name: "CustomersView",
    components: {
        Sidebar,
        Header,
        CreateCostumersModal,
        EditUserModal,
        DeleteCostumerModal,
    },
    data() {
        return {
            sidebarOpen: true,
            isCreateModalOpen: false,
            isEditModalOpen: false,
            isDeleteModalOpen: false,
            customers: [],
            errorMessage: "",
            selectedCostumer: null,
            searchTerm: "",
        };
    },
    methods: {
        toggleSidebar() {
            this.sidebarOpen = !this.sidebarOpen;
        },
        openCreateModal() {
            this.$refs.CreateCostumersModal.clearErrors();
            this.$refs.CreateCostumersModal.clearForm();
            this.isCreateModalOpen = true;
        },
        closeCreateModal() {
            this.errorMessage = "";
            this.isCreateModalOpen = false;
        },
        openEditModal(user) {
            console.log("Usuario seleccionado para editar:", user);
            this.selectedUser = { ...user, id: user.id_user };
            this.isEditModalOpen = true;
        },
        closeEditModal() {
            this.selectedUser = null;
            this.isEditModalOpen = false;
        },
        openDeleteModal(customer) {
            this.selectedCostumer = customer;
            this.isDeleteModalOpen = true;
        },
        closeDeleteModal() {
            this.isDeleteModalOpen = false;
            this.selectedCostumer = null;
        },
        async fetchCostumers() {
            try {
                const response = await axios.get(
                    "http://127.0.0.1:8000/api/customers"
                );
                this.customers = response.data.customers;
                console.log("customers fetched:", this.customers);
            } catch (error) {
                console.error(
                    "Error fetching users:",
                    error.response?.data || error.message
                );
            }
        },
        async createUser(customers) {
            try {

                const response = await axios.post(
                    "http://127.0.0.1:8000/api/customers/create",
                    {
                        dui: customers.dui,
                        first_name: customers.first_name,
                        last_name: customers.last_name,
                        address: customers.address,
                        phone: customers.phone
                    }
                );
                console.log(response);
                this.fetchCostumers();
                this.closeCreateModal();
            } catch (error) {
                console.error(
                    "Error creating costumer:",
                    (this.errorMessage =
                        error.response?.data?.message || "Error creating costumer."),
                    error.response?.data || error.message
                );
            }
        },
        async updateUser(user) {
            try {
                const payload = {
                    id_user: user.id_user,
                    employee_name: user.employee_name,
                    phone: user.phone,
                    role:
                        user.role === "Administrator"
                            ? "A"
                            : user.role === "Cashier"
                                ? "C"
                                : "M",
                };

                if (user.password) {
                    payload.password = user.password;
                }

                const response = await axios.put(
                    "http://127.0.0.1:8000/api/customers/update",
                    payload
                );

                console.log("User updated:", response.data);
                this.fetchCostumers();
                this.closeEditModal();
            } catch (error) {
                console.error(
                    "Error updating user:",
                    error.response?.data || error.message
                );
            }
        },
        async deleteCostumer(customer) {
            try {
                const response = await axios.delete(
                    "http://127.0.0.1:8000/api/customers/delete",
                    {
                        data: { dui: customer.dui },
                    }
                );
                console.log("costumer deleted:", response.data);
                this.fetchCostumers();
            } catch (error) {
                console.error(
                    "Error deleting costumer:",
                    error.response?.data || error.message
                );
            }
        },
        async searchCutomers() {
            try {
                if (!this.searchTerm) {
                    this.fetchCostumers();
                } else {
                    const response = await axios.get(
                        "http://127.0.0.1:8000/api/customers/search",
                        {
                            params: {
                                customers: this.searchTerm,
                            },
                        }
                    );
                    this.customers = response.data.customers;
                    console.log("costumer searched:", this.customers);
                }
            } catch (error) {
                console.error(
                    "Error searching users:",
                    error.response?.data || error.message
                );
            }
        },

        debouncedSearchUsers: debounce(function () {
            this.searchUsers();
        }, 300),
    },
    mounted() {
        this.fetchCostumers();
    },
};
</script>
