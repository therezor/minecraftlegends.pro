import { BEFORE_END, BUTTON_CLASS } from './constants';

export const createButton = (commandId, title, children, execCommand) => {
  const button = document.createElement('button');
  button.dataset.commandId = commandId;
  button.className = BUTTON_CLASS;
  button.title = title;
  button.type = 'button';
  button.insertAdjacentElement(BEFORE_END, children);
  button.addEventListener('click', () => execCommand(commandId));

  return button;
};
