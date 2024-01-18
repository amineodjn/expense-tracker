<template>
   <h4>Your Balance</h4>
   <h1 id="balance" :class="TotalBalance < 0 ? 'h1 minus' : 'h1'">${{TotalBalance}}</h1>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  TotalBalance: {
    type: Number,
    required: true,  
  }
})
</script>