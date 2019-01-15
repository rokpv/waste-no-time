const timeManager = {
  timeLeftStorageKey: 'timeLeft',
  timeStoredAtStorageKey: 'timeStoredAt',

  /**
   * @param time {Date}
   * @returns {Promise<void>}
   */
  putTimeStoredAt: function (time) {
    time.setHours(0, 0, 0, 0);
    return browser.storage.local.set({
      [this.timeStoredAtStorageKey]: time.getTime()
    });
  },

  /**
   * Returns the date at which TimeLeft was last stored.
   * @returns {Promise<Date>}
   */
  getTimeStoredAt: function () {
    return browser.storage.local.get(this.timeStoredAtStorageKey).then(result => {
      if (this.timeStoredAtStorageKey in result) {
        return new Date(result[this.timeStoredAtStorageKey]);
      } else {
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        return now;
      }
    })
  },

  /**
   *
   * @param time {Date}
   * @returns {Promise<void>}
   */
  putTimeLeft: function (time) {
    return browser.storage.local.set({
      [this.timeLeftStorageKey]: time.getTime()
    });
  },

  /**
   * @returns {Promise<Date>}
   */
  getTimeLeft: function () {
    return browser.storage.local.get(this.timeLeftStorageKey).then(result => {
      if (this.timeLeftStorageKey in result) {
        return new Date(result[this.timeLeftStorageKey]);
      } else {
        return new Date('1970-1-1 01:00:00');
      }
    })
  }
};