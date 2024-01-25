<template>
  <div ref="chartDom" style="width: 100%; height: 400px;"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const chartDom = ref(null);

const props = defineProps({
  transactionsArray: {
    type: Array,
    required: true,
  }
})

const grid = {
  left: 0,
  right: 0,
  top: 50,
  bottom: 50
};

const series = props.transactionsArray.reduce((acc, expense) => {
  let seriesItem = acc.find(item => item.name === expense.category);
  if (!seriesItem) {
    seriesItem = {
      name: expense.category,
      type: 'bar',
      stack: 'total',
      barWidth: '50%',
      label: {
        show: true,
        formatter: (params) => Math.abs(params.value)
      },
      data: []
    };
    acc.push(seriesItem);
  }
  seriesItem.data.push(Math.abs(expense.amount));
  return acc;
}, []);

const option = {
  legend: {
    selectedMode: false
  },
  grid,
  yAxis: {
    type: 'value'
  },
  xAxis: {
    type: 'category',
    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  series
};

onMounted(() => {
  const myChart = echarts.init(chartDom.value);
  myChart.setOption(option);
});
</script>