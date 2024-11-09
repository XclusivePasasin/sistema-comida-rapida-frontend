<template>
    <div style="position: relative; height: 300px;">
      <Line v-if="chartData && chartData.datasets && chartData.datasets[0].data.length > 0" :data="chartData" :options="chartOptions" />
      <p v-else>No hay datos para mostrar</p>
    </div>
  </template>
  
  <script>
  import { Line } from "vue-chartjs";
  import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";
  
  ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);
  
  export default {
    name: "LineChart",
    components: { Line },
    props: {
      chartData: {
        type: Object,
        required: true,
      },
      chartOptions: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  