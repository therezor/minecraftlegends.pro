import {createPopper} from "@popperjs/core";
import {ModuleFactory} from '@dashboardcode/bsmultiselect';

document.addEventListener('DOMContentLoaded', () => {
        function initializeEditor(el) {
            if (el.classList.contains('text-editor')) {
                if (ClassicEditor !== undefined && el.style.display !== 'none') {
                    el.required = false;
                    ClassicEditor.create(el, {
                        toolbar: {
                            items: [
                                'heading', '|',
                                'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|',
                                'outdent', 'indent', '|',
                                'undo', 'redo', 'removeFormat'
                            ],
                            shouldNotGroupWhenFull: true
                        },
                        heading: {
                            options: [
                                {model: 'paragraph', title: 'Paragraph'},
                                {model: 'heading3', view: 'h3', title: 'Heading 1', class: 'ck-heading_heading1'},
                                {model: 'heading4', view: 'h4', title: 'Heading 2', class: 'ck-heading_heading2'},
                                {model: 'heading5', view: 'h5', title: 'Heading 3', class: 'ck-heading_heading3'}
                            ]
                        }
                    }).then(editor => {
                        editor.model.document.on('change:data', async () => {
                            el.value = editor.getData();
                            el.dispatchEvent(new Event('input'));
                        });
                    });
                }
            }
        }

        function initializeSelect(el) {
            if (el.classList.contains('multi-select')) {
                ModuleFactory({window, createPopper}).BsMultiSelect(el, {
                    useCssPatch: true,
                    css: {
                        pick: ''
                    }
                });
            }
        }

        Livewire.hook('element.initialized', (el, component) => {
            initializeEditor(el);
            initializeSelect(el);
        });
        Livewire.hook('element.updated', (el, component) => {
            initializeEditor(el);
            initializeSelect(el);
        })
    }
);
