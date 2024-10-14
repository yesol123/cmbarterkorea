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
      <li>
        <RouterLink to='/ChangeFranchise'> 기본 정보</RouterLink>
      </li>
      <li>
        <RouterLink to='/storeInformation'> 운영 정보</RouterLink>
      </li>
    </ul>

    <div>
      <p class="title">영업정보</p>
    </div>

    <article>
      <div class="business_hours">
        <div class="flex_between">

          <p class="title holiday_txt m_B20">영업 시간</p>
        </div>
        <div class="flex_between">
          <div class="hours_box">

            <a-config-provider :locale="locale">
              <a-time-picker class="timepicker hours_time" v-model:value="openTime" :format="format"
                dropdown-class-name="custom-time-picker-dropdown" />
            </a-config-provider>
            <!-- 
            <img src="@/assets/icon_shevron_down.svg" alt="화살표" @click="toggleDropdown"> -->
          </div>
          <div class="hours_box">

            <a-config-provider :locale="locale">
              <a-time-picker class="timepicker hours_time" v-model:value="closeTime" :format="format"
                dropdown-class-name="custom-time-picker-dropdown" />
            </a-config-provider>
          </div>
        </div>

        <div class="flex_between">
          <p class="title holiday_txt m_B20">휴게 시간</p>
          <!-- <p class="hour_switch m_B20">
              <input type="checkbox" id="rest_time1" class="hour_switch_check">
              <label class="switch_label"> <span class="onf_btn"></span></label>
            </p> -->
        </div>
        <div class="flex_between time_rest d_none">
          <div class="hours_box">
            <a-config-provider :locale="locale">
              <a-time-picker class="timepicker hours_time" v-model:value="restStartTime" :format="format"
                dropdown-class-name="custom-time-picker-dropdown" />
            </a-config-provider>
          </div>
          <div class="hours_box">

            <a-config-provider :locale="locale">
              <a-time-picker class="timepicker hours_time" v-model:value="restEndTime" :format="format"
                dropdown-class-name="custom-time-picker-dropdown" />
            </a-config-provider>
          </div>
        </div>
        <b class="info_note" id="timeError1">* 휴게시간은 운영시간 안으로만 설정가능합니다.</b>

        <ul class="join_state" id="day1">
          <!-- input radio -->
          <li>
            <label class="join_obj">
              <input type="radio" name="sunday" onclick="deselect()">
              <span>
                일
              </span>
            </label>
          </li>
          <li>
            <label class="join_obj">
              <input type="radio" name="monday" onclick="deselect()">
              <span>
                월
              </span>
            </label>
          </li>
          <li>
            <label class="join_obj">
              <input type="radio" name="tuesday" onclick="deselect()">
              <span>
                화
              </span>
            </label>
          </li>
          <li>
            <label class="join_obj">
              <input type="radio" name="wednesday" onclick="deselect()">
              <span>
                수
              </span>
            </label>
          </li>
          <li>
            <label class="join_obj">
              <input type="radio" name="thursday" onclick="deselect()">
              <span>
                목
              </span>
            </label>
          </li>
          <li>
            <label class="join_obj">
              <input type="radio" name="friday" onclick="deselect()">
              <span>
                금
              </span>
            </label>
          </li>
          <li>
            <label class="join_obj">
              <input type="radio" name="saturday" onclick="deselect()">
              <span>
                토
              </span>
            </label>
          </li>
        </ul>
      </div>
    </article>
    
    <article  style="margin-top: 20px;">
      <div class="business_hours">
        <div class="flex_between">

          <p class="title holiday_txt m_B20">영업 시간</p>
        </div>
        <div class="flex_between">
          <div class="hours_box">

            <a-config-provider :locale="locale">
              <a-time-picker class="timepicker hours_time" v-model:value="openTime" :format="format"
                dropdown-class-name="custom-time-picker-dropdown" />
            </a-config-provider>
            <!-- 
            <img src="@/assets/icon_shevron_down.svg" alt="화살표" @click="toggleDropdown"> -->
          </div>
          <div class="hours_box">

            <a-config-provider :locale="locale">
              <a-time-picker class="timepicker hours_time" v-model:value="closeTime" :format="format"
                dropdown-class-name="custom-time-picker-dropdown" />
            </a-config-provider>
          </div>
        </div>

        <div class="flex_between">
          <p class="title holiday_txt m_B20">휴게 시간</p>
          <!-- <p class="hour_switch m_B20">
              <input type="checkbox" id="rest_time1" class="hour_switch_check">
              <label class="switch_label"> <span class="onf_btn"></span></label>
            </p> -->
        </div>
        <div class="flex_between time_rest d_none">
          <div class="hours_box">
            <a-config-provider :locale="locale">
              <a-time-picker class="timepicker hours_time" v-model:value="restStartTime" :format="format"
                dropdown-class-name="custom-time-picker-dropdown" />
            </a-config-provider>
          </div>
          <div class="hours_box">

            <a-config-provider :locale="locale">
              <a-time-picker class="timepicker hours_time" v-model:value="restEndTime" :format="format"
                dropdown-class-name="custom-time-picker-dropdown" />
            </a-config-provider>
          </div>
        </div>
        <b class="info_note" id="timeError1">* 휴게시간은 운영시간 안으로만 설정가능합니다.</b>

        <ul class="join_state" id="day1">
          <!-- input radio -->
          <li>
            <label class="join_obj">
              <input type="radio" name="sunday" >
              <span>
                일
              </span>
            </label>
          </li>
          <li>
            <label class="join_obj">
              <input type="radio" name="monday" onclick="deselect()">
              <span>
                월
              </span>
            </label>
          </li>
          <li>
            <label class="join_obj">
              <input type="radio" name="tuesday" onclick="deselect()">
              <span>
                화
              </span>
            </label>
          </li>
          <li>
            <label class="join_obj">
              <input type="radio" name="wednesday" onclick="deselect()">
              <span>
                수
              </span>
            </label>
          </li>
          <li>
            <label class="join_obj">
              <input type="radio" name="thursday" onclick="deselect()">
              <span>
                목
              </span>
            </label>
          </li>
          <li>
            <label class="join_obj">
              <input type="radio" name="friday" onclick="deselect()">
              <span>
                금
              </span>
            </label>
          </li>
          <li>
            <label class="join_obj">
              <input type="radio" name="saturday" onclick="deselect()">
              <span>
                토
              </span>
            </label>
          </li>
        </ul>
      </div>
    </article>

    <div class="flex_between">
      <p class="title">공휴일 / 국경일 휴무</p>
      <label class="join_obj">
        <input type="checkbox" name="saturday" onclick="deselect()">
      </label>
    </div>

    <div>
      <p class="title">정기휴무</p>
      <div class="regular_holiday">
        <label class="for_select" for="selectWeek">
          <select name="" id="selectWeek" class="select">
            <option value="주기" selected>주기</option>
            <option value="매주">매주</option>
            <option value="격주">격주</option>
          </select>
        </label>
        <label class="for_select" for="selectDay">
          <select name="" id="selectDay" class="select">
            <option value="요일" selected>요일</option>
            <option value="일">일요일</option>
            <option value="월">월요일</option>
            <option value="화">화요일</option>
            <option value="수">수요일</option>
            <option value="목">목요일</option>
            <option value="금">금요일</option>
            <option value="토">토요일</option>
          </select>
        </label>
      </div>
    </div>

    <div>
      <p class="title">임시휴무</p>
      <div class="temporary_Closure">
        <a-config-provider :locale="locale">
        <a-space direction="vertical" size="12">
          <a-range-picker :presets="rangePresets" @change="onRangeChange" />
        </a-space>
      </a-config-provider>
        <input class="coments" type="text" name="" id="" v-model="coments" placeholder="코멘트를 입력하세요">
      </div>
    </div>


    <button class="save_btn" @click="saveData()">저장</button>

  </section>
</template>

<script>
import { message } from 'ant-design-vue'
import dayjs from 'dayjs';
import koKR from 'ant-design-vue/es/locale/ko_KR';
import { useResponseStore } from '@/store/response.js'

export default {
  name: 'storeInformation',
  watch: {
    restStartTime() {
      this.validateRestTime();
    },
    restEndTime() {
      this.validateRestTime();
    }
  },
  data() {
    return {
      openTime: dayjs('00:00', 'HH:mm'), // 영업 시작 시간
      closeTime: dayjs('00:00', 'HH:mm'), // 영업 종료 시간
      restStartTime: dayjs('00:00', 'HH:mm'), // 휴게 시작 시간
      restEndTime: dayjs('00:00', 'HH:mm'), // 휴게 종료 시간
      format: 'HH:mm',
      locale: koKR,
      showTimeError: false, // 오류 메시지 표시 여부
      selectedDays: {
        sunday: false,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
      },
    };
  },
  methods: {
    validateRestTime() {
      // openTime, closeTime, restStartTime, restEndTime이 제대로 설정되었는지 먼저 확인
      if (!this.openTime || !this.closeTime || !this.restStartTime || !this.restEndTime) {
        return;
      }

      // 휴게 시작 시간이 영업 시작 시간 이전이거나, 휴게 종료 시간이 영업 종료 시간 이후일 때
      if (this.restStartTime.isBefore(this.openTime) || this.restEndTime.isAfter(this.closeTime)) {
        this.showTimeError = true;
        message.error("휴게시간은 운영시간 안으로 설정해야 합니다.");
      } else {
        this.showTimeError = false;
      }
    },
    // 영업 시간에 맞게 휴게 시간의 시작 시간을 제한
    disabledRestStartHours() {
      const startHour = this.openTime.hour();
      const endHour = this.closeTime.hour();
      const disabledHours = [];
      for (let i = 0; i < 24; i++) {
        if (i < startHour || i >= endHour) {
          disabledHours.push(i);
        }
      }
      return disabledHours;
    },
    // 영업 시간에 맞게 휴게 시간의 종료 시간을 제한
    disabledRestEndHours() {
      const startHour = this.restStartTime ? this.restStartTime.hour() : this.openTime.hour();
      const endHour = this.closeTime.hour();
      const disabledHours = [];
      for (let i = 0; i < 24; i++) {
        if (i <= startHour || i > endHour) {
          disabledHours.push(i);
        }
      }
      return disabledHours;
    },
    saveData(){
      let store = useResponseStore();
      
      const formData = new FormData();
      
      formData.append('type', 'store_update3');
      formData.append('user_id', store.user_id);
      formData.append('work_start_time1',); //시작시간
      formData.append('work_end_time1',); //끝나는 시간
      formData.append('rest_start_time1',); // 휴게시간 시작
      formData.append('rest_end_time1',); //휴게시간 끝
      formData.append('day1',); //날짜 선택 
      formData.append('work_start_time2',); //시작시간
      formData.append('work_end_time2',); //끝나는 시간
      formData.append('rest_start_time2',); // 휴게시간 시작
      formData.append('rest_end_time2',); //휴게시간 끝
      formData.append('day2',); //날짜 선택
      formData.append('holi',); //공휴일 유무
      formData.append('reg_type',); //정기휴무 주기
      formData.append('reg_day',); //정기휴무 요일
      formData.append('datetimes',)// 임시휴무 날짜지정
      formData.append('holiday_txt',)// 임시휴무 코멘트

      const url = process.env.VUE_APP_API_URL;

      fetch(url + 'api/store/store_update.php', {
            method : 'POST',
            body : formData
            })
            .then(response => response.json())
            .then(data => {
               console.log('data',data);
               
            })





    }

  }
}
</script>
<style scoped>

ul,
a {
  list-style: none;
  padding: 0;

  text-decoration: none;
}

.store_infomation_title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* 가운데 정렬 */
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
  padding: 0 10px;
  /* 좌우 여백 추가 */
  box-sizing: border-box;
  /* 여백과 테두리를 포함한 전체 크기 계산 */
}

.store_infomation_title>a:nth-child(1) {
  position: absolute;
  /* 왼쪽 버튼을 절대 위치로 */
  left: 10px;
  /* 왼쪽으로부터의 거리 */
  top: 50%;
  /* 세로 가운데 정렬 */
  transform: translateY(-50%);
  /* 세로 가운데 정렬 보정 */
}

.store_infomation_title>a:nth-child(2) {
  position: absolute;
  /* 오른쪽 버튼을 절대 위치로 */
  right: 10px;
  /* 오른쪽으로부터의 거리 (여백 추가) */
  top: 50%;
  /* 세로 가운데 정렬 */
  transform: translateY(-50%);
  /* 세로 가운데 정렬 보정 */
}

.store_infomation_title>h3 {
  margin: 0 auto;
  text-align: center;
  color: #1749c2;
  font-weight: 900;
}

.store_info_area {
  width: 95%;
  margin: 0 auto;
}

.holiday_txt {
  margin: 8px 0;
}



.store_info_area>ul:nth-child(1) {
  margin-top: 60px;
  display: flex;
  justify-content: center;
  padding: 0;
  text-decoration: none;
  list-style: none;
}

.store_info_area>ul:nth-child(1)>li:nth-child(1) {
  padding: 10px 20px;
  width: 50%;
  text-align: center;
  font-size: 20px;
  border-bottom: 3px solid gray;

}

.store_info_area>ul:nth-child(1)>li:nth-child(2) {
  padding: 10px 20px;
  width: 50%;
  text-align: center;
  font-size: 20px;
  border-bottom: 3px solid #1749c2;
}

.title{
  font-weight: bold;
}

.coments,.select{
  padding: 8px;
  border: 1px solid #b1b1b1;
  border-radius: 5px;

}

.business_hours {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #b1b1b1;
  border-radius: 5px;
}

.flex_between {
  width: 95%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.hours_box {
  width: 49%;
  position: relative;
}

.hours_box>img {
  position: absolute;
  right: 0;
  top: 25%;
  transition: 500ms ease;
}

.hours_time {
  border: 1px solid #b1b1b1;
  border-radius: 10px;
  width: 100%;
  padding: 8px;
}

.info_note {
  margin-top: 20px;
}

.timepicker {
  font-family: 'noto_sans';
  font-size: 14px;
  padding: 10.5px 8px 10.5px 22px !important;
}

.join_state {
  display: flex;
}


.custom-time-picker-dropdown .ant-picker-input {
  width: 85% !important;
  /* 원하는 너비로 설정 */
}

.custom-time-picker-dropdown .ant-picker-input input {
  width: 100% !important;
  /* input 필드 너비 조정 */
}

.regular_holiday {
  display: flex;
  justify-content: space-between;
}

.regular_holiday .for_select {
  width: 45%;
}

select {
  width: 100%;
}

.join_state {
  display: flex;
  gap: 10px;
  justify-content: center;
  width: 100%;
}

.join_obj {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid #b1b1b1;
  /* 테두리 색상 */
  border-radius: 50%;
  /* 동그란 원 */
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 16px;
  color: #b1b1b1;
  text-align: center;
  user-select: none;
  /* 텍스트 선택 불가능 */
}

.join_obj input[type="radio"] {
  display: none;
  /* 라디오 버튼 숨기기 */
}

.join_obj span {
  pointer-events: none;
  /* 텍스트 클릭 비활성화 */
}

/* 선택된 상태에서 스타일 */
.join_obj input[type="radio"]:checked+span {
  background-color: #1749c2;
  /* 선택된 상태의 배경색 */
  color: white;
  /* 선택된 상태의 텍스트 색상 */
  border-radius: 50%;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}



.temporary_Closure {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.ant-picker {
  width: 100%;
}

.save_btn{
  width: 100%;
  margin: 15px 0;
  padding: 8px 0;
  border-radius: 5px;
  border: 0;
  background-color: #1749c2;
  color: white;
}


@media (max-width: 360px) {
  .join_state {
  gap: 5px;
  }

}


</style>