<template>
    <div class="card flex justify-center">
      <Button label="모달창관리" @click="openModal()" />
      <Dialog v-model:visible="visible" modal :header="header" :style="{ width: '20rem' }">
        <span class="text-surface-500 dark:text-surface-400 block mb-8">{{ content }}</span>
        <template #footer>
          <Button class="decline" label="취소" outlined severity="secondary" @click="Decline()" autofocus />
          <Button class="confirm" style="background-color: #1bce0b; color: #fff;" label="확인" outlined severity="secondary" @click="Confirm()" autofocus />
        </template>
      </Dialog>
    </div>
</template>

<script>
export default {
    data(){
        return {
        visible: true,
        header : '',
        content : '',
        mode : '',
        };
    },
    mounted() {
        
    },
    methods : {
        openModal() {
            if(this.mode == 'confirm') {
                this.content = '쿠폰을 받으시겠습니까?';
                this.visible = true;
            }
        }
    }
}

</script>

<style>
.p-dialog-header-actions {
  visibility: hidden;
}
</style>