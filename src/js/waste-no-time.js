let countdownInterval = null;
let countdownRunning = false;

function startCountdown(tabId) {
  const intervalMillis = 500;
  if (countdownRunning) {
    return;
  }
  // console.log('starting countdown');
  countdownRunning = true;
  countdownInterval = setInterval(countdownHandler, intervalMillis, intervalMillis, tabId);
}

function stopCountdown() {
  // console.log('stopping countdown');
  clearInterval(countdownInterval);
  countdownInterval = null;
  countdownRunning = false;
}

function countdownHandler(interval, tabId) {
  const now = new Date();
  now.setHours(0, 0, 0 ,0);
  timeManager.getTimeStoredAt().then(timeStoredAt => {
    if (now > timeStoredAt) {
      // new day, reset timer
      // console.log('resetting timer');
      return settingsManager.getMaxTime();
    } else {
      return timeManager.getTimeLeft();
    }
  }).then(timeLeft => {
    // console.log('time left (ms):', timeLeft - new Date('1970-1-1 0:00:00'));
    if (timeLeft - new Date('1970-1-1 0:00:00') <= 0) {
      // console.log('TIME LIMIT EXCEEDED');
      browser.tabs.executeScript(tabId, {
        code: 'document.body.innerHTML = "Time\'s up! Come back tomorrow."'
      });
    } else {
      const newTimeLeft = new Date(timeLeft.getTime() - interval);
      timeManager.putTimeLeft(newTimeLeft);
      timeManager.putTimeStoredAt(now);
    }
  });
}

/**
 * @param url {string}
 * @param urls {Array<string>}
 * @returns {boolean}
 */
function containsBlockedDomain(url, urls) {
  console.log('checking url, comparing with', urls);
  let isBlocked = false;
  for (const blockedUrl of urls) {
    if (url.includes(blockedUrl)) {
      isBlocked = true;
      console.log('Url', url, 'contains blocked domain', blockedUrl);
      break;
    }
  }
  return isBlocked;
}

function tabListener(tabId, changeInfo, tab) {
  const { status } = changeInfo;
  if (!status || status !== 'loading') {
    return;
  }
  const { active, url } = tab;
  if (active) {
    settingsManager.getUrls().then(urls => {
      let isBlocked = containsBlockedDomain(url, urls);
      if (isBlocked) {
        startCountdown(tabId);
      } else {
        stopCountdown();
      }
    });
  }

}

function setupListeners() {
  browser.tabs.onActivated.addListener(info => {
    const { tabId } = info;
    browser.tabs.get(tabId).then(tab => {
      tabListener(tabId, { status: 'loading' }, tab);
    });
  });
  browser.tabs.onUpdated.addListener(tabListener);
}

setupListeners();

