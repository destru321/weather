const dayButton = document.querySelector('.button');

window.addEventListener('resize', () => {
    if (window.innerWidth < 768 && document.querySelector('.alertsContent').innerText != '') {
        document.querySelector('body').classList.remove('menu--open');
    } else if (window.innerWidth >= 768 && document.querySelector('.alertsContent').innerText != '') {
        document.querySelector('body').classList.add('menu--open');
    }
})

dayButton.addEventListener('click', () => {
    if (window.innerWidth > 767 && document.querySelector('.alertsContent').innerText != '') {
        if (document.body.classList.contains('body')) {
            document.querySelector('body').classList.add('menu--open')
            document.querySelector('body').classList.remove('body')
        } else {
            document.querySelector('body').classList.remove('menu--open')
            document.querySelector('body').classList.add('body')
        }
    }
    document.querySelector('.daysList').classList.toggle('daysList--visible')
    dayButton.classList.toggle('button--active');
});

document.querySelectorAll('.daysList__item').forEach(item => {
    item.addEventListener('click', () => {
        if (window.innerWidth > 767 && document.querySelector('.alertsContent').innerText == '') {
            if (document.body.classList.contains('body')) {
                document.querySelector('body').classList.add('menu--open')
                document.querySelector('body').classList.remove('body')
            }
        }
        document.querySelector('.daysList').classList.remove('daysList--visible')
        dayButton.classList.remove('button--active')
    })
});
