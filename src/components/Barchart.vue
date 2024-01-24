<template>
  <div ref="chartDom" style="width: 100%; height: 400px;"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const chartDom = ref(null);

const expenses = [
  { month: 'Jan', category: 'Groceries', amount: -200 },
  { month: 'Jan', category: 'Utilties', amount: -400 },
  { month: 'Jan', category: 'Transportation', amount: -300 },
  { month: 'Jan', category: 'Housing', amount: -300 },
  { month: 'Feb', category: 'Groceries', amount: -200 },
  { month: 'Feb', category: 'Utilties', amount: -400 },
  { month: 'Feb', category: 'Transportation', amount: -300 },
  { month: 'Feb', category: 'Housing', amount: -300 },
  // ...more data for each month and category
];

const grid = {
  left: 100,
  right: 100,
  top: 50,
  bottom: 50
};

const series = expenses.reduce((acc, expense) => {
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