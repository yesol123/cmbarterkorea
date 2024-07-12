<template>

  <div @click="clickMe()">
    {{ counter }}
  </div>

  <!-- <div class="card flex justify-center">
    <Button label="PrimeVue" @click="visible = true" />
    <Dialog v-model:visible="visible" modal header="인증완료" :style="{ width: '25rem' }"> -->
      <!-- <template #header>
        <div class="inline-flex items-center justify-center gap-2">
          <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
          <span class="font-bold whitespace-nowrap">Amy Elsner</span>
        </div>
      </template> -->
      <!-- <span class="text-surface-500 dark:text-surface-400 block mb-8">본인인증 완료되었습니다.</span> -->
      <!-- <template #footer> -->
        <!-- <Button label="Cancel" text severity="secondary" @click="visible = false" autofocus /> -->
        <!-- <Button label="확인" outlined severity="secondary" @click="visible = false" autofocus />
      </template>
    </Dialog>
  </div> -->


  <button @click="showAlert">SweetAlert</button>


  <!-- <div class="card flex justify-center">
        <InputText type="text" v-model="value" />
  </div> -->

  <div class="card flex justify-center">
    <div class="flex flex-col gap-2">
      <label for="username">내용을 적어주세요.</label><br>
      <InputText id="username" v-model="value" aria-describedby="username-help" /><br>
      <small id="username-help" v-if="value == '123'" style="color: red;">내용을 다시 적어주세요.</small>
    </div>
  </div>

  <ModalDialog ref="modalDialog"/>

</template>
  
<script setup>
import { ref } from "vue";

// const visible = ref(false);
const value = ref(null);
</script>

<script>
import ModalDialog from '@/components/ModalPage.vue';

export default {
  components : {
    ModalDialog
  },
  data() {
    return {
      counter : 0,
      value : '',
      showit : false
    }
  },
  mounted() {

  },
  methods : {
    clickMe() {
      this.counter++;
      // if(this.counter == 5) {
      //   this.showit = true;
      // }
    },
    showAlert() {
      this.$swal('본인인증 완료되었습니다.');
    },
    // visible() {
    //   this.visible.value = true;
    // }
  },
  watch: {
    counter(ss) {
      if(ss === 5) {
        this.aaa();
      }
    }
  }
}
</script>

<style scoped>

div {
  margin: 20px 0;
}

</style>