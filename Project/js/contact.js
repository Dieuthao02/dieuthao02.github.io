function toggleFaq(button) {
    const item = button.parentElement;
    
    document.querySelectorAll('.faq-item').forEach(i => {
        if (i !== item) i.classList.remove('active');
    });

    item.classList.toggle('active');

    const icon = button.querySelector('i');
    if (icon) {
        icon.className = item.classList.contains('active') 
            ? 'fa-solid fa-minus text-xs transition-transform' 
            : 'fa-solid fa-plus text-xs transition-transform';
    }
}


const chatbotToggler = document.getElementById('chatbotToggler');
const chatbotWindow = document.getElementById('chatbotWindow');
const closeChatBtn = document.getElementById('closeChatBtn');

if (chatbotToggler && chatbotWindow) {
    chatbotToggler.addEventListener('click', () => {
        if (chatbotWindow.classList.contains('hidden')) {
            chatbotWindow.classList.remove('hidden');
            chatbotWindow.classList.add('flex');
        } else {
            chatbotWindow.classList.add('hidden');
            chatbotWindow.classList.remove('flex');
        }
    });

    if (closeChatBtn) {
        closeChatBtn.addEventListener('click', () => {
            chatbotWindow.classList.add('hidden');
            chatbotWindow.classList.remove('flex');
        });
    }
}


const chatBody = document.getElementById('chatBody');
const chatInput = document.getElementById('chatInput');
const sendChatBtn = document.getElementById('sendChatBtn');
const quickActionBtns = document.querySelectorAll('.quick-action-btn');

const createChatLi = (message, className) => {
    const chatDiv = document.createElement("div");
    chatDiv.classList.add("chat-message", className);
    chatDiv.innerHTML = `<p class="p-3 rounded-2xl text-xs font-bold leading-relaxed ${className === 'user-message' ? 'bg-black text-white ml-auto' : 'bg-white text-gray-700 shadow-sm'}">${message}</p>`;
    return chatDiv;
}

const generateBotResponse = (userText) => {
    const text = userText.toLowerCase();
    if (text.includes('vé')) return "🎫 Bạn muốn mua vé hay kiểm tra vé đã đặt? Hãy xem mục 'Vé của tôi' nhé!";
    if (text.includes('thanh toán') || text.includes('lỗi')) return "💳 Nếu gặp lỗi trừ tiền, bạn gửi mã TID vào form liên hệ bên cạnh nha.";
    if (text.includes('lịch')) return "📅 Lịch sự kiện tháng này đã được cập nhật ở trang chủ rồi đó!";
    if (text.includes('hi') || text.includes('chào')) return "👋 Chào bạn! Elysium có thể giúp gì cho bạn?";
    return "🤖 Bạn kiểm tra ở lịch !";
};

const handleChat = (forcedText = null) => {
    const userMessage = (forcedText || chatInput.value).trim();
    if (!userMessage || !chatBody) return;

    chatInput.value = ""; 

    const userLi = createChatLi(userMessage, "user-message");
    chatBody.appendChild(userLi);
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: 'smooth' });

    setTimeout(() => {
        const botResponse = generateBotResponse(userMessage);
        const botLi = createChatLi(botResponse, "bot-message");
        chatBody.appendChild(botLi);
        chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: 'smooth' });
    }, 600);
}


if (sendChatBtn) {
    sendChatBtn.onclick = (e) => {
        e.preventDefault();
        handleChat();
    };
}

if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleChat();
        }
    });
}

if (quickActionBtns) {
    quickActionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const text = btn.innerText.trim();
            handleChat(text);
        });
    });
}


const contactForm = document.getElementById('contactForm');
if (contactForm) {
    const successModal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModalBtn');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); 

    
        const nameEl = document.getElementById('fullName') || document.querySelector('input[type="text"]');
        const emailEl = document.getElementById('emailAddress') || document.querySelector('input[type="email"]');
        const subjectEl = document.getElementById('subject') || document.querySelector('select');
        const messageEl = document.getElementById('message') || document.querySelector('textarea');

        const formData = {
            id: `TK-${Date.now()}`,
            name: nameEl ? nameEl.value : "Ẩn danh",
            email: emailEl ? emailEl.value : "Không có email",
            subject: subjectEl ? subjectEl.options[subjectEl.selectedIndex].text : "Vấn đề khác",
            message: messageEl ? messageEl.value : "",
            time: new Date().toLocaleTimeString(), 
            priority: "Cao"
        };

   
        let contactList = JSON.parse(localStorage.getItem('contact_messages')) || [];
        contactList.push(formData);
        localStorage.setItem('contact_messages', JSON.stringify(contactList));

      
        if (successModal) {
            successModal.classList.add('active');
        } else {
            alert('Gửi yêu cầu thành công!');
        }
        
        contactForm.reset();
    });

    if (closeModalBtn && successModal) {
        closeModalBtn.addEventListener('click', () => successModal.classList.remove('active'));
    }
}