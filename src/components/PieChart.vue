<template>
  <h3>Report</h3>
  <div ref="chartDom" style="width: 100%; height: 400px;"></div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import * as echarts from 'echarts';

const props = defineProps({
  expensesArray: {
    type: Array,
  },
});

let chartDom = ref(null);
let myChart = null;

const getOption = (expensesArray) => ({
  title: {
    text: 'Expense By Cateogries',
    left: 'left'
  },
  tooltip: {
    trigger: 'item'
  },
  series: [
    {
      name: 'Your Expense',
      type: 'pie',
      radius: '50%',
      data: expensesArray,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
});

onMounted(() => {
  myChart = echarts.init(chartDom.value);
  if (props.expensesArray) {
    const option = getOption(props.expensesArray);
    myChart.setOption(option);
  }
});

watchEffect(() => {
  const option = getOption(props.expensesArray);

  if (myChart) {
    myChart.setOption(option);
  }
});
</script>