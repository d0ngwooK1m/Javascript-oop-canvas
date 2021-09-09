//회원가입 API
const signupBtn = document.querySelector('.signup-submit');
const nickname = document.querySelector('.s-nickname-input');
const emailSignup = document.querySelector('.s-email-input');
const passwordSignup = document.querySelector('.s-password-input');
const passwordCheck = document.querySelector('.s-check-password-input');

signupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const userData = {
        nickname: nickname.value,
        email: emailSignup.value,
        password: passwordSignup.value,
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
            alert("회원가입이 완료되었습니다!");
            window.location.href = '/';
        })
        .catch((error) => {
            console.error("로그인 중 에러 발생");
        });    

});

//로그인 API
const loginBtn = document.querySelector(".login-submit");
const emailLogin = document.querySelector(".l-email-input");
const passwordLogin = document.querySelector(".l-password-input");

loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const loginData = {
        email: emailLogin.value,
        password: passwordLogin.value,
    }

    fetch('/user/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
    })
        .then((response) => response.json())
        .then((response) => {
            console.log(response)
            window.location.href = '/dashboard';
        })
        .then((error) => {
            console.error(error);
        })
})





