<template>
  <Header />
  <div class="container">
    <Balance :TotalBalance="+TotalBalance" />
  </div>
  <IncomeExpenses :income="+income" :expenses="+expenses" />
  <TranscationList :transactions="transactions"  @transactionDeleted="handleTransactionDelete" />
  <AddTransaction   @TransactionSubmitted="handleTransactionSubmitted" />
  <PieChart v-if="transactionListAvailable" :expensesArray="expensesArray" />
  <BarChart v-if="transactionsArray.length > 0" :transactionsArray="transactionsArray"/>
</template>
<script setup>
import Header from './components/Header.vue'
import Balance from './components/Balance.vue'
import IncomeExpenses from './components/IncomeExpenses.vue'
import TranscationList from './components/TranscationList.vue'
import AddTransaction from './components/AddTransaction.vue'
import PieChart from './components/PieChart.vue'
import BarChart from './components/Barchart.vue'
import { ref, computed, onMounted } from 'vue'
import {useToast} from 'vue-toastification'

const toast=useToast();

const transactions = ref([]) 

onMounted(() => {
  const savedTransactions = JSON.parse(localStorage.getItem('transactions'));

  if (savedTransactions) {
    transactions.value = savedTransactions
  }
})

//Get Total Balance

const TotalBalance = computed(() => {
  return transactions.value.reduce((total, transaction) => {
    return total + transaction.amount
  }, 0).toFixed(2);
});

//Get Income 
const income = computed(()=> {
  return transactions.value.
  filter(transaction => transaction.amount > 0).
  reduce((total, transaction) => {
    return total + transaction.amount
  }, 0).toFixed(2);
})

//Get Expenses 
const expenses = computed(()=> {
  return transactions.value.
  filter(transaction => transaction.amount < 0).
  reduce((total, transaction) => {
    return total + transaction.amount
  }, 0).toFixed(2);
})

//Get Transactions

const handleTransactionSubmitted = (transactionData) => {
  transactions.value.push({
    id: generateUniqueId(),
    date: new Date(),
    text: transactionData.text,
    amount: transactionData.amount,
    category: transactionData.category,
  })
  saveToLocalStorage();
  toast.success('Transaction Added Successfully');
}

//Generate Unique ID 

const generateUniqueId = ( () => {
return Math.floor(Math.random() * 1000000000000)
})

// Delete Transaction

const handleTransactionDelete = (id) => {
  transactions.value= transactions.value.filter(transaction => transaction.id !== id)
  saveToLocalStorage();
  toast.success('Transaction Deleted Successfully');
}
 
//Save to Local Storage

const saveToLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions.value))
}

// Create DATA Array for PieChart 

const expensesArray = computed(() => {
  const expensesByCategory = transactions.value.reduce((acc, transaction) => {
    if (transaction.amount < 0 && transaction.category) {
      if (!acc[transaction.category]) {
        acc[transaction.category] = 0;
      }
      acc[transaction.category] += Math.abs(transaction.amount);
    }
    return acc;
  }, {});

  return Object.entries(expensesByCategory).map(([name, value]) => ({ name, value }));
});


const transactionListAvailable = computed(() => {
  return expensesArray.value.length > 0;
})

//Create DATA Array for BarChart 

const transactionsArray = computed(() => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const transactionsByMonthAndCategory = transactions.value
    .filter(transaction => transaction.amount < 0 && transaction.category)
    .map(transaction => {
      const date = new Date(transaction.date);
      const month = months[date.getMonth()]; // getMonth() returns a zero-based index, so we use it to get the month name from the months array
      return {
        month,
        category: transaction.category,
        amount: transaction.amount
      };
    });

  return transactionsByMonthAndCategory.reduce((acc, transaction) => {
    const existingTransaction = acc.find(t => t.category === transaction.category && t.month === transaction.month);

    if (existingTransaction) {
      existingTransaction.amount += transaction.amount;
    } else {
      acc.push({...transaction});
    }

    return acc;
  }, []);
});
</script>
