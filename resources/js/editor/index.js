import { transformToEditor } from "./editor";

document.querySelectorAll("[data-editor]").forEach(transformToEditor);

window.__tinyEditor = {
  transformToEditor,
};
