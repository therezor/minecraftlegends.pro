document.addEventListener('DOMContentLoaded', function () {
    // Html Editor
    let editorTriggerList = [].slice.call(document.querySelectorAll('.html-editor'))
    editorTriggerList.map(function (editorTriggerEl) {
        if (ClassicEditor !== undefined) {
            editorTriggerEl.required = false;
            ClassicEditor.create(editorTriggerEl);
        }
    });

    let editorTriggerList = [].slice.call(document.querySelectorAll('.html-editor'))
    editorTriggerList.map(function (editorTriggerEl) {
        if (ClassicEditor !== undefined) {
            editorTriggerEl.required = false;
            ClassicEditor.create(editorTriggerEl);
        }
    });

    // Slug
    let slugTriggerList = [].slice.call(document.querySelectorAll('input[data-slug-input]'))
    slugTriggerList.map(function (slugTriggerEl) {
        slugTriggerEl.oninput = function (event) {
            let title = document.querySelector(event.target.getAttribute('data-slug-input'));
            title.value = event.target.value.toString()
                .toLowerCase()
                .normalize('NFD')                   // split an accented letter in the base letter and the acent
                .replace(/[\u0300-\u036f]/g, '')   // remove all previously split accents
                .replace(/\s+/g, '-') // Replace spaces with -
                .replace(/&/g, '-and-') // Replace & with 'and'
                .replace(/[^\w\-]+/g, '') // Remove all non-word characters
                .replace(/\-\-+/g, '-') // Replace multiple - with single -
                .trim();

            title.dispatchEvent(new Event('input')); // For livewire
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
