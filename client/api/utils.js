let _headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
};

export function headers() {
    return _headers;
}

export function parseJSON(response) {
    if (response.status == 200) {
        return Promise.resolve(response.data);
    }
    return Promise.resolve(response.data);
}

export function updateHeaders(newHeaders) {
    _headers = {
        ..._headers,
        ...newHeaders
    };
    Object.keys(_headers).forEach((key) => {
        if (undefined === _headers[key]) {
            delete _headers[key];
        }
    });
}
