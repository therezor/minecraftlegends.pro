import {BEFORE_END, BUTTON_CLASS, SELECT_CLASS} from './constants';

const createOption = (value, text, selected) => {
  const option = document.createElement('option');
  option.innerText = text;

  if (value) {
    option.setAttribute('value', value);
  }

  if (selected) {
    option.setAttribute('selected', selected);
  }

  return option;
};

export const createSelect = (commandId, title, options, execCommand) => {
  const select = document.createElement('select');
  select.dataset.commandId = commandId;
  select.className = SELECT_CLASS;
  select.title = title;
  select.addEventListener('change', e =>
    execCommand(commandId, e.target.options[e.target.selectedIndex].value)
  );

  for (const option of options) {
    select.insertAdjacentElement(
      BEFORE_END,
      createOption(option.value, option.text, option.selected)
    );
  }

  return select;
};
