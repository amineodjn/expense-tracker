<template>
  <h3>History</h3>
  <div class="list-wrapper">
      <ul id="list" class="list">
        <li v-for="(transaction, index) in transactions" :key="transaction.id" :class="transaction.amount < 0 ? 'minus' : 'plus'" v-show="index < 3 || showMore">
          <div>
            <span class="transaction-text">{{ transaction.text }}</span>
            <span v-if="transaction.category != ''" class="tags">{{ transaction.category }}</span>
          </div>
          <span>{{ transaction.amount }}</span><button @click="deleteTransaction(transaction.id)" class="delete-btn">x</button>
        </li> 
      </ul>
    <a @click="showMore = !showMore">{{ showMore ? 'Show Less' : 'Show More' }}</a>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const showMore = ref(false);

const props = defineProps({
  transactions:{
    type:Array,
    required:true
  }
});

const emit = defineEmits(['transactionDeleted']);

const deleteTransaction = (id) => {
  emit('transactionDeleted', id)
}

</script>

