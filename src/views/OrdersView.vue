<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar Component -->
    <Sidebar :sidebarOpen="sidebarOpen" />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header Component -->
      <Header @toggleSidebar="toggleSidebar" />

      <!-- Dynamic Content Area -->
      <main class="flex-1 bg-gray-100">
        <div class="min-h-screen bg-gray-100 p-8">
          <div class="max-w-full mx-auto">
            <div class="bg-white shadow-sm rounded-lg overflow-hidden">
              <!-- Alerta dinámica -->
              <div
                v-if="alertMessage"
                :class="alertClass"
                class="fixed top-4 right-5 max-w-xs w-auto p-3 rounded-lg text-white shadow-lg z-50"
              >
                {{ alertMessage }}
              </div>
              <!-- Contenedor que agrupa el título y el botón -->
              <div class="flex justify-between items-center p-6">
                <h2 class="text-xl font-semibold text-gray-700">
                  Create Order
                </h2>
                <button
                  @click="showModal = true"
                  class="px-4 py-2 bg-sky-600 text-white rounded-xl hover:bg-sky-700 focus:outline-none"
                >
                  Register Customer
                </button>
              </div>

              <!-- Modal para registrar cliente -->
              <CustomerModal
                v-if="showModal"
                :isOpen="showModal"
                @close="showModal = false"
                @create-customer="addCustomer"
              />

              <!-- Formulario de creación de orden -->
              <div class="p-6">
                <div class="flex flex-col space-y-4">
                  <div class="grid grid-cols-3 gap-4">
                    <!-- Order ID -->
                    <div>
                      <label class="block text-sm font-medium text-gray-700"
                        >Order ID</label
                      >
                      <input
                        type="text"
                        v-model="order.id_order"
                        class="pl-5 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm rounded-xl"
                        readonly
                      />
                    </div>

                    <!-- Order Date -->
                    <div>
                      <label class="block text-sm font-medium text-gray-700"
                        >Order Date</label
                      >
                      <input
                        type="datetime-local"
                        v-model="formattedOrderDate"
                        class="pl-5 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm rounded-xl"
                        readonly
                      />
                    </div>
                    <!-- Customer  -->
                    <div>
                      <label for="customerDui">Customer:</label>
                      <input
                        type="text"
                        v-model="order.customer_dui"
                        @input="filterDUI"
                        :readonly="duiLocked"
                        @blur="validateCustomerDUI"
                        class="pl-5 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm rounded-xl"
                        placeholder="Enter customer DUI"
                      />

                      <p v-if="customerExists === true" class="text-green-500">
                        DUI válido.
                      </p>
                      <p v-if="customerExists === false" class="text-red-500">
                        DUI no encontrado. Ingrese un DUI correcto.
                      </p>
                    </div>
                    <!-- Table Selector -->
                    <div>
                      <label class="block text-sm font-medium text-gray-700"
                        >Table</label
                      >
                      <select
                        v-model="order.id_table"
                        class="pl-5 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm rounded-xl"
                      >
                        <option
                          v-for="table in tables"
                          :key="table.id_table"
                          :value="table.id_table"
                        >
                          {{ table.table_number }}
                        </option>
                      </select>
                      <p
                        v-if="tables.length === 0"
                        class="text-red-500 text-sm"
                      >
                        No hay mesas disponibles.
                      </p>
                    </div>

                    <!-- Payment Method Selector -->
                    <div>
                      <label class="block text-sm font-medium text-gray-700"
                        >Payment Method</label
                      >
                      <select
                        v-model="order.payment_method"
                        class="pl-5 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm rounded-xl"
                      >
                        <option value="cash">Cash</option>
                        <option value="credit_card">Credit Card</option>
                        <option value="paypal">PayPal</option>
                      </select>
                    </div>

                    <!-- Total Amount -->
                    <div>
                      <label class="block text-sm font-medium text-gray-700"
                        >Total</label
                      >
                      <input
                        type="number"
                        v-model="order.total"
                        class="pl-5 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm rounded-xl"
                        placeholder="Enter total amount"
                        readonly
                      />
                    </div>

                    <!-- Categories Selector -->
                    <div>
                      <label class="block text-sm font-medium text-gray-700"
                        >Categories</label
                      >
                      <select
                        v-model="selectedCategory"
                        class="pl-5 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm rounded-xl"
                      >
                        <option value="" disabled>Select a category</option>
                        <option
                          v-for="category in categories"
                          :key="category.id_category"
                          :value="category.id_category"
                        >
                          {{ category.name }}
                        </option>
                      </select>
                    </div>
                    <!-- Dishes Selector -->
                    <div>
                      <label class="block text-sm font-medium text-gray-700"
                        >Dishes</label
                      >
                      <select
                        v-model="selectedDish"
                        class="pl-5 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm rounded-xl"
                      >
                        <option value="" disabled>Select a dish</option>
                        <option
                          v-for="dish in dishes"
                          :key="dish.id_dish"
                          :value="dish"
                        >
                          {{ dish.dish_name }} - ${{ dish.price }}
                        </option>
                      </select>
                    </div>

                    <!-- Amount -->
                    <div>
                      <label class="block text-sm font-medium text-gray-700"
                        >Amount</label
                      >
                      <input
                        type="number"
                        min="1"
                        v-model="amount"
                        @keypress="preventDecimal"
                        @input="validateInteger"
                        class="pl-5 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm rounded-xl"
                      />
                    </div>

                    <div></div>
                    <div></div>
                    <div class="mt-4 flex space-x-4">
                      <button
                        @click="addDishToOrder"
                        class="w-60 py-2 bg-sky-500 text-white rounded-xl hover:bg-sky-600 focus:outline-none"
                      >
                        Add Order
                      </button>
                      <button
                        @click="createOrder"
                        class="w-60 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 focus:outline-none"
                      >
                        Create Order
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Orders Table -->
                <div
                  class="mt-8 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500"
                >
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                      <tr>
                        <th
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Dish Name
                        </th>
                        <th
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Price
                        </th>
                        <th
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Amount
                        </th>
                        <th
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Subtotal
                        </th>
                        <th
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr
                        v-for="(detail, index) in orderDetails"
                        :key="detail.id_dish"
                      >
                        <td
                          class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600"
                        >
                          {{ detail.dish_name }}
                        </td>
                        <td
                          class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                        >
                          ${{ detail.price }}
                        </td>
                        <td
                          class="text-left px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                        >
                          {{ detail.quantity }}
                        </td>
                        <td
                          class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                        >
                          ${{ detail.subtotal }}
                        </td>
                        <td
                          class="px-6 py-4 whitespace-nowrap text-sm font-medium"
                        >
                          <button
                            @click="removeDishFromOrder(index)"
                            class="text-red-600 hover:text-red-900"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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
import CustomerModal from "@/components/CreateCustomerModal.vue";

export default {
  name: "OrdersView",
  components: {
    Sidebar,
    Header,
    CustomerModal,
  },
  data() {
    return {
      sidebarOpen: true,
      showModal: false,
      order: {
        id_order: null,
        id_user: null,
        order_date: new Date().toISOString().slice(0, 19),
        customer_dui: null,
        id_table: null,
        status: 0,
        total: 0,
        payment_method: "cash",
        duiLocked: false,
      },
      alertMessage: "",
      alertClass: "",
      amount: 1,
      orders: [],
      users: [],
      customers: [],
      tables: [],
      categories: [],
      dishes: [],
      selectedCategory: null,
      orderDetails: [],
      selectedDish: null,
    };
  },
  computed: {
    formattedOrderDate() {
      return new Date(this.order.order_date).toISOString().slice(0, 19);
    },
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    // Dinamic alert
    showAlert(message, type = "error") {
      this.alertMessage = message;
      this.alertClass = type === "error" ? "bg-red-500" : "bg-emerald-500";

      setTimeout(() => {
        this.alertMessage = "";
        this.alertClass = "";
      }, 3000);
    },

    // Validations for amount
    preventDecimal(event) {
      if (event.key === "." || event.key === ",") {
        event.preventDefault();
      }
    },
    validateInteger() {
      this.order.amount = Math.max(1, Math.floor(this.order.amount));
    },

    // Function for add dish to detail_order
    addDishToOrder() {
      if (!this.selectedDish) return;

      if (this.amount <= 0 || !Number.isInteger(this.amount)) {
        this.showAlert(
          "It is impossible to add this dish as the quantity is not valid."
        );
        return;
      }

      const { id_dish, dish_name, price } = this.selectedDish;
      const subtotal = price * this.amount;

      const existingDish = this.orderDetails.find(
        (detail) => detail.id_dish === id_dish
      );
      if (existingDish) {
        this.showAlert(
          "This dish is already in the order. You cannot add it again."
        );
        return;
      }

      this.orderDetails.push({
        id_dish,
        dish_name,
        price,
        quantity: this.amount,
        subtotal,
      });

      this.order.total += subtotal;

      this.selectedDish = null;
      this.amount = 1;
    },

    removeDishFromOrder(index) {
      const removedItem = this.orderDetails.splice(index, 1)[0];
      this.order.total -= removedItem.subtotal;
    },

    async addCustomer(customerData) {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/customers/create",
          customerData
        );

        if (response.data.code === 201) {
          console.log("Customer created successfully:", response.data.customer);
          this.order.customer_dui = customerData.dui;
          this.duiLocked = true;
          this.showModal = false;
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          console.error("Validation failed:", error.response.data.errors);
        } else {
          console.error(
            "Error creating customer:",
            error.response?.data || error.message
          );
        }
      }
    },

    async fetchNextOrderId() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/orders/next-id"
        );
        this.order.id_order = response.data.next_order_id;
        console.log("Next order ID:", this.order.id_order);
      } catch (error) {
        console.error(
          "Error fetching next order ID:",
          error.response?.data || error.message
        );
      }
    },

    async validateCustomerDUI() {
      if (!this.order.customer_dui) {
        console.warn("Please enter a DUI to search");
        this.customerExists = null;
        return;
      }

      if (this.order.customer_dui.length !== 9) {
        console.warn("DUI must contain exactly 8 digits.");
        this.customerExists = null;
        return;
      }

      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/customers/search-dui",
          {
            dui: this.order.customer_dui,
          }
        );

        if (response.data.code === 200) {
          console.log("Customer DUI is valid:", response.data.message);
          this.customerExists = true;
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.warn("DUI not found. Please enter a valid DUI.");
          this.customerExists = false;
        } else {
          console.error(
            "Error validating customer DUI:",
            error.response?.data || error.message
          );
        }
      }
    },
    // function for validate DUI
    filterDUI() {
      this.order.customer_dui = (this.order.customer_dui || "").replace(
        /\D/g,
        ""
      );
      if (this.order.customer_dui.length > 8) {
        this.order.customer_dui = this.order.customer_dui.slice(0, 9);
      }
    },

    async fetchUsers() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/users");
        this.users = response.data.users;
      } catch (error) {
        console.error(
          "Error fetching users:",
          error.response?.data || error.message
        );
      }
    },

    async fetchCustomers() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/customers");
        this.customers = response.data.customers;
      } catch (error) {
        console.error(
          "Error fetching customers:",
          error.response?.data || error.message
        );
      }
    },

    async fetchCategories() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/categories"
        );
        console.log("Categories:", response.data.categories.data);
        if (Array.isArray(response.data.categories.data)) {
          this.categories = response.data.categories.data;
        } else {
          console.error(
            "Error: La respuesta de la API no contiene un array de categorías."
          );
        }
      } catch (error) {
        console.error(
          "Error fetching categories:",
          error.response?.data || error.message
        );
      }
    },

    async fetchDishesByCategory() {
      if (!this.selectedCategory) return;

      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/dishes/category/${this.selectedCategory}`
        );
        this.dishes = response.data.dishes;
      } catch (error) {
        console.error(
          "Error fetching dishes:",
          error.response?.data || error.message
        );
      }
    },

    async fetchAvailableTables() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/tables/available-tables"
        );
        console.log("Available tables:", response.data.tables.data);

        if (
          Array.isArray(response.data.tables.data) &&
          response.data.tables.data.length > 0
        ) {
          this.tables = response.data.tables.data;
          this.order.id_table = this.tables[0].id_table;
        } else {
          this.tables = [];
        }
      } catch (error) {
        console.error(
          "Error fetching available tables:",
          error.response?.data || error.message
        );
      }
    },

    async updateTableStatus(id, status) {
      try {
        await axios.post("http://127.0.0.1:8000/api/tables/update-status", {
          id_table: id,
          status: status,
        });
      } catch (error) {
        console.error(
          "Error updating table status:",
          error.response?.data || error.message
        );
        this.showAlert("Error updating table status.", "error");
      }
    },

    async createOrder() {
      if (
        !this.order.customer_dui ||
        !this.order.id_table ||
        !this.order.payment_method ||
        this.order.total <= 0 ||
        this.orderDetails.length === 0
      ) {
        this.showAlert("Please fill in all fields before creating the order.");
        return;
      }

      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/orders/create",
          this.order
        );
        const createdOrder = response.data.order;

        for (let detail of this.orderDetails) {
          await axios.post("http://127.0.0.1:8000/api/detail-orders/create", {
            id_dish: detail.id_dish,
            id_order: createdOrder.id_order,
            quantity: detail.quantity,
            subtotal: detail.subtotal,
          });
        }

        await this.updateTableStatus(this.order.id_table, "I");

        this.showAlert("Order created successfully.", "success");

        this.resetOrderForm();
      } catch (error) {
        console.error(
          "Error creating order:",
          error.response?.data || error.message
        );
        this.showAlert("Error creating order.", "error");
      }
    },

    resetOrderForm() {
      this.order = {
        id_order: null,
        id_user: null,
        order_date: new Date().toISOString().slice(0, 19),
        customer_dui: null,
        id_table: null,
        status: 0,
        total: 0,
        payment_method: "cash",
        duiLocked: false,
      };
      this.orderDetails = [];
      this.selectedDish = null;
      this.amount = 1;
    },
  },
  watch: {
    "order.customer_dui": function () {
      this.filterDUI();
      this.validateCustomerDUI();
    },
    selectedCategory() {
      this.fetchDishesByCategory();
    },
  },

  mounted() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.order.id_user = user.id_user;
      this.userData = user;
    }

    this.fetchAvailableTables();
    this.fetchNextOrderId();
    this.fetchCategories();
  },
};
</script>
