import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Image from '@editorjs/image';
import List from '@editorjs/list';
import Quote from '@editorjs/quote';
import Warning from '@editorjs/warning';
import Marker from '@editorjs/marker';
import CodeTool from '@editorjs/code';
import Delimiter from '@editorjs/delimiter';
import LinkTool from '@editorjs/link';
import Embed from '@editorjs/embed';
import Table from '@editorjs/table';

const editor = new EditorJS({
    /**
     * Id of Element that should contain the Editor
     */
    holder: 'content-editor',

    /**
     * Available Tools list.
     * Pass Tool's class or Settings object for each Tool you want to use
     */
    tools: {
        /**
         * Each Tool is a Plugin. Pass them via 'class' option with necessary settings {@link docs/tools.md}
         */
        header: {
            class: Header,
        },
        image: {
            class: Image,
            // config: {
            //     endpoint: '/api/uploadFile' // Your backend file uploader endpoint
            // }
        },
        list: {
            class: List,
            inlineToolbar: true
        },
        quote: {
            class: Quote,
            inlineToolbar: true,
        },
        warning: Warning,
        marker: {
            class: Marker,
            shortcut: 'CMD+SHIFT+M'
        },
        code: {
            class: CodeTool,
            shortcut: 'CMD+SHIFT+C'
        },
        delimiter: Delimiter,
        link: {
            class: LinkTool,
        },
        embed: {
            class: Embed,
            inlineToolbar: true,
        },
        table: {
            class: Table,
            inlineToolbar: true,
        },
    },

    /**
     * Previously saved data that should be rendered
     */
    data: {}
});
