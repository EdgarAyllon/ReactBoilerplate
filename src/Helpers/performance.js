/**
 * This debounces(delays) execution of function
 * @param {function} fn  the function to debounce
 * @param {number} delay the time to wait until launch function
 * @param {any} scope the scoped arguments
 */
function debounce(fn, delay, scope) {
    let timeout;
    return function () {
        const context = scope || this
        const args = arguments;
        const later = function () {
            timeout = null;
            fn.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, delay);
    };
}

/**
 *  Throttles any function, it only allows to execute one function X times in delayed time.
 *  Is the opposite/complementary to debounce.
 * @param {function} fn  the function to throttle
 * @param {number} delay the maxium time to delay
 * @param {any} scope the soped arguments
 */
function throttle(fn, delay, scope) {
    delay || (delay = 250);
    let last, deferTimer;
    return function () {
        const context = scope || this;
        const now = +new Date
        const args = arguments;
        if (last && now < last + delay) {
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function () {
                last = now;
                fn.apply(context, args);
            }, delay);
        } else {
            last = now;
            fn.apply(context, args);
        }
    };
}
export { debounce, throttle };