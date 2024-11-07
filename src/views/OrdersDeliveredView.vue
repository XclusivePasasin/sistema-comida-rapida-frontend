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
            <!-- Container for Delivered and Paid Orders Tables -->
            <div class="bg-white shadow-sm rounded-lg overflow-hidden">
              <div class="p-6">
                <!-- Delivered Orders Table -->
                <h2 class="text-xl font-semibold text-gray-700 mb-4">
                  Delivered Orders
                </h2>

                <!-- Table Section with Scroll -->
                <div
                  class="overflow-y-auto max-h-[240px] scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-500"
                >
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50 sticky top-0">
                      <tr>
                        <!-- Table Headers -->
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
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr v-if="orders.length === 0">
                        <td
                          colspan="6"
                          class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500"
                        >
                          There are no paid orders at this time.
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
                        <td
                          class="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-4"
                        >
                          <!-- Confirm Payment Button -->
                          <button
                            @click="confirmPayment(order)"
                            class="flex px-2 py-2 bg-emerald-500 text-white rounded-xl text-medium hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
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
                              class="lucide lucide-credit-card"
                            >
                              <rect width="20" height="14" x="2" y="5" rx="2" />
                              <line x1="2" x2="22" y1="10" y2="10" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <!-- Divider for separation -->
                <hr class="my-6 border-t border-gray-200" />

                <!-- Paid Orders Table -->
                <h2 class="text-xl font-semibold text-gray-700 mb-4">
                  Paid Orders
                </h2>

                <div
                  class="overflow-y-auto max-h-[240px] scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-500"
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
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr v-if="paidOrders.length === 0">
                        <td
                          colspan="5"
                          class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500"
                        >
                          There are no paid orders at this time.
                        </td>
                      </tr>
                      <tr v-for="order in paidOrders" :key="order.id_order">
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
                        <td
                          class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                        >
                          <!-- Confirm Payment Button -->
                          <button
                            @click="generateInvoice(order)"
                            class="flex px-2 py-2 bg-red-500 text-white rounded-xl text-medium hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
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

            <!-- Payment Form -->
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

              <!-- Action Buttons -->
              <div class="mt-4 flex justify-end space-x-2">
                <button
                  @click="closeConfirmModal"
                  type="button"
                  class="flex px-4 py-2 bg-gray-300 text-gray-700 rounded-xl text-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
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

        <!-- Modal for viewing invoice -->
        <div
          v-if="showInvoiceModal"
          class="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-75 z-50"
        >
          <div
            class="bg-white rounded-lg w-11/12 h-5/6 p-4 relative overflow-hidden"
          >
            <button
              @click="closeInvoiceModal"
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
            <h3 class="text-lg font-semibold mb-4">Factura</h3>
            <iframe
              :src="invoiceUrl"
              class="w-full h-full border-0 overflow-auto"
              style="height: calc(100% - 50px)"
            >
              frameborder="0" ></iframe
            >
            <div class="mt-4 flex justify-end">
              <button
                @click="downloadInvoice"
                class="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Descargar Factura
              </button>
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
      paidOrders: [],
      showModal: false,
      showConfirmModal: false,
      selectedOrder: null,
      orderToUpdate: null,
      showInvoiceModal: false,
      invoiceUrl: null,
      currentOrder: {},
      orderDetails: [],
      received: 0,
      change: 0,
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    async fetchDeliveredOrders() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/orders/status/1"
        );
        this.orders = response.data.orders;
        console.log("Delivered orders:", this.orders);
      } catch (error) {
        console.error(
          "Error fetching delivered orders:",
          error.response?.data || error.message
        );
      }
    },
    async generateInvoice(order) {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/orders/invoice/${order.id_order}`
        );

        this.invoiceUrl = response.data.file_url;
        this.showInvoiceModal = true;
      } catch (error) {
        console.error(
          "Error generating invoice:",
          error.response?.data || error.message
        );
        alert("Hubo un error al generar la factura.");
      }
    },
    closeInvoiceModal() {
      this.showInvoiceModal = false;
      URL.revokeObjectURL(this.invoiceUrl);
      this.invoiceUrl = null;
    },
    downloadInvoice() {
      const link = document.createElement("a");
      link.href = this.invoiceUrl;
      link.setAttribute(
        "download",
        `Factura_Order_${this.currentOrder.id_order}.pdf`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    async fetchPaidOrders() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/orders/status/2"
        );
        this.paidOrders = response.data.orders;
      } catch (error) {
        console.error(
          "Error fetching paid orders:",
          error.response?.data || error.message
        );
      }
    },
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
    validateAndCalculateChange() {
      const validInput = this.received.toString().replace(/[^0-9.]/g, "");

      const decimalIndex = validInput.indexOf(".");
      this.received =
        decimalIndex !== -1
          ? validInput.slice(0, decimalIndex + 1) +
            validInput.slice(decimalIndex + 1).replace(".", "")
          : validInput;

      this.received =
        parseFloat(this.received) >= 0 ? parseFloat(this.received) : 0;

      this.change =
        this.received >= this.orderToUpdate.total
          ? this.received - this.orderToUpdate.total
          : 0;
    },
    async markOrderAsPaid() {
      if (this.received < this.orderToUpdate.total) {
        alert("The received amount must be at least equal to the total.");
        return;
      }

      try {
        const orderResponse = await axios.put(
          `http://127.0.0.1:8000/api/orders/update/${this.orderToUpdate.id_order}`,
          {
            status: 2,
          }
        );
        console.log("Order status updated to paid:", this.orderToUpdate.id_table);
        console.log("Order Data:", orderResponse.data);

        // Verificar que el id_table esté disponible y luego actualizar el estado de la mesa
        if (this.orderToUpdate.id_table) {
          console.log(
            "Attempting to update table status for table ID:",
            this.orderToUpdate.id_table
          );

          const tableResponse = await axios.put(
            `http://127.0.0.1:8000/api/tables/update-status`,
            {
              id_table: this.orderToUpdate.id_table,
              status: "A", // Cambiar el estado a "A" (Disponible)
            }
          );

          console.log("Table status updated:", tableResponse.data);
        } else {
          console.warn(
            "No table ID found for this order. Skipping table update."
          );
        }

        // Actualizar las listas de pedidos y cerrar el modal
        this.fetchDeliveredOrders();
        this.fetchPaidOrders();
        this.closeConfirmModal();
      } catch (error) {
        console.error(
          "Error updating order status to paid:",
          error.response?.data || error.message
        );
        alert("Hubo un error al actualizar el estado del pedido o la mesa.");
      }
    },
  },
  mounted() {
    this.fetchDeliveredOrders();
    this.fetchPaidOrders();
  },
};
</script>
