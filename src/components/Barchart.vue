<template>
  <div ref="chartDom" style="width: 100%; height: 400px;"></div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import * as echarts from 'echarts';

const chartDom = ref(null);
let myChart = null;

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

const getOption = (transactionsArray) => {
  const series = transactionsArray.reduce((acc, expense) => {
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

  return {
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
};

onMounted(() => {
  myChart = echarts.init(chartDom.value);
  if (props.transactionsArray) {
    const option = getOption(props.transactionsArray);
    myChart.setOption(option);
  }
});

watchEffect(() => {
    const option = getOption(props.transactionsArray);
    if (myChart) {
    myChart.setOption(option);
  }
});
</script>