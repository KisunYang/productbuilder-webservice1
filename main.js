const generateBtn = document.getElementById('generate');
const numbersDiv = document.getElementById('numbers');

generateBtn.addEventListener('click', () => {
    numbersDiv.innerHTML = '';
    const numbers = new Set();
    const numberOfNumbers = 5;

    while (numbers.size < numberOfNumbers) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }

    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

    for (let i = 0; i < sortedNumbers.length; i++) {
        const numberDiv = document.createElement('div');
        numberDiv.classList.add('number');
        numberDiv.textContent = sortedNumbers[i];
        numbersDiv.appendChild(numberDiv);
    }
});