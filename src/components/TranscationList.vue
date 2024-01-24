<template>
  <h3>History</h3>
  <div class="date-picker-wrapper">
    <div>
      <label for="start-date">From</label>
      <label for="end-date">To</label>
    </div>
    <div>
      <input class="date-picker-input" id="start-date" type="date" v-model="startDate">
      <input class="date-picker-input" id="end-date" type="date" v-model="endDate">
    </div>
  </div>
  <div class="list-wrapper">
    <ul id="list" class="list">
      <li v-for="(transaction, index) in filteredTransactions" :key="transaction.id" :class="transaction.amount < 0 ? 'minus' : 'plus'" v-show="index < 3 || showMore">
        <div>
          <span class="transaction-text">{{ transaction.text }}</span>
          <span v-if="transaction.category != ''" class="tags">{{ transaction.category }}</span>
        </div>
        <span>{{ transaction.amount }} $</span>
        <button @click="deleteTransaction(transaction.id)" class="delete-btn">x</button>
      </li> 
    </ul>
    <a v-if="filteredTransactions.length > 3" @click="showMore = !showMore">{{ showMore ? 'Show Less' : 'Show More' }}</a>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const showMore = ref(false);

//Format date for the Date Picker
const formatDate = (date) => {
  return date.toLocaleDateString('en-GB', {year: 'numeric', month: '2-digit', day: '2-digit'}).split('/').reverse().join('-');
}
const todayDate = new Date();
const startDate = ref(formatDate(todayDate));
const tomorrowDate = new Date(todayDate.getTime() + 24 * 60 * 60 * 1000);
const endDate = ref(formatDate(tomorrowDate));


const props = defineProps({
  transactions:{
    type:Array,
    required:true
  }
});

const reversedTransactions = computed(() => [...props.transactions].reverse());

const filteredTransactions = computed(() => {
  if (startDate.value && endDate.value) {
    const start = new Date(startDate.value);
    const end = new Date(endDate.value);
    return reversedTransactions.value.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= start && transactionDate <= end;
    });
  } else {
    return reversedTransactions.value;
  }
});

const emit = defineEmits(['transactionDeleted']);
const deleteTransaction = (id) => {
  emit('transactionDeleted', id)
}
</script>
