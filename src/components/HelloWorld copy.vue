<template>
  <!-- <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>메인페이지입니다.</h1>
    <button><router-link to="/login">로그인페이지로 이동</router-link></button>
  </div> -->

  <!-- 상단 네브바 -->
  <!-- <nav class="navbar navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand custom_font_size2" href="#">씨엠바더</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button> -->

        <!-- 상단 네브바 메뉴 -->
        <!-- <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel"> -->
          <!-- 메뉴 헤더 -->
          <!-- <div class="offcanvas-header">
            <h5 class="offcanvas-title custom_font_size2" id="offcanvasDarkNavbarLabel">내 정보</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div> -->
          <!-- 메뉴 바디 -->
          <!-- <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3"> -->
              <!-- 바디 아이템 1 -->
              <!-- <li class="nav-item">
                <a class="nav-link custom_font_size2 active" aria-current="page" href="#">Home</a>
              </li> -->
              <!-- 바디 아이템 2 -->
              <!-- <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle custom_font_size2" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul class="dropdown-menu dropdown-menu-dark">
                  <li><a class="dropdown-item" href="#">Action</a></li>
                  <li>
                    <hr class="dropdown-divider">
                  </li>
                  <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
            </ul>
            <form class="d-flex mt-3" role="search">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
              <button class="btn btn-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </div>
  </nav> -->

    <!-- 바디 -->
    <div class="container-fluid" style="margin-top:5px;">
      <div class="card w-100" style="background-image: url('https://img.freepik.com/free-vector/watercolor-oil-painting-background_52683-107025.jpg'); background-repeat: no-repeat; background-size: cover;">
        <div class="card-body">
          <h5 class="card-title">보유 자산</h5>
          <p class="card-text">
            보유 9,001,000 CMP<br/>
            사용가능 1,000 CM
          </p>
          <p class="card-text text-end">
            <a href="#" class="btn btn-primary text-end">카드를 탭하여 결제하세요.</a>
          </p>
        </div>
      </div>
    </div>

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
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
    
    }
  },
  mounted() {
    const formData = new FormData();
    //formData.append('name', 'JiYu');
    //formData.append('country', 'Korea');
    formData.append('type', 'test');
    formData.append('id', 'test0000');
    formData.append('pw', '1234');
    // console.log(formData);
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    fetch('https://cmbarter.com/api/test_api.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => console.log(data));
  },
  methods: {
    click() {
      // console.log(1111);
    }
  },
  props: {
    msg: String
  },
}
</script>

<style scoped>
  .custom_font_size1 {
      font-size: 1rem;
    }
  .custom_font_size1_5 {
    font-size: 1.5rem;
  }
  .custom_font_size2 {
    font-size: 2rem;
  }
  .container-fluid > a {
    /* display: block; */
    /* margin: 0 auto; */
  }
  .col-3 i {
    color: #fff;
  }
/* .hello {
  margin-top: 50px;
} */
</style>
