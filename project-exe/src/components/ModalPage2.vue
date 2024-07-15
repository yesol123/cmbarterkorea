<template>
  <div class="card flex justify-center">
    <Button label="모달창관리" @click="openModal" />
    <Dialog v-model:visible="visible" modal header="인증완료" :style="{ width: '23rem' }">
      <span class="text-surface-500 dark:text-surface-400 block mb-8">본인인증 완료되었습니다.</span>
      <template #footer>
        <Button label="확인" outlined severity="secondary" @click="handleConfirm" autofocus />
      </template>
    </Dialog>
  </div>
</template>

<script>
import router from '@/router/index.js';

export default {
  data(){
    return {
      visible: false,
    };
  },
  methods: {
    openModal(){
      this.visible = true;
    },
    handleConfirm(){
      this.visible = false;
      router.push({ path: '/joinform' });
    }
  },
}
</script>