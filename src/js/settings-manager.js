const settingsManager = {
  urlsStorageKey: 'blockedUrls',
  maxTimeStorageKey: 'maxTime',

  /**
   * @returns {Promise<Array<string>>}
   */
  getUrls: function () {
    let domains = [];
    return browser.storage.local.get(this.urlsStorageKey).then(results => {
      if (this.urlsStorageKey in results) {
        domains = results[this.urlsStorageKey];
      }
      return domains;
    });
  },

  /**
   * @param url {string}
   * @returns {Promise<void>}
   */
  putUrl: function (url) {
    return this.getUrls().then(urls => {
      if (urls.indexOf(url) === -1) {
        urls.push(url);
      }
      return this.putUrls(urls);
    })
  },

  /**
   * @param urls {Array<string>}
   * @returns {Promise<void>}
   */
  putUrls: function (urls) {
    return browser.storage.local.set({
      [this.urlsStorageKey]: urls
    });
  },

  /**
   * @returns {Promise<Date>}
   */
  getMaxTime: function () {
    return browser.storage.local.get(this.maxTimeStorageKey).then(results => {
      if (this.maxTimeStorageKey in results) {
        return new Date(results[this.maxTimeStorageKey]);
      } else {
        // console.log('max time not set');
        return new Date('1970-1-1 01:00:00');
      }
    });
  },

  /**
   * @param maxTime{string} time in HH:mm format
   * @returns {Promise<void>}
   */
  putMaxTime: function (maxTime) {
    const time = new Date(`1970-1-1 ${maxTime}:00`);
    // console.log(time);
    return browser.storage.local.set({
      [this.maxTimeStorageKey]: time.getTime()
    });
  }
};
