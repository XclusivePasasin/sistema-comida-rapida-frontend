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
        <div class="p-10">
         

          <!-- Wrapper for Dashboard Metrics -->
          <div class="bg-white shadow-sm rounded-lg overflow-hidden p-6">
            <h1 class="text-2xl font-semibold mb-4">Dashboard</h1>
            <div class="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div class="bg-gray-700 text-white shadow-lg rounded-lg p-6">
                <h2 class="text-lg font-semibold">Total Sales Today</h2>
                <p class="text-xl font-bold">${{ metrics.total_sales_today }}</p>
              </div>

              <div class="bg-gray-700 text-white shadow-lg rounded-lg p-6">
                <h2 class="text-lg font-semibold">Total Sales Month</h2>
                <p class="text-xl font-bold">${{ metrics.total_sales_month }}</p>
              </div>

              <div class="bg-cyan-600 text-white shadow-lg rounded-lg p-6">
                <h2 class="text-lg font-semibold">Completed Orders</h2>
                <p class="text-xl font-bold">{{ metrics.completed_orders }}</p>
              </div>

              <div class="bg-rose-600 text-white shadow-lg rounded-lg p-6">
                <h2 class="text-lg font-semibold">Pending Orders</h2>
                <p class="text-xl font-bold">{{ metrics.pending_orders }}</p>
              </div>
            </div>
          </div>
          <!-- Top 5 Best Selling Dishes Chart -->
        <div class="mt-10 bg-white shadow-lg rounded-lg p-6">
          <h2 class="text-xl font-semibold mb-4">
            Top 5 Best Selling Dishes
          </h2>
          <LineChart
            :chartData="topSellingDishesData"
            :chartOptions="chartOptions"
          />
        </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/SidebarComponent.vue";
import Header from "@/components/HeaderComponent.vue";
import LineChart from "@/components/LineChart.vue";
import axios from "axios";

export default {
  name: "DashboardView",
  components: {
    Sidebar,
    Header,
    LineChart,
  },
  data() {
    return {
      sidebarOpen: true,
      metrics: {
        total_sales_today: 0,
        total_sales_month: 0,
        completed_orders: 0,
        pending_orders: 0,
        top_selling_dishes: [],
      },
      topSellingDishesData: {
        labels: [], 
        datasets: [
          {
            label: "Units Sold",
            borderColor: "#334155",
            data: [],
            fill: false, 
            tension: 0.1, 
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    async fetchMetrics() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/dashboard/metrics"
        );
        if (response.data.code === 200) {
          this.metrics = response.data.data;
          console.log("Metrics fetched:", this.metrics);
          this.updateChartData();
        }
      } catch (error) {
        console.error("Error fetching dashboard metrics:", error);
      }
    },
    updateChartData() {
      if (
        this.metrics.top_selling_dishes &&
        this.metrics.top_selling_dishes.length > 0
      ) {
        this.topSellingDishesData.labels = this.metrics.top_selling_dishes.map(
          (dish) => dish.dish_name
        );
        this.topSellingDishesData.datasets[0].data =
          this.metrics.top_selling_dishes.map((dish) => dish.quantity_sold);
      } else {
        this.topSellingDishesData.labels = [];
        this.topSellingDishesData.datasets[0].data = [];
      }
    },
  },
  
  created() {
      this.fetchMetrics();
  },
};
</script>
