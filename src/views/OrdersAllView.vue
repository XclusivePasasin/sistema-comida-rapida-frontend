<template>
  <div class="flex h-screen bg-gray-100">
    <Sidebar :sidebarOpen="sidebarOpen" />

    <div class="flex-1 flex flex-col overflow-hidden">
      <Header @toggleSidebar="toggleSidebar" />

      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div class="bg-gray-100 p-8">
          <div class="max-w-full mx-auto">
            <div class="bg-white shadow-sm rounded-lg overflow-hidden">
              <div class="p-6">
                <h2 class="text-xl font-semibold text-gray-700 mb-4">
                  Delivered Orders
                </h2>

                <div
                  class="overflow-y-auto max-h-[580px] scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-500"
                >
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50 sticky top-0">
                      <tr>
                        <th
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Order ID
                        </th>
                        <th
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Customer Name
                        </th>
                        <th
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Customer DUI
                        </th>
                        <th
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Table Name
                        </th>
                        <th
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Total
                        </th>
                        <th
                          class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Details
                        </th>
                        <th
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr v-if="orders.length === 0">
                        <td
                          colspan="7"
                          class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500"
                        >
                          No hay órdenes disponibles en estos momentos.
                        </td>
                      </tr>
                      <tr v-for="order in orders" :key="order.id_order">
                        <td
                          class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600"
                        >
                          {{ order.id_order }}
                        </td>
                        <td
                          class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                        >
                          {{ order.customer_name }}
                        </td>
                        <td
                          class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                        >
                          {{ order.customer_dui }}
                        </td>
                        <td
                          class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                        >
                          {{ order.table_name }}
                        </td>
                        <td
                          class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                        >
                          ${{ order.total.toFixed(2) }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm">
                          <span
                            :class="{
                              'bg-neutral-400': order.status === '0',
                              'bg-cyan-700': order.status === '1',
                              'bg-emerald-500': order.status === '2',
                            }"
                            class="px-2 py-1 text-xs inline-flex items-center justify-center w-full font-semibold text-white rounded-full"
                          >
                            {{
                              order.status === "0"
                                ? "Pending"
                                : order.status === "1"
                                ? "In Progress"
                                : "Completed"
                            }}
                          </span>
                        </td>
                        <td
                          class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                        >
                          <button
                            @click="viewOrderDetails(order)"
                            class="flex items-center bg-yellow-400 p-2 rounded-xl text-slate-50 hover:text-slate-50 space-x-1"
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
                              class="lucide lucide-file"
                            >
                              <path
                                d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"
                              />
                              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                            </svg>
                          </button>
                        </td>
                        <td
                          class="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-4"
                        >
                          <button
                            @click="generateInvoice(order)"
                            class="flex px-2 py-2 bg-red-500 text-white rounded-xl text-medium hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
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
                              class="lucide lucide-file-text"
                            >
                              <path
                                d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"
                              />
                              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                              <path d="M10 9H8" />
                              <path d="M16 13H8" />
                              <path d="M16 17H8" />
                            </svg>
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

        <!-- Modal for Order Details -->
        <div
          v-if="showModal"
          class="fixed inset-0 flex bg-gray-600 bg-opacity-75 items-center justify-center shadow-lg"
        >
          <div class="bg-white rounded-lg w-1/3 p-6 relative">
            <button
              @click="closeModal"
              class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h3 class="text-lg font-semibold mb-4">
              Order Details for Order #{{ selectedOrder?.id_order }}
            </h3>
            <table class="min-w-full divide-y divide-gray-200 mb-4">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Dish Name
                  </th>
                  <th
                    class="px-6 text-center py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Quantity
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr
                  v-for="detail in orderDetails"
                  :key="detail.id_order_detail"
                >
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600"
                  >
                    {{ detail.dish.dish_name }}
                  </td>
                  <td
                    class="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500"
                  >
                    {{ detail.quantity }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Confirmation Modal for Payment -->
        <div
          v-if="showConfirmModal"
          class="fixed inset-0 flex bg-gray-600 bg-opacity-75 items-center justify-center z-50"
        >
          <div class="bg-white rounded-lg w-1/3 p-6 relative">
            <button
              @click="closeConfirmModal"
              class="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <h3 class="text-lg font-semibold mb-4">Confirm Payment</h3>
            <form @submit.prevent="markOrderAsPaid">
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2"
                  >Total</label
                >
                <input
                  type="text"
                  v-model="orderToUpdate.total"
                  class="mt-1 block w-full px-3 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  disabled
                />
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2"
                  >Received</label
                >
                <input
                  type="number"
                  min="0"
                  v-model.number="received"
                  @input="validateAndCalculateChange"
                  step="0.01"
                  class="mt-1 block w-full px-3 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  :class="{ 'border-red-500': received < orderToUpdate.total }"
                  placeholder="Enter received amount"
                  required
                />
                <p
                  v-if="received < orderToUpdate.total"
                  class="text-red-500 text-xs mt-1"
                >
                  The received amount must be greater than or equal to the
                  total.
                </p>
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2"
                  >Change</label
                >
                <input
                  type="text"
                  v-model="change"
                  class="mt-1 block w-full px-3 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  disabled
                />
              </div>
              <div class="mt-4 flex justify-end space-x-2">
                <button
                  @click="closeConfirmModal"
                  type="button"
                  class="flex px-4 py-2 bg-gray-300 text-white rounded-xl text-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="flex px-4 py-2 bg-emerald-500 text-white rounded-xl text-medium hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  :disabled="received < orderToUpdate.total"
                >
                  Confirm
                </button>
              </div>
            </form>
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

export default {
  name: "DeliveredOrdersView",
  components: {
    Sidebar,
    Header,
  },
  data() {
    return {
      sidebarOpen: true,
      orders: [],
      showModal: false,
      showConfirmModal: false,
      selectedOrder: null,
      orderToUpdate: null,
      orderDetails: [],
      received: 0,
      change: 0,
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    closeModal() {
      this.showModal = false;
      this.selectedOrder = null;
      this.orderDetails = [];
    },
    async fetchDeliveredOrders() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/orders/status/3"
        );
        this.orders = response.data.orders;
        console.log(this.orders);
      } catch (error) {
        console.error(
          "Error fetching delivered orders:",
          error.response?.data || error.message
        );
      }
    },
    async viewOrderDetails(order) {
      this.selectedOrder = order;
      this.showModal = true;
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/orders/${order.id_order}/details`
        );
        this.orderDetails = response.data.order_details;
      } catch (error) {
        console.error(
          "Error fetching order details:",
          error.response?.data || error.message
        );
      }
    },
    //   viewOrderDetails(order) {
    //     // Implement your logic to view order details
    //   },
    //   generateInvoice(order) {
    //     // Implement your logic to generate invoice
    //   },
    confirmPayment(order) {
      this.orderToUpdate = order;
      this.received = 0;
      this.change = 0;
      this.showConfirmModal = true;
    },
    closeConfirmModal() {
      this.showConfirmModal = false;
      this.orderToUpdate = null;
    },
  },
  mounted() {
    this.fetchDeliveredOrders();
  },
};
</script>
