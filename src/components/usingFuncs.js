export function inputHandler(event) {
    if (event.currentTarget.value !== '') {
        event.currentTarget.classList.add('filled');
    } else {
        event.currentTarget.classList.remove('filled');
    }

    event.currentTarget.classList.remove('error');
}

export function focusHandler(event) {
    event.currentTarget.previousElementSibling.classList.add('focused');

}

export function blurHandler(event) {
    if (event.currentTarget.classList.contains('filled')) return;

    event.currentTarget.previousElementSibling.classList.remove('focused');
}

export function parseDate(seconds) {
    const date = new Date(seconds * 1000);
    const month = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ][date.getMonth()];
    const day = date.getDate();

    return month + ' ' + day;
}

export function parseTime(seconds) {
    const date = new Date(seconds * 1000);
    const time = (date.getHours() < 10 ? `0${date.getHours()}` : date.getHours())
        + ':' +
        (date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes());

    return time;
}