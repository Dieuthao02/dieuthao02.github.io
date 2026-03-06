
const container = document.createElement("div");
container.id = "petals";
document.body.appendChild(container);

function createPetal() {
    const p = document.createElement("div");
    p.className = "petal";
    const size = Math.random() * 14 + 10;
    p.style.width = size + "px";
    p.style.height = size + "px";
    p.style.left = Math.random() * 100 + "vw";
    p.style.animationDuration = 6 + Math.random() * 8 + "s";
    container.appendChild(p);
    setTimeout(() => p.remove(), 14000);
}
setInterval(createPetal, 400);

function successEffect() {
    const ok = document.createElement("div");
    ok.innerText = "✔ Đã gửi tin nhắn thành công!";
    ok.style.cssText = `
        position: fixed; top: 40px; left: 50%; transform: translateX(-50%);
        background: #4cd964; color: #fff; padding: 12px 28px;
        border-radius: 30px; boxShadow: 0 10px 30px rgba(0,0,0,.4);
        z-index: 9999; font-weight: bold; animation: slideIn 0.5s ease;
    `;
    document.body.appendChild(ok);
    setTimeout(() => {
        ok.style.opacity = "0";
        ok.style.transition = "0.5s";
        setTimeout(() => ok.remove(), 500);
    }, 2500);
}


function shake(el) {
    el.animate([
        { transform: "translateX(0)" },
        { transform: "translateX(-6px)" },
        { transform: "translateX(6px)" },
        { transform: "translateX(0)" }
    ], { duration: 300 });
}


document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm") || document.querySelector("form");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

 
    if (contactForm && currentUser) {
        if (contactForm.fullname) contactForm.fullname.value = currentUser.name || currentUser.username;
        if (contactForm.email && currentUser.email) contactForm.email.value = currentUser.email;
    }

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

        
            const activeUser = JSON.parse(localStorage.getItem("currentUser"));
            
            const inputName = contactForm.fullname.value.trim();
            const msg = contactForm.message.value.trim();
            const email = contactForm.email ? contactForm.email.value.trim() : "N/A";
            const phone = contactForm.phone ? contactForm.phone.value.trim() : "N/A";

         
            if (inputName.length < 2) {
                shake(contactForm.fullname);
                return alert("Vui lòng nhập họ tên");
            }
            if (msg.length < 5) {
                shake(contactForm.message);
                return alert("Nội dung lời nhắn quá ngắn");
            }

    
            const finalAccount = activeUser ? activeUser.username : "Khách liên hệ";

            const newContactEntry = {
                id: Date.now(),
                username: finalAccount, 
                name: inputName, 
                email: email,
                phone: phone,
                address: "Gửi từ trang Liên hệ",
                message: msg,
                date: new Date().toLocaleString('vi-VN')
            };

          
            let customers = JSON.parse(localStorage.getItem('flower_customers')) || [];
            customers.push(newContactEntry);
            localStorage.setItem('flower_customers', JSON.stringify(customers));

            successEffect();
            
            contactForm.message.value = ""; 
            if (!activeUser) contactForm.reset();
        });
    }
});


const style = document.createElement('style');
style.innerHTML = `
    @keyframes slideIn { 
        from { transform: translate(-50%, -100%); opacity: 0; } 
        to { transform: translate(-50%, 0); opacity: 1; } 
    }
`;
document.head.appendChild(style);

function initUserMenu() {
   
    const menuTop = document.querySelector("#menu_top .level1") || document.querySelector(".level1");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser && menuTop) {
        
        const oldLinks = menuTop.querySelectorAll('a[href*="login"], a[href*="dangky"]');
        oldLinks.forEach(link => link.closest('li')?.remove());

      
        const userHtml = `
            <li class="user-dropdown-container" style="position: relative; list-style: none; display: inline-block; vertical-align: middle;">
                <a href="javascript:void(0)" style="color: #ff69b4 !important; font-weight: bold; text-decoration: none; padding: 0 15px; display: inline-block; cursor: pointer;">
                    👤 Tài khoản của bạn
                </a>
                <ul class="user-submenu" style="
                    display: none; 
                    position: absolute; 
                    top: 100%; 
                    left: 0; 
                    background: #fff; 
                    min-width: 170px; 
                    box-shadow: 0 8px 16px rgba(0,0,0,0.2); 
                    z-index: 999999; 
                    padding: 5px 0;
                    margin: 0;
                    list-style: none;
                    border-radius: 4px;
                    border: 1px solid #eee;
                    text-align: left;
                ">
            
                    <li style="margin: 0;">
    <a href="#" id="logoutBtn" style="color: #e74c3c; display: block; padding: 10px 15px; text-decoration: none; font-size: 13px; font-weight: bold;">
        Logout</a></li>
                </ul>
            </li>`;
        
        menuTop.insertAdjacentHTML('beforeend', userHtml);

        const container = menuTop.querySelector(".user-dropdown-container");
        const submenu = menuTop.querySelector(".user-submenu");
        if (container && submenu) {
            container.onmouseenter = () => submenu.style.display = "block";
            container.onmouseleave = () => submenu.style.display = "none";
        }

    
        const logoutBtn = document.getElementById("logoutBtn");
        if (logoutBtn) {
            logoutBtn.onclick = (e) => {
                e.preventDefault();
                if (confirm("Bạn có chắc chắn muốn đăng xuất?")) {
                    localStorage.removeItem("currentUser");
                    localStorage.removeItem("isLoggedIn");
                    window.location.reload();
                }
            };
        }
    }
}


initUserMenu();