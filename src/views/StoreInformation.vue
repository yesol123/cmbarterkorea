<template>
    <header class="store_infomation_title">
           <RouterLink :to="`/ChangeFranchise`"><img src="@/assets/icon_arrow_left.svg" alt=""></RouterLink>
           <h3>매장 관리</h3>
           <RouterLink to="">
      <img src="@/assets/icon_close.svg" alt="Close" />
    </RouterLink>
    </header>

    <section class="store_info_area">
      <ul>
        <li><RouterLink to ='/ChangeFranchise' > 기본 정보</RouterLink></li>
        <li><RouterLink to ='/storeInformation'> 정보 변경</RouterLink></li>
      </ul>

      <div>
        <p>영업정보</p>
      </div>

      <article>
        <div>
        <h5>영업 시간</h5>
        
          <input name="" id="" type="time"/>
        </div>

        <div>
          <h5>휴게시간 <span><input type="checkbox"></span></h5>
          <p>*휴게시간은 운영시간 안으로만 설정 가능 합니다.</p>
          <ul>
            <li>
              <label for="m">월
              <input type="radio" id="m">
              </label>
            </li>
          </ul>
        </div>
        
        <div>
          <button> + 영업시간 추가</button>
        </div>
      
      
      </article>



    </section>
</template>
<script>
    export default{
        name:'storeInformation',
        data(){
            return{}
        },
        methods:{}
    }
</script>
<style scoped>


@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap');

*{
    font-family: "Noto Sans KR", sans-serif;
}

ul,a{
    list-style: none;
    padding: 0;
    text-decoration: none;
}

.store_infomation_title {
  display: flex;
  align-items: center;
  justify-content: space-between; /* 가운데 정렬 */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: #fff;
  font-size: 18px;
  font-weight: 800;
  border-bottom: 1px solid var(--line);
  z-index: 100;
  padding: 0 10px; /* 좌우 여백 추가 */
  box-sizing: border-box; /* 여백과 테두리를 포함한 전체 크기 계산 */
}

.store_infomation_title > a:nth-child(1) {
  position: absolute; /* 왼쪽 버튼을 절대 위치로 */
  left: 10px; /* 왼쪽으로부터의 거리 */
  top: 50%; /* 세로 가운데 정렬 */
  transform: translateY(-50%); /* 세로 가운데 정렬 보정 */
}

.store_infomation_title > a:nth-child(2) {
  position: absolute; /* 오른쪽 버튼을 절대 위치로 */
  right: 10px; /* 오른쪽으로부터의 거리 (여백 추가) */
  top: 50%; /* 세로 가운데 정렬 */
  transform: translateY(-50%); /* 세로 가운데 정렬 보정 */
}

.store_infomation_title > h3 {
  margin: 0 auto;
  text-align: center;
  color: #1749c2;
  font-weight: 900;
}

.store_info_area{
 width: 95%;
 margin: 0 auto;
}



.store_info_area > ul:nth-child(1){
margin-top: 100px;
 display: flex;
 justify-content: center;
 padding: 0;
 text-decoration: none;
 list-style: none;
}

.store_info_area > ul:nth-child(1) > li:nth-child(1) {
 padding: 10px 20px;
 width: 50%;
 text-align: center;
 font-size: 20px;
 border-bottom: 3px solid gray; 
 
}

.store_info_area > ul:nth-child(1) > li:nth-child(2) {
 padding: 10px 20px;
 width: 50%;
 text-align: center;
 font-size: 20px;
 border-bottom: 3px solid #1749c2; 
}

input[type="time"]::-webkit-calendar-picker-indicator,
input[type="time"]::-webkit-inner-spin-button {
    display: none;
    appearance: none;
}


</style>