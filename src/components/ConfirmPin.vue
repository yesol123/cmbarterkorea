<template>
  <div class="confirm-pin-overlay">
    <div class="confirm-pin-container">
      <header class="confirm_pin_header_title">
        <RouterLink to="/couponGift">
          <img src="@/assets/icon_arrow_left.svg" alt="Back" />
        </RouterLink>
        <h3>PIN 번호 확인</h3>
        <RouterLink to="/couponGift">
          <img src="@/assets/icon_close.svg" alt="Close" />
        </RouterLink>
      </header>


      <section class="confirm_pin_section">
        <div>
          <form class="form_area" action="#">
            <ul>
              <li>PIN 번호 입력</li>
              <li>PIN 번호를 입력해주세요.</li>
            </ul>

            <div class="pinnumber">
              <input v-for="(pin, index) in pinnums" :key="index" type="password" v-model="pinnums[index]"
                :class="{ active: pinnums[index] !== '' }" />
            </div>
          </form>
        </div>

        <div class="number_button_area">
          <ul class="pins">
            <li v-for="number in numbers" :key="number" @click="InsertPin(number)">
              {{ number }}
            </li>
            <li @click="ResetPin()">
              <img src="@/assets/icon_menu_change_on.svg" alt="Reset" />
            </li>
            <li @click="InsertPin(0)">0</li>
            <li @click="DeletePin()">
              <img src="@/assets/icon_clear.svg" alt="Delete" />
            </li>
          </ul>
        </div>
      </section>
    </div>


    <!-- PIN이 성공적으로 확인되었을 때 모달 표시 -->
    <div v-if="showModal" class="modal">
      <p class="caution">
        <img src="@/assets/accept.png" alt="" />
      </p>
      <p>{{ sendType === 'coupon'
        ? '쿠폰을 선물하였습니다.'
        : sendType === 'cm'
          ? 'CM을 선물하였습니다.'
          : '충전을 계속 진행해주세요.' }}</p>
      <button @click="closeModal">확인</button>
    </div>
  </div>


  <!-- PIN번호 틀렸을 때 모달 표시 -->
  <div v-if="showModal2" class="modal">
    <p class="caution">
      <img src="@/assets/accept.png" alt="" />
    </p>
    <p>핀번호가 일치하지 않습니다.</p>
    <button @click="closeModal2">확인</button>
  </div>


</template>


<script setup>
import { ref, defineEmits, defineProps } from 'vue';
import { useResponseStore } from '@/store/response';
import { useRouter } from 'vue-router';

const router = useRouter();


const emit = defineEmits(['pinSuccess']);
const props = defineProps({
  sendType: { // 부모로부터 전달받은 sendType
    type: String,
    required: true
  }
});
const responseStore = useResponseStore();
const pinnums = ref(['', '', '', '', '', '']); // 6자리 PIN 번호 배열
const numbers = ref([1, 2, 3, 4, 5, 6, 7, 8, 9]); // 숫자 키패드 배열
const errorMessage = ref('');
const showModal = ref(false); // showModal을 ref로 선언
const showModal2 = ref(false);

// PIN 번호 입력 로직
const InsertPin = (number) => {
  const index = pinnums.value.findIndex((pin) => pin === ''); // 빈 칸 찾기
  if (index !== -1) {
    pinnums.value[index] = number;
  }
  if (!pinnums.value.includes('')) {
    submitPin(); // PIN 번호가 모두 입력되면 검증
  }
};

// PIN 번호 초기화
const ResetPin = () => {
  pinnums.value = ['', '', '', '', '', ''];
};

// 마지막 입력 삭제
const DeletePin = () => {
  const lastIndex = pinnums.value.lastIndexOf('');
  if (lastIndex > 0) {
    pinnums.value[lastIndex - 1] = '';
  } else {
    pinnums.value[pinnums.value.length - 1] = '';
  }
};

// PIN 제출 로직
const submitPin = async () => {
  console.log('submitPin 호출됨');

  // PIN 입력값을 저장
  responseStore.inputPin = pinnums.value.join('');

  // PIN 검증 함수 호출 및 결과 처리
  const isValid = await responseStore.verifyPin(); // 결과 대기
  console.log('isValid', isValid);


  if (isValid) {
    console.log('핀번호 유효, 선물하기 작업 진행');

    // sendType에 따라 각기 다른 로직 처리
    if (props.sendType === 'coupon') {
      handleCouponGift();
    } else if (props.sendType === 'cm') {
      handleCMGift();
    } else {
      handleCharge();
    }

    //모달 띄우기
    showModal.value = true;


  } else {
    console.log('핀번호 유효하지 않음');
    errorMessage.value = 'PIN 번호가 일치하지 않습니다.';
    ResetPin(); // 입력 초기화
    showModal2.value = true
  }
};

const closeModal = () => {
  showModal.value = false;
  emit('pinSuccess'); // 부모 컴포넌트로 이벤트 전달
  router.push('/main'); // 페이지 이동
}


const closeModal2 = () => {
  showModal2.value = false;

}


// 각 상황별 로직 처리 함수
const handleCouponGift = () => {
  console.log('쿠폰을 선물합니다.');
  // 쿠폰 선물 로직 추가
};

const handleCMGift = () => {
  console.log('CM을 선물합니다.');
  // CM 선물 로직 추가
};

const handleCharge = () => {
  console.log('충전을 진행합니다.');
  // 충전 로직 추가
};



</script>


<style scoped>
.confirm-pin-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}



.confirm-pin-container {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  height: 100vh;
  text-align: center;
}

.confirm_pin_section {
  position: relative;
  margin-top: 100px;
}

.form_area {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.form_area>ul {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  list-style: none;
  padding: 0;
}

.form_area>ul>li:nth-child(1) {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 14px;

}

.form_area>ul>li:nth-child(2) {
  font-size: 14px;
  font-weight: 400;
}


.number_button_area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.pinnumber {
  width: 20%;
  display: flex;
  justify-content: center;
  gap: 5px;
}


.pinnumber>input {
  width: 50px;
  height: 50px;
  border: 1px solid #F2F2F2;
  /* 테두리 파란색 */
  background-color: #F2F2F2;
  /* 입력할 때 배경 파란색 */
  color: white;
  /* 텍스트 색상을 흰색으로 */
  font-size: 24px;
  /* 글자 크기 */
  text-align: center;
  border-radius: 5px;
}


.pinnumber input.active {
  background-color: #1749C2;
  /* 파란색 배경 */
  color: white;
  /* 흰색 텍스트 */
}


/* Chrome, Safari, Edge, Opera */
.pinnumber>input::-webkit-outer-spin-button,
.pinnumber>input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
.pinnumber>input[type=number] {
  -moz-appearance: textfield;
}

.pins {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0;
  margin: 80px auto;
  position: fixed;
  bottom: 10px;
  border-top: 1px solid #F2F2F2;
}

.pins>li {
  width: 33%;
  text-align: center;
  padding: 20px 40px;
  font-size: 20px;
  font-weight: 500;
  color: #000;
}


.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  position: fixed;
  /* 고정 위치 */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -70%);
  /* 화면의 중앙에 위치 */
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  width: 400px;
  max-width: 90%;
  padding: 30px 20px;
  text-align: center;
  box-sizing: border-box;
}

.modal p {
  color: #000;
}

.caution {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.caution img {
  width: 15%;
}

.modal button {
  margin: 10px;
  padding: 10px 20px;
  background-color: #4BAE4F;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}




@media (prefers-color-scheme: dark) {


  .confirm-pin-container {
    color: #eee;
    background: rgba(22, 21, 27, 1);
  }


  .pins li {
    color: #eee;
  }
  .pins li > img{
    filter: brightness(0) invert(1); /* 흰색처럼 보이도록 설정 */
  }
}
</style>