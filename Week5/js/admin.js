
let currentView = 'customers';

function renderTable() {
    const tableBody = document.getElementById('customer-list');
    const tableHead = document.querySelector('.admin-table thead');
    const titleText = document.getElementById('title-text'); 
    
    const customers = JSON.parse(localStorage.getItem('flower_customers')) || [];

    if (currentView === 'customers') {
        if(titleText) titleText.innerText = "Danh sách khách hàng mới";
        tableHead.innerHTML = `
            <tr>
                <th>STT</th>
                <th>Tên tài khoản</th>
                <th>Họ và Tên</th>
                <th>Email</th>
                <th>Điện thoại</th>
                <th>Địa chỉ</th>
                <th>Thời gian</th>
                <th>Thao tác</th>
            </tr>`;
    } else {
        if(titleText) titleText.innerText = "Danh sách lời nhắn của khách";
        tableHead.innerHTML = `
            <tr>
                <th>STT</th>
                <th>Tên tài khoản</th>
                <th>Họ và Tên</th>
                <th>Lời nhắn</th>
                <th>Thời gian</th>
                <th>Thao tác</th>
            </tr>`;
    }

    
    if (customers.length === 0) {
        const colSpan = currentView === 'customers' ? 8 : 6;
        tableBody.innerHTML = `
            <tr>
                <td colspan="${colSpan}" style="text-align:center; color: #999;">
                    Đang chờ dữ liệu mới...
                </td>
            </tr>`;
        return;
    }


    tableBody.innerHTML = customers.map((user, index) => {
        if (currentView === 'customers') {
            
            return `
                <tr>
                    <td>${index + 1}</td>
                    <td>${user.username || 'N/A'}</td>
                    <td><strong>${user.name || 'N/A'}</strong></td>
                    <td>${user.email || 'N/A'}</td>
                    <td>${user.phone || 'N/A'}</td>
                    <td>${user.address || 'N/A'}</td>
                    <td><small>${user.date || 'Vừa xong'}</small></td>
                    <td>
                        <button class="btn-delete" onclick="deleteCustomer(${user.id})">Xóa</button>
                    </td>
                </tr>`;
        } else {
           
            return `
                <tr>
                    <td>${index + 1}</td>
                    <td>${user.username || 'N/A'}</td>
                    <td><strong>${user.name || 'N/A'}</strong></td>
                    <td style="color: #d81b60; font-style: italic;">${user.message || 'Không có lời nhắn'}</td>
                    <td><small>${user.date || 'Vừa xong'}</small></td>
                    <td>
                        <button class="btn-delete" onclick="deleteCustomer(${user.id})">Xóa</button>
                    </td>
                </tr>`;
        }
    }).join('');
}


document.addEventListener('DOMContentLoaded', () => {
    const btnCustomers = document.getElementById('manage-customers');
    const btnMessages = document.getElementById('manage-messages');

    if(btnCustomers) {
        btnCustomers.onclick = (e) => {
            e.preventDefault();
            currentView = 'customers';
            
            btnMessages.classList.remove('active');
            btnCustomers.classList.add('active');
            renderTable();
        };
    }

    if(btnMessages) {
        btnMessages.onclick = (e) => {
            e.preventDefault();
            currentView = 'messages';
            
            btnCustomers.classList.remove('active');
            btnMessages.classList.add('active');
            renderTable();
        };
    }

    renderTable(); 
});


window.addEventListener('storage', (e) => {
    if (e.key === 'flower_customers') {
        renderTable();
    }
});

window.deleteCustomer = function(id) {
   
    const targetId = Number(id);
    let customers = JSON.parse(localStorage.getItem('flower_customers')) || [];
    
    if (currentView === 'customers') {
        
        if (confirm("Xóa vĩnh viễn tài khoản này?")) {
            const updatedCustomers = customers.filter(user => Number(user.id) !== targetId);
            localStorage.setItem('flower_customers', JSON.stringify(updatedCustomers));
            renderTable();
        }
    } else {
       
        if (confirm("Xóa lời nhắn này?")) {
            let updatedCustomers = customers.map(user => {
                if (Number(user.id) === targetId) {
                    if (user.username === "KHÁCH LIÊN HỆ" || user.username === "CONTACT_PAGE" || user.username === "LienHe_Guest") {
                        return null;
                    }
    
                    return { ...user, message: "" };
                }
                return user;
            }).filter(user => user !== null); 

            localStorage.setItem('flower_customers', JSON.stringify(updatedCustomers));
            renderTable();
        }
    }
}