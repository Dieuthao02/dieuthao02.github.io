document.addEventListener("DOMContentLoaded", () => {
 
    const registrationForm = document.querySelector("form");
    const passwordInput = document.querySelector('input[name="password"]');
    const eyeBtn = document.querySelector('.toggle_password');

  
    if (eyeBtn && passwordInput) {
        eyeBtn.addEventListener('click', function () {
         
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            
            
            this.textContent = isPassword ? '🙈' : '👁️';
        });
    }

  
    if (passwordInput) {
        const barContainer = document.createElement("div");
        barContainer.className = "strength-bar-container";
        barContainer.style.cssText = "width:100%; height:4px; background:rgba(255,255,255,0.1); margin-top:-10px; margin-bottom:20px; border-radius:2px; overflow:hidden;";
        
        const barInner = document.createElement("div");
        barInner.style.cssText = "width:0%; height:100%; transition:all 0.4s ease;";
        barContainer.appendChild(barInner);
        
       
        passwordInput.parentNode.insertBefore(barContainer, passwordInput.nextSibling);

        passwordInput.addEventListener("input", () => {
            const val = passwordInput.value;
            let score = 0;
            if (val.length > 5) score++;
            if (/[A-Z]/.test(val)) score++;
            if (/[0-9]/.test(val)) score++;
            if (/[^A-Za-z0-9]/.test(val)) score++;

       
            barInner.style.width = (score * 25) + "%";
            barInner.style.background = 
                score <= 1 ? "#ff4d4d" : 
                score == 2 ? "#ffa500" : 
                score == 3 ? "#f0d000" : "#4cd964";
        });
    }

 
    if (registrationForm) {
    registrationForm.addEventListener("submit", (e) => {
        e.preventDefault(); 

       
        const fullname = registrationForm.querySelector('input[name="fullname"]')?.value.trim(); 
        
        const username = registrationForm.querySelector('input[name="username"]')?.value.trim();
        const password = passwordInput?.value;
        const email = registrationForm.querySelector('input[name="email"]')?.value.trim();
        const phone = registrationForm.querySelector('input[name="phone"]')?.value.trim();
        const address = registrationForm.querySelector('input[name="address"]')?.value.trim() || "Chưa xác định";
        
        const message = registrationForm.querySelector('input[name="message"]')?.value.trim() || "";

    
        if (!fullname) {
            alert("Vui lòng nhập Họ và Tên!");
            return;
        }
        if (!username || username.length < 3) {
            alert("Tên đăng nhập phải có ít nhất 3 ký tự!");
            return;
        }
        if (!password || password.length < 6) {
            alert("Mật khẩu phải có ít nhất 6 ký tự!");
            return;
        }

    
        const newUser = {
            id: Date.now(),
            name: fullname,    
            username: username, 
            password: password,
            email: email,
            phone: phone,
            address: address,
            message: message,  
            date: new Date().toLocaleString('vi-VN')
        };

    
        let customers = JSON.parse(localStorage.getItem('flower_customers')) || [];

        if (customers.some(user => user.username === username)) {
            alert("Tên đăng nhập này đã tồn tại!");
            return;
        }

        customers.push(newUser);
        localStorage.setItem('flower_customers', JSON.stringify(customers));
        
        showSuccessMessage();
        registrationForm.reset();
        
        const barInner = document.querySelector(".strength-bar-container div");
        if (barInner) {
            barInner.style.width = "0%";
        }
    });
}

    function showSuccessMessage() {
        const box = document.createElement("div");
        box.style.cssText = `
            position: fixed; top: 20px; right: 20px; 
            background: #4cd964; color: white; padding: 15px 25px; 
            border-radius: 10px; z-index: 9999; box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            animation: slideIn 0.5s ease forwards;
        `;
        box.innerText = "✔ Đăng ký thành công!";
        document.body.appendChild(box);

        setTimeout(() => {
            box.style.animation = "slideOut 0.5s ease forwards";
            setTimeout(() => box.remove(), 500);
        }, 3000);
    }
});

const style = document.createElement('style');
style.innerHTML = `
    @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }
`;
document.head.appendChild(style);



        
