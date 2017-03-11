export function isDataURL(s) {
    return !!s.match(isDataURL.regex);
}
isDataURL.regex = /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i;

export const StorageManager = {
    setItem: function(key, value) {
        try {
            let jsonStr = JSON.stringify(value);
            window.localStorage.setItem(key, jsonStr);
        } catch (e) {
            alert('Unable to preserve session, probably due to being in private ' +
                'browsing mode.');
        }
    },
    getItem: function(key) {
        try {
            let jsonStr = window.localStorage.getItem(key);
            return JSON.parse(jsonStr);
        } catch (e) {
            alert('Unable to preserve session, probably due to being in private ' +
                'browsing mode.');
        }
        return {};
    },
    addUserDetails: function(details) {
        try {
            var jsonStr = JSON.stringify(details);
            window.localStorage.setItem("usercontext", jsonStr);
        } catch (e) {
            alert('Unable to preserve session, probably due to being in private ' +
                'browsing mode.');
        }
    },
    getUserDetails: function() {
        var details = null;

        if (window.localStorage.getItem("usercontext")) {
            try {
                return JSON.parse(window.localStorage.getItem("usercontext"));
            } catch (e) {
                return details;
            }
        }
        return details;
    },
    getToken: function() {
        if (window.localStorage.getItem("usercontext")) {
            try {
                var usercontext = JSON.parse(window.localStorage.getItem("usercontext"));
                if (usercontext) {
                    return usercontext.token;
                }
            } catch (e) {
                return null;
            }

        }
        return null;
    },
    removeUser: function() {
        window.localStorage.setItem("usercontext", "");
    }
}

export function cleanObject(test, recurse) {
    for (var i in test) {
        if (test[i] === null) {
            delete test[i];
        } else if (recurse && typeof test[i] === 'object') {
            cleanObject(test[i], recurse);
        }
    }
}
