<template>
       <header class="change_info_header_title">
           <RouterLink :to="`/ChangeFranchise`"><img src="@/assets/icon_arrow_left.svg" alt=""></RouterLink>
           <h3>이미지 등록</h3>
           <RouterLink to="/ChangeFranchise">
      <img src="@/assets/icon_close.svg" alt="Close" />
    </RouterLink>
    </header>

    <section class="changeImg_area">
        <div class="infor_title">
            <p>대표 이미지</p>
        </div>
        <form action="submit" method="POST">
                    <div class="container">
                        <div class="rep_img_box">
                            <img class="create_img_add" :src="imageSrc" alt="">
                            <label  class="label" id="addimg1"><input  ref="repImgInput" type="file" id="addimg1" class="create_main_img"  @change="previewImage"></label>
                            <!-- 사진 업로드 INPUT -->
                        </div>
                        <div class="rep_txt">
                            <p><span>*</span>매장에 접속하는 이용자들이 한눈에 알 수 있는 이미지 또는 사진을 등록해 주세요. 최대 9장까지 등록이 가능합니다.</p>
                            <p><span>*</span> 4:3 비율의 이미지로 업로드 해주세요. 비율이 맞지 않을 경우 일부 이미지가 깨질 수 있습니다.</p>
                        </div>
                    </div>

                    <div class="infor_title">
                        <p>상세 이미지</p>
                    </div>
                    <div class="detail_img_box">
                        <ul class="detail_img">
                            <li class="img_add_box" id="img_insert">
                                <img src="@/assets/contetns_img.svg" alt="이미지 추가" class="noset_img">
                                <!-- 이미지 추가 아이콘 -->
                                <label class="label" id="addimg2"><input type="file" id="addimg2" class="img_add_btn" @change="imgArray" ></label>
                                <!-- 사진 업로드 INPUT -->
                            </li>
                            <!--이미지 미리보기-->
                            <li v-for="(img,index) in detailImages" :key="index" class="img_add_box" ><img class="img_p" :src="img" alt=""><p class="closeBtn" @click="cancellation(index)"></p></li>
                        </ul>
                    </div>
           
        </form>
        <button class="saveBtn" type="button" @click="showModal = true">저장</button>
    </section>

    <div v-if="showModal" class="modal">
  <p class="caution">알림</p>
      <p>사진이 등록 되었습니다.</p>
      <button @click="saveImg()">확인</button>
      <button @click="cancelInsert">취소</button>
  </div>




</template>

<script>
import { useResponseStore } from '@/store/response.js';
import router from '@/router/index.js';
import axios from 'axios';



export default{
    name:'changeImg',
    data(){
        return{
            imageSrc:require('@/assets/1.jpg'),//경로를 동적으로 사용할 때는 require 함수나 import를 사용해야 합니다.
            detailImages: [], // 상세 이미지 배열
            files:[], // 이미지 파일들
            repImgFile: null, // 대표 이미지 파일
            showModal:false
        }
    },
    methods:{

        cancelInsert(){
            this.showModal = false
        },
        async saveImg(){
            console.log('사진 저장! ');

            let store = useResponseStore();
            const formData = new FormData();
            formData.append('type', 'store_update2');
            formData.append('user_index',store.user_index);

            //대표 이미지 파일 formData에 추가
            const repImgFile = this.$refs.repImgInput.files[0]; // 대표 이미지 파일
            if(repImgFile){
            formData.append('rep_img',repImgFile);   
            }

            //상세 이미지 파일들을 각각 추가
            this.files.forEach((file,index)=>{
            formData.append(`sub_img_${index}`,file); //파일 이름 각각 다르게 설정
            })

            formData.append('length',this.files.length); // 이미지 최대 9개 까지
            
            for (const pair of formData.entries()) {
            console.log(pair[0], pair[1]);
            }
            
            const url = process.env.VUE_APP_API_URL;

            try {
            // axios로 파일 업로드 요청
            const response = await axios.post(`${url}api/store/store_update.php`, formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            });
                console.log('응답 결과:', response.data);
                console.log('응답 결과:2', response.data.msg);
                console.log('FormData:', ...formData); // FormData 확인
                } catch (error) {
                 console.error('이미지 업로드 중 에러 발생:', error);
                    }
                    router.push({ path: '/ChangeFranchise' });
        },
     
        previewImage(event) {
            const file = event.target.files[0]; // 선택된 파일 가져오기
            console.log('대표이미지',file);
            
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.imageSrc = e.target.result; // 이미지를 미리보기용 src에 설정
                };
                reader.readAsDataURL(file); // 파일을 Data URL로 변환
            }
        },
        imgArray(e){
            const file = e.target.files[0];
            this.files.push(file)
            console.log(file);
            console.log(this.files);
            
            
            if(file){
                const reader = new FileReader();
                reader.onload = (e) =>{
                    this.detailImages.push(e.target.result);
                };
                reader.readAsDataURL(file);
            }
        },

        cancellation(index){
            console.log('사진 안올린다');
            this.detailImages.splice(index,1)
        },
    }
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

.change_info_header_title {
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

.change_info_header_title > a:nth-child(1) {
  position: absolute; /* 왼쪽 버튼을 절대 위치로 */
  left: 10px; /* 왼쪽으로부터의 거리 */
  top: 50%; /* 세로 가운데 정렬 */
  transform: translateY(-50%); /* 세로 가운데 정렬 보정 */
}

.change_info_header_title > a:nth-child(2) {
  position: absolute; /* 오른쪽 버튼을 절대 위치로 */
  right: 10px; /* 오른쪽으로부터의 거리 (여백 추가) */
  top: 50%; /* 세로 가운데 정렬 */
  transform: translateY(-50%); /* 세로 가운데 정렬 보정 */
}

.change_info_header_title > h3 {
  margin: 0 auto;
  text-align: center;
  color: #1749c2;
  font-weight: 900;
}

.changeImg_area{
 width: 95%;
 margin: 100px auto 0;
}
.infor_title {
    font-size: 18px;
    font-weight: 800;
}

.rep_img_box{
    border: 1px dashed #b1b1b1;
    border-radius: 20px;
}

.rep_img_box, .detail_img_box {
    position: relative; /* 부모 요소에 relative 추가 */
    width: 100%; /* 부모 요소의 크기를 설정 */
}

.rep_img_box {
    border: 1px dashed #b1b1b1;
    border-radius: 20px;
    width: 100%;
    aspect-ratio: 4 / 3; /* 4:3 비율 유지 */
    height: 500px; /* 높이를 명시적으로 설정 */
    overflow: hidden; /* 이미지가 삐져나오지 않도록 설정 */
    position: relative; 
}

.label {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
}

input[type="file"]{
    display: none;
}

.create_img_add{
    width: 100%;
    height: 100%;
    object-fit: cover; /* 이미지를 박스 안에 맞게 조정 (잘리더라도 비율 유지) */
}

.create_img_add{
    overflow: hidden;
}

.rep_txt{
    font-size: 12px;
    color: #555555;
}

.detail_img{
    display: flex; /* 가로로 배치되도록 설정 */
    gap: 10px;
}


.detail_img > li{
    flex-shrink: 0; /* 아이템들이 줄어들지 않도록 설정 */
    width: 40%;
    height: 260px;
    position: relative; /* 이미지의 위치 조정을 위해 relative 설정 */
    border: 1px dashed #b1b1b1; /* 경계선 추가 */
    border-radius: 10px; /* 모서리 둥글게 */
    overflow: hidden; /* 이미지가 삐져나오지 않도록 설정 */
}


.detail_img > li img {
    width: 100%;
    height: 100%;
}

.detail_img_box{
    max-width: 100%; /* 부모 요소의 너비에 맞춤 */
    overflow-x: auto; /* 가로 스크롤 활성화 */
    white-space: nowrap; /* 줄바꿈 방지 */
}


.noset_img {
    display: flex;
    justify-content: center; /* 가로 가운데 정렬 */
    align-items: center; /* 세로 가운데 정렬 */
    width: 100%;
    height: 100%;
}

.noset_img img {
    width: 50%; /* 이미지 크기를 퍼센트로 설정 */
    height: auto; /* 이미지의 비율을 유지하며 높이를 자동 조정 */
    object-fit: cover; /* 이미지가 박스 안에 맞게 조정 */
}

.saveBtn{
    width: 100%;
    height: 50px;
    background-color: #1749C2;
    border: 0;
    border-radius: 10px;
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 10px;
}
.img_p{
    position: relative;
    width: 100%;

}
.closeBtn{
    position: absolute;
    right: 10px;
    top: 0px;
    width: 20px;
    height: 20px;
    background-image: url('@/assets/icon_img_close.svg');
    background-size: contain; /* 아이콘 크기를 컨테이너에 맞춤 */
    background-repeat: no-repeat;
    cursor: pointer;
    
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
  position: fixed; /* 고정 위치 */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -70%); /* 화면의 중앙에 위치 */
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  width: 400px;
  max-width: 90%;
  padding: 30px 20px;
  text-align: center;
  box-sizing: border-box;
}
.caution{
    margin-bottom: 20px;
 }

.modal button {
  margin: 10px;
  padding: 10px 20px;
  background-color: #1749c2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

</style>