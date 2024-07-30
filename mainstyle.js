const loginButton = document.getElementById("loginButton");
    const userButton = document.getElementById("userButton");
    const userMenu = document.getElementById("userMenu");
    const loginMenu = document.getElementById('loginMenu');
    const joinMenu = document.getElementById('joinMenu');

    const joinClose = document.getElementById('joinClose')

    
    let userName = document.getElementById('userName');
    let userEmail = document.getElementById('userEmail');

    const savedUsername = localStorage.getItem('users');
    if(savedUsername === null){
        localStorage.setItem('users',JSON.stringify(User.items));
        console.log(JSON.parse(localStorage.getItem('users')));
    }

//     window.onload = function() {
//     if(i==0){

//         localStorage.setItem('users',JSON.stringify(User.items));
//         console.log(JSON.parse(localStorage.getItem('users')));
//         i=1;
// }
//     }


    function join() {
        const joinId = document.getElementById('joinId').value;
        const joinPwd = document.getElementById('joinPwd').value;
        const joinPwdChk = document.getElementById('joinPwdChk').value;
        const joinName = document.getElementById('joinName').value;
        const joinBirthDate = document.getElementById('joinBirthDate').value;
        const joinEmail = document.getElementById('email-select').value === "선택"
         ? document.getElementById('joinEmail').value 
         : document.getElementById('joinEmail').value + '@' + document.getElementById('email-select').value;

        // // 입력 값 검증
        // if (joinId === "") {
        //     alert("아이디를 입력하세요");
        //     return;
        // } else if (joinId.length < 8 || joinId.length > 15) {
        //     alert("아이디는 8자 이상 15자 이하로 입력하세요");
        //     return;
        // } else if (joinPwd === "") {
        //     alert("비밀번호를 입력하세요");
        //     return;
        // } else if (joinPwd !== joinPwdChk) {
        //     alert('비밀번호가 일치하지 않습니다.');
        //     return;
        // } else if (joinName === "") {
        //     alert("이름을 입력하세요");
        //     return;
        // } else if (joinBirthDate === "") {
        //     alert("생년월일을 입력하세요");
        //     return;
        // } else if (joinEmail === "") {
        //     alert("이메일을 입력하세요");
        //     return;
        // }
            
            let idExist = false;
            
            console.log(JSON.parse(localStorage.getItem('users')));
            var storedUsers = JSON.parse(localStorage.getItem('users'));
            storedUsers.forEach(user =>{

                if (user.id === joinId) {
                    idExist = true;
                }
            });


            if (idExist) {
                alert('존재하는 아이디입니다');
                return;
            } 
            else{
                User.id = joinId;
            User.password = joinPwd;
            
            User.items.push({
                id: joinId,
                pwd: joinPwd,
                name: joinName,
                birthDate: joinBirthDate,
                email: joinEmail
            });

            // let loggedInUser = {};
            // User.items.forEach(user => { 
            //         loggedInUser = user;
            //         sessionStorage.setItem('json',JSON.stringify(loggedInUser));
            //         console.log(JSON.parse(sessionStorage.getItem('json')))
            // });
            localStorage.setItem('users',JSON.stringify(User.items));
            console.log(JSON.parse(localStorage.getItem('users')));

            alert('가입 성공!');
            document.getElementById('joinMenu').style.display = 'none';
            }
    };

    function toggleList(container, listId) {
        const list = document.getElementById(listId);
        list.style.display = list.style.display === 'none' || list.style.display === '' ? 'block' : 'none';
    };

    function logout(){

          loginButton.style.display = "block";
          userButton.style.display = "none";
          userMenu.style.display = "none";

    }

    loginButton.addEventListener('click', function () {
        if (loginMenu.style.display === 'block') {
            loginMenu.style.display = 'none';
            joinMenu.style.display = 'none';
        } else {
            loginMenu.style.display = 'block';
            joinMenu.style.display = 'none';
        }
    });
    userButton.addEventListener('click',function(){
        if(userMenu.style.display === 'none'){
            userMenu.style.display = 'block';
        } else {
            userMenu.style.display = 'none';
        }

    });

    joinClose.addEventListener('click', function () {
        joinMenu.style.display = 'none';
    });

    document.getElementById('join').addEventListener('click', function () {
        var joinMenu = document.getElementById('joinMenu');
        var loginMenu = document.getElementById('loginMenu');
        if (joinMenu.style.display === 'block') {
            joinMenu.style.display = 'none';
        } else {
            joinMenu.style.display = 'block';
            loginMenu.style.display = 'none';
        }
    });
    function addEmail() {
        var email_select = document.getElementById("email-select");
        var joinEmail = document.getElementById("joinEmail");

        var selectedValue = email_select.options[email_select.selectedIndex].value;
        var selectedText = email_select.options[email_select.selectedIndex].text;

        if (selectedValue === "선택") {
            joinEmail.value = "";
        } else {
            var currentEmail = joinEmail.value;
            var atIndex = currentEmail.indexOf("@");

            if (atIndex !== -1) {
            joinEmail.value = currentEmail.slice(0, atIndex) + "@" + selectedText;
            } else {
            joinEmail.value = currentEmail + "@" + selectedText;
            }
        }
}


    function login(event) {
    const loginId = document.querySelector("#loginMenu #loginId")
    const loginPwd = document.querySelector("#loginMenu #loginPwd")
        event.preventDefault(); // 기본 폼 제출 동작 막기
        

            let loginSuccess = false;
            let loggedInUser = {};

            
            // JSON.parse(sessionStorage.getItem('json')).forEach(user => {
            //     // console.log(JSON.parse(sessionStorage.getItem('json')))
            //     console.log(user);
            //     if (user.id === loginId.value && user.pwd === loginPwd.value) {
            //         loginSuccess = true;
            //         loggedInUser = user;
            //     }
            // });
            console.log(JSON.parse(localStorage.getItem('users')));
            var storedUsers = JSON.parse(localStorage.getItem('users'));
            storedUsers.forEach(user =>{

                if (user.id === loginId.value && user.pwd === loginPwd.value) {
                    loginSuccess = true;
                    loggedInUser = user;
                }
            });
            
            // User.items.forEach(user => {
            //     // console.log(JSON.parse(sessionStorage.getItem('json')))
            //     console.log(user);
            //     if (user.id === loginId.value && user.pwd === loginPwd.value) {
            //         loginSuccess = true;
            //         loggedInUser = user;
            //     }
            // });


            if (loginSuccess) {
                alert('로그인 성공!');
                loginId.value = "";
                loginPwd.value = "";

                document.getElementById('login-form').reset(); // 폼 제출
                userButton.style.display = 'block';
                loginButton.style.display = 'none';
                loginMenu.style.display = 'none';

                // 사용자 이름과 이메일 업데이트
                userName.textContent = loggedInUser.name;
                userEmail.textContent = loggedInUser.email;

            } else {
                alert('로그인 실패! 아이디 또는 비밀번호를 확인해주세요.');
            };
    }