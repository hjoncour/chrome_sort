if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-mode');
} else {
    document.body.classList.add('light-mode');
}

chrome.storage.local.get('themeColor', function(data) {
    if (data.themeColor) {
        document.body.style.backgroundColor = data.themeColor;
    }
});
