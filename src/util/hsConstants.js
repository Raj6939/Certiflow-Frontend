export const CERTIFICATE_SCHEMA = "sch:hid:testnet:z9qrE82BWYA5mD8SMLFxnDJe7DmPD1GxXz2UhpZYQMwxq:1.0"
export const UNIVERSITY_CERTIFICATE = "sch:hid:testnet:z7S2LYWqGdvXbNpy6TLrG7niwvna7uVoRxF8JRCSrAeWi:1.0"
export const EVENT_PASS_SCHEMA = "sch:hid:testnet:zHsf7ZqyusUpJMiteCQaUtdTwCucwbfUjLoALAciGB8LF:1.0"
export function truncate(str, limit) {
    if (!str) {
        return
    }

    if (!limit) {
        return
    }

    // if less than limit then do nothing
    if (str.length <= limit) {
        return str;
    }

    const eachLen = Math.floor(limit / 3); //  we need to 3 parts
    const firstPart = str.substr(0, eachLen);
    const lastPart = str.slice(-eachLen);
    return firstPart + " ... " + lastPart;
}