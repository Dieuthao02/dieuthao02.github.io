document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm") || document.querySelector("form");
    const eyeBtn = document.querySelector('.toggle_password');
    const passwordInput = document.getElementById('password') || document.querySelector('input[name="password"]');

 
    if (eyeBtn && passwordInput) {
        eyeBtn.addEventListener('click', () => {
            const isPass = passwordInput.type === 'password';
            passwordInput.type = isPass ? 'text' : 'password';
            eyeBtn.textContent = isPass ? '🙈' : '👁️';
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

           
            const userVal = loginForm.querySelector('input[name="username"]').value.trim();
            const passVal = passwordInput.value;

       
            const customers = JSON.parse(localStorage.getItem('flower_customers')) || [];

            
            const user = customers.find(u => u.username === userVal);

            if (!user) {
                alert("Tài khoản không tồn tại! Kiểm tra lại tên đăng nhập dcm.");
                return;
            }

        
            if (user.password === passVal) {
                alert("Đăng nhập thành công! Chào mừng " + (user.name || user.username));
                
            
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("currentUser", JSON.stringify(user));

               
                window.location.href = "index.html"; 
            } else {
                alert("Mật khẩu không chính xác!");
                
                if (typeof shake === "function") shake(loginForm);
            }
        });
    }
});

function shake(el) {
    el.animate([
        { transform: "translateX(0)" },
        { transform: "translateX(-6px)" },
        { transform: "translateX(6px)" },
        { transform: "translateX(0)" }
    ], { duration: 300 });
}