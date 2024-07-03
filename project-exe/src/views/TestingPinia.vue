<template>
    <div>
      <h2>Store</h2>
      <!-- store의 state -->
      <p>counter: {{ store.counter }}</p>
      <!-- store의 getter -->
      <p>doubleCount: {{ store.doubleCount }}</p>
      <!-- store의 actions -->
      <button @click="store.increment">Click!!</button>
    </div>
  </template>
  
<script setup>
import { useCounterStore } from "@/stores/counter.js";
  
  // 여기가 pinia로 저장된 상태 가져오는 코드!
  const store = useCounterStore();
</script>