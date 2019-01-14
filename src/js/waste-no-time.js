function getTimeLeft() {
  return '60:00';
}

function tabListener(tabId, changeInfo, tab) {
  const { status } = changeInfo;
  if (!status || status !== 'complete') {
    return;
  }
  const { active, url } = tab;
  console.log(active, url);
}

function onFinish() {
  console.log(null);
}

urlStorageManager.putUrls([1, 2, 3]);

browser.tabs.onActivated.addListener(info => {
  console.log(info);
});
browser.tabs.onUpdated.addListener(tabListener);

let time = 0;
let interval;
browser.extension.onConnect.addListener(port => {
  console.log('connected');
  port.onDisconnect.addListener(() => {
    clearInterval(interval);
  });
  interval = setInterval(() => {
    time++;
    port.postMessage({
      code: 'timeLeft',
      time: `00:${time}`
    });
  }, 1000);

});
