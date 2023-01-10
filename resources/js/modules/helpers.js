/*
 *  Document   : helpers.js
 *  Author     : pixelcave
 *  Description: Various helpers for plugin inits or helper functionality
 *
 */

import ImageUpload from './image-upload';

// Helper variables
let jqSparklineResize = false;
let jqSparklineTimeout;

// Helpers
export default class Helpers {
  /*
   * Run helpers
   *
   */
  static run(helpers, options = {}) {
    let helperList = {
      // Bootstrap
      'bs-tooltip': () => this.bsTooltip(),
      'bs-popover': () => this.bsPopover(),

      // OneUI
      'one-toggle-class': () => this.oneToggleClass(),
      'one-year-copy': () => this.oneYearCopy(),
      'one-ripple': () => this.oneRipple(),
      'one-print': () => this.onePrint(),
      'one-table-tools-sections': () => this.oneTableToolsSections(),
      'one-table-tools-checkable': () => this.oneTableToolsCheckable(),

      // JavaScript
      'js-ckeditor': () => this.jsCkeditor(),
      'js-ckeditor5': () => this.jsCkeditor5(),
      'js-simplemde': () => this.jsSimpleMDE(),
      'js-highlightjs': () => this.jsHighlightjs(),
      'js-flatpickr': () => this.jsFlatpickr(),

      // Other:
      'image-upload': () => this.imageUpload(),
    };

    if (helpers instanceof Array) {
      for (let index in helpers) {
        if (helperList[helpers[index]]) {
          helperList[helpers[index]](options);
        }
      }
    } else {
      if (helperList[helpers]) {
        helperList[helpers](options);
      }
    }
  }

  /*
   ********************************************************************************************
   *
   * Init helpers for Bootstrap plugins
   *
   *********************************************************************************************
   */

  /*
   * Bootstrap Tooltip, for more examples you can check out https://getbootstrap.com/docs/5.0/components/tooltips/
   *
   * Helpers.run('bs-tooltip');
   *
   * Example usage:
   *
   * <button type="button" class="btn btn-primary" data-bs-toggle="tooltip" title="Tooltip Text">Example</button> or
   * <button type="button" class="btn btn-primary js-bs-tooltip" title="Tooltip Text">Example</button>
   *
   */
  static bsTooltip() {
    let elements = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]:not(.js-bs-tooltip-enabled), .js-bs-tooltip:not(.js-bs-tooltip-enabled)'));

    window.helperBsTooltips = elements.map(el => {
      // Add .js-bs-tooltip-enabled class to tag it as activated
      el.classList.add('js-bs-tooltip-enabled');

      // Init Bootstrap Tooltip
      return new bootstrap.Tooltip(el, {
        container: el.dataset.bsContainer || '#page-container',
        animation: el.dataset.bsAnimation && el.dataset.bsAnimation.toLowerCase() == 'true' ? true : false,
      })
    });
  }

  /*
   * Bootstrap Popover, for more examples you can check out https://getbootstrap.com/docs/5.0/components/popovers/
   *
   * Helpers.run('bs-popover');
   *
   * Example usage:
   *
   * <button type="button" class="btn btn-primary" data-bs-toggle="popover" title="Popover Title" data-bs-content="This is the content of the Popover">Example</button> or
   * <button type="button" class="btn btn-primary js-bs-popover" title="Popover Title" data-bs-content="This is the content of the Popover">Example</button>
   *
   */
  static bsPopover() {
    let elements = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]:not(.js-bs-popover-enabled), .js-bs-popover:not(.js-bs-popover-enabled)'));

    window.helperBsPopovers = elements.map(el => {
      // Add .js-bs-popover-enabled class to tag it as activated
      el.classList.add('js-bs-popover-enabled');

      // Init Bootstrap Popover
      return new bootstrap.Popover(el, {
        container: el.dataset.bsContainer || '#page-container',
        animation: el.dataset.bsAnimation && el.dataset.bsAnimation.toLowerCase() == 'true' ? true : false,
        trigger: el.dataset.bsTrigger || 'hover focus',
      })
    });
  }

  /*
   ********************************************************************************************
   *
   * JS helpers to add custom functionality
   *
   *********************************************************************************************
   */

  /*
   * Toggle class on element click
   *
   * Helpers.run('one-toggle-class');
   *
   * Example usage (on button click, "exampleClass" class is toggled on the element with id "elementID"):
   *
   * <button type="button" class="btn btn-primary" data-toggle="class-toggle" data-target="#elementID" data-class="exampleClass">Toggle</button>
   *
   * or
   *
   * <button type="button" class="btn btn-primary js-class-toggle" data-target="#elementID" data-class="exampleClass">Toggle</button>
   *
   */
  static oneToggleClass() {
    let elements = document.querySelectorAll('[data-toggle="class-toggle"]:not(.js-class-toggle-enabled), .js-class-toggle:not(.js-class-toggle-enabled)');

    elements.forEach(el => {
      el.addEventListener('click', () => {
        // Add .js-class-toggle-enabled class to tag it as activated
        el.classList.add('js-class-toggle-enabled');

        // Get all classes
        let cssClasses = el.dataset.class ? el.dataset.class.split(' ') : false;

        // Toggle class on target elements
        document.querySelectorAll(el.dataset.target).forEach(targetEl => {
          if (cssClasses) {
            cssClasses.forEach(cls => {
              targetEl.classList.toggle(cls);
            });
          }
        });
      });
    });
  }

  /*
   * Add the correct copyright year to an element
   *
   * Helpers.run('one-year-copy');
   *
   * Example usage (it will get populated with current year if empty or will append it to specified year if needed):
   *
   * <span data-toggle="year-copy"></span> or
   * <span data-toggle="year-copy">2018</span>
   *
   */
  static oneYearCopy() {
    let elements = document.querySelectorAll('[data-toggle="year-copy"]:not(.js-year-copy-enabled)');

    elements.forEach(el => {
      let date = new Date();
      let currentYear = date.getFullYear();
      let baseYear = el.textContent || currentYear;

      // Add .js-year-copy-enabled class to tag it as activated
      el.classList.add('js-year-copy-enabled');

      // Set the correct year
      el.textContent = (parseInt(baseYear) >= currentYear) ? currentYear : baseYear + '-' + currentYear.toString().substr(2, 2);
    });
  }

  /*
   * Ripple effect fuctionality
   *
   * Helpers.run('one-ripple');
   *
   * Example usage:
   *
   * <button type="button" class="btn btn-primary" data-toggle="click-ripple">Click Me!</button>
   *
   */
  static oneRipple() {
    let elements = document.querySelectorAll('[data-toggle="click-ripple"]:not(.js-click-ripple-enabled)');

    elements.forEach(el => {
      // Add .js-click-ripple-enabled class to tag it as activated and init it
      el.classList.add('js-click-ripple-enabled');

      // Add custom CSS styles
      el.style.overflow = 'hidden';
      el.style.position = 'relative';
      el.style.zIndex = 1;

      // On click create and render the ripple
      el.addEventListener('click', e => {
        let cssClass = 'click-ripple';
        let ripple = el.querySelector('.' + cssClass);
        let d, x, y;

        // If the ripple element exists in this element, remove .animate class from ripple element..
        if (ripple) {
          ripple.classList.remove('animate');
        }
        else { // ..else add it
          let elChild = document.createElement('span')

          elChild.classList.add(cssClass)
          el.insertBefore(elChild, el.firstChild);
        }

        // Get the ripple element
        ripple = el.querySelector('.' + cssClass);

        // If the ripple element doesn't have dimensions, set them accordingly
        if ((getComputedStyle(ripple).height === '0px') || (getComputedStyle(ripple).width === '0px')) {
          d = Math.max(el.offsetWidth, el.offsetHeight)

          ripple.style.height = d + 'px'
          ripple.style.width = d + 'px'
        }

        // Get coordinates for our ripple element
        x = e.pageX - (el.getBoundingClientRect().left + window.scrollX) - parseFloat(getComputedStyle(ripple).width.replace('px', '')) / 2
        y = e.pageY - (el.getBoundingClientRect().top + window.scrollY) - parseFloat(getComputedStyle(ripple).height.replace('px', '')) / 2

        // Position the ripple element and add the class .animate to it
        ripple.style.top = y + 'px'
        ripple.style.left = x + 'px'
        ripple.classList.add('animate')
      });
    });
  }

  /*
   * Print Page functionality
   *
   * Helpers.run('one-print');
   *
   */
  static onePrint() {
    // Store all #page-container classes
    let lPage = document.getElementById('page-container');
    let pageCls = lPage.className;

    console.log(pageCls);

    // Remove all classes from #page-container
    lPage.classList = '';

    // Print the page
    window.print();

    // Restore all #page-container classes
    lPage.classList = pageCls;
  }

  /*
   * Table sections functionality
   *
   * Helpers.run('one-table-tools-sections');
   *
   * Example usage:
   *
   * Please check out the Table Helpers page for complete markup examples
   *
   */
  static oneTableToolsSections() {
    let tables = document.querySelectorAll('.js-table-sections:not(.js-table-sections-enabled)');

    tables.forEach(table => {
      // Add .js-table-sections-enabled class to tag it as activated
      table.classList.add('js-table-sections-enabled');

      // When a row is clicked in tbody.js-table-sections-header
      table.querySelectorAll('.js-table-sections-header > tr').forEach(tr => {
        tr.addEventListener('click', e => {
          if (e.target.type !== 'checkbox'
            && e.target.type !== 'button'
            && e.target.tagName.toLowerCase() !== 'a'
            && e.target.parentNode.nodeName.toLowerCase() !== 'a'
            && e.target.parentNode.nodeName.toLowerCase() !== 'button'
            && e.target.parentNode.nodeName.toLowerCase() !== 'label'
            && !e.target.parentNode.classList.contains('custom-control')) {
            let tbody = tr.parentNode;
            let tbodyAll = table.querySelectorAll('tbody');

            if (!tbody.classList.contains('show')) {
              if (tbodyAll) {
                tbodyAll.forEach(tbodyEl => {
                  tbodyEl.classList.remove('show');
                  tbodyEl.classList.remove('table-active');
                });
              }
            }

            tbody.classList.toggle('show');
            tbody.classList.toggle('table-active');
          }
        });
      });
    });
  }

  /*
   * Checkable table functionality
   *
   * Helpers.run('one-table-tools-checkable');
   *
   * Example usage:
   *
   * Please check out the Table Helpers page for complete markup examples
   *
   */
  static oneTableToolsCheckable() {
    let tables = document.querySelectorAll('.js-table-checkable:not(.js-table-checkable-enabled)');

    tables.forEach(table => {
      // Add .js-table-checkable-enabled class to tag it as activated
      table.classList.add('js-table-checkable-enabled');

      // When a checkbox is clicked in thead
      table.querySelector('thead input[type=checkbox]').addEventListener('click', e => {
        // Check or uncheck all checkboxes in tbody
        table.querySelectorAll('tbody input[type=checkbox]').forEach(checkbox => {
          checkbox.checked = e.currentTarget.checked;

          // Update Row classes
          this.tableToolscheckRow(checkbox, e.currentTarget.checked);
        });
      });

      // When a checkbox is clicked in tbody
      table.querySelectorAll('tbody input[type=checkbox], tbody input + label').forEach(checkbox => {
        checkbox.addEventListener('click', e => {
          let checkboxHead = table.querySelector('thead input[type=checkbox]');

          // Adjust checkbox in thead
          if (!checkbox.checked) {
            checkboxHead.checked = false
          } else {
            if (table.querySelectorAll('tbody input[type=checkbox]:checked').length === table.querySelectorAll('tbody input[type=checkbox]').length) {
              checkboxHead.checked = true;
            }
          }

          // Update Row classes
          this.tableToolscheckRow(checkbox, checkbox.checked);
        });
      });

      // When a row is clicked in tbody
      table.querySelectorAll('tbody > tr').forEach(tr => {
        tr.addEventListener('click', e => {
          if (e.target.type !== 'checkbox'
            && e.target.type !== 'button'
            && e.target.tagName.toLowerCase() !== 'a'
            && e.target.parentNode.nodeName.toLowerCase() !== 'a'
            && e.target.parentNode.nodeName.toLowerCase() !== 'button'
            && e.target.parentNode.nodeName.toLowerCase() !== 'label'
            && !e.target.parentNode.classList.contains('custom-control')) {
            let checkboxHead = table.querySelector('thead input[type=checkbox]');
            let checkbox = e.currentTarget.querySelector('input[type=checkbox]');

            // Update row's checkbox status
            checkbox.checked = !checkbox.checked;

            // Update Row classes
            this.tableToolscheckRow(checkbox, checkbox.checked);

            // Adjust checkbox in thead
            if (!checkbox.checked) {
              checkboxHead.checked = false
            } else {
              if (table.querySelectorAll('tbody input[type=checkbox]:checked').length === table.querySelectorAll('tbody input[type=checkbox]').length) {
                checkboxHead.checked = true;
              }
            }
          }
        });
      });
    });
  }

  // Checkable table functionality helper - Checks or unchecks table row
  static tableToolscheckRow(checkbox, checkedStatus) {
    if (checkedStatus) {
      checkbox.closest('tr').classList.add('table-active');
    } else {
      checkbox.closest('tr').classList.remove('table-active');
    }
  }

  /*
   ********************************************************************************************
   *
   * Init helpers for pure JS libraries
   *
   ********************************************************************************************
   */

  /*
   * CKEditor init, for more examples you can check out http://ckeditor.com/
   *
   * Helpers.run('jsCkeditor');
   *
   * Example usage:
   *
   * <textarea id="js-ckeditor" name="ckeditor">Hello CKEditor!</textarea> or
   * <div id="js-ckeditor-inline">Hello inline CKEditor!</div>
   *
   */
  static jsCkeditor() {
    let ckeditorInline = document.querySelector('#js-ckeditor-inline:not(.js-ckeditor-inline-enabled)');
    let ckeditorFull = document.querySelector('#js-ckeditor:not(.js-ckeditor-enabled)');

    // Init inline text editor
    if (ckeditorInline) {
      ckeditorInline.setAttribute('contenteditable', 'true');
      CKEDITOR.inline('js-ckeditor-inline');

      // Add .js-ckeditor-inline-enabled class to tag it as activated
      ckeditorInline.classList.add('js-ckeditor-inline-enabled');
    }

    // Init full text editor
    if (ckeditorFull) {
      CKEDITOR.replace('js-ckeditor');

      // Add .js-ckeditor-enabled class to tag it as activated
      ckeditorFull.classList.add('js-ckeditor-enabled');
    }
  }

  /*
   * CKEditor 5 init, for more examples you can check out http://ckeditor.com/
   *
   * Helpers.run('js-ckeditor5');
   *
   * Example usage:
   *
   * <div id="js-ckeditor5-classic">Hello classic CKEditor 5!</div>
   * ..or..
   * <div id="js-ckeditor5-inline">Hello inline CKEditor 5!</div>
   *
   */
  static jsCkeditor5() {
    let ckeditor5Inline = document.querySelector('#js-ckeditor5-inline');
    let ckeditor5Full = document.querySelector('#js-ckeditor5-classic');

    // Init inline text editor
    if (ckeditor5Inline) {
      InlineEditor
        .create(document.querySelector('#js-ckeditor5-inline'))
        .then(editor => {
          window.editor = editor;
        })
        .catch(error => {
          console.error('There was a problem initializing the inline editor.', error);
        });
    }

    // Init full text editor
    if (ckeditor5Full) {
      ClassicEditor
        .create(document.querySelector('#js-ckeditor5-classic'))
        .then(editor => {
          window.editor = editor;
        })
        .catch(error => {
          console.error('There was a problem initializing the classic editor.', error);
        });
    }
  }

  /*
   * SimpleMDE init, for more examples you can check out https://github.com/NextStepWebs/simplemde-markdown-editor
   *
   * Helpers.run('js-simplemde');
   *
   * Example usage:
   *
   * <textarea class="js-simplemde" id="simplemde" name="simplemde">Hello SimpleMDE!</textarea>
   *
   */
  static jsSimpleMDE() {
    let elements = document.querySelectorAll('.js-simplemde');

    elements.forEach(el => {
      // Init editor
      new SimpleMDE({ element: el, autoDownloadFontAwesome: false });
    });

    // Fix: Change SimpleMDE's Font Awesome 4 Icons with Font Awesome 6
    if (elements) {
      document.querySelector('.editor-toolbar > a.fa-header').classList.replace('fa-header', 'fa-heading');
      document.querySelector('.editor-toolbar > a.fa-picture-o').classList.replace('fa-picture-o', 'fa-image');
    }
  }

  /*
   * Highlight.js, for more examples you can check out https://highlightjs.org/usage/
   *
   * Helpers.run('js-highlightjs');
   *
   * Example usage:
   *
   * Please check out the Syntax Highlighting page in Components for complete markup examples
   *
   */
  static jsHighlightjs() {
    // Init Highlight.js
    if (!hljs.isHighlighted) {
      hljs.initHighlighting();
    }
  }

  /*
   * Flatpickr init, for more examples you can check out https://github.com/flatpickr/flatpickr
   *
   * Helpers.run('js-flatpickr');
   *
   * Example usage:
   *
   * <input type="text" class="js-flatpickr form-control">
   *
   */
  static jsFlatpickr() {
    let elements = document.querySelectorAll('.js-flatpickr:not(.js-flatpickr-enabled)');

    elements.forEach(el => {
      // Add .js-flatpickr-enabled class to tag it as activated
      el.classList.add('js-flatpickr-enabled');

      // Init it
      flatpickr(el);
    });
  }

  static imageUpload() {
    let elements = document.querySelectorAll('.img-preview');

    elements.forEach(el => {
        new ImageUpload(el);
    });
  }
}
