const dayButton = document.querySelector('.button');
dayButton.addEventListener('click', () => {
    document.querySelector('.daysList').classList.toggle('daysList--visible')
    dayButton.classList.toggle('button--active');
});

document.querySelectorAll('.daysList__item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelector('.daysList').classList.remove('daysList--visible')
        dayButton.classList.remove('button--active')
    })
});