const team = [
            { name: "Diệu Thảo", role: "Founder & CEO", img: "Felix", bio: "Hơn 5 năm kinh nghiệm Fintech, dẫn dắt tầm nhìn chiến lược cho Elysium toàn cầu." },
            { name: "Minh Anh", role: "CTO", img: "Aneka", bio: "Chuyên gia bảo mật Blockchain, cựu kỹ sư cấp cao tại thung lũng Silicon." },
            { name: "Trà My", role: "Lead Dev", img: "Jack", bio: "Phù thủy Backend, người đảm bảo hệ thống luôn ổn định dưới áp lực hàng triệu user." },
            { name: "Tiến Thịnh", role: "Lead Designer", img: "B", bio: "Đam mê thiết kế tối giản, người kiến tạo nên ngôn ngữ hình ảnh đẳng cấp của Elysium." },
            { name: "Việt Công", role: "Marketing Lead", img: "C", bio: "Chuyên gia Branding & Digital Growth, đưa Elysium phủ sóng thị trường Đông Nam Á." },
            { name: "Minh Đạt", role: "Financial Specialist", img: "D", bio: "Quản lý dòng tiền và các giải pháp thanh toán thông minh tích hợp trên nền tảng." },
            { name: "Diệu Thảo", role: "Founder & CEO", img: "Felix", bio: "Hơn 5 năm kinh nghiệm Fintech, dẫn dắt tầm nhìn chiến lược cho Elysium toàn cầu." },
            { name: "Minh Anh", role: "CTO", img: "Aneka", bio: "Chuyên gia bảo mật Blockchain, cựu kỹ sư cấp cao tại thung lũng Silicon." },
            { name: "Trà My", role: "Lead Dev", img: "Jack", bio: "Phù thủy Backend, người đảm bảo hệ thống luôn ổn định dưới áp lực hàng triệu user." },
            { name: "Tiến Thịnh", role: "Lead Designer", img: "B", bio: "Đam mê thiết kế tối giản, người kiến tạo nên ngôn ngữ hình ảnh đẳng cấp của Elysium." },
            { name: "Việt Công", role: "Marketing Lead", img: "C", bio: "Chuyên gia Branding & Digital Growth, đưa Elysium phủ sóng thị trường Đông Nam Á." },
            { name: "Minh Đạt", role: "Financial Specialist", img: "D", bio: "Quản lý dòng tiền và các giải pháp thanh toán thông minh tích hợp trên nền tảng." }
        ];

        const jobs = [
            { id: 'fe', title: "Frontend Developer", cat: "Engineering", pay: "$1,500 - $3,000", color: "pink", req: "React/NextJS, Tailwind", ben: "Macbook Pro, Thưởng Quý" },
            { id: 'be', title: "Backend Engineer", cat: "Engineering", pay: "$1,800 - $3,500", color: "blue", req: "NodeJS, PostgreSQL", ben: "Bảo hiểm quốc tế, Remote" },
            { id: 'ds', title: "UI/UX Designer", cat: "Creative", pay: "$1,200 - $2,200", color: "emerald", req: "Figma, Portfolio xịn", ben: "Team building, Gym" },
            { id: 'mkt', title: "Digital Marketing", cat: "Growth", pay: "$1,000 - $1,800", color: "yellow", req: "Ads, Content Strategy", ben: "Thưởng doanh số, Vé Event" }
        ];

        
        const teamSlider = document.getElementById('team-slider');
        const carouselSection = document.querySelector('.carousel-section');
        
      
        let isClickValid = true; 

        if(teamSlider && carouselSection) {
            teamSlider.style.setProperty('--quantity', team.length);
            teamSlider.innerHTML = ''; 

            team.forEach((m, i) => {
                teamSlider.innerHTML += `
                    <div class="team-item" style="--position: ${i + 1};">
                        <div class="text-center group card-hover border-2 border-transparent hover:border-pink-500 transition-all bg-white rounded-[1.5rem] p-4 shadow-sm h-full w-full flex flex-col justify-center" onclick="showMemberDetail(${i})" style="cursor:pointer">
                            <div class="aspect-square rounded-2xl bg-gray-100 mb-4 overflow-hidden pointer-events-none">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${m.img}" class="w-full h-full object-cover">
                            </div>
                            <h5 class="font-black italic text-xs uppercase">${m.name}</h5>
                            <p class="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1">${m.role}</p>
                        </div>
                    </div>`;
            });

       
            let isDragging = false;
            let startX = 0;
            let currentRotateY = 0;
            let tempRotateY = 0;

            carouselSection.addEventListener('mousedown', (e) => {
                isDragging = true;
                isClickValid = true; 
                startX = e.clientX;
                teamSlider.style.transition = 'none';
            });

            window.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                let moveX = e.clientX - startX;
                
                if (Math.abs(moveX) > 5) isClickValid = false; 
                
                tempRotateY = currentRotateY + (moveX / 4); 
                teamSlider.style.transform = `rotateX(0deg) rotateY(${tempRotateY}deg)`;
            });

            window.addEventListener('mouseup', () => {
                if (isDragging) {
                    isDragging = false;
                    currentRotateY = tempRotateY;
                    teamSlider.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)';
                }
            });

            carouselSection.addEventListener('touchstart', (e) => {
                isDragging = true;
                isClickValid = true;
                startX = e.touches[0].clientX;
                teamSlider.style.transition = 'none';
            }, {passive: true});

            window.addEventListener('touchmove', (e) => {
                if (!isDragging) return;
                let moveX = e.touches[0].clientX - startX;
                
                if (Math.abs(moveX) > 5) isClickValid = false;
                
                tempRotateY = currentRotateY + (moveX / 4); 
                teamSlider.style.transform = `rotateX(0deg) rotateY(${tempRotateY}deg)`;
            });

            window.addEventListener('touchend', () => {
                if (isDragging) {
                    isDragging = false;
                    currentRotateY = tempRotateY;
                    teamSlider.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)';
                }
            });

       
            const degreePerItem = 360 / team.length; 
            let autoRotateTimer;

            function startAutoRotate() {
                clearInterval(autoRotateTimer); 
                autoRotateTimer = setInterval(() => {
                    currentRotateY -= degreePerItem; 
                    tempRotateY = currentRotateY; 
                    teamSlider.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
                    teamSlider.style.transform = `rotateX(0deg) rotateY(${currentRotateY}deg)`;
                }, 3000); 
            }

            function stopAutoRotate() {
                clearInterval(autoRotateTimer);
            }

            startAutoRotate();
            carouselSection.addEventListener('mouseenter', stopAutoRotate);
            carouselSection.addEventListener('mouseleave', startAutoRotate);
            carouselSection.addEventListener('touchstart', stopAutoRotate, {passive: true});
            carouselSection.addEventListener('touchend', startAutoRotate);
        }

        
        const jobsGrid = document.getElementById('jobs-grid');
        if(jobsGrid) {
            jobs.forEach(j => {
                jobsGrid.innerHTML += `
                    <div class="job-card p-8 bg-gray-50 rounded-[3rem] card-hover border-2 border-transparent cursor-pointer" onclick="showJobDetail('${j.id}')">
                        <span class="text-[9px] font-black bg-${j.color}-100 text-${j.color}-600 px-4 py-1 rounded-full uppercase mb-4 inline-block">${j.cat}</span>
                        <h4 class="text-xl font-black italic uppercase mb-2">${j.title}</h4>
                        <p class="text-xs text-gray-400 font-bold uppercase mb-4 italic">${j.pay}</p>
                        <span class="text-[9px] font-black uppercase text-gray-500">Xem & Nộp hồ sơ <i class="fa-solid fa-arrow-right ml-1"></i></span>
                    </div>`;
            });
        }

       
        function showMemberDetail(i) {
            if(!isClickValid) return; 

            const m = team[i];
            const info = document.getElementById('member-info');
            info.innerHTML = `
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${m.img}" class="w-24 h-24 mx-auto rounded-full bg-gray-50 mb-6 border-4 border-pink-500/10">
                <h3 class="text-3xl font-black italic uppercase mb-1">${m.name}</h3>
                <p class="text-pink-500 font-black uppercase text-xs tracking-widest mb-6">${m.role}</p>
                <div class="bg-gray-50 p-6 rounded-2xl italic text-gray-500 text-sm leading-relaxed">"${m.bio}"</div>
            `;
            toggleMemberModal(true);
        }

        function showJobDetail(id) {
            const j = jobs.find(x => x.id === id);
            document.getElementById('job-list').classList.add('hidden');
            document.getElementById('job-detail').classList.remove('hidden');
            document.getElementById('detail-content').innerHTML = `
                <h3 class="text-4xl font-black italic uppercase text-pink-500">${j.title}</h3>
                <p class="text-gray-400 font-bold uppercase text-xs tracking-widest mt-2 mb-6">${j.pay} | Full-time</p>
                <div class="grid md:grid-cols-2 gap-8 text-sm">
                    <div><h5 class="font-black uppercase text-[10px] mb-2">Yêu cầu</h5><p class="text-gray-600 font-medium">• ${j.req}</p></div>
                    <div><h5 class="font-black uppercase text-[10px] mb-2">Quyền lợi</h5><p class="text-gray-600 font-medium">• ${j.ben}</p></div>
                </div>
            `;
            document.getElementById('application-form-container').classList.remove('hidden');
            document.getElementById('success-state').classList.add('hidden');
        }

        function updateFileName(input) {
            const display = document.getElementById('file-name-display');
            if(input.files && input.files[0]) {
                display.innerHTML = `Đã chọn: <span class="text-pink-500">${input.files[0].name}</span>`;
            }
        }

        function handleFormSubmit(e) {
            e.preventDefault();
            const btn = document.getElementById('submit-btn');
            btn.innerHTML = '<i class="fa-solid fa-circle-notch animate-spin mr-2"></i> Đang xử lý...';
            btn.disabled = true;
            setTimeout(() => {
                document.getElementById('application-form-container').classList.add('hidden');
                document.getElementById('success-state').classList.remove('hidden');
                btn.innerHTML = 'Gửi hồ sơ ngay';
                btn.disabled = false;
            }, 1800);
        }

        function toggleJobsModal(s) { document.getElementById('jobs-modal').classList.toggle('active', s); if(!s) backToList(); document.body.style.overflow = s ? 'hidden' : 'auto'; }
        function toggleMemberModal(s) { document.getElementById('member-modal').classList.toggle('active', s); document.body.style.overflow = s ? 'hidden' : 'auto'; }
        function backToList() { document.getElementById('job-list').classList.remove('hidden'); document.getElementById('job-detail').classList.add('hidden'); }
        function closeMemberModal(e) { if(e.target.id === 'member-modal') toggleMemberModal(false); }