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
    <Button label="모달창관리" @click="openModal()" />
    <Dialog v-model:visible="visible" modal :header="header" :style="{ width: '23rem' }">
      <span class="text-surface-500 dark:text-surface-400 block mb-8">{{ content }}</span>
      <template #footer>
        <Button label="확인" outlined severity="secondary" @click="handleConfirm" autofocus />
      </template>
    </Dialog>
  </div>
</template>

<!-- <script setup>
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
</script> -->

<script>

export default {
  data(){
    return {
      visible: false,
      header : '',
      content : '',
      mode : '',
    };
  },
  methods: {
    openModal(){
      // this.visible = true;

      // this.visible = true;
      // this.mode = false;
      // this.header = '인증완료'

      if(this.mode == 'pass') {
        this.header = '인증완료';
        this.content = '본인인증 완료되었습니다.'
        this.visible = true;
      }
      if(this.mode == 'fail') {
        this.header = '인증실패';
        this.content = '이미 가입된 회원입니다.'
        this.visible = true;
      }
    },
    handleConfirm(){
      // this.visible = false;
      if(this.mode == 'pass') {
        this.visible = false;
        this.$router.push({'path' : '/joinform'});
      }
      if(this.mode == 'fail') {
        this.visible = false;
        this.$router.push({'path' : '/'});
      }
    }
  },
}
</script>


<style>
.p-dialog-header-actions {
  visibility: hidden;
}
</style>