window.addEventListener('DOMContentLoaded', function() {

  const timePattern = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]/;

  function checkTime(timeStr) {
    return timeStr.match(timePattern);
  }

  function showTimeFormatError() {
    document.getElementById('error-time').style.visibility = 'visible';
  }

  function hideTimeFormatError() {
    document.getElementById('error-time').style.visibility = 'collapse';
  }

  function formatUrls(urlsArray) {
    let formatted = '';
    urlsArray.forEach(url => {
      formatted += url + '\n';
    });
    return formatted;
  }

  function parseUrls(urlsText) {
    let split = urlsText.split('\n');
    return split
      .filter(url => !!url)
      .map(url => url.trim());
  }

  function updateUrls(settingsManager) {
    const textArea = document.getElementById('ta-urls');
    settingsManager.getUrls().then(urls => {
      textArea.value = formatUrls(urls)
    });
  }

  function updateMaxTime(settingsManager) {
    const maxTimeInput = document.getElementById('input-time');
    settingsManager.getMaxTime().then(maxTime => {
      console.log(maxTime);
      const h = maxTime.getHours().toString();
      let m = maxTime.getMinutes();
      if (m < 10) {
        m = '0' + m;
      }
      maxTimeInput.value = `${h}:${m}`;
    })
  }

  // on click functions
  function setMaxTime(settingsManager) {
    return function () {
      const time = document.getElementById('input-time').value;
      if (checkTime(time)) {
        settingsManager.putMaxTime(time).then(() => {
          console.log('put time:', time);
          hideTimeFormatError();
        });
      } else {
        showTimeFormatError();
      }
    }
  }

  function setUrls(settingsManager) {
    return function () {
      const textArea = document.getElementById('ta-urls');
      const urlsArray = parseUrls(textArea.value);
      settingsManager.putUrls(urlsArray).then(() => console.log('put urls:', urlsArray));
    }
  }

  console.log('running settings script');

  // update views
  updateUrls(settingsManager);
  updateMaxTime(settingsManager);

  // set listeners
  document.getElementById('btn-set-time').onclick = setMaxTime(settingsManager);
  document.getElementById('btn-set-urls').onclick = setUrls(settingsManager);
});
