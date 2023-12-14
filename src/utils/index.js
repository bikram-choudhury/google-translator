export function copyToClipboard(element) {
    var range = document.createRange();
    range.selectNode(element);
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    setTimeout(() => {
        window.getSelection().removeAllRanges();// to deselect
    }, 100);
}

export function getHeaders(method = '') {
    const commonHeaders = {
        'Accept-Encoding': 'application/gzip',
        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
    }
    const headers = {
        get: { ...commonHeaders },
        post: {
            ...commonHeaders,
            'content-type': 'application/x-www-form-urlencoded'
        }
    }
    return headers[method.toLowerCase()] ?? {};
}

export function getAPIKey() {
    const storageKey = '@@translator';
    const storage = localStorage.getItem(storageKey);
    const parsedData = JSON.parse(storage);

    return parsedData.API_KEY;

    // return localStorage.getItem('APIKEY')
}