import '@nextapps-be/livewire-sortablejs';

// Page preview device switch
const deviceButtons = document.querySelectorAll('#device-selector button');
const previewIframe = document.getElementById('page-preview');
deviceButtons.forEach(button => {
    button.addEventListener('click', () => {
        deviceButtons.forEach((button) => button.classList.remove('active'));
        button.classList.add('active');

        const selectedDevice = button.dataset.device;
        let iframeWidth = '100%';

        if (selectedDevice === 'mobile') {
            iframeWidth = '390px';
        }
        if (selectedDevice === 'tablet') {
            iframeWidth = '768px';
        }

        previewIframe.style.maxWidth = iframeWidth;
    });
});
