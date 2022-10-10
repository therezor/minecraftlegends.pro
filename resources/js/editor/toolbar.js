import { createSelect } from './select';
import { createButton } from './button';
import { createIcon } from './icon';
import { createInput } from './input';
import { BEFORE_END } from './constants';

const NO = 'no';

const createSeparator = () => {
  const separator = document.createElement('span');
  separator.className = '__toolbar-separator';

  return separator;
};

export const createToolbar = (options, execCommand) => {
  const toolbar = document.createElement('div');
  toolbar.className = '__toolbar';

  // Styles
  if (options.formatblock !== NO) {
    toolbar.insertAdjacentElement(
      BEFORE_END,
      createSelect(
        'formatblock',
        'Styles',
        [
          { value: 'h2', text: 'Heading 1' },
          { value: 'h3', text: 'Heading 2' },
          { value: 'h4', text: 'Heading 3' },
          { value: 'p', text: 'Normal', selected: true },
        ],
        execCommand
      )
    );
  }

  // Bold
  if (options.bold !== NO) {
    toolbar.insertAdjacentElement(
      BEFORE_END,
      createButton('strong', 'Bold', createIcon('bi bi-type-bold'), execCommand)
    );
  }

  // Italic
  if (options.italic !== NO) {
    toolbar.insertAdjacentElement(
      BEFORE_END,
      createButton('italic', 'Italic', createIcon('bi bi-type-italic'), execCommand)
    );
  }

  // Separator
  toolbar.insertAdjacentElement(BEFORE_END, createSeparator());


  // Separator
  toolbar.insertAdjacentElement(BEFORE_END, createSeparator());

  // Numbered list
  if (options.insertorderedlist !== NO) {
    toolbar.insertAdjacentElement(
      BEFORE_END,
      createButton(
        'insertorderedlist',
        'Numbered list',
        createIcon('bi bi-list-ol'),
        execCommand
      )
    );
  }

  // Bulleted list
  if (options.insertunorderedlist !== NO) {
    toolbar.insertAdjacentElement(
      BEFORE_END,
      createButton(
        'insertunorderedlist',
        'Bulleted list',
        createIcon('bi bi-list-ul'),
        execCommand
      )
    );
  }

  // Separator
  toolbar.insertAdjacentElement(BEFORE_END, createSeparator());

  // Clear formatting
  if (options.removeFormat !== NO) {
    toolbar.insertAdjacentElement(
      BEFORE_END,
      createButton(
        'removeFormat',
        'Clear formatting',
        createIcon('bi bi-eraser'),
        execCommand
      )
    );
  }

  return toolbar;
};
