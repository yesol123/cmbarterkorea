<template>
  <div class="card flex justify-center">
    <Button label="Show" @click="visible = true" style="width: 50px; height: 50px;" />
    <Dialog v-model:visible="visible" modal header="Edit Profile" :style="{ width: '25rem' }">
      <span class="text-surface-500 dark:text-surface-400 block mb-8">Update your information.</span>
      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
        <Button type="button" label="Save" @click="visible = false"></Button>
      </div>
    </Dialog>
  </div>
</template>
  
<script setup>
import { ref } from "vue";
import Dialog from 'primevue/dialog';

const visible = ref(false);
// import { useCounterStore } from "@/store/counter.js";
  
  // 여기가 pinia로 저장된 상태 가져오는 코드!
  // const store = useCounterStore();
</script>