<?php
    // db와 연결하여 변수에 담기
    $con = mysqli_connect("localhost", "root", "", "shopping_data");	// DB 연결

    // SQL문 작성하여 변수에 담기
    $sql = "SELECT * FROM category;";

    // db에 sql문을 요청해서 결과값 받기
    $result = mysqli_query($con, $sql);

    // db의 각 튜플들을 순회하기
    while($row = mysqli_fetch_assoc($result))
    {
        // 튜플의 각 셀의 값들을 변수에 저장
        $category_no = $row["category_no"]; 
        $category_name = $row["category_name"]; 

        // 화면에 출력
        echo "번호 : $category_no , 이름 : $category_name<br/>";
    }


    // 제가 아는걸로 주석을 작성해밧는데 이 코드들 이해 되실까요?
    // 신기하네요..
    // 그럼 db에 있는 데이터들을 sql문으로 불러와서 웹페이지에 뿌려주는 과정이라고 이해하면 될까요?

    // 네 맞아여 일단 제가 저거를 바로 api로 받는거를 알려드리면 조금 복잡할거 같아서 이부분 먼저 설명드리려구여 
    // 좋아요 지금 짜주신거는 조금 봐야할 거 같아용 ㅠㅜ

    
?>