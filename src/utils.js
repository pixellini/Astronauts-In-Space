export function isDateOlderThanOneDay (date) {
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // Hours*Minutes*Seconds*Milliseconds
    const givenDate = new Date(date);
    const currentDate = new Date();

    const differenceInMilliseconds = currentDate - givenDate;
    return differenceInMilliseconds > oneDayInMilliseconds;
}

export function getRandomNumber (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}