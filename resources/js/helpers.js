document.addEventListener('DOMContentLoaded', function () {
    // Html Editor
    let editorTriggerList = [].slice.call(document.querySelectorAll('.html-editor'))
    editorTriggerList.map(function (editorTriggerEl) {
        if (ClassicEditor !== undefined) {
            editorTriggerEl.required = false;
            ClassicEditor.create(editorTriggerEl);
        }
    });

    // Link with method
    let linkTriggerList = [].slice.call(document.querySelectorAll('a[data-method]'))
    linkTriggerList.map(function (linkTriggerEl) {
        linkTriggerEl.onclick = function (event) {
            event.preventDefault();
            let confirmation = event.currentTarget.getAttribute('data-confirm-message');
            if (confirmation && !confirm(confirmation)) {
                event.stopPropagation();
                event.stopImmediatePropagation();

                return false;
            }

            let form = document.createElement('form');
            let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            form.setAttribute('method', 'POST');
            form.setAttribute('action', event.currentTarget.getAttribute('href'));
            form.style.display = 'none';
            form.innerHTML = '<input type="hidden" name="_method" value="' + event.currentTarget.getAttribute('data-method') + '">'
                + '<input type="hidden" name="_token" value="' + token + '">';
            document.body.appendChild(form);
            form.submit();

            linkTriggerEl.style.pointerEvents = 'none';

            return false;
        };

        linkTriggerEl.style.pointerEvents = 'auto';
    });
}, false);
