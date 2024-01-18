<template>
  <h3>Add new transaction</h3>
  <form id="form" @submit.prevent="onSubmit">
    <div class="form-control">
      <label for="category">Category</label><br />
      <select class="form-selectBox" id="category" v-model="category"  @change="handleCategoryChange">
        <option value="Housing">Housing</option>
        <option value="Transportation">Transportation</option>
        <option value="Taxes">Taxes</option>
        <option value="Food">Food</option>
        <option value="Child Expenses">Child Expenses</option>
        <option value="Health Care">Health Care</option>
        <option value="Insurance">Insurance</option>
        <option value="Utilities">Utilities</option>
        <option value="Custom" >Add a new category</option>
      </select>
      <input v-if="customSelected" type="text" id="Custom" v-model="category" placeholder="Enter custom category..." />
    </div>
    <div class="form-control">
      <label for="text">Expense</label>
      <input type="text" id="text" v-model="text" placeholder="Enter Expense" />
    </div>
    <div class="form-control">
      <label for="amount">Amount</label>
      <input type="text" id="amount" v-model="amount" placeholder="Enter amount...eg (-10, 15)" />
    </div> 
    <button class="btn">Add transaction</button>
  </form>
</template>
<script setup>
import { ref } from 'vue'
import {useToast} from 'vue-toastification'

const text = ref('');
const amount = ref('');
const category = ref('');
const customSelected = ref(false);


// Change category
const handleCategoryChange = () => {
  if (category.value === 'Custom') {
    customSelected.value = true;
  } else {
    customSelected.value = false;
  }
}

//Submit transaction
const toast=useToast();
const emit = defineEmits(['TransactionSubmitted'])
const onSubmit = () => {
if(!text.value || !amount.value) {
  toast.error('Both fields must be filled');
  return;
}
else if (isNaN(Number(amount.value))) {
  toast.error('Enter a valid amount');
  return;
}

const transactionData = {
  text: text.value,
  amount: parseFloat(amount.value),
  category: category.value,
}

emit('TransactionSubmitted', transactionData);

text.value = '';
amount.value = '';
category.value = '';
customSelected.value = false;
}
</script>
