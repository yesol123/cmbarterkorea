<template>
  <div class="card flex justify-center">
    <Button label="모달창관리" @click="openModal()" />
    <Dialog v-model:visible="visible" modal :header="header" :style="{ width: '23rem' }">
      <span class="text-surface-500 dark:text-surface-400 block mb-8">{{ content }}</span>
      <template #footer>
        <Button label="확인" outlined severity="secondary" @click="handleConfirm()" autofocus />
      </template>
    </Dialog>
  </div>
</template>

<script>
// import router from '@/router/index.js';

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
    // 모달창 열기
    openModal(){
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
    // 모달창 닫기
    handleConfirm(){
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