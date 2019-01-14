const urlStorageManager = {
    storageKey: 'domains',

    getUrls: function () {
        let domains = [];
        return browser.storage.local.get(null).then(domainsMap => {
            if (this.storageKey in domainsMap) {
                domains = domainsMap[this.storageKey];
            }
            return domains;
        });
    },

    putUrl: function (url) {
        return this.getUrls().then(urls => {
            if (urls.indexOf(url) === -1) {
                urls.push(url);
            }
            return this.putUrls(urls);
        })
    },

    putUrls: function (urls) {
        return browser.storage.local.set({
            [this.storageKey]: urls
        });
    }
};
