const signupBtn = document.querySelector('.signup-submit');
const nickname = document.querySelector('.s-nickname-input');
const email = document.querySelector('.s-email-input');
const password = document.querySelector('.s-password-input');
const passwordCheck = document.querySelector('.s-check-password-input');



signupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const userData = {
        nickname: nickname.value,
        email: email.value,
        password: password.value,
        passwordCheck: passwordCheck.value,
    }

    fetch('/user/signup', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.error("로그인 중 에러 발생");
        });    

});

// 회원가입으로 api 만들고 다시 클래스로 정리해서 로그인에 재활용한다.