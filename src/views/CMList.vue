<template>
    <div class="wrap">
        <header>
            <button type="button" class="goback_btn"><img src="@/assets/go_back_btn.png"></button>
            <p>CM내역</p>
        </header>

        <div class="btn_list">
            <!-- 보유 포인트, 머니 보여주기 -->
            <div class="money">
                <div>
                    <p>보유</p> 
                    <p>19,500<span> CM 포인트</span></p>
                </div>
                <div style="margin-top: 10px;">
                    <p>사용가능</p> 
                    <p>9,967,300<span> CM 머니</span></p>
                </div>
            </div>

            <!-- 셀렉트 및 결제취소 버튼 -->
            <div class="select">
                <select>
                    <option>전체</option>
                    <option>구매</option>
                    <option>판매</option>
                    <option>선물</option>
                    <option>충전</option>
                </select>

                <button type="button">결제 취소</button>
            </div>
        </div>

        <!-- CM 내역 리스트 -->
        <div class="cm_list">
            <div>
                <p>2024-08-23 15:57:57</p> 
                <p style="font-weight: bold; color: red;">구매</p>
            </div>
            <div>
                <p>홈앤카페플러스</p> 
                <p style="font-weight: bold; color: red;">-24,900CM</p>
            </div>
            <div>
                <p>2024-08-23 15:57:57</p> 
                <p style="font-weight: bold; color: red;">구매</p>
            </div>
            <div>
                <p>홈앤카페플러스</p> 
                <p style="font-weight: bold; color: red;">-24,900CM</p>
            </div>
            <div>
                <p>2024-08-23 15:57:57</p> 
                <p style="font-weight: bold; color: blue;">판매</p>
            </div>
            <div>
                <p>홈앤카페플러스</p> 
                <p style="font-weight: bold; color: blue;">4,500CM</p>
            </div>
            <div>
                <p>2024-08-23 15:57:57</p> 
                <p style="font-weight: bold; color: blue;">본사지급(CM)</p>
            </div>
            <div>
                <p>홈앤카페플러스</p> 
                <p style="font-weight: bold; color: blue;">100,000,000CM</p>
            </div>
            <div>
                <p>2024-08-23 15:57:57</p> 
                <p style="font-weight: bold; color: red;">구매</p>
            </div>
            <div>
                <p>홈앤카페플러스</p> 
                <p style="font-weight: bold; color: red;">-24,900CM</p>
            </div>
            <div>
                <p>2024-08-23 15:57:57</p> 
                <p style="font-weight: bold; color: red;">구매</p>
            </div>
            <div>
                <p>홈앤카페플러스</p> 
                <p style="font-weight: bold; color: red;">-24,900CM</p>
            </div>
            <div>
                <p>2024-08-23 15:57:57</p> 
                <p style="font-weight: bold; color: red;">구매</p>
            </div>
            <div>
                <p>홈앤카페플러스</p> 
                <p style="font-weight: bold; color: red;">-24,900CM</p>
            </div>
            <div>
                <p>2024-08-23 15:57:57</p> 
                <p style="font-weight: bold; color: red;">구매</p>
            </div>
            <div>
                <p>홈앤카페플러스</p> 
                <p style="font-weight: bold; color: red;">-24,900CM</p>
            </div>
            <div>
                <p>2024-08-23 15:57:57</p> 
                <p style="font-weight: bold; color: red;">구매</p>
            </div>
            <div>
                <p>홈앤카페플러스</p> 
                <p style="font-weight: bold; color: red;">-24,900CM</p>
            </div>
            <div>
                <p>2024-08-23 15:57:57</p> 
                <p style="font-weight: bold; color: red;">구매</p>
            </div>
            <div>
                <p>홈앤카페플러스</p> 
                <p style="font-weight: bold; color: red;">-24,900CM</p>
            </div>
        </div>


    </div>

    <Footer />
</template>

<script>
import Footer from '@/components/FooterPage.vue'

export default {
    components : {
        Footer,
    }
}
</script>

<style scoped>
* {
    margin: 0; padding: 0;
    box-sizing: border-box;
    text-decoration: none;
    font-size: 1rem;
    color: hsl(0, 0%, 0%);
}
.wrap {
    position: relative;
    width: 100%;
    background-color: #fff;
    /* border: 1px solid red; */
    margin-bottom: 70px;
}
header {
    position: fixed;
    top: 0; left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%; height: 40px;
    padding: 0 10px;
    background-color: #fff;
    border: 1px solid #ccc;
}
header > p {
    line-height: 40px;
    color: blue;
    /* border: 1px solid red; */
    margin: 0 auto;
}
.goback_btn {
    width: 30px; height: 30px;
    background-color: #fff;
    border: 1px solid #fff;
}
.goback_btn img {
    width: 100%; height: 100%;
}
.btn_list {
    width: 100%;
    margin-top: 60px;
    padding: 0 20px;
    /* border: 1px solid red; */
}
.money {
    width: 100%; height: 120px;
    margin: 20px auto;
    border-radius: 7px;
    background-color: rgb(110, 88, 253);
}
.money p, span {
    color: #fff;
    font-weight: bold;
    font-size: 1.1rem;
}
.money > div {
    display: flex;
    justify-content: space-between;
    padding: 20px 20px 0;
}
.select {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 0 auto;
    /* border: 1px solid blue; */
}
.select > select {
    width: 100px; height: 35px;
    border-radius: 5px;
    font-size: 0.9rem;
}
.select > button {
    width: 70px; height: 35px;
    border-radius: 5px;
    border: none;
    background-color: rgb(4, 4, 221);
    color: #fff;
    font-size: 0.8rem;
}
.cm_list {
    width: 100%;
    margin-top: 20px;
    padding: 0 20px;
    /* border: 1px solid orange; */
}
.cm_list > div {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
}
.cm_list > div:nth-of-type(2) {
    border-bottom: 1px solid #ccc;
}
</style>