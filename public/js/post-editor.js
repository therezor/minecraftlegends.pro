/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!*************************************!*\
  !*** ./resources/js/post-editor.js ***!
  \*************************************/
__webpack_require__.r(__webpack_exports__);
Object(function webpackMissingModule() { var e = new Error("Cannot find module '@editorjs/editorjs'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module '@editorjs/header'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module '@editorjs/image'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module '@editorjs/list'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module '@editorjs/quote'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module '@editorjs/warning'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module '@editorjs/marker'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module '@editorjs/code'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module '@editorjs/delimiter'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module '@editorjs/link'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module '@editorjs/embed'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module '@editorjs/table'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());












var editor = new Object(function webpackMissingModule() { var e = new Error("Cannot find module '@editorjs/editorjs'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())({
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
      "class": Object(function webpackMissingModule() { var e = new Error("Cannot find module '@editorjs/header'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())
    },
    image: {
      "class": Object(function webpackMissingModule() { var e = new Error("Cannot find module '@editorjs/image'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) // config: {
      //     endpoint: '/api/uploadFile' // Your backend file uploader endpoint
      // }

    },
    list: {
      "class": Object(function webpackMissingModule() { var e = new Error("Cannot find module '@editorjs/list'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()),
      inlineToolbar: true
    },
    quote: {
      "class": Object(function webpackMissingModule() { var e = new Error("Cannot find module '@editorjs/quote'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()),
      inlineToolbar: true
    },
    warning: Object(function webpackMissingModule() { var e = new Error("Cannot find module '@editorjs/warning'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()),
    marker: {
      "class": Object(function webpackMissingModule() { var e = new Error("Cannot find module '@editorjs/marker'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()),
      shortcut: 'CMD+SHIFT+M'
    },
    code: {
      "class": Object(function webpackMissingModule() { var e = new Error("Cannot find module '@editorjs/code'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()),
      shortcut: 'CMD+SHIFT+C'
    },
    delimiter: Object(function webpackMissingModule() { var e = new Error("Cannot find module '@editorjs/delimiter'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()),
    link: {
      "class": Object(function webpackMissingModule() { var e = new Error("Cannot find module '@editorjs/link'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())
    },
    embed: {
      "class": Object(function webpackMissingModule() { var e = new Error("Cannot find module '@editorjs/embed'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()),
      inlineToolbar: true
    },
    table: {
      "class": Object(function webpackMissingModule() { var e = new Error("Cannot find module '@editorjs/table'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()),
      inlineToolbar: true
    }
  },

  /**
   * Previously saved data that should be rendered
   */
  data: {}
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2pzL3Bvc3QtZWRpdG9yLmpzIiwibWFwcGluZ3MiOiI7O1VBQUE7VUFDQTs7Ozs7V0NEQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQU1ZLE1BQU0sR0FBRyxJQUFJWixpSkFBSixDQUFhO0VBQ3hCO0FBQ0o7QUFDQTtFQUNJYSxNQUFNLEVBQUUsZ0JBSmdCOztFQU14QjtBQUNKO0FBQ0E7QUFDQTtFQUNJQyxLQUFLLEVBQUU7SUFDSDtBQUNSO0FBQ0E7SUFDUUMsTUFBTSxFQUFFO01BQ0osU0FBT2QsK0lBQU1BO0lBRFQsQ0FKTDtJQU9IZSxLQUFLLEVBQUU7TUFDSCxTQUFPZCw4SUFESixDQUVIO01BQ0E7TUFDQTs7SUFKRyxDQVBKO0lBYUhlLElBQUksRUFBRTtNQUNGLFNBQU9kLDZJQURMO01BRUZlLGFBQWEsRUFBRTtJQUZiLENBYkg7SUFpQkhDLEtBQUssRUFBRTtNQUNILFNBQU9mLDhJQURKO01BRUhjLGFBQWEsRUFBRTtJQUZaLENBakJKO0lBcUJIRSxPQUFPLEVBQUVmLGdKQXJCTjtJQXNCSGdCLE1BQU0sRUFBRTtNQUNKLFNBQU9mLCtJQURIO01BRUpnQixRQUFRLEVBQUU7SUFGTixDQXRCTDtJQTBCSEMsSUFBSSxFQUFFO01BQ0YsU0FBT2hCLDZJQURMO01BRUZlLFFBQVEsRUFBRTtJQUZSLENBMUJIO0lBOEJIRSxTQUFTLEVBQUVoQixrSkE5QlI7SUErQkhpQixJQUFJLEVBQUU7TUFDRixTQUFPaEIsNklBQVFBO0lBRGIsQ0EvQkg7SUFrQ0hpQixLQUFLLEVBQUU7TUFDSCxTQUFPaEIsOElBREo7TUFFSFEsYUFBYSxFQUFFO0lBRlosQ0FsQ0o7SUFzQ0hTLEtBQUssRUFBRTtNQUNILFNBQU9oQiw4SUFESjtNQUVITyxhQUFhLEVBQUU7SUFGWjtFQXRDSixDQVZpQjs7RUFzRHhCO0FBQ0o7QUFDQTtFQUNJVSxJQUFJLEVBQUU7QUF6RGtCLENBQWIsQ0FBZixDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9wb3N0LWVkaXRvci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgcmVxdWlyZSBzY29wZVxudmFyIF9fd2VicGFja19yZXF1aXJlX18gPSB7fTtcblxuIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IEVkaXRvckpTIGZyb20gJ0BlZGl0b3Jqcy9lZGl0b3Jqcyc7XG5pbXBvcnQgSGVhZGVyIGZyb20gJ0BlZGl0b3Jqcy9oZWFkZXInO1xuaW1wb3J0IEltYWdlIGZyb20gJ0BlZGl0b3Jqcy9pbWFnZSc7XG5pbXBvcnQgTGlzdCBmcm9tICdAZWRpdG9yanMvbGlzdCc7XG5pbXBvcnQgUXVvdGUgZnJvbSAnQGVkaXRvcmpzL3F1b3RlJztcbmltcG9ydCBXYXJuaW5nIGZyb20gJ0BlZGl0b3Jqcy93YXJuaW5nJztcbmltcG9ydCBNYXJrZXIgZnJvbSAnQGVkaXRvcmpzL21hcmtlcic7XG5pbXBvcnQgQ29kZVRvb2wgZnJvbSAnQGVkaXRvcmpzL2NvZGUnO1xuaW1wb3J0IERlbGltaXRlciBmcm9tICdAZWRpdG9yanMvZGVsaW1pdGVyJztcbmltcG9ydCBMaW5rVG9vbCBmcm9tICdAZWRpdG9yanMvbGluayc7XG5pbXBvcnQgRW1iZWQgZnJvbSAnQGVkaXRvcmpzL2VtYmVkJztcbmltcG9ydCBUYWJsZSBmcm9tICdAZWRpdG9yanMvdGFibGUnO1xuXG5jb25zdCBlZGl0b3IgPSBuZXcgRWRpdG9ySlMoe1xuICAgIC8qKlxuICAgICAqIElkIG9mIEVsZW1lbnQgdGhhdCBzaG91bGQgY29udGFpbiB0aGUgRWRpdG9yXG4gICAgICovXG4gICAgaG9sZGVyOiAnY29udGVudC1lZGl0b3InLFxuXG4gICAgLyoqXG4gICAgICogQXZhaWxhYmxlIFRvb2xzIGxpc3QuXG4gICAgICogUGFzcyBUb29sJ3MgY2xhc3Mgb3IgU2V0dGluZ3Mgb2JqZWN0IGZvciBlYWNoIFRvb2wgeW91IHdhbnQgdG8gdXNlXG4gICAgICovXG4gICAgdG9vbHM6IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEVhY2ggVG9vbCBpcyBhIFBsdWdpbi4gUGFzcyB0aGVtIHZpYSAnY2xhc3MnIG9wdGlvbiB3aXRoIG5lY2Vzc2FyeSBzZXR0aW5ncyB7QGxpbmsgZG9jcy90b29scy5tZH1cbiAgICAgICAgICovXG4gICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgY2xhc3M6IEhlYWRlcixcbiAgICAgICAgfSxcbiAgICAgICAgaW1hZ2U6IHtcbiAgICAgICAgICAgIGNsYXNzOiBJbWFnZSxcbiAgICAgICAgICAgIC8vIGNvbmZpZzoge1xuICAgICAgICAgICAgLy8gICAgIGVuZHBvaW50OiAnL2FwaS91cGxvYWRGaWxlJyAvLyBZb3VyIGJhY2tlbmQgZmlsZSB1cGxvYWRlciBlbmRwb2ludFxuICAgICAgICAgICAgLy8gfVxuICAgICAgICB9LFxuICAgICAgICBsaXN0OiB7XG4gICAgICAgICAgICBjbGFzczogTGlzdCxcbiAgICAgICAgICAgIGlubGluZVRvb2xiYXI6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgcXVvdGU6IHtcbiAgICAgICAgICAgIGNsYXNzOiBRdW90ZSxcbiAgICAgICAgICAgIGlubGluZVRvb2xiYXI6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIHdhcm5pbmc6IFdhcm5pbmcsXG4gICAgICAgIG1hcmtlcjoge1xuICAgICAgICAgICAgY2xhc3M6IE1hcmtlcixcbiAgICAgICAgICAgIHNob3J0Y3V0OiAnQ01EK1NISUZUK00nXG4gICAgICAgIH0sXG4gICAgICAgIGNvZGU6IHtcbiAgICAgICAgICAgIGNsYXNzOiBDb2RlVG9vbCxcbiAgICAgICAgICAgIHNob3J0Y3V0OiAnQ01EK1NISUZUK0MnXG4gICAgICAgIH0sXG4gICAgICAgIGRlbGltaXRlcjogRGVsaW1pdGVyLFxuICAgICAgICBsaW5rOiB7XG4gICAgICAgICAgICBjbGFzczogTGlua1Rvb2wsXG4gICAgICAgIH0sXG4gICAgICAgIGVtYmVkOiB7XG4gICAgICAgICAgICBjbGFzczogRW1iZWQsXG4gICAgICAgICAgICBpbmxpbmVUb29sYmFyOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICB0YWJsZToge1xuICAgICAgICAgICAgY2xhc3M6IFRhYmxlLFxuICAgICAgICAgICAgaW5saW5lVG9vbGJhcjogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUHJldmlvdXNseSBzYXZlZCBkYXRhIHRoYXQgc2hvdWxkIGJlIHJlbmRlcmVkXG4gICAgICovXG4gICAgZGF0YToge31cbn0pO1xuIl0sIm5hbWVzIjpbIkVkaXRvckpTIiwiSGVhZGVyIiwiSW1hZ2UiLCJMaXN0IiwiUXVvdGUiLCJXYXJuaW5nIiwiTWFya2VyIiwiQ29kZVRvb2wiLCJEZWxpbWl0ZXIiLCJMaW5rVG9vbCIsIkVtYmVkIiwiVGFibGUiLCJlZGl0b3IiLCJob2xkZXIiLCJ0b29scyIsImhlYWRlciIsImltYWdlIiwibGlzdCIsImlubGluZVRvb2xiYXIiLCJxdW90ZSIsIndhcm5pbmciLCJtYXJrZXIiLCJzaG9ydGN1dCIsImNvZGUiLCJkZWxpbWl0ZXIiLCJsaW5rIiwiZW1iZWQiLCJ0YWJsZSIsImRhdGEiXSwic291cmNlUm9vdCI6IiJ9