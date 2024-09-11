<template>
<header class="cmhistory_header_title">
            <RouterLink to="/main"><img src="@/assets/icon_arrow_left.svg" alt=""></RouterLink>
            <h3> CM 내역</h3>
        </header>
<section class="content content_table">
        <div class="content_table_row content_table_full">
            <div class="content_table_cell">
                <ul class="m_T20">
                    <li class="now_cmp_wrap user_border">
                        <!-- 가맹점 회원일경우 fran_border-->
                        <div class="now_cmp">
                            <p class="mcm_amount flex_between">
                                <span class="cmtitle">사용가능</span>
                                 <span class="cmamount">50,000,400 CM 머니</span>
                            </p>
                        </div>
                    </li>
                </ul>
                <!-- 새로고침 및 cm 보유자산-->
                <form method="get" action="./cm_history.php">
                    <ul class="flex_between">
                        <li class="sear_choice">
                            <select id="category_select" name="category" class="input_design">
                                
                                <option>
                                    전체
                                </option>
                                <option value="buy">
                                    구매
                                </option>
                                <option value="gift">
                                    선물
                                </option>
                            </select>
                        </li>
                        <li class="payment_cancel">
                            <button type="button" class="click_active" onclick="location.href='./cm_cancellation_list.php'">
                                결제 취소
                            </button>
                        </li>
                    </ul>
                </form>

                <ul class="h_listwrap m_B84">
                                                <li class="border_m p_B10 p_T10">
                                <div class="history_viewdate">
                                    <p class="h_date">
                                        2024-09-10 10:02:27</p>
                                    <p class="h_view main semi_bold">본사지급(CM)</p>                                </div>
                                <div class="history_view m_T10">
                                    <p class="h_user">
                                        출석 체크                                    </p>
                                    <p class="main semi_bold">100 CM</p>                                    <!-- 넘칠경우 말줄임표 반영-->
                                </div>
                            </li>
                                                <li class="border_m p_B10 p_T10">
                                <div class="history_viewdate">
                                    <p class="h_date">
                                        2024-09-09 09:25:05</p>
                                    <p class="h_view main semi_bold">본사지급(CM)</p>                                </div>
                                <div class="history_view m_T10">
                                    <p class="h_user">
                                        출석 체크                                    </p>
                                    <p class="main semi_bold">100 CM</p>                                    <!-- 넘칠경우 말줄임표 반영-->
                                </div>
                            </li>
                                                <li class="border_m p_B10 p_T10">
                                <div class="history_viewdate">
                                    <p class="h_date">
                                        2024-09-05 10:47:40</p>
                                    <p class="h_view main semi_bold">본사지급(CM)</p>                                </div>
                                <div class="history_view m_T10">
                                    <p class="h_user">
                                        출석 체크                                    </p>
                                    <p class="main semi_bold">100 CM</p>                                    <!-- 넘칠경우 말줄임표 반영-->
                                </div>
                            </li>
                                                <li class="border_m p_B10 p_T10">
                                <div class="history_viewdate">
                                    <p class="h_date">
                                        2024-09-04 16:00:58</p>
                                    <p class="h_view main semi_bold">본사지급(CM)</p>                                </div>
                                <div class="history_view m_T10">
                                    <p class="h_user">
                                        출석 체크                                    </p>
                                    <p class="main semi_bold">100 CM</p>                                    <!-- 넘칠경우 말줄임표 반영-->
                                </div>
                            </li>
                                                <li class="border_m p_B10 p_T10">
                                <div class="history_viewdate">
                                    <p class="h_date">
                                        2024-08-22 11:24:03</p>
                                    <p class="h_view main semi_bold">본사지급(CM)</p>                                </div>
                                <div class="history_view m_T10">
                                    <p class="h_user">
                                        출석 체크                                    </p>
                                    <p class="main semi_bold">100 CM</p>                                    <!-- 넘칠경우 말줄임표 반영-->
                                </div>
                            </li>
                    
                    
                </ul>
            </div>
            <!-- content_table_cell -->
        </div>
        <!-- content_table_row -->
    </section>

    
</template>
<script>
export default{
    name:'cm_history',
}
</script>
<style scoped>


@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap');


*span,ul,select,button{
    font-family: "Noto Sans KR", sans-serif;
    
}
.cmhistory_header_title{
    display: flex;
    align-items: center;
    justify-content: center; /* 가운데 정렬 */
    position: fixed;
    top: 0;
    left: 50%;
    width: 100%;
    transform: translateX(-50%);
    height: 60px;
    background-color: #fff;
    font-size: 18px;
    font-weight: 800;
    border-bottom: 1px solid var(--line);
    z-index: 100;
}

.cmhistory_header_title > a {
    position: absolute; /* 왼쪽 버튼을 절대 위치로 */
    left: 10px; /* 왼쪽으로부터의 거리 */
    top: 50%; /* 세로 가운데 정렬 */
    transform: translateY(-50%); /* 세로 가운데 정렬 보정 */
}

.cmhistory_header_title > h3 {
    margin: 0;
    text-align: center; /* 텍스트 가운데 정렬 */
    color: #1749C2;
    font-weight: 900;
}
.user_border {
    background: linear-gradient(to left, #3B46CA, #6640E4);
}

.now_cmp_wrap {
    border-radius: 10px;
    padding: 20px;
    font-weight: 400;
    margin-top: 10px;
}

ul,li{
    text-decoration: none;
    list-style: none;
    padding: 0;
}
.content {
    width: 100%;
    padding: 70px 20px 0;
    background-color: #fff;
}
.content_table {
    display: table;
    height: 100%;
}
.cmtitle {
    font-size: 16px;
    font-weight: 500;
    color: #fff;
    height: 33px;
    line-height: 33px;
}
.cmamount {
    font-size: 22px;
    font-weight: 600;
    font-family: 'poppins';
    color: #fff;
    line-height: normal;
}

.h_date {
    font-family: 'poppins';
    font-size: 15px;
    font-weight: 600;
}

.h_user {
    width: 170px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
    font-weight: 600;
}

.semi_bold {
    font-weight: 600;
}

.main {
    color: #1749C2 !important;
}

.flex_between{
    display: flex;
    justify-content: space-between;
}

.history_viewdate, .history_view {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
}

.input_design {
    width: 100%;
    padding: 8px 16px;
    border-radius: 6px;
    border: 1px solid #c3c3c3;
    font-size: 14px;
    font-weight: 500;
    height: 40px;
}

.payment_cancel button {
    border: 1px solid #d3d3d3;
    font-size: 14px;
    padding: 10px;
    border-radius: 6px;
    color: #212121;
    margin-left: auto;
    background: #fff;
    font-weight: 400;
    font-family: 'noto_sans';
}

.payment_cancel .click_active {
    background-color: #1749C2;
    color: #fff;
    border: none;
}


</style>