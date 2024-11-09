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
                      @input="debouncedSearchUsers"
                      type="text"
                      placeholder="Search users..."
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
                      class="lucide lucide-user-round-plus ml-2 mr-2"
                    >
                      <path d="M2 21a8 8 0 0 1 13.292-6" />
                      <circle cx="10" cy="8" r="5" />
                      <path d="M19 16v6" />
                      <path d="M22 19h-6" />
                    </svg>

                    Create User
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
                          Username
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Employee Name
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Rol
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Phone
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
                      <tr v-for="user in users" :key="user.id">
                        <td
                          class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600"
                        >
                          {{ user.username }}
                        </td>
                        <td
                          class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                        >
                          {{ user.employee_name }}
                        </td>
                        <td
                          class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                        >
                          <span v-if="user.role === 'A'">Administrator</span>
                          <span v-else-if="user.role === 'C'">Cashier</span>
                          <span v-else>Waiter</span>
                        </td>

                        <td
                          class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                        >
                          {{ user.phone }}
                        </td>
                        <td
                          class="px-6 py-4 whitespace-nowrap text-sm font-medium"
                        >
                          <button
                            @click="openEditModal(user)"
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
                              class="lucide lucide-user-round-pen"
                            >
                              <path d="M2 21a8 8 0 0 1 10.821-7.487" />
                              <path
                                d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"
                              />
                              <circle cx="10" cy="8" r="5" />
                            </svg>
                          </button>
                        </td>
                        <td
                          class="px-6 py-4 whitespace-nowrap text-sm font-medium"
                        >
                          <button
                            @click="openDeleteModal(user)"
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
                            >
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

                <!-- Modal Create User -->
                <CreateUserModal
                  :isOpen="isCreateModalOpen"
                  ref="createUserModal"
                  @close="closeCreateModal"
                  @create-user="createUser"
                />
                <!-- Modal Edit User -->
                <EditUserModal
                  v-if="selectedUser && isEditModalOpen"
                  :isOpen="isEditModalOpen"
                  :userData="selectedUser"
                  @close="closeEditModal"
                  @submit-update="updateUser"
                />
                <!-- Modal Delete User -->
                <DeleteUserModal
                  :isOpen="isDeleteModalOpen"
                  :user="selectedUser"
                  @close="closeDeleteModal"
                  @confirm-delete="deleteUser"
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
import { debounce } from "lodash";
import { mapGetters } from 'vuex'
// Import modals
import CreateUserModal from "@/components/CreateUserModal.vue";
import EditUserModal from "@/components/EditUserModal.vue";
import DeleteUserModal from "@/components/DeleteUserModal.vue";

export default {
  name: "UsersView",
  components: {
    Sidebar,
    Header,
    CreateUserModal,
    EditUserModal,
    DeleteUserModal,
  },
  data() {
    return {
      sidebarOpen: true,
      isCreateModalOpen: false,
      isEditModalOpen: false,
      isDeleteModalOpen: false,
      users: [],
      errorMessage: "",
      selectedUser: null,
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
      this.$refs.createUserModal.clearErrors();
      this.$refs.createUserModal.clearForm();
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
    openDeleteModal(user) {
      this.selectedUser = user;
      this.isDeleteModalOpen = true;
    },
    closeDeleteModal() {
      this.isDeleteModalOpen = false;
      this.selectedUser = null;
    },
    async fetchUsers(page = 1) {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/users/select",
          {
            params: {
              page: page,
            },
          }
        );
        this.users = response.data.users.data;
        this.currentPage = response.data.users.current_page;
        this.totalPages = response.data.users.last_page;
        console.log("Users fetched:", this.users);
      } catch (error) {
        console.error(
          "Error fetching users:",
          error.response?.data || error.message
        );
      }
    },
    async createUser(user) {
      try {
        if (user.role === "Administrator") {
          user.role = "A";
        } else if (user.role === "Cashier") {
          user.role = "C";
        } else if (user.role === "Waiter") {
          user.role = "M";
        }

        const response = await axios.post(
          "http://127.0.0.1:8000/api/users/create",
          {
            username: user.username,
            password: user.password,
            role: user.role,
            employee_name: user.employee_name,
            phone: user.phone,
          }
        );
        console.log(response);
        this.fetchUsers();
        this.closeCreateModal();
      } catch (error) {
        console.error(
          "Error creating user:",
          (this.errorMessage =
            error.response?.data?.message || "Error creating user."),
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
          role: user.role,
        };

        if (user.password) {
          payload.password = user.password;
        }

        const response = await axios.put(
          "http://127.0.0.1:8000/api/users/update",
          payload
        );

        console.log("User updated:", response.data);
        this.fetchUsers();
        this.closeEditModal();
      } catch (error) {
        console.error(
          "Error updating user:",
          error.response?.data || error.message
        );
      }
    },
    async deleteUser(user) {
      try {
        const response = await axios.delete(
          "http://127.0.0.1:8000/api/users/delete",
          {
            data: { id_user: user.id_user },
          }
        );
        console.log("User deleted:", response.data);
        this.fetchUsers();
      } catch (error) {
        console.error(
          "Error deleting user:",
          error.response?.data || error.message
        );
      }
    },
    async searchUsers() {
      try {
        if (!this.searchTerm) {
          this.fetchUsers();
        } else {
          const response = await axios.get(
            "http://127.0.0.1:8000/api/users/search",
            {
              params: {
                user: this.searchTerm,
              },
            }
          );
          this.users = response.data.users;
          console.log("Users searched:", this.users);
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

    // Method for change page
    goToPage(page) {
      this.fetchUsers(page);
    },
  },
  computed: {
    ...mapGetters(['getUserRole']), 

    isAdmin() {
      return this.getUserRole === 'A';
    }
  },
  mounted() {
    if (!this.isAdmin) {
      this.$router.push({ name: 'Dashboard' }); 
    }
    this.fetchUsers();
  },
};
</script>
