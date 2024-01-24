<template>
  <h3>Report</h3>
  <div ref="chartDom" style="width: 100%; height: 400px;"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';


const props = defineProps({
  expensesArray: {
    type:Array,
  },
});


const chartDom = ref(null);

const option = {
  title: {
    text: 'Expense By Cateogries',
    left: 'left'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'right'
  },
  series: [
    {
      name: 'Your Expense',
      type: 'pie',
      radius: '50%',
      data: props.expensesArray,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};

onMounted(() => {
  const myChart = echarts.init(chartDom.value);
  myChart.setOption(option);
});

// const refreshChart = () => {
//   const myChart = echarts.init(chartDom.value);
// console.log(props.expensesArray);
//     myChart.clear();
//     myChart.setOption(option);
// }

</script>

