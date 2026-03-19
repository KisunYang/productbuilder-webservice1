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
const recommendBtn = document.getElementById('recommend');
const menuResult = document.getElementById('menu-result');

let allFoods = [];

fetch('korea_foods_extended.json')
    .then(res => res.json())
    .then(data => { allFoods = data.foods; });

recommendBtn.addEventListener('click', () => {
    if (allFoods.length === 0) {
        menuResult.innerHTML = '<div class="menu-desc">데이터를 불러오는 중입니다...</div>';
        return;
    }
    const checked = Array.from(document.querySelectorAll('.country-check:checked')).map(el => el.value);
    const pool = checked.length > 0 ? allFoods.filter(f => checked.includes(f.country)) : allFoods;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    menuResult.innerHTML = `
        <div class="menu-country">${pick.country}</div>
        <div class="menu-name">${pick.food_name}</div>
        <div class="menu-desc">${pick.description}</div>
    `;
});
