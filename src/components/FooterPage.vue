<template>
  <!-- <footer>
        <p>푸터영역입니다.</p>
    </footer> -->

  <!-- 하단 네브바 -->
  <!-- <nav class="navbar bg-dark border-bottom border-body fixed-bottom" data-bs-theme="dark" style="justify-content: center; opacity: 0.9;">
      <div class="row" style="width: 100%;">
        <div class="col-3">
          <a class="navbar-brand" href="#" style="display: grid; place-items: center; justify-content: center;">
            <i class="bi bi-house custom_font_size1_5" style="color: orange;"></i>
            <span class="badge bg-dark" style="font-size: 0.8rem; color: orange">홈</span>
          </a>
        </div>
        <div class="col-3" @click="$router.push('/login')">
          <a class="navbar-brand" href="#" style="display: grid; place-items: center; justify-content: center;">
            <i class="bi bi-gift custom_font_size1_5"></i>
            <span class="badge bg-dark" style="font-size: 0.8rem;">선물</span>
          </a>
        </div>
        <div class="col-3" >
          <a class="navbar-brand" href="#" style="display: grid; place-items: center; justify-content: center;">
            <i class="bi bi-pin-map custom_font_size1_5"></i>
            <span class="badge bg-dark" style="font-size: 0.8rem;">가맹점 찾기</span>
          </a>
        </div>
        <div class="col-3" >
          <a class="navbar-brand" href="#" style="display: grid; place-items: center; justify-content: center;">
            <i class="bi bi-card-list custom_font_size1_5"></i>
            <span class="badge bg-dark" style="font-size: 0.8rem;">거래 내역</span>
          </a>
        </div>
      </div>
    </nav> -->

  <div class="footer">
    <div class="btn_group">
      <div style="text-align: center;">
        <img  @click="goHome()" src="@/assets/home.png">
        <p style="font-size: 0.7rem; text-align: center;">홈</p>
      </div>
      <div style="text-align: center; margin-left: 15px;">
        <img  :style="subAccountStlye" @click="goGift()" src="@/assets/gift.png">
        <p style="font-size: 0.7rem; text-align: center;">선물</p>
      </div>
      <div style="text-align: center; margin-left: 10px;">
        <img @click="FindShop()" src="@/assets/search.png">
        <p style="font-size: 0.7rem; text-align: center;">가맹점찾기</p>
      </div>
      <div style="text-align: center;">
        <img @click="goMypage()" src="@/assets/my.png">
        <p style="font-size: 0.7rem;">나의 CM</p>
      </div>
    </div>
  </div>

</template>

<script>
import router from '@/router/index.js';
import { useResponseStore } from '@/store/response.js'

export default {
  data() {
    return {
      member: '',
    }
  },
  mounted() {
    let store = useResponseStore();
    this.member = store.member;
  },
  computed:{
    subAccountStlye() {
            return this.member === '6'
                ? { pointerEvents: 'none', opacity: '0.5' } // 클릭 비활성화 + 시각적 효과
                : {}; // 기본 스타일 유지
        }
  },
  methods: {
    goHome() {
      this.$router.push( {path:'/main' })
    },
    goMypage() {
      router.push('/MyPage/' + this.member)
    },
    goGift() {
      router.push('/gift/' + this.member)
    },
    FindShop() {
      this.$router.push({ path: '/findshop' });
    }
    // test
    // to() {
    //   this.$router.push({path : '/qrtest'})
    // }
  }
}
</script>

<style scoped>
/* footer {
    width: 100%; height: 50px;
    border: 1px solid #000;
} */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 1rem;
  text-decoration: none;
  color: #000;
  background-color: #fff;
}

.footer {
  position: fixed;
  bottom: 5px;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: #fff;
  z-index: 1000; /* 다른 요소 위에 나타나도록 z-index 설정 */
  border-top: 1px solid #ccc;
  padding: 5px;
}

.btn_group {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: inherit;
  height: inherit;
}

.btn_group img {
  width: 25px;
  height: 25px;
  /* border: 1px solid orange; */
  cursor: pointer;
}
</style>