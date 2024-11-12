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
    <ul class="btn_group">
      <li style="text-align: center;">
        <img :src="homeIcon" @click="goHome">
        <p style="font-size: 0.7rem; text-align: center;">홈</p>
      </li>
      <li style="text-align: center; margin-left: 15px;">
        <img :src="giftIcon" :style="subAccountStlye" @click="goGift">
        <p style="font-size: 0.7rem; text-align: center;">선물</p>
      </li>
      <li style="text-align: center; margin-left: 10px;">
        <img :src="findShopIcon" @click="FindShop">
        <p style="font-size: 0.7rem; text-align: center;">가맹점찾기</p>
      </li>
      <li style="text-align: center;">
        <img :src="myPageIcon" @click="goMypage">
        <p style="font-size: 0.7rem;">My CM</p>
      </li>
    </ul>
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
  computed: {
    subAccountStlye() {
      return this.member === '6'
        ? { pointerEvents: 'none', opacity: '0.5' } // 클릭 비활성화 + 시각적 효과
        : {}; // 기본 스타일 유지
    },
    isDarkMode() {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    },
    homeIcon() {
    return this.isDarkMode
      ? require('@/assets/footer_home_white.png')
      : require('@/assets/footer_home.png');
  },
  giftIcon() {
    return this.isDarkMode
      ? require('@/assets/footer_gift_white.png')
      : require('@/assets/footer_gift.png');
  },
  findShopIcon() {
    return this.isDarkMode
      ? require('@/assets/footer_findshop_white.png')
      : require('@/assets/footer_findshop.png');
  },
  myPageIcon() {
    return this.isDarkMode
      ? require('@/assets/footer_mypage_white.png')
      : require('@/assets/footer_mypage.png');
  }


  },
  methods: {
    goHome() {
      this.$router.push({ path: '/main' })
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
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  /* 필요한 높이로 설정 */
  background-color: #fff;
  z-index: 1000;
  border-top: 1px solid #ccc;
  display: flex;
  /* 내부 요소가 전체를 덮도록 설정 */
  justify-content: center;
}

.btn_group {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
  /* 부모 요소의 높이를 채우도록 설정 */
  margin: 0;
  padding: 0;
}

.btn_group li {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  /* li가 전체 높이를 채우도록 설정 */
  text-align: center;
}

.btn_group img {
  width: 25px;
  height: 25px;
  cursor: pointer;
}


@media (prefers-color-scheme: dark) {
  .footer {
    background: rgba(22, 21, 27, 1);

  }

  .footer>.btn_group {
    background: rgba(22, 21, 27, 1);

  }

  .footer>.btn_group>li {
    background: rgba(22, 21, 27, 1);
  }

  .footer>.btn_group>li >img {
    background: rgba(22, 21, 27, 1);
  }

  .footer>.btn_group>li>p {
    color: #eee;
    background: rgba(22, 21, 27, 1);

  }



}
</style>