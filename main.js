const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    themeToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    themeToggle.textContent = '☀️ Light Mode';
}

// 로또 번호 생성 (5세트)
const generateBtn = document.getElementById('generate');
const lottoSets = document.getElementById('lotto-sets');
const bonusCheck = document.getElementById('bonus-check');

generateBtn.addEventListener('click', () => {
    lottoSets.innerHTML = '';
    const includeBonus = bonusCheck.checked;

    for (let set = 1; set <= 5; set++) {
        const numbers = new Set();
        while (numbers.size < 6) {
            numbers.add(Math.floor(Math.random() * 45) + 1);
        }
        const sorted = Array.from(numbers).sort((a, b) => a - b);

        let bonus = null;
        if (includeBonus) {
            do {
                bonus = Math.floor(Math.random() * 45) + 1;
            } while (numbers.has(bonus));
        }

        const row = document.createElement('div');
        row.classList.add('lotto-row');

        const label = document.createElement('span');
        label.classList.add('lotto-label');
        label.textContent = set + '번';
        row.appendChild(label);

        sorted.forEach(n => {
            const ball = document.createElement('div');
            ball.classList.add('number');
            ball.textContent = n;
            row.appendChild(ball);
        });

        if (includeBonus) {
            const sep = document.createElement('span');
            sep.classList.add('bonus-label');
            sep.textContent = '+';
            row.appendChild(sep);

            const bonusBall = document.createElement('div');
            bonusBall.classList.add('number', 'bonus');
            bonusBall.textContent = bonus;
            row.appendChild(bonusBall);
        }

        lottoSets.appendChild(row);
    }
});

// 제휴 문의 폼
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = '전송 중...';
    formStatus.className = 'form-status';
    formStatus.textContent = '';

    try {
        const res = await fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: { Accept: 'application/json' },
        });
        if (res.ok) {
            formStatus.classList.add('success');
            formStatus.textContent = '✅ 문의가 성공적으로 전송되었습니다. 감사합니다!';
            contactForm.reset();
        } else {
            throw new Error();
        }
    } catch {
        formStatus.classList.add('error');
        formStatus.textContent = '❌ 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.';
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = '문의 보내기';
    }
});

// 저녁 메뉴 추천
const menus = [
    { name: '삼겹살', desc: '상추에 싸먹는 국민 회식 메뉴' },
    { name: '치킨', desc: '바삭한 후라이드 or 달콤한 양념' },
    { name: '짜장면', desc: '달달하고 든든한 중화요리' },
    { name: '순대국밥', desc: '뜨끈하고 속 편한 한 그릇' },
    { name: '피자', desc: '오늘은 배달로 여유롭게' },
    { name: '초밥', desc: '신선한 생선과 함께하는 저녁' },
    { name: '부대찌개', desc: '얼큰하고 푸짐한 찌개 한 냄비' },
    { name: '파스타', desc: '크리미하거나 토마토, 취향대로' },
    { name: '곱창볶음', desc: '매콤 달콤 술안주로도 최고' },
    { name: '쌀국수', desc: '깔끔하고 가벼운 베트남 요리' },
    { name: '돈까스', desc: '바삭한 튀김옷에 소스가 넘쳐' },
    { name: '떡볶이', desc: '매콤달콤 국민 야식' },
    { name: '갈비탕', desc: '푸짐하고 진한 사골 국물' },
    { name: '마라탕', desc: '얼얼하고 중독성 있는 마라 향' },
    { name: '된장찌개', desc: '집밥 그리울 땐 역시 된장찌개' },
];

const recommendBtn = document.getElementById('recommend');
const menuResult = document.getElementById('menu-result');

recommendBtn.addEventListener('click', () => {
    const pick = menus[Math.floor(Math.random() * menus.length)];
    menuResult.innerHTML = `
        <div class="menu-name">${pick.name}</div>
        <div class="menu-desc">${pick.desc}</div>
    `;
});
