var storageMgr = {
    addUserDetails: function(details) {
        var jsonStr = JSON.stringify(details);
        window.localStorage.setItem("usercontext", jsonStr);
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

export default storageMgr;
