import EditorJS from '@editorjs/editorjs';
import Paragraph from '@editorjs/paragraph';
import Header from '@editorjs/header';
import Quote from '@editorjs/quote';
import Warning from '@editorjs/warning';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import ImageTool from '@editorjs/image';

document.querySelectorAll('.content-editor').forEach(el => {
    let dataInput = el.parentNode.querySelector(el.dataset.target);

    const editor = new EditorJS({
        holder: el,
        logLevel: 'ERROR',
        data: dataInput.value ? JSON.parse(dataInput.value) : {},
        onChange: (api, event) => {
            editor.save().then((outputData) => {
                dataInput.value = JSON.stringify(outputData);
            });
        },
        tools: {
            paragraph: {
                class: Paragraph,
            },
            header: {
                class: Header,
                config: {
                    levels: [2, 3, 4],
                    defaultLevel: 2
                }
            },
            quote: {
                class: Quote,
            },
            warning: {
                class: Warning,
            },
            list: {
                class: List,
                config: {
                    defaultStyle: 'unordered'
                }
            },
            embed: {
                class: Embed,
            },
            image: {
                class: ImageTool,
                config: {
                    endpoints: {
                        byFile: '/uploadFile', // Your backend file uploader endpoint
                        byUrl: '/fetchUrl', // Your endpoint that provides uploading by Url
                    }
                }
            }
        }
    });
});

