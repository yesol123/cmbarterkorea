⚙ 개발환경</br>
Framework : Vue.js</br>
Database : HediSQL,MariaDB</br>
</br>
## 🚨트러블 이슈 및 해결 방법

### PIN 번호 확인

| 설명 | 동영상 |
|------|--------|
| **[이슈]**<br>PIN 번호 확인 과정에서 EventBus를 사용하려 했으나 Vue.js 3.0 버전에서는 지원되지 않았습니다.<br><br> **[해결]** <br> 1. Pinia state 값에 사용자가 입력한 PIN 번호를 저장.<br> 2. action에서 async/await을 활용한 API 호출 함수로 기존에 저장된 PIN 번호 확인.<br> 3. 입력한 PIN과 기존에 저장된 PIN 번호가 일치하는지 확인 후 결제가 진행되도록 처리. | ![cm선물_핀번호 확인](https://github.com/user-attachments/assets/aad6de88-0730-442e-9bbe-604ebce4c068) |

---

### PG사 연결

| 설명 | 동영상 |
|------|--------|
| **[이슈]**<br>PG사 연결 시 Vue.js에서 데이터가 제대로 전달되지 않는 문제가 발생했습니다.<br><br> **[해결]**<br> Vue.js에서는 `window.TPO`로 불러와야지만 PG사 연동 API가 올바로 호출 가능함을 확인.<br> 필수 데이터인 PG사 명령어를 `data` 값에 추가하고 `this`를 통해 참조하도록 수정하여 문제를 해결.<br>![image](https://github.com/user-attachments/assets/9c89a0d0-732a-4110-8f3c-f0bf5e5ed8e7) ![image](https://github.com/user-attachments/assets/5231d75a-359b-4103-8800-ea34a415e9ce)<br> |  ![pg사 붙이기 작업](https://github.com/user-attachments/assets/857822a0-e4ed-4ec4-a3e2-c1f8618083e5) |

---


### 다크모드

| 설명 | 동영상 |
|------|--------|
| **[이슈]**<br>사람들이 사용하는 핸드폰 모드가 달라 `<input>` 태그 등 글씨가 보이지 않는 문제가 발생했습니다.<br><br> **[해결]**<br> `index.html`에서 다크모드의 주요 스타일을 수정한 후, 각 페이지별로 필요한 CSS 작업을 진행했습니다.<br>  특히 입력 필드, 버튼, 배경색 대비를 고려하여 가독성을 높이는 방향으로 개선했습니다.<br>  <br>**[피드백]**<br>다크모드를 구현하면서, 단순한 색상 반전이 아니라 사용자의 시력 보호와 화면 눈부심 정도까지 고려해야 한다는 점을 깨달았습니다.<br> 적절한 명암비와 컬러톤을 조정하여, 낮은 조도 환경에서도 눈이 편안한 UI를 구성하는 것이 중요함을 다시 한 번 느꼈습니다. | ![다크모드](https://github.com/user-attachments/assets/108e776a-4f53-473e-8fdd-5ce2011b69f8) |

---


### Global.css

[이슈]</br>이미 진행 중이던 프로젝트에 투입되었는데, 각 페이지의 태그와 마크업 스타일이 달라 CSS 작업 시 비효율성이 높았습니다.</br>

[해결] </br>페이지의 구조를 아래와 같이 `<header>`와 `<section>` 태그로 통일한 후, `index.html`에서 CSS를 조정하여 해결했습니다.<br>
<br>[피드백]<br> 개발자로서 프로젝트 구상 시 협업자들과의 회의가 초기 세팅을 위해 굉장히 중요하다는 점을 느꼈습니다.



