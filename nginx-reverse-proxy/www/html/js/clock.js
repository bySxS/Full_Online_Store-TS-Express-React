const SmoothClock = true //плавность
const AccurateMinutesClock = false
const AddNumber = true
const NumberOnlyBig = true
const BigNumberInHour = true

function getTimeWithTimeZone(timeZone) {
    return new Date(new Date().toLocaleString('en-US', {timeZone}))
}

date = getTimeWithTimeZone('Europe/Moscow')

let hours = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds();

if (hours > 12) {
    hours -= 12;
}


let secondsStartDegree,
    minutesStartDegree,
    hoursStartDegree

if (AccurateMinutesClock) {//точность
    secondsStartDegree = 360 / 60 * seconds
    minutesStartDegree = 360 / 60 * minutes + 6 / 60 * seconds
    hoursStartDegree = 360 / 12 * hours + 30 / 60 * minutes + 0.5 / 60 * seconds
} else {
    secondsStartDegree = 360 / 60 * seconds
    minutesStartDegree = 360 / 60 * minutes
    hoursStartDegree = 360 / 12 * hours + 30 / 60 * minutes + 0.5 / 60 * seconds
}

let span = document.createElement('span')
let spanNumber = ''
let clock = document.querySelector('.clock');
let numberHour = 0
for (let i = 1; i <= 60; i++) {
    span = document.createElement('span')

    if (i % 5 === 0) {

        numberHour ++
        span.className = 'clock__stroke clock__stroke--' + i
        let number = 0
        if (BigNumberInHour) {number = numberHour} else {number = i}
        if (AddNumber) {
            spanNumber = '<span class="clock_number clock_number--big">' + number + '</span>'
            span.innerHTML = spanNumber
        }

    } else {

        span.className = 'clock__stroke clock__stroke--small clock__stroke--' + i
        if ((AddNumber)&&(NumberOnlyBig === false)) {
            spanNumber = '<span class="clock_number clock_number--small">' + i + '</span>'
            span.innerHTML = spanNumber
        }

    }


    clock.append(span)
}
span = document.createElement('span')
span.className = 'clock__hand clock__hand--hour'
clock.append(span)
span = document.createElement('span')
span.className = 'clock__hand clock__hand--minute'
clock.append(span)
span = document.createElement('span')
span.className = 'clock__hand clock__hand--second'
clock.append(span)
// можно менять часовой (пояс Ctrl+/)
// <span class="clock__hand-container clock__hand-container--hour" style="transform: rotate(195deg);">
//     <span class="clock__hand clock__hand--hour"></span>
// </span>
// <span class="clock__hand-container clock__hand-container--minute"  style="transform: rotate(180deg);">
//     <span class="clock__hand clock__hand--minute"></span>
// </span>
// <span class="clock__hand clock__hand--second"></span>


const style = document.createElement('style');

if (SmoothClock) {
//плавно
    style.innerHTML = '\
        @keyframes clock-hand-rotate--hour {\
            from {transform: rotate(' + hoursStartDegree + 'deg)}\
            to {transform: rotate(' + (hoursStartDegree + 360) + 'deg)}\
        }\
        @keyframes clock-hand-rotate--minute {\
            from {transform: rotate(' + minutesStartDegree + 'deg)}\
            to {transform: rotate(' + (minutesStartDegree + 360) + 'deg)}\
        }\
        @keyframes clock-hand-rotate--second {\
            from {transform: rotate(' + secondsStartDegree + 'deg)}\
            to {transform: rotate(' + (secondsStartDegree + 360) + 'deg)}\
        }\
        .clock__hand--hour {\
            animation: clock-hand-rotate--hour 43200s linear infinite;\
        }\
        .clock__hand--minute {\
            animation: clock-hand-rotate--minute 3600s linear infinite;\
        }\
        .clock__hand--second {\
            animation: clock-hand-rotate--second 60s linear infinite;\
        }';
} else {
//с прыгающей минутной и секундной стрелками
    style.innerHTML = '\
@keyframes clock-hand-rotate--hour {\
            from {transform: rotate(' + hoursStartDegree + 'deg)}\
            to {transform: rotate(' + (hoursStartDegree + 360) + 'deg)}\
    }\
@keyframes clock-hand-rotate--minute {\
            from {transform: rotate(' + minutesStartDegree + 'deg)}\
            to {transform: rotate(' + (minutesStartDegree + 360) + 'deg)}\
    }\
@keyframes clock-hand-rotate--second {\
            from {transform: rotate(' + secondsStartDegree + 'deg)}\
            to {transform: rotate(' + (secondsStartDegree + 360) + 'deg)}\
    }\
.clock__hand--hour {\
            animation: clock-hand-rotate--hour 43200s linear infinite;\
    }\
.clock__hand--minute {\
            animation: clock-hand-rotate--minute 3600s steps(60) -' + seconds + 's infinite;\
    }\
.clock__hand--second {\
            animation: clock-hand-rotate--second 60s steps(60) infinite;\
    }';
}

document.getElementsByTagName('head')[0].appendChild(style);