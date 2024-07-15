<template>
  <!-- <div class="card flex justify-center">
    <Button label="모달창관리" @click="visible = true" />
    <Dialog v-model:visible="visible" modal header="인증완료" :style="{ width: '23rem' }">
      <span class="text-surface-500 dark:text-surface-400 block mb-8">본인인증 완료되었습니다.</span>
      <template #footer>
        <Button label="확인" outlined severity="secondary" @click="visible = false" autofocus />
      </template>
    </Dialog>
  </div> -->

  <div class="card flex justify-center">
    <Button label="모달창관리" @click="openModal" />
    <Dialog v-model:visible="visible" modal header="인증실패" :style="{ width: '23rem' }">
      <span class="text-surface-500 dark:text-surface-400 block mb-8">이미 가입된 회원입니다.</span>
      <template #footer>
        <Button label="확인" outlined severity="secondary" @click="handleConfirm" autofocus />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
// import router from '@/router/index.js';

const visible = ref(false);

const openModal = () => {
  visible.value = true;
};

const handleConfirm = () => {
  visible.value = false;
  // router.push({ path: '/joinform' });
};
</script>

<style>
.p-dialog-header-actions {
  visibility: hidden;
}
</style>