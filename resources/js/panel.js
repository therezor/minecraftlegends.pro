import Dropdown from 'bootstrap/js/dist/dropdown';
import Collapse from 'bootstrap/js/dist/collapse';
import Alert from 'bootstrap/js/dist/alert';
import Tooltip from 'bootstrap/js/dist/tooltip';
import {createPopper} from "@popperjs/core";
import {ModuleFactory} from '@dashboardcode/bsmultiselect';

// Init tooltips
let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
tooltipTriggerList.map(function (triggerEl) {
    return new Tooltip(triggerEl)
});

// Multiselect
let multiselectTriggerList = [].slice.call(document.querySelectorAll('.multi-select'))
multiselectTriggerList.map(function (triggerEl) {
    ModuleFactory({window, createPopper}).BsMultiSelect(triggerEl, {
        useCssPatch: true,
        css: {
            pick: ''
        }
    });
});


import './helpers';


