// a.js - small JS utility module

const isObject = v => v !== null && typeof v === 'object';

function deepClone(value) {
    if (typeof structuredClone === 'function') return structuredClone(value);
    // fallback (note: loses functions, Symbols, and non-JSON types)
    return JSON.parse(JSON.stringify(value));
}

function debounce(fn, wait = 100) {
    let timer = null;
    return function (...args) {
        const ctx = this;
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(ctx, args), wait);
    };
}

function throttle(fn, limit = 100) {
    let last = 0;
    let timer = null;
    return function (...args) {
        const ctx = this;
        const now = Date.now();
        const remaining = limit - (now - last);
        if (remaining <= 0) {
            if (timer) { clearTimeout(timer); timer = null; }
            last = now;
            fn.apply(ctx, args);
        } else if (!timer) {
            timer = setTimeout(() => {
                last = Date.now();
                timer = null;
                fn.apply(ctx, args);
            }, remaining);
        }
    };
}

function pick(obj, keys = []) {
    if (!isObject(obj)) return {};
    return keys.reduce((acc, k) => {
        if (k in obj) acc[k] = obj[k];
        return acc;
    }, {});
}

function omit(obj, keys = []) {
    if (!isObject(obj)) return {};
    const set = new Set(keys);
    return Object.keys(obj).reduce((acc, k) => {
        if (!set.has(k)) acc[k] = obj[k];
        return acc;
    }, {});
}

function uniqueId(prefix = '') {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    return `${prefix}${id}`;
}

function sleep(ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    deepClone,
    debounce,
    throttle,
    pick,
    omit,
    uniqueId,
    sleep,
};

// Quick demo when run directly
if (require.main === module) {
    (async () => {
        console.log('uniqueId:', uniqueId('id_'));
        const obj = { a: 1, b: { c: 2 } };
        const copy = deepClone(obj);
        console.log('deepClone works:', JSON.stringify(copy));
        console.log('pick:', pick(obj, ['a']));
        console.log('omit:', omit(obj, ['a']));
        await sleep(100);
        console.log('done');
    })();
}
console.log("git kee file koo change kiyaa");

