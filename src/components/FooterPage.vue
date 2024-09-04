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
        <img src="@/assets/home.png">
        <img src="@/assets/gift.png">
        <img src="@/assets/search.png">
        <img src="@/assets/my.png">
      </div>
  </div>

</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods : {
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
    margin: 0; padding: 0;
    box-sizing: border-box;
    font-size: 1rem;
    text-decoration: none;
    color: #000;
    background-color: #fff;
}
.footer {
    position: fixed;
    bottom: 0; left: 0;  
    width: 100%; height: 50px;
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid #ccc;
}
.btn_group {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: inherit; height: inherit;
}
.btn_group img {
    width: 25px; height: 25px;
    /* border: 1px solid orange; */
}
</style>