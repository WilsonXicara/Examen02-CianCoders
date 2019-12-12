function leftPadNumber(number) {
    const pad = '00';
    return pad.substr(0, pad.length - number.length) + number;
}
const formattedTime = timeSeconds => {
    const hours = parseInt(timeSeconds/3600, 10);
    let minutes = parseInt(timeSeconds/60, 10);
    if (hours > 0) {
        minutes-= hours*60;
    }
    const seconds = parseInt(timeSeconds%60, 10);
    return `${hours > 0 ? leftPadNumber(hours.toString())+':' : ''}${leftPadNumber(minutes.toString())}:${leftPadNumber(seconds.toString())}`;
}

export default formattedTime;