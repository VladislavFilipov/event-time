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