<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar Component -->
    <Sidebar :sidebarOpen="sidebarOpen" />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header Component -->
      <Header @toggleSidebar="toggleSidebar" />

      <!-- Alerta dinámica -->
      <div
        v-if="alertMessage"
        :class="alertClass"
        class="fixed top-4 right-5 max-w-xs w-auto p-3 rounded-lg text-white shadow-lg z-50 flex items-center space-x-2"
      >
        <span>{{ alertMessage }}</span>
        <button @click="closeAlert" class="ml-2 text-sm text-white font-bold">
          &times;
        </button>
      </div>

      <!-- Dynamic Content Area -->
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-8">
        <div
          class="max-w-full mx-auto min-h-[680px] bg-white rounded-lg shadow-sm p-6"
        >
          <div class="space-y-6">
            <!-- Date Selection and Button Container -->
            <div class="flex flex-col sm:flex-row gap-8">
              <!-- Datepicker for selecting report date -->
              <Datepicker
                v-model="reportDate"
                placeholder="Select Date"
                lang="en"
                format="yyyy-MM-dd"
                showClearButton="true"
                class="rounded-xl calendar-style"
              />
              <div class="flex items-end gap-3">
                <!-- Button to generate report -->
                <button
                  @click="generateReport"
                  class="flex px-6 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Generate Report
                </button>

                <!-- Clear button -->
                <button
                  @click="clearFields"
                  class="flex px-6 py-2 bg-gray-400 text-white rounded-xl hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                >
                  Clear
                </button>
              </div>
            </div>

            <!-- Results Area -->
            <div
              class="mt-6 border border-gray-200 rounded-lg p-4 min-h-[520px]"
            >
              <div class="space-y-4" v-if="reportUrl">
                <iframe
                  :src="reportUrl"
                  class="w-full h-[480px] rounded-lg shadow-sm border"
                  frameborder="0"
                ></iframe>
              </div>
              <div
                v-else
                class="flex items-center justify-center h-[450px] text-gray-400"
              >
                Select a date and generate the report
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/SidebarComponent.vue";
import Header from "@/components/HeaderComponent.vue";
import "vue-datepicker-ui/lib/vuedatepickerui.css";
import VueDatepickerUi from "vue-datepicker-ui";
import axios from "axios";

export default {
  name: "InvoiceView",
  components: {
    Sidebar,
    Header,
    Datepicker: VueDatepickerUi,
  },
  data() {
    return {
      sidebarOpen: true,
      reportDate: null,
      reportUrl: null,
      alertMessage: null,
      alertType: "success",
    };
  },
  computed: {
    alertClass() {
      return this.alertType === "success" ? "bg-emerald-500" : "bg-red-500";
    },
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    showAlert(message, type = "success") {
      this.alertMessage = message;
      this.alertType = type;
      setTimeout(() => {
        this.alertMessage = null;
      }, 5000);
    },
    closeAlert() {
      this.alertMessage = null;
    },
    async generateReport() {
      try {
        const formattedDate = this.reportDate
          ? this.reportDate.toISOString().split("T")[0]
          : null;

        if (!formattedDate) {
          this.showAlert("Please select a date.", "error");
          return;
        }

        console.log("Requesting report for date:", formattedDate);

        const response = await axios.post(
          "http://127.0.0.1:8000/api/report/daily-sales",
          {
            date: formattedDate,
          }
        );

        if (response.data.file_url) {
          this.reportUrl = response.data.file_url;
          this.showAlert(
            response.data.message || "Report generated successfully.",
            "success"
          );
        } else {
          this.showAlert(
            response.data.message || "Error generating report.",
            "error"
          );
        }
      } catch (error) {
        console.error(
          "Error generating report:",
          error.response ? error.response.data : error.message
        );
        this.showAlert(
          "An error occurred while generating the report.",
          "error"
        );
      }
    },
    clearFields() {
      this.reportDate = null;
      this.reportUrl = null;
      this.closeAlert();
    },
  },
};
</script>

<style scoped>
.calendar-style {
  --v-calendar-input-border: 60px;
}
</style>
