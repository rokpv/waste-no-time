// Once the DOM is ready...
window.addEventListener('DOMContentLoaded', function() {
  function formatTime(time) {
    if (time < 10) {
      time = '0' + time;
    }
    return time;
  }

  function getTime() {
    setTimeout(() => {
      // console.log('getting time');
      timeManager.getTimeLeft().then(time => {
        timeText.innerText = `${time.getHours()}:${formatTime(time.getMinutes())}:${formatTime(time.getSeconds())}`;
        getTime();
      })
    }, 500)
  }

  const timeText = document.getElementById('time-left');
  timeManager.getTimeLeft().then(time => {
    timeText.innerText = `${time.getHours()}:${formatTime(time.getMinutes())}:${formatTime(time.getSeconds())}`;
    getTime();
  });

});
