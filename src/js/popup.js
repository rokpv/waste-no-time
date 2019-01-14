// Once the DOM is ready...
window.addEventListener('DOMContentLoaded', function() {
    // browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    //     if (request.code === 'timeLeft') {
    //         document.getElementById('time-left').innerText = request.time;
    //     }
    // });

    const port = browser.extension.connect({
        name: "Sample Communication"
    });
    port.onMessage.addListener(function(msg) {
        if (msg.code === 'timeLeft') {
            document.getElementById('time-left').innerText = msg.time;
        }
    });
});
