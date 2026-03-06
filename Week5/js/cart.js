
let cart = JSON.parse(localStorage.getItem("cart") || "[]");


const panel = document.createElement("div");
panel.id = "cart-panel";
document.body.appendChild(panel);

const invoiceModal = document.createElement("div");
invoiceModal.id = "invoice-modal";
document.body.appendChild(invoiceModal);



const cartIcon = document.getElementById("cart-icon");
if(cartIcon) {
    cartIcon.onclick = (e) => {
        e.preventDefault();
        panel.classList.add("open");
    };
}


document.addEventListener("click", e => {
    if (e.target.classList.contains("fake-btn")) {
        const product = e.target.closest(".product");
        const item = {
            name: product.querySelector(".name").innerText,
            price: parseFloat(e.target.dataset.price || 20),
            img: product.querySelector("img").src,
            qty: 1
        };
        addToCart(item);
    }
});

function addToCart(item) {
    const exist = cart.find(p => p.name === item.name);
    if (exist) exist.qty++;
    else cart.push(item);
    
    save();
    showPopup("Added: " + item.name); 
    shakeCart();
}

function save() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
}

function updateCartUI() {
    const count = cart.reduce((a, b) => a + b.qty, 0);
    const cartCountEl = document.getElementById("cart-count");
    if(cartCountEl) cartCountEl.innerText = count;

    let total = 0;
    panel.innerHTML = `
        <div class="cart-header">
            <h2 style="color:#c9a96e">Selection</h2>
            <span id="close-cart" style="cursor:pointer; font-size:24px">✕</span>
        </div>
        <div class="cart-items-list" style="flex:1; overflow-y:auto">
            ${cart.map((item, i) => {
                total += item.price * item.qty;
                return `
                <div class="cart-item">
                    <img src="${item.img}">
                    <div style="flex:1">
                        <strong>${item.name}</strong>
                        <div style="margin:5px 0">
                            <button onclick="changeQty(${i},-1)">-</button>
                            <span style="margin:0 10px">${item.qty}</span>
                            <button onclick="changeQty(${i},1)">+</button>
                        </div>
                        <p style="color:#c9a96e">$${(item.price * item.qty).toFixed(2)}</p>
                    </div>
                </div>`;
            }).join('')}
        </div>
        <div style="padding:20px 0; border-top:1px solid #333">
            <h3 style="display:flex; justify-content:space-between">Total: <span>$${total.toFixed(2)}</span></h3>
            <button id="checkout-btn">GENERATE INVOICE</button>
        </div>
    `;

    const closeBtn = document.getElementById("close-cart");
    if(closeBtn) closeBtn.onclick = () => panel.classList.remove("open");
    
    const checkoutBtn = document.getElementById("checkout-btn");
    if(checkoutBtn) checkoutBtn.onclick = showInvoice;
}
function showInvoice() {
    if (cart.length === 0) return alert("Giỏ hàng đang trống!");
    
    panel.classList.remove("open");
    invoiceModal.style.display = "flex";
    document.body.style.overflow = "hidden"; 

   
    const finalTotalValue = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    const itemsHTML = cart.map(item => {
        return `<div style="display:flex; justify-content:space-between; margin-bottom:8px; border-bottom: 1px dashed #eee;">
                    <span>${item.name} x${item.qty}</span>
                    <span>$${(item.price * item.qty).toFixed(2)}</span>
                </div>`;
    }).join('');

    const orderCode = "FS" + Math.floor(Math.random() * 10000);
    const qrUrl = "../img/QR.jpg"; 

    invoiceModal.innerHTML = `
        <div class="invoice-box" id="printable-invoice" style="background:white; padding:30px; border-radius:15px; width:400px; color:black; margin: auto; position: relative; z-index: 10001;">
            <h2 style="text-align:center; color:#c9a96e; margin:0;">FLOWER SHOP</h2>
            
            <p style="text-align: center; font-size: 14px; font-weight: bold; margin: 0; padding: 1px 0;">HÓA ĐƠN THANH TOÁN</p>
            
            <div style="margin: 20px 0; border-top: 2px solid #333; padding-top: 10px;">
                <p style="font-size:12px;">Mã đơn: <strong>${orderCode}</strong></p>
                <p style="font-size:12px;">Ngày: ${new Date().toLocaleDateString()}</p>
                <p style="font-size:12px;">Store: 123 Luxury St, Ha Nam</p>
            </div>

            <div style="margin-bottom:20px;">
                ${itemsHTML}
                <div style="margin-top:10px; display:flex; justify-content:space-between; font-weight:bold; font-size:18px; border-top: 1px solid #333; padding-top:10px;">
                    <span>TỔNG CỘNG:</span>
                    <span id="invoice-total-display">$${finalTotalValue.toFixed(2)}</span>
                </div>
            </div>

            <div style="text-align:center; margin-bottom:20px;">
                <img src="${qrUrl}" alt="QR Code" class="qr-image" id="qr-to-zoom" style="width:150px; border:1px solid #eee;">
                <p style="font-size:11px; color:#666;" class="no-print">(Bấm để phóng to)</p>
            </div>

            <div class="no-print" style="display:flex; gap:10px; justify-content: center;">
                <button onclick="window.print()" style="flex: 1; padding:12px 5px; background:#c9a96e; color:white; border:none; border-radius:8px; cursor:pointer; font-weight:bold; font-size:14px;">IN HÓA ĐƠN</button>
                <button id="final-confirm-btn" style="flex: 1; padding:12px 5px; background:#1f1f1f; color:white; border:none; border-radius:8px; cursor:pointer; font-weight:bold; font-size:14px;">XÁC NHẬN</button>
            </div>
            <button class="no-print" onclick="closeInvoice()" style="width:100%; margin-top:15px; border:none; background:none; color:#999; cursor:pointer; font-size:12px;">Quay lại</button>
        </div>
        <div id="qr-overlay" class="qr-overlay no-print"></div>
    `;


    const btnConfirm = document.getElementById("final-confirm-btn");
    if (btnConfirm) {
        btnConfirm.onclick = () => {
            window.finishOrder(orderCode, finalTotalValue);
        };
    }
    const qrImg = document.getElementById("qr-to-zoom");
    const qrOverlay = document.getElementById("qr-overlay");
    qrImg.onclick = function() {
        this.classList.toggle("zoomed");
        qrOverlay.classList.toggle("show");
    };
    qrOverlay.onclick = function() {
        qrImg.classList.remove("zoomed");
        this.classList.remove("show");
    };
}


window.finishOrder = function(code, totalVal) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    
    if (!currentUser) {
        alert("Bạn cần đăng nhập để lưu lịch sử giao dịch!");
        return;
    }

    
    const finalTotal = totalVal || cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    const newOrder = {
        id: code,
        customerName: currentUser.name || currentUser.username,
        date: new Date().toLocaleString('vi-VN'),
        items: cart.map(item => `${item.name} (x${item.qty})`),
        total: finalTotal.toFixed(2), 
        status: "Thành công"
    };

    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));

    alert("Cảm ơn " + (currentUser.name || currentUser.username) + "! Giao dịch " + code + " đã được lưu.");
    
    cart = [];
    save();
    closeInvoice();
}

window.closeInvoice = function() {
    invoiceModal.style.display = "none";
    document.body.style.overflow = "auto";
};

window.changeQty = (i, d) => {
    cart[i].qty += d;
    if (cart[i].qty <= 0) cart.splice(i, 1);
    save();
};

function showPopup(msg) {
    const p = document.createElement("div");
    p.className = "cart-popup show";
    p.innerText = msg;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 2000);
}

function shakeCart() {
    const icon = document.getElementById("cart-icon");
    if(icon) {
        icon.style.animation = "shake-cart 0.4s";
        setTimeout(() => icon.style.animation = "", 400);
    }
}


function initUserMenu() {
    const menuTop = document.querySelector("#menu_top .level1") || document.querySelector(".level1");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser && menuTop) {
       
        const oldLinks = menuTop.querySelectorAll('a[href*="login"], a[href*="dangky"]');
        oldLinks.forEach(link => link.closest('li')?.remove());

   
        menuTop.style.display = "flex";
        menuTop.style.alignItems = "center";
        menuTop.style.justifyContent = "center"; 

        const userHtml = `
            <li class="user-dropdown-container" style="list-style: none; margin: 0; padding: 0; display: flex; align-items: center;">
                <a href="javascript:void(0)" id="user-btn-trigger" style="
                    color: #ff69b4 !important; 
                    font-weight: bold; 
                    text-decoration: none;
                    padding: 0 15px; 
                    font-size: 14px; /* Chỉnh lại cho bằng font Home/Contact của ông */
                    display: flex;
                    align-items: center;
                    height: 100%;
                    cursor: pointer;
                    white-space: nowrap;
                ">
                    👤 Chào, ${currentUser.name || currentUser.username}
                </a>
            </li>`;
        
        menuTop.insertAdjacentHTML('beforeend', userHtml);

    
      
        const submenu = document.createElement("ul");
        submenu.id = "user-fixed-submenu";
        submenu.style.cssText = `
            display: none; 
            position: fixed; 
            background: #ffffff; 
            min-width: 170px; 
            box-shadow: 0 10px 25px rgba(0,0,0,0.3); 
            z-index: 9999999999; 
            padding: 5px 0; 
            margin: 0; 
            list-style: none; 
            border-radius: 4px; 
            border: 1px solid #ddd;
            margin-top: 15px !important; 
        `;

        submenu.style.setProperty('--before-height', '20px'); 
        const styleSheet = document.createElement("style");
        styleSheet.innerText = `
            #user-fixed-submenu::before {
                content: "";
                position: absolute;
                top: -20px; /* Bằng hoặc lớn hơn margin-top để nối liền */
                left: 0;
                width: 100%;
                height: 20px;
                background: transparent;
            }
        `;
        document.head.appendChild(styleSheet);
        submenu.innerHTML = `
            <li style="display:block;"><a href="history.html" style="color: #333; display: block; padding: 12px 15px; text-decoration: none; font-size: 15px;">📜 Lịch sử giao dịch</a></li>
            <li style="display:block;"><a href="#" id="logoutBtnFixed" style="color: #e74c3c; display: block; padding: 12px 15px; text-decoration: none; font-size: 15px; font-weight: bold;">Logout</a></li>
        `;
        document.body.appendChild(submenu);

        const trigger = document.getElementById("user-btn-trigger");
        trigger.onmouseenter = () => {
            const rect = trigger.getBoundingClientRect();
            submenu.style.top = rect.bottom + "px";
            submenu.style.left = rect.left + "px";
            submenu.style.display = "block";
        };
        submenu.onmouseenter = () => submenu.style.display = "block";
        
        const hideMenu = (e) => {
            if (!trigger.contains(e.relatedTarget) && !submenu.contains(e.relatedTarget)) {
                submenu.style.display = "none";
            }
        };
        trigger.onmouseleave = hideMenu;
        submenu.onmouseleave = hideMenu;

        document.getElementById("logoutBtnFixed").onclick = (e) => {
            e.preventDefault();
            localStorage.removeItem("currentUser");
            window.location.reload();
        };
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initUserMenu);
} else {
    initUserMenu();
}

updateCartUI();