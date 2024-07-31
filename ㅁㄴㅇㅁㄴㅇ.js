function checkAnswer_exact(questionNumber, correctAnswerText, keywords) {
    const userAnswer = document.getElementById('answer' + questionNumber).value;
    const correctAnswerElement = document.getElementById('correctAnswer' + questionNumber);
    const answerResultElement = document.getElementById('answerResult' + questionNumber);

    // 정확한 일치 여부 확인 (대소문자 구분)
    let correct = false;

    if (userAnswer) {
        for (const keyword of keywords) {
            if (userAnswer.toLowerCase() == keyword) {
                correct = true;
                break;
            }
        }
        if (correct) {
            correctAnswerElement.innerHTML = correctAnswerText + ' (정확히 일치)';
            count++;
        } else {
            correctAnswerElement.innerHTML = '오답입니다. ' + questionNumber + '번 정답은 <br/>' + correctAnswerText;
        }

        answerResultElement.style.display = 'block';
        saveSessionData(); // 데이터를 저장하는 함수 호출
    }
}

let loginId = sessionStorage.getItem("loginId");
if (!loginId) {
    loginId = "user123"; // 기본값 설정
}

document.addEventListener('DOMContentLoaded', function () {
    let totalTime = sessionStorage.getItem("totalTime");
    totalTime = totalTime ? parseInt(totalTime, 10) : 0; // totalTime 초기화

    if (window.location.pathname.endsWith('project.html')) {
        document.querySelectorAll('textarea').forEach(textarea => {
            sessionStorage.removeItem(textarea.id);
        });
    }

    document.querySelectorAll('textarea').forEach(textarea => {
        const savedValue = sessionStorage.getItem(textarea.id);
        if (savedValue) {
            textarea.value = savedValue;
        }

        textarea.addEventListener('input', function () {
            sessionStorage.setItem(textarea.id, this.value);
        });
    });

    function updateTimer() {
        const timerElement = document.getElementById('timer'); //타이머
        const hours = Math.floor(totalTime / 3600); //시간
        const minutes = Math.floor((totalTime % 3600) / 60);
        const seconds = totalTime % 60;

        timerElement.textContent =
            `경과시간:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        if (totalTime < 2 * 60 * 60 + 30 * 60) { //제한시간 2시간 반
            totalTime++;
            sessionStorage.setItem("totalTime", totalTime); // totalTime 저장
            setTimeout(updateTimer, 1000); //1초씩 흘러감
        } else {
            alert(`제한시간이 경과되었습니다 ${count * 5}점 입니다.`);
        }
    }

    updateTimer();

    document.querySelectorAll('#menu a').forEach(link => { //메뉴이동 스크립트
        link.addEventListener('click', function (event) {
            const href = this.getAttribute('href');
            window.location.href = href;
        });
    });

    document.getElementById('menuButton').addEventListener('click', function () {
        const menu = document.getElementById('menu');
        menu.style.display = menu.style.display === 'none' ? 'flex' : 'none';
    });

    // 데이터를 세션 스토리지에 저장하는 함수
    function saveSessionData() {
        const sessionData = {
            loginId: loginId,
            totalTime: totalTime,
            count: count
        };
        sessionStorage.setItem("sessionData", JSON.stringify(sessionData));
    }

    // 페이지 로드 시 세션 데이터를 복원합니다.
    const savedSessionData = sessionStorage.getItem("sessionData");
    if (savedSessionData) {
        const parsedSessionData = JSON.parse(savedSessionData);
        loginId = parsedSessionData.loginId;
        totalTime = parsedSessionData.totalTime;
        count = parsedSessionData.count;
    }
});
