<template>
  <div class="card flex justify-center">
    <Button label="모달창관리" @click="openModal()" />
    <Dialog v-model:visible="visible" modal :header="header" :style="{ width: '23rem' }">
      <span class="text-surface-500 dark:text-surface-400 block mb-8">{{ content }}</span>
      <template #footer>
        <Button v-show="this.mode == 'qrpay'" class="decline" label="취소" outlined severity="secondary" @click="Decline()" autofocus />
        <Button class="confirm" label="확인" outlined severity="secondary" @click="handleConfirm()" autofocus />
        <Button class="success" v-show="this.mode == 'success'" label="확인" outlined severity="secondary" @click="Success()" autofocus />
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
  mounted() {
    
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
      if(this.mode == 'notfound') {
        this.header = '아이디 찾기 실패';
        this.content = '가입되지 않은 연락처입니다.'
        this.visible = true;
      }
      if(this.mode == 'changepw') {
        this.header = '변경 완료';
        this.content = '비밀번호 변경을 성공하였습니다.'
        this.visible = true;
      }
      if(this.mode == 'loginfail') {
        this.header = '존재하지 않는 계정입니다.';
        this.visible = true;
      }
      if(this.mode == 'qrpay') {
        this.header = '결제확인';
        this.content = '결제하시겠습니까?'
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
      if(this.mode == 'notfound') {
        this.visible = false;
        this.$router.push({'path' : '/join'});
      }
      if(this.mode == 'changepw') {
        this.visible = false;
        this.$router.push({'path' : '/'});
      }
      if(this.mode == 'loginfail') {
        this.visible = false;
      }
      if(this.mode == 'qrpay') {
        this.header = '결제완료'
        this.content = '결제완료되었습니다'
        document.querySelector('.decline').style.display = 'none'
        document.querySelector('.confirm').style.display = 'none'
        document.querySelector('.success').style.display = 'block'

      }
    },
    Success() {
      alert('결제가 완료되었습니다');
      return false;
    },
    Decline() {
      alert('결제가 취소되었습니다');
      return false;
    }
  },
}
</script>

<style>
.p-dialog-header-actions {
  visibility: hidden;
}
</style>