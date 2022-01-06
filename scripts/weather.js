function getWeather(city, inputDate) {
    const url = `http://api.weatherapi.com/v1/forecast.json?key=7f8379f5bddf43e1a8f104330212412&q=${city}&days=7&aqi=yes&alerts=yes`;

    fetch(url)
    .then((res) => {
        return res.json();
    })
    .then((data) => {

        // Generowanie nazw lokacji
        document.getElementById('location').childNodes.forEach(child => {
            if(child.id) {
                child.innerText = data[child.parentElement.id][child.id];
            }
        });

        // Generowanie wartosci pogodowych w tym momencie (temperatura itp.)
        document.getElementById('current').childNodes.forEach(child => {
            if(child.className) {
                child.childNodes.forEach(element => {
                    if (element.id === 'condition') {
                        element.childNodes.forEach(elementChild => {
                            if(elementChild.id) {
                                elementChild.src = `http:${data[child.parentElement.id][element.id][elementChild.id]}`;
                            }
                        })
                    } else if (element.id === 'air_quality') {
                        element.childNodes.forEach(elementChild => {
                            if(elementChild.id) {
                                elementChild.childNodes.forEach(node => {
                                    if(node.className) {
                                        if (node.classList.contains('value')) {
                                            node.innerText = parseInt(data[child.parentElement.id][element.id][elementChild.id]);
                                        }
                                    }
                                })
                            }
                        })
                        
                    } else {
                        element.childNodes.forEach(elementChild => {
                            if(elementChild.className) {
                                if(elementChild.classList.contains('value')) {
                                    elementChild.innerText = data[child.parentElement.id][element.id];
                                    if(element.id === 'pressure_mb') {
                                        elementChild.innerText += 'hPa';
                                    } else if (element.id === 'wind_kph') {
                                        elementChild.innerText += 'km/h';
                                    } else {
                                        elementChild.innerText += '°C';
                                    }
                                }
                            }
                        })
                    }
                });
            }
        });

        const forecast = data.forecast;

        document.getElementById('firstDate').innerText = forecast.forecastday[0].date;
        document.getElementById('secondDate').innerText = forecast.forecastday[1].date;
        document.getElementById('thirdDate').innerText = forecast.forecastday[2].date;

        // Generowanie wartosci pogodowych w danym dniu (temperatura itp.)
        // Przez istnienie stref czasowych musiałem podejść do tego w ten sposób
        forecast.forecastday.forEach(day => {
            if (day.date === inputDate) {
                document.getElementById('forecastday').childNodes.forEach(child => {
                    if (child.className) {
                        child.childNodes.forEach(element => {
                            if (element.id === 'condition') {
                                element.childNodes.forEach(elementChild => {
                                    if(elementChild.id) {
                                        elementChild.src = `http:${day.day[element.id][elementChild.id]}`;
                                    }
                                })
                            } else if(element.id === 'date') {
                                element.childNodes.forEach(elementChild => {
                                    if(elementChild.className) {
                                        if(elementChild.classList.contains('value')) {
                                            elementChild.innerText = day[element.id]
                                        }
                                    }
                                })
                            } else {
                                element.childNodes.forEach(elementChild => {
                                    if(elementChild.className) {
                                        if(elementChild.classList.contains('value')) {
                                            elementChild.innerText = day.day[element.id];
                                            if(element.id === 'avgvis_km') {
                                                elementChild.innerText += 'km';
                                            } else if (element.id === 'maxwind_kph') {
                                                elementChild.innerText += 'km/h';
                                            } else {
                                                elementChild.innerText += '°C';
                                            }
                                        }
                                    }
                                })
                            }
                        })
                    }
                })
            } 
        })

        //Generowanie alertów pogodowych
        const alerts = data.alerts.alert;
        const alertArr = alerts.slice(0, 3);

        const noAlertElement = document.getElementById('noAlerts');

        if (alertArr[0] !== undefined) {
            noAlertElement.innerText = '';
            alertArr.forEach(alert => {
                const elem = document.createElement('p');
                elem.classList.add('textCenter');
                elem.classList.add('alertText');
                elem.innerText = alert.desc;
                document.querySelector('.alertsContent').appendChild(elem)
            })
            
        } else {
            document.querySelector('.alertsContent').innerHTML = '';
            noAlertElement.innerText = 'There are no weather alerts'
            document.querySelector('body').classList.add('menu--open')
        }
    })
}

// Wywoływanie powyższych funkcji

function getTime(city) {
    const url = `https://api.ipgeolocation.io/astronomy?apiKey=26da1ab6473d44ef8885cb1cbfe77e83&location=${city}`;

    fetch (url)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        const date = data.date;
        getWeather(city, data.date)
    })
    .then(() => {
        document.querySelector('.main').classList.remove('main--waiting');
        document.querySelector('.weatherWait').classList.add('weatherWait--invisible')
    })
}

window.addEventListener('load', () => {
    getTime('Tokyo');
});

document.querySelector('.material-icons').addEventListener('click', () =>{
    document.querySelector('.alertsContent').innerText = '';
    document.querySelector('.main').classList.add('main--waiting');
    document.querySelector('.weatherWait').classList.remove('weatherWait--invisible')
    getTime(document.querySelector('.form__input').value);
})

document.querySelectorAll('.daysList__item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelector('.alertsContent').innerText = '';
        getWeather(document.getElementById('name').innerText, item.innerText);
    })
});

