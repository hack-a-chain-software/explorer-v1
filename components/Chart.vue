<script setup lang="ts">
import { format } from 'date-fns'
import { Line } from 'vue-chartjs'

const props = defineProps<{
  prices: [number[]]
}>()
const chartData = ref({
  labels: props.prices.map(([label]) => {
    return format(label, 'MMM dd')
  }),
  datasets: [{
    data: props.prices.map(([_, value]) => {
      return value
    }),
    fill: true,
    borderColor: '#00F5AB',
    backgroundColor: '#00F5AB',
    borderWidth: 2,
    tension: 0.4,
    pointRadius: 0,
    hoverRadius: 5,
    hoverOffset: 4,
    gradient: {
      backgroundColor: {
        axis: 'y',
        colors: {
          0: 'rgba(0, 245, 171, 0.01)',
          100: 'rgba(0, 245, 171, 0.2)'
        }
      },
    }
  }]
})
const chartOptions = ref({
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      mode: 'index',
      intersect: false,
      backgroundColor: '#292B2C',
      titleColor: '#fff',
      bodyColor: '#fff',
      borderColor: '#525454',
      borderWidth: 1,
      cornerRadius: 4,
      displayColors: false,
      callbacks: {
        label: function(context: any) {
          let label = context.dataset.label || '';

          if (label) {
            label += ': ';
          }
          if (context.parsed.y !== null) {
            label += context.parsed.y.toFixed(2);
          }

          return `$${label}`;
        }
      }
    }
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        maxTicksLimit: 5,
        color: '#939393',
        background: '#fff',
        font: {
          size: 12,
          family: 'Inter',
        },
      }
    },

    y: {
      grid: {
        display: false
      },
      ticks: {
        color: '#939393',
        maxTicksLimit: 5,
        font: {
          size: 12,
          family: 'Inter',
        },
      }
    }
  }
}) as any
</script>

<template>
  <div
    class="w-full h-full cursor-pointer"
  >
    <Line
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>
