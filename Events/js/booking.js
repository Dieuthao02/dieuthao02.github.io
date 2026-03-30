  const seats = document.querySelectorAll('.seat-available');
        const listDisplay = document.getElementById('selected-seats-list');
        const priceDisplay = document.getElementById('total-price');
        const confirmBtn = document.getElementById('confirm-booking');
        const modal = document.getElementById('payment-modal');
        const finalPriceDisplay = document.getElementById('final-price');

        let selectedSeats = [];
        let totalPrice = 0;

        seats.forEach(seat => {
            seat.addEventListener('click', () => {
                const seatId = seat.getAttribute('data-id');
                const price = parseInt(seat.parentElement.getAttribute('data-price'));

                if (seat.classList.contains('seat-selected')) {
                    seat.classList.remove('seat-selected');
                    selectedSeats = selectedSeats.filter(id => id !== seatId);
                    totalPrice -= price;
                } else {
                    seat.classList.add('seat-selected');
                    selectedSeats.push(seatId);
                    totalPrice += price;
                }
                listDisplay.innerText = selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Chưa chọn';
                priceDisplay.innerText = totalPrice.toLocaleString('vi-VN') + ' đ';
            });
        });

        confirmBtn.onclick = () => {
            if (selectedSeats.length === 0) {
                alert("Vui lòng chọn ghế trước khi thanh toán!");
                return;
            }
            finalPriceDisplay.innerText = totalPrice.toLocaleString('vi-VN') + ' đ';
            modal.style.display = 'flex';
        };

        function processPayment() {
            alert("Đang kết nối cổng thanh toán... \nChúc mừng! Bạn đã đặt vé thành công cho ghế: " + selectedSeats.join(', '));
            location.reload(); // Reset lại trang sau khi thanh toán
        }

        function closePayment() { modal.style.display = 'none'; }
        window.onclick = (e) => { if (e.target == modal) closePayment(); }