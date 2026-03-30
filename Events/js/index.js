    const searchInput = document.getElementById('search-input');
    const suggestions = document.getElementById('search-suggestions');

    // Hiện bảng gợi ý khi click vào ô input
    searchInput.addEventListener('focus', () => {
        suggestions.style.display = 'block';
    });

    // Ẩn bảng gợi ý khi click ra ngoài
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !suggestions.contains(e.target)) {
            suggestions.style.display = 'none';
        }
    });

    // Giả lập tìm kiếm
    searchInput.addEventListener('input', (e) => {
        if(e.target.value.length > 0) {
            // Bạn có thể lọc dữ liệu ở đây
            console.log("Đang tìm:", e.target.value);
        }
    });