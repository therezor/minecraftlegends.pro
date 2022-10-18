import Dropdown from 'bootstrap/js/dist/dropdown';
import Collapse from 'bootstrap/js/dist/collapse';
import Alert from 'bootstrap/js/dist/alert';
import Tooltip from 'bootstrap/js/dist/tooltip';


// Init tooltips
let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
tooltipTriggerList.map(function (triggerEl) {
    return new Tooltip(triggerEl)
});

import './helpers';

