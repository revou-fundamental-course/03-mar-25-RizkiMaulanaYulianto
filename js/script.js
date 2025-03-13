function replaceName() {
    let name = prompt('Hallo, Selamat Datang di Website Kami! \n\nSilahkan masukkan nama Anda :');
    
    if (name === null || name.trim() === '') {
        alert('Nama tidak boleh kosong!');
        
        // Panggil kembali fungsi jika nama kosong
        replaceName();
    } else {
        document.getElementById('name').innerHTML = " " + name.trim();
    }
}

// Panggil fungsi saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    replaceName();

    const form = document.querySelector('form');
    const displayMessage = document.querySelector('.display-message');
    const timeDisplay = document.querySelector('.time');

    // Fungsi untuk menampilkan error
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
    }

    // Fungsi untuk menghapus error
    function clearErrors() {
        const errorElements = document.querySelectorAll('.error');
        errorElements.forEach(element => element.textContent = '');
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        
        // Bersihkan error sebelumnya
        clearErrors();

        // Ambil nilai dari form
        const userName = document.getElementById('fullName').value.trim(); 
        const birthdate = document.getElementById('birthdate').value;
        const gender = document.querySelector('input[name="gender"]:checked')?.value || '';
        const message = document.getElementById('message').value.trim();

        // Flag untuk mengecek validasi
        let isValid = true;

        // Validasi input
        if (!userName) {
            showError('nameError', 'Nama harus diisi!');
            isValid = false;
        }

        if (!birthdate) {
            showError('birthdateError', 'Tanggal Lahir harus diisi!');
            isValid = false;
        }

        if (!gender) {
            showError('genderError', 'Jenis Kelamin harus dipilih!');
            isValid = false;
        }

        if (!message) {
            showError('messageError', 'Pesan harus diisi!');
            isValid = false;
        }

        // Jika ada error, hentikan proses submit
        if (!isValid) {
            return;
        }

        // Debugging: Cek apakah nilai diambil dengan benar
        // console.log('Nama:', userName);
        // console.log('Tanggal Lahir:', birthdate);
        // console.log('Jenis Kelamin:', gender);
        // console.log('Pesan:', message);

        // Format tanggal lahir
        const formattedBirthdate = new Date(birthdate).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

        // Dapatkan waktu saat ini dengan format yang diinginkan
        const now = new Date();
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const formattedTime = `${days[now.getDay()]} ${months[now.getMonth()]} ${now.getDate()} ${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')} GMT+0100`;

        // Update waktu
        timeDisplay.textContent = `Current time : ${formattedTime}`;

        // Update display message
        displayMessage.innerHTML = `
            <p><strong>Nama :</strong> ${userName}</p>
            <p><strong>Tanggal Lahir :</strong> ${formattedBirthdate}</p>
            <p><strong>Jenis Kelamin :</strong> ${gender}</p>
            <p><strong>Pesan :</strong> <br><br>${message}</p>
        `;

        // Reset form
        form.reset();
    });

    const images = document.querySelectorAll('.item img');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;
    let slideInterval;

    // Fungsi untuk menampilkan slide
    function showSlide(index) {
        images.forEach(img => img.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = index;
        if(currentSlide >= images.length) currentSlide = 0;
        if(currentSlide < 0) currentSlide = images.length - 1;
        
        images[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // Fungsi untuk slide berikutnya
    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    // Fungsi untuk slide sebelumnya
    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Mulai slideshow otomatis
    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 5000); // Ganti slide setiap 5 detik
    }

    // Hentikan slideshow
    function stopSlideshow() {
        clearInterval(slideInterval);
    }

    // Event listeners untuk tombol
    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopSlideshow();
        startSlideshow(); // Restart slideshow setelah interaksi manual
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopSlideshow();
        startSlideshow();
    });

    // Event listeners untuk dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopSlideshow();
            startSlideshow();
        });
    });

    // Mulai slideshow saat halaman dimuat
    showSlide(0);
    startSlideshow();

    // Hentikan slideshow saat hover di carousel
    document.querySelector('.banner-carousel').addEventListener('mouseenter', stopSlideshow);
    document.querySelector('.banner-carousel').addEventListener('mouseleave', startSlideshow);

    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');

    menuToggle.addEventListener('click', function() {
        navList.classList.toggle('active');
    });

    // Menutup menu saat link diklik
    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
        });
    });

    // Menutup menu saat klik di luar menu
    document.addEventListener('click', function(e) {
        if (!navList.contains(e.target) && !menuToggle.contains(e.target)) {
            navList.classList.remove('active');
        }
    });

    // Fungsi untuk mengatur active state pada navbar
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-list a');
        
        // Dapatkan posisi scroll saat ini
        let currentPos = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Offset 100px untuk navbar
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            // Cek apakah user berada di section ini
            if(currentPos >= sectionTop && currentPos < sectionTop + sectionHeight) {
                // Hapus semua active class
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });

                // Tambahkan active class ke link yang sesuai
                const correspondingLink = document.querySelector(`.nav-list a[href*="${sectionId}"]`);
                if(correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });

        // home/halaman utama
        if(currentPos < 100) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            document.querySelector('.nav-list a[href="index.html"]').classList.add('active');
        }
    }

    // menjalankan fungsi saat scroll
    window.addEventListener('scroll', setActiveNavLink);
    
    // menjalankan fungsi saat halaman dimuat
    setActiveNavLink();

    // Smooth scroll untuk link navbar
    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', function(e) {
            // Jika bukan link ke index.html
            if(!this.getAttribute('href').includes('index.html')) {
                e.preventDefault();
                const targetId = this.getAttribute('href').replace('/#', '');
                const targetSection = document.getElementById(targetId);
                
                if(targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});