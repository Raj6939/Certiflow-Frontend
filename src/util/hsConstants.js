export const EVENT_SCHEMA = "sch:hid:testnet:z6MkeX1FPWKt9hWqKr3a8YGvaAHxto2gVnMSm63tF6rSwQDt:1.0"
export const UNIVERSITY_CERTIFICATE = "sch:hid:testnet:z6MkkipnHwpLmMHiQRdVaqRA1RwrQJcoP8ZDnm8Tqszreju5:1.0"
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