/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@dashboardcode/bsmultiselect/dist/js/BsMultiSelect.esm.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@dashboardcode/bsmultiselect/dist/js/BsMultiSelect.esm.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BsMultiSelect": () => (/* binding */ legacyConstructor),
/* harmony export */   "ModuleFactory": () => (/* binding */ ModuleFactory)
/* harmony export */ });
/*!
  * BsMultiSelect v1.1.18 (https://dashboardcode.github.io/BsMultiSelect/)
  * Copyright 2017-2021 Roman Pokrovskij (github user rpokrovskij)
  * Licensed under Apache 2 (https://github.com/DashboardCode/BsMultiSelect/blob/master/LICENSE)
  */
function findDirectChildByTagName(element, tagName) {
  var value = null;

  for (var i = 0; i < element.children.length; i++) {
    var tmp = element.children[i];

    if (tmp.tagName == tagName) {
      value = tmp;
      break;
    }
  }

  return value;
}
function closestByTagName(element, tagName) {
  return closest(element, function (e) {
    return e.tagName === tagName;
  }); // TODO support xhtml?  e.tagName.toUpperCase() ?
}
function closestByClassName(element, className) {
  return closest(element, function (e) {
    return e.classList.contains(className);
  });
}
function closestByAttribute(element, attributeName, attribute) {
  return closest(element, function (e) {
    return e.getAttribute(attributeName) === attribute;
  });
}
function containsAndSelf(node, otherNode) {
  return node === otherNode || node.contains(otherNode);
}
function getDataGuardedWithPrefix(element, prefix, name) {
  var tmp1 = element.getAttribute('data-' + prefix + '-' + name);

  if (tmp1) {
    return tmp1;
  } else {
    var tmp2 = element.getAttribute('data-' + name);
    if (tmp2) return tmp2;
  }

  return null;
}

function closest(element, predicate) {
  if (!element || !(element instanceof Element)) return null; // should be element, not document (TODO: check iframe)

  if (predicate(element)) return element;
  return closest(element.parentNode, predicate);
}

function siblingsAsArray(element) {
  var value = [];

  if (element.parentNode) {
    var children = element.parentNode.children;
    var l = element.parentNode.children.length;

    if (children.length > 1) {
      for (var i = 0; i < l; ++i) {
        var e = children[i];
        if (e != element) value.push(e);
      }
    }
  }

  return value;
}
function getIsRtl(element) {
  var isRtl = false;
  var e = closestByAttribute(element, "dir", "rtl");
  if (e) isRtl = true;
  return isRtl;
}
function EventBinder() {
  var list = [];
  return {
    bind: function bind(element, eventName, handler) {
      element.addEventListener(eventName, handler);
      list.push({
        element: element,
        eventName: eventName,
        handler: handler
      });
    },
    unbind: function unbind() {
      list.forEach(function (e) {
        var element = e.element,
            eventName = e.eventName,
            handler = e.handler;
        element.removeEventListener(eventName, handler);
      });
    }
  };
}
function AttributeBackup() {
  var list = [];
  return {
    set: function set(element, attributeName, attribute) {
      var currentAtribute = element.getAttribute(attributeName);
      list.push({
        element: element,
        currentAtribute: currentAtribute,
        attribute: attribute
      });
      element.setAttribute(attributeName, attribute);
    },
    restore: function restore() {
      list.forEach(function (e) {
        var element = e.element,
            attributeName = e.attributeName,
            attribute = e.attribute;
        if (attributeName) element.setAttribute(attributeName, attribute);else element.removeAttribute(attributeName);
      });
    }
  };
}
function EventLoopProlongableFlag(window) {
  var flag = false;
  var pr = null;
  return {
    get: function get() {
      return flag;
    },
    set: function set(timeout) {
      if (flag && pr) {
        window.clearTimeout(pr);
      }

      flag = true;
      pr = window.setTimeout(function () {
        flag = false;
        pr = null;
      }, timeout ? timeout : 0);
    }
  };
}
function ResetableFlag() {
  var flag = false;
  return {
    get: function get() {
      return flag;
    },
    set: function set() {
      flag = true;
    },
    reset: function reset() {
      flag = false;
    }
  };
}

function Bs5Plugin() {}

Bs5Plugin.plugDefaultConfig = function (defaults) {
  defaults.css = css;
  setDefaults(defaults);
};

function setDefaults(defaults) {
  defaults.useCssPatch = true;
  defaults.cssPatch = cssPatch;
  defaults.pickButtonHTML = '<button aria-label="Remove" tabIndex="-1" type="button"></button>';
  defaults.composeGetSize = composeGetSize;
  defaults.getDefaultLabel = getDefaultLabel;
}

function composeGetSize(selectElement) {
  var inputGroupElement = closestByClassName(selectElement, 'input-group');
  var getSize = null;

  if (inputGroupElement) {
    getSize = function getSize() {
      var value = null;
      if (inputGroupElement.classList.contains('input-group-lg')) value = 'lg';else if (inputGroupElement.classList.contains('input-group-sm')) value = 'sm';
      return value;
    };
  } else {
    getSize = function getSize() {
      var value = null;
      if (selectElement.classList.contains('form-select-lg') || selectElement.classList.contains('form-control-lg')) // changed for BS
        value = 'lg';else if (selectElement.classList.contains('form-select-sm') || selectElement.classList.contains('form-control-sm')) value = 'sm';
      return value;
    };
  }

  return getSize;
}

function getDefaultLabel(selectElement) {
  var value = null;
  var query = "label[for=\"" + selectElement.id + "\"]";
  var p1 = selectElement.parentElement;
  value = p1.querySelector(query); // label can be wrapped into col-auto

  if (!value) {
    var p2 = p1.parentElement;
    value = p2.querySelector(query);
  }

  return value;
}

var css = {
  choices: 'dropdown-menu',
  // bs, in bsmultiselect.scss as div.dropdown-menu
  choicesList: '',
  // bs, in bsmultiselect.scss as div.dropdown-menu>ul (first child)
  choice_hover: 'hover',
  //  not bs, in scss as 'ul.dropdown-menu li.hover'
  choice_selected: 'selected',
  //  not bs,
  choice_disabled: 'disabled',
  //  not bs,
  picks: 'form-control',
  // bs, in scss 'ul.form-control'
  picks_focus: 'focus',
  // not bs, in scss 'ul.form-control.focus'
  picks_disabled: 'disabled',
  //  not bs, in scss 'ul.form-control.disabled'
  pick_disabled: '',
  pickFilter: '',
  filterInput: '',
  // used in pickContentGenerator
  pick: {
    classes: 'badge'
  },
  // bs
  pickContent: '',
  pickContent_disabled: 'disabled',
  // not bs, in scss 'ul.form-control li span.disabled'
  pickButton: 'btn-close',
  // bs
  // used in choiceContentGenerator
  // choice:  'dropdown-item', // it seems like hover should be managed manually since there should be keyboard support
  choiceCheckBox_disabled: 'disabled',
  //  not bs, in scss as 'ul.form-control li .custom-control-input.disabled ~ .custom-control-label'
  choiceContent: 'form-check',
  // bs d-flex required for rtl to align items
  choiceCheckBox: 'form-check-input',
  // bs
  choiceLabel: 'form-check-label',
  choiceLabel_disabled: '',
  label_floating_lifted: 'floating-lifted',
  picks_floating_lifted: 'floating-lifted',
  warning: 'alert-warning'
};
var cssPatch = {
  choicesList: {
    listStyleType: 'none',
    paddingLeft: '0',
    paddingRight: '0',
    marginBottom: '0'
  },
  picks: {
    listStyleType: 'none',
    display: 'flex',
    flexWrap: 'wrap',
    height: 'auto',
    marginBottom: '0',
    cursor: 'text'
  },
  choice: {
    classes: 'px-md-2 px-1',
    styles: {
      cursor: 'pointer'
    }
  },
  //choice_selected: 'selected',  //  remove,
  //choice_disabled: 'disabled',  //  remove,
  choice_hover: 'text-primary bg-light',
  choice_disabled_hover: 'bg-light',
  // actually 'disabled, not selected'
  filterInput: {
    border: '0px',
    height: 'auto',
    boxShadow: 'none',
    padding: '0',
    margin: '0',
    outline: 'none',
    backgroundColor: 'transparent',
    backgroundImage: 'none' // otherwise BS .was-validated set its image

  },
  filterInput_empty: 'form-control',
  // need for placeholder, TODO test form-control-plaintext
  // used in PicksDom
  picks_disabled: {
    backgroundColor: '#e9ecef'
  },
  picks_focus: {
    borderColor: '#80bdff',
    boxShadow: '0 0 0 0.2rem rgba(0, 123, 255, 0.25)'
  },
  picks_focus_valid: {
    borderColor: '',
    boxShadow: '0 0 0 0.2rem rgba(40, 167, 69, 0.25)'
  },
  picks_focus_invalid: {
    borderColor: '',
    boxShadow: '0 0 0 0.2rem rgba(220, 53, 69, 0.25)'
  },
  // used in BsAppearancePlugin
  picks_def: {
    minHeight: 'calc(2.25rem + 2px)'
  },
  picks_lg: {
    minHeight: 'calc(2.875rem + 2px)'
  },
  picks_sm: {
    minHeight: 'calc(1.8125rem + 2px)'
  },
  picks_floating_def: {
    minHeight: 'calc(3.5rem + 2px)'
  },
  // used in pickContentGenerator
  pick: {
    paddingLeft: '0',
    paddingRight: '.5rem',
    paddingInlineStart: '0',
    paddingInlineEnd: '0.5rem',
    color: 'var(--bs-dark)'
  },
  pickButton: {
    fontSize: '0.8em',
    float: "none",
    verticalAlign: "text-top"
  },
  pickContent_disabled: {
    opacity: '.65'
  },
  // used in choiceContentGenerator
  choiceContent: {
    justifyContent: 'flex-start',
    cursor: 'inherit'
  },
  // BS problem: without this on inline form menu items justified center
  choiceLabel: {
    color: 'inherit',
    cursor: 'inherit'
  },
  // otherwise BS .was-validated set its color
  choiceCheckBox: {
    color: 'inherit',
    cursor: 'inherit'
  },
  choiceLabel_disabled: {
    opacity: '.65'
  },
  // more flexible than {color: '#6c757d'}; note: avoid opacity on pickElement's border; TODO write to BS 
  // floating plugin
  label_floating_lifted: {
    opacity: '.65',
    transform: 'scale(.85) translateY(-.5rem) translateX(.15rem)'
  },
  picks_floating_lifted: {
    paddingTop: '1.625rem',
    paddingLeft: '0.8rem',
    paddingBottom: '0'
  },
  warning: {
    paddingLeft: '.25rem',
    paddingRight: '.25rem',
    zIndex: 4,
    fontSize: 'small',
    backgroundColor: 'var(--bs-warning)'
  } // zIndex=4  since the input-group zIndex=3

};

function isBoolean(value) {
  return value === true || value === false;
}
function isString(value) {
  return value instanceof String || typeof value === 'string';
}
function extendIfUndefined(destination, source) {
  for (var property in source) {
    if (destination[property] === undefined) destination[property] = source[property];
  }
}
function shallowClearClone(source) {
  // override previous, no null and undefined
  var destination = {};

  for (var property in source) {
    // TODO:  Object.assign (need polyfill for IE11)
    var v = source[property];
    if (!(v === null || v === undefined)) destination[property] = v;
  }

  for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    sources[_key - 1] = arguments[_key];
  }

  if (sources) sources.forEach(function (s) {
    for (var _property in s) {
      var _v = s[_property];
      if (!(_v === null || _v === undefined)) destination[_property] = _v;else if (destination.hasOwnProperty(_property)) {
        delete destination[_property];
      }
    }
  });
  return destination;
}

function forEachRecursion(f, e) {
  if (!e) return;
  var goOn = f(e.value);
  if (!(goOn === false)) forEachRecursion(f, e.prev);
}

function indexRecursion(index, e) {
  if (!e.prev) return index;
  indexRecursion(++index, e.prev);
}

function List() {
  var tail = null;
  var count = 0;
  return {
    add: function add(e) {
      if (tail) {
        tail.next = {
          value: e,
          prev: tail,
          next: null
        };
        tail = tail.next;
      } else tail = {
        value: e,
        prev: null,
        next: null
      };

      count++;
      var node = tail;

      function remove() {
        if (node.prev) {
          node.prev.next = node.next;
        }

        if (node.next) {
          node.next.prev = node.prev;
        }

        if (tail == node) {
          tail = node.prev;
        }

        count--;
      }

      function index() {
        return indexRecursion(0, node);
      }

      return {
        remove: remove,
        index: index
      };
    },
    forEach: function forEach(f) {
      forEachRecursion(f, tail);
    },
    getTail: function getTail() {
      return tail ? tail.value : null;
    },
    getCount: function getCount() {
      return count;
    },
    isEmpty: function isEmpty() {
      return count == 0;
    },
    reset: function reset() {
      tail = null;
      count = 0;
    }
  };
}
function DoublyLinkedList(getPrev, setPrev, getNext, setNext) {
  var head = null,
      tail = null;
  var count = 0;
  return {
    add: function add(e, next) {
      if (!tail) {
        head = tail = e;
        setPrev(e, null);
        setNext(e, null);
      } else {
        if (!next) {
          setPrev(e, tail);
          setNext(e, null);
          setNext(tail, e);
          tail = e;
        } else {
          if (next === head) head = e;
          var prev = getPrev(next);
          setNext(e, next);
          setPrev(next, e);

          if (prev) {
            setPrev(e, prev);
            setNext(prev, e);
          } else {
            setPrev(e, null);
          }
        }
      }

      count++;
    },
    remove: function remove(e) {
      var next = getNext(e);
      var prev = getPrev(e);

      if (prev) {
        setNext(prev, next);
      }

      if (next) {
        setPrev(next, prev);
      }

      if (tail == e) {
        tail = prev;
      }

      if (head == e) {
        head = next;
      }

      count--;
    },
    getHead: function getHead() {
      return head;
    },
    getTail: function getTail() {
      return tail;
    },
    getCount: function getCount() {
      return count;
    },
    isEmpty: function isEmpty() {
      return count == 0;
    },
    reset: function reset() {
      tail = head = null;
      count = 0;
    }
  };
}
function ArrayFacade() {
  var list = [];
  return {
    push: function push(e) {
      list.push(e);
    },
    add: function add(e, key) {
      list.splice(key, 0, e);
    },
    get: function get(key) {
      return list[key];
    },
    getNext: function getNext(key, predicate) {
      var count = list.length;
      var start = key + 1;

      if (key < count) {
        if (!predicate) return list[start];

        for (var i = start; i < count; i++) {
          var c = list[i];
          if (predicate(c)) return c;
        }
      }
    },
    remove: function remove(key) {
      var e = list[key];
      list.splice(key, 1);
      return e;
    },
    forLoop: function forLoop(f) {
      for (var i = 0; i < list.length; i++) {
        var e = list[i];
        f(e, i);
      }
    },
    getHead: function getHead() {
      return list[0];
    },
    getCount: function getCount() {
      return list.length;
    },
    isEmpty: function isEmpty() {
      return list.length == 0;
    },
    reset: function reset() {
      list = [];
    }
  };
}
function composeSync() {
  for (var _len2 = arguments.length, functions = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    functions[_key2] = arguments[_key2];
  }

  return function () {
    return functions.forEach(function (f) {
      if (f) f();
    });
  };
}
function defCall() {
  for (var _len3 = arguments.length, functions = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    functions[_key3] = arguments[_key3];
  }

  for (var _i = 0, _functions = functions; _i < _functions.length; _i++) {
    var f = _functions[_i];

    if (f) {
      if (f instanceof Function) {
        var tmp = f();
        if (tmp) return tmp;
      } else return f;
    }
  }
}
function ObservableValue(value) {
  var list = List();
  return {
    getValue: function getValue() {
      return value;
    },
    setValue: function setValue(newValue) {
      value = newValue;
      list.forEach(function (f) {
        return f(newValue);
      });
    },
    attach: function attach(f) {
      return list.add(f);
    },
    detachAll: function detachAll() {
      list.reset();
    }
  };
}
function ObservableLambda(func) {
  var list = List();
  var value = func();
  return {
    getValue: function getValue() {
      return value;
    },
    call: function call() {
      value = func();
      list.forEach(function (f) {
        return f(value);
      });
    },
    attach: function attach(f) {
      return list.add(f);
    },
    detachAll: function detachAll() {
      list.reset();
    }
  };
}
function ObjectValues(object) {
  // Object.values(plugins) - problem for IE11; full impementation of polifill is mor complex, but for our purpose this is enough
  var arr = [];

  for (var key in object) {
    arr.push(object[key]);
  }

  return arr;
}

function LabelForAttributePlugin(aspects) {
  var staticDom = aspects.staticDom,
      filterDom = aspects.filterDom,
      getLabelElementAspect = aspects.getLabelElementAspect,
      configuration = aspects.configuration,
      loadAspect = aspects.loadAspect,
      disposeAspect = aspects.disposeAspect;
  var containerClass = configuration.containerClass;
  var labelForAttributeAspect = LabelForAttributeAspect(staticDom, filterDom, containerClass, getLabelElementAspect, disposeAspect);
  aspects.labelForAttributeAspect = labelForAttributeAspect;
  loadAspect.load = composeSync(loadAspect.load, function () {
    return labelForAttributeAspect.update();
  });
}

LabelForAttributePlugin.plugDefaultConfig = function (defaults) {
  defaults.label = null;
};

LabelForAttributePlugin.plugStaticDom = function (aspects) {
  aspects.getLabelElementAspect = GetLabelElementAspect(aspects.configuration.label);
};

function GetLabelElementAspect(label) {
  return {
    getLabelElement: function getLabelElement() {
      // overrided by BS Appearance Plugin
      defCall(label);
    }
  };
}

function LabelForAttributeAspect(staticDom, filterDom, containerClass, getLabelElementAspect, disposeAspect) {
  return {
    update: function update() {
      var createInputId = null;
      var selectElement = staticDom.selectElement,
          containerElement = staticDom.containerElement;
      var filterInputElement = filterDom.filterInputElement;
      if (selectElement) createInputId = function createInputId() {
        return containerClass + "-generated-input-" + (selectElement.id ? selectElement.id : selectElement.name).toLowerCase() + "-id";
      };else createInputId = function createInputId() {
        return containerClass + "-generated-filter-" + containerElement.id;
      };
      var labelElement = getLabelElementAspect.getLabelElement();

      if (labelElement) {
        var backupedForAttribute = labelElement.getAttribute('for');
        var newId = createInputId();
        filterInputElement.setAttribute('id', newId);
        labelElement.setAttribute('for', newId);

        if (backupedForAttribute) {
          disposeAspect.dispose = composeSync(disposeAspect.dispose, function () {
            return labelElement.setAttribute('for', backupedForAttribute);
          });
        }
      }
    }
  };
}

function RtlPlugin(aspects) {
  var configuration = aspects.configuration,
      rtlAspect = aspects.rtlAspect,
      staticDom = aspects.staticDom;
  var isRtl = configuration.isRtl;
  var forceRtlOnContainer = false;
  if (isBoolean(isRtl)) forceRtlOnContainer = true;else isRtl = getIsRtl(staticDom.initialElement);
  var attributeBackup = AttributeBackup();

  if (forceRtlOnContainer) {
    attributeBackup.set(staticDom.containerElement, "dir", "rtl");
  } else if (staticDom.selectElement) {
    var dirAttributeValue = staticDom.selectElement.getAttribute("dir");

    if (dirAttributeValue) {
      attributeBackup.set(staticDom.containerElement, "dir", dirAttributeValue);
    }
  }

  return {
    buildApi: function buildApi(api) {
      // TODO: there is something wrong with this. may be should moved to specific plugin
      // sample of correct plugin - aspect pair is WarningPlugin: aspect is added on plugin constructor
      rtlAspect.updateRtl(isRtl);
    },
    dispose: function dispose() {
      attributeBackup.restore();
    }
  };
}

RtlPlugin.plugStaticDom = function (aspects) {
  aspects.rtlAspect = RtlAspect();
};

function RtlAspect() {
  return {
    updateRtl: function updateRtl() {}
  };
}

function FormResetPlugin(aspects) {
  var staticDom = aspects.staticDom,
      updateDataAspect = aspects.updateDataAspect,
      environment = aspects.environment;
  var eventBuilder = EventBinder();

  if (staticDom.selectElement) {
    var form = closestByTagName(staticDom.selectElement, 'FORM');

    if (form) {
      eventBuilder.bind(form, 'reset', function () {
        return environment.window.setTimeout(function () {
          return updateDataAspect.updateData();
        });
      });
    }
  }

  return {
    dispose: function dispose() {
      eventBuilder.unbind();
    }
  };
}

function createValidity(valueMissing, customError) {
  return Object.freeze({
    valueMissing: valueMissing,
    customError: customError,
    valid: !(valueMissing || customError)
  });
}

function ValidityApi(visibleElement, isValueMissingObservable, valueMissingMessage, onValid, trigger) {
  var customValidationMessage = "";
  var validationMessage = "";
  var validity = null;
  var willValidate = true;

  function setMessage(valueMissing, customError) {
    validity = createValidity(valueMissing, customError);
    validationMessage = customError ? customValidationMessage : valueMissing ? valueMissingMessage : "";
    visibleElement.setCustomValidity(validationMessage);
    onValid(validity.valid);
  }

  setMessage(isValueMissingObservable.getValue(), false);
  isValueMissingObservable.attach(function (value) {
    setMessage(value, validity.customError);
  });

  var checkValidity = function checkValidity() {
    if (!validity.valid) trigger('dashboardcode.multiselect:invalid');
    return validity.valid;
  };

  return {
    validationMessage: validationMessage,
    willValidate: willValidate,
    validity: validity,
    setCustomValidity: function setCustomValidity(message) {
      customValidationMessage = message;
      setMessage(validity.valueMissing, customValidationMessage ? true : false);
    },
    checkValidity: checkValidity,
    reportValidity: function reportValidity() {
      visibleElement.reportValidity();
      return checkValidity();
    }
  };
}

var defValueMissingMessage = 'Please select an item in the list';
function ValidationApiPlugin(pluginData) {
  var configuration = pluginData.configuration,
      triggerAspect = pluginData.triggerAspect,
      onChangeAspect = pluginData.onChangeAspect,
      optionsAspect = pluginData.optionsAspect,
      staticDom = pluginData.staticDom,
      filterDom = pluginData.filterDom,
      updateDataAspect = pluginData.updateDataAspect; // TODO: required could be a function

  var getIsValueMissing = configuration.getIsValueMissing,
      valueMissingMessage = configuration.valueMissingMessage,
      required = configuration.required,
      getValueRequired = configuration.getValueRequired;
  if (!isBoolean(required)) required = getValueRequired();
  valueMissingMessage = defCall(valueMissingMessage, function () {
    return getDataGuardedWithPrefix(staticDom.initialElement, "bsmultiselect", "value-missing-message");
  }, defValueMissingMessage);

  if (!getIsValueMissing) {
    getIsValueMissing = function getIsValueMissing() {
      var count = 0;
      var optionsArray = optionsAspect.getOptions();

      for (var i = 0; i < optionsArray.length; i++) {
        if (optionsArray[i].selected) count++;
      }

      return count === 0;
    };
  }

  var isValueMissingObservable = ObservableLambda(function () {
    return required && getIsValueMissing();
  });
  var validationApiObservable = ObservableValue(!isValueMissingObservable.getValue());
  onChangeAspect.onChange = composeSync(isValueMissingObservable.call, onChangeAspect.onChange);
  updateDataAspect.updateData = composeSync(isValueMissingObservable.call, updateDataAspect.updateData);
  pluginData.validationApiPluginData = {
    validationApiObservable: validationApiObservable
  };
  var validationApi = ValidityApi(filterDom.filterInputElement, isValueMissingObservable, valueMissingMessage, function (isValid) {
    return validationApiObservable.setValue(isValid);
  }, triggerAspect.trigger);
  return {
    buildApi: function buildApi(api) {
      api.validationApi = validationApi;
    },
    dispose: function dispose() {
      isValueMissingObservable.detachAll();
      validationApiObservable.detachAll();
    }
  };
}

ValidationApiPlugin.plugDefaultConfig = function (defaults) {
  defaults.getValueRequired = function () {
    return false;
  };

  defaults.valueMissingMessage = '';
};

function addStyling(element, styling) {
  var backupStyling = {
    classes: [],
    styles: {}
  };

  if (styling) {
    var classes = styling.classes,
        styles = styling.styles;
    classes.forEach(function (e) {
      return element.classList.add(e);
    }); // todo use add(classes)

    backupStyling.classes = classes.slice();

    for (var property in styles) {
      backupStyling.styles[property] = element.style[property];
      element.style[property] = styles[property]; // todo use Object.assign (need polyfill for IE11)
    }
  }

  return backupStyling;
}

function removeStyling(element, styling) {
  if (styling) {
    var classes = styling.classes,
        styles = styling.styles;
    classes.forEach(function (e) {
      return element.classList.remove(e);
    }); // todo use remove(classes)

    for (var property in styles) {
      element.style[property] = styles[property];
    } // todo use Object.assign (need polyfill for IE11)

  }
}

function toggleStyling(element, styling) {
  var backupStyling = {
    classes: [],
    styles: {}
  };
  var isOn = false;
  var isF = styling instanceof Function;
  return function (value, force) {
    if (value) {
      if (isOn === false) {
        backupStyling = addStyling(element, isF ? styling() : styling);
        isOn = true;
      } else if (force) {
        removeStyling(element, backupStyling);
        backupStyling = addStyling(element, isF ? styling() : styling);
      }
    } else {
      if (isOn === true || force === true) {
        removeStyling(element, backupStyling);
        isOn = false;
      }
    }
  };
}

function extendClasses(out, param, actionStr, actionArr, isRemoveEmptyClasses) {
  if (isString(param)) {
    if (param === "") {
      if (isRemoveEmptyClasses) {
        out.classes = [];
      }
    } else {
      var c = param.split(' ');
      out.classes = actionStr(c);
    }

    return true;
  } else if (param instanceof Array) {
    if (param.length == 0) {
      if (isRemoveEmptyClasses) {
        out.classes = [];
      }
    } else {
      out.classes = actionArr(param);
    }

    return true;
  }

  return false;
}

function extend(value, param, actionStr, actionArr, actionObj, isRemoveEmptyClasses) {
  var success = extendClasses(value, param, actionStr, actionArr, isRemoveEmptyClasses);

  if (success === false) {
    if (param instanceof Object) {
      var classes = param.classes,
          styles = param.styles;
      extendClasses(value, classes, actionStr, actionArr, isRemoveEmptyClasses);

      if (styles) {
        value.styles = actionObj(styles);
      } else if (!classes) {
        value.styles = actionObj(param);
      }
    }
  }
}

function Styling(param) {
  var value = {
    classes: [],
    styles: {}
  };

  if (param) {
    extend(value, param, function (a) {
      return a;
    }, function (a) {
      return a.slice();
    }, function (o) {
      return shallowClearClone(o);
    }, true);
  }

  return Object.freeze(value);
}

function createStyling(isReplace, param) {
  var value = {
    classes: [],
    styles: {}
  };

  if (param) {
    extend(value, param, function (a) {
      return a;
    }, function (a) {
      return a.slice();
    }, function (o) {
      return shallowClearClone(o);
    }, true);

    for (var _len = arguments.length, params = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      params[_key - 2] = arguments[_key];
    }

    if (params) {
      var classes = value.classes,
          styles = value.styles;
      var extendInt = isReplace ? function (p) {
        return extend(value, p, function (s) {
          return s;
        }, function (a) {
          return a.slice();
        }, function (o) {
          return shallowClearClone(styles, o);
        }, true);
      } : function (p) {
        return extend(value, p, function (a) {
          return classes.concat(a);
        }, function (a) {
          return classes.concat(a);
        }, function (o) {
          return shallowClearClone(styles, o);
        }, false);
      };
      params.forEach(function (p) {
        return extendInt(p);
      });
    }
  }

  return Styling(value);
}

function createCss(stylings1, stylings2) {
  var destination = {};

  for (var property in stylings1) {
    var param1 = stylings1[property];
    var param2 = stylings2 ? stylings2[property] : undefined;
    if (param2 === undefined) destination[property] = Styling(param1);else {
      destination[property] = createStyling(true, param1, param2);
    }
  }

  if (stylings2) for (var _property in stylings2) {
    if (!stylings1[_property]) destination[_property] = Styling(stylings2[_property]);
  }
  return destination;
}
function extendCss(stylings1, stylings2) {
  for (var property in stylings2) {
    var param2 = stylings2[property];
    var param1 = stylings1[property];
    if (param1 === undefined) stylings1[property] = Styling(param2);else {
      stylings1[property] = createStyling(false, param1, param2);
    }
  }
}

function BsAppearancePlugin(pluginData) {
  var configuration = pluginData.configuration,
      validationApiPluginData = pluginData.validationApiPluginData,
      picksDom = pluginData.picksDom,
      staticDom = pluginData.staticDom,
      getLabelElementAspect = pluginData.getLabelElementAspect,
      updateAppearanceAspect = pluginData.updateAppearanceAspect,
      componentPropertiesAspect = pluginData.componentPropertiesAspect,
      floatingLabelAspect = pluginData.floatingLabelAspect;
  var getValidity = configuration.getValidity,
      getSize = configuration.getSize,
      useCssPatch = configuration.useCssPatch,
      css = configuration.css,
      composeGetSize = configuration.composeGetSize,
      getDefaultLabel = configuration.getDefaultLabel;
  var selectElement = staticDom.selectElement;
  var initialElement = staticDom.initialElement;
  var isFloatingLabel = false;

  if (floatingLabelAspect) {
    isFloatingLabel = closestByClassName(initialElement, 'form-floating');

    floatingLabelAspect.isFloatingLabel = function () {
      return isFloatingLabel;
    };
  }

  if (getLabelElementAspect) {
    var origGetLabelElementAspect = getLabelElementAspect.getLabelElement;

    getLabelElementAspect.getLabelElement = function () {
      var e = origGetLabelElementAspect();
      if (e) return e;else {
        if (selectElement) {
          var labelElement = getDefaultLabel(selectElement);
          return labelElement;
        }
      }
    };
  }

  if (staticDom.selectElement) {
    if (!getValidity) getValidity = composeGetValidity(selectElement);
    if (!getSize) getSize = composeGetSize(selectElement);
  } else {
    if (!getValidity) getValidity = function getValidity() {
      return null;
    };
    if (!getSize) getSize = function getSize() {
      return null;
    };
  }

  componentPropertiesAspect.getSize = getSize;
  componentPropertiesAspect.getValidity = getValidity;
  var updateSize;

  if (!useCssPatch) {
    updateSize = function updateSize() {
      return updateSizeForAdapter(picksDom.picksElement, getSize);
    };
  } else {
    var picks_lg = css.picks_lg,
        picks_sm = css.picks_sm,
        picks_def = css.picks_def,
        picks_floating_def = css.picks_floating_def;
    if (isFloatingLabel) picks_lg = picks_sm = picks_def = picks_floating_def;

    updateSize = function updateSize() {
      return updateSizeJsForAdapter(picksDom.picksElement, picks_lg, picks_sm, picks_def, getSize);
    };
  }

  if (useCssPatch) {
    var origToggleFocusStyling = picksDom.toggleFocusStyling;

    picksDom.toggleFocusStyling = function () {
      var validity = validationObservable.getValue();
      var isFocusIn = picksDom.getIsFocusIn();
      origToggleFocusStyling(isFocusIn);

      if (isFocusIn) {
        if (validity === false) {
          // but not toggle events (I know it will be done in future)
          picksDom.setIsFocusIn(isFocusIn);
          addStyling(picksDom.picksElement, css.picks_focus_invalid);
        } else if (validity === true) {
          // but not toggle events (I know it will be done in future)
          picksDom.setIsFocusIn(isFocusIn);
          addStyling(picksDom.picksElement, css.picks_focus_valid);
        }
      }
    };
  }

  var getWasValidated = function getWasValidated() {
    var wasValidatedElement = closestByClassName(staticDom.initialElement, 'was-validated');
    return wasValidatedElement ? true : false;
  };

  var wasUpdatedObservable = ObservableLambda(function () {
    return getWasValidated();
  });
  var getManualValidationObservable = ObservableLambda(function () {
    return getValidity();
  });
  var validationApiObservable = validationApiPluginData == null ? void 0 : validationApiPluginData.validationApiObservable;
  var validationObservable = ObservableLambda(function () {
    return wasUpdatedObservable.getValue() ? validationApiObservable.getValue() : getManualValidationObservable.getValue();
  });
  validationObservable.attach(function (value) {
    var _getMessagesElements = getMessagesElements(staticDom.containerElement),
        validMessages = _getMessagesElements.validMessages,
        invalidMessages = _getMessagesElements.invalidMessages;

    updateValidity(picksDom.picksElement, validMessages, invalidMessages, value);
    picksDom.toggleFocusStyling();
  });
  wasUpdatedObservable.attach(function () {
    return validationObservable.call();
  });
  if (validationApiObservable) validationApiObservable.attach(function () {
    return validationObservable.call();
  });
  getManualValidationObservable.attach(function () {
    return validationObservable.call();
  });
  updateAppearanceAspect.updateAppearance = composeSync(updateAppearanceAspect.updateAppearance, updateSize, validationObservable.call, getManualValidationObservable.call);
  return {
    buildApi: function buildApi(api) {
      api.updateSize = updateSize;

      api.updateValidity = function () {
        return getManualValidationObservable.call();
      };

      api.updateWasValidated = function () {
        return wasUpdatedObservable.call();
      };
    },
    dispose: function dispose() {
      wasUpdatedObservable.detachAll();
      validationObservable.detachAll();
      getManualValidationObservable.detachAll();
    }
  };
}

function updateValidity(picksElement, validMessages, invalidMessages, validity) {
  if (validity === false) {
    picksElement.classList.add('is-invalid');
    picksElement.classList.remove('is-valid');
    invalidMessages.map(function (e) {
      return e.style.display = 'block';
    });
    validMessages.map(function (e) {
      return e.style.display = 'none';
    });
  } else if (validity === true) {
    picksElement.classList.remove('is-invalid');
    picksElement.classList.add('is-valid');
    invalidMessages.map(function (e) {
      return e.style.display = 'none';
    });
    validMessages.map(function (e) {
      return e.style.display = 'block';
    });
  } else {
    picksElement.classList.remove('is-invalid');
    picksElement.classList.remove('is-valid');
    invalidMessages.map(function (e) {
      return e.style.display = '';
    });
    validMessages.map(function (e) {
      return e.style.display = '';
    });
  }
}

function updateSizeClasses(picksElement, size) {
  if (size == "lg") {
    picksElement.classList.add('form-control-lg');
    picksElement.classList.remove('form-control-sm');
  } else if (size == "sm") {
    picksElement.classList.remove('form-control-lg');
    picksElement.classList.add('form-control-sm');
  } else {
    picksElement.classList.remove('form-control-lg');
    picksElement.classList.remove('form-control-sm');
  }
}

function updateSizeJsPicks(picksElement, picksLgStyling, picksSmStyling, picksDefStyling, size) {
  if (size == "lg") {
    addStyling(picksElement, picksLgStyling);
  } else if (size == "sm") {
    addStyling(picksElement, picksSmStyling);
  } else {
    addStyling(picksElement, picksDefStyling);
  }
}

function updateSizeJs(picksElement, picksLgStyling, picksSmStyling, picksDefStyling, size) {
  updateSizeClasses(picksElement, size);
  updateSizeJsPicks(picksElement, picksLgStyling, picksSmStyling, picksDefStyling, size);
}

function updateSizeForAdapter(picksElement, getSize) {
  updateSizeClasses(picksElement, getSize());
}

function updateSizeJsForAdapter(picksElement, picksLgStyling, picksSmStyling, picksDefStyling, getSize) {
  updateSizeJs(picksElement, picksLgStyling, picksSmStyling, picksDefStyling, getSize());
}

function getMessagesElements(containerElement) {
  var siblings = siblingsAsArray(containerElement);
  var invalidMessages = siblings.filter(function (e) {
    return e.classList.contains('invalid-feedback') || e.classList.contains('invalid-tooltip');
  });
  var validMessages = siblings.filter(function (e) {
    return e.classList.contains('valid-feedback') || e.classList.contains('valid-tooltip');
  });
  return {
    validMessages: validMessages,
    invalidMessages: invalidMessages
  };
}

function composeGetValidity(selectElement) {
  var getValidity = function getValidity() {
    return selectElement.classList.contains('is-invalid') ? false : selectElement.classList.contains('is-valid') ? true : null;
  };

  return getValidity;
}

function HiddenOptionPlugin(aspects) {
  var configuration = aspects.configuration,
      createWrapAspect = aspects.createWrapAspect,
      isChoiceSelectableAspect = aspects.isChoiceSelectableAspect,
      wrapsCollection = aspects.wrapsCollection,
      buildChoiceAspect = aspects.buildChoiceAspect,
      buildAndAttachChoiceAspect = aspects.buildAndAttachChoiceAspect,
      countableChoicesListInsertAspect = aspects.countableChoicesListInsertAspect,
      countableChoicesList = aspects.countableChoicesList;

  countableChoicesListInsertAspect.countableChoicesListInsert = function (wrap, key) {
    if (!wrap.isOptionHidden) {
      var choiceNext = wrapsCollection.getNext(key, function (c) {
        return !c.isOptionHidden;
      });
      countableChoicesList.add(wrap, choiceNext);
    }
  };

  var origBuildAndAttachChoice = buildAndAttachChoiceAspect.buildAndAttachChoice;

  buildAndAttachChoiceAspect.buildAndAttachChoice = function (wrap, getNextElement) {
    if (wrap.isOptionHidden) {
      buildHiddenChoice(wrap);
    } else {
      origBuildAndAttachChoice(wrap, getNextElement);
    }
  };

  var origIsSelectable = isChoiceSelectableAspect.isSelectable;

  isChoiceSelectableAspect.isSelectable = function (wrap) {
    return origIsSelectable(wrap) && !wrap.isOptionHidden;
  };

  var getIsOptionHidden = configuration.getIsOptionHidden,
      options = configuration.options;

  if (options) {
    if (!getIsOptionHidden) getIsOptionHidden = function getIsOptionHidden(option) {
      return option.hidden === undefined ? false : option.hidden;
    };
  } else {
    if (!getIsOptionHidden) getIsOptionHidden = function getIsOptionHidden(option) {
      return option.hidden;
    };
  }

  var origCreateWrap = createWrapAspect.createWrap;

  createWrapAspect.createWrap = function (option) {
    var wrap = origCreateWrap(option);
    wrap.isOptionHidden = getIsOptionHidden(option);
    return wrap;
  };

  return {
    buildApi: function buildApi(api) {
      var getNextNonHidden = function getNextNonHidden(key) {
        return wrapsCollection.getNext(key, function (c) {
          return !c.isOptionHidden;
        });
      };

      api.updateOptionsHidden = function () {
        return wrapsCollection.forLoop(function (wrap, key) {
          return updateChoiceHidden(wrap, key, getNextNonHidden, countableChoicesList, getIsOptionHidden, buildChoiceAspect);
        });
      };

      api.updateOptionHidden = function (key) {
        return updateChoiceHidden(wrapsCollection.get(key), key, getNextNonHidden, countableChoicesList, getIsOptionHidden, buildChoiceAspect);
      }; // TODO create updateHidden ? 
      // it is too complex since we need to find the next non hidden, when this depends on key 
      // there should be the backreference "wrap -> index" invited before
      // api.updateOptionHidden  = (key) => wrapsCollection.get(key).updateHidden();

    }
  };
}

function buildHiddenChoice(wrap) {
  wrap.updateSelected = function () {
    return void 0;
  };

  wrap.choice.isChoiceElementAttached = false;
  wrap.choice.choiceElement = null;
  wrap.choice.choiceElementAttach = null;
  wrap.choice.setVisible = null;
  wrap.choice.setHoverIn = null;
  wrap.choice.remove = null;

  wrap.choice.dispose = function () {
    wrap.choice.dispose = null;
  };

  wrap.dispose = function () {
    wrap.choice.dispose();
    wrap.dispose = null;
  };
}

function updateChoiceHidden(wrap, key, getNextNonHidden, countableChoicesList, getIsOptionHidden, buildChoiceAspect) {
  var newIsOptionHidden = getIsOptionHidden(wrap.option);

  if (newIsOptionHidden != wrap.isOptionHidden) {
    wrap.isOptionHidden = newIsOptionHidden;

    if (wrap.isOptionHidden) {
      countableChoicesList.remove(wrap);
      wrap.choice.remove();
      buildHiddenChoice(wrap);
    } else {
      var nextChoice = getNextNonHidden(key);
      countableChoicesList.add(wrap, nextChoice);
      buildChoiceAspect.buildChoice(wrap);
      wrap.choice.choiceElementAttach(nextChoice == null ? void 0 : nextChoice.choice.choiceElement);
    }
  }
}

function CssPatchPlugin() {}

CssPatchPlugin.plugMergeSettings = function (configuration, defaults, settings) {
  var cssPatch = settings == null ? void 0 : settings.cssPatch;
  if (isBoolean(cssPatch)) throw new Error("BsMultiSelect: 'cssPatch' was used instead of 'useCssPatch'"); // often type of error

  configuration.cssPatch = createCss(defaults.cssPatch, cssPatch); // replace classes, merge styles
};

CssPatchPlugin.plugStaticDom = function (configurationPluginData) {
  var configuration = configurationPluginData.configuration;
  if (configuration.useCssPatch) extendCss(configuration.css, configuration.cssPatch);
};

function PlaceholderPlugin(aspects) {
  var configuration = aspects.configuration,
      staticManager = aspects.staticManager,
      picksList = aspects.picksList,
      picksDom = aspects.picksDom,
      filterDom = aspects.filterDom,
      staticDom = aspects.staticDom,
      updateDataAspect = aspects.updateDataAspect,
      resetFilterListAspect = aspects.resetFilterListAspect,
      filterManagerAspect = aspects.filterManagerAspect,
      environment = aspects.environment;
  var isIE11 = environment.isIE11;
  var placeholder = configuration.placeholder,
      css = configuration.css;
  var picksElement = picksDom.picksElement;
  var filterInputElement = filterDom.filterInputElement;

  function setPlaceholder(placeholder) {
    filterInputElement.placeholder = placeholder;
  }

  if (isIE11) {
    var ignoreNextInputResetableFlag = ResetableFlag();
    var placeholderStopInputAspect = PlaceholderStopInputAspect(ignoreNextInputResetableFlag);
    var setPlaceholderOrig = setPlaceholder;

    setPlaceholder = function setPlaceholder(placeholder) {
      ignoreNextInputResetableFlag.set();
      setPlaceholderOrig(placeholder);
    };

    aspects.placeholderStopInputAspect = placeholderStopInputAspect;
  }

  if (!placeholder) {
    placeholder = getDataGuardedWithPrefix(staticDom.initialElement, "bsmultiselect", "placeholder");
  }

  function setEmptyInputWidth(isVisible) {
    if (isVisible) filterInputElement.style.width = '100%';else filterInputElement.style.width = '2ch';
  }

  var emptyToggleStyling = toggleStyling(filterInputElement, css.filterInput_empty);

  function showPlacehodler(isVisible) {
    if (isVisible) {
      setPlaceholder(placeholder ? placeholder : '');
      picksElement.style.display = 'block';
    } else {
      setPlaceholder('');
      picksElement.style.display = 'flex';
    }

    emptyToggleStyling(isVisible);
    setEmptyInputWidth(isVisible);
  }

  showPlacehodler(true);

  function setDisabled(isComponentDisabled) {
    filterInputElement.disabled = isComponentDisabled;
  }

  var isEmpty = function isEmpty() {
    return picksList.isEmpty() && filterDom.isEmpty();
  };

  function updatePlacehodlerVisibility() {
    showPlacehodler(isEmpty());
  }

  function updateEmptyInputWidth() {
    setEmptyInputWidth(isEmpty());
  }
  var origDisable = picksDom.disable;

  picksDom.disable = function (isComponentDisabled) {
    setDisabled(isComponentDisabled);
    origDisable(isComponentDisabled);
  };

  staticManager.appendToContainer = composeSync(staticManager.appendToContainer, updateEmptyInputWidth);
  filterManagerAspect.processEmptyInput = composeSync(updateEmptyInputWidth, filterManagerAspect.processEmptyInput);
  resetFilterListAspect.forceResetFilter = composeSync(resetFilterListAspect.forceResetFilter, updatePlacehodlerVisibility);
  var origAdd = picksList.add;

  picksList.add = function (pick) {
    var returnValue = origAdd(pick);

    if (picksList.getCount() == 1) {
      // make flex
      if (filterDom.isEmpty()) {
        setPlaceholder('');
        picksElement.style.display = 'flex';
        emptyToggleStyling(false);
        filterInputElement.style.width = '2ch';
      } else {
        picksElement.style.display = 'flex';
      }
    }

    pick.dispose = composeSync(pick.dispose, function () {
      if (isEmpty()) {
        showPlacehodler(true);
      }
    });
    return returnValue;
  };

  updateDataAspect.updateData = composeSync(updateDataAspect.updateData, updatePlacehodlerVisibility);
} // ie11 support

function PlaceholderStopInputAspect(resetableFlag) {
  return {
    get: function get() {
      return resetableFlag.get();
    },
    reset: function reset() {
      return resetableFlag.reset();
    }
  };
}

function JQueryMethodsPlugin(aspects) {
  var staticDom = aspects.staticDom,
      choicesDom = aspects.choicesDom,
      filterDom = aspects.filterDom,
      picksList = aspects.picksList,
      picksDom = aspects.picksDom;
  return {
    buildApi: function buildApi(api) {
      api.getContainer = function () {
        return staticDom.containerElement;
      };

      api.getChoices = function () {
        return choicesDom.choicesElement;
      };

      api.getChoicesList = function () {
        return choicesDom.choicesListElement;
      };

      api.getFilterInput = function () {
        return filterDom.filterInputElement;
      };

      api.getPicks = function () {
        return picksDom.picksElement;
      };

      api.picksCount = function () {
        return picksList.getCount();
      };
    }
  };
}

function OptionsApiPlugin(pluginData) {
  var buildAndAttachChoiceAspect = pluginData.buildAndAttachChoiceAspect,
      wraps = pluginData.wraps,
      wrapsCollection = pluginData.wrapsCollection,
      createWrapAspect = pluginData.createWrapAspect,
      createChoiceBaseAspect = pluginData.createChoiceBaseAspect,
      optionsAspect = pluginData.optionsAspect,
      resetLayoutAspect = pluginData.resetLayoutAspect;
  return {
    buildApi: function buildApi(api) {
      api.updateOptionAdded = function (key) {
        // TODO: generalize index as key 
        var options = optionsAspect.getOptions();
        var option = options[key];
        var wrap = createWrapAspect.createWrap(option);
        wrap.choice = createChoiceBaseAspect.createChoiceBase(option);
        wraps.insert(key, wrap);

        var nextChoice = function nextChoice() {
          return wrapsCollection.getNext(key, function (c) {
            return c.choice.choiceElement;
          });
        };

        buildAndAttachChoiceAspect.buildAndAttachChoice(wrap, function () {
          var _nextChoice;

          return (_nextChoice = nextChoice()) == null ? void 0 : _nextChoice.choice.choiceElement;
        });
      };

      api.updateOptionRemoved = function (key) {
        // TODO: generalize index as key 
        resetLayoutAspect.resetLayout(); // always hide 1st, then reset filter

        var wrap = wraps.remove(key);
        wrap.choice.remove == null ? void 0 : wrap.choice.remove();
        wrap.dispose == null ? void 0 : wrap.dispose();
      };
    }
  };
}

function FormRestoreOnBackwardPlugin(aspects) {
  var staticDom = aspects.staticDom,
      environment = aspects.environment,
      loadAspect = aspects.loadAspect,
      updateOptionsSelectedAspect = aspects.updateOptionsSelectedAspect;
  var window = environment.window;

  if (staticDom.selectElement && updateOptionsSelectedAspect) {
    loadAspect.load = composeSync(loadAspect.load, function () {
      // support browser's "step backward" and form's values restore
      if (window.document.readyState != "complete") {
        window.setTimeout(function () {
          updateOptionsSelectedAspect.updateOptionsSelected(); // there are no need to add more updates as api.updateWasValidated() because backward never trigger .was-validate
          // also backward never set the state to invalid
        });
      }
    });
  }
}

function SelectElementPlugin(aspects) {
  var loadAspect = aspects.loadAspect,
      environment = aspects.environment;
  var origLoadAspectLoop = loadAspect.loop;
  var document = environment.window.document;

  loadAspect.loop = function () {
    // browsers can change select value as part of "autocomplete" (IE11) at load time
    // or "show preserved on go back" (Chrome) after page is loaded but before "ready" event;
    // mote: they never "restore" selected-disabled options.
    // TODO: make the FROM Validation for 'selected-disabled' easy.
    if (document.readyState != 'loading') {
      origLoadAspectLoop();
    } else {
      var domContentLoadedHandler = function domContentLoadedHandler() {
        origLoadAspectLoop();
        document.removeEventListener("DOMContentLoaded", domContentLoadedHandler);
      };

      document.addEventListener('DOMContentLoaded', domContentLoadedHandler); // IE9+
    }
  };
}

SelectElementPlugin.plugStaticDom = function (aspects) {
  var configuration = aspects.configuration,
      staticDomFactory = aspects.staticDomFactory,
      createElementAspect = aspects.createElementAspect,
      componentPropertiesAspect = aspects.componentPropertiesAspect,
      onChangeAspect = aspects.onChangeAspect,
      triggerAspect = aspects.triggerAspect,
      optionsAspect = aspects.optionsAspect,
      optGroupAspect = aspects.optGroupAspect,
      disposeAspect = aspects.disposeAspect;
  var origStaticDomFactoryCreate = staticDomFactory.create;

  staticDomFactory.create = function (css) {
    var _origStaticDomFactory = origStaticDomFactoryCreate(css),
        choicesDom = _origStaticDomFactory.choicesDom,
        origCreateStaticDom = _origStaticDomFactory.createStaticDom;

    var choicesElement = choicesDom.choicesElement;
    return {
      choicesDom: choicesDom,
      createStaticDom: function createStaticDom(element, containerClass) {
        var selectElement = null;
        var containerElement = null;
        var picksElement = null;

        if (element.tagName == 'SELECT') {
          selectElement = element;

          if (containerClass) {
            containerElement = closestByClassName(selectElement, containerClass);
            if (containerElement) picksElement = findDirectChildByTagName(containerElement, 'UL');
          }
        } else if (element.tagName == 'DIV') {
          selectElement = findDirectChildByTagName(element, 'SELECT');

          if (selectElement) {
            if (containerClass) {
              containerElement = closestByClassName(element, containerClass);
              if (containerElement) picksElement = findDirectChildByTagName(containerElement, 'UL');
            }
          } else {
            return origCreateStaticDom(element, containerClass);
          }
        }

        var disposableContainerElement = false;

        if (!containerElement) {
          containerElement = createElementAspect.createElement('DIV');
          containerElement.classList.add(containerClass);
          disposableContainerElement = true;
        }

        var isDisposablePicksElement = false;

        if (!picksElement) {
          picksElement = createElementAspect.createElement('UL');
          isDisposablePicksElement = true;
        }

        if (selectElement) {
          var backupDisplay = selectElement.style.display;
          selectElement.style.display = 'none';
          var backupedRequired = selectElement.required;

          configuration.getValueRequired = function () {
            return backupedRequired;
          };

          if (selectElement.required === true) selectElement.required = false;
          var getDisabled = configuration.getDisabled;

          if (!getDisabled) {
            var fieldsetElement = closestByTagName(selectElement, 'FIELDSET');

            if (fieldsetElement) {
              componentPropertiesAspect.getDisabled = function () {
                return selectElement.disabled || fieldsetElement.disabled;
              };
            } else {
              componentPropertiesAspect.getDisabled = function () {
                return selectElement.disabled;
              };
            }
          }

          onChangeAspect.onChange = composeSync(function () {
            return triggerAspect.trigger('change');
          }, onChangeAspect.onChange);

          optionsAspect.getOptions = function () {
            return selectElement.options;
          };

          if (optGroupAspect) {
            optGroupAspect.getOptionOptGroup = function (option) {
              return option.parentNode;
            };

            optGroupAspect.getOptGroupText = function (optGroup) {
              return optGroup.label;
            };

            optGroupAspect.getOptGroupId = function (optGroup) {
              return optGroup.id;
            };
          }

          disposeAspect.dispose = composeSync(disposeAspect.dispose, function () {
            selectElement.required = backupedRequired;
            selectElement.style.display = backupDisplay;
          });
        }

        return {
          staticDom: {
            initialElement: element,
            containerElement: containerElement,
            picksElement: picksElement,
            isDisposablePicksElement: isDisposablePicksElement,
            selectElement: selectElement
          },
          staticManager: {
            appendToContainer: function appendToContainer() {
              if (disposableContainerElement) {
                selectElement.parentNode.insertBefore(containerElement, selectElement.nextSibling);
                containerElement.appendChild(choicesElement);
              } else {
                selectElement.parentNode.insertBefore(choicesElement, selectElement.nextSibling);
              }

              if (isDisposablePicksElement) containerElement.appendChild(picksElement);
            },
            dispose: function dispose() {
              choicesElement.parentNode.removeChild(choicesElement);
              if (disposableContainerElement) selectElement.parentNode.removeChild(containerElement);
              if (isDisposablePicksElement) containerElement.removeChild(picksElement);
            }
          }
        };
      }
    };
  };
};

// plugin should overdrive them : call setWrapSelected and etc
// therefore there should new component API methods
// addOptionPick(key) -> call addPick(pick) which returns removePick() 
// SetOptionSelectedAspect, OptionToggleAspect should be moved there 
// OptionToggleAspect overrided in DisabledOptionPlugin
// wrap.isOptionSelected ,  wrap.updateSelected

function SelectedOptionPlugin(aspects) {
  var configuration = aspects.configuration,
      wrapsCollection = aspects.wrapsCollection,
      updateOptionsSelectedAspect = aspects.updateOptionsSelectedAspect,
      createWrapAspect = aspects.createWrapAspect,
      buildChoiceAspect = aspects.buildChoiceAspect,
      removePickAspect = aspects.removePickAspect,
      resetLayoutAspect = aspects.resetLayoutAspect,
      picksList = aspects.picksList,
      isChoiceSelectableAspect = aspects.isChoiceSelectableAspect,
      optionToggleAspect = aspects.optionToggleAspect,
      createPickHandlersAspect = aspects.createPickHandlersAspect,
      addPickAspect = aspects.addPickAspect,
      fullMatchAspect = aspects.fullMatchAspect,
      onChangeAspect = aspects.onChangeAspect,
      filterPredicateAspect = aspects.filterPredicateAspect;
  var getIsOptionSelected = configuration.getSelected,
      setIsOptionSelected = configuration.setSelected;
  var origFilterPredicate = filterPredicateAspect.filterPredicate;

  filterPredicateAspect.filterPredicate = function (wrap, text) {
    return !wrap.isOptionSelected && origFilterPredicate(wrap, text);
  };

  var origBuildChoice = buildChoiceAspect.buildChoice;

  buildChoiceAspect.buildChoice = function (wrap) {
    origBuildChoice(wrap);

    wrap.updateSelected = function () {
      wrap.choice.choiceDomManagerHandlers.updateSelected();
      onChangeAspect.onChange();
    };

    wrap.dispose = composeSync(function () {
      wrap.updateSelected = null;
    }, wrap.dispose);
  }; // TODO: test this instead of wrap.updateSelected
  // function updateSelected(wrap){
  //     if (wrap.pick){
  //         if (wrap.isOptionSelected)
  //             pickHandlers.producePick();
  //         else {
  //             pickHandlers.removeAndDispose();
  //             pickHandlers.removeAndDispose=null;
  //         }
  //     }
  //     wrap.choice.choiceDomManagerHandlers.updateSelected();
  //     onChangeAspect.onChange();
  // }


  function composeUpdateSelected(wrap, booleanValue) {
    return function () {
      wrap.isOptionSelected = booleanValue;
      wrap.updateSelected();
    };
  }

  function trySetWrapSelected(option, updateSelected, booleanValue) {
    //  wrap.option
    var success = false;
    var confirmed = setIsOptionSelected(option, booleanValue);

    if (!(confirmed === false)) {
      updateSelected();
      success = true;
    }

    return success;
  }

  var origCreateWrap = createWrapAspect.createWrap;

  createWrapAspect.createWrap = function (option) {
    var wrap = origCreateWrap(option);
    wrap.isOptionSelected = getIsOptionSelected(option);
    wrap.updateSelected = null; // can it be combined ?

    return wrap;
  };

  optionToggleAspect.toggle; // TODO: improve design, no replace

  optionToggleAspect.toggle = function (wrap) {
    return trySetWrapSelected(wrap.option, composeUpdateSelected(wrap, !wrap.isOptionSelected), !wrap.isOptionSelected);
  };

  fullMatchAspect.fullMatch;

  fullMatchAspect.fullMatch = function (wrap) {
    return trySetWrapSelected(wrap.option, composeUpdateSelected(wrap, true), true);
  };

  removePickAspect.removePick; // TODO: improve design, no replace

  removePickAspect.removePick = function (wrap, pick) {
    // TODO: try remove pick
    return trySetWrapSelected(wrap.option, composeUpdateSelected(wrap, false), false);
  };

  var origCreatePickHandlers = createPickHandlersAspect.createPickHandlers;

  createPickHandlersAspect.createPickHandlers = function (wrap) {
    var pickHandlers = origCreatePickHandlers(wrap);
    wrap.updateSelected = composeSync(function () {
      if (wrap.isOptionSelected) {
        var pick = pickHandlers.producePick();
        wrap.pick = pick;
        pick.dispose = composeSync(pick.dispose, function () {
          wrap.pick = null;
        });
      } else {
        pickHandlers.removeAndDispose();
        pickHandlers.removeAndDispose = null;
      }
    }, wrap.updateSelected);
    addPickAspect.addPick(wrap, pickHandlers);
    return pickHandlers;
  };

  var origAddPick = addPickAspect.addPick;

  addPickAspect.addPick = function (wrap, pickHandlers) {
    if (wrap.isOptionSelected) {
      var pick = origAddPick(wrap, pickHandlers);
      wrap.pick = pick;
      pick.dispose = composeSync(pick.dispose, function () {
        wrap.pick = null;
      });
      return pick;
    }
  };

  return {
    buildApi: function buildApi(api) {
      api.selectAll = function () {
        resetLayoutAspect.resetLayout(); // always hide 1st

        wrapsCollection.forLoop(function (wrap) {
          if (isChoiceSelectableAspect.isSelectable(wrap) && !wrap.isOptionSelected) trySetWrapSelected(wrap.option, composeUpdateSelected(wrap, true), true);
        });
      };

      api.deselectAll = function () {
        resetLayoutAspect.resetLayout(); // always hide 1st

        picksList.forEach(function (pick) {
          return pick.setSelectedFalse();
        });
      };

      api.setOptionSelected = function (key, value) {
        var wrap = wrapsCollection.get(key);
        return trySetWrapSelected(wrap.option, composeUpdateSelected(wrap, value), value);
      }; // used in FormRestoreOnBackwardPlugin


      api.updateOptionsSelected = function () {
        return updateOptionsSelectedAspect.updateOptionsSelected();
      };

      api.updateOptionSelected = function (key) {
        return updateChoiceSelected(wrapsCollection.get(key), getIsOptionSelected);
      };
    }
  };
}

SelectedOptionPlugin.plugStaticDom = function (aspects) {
  var configuration = aspects.configuration,
      wrapsCollection = aspects.wrapsCollection;
  var getIsOptionSelected = configuration.getSelected,
      setIsOptionSelected = configuration.setSelected,
      options = configuration.options;

  if (options) {
    if (!setIsOptionSelected) {
      setIsOptionSelected = function setIsOptionSelected(option, value) {
        option.selected = value;
      };
    }

    if (!getIsOptionSelected) getIsOptionSelected = function getIsOptionSelected(option) {
      return option.selected;
    };
  } else {
    // selectElement
    if (!getIsOptionSelected) {
      getIsOptionSelected = function getIsOptionSelected(option) {
        return option.selected;
      };
    }

    if (!setIsOptionSelected) {
      setIsOptionSelected = function setIsOptionSelected(option, value) {
        option.selected = value;
      }; // NOTE: adding this (setAttribute) break Chrome's html form reset functionality:
      // if (value) option.setAttribute('selected','');
      // else option.removeAttribute('selected');

    }
  }

  configuration.getSelected = getIsOptionSelected;
  configuration.setSelected = setIsOptionSelected;
  aspects.updateOptionsSelectedAspect = UpdateOptionsSelectedAspect(wrapsCollection, getIsOptionSelected);
};

function UpdateOptionsSelectedAspect(wrapsCollection, getIsOptionSelected) {
  return {
    updateOptionsSelected: function updateOptionsSelected() {
      wrapsCollection.forLoop(function (wrap) {
        return updateChoiceSelected(wrap, getIsOptionSelected);
      });
    }
  };
}

function updateChoiceSelected(wrap, getIsOptionSelected) {
  var newIsSelected = getIsOptionSelected(wrap.option);

  if (newIsSelected != wrap.isOptionSelected) {
    wrap.isOptionSelected = newIsSelected;
    wrap.updateSelected == null ? void 0 : wrap.updateSelected(); // some hidden oesn't have element (and need to be updated)
  }
}

function DisabledOptionPlugin(pluginData) {
  var configuration = pluginData.configuration,
      isChoiceSelectableAspect = pluginData.isChoiceSelectableAspect,
      createWrapAspect = pluginData.createWrapAspect,
      buildChoiceAspect = pluginData.buildChoiceAspect,
      filterPredicateAspect = pluginData.filterPredicateAspect,
      wrapsCollection = pluginData.wrapsCollection,
      optionToggleAspect = pluginData.optionToggleAspect,
      buildPickAspect = pluginData.buildPickAspect;
  var getIsOptionDisabled = configuration.getIsOptionDisabled,
      options = configuration.options;

  if (options) {
    if (!getIsOptionDisabled) getIsOptionDisabled = function getIsOptionDisabled(option) {
      return option.disabled === undefined ? false : option.disabled;
    };
  } else {
    // selectElement
    if (!getIsOptionDisabled) getIsOptionDisabled = function getIsOptionDisabled(option) {
      return option.disabled;
    };
  } // TODO check this instead of wrap.updateDisabled
  // function updateDisabled(wrap){
  //     wrap?.choice?.choiceDomManagerHandlers?.updateDisabled?.();
  //     wrap?.pick?.pickDomManagerHandlers?.updateDisabled?.();
  // }


  var origCreateWrap = createWrapAspect.createWrap;

  createWrapAspect.createWrap = function (option) {
    var wrap = origCreateWrap(option);
    wrap.isOptionDisabled = getIsOptionDisabled(option); // TODO: remove usage wrap.isOptionDisabled

    wrap.updateDisabled = null;
    return wrap;
  };

  var origToggle = optionToggleAspect.toggle;

  optionToggleAspect.toggle = function (wrap) {
    var success = false;

    if (wrap.isOptionSelected !== undefined) {
      if (wrap.isOptionSelected || !wrap.isOptionDisabled) // TODO: declare dependency on SelectedOptionPlugin
        success = origToggle(wrap);
    } else {
      if (!wrap.isOptionDisabled) {
        success = origToggle(wrap);
      }
    }

    return success;
  };

  var origIsSelectable = isChoiceSelectableAspect.isSelectable;

  isChoiceSelectableAspect.isSelectable = function (wrap) {
    return origIsSelectable(wrap) && !wrap.isOptionDisabled;
  };

  var origFilterPredicate = filterPredicateAspect.filterPredicate;

  filterPredicateAspect.filterPredicate = function (wrap, text) {
    return !wrap.isOptionDisabled && origFilterPredicate(wrap, text);
  };

  var origBuildChoice = buildChoiceAspect.buildChoice;

  buildChoiceAspect.buildChoice = function (wrap) {
    origBuildChoice(wrap);
    wrap.updateDisabled = wrap.choice.choiceDomManagerHandlers.updateDisabled;
    wrap.choice.dispose = composeSync(function () {
      wrap.updateDisabled = null;
    }, wrap.choice.dispose);
  };

  var origBuildPick = buildPickAspect.buildPick;

  buildPickAspect.buildPick = function (wrap, removeOnButton) {
    var pick = origBuildPick(wrap, removeOnButton);

    pick.updateDisabled = function () {
      return pick.pickDomManagerHandlers.updateDisabled();
    };

    pick.dispose = composeSync(pick.dispose, function () {
      pick.updateDisabled = null;
    });
    var choiceUpdateDisabledBackup = wrap.updateDisabled;
    wrap.updateDisabled = composeSync(choiceUpdateDisabledBackup, pick.updateDisabled); // add pickDisabled

    pick.dispose = composeSync(pick.dispose, function () {
      wrap.updateDisabled = choiceUpdateDisabledBackup; // remove pickDisabled

      wrap.updateDisabled(); // make "true disabled" without it checkbox only looks disabled
    });
    return pick;
  };

  return {
    buildApi: function buildApi(api) {
      api.updateOptionsDisabled = function () {
        return wrapsCollection.forLoop(function (wrap) {
          return updateChoiceDisabled(wrap, getIsOptionDisabled);
        });
      };

      api.updateOptionDisabled = function (key) {
        return updateChoiceDisabled(wrapsCollection.get(key), getIsOptionDisabled);
      };
    }
  };
}

function updateChoiceDisabled(wrap, getIsOptionDisabled) {
  var newIsDisabled = getIsOptionDisabled(wrap.option);

  if (newIsDisabled != wrap.isOptionDisabled) {
    wrap.isOptionDisabled = newIsDisabled;
    wrap.updateDisabled == null ? void 0 : wrap.updateDisabled(); // some hidden oesn't have element (and need to be updated)
  }
}

function PicksApiPlugin(pluginData) {
  var picksList = pluginData.picksList,
      createWrapAspect = pluginData.createWrapAspect,
      createPickHandlersAspect = pluginData.createPickHandlersAspect,
      addPickAspect = pluginData.addPickAspect;
  return {
    buildApi: function buildApi(api) {
      api.forEachPeak = function (f) {
        return picksList.forEach(function (wrap) {
          return f(wrap.option);
        });
      }; // TODO: getHeadPeak


      api.getTailPeak = function () {
        var _picksList$getTail;

        return (_picksList$getTail = picksList.getTail()) == null ? void 0 : _picksList$getTail.option;
      };

      api.countPeaks = function () {
        return picksList.getCount();
      };

      api.isEmptyPeaks = function () {
        return picksList.isEmpty();
      };

      api.addPick = function (option) {
        var wrap = createWrapAspect.createWrap(option); // TODO should be moved to specific plugins

        wrap.updateDisabled = function () {};

        wrap.updateHidden = function () {};

        var pickHandlers = createPickHandlersAspect.createPickHandlers(wrap);
        addPickAspect.addPick(wrap, pickHandlers);
      };
    }
  };
}

function PicksPlugin(aspects) {
  var configuration = aspects.configuration;
      aspects.inputAspect;
      aspects.filterDom;
      aspects.filterManagerAspect;
  configuration.picks;
      configuration.addOptionPicked;
  /*
  if (!addOptionPicked){
      addOptionPicked = (option, index, value) => {
          if (value)
              picks.push(option);
          else
              picks.splice(index, 1);
          return true;
      };
  }
    function trySetWrapSelected(option, updateSelected, booleanValue){
      let success = false;
      var confirmed = setIsOptionSelected(option, booleanValue);
      if (!(confirmed===false)) {
          updateSelected();
          success = true;
      }
      return success;
  }
    let origProcessInput = inputAspect.processInput;
  inputAspect.processInput = () => {
      let origResult = origProcessInput();
      if (!origResult.isEmpty)
      {
          if ( filterManagerAspect.getNavigateManager().getCount() == 1)
          {
              // todo: move exact match to filterManager
              let fullMatchWrap =  filterManagerAspect.getNavigateManager().getHead();
              let text = filterManagerAspect.getFilter();
              if (fullMatchWrap.choice.searchText == text)
              {
                  let success = trySetWrapSelected(fullMatchWrap, true);
                  if (success) {
                      filterDom.setEmpty();
                      origResult.isEmpty = true;
                  }
              }
          }
      }
      return origResult;
  }*/
}

PicksPlugin.plugStaticDom = function (aspects) {
  var configuration = aspects.configuration,
      picksList = aspects.picksList;
  var picks = configuration.picks;

  if (picks) {
    var origAdd = picksList.add,
        origReset = picksList.reset;

    picksList.add = function (e) {
      var _origAdd = origAdd(e),
          remove = _origAdd.remove,
          index = _origAdd.index;

      picks.push(e);
      return {
        remove: composeSync(remove, function () {
          return void picks.splice(index(), 1);
        }),
        index: index
      };
    };

    picksList.reset = function () {
      origReset();
      picks.length = 0;
    };
  }
};

function CreatePopperPlugin(aspects) {
  var environment = aspects.environment;
  var createPopper = environment.createPopper,
      Popper = environment.Popper,
      globalPopper = environment.globalPopper;
  var createModifiersVX = null;
  var createPopperVX = null;

  if (Popper) {
    // V2
    createPopperVX = createPopper = function (createPopperConstructor) {
      return function (anchorElement, element, popperConfiguration) {
        return new createPopperConstructor(anchorElement, element, popperConfiguration);
      };
    }(Popper);
    createModifiersVX = CreateModifiersV1;
  } else if (createPopper) {
    createPopperVX = createPopper;
    createModifiersVX = CreateModifiersV2;
  } else if (globalPopper) {
    if (globalPopper.createPopper) {
      createPopperVX = globalPopper.createPopper;
      createModifiersVX = CreateModifiersV2;
    } else {
      createPopperVX = createPopper = function (createPopperConstructor) {
        return function (anchorElement, element, popperConfiguration) {
          return new createPopperConstructor(anchorElement, element, popperConfiguration);
        };
      }(globalPopper);

      createModifiersVX = CreateModifiersV1;
    }
  } else {
    throw new Error("BsMultiSelect: Popper component (https://popper.js.org) is required");
  }

  aspects.createPopperAspect = CreatePopperAspect(createPopperVX, createModifiersVX);
}

function CreateModifiersV1(preventOverflow) {
  return {
    preventOverflow: {
      enabled: preventOverflow
    },
    hide: {
      enabled: false
    },
    flip: {
      enabled: false
    }
  };
}

function CreateModifiersV2(preventOverflow) {
  var modifiers = [{
    name: 'flip',
    options: {
      fallbackPlacements: ['bottom']
    }
  }];

  if (preventOverflow) {
    modifiers.push({
      name: 'preventOverflow'
    });
  }

  return modifiers;
}

function CreatePopperAspect(createPopperVX, createModifiersVX) {
  return {
    createPopper: function createPopper(element, anchorElement, preventOverflow) {
      var modifiers = createModifiersVX(preventOverflow);
      var popperConfiguration = {
        placement: 'bottom-start',
        modifiers: modifiers
      };
      var popper = null;
      return {
        init: function init() {
          popper = createPopperVX(anchorElement, element, popperConfiguration);
        },
        update: function update() {
          popper.update(); // become async in popper 2; use forceUpdate if sync is needed? 
        },
        setRtl: function setRtl(isRtl) {
          if (isRtl) {
            popperConfiguration.placement = 'bottom-end';
          }
        },
        dispose: function dispose() {
          popper.destroy();
        }
      };
    }
  };
}

function FloatingLabelPlugin(pluginData) {
  var configuration = pluginData.configuration,
      picksList = pluginData.picksList,
      picksDom = pluginData.picksDom,
      filterDom = pluginData.filterDom,
      staticDom = pluginData.staticDom,
      updateDataAspect = pluginData.updateDataAspect,
      resetFilterListAspect = pluginData.resetFilterListAspect,
      floatingLabelAspect = pluginData.floatingLabelAspect;
  var css = configuration.css,
      getDefaultLabel = configuration.getDefaultLabel;
  var initialElement = staticDom.initialElement;

  if (floatingLabelAspect.isFloatingLabel()) {
    var liftedLabel = function liftedLabel(isEmpty) {
      liftToggleStyling1(isEmpty);
      liftToggleStyling2(isEmpty);
    };

    var updateLiftedLabel = function updateLiftedLabel() {
      liftedLabel(!isEmpty());
    };

    var labelElement = getDefaultLabel(initialElement);
    var picksElement = picksDom.picksElement;
    var liftToggleStyling1 = toggleStyling(labelElement, css.label_floating_lifted);
    var liftToggleStyling2 = toggleStyling(picksElement, css.picks_floating_lifted);

    var isEmpty = function isEmpty() {
      return picksList.isEmpty() && filterDom.isEmpty() && !picksDom.getIsFocusIn();
    };
    updateLiftedLabel();
    resetFilterListAspect.forceResetFilter = composeSync(resetFilterListAspect.forceResetFilter, updateLiftedLabel);
    var origAdd = picksList.add;

    picksList.add = function (pick) {
      var returnValue = origAdd(pick);
      if (picksList.getCount() == 1) updateLiftedLabel();
      pick.dispose = composeSync(pick.dispose, function () {
        if (picksList.getCount() == 0) updateLiftedLabel();
      });
      return returnValue;
    };

    var origToggleFocusStyling = picksDom.toggleFocusStyling;

    picksDom.toggleFocusStyling = function () {
      var isFocusIn = picksDom.getIsFocusIn();
      origToggleFocusStyling(isFocusIn);
      updateLiftedLabel();
    };

    updateDataAspect.updateData = composeSync(updateDataAspect.updateData, updateLiftedLabel);
  }
}

FloatingLabelPlugin.plugStaticDom = function (aspects) {
  aspects.floatingLabelAspect = FloatingLabelAspect();
};

function FloatingLabelAspect() {
  return {
    isFloatingLabel: function isFloatingLabel() {}
  };
}

// aka auto height and scrolling
function ChoicesDynamicStylingPlugin(aspects) {
  var configuration = aspects.configuration;

  if (configuration.useChoicesDynamicStyling) {
    var choicesVisibilityAspect = aspects.choicesVisibilityAspect,
        specialPicksEventsAspect = aspects.specialPicksEventsAspect;
    var origSetChoicesVisible = choicesVisibilityAspect.setChoicesVisible;

    aspects.choicesVisibilityAspect.setChoicesVisible = function (visible) {
      if (visible) choicesDynamicStyling(aspects);
      origSetChoicesVisible(visible);
    };

    var origBackSpace = specialPicksEventsAspect.backSpace;

    specialPicksEventsAspect.backSpace = function (pick) {
      origBackSpace(pick);
      choicesDynamicStyling(aspects);
    };
  }
}

function choicesDynamicStyling(aspects) {
  var configuration = aspects.configuration,
      environment = aspects.environment,
      choicesDom = aspects.choicesDom,
      navigateAspect = aspects.navigateAspect;
  var window = environment.window;
  var choicesElement = choicesDom.choicesElement;
  var minimalChoicesDynamicStylingMaxHeight = configuration.minimalChoicesDynamicStylingMaxHeight; //find height of the browser window

  var g = window.document.getElementsByTagName('body')[0],
      e = window.document.documentElement,
      y = window.innerHeight || e.clientHeight || g.clientHeight; //find position of choicesElement, if it's at the bottom of the page make the choicesElement shorter

  var pos = choicesElement.parentNode.getBoundingClientRect();
  var new_y = y - pos.top; //calculate multi select max-height

  var msHeight = Math.max(minimalChoicesDynamicStylingMaxHeight, Math.round(new_y * 0.85)); // Michalek: 0.85 is empiric value, without it list was longer than footer height ; TODO: propose better way
  //add css height value

  choicesElement.style.setProperty("max-height", msHeight + "px");
  choicesElement.style.setProperty("overflow-y", "auto");

  if (!choicesDom.ChoicesDynamicStylingPlugin_scrollHandle) {
    choicesDom.ChoicesDynamicStylingPlugin_scrollHandle = true;
    var origNavigateAspectNavigate = navigateAspect.navigate;

    navigateAspect.navigate = function (down) {
      var wrap = origNavigateAspectNavigate(down);
      if (wrap != null && wrap.choice != null && wrap.choice.choiceElement != null) wrap.choice.choiceElement.scrollIntoView(false); // alignTo false -  scroll to the top bottom of dropdown first
      // TODO: BUG if mouse left on the dropdow scroll to bottom and one after doesn't work properly

      return wrap;
    };
  }
}

ChoicesDynamicStylingPlugin.plugDefaultConfig = function (defaults) {
  defaults.useChoicesDynamicStyling = false;
  defaults.choicesDynamicStyling = choicesDynamicStyling;
  defaults.minimalChoicesDynamicStylingMaxHeight = 20;
};

var defNoResultsWarningMessage = 'No results found';
function WarningPlugin(pluginData) {
  var configuration = pluginData.configuration,
      choicesDom = pluginData.choicesDom,
      createElementAspect = pluginData.createElementAspect,
      staticManager = pluginData.staticManager;
  var css = configuration.css;
  if (configuration.isNoResultsWarningEnabled) pluginData.warningAspect = WarningAspect(choicesDom, createElementAspect, staticManager, css);
}

WarningPlugin.plugDefaultConfig = function (defaults) {
  defaults.noResultsWarning = defNoResultsWarningMessage;
  defaults.isNoResultsWarningEnabled = false;
};

function WarningAspect(choicesDom, createElementAspect, staticManager, css) {
  var choicesElement = choicesDom.choicesElement;
  var warningElement = createElementAspect.createElement('DIV');
  var origAppendToContainer = staticManager.appendToContainer;

  staticManager.appendToContainer = function () {
    origAppendToContainer();
    choicesElement.parentNode.insertBefore(warningElement, choicesElement.nextSibling); // insert after
  };

  warningElement.style.display = 'none';
  addStyling(warningElement, css.warning);
  return {
    warningElement: warningElement,
    show: function show(message) {
      warningElement.style.display = 'block';
      warningElement.innerHTML = message;
    },
    hide: function hide() {
      warningElement.style.display = 'none';
      warningElement.innerHTML = "";
    }
  };
}

function HighlightPlugin(aspects) {
  var highlightAspect = aspects.highlightAspect,
      filterManagerAspect = aspects.filterManagerAspect,
      buildChoiceAspect = aspects.buildChoiceAspect;

  if (highlightAspect) {
    var origProcessEmptyInput = filterManagerAspect.processEmptyInput;

    filterManagerAspect.processEmptyInput = function () {
      highlightAspect.reset();
      origProcessEmptyInput();
    };

    var origSetFilter = filterManagerAspect.setFilter;

    filterManagerAspect.setFilter = function (text) {
      highlightAspect.set(text);
      origSetFilter(text);
    };

    var origBuildChoice = buildChoiceAspect.buildChoice;

    buildChoiceAspect.buildChoice = function (wrap) {
      origBuildChoice(wrap);
      var origSetVisible = wrap.choice.setVisible;

      wrap.choice.setVisible = function (v) {
        origSetVisible(v);
        wrap.choice.choiceDomManagerHandlers.updateHighlighted();
      };
    };
  }
}

HighlightPlugin.plugStaticDom = function (aspects) {
  if (aspects.configuration.useHighlighting) aspects.highlightAspect = HighlightAspect();
};

HighlightPlugin.plugDefaultConfig = function (defaults) {
  defaults.useHighlighting = false;
};

function HighlightAspect() {
  var highlighter = null;
  return {
    getHighlighter: function getHighlighter() {
      return highlighter;
    },
    set: function set(filter) {
      var guarded = filter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      var regex = new RegExp("(" + guarded + ")", "gi");

      highlighter = function highlighter(e, choiceDom, text) {
        // TODO replace with
        // var pos = text.indexOf(filter);
        e.innerHTML = text.replace(regex, "<u>$1</u>"); // TODO to method
        // var nodes = e.querySelectorAll('u');
        // var array = Array.prototype.slice.call(nodes);
        // if (choiceDom.highlightedElements)
        //     choiceDom.highlightedElements.concat(array);
        // else
        //     choiceDom.highlightedElements = array;
      };
    },
    reset: function reset() {
      highlighter = null;
    }
  };
}

function CustomChoiceStylingsPlugin(apsects) {
  var configuration = apsects.configuration,
      choiceDomFactory = apsects.choiceDomFactory;
  var customChoiceStylingsAspect = CustomChoiceStylingsAspect(configuration.customChoiceStylings);
  var origChoiceDomFactoryCreate = choiceDomFactory.create;

  choiceDomFactory.create = function (choiceElement, wrap, toggle) {
    var o = origChoiceDomFactoryCreate(choiceElement, wrap, toggle);
    customChoiceStylingsAspect.customize(wrap, o.choiceDom, o.choiceDomManagerHandlers);
    return o;
  };
}

CustomChoiceStylingsPlugin.plugDefaultConfig = function (defaults) {
  defaults.customChoiceStylings = null;
};

function CustomChoiceStylingsAspect(customChoiceStylings) {
  return {
    customize: function customize(wrap, choiceDom, choiceDomManagerHandlers) {
      if (customChoiceStylings) {
        var handlers = customChoiceStylings(choiceDom, wrap.option);

        if (handlers) {
          var customChoiceStylingsClosure = function customChoiceStylingsClosure(custom) {
            return function () {
              custom({
                isOptionSelected: wrap.isOptionSelected,
                isOptionDisabled: wrap.isOptionDisabled,
                isHoverIn: wrap.choice.isHoverIn //isHighlighted: wrap.choice.isHighlighted  // TODO isHighlighted should be developed

              });
            };
          };

          if (choiceDomManagerHandlers.updateHoverIn && handlers.updateHoverIn) choiceDomManagerHandlers.updateHoverIn = composeSync(choiceDomManagerHandlers.updateHoverIn, customChoiceStylingsClosure(handlers.updateHoverIn));
          if (choiceDomManagerHandlers.updateSelected && handlers.updateSelected) choiceDomManagerHandlers.updateSelected = composeSync(choiceDomManagerHandlers.updateSelected, customChoiceStylingsClosure(handlers.updateSelected));
          if (choiceDomManagerHandlers.updateDisabled && handlers.updateDisabled) choiceDomManagerHandlers.updateDisabled = composeSync(choiceDomManagerHandlers.updateDisabled, customChoiceStylingsClosure(handlers.updateDisabled));
          if (choiceDomManagerHandlers.updateHighlighted && handlers.updateHighlighted) choiceDomManagerHandlers.updateHighlighted = composeSync(choiceDomManagerHandlers.updateHighlighted, customChoiceStylingsClosure(handlers.updateHighlighted));
        }
      }
    }
  };
}

function CustomPickStylingsPlugin(aspects) {
  var componentPropertiesAspect = aspects.componentPropertiesAspect,
      configuration = aspects.configuration,
      pickDomFactory = aspects.pickDomFactory;
  var customPickStylingsAspect = CustomPickStylingsAspect(componentPropertiesAspect, configuration.customPickStylings);
  var origPickDomFactoryCreate = pickDomFactory.create;

  pickDomFactory.create = function (pickElement, wrap, removeOnButton) {
    var o = origPickDomFactoryCreate(pickElement, wrap, removeOnButton);
    customPickStylingsAspect.customize(wrap, o.pickDom, o.pickDomManagerHandlers);
    return o;
  };
}

CustomPickStylingsPlugin.plugDefaultConfig = function (defaults) {
  defaults.customPickStylings = null;
};

function CustomPickStylingsAspect(componentPropertiesAspect, customPickStylings) {
  return {
    customize: function customize(wrap, pickDom, pickDomManagerHandlers) {
      if (customPickStylings) {
        var handlers = customPickStylings(pickDom, wrap.option);

        if (handlers) {
          var customPickStylingsClosure = function customPickStylingsClosure(custom) {
            return function () {
              custom({
                isOptionDisabled: wrap.isOptionDisabled,
                isComponentDisabled: componentPropertiesAspect.getDisabled()
              });
            };
          };

          if (pickDomManagerHandlers.updateDisabled && handlers.updateDisabled) pickDomManagerHandlers.updateDisabled = composeSync(pickDomManagerHandlers.updateDisabled, customPickStylingsClosure(handlers.updateDisabled));
          if (pickDomManagerHandlers.updateComponentDisabled && handlers.updateComponentDisabled) pickDomManagerHandlers.updateComponentDisabled = composeSync(pickDomManagerHandlers.updateComponentDisabled, customPickStylingsClosure(handlers.updateComponentDisabled));
        }
      }
    }
  };
}

function UpdateAppearancePlugin(aspects) {
  var updateAppearanceAspect = aspects.updateAppearanceAspect,
      updateAspect = aspects.updateAspect,
      loadAspect = aspects.loadAspect;
  updateAspect.update = composeSync(updateAspect.update, function () {
    return updateAppearanceAspect.updateAppearance();
  });
  loadAspect.load = composeSync(loadAspect.load, function () {
    return updateAppearanceAspect.updateAppearance();
  });
  return {
    buildApi: function buildApi(api) {
      api.updateAppearance = function () {
        return updateAppearanceAspect.updateAppearance();
      };
    }
  };
}

UpdateAppearancePlugin.plugStaticDom = function (aspects) {
  aspects.updateAppearanceAspect = UpdateAppearanceAspect();
};

function UpdateAppearanceAspect() {
  return {
    updateAppearance: function updateAppearance() {}
  };
}

function DisableComponentPlugin(aspects) {
  var updateAppearanceAspect = aspects.updateAppearanceAspect,
      picksList = aspects.picksList,
      picksDom = aspects.picksDom,
      componentPropertiesAspect = aspects.componentPropertiesAspect;
  var disableComponentAspect = DisableComponentAspect(picksList, picksDom);
  aspects.disableComponentAspect = disableComponentAspect;
  var isComponentDisabled; // state! 

  function updateDisabled() {
    var newIsComponentDisabled = componentPropertiesAspect.getDisabled();

    if (isComponentDisabled !== newIsComponentDisabled) {
      isComponentDisabled = newIsComponentDisabled;
      disableComponentAspect.disableComponent(newIsComponentDisabled);
    }
  }

  updateAppearanceAspect.updateAppearance = composeSync(updateAppearanceAspect.updateAppearance, updateDisabled);
  return {
    buildApi: function buildApi(api) {
      api.updateDisabled = updateDisabled;
    }
  };
}

function DisableComponentAspect(picksList, picksDom) {
  return {
    disableComponent: function disableComponent(isComponentDisabled) {
      picksList.forEach(function (pick) {
        return pick.pickDomManagerHandlers.updateComponentDisabled();
      });
      picksDom.disable(isComponentDisabled);
    }
  };
}

var defaultPlugins = {
  CssPatchPlugin: CssPatchPlugin,
  SelectElementPlugin: SelectElementPlugin,
  LabelForAttributePlugin: LabelForAttributePlugin,
  HiddenOptionPlugin: HiddenOptionPlugin,
  ValidationApiPlugin: ValidationApiPlugin,
  UpdateAppearancePlugin: UpdateAppearancePlugin,
  BsAppearancePlugin: BsAppearancePlugin,
  DisableComponentPlugin: DisableComponentPlugin,
  FormResetPlugin: FormResetPlugin,
  CreatePopperPlugin: CreatePopperPlugin,
  WarningPlugin: WarningPlugin,
  RtlPlugin: RtlPlugin,
  PlaceholderPlugin: PlaceholderPlugin,
  FloatingLabelPlugin: FloatingLabelPlugin,
  OptionsApiPlugin: OptionsApiPlugin,
  JQueryMethodsPlugin: JQueryMethodsPlugin,
  SelectedOptionPlugin: SelectedOptionPlugin,
  FormRestoreOnBackwardPlugin: FormRestoreOnBackwardPlugin,
  DisabledOptionPlugin: DisabledOptionPlugin,
  PicksApiPlugin: PicksApiPlugin,
  HighlightPlugin: HighlightPlugin,
  ChoicesDynamicStylingPlugin: ChoicesDynamicStylingPlugin,
  CustomPickStylingsPlugin: CustomPickStylingsPlugin,
  CustomChoiceStylingsPlugin: CustomChoiceStylingsPlugin
};
var picksPlugins = {
  CssPatchPlugin: CssPatchPlugin,
  PicksPlugin: PicksPlugin,
  LabelForAttributePlugin: LabelForAttributePlugin,
  ValidationApiPlugin: ValidationApiPlugin,
  UpdateAppearancePlugin: UpdateAppearancePlugin,
  BsAppearancePlugin: BsAppearancePlugin,
  DisableComponentPlugin: DisableComponentPlugin,
  CreatePopperPlugin: CreatePopperPlugin,
  WarningPlugin: WarningPlugin,
  RtlPlugin: RtlPlugin,
  PlaceholderPlugin: PlaceholderPlugin,
  FloatingLabelPlugin: FloatingLabelPlugin,
  OptionsApiPlugin: OptionsApiPlugin,
  JQueryMethodsPlugin: JQueryMethodsPlugin,
  PicksApiPlugin: PicksApiPlugin,
  HighlightPlugin: HighlightPlugin,
  ChoicesDynamicStylingPlugin: ChoicesDynamicStylingPlugin,
  CustomPickStylingsPlugin: CustomPickStylingsPlugin,
  CustomChoiceStylingsPlugin: CustomChoiceStylingsPlugin
};
var allPlugins = shallowClearClone(defaultPlugins, {
  PicksPlugin: PicksPlugin
}); // var defaultConfig = {
//     plugins: defaultPlugins
// }
// var picksConfig = {
//     plugins: picksPlugins
// }
// export function createConfig(arg){
//     return config;
// }

var utilities = {
  composeSync: composeSync,
  EventBinder: EventBinder,
  addStyling: addStyling,
  toggleStyling: toggleStyling
};

function PluginManager(plugins, pluginData) {
  var instances = [];

  if (plugins) {
    for (var i = 0; i < plugins.length; i++) {
      var instance = plugins[i](pluginData);
      if (instance) instances.push(instance);
    }
  }

  var disposes = [];
  return {
    buildApi: function buildApi(api) {
      for (var _i = 0; _i < instances.length; _i++) {
        var _instances$_i$buildAp, _instances$_i;

        var dispose = (_instances$_i$buildAp = (_instances$_i = instances[_i]).buildApi) == null ? void 0 : _instances$_i$buildAp.call(_instances$_i, api);
        if (dispose) disposes.push(dispose);
      }
    },
    dispose: function dispose() {
      for (var _i2 = 0; _i2 < disposes.length; _i2++) {
        disposes[_i2]();
      }

      disposes = null;

      for (var _i3 = 0; _i3 < instances.length; _i3++) {
        var _instances$_i3$dispos, _instances$_i2;

        (_instances$_i3$dispos = (_instances$_i2 = instances[_i3]).dispose) == null ? void 0 : _instances$_i3$dispos.call(_instances$_i2);
      }

      instances = null;
    }
  };
}
function plugDefaultConfig(constructors, defaults) {
  for (var i = 0; i < constructors.length; i++) {
    var _constructors$i$plugD, _constructors$i;

    (_constructors$i$plugD = (_constructors$i = constructors[i]).plugDefaultConfig) == null ? void 0 : _constructors$i$plugD.call(_constructors$i, defaults);
  }
}
function plugMergeSettings(constructors, configuration, defaults, settings) {
  for (var i = 0; i < constructors.length; i++) {
    var _constructors$i$plugM, _constructors$i2;

    (_constructors$i$plugM = (_constructors$i2 = constructors[i]).plugMergeSettings) == null ? void 0 : _constructors$i$plugM.call(_constructors$i2, configuration, defaults, settings);
  }
}
function plugStaticDom(constructors, aspects) {
  for (var i = 0; i < constructors.length; i++) {
    var _constructors$i$plugS, _constructors$i3;

    (_constructors$i$plugS = (_constructors$i3 = constructors[i]).plugStaticDom) == null ? void 0 : _constructors$i$plugS.call(_constructors$i3, aspects);
  }
}

function PickDomFactory(css, componentPropertiesAspect, optionPropertiesAspect, pickButtonAspect) {
  return {
    create: function create(pickElement, wrap, remove) {
      var eventBinder = EventBinder();
      var buttonHTML = pickButtonAspect.getButtonHTML();
      pickElement.innerHTML = '<span></span>' + buttonHTML;
      var pickContentElement = pickElement.querySelector('SPAN');
      var pickButtonElement = pickElement.querySelector('BUTTON');
      eventBinder.bind(pickButtonElement, "click", remove);
      addStyling(pickContentElement, css.pickContent);
      addStyling(pickButtonElement, css.pickButton);
      var disableToggle = toggleStyling(pickContentElement, css.pickContent_disabled);

      function updateData() {
        pickContentElement.textContent = optionPropertiesAspect.getText(wrap.option);
      }

      function updateDisabled() {
        disableToggle(wrap.isOptionDisabled);
      }

      function updateComponentDisabled() {
        pickButtonElement.disabled = componentPropertiesAspect.getDisabled();
      }

      return {
        pickDom: {
          pickContentElement: pickContentElement,
          pickButtonElement: pickButtonElement
        },
        pickDomManagerHandlers: {
          updateData: updateData,
          updateDisabled: updateDisabled,
          updateComponentDisabled: updateComponentDisabled
        },
        dispose: function dispose() {
          eventBinder.unbind();
        }
      };
    }
  };
}

function ChoiceDomFactory(css, optionPropertiesAspect, highlightAspect) {
  var updateHighlightedInternal = function updateHighlightedInternal(wrap, choiceDom, element) {
    var text = optionPropertiesAspect.getText(wrap.option);
    var highlighter = highlightAspect.getHighlighter();
    if (highlighter) highlighter(element, choiceDom, text);else element.textContent = text;
  };

  var updateDataInternal = function updateDataInternal(wrap, element) {
    element.textContent = optionPropertiesAspect.getText(wrap.option);
  }; //TODO move check which aspects availbale like wrap.hasOwnProperty("isOptionSelected") to there


  return {
    create: function create(choiceElement, wrap, toggle) {
      var choiceDom = null;
      var choiceDomManagerHandlers = null;
      var eventBinder = EventBinder();
      eventBinder.bind(choiceElement, "click", toggle);

      if (wrap.hasOwnProperty("isOptionSelected")) {
        choiceElement.innerHTML = '<div><input formnovalidate type="checkbox"><label></label></div>';
        var choiceContentElement = choiceElement.querySelector('DIV');
        var choiceCheckBoxElement = choiceContentElement.querySelector('INPUT');
        var choiceLabelElement = choiceContentElement.querySelector('LABEL');
        addStyling(choiceContentElement, css.choiceContent);
        addStyling(choiceCheckBoxElement, css.choiceCheckBox);
        addStyling(choiceLabelElement, css.choiceLabel);
        choiceDom = {
          choiceElement: choiceElement,
          choiceContentElement: choiceContentElement,
          choiceCheckBoxElement: choiceCheckBoxElement,
          choiceLabelElement: choiceLabelElement
        };
        var choiceSelectedToggle = toggleStyling(choiceElement, css.choice_selected);

        var updateSelected = function updateSelected() {
          choiceSelectedToggle(wrap.isOptionSelected);
          choiceCheckBoxElement.checked = wrap.isOptionSelected;

          if (wrap.isOptionDisabled || wrap.choice.isHoverIn) {
            choiceHoverToggle(wrap.choice.isHoverIn, true);
          }
        };

        var choiceDisabledToggle = toggleStyling(choiceElement, css.choice_disabled);
        var choiceCheckBoxDisabledToggle = toggleStyling(choiceCheckBoxElement, css.choiceCheckBox_disabled);
        var choiceLabelDisabledToggle = toggleStyling(choiceLabelElement, css.choiceLabel_disabled);
        var choiceCursorDisabledToggle = toggleStyling(choiceElement, {
          classes: [],
          styles: {
            cursor: "default"
          }
        });

        var updateDisabled = function updateDisabled() {
          choiceDisabledToggle(wrap.isOptionDisabled);
          choiceCheckBoxDisabledToggle(wrap.isOptionDisabled);
          choiceLabelDisabledToggle(wrap.isOptionDisabled); // do not desable checkBox if option is selected! there should be possibility to unselect "disabled"

          var isCheckBoxDisabled = wrap.isOptionDisabled && !wrap.isOptionSelected;
          choiceCheckBoxElement.disabled = isCheckBoxDisabled;
          choiceCursorDisabledToggle(isCheckBoxDisabled);
        };

        var choiceHoverToggle = toggleStyling(choiceElement, function () {
          if (css.choice_disabled_hover && wrap.isOptionDisabled === true && wrap.isOptionSelected === false) return css.choice_disabled_hover;else return css.choice_hover;
        });

        var updateHoverIn = function updateHoverIn() {
          choiceHoverToggle(wrap.choice.isHoverIn);
        };

        choiceDomManagerHandlers = {
          updateData: function updateData() {
            return updateDataInternal(wrap, choiceLabelElement);
          },
          updateHighlighted: function updateHighlighted() {
            return updateHighlightedInternal(wrap, choiceDom, choiceLabelElement);
          },
          updateHoverIn: updateHoverIn,
          updateDisabled: updateDisabled,
          updateSelected: updateSelected
        };
      } else {
        var _choiceHoverToggle = toggleStyling(choiceElement, function () {
          return wrap.isOptionDisabled && css.choice_disabled_hover ? css.choice_disabled_hover : css.choice_hover;
        });

        var _updateHoverIn = function _updateHoverIn() {
          _choiceHoverToggle(wrap.choice.isHoverIn);
        };

        choiceElement.innerHTML = '<span></span>';

        var _choiceContentElement = choiceElement.querySelector('SPAN');

        choiceDom = {
          choiceElement: choiceElement,
          choiceContentElement: _choiceContentElement
        };
        choiceDomManagerHandlers = {
          updateData: function updateData() {
            return updateDataInternal(wrap, _choiceContentElement);
          },
          updateHighlighted: function updateHighlighted() {
            return updateHighlightedInternal(wrap, choiceDom, choiceElement);
          },
          updateHoverIn: _updateHoverIn
        };
      }

      return {
        choiceDom: choiceDom,
        choiceDomManagerHandlers: choiceDomManagerHandlers,
        dispose: function dispose() {
          eventBinder.unbind();
        }
      };
    }
  };
}

function CreateElementAspect(createElement) {
  return {
    createElement: createElement
  };
}
function StaticDomFactory(choicesDomFactory, createElementAspect) {
  return {
    create: function create(css) {
      var choicesDom = choicesDomFactory.create(css);
      return {
        choicesDom: choicesDom,
        createStaticDom: function createStaticDom(element, containerClass) {
          function showError(message) {
            element.style.backgroundColor = 'red';
            element.style.color = 'white';
            throw new Error(message);
          }

          var containerElement, picksElement;
          var removableContainerClass = false;

          if (element.tagName == 'DIV') {
            containerElement = element;

            if (!containerElement.classList.contains(containerClass)) {
              containerElement.classList.add(containerClass);
              removableContainerClass = true;
            }

            picksElement = findDirectChildByTagName(containerElement, 'UL');
          } else if (element.tagName == 'UL') {
            picksElement = element;
            containerElement = closestByClassName(element, containerClass);

            if (!containerElement) {
              showError('BsMultiSelect: defined on UL but precedentant DIV for container not found; class=' + containerClass);
            }
          } else if (element.tagName == "INPUT") {
            showError('BsMultiSelect: INPUT element is not supported');
          }

          var isDisposablePicksElement = false;

          if (!picksElement) {
            picksElement = createElementAspect.createElement('UL');
            isDisposablePicksElement = true;
          }

          return {
            choicesDom: choicesDom,
            staticDom: {
              initialElement: element,
              containerElement: containerElement,
              picksElement: picksElement,
              isDisposablePicksElement: isDisposablePicksElement
            },
            staticManager: {
              appendToContainer: function appendToContainer() {
                containerElement.appendChild(choicesDom.choicesElement);
                if (isDisposablePicksElement) containerElement.appendChild(picksElement);
              },
              dispose: function dispose() {
                containerElement.removeChild(choicesDom.choicesElement);
                if (removableContainerClass) containerElement.classList.remove(containerClass);
                if (isDisposablePicksElement) containerElement.removeChild(picksElement);
              }
            }
          };
        }
      };
    }
  };
}

function PicksDom(picksElement, isDisposablePicksElement, createElementAspect, css) {
  var pickFilterElement = createElementAspect.createElement('LI');
  addStyling(picksElement, css.picks);
  addStyling(pickFilterElement, css.pickFilter);
  var disableToggleStyling = toggleStyling(picksElement, css.picks_disabled);
  var focusToggleStyling = toggleStyling(picksElement, css.picks_focus);
  var isFocusIn = false;
  return {
    picksElement: picksElement,
    pickFilterElement: pickFilterElement,
    createPickElement: function createPickElement() {
      var pickElement = createElementAspect.createElement('LI');
      addStyling(pickElement, css.pick);
      return {
        pickElement: pickElement,
        attach: function attach(beforeElement) {
          return picksElement.insertBefore(pickElement, beforeElement != null ? beforeElement : pickFilterElement);
        },
        detach: function detach() {
          return picksElement.removeChild(pickElement);
        }
      };
    },
    disable: function disable(isComponentDisabled) {
      disableToggleStyling(isComponentDisabled);
    },
    toggleFocusStyling: function toggleFocusStyling() {
      focusToggleStyling(isFocusIn);
    },
    getIsFocusIn: function getIsFocusIn() {
      return isFocusIn;
    },
    setIsFocusIn: function setIsFocusIn(newIsFocusIn) {
      isFocusIn = newIsFocusIn;
    },
    dispose: function dispose() {
      if (!isDisposablePicksElement) {
        disableToggleStyling(false);
        focusToggleStyling(false);
        if (pickFilterElement.parentNode) pickFilterElement.parentNode.removeChild(pickFilterElement);
      }
    }
  };
}

function FilterDom(isDisposablePicksElement, createElementAspect, css) {
  var filterInputElement = createElementAspect.createElement('INPUT');
  addStyling(filterInputElement, css.filterInput);
  filterInputElement.setAttribute("type", "search");
  filterInputElement.setAttribute("autocomplete", "off");
  var eventBinder = EventBinder();
  return {
    filterInputElement: filterInputElement,
    isEmpty: function isEmpty() {
      return filterInputElement.value ? false : true;
    },
    setEmpty: function setEmpty() {
      filterInputElement.value = '';
    },
    getValue: function getValue() {
      return filterInputElement.value;
    },
    setFocus: function setFocus() {
      filterInputElement.focus();
    },
    setWidth: function setWidth(text) {
      filterInputElement.style.width = text.length * 1.3 + 2 + "ch";
    },
    // TODO: check why I need this comparision? 
    setFocusIfNotTarget: function setFocusIfNotTarget(target) {
      if (target != filterInputElement) filterInputElement.focus();
    },
    onInput: function onInput(onFilterInputInput) {
      eventBinder.bind(filterInputElement, 'input', onFilterInputInput);
    },
    onFocusIn: function onFocusIn(_onFocusIn) {
      eventBinder.bind(filterInputElement, 'focusin', _onFocusIn);
    },
    onFocusOut: function onFocusOut(_onFocusOut) {
      eventBinder.bind(filterInputElement, 'focusout', _onFocusOut);
    },
    onKeyDown: function onKeyDown(onfilterInputKeyDown) {
      eventBinder.bind(filterInputElement, 'keydown', onfilterInputKeyDown);
    },
    onKeyUp: function onKeyUp(onFilterInputKeyUp) {
      eventBinder.bind(filterInputElement, 'keyup', onFilterInputKeyUp);
    },
    dispose: function dispose() {
      eventBinder.unbind();

      if (!isDisposablePicksElement) {
        if (filterInputElement.parentNode) filterInputElement.parentNode.removeChild(filterInputElement);
      }
    }
  };
}

function ChoicesDomFactory(createElementAspect) {
  return {
    create: function create(css) {
      var choicesElement = createElementAspect.createElement('DIV');
      var choicesListElement = createElementAspect.createElement('UL');
      choicesElement.appendChild(choicesListElement);
      choicesElement.style.display = 'none';
      addStyling(choicesElement, css.choices);
      addStyling(choicesListElement, css.choicesList);
      return {
        choicesElement: choicesElement,
        choicesListElement: choicesListElement,
        createChoiceElement: function createChoiceElement() {
          var choiceElement = createElementAspect.createElement('LI');
          addStyling(choiceElement, css.choice);
          return {
            choiceElement: choiceElement,
            setVisible: function setVisible(isVisible) {
              return choiceElement.style.display = isVisible ? 'block' : 'none';
            },
            attach: function attach(beforeElement) {
              return choicesListElement.insertBefore(choiceElement, beforeElement);
            },
            detach: function detach() {
              return choicesListElement.removeChild(choiceElement);
            }
          };
        }
      };
    }
  };
}

function ChoicesVisibilityAspect(choicesElement) {
  return {
    isChoicesVisible: function isChoicesVisible() {
      return choicesElement.style.display != 'none';
    },
    setChoicesVisible: function setChoicesVisible(visible) {
      choicesElement.style.display = visible ? 'block' : 'none';
    },
    updatePopupLocation: function updatePopupLocation() {}
  };
}

function SpecialPicksEventsAspect() {
  return {
    backSpace: function backSpace(pick) {
      pick.setSelectedFalse();
    }
  };
}

function TriggerAspect(element, _trigger) {
  return {
    trigger: function trigger(eventName) {
      _trigger(element, eventName);
    }
  };
}
function OnChangeAspect(triggerAspect, name) {
  return {
    onChange: function onChange() {
      triggerAspect.trigger(name);
    }
  };
}
function ComponentPropertiesAspect(getDisabled) {
  return {
    getDisabled: getDisabled
  };
}

function OptionsAspect(options) {
  return {
    getOptions: function getOptions() {
      return options;
    }
  };
}
function OptionPropertiesAspect(getText) {
  if (!getText) {
    getText = function getText(option) {
      return option.text;
    };
  }

  return {
    getText: getText
  };
}

function ChoicesEnumerableAspect(countableChoicesList, getNext) {
  return {
    forEach: function forEach(f) {
      var wrap = countableChoicesList.getHead();

      while (wrap) {
        f(wrap);
        wrap = getNext(wrap);
      }
    }
  };
}

function NavigateManager(list, getPrev, getNext) {
  return {
    navigate: function navigate(down, wrap
    /* hoveredChoice */
    ) {
      if (down) {
        return wrap ? getNext(wrap) : list.getHead();
      } else {
        return wrap ? getPrev(wrap) : list.getTail();
      }
    },
    getCount: function getCount() {
      return list.getCount();
    },
    getHead: function getHead() {
      return list.getHead();
    }
  };
}
function FilterPredicateAspect() {
  return {
    filterPredicate: function filterPredicate(wrap, text) {
      return wrap.choice.searchText.indexOf(text) >= 0;
    }
  };
}
function FilterManagerAspect(emptyNavigateManager, filteredNavigateManager, filteredChoicesList, choicesEnumerableAspect, filterPredicateAspect) {
  var showEmptyFilter = true;
  var filterText = "";
  return {
    getNavigateManager: function getNavigateManager() {
      return showEmptyFilter ? emptyNavigateManager : filteredNavigateManager;
    },
    processEmptyInput: function processEmptyInput() {
      // redefined in PlaceholderPulgin, HighlightPlugin
      showEmptyFilter = true;
      filterText = "";
      choicesEnumerableAspect.forEach(function (wrap) {
        wrap.choice.setVisible(true);
      });
    },
    getFilter: function getFilter() {
      return filterText;
    },
    setFilter: function setFilter(text) {
      // redefined in  HighlightPlugin
      showEmptyFilter = false;
      filterText = text;
      filteredChoicesList.reset();
      choicesEnumerableAspect.forEach(function (wrap) {
        wrap.choice.filteredPrev = wrap.choice.filteredNext = null;
        var v = filterPredicateAspect.filterPredicate(wrap, text);
        if (v) filteredChoicesList.add(wrap);
        wrap.choice.setVisible(v);
      });
    }
  };
}

function BuildAndAttachChoiceAspect(buildChoiceAspect) {
  return {
    buildAndAttachChoice: function buildAndAttachChoice(wrap, getNextElement) {
      buildChoiceAspect.buildChoice(wrap);
      wrap.choice.choiceElementAttach(getNextElement == null ? void 0 : getNextElement());
    }
  };
}
function BuildChoiceAspect(choicesDom, choiceDomFactory, choiceClickAspect) {
  return {
    buildChoice: function buildChoice(wrap) {
      var _choicesDom$createCho = choicesDom.createChoiceElement(),
          choiceElement = _choicesDom$createCho.choiceElement,
          setVisible = _choicesDom$createCho.setVisible,
          attach = _choicesDom$createCho.attach,
          detach = _choicesDom$createCho.detach;

      wrap.choice.choiceElement = choiceElement;
      wrap.choice.choiceElementAttach = attach;
      wrap.choice.isChoiceElementAttached = true;

      var _choiceDomFactory$cre = choiceDomFactory.create(choiceElement, wrap, function () {
        return choiceClickAspect.choiceClick(wrap);
      }),
          dispose = _choiceDomFactory$cre.dispose,
          choiceDom = _choiceDomFactory$cre.choiceDom,
          choiceDomManagerHandlers = _choiceDomFactory$cre.choiceDomManagerHandlers;

      wrap.choice.choiceDom = choiceDom;
      choiceDomManagerHandlers.updateData();
      if (choiceDomManagerHandlers.updateSelected) choiceDomManagerHandlers.updateSelected();
      if (choiceDomManagerHandlers.updateDisabled) choiceDomManagerHandlers.updateDisabled();
      wrap.choice.choiceDomManagerHandlers = choiceDomManagerHandlers;

      wrap.choice.remove = function () {
        detach();
      };

      wrap.choice.isFilteredIn = true;

      wrap.choice.setHoverIn = function (v) {
        wrap.choice.isHoverIn = v;
        choiceDomManagerHandlers.updateHoverIn();
      };

      wrap.choice.setVisible = function (v) {
        wrap.choice.isFilteredIn = v;
        setVisible(wrap.choice.isFilteredIn);
      };

      wrap.choice.dispose = function () {
        wrap.choice.choiceDomManagerHandlers = null;
        dispose();
        wrap.choice.choiceElement = null;
        wrap.choice.choiceDom = null;
        wrap.choice.choiceElementAttach = null;
        wrap.choice.isChoiceElementAttached = false;
        wrap.choice.remove = null; // not real data manipulation but internal state

        wrap.choice.setVisible = null; // TODO: refactor it there should be 3 types of not visibility: for hidden, for filtered out, for optgroup, for message item

        wrap.choice.setHoverIn = null;
        wrap.choice.dispose = null;
      };

      wrap.dispose = function () {
        wrap.choice.dispose();
        wrap.dispose = null;
      };
    }
  };
}

function OptionAttachAspect(createWrapAspect, createChoiceBaseAspect, buildAndAttachChoiceAspect, wraps) {
  return {
    attach: function attach(option) {
      var wrap = createWrapAspect.createWrap(option);
      wrap.choice = createChoiceBaseAspect.createChoiceBase(option); // let optGroup = optGroupAspect.getOptionOptGroup(option);
      // if (prevOptGroup != optGroup){
      //     currentOptGroup = optGroup;
      //     var optGroupWrap = optGroupBuildAspect.wrapAndAttachOptGroupItem(option);
      // }
      // wrap.optGroup = currentOptGroup;

      wraps.push(wrap); // note: before attach because attach need it for navigation management

      buildAndAttachChoiceAspect.buildAndAttachChoice(wrap); //wraps.push(wrap);
    }
  };
}
function OptionsLoopAspect(optionsAspect, optionAttachAspect) {
  return {
    loop: function loop() {
      var options = optionsAspect.getOptions();

      for (var i = 0; i < options.length; i++) {
        var option = options[i];
        optionAttachAspect.attach(option);
      }
    }
  };
}

function UpdateDataAspect(choicesDom, wraps, picksList, optionsLoopAspect, resetLayoutAspect) {
  return {
    updateData: function updateData() {
      // close drop down , remove filter
      resetLayoutAspect.resetLayout();
      choicesDom.choicesListElement.innerHTML = ""; // TODO: there should better "optimization"

      wraps.clear();
      picksList.forEach(function (pick) {
        return pick.dispose();
      });
      picksList.reset();
      optionsLoopAspect.loop();
    }
  };
}
function UpdateAspect(updateDataAspect) {
  return {
    update: function update() {
      updateDataAspect.updateData();
    }
  };
}

function IsChoiceSelectableAspect() {
  // TODO rename to IsSelectableByUserAspect ?
  return {
    isSelectable: function isSelectable(wrap) {
      return true;
    }
  };
} // todo: remove?

function ChoiceClickAspect(optionToggleAspect, filterDom) {
  return {
    choiceClick: function choiceClick(wrap) {
      optionToggleAspect.toggle(wrap);
      filterDom.setFocus();
    }
  };
} // // fullMatchAspect trySetWrapSelected(fullMatchWrap.option, composeUpdateSelected(fullMatchWrap, true), true);

function OptionToggleAspect(createPickHandlersAspect, addPickAspect
/*, setOptionSelectedAspect*/
) {
  return {
    toggle: function toggle(wrap) {
      var pickHandlers = createPickHandlersAspect.createPickHandlers(wrap);
      addPickAspect.addPick(wrap, pickHandlers);
      return true; // TODO: process setOptionSelectedAspect
    }
  };
}
function AddPickAspect() {
  return {
    addPick: function addPick(wrap, pickHandlers) {
      return pickHandlers.producePick();
    }
  };
}
function FullMatchAspect(createPickHandlersAspect, addPickAspect) {
  return {
    fullMatch: function fullMatch(wrap) {
      var pickHandlers = createPickHandlersAspect.createPickHandlers(wrap);
      addPickAspect.addPick(wrap, pickHandlers);
      return true; // TODO: process setOptionSelectedAspect
    }
  };
}
function RemovePickAspect() {
  return {
    removePick: function removePick(wrap, pick) {
      pick.dispose(); // overrided in SelectedOptionPlugin with trySetWrapSelected(wrap, false);
    }
  };
}
function ProducePickAspect(picksList, removePickAspect, buildPickAspect) {
  return {
    producePick: function producePick(wrap, pickHandlers) {
      var pick = buildPickAspect.buildPick(wrap, function (event) {
        return pickHandlers.removeOnButton(event);
      });

      var fixSelectedFalse = function fixSelectedFalse() {
        return removePickAspect.removePick(wrap, pick);
      };

      pickHandlers.removeOnButton = fixSelectedFalse;
      pick.pickElementAttach();

      var _picksList$add = picksList.add(pick),
          removeFromPicksList = _picksList$add.remove;

      pick.setSelectedFalse = fixSelectedFalse;
      pick.wrap = wrap;
      pick.dispose = composeSync(removeFromPicksList, function () {
        pick.setSelectedFalse = null;
        pick.wrap = null;
      }, pick.dispose);

      pickHandlers.removeAndDispose = function () {
        return pick.dispose();
      };

      return pick;
    }
  };
} // redefined in MultiSelectInlineLayout to redefine handlers removeOnButton
// redefined in SelectedOptionPlugin to compose wrap.updateSelected

function CreatePickHandlersAspect(producePickAspect) {
  return {
    createPickHandlers: function createPickHandlers(wrap) {
      var pickHandlers = {
        producePick: null,
        // not redefined directly, but redefined in addPickAspect
        removeAndDispose: null,
        // not redefined, 
        removeOnButton: null // redefined in MultiSelectInlineLayout

      };

      pickHandlers.producePick = function () {
        return producePickAspect.producePick(wrap, pickHandlers);
      };

      return pickHandlers;
    }
  };
}
function CreateChoiceBaseAspect(optionPropertiesAspect) {
  return {
    createChoiceBase: function createChoiceBase(option) {
      return {
        //updateDisabled:null,  
        //updateHidden:null,
        // navigation and filter support
        filteredPrev: null,
        filteredNext: null,
        searchText: optionPropertiesAspect.getText(option).toLowerCase().trim(),
        // TODO make an index abstraction
        // internal state handlers, so they do not have "update semantics"
        isHoverIn: false,
        isFilteredIn: false,
        setVisible: null,
        setHoverIn: null,
        // TODO: is it a really sense to have them there?
        isChoiceElementAttached: false,
        choiceElement: null,
        choiceDom: null,
        choiceElementAttach: null,
        itemPrev: null,
        itemNext: null,
        remove: null,
        dispose: null
      };
    }
  };
}
function CreateWrapAspect() {
  return {
    createWrap: function createWrap(option) {
      return {
        option: option
      };
    }
  };
}

function HoveredChoiceAspect() {
  var hoveredChoice = null;
  return {
    getHoveredChoice: function getHoveredChoice() {
      return hoveredChoice;
    },
    setHoveredChoice: function setHoveredChoice(wrap) {
      hoveredChoice = wrap;
    },
    resetHoveredChoice: function resetHoveredChoice() {
      if (hoveredChoice) {
        hoveredChoice.choice.setHoverIn(false);
        hoveredChoice = null;
      }
    }
  };
}
function NavigateAspect(hoveredChoiceAspect, _navigate) {
  return {
    hoverIn: function hoverIn(wrap) {
      hoveredChoiceAspect.resetHoveredChoice();
      hoveredChoiceAspect.setHoveredChoice(wrap);
      wrap.choice.setHoverIn(true);
    },
    navigate: function navigate(down) {
      return _navigate(down, hoveredChoiceAspect.getHoveredChoice());
    }
  };
}

function Wraps(wrapsCollection, listFacade_reset, listFacade_remove, listFacade_add) {
  return {
    push: function push(wrap) {
      return _push(wrap, wrapsCollection, listFacade_add);
    },
    insert: function insert(key, wrap) {
      return _insert(key, wrap, wrapsCollection, listFacade_add);
    },
    remove: function remove(key) {
      var wrap = wrapsCollection.remove(key);
      listFacade_remove(wrap);
      return wrap;
    },
    clear: function clear() {
      wrapsCollection.reset();
      listFacade_reset();
    },
    dispose: function dispose() {
      return wrapsCollection.forLoop(function (wrap) {
        return wrap.dispose();
      });
    }
  };
}

function _push(wrap, wrapsCollection, listFacade_add) {
  wrapsCollection.push(wrap);
  listFacade_add(wrap);
}

function _insert(key, wrap, wrapsCollection, listFacade_add) {
  if (key >= wrapsCollection.getCount()) {
    _push(wrap, wrapsCollection, listFacade_add);
  } else {
    wrapsCollection.add(wrap, key);
    listFacade_add(wrap, key);
  }
}

function PickButtonAspect(buttonHTML) {
  return {
    getButtonHTML: function getButtonHTML() {
      return buttonHTML;
    }
  };
}

function BuildPickAspect(picksDom, pickDomFactory) {
  return {
    buildPick: function buildPick(wrap, removeOnButton) {
      var _picksDom$createPickE = picksDom.createPickElement(),
          pickElement = _picksDom$createPickE.pickElement,
          attach = _picksDom$createPickE.attach,
          detach = _picksDom$createPickE.detach;

      var _pickDomFactory$creat = pickDomFactory.create(pickElement, wrap, removeOnButton),
          _dispose = _pickDomFactory$creat.dispose,
          pickDom = _pickDomFactory$creat.pickDom,
          pickDomManagerHandlers = _pickDomFactory$creat.pickDomManagerHandlers;

      pickDomManagerHandlers.updateData();
      if (pickDomManagerHandlers.updateDisabled) pickDomManagerHandlers.updateDisabled();
      if (pickDomManagerHandlers.updateComponentDisabled) pickDomManagerHandlers.updateComponentDisabled();
      var pick = {
        pickDom: pickDom,
        pickDomManagerHandlers: pickDomManagerHandlers,
        pickElementAttach: attach,
        dispose: function dispose() {
          detach();

          _dispose();

          pick.pickDomManagerHandlers = null;
          pick.pickDom = pickDom;
          pick.pickElementAttach = null;
          pick.dispose = null;
        }
      };
      return pick;
    }
  };
}

function InputAspect(filterDom, filterManagerAspect, fullMatchAspect) {
  return {
    // overrided in SelectedOptionPlugin
    processInput: function processInput() {
      var filterInputValue = filterDom.getValue();
      var text = filterInputValue.trim();
      var isEmpty = false;
      if (text == '') isEmpty = true;else {
        filterManagerAspect.setFilter(text.toLowerCase());
      }

      if (!isEmpty) {
        if (filterManagerAspect.getNavigateManager().getCount() == 1) {
          // todo: move exact match to filterManager
          var fullMatchWrap = filterManagerAspect.getNavigateManager().getHead();

          var _text = filterManagerAspect.getFilter();

          if (fullMatchWrap.choice.searchText == _text) {
            var success = fullMatchAspect.fullMatch(fullMatchWrap);

            if (success) {
              filterDom.setEmpty();
              isEmpty = true;
            }
          }
        }
      }

      return {
        filterInputValue: filterInputValue,
        isEmpty: isEmpty
      };
    }
  };
}

function ResetFilterListAspect(filterDom, filterManagerAspect) {
  return {
    forceResetFilter: function forceResetFilter() {
      // over in PlaceholderPlugin
      filterDom.setEmpty();
      filterManagerAspect.processEmptyInput(); // over in PlaceholderPlugin
    }
  };
}
function ResetFilterAspect(filterDom, resetFilterListAspect) {
  return {
    resetFilter: function resetFilter() {
      // call in OptionsApiPlugin
      if (!filterDom.isEmpty()) // call in Placeholder
        resetFilterListAspect.forceResetFilter(); // over in Placeholder
    }
  };
}
function FocusInAspect(picksDom) {
  return {
    setFocusIn: function setFocusIn(focus) {
      // call in OptionsApiPlugin
      picksDom.setIsFocusIn(focus); // unique call, call BsAppearancePlugin

      picksDom.toggleFocusStyling(); // over BsAppearancePlugin
    }
  };
}

function MultiSelectInlineLayout(aspects) {
  var environment = aspects.environment,
      filterDom = aspects.filterDom,
      picksDom = aspects.picksDom,
      choicesDom = aspects.choicesDom,
      choicesVisibilityAspect = aspects.choicesVisibilityAspect,
      hoveredChoiceAspect = aspects.hoveredChoiceAspect,
      navigateAspect = aspects.navigateAspect,
      filterManagerAspect = aspects.filterManagerAspect,
      focusInAspect = aspects.focusInAspect,
      optionToggleAspect = aspects.optionToggleAspect,
      createPickHandlersAspect = aspects.createPickHandlersAspect,
      picksList = aspects.picksList,
      inputAspect = aspects.inputAspect,
      specialPicksEventsAspect = aspects.specialPicksEventsAspect,
      buildChoiceAspect = aspects.buildChoiceAspect,
      disableComponentAspect = aspects.disableComponentAspect,
      resetLayoutAspect = aspects.resetLayoutAspect,
      placeholderStopInputAspect = aspects.placeholderStopInputAspect,
      warningAspect = aspects.warningAspect,
      configuration = aspects.configuration,
      createPopperAspect = aspects.createPopperAspect,
      rtlAspect = aspects.rtlAspect,
      staticManager = aspects.staticManager;
  var picksElement = picksDom.picksElement;
  var choicesElement = choicesDom.choicesElement; // pop up layout, require createPopperPlugin

  var filterInputElement = filterDom.filterInputElement;
  var pop = createPopperAspect.createPopper(choicesElement, filterInputElement, true);
  staticManager.appendToContainer = composeSync(staticManager.appendToContainer, pop.init);
  var origBackSpace = specialPicksEventsAspect.backSpace;

  specialPicksEventsAspect.backSpace = function (pick) {
    origBackSpace(pick);
    pop.update();
  };

  if (rtlAspect) {
    var origUpdateRtl = rtlAspect.updateRtl;

    rtlAspect.updateRtl = function (isRtl) {
      origUpdateRtl(isRtl);
      pop.setRtl(isRtl);
    };
  }

  choicesVisibilityAspect.updatePopupLocation = composeSync(choicesVisibilityAspect.updatePopupLocation, function () {
    pop.update();
  });

  if (warningAspect) {
    var pop2 = createPopperAspect.createPopper(warningAspect.warningElement, filterInputElement, false);
    staticManager.appendToContainer = composeSync(staticManager.appendToContainer, pop2.init);

    if (rtlAspect) {
      var origUpdateRtl2 = rtlAspect.updateRtl;

      rtlAspect.updateRtl = function (isRtl) {
        origUpdateRtl2(isRtl);
        pop2.setRtl(isRtl);
      };
    }

    var origWarningAspectShow = warningAspect.show;

    warningAspect.show = function (msg) {
      pop2.update();
      origWarningAspectShow(msg);
    };

    pop.dispose = composeSync(pop.dispose, pop2.dispose);
  }

  var window = environment.window;
  var document = window.document;
  var eventLoopFlag = EventLoopProlongableFlag(window);
  var skipFocusout = false;

  function getSkipFocusout() {
    return skipFocusout;
  }

  function resetSkipFocusout() {
    skipFocusout = false;
  }

  function setSkipFocusout() {
    skipFocusout = true;
  }

  var skipoutMousedown = function skipoutMousedown() {
    setSkipFocusout();
  };

  var documentMouseup = function documentMouseup(event) {
    // if we would left without focus then "close the drop" do not remove focus border
    if (choicesElement == event.target) filterDom.setFocus(); // if click outside container - close dropdown
    else if (!containsAndSelf(choicesElement, event.target) && !containsAndSelf(picksElement, event.target)) {
      resetLayoutAspect.resetLayout();
      focusInAspect.setFocusIn(false);
    }
  };

  function showChoices() {
    if (!choicesVisibilityAspect.isChoicesVisible()) {
      choicesVisibilityAspect.updatePopupLocation();
      eventLoopFlag.set();
      choicesVisibilityAspect.setChoicesVisible(true); // TODO: move to scroll plugin

      choicesElement.scrollTop = 0; // add listeners that manages close dropdown on  click outside container

      choicesElement.addEventListener("mousedown", skipoutMousedown);
      document.addEventListener("mouseup", documentMouseup);
    }
  }

  function hideChoices() {
    resetMouseCandidateChoice();
    hoveredChoiceAspect.resetHoveredChoice();

    if (choicesVisibilityAspect.isChoicesVisible()) {
      // COOMENT OUT DEBUGGING popup layout
      choicesVisibilityAspect.setChoicesVisible(false);
      choicesElement.removeEventListener("mousedown", skipoutMousedown);
      document.removeEventListener("mouseup", documentMouseup);
    }
  }

  var preventDefaultClickEvent = null;
  var componentDisabledEventBinder = EventBinder(); // TODO: remove setTimeout: set on start of mouse event reset on end

  function skipoutAndResetMousedown() {
    skipoutMousedown();
    window.setTimeout(function () {
      return resetSkipFocusout();
    });
  }

  picksElement.addEventListener("mousedown", skipoutAndResetMousedown);

  function clickToShowChoices(event) {
    filterDom.setFocusIfNotTarget(event.target);

    if (preventDefaultClickEvent != event) {
      if (choicesVisibilityAspect.isChoicesVisible()) {
        hideChoices();
      } else {
        if (filterManagerAspect.getNavigateManager().getCount() > 0) showChoices();
      }
    }

    preventDefaultClickEvent = null;
  }

  function processUncheck(uncheckOption, event) {
    // we can't remove item on "click" in the same loop iteration - it is unfrendly for 3PP event handlers (they will get detached element)
    // never remove elements in the same event iteration
    window.setTimeout(function () {
      return uncheckOption();
    });
    preventDefaultClickEvent = event; // setPreventDefaultMultiSelectEvent
  } // function handleOnRemoveButton(onRemove, setSelectedFalse){
  //     // processRemoveButtonClick removes the item
  //     // what is a problem with calling 'remove' directly (not using  setTimeout('remove', 0)):
  //     // consider situation "MultiSelect" on DROPDOWN (that should be closed on the click outside dropdown)
  //     // therefore we aslo have document's click's handler where we decide to close or leave the DROPDOWN open.
  //     // because of the event's bubling process 'remove' runs first. 
  //     // that means the event's target element on which we click (the x button) will be removed from the DOM together with badge 
  //     // before we could analize is it belong to our dropdown or not.
  //     // important 1: we can't just the stop propogation using stopPropogate because click outside dropdown on the similar 
  //     // component that use stopPropogation will not close dropdown (error, dropdown should be closed)
  //     // important 2: we can't change the dropdown's event handler to leave dropdown open if event's target is null because of
  //     // the situation described above: click outside dropdown on the same component.
  //     // Alternatively it could be possible to use stopPropogate but together create custom click event setting new target 
  //     // that belomgs to DOM (e.g. panel)
  //     onRemove(event => {
  //         processUncheck(setSelectedFalse, event);
  //         hideChoices();
  //         resetFilterAspect.resetFilter(); 
  //     });
  // }


  function handleOnRemoveButton(setSelectedFalse) {
    return function (event) {
      processUncheck(setSelectedFalse, event);
      resetLayoutAspect.resetLayout();
    };
  }

  var mouseCandidateEventBinder = EventBinder();

  var resetMouseCandidateChoice = function resetMouseCandidateChoice() {
    mouseCandidateEventBinder.unbind();
  };

  var mouseOverToHoveredAndReset = function mouseOverToHoveredAndReset(wrap) {
    if (!wrap.choice.isHoverIn) navigateAspect.hoverIn(wrap);
    resetMouseCandidateChoice();
  };

  function adoptChoiceElement(wrap) {
    var choiceElement = wrap.choice.choiceElement; // in chrome it happens on "become visible" so we need to skip it, 
    // for IE11 and edge it doesn't happens, but for IE11 and Edge it doesn't happens on small 
    // mouse moves inside the item. 
    // https://stackoverflow.com/questions/59022563/browser-events-mouseover-doesnt-happen-when-you-make-element-visible-and-mous

    var onChoiceElementMouseover = function onChoiceElementMouseover() {
      if (eventLoopFlag.get()) {
        resetMouseCandidateChoice();
        mouseCandidateEventBinder.bind(choiceElement, 'mousemove', function () {
          return mouseOverToHoveredAndReset(wrap);
        });
        mouseCandidateEventBinder.bind(choiceElement, 'mousedown', function () {
          return mouseOverToHoveredAndReset(wrap);
        });
      } else {
        if (!wrap.choice.isHoverIn) {
          // NOTE: mouseleave is not enough to guarantee remove hover styles in situations
          // when style was setuped without mouse (keyboard arrows)
          // therefore force reset manually (done inside hoverIn)
          navigateAspect.hoverIn(wrap);
        }
      }
    }; // note 1: mouseleave preferred to mouseout - which fires on each descendant
    // note 2: since I want add aditional info panels to the dropdown put mouseleave on dropdwon would not work


    var onChoiceElementMouseleave = function onChoiceElementMouseleave() {
      if (!eventLoopFlag.get()) {
        hoveredChoiceAspect.resetHoveredChoice();
      }
    };

    var overAndLeaveEventBinder = EventBinder();
    overAndLeaveEventBinder.bind(choiceElement, 'mouseover', onChoiceElementMouseover);
    overAndLeaveEventBinder.bind(choiceElement, 'mouseleave', onChoiceElementMouseleave);
    return overAndLeaveEventBinder.unbind;
  }

  filterDom.onFocusIn(function () {
    return focusInAspect.setFocusIn(true);
  });
  filterDom.onFocusOut(function () {
    if (!getSkipFocusout()) {
      // skip initiated by mouse click (we manage it different way)
      resetLayoutAspect.resetLayout(); // if do not do this we will return to filtered list without text filter in input

      focusInAspect.setFocusIn(false);
    }

    resetSkipFocusout();
  }); // it can be initated by 3PP functionality
  // sample (1) BS functionality - input x button click - clears input
  // sample (2) BS functionality - esc keydown - clears input
  // and there could be difference in processing: (2) should hide the menu, then reset , when (1) should just reset without hiding.

  function afterInput() {
    var visibleCount = filterManagerAspect.getNavigateManager().getCount();

    if (visibleCount > 0) {
      if (warningAspect) {
        warningAspect.hide();
      }

      var panelIsVisble = choicesVisibilityAspect.isChoicesVisible();

      if (!panelIsVisble) {
        showChoices();
      }

      if (visibleCount == 1) {
        navigateAspect.hoverIn(filterManagerAspect.getNavigateManager().getHead());
      } else {
        if (panelIsVisble) hoveredChoiceAspect.resetHoveredChoice();
      }
    } else {
      if (choicesVisibilityAspect.isChoicesVisible()) {
        hideChoices();
      }

      if (warningAspect) {
        if (filterManagerAspect.getFilter()) warningAspect.show(configuration.noResultsWarning);else warningAspect.hide();
      }
    }
  }

  filterDom.onInput(function () {
    if (placeholderStopInputAspect && placeholderStopInputAspect.get()) {
      placeholderStopInputAspect.reset();
      return;
    }

    var _inputAspect$processI = inputAspect.processInput(),
        filterInputValue = _inputAspect$processI.filterInputValue,
        isEmpty = _inputAspect$processI.isEmpty;

    if (isEmpty) filterManagerAspect.processEmptyInput();else filterDom.setWidth(filterInputValue);
    eventLoopFlag.set(); // means disable mouse handlers that set hovered item; otherwise we will get "Hover On MouseEnter" when filter's changes should remove hover

    afterInput();
  });

  function keyDownArrow(down) {
    var wrap = navigateAspect.navigate(down);

    if (wrap) {
      // TODO: next line should be moved to planned  "HeightAndScroll" plugin, actual only for scrolling with keyDown functionality
      eventLoopFlag.set(400); // means disable mouse handlers that set hovered choice item; arrowDown can intiate scrolling when scrolling can itiate mouse leave on hovered item; this stops it

      navigateAspect.hoverIn(wrap); // !

      showChoices();
    }
  }

  function hoveredToSelected() {
    var hoveredWrap = hoveredChoiceAspect.getHoveredChoice();

    if (hoveredWrap) {
      var wasToggled = optionToggleAspect.toggle(hoveredWrap);

      if (wasToggled) {
        resetLayoutAspect.resetLayout();
      }
    }
  } // TODO: bind it more declarative way? (compact code)


  var onKeyDown = function onKeyDown(event) {
    var keyCode = event.which;
    var empty = filterDom.isEmpty();

    if ([13, 27 // '27-esc' there is "just in case", I can imagine that there are user agents that do UNDO
    ].indexOf(keyCode) >= 0 || keyCode == 9 && !empty //  otherwice there are no keyup (true at least for '9-tab'),
    ) {
      event.preventDefault(); // '13-enter'  - prevention against form's default button 
      // but doesn't help with bootsrap modal ESC or ENTER (close behaviour);
    }

    if ([38, 40].indexOf(keyCode) >= 0) event.preventDefault();

    if (keyCode == 8
    /*backspace*/
    ) {
      // NOTE: this will process backspace only if there are no text in the input field
      // If user will find this inconvinient, we will need to calculate something like this
      // let isBackspaceAtStartPoint = (this.filterInput.selectionStart == 0 && this.filterInput.selectionEnd == 0);
      if (empty) {
        var pick = picksList.getTail();

        if (pick) {
          specialPicksEventsAspect.backSpace(pick);
        }
      }
    } // ---------------------------------------------------------------------------------
    // NOTE: no preventDefault called in case of empty for 9-tab
    else if (keyCode == 9
    /*tab*/
    ) {
      // NOTE: no keydown for this (without preventDefaul after TAB keyup event will be targeted another element)  
      if (empty) {
        hideChoices(); // hideChoices inside (and no filter reset since it is empty) 
      }
    } else if (keyCode == 27
    /*esc*/
    ) {
      // NOTE: forbid the ESC to close the modal (in case the nonempty or dropdown is open)
      if (!empty || choicesVisibilityAspect.isChoicesVisible()) event.stopPropagation();
    } else if (keyCode == 38) {
      keyDownArrow(false); // up
    } else if (keyCode == 40) {
      keyDownArrow(true); // down
    }
  };

  var onKeyUp = function onKeyUp(event) {
    var keyCode = event.which; //var handler = keyUp[event.which/* key code */];
    //handler();    

    if (keyCode == 9) {
      if (choicesVisibilityAspect.isChoicesVisible()) {
        hoveredToSelected();
      }
    } else if (keyCode == 13) {
      if (choicesVisibilityAspect.isChoicesVisible()) {
        hoveredToSelected();
      } else {
        if (filterManagerAspect.getNavigateManager().getCount() > 0) {
          showChoices();
        }
      }
    } else if (keyCode == 27) {
      // escape
      // is it always empty (bs x can still it) 
      resetLayoutAspect.resetLayout();
    }
  };

  filterDom.onKeyDown(onKeyDown);
  filterDom.onKeyUp(onKeyUp);

  if (disableComponentAspect) {
    var origDisableComponent = disableComponentAspect.disableComponent;

    disableComponentAspect.disableComponent = function (isComponentDisabled) {
      origDisableComponent(isComponentDisabled);
      if (isComponentDisabled) componentDisabledEventBinder.unbind();else componentDisabledEventBinder.bind(picksElement, "click", clickToShowChoices);
    };
  }

  resetLayoutAspect.resetLayout = composeSync(hideChoices, function () {
    if (warningAspect) warningAspect.hide();
  }, resetLayoutAspect.resetLayout // resetFilter by default
  );
  var origCreatePickHandlers = createPickHandlersAspect.createPickHandlers;

  createPickHandlersAspect.createPickHandlers = function (wrap) {
    var pickHandlers = origCreatePickHandlers(wrap);
    pickHandlers.removeOnButton = handleOnRemoveButton(pickHandlers.removeOnButton);
    return pickHandlers;
  };

  var origBuildChoice = buildChoiceAspect.buildChoice;

  buildChoiceAspect.buildChoice = function (wrap) {
    origBuildChoice(wrap);
    var pickHandlers = createPickHandlersAspect.createPickHandlers(wrap);
    wrap.choice.remove = composeSync(wrap.choice.remove, function () {
      if (pickHandlers.removeAndDispose) {
        pickHandlers.removeAndDispose();
        pickHandlers.removeAndDispose = null;
      }
    });
    var unbindChoiceElement = adoptChoiceElement(wrap);
    wrap.choice.dispose = composeSync(unbindChoiceElement, wrap.choice.dispose);
  };

  return {
    dispose: function dispose() {
      resetMouseCandidateChoice();
      picksElement.removeEventListener("mousedown", skipoutAndResetMousedown);
      componentDisabledEventBinder.unbind();
      pop.dispose();
    }
  };
}

function ResetLayoutAspect(resetLayout) {
  return {
    resetLayout: resetLayout
  };
}

function LoadAspect(optionsLoopAspect) {
  return {
    load: function load() {
      // redriven in AppearancePlugin, FormRestoreOnBackwardPlugin
      optionsLoopAspect.loop();
    }
  };
}

function CountableChoicesListInsertAspect(countableChoicesList, wrapsCollection) {
  return {
    countableChoicesListInsert: function countableChoicesListInsert(wrap, key) {
      var choiceNext = wrapsCollection.getNext(key);
      countableChoicesList.add(wrap, choiceNext);
    }
  };
}

function BsMultiSelect(element, environment, plugins, configuration, onInit) {
  var _extendIfUndefined;

  var window = environment.window;
  environment.isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
  var containerClass = configuration.containerClass,
      css = configuration.css,
      getDisabled = configuration.getDisabled,
      options = configuration.options,
      getText = configuration.getText;
  var disposeAspect = {
    dispose: function dispose() {}
  };
  var triggerAspect = TriggerAspect(element, environment.trigger);
  var onChangeAspect = OnChangeAspect(triggerAspect, 'dashboardcode.multiselect:change');
  var componentPropertiesAspect = ComponentPropertiesAspect(getDisabled != null ? getDisabled : function () {
    return false;
  });
  var optionsAspect = OptionsAspect(options);
  var optionPropertiesAspect = OptionPropertiesAspect(getText);
  var isChoiceSelectableAspect = IsChoiceSelectableAspect();
  var createWrapAspect = CreateWrapAspect();
  var createChoiceBaseAspect = CreateChoiceBaseAspect(optionPropertiesAspect); //let rtlAspect = RtlAspect();
  //let setOptionSelectedAspect = SetOptionSelectedAspect(optionPropertiesAspect);

  var addPickAspect = AddPickAspect();
  var removePickAspect = RemovePickAspect();
  var createElementAspect = CreateElementAspect(function (name) {
    return window.document.createElement(name);
  });
  var choicesDomFactory = ChoicesDomFactory(createElementAspect);
  var staticDomFactory = StaticDomFactory(choicesDomFactory, createElementAspect);
  var wrapsCollection = ArrayFacade();
  var countableChoicesList = DoublyLinkedList(function (wrap) {
    return wrap.choice.itemPrev;
  }, function (warp, v) {
    return warp.choice.itemPrev = v;
  }, function (wrap) {
    return wrap.choice.itemNext;
  }, function (wrap, v) {
    return wrap.choice.itemNext = v;
  });
  var countableChoicesListInsertAspect = CountableChoicesListInsertAspect(countableChoicesList, wrapsCollection);
  var choicesEnumerableAspect = ChoicesEnumerableAspect(countableChoicesList, function (wrap) {
    return wrap.choice.itemNext;
  });
  var filteredChoicesList = DoublyLinkedList(function (wrap) {
    return wrap.choice.filteredPrev;
  }, function (wrap, v) {
    return wrap.choice.filteredPrev = v;
  }, function (wrap) {
    return wrap.choice.filteredNext;
  }, function (wrap, v) {
    return wrap.choice.filteredNext = v;
  });
  var emptyNavigateManager = NavigateManager(countableChoicesList, function (wrap) {
    return wrap.choice.itemPrev;
  }, function (wrap) {
    return wrap.choice.itemNext;
  });
  var filteredNavigateManager = NavigateManager(filteredChoicesList, function (wrap) {
    return wrap.choice.filteredPrev;
  }, function (wrap) {
    return wrap.choice.filteredNext;
  });
  var filterPredicateAspect = FilterPredicateAspect();
  var filterManagerAspect = FilterManagerAspect(emptyNavigateManager, filteredNavigateManager, filteredChoicesList, choicesEnumerableAspect, filterPredicateAspect);
  var hoveredChoiceAspect = HoveredChoiceAspect();
  var navigateAspect = NavigateAspect(hoveredChoiceAspect, function (down, hoveredChoice) {
    return filterManagerAspect.getNavigateManager().navigate(down, hoveredChoice);
  });
  var picksList = List();
  var wraps = Wraps(wrapsCollection, function () {
    return countableChoicesList.reset();
  }, function (w) {
    return countableChoicesList.remove(w);
  }, function (w, key) {
    return countableChoicesListInsertAspect.countableChoicesListInsert(w, key);
  });
  var aspects = {
    environment: environment,
    configuration: configuration,
    triggerAspect: triggerAspect,
    onChangeAspect: onChangeAspect,
    componentPropertiesAspect: componentPropertiesAspect,
    disposeAspect: disposeAspect,
    countableChoicesList: countableChoicesList,
    countableChoicesListInsertAspect: countableChoicesListInsertAspect,
    optionsAspect: optionsAspect,
    optionPropertiesAspect: optionPropertiesAspect,
    createWrapAspect: createWrapAspect,
    createChoiceBaseAspect: createChoiceBaseAspect,
    isChoiceSelectableAspect: isChoiceSelectableAspect,
    createElementAspect: createElementAspect,
    choicesDomFactory: choicesDomFactory,
    staticDomFactory: staticDomFactory,
    filterPredicateAspect: filterPredicateAspect,
    wrapsCollection: wrapsCollection,
    choicesEnumerableAspect: choicesEnumerableAspect,
    filteredChoicesList: filteredChoicesList,
    filterManagerAspect: filterManagerAspect,
    hoveredChoiceAspect: hoveredChoiceAspect,
    navigateAspect: navigateAspect,
    picksList: picksList,
    wraps: wraps,
    addPickAspect: addPickAspect,
    removePickAspect: removePickAspect
  };
  plugStaticDom(plugins, aspects); // apply cssPatch to css, apply selectElement support;  

  var _staticDomFactory$cre = staticDomFactory.create(css),
      choicesDom = _staticDomFactory$cre.choicesDom,
      createStaticDom = _staticDomFactory$cre.createStaticDom;

  var _createStaticDom = createStaticDom(element, containerClass),
      staticDom = _createStaticDom.staticDom,
      staticManager = _createStaticDom.staticManager; // after this we can use staticDom (means generated DOM elements) in plugin construtctor, what simplifies parameters passing a lot   
  // THINK: get filterDom, picksDom  from createStaticDom ?  But this would create excesive dublicate call in  selectElementPlugin


  var filterDom = FilterDom(staticDom.isDisposablePicksElement, createElementAspect, css);
  var picksDom = PicksDom(staticDom.picksElement, staticDom.isDisposablePicksElement, createElementAspect, css);
  var specialPicksEventsAspect = SpecialPicksEventsAspect();
  var choicesVisibilityAspect = ChoicesVisibilityAspect(choicesDom.choicesElement);
  var resetFilterListAspect = ResetFilterListAspect(filterDom, filterManagerAspect);
  var resetFilterAspect = ResetFilterAspect(filterDom, resetFilterListAspect);
  var focusInAspect = FocusInAspect(picksDom);
  var pickButtonAspect = PickButtonAspect(configuration.pickButtonHTML);
  var pickDomFactory = PickDomFactory(css, componentPropertiesAspect, optionPropertiesAspect, pickButtonAspect);
  var buildPickAspect = BuildPickAspect(picksDom, pickDomFactory);
  var producePickAspect = ProducePickAspect(picksList, removePickAspect, buildPickAspect);
  var createPickHandlersAspect = CreatePickHandlersAspect(producePickAspect);
  var optionToggleAspect = OptionToggleAspect(createPickHandlersAspect, addPickAspect);
  var fullMatchAspect = FullMatchAspect(createPickHandlersAspect, addPickAspect);
  var inputAspect = InputAspect(filterDom, filterManagerAspect, fullMatchAspect);
  var choiceClickAspect = ChoiceClickAspect(optionToggleAspect, filterDom);
  var choiceDomFactory = ChoiceDomFactory(css, optionPropertiesAspect, aspects.highlightAspect); // optional highlightAspect added by highlightPlugin

  var buildChoiceAspect = BuildChoiceAspect(choicesDom, choiceDomFactory, choiceClickAspect);
  var buildAndAttachChoiceAspect = BuildAndAttachChoiceAspect(buildChoiceAspect);
  var resetLayoutAspect = ResetLayoutAspect(function () {
    return resetFilterAspect.resetFilter();
  });
  var optionAttachAspect = OptionAttachAspect(createWrapAspect, createChoiceBaseAspect, buildAndAttachChoiceAspect, wraps);
  var optionsLoopAspect = OptionsLoopAspect(optionsAspect, optionAttachAspect);
  var updateDataAspect = UpdateDataAspect(choicesDom, wraps, picksList, optionsLoopAspect, resetLayoutAspect);
  var updateAspect = UpdateAspect(updateDataAspect);
  var loadAspect = LoadAspect(optionsLoopAspect);
  extendIfUndefined(aspects, (_extendIfUndefined = {
    staticDom: staticDom,
    picksDom: picksDom,
    choicesDom: choicesDom,
    filterDom: filterDom,
    resetLayoutAspect: resetLayoutAspect,
    pickDomFactory: pickDomFactory,
    choiceDomFactory: choiceDomFactory,
    choicesVisibilityAspect: choicesVisibilityAspect,
    staticManager: staticManager,
    buildChoiceAspect: buildChoiceAspect,
    optionToggleAspect: optionToggleAspect,
    choiceClickAspect: choiceClickAspect,
    buildAndAttachChoiceAspect: buildAndAttachChoiceAspect,
    optionsLoopAspect: optionsLoopAspect,
    optionAttachAspect: optionAttachAspect,
    buildPickAspect: buildPickAspect,
    producePickAspect: producePickAspect,
    createPickHandlersAspect: createPickHandlersAspect,
    inputAspect: inputAspect,
    resetFilterListAspect: resetFilterListAspect,
    resetFilterAspect: resetFilterAspect,
    specialPicksEventsAspect: specialPicksEventsAspect
  }, _extendIfUndefined["resetLayoutAspect"] = resetLayoutAspect, _extendIfUndefined.focusInAspect = focusInAspect, _extendIfUndefined.loadAspect = loadAspect, _extendIfUndefined.updateDataAspect = updateDataAspect, _extendIfUndefined.updateAspect = updateAspect, _extendIfUndefined.fullMatchAspect = fullMatchAspect, _extendIfUndefined));
  var pluginManager = PluginManager(plugins, aspects);
  var multiSelectInlineLayout = MultiSelectInlineLayout(aspects);
  var api = {
    component: "BsMultiSelect.api"
  }; // key to use in memory leak analyzes

  pluginManager.buildApi(api); // after this we can pass aspects methods call without wrapping - there should be no more overridings. TODO freeze aspects?

  api.dispose = composeSync(resetLayoutAspect.resetLayout, function () {
    disposeAspect.dispose();
  }, pluginManager.dispose, function () {
    picksList.forEach(function (pick) {
      return pick.dispose();
    });
  }, multiSelectInlineLayout.dispose, // TODO move to layout
  wraps.dispose, staticManager.dispose, picksDom.dispose, filterDom.dispose);

  api.updateData = function () {
    updateDataAspect.updateData();
  };

  api.update = function () {
    updateAspect.update();
  }; // TODO api.updateOption = (key) => {/* all updates: selected, disabled, hidden, text */}


  onInit == null ? void 0 : onInit(api, aspects);
  picksDom.pickFilterElement.appendChild(filterDom.filterInputElement);
  picksDom.picksElement.appendChild(picksDom.pickFilterElement);
  staticManager.appendToContainer();
  loadAspect.load();
  return api;
}

var transformStyles = [{
  old: 'selectedPanelDisabledBackgroundColor',
  opt: 'picks_disabled',
  style: "backgroundColor"
}, {
  old: 'selectedPanelFocusValidBoxShadow',
  opt: 'picks_focus_valid',
  style: "boxShadow"
}, {
  old: 'selectedPanelFocusInvalidBoxShadow',
  opt: 'picks_focus_invalid',
  style: "boxShadow"
}, {
  old: 'selectedPanelDefMinHeight',
  opt: 'picks_def',
  style: "minHeight"
}, {
  old: 'selectedPanelLgMinHeight',
  opt: 'picks_lg',
  style: "minHeight"
}, {
  old: 'selectedPanelSmMinHeight',
  opt: 'picks_sm',
  style: "minHeight"
}, {
  old: 'selectedItemContentDisabledOpacity',
  opt: 'choiceLabel_disabled',
  style: "opacity"
}];
var transformClasses = [{
  old: 'dropDownMenuClass',
  opt: 'choices'
}, {
  old: 'dropDownItemClass',
  opt: 'choice'
}, {
  old: 'dropDownItemHoverClass',
  opt: 'choice_hover'
}, {
  old: 'selectedPanelClass',
  opt: 'picks'
}, {
  old: 'selectedItemClass',
  opt: 'pick'
}, {
  old: 'removeSelectedItemButtonClass',
  opt: 'pickButton'
}, {
  old: 'filterInputItemClass',
  opt: 'pickFilter'
}, {
  old: 'filterInputClass',
  opt: 'filterInput'
}, {
  old: 'selectedPanelFocusClass',
  opt: 'picks_focus'
}, {
  old: 'selectedPanelDisabledClass',
  opt: 'picks_disabled'
}, {
  old: 'selectedItemContentDisabledClass',
  opt: 'pick_disabled'
}];
function adjustLegacySettings(settings) {
  if (!settings.css) settings.css = {};
  var css = settings.css;
  if (!settings.cssPatch) settings.cssPatch = {};
  var cssPatch = settings.cssPatch;

  if (settings.selectedPanelFocusBorderColor || settings.selectedPanelFocusBoxShadow) {
    console.log("DashboarCode.BsMultiSelect: selectedPanelFocusBorderColor and selectedPanelFocusBoxShadow are depricated, use - cssPatch:{picks_focus:{borderColor:'myValue', boxShadow:'myValue'}}");

    if (!cssPatch.picks_focus) {
      cssPatch.picks_focus = {
        boxShadow: settings.selectedPanelFocusBoxShadow,
        borderColor: settings.selectedPanelFocusBorderColor
      };
    }

    delete settings.selectedPanelFocusBorderColor;
    delete settings.selectedPanelFocusBoxShadow;
  }

  transformStyles.forEach(function (i) {
    if (settings[i.old]) {
      console.log("DashboarCode.BsMultiSelect: " + i.old + " is depricated, use - cssPatch:{" + i.opt + ":{" + i.style + ":'myValue'}}");

      if (!settings[i.opt]) {
        var opt = {};
        opt[i.style] = settings[i.old];
        settings.cssPatch[i.opt] = opt;
      }

      delete settings[i.old];
    }
  });
  transformClasses.forEach(function (i) {
    if (settings[i.old]) {
      console.log("DashboarCode.BsMultiSelect: " + i.old + " is depricated, use - css:{" + i.opt + ":'myValue'}");

      if (!css[i.opt]) {
        css[i.opt] = settings[i.old];
      }

      delete settings[i.old];
    }
  });

  if (settings.inputColor) {
    console.log("DashboarCode.BsMultiSelect: inputColor is depricated, remove parameter");
    delete settings.inputColor;
  }

  if (settings.useCss) {
    console.log("DashboarCode.BsMultiSelect: useCss(=true) is depricated, use - 'useCssPatch: false'");

    if (!css.pick_disabled) {
      settings.useCssPatch = !settings.useCss;
    }

    delete settings.useCss;
  }

  if (settings.getIsValid || settings.getIsInValid) {
    throw "DashboarCode.BsMultiSelect: parameters getIsValid and getIsInValid are depricated and removed, use - getValidity that should return (true|false|null) ";
  }
}

function MultiSelectBuilder(environment, plugins) {
  var defaults = {
    containerClass: "dashboardcode-bsmultiselect"
  };

  var create = function create(element, options) {
    var _options2;

    if (options && options.plugins) console.log("DashboarCode.BsMultiSelect: 'options.plugins' is depricated, use - MultiSelectBuilder(environment, plugins) instead");
    var configuration = {};
    var buildConfiguration;

    if (options instanceof Function) {
      buildConfiguration = options;
      options = null;
    } else {
      var _options;

      buildConfiguration = (_options = options) == null ? void 0 : _options.buildConfiguration;
    }

    if (options) {
      adjustLegacySettings(options);
    }

    configuration.css = createCss(defaults.css, (_options2 = options) == null ? void 0 : _options2.css);
    plugMergeSettings(plugins, configuration, defaults, options); // merge settings.cssPatch and defaults.cssPatch

    extendIfUndefined(configuration, options);
    extendIfUndefined(configuration, defaults);
    var onInit = buildConfiguration == null ? void 0 : buildConfiguration(element, configuration); // TODO: configuration should become an aspect

    var multiSelect = BsMultiSelect(element, environment, plugins, configuration, onInit); // onInit(api, aspects) - before load data

    return multiSelect;
  };

  plugDefaultConfig(plugins, defaults);
  return {
    create: create,
    defaultSettings: defaults
  };
}

function ModuleFactory(environment) {
  if (!environment.trigger) environment.trigger = function (e, name) {
    return e.dispatchEvent(new environment.window.Event(name));
  };
  var pluginsArray = ObjectValues(shallowClearClone({
    Bs5Plugin: Bs5Plugin
  }, defaultPlugins));

  var _MultiSelectBuilder = MultiSelectBuilder(environment, pluginsArray),
      BsMultiSelect = _MultiSelectBuilder.create,
      BsMultiSelectDefault = _MultiSelectBuilder.BsMultiSelectDefault;

  BsMultiSelect.Default = BsMultiSelectDefault;
  var picksPluginsArray = ObjectValues(shallowClearClone({
    Bs5Plugin: Bs5Plugin
  }, picksPlugins));

  var _MultiSelectBuilder2 = MultiSelectBuilder(environment, picksPluginsArray),
      BsPicks = _MultiSelectBuilder2.create,
      BsPicksDefault = _MultiSelectBuilder2.BsPicksDefault;

  BsPicks.Default = BsPicksDefault;
  return {
    BsMultiSelect: BsMultiSelect,
    BsPicks: BsPicks,
    MultiSelectTools: {
      MultiSelectBuilder: MultiSelectBuilder,
      plugins: shallowClearClone({
        Bs5Plugin: Bs5Plugin
      }, allPlugins),
      utilities: utilities
    }
  };
}

function legacyConstructor(element, environment, settings) {
  console.log("DashboarCode.BsMultiSelect: 'BsMultiSelect' is depricated, use - ModuleFactory(environment).BsMultiSelect(element, settings)");

  var _ModuleFactory = ModuleFactory(environment),
      BsMultiSelect = _ModuleFactory.BsMultiSelect;

  var bsMultiSelect = BsMultiSelect(element, settings);
  return bsMultiSelect;
}


//# sourceMappingURL=BsMultiSelect.esm.js.map


/***/ }),

/***/ "./node_modules/@popperjs/core/lib/createPopper.js":
/*!*********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/createPopper.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createPopper": () => (/* binding */ createPopper),
/* harmony export */   "detectOverflow": () => (/* reexport safe */ _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_13__["default"]),
/* harmony export */   "popperGenerator": () => (/* binding */ popperGenerator)
/* harmony export */ });
/* harmony import */ var _dom_utils_getCompositeRect_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./dom-utils/getCompositeRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js");
/* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./dom-utils/getLayoutRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js");
/* harmony import */ var _dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom-utils/listScrollParents.js */ "./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./dom-utils/getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _utils_orderModifiers_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/orderModifiers.js */ "./node_modules/@popperjs/core/lib/utils/orderModifiers.js");
/* harmony import */ var _utils_debounce_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./utils/debounce.js */ "./node_modules/@popperjs/core/lib/utils/debounce.js");
/* harmony import */ var _utils_validateModifiers_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/validateModifiers.js */ "./node_modules/@popperjs/core/lib/utils/validateModifiers.js");
/* harmony import */ var _utils_uniqueBy_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/uniqueBy.js */ "./node_modules/@popperjs/core/lib/utils/uniqueBy.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_mergeByName_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/mergeByName.js */ "./node_modules/@popperjs/core/lib/utils/mergeByName.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./enums.js */ "./node_modules/@popperjs/core/lib/enums.js");














var INVALID_ELEMENT_ERROR = 'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.';
var INFINITE_LOOP_ERROR = 'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.';
var DEFAULT_OPTIONS = {
  placement: 'bottom',
  modifiers: [],
  strategy: 'absolute'
};

function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return !args.some(function (element) {
    return !(element && typeof element.getBoundingClientRect === 'function');
  });
}

function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }

  var _generatorOptions = generatorOptions,
      _generatorOptions$def = _generatorOptions.defaultModifiers,
      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
      _generatorOptions$def2 = _generatorOptions.defaultOptions,
      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions;
    }

    var state = {
      placement: 'bottom',
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference,
        popper: popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state,
      setOptions: function setOptions(setOptionsAction) {
        var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options);
        state.scrollParents = {
          reference: (0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isElement)(reference) ? (0,_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__["default"])(reference) : reference.contextElement ? (0,_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__["default"])(reference.contextElement) : [],
          popper: (0,_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__["default"])(popper)
        }; // Orders the modifiers based on their dependencies and `phase`
        // properties

        var orderedModifiers = (0,_utils_orderModifiers_js__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_utils_mergeByName_js__WEBPACK_IMPORTED_MODULE_3__["default"])([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

        state.orderedModifiers = orderedModifiers.filter(function (m) {
          return m.enabled;
        }); // Validate the provided modifiers so that the consumer will get warned
        // if one of the modifiers is invalid for any reason

        if (true) {
          var modifiers = (0,_utils_uniqueBy_js__WEBPACK_IMPORTED_MODULE_4__["default"])([].concat(orderedModifiers, state.options.modifiers), function (_ref) {
            var name = _ref.name;
            return name;
          });
          (0,_utils_validateModifiers_js__WEBPACK_IMPORTED_MODULE_5__["default"])(modifiers);

          if ((0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__["default"])(state.options.placement) === _enums_js__WEBPACK_IMPORTED_MODULE_7__.auto) {
            var flipModifier = state.orderedModifiers.find(function (_ref2) {
              var name = _ref2.name;
              return name === 'flip';
            });

            if (!flipModifier) {
              console.error(['Popper: "auto" placements require the "flip" modifier be', 'present and enabled to work.'].join(' '));
            }
          }

          var _getComputedStyle = (0,_dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_8__["default"])(popper),
              marginTop = _getComputedStyle.marginTop,
              marginRight = _getComputedStyle.marginRight,
              marginBottom = _getComputedStyle.marginBottom,
              marginLeft = _getComputedStyle.marginLeft; // We no longer take into account `margins` on the popper, and it can
          // cause bugs with positioning, so we'll warn the consumer


          if ([marginTop, marginRight, marginBottom, marginLeft].some(function (margin) {
            return parseFloat(margin);
          })) {
            console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', 'between the popper and its reference element or boundary.', 'To replicate margin, use the `offset` modifier, as well as', 'the `padding` option in the `preventOverflow` and `flip`', 'modifiers.'].join(' '));
          }
        }

        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }

        var _state$elements = state.elements,
            reference = _state$elements.reference,
            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
        // anymore

        if (!areValidElements(reference, popper)) {
          if (true) {
            console.error(INVALID_ELEMENT_ERROR);
          }

          return;
        } // Store the reference and popper rects to be read by modifiers


        state.rects = {
          reference: (0,_dom_utils_getCompositeRect_js__WEBPACK_IMPORTED_MODULE_9__["default"])(reference, (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__["default"])(popper), state.options.strategy === 'fixed'),
          popper: (0,_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_11__["default"])(popper)
        }; // Modifiers have the ability to reset the current update cycle. The
        // most common use case for this is the `flip` modifier changing the
        // placement, which then needs to re-run all the modifiers, because the
        // logic was previously ran for the previous placement and is therefore
        // stale/incorrect

        state.reset = false;
        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
        // is filled with the initial data specified by the modifier. This means
        // it doesn't persist and is fresh on each update.
        // To ensure persistent data, use `${name}#persistent`

        state.orderedModifiers.forEach(function (modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        var __debug_loops__ = 0;

        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (true) {
            __debug_loops__ += 1;

            if (__debug_loops__ > 100) {
              console.error(INFINITE_LOOP_ERROR);
              break;
            }
          }

          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }

          var _state$orderedModifie = state.orderedModifiers[index],
              fn = _state$orderedModifie.fn,
              _state$orderedModifie2 = _state$orderedModifie.options,
              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
              name = _state$orderedModifie.name;

          if (typeof fn === 'function') {
            state = fn({
              state: state,
              options: _options,
              name: name,
              instance: instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: (0,_utils_debounce_js__WEBPACK_IMPORTED_MODULE_12__["default"])(function () {
        return new Promise(function (resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };

    if (!areValidElements(reference, popper)) {
      if (true) {
        console.error(INVALID_ELEMENT_ERROR);
      }

      return instance;
    }

    instance.setOptions(options).then(function (state) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state);
      }
    }); // Modifiers have the ability to execute arbitrary code before the first
    // update cycle runs. They will be executed in the same order as the update
    // cycle. This is useful when a modifier adds some persistent data that
    // other modifiers need to use, but the modifier is run after the dependent
    // one.

    function runModifierEffects() {
      state.orderedModifiers.forEach(function (_ref3) {
        var name = _ref3.name,
            _ref3$options = _ref3.options,
            options = _ref3$options === void 0 ? {} : _ref3$options,
            effect = _ref3.effect;

        if (typeof effect === 'function') {
          var cleanupFn = effect({
            state: state,
            name: name,
            instance: instance,
            options: options
          });

          var noopFn = function noopFn() {};

          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }

    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function (fn) {
        return fn();
      });
      effectCleanupFns = [];
    }

    return instance;
  };
}
var createPopper = /*#__PURE__*/popperGenerator(); // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/contains.js":
/*!***************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/contains.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ contains)
/* harmony export */ });
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");

function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

  if (parent.contains(child)) {
    return true;
  } // then fallback to custom implementation with Shadow DOM support
  else if (rootNode && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isShadowRoot)(rootNode)) {
      var next = child;

      do {
        if (next && parent.isSameNode(next)) {
          return true;
        } // $FlowFixMe[prop-missing]: need a better way to handle this...


        next = next.parentNode || next.host;
      } while (next);
    } // Give up, the result is false


  return false;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getBoundingClientRect)
/* harmony export */ });
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _isLayoutViewport_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./isLayoutViewport.js */ "./node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js");




function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  if (includeScale === void 0) {
    includeScale = false;
  }

  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }

  var clientRect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;

  if (includeScale && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element)) {
    scaleX = element.offsetWidth > 0 ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_1__.round)(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_1__.round)(clientRect.height) / element.offsetHeight || 1 : 1;
  }

  var _ref = (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isElement)(element) ? (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_2__["default"])(element) : window,
      visualViewport = _ref.visualViewport;

  var addVisualOffsets = !(0,_isLayoutViewport_js__WEBPACK_IMPORTED_MODULE_3__["default"])() && isFixedStrategy;
  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
  var width = clientRect.width / scaleX;
  var height = clientRect.height / scaleY;
  return {
    width: width,
    height: height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    x: x,
    y: y
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getClippingRect)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _getViewportRect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getViewportRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js");
/* harmony import */ var _getDocumentRect_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getDocumentRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js");
/* harmony import */ var _listScrollParents_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./listScrollParents.js */ "./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js");
/* harmony import */ var _getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _contains_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./contains.js */ "./node_modules/@popperjs/core/lib/dom-utils/contains.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/rectToClientRect.js */ "./node_modules/@popperjs/core/lib/utils/rectToClientRect.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");















function getInnerBoundingClientRect(element, strategy) {
  var rect = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element, false, strategy === 'fixed');
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}

function getClientRectFromMixedType(element, clippingParent, strategy) {
  return clippingParent === _enums_js__WEBPACK_IMPORTED_MODULE_1__.viewport ? (0,_utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_getViewportRect_js__WEBPACK_IMPORTED_MODULE_3__["default"])(element, strategy)) : (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isElement)(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : (0,_utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_getDocumentRect_js__WEBPACK_IMPORTED_MODULE_5__["default"])((0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_6__["default"])(element)));
} // A "clipping parent" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`


function getClippingParents(element) {
  var clippingParents = (0,_listScrollParents_js__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_8__["default"])(element));
  var canEscapeClipping = ['absolute', 'fixed'].indexOf((0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_9__["default"])(element).position) >= 0;
  var clipperElement = canEscapeClipping && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isHTMLElement)(element) ? (0,_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__["default"])(element) : element;

  if (!(0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isElement)(clipperElement)) {
    return [];
  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


  return clippingParents.filter(function (clippingParent) {
    return (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isElement)(clippingParent) && (0,_contains_js__WEBPACK_IMPORTED_MODULE_11__["default"])(clippingParent, clipperElement) && (0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_12__["default"])(clippingParent) !== 'body';
  });
} // Gets the maximum area that the element is visible in due to any number of
// clipping parents


function getClippingRect(element, boundary, rootBoundary, strategy) {
  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents[0];
  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
    accRect.top = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.max)(rect.top, accRect.top);
    accRect.right = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.min)(rect.right, accRect.right);
    accRect.bottom = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.min)(rect.bottom, accRect.bottom);
    accRect.left = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.max)(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent, strategy));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getCompositeRect)
/* harmony export */ });
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _getNodeScroll_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./getNodeScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./getWindowScrollBarX.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./isScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");









function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(rect.width) / element.offsetWidth || 1;
  var scaleY = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
} // Returns the composite rect of an element relative to its offsetParent.
// Composite means it takes into account transforms as well as layout.


function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }

  var isOffsetParentAnElement = (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(offsetParent);
  var offsetParentIsScaled = (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(offsetParent) && isElementScaled(offsetParent);
  var documentElement = (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(offsetParent);
  var rect = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_3__["default"])(elementOrVirtualElement, offsetParentIsScaled, isFixed);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };

  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if ((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_4__["default"])(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
    (0,_isScrollParent_js__WEBPACK_IMPORTED_MODULE_5__["default"])(documentElement)) {
      scroll = (0,_getNodeScroll_js__WEBPACK_IMPORTED_MODULE_6__["default"])(offsetParent);
    }

    if ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(offsetParent)) {
      offsets = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_3__["default"])(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = (0,_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_7__["default"])(documentElement);
    }
  }

  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getComputedStyle)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");

function getComputedStyle(element) {
  return (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element).getComputedStyle(element);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getDocumentElement)
/* harmony export */ });
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");

function getDocumentElement(element) {
  // $FlowFixMe[incompatible-return]: assume body is always available
  return (((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isElement)(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
  element.document) || window.document).documentElement;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getDocumentRect)
/* harmony export */ });
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getWindowScrollBarX.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js");
/* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getWindowScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");




 // Gets the entire size of the scrollable document area, even extending outside
// of the `<html>` and `<body>` rect bounds if horizontally scrollable

function getDocumentRect(element) {
  var _element$ownerDocumen;

  var html = (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
  var winScroll = (0,_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_2__.max)(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_2__.max)(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + (0,_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_3__["default"])(element);
  var y = -winScroll.scrollTop;

  if ((0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_4__["default"])(body || html).direction === 'rtl') {
    x += (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_2__.max)(html.clientWidth, body ? body.clientWidth : 0) - width;
  }

  return {
    width: width,
    height: height,
    x: x,
    y: y
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getHTMLElementScroll)
/* harmony export */ });
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getLayoutRect)
/* harmony export */ });
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
 // Returns the layout rect of an element relative to its offsetParent. Layout
// means it doesn't take into account transforms.

function getLayoutRect(element) {
  var clientRect = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element); // Use the clientRect sizes if it's not been transformed.
  // Fixes https://github.com/popperjs/popper-core/issues/1223

  var width = element.offsetWidth;
  var height = element.offsetHeight;

  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }

  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }

  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: width,
    height: height
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js":
/*!******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getNodeName)
/* harmony export */ });
function getNodeName(element) {
  return element ? (element.nodeName || '').toLowerCase() : null;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getNodeScroll)
/* harmony export */ });
/* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindowScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js");
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _getHTMLElementScroll_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getHTMLElementScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js");




function getNodeScroll(node) {
  if (node === (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node) || !(0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(node)) {
    return (0,_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__["default"])(node);
  } else {
    return (0,_getHTMLElementScroll_js__WEBPACK_IMPORTED_MODULE_3__["default"])(node);
  }
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getOffsetParent)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _isTableElement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./isTableElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/isTableElement.js");
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _utils_userAgent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/userAgent.js */ "./node_modules/@popperjs/core/lib/utils/userAgent.js");








function getTrueOffsetParent(element) {
  if (!(0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element) || // https://github.com/popperjs/popper-core/issues/837
  (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element).position === 'fixed') {
    return null;
  }

  return element.offsetParent;
} // `.offsetParent` reports `null` for fixed elements, while absolute elements
// return the containing block


function getContainingBlock(element) {
  var isFirefox = /firefox/i.test((0,_utils_userAgent_js__WEBPACK_IMPORTED_MODULE_2__["default"])());
  var isIE = /Trident/i.test((0,_utils_userAgent_js__WEBPACK_IMPORTED_MODULE_2__["default"])());

  if (isIE && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element)) {
    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
    var elementCss = (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element);

    if (elementCss.position === 'fixed') {
      return null;
    }
  }

  var currentNode = (0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_3__["default"])(element);

  if ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isShadowRoot)(currentNode)) {
    currentNode = currentNode.host;
  }

  while ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(currentNode) && ['html', 'body'].indexOf((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_4__["default"])(currentNode)) < 0) {
    var css = (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(currentNode); // This is non-exhaustive but covers the most common CSS properties that
    // create a containing block.
    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }

  return null;
} // Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.


function getOffsetParent(element) {
  var window = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_5__["default"])(element);
  var offsetParent = getTrueOffsetParent(element);

  while (offsetParent && (0,_isTableElement_js__WEBPACK_IMPORTED_MODULE_6__["default"])(offsetParent) && (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent);
  }

  if (offsetParent && ((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_4__["default"])(offsetParent) === 'html' || (0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_4__["default"])(offsetParent) === 'body' && (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(offsetParent).position === 'static')) {
    return window;
  }

  return offsetParent || getContainingBlock(element) || window;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getParentNode)
/* harmony export */ });
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");



function getParentNode(element) {
  if ((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element) === 'html') {
    return element;
  }

  return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || ( // DOM Element detected
    (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isShadowRoot)(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(element) // fallback

  );
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getScrollParent)
/* harmony export */ });
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");




function getScrollParent(node) {
  if (['html', 'body', '#document'].indexOf((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node)) >= 0) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return node.ownerDocument.body;
  }

  if ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(node) && (0,_isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__["default"])(node)) {
    return node;
  }

  return getScrollParent((0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_3__["default"])(node));
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getViewportRect)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getWindowScrollBarX.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js");
/* harmony import */ var _isLayoutViewport_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isLayoutViewport.js */ "./node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js");




function getViewportRect(element, strategy) {
  var win = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
  var html = (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0;

  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    var layoutViewport = (0,_isLayoutViewport_js__WEBPACK_IMPORTED_MODULE_2__["default"])();

    if (layoutViewport || !layoutViewport && strategy === 'fixed') {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }

  return {
    width: width,
    height: height,
    x: x + (0,_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_3__["default"])(element),
    y: y
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js":
/*!****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getWindow.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getWindow)
/* harmony export */ });
function getWindow(node) {
  if (node == null) {
    return window;
  }

  if (node.toString() !== '[object Window]') {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }

  return node;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getWindowScroll)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");

function getWindowScroll(node) {
  var win = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getWindowScrollBarX)
/* harmony export */ });
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindowScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js");



function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  // Popper 1 is broken in this case and never had a bug report so let's assume
  // it's not an issue. I don't think anyone ever specifies width on <html>
  // anyway.
  // Browsers where the left scrollbar doesn't cause an issue report `0` for
  // this (e.g. Edge 2019, IE11, Safari)
  return (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element)).left + (0,_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__["default"])(element).scrollLeft;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isElement": () => (/* binding */ isElement),
/* harmony export */   "isHTMLElement": () => (/* binding */ isHTMLElement),
/* harmony export */   "isShadowRoot": () => (/* binding */ isShadowRoot)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");


function isElement(node) {
  var OwnElement = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}

function isHTMLElement(node) {
  var OwnElement = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}

function isShadowRoot(node) {
  // IE 11 has no ShadowRoot
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }

  var OwnElement = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isLayoutViewport)
/* harmony export */ });
/* harmony import */ var _utils_userAgent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/userAgent.js */ "./node_modules/@popperjs/core/lib/utils/userAgent.js");

function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test((0,_utils_userAgent_js__WEBPACK_IMPORTED_MODULE_0__["default"])());
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isScrollParent)
/* harmony export */ });
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");

function isScrollParent(element) {
  // Firefox wants us to check `-x` and `-y` variations as well
  var _getComputedStyle = (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element),
      overflow = _getComputedStyle.overflow,
      overflowX = _getComputedStyle.overflowX,
      overflowY = _getComputedStyle.overflowY;

  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/isTableElement.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/isTableElement.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isTableElement)
/* harmony export */ });
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");

function isTableElement(element) {
  return ['table', 'td', 'th'].indexOf((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element)) >= 0;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js":
/*!************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ listScrollParents)
/* harmony export */ });
/* harmony import */ var _getScrollParent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js");
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js");




/*
given a DOM element, return the list of all scroll parents, up the list of ancesors
until we get to the top window object. This list is what we attach scroll listeners
to, because if any of these parent elements scroll, we'll need to re-calculate the
reference element's position.
*/

function listScrollParents(element, list) {
  var _element$ownerDocumen;

  if (list === void 0) {
    list = [];
  }

  var scrollParent = (0,_getScrollParent_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], (0,_isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__["default"])(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
  updatedList.concat(listScrollParents((0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_3__["default"])(target)));
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/enums.js":
/*!**************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/enums.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "afterMain": () => (/* binding */ afterMain),
/* harmony export */   "afterRead": () => (/* binding */ afterRead),
/* harmony export */   "afterWrite": () => (/* binding */ afterWrite),
/* harmony export */   "auto": () => (/* binding */ auto),
/* harmony export */   "basePlacements": () => (/* binding */ basePlacements),
/* harmony export */   "beforeMain": () => (/* binding */ beforeMain),
/* harmony export */   "beforeRead": () => (/* binding */ beforeRead),
/* harmony export */   "beforeWrite": () => (/* binding */ beforeWrite),
/* harmony export */   "bottom": () => (/* binding */ bottom),
/* harmony export */   "clippingParents": () => (/* binding */ clippingParents),
/* harmony export */   "end": () => (/* binding */ end),
/* harmony export */   "left": () => (/* binding */ left),
/* harmony export */   "main": () => (/* binding */ main),
/* harmony export */   "modifierPhases": () => (/* binding */ modifierPhases),
/* harmony export */   "placements": () => (/* binding */ placements),
/* harmony export */   "popper": () => (/* binding */ popper),
/* harmony export */   "read": () => (/* binding */ read),
/* harmony export */   "reference": () => (/* binding */ reference),
/* harmony export */   "right": () => (/* binding */ right),
/* harmony export */   "start": () => (/* binding */ start),
/* harmony export */   "top": () => (/* binding */ top),
/* harmony export */   "variationPlacements": () => (/* binding */ variationPlacements),
/* harmony export */   "viewport": () => (/* binding */ viewport),
/* harmony export */   "write": () => (/* binding */ write)
/* harmony export */ });
var top = 'top';
var bottom = 'bottom';
var right = 'right';
var left = 'left';
var auto = 'auto';
var basePlacements = [top, bottom, right, left];
var start = 'start';
var end = 'end';
var clippingParents = 'clippingParents';
var viewport = 'viewport';
var popper = 'popper';
var reference = 'reference';
var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []); // modifiers that need to read the DOM

var beforeRead = 'beforeRead';
var read = 'read';
var afterRead = 'afterRead'; // pure-logic modifiers

var beforeMain = 'beforeMain';
var main = 'main';
var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

var beforeWrite = 'beforeWrite';
var write = 'write';
var afterWrite = 'afterWrite';
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/index.js":
/*!**************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "afterMain": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.afterMain),
/* harmony export */   "afterRead": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.afterRead),
/* harmony export */   "afterWrite": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.afterWrite),
/* harmony export */   "applyStyles": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.applyStyles),
/* harmony export */   "arrow": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.arrow),
/* harmony export */   "auto": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.auto),
/* harmony export */   "basePlacements": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.basePlacements),
/* harmony export */   "beforeMain": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.beforeMain),
/* harmony export */   "beforeRead": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.beforeRead),
/* harmony export */   "beforeWrite": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.beforeWrite),
/* harmony export */   "bottom": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom),
/* harmony export */   "clippingParents": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.clippingParents),
/* harmony export */   "computeStyles": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.computeStyles),
/* harmony export */   "createPopper": () => (/* reexport safe */ _popper_js__WEBPACK_IMPORTED_MODULE_4__.createPopper),
/* harmony export */   "createPopperBase": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_2__.createPopper),
/* harmony export */   "createPopperLite": () => (/* reexport safe */ _popper_lite_js__WEBPACK_IMPORTED_MODULE_5__.createPopper),
/* harmony export */   "detectOverflow": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "end": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.end),
/* harmony export */   "eventListeners": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.eventListeners),
/* harmony export */   "flip": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.flip),
/* harmony export */   "hide": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.hide),
/* harmony export */   "left": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.left),
/* harmony export */   "main": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.main),
/* harmony export */   "modifierPhases": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.modifierPhases),
/* harmony export */   "offset": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.offset),
/* harmony export */   "placements": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.placements),
/* harmony export */   "popper": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper),
/* harmony export */   "popperGenerator": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_2__.popperGenerator),
/* harmony export */   "popperOffsets": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.popperOffsets),
/* harmony export */   "preventOverflow": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.preventOverflow),
/* harmony export */   "read": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.read),
/* harmony export */   "reference": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.reference),
/* harmony export */   "right": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.right),
/* harmony export */   "start": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.start),
/* harmony export */   "top": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.top),
/* harmony export */   "variationPlacements": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.variationPlacements),
/* harmony export */   "viewport": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.viewport),
/* harmony export */   "write": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.write)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modifiers/index.js */ "./node_modules/@popperjs/core/lib/modifiers/index.js");
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/createPopper.js");
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _popper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./popper.js */ "./node_modules/@popperjs/core/lib/popper.js");
/* harmony import */ var _popper_lite_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./popper-lite.js */ "./node_modules/@popperjs/core/lib/popper-lite.js");

 // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js":
/*!******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/applyStyles.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom-utils/getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");

 // This modifier takes the styles prepared by the `computeStyles` modifier
// and applies them to the HTMLElements such as popper and arrow

function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function (name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name]; // arrow is optional + virtual elements

    if (!(0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element) || !(0,_dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element)) {
      return;
    } // Flow doesn't support to extend this property, but it's the most
    // effective way to apply styles to an HTMLElement
    // $FlowFixMe[cannot-write]


    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function (name) {
      var value = attributes[name];

      if (value === false) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value === true ? '' : value);
      }
    });
  });
}

function effect(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: '0',
      top: '0',
      margin: '0'
    },
    arrow: {
      position: 'absolute'
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;

  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }

  return function () {
    Object.keys(state.elements).forEach(function (name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

      var style = styleProperties.reduce(function (style, property) {
        style[property] = '';
        return style;
      }, {}); // arrow is optional + virtual elements

      if (!(0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element) || !(0,_dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element)) {
        return;
      }

      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'applyStyles',
  enabled: true,
  phase: 'write',
  fn: applyStyles,
  effect: effect,
  requires: ['computeStyles']
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/arrow.js":
/*!************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/arrow.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dom-utils/getLayoutRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js");
/* harmony import */ var _dom_utils_contains_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../dom-utils/contains.js */ "./node_modules/@popperjs/core/lib/dom-utils/contains.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/getMainAxisFromPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js");
/* harmony import */ var _utils_within_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/within.js */ "./node_modules/@popperjs/core/lib/utils/within.js");
/* harmony import */ var _utils_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/mergePaddingObject.js */ "./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js");
/* harmony import */ var _utils_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/expandToHashMap.js */ "./node_modules/@popperjs/core/lib/utils/expandToHashMap.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");









 // eslint-disable-next-line import/no-unused-modules

var toPaddingObject = function toPaddingObject(padding, state) {
  padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return (0,_utils_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_0__["default"])(typeof padding !== 'number' ? padding : (0,_utils_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_1__["default"])(padding, _enums_js__WEBPACK_IMPORTED_MODULE_2__.basePlacements));
};

function arrow(_ref) {
  var _state$modifiersData$;

  var state = _ref.state,
      name = _ref.name,
      options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets = state.modifiersData.popperOffsets;
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(state.placement);
  var axis = (0,_utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_4__["default"])(basePlacement);
  var isVertical = [_enums_js__WEBPACK_IMPORTED_MODULE_2__.left, _enums_js__WEBPACK_IMPORTED_MODULE_2__.right].indexOf(basePlacement) >= 0;
  var len = isVertical ? 'height' : 'width';

  if (!arrowElement || !popperOffsets) {
    return;
  }

  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = (0,_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_5__["default"])(arrowElement);
  var minProp = axis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_2__.top : _enums_js__WEBPACK_IMPORTED_MODULE_2__.left;
  var maxProp = axis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_2__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_2__.right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
  var arrowOffsetParent = (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_6__["default"])(arrowElement);
  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
  // outside of the popper bounds

  var min = paddingObject[minProp];
  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset = (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_7__.within)(min, center, max); // Prevents breaking syntax highlighting...

  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
}

function effect(_ref2) {
  var state = _ref2.state,
      options = _ref2.options;
  var _options$element = options.element,
      arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

  if (arrowElement == null) {
    return;
  } // CSS selector


  if (typeof arrowElement === 'string') {
    arrowElement = state.elements.popper.querySelector(arrowElement);

    if (!arrowElement) {
      return;
    }
  }

  if (true) {
    if (!(0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_8__.isHTMLElement)(arrowElement)) {
      console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', 'To use an SVG arrow, wrap it in an HTMLElement that will be used as', 'the arrow.'].join(' '));
    }
  }

  if (!(0,_dom_utils_contains_js__WEBPACK_IMPORTED_MODULE_9__["default"])(state.elements.popper, arrowElement)) {
    if (true) {
      console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', 'element.'].join(' '));
    }

    return;
  }

  state.elements.arrow = arrowElement;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'arrow',
  enabled: true,
  phase: 'main',
  fn: arrow,
  effect: effect,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow']
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/computeStyles.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "mapToStyles": () => (/* binding */ mapToStyles)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dom-utils/getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dom-utils/getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dom-utils/getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_getVariation_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");







 // eslint-disable-next-line import/no-unused-modules

var unsetSides = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto'
}; // Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.

function roundOffsetsByDPR(_ref) {
  var x = _ref.x,
      y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(x * dpr) / dpr || 0,
    y: (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(y * dpr) / dpr || 0
  };
}

function mapToStyles(_ref2) {
  var _Object$assign2;

  var popper = _ref2.popper,
      popperRect = _ref2.popperRect,
      placement = _ref2.placement,
      variation = _ref2.variation,
      offsets = _ref2.offsets,
      position = _ref2.position,
      gpuAcceleration = _ref2.gpuAcceleration,
      adaptive = _ref2.adaptive,
      roundOffsets = _ref2.roundOffsets,
      isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x,
      x = _offsets$x === void 0 ? 0 : _offsets$x,
      _offsets$y = offsets.y,
      y = _offsets$y === void 0 ? 0 : _offsets$y;

  var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
    x: x,
    y: y
  }) : {
    x: x,
    y: y
  };

  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty('x');
  var hasY = offsets.hasOwnProperty('y');
  var sideX = _enums_js__WEBPACK_IMPORTED_MODULE_1__.left;
  var sideY = _enums_js__WEBPACK_IMPORTED_MODULE_1__.top;
  var win = window;

  if (adaptive) {
    var offsetParent = (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_2__["default"])(popper);
    var heightProp = 'clientHeight';
    var widthProp = 'clientWidth';

    if (offsetParent === (0,_dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_3__["default"])(popper)) {
      offsetParent = (0,_dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_4__["default"])(popper);

      if ((0,_dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_5__["default"])(offsetParent).position !== 'static' && position === 'absolute') {
        heightProp = 'scrollHeight';
        widthProp = 'scrollWidth';
      }
    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


    offsetParent = offsetParent;

    if (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.top || (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.left || placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.right) && variation === _enums_js__WEBPACK_IMPORTED_MODULE_1__.end) {
      sideY = _enums_js__WEBPACK_IMPORTED_MODULE_1__.bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : // $FlowFixMe[prop-missing]
      offsetParent[heightProp];
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }

    if (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.left || (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.top || placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.bottom) && variation === _enums_js__WEBPACK_IMPORTED_MODULE_1__.end) {
      sideX = _enums_js__WEBPACK_IMPORTED_MODULE_1__.right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : // $FlowFixMe[prop-missing]
      offsetParent[widthProp];
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }

  var commonStyles = Object.assign({
    position: position
  }, adaptive && unsetSides);

  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x: x,
    y: y
  }) : {
    x: x,
    y: y
  };

  x = _ref4.x;
  y = _ref4.y;

  if (gpuAcceleration) {
    var _Object$assign;

    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }

  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
}

function computeStyles(_ref5) {
  var state = _ref5.state,
      options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration,
      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
      _options$adaptive = options.adaptive,
      adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
      _options$roundOffsets = options.roundOffsets,
      roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;

  if (true) {
    var transitionProperty = (0,_dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_5__["default"])(state.elements.popper).transitionProperty || '';

    if (adaptive && ['transform', 'top', 'right', 'bottom', 'left'].some(function (property) {
      return transitionProperty.indexOf(property) >= 0;
    })) {
      console.warn(['Popper: Detected CSS transitions on at least one of the following', 'CSS properties: "transform", "top", "right", "bottom", "left".', '\n\n', 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', 'for smooth transitions, or remove these properties from the CSS', 'transition declaration on the popper element if only transitioning', 'opacity or background-color for example.', '\n\n', 'We recommend using the popper element as a wrapper around an inner', 'element that can have any CSS property transitioned for animations.'].join(' '));
    }
  }

  var commonStyles = {
    placement: (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__["default"])(state.placement),
    variation: (0,_utils_getVariation_js__WEBPACK_IMPORTED_MODULE_7__["default"])(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration: gpuAcceleration,
    isFixed: state.options.strategy === 'fixed'
  };

  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive: adaptive,
      roundOffsets: roundOffsets
    })));
  }

  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: 'absolute',
      adaptive: false,
      roundOffsets: roundOffsets
    })));
  }

  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-placement': state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'computeStyles',
  enabled: true,
  phase: 'beforeWrite',
  fn: computeStyles,
  data: {}
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/eventListeners.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom-utils/getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
 // eslint-disable-next-line import/no-unused-modules

var passive = {
  passive: true
};

function effect(_ref) {
  var state = _ref.state,
      instance = _ref.instance,
      options = _ref.options;
  var _options$scroll = options.scroll,
      scroll = _options$scroll === void 0 ? true : _options$scroll,
      _options$resize = options.resize,
      resize = _options$resize === void 0 ? true : _options$resize;
  var window = (0,_dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

  if (scroll) {
    scrollParents.forEach(function (scrollParent) {
      scrollParent.addEventListener('scroll', instance.update, passive);
    });
  }

  if (resize) {
    window.addEventListener('resize', instance.update, passive);
  }

  return function () {
    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.removeEventListener('resize', instance.update, passive);
    }
  };
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'eventListeners',
  enabled: true,
  phase: 'write',
  fn: function fn() {},
  effect: effect,
  data: {}
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/flip.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/flip.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/getOppositePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getOppositePlacement.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/getOppositeVariationPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _utils_computeAutoPlacement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/computeAutoPlacement.js */ "./node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _utils_getVariation_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");






 // eslint-disable-next-line import/no-unused-modules

function getExpandedFallbackPlacements(placement) {
  if ((0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_1__.auto) {
    return [];
  }

  var oppositePlacement = (0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(placement);
  return [(0,_utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(placement), oppositePlacement, (0,_utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(oppositePlacement)];
}

function flip(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;

  if (state.modifiersData[name]._skip) {
    return;
  }

  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
      specifiedFallbackPlacements = options.fallbackPlacements,
      padding = options.padding,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      _options$flipVariatio = options.flipVariations,
      flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
      allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [(0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
    return acc.concat((0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_1__.auto ? (0,_utils_computeAutoPlacement_js__WEBPACK_IMPORTED_MODULE_4__["default"])(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      flipVariations: flipVariations,
      allowedAutoPlacements: allowedAutoPlacements
    }) : placement);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements[0];

  for (var i = 0; i < placements.length; i++) {
    var placement = placements[i];

    var _basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement);

    var isStartVariation = (0,_utils_getVariation_js__WEBPACK_IMPORTED_MODULE_5__["default"])(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_1__.start;
    var isVertical = [_enums_js__WEBPACK_IMPORTED_MODULE_1__.top, _enums_js__WEBPACK_IMPORTED_MODULE_1__.bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? 'width' : 'height';
    var overflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_6__["default"])(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      altBoundary: altBoundary,
      padding: padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? _enums_js__WEBPACK_IMPORTED_MODULE_1__.right : _enums_js__WEBPACK_IMPORTED_MODULE_1__.left : isStartVariation ? _enums_js__WEBPACK_IMPORTED_MODULE_1__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_1__.top;

    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = (0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(mainVariationSide);
    }

    var altVariationSide = (0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(mainVariationSide);
    var checks = [];

    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }

    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }

    if (checks.every(function (check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }

    checksMap.set(placement, checks);
  }

  if (makeFallbackChecks) {
    // `2` may be desired in some cases – research later
    var numberOfChecks = flipVariations ? 3 : 1;

    var _loop = function _loop(_i) {
      var fittingPlacement = placements.find(function (placement) {
        var checks = checksMap.get(placement);

        if (checks) {
          return checks.slice(0, _i).every(function (check) {
            return check;
          });
        }
      });

      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };

    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);

      if (_ret === "break") break;
    }
  }

  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'flip',
  enabled: true,
  phase: 'main',
  fn: flip,
  requiresIfExists: ['offset'],
  data: {
    _skip: false
  }
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/hide.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/hide.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");



function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }

  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}

function isAnySideFullyClipped(overflow) {
  return [_enums_js__WEBPACK_IMPORTED_MODULE_0__.top, _enums_js__WEBPACK_IMPORTED_MODULE_0__.right, _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom, _enums_js__WEBPACK_IMPORTED_MODULE_0__.left].some(function (side) {
    return overflow[side] >= 0;
  });
}

function hide(_ref) {
  var state = _ref.state,
      name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__["default"])(state, {
    elementContext: 'reference'
  });
  var popperAltOverflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__["default"])(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets: referenceClippingOffsets,
    popperEscapeOffsets: popperEscapeOffsets,
    isReferenceHidden: isReferenceHidden,
    hasPopperEscaped: hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-reference-hidden': isReferenceHidden,
    'data-popper-escaped': hasPopperEscaped
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'hide',
  enabled: true,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: hide
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "applyStyles": () => (/* reexport safe */ _applyStyles_js__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "arrow": () => (/* reexport safe */ _arrow_js__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "computeStyles": () => (/* reexport safe */ _computeStyles_js__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "eventListeners": () => (/* reexport safe */ _eventListeners_js__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "flip": () => (/* reexport safe */ _flip_js__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   "hide": () => (/* reexport safe */ _hide_js__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   "offset": () => (/* reexport safe */ _offset_js__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   "popperOffsets": () => (/* reexport safe */ _popperOffsets_js__WEBPACK_IMPORTED_MODULE_7__["default"]),
/* harmony export */   "preventOverflow": () => (/* reexport safe */ _preventOverflow_js__WEBPACK_IMPORTED_MODULE_8__["default"])
/* harmony export */ });
/* harmony import */ var _applyStyles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./applyStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js");
/* harmony import */ var _arrow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./arrow.js */ "./node_modules/@popperjs/core/lib/modifiers/arrow.js");
/* harmony import */ var _computeStyles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./computeStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js");
/* harmony import */ var _eventListeners_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./eventListeners.js */ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js");
/* harmony import */ var _flip_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./flip.js */ "./node_modules/@popperjs/core/lib/modifiers/flip.js");
/* harmony import */ var _hide_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./hide.js */ "./node_modules/@popperjs/core/lib/modifiers/hide.js");
/* harmony import */ var _offset_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./offset.js */ "./node_modules/@popperjs/core/lib/modifiers/offset.js");
/* harmony import */ var _popperOffsets_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./popperOffsets.js */ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js");
/* harmony import */ var _preventOverflow_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./preventOverflow.js */ "./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js");










/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/offset.js":
/*!*************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/offset.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "distanceAndSkiddingToXY": () => (/* binding */ distanceAndSkiddingToXY)
/* harmony export */ });
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");

 // eslint-disable-next-line import/no-unused-modules

function distanceAndSkiddingToXY(placement, rects, offset) {
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement);
  var invertDistance = [_enums_js__WEBPACK_IMPORTED_MODULE_1__.left, _enums_js__WEBPACK_IMPORTED_MODULE_1__.top].indexOf(basePlacement) >= 0 ? -1 : 1;

  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
    placement: placement
  })) : offset,
      skidding = _ref[0],
      distance = _ref[1];

  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [_enums_js__WEBPACK_IMPORTED_MODULE_1__.left, _enums_js__WEBPACK_IMPORTED_MODULE_1__.right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}

function offset(_ref2) {
  var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
  var _options$offset = options.offset,
      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = _enums_js__WEBPACK_IMPORTED_MODULE_1__.placements.reduce(function (acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement],
      x = _data$state$placement.x,
      y = _data$state$placement.y;

  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'offset',
  enabled: true,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: offset
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_computeOffsets_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/computeOffsets.js */ "./node_modules/@popperjs/core/lib/utils/computeOffsets.js");


function popperOffsets(_ref) {
  var state = _ref.state,
      name = _ref.name;
  // Offsets are the actual position the popper needs to have to be
  // properly positioned near its reference element
  // This is the most basic placement, and will be adjusted by
  // the modifiers in the next step
  state.modifiersData[name] = (0,_utils_computeOffsets_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: 'absolute',
    placement: state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'popperOffsets',
  enabled: true,
  phase: 'read',
  fn: popperOffsets,
  data: {}
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/getMainAxisFromPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js");
/* harmony import */ var _utils_getAltAxis_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/getAltAxis.js */ "./node_modules/@popperjs/core/lib/utils/getAltAxis.js");
/* harmony import */ var _utils_within_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/within.js */ "./node_modules/@popperjs/core/lib/utils/within.js");
/* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dom-utils/getLayoutRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _utils_getVariation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _utils_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/getFreshSideObject.js */ "./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");












function preventOverflow(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;
  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      padding = options.padding,
      _options$tether = options.tether,
      tether = _options$tether === void 0 ? true : _options$tether,
      _options$tetherOffset = options.tetherOffset,
      tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(state, {
    boundary: boundary,
    rootBoundary: rootBoundary,
    padding: padding,
    altBoundary: altBoundary
  });
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(state.placement);
  var variation = (0,_utils_getVariation_js__WEBPACK_IMPORTED_MODULE_2__["default"])(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = (0,_utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(basePlacement);
  var altAxis = (0,_utils_getAltAxis_js__WEBPACK_IMPORTED_MODULE_4__["default"])(mainAxis);
  var popperOffsets = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };

  if (!popperOffsets) {
    return;
  }

  if (checkMainAxis) {
    var _offsetModifierState$;

    var mainSide = mainAxis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.top : _enums_js__WEBPACK_IMPORTED_MODULE_5__.left;
    var altSide = mainAxis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_5__.right;
    var len = mainAxis === 'y' ? 'height' : 'width';
    var offset = popperOffsets[mainAxis];
    var min = offset + overflow[mainSide];
    var max = offset - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === _enums_js__WEBPACK_IMPORTED_MODULE_5__.start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === _enums_js__WEBPACK_IMPORTED_MODULE_5__.start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
    // outside the reference bounds

    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? (0,_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_6__["default"])(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : (0,_utils_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_7__["default"])();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
    // to include its full size in the calculation. If the reference is small
    // and near the edge of a boundary, the popper can overflow even if the
    // reference is not overflowing as well (e.g. virtual elements with no
    // width or height)

    var arrowLen = (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__.within)(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_9__["default"])(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset + maxOffset - offsetModifierValue;
    var preventedOffset = (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__.within)(tether ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_10__.min)(min, tetherMin) : min, offset, tether ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_10__.max)(max, tetherMax) : max);
    popperOffsets[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset;
  }

  if (checkAltAxis) {
    var _offsetModifierState$2;

    var _mainSide = mainAxis === 'x' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.top : _enums_js__WEBPACK_IMPORTED_MODULE_5__.left;

    var _altSide = mainAxis === 'x' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_5__.right;

    var _offset = popperOffsets[altAxis];

    var _len = altAxis === 'y' ? 'height' : 'width';

    var _min = _offset + overflow[_mainSide];

    var _max = _offset - overflow[_altSide];

    var isOriginSide = [_enums_js__WEBPACK_IMPORTED_MODULE_5__.top, _enums_js__WEBPACK_IMPORTED_MODULE_5__.left].indexOf(basePlacement) !== -1;

    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;

    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;

    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;

    var _preventedOffset = tether && isOriginSide ? (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__.withinMaxClamp)(_tetherMin, _offset, _tetherMax) : (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__.within)(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);

    popperOffsets[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'preventOverflow',
  enabled: true,
  phase: 'main',
  fn: preventOverflow,
  requiresIfExists: ['offset']
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/popper-lite.js":
/*!********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/popper-lite.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createPopper": () => (/* binding */ createPopper),
/* harmony export */   "defaultModifiers": () => (/* binding */ defaultModifiers),
/* harmony export */   "detectOverflow": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   "popperGenerator": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_4__.popperGenerator)
/* harmony export */ });
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/createPopper.js");
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modifiers/eventListeners.js */ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js");
/* harmony import */ var _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modifiers/popperOffsets.js */ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js");
/* harmony import */ var _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modifiers/computeStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js");
/* harmony import */ var _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modifiers/applyStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js");





var defaultModifiers = [_modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__["default"], _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__["default"], _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__["default"], _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__["default"]];
var createPopper = /*#__PURE__*/(0,_createPopper_js__WEBPACK_IMPORTED_MODULE_4__.popperGenerator)({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/popper.js":
/*!***************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/popper.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "applyStyles": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.applyStyles),
/* harmony export */   "arrow": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.arrow),
/* harmony export */   "computeStyles": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.computeStyles),
/* harmony export */   "createPopper": () => (/* binding */ createPopper),
/* harmony export */   "createPopperLite": () => (/* reexport safe */ _popper_lite_js__WEBPACK_IMPORTED_MODULE_11__.createPopper),
/* harmony export */   "defaultModifiers": () => (/* binding */ defaultModifiers),
/* harmony export */   "detectOverflow": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_10__["default"]),
/* harmony export */   "eventListeners": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.eventListeners),
/* harmony export */   "flip": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.flip),
/* harmony export */   "hide": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.hide),
/* harmony export */   "offset": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.offset),
/* harmony export */   "popperGenerator": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_9__.popperGenerator),
/* harmony export */   "popperOffsets": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.popperOffsets),
/* harmony export */   "preventOverflow": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.preventOverflow)
/* harmony export */ });
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/createPopper.js");
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modifiers/eventListeners.js */ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js");
/* harmony import */ var _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modifiers/popperOffsets.js */ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js");
/* harmony import */ var _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modifiers/computeStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js");
/* harmony import */ var _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modifiers/applyStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js");
/* harmony import */ var _modifiers_offset_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modifiers/offset.js */ "./node_modules/@popperjs/core/lib/modifiers/offset.js");
/* harmony import */ var _modifiers_flip_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modifiers/flip.js */ "./node_modules/@popperjs/core/lib/modifiers/flip.js");
/* harmony import */ var _modifiers_preventOverflow_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modifiers/preventOverflow.js */ "./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js");
/* harmony import */ var _modifiers_arrow_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modifiers/arrow.js */ "./node_modules/@popperjs/core/lib/modifiers/arrow.js");
/* harmony import */ var _modifiers_hide_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modifiers/hide.js */ "./node_modules/@popperjs/core/lib/modifiers/hide.js");
/* harmony import */ var _popper_lite_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./popper-lite.js */ "./node_modules/@popperjs/core/lib/popper-lite.js");
/* harmony import */ var _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./modifiers/index.js */ "./node_modules/@popperjs/core/lib/modifiers/index.js");










var defaultModifiers = [_modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__["default"], _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__["default"], _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__["default"], _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__["default"], _modifiers_offset_js__WEBPACK_IMPORTED_MODULE_4__["default"], _modifiers_flip_js__WEBPACK_IMPORTED_MODULE_5__["default"], _modifiers_preventOverflow_js__WEBPACK_IMPORTED_MODULE_6__["default"], _modifiers_arrow_js__WEBPACK_IMPORTED_MODULE_7__["default"], _modifiers_hide_js__WEBPACK_IMPORTED_MODULE_8__["default"]];
var createPopper = /*#__PURE__*/(0,_createPopper_js__WEBPACK_IMPORTED_MODULE_9__.popperGenerator)({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ computeAutoPlacement)
/* harmony export */ });
/* harmony import */ var _getVariation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _detectOverflow_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");




function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      placement = _options.placement,
      boundary = _options.boundary,
      rootBoundary = _options.rootBoundary,
      padding = _options.padding,
      flipVariations = _options.flipVariations,
      _options$allowedAutoP = _options.allowedAutoPlacements,
      allowedAutoPlacements = _options$allowedAutoP === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.placements : _options$allowedAutoP;
  var variation = (0,_getVariation_js__WEBPACK_IMPORTED_MODULE_1__["default"])(placement);
  var placements = variation ? flipVariations ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.variationPlacements : _enums_js__WEBPACK_IMPORTED_MODULE_0__.variationPlacements.filter(function (placement) {
    return (0,_getVariation_js__WEBPACK_IMPORTED_MODULE_1__["default"])(placement) === variation;
  }) : _enums_js__WEBPACK_IMPORTED_MODULE_0__.basePlacements;
  var allowedPlacements = placements.filter(function (placement) {
    return allowedAutoPlacements.indexOf(placement) >= 0;
  });

  if (allowedPlacements.length === 0) {
    allowedPlacements = placements;

    if (true) {
      console.error(['Popper: The `allowedAutoPlacements` option did not allow any', 'placements. Ensure the `placement` option matches the variation', 'of the allowed placements.', 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(' '));
    }
  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


  var overflows = allowedPlacements.reduce(function (acc, placement) {
    acc[placement] = (0,_detectOverflow_js__WEBPACK_IMPORTED_MODULE_2__["default"])(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding
    })[(0,_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(placement)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function (a, b) {
    return overflows[a] - overflows[b];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/computeOffsets.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/computeOffsets.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ computeOffsets)
/* harmony export */ });
/* harmony import */ var _getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _getVariation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getMainAxisFromPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");




function computeOffsets(_ref) {
  var reference = _ref.reference,
      element = _ref.element,
      placement = _ref.placement;
  var basePlacement = placement ? (0,_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement) : null;
  var variation = placement ? (0,_getVariation_js__WEBPACK_IMPORTED_MODULE_1__["default"])(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;

  switch (basePlacement) {
    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.top:
      offsets = {
        x: commonX,
        y: reference.y - element.height
      };
      break;

    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.bottom:
      offsets = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;

    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.right:
      offsets = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;

    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.left:
      offsets = {
        x: reference.x - element.width,
        y: commonY
      };
      break;

    default:
      offsets = {
        x: reference.x,
        y: reference.y
      };
  }

  var mainAxis = basePlacement ? (0,_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(basePlacement) : null;

  if (mainAxis != null) {
    var len = mainAxis === 'y' ? 'height' : 'width';

    switch (variation) {
      case _enums_js__WEBPACK_IMPORTED_MODULE_2__.start:
        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
        break;

      case _enums_js__WEBPACK_IMPORTED_MODULE_2__.end:
        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
        break;

      default:
    }
  }

  return offsets;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/debounce.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/debounce.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ debounce)
/* harmony export */ });
function debounce(fn) {
  var pending;
  return function () {
    if (!pending) {
      pending = new Promise(function (resolve) {
        Promise.resolve().then(function () {
          pending = undefined;
          resolve(fn());
        });
      });
    }

    return pending;
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/detectOverflow.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ detectOverflow)
/* harmony export */ });
/* harmony import */ var _dom_utils_getClippingRect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dom-utils/getClippingRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js");
/* harmony import */ var _dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dom-utils/getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _dom_utils_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dom-utils/getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _computeOffsets_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./computeOffsets.js */ "./node_modules/@popperjs/core/lib/utils/computeOffsets.js");
/* harmony import */ var _rectToClientRect_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./rectToClientRect.js */ "./node_modules/@popperjs/core/lib/utils/rectToClientRect.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mergePaddingObject.js */ "./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js");
/* harmony import */ var _expandToHashMap_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./expandToHashMap.js */ "./node_modules/@popperjs/core/lib/utils/expandToHashMap.js");








 // eslint-disable-next-line import/no-unused-modules

function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$placement = _options.placement,
      placement = _options$placement === void 0 ? state.placement : _options$placement,
      _options$strategy = _options.strategy,
      strategy = _options$strategy === void 0 ? state.strategy : _options$strategy,
      _options$boundary = _options.boundary,
      boundary = _options$boundary === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.clippingParents : _options$boundary,
      _options$rootBoundary = _options.rootBoundary,
      rootBoundary = _options$rootBoundary === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.viewport : _options$rootBoundary,
      _options$elementConte = _options.elementContext,
      elementContext = _options$elementConte === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper : _options$elementConte,
      _options$altBoundary = _options.altBoundary,
      altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
      _options$padding = _options.padding,
      padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = (0,_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_1__["default"])(typeof padding !== 'number' ? padding : (0,_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_2__["default"])(padding, _enums_js__WEBPACK_IMPORTED_MODULE_0__.basePlacements));
  var altContext = elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.reference : _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = (0,_dom_utils_getClippingRect_js__WEBPACK_IMPORTED_MODULE_3__["default"])((0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isElement)(element) ? element : element.contextElement || (0,_dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_5__["default"])(state.elements.popper), boundary, rootBoundary, strategy);
  var referenceClientRect = (0,_dom_utils_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_6__["default"])(state.elements.reference);
  var popperOffsets = (0,_computeOffsets_js__WEBPACK_IMPORTED_MODULE_7__["default"])({
    reference: referenceClientRect,
    element: popperRect,
    strategy: 'absolute',
    placement: placement
  });
  var popperClientRect = (0,_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_8__["default"])(Object.assign({}, popperRect, popperOffsets));
  var elementClientRect = elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
  // 0 or negative = within the clipping rect

  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

  if (elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper && offsetData) {
    var offset = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function (key) {
      var multiply = [_enums_js__WEBPACK_IMPORTED_MODULE_0__.right, _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [_enums_js__WEBPACK_IMPORTED_MODULE_0__.top, _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom].indexOf(key) >= 0 ? 'y' : 'x';
      overflowOffsets[key] += offset[axis] * multiply;
    });
  }

  return overflowOffsets;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/expandToHashMap.js":
/*!******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/expandToHashMap.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ expandToHashMap)
/* harmony export */ });
function expandToHashMap(value, keys) {
  return keys.reduce(function (hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/format.js":
/*!*********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/format.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ format)
/* harmony export */ });
function format(str) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return [].concat(args).reduce(function (p, c) {
    return p.replace(/%s/, c);
  }, str);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getAltAxis.js":
/*!*************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getAltAxis.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getAltAxis)
/* harmony export */ });
function getAltAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getBasePlacement.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getBasePlacement)
/* harmony export */ });

function getBasePlacement(placement) {
  return placement.split('-')[0];
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getFreshSideObject)
/* harmony export */ });
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getMainAxisFromPlacement)
/* harmony export */ });
function getMainAxisFromPlacement(placement) {
  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getOppositePlacement.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getOppositePlacement.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getOppositePlacement)
/* harmony export */ });
var hash = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getOppositeVariationPlacement)
/* harmony export */ });
var hash = {
  start: 'end',
  end: 'start'
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function (matched) {
    return hash[matched];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getVariation.js":
/*!***************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getVariation.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getVariation)
/* harmony export */ });
function getVariation(placement) {
  return placement.split('-')[1];
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/math.js":
/*!*******************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/math.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "max": () => (/* binding */ max),
/* harmony export */   "min": () => (/* binding */ min),
/* harmony export */   "round": () => (/* binding */ round)
/* harmony export */ });
var max = Math.max;
var min = Math.min;
var round = Math.round;

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/mergeByName.js":
/*!**************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/mergeByName.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ mergeByName)
/* harmony export */ });
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function (merged, current) {
    var existing = merged[current.name];
    merged[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged;
  }, {}); // IE11 does not support Object.values

  return Object.keys(merged).map(function (key) {
    return merged[key];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ mergePaddingObject)
/* harmony export */ });
/* harmony import */ var _getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getFreshSideObject.js */ "./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js");

function mergePaddingObject(paddingObject) {
  return Object.assign({}, (0,_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_0__["default"])(), paddingObject);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/orderModifiers.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/orderModifiers.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ orderModifiers)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
 // source: https://stackoverflow.com/questions/49875255

function order(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function (modifier) {
    map.set(modifier.name, modifier);
  }); // On visiting object, check for its dependencies and visit them recursively

  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function (dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);

        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }

  modifiers.forEach(function (modifier) {
    if (!visited.has(modifier.name)) {
      // check for visited object
      sort(modifier);
    }
  });
  return result;
}

function orderModifiers(modifiers) {
  // order based on dependencies
  var orderedModifiers = order(modifiers); // order based on phase

  return _enums_js__WEBPACK_IMPORTED_MODULE_0__.modifierPhases.reduce(function (acc, phase) {
    return acc.concat(orderedModifiers.filter(function (modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/rectToClientRect.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/rectToClientRect.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rectToClientRect)
/* harmony export */ });
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/uniqueBy.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/uniqueBy.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ uniqueBy)
/* harmony export */ });
function uniqueBy(arr, fn) {
  var identifiers = new Set();
  return arr.filter(function (item) {
    var identifier = fn(item);

    if (!identifiers.has(identifier)) {
      identifiers.add(identifier);
      return true;
    }
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/userAgent.js":
/*!************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/userAgent.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getUAString)
/* harmony export */ });
function getUAString() {
  var uaData = navigator.userAgentData;

  if (uaData != null && uaData.brands) {
    return uaData.brands.map(function (item) {
      return item.brand + "/" + item.version;
    }).join(' ');
  }

  return navigator.userAgent;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/validateModifiers.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/validateModifiers.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ validateModifiers)
/* harmony export */ });
/* harmony import */ var _format_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./format.js */ "./node_modules/@popperjs/core/lib/utils/format.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");


var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
var VALID_PROPERTIES = ['name', 'enabled', 'phase', 'fn', 'effect', 'requires', 'options'];
function validateModifiers(modifiers) {
  modifiers.forEach(function (modifier) {
    [].concat(Object.keys(modifier), VALID_PROPERTIES) // IE11-compatible replacement for `new Set(iterable)`
    .filter(function (value, index, self) {
      return self.indexOf(value) === index;
    }).forEach(function (key) {
      switch (key) {
        case 'name':
          if (typeof modifier.name !== 'string') {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', "\"" + String(modifier.name) + "\""));
          }

          break;

        case 'enabled':
          if (typeof modifier.enabled !== 'boolean') {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', "\"" + String(modifier.enabled) + "\""));
          }

          break;

        case 'phase':
          if (_enums_js__WEBPACK_IMPORTED_MODULE_1__.modifierPhases.indexOf(modifier.phase) < 0) {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + _enums_js__WEBPACK_IMPORTED_MODULE_1__.modifierPhases.join(', '), "\"" + String(modifier.phase) + "\""));
          }

          break;

        case 'fn':
          if (typeof modifier.fn !== 'function') {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', "\"" + String(modifier.fn) + "\""));
          }

          break;

        case 'effect':
          if (modifier.effect != null && typeof modifier.effect !== 'function') {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', "\"" + String(modifier.fn) + "\""));
          }

          break;

        case 'requires':
          if (modifier.requires != null && !Array.isArray(modifier.requires)) {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', "\"" + String(modifier.requires) + "\""));
          }

          break;

        case 'requiresIfExists':
          if (!Array.isArray(modifier.requiresIfExists)) {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', "\"" + String(modifier.requiresIfExists) + "\""));
          }

          break;

        case 'options':
        case 'data':
          break;

        default:
          console.error("PopperJS: an invalid property has been provided to the \"" + modifier.name + "\" modifier, valid properties are " + VALID_PROPERTIES.map(function (s) {
            return "\"" + s + "\"";
          }).join(', ') + "; but \"" + key + "\" was provided.");
      }

      modifier.requires && modifier.requires.forEach(function (requirement) {
        if (modifiers.find(function (mod) {
          return mod.name === requirement;
        }) == null) {
          console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
        }
      });
    });
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/within.js":
/*!*********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/within.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "within": () => (/* binding */ within),
/* harmony export */   "withinMaxClamp": () => (/* binding */ withinMaxClamp)
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");

function within(min, value, max) {
  return (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.max)(min, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.min)(value, max));
}
function withinMaxClamp(min, value, max) {
  var v = within(min, value, max);
  return v > max ? max : v;
}

/***/ }),

/***/ "./resources/js/helpers.js":
/*!*********************************!*\
  !*** ./resources/js/helpers.js ***!
  \*********************************/
/***/ (() => {

document.addEventListener('DOMContentLoaded', function () {
  // Html Editor
  var classicEditorTriggerList = [].slice.call(document.querySelectorAll('.html-editor'));
  classicEditorTriggerList.map(function (editorTriggerEl) {
    if (ClassicEditor !== undefined) {
      editorTriggerEl.required = false;
      ClassicEditor.create(editorTriggerEl);
    }
  }); // Slug

  var slugTriggerList = [].slice.call(document.querySelectorAll('input[data-slug-input]'));
  slugTriggerList.map(function (slugTriggerEl) {
    slugTriggerEl.oninput = function (event) {
      var title = document.querySelector(event.target.getAttribute('data-slug-input'));
      title.value = event.target.value.toString().toLowerCase().normalize('NFD') // split an accented letter in the base letter and the acent
      .replace(/[\u0300-\u036f]/g, '') // remove all previously split accents
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .trim();
      title.dispatchEvent(new Event('input')); // For livewire
    };
  }); // Link with method

  var linkTriggerList = [].slice.call(document.querySelectorAll('a[data-method]'));
  linkTriggerList.map(function (linkTriggerEl) {
    linkTriggerEl.onclick = function (event) {
      event.preventDefault();
      var confirmation = event.currentTarget.getAttribute('data-confirm-message');

      if (confirmation && !confirm(confirmation)) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        return false;
      }

      var form = document.createElement('form');
      var token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
      form.setAttribute('method', 'POST');
      form.setAttribute('action', event.currentTarget.getAttribute('href'));
      form.style.display = 'none';
      form.innerHTML = '<input type="hidden" name="_method" value="' + event.currentTarget.getAttribute('data-method') + '">' + '<input type="hidden" name="_token" value="' + token + '">';
      document.body.appendChild(form);
      form.submit();
      linkTriggerEl.style.pointerEvents = 'none';
      return false;
    };

    linkTriggerEl.style.pointerEvents = 'auto';
  });
}, false);

/***/ }),

/***/ "./node_modules/bootstrap/js/dist/alert.js":
/*!*************************************************!*\
  !*** ./node_modules/bootstrap/js/dist/alert.js ***!
  \*************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*!
  * Bootstrap alert.js v5.2.2 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
   true ? module.exports = factory(__webpack_require__(/*! ./util/index */ "./node_modules/bootstrap/js/dist/util/index.js"), __webpack_require__(/*! ./dom/event-handler */ "./node_modules/bootstrap/js/dist/dom/event-handler.js"), __webpack_require__(/*! ./base-component */ "./node_modules/bootstrap/js/dist/base-component.js"), __webpack_require__(/*! ./util/component-functions */ "./node_modules/bootstrap/js/dist/util/component-functions.js")) :
  0;
})(this, (function (index, EventHandler, BaseComponent, componentFunctions) { 'use strict';

  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.2): alert.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME = 'alert';
  const DATA_KEY = 'bs.alert';
  const EVENT_KEY = `.${DATA_KEY}`;
  const EVENT_CLOSE = `close${EVENT_KEY}`;
  const EVENT_CLOSED = `closed${EVENT_KEY}`;
  const CLASS_NAME_FADE = 'fade';
  const CLASS_NAME_SHOW = 'show';
  /**
   * Class definition
   */

  class Alert extends BaseComponent__default.default {
    // Getters
    static get NAME() {
      return NAME;
    } // Public


    close() {
      const closeEvent = EventHandler__default.default.trigger(this._element, EVENT_CLOSE);

      if (closeEvent.defaultPrevented) {
        return;
      }

      this._element.classList.remove(CLASS_NAME_SHOW);

      const isAnimated = this._element.classList.contains(CLASS_NAME_FADE);

      this._queueCallback(() => this._destroyElement(), this._element, isAnimated);
    } // Private


    _destroyElement() {
      this._element.remove();

      EventHandler__default.default.trigger(this._element, EVENT_CLOSED);
      this.dispose();
    } // Static


    static jQueryInterface(config) {
      return this.each(function () {
        const data = Alert.getOrCreateInstance(this);

        if (typeof config !== 'string') {
          return;
        }

        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
          throw new TypeError(`No method named "${config}"`);
        }

        data[config](this);
      });
    }

  }
  /**
   * Data API implementation
   */


  componentFunctions.enableDismissTrigger(Alert, 'close');
  /**
   * jQuery
   */

  index.defineJQueryPlugin(Alert);

  return Alert;

}));
//# sourceMappingURL=alert.js.map


/***/ }),

/***/ "./node_modules/bootstrap/js/dist/base-component.js":
/*!**********************************************************!*\
  !*** ./node_modules/bootstrap/js/dist/base-component.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*!
  * Bootstrap base-component.js v5.2.2 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
   true ? module.exports = factory(__webpack_require__(/*! ./dom/data */ "./node_modules/bootstrap/js/dist/dom/data.js"), __webpack_require__(/*! ./util/index */ "./node_modules/bootstrap/js/dist/util/index.js"), __webpack_require__(/*! ./dom/event-handler */ "./node_modules/bootstrap/js/dist/dom/event-handler.js"), __webpack_require__(/*! ./util/config */ "./node_modules/bootstrap/js/dist/util/config.js")) :
  0;
})(this, (function (Data, index, EventHandler, Config) { 'use strict';

  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

  const Data__default = /*#__PURE__*/_interopDefaultLegacy(Data);
  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
  const Config__default = /*#__PURE__*/_interopDefaultLegacy(Config);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.2): base-component.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const VERSION = '5.2.2';
  /**
   * Class definition
   */

  class BaseComponent extends Config__default.default {
    constructor(element, config) {
      super();
      element = index.getElement(element);

      if (!element) {
        return;
      }

      this._element = element;
      this._config = this._getConfig(config);
      Data__default.default.set(this._element, this.constructor.DATA_KEY, this);
    } // Public


    dispose() {
      Data__default.default.remove(this._element, this.constructor.DATA_KEY);
      EventHandler__default.default.off(this._element, this.constructor.EVENT_KEY);

      for (const propertyName of Object.getOwnPropertyNames(this)) {
        this[propertyName] = null;
      }
    }

    _queueCallback(callback, element, isAnimated = true) {
      index.executeAfterTransition(callback, element, isAnimated);
    }

    _getConfig(config) {
      config = this._mergeConfigObj(config, this._element);
      config = this._configAfterMerge(config);

      this._typeCheckConfig(config);

      return config;
    } // Static


    static getInstance(element) {
      return Data__default.default.get(index.getElement(element), this.DATA_KEY);
    }

    static getOrCreateInstance(element, config = {}) {
      return this.getInstance(element) || new this(element, typeof config === 'object' ? config : null);
    }

    static get VERSION() {
      return VERSION;
    }

    static get DATA_KEY() {
      return `bs.${this.NAME}`;
    }

    static get EVENT_KEY() {
      return `.${this.DATA_KEY}`;
    }

    static eventName(name) {
      return `${name}${this.EVENT_KEY}`;
    }

  }

  return BaseComponent;

}));
//# sourceMappingURL=base-component.js.map


/***/ }),

/***/ "./node_modules/bootstrap/js/dist/collapse.js":
/*!****************************************************!*\
  !*** ./node_modules/bootstrap/js/dist/collapse.js ***!
  \****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*!
  * Bootstrap collapse.js v5.2.2 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
   true ? module.exports = factory(__webpack_require__(/*! ./util/index */ "./node_modules/bootstrap/js/dist/util/index.js"), __webpack_require__(/*! ./dom/event-handler */ "./node_modules/bootstrap/js/dist/dom/event-handler.js"), __webpack_require__(/*! ./dom/selector-engine */ "./node_modules/bootstrap/js/dist/dom/selector-engine.js"), __webpack_require__(/*! ./base-component */ "./node_modules/bootstrap/js/dist/base-component.js")) :
  0;
})(this, (function (index, EventHandler, SelectorEngine, BaseComponent) { 'use strict';

  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.2): collapse.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME = 'collapse';
  const DATA_KEY = 'bs.collapse';
  const EVENT_KEY = `.${DATA_KEY}`;
  const DATA_API_KEY = '.data-api';
  const EVENT_SHOW = `show${EVENT_KEY}`;
  const EVENT_SHOWN = `shown${EVENT_KEY}`;
  const EVENT_HIDE = `hide${EVENT_KEY}`;
  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
  const CLASS_NAME_SHOW = 'show';
  const CLASS_NAME_COLLAPSE = 'collapse';
  const CLASS_NAME_COLLAPSING = 'collapsing';
  const CLASS_NAME_COLLAPSED = 'collapsed';
  const CLASS_NAME_DEEPER_CHILDREN = `:scope .${CLASS_NAME_COLLAPSE} .${CLASS_NAME_COLLAPSE}`;
  const CLASS_NAME_HORIZONTAL = 'collapse-horizontal';
  const WIDTH = 'width';
  const HEIGHT = 'height';
  const SELECTOR_ACTIVES = '.collapse.show, .collapse.collapsing';
  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="collapse"]';
  const Default = {
    parent: null,
    toggle: true
  };
  const DefaultType = {
    parent: '(null|element)',
    toggle: 'boolean'
  };
  /**
   * Class definition
   */

  class Collapse extends BaseComponent__default.default {
    constructor(element, config) {
      super(element, config);
      this._isTransitioning = false;
      this._triggerArray = [];
      const toggleList = SelectorEngine__default.default.find(SELECTOR_DATA_TOGGLE);

      for (const elem of toggleList) {
        const selector = index.getSelectorFromElement(elem);
        const filterElement = SelectorEngine__default.default.find(selector).filter(foundElement => foundElement === this._element);

        if (selector !== null && filterElement.length) {
          this._triggerArray.push(elem);
        }
      }

      this._initializeChildren();

      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
      }

      if (this._config.toggle) {
        this.toggle();
      }
    } // Getters


    static get Default() {
      return Default;
    }

    static get DefaultType() {
      return DefaultType;
    }

    static get NAME() {
      return NAME;
    } // Public


    toggle() {
      if (this._isShown()) {
        this.hide();
      } else {
        this.show();
      }
    }

    show() {
      if (this._isTransitioning || this._isShown()) {
        return;
      }

      let activeChildren = []; // find active children

      if (this._config.parent) {
        activeChildren = this._getFirstLevelChildren(SELECTOR_ACTIVES).filter(element => element !== this._element).map(element => Collapse.getOrCreateInstance(element, {
          toggle: false
        }));
      }

      if (activeChildren.length && activeChildren[0]._isTransitioning) {
        return;
      }

      const startEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW);

      if (startEvent.defaultPrevented) {
        return;
      }

      for (const activeInstance of activeChildren) {
        activeInstance.hide();
      }

      const dimension = this._getDimension();

      this._element.classList.remove(CLASS_NAME_COLLAPSE);

      this._element.classList.add(CLASS_NAME_COLLAPSING);

      this._element.style[dimension] = 0;

      this._addAriaAndCollapsedClass(this._triggerArray, true);

      this._isTransitioning = true;

      const complete = () => {
        this._isTransitioning = false;

        this._element.classList.remove(CLASS_NAME_COLLAPSING);

        this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);

        this._element.style[dimension] = '';
        EventHandler__default.default.trigger(this._element, EVENT_SHOWN);
      };

      const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      const scrollSize = `scroll${capitalizedDimension}`;

      this._queueCallback(complete, this._element, true);

      this._element.style[dimension] = `${this._element[scrollSize]}px`;
    }

    hide() {
      if (this._isTransitioning || !this._isShown()) {
        return;
      }

      const startEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE);

      if (startEvent.defaultPrevented) {
        return;
      }

      const dimension = this._getDimension();

      this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;
      index.reflow(this._element);

      this._element.classList.add(CLASS_NAME_COLLAPSING);

      this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);

      for (const trigger of this._triggerArray) {
        const element = index.getElementFromSelector(trigger);

        if (element && !this._isShown(element)) {
          this._addAriaAndCollapsedClass([trigger], false);
        }
      }

      this._isTransitioning = true;

      const complete = () => {
        this._isTransitioning = false;

        this._element.classList.remove(CLASS_NAME_COLLAPSING);

        this._element.classList.add(CLASS_NAME_COLLAPSE);

        EventHandler__default.default.trigger(this._element, EVENT_HIDDEN);
      };

      this._element.style[dimension] = '';

      this._queueCallback(complete, this._element, true);
    }

    _isShown(element = this._element) {
      return element.classList.contains(CLASS_NAME_SHOW);
    } // Private


    _configAfterMerge(config) {
      config.toggle = Boolean(config.toggle); // Coerce string values

      config.parent = index.getElement(config.parent);
      return config;
    }

    _getDimension() {
      return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
    }

    _initializeChildren() {
      if (!this._config.parent) {
        return;
      }

      const children = this._getFirstLevelChildren(SELECTOR_DATA_TOGGLE);

      for (const element of children) {
        const selected = index.getElementFromSelector(element);

        if (selected) {
          this._addAriaAndCollapsedClass([element], this._isShown(selected));
        }
      }
    }

    _getFirstLevelChildren(selector) {
      const children = SelectorEngine__default.default.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent); // remove children if greater depth

      return SelectorEngine__default.default.find(selector, this._config.parent).filter(element => !children.includes(element));
    }

    _addAriaAndCollapsedClass(triggerArray, isOpen) {
      if (!triggerArray.length) {
        return;
      }

      for (const element of triggerArray) {
        element.classList.toggle(CLASS_NAME_COLLAPSED, !isOpen);
        element.setAttribute('aria-expanded', isOpen);
      }
    } // Static


    static jQueryInterface(config) {
      const _config = {};

      if (typeof config === 'string' && /show|hide/.test(config)) {
        _config.toggle = false;
      }

      return this.each(function () {
        const data = Collapse.getOrCreateInstance(this, _config);

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError(`No method named "${config}"`);
          }

          data[config]();
        }
      });
    }

  }
  /**
   * Data API implementation
   */


  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.target.tagName === 'A' || event.delegateTarget && event.delegateTarget.tagName === 'A') {
      event.preventDefault();
    }

    const selector = index.getSelectorFromElement(this);
    const selectorElements = SelectorEngine__default.default.find(selector);

    for (const element of selectorElements) {
      Collapse.getOrCreateInstance(element, {
        toggle: false
      }).toggle();
    }
  });
  /**
   * jQuery
   */

  index.defineJQueryPlugin(Collapse);

  return Collapse;

}));
//# sourceMappingURL=collapse.js.map


/***/ }),

/***/ "./node_modules/bootstrap/js/dist/dom/data.js":
/*!****************************************************!*\
  !*** ./node_modules/bootstrap/js/dist/dom/data.js ***!
  \****************************************************/
/***/ (function(module) {

/*!
  * Bootstrap data.js v5.2.2 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
   true ? module.exports = factory() :
  0;
})(this, (function () { 'use strict';

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.2): dom/data.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * Constants
   */
  const elementMap = new Map();
  const data = {
    set(element, key, instance) {
      if (!elementMap.has(element)) {
        elementMap.set(element, new Map());
      }

      const instanceMap = elementMap.get(element); // make it clear we only want one instance per element
      // can be removed later when multiple key/instances are fine to be used

      if (!instanceMap.has(key) && instanceMap.size !== 0) {
        // eslint-disable-next-line no-console
        console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
        return;
      }

      instanceMap.set(key, instance);
    },

    get(element, key) {
      if (elementMap.has(element)) {
        return elementMap.get(element).get(key) || null;
      }

      return null;
    },

    remove(element, key) {
      if (!elementMap.has(element)) {
        return;
      }

      const instanceMap = elementMap.get(element);
      instanceMap.delete(key); // free up element references if there are no instances left for an element

      if (instanceMap.size === 0) {
        elementMap.delete(element);
      }
    }

  };

  return data;

}));
//# sourceMappingURL=data.js.map


/***/ }),

/***/ "./node_modules/bootstrap/js/dist/dom/event-handler.js":
/*!*************************************************************!*\
  !*** ./node_modules/bootstrap/js/dist/dom/event-handler.js ***!
  \*************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*!
  * Bootstrap event-handler.js v5.2.2 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
   true ? module.exports = factory(__webpack_require__(/*! ../util/index */ "./node_modules/bootstrap/js/dist/util/index.js")) :
  0;
})(this, (function (index) { 'use strict';

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.2): dom/event-handler.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
  const stripNameRegex = /\..*/;
  const stripUidRegex = /::\d+$/;
  const eventRegistry = {}; // Events storage

  let uidEvent = 1;
  const customEvents = {
    mouseenter: 'mouseover',
    mouseleave: 'mouseout'
  };
  const nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);
  /**
   * Private methods
   */

  function makeEventUid(element, uid) {
    return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
  }

  function getElementEvents(element) {
    const uid = makeEventUid(element);
    element.uidEvent = uid;
    eventRegistry[uid] = eventRegistry[uid] || {};
    return eventRegistry[uid];
  }

  function bootstrapHandler(element, fn) {
    return function handler(event) {
      hydrateObj(event, {
        delegateTarget: element
      });

      if (handler.oneOff) {
        EventHandler.off(element, event.type, fn);
      }

      return fn.apply(element, [event]);
    };
  }

  function bootstrapDelegationHandler(element, selector, fn) {
    return function handler(event) {
      const domElements = element.querySelectorAll(selector);

      for (let {
        target
      } = event; target && target !== this; target = target.parentNode) {
        for (const domElement of domElements) {
          if (domElement !== target) {
            continue;
          }

          hydrateObj(event, {
            delegateTarget: target
          });

          if (handler.oneOff) {
            EventHandler.off(element, event.type, selector, fn);
          }

          return fn.apply(target, [event]);
        }
      }
    };
  }

  function findHandler(events, callable, delegationSelector = null) {
    return Object.values(events).find(event => event.callable === callable && event.delegationSelector === delegationSelector);
  }

  function normalizeParameters(originalTypeEvent, handler, delegationFunction) {
    const isDelegated = typeof handler === 'string'; // todo: tooltip passes `false` instead of selector, so we need to check

    const callable = isDelegated ? delegationFunction : handler || delegationFunction;
    let typeEvent = getTypeEvent(originalTypeEvent);

    if (!nativeEvents.has(typeEvent)) {
      typeEvent = originalTypeEvent;
    }

    return [isDelegated, callable, typeEvent];
  }

  function addHandler(element, originalTypeEvent, handler, delegationFunction, oneOff) {
    if (typeof originalTypeEvent !== 'string' || !element) {
      return;
    }

    let [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction); // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
    // this prevents the handler from being dispatched the same way as mouseover or mouseout does

    if (originalTypeEvent in customEvents) {
      const wrapFunction = fn => {
        return function (event) {
          if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
            return fn.call(this, event);
          }
        };
      };

      callable = wrapFunction(callable);
    }

    const events = getElementEvents(element);
    const handlers = events[typeEvent] || (events[typeEvent] = {});
    const previousFunction = findHandler(handlers, callable, isDelegated ? handler : null);

    if (previousFunction) {
      previousFunction.oneOff = previousFunction.oneOff && oneOff;
      return;
    }

    const uid = makeEventUid(callable, originalTypeEvent.replace(namespaceRegex, ''));
    const fn = isDelegated ? bootstrapDelegationHandler(element, handler, callable) : bootstrapHandler(element, callable);
    fn.delegationSelector = isDelegated ? handler : null;
    fn.callable = callable;
    fn.oneOff = oneOff;
    fn.uidEvent = uid;
    handlers[uid] = fn;
    element.addEventListener(typeEvent, fn, isDelegated);
  }

  function removeHandler(element, events, typeEvent, handler, delegationSelector) {
    const fn = findHandler(events[typeEvent], handler, delegationSelector);

    if (!fn) {
      return;
    }

    element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
    delete events[typeEvent][fn.uidEvent];
  }

  function removeNamespacedHandlers(element, events, typeEvent, namespace) {
    const storeElementEvent = events[typeEvent] || {};

    for (const handlerKey of Object.keys(storeElementEvent)) {
      if (handlerKey.includes(namespace)) {
        const event = storeElementEvent[handlerKey];
        removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
      }
    }
  }

  function getTypeEvent(event) {
    // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
    event = event.replace(stripNameRegex, '');
    return customEvents[event] || event;
  }

  const EventHandler = {
    on(element, event, handler, delegationFunction) {
      addHandler(element, event, handler, delegationFunction, false);
    },

    one(element, event, handler, delegationFunction) {
      addHandler(element, event, handler, delegationFunction, true);
    },

    off(element, originalTypeEvent, handler, delegationFunction) {
      if (typeof originalTypeEvent !== 'string' || !element) {
        return;
      }

      const [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
      const inNamespace = typeEvent !== originalTypeEvent;
      const events = getElementEvents(element);
      const storeElementEvent = events[typeEvent] || {};
      const isNamespace = originalTypeEvent.startsWith('.');

      if (typeof callable !== 'undefined') {
        // Simplest case: handler is passed, remove that listener ONLY.
        if (!Object.keys(storeElementEvent).length) {
          return;
        }

        removeHandler(element, events, typeEvent, callable, isDelegated ? handler : null);
        return;
      }

      if (isNamespace) {
        for (const elementEvent of Object.keys(events)) {
          removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
        }
      }

      for (const keyHandlers of Object.keys(storeElementEvent)) {
        const handlerKey = keyHandlers.replace(stripUidRegex, '');

        if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
          const event = storeElementEvent[keyHandlers];
          removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
        }
      }
    },

    trigger(element, event, args) {
      if (typeof event !== 'string' || !element) {
        return null;
      }

      const $ = index.getjQuery();
      const typeEvent = getTypeEvent(event);
      const inNamespace = event !== typeEvent;
      let jQueryEvent = null;
      let bubbles = true;
      let nativeDispatch = true;
      let defaultPrevented = false;

      if (inNamespace && $) {
        jQueryEvent = $.Event(event, args);
        $(element).trigger(jQueryEvent);
        bubbles = !jQueryEvent.isPropagationStopped();
        nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
        defaultPrevented = jQueryEvent.isDefaultPrevented();
      }

      let evt = new Event(event, {
        bubbles,
        cancelable: true
      });
      evt = hydrateObj(evt, args);

      if (defaultPrevented) {
        evt.preventDefault();
      }

      if (nativeDispatch) {
        element.dispatchEvent(evt);
      }

      if (evt.defaultPrevented && jQueryEvent) {
        jQueryEvent.preventDefault();
      }

      return evt;
    }

  };

  function hydrateObj(obj, meta) {
    for (const [key, value] of Object.entries(meta || {})) {
      try {
        obj[key] = value;
      } catch (_unused) {
        Object.defineProperty(obj, key, {
          configurable: true,

          get() {
            return value;
          }

        });
      }
    }

    return obj;
  }

  return EventHandler;

}));
//# sourceMappingURL=event-handler.js.map


/***/ }),

/***/ "./node_modules/bootstrap/js/dist/dom/manipulator.js":
/*!***********************************************************!*\
  !*** ./node_modules/bootstrap/js/dist/dom/manipulator.js ***!
  \***********************************************************/
/***/ (function(module) {

/*!
  * Bootstrap manipulator.js v5.2.2 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
   true ? module.exports = factory() :
  0;
})(this, (function () { 'use strict';

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.2): dom/manipulator.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  function normalizeData(value) {
    if (value === 'true') {
      return true;
    }

    if (value === 'false') {
      return false;
    }

    if (value === Number(value).toString()) {
      return Number(value);
    }

    if (value === '' || value === 'null') {
      return null;
    }

    if (typeof value !== 'string') {
      return value;
    }

    try {
      return JSON.parse(decodeURIComponent(value));
    } catch (_unused) {
      return value;
    }
  }

  function normalizeDataKey(key) {
    return key.replace(/[A-Z]/g, chr => `-${chr.toLowerCase()}`);
  }

  const Manipulator = {
    setDataAttribute(element, key, value) {
      element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
    },

    removeDataAttribute(element, key) {
      element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
    },

    getDataAttributes(element) {
      if (!element) {
        return {};
      }

      const attributes = {};
      const bsKeys = Object.keys(element.dataset).filter(key => key.startsWith('bs') && !key.startsWith('bsConfig'));

      for (const key of bsKeys) {
        let pureKey = key.replace(/^bs/, '');
        pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
        attributes[pureKey] = normalizeData(element.dataset[key]);
      }

      return attributes;
    },

    getDataAttribute(element, key) {
      return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
    }

  };

  return Manipulator;

}));
//# sourceMappingURL=manipulator.js.map


/***/ }),

/***/ "./node_modules/bootstrap/js/dist/dom/selector-engine.js":
/*!***************************************************************!*\
  !*** ./node_modules/bootstrap/js/dist/dom/selector-engine.js ***!
  \***************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*!
  * Bootstrap selector-engine.js v5.2.2 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
   true ? module.exports = factory(__webpack_require__(/*! ../util/index */ "./node_modules/bootstrap/js/dist/util/index.js")) :
  0;
})(this, (function (index) { 'use strict';

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.2): dom/selector-engine.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const SelectorEngine = {
    find(selector, element = document.documentElement) {
      return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
    },

    findOne(selector, element = document.documentElement) {
      return Element.prototype.querySelector.call(element, selector);
    },

    children(element, selector) {
      return [].concat(...element.children).filter(child => child.matches(selector));
    },

    parents(element, selector) {
      const parents = [];
      let ancestor = element.parentNode.closest(selector);

      while (ancestor) {
        parents.push(ancestor);
        ancestor = ancestor.parentNode.closest(selector);
      }

      return parents;
    },

    prev(element, selector) {
      let previous = element.previousElementSibling;

      while (previous) {
        if (previous.matches(selector)) {
          return [previous];
        }

        previous = previous.previousElementSibling;
      }

      return [];
    },

    // TODO: this is now unused; remove later along with prev()
    next(element, selector) {
      let next = element.nextElementSibling;

      while (next) {
        if (next.matches(selector)) {
          return [next];
        }

        next = next.nextElementSibling;
      }

      return [];
    },

    focusableChildren(element) {
      const focusables = ['a', 'button', 'input', 'textarea', 'select', 'details', '[tabindex]', '[contenteditable="true"]'].map(selector => `${selector}:not([tabindex^="-"])`).join(',');
      return this.find(focusables, element).filter(el => !index.isDisabled(el) && index.isVisible(el));
    }

  };

  return SelectorEngine;

}));
//# sourceMappingURL=selector-engine.js.map


/***/ }),

/***/ "./node_modules/bootstrap/js/dist/dropdown.js":
/*!****************************************************!*\
  !*** ./node_modules/bootstrap/js/dist/dropdown.js ***!
  \****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*!
  * Bootstrap dropdown.js v5.2.2 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
   true ? module.exports = factory(__webpack_require__(/*! @popperjs/core */ "./node_modules/@popperjs/core/lib/index.js"), __webpack_require__(/*! ./util/index */ "./node_modules/bootstrap/js/dist/util/index.js"), __webpack_require__(/*! ./dom/event-handler */ "./node_modules/bootstrap/js/dist/dom/event-handler.js"), __webpack_require__(/*! ./dom/manipulator */ "./node_modules/bootstrap/js/dist/dom/manipulator.js"), __webpack_require__(/*! ./dom/selector-engine */ "./node_modules/bootstrap/js/dist/dom/selector-engine.js"), __webpack_require__(/*! ./base-component */ "./node_modules/bootstrap/js/dist/base-component.js")) :
  0;
})(this, (function (Popper, index, EventHandler, Manipulator, SelectorEngine, BaseComponent) { 'use strict';

  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    const n = Object.create(null, { [Symbol.toStringTag]: { value: 'Module' } });
    if (e) {
      for (const k in e) {
        if (k !== 'default') {
          const d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: () => e[k]
          });
        }
      }
    }
    n.default = e;
    return Object.freeze(n);
  }

  const Popper__namespace = /*#__PURE__*/_interopNamespace(Popper);
  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);
  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.2): dropdown.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME = 'dropdown';
  const DATA_KEY = 'bs.dropdown';
  const EVENT_KEY = `.${DATA_KEY}`;
  const DATA_API_KEY = '.data-api';
  const ESCAPE_KEY = 'Escape';
  const TAB_KEY = 'Tab';
  const ARROW_UP_KEY = 'ArrowUp';
  const ARROW_DOWN_KEY = 'ArrowDown';
  const RIGHT_MOUSE_BUTTON = 2; // MouseEvent.button value for the secondary button, usually the right button

  const EVENT_HIDE = `hide${EVENT_KEY}`;
  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
  const EVENT_SHOW = `show${EVENT_KEY}`;
  const EVENT_SHOWN = `shown${EVENT_KEY}`;
  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
  const EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY}${DATA_API_KEY}`;
  const EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY}${DATA_API_KEY}`;
  const CLASS_NAME_SHOW = 'show';
  const CLASS_NAME_DROPUP = 'dropup';
  const CLASS_NAME_DROPEND = 'dropend';
  const CLASS_NAME_DROPSTART = 'dropstart';
  const CLASS_NAME_DROPUP_CENTER = 'dropup-center';
  const CLASS_NAME_DROPDOWN_CENTER = 'dropdown-center';
  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)';
  const SELECTOR_DATA_TOGGLE_SHOWN = `${SELECTOR_DATA_TOGGLE}.${CLASS_NAME_SHOW}`;
  const SELECTOR_MENU = '.dropdown-menu';
  const SELECTOR_NAVBAR = '.navbar';
  const SELECTOR_NAVBAR_NAV = '.navbar-nav';
  const SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
  const PLACEMENT_TOP = index.isRTL() ? 'top-end' : 'top-start';
  const PLACEMENT_TOPEND = index.isRTL() ? 'top-start' : 'top-end';
  const PLACEMENT_BOTTOM = index.isRTL() ? 'bottom-end' : 'bottom-start';
  const PLACEMENT_BOTTOMEND = index.isRTL() ? 'bottom-start' : 'bottom-end';
  const PLACEMENT_RIGHT = index.isRTL() ? 'left-start' : 'right-start';
  const PLACEMENT_LEFT = index.isRTL() ? 'right-start' : 'left-start';
  const PLACEMENT_TOPCENTER = 'top';
  const PLACEMENT_BOTTOMCENTER = 'bottom';
  const Default = {
    autoClose: true,
    boundary: 'clippingParents',
    display: 'dynamic',
    offset: [0, 2],
    popperConfig: null,
    reference: 'toggle'
  };
  const DefaultType = {
    autoClose: '(boolean|string)',
    boundary: '(string|element)',
    display: 'string',
    offset: '(array|string|function)',
    popperConfig: '(null|object|function)',
    reference: '(string|element|object)'
  };
  /**
   * Class definition
   */

  class Dropdown extends BaseComponent__default.default {
    constructor(element, config) {
      super(element, config);
      this._popper = null;
      this._parent = this._element.parentNode; // dropdown wrapper
      // todo: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.2/forms/input-group/

      this._menu = SelectorEngine__default.default.next(this._element, SELECTOR_MENU)[0] || SelectorEngine__default.default.prev(this._element, SELECTOR_MENU)[0] || SelectorEngine__default.default.findOne(SELECTOR_MENU, this._parent);
      this._inNavbar = this._detectNavbar();
    } // Getters


    static get Default() {
      return Default;
    }

    static get DefaultType() {
      return DefaultType;
    }

    static get NAME() {
      return NAME;
    } // Public


    toggle() {
      return this._isShown() ? this.hide() : this.show();
    }

    show() {
      if (index.isDisabled(this._element) || this._isShown()) {
        return;
      }

      const relatedTarget = {
        relatedTarget: this._element
      };
      const showEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW, relatedTarget);

      if (showEvent.defaultPrevented) {
        return;
      }

      this._createPopper(); // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


      if ('ontouchstart' in document.documentElement && !this._parent.closest(SELECTOR_NAVBAR_NAV)) {
        for (const element of [].concat(...document.body.children)) {
          EventHandler__default.default.on(element, 'mouseover', index.noop);
        }
      }

      this._element.focus();

      this._element.setAttribute('aria-expanded', true);

      this._menu.classList.add(CLASS_NAME_SHOW);

      this._element.classList.add(CLASS_NAME_SHOW);

      EventHandler__default.default.trigger(this._element, EVENT_SHOWN, relatedTarget);
    }

    hide() {
      if (index.isDisabled(this._element) || !this._isShown()) {
        return;
      }

      const relatedTarget = {
        relatedTarget: this._element
      };

      this._completeHide(relatedTarget);
    }

    dispose() {
      if (this._popper) {
        this._popper.destroy();
      }

      super.dispose();
    }

    update() {
      this._inNavbar = this._detectNavbar();

      if (this._popper) {
        this._popper.update();
      }
    } // Private


    _completeHide(relatedTarget) {
      const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE, relatedTarget);

      if (hideEvent.defaultPrevented) {
        return;
      } // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support


      if ('ontouchstart' in document.documentElement) {
        for (const element of [].concat(...document.body.children)) {
          EventHandler__default.default.off(element, 'mouseover', index.noop);
        }
      }

      if (this._popper) {
        this._popper.destroy();
      }

      this._menu.classList.remove(CLASS_NAME_SHOW);

      this._element.classList.remove(CLASS_NAME_SHOW);

      this._element.setAttribute('aria-expanded', 'false');

      Manipulator__default.default.removeDataAttribute(this._menu, 'popper');
      EventHandler__default.default.trigger(this._element, EVENT_HIDDEN, relatedTarget);
    }

    _getConfig(config) {
      config = super._getConfig(config);

      if (typeof config.reference === 'object' && !index.isElement(config.reference) && typeof config.reference.getBoundingClientRect !== 'function') {
        // Popper virtual elements require a getBoundingClientRect method
        throw new TypeError(`${NAME.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
      }

      return config;
    }

    _createPopper() {
      if (typeof Popper__namespace === 'undefined') {
        throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org)');
      }

      let referenceElement = this._element;

      if (this._config.reference === 'parent') {
        referenceElement = this._parent;
      } else if (index.isElement(this._config.reference)) {
        referenceElement = index.getElement(this._config.reference);
      } else if (typeof this._config.reference === 'object') {
        referenceElement = this._config.reference;
      }

      const popperConfig = this._getPopperConfig();

      this._popper = Popper__namespace.createPopper(referenceElement, this._menu, popperConfig);
    }

    _isShown() {
      return this._menu.classList.contains(CLASS_NAME_SHOW);
    }

    _getPlacement() {
      const parentDropdown = this._parent;

      if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
        return PLACEMENT_RIGHT;
      }

      if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
        return PLACEMENT_LEFT;
      }

      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP_CENTER)) {
        return PLACEMENT_TOPCENTER;
      }

      if (parentDropdown.classList.contains(CLASS_NAME_DROPDOWN_CENTER)) {
        return PLACEMENT_BOTTOMCENTER;
      } // We need to trim the value because custom properties can also include spaces


      const isEnd = getComputedStyle(this._menu).getPropertyValue('--bs-position').trim() === 'end';

      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
        return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
      }

      return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
    }

    _detectNavbar() {
      return this._element.closest(SELECTOR_NAVBAR) !== null;
    }

    _getOffset() {
      const {
        offset
      } = this._config;

      if (typeof offset === 'string') {
        return offset.split(',').map(value => Number.parseInt(value, 10));
      }

      if (typeof offset === 'function') {
        return popperData => offset(popperData, this._element);
      }

      return offset;
    }

    _getPopperConfig() {
      const defaultBsPopperConfig = {
        placement: this._getPlacement(),
        modifiers: [{
          name: 'preventOverflow',
          options: {
            boundary: this._config.boundary
          }
        }, {
          name: 'offset',
          options: {
            offset: this._getOffset()
          }
        }]
      }; // Disable Popper if we have a static display or Dropdown is in Navbar

      if (this._inNavbar || this._config.display === 'static') {
        Manipulator__default.default.setDataAttribute(this._menu, 'popper', 'static'); // todo:v6 remove

        defaultBsPopperConfig.modifiers = [{
          name: 'applyStyles',
          enabled: false
        }];
      }

      return { ...defaultBsPopperConfig,
        ...(typeof this._config.popperConfig === 'function' ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig)
      };
    }

    _selectMenuItem({
      key,
      target
    }) {
      const items = SelectorEngine__default.default.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter(element => index.isVisible(element));

      if (!items.length) {
        return;
      } // if target isn't included in items (e.g. when expanding the dropdown)
      // allow cycling to get the last item in case key equals ARROW_UP_KEY


      index.getNextActiveElement(items, target, key === ARROW_DOWN_KEY, !items.includes(target)).focus();
    } // Static


    static jQueryInterface(config) {
      return this.each(function () {
        const data = Dropdown.getOrCreateInstance(this, config);

        if (typeof config !== 'string') {
          return;
        }

        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }

        data[config]();
      });
    }

    static clearMenus(event) {
      if (event.button === RIGHT_MOUSE_BUTTON || event.type === 'keyup' && event.key !== TAB_KEY) {
        return;
      }

      const openToggles = SelectorEngine__default.default.find(SELECTOR_DATA_TOGGLE_SHOWN);

      for (const toggle of openToggles) {
        const context = Dropdown.getInstance(toggle);

        if (!context || context._config.autoClose === false) {
          continue;
        }

        const composedPath = event.composedPath();
        const isMenuTarget = composedPath.includes(context._menu);

        if (composedPath.includes(context._element) || context._config.autoClose === 'inside' && !isMenuTarget || context._config.autoClose === 'outside' && isMenuTarget) {
          continue;
        } // Tab navigation through the dropdown menu or events from contained inputs shouldn't close the menu


        if (context._menu.contains(event.target) && (event.type === 'keyup' && event.key === TAB_KEY || /input|select|option|textarea|form/i.test(event.target.tagName))) {
          continue;
        }

        const relatedTarget = {
          relatedTarget: context._element
        };

        if (event.type === 'click') {
          relatedTarget.clickEvent = event;
        }

        context._completeHide(relatedTarget);
      }
    }

    static dataApiKeydownHandler(event) {
      // If not an UP | DOWN | ESCAPE key => not a dropdown command
      // If input/textarea && if key is other than ESCAPE => not a dropdown command
      const isInput = /input|textarea/i.test(event.target.tagName);
      const isEscapeEvent = event.key === ESCAPE_KEY;
      const isUpOrDownEvent = [ARROW_UP_KEY, ARROW_DOWN_KEY].includes(event.key);

      if (!isUpOrDownEvent && !isEscapeEvent) {
        return;
      }

      if (isInput && !isEscapeEvent) {
        return;
      }

      event.preventDefault(); // todo: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.2/forms/input-group/

      const getToggleButton = this.matches(SELECTOR_DATA_TOGGLE) ? this : SelectorEngine__default.default.prev(this, SELECTOR_DATA_TOGGLE)[0] || SelectorEngine__default.default.next(this, SELECTOR_DATA_TOGGLE)[0] || SelectorEngine__default.default.findOne(SELECTOR_DATA_TOGGLE, event.delegateTarget.parentNode);
      const instance = Dropdown.getOrCreateInstance(getToggleButton);

      if (isUpOrDownEvent) {
        event.stopPropagation();
        instance.show();

        instance._selectMenuItem(event);

        return;
      }

      if (instance._isShown()) {
        // else is escape and we check if it is shown
        event.stopPropagation();
        instance.hide();
        getToggleButton.focus();
      }
    }

  }
  /**
   * Data API implementation
   */


  EventHandler__default.default.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE, Dropdown.dataApiKeydownHandler);
  EventHandler__default.default.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, Dropdown.clearMenus);
  EventHandler__default.default.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
    event.preventDefault();
    Dropdown.getOrCreateInstance(this).toggle();
  });
  /**
   * jQuery
   */

  index.defineJQueryPlugin(Dropdown);

  return Dropdown;

}));
//# sourceMappingURL=dropdown.js.map


/***/ }),

/***/ "./node_modules/bootstrap/js/dist/tooltip.js":
/*!***************************************************!*\
  !*** ./node_modules/bootstrap/js/dist/tooltip.js ***!
  \***************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*!
  * Bootstrap tooltip.js v5.2.2 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
   true ? module.exports = factory(__webpack_require__(/*! @popperjs/core */ "./node_modules/@popperjs/core/lib/index.js"), __webpack_require__(/*! ./util/index */ "./node_modules/bootstrap/js/dist/util/index.js"), __webpack_require__(/*! ./util/sanitizer */ "./node_modules/bootstrap/js/dist/util/sanitizer.js"), __webpack_require__(/*! ./dom/event-handler */ "./node_modules/bootstrap/js/dist/dom/event-handler.js"), __webpack_require__(/*! ./dom/manipulator */ "./node_modules/bootstrap/js/dist/dom/manipulator.js"), __webpack_require__(/*! ./base-component */ "./node_modules/bootstrap/js/dist/base-component.js"), __webpack_require__(/*! ./util/template-factory */ "./node_modules/bootstrap/js/dist/util/template-factory.js")) :
  0;
})(this, (function (Popper, index, sanitizer, EventHandler, Manipulator, BaseComponent, TemplateFactory) { 'use strict';

  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    const n = Object.create(null, { [Symbol.toStringTag]: { value: 'Module' } });
    if (e) {
      for (const k in e) {
        if (k !== 'default') {
          const d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: () => e[k]
          });
        }
      }
    }
    n.default = e;
    return Object.freeze(n);
  }

  const Popper__namespace = /*#__PURE__*/_interopNamespace(Popper);
  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);
  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
  const TemplateFactory__default = /*#__PURE__*/_interopDefaultLegacy(TemplateFactory);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.2): tooltip.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME = 'tooltip';
  const DISALLOWED_ATTRIBUTES = new Set(['sanitize', 'allowList', 'sanitizeFn']);
  const CLASS_NAME_FADE = 'fade';
  const CLASS_NAME_MODAL = 'modal';
  const CLASS_NAME_SHOW = 'show';
  const SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
  const SELECTOR_MODAL = `.${CLASS_NAME_MODAL}`;
  const EVENT_MODAL_HIDE = 'hide.bs.modal';
  const TRIGGER_HOVER = 'hover';
  const TRIGGER_FOCUS = 'focus';
  const TRIGGER_CLICK = 'click';
  const TRIGGER_MANUAL = 'manual';
  const EVENT_HIDE = 'hide';
  const EVENT_HIDDEN = 'hidden';
  const EVENT_SHOW = 'show';
  const EVENT_SHOWN = 'shown';
  const EVENT_INSERTED = 'inserted';
  const EVENT_CLICK = 'click';
  const EVENT_FOCUSIN = 'focusin';
  const EVENT_FOCUSOUT = 'focusout';
  const EVENT_MOUSEENTER = 'mouseenter';
  const EVENT_MOUSELEAVE = 'mouseleave';
  const AttachmentMap = {
    AUTO: 'auto',
    TOP: 'top',
    RIGHT: index.isRTL() ? 'left' : 'right',
    BOTTOM: 'bottom',
    LEFT: index.isRTL() ? 'right' : 'left'
  };
  const Default = {
    allowList: sanitizer.DefaultAllowlist,
    animation: true,
    boundary: 'clippingParents',
    container: false,
    customClass: '',
    delay: 0,
    fallbackPlacements: ['top', 'right', 'bottom', 'left'],
    html: false,
    offset: [0, 0],
    placement: 'top',
    popperConfig: null,
    sanitize: true,
    sanitizeFn: null,
    selector: false,
    template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div>' + '</div>',
    title: '',
    trigger: 'hover focus'
  };
  const DefaultType = {
    allowList: 'object',
    animation: 'boolean',
    boundary: '(string|element)',
    container: '(string|element|boolean)',
    customClass: '(string|function)',
    delay: '(number|object)',
    fallbackPlacements: 'array',
    html: 'boolean',
    offset: '(array|string|function)',
    placement: '(string|function)',
    popperConfig: '(null|object|function)',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    selector: '(string|boolean)',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string'
  };
  /**
   * Class definition
   */

  class Tooltip extends BaseComponent__default.default {
    constructor(element, config) {
      if (typeof Popper__namespace === 'undefined') {
        throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org)');
      }

      super(element, config); // Private

      this._isEnabled = true;
      this._timeout = 0;
      this._isHovered = null;
      this._activeTrigger = {};
      this._popper = null;
      this._templateFactory = null;
      this._newContent = null; // Protected

      this.tip = null;

      this._setListeners();

      if (!this._config.selector) {
        this._fixTitle();
      }
    } // Getters


    static get Default() {
      return Default;
    }

    static get DefaultType() {
      return DefaultType;
    }

    static get NAME() {
      return NAME;
    } // Public


    enable() {
      this._isEnabled = true;
    }

    disable() {
      this._isEnabled = false;
    }

    toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    }

    toggle() {
      if (!this._isEnabled) {
        return;
      }

      this._activeTrigger.click = !this._activeTrigger.click;

      if (this._isShown()) {
        this._leave();

        return;
      }

      this._enter();
    }

    dispose() {
      clearTimeout(this._timeout);
      EventHandler__default.default.off(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);

      if (this.tip) {
        this.tip.remove();
      }

      if (this._element.getAttribute('data-bs-original-title')) {
        this._element.setAttribute('title', this._element.getAttribute('data-bs-original-title'));
      }

      this._disposePopper();

      super.dispose();
    }

    show() {
      if (this._element.style.display === 'none') {
        throw new Error('Please use show on visible elements');
      }

      if (!(this._isWithContent() && this._isEnabled)) {
        return;
      }

      const showEvent = EventHandler__default.default.trigger(this._element, this.constructor.eventName(EVENT_SHOW));
      const shadowRoot = index.findShadowRoot(this._element);

      const isInTheDom = (shadowRoot || this._element.ownerDocument.documentElement).contains(this._element);

      if (showEvent.defaultPrevented || !isInTheDom) {
        return;
      } // todo v6 remove this OR make it optional


      if (this.tip) {
        this.tip.remove();
        this.tip = null;
      }

      const tip = this._getTipElement();

      this._element.setAttribute('aria-describedby', tip.getAttribute('id'));

      const {
        container
      } = this._config;

      if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
        container.append(tip);
        EventHandler__default.default.trigger(this._element, this.constructor.eventName(EVENT_INSERTED));
      }

      if (this._popper) {
        this._popper.update();
      } else {
        this._popper = this._createPopper(tip);
      }

      tip.classList.add(CLASS_NAME_SHOW); // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

      if ('ontouchstart' in document.documentElement) {
        for (const element of [].concat(...document.body.children)) {
          EventHandler__default.default.on(element, 'mouseover', index.noop);
        }
      }

      const complete = () => {
        EventHandler__default.default.trigger(this._element, this.constructor.eventName(EVENT_SHOWN));

        if (this._isHovered === false) {
          this._leave();
        }

        this._isHovered = false;
      };

      this._queueCallback(complete, this.tip, this._isAnimated());
    }

    hide() {
      if (!this._isShown()) {
        return;
      }

      const hideEvent = EventHandler__default.default.trigger(this._element, this.constructor.eventName(EVENT_HIDE));

      if (hideEvent.defaultPrevented) {
        return;
      }

      const tip = this._getTipElement();

      tip.classList.remove(CLASS_NAME_SHOW); // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support

      if ('ontouchstart' in document.documentElement) {
        for (const element of [].concat(...document.body.children)) {
          EventHandler__default.default.off(element, 'mouseover', index.noop);
        }
      }

      this._activeTrigger[TRIGGER_CLICK] = false;
      this._activeTrigger[TRIGGER_FOCUS] = false;
      this._activeTrigger[TRIGGER_HOVER] = false;
      this._isHovered = null; // it is a trick to support manual triggering

      const complete = () => {
        if (this._isWithActiveTrigger()) {
          return;
        }

        if (!this._isHovered) {
          tip.remove();
        }

        this._element.removeAttribute('aria-describedby');

        EventHandler__default.default.trigger(this._element, this.constructor.eventName(EVENT_HIDDEN));

        this._disposePopper();
      };

      this._queueCallback(complete, this.tip, this._isAnimated());
    }

    update() {
      if (this._popper) {
        this._popper.update();
      }
    } // Protected


    _isWithContent() {
      return Boolean(this._getTitle());
    }

    _getTipElement() {
      if (!this.tip) {
        this.tip = this._createTipElement(this._newContent || this._getContentForTemplate());
      }

      return this.tip;
    }

    _createTipElement(content) {
      const tip = this._getTemplateFactory(content).toHtml(); // todo: remove this check on v6


      if (!tip) {
        return null;
      }

      tip.classList.remove(CLASS_NAME_FADE, CLASS_NAME_SHOW); // todo: on v6 the following can be achieved with CSS only

      tip.classList.add(`bs-${this.constructor.NAME}-auto`);
      const tipId = index.getUID(this.constructor.NAME).toString();
      tip.setAttribute('id', tipId);

      if (this._isAnimated()) {
        tip.classList.add(CLASS_NAME_FADE);
      }

      return tip;
    }

    setContent(content) {
      this._newContent = content;

      if (this._isShown()) {
        this._disposePopper();

        this.show();
      }
    }

    _getTemplateFactory(content) {
      if (this._templateFactory) {
        this._templateFactory.changeContent(content);
      } else {
        this._templateFactory = new TemplateFactory__default.default({ ...this._config,
          // the `content` var has to be after `this._config`
          // to override config.content in case of popover
          content,
          extraClass: this._resolvePossibleFunction(this._config.customClass)
        });
      }

      return this._templateFactory;
    }

    _getContentForTemplate() {
      return {
        [SELECTOR_TOOLTIP_INNER]: this._getTitle()
      };
    }

    _getTitle() {
      return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute('data-bs-original-title');
    } // Private


    _initializeOnDelegatedTarget(event) {
      return this.constructor.getOrCreateInstance(event.delegateTarget, this._getDelegateConfig());
    }

    _isAnimated() {
      return this._config.animation || this.tip && this.tip.classList.contains(CLASS_NAME_FADE);
    }

    _isShown() {
      return this.tip && this.tip.classList.contains(CLASS_NAME_SHOW);
    }

    _createPopper(tip) {
      const placement = typeof this._config.placement === 'function' ? this._config.placement.call(this, tip, this._element) : this._config.placement;
      const attachment = AttachmentMap[placement.toUpperCase()];
      return Popper__namespace.createPopper(this._element, tip, this._getPopperConfig(attachment));
    }

    _getOffset() {
      const {
        offset
      } = this._config;

      if (typeof offset === 'string') {
        return offset.split(',').map(value => Number.parseInt(value, 10));
      }

      if (typeof offset === 'function') {
        return popperData => offset(popperData, this._element);
      }

      return offset;
    }

    _resolvePossibleFunction(arg) {
      return typeof arg === 'function' ? arg.call(this._element) : arg;
    }

    _getPopperConfig(attachment) {
      const defaultBsPopperConfig = {
        placement: attachment,
        modifiers: [{
          name: 'flip',
          options: {
            fallbackPlacements: this._config.fallbackPlacements
          }
        }, {
          name: 'offset',
          options: {
            offset: this._getOffset()
          }
        }, {
          name: 'preventOverflow',
          options: {
            boundary: this._config.boundary
          }
        }, {
          name: 'arrow',
          options: {
            element: `.${this.constructor.NAME}-arrow`
          }
        }, {
          name: 'preSetPlacement',
          enabled: true,
          phase: 'beforeMain',
          fn: data => {
            // Pre-set Popper's placement attribute in order to read the arrow sizes properly.
            // Otherwise, Popper mixes up the width and height dimensions since the initial arrow style is for top placement
            this._getTipElement().setAttribute('data-popper-placement', data.state.placement);
          }
        }]
      };
      return { ...defaultBsPopperConfig,
        ...(typeof this._config.popperConfig === 'function' ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig)
      };
    }

    _setListeners() {
      const triggers = this._config.trigger.split(' ');

      for (const trigger of triggers) {
        if (trigger === 'click') {
          EventHandler__default.default.on(this._element, this.constructor.eventName(EVENT_CLICK), this._config.selector, event => {
            const context = this._initializeOnDelegatedTarget(event);

            context.toggle();
          });
        } else if (trigger !== TRIGGER_MANUAL) {
          const eventIn = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSEENTER) : this.constructor.eventName(EVENT_FOCUSIN);
          const eventOut = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSELEAVE) : this.constructor.eventName(EVENT_FOCUSOUT);
          EventHandler__default.default.on(this._element, eventIn, this._config.selector, event => {
            const context = this._initializeOnDelegatedTarget(event);

            context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;

            context._enter();
          });
          EventHandler__default.default.on(this._element, eventOut, this._config.selector, event => {
            const context = this._initializeOnDelegatedTarget(event);

            context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);

            context._leave();
          });
        }
      }

      this._hideModalHandler = () => {
        if (this._element) {
          this.hide();
        }
      };

      EventHandler__default.default.on(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
    }

    _fixTitle() {
      const title = this._element.getAttribute('title');

      if (!title) {
        return;
      }

      if (!this._element.getAttribute('aria-label') && !this._element.textContent.trim()) {
        this._element.setAttribute('aria-label', title);
      }

      this._element.setAttribute('data-bs-original-title', title); // DO NOT USE IT. Is only for backwards compatibility


      this._element.removeAttribute('title');
    }

    _enter() {
      if (this._isShown() || this._isHovered) {
        this._isHovered = true;
        return;
      }

      this._isHovered = true;

      this._setTimeout(() => {
        if (this._isHovered) {
          this.show();
        }
      }, this._config.delay.show);
    }

    _leave() {
      if (this._isWithActiveTrigger()) {
        return;
      }

      this._isHovered = false;

      this._setTimeout(() => {
        if (!this._isHovered) {
          this.hide();
        }
      }, this._config.delay.hide);
    }

    _setTimeout(handler, timeout) {
      clearTimeout(this._timeout);
      this._timeout = setTimeout(handler, timeout);
    }

    _isWithActiveTrigger() {
      return Object.values(this._activeTrigger).includes(true);
    }

    _getConfig(config) {
      const dataAttributes = Manipulator__default.default.getDataAttributes(this._element);

      for (const dataAttribute of Object.keys(dataAttributes)) {
        if (DISALLOWED_ATTRIBUTES.has(dataAttribute)) {
          delete dataAttributes[dataAttribute];
        }
      }

      config = { ...dataAttributes,
        ...(typeof config === 'object' && config ? config : {})
      };
      config = this._mergeConfigObj(config);
      config = this._configAfterMerge(config);

      this._typeCheckConfig(config);

      return config;
    }

    _configAfterMerge(config) {
      config.container = config.container === false ? document.body : index.getElement(config.container);

      if (typeof config.delay === 'number') {
        config.delay = {
          show: config.delay,
          hide: config.delay
        };
      }

      if (typeof config.title === 'number') {
        config.title = config.title.toString();
      }

      if (typeof config.content === 'number') {
        config.content = config.content.toString();
      }

      return config;
    }

    _getDelegateConfig() {
      const config = {};

      for (const key in this._config) {
        if (this.constructor.Default[key] !== this._config[key]) {
          config[key] = this._config[key];
        }
      }

      config.selector = false;
      config.trigger = 'manual'; // In the future can be replaced with:
      // const keysWithDifferentValues = Object.entries(this._config).filter(entry => this.constructor.Default[entry[0]] !== this._config[entry[0]])
      // `Object.fromEntries(keysWithDifferentValues)`

      return config;
    }

    _disposePopper() {
      if (this._popper) {
        this._popper.destroy();

        this._popper = null;
      }
    } // Static


    static jQueryInterface(config) {
      return this.each(function () {
        const data = Tooltip.getOrCreateInstance(this, config);

        if (typeof config !== 'string') {
          return;
        }

        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }

        data[config]();
      });
    }

  }
  /**
   * jQuery
   */


  index.defineJQueryPlugin(Tooltip);

  return Tooltip;

}));
//# sourceMappingURL=tooltip.js.map


/***/ }),

/***/ "./node_modules/bootstrap/js/dist/util/component-functions.js":
/*!********************************************************************!*\
  !*** ./node_modules/bootstrap/js/dist/util/component-functions.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/*!
  * Bootstrap component-functions.js v5.2.2 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
   true ? factory(exports, __webpack_require__(/*! ../dom/event-handler */ "./node_modules/bootstrap/js/dist/dom/event-handler.js"), __webpack_require__(/*! ./index */ "./node_modules/bootstrap/js/dist/util/index.js")) :
  0;
})(this, (function (exports, EventHandler, index) { 'use strict';

  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.2): util/component-functions.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  const enableDismissTrigger = (component, method = 'hide') => {
    const clickEvent = `click.dismiss${component.EVENT_KEY}`;
    const name = component.NAME;
    EventHandler__default.default.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function (event) {
      if (['A', 'AREA'].includes(this.tagName)) {
        event.preventDefault();
      }

      if (index.isDisabled(this)) {
        return;
      }

      const target = index.getElementFromSelector(this) || this.closest(`.${name}`);
      const instance = component.getOrCreateInstance(target); // Method argument is left, for Alert and only, as it doesn't implement the 'hide' method

      instance[method]();
    });
  };

  exports.enableDismissTrigger = enableDismissTrigger;

  Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });

}));
//# sourceMappingURL=component-functions.js.map


/***/ }),

/***/ "./node_modules/bootstrap/js/dist/util/config.js":
/*!*******************************************************!*\
  !*** ./node_modules/bootstrap/js/dist/util/config.js ***!
  \*******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*!
  * Bootstrap config.js v5.2.2 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
   true ? module.exports = factory(__webpack_require__(/*! ./index */ "./node_modules/bootstrap/js/dist/util/index.js"), __webpack_require__(/*! ../dom/manipulator */ "./node_modules/bootstrap/js/dist/dom/manipulator.js")) :
  0;
})(this, (function (index, Manipulator) { 'use strict';

  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.2): util/config.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Class definition
   */

  class Config {
    // Getters
    static get Default() {
      return {};
    }

    static get DefaultType() {
      return {};
    }

    static get NAME() {
      throw new Error('You have to implement the static method "NAME", for each component!');
    }

    _getConfig(config) {
      config = this._mergeConfigObj(config);
      config = this._configAfterMerge(config);

      this._typeCheckConfig(config);

      return config;
    }

    _configAfterMerge(config) {
      return config;
    }

    _mergeConfigObj(config, element) {
      const jsonConfig = index.isElement(element) ? Manipulator__default.default.getDataAttribute(element, 'config') : {}; // try to parse

      return { ...this.constructor.Default,
        ...(typeof jsonConfig === 'object' ? jsonConfig : {}),
        ...(index.isElement(element) ? Manipulator__default.default.getDataAttributes(element) : {}),
        ...(typeof config === 'object' ? config : {})
      };
    }

    _typeCheckConfig(config, configTypes = this.constructor.DefaultType) {
      for (const property of Object.keys(configTypes)) {
        const expectedTypes = configTypes[property];
        const value = config[property];
        const valueType = index.isElement(value) ? 'element' : index.toType(value);

        if (!new RegExp(expectedTypes).test(valueType)) {
          throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
        }
      }
    }

  }

  return Config;

}));
//# sourceMappingURL=config.js.map


/***/ }),

/***/ "./node_modules/bootstrap/js/dist/util/index.js":
/*!******************************************************!*\
  !*** ./node_modules/bootstrap/js/dist/util/index.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports) {

/*!
  * Bootstrap index.js v5.2.2 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
   true ? factory(exports) :
  0;
})(this, (function (exports) { 'use strict';

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.2): util/index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  const MAX_UID = 1000000;
  const MILLISECONDS_MULTIPLIER = 1000;
  const TRANSITION_END = 'transitionend'; // Shout-out Angus Croll (https://goo.gl/pxwQGp)

  const toType = object => {
    if (object === null || object === undefined) {
      return `${object}`;
    }

    return Object.prototype.toString.call(object).match(/\s([a-z]+)/i)[1].toLowerCase();
  };
  /**
   * Public Util API
   */


  const getUID = prefix => {
    do {
      prefix += Math.floor(Math.random() * MAX_UID);
    } while (document.getElementById(prefix));

    return prefix;
  };

  const getSelector = element => {
    let selector = element.getAttribute('data-bs-target');

    if (!selector || selector === '#') {
      let hrefAttribute = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
      // `document.querySelector` will rightfully complain it is invalid.
      // See https://github.com/twbs/bootstrap/issues/32273

      if (!hrefAttribute || !hrefAttribute.includes('#') && !hrefAttribute.startsWith('.')) {
        return null;
      } // Just in case some CMS puts out a full URL with the anchor appended


      if (hrefAttribute.includes('#') && !hrefAttribute.startsWith('#')) {
        hrefAttribute = `#${hrefAttribute.split('#')[1]}`;
      }

      selector = hrefAttribute && hrefAttribute !== '#' ? hrefAttribute.trim() : null;
    }

    return selector;
  };

  const getSelectorFromElement = element => {
    const selector = getSelector(element);

    if (selector) {
      return document.querySelector(selector) ? selector : null;
    }

    return null;
  };

  const getElementFromSelector = element => {
    const selector = getSelector(element);
    return selector ? document.querySelector(selector) : null;
  };

  const getTransitionDurationFromElement = element => {
    if (!element) {
      return 0;
    } // Get transition-duration of the element


    let {
      transitionDuration,
      transitionDelay
    } = window.getComputedStyle(element);
    const floatTransitionDuration = Number.parseFloat(transitionDuration);
    const floatTransitionDelay = Number.parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

    if (!floatTransitionDuration && !floatTransitionDelay) {
      return 0;
    } // If multiple durations are defined, take the first


    transitionDuration = transitionDuration.split(',')[0];
    transitionDelay = transitionDelay.split(',')[0];
    return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
  };

  const triggerTransitionEnd = element => {
    element.dispatchEvent(new Event(TRANSITION_END));
  };

  const isElement = object => {
    if (!object || typeof object !== 'object') {
      return false;
    }

    if (typeof object.jquery !== 'undefined') {
      object = object[0];
    }

    return typeof object.nodeType !== 'undefined';
  };

  const getElement = object => {
    // it's a jQuery object or a node element
    if (isElement(object)) {
      return object.jquery ? object[0] : object;
    }

    if (typeof object === 'string' && object.length > 0) {
      return document.querySelector(object);
    }

    return null;
  };

  const isVisible = element => {
    if (!isElement(element) || element.getClientRects().length === 0) {
      return false;
    }

    const elementIsVisible = getComputedStyle(element).getPropertyValue('visibility') === 'visible'; // Handle `details` element as its content may falsie appear visible when it is closed

    const closedDetails = element.closest('details:not([open])');

    if (!closedDetails) {
      return elementIsVisible;
    }

    if (closedDetails !== element) {
      const summary = element.closest('summary');

      if (summary && summary.parentNode !== closedDetails) {
        return false;
      }

      if (summary === null) {
        return false;
      }
    }

    return elementIsVisible;
  };

  const isDisabled = element => {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      return true;
    }

    if (element.classList.contains('disabled')) {
      return true;
    }

    if (typeof element.disabled !== 'undefined') {
      return element.disabled;
    }

    return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
  };

  const findShadowRoot = element => {
    if (!document.documentElement.attachShadow) {
      return null;
    } // Can find the shadow root otherwise it'll return the document


    if (typeof element.getRootNode === 'function') {
      const root = element.getRootNode();
      return root instanceof ShadowRoot ? root : null;
    }

    if (element instanceof ShadowRoot) {
      return element;
    } // when we don't find a shadow root


    if (!element.parentNode) {
      return null;
    }

    return findShadowRoot(element.parentNode);
  };

  const noop = () => {};
  /**
   * Trick to restart an element's animation
   *
   * @param {HTMLElement} element
   * @return void
   *
   * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
   */


  const reflow = element => {
    element.offsetHeight; // eslint-disable-line no-unused-expressions
  };

  const getjQuery = () => {
    if (window.jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
      return window.jQuery;
    }

    return null;
  };

  const DOMContentLoadedCallbacks = [];

  const onDOMContentLoaded = callback => {
    if (document.readyState === 'loading') {
      // add listener on the first call when the document is in loading state
      if (!DOMContentLoadedCallbacks.length) {
        document.addEventListener('DOMContentLoaded', () => {
          for (const callback of DOMContentLoadedCallbacks) {
            callback();
          }
        });
      }

      DOMContentLoadedCallbacks.push(callback);
    } else {
      callback();
    }
  };

  const isRTL = () => document.documentElement.dir === 'rtl';

  const defineJQueryPlugin = plugin => {
    onDOMContentLoaded(() => {
      const $ = getjQuery();
      /* istanbul ignore if */

      if ($) {
        const name = plugin.NAME;
        const JQUERY_NO_CONFLICT = $.fn[name];
        $.fn[name] = plugin.jQueryInterface;
        $.fn[name].Constructor = plugin;

        $.fn[name].noConflict = () => {
          $.fn[name] = JQUERY_NO_CONFLICT;
          return plugin.jQueryInterface;
        };
      }
    });
  };

  const execute = callback => {
    if (typeof callback === 'function') {
      callback();
    }
  };

  const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
    if (!waitForTransition) {
      execute(callback);
      return;
    }

    const durationPadding = 5;
    const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
    let called = false;

    const handler = ({
      target
    }) => {
      if (target !== transitionElement) {
        return;
      }

      called = true;
      transitionElement.removeEventListener(TRANSITION_END, handler);
      execute(callback);
    };

    transitionElement.addEventListener(TRANSITION_END, handler);
    setTimeout(() => {
      if (!called) {
        triggerTransitionEnd(transitionElement);
      }
    }, emulatedDuration);
  };
  /**
   * Return the previous/next element of a list.
   *
   * @param {array} list    The list of elements
   * @param activeElement   The active element
   * @param shouldGetNext   Choose to get next or previous element
   * @param isCycleAllowed
   * @return {Element|elem} The proper element
   */


  const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
    const listLength = list.length;
    let index = list.indexOf(activeElement); // if the element does not exist in the list return an element
    // depending on the direction and if cycle is allowed

    if (index === -1) {
      return !shouldGetNext && isCycleAllowed ? list[listLength - 1] : list[0];
    }

    index += shouldGetNext ? 1 : -1;

    if (isCycleAllowed) {
      index = (index + listLength) % listLength;
    }

    return list[Math.max(0, Math.min(index, listLength - 1))];
  };

  exports.defineJQueryPlugin = defineJQueryPlugin;
  exports.execute = execute;
  exports.executeAfterTransition = executeAfterTransition;
  exports.findShadowRoot = findShadowRoot;
  exports.getElement = getElement;
  exports.getElementFromSelector = getElementFromSelector;
  exports.getNextActiveElement = getNextActiveElement;
  exports.getSelectorFromElement = getSelectorFromElement;
  exports.getTransitionDurationFromElement = getTransitionDurationFromElement;
  exports.getUID = getUID;
  exports.getjQuery = getjQuery;
  exports.isDisabled = isDisabled;
  exports.isElement = isElement;
  exports.isRTL = isRTL;
  exports.isVisible = isVisible;
  exports.noop = noop;
  exports.onDOMContentLoaded = onDOMContentLoaded;
  exports.reflow = reflow;
  exports.toType = toType;
  exports.triggerTransitionEnd = triggerTransitionEnd;

  Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });

}));
//# sourceMappingURL=index.js.map


/***/ }),

/***/ "./node_modules/bootstrap/js/dist/util/sanitizer.js":
/*!**********************************************************!*\
  !*** ./node_modules/bootstrap/js/dist/util/sanitizer.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports) {

/*!
  * Bootstrap sanitizer.js v5.2.2 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
   true ? factory(exports) :
  0;
})(this, (function (exports) { 'use strict';

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.2): util/sanitizer.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  const uriAttributes = new Set(['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href']);
  const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
  /**
   * A pattern that recognizes a commonly useful subset of URLs that are safe.
   *
   * Shout-out to Angular https://github.com/angular/angular/blob/12.2.x/packages/core/src/sanitization/url_sanitizer.ts
   */

  const SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i;
  /**
   * A pattern that matches safe data URLs. Only matches image, video and audio types.
   *
   * Shout-out to Angular https://github.com/angular/angular/blob/12.2.x/packages/core/src/sanitization/url_sanitizer.ts
   */

  const DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;

  const allowedAttribute = (attribute, allowedAttributeList) => {
    const attributeName = attribute.nodeName.toLowerCase();

    if (allowedAttributeList.includes(attributeName)) {
      if (uriAttributes.has(attributeName)) {
        return Boolean(SAFE_URL_PATTERN.test(attribute.nodeValue) || DATA_URL_PATTERN.test(attribute.nodeValue));
      }

      return true;
    } // Check if a regular expression validates the attribute.


    return allowedAttributeList.filter(attributeRegex => attributeRegex instanceof RegExp).some(regex => regex.test(attributeName));
  };

  const DefaultAllowlist = {
    // Global attributes allowed on any supplied element below.
    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
    a: ['target', 'href', 'title', 'rel'],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
  };
  function sanitizeHtml(unsafeHtml, allowList, sanitizeFunction) {
    if (!unsafeHtml.length) {
      return unsafeHtml;
    }

    if (sanitizeFunction && typeof sanitizeFunction === 'function') {
      return sanitizeFunction(unsafeHtml);
    }

    const domParser = new window.DOMParser();
    const createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
    const elements = [].concat(...createdDocument.body.querySelectorAll('*'));

    for (const element of elements) {
      const elementName = element.nodeName.toLowerCase();

      if (!Object.keys(allowList).includes(elementName)) {
        element.remove();
        continue;
      }

      const attributeList = [].concat(...element.attributes);
      const allowedAttributes = [].concat(allowList['*'] || [], allowList[elementName] || []);

      for (const attribute of attributeList) {
        if (!allowedAttribute(attribute, allowedAttributes)) {
          element.removeAttribute(attribute.nodeName);
        }
      }
    }

    return createdDocument.body.innerHTML;
  }

  exports.DefaultAllowlist = DefaultAllowlist;
  exports.sanitizeHtml = sanitizeHtml;

  Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });

}));
//# sourceMappingURL=sanitizer.js.map


/***/ }),

/***/ "./node_modules/bootstrap/js/dist/util/template-factory.js":
/*!*****************************************************************!*\
  !*** ./node_modules/bootstrap/js/dist/util/template-factory.js ***!
  \*****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*!
  * Bootstrap template-factory.js v5.2.2 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
   true ? module.exports = factory(__webpack_require__(/*! ./sanitizer */ "./node_modules/bootstrap/js/dist/util/sanitizer.js"), __webpack_require__(/*! ./index */ "./node_modules/bootstrap/js/dist/util/index.js"), __webpack_require__(/*! ../dom/selector-engine */ "./node_modules/bootstrap/js/dist/dom/selector-engine.js"), __webpack_require__(/*! ./config */ "./node_modules/bootstrap/js/dist/util/config.js")) :
  0;
})(this, (function (sanitizer, index, SelectorEngine, Config) { 'use strict';

  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : { default: e };

  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
  const Config__default = /*#__PURE__*/_interopDefaultLegacy(Config);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.2.2): util/template-factory.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * Constants
   */

  const NAME = 'TemplateFactory';
  const Default = {
    allowList: sanitizer.DefaultAllowlist,
    content: {},
    // { selector : text ,  selector2 : text2 , }
    extraClass: '',
    html: false,
    sanitize: true,
    sanitizeFn: null,
    template: '<div></div>'
  };
  const DefaultType = {
    allowList: 'object',
    content: 'object',
    extraClass: '(string|function)',
    html: 'boolean',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    template: 'string'
  };
  const DefaultContentType = {
    entry: '(string|element|function|null)',
    selector: '(string|element)'
  };
  /**
   * Class definition
   */

  class TemplateFactory extends Config__default.default {
    constructor(config) {
      super();
      this._config = this._getConfig(config);
    } // Getters


    static get Default() {
      return Default;
    }

    static get DefaultType() {
      return DefaultType;
    }

    static get NAME() {
      return NAME;
    } // Public


    getContent() {
      return Object.values(this._config.content).map(config => this._resolvePossibleFunction(config)).filter(Boolean);
    }

    hasContent() {
      return this.getContent().length > 0;
    }

    changeContent(content) {
      this._checkContent(content);

      this._config.content = { ...this._config.content,
        ...content
      };
      return this;
    }

    toHtml() {
      const templateWrapper = document.createElement('div');
      templateWrapper.innerHTML = this._maybeSanitize(this._config.template);

      for (const [selector, text] of Object.entries(this._config.content)) {
        this._setContent(templateWrapper, text, selector);
      }

      const template = templateWrapper.children[0];

      const extraClass = this._resolvePossibleFunction(this._config.extraClass);

      if (extraClass) {
        template.classList.add(...extraClass.split(' '));
      }

      return template;
    } // Private


    _typeCheckConfig(config) {
      super._typeCheckConfig(config);

      this._checkContent(config.content);
    }

    _checkContent(arg) {
      for (const [selector, content] of Object.entries(arg)) {
        super._typeCheckConfig({
          selector,
          entry: content
        }, DefaultContentType);
      }
    }

    _setContent(template, content, selector) {
      const templateElement = SelectorEngine__default.default.findOne(selector, template);

      if (!templateElement) {
        return;
      }

      content = this._resolvePossibleFunction(content);

      if (!content) {
        templateElement.remove();
        return;
      }

      if (index.isElement(content)) {
        this._putElementInTemplate(index.getElement(content), templateElement);

        return;
      }

      if (this._config.html) {
        templateElement.innerHTML = this._maybeSanitize(content);
        return;
      }

      templateElement.textContent = content;
    }

    _maybeSanitize(arg) {
      return this._config.sanitize ? sanitizer.sanitizeHtml(arg, this._config.allowList, this._config.sanitizeFn) : arg;
    }

    _resolvePossibleFunction(arg) {
      return typeof arg === 'function' ? arg(this) : arg;
    }

    _putElementInTemplate(element, templateElement) {
      if (this._config.html) {
        templateElement.innerHTML = '';
        templateElement.append(element);
        return;
      }

      templateElement.textContent = element.textContent;
    }

  }

  return TemplateFactory;

}));
//# sourceMappingURL=template-factory.js.map


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*******************************!*\
  !*** ./resources/js/panel.js ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var bootstrap_js_dist_dropdown__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bootstrap/js/dist/dropdown */ "./node_modules/bootstrap/js/dist/dropdown.js");
/* harmony import */ var bootstrap_js_dist_dropdown__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bootstrap_js_dist_dropdown__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var bootstrap_js_dist_collapse__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap/js/dist/collapse */ "./node_modules/bootstrap/js/dist/collapse.js");
/* harmony import */ var bootstrap_js_dist_collapse__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bootstrap_js_dist_collapse__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var bootstrap_js_dist_alert__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bootstrap/js/dist/alert */ "./node_modules/bootstrap/js/dist/alert.js");
/* harmony import */ var bootstrap_js_dist_alert__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bootstrap_js_dist_alert__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var bootstrap_js_dist_tooltip__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bootstrap/js/dist/tooltip */ "./node_modules/bootstrap/js/dist/tooltip.js");
/* harmony import */ var bootstrap_js_dist_tooltip__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bootstrap_js_dist_tooltip__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _popperjs_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @popperjs/core */ "./node_modules/@popperjs/core/lib/popper.js");
/* harmony import */ var _dashboardcode_bsmultiselect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @dashboardcode/bsmultiselect */ "./node_modules/@dashboardcode/bsmultiselect/dist/js/BsMultiSelect.esm.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./helpers */ "./resources/js/helpers.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_helpers__WEBPACK_IMPORTED_MODULE_6__);





 // Init tooltips

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
tooltipTriggerList.map(function (triggerEl) {
  return new (bootstrap_js_dist_tooltip__WEBPACK_IMPORTED_MODULE_3___default())(triggerEl);
}); // Multiselect

var multiselectTriggerList = [].slice.call(document.querySelectorAll('.multi-select'));
multiselectTriggerList.map(function (triggerEl) {
  (0,_dashboardcode_bsmultiselect__WEBPACK_IMPORTED_MODULE_4__.ModuleFactory)({
    window: window,
    createPopper: _popperjs_core__WEBPACK_IMPORTED_MODULE_5__.createPopper
  }).BsMultiSelect(triggerEl, {
    useCssPatch: true,
    css: {
      pick: ''
    }
  });
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2pzL3BhbmVsLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQiw2QkFBNkI7QUFDL0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRyxHQUFHO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSw4REFBOEQ7O0FBRTlEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQixPQUFPO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEVBQTBFO0FBQzFFLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLCtFQUErRTtBQUMvRTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQzs7QUFFbkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FB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QTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0Q7QUFDaEQ7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1EO0FBQ25EOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0Q7O0FBRXREO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxzQkFBc0IseUJBQXlCO0FBQy9DO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxHQUFHOztBQUVSOztBQUVBO0FBQ0E7QUFDQSxrREFBa0Q7QUFDbEQ7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssR0FBRzs7QUFFUjtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLOztBQUVMLDZGQUE2RixhQUFhO0FBQzFHO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNULFFBQVE7QUFDUjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxzRUFBc0U7QUFDdEU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9FQUFvRTtBQUNwRTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSwyR0FBMkc7O0FBRTNHLG1FQUFtRTtBQUNuRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyREFBMkQ7QUFDM0Q7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQSx5Q0FBeUM7O0FBRXpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0RBQStEO0FBQy9EO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw4RUFBOEU7QUFDOUU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVzs7QUFFWDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0M7O0FBRWhDO0FBQ0E7O0FBRUEsNkJBQTZCOztBQUU3QjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLCtCQUErQjs7QUFFL0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5Qzs7QUFFekM7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBLHlDQUF5Qzs7QUFFekM7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOzs7QUFHVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtFQUFrRTtBQUNsRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7QUFDQSx5REFBeUQ7O0FBRXpEO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0Esd0ZBQXdGOztBQUV4RjtBQUNBLHdEQUF3RDs7QUFFeEQsNkJBQTZCO0FBQzdCLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtFQUFrRTtBQUNsRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULFNBQVM7OztBQUdUO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0RBQXdEOztBQUV4RDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLDJCQUEyQiw2QkFBNkI7QUFDeEQsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtR0FBbUc7O0FBRW5HO0FBQ0E7QUFDQSxrRUFBa0U7O0FBRWxFO0FBQ0EsMkJBQTJCOztBQUUzQiw0RkFBNEYsb0ZBQW9GO0FBQ2hMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxSUFBcUk7QUFDckk7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdGQUF3RjtBQUN4Rjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsNkNBQTZDO0FBQzdDOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdEQUF3RDtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGVBQWU7QUFDZjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7O0FBRTNCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxHQUFHO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG9CQUFvQixvQkFBb0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHVCQUF1QjtBQUM5Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSx3QkFBd0IsdUJBQXVCO0FBQy9DO0FBQ0E7O0FBRUE7O0FBRUEsd0JBQXdCLHdCQUF3QjtBQUNoRDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IseUJBQXlCO0FBQzNDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLHlCQUF5QjtBQUMzQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQix5QkFBeUI7QUFDM0M7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRDtBQUMzRDs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0EsNERBQTREOztBQUU1RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLCtJQUErSTtBQUMvSSxTQUFTOztBQUVUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBLG9HQUFvRztBQUNwRztBQUNBLFlBQVk7QUFDWjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DOztBQUVuQyx1Q0FBdUM7O0FBRXZDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFFQUFxRTtBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHdCQUF3Qjs7QUFFeEIsNkRBQTZEO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHNCQUFzQixvQkFBb0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0Q7O0FBRXBEO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FB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QkFBOEI7QUFDOUI7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTiwyQkFBMkI7QUFDM0IsTUFBTTtBQUNOLDBCQUEwQjtBQUMxQjtBQUNBOztBQUVBO0FBQ0EsK0JBQStCO0FBQy9COztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFFQUFxRTtBQUNyRTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrRUFBK0U7QUFDL0U7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQzs7QUFFbkM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzREFBc0Q7QUFDdEQ7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUdBQWlHOztBQUVqRztBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUwsK0JBQStCOztBQUUvQjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSyxxQ0FBcUM7OztBQUcxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMklBQTJJLGFBQWEsNENBQTRDOztBQUVwTTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0RkFBNEYsZUFBZSwyQkFBMkI7O0FBRXRJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsdUZBQXVGLHdCQUF3Qjs7QUFFL0c7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVB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QUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLCtCQUErQixtQkFBbUI7QUFDbEQ7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUTs7O0FBR1I7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7O0FBRVI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsU0FBUzs7QUFFVDtBQUNBLHVGQUF1Rjs7QUFFdkY7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7OztBQUdBO0FBQ0EsTUFBTTs7O0FBR047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtEQUFrRCxPQUFPO0FBQ3pEOztBQUVBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVU7OztBQUdWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSw4QkFBOEI7O0FBRTlCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxDQUFDO0FBQ0Q7Ozs7Ozs7Ozs7O0FDeGRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsS0FBNEQsNEJBQTRCLG1CQUFPLENBQUMsa0VBQWdCLEdBQUcsbUJBQU8sQ0FBQyxvRUFBYyxHQUFHLG1CQUFPLENBQUMsNEVBQWtCLEdBQUcsbUJBQU8sQ0FBQyxrRkFBcUIsR0FBRyxtQkFBTyxDQUFDLDhFQUFtQixHQUFHLG1CQUFPLENBQUMsNEVBQWtCLEdBQUcsbUJBQU8sQ0FBQywwRkFBeUI7QUFDdlMsRUFBRSxDQUNxUDtBQUN2UCxDQUFDLDBHQUEwRzs7QUFFM0csMEZBQTBGOztBQUUxRjtBQUNBO0FBQ0Esb0NBQW9DLHdCQUF3QixtQkFBbUI7QUFDL0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixpQkFBaUI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsOEJBQThCOztBQUU5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7O0FBRS9COztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07OztBQUdOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07OztBQUdOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFFBQVE7OztBQUdSO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxRQUFROztBQUVSO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTs7QUFFQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSw2Q0FBNkM7QUFDN0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEI7O0FBRTlCO0FBQ0E7QUFDQTtB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QUFWLEVBQXFCO0VBQ3hDLE9BQU8sSUFBSUosa0VBQUosQ0FBWUksU0FBWixDQUFQO0FBQ0gsQ0FGRCxHQUlBOztBQUNBLElBQUlDLHNCQUFzQixHQUFHLEdBQUdyRCxLQUFILENBQVNDLElBQVQsQ0FBY0osUUFBUSxDQUFDSyxnQkFBVCxDQUEwQixlQUExQixDQUFkLENBQTdCO0FBQ0FtRCxzQkFBc0IsQ0FBQ2xELEdBQXZCLENBQTJCLFVBQVVpRCxTQUFWLEVBQXFCO0VBQzVDRiwyRUFBYSxDQUFDO0lBQUNJLE1BQU0sRUFBTkEsTUFBRDtJQUFTTCxZQUFZLEVBQVpBLHdEQUFZQTtFQUFyQixDQUFELENBQWIsQ0FBc0NNLGFBQXRDLENBQW9ESCxTQUFwRCxFQUErRDtJQUMzREksV0FBVyxFQUFFLElBRDhDO0lBRTNEQyxHQUFHLEVBQUU7TUFDREMsSUFBSSxFQUFFO0lBREw7RUFGc0QsQ0FBL0Q7QUFNSCxDQVBEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BkYXNoYm9hcmRjb2RlL2JzbXVsdGlzZWxlY3QvZGlzdC9qcy9Cc011bHRpU2VsZWN0LmVzbS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2NyZWF0ZVBvcHBlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9jb250YWlucy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRCb3VuZGluZ0NsaWVudFJlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0Q2xpcHBpbmdSZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldENvbXBvc2l0ZVJlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0Q29tcHV0ZWRTdHlsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXREb2N1bWVudEVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0RG9jdW1lbnRSZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldEhUTUxFbGVtZW50U2Nyb2xsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldExheW91dFJlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0Tm9kZU5hbWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0Tm9kZVNjcm9sbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRPZmZzZXRQYXJlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0UGFyZW50Tm9kZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRTY3JvbGxQYXJlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0Vmlld3BvcnRSZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldFdpbmRvdy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRXaW5kb3dTY3JvbGwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0V2luZG93U2Nyb2xsQmFyWC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9pbnN0YW5jZU9mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2lzTGF5b3V0Vmlld3BvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvaXNTY3JvbGxQYXJlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvaXNUYWJsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvbGlzdFNjcm9sbFBhcmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9lbnVtcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvbW9kaWZpZXJzL2FwcGx5U3R5bGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvbW9kaWZpZXJzL2Fycm93LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvbW9kaWZpZXJzL2NvbXB1dGVTdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9tb2RpZmllcnMvZXZlbnRMaXN0ZW5lcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9tb2RpZmllcnMvZmxpcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL21vZGlmaWVycy9oaWRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvbW9kaWZpZXJzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvbW9kaWZpZXJzL29mZnNldC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL21vZGlmaWVycy9wb3BwZXJPZmZzZXRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvbW9kaWZpZXJzL3ByZXZlbnRPdmVyZmxvdy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3BvcHBlci1saXRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvcG9wcGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvY29tcHV0ZUF1dG9QbGFjZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9jb21wdXRlT2Zmc2V0cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL2RlYm91bmNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvZGV0ZWN0T3ZlcmZsb3cuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9leHBhbmRUb0hhc2hNYXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9mb3JtYXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9nZXRBbHRBeGlzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvZ2V0QmFzZVBsYWNlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL2dldEZyZXNoU2lkZU9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL2dldE1haW5BeGlzRnJvbVBsYWNlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL2dldE9wcG9zaXRlUGxhY2VtZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvZ2V0T3Bwb3NpdGVWYXJpYXRpb25QbGFjZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9nZXRWYXJpYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9tYXRoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvbWVyZ2VCeU5hbWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9tZXJnZVBhZGRpbmdPYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9vcmRlck1vZGlmaWVycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL3JlY3RUb0NsaWVudFJlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy91bmlxdWVCeS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL3VzZXJBZ2VudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL3ZhbGlkYXRlTW9kaWZpZXJzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvd2l0aGluLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9oZWxwZXJzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ib290c3RyYXAvanMvZGlzdC9hbGVydC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYm9vdHN0cmFwL2pzL2Rpc3QvYmFzZS1jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC9qcy9kaXN0L2NvbGxhcHNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ib290c3RyYXAvanMvZGlzdC9kb20vZGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYm9vdHN0cmFwL2pzL2Rpc3QvZG9tL2V2ZW50LWhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC9qcy9kaXN0L2RvbS9tYW5pcHVsYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYm9vdHN0cmFwL2pzL2Rpc3QvZG9tL3NlbGVjdG9yLWVuZ2luZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYm9vdHN0cmFwL2pzL2Rpc3QvZHJvcGRvd24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC9qcy9kaXN0L3Rvb2x0aXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC9qcy9kaXN0L3V0aWwvY29tcG9uZW50LWZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYm9vdHN0cmFwL2pzL2Rpc3QvdXRpbC9jb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC9qcy9kaXN0L3V0aWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC9qcy9kaXN0L3V0aWwvc2FuaXRpemVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ib290c3RyYXAvanMvZGlzdC91dGlsL3RlbXBsYXRlLWZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy9wYW5lbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAgKiBCc011bHRpU2VsZWN0IHYxLjEuMTggKGh0dHBzOi8vZGFzaGJvYXJkY29kZS5naXRodWIuaW8vQnNNdWx0aVNlbGVjdC8pXG4gICogQ29weXJpZ2h0IDIwMTctMjAyMSBSb21hbiBQb2tyb3Zza2lqIChnaXRodWIgdXNlciBycG9rcm92c2tpailcbiAgKiBMaWNlbnNlZCB1bmRlciBBcGFjaGUgMiAoaHR0cHM6Ly9naXRodWIuY29tL0Rhc2hib2FyZENvZGUvQnNNdWx0aVNlbGVjdC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICAqL1xuZnVuY3Rpb24gZmluZERpcmVjdENoaWxkQnlUYWdOYW1lKGVsZW1lbnQsIHRhZ05hbWUpIHtcbiAgdmFyIHZhbHVlID0gbnVsbDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgdG1wID0gZWxlbWVudC5jaGlsZHJlbltpXTtcblxuICAgIGlmICh0bXAudGFnTmFtZSA9PSB0YWdOYW1lKSB7XG4gICAgICB2YWx1ZSA9IHRtcDtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB2YWx1ZTtcbn1cbmZ1bmN0aW9uIGNsb3Nlc3RCeVRhZ05hbWUoZWxlbWVudCwgdGFnTmFtZSkge1xuICByZXR1cm4gY2xvc2VzdChlbGVtZW50LCBmdW5jdGlvbiAoZSkge1xuICAgIHJldHVybiBlLnRhZ05hbWUgPT09IHRhZ05hbWU7XG4gIH0pOyAvLyBUT0RPIHN1cHBvcnQgeGh0bWw/ICBlLnRhZ05hbWUudG9VcHBlckNhc2UoKSA/XG59XG5mdW5jdGlvbiBjbG9zZXN0QnlDbGFzc05hbWUoZWxlbWVudCwgY2xhc3NOYW1lKSB7XG4gIHJldHVybiBjbG9zZXN0KGVsZW1lbnQsIGZ1bmN0aW9uIChlKSB7XG4gICAgcmV0dXJuIGUuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSk7XG4gIH0pO1xufVxuZnVuY3Rpb24gY2xvc2VzdEJ5QXR0cmlidXRlKGVsZW1lbnQsIGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZSkge1xuICByZXR1cm4gY2xvc2VzdChlbGVtZW50LCBmdW5jdGlvbiAoZSkge1xuICAgIHJldHVybiBlLmdldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKSA9PT0gYXR0cmlidXRlO1xuICB9KTtcbn1cbmZ1bmN0aW9uIGNvbnRhaW5zQW5kU2VsZihub2RlLCBvdGhlck5vZGUpIHtcbiAgcmV0dXJuIG5vZGUgPT09IG90aGVyTm9kZSB8fCBub2RlLmNvbnRhaW5zKG90aGVyTm9kZSk7XG59XG5mdW5jdGlvbiBnZXREYXRhR3VhcmRlZFdpdGhQcmVmaXgoZWxlbWVudCwgcHJlZml4LCBuYW1lKSB7XG4gIHZhciB0bXAxID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtJyArIHByZWZpeCArICctJyArIG5hbWUpO1xuXG4gIGlmICh0bXAxKSB7XG4gICAgcmV0dXJuIHRtcDE7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHRtcDIgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS0nICsgbmFtZSk7XG4gICAgaWYgKHRtcDIpIHJldHVybiB0bXAyO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIGNsb3Nlc3QoZWxlbWVudCwgcHJlZGljYXRlKSB7XG4gIGlmICghZWxlbWVudCB8fCAhKGVsZW1lbnQgaW5zdGFuY2VvZiBFbGVtZW50KSkgcmV0dXJuIG51bGw7IC8vIHNob3VsZCBiZSBlbGVtZW50LCBub3QgZG9jdW1lbnQgKFRPRE86IGNoZWNrIGlmcmFtZSlcblxuICBpZiAocHJlZGljYXRlKGVsZW1lbnQpKSByZXR1cm4gZWxlbWVudDtcbiAgcmV0dXJuIGNsb3Nlc3QoZWxlbWVudC5wYXJlbnROb2RlLCBwcmVkaWNhdGUpO1xufVxuXG5mdW5jdGlvbiBzaWJsaW5nc0FzQXJyYXkoZWxlbWVudCkge1xuICB2YXIgdmFsdWUgPSBbXTtcblxuICBpZiAoZWxlbWVudC5wYXJlbnROb2RlKSB7XG4gICAgdmFyIGNoaWxkcmVuID0gZWxlbWVudC5wYXJlbnROb2RlLmNoaWxkcmVuO1xuICAgIHZhciBsID0gZWxlbWVudC5wYXJlbnROb2RlLmNoaWxkcmVuLmxlbmd0aDtcblxuICAgIGlmIChjaGlsZHJlbi5sZW5ndGggPiAxKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGw7ICsraSkge1xuICAgICAgICB2YXIgZSA9IGNoaWxkcmVuW2ldO1xuICAgICAgICBpZiAoZSAhPSBlbGVtZW50KSB2YWx1ZS5wdXNoKGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB2YWx1ZTtcbn1cbmZ1bmN0aW9uIGdldElzUnRsKGVsZW1lbnQpIHtcbiAgdmFyIGlzUnRsID0gZmFsc2U7XG4gIHZhciBlID0gY2xvc2VzdEJ5QXR0cmlidXRlKGVsZW1lbnQsIFwiZGlyXCIsIFwicnRsXCIpO1xuICBpZiAoZSkgaXNSdGwgPSB0cnVlO1xuICByZXR1cm4gaXNSdGw7XG59XG5mdW5jdGlvbiBFdmVudEJpbmRlcigpIHtcbiAgdmFyIGxpc3QgPSBbXTtcbiAgcmV0dXJuIHtcbiAgICBiaW5kOiBmdW5jdGlvbiBiaW5kKGVsZW1lbnQsIGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gICAgICBsaXN0LnB1c2goe1xuICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICBldmVudE5hbWU6IGV2ZW50TmFtZSxcbiAgICAgICAgaGFuZGxlcjogaGFuZGxlclxuICAgICAgfSk7XG4gICAgfSxcbiAgICB1bmJpbmQ6IGZ1bmN0aW9uIHVuYmluZCgpIHtcbiAgICAgIGxpc3QuZm9yRWFjaChmdW5jdGlvbiAoZSkge1xuICAgICAgICB2YXIgZWxlbWVudCA9IGUuZWxlbWVudCxcbiAgICAgICAgICAgIGV2ZW50TmFtZSA9IGUuZXZlbnROYW1lLFxuICAgICAgICAgICAgaGFuZGxlciA9IGUuaGFuZGxlcjtcbiAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59XG5mdW5jdGlvbiBBdHRyaWJ1dGVCYWNrdXAoKSB7XG4gIHZhciBsaXN0ID0gW107XG4gIHJldHVybiB7XG4gICAgc2V0OiBmdW5jdGlvbiBzZXQoZWxlbWVudCwgYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlKSB7XG4gICAgICB2YXIgY3VycmVudEF0cmlidXRlID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSk7XG4gICAgICBsaXN0LnB1c2goe1xuICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICBjdXJyZW50QXRyaWJ1dGU6IGN1cnJlbnRBdHJpYnV0ZSxcbiAgICAgICAgYXR0cmlidXRlOiBhdHRyaWJ1dGVcbiAgICAgIH0pO1xuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlKTtcbiAgICB9LFxuICAgIHJlc3RvcmU6IGZ1bmN0aW9uIHJlc3RvcmUoKSB7XG4gICAgICBsaXN0LmZvckVhY2goZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBlLmVsZW1lbnQsXG4gICAgICAgICAgICBhdHRyaWJ1dGVOYW1lID0gZS5hdHRyaWJ1dGVOYW1lLFxuICAgICAgICAgICAgYXR0cmlidXRlID0gZS5hdHRyaWJ1dGU7XG4gICAgICAgIGlmIChhdHRyaWJ1dGVOYW1lKSBlbGVtZW50LnNldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGUpO2Vsc2UgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59XG5mdW5jdGlvbiBFdmVudExvb3BQcm9sb25nYWJsZUZsYWcod2luZG93KSB7XG4gIHZhciBmbGFnID0gZmFsc2U7XG4gIHZhciBwciA9IG51bGw7XG4gIHJldHVybiB7XG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gZmxhZztcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gc2V0KHRpbWVvdXQpIHtcbiAgICAgIGlmIChmbGFnICYmIHByKSB7XG4gICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQocHIpO1xuICAgICAgfVxuXG4gICAgICBmbGFnID0gdHJ1ZTtcbiAgICAgIHByID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBmbGFnID0gZmFsc2U7XG4gICAgICAgIHByID0gbnVsbDtcbiAgICAgIH0sIHRpbWVvdXQgPyB0aW1lb3V0IDogMCk7XG4gICAgfVxuICB9O1xufVxuZnVuY3Rpb24gUmVzZXRhYmxlRmxhZygpIHtcbiAgdmFyIGZsYWcgPSBmYWxzZTtcbiAgcmV0dXJuIHtcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBmbGFnO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQoKSB7XG4gICAgICBmbGFnID0gdHJ1ZTtcbiAgICB9LFxuICAgIHJlc2V0OiBmdW5jdGlvbiByZXNldCgpIHtcbiAgICAgIGZsYWcgPSBmYWxzZTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIEJzNVBsdWdpbigpIHt9XG5cbkJzNVBsdWdpbi5wbHVnRGVmYXVsdENvbmZpZyA9IGZ1bmN0aW9uIChkZWZhdWx0cykge1xuICBkZWZhdWx0cy5jc3MgPSBjc3M7XG4gIHNldERlZmF1bHRzKGRlZmF1bHRzKTtcbn07XG5cbmZ1bmN0aW9uIHNldERlZmF1bHRzKGRlZmF1bHRzKSB7XG4gIGRlZmF1bHRzLnVzZUNzc1BhdGNoID0gdHJ1ZTtcbiAgZGVmYXVsdHMuY3NzUGF0Y2ggPSBjc3NQYXRjaDtcbiAgZGVmYXVsdHMucGlja0J1dHRvbkhUTUwgPSAnPGJ1dHRvbiBhcmlhLWxhYmVsPVwiUmVtb3ZlXCIgdGFiSW5kZXg9XCItMVwiIHR5cGU9XCJidXR0b25cIj48L2J1dHRvbj4nO1xuICBkZWZhdWx0cy5jb21wb3NlR2V0U2l6ZSA9IGNvbXBvc2VHZXRTaXplO1xuICBkZWZhdWx0cy5nZXREZWZhdWx0TGFiZWwgPSBnZXREZWZhdWx0TGFiZWw7XG59XG5cbmZ1bmN0aW9uIGNvbXBvc2VHZXRTaXplKHNlbGVjdEVsZW1lbnQpIHtcbiAgdmFyIGlucHV0R3JvdXBFbGVtZW50ID0gY2xvc2VzdEJ5Q2xhc3NOYW1lKHNlbGVjdEVsZW1lbnQsICdpbnB1dC1ncm91cCcpO1xuICB2YXIgZ2V0U2l6ZSA9IG51bGw7XG5cbiAgaWYgKGlucHV0R3JvdXBFbGVtZW50KSB7XG4gICAgZ2V0U2l6ZSA9IGZ1bmN0aW9uIGdldFNpemUoKSB7XG4gICAgICB2YXIgdmFsdWUgPSBudWxsO1xuICAgICAgaWYgKGlucHV0R3JvdXBFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnaW5wdXQtZ3JvdXAtbGcnKSkgdmFsdWUgPSAnbGcnO2Vsc2UgaWYgKGlucHV0R3JvdXBFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnaW5wdXQtZ3JvdXAtc20nKSkgdmFsdWUgPSAnc20nO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgZ2V0U2l6ZSA9IGZ1bmN0aW9uIGdldFNpemUoKSB7XG4gICAgICB2YXIgdmFsdWUgPSBudWxsO1xuICAgICAgaWYgKHNlbGVjdEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdmb3JtLXNlbGVjdC1sZycpIHx8IHNlbGVjdEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdmb3JtLWNvbnRyb2wtbGcnKSkgLy8gY2hhbmdlZCBmb3IgQlNcbiAgICAgICAgdmFsdWUgPSAnbGcnO2Vsc2UgaWYgKHNlbGVjdEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdmb3JtLXNlbGVjdC1zbScpIHx8IHNlbGVjdEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdmb3JtLWNvbnRyb2wtc20nKSkgdmFsdWUgPSAnc20nO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gZ2V0U2l6ZTtcbn1cblxuZnVuY3Rpb24gZ2V0RGVmYXVsdExhYmVsKHNlbGVjdEVsZW1lbnQpIHtcbiAgdmFyIHZhbHVlID0gbnVsbDtcbiAgdmFyIHF1ZXJ5ID0gXCJsYWJlbFtmb3I9XFxcIlwiICsgc2VsZWN0RWxlbWVudC5pZCArIFwiXFxcIl1cIjtcbiAgdmFyIHAxID0gc2VsZWN0RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICB2YWx1ZSA9IHAxLnF1ZXJ5U2VsZWN0b3IocXVlcnkpOyAvLyBsYWJlbCBjYW4gYmUgd3JhcHBlZCBpbnRvIGNvbC1hdXRvXG5cbiAgaWYgKCF2YWx1ZSkge1xuICAgIHZhciBwMiA9IHAxLnBhcmVudEVsZW1lbnQ7XG4gICAgdmFsdWUgPSBwMi5xdWVyeVNlbGVjdG9yKHF1ZXJ5KTtcbiAgfVxuXG4gIHJldHVybiB2YWx1ZTtcbn1cblxudmFyIGNzcyA9IHtcbiAgY2hvaWNlczogJ2Ryb3Bkb3duLW1lbnUnLFxuICAvLyBicywgaW4gYnNtdWx0aXNlbGVjdC5zY3NzIGFzIGRpdi5kcm9wZG93bi1tZW51XG4gIGNob2ljZXNMaXN0OiAnJyxcbiAgLy8gYnMsIGluIGJzbXVsdGlzZWxlY3Quc2NzcyBhcyBkaXYuZHJvcGRvd24tbWVudT51bCAoZmlyc3QgY2hpbGQpXG4gIGNob2ljZV9ob3ZlcjogJ2hvdmVyJyxcbiAgLy8gIG5vdCBicywgaW4gc2NzcyBhcyAndWwuZHJvcGRvd24tbWVudSBsaS5ob3ZlcidcbiAgY2hvaWNlX3NlbGVjdGVkOiAnc2VsZWN0ZWQnLFxuICAvLyAgbm90IGJzLFxuICBjaG9pY2VfZGlzYWJsZWQ6ICdkaXNhYmxlZCcsXG4gIC8vICBub3QgYnMsXG4gIHBpY2tzOiAnZm9ybS1jb250cm9sJyxcbiAgLy8gYnMsIGluIHNjc3MgJ3VsLmZvcm0tY29udHJvbCdcbiAgcGlja3NfZm9jdXM6ICdmb2N1cycsXG4gIC8vIG5vdCBicywgaW4gc2NzcyAndWwuZm9ybS1jb250cm9sLmZvY3VzJ1xuICBwaWNrc19kaXNhYmxlZDogJ2Rpc2FibGVkJyxcbiAgLy8gIG5vdCBicywgaW4gc2NzcyAndWwuZm9ybS1jb250cm9sLmRpc2FibGVkJ1xuICBwaWNrX2Rpc2FibGVkOiAnJyxcbiAgcGlja0ZpbHRlcjogJycsXG4gIGZpbHRlcklucHV0OiAnJyxcbiAgLy8gdXNlZCBpbiBwaWNrQ29udGVudEdlbmVyYXRvclxuICBwaWNrOiB7XG4gICAgY2xhc3NlczogJ2JhZGdlJ1xuICB9LFxuICAvLyBic1xuICBwaWNrQ29udGVudDogJycsXG4gIHBpY2tDb250ZW50X2Rpc2FibGVkOiAnZGlzYWJsZWQnLFxuICAvLyBub3QgYnMsIGluIHNjc3MgJ3VsLmZvcm0tY29udHJvbCBsaSBzcGFuLmRpc2FibGVkJ1xuICBwaWNrQnV0dG9uOiAnYnRuLWNsb3NlJyxcbiAgLy8gYnNcbiAgLy8gdXNlZCBpbiBjaG9pY2VDb250ZW50R2VuZXJhdG9yXG4gIC8vIGNob2ljZTogICdkcm9wZG93bi1pdGVtJywgLy8gaXQgc2VlbXMgbGlrZSBob3ZlciBzaG91bGQgYmUgbWFuYWdlZCBtYW51YWxseSBzaW5jZSB0aGVyZSBzaG91bGQgYmUga2V5Ym9hcmQgc3VwcG9ydFxuICBjaG9pY2VDaGVja0JveF9kaXNhYmxlZDogJ2Rpc2FibGVkJyxcbiAgLy8gIG5vdCBicywgaW4gc2NzcyBhcyAndWwuZm9ybS1jb250cm9sIGxpIC5jdXN0b20tY29udHJvbC1pbnB1dC5kaXNhYmxlZCB+IC5jdXN0b20tY29udHJvbC1sYWJlbCdcbiAgY2hvaWNlQ29udGVudDogJ2Zvcm0tY2hlY2snLFxuICAvLyBicyBkLWZsZXggcmVxdWlyZWQgZm9yIHJ0bCB0byBhbGlnbiBpdGVtc1xuICBjaG9pY2VDaGVja0JveDogJ2Zvcm0tY2hlY2staW5wdXQnLFxuICAvLyBic1xuICBjaG9pY2VMYWJlbDogJ2Zvcm0tY2hlY2stbGFiZWwnLFxuICBjaG9pY2VMYWJlbF9kaXNhYmxlZDogJycsXG4gIGxhYmVsX2Zsb2F0aW5nX2xpZnRlZDogJ2Zsb2F0aW5nLWxpZnRlZCcsXG4gIHBpY2tzX2Zsb2F0aW5nX2xpZnRlZDogJ2Zsb2F0aW5nLWxpZnRlZCcsXG4gIHdhcm5pbmc6ICdhbGVydC13YXJuaW5nJ1xufTtcbnZhciBjc3NQYXRjaCA9IHtcbiAgY2hvaWNlc0xpc3Q6IHtcbiAgICBsaXN0U3R5bGVUeXBlOiAnbm9uZScsXG4gICAgcGFkZGluZ0xlZnQ6ICcwJyxcbiAgICBwYWRkaW5nUmlnaHQ6ICcwJyxcbiAgICBtYXJnaW5Cb3R0b206ICcwJ1xuICB9LFxuICBwaWNrczoge1xuICAgIGxpc3RTdHlsZVR5cGU6ICdub25lJyxcbiAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgZmxleFdyYXA6ICd3cmFwJyxcbiAgICBoZWlnaHQ6ICdhdXRvJyxcbiAgICBtYXJnaW5Cb3R0b206ICcwJyxcbiAgICBjdXJzb3I6ICd0ZXh0J1xuICB9LFxuICBjaG9pY2U6IHtcbiAgICBjbGFzc2VzOiAncHgtbWQtMiBweC0xJyxcbiAgICBzdHlsZXM6IHtcbiAgICAgIGN1cnNvcjogJ3BvaW50ZXInXG4gICAgfVxuICB9LFxuICAvL2Nob2ljZV9zZWxlY3RlZDogJ3NlbGVjdGVkJywgIC8vICByZW1vdmUsXG4gIC8vY2hvaWNlX2Rpc2FibGVkOiAnZGlzYWJsZWQnLCAgLy8gIHJlbW92ZSxcbiAgY2hvaWNlX2hvdmVyOiAndGV4dC1wcmltYXJ5IGJnLWxpZ2h0JyxcbiAgY2hvaWNlX2Rpc2FibGVkX2hvdmVyOiAnYmctbGlnaHQnLFxuICAvLyBhY3R1YWxseSAnZGlzYWJsZWQsIG5vdCBzZWxlY3RlZCdcbiAgZmlsdGVySW5wdXQ6IHtcbiAgICBib3JkZXI6ICcwcHgnLFxuICAgIGhlaWdodDogJ2F1dG8nLFxuICAgIGJveFNoYWRvdzogJ25vbmUnLFxuICAgIHBhZGRpbmc6ICcwJyxcbiAgICBtYXJnaW46ICcwJyxcbiAgICBvdXRsaW5lOiAnbm9uZScsXG4gICAgYmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnLFxuICAgIGJhY2tncm91bmRJbWFnZTogJ25vbmUnIC8vIG90aGVyd2lzZSBCUyAud2FzLXZhbGlkYXRlZCBzZXQgaXRzIGltYWdlXG5cbiAgfSxcbiAgZmlsdGVySW5wdXRfZW1wdHk6ICdmb3JtLWNvbnRyb2wnLFxuICAvLyBuZWVkIGZvciBwbGFjZWhvbGRlciwgVE9ETyB0ZXN0IGZvcm0tY29udHJvbC1wbGFpbnRleHRcbiAgLy8gdXNlZCBpbiBQaWNrc0RvbVxuICBwaWNrc19kaXNhYmxlZDoge1xuICAgIGJhY2tncm91bmRDb2xvcjogJyNlOWVjZWYnXG4gIH0sXG4gIHBpY2tzX2ZvY3VzOiB7XG4gICAgYm9yZGVyQ29sb3I6ICcjODBiZGZmJyxcbiAgICBib3hTaGFkb3c6ICcwIDAgMCAwLjJyZW0gcmdiYSgwLCAxMjMsIDI1NSwgMC4yNSknXG4gIH0sXG4gIHBpY2tzX2ZvY3VzX3ZhbGlkOiB7XG4gICAgYm9yZGVyQ29sb3I6ICcnLFxuICAgIGJveFNoYWRvdzogJzAgMCAwIDAuMnJlbSByZ2JhKDQwLCAxNjcsIDY5LCAwLjI1KSdcbiAgfSxcbiAgcGlja3NfZm9jdXNfaW52YWxpZDoge1xuICAgIGJvcmRlckNvbG9yOiAnJyxcbiAgICBib3hTaGFkb3c6ICcwIDAgMCAwLjJyZW0gcmdiYSgyMjAsIDUzLCA2OSwgMC4yNSknXG4gIH0sXG4gIC8vIHVzZWQgaW4gQnNBcHBlYXJhbmNlUGx1Z2luXG4gIHBpY2tzX2RlZjoge1xuICAgIG1pbkhlaWdodDogJ2NhbGMoMi4yNXJlbSArIDJweCknXG4gIH0sXG4gIHBpY2tzX2xnOiB7XG4gICAgbWluSGVpZ2h0OiAnY2FsYygyLjg3NXJlbSArIDJweCknXG4gIH0sXG4gIHBpY2tzX3NtOiB7XG4gICAgbWluSGVpZ2h0OiAnY2FsYygxLjgxMjVyZW0gKyAycHgpJ1xuICB9LFxuICBwaWNrc19mbG9hdGluZ19kZWY6IHtcbiAgICBtaW5IZWlnaHQ6ICdjYWxjKDMuNXJlbSArIDJweCknXG4gIH0sXG4gIC8vIHVzZWQgaW4gcGlja0NvbnRlbnRHZW5lcmF0b3JcbiAgcGljazoge1xuICAgIHBhZGRpbmdMZWZ0OiAnMCcsXG4gICAgcGFkZGluZ1JpZ2h0OiAnLjVyZW0nLFxuICAgIHBhZGRpbmdJbmxpbmVTdGFydDogJzAnLFxuICAgIHBhZGRpbmdJbmxpbmVFbmQ6ICcwLjVyZW0nLFxuICAgIGNvbG9yOiAndmFyKC0tYnMtZGFyayknXG4gIH0sXG4gIHBpY2tCdXR0b246IHtcbiAgICBmb250U2l6ZTogJzAuOGVtJyxcbiAgICBmbG9hdDogXCJub25lXCIsXG4gICAgdmVydGljYWxBbGlnbjogXCJ0ZXh0LXRvcFwiXG4gIH0sXG4gIHBpY2tDb250ZW50X2Rpc2FibGVkOiB7XG4gICAgb3BhY2l0eTogJy42NSdcbiAgfSxcbiAgLy8gdXNlZCBpbiBjaG9pY2VDb250ZW50R2VuZXJhdG9yXG4gIGNob2ljZUNvbnRlbnQ6IHtcbiAgICBqdXN0aWZ5Q29udGVudDogJ2ZsZXgtc3RhcnQnLFxuICAgIGN1cnNvcjogJ2luaGVyaXQnXG4gIH0sXG4gIC8vIEJTIHByb2JsZW06IHdpdGhvdXQgdGhpcyBvbiBpbmxpbmUgZm9ybSBtZW51IGl0ZW1zIGp1c3RpZmllZCBjZW50ZXJcbiAgY2hvaWNlTGFiZWw6IHtcbiAgICBjb2xvcjogJ2luaGVyaXQnLFxuICAgIGN1cnNvcjogJ2luaGVyaXQnXG4gIH0sXG4gIC8vIG90aGVyd2lzZSBCUyAud2FzLXZhbGlkYXRlZCBzZXQgaXRzIGNvbG9yXG4gIGNob2ljZUNoZWNrQm94OiB7XG4gICAgY29sb3I6ICdpbmhlcml0JyxcbiAgICBjdXJzb3I6ICdpbmhlcml0J1xuICB9LFxuICBjaG9pY2VMYWJlbF9kaXNhYmxlZDoge1xuICAgIG9wYWNpdHk6ICcuNjUnXG4gIH0sXG4gIC8vIG1vcmUgZmxleGlibGUgdGhhbiB7Y29sb3I6ICcjNmM3NTdkJ307IG5vdGU6IGF2b2lkIG9wYWNpdHkgb24gcGlja0VsZW1lbnQncyBib3JkZXI7IFRPRE8gd3JpdGUgdG8gQlMgXG4gIC8vIGZsb2F0aW5nIHBsdWdpblxuICBsYWJlbF9mbG9hdGluZ19saWZ0ZWQ6IHtcbiAgICBvcGFjaXR5OiAnLjY1JyxcbiAgICB0cmFuc2Zvcm06ICdzY2FsZSguODUpIHRyYW5zbGF0ZVkoLS41cmVtKSB0cmFuc2xhdGVYKC4xNXJlbSknXG4gIH0sXG4gIHBpY2tzX2Zsb2F0aW5nX2xpZnRlZDoge1xuICAgIHBhZGRpbmdUb3A6ICcxLjYyNXJlbScsXG4gICAgcGFkZGluZ0xlZnQ6ICcwLjhyZW0nLFxuICAgIHBhZGRpbmdCb3R0b206ICcwJ1xuICB9LFxuICB3YXJuaW5nOiB7XG4gICAgcGFkZGluZ0xlZnQ6ICcuMjVyZW0nLFxuICAgIHBhZGRpbmdSaWdodDogJy4yNXJlbScsXG4gICAgekluZGV4OiA0LFxuICAgIGZvbnRTaXplOiAnc21hbGwnLFxuICAgIGJhY2tncm91bmRDb2xvcjogJ3ZhcigtLWJzLXdhcm5pbmcpJ1xuICB9IC8vIHpJbmRleD00ICBzaW5jZSB0aGUgaW5wdXQtZ3JvdXAgekluZGV4PTNcblxufTtcblxuZnVuY3Rpb24gaXNCb29sZWFuKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gdHJ1ZSB8fCB2YWx1ZSA9PT0gZmFsc2U7XG59XG5mdW5jdGlvbiBpc1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBTdHJpbmcgfHwgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJztcbn1cbmZ1bmN0aW9uIGV4dGVuZElmVW5kZWZpbmVkKGRlc3RpbmF0aW9uLCBzb3VyY2UpIHtcbiAgZm9yICh2YXIgcHJvcGVydHkgaW4gc291cmNlKSB7XG4gICAgaWYgKGRlc3RpbmF0aW9uW3Byb3BlcnR5XSA9PT0gdW5kZWZpbmVkKSBkZXN0aW5hdGlvbltwcm9wZXJ0eV0gPSBzb3VyY2VbcHJvcGVydHldO1xuICB9XG59XG5mdW5jdGlvbiBzaGFsbG93Q2xlYXJDbG9uZShzb3VyY2UpIHtcbiAgLy8gb3ZlcnJpZGUgcHJldmlvdXMsIG5vIG51bGwgYW5kIHVuZGVmaW5lZFxuICB2YXIgZGVzdGluYXRpb24gPSB7fTtcblxuICBmb3IgKHZhciBwcm9wZXJ0eSBpbiBzb3VyY2UpIHtcbiAgICAvLyBUT0RPOiAgT2JqZWN0LmFzc2lnbiAobmVlZCBwb2x5ZmlsbCBmb3IgSUUxMSlcbiAgICB2YXIgdiA9IHNvdXJjZVtwcm9wZXJ0eV07XG4gICAgaWYgKCEodiA9PT0gbnVsbCB8fCB2ID09PSB1bmRlZmluZWQpKSBkZXN0aW5hdGlvbltwcm9wZXJ0eV0gPSB2O1xuICB9XG5cbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIHNvdXJjZXMgPSBuZXcgQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIHNvdXJjZXNbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgaWYgKHNvdXJjZXMpIHNvdXJjZXMuZm9yRWFjaChmdW5jdGlvbiAocykge1xuICAgIGZvciAodmFyIF9wcm9wZXJ0eSBpbiBzKSB7XG4gICAgICB2YXIgX3YgPSBzW19wcm9wZXJ0eV07XG4gICAgICBpZiAoIShfdiA9PT0gbnVsbCB8fCBfdiA9PT0gdW5kZWZpbmVkKSkgZGVzdGluYXRpb25bX3Byb3BlcnR5XSA9IF92O2Vsc2UgaWYgKGRlc3RpbmF0aW9uLmhhc093blByb3BlcnR5KF9wcm9wZXJ0eSkpIHtcbiAgICAgICAgZGVsZXRlIGRlc3RpbmF0aW9uW19wcm9wZXJ0eV07XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGRlc3RpbmF0aW9uO1xufVxuXG5mdW5jdGlvbiBmb3JFYWNoUmVjdXJzaW9uKGYsIGUpIHtcbiAgaWYgKCFlKSByZXR1cm47XG4gIHZhciBnb09uID0gZihlLnZhbHVlKTtcbiAgaWYgKCEoZ29PbiA9PT0gZmFsc2UpKSBmb3JFYWNoUmVjdXJzaW9uKGYsIGUucHJldik7XG59XG5cbmZ1bmN0aW9uIGluZGV4UmVjdXJzaW9uKGluZGV4LCBlKSB7XG4gIGlmICghZS5wcmV2KSByZXR1cm4gaW5kZXg7XG4gIGluZGV4UmVjdXJzaW9uKCsraW5kZXgsIGUucHJldik7XG59XG5cbmZ1bmN0aW9uIExpc3QoKSB7XG4gIHZhciB0YWlsID0gbnVsbDtcbiAgdmFyIGNvdW50ID0gMDtcbiAgcmV0dXJuIHtcbiAgICBhZGQ6IGZ1bmN0aW9uIGFkZChlKSB7XG4gICAgICBpZiAodGFpbCkge1xuICAgICAgICB0YWlsLm5leHQgPSB7XG4gICAgICAgICAgdmFsdWU6IGUsXG4gICAgICAgICAgcHJldjogdGFpbCxcbiAgICAgICAgICBuZXh0OiBudWxsXG4gICAgICAgIH07XG4gICAgICAgIHRhaWwgPSB0YWlsLm5leHQ7XG4gICAgICB9IGVsc2UgdGFpbCA9IHtcbiAgICAgICAgdmFsdWU6IGUsXG4gICAgICAgIHByZXY6IG51bGwsXG4gICAgICAgIG5leHQ6IG51bGxcbiAgICAgIH07XG5cbiAgICAgIGNvdW50Kys7XG4gICAgICB2YXIgbm9kZSA9IHRhaWw7XG5cbiAgICAgIGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgICAgaWYgKG5vZGUucHJldikge1xuICAgICAgICAgIG5vZGUucHJldi5uZXh0ID0gbm9kZS5uZXh0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5vZGUubmV4dCkge1xuICAgICAgICAgIG5vZGUubmV4dC5wcmV2ID0gbm9kZS5wcmV2O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRhaWwgPT0gbm9kZSkge1xuICAgICAgICAgIHRhaWwgPSBub2RlLnByZXY7XG4gICAgICAgIH1cblxuICAgICAgICBjb3VudC0tO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBpbmRleCgpIHtcbiAgICAgICAgcmV0dXJuIGluZGV4UmVjdXJzaW9uKDAsIG5vZGUpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICByZW1vdmU6IHJlbW92ZSxcbiAgICAgICAgaW5kZXg6IGluZGV4XG4gICAgICB9O1xuICAgIH0sXG4gICAgZm9yRWFjaDogZnVuY3Rpb24gZm9yRWFjaChmKSB7XG4gICAgICBmb3JFYWNoUmVjdXJzaW9uKGYsIHRhaWwpO1xuICAgIH0sXG4gICAgZ2V0VGFpbDogZnVuY3Rpb24gZ2V0VGFpbCgpIHtcbiAgICAgIHJldHVybiB0YWlsID8gdGFpbC52YWx1ZSA6IG51bGw7XG4gICAgfSxcbiAgICBnZXRDb3VudDogZnVuY3Rpb24gZ2V0Q291bnQoKSB7XG4gICAgICByZXR1cm4gY291bnQ7XG4gICAgfSxcbiAgICBpc0VtcHR5OiBmdW5jdGlvbiBpc0VtcHR5KCkge1xuICAgICAgcmV0dXJuIGNvdW50ID09IDA7XG4gICAgfSxcbiAgICByZXNldDogZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgICB0YWlsID0gbnVsbDtcbiAgICAgIGNvdW50ID0gMDtcbiAgICB9XG4gIH07XG59XG5mdW5jdGlvbiBEb3VibHlMaW5rZWRMaXN0KGdldFByZXYsIHNldFByZXYsIGdldE5leHQsIHNldE5leHQpIHtcbiAgdmFyIGhlYWQgPSBudWxsLFxuICAgICAgdGFpbCA9IG51bGw7XG4gIHZhciBjb3VudCA9IDA7XG4gIHJldHVybiB7XG4gICAgYWRkOiBmdW5jdGlvbiBhZGQoZSwgbmV4dCkge1xuICAgICAgaWYgKCF0YWlsKSB7XG4gICAgICAgIGhlYWQgPSB0YWlsID0gZTtcbiAgICAgICAgc2V0UHJldihlLCBudWxsKTtcbiAgICAgICAgc2V0TmV4dChlLCBudWxsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghbmV4dCkge1xuICAgICAgICAgIHNldFByZXYoZSwgdGFpbCk7XG4gICAgICAgICAgc2V0TmV4dChlLCBudWxsKTtcbiAgICAgICAgICBzZXROZXh0KHRhaWwsIGUpO1xuICAgICAgICAgIHRhaWwgPSBlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChuZXh0ID09PSBoZWFkKSBoZWFkID0gZTtcbiAgICAgICAgICB2YXIgcHJldiA9IGdldFByZXYobmV4dCk7XG4gICAgICAgICAgc2V0TmV4dChlLCBuZXh0KTtcbiAgICAgICAgICBzZXRQcmV2KG5leHQsIGUpO1xuXG4gICAgICAgICAgaWYgKHByZXYpIHtcbiAgICAgICAgICAgIHNldFByZXYoZSwgcHJldik7XG4gICAgICAgICAgICBzZXROZXh0KHByZXYsIGUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZXRQcmV2KGUsIG51bGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb3VudCsrO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoZSkge1xuICAgICAgdmFyIG5leHQgPSBnZXROZXh0KGUpO1xuICAgICAgdmFyIHByZXYgPSBnZXRQcmV2KGUpO1xuXG4gICAgICBpZiAocHJldikge1xuICAgICAgICBzZXROZXh0KHByZXYsIG5leHQpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmV4dCkge1xuICAgICAgICBzZXRQcmV2KG5leHQsIHByZXYpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGFpbCA9PSBlKSB7XG4gICAgICAgIHRhaWwgPSBwcmV2O1xuICAgICAgfVxuXG4gICAgICBpZiAoaGVhZCA9PSBlKSB7XG4gICAgICAgIGhlYWQgPSBuZXh0O1xuICAgICAgfVxuXG4gICAgICBjb3VudC0tO1xuICAgIH0sXG4gICAgZ2V0SGVhZDogZnVuY3Rpb24gZ2V0SGVhZCgpIHtcbiAgICAgIHJldHVybiBoZWFkO1xuICAgIH0sXG4gICAgZ2V0VGFpbDogZnVuY3Rpb24gZ2V0VGFpbCgpIHtcbiAgICAgIHJldHVybiB0YWlsO1xuICAgIH0sXG4gICAgZ2V0Q291bnQ6IGZ1bmN0aW9uIGdldENvdW50KCkge1xuICAgICAgcmV0dXJuIGNvdW50O1xuICAgIH0sXG4gICAgaXNFbXB0eTogZnVuY3Rpb24gaXNFbXB0eSgpIHtcbiAgICAgIHJldHVybiBjb3VudCA9PSAwO1xuICAgIH0sXG4gICAgcmVzZXQ6IGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgICAgdGFpbCA9IGhlYWQgPSBudWxsO1xuICAgICAgY291bnQgPSAwO1xuICAgIH1cbiAgfTtcbn1cbmZ1bmN0aW9uIEFycmF5RmFjYWRlKCkge1xuICB2YXIgbGlzdCA9IFtdO1xuICByZXR1cm4ge1xuICAgIHB1c2g6IGZ1bmN0aW9uIHB1c2goZSkge1xuICAgICAgbGlzdC5wdXNoKGUpO1xuICAgIH0sXG4gICAgYWRkOiBmdW5jdGlvbiBhZGQoZSwga2V5KSB7XG4gICAgICBsaXN0LnNwbGljZShrZXksIDAsIGUpO1xuICAgIH0sXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoa2V5KSB7XG4gICAgICByZXR1cm4gbGlzdFtrZXldO1xuICAgIH0sXG4gICAgZ2V0TmV4dDogZnVuY3Rpb24gZ2V0TmV4dChrZXksIHByZWRpY2F0ZSkge1xuICAgICAgdmFyIGNvdW50ID0gbGlzdC5sZW5ndGg7XG4gICAgICB2YXIgc3RhcnQgPSBrZXkgKyAxO1xuXG4gICAgICBpZiAoa2V5IDwgY291bnQpIHtcbiAgICAgICAgaWYgKCFwcmVkaWNhdGUpIHJldHVybiBsaXN0W3N0YXJ0XTtcblxuICAgICAgICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGMgPSBsaXN0W2ldO1xuICAgICAgICAgIGlmIChwcmVkaWNhdGUoYykpIHJldHVybiBjO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZShrZXkpIHtcbiAgICAgIHZhciBlID0gbGlzdFtrZXldO1xuICAgICAgbGlzdC5zcGxpY2Uoa2V5LCAxKTtcbiAgICAgIHJldHVybiBlO1xuICAgIH0sXG4gICAgZm9yTG9vcDogZnVuY3Rpb24gZm9yTG9vcChmKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGUgPSBsaXN0W2ldO1xuICAgICAgICBmKGUsIGkpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZ2V0SGVhZDogZnVuY3Rpb24gZ2V0SGVhZCgpIHtcbiAgICAgIHJldHVybiBsaXN0WzBdO1xuICAgIH0sXG4gICAgZ2V0Q291bnQ6IGZ1bmN0aW9uIGdldENvdW50KCkge1xuICAgICAgcmV0dXJuIGxpc3QubGVuZ3RoO1xuICAgIH0sXG4gICAgaXNFbXB0eTogZnVuY3Rpb24gaXNFbXB0eSgpIHtcbiAgICAgIHJldHVybiBsaXN0Lmxlbmd0aCA9PSAwO1xuICAgIH0sXG4gICAgcmVzZXQ6IGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgICAgbGlzdCA9IFtdO1xuICAgIH1cbiAgfTtcbn1cbmZ1bmN0aW9uIGNvbXBvc2VTeW5jKCkge1xuICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGZ1bmN0aW9ucyA9IG5ldyBBcnJheShfbGVuMiksIF9rZXkyID0gMDsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgIGZ1bmN0aW9uc1tfa2V5Ml0gPSBhcmd1bWVudHNbX2tleTJdO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZnVuY3Rpb25zLmZvckVhY2goZnVuY3Rpb24gKGYpIHtcbiAgICAgIGlmIChmKSBmKCk7XG4gICAgfSk7XG4gIH07XG59XG5mdW5jdGlvbiBkZWZDYWxsKCkge1xuICBmb3IgKHZhciBfbGVuMyA9IGFyZ3VtZW50cy5sZW5ndGgsIGZ1bmN0aW9ucyA9IG5ldyBBcnJheShfbGVuMyksIF9rZXkzID0gMDsgX2tleTMgPCBfbGVuMzsgX2tleTMrKykge1xuICAgIGZ1bmN0aW9uc1tfa2V5M10gPSBhcmd1bWVudHNbX2tleTNdO1xuICB9XG5cbiAgZm9yICh2YXIgX2kgPSAwLCBfZnVuY3Rpb25zID0gZnVuY3Rpb25zOyBfaSA8IF9mdW5jdGlvbnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgdmFyIGYgPSBfZnVuY3Rpb25zW19pXTtcblxuICAgIGlmIChmKSB7XG4gICAgICBpZiAoZiBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgIHZhciB0bXAgPSBmKCk7XG4gICAgICAgIGlmICh0bXApIHJldHVybiB0bXA7XG4gICAgICB9IGVsc2UgcmV0dXJuIGY7XG4gICAgfVxuICB9XG59XG5mdW5jdGlvbiBPYnNlcnZhYmxlVmFsdWUodmFsdWUpIHtcbiAgdmFyIGxpc3QgPSBMaXN0KCk7XG4gIHJldHVybiB7XG4gICAgZ2V0VmFsdWU6IGZ1bmN0aW9uIGdldFZhbHVlKCkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0sXG4gICAgc2V0VmFsdWU6IGZ1bmN0aW9uIHNldFZhbHVlKG5ld1ZhbHVlKSB7XG4gICAgICB2YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgbGlzdC5mb3JFYWNoKGZ1bmN0aW9uIChmKSB7XG4gICAgICAgIHJldHVybiBmKG5ld1ZhbHVlKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgYXR0YWNoOiBmdW5jdGlvbiBhdHRhY2goZikge1xuICAgICAgcmV0dXJuIGxpc3QuYWRkKGYpO1xuICAgIH0sXG4gICAgZGV0YWNoQWxsOiBmdW5jdGlvbiBkZXRhY2hBbGwoKSB7XG4gICAgICBsaXN0LnJlc2V0KCk7XG4gICAgfVxuICB9O1xufVxuZnVuY3Rpb24gT2JzZXJ2YWJsZUxhbWJkYShmdW5jKSB7XG4gIHZhciBsaXN0ID0gTGlzdCgpO1xuICB2YXIgdmFsdWUgPSBmdW5jKCk7XG4gIHJldHVybiB7XG4gICAgZ2V0VmFsdWU6IGZ1bmN0aW9uIGdldFZhbHVlKCkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0sXG4gICAgY2FsbDogZnVuY3Rpb24gY2FsbCgpIHtcbiAgICAgIHZhbHVlID0gZnVuYygpO1xuICAgICAgbGlzdC5mb3JFYWNoKGZ1bmN0aW9uIChmKSB7XG4gICAgICAgIHJldHVybiBmKHZhbHVlKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgYXR0YWNoOiBmdW5jdGlvbiBhdHRhY2goZikge1xuICAgICAgcmV0dXJuIGxpc3QuYWRkKGYpO1xuICAgIH0sXG4gICAgZGV0YWNoQWxsOiBmdW5jdGlvbiBkZXRhY2hBbGwoKSB7XG4gICAgICBsaXN0LnJlc2V0KCk7XG4gICAgfVxuICB9O1xufVxuZnVuY3Rpb24gT2JqZWN0VmFsdWVzKG9iamVjdCkge1xuICAvLyBPYmplY3QudmFsdWVzKHBsdWdpbnMpIC0gcHJvYmxlbSBmb3IgSUUxMTsgZnVsbCBpbXBlbWVudGF0aW9uIG9mIHBvbGlmaWxsIGlzIG1vciBjb21wbGV4LCBidXQgZm9yIG91ciBwdXJwb3NlIHRoaXMgaXMgZW5vdWdoXG4gIHZhciBhcnIgPSBbXTtcblxuICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgYXJyLnB1c2gob2JqZWN0W2tleV0pO1xuICB9XG5cbiAgcmV0dXJuIGFycjtcbn1cblxuZnVuY3Rpb24gTGFiZWxGb3JBdHRyaWJ1dGVQbHVnaW4oYXNwZWN0cykge1xuICB2YXIgc3RhdGljRG9tID0gYXNwZWN0cy5zdGF0aWNEb20sXG4gICAgICBmaWx0ZXJEb20gPSBhc3BlY3RzLmZpbHRlckRvbSxcbiAgICAgIGdldExhYmVsRWxlbWVudEFzcGVjdCA9IGFzcGVjdHMuZ2V0TGFiZWxFbGVtZW50QXNwZWN0LFxuICAgICAgY29uZmlndXJhdGlvbiA9IGFzcGVjdHMuY29uZmlndXJhdGlvbixcbiAgICAgIGxvYWRBc3BlY3QgPSBhc3BlY3RzLmxvYWRBc3BlY3QsXG4gICAgICBkaXNwb3NlQXNwZWN0ID0gYXNwZWN0cy5kaXNwb3NlQXNwZWN0O1xuICB2YXIgY29udGFpbmVyQ2xhc3MgPSBjb25maWd1cmF0aW9uLmNvbnRhaW5lckNsYXNzO1xuICB2YXIgbGFiZWxGb3JBdHRyaWJ1dGVBc3BlY3QgPSBMYWJlbEZvckF0dHJpYnV0ZUFzcGVjdChzdGF0aWNEb20sIGZpbHRlckRvbSwgY29udGFpbmVyQ2xhc3MsIGdldExhYmVsRWxlbWVudEFzcGVjdCwgZGlzcG9zZUFzcGVjdCk7XG4gIGFzcGVjdHMubGFiZWxGb3JBdHRyaWJ1dGVBc3BlY3QgPSBsYWJlbEZvckF0dHJpYnV0ZUFzcGVjdDtcbiAgbG9hZEFzcGVjdC5sb2FkID0gY29tcG9zZVN5bmMobG9hZEFzcGVjdC5sb2FkLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGxhYmVsRm9yQXR0cmlidXRlQXNwZWN0LnVwZGF0ZSgpO1xuICB9KTtcbn1cblxuTGFiZWxGb3JBdHRyaWJ1dGVQbHVnaW4ucGx1Z0RlZmF1bHRDb25maWcgPSBmdW5jdGlvbiAoZGVmYXVsdHMpIHtcbiAgZGVmYXVsdHMubGFiZWwgPSBudWxsO1xufTtcblxuTGFiZWxGb3JBdHRyaWJ1dGVQbHVnaW4ucGx1Z1N0YXRpY0RvbSA9IGZ1bmN0aW9uIChhc3BlY3RzKSB7XG4gIGFzcGVjdHMuZ2V0TGFiZWxFbGVtZW50QXNwZWN0ID0gR2V0TGFiZWxFbGVtZW50QXNwZWN0KGFzcGVjdHMuY29uZmlndXJhdGlvbi5sYWJlbCk7XG59O1xuXG5mdW5jdGlvbiBHZXRMYWJlbEVsZW1lbnRBc3BlY3QobGFiZWwpIHtcbiAgcmV0dXJuIHtcbiAgICBnZXRMYWJlbEVsZW1lbnQ6IGZ1bmN0aW9uIGdldExhYmVsRWxlbWVudCgpIHtcbiAgICAgIC8vIG92ZXJyaWRlZCBieSBCUyBBcHBlYXJhbmNlIFBsdWdpblxuICAgICAgZGVmQ2FsbChsYWJlbCk7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBMYWJlbEZvckF0dHJpYnV0ZUFzcGVjdChzdGF0aWNEb20sIGZpbHRlckRvbSwgY29udGFpbmVyQ2xhc3MsIGdldExhYmVsRWxlbWVudEFzcGVjdCwgZGlzcG9zZUFzcGVjdCkge1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgICAgdmFyIGNyZWF0ZUlucHV0SWQgPSBudWxsO1xuICAgICAgdmFyIHNlbGVjdEVsZW1lbnQgPSBzdGF0aWNEb20uc2VsZWN0RWxlbWVudCxcbiAgICAgICAgICBjb250YWluZXJFbGVtZW50ID0gc3RhdGljRG9tLmNvbnRhaW5lckVsZW1lbnQ7XG4gICAgICB2YXIgZmlsdGVySW5wdXRFbGVtZW50ID0gZmlsdGVyRG9tLmZpbHRlcklucHV0RWxlbWVudDtcbiAgICAgIGlmIChzZWxlY3RFbGVtZW50KSBjcmVhdGVJbnB1dElkID0gZnVuY3Rpb24gY3JlYXRlSW5wdXRJZCgpIHtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lckNsYXNzICsgXCItZ2VuZXJhdGVkLWlucHV0LVwiICsgKHNlbGVjdEVsZW1lbnQuaWQgPyBzZWxlY3RFbGVtZW50LmlkIDogc2VsZWN0RWxlbWVudC5uYW1lKS50b0xvd2VyQ2FzZSgpICsgXCItaWRcIjtcbiAgICAgIH07ZWxzZSBjcmVhdGVJbnB1dElkID0gZnVuY3Rpb24gY3JlYXRlSW5wdXRJZCgpIHtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lckNsYXNzICsgXCItZ2VuZXJhdGVkLWZpbHRlci1cIiArIGNvbnRhaW5lckVsZW1lbnQuaWQ7XG4gICAgICB9O1xuICAgICAgdmFyIGxhYmVsRWxlbWVudCA9IGdldExhYmVsRWxlbWVudEFzcGVjdC5nZXRMYWJlbEVsZW1lbnQoKTtcblxuICAgICAgaWYgKGxhYmVsRWxlbWVudCkge1xuICAgICAgICB2YXIgYmFja3VwZWRGb3JBdHRyaWJ1dGUgPSBsYWJlbEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdmb3InKTtcbiAgICAgICAgdmFyIG5ld0lkID0gY3JlYXRlSW5wdXRJZCgpO1xuICAgICAgICBmaWx0ZXJJbnB1dEVsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsIG5ld0lkKTtcbiAgICAgICAgbGFiZWxFbGVtZW50LnNldEF0dHJpYnV0ZSgnZm9yJywgbmV3SWQpO1xuXG4gICAgICAgIGlmIChiYWNrdXBlZEZvckF0dHJpYnV0ZSkge1xuICAgICAgICAgIGRpc3Bvc2VBc3BlY3QuZGlzcG9zZSA9IGNvbXBvc2VTeW5jKGRpc3Bvc2VBc3BlY3QuZGlzcG9zZSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGxhYmVsRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2ZvcicsIGJhY2t1cGVkRm9yQXR0cmlidXRlKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gUnRsUGx1Z2luKGFzcGVjdHMpIHtcbiAgdmFyIGNvbmZpZ3VyYXRpb24gPSBhc3BlY3RzLmNvbmZpZ3VyYXRpb24sXG4gICAgICBydGxBc3BlY3QgPSBhc3BlY3RzLnJ0bEFzcGVjdCxcbiAgICAgIHN0YXRpY0RvbSA9IGFzcGVjdHMuc3RhdGljRG9tO1xuICB2YXIgaXNSdGwgPSBjb25maWd1cmF0aW9uLmlzUnRsO1xuICB2YXIgZm9yY2VSdGxPbkNvbnRhaW5lciA9IGZhbHNlO1xuICBpZiAoaXNCb29sZWFuKGlzUnRsKSkgZm9yY2VSdGxPbkNvbnRhaW5lciA9IHRydWU7ZWxzZSBpc1J0bCA9IGdldElzUnRsKHN0YXRpY0RvbS5pbml0aWFsRWxlbWVudCk7XG4gIHZhciBhdHRyaWJ1dGVCYWNrdXAgPSBBdHRyaWJ1dGVCYWNrdXAoKTtcblxuICBpZiAoZm9yY2VSdGxPbkNvbnRhaW5lcikge1xuICAgIGF0dHJpYnV0ZUJhY2t1cC5zZXQoc3RhdGljRG9tLmNvbnRhaW5lckVsZW1lbnQsIFwiZGlyXCIsIFwicnRsXCIpO1xuICB9IGVsc2UgaWYgKHN0YXRpY0RvbS5zZWxlY3RFbGVtZW50KSB7XG4gICAgdmFyIGRpckF0dHJpYnV0ZVZhbHVlID0gc3RhdGljRG9tLnNlbGVjdEVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGlyXCIpO1xuXG4gICAgaWYgKGRpckF0dHJpYnV0ZVZhbHVlKSB7XG4gICAgICBhdHRyaWJ1dGVCYWNrdXAuc2V0KHN0YXRpY0RvbS5jb250YWluZXJFbGVtZW50LCBcImRpclwiLCBkaXJBdHRyaWJ1dGVWYWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBidWlsZEFwaTogZnVuY3Rpb24gYnVpbGRBcGkoYXBpKSB7XG4gICAgICAvLyBUT0RPOiB0aGVyZSBpcyBzb21ldGhpbmcgd3Jvbmcgd2l0aCB0aGlzLiBtYXkgYmUgc2hvdWxkIG1vdmVkIHRvIHNwZWNpZmljIHBsdWdpblxuICAgICAgLy8gc2FtcGxlIG9mIGNvcnJlY3QgcGx1Z2luIC0gYXNwZWN0IHBhaXIgaXMgV2FybmluZ1BsdWdpbjogYXNwZWN0IGlzIGFkZGVkIG9uIHBsdWdpbiBjb25zdHJ1Y3RvclxuICAgICAgcnRsQXNwZWN0LnVwZGF0ZVJ0bChpc1J0bCk7XG4gICAgfSxcbiAgICBkaXNwb3NlOiBmdW5jdGlvbiBkaXNwb3NlKCkge1xuICAgICAgYXR0cmlidXRlQmFja3VwLnJlc3RvcmUoKTtcbiAgICB9XG4gIH07XG59XG5cblJ0bFBsdWdpbi5wbHVnU3RhdGljRG9tID0gZnVuY3Rpb24gKGFzcGVjdHMpIHtcbiAgYXNwZWN0cy5ydGxBc3BlY3QgPSBSdGxBc3BlY3QoKTtcbn07XG5cbmZ1bmN0aW9uIFJ0bEFzcGVjdCgpIHtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGVSdGw6IGZ1bmN0aW9uIHVwZGF0ZVJ0bCgpIHt9XG4gIH07XG59XG5cbmZ1bmN0aW9uIEZvcm1SZXNldFBsdWdpbihhc3BlY3RzKSB7XG4gIHZhciBzdGF0aWNEb20gPSBhc3BlY3RzLnN0YXRpY0RvbSxcbiAgICAgIHVwZGF0ZURhdGFBc3BlY3QgPSBhc3BlY3RzLnVwZGF0ZURhdGFBc3BlY3QsXG4gICAgICBlbnZpcm9ubWVudCA9IGFzcGVjdHMuZW52aXJvbm1lbnQ7XG4gIHZhciBldmVudEJ1aWxkZXIgPSBFdmVudEJpbmRlcigpO1xuXG4gIGlmIChzdGF0aWNEb20uc2VsZWN0RWxlbWVudCkge1xuICAgIHZhciBmb3JtID0gY2xvc2VzdEJ5VGFnTmFtZShzdGF0aWNEb20uc2VsZWN0RWxlbWVudCwgJ0ZPUk0nKTtcblxuICAgIGlmIChmb3JtKSB7XG4gICAgICBldmVudEJ1aWxkZXIuYmluZChmb3JtLCAncmVzZXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBlbnZpcm9ubWVudC53aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIHVwZGF0ZURhdGFBc3BlY3QudXBkYXRlRGF0YSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZGlzcG9zZTogZnVuY3Rpb24gZGlzcG9zZSgpIHtcbiAgICAgIGV2ZW50QnVpbGRlci51bmJpbmQoKTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVZhbGlkaXR5KHZhbHVlTWlzc2luZywgY3VzdG9tRXJyb3IpIHtcbiAgcmV0dXJuIE9iamVjdC5mcmVlemUoe1xuICAgIHZhbHVlTWlzc2luZzogdmFsdWVNaXNzaW5nLFxuICAgIGN1c3RvbUVycm9yOiBjdXN0b21FcnJvcixcbiAgICB2YWxpZDogISh2YWx1ZU1pc3NpbmcgfHwgY3VzdG9tRXJyb3IpXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBWYWxpZGl0eUFwaSh2aXNpYmxlRWxlbWVudCwgaXNWYWx1ZU1pc3NpbmdPYnNlcnZhYmxlLCB2YWx1ZU1pc3NpbmdNZXNzYWdlLCBvblZhbGlkLCB0cmlnZ2VyKSB7XG4gIHZhciBjdXN0b21WYWxpZGF0aW9uTWVzc2FnZSA9IFwiXCI7XG4gIHZhciB2YWxpZGF0aW9uTWVzc2FnZSA9IFwiXCI7XG4gIHZhciB2YWxpZGl0eSA9IG51bGw7XG4gIHZhciB3aWxsVmFsaWRhdGUgPSB0cnVlO1xuXG4gIGZ1bmN0aW9uIHNldE1lc3NhZ2UodmFsdWVNaXNzaW5nLCBjdXN0b21FcnJvcikge1xuICAgIHZhbGlkaXR5ID0gY3JlYXRlVmFsaWRpdHkodmFsdWVNaXNzaW5nLCBjdXN0b21FcnJvcik7XG4gICAgdmFsaWRhdGlvbk1lc3NhZ2UgPSBjdXN0b21FcnJvciA/IGN1c3RvbVZhbGlkYXRpb25NZXNzYWdlIDogdmFsdWVNaXNzaW5nID8gdmFsdWVNaXNzaW5nTWVzc2FnZSA6IFwiXCI7XG4gICAgdmlzaWJsZUVsZW1lbnQuc2V0Q3VzdG9tVmFsaWRpdHkodmFsaWRhdGlvbk1lc3NhZ2UpO1xuICAgIG9uVmFsaWQodmFsaWRpdHkudmFsaWQpO1xuICB9XG5cbiAgc2V0TWVzc2FnZShpc1ZhbHVlTWlzc2luZ09ic2VydmFibGUuZ2V0VmFsdWUoKSwgZmFsc2UpO1xuICBpc1ZhbHVlTWlzc2luZ09ic2VydmFibGUuYXR0YWNoKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHNldE1lc3NhZ2UodmFsdWUsIHZhbGlkaXR5LmN1c3RvbUVycm9yKTtcbiAgfSk7XG5cbiAgdmFyIGNoZWNrVmFsaWRpdHkgPSBmdW5jdGlvbiBjaGVja1ZhbGlkaXR5KCkge1xuICAgIGlmICghdmFsaWRpdHkudmFsaWQpIHRyaWdnZXIoJ2Rhc2hib2FyZGNvZGUubXVsdGlzZWxlY3Q6aW52YWxpZCcpO1xuICAgIHJldHVybiB2YWxpZGl0eS52YWxpZDtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHZhbGlkYXRpb25NZXNzYWdlOiB2YWxpZGF0aW9uTWVzc2FnZSxcbiAgICB3aWxsVmFsaWRhdGU6IHdpbGxWYWxpZGF0ZSxcbiAgICB2YWxpZGl0eTogdmFsaWRpdHksXG4gICAgc2V0Q3VzdG9tVmFsaWRpdHk6IGZ1bmN0aW9uIHNldEN1c3RvbVZhbGlkaXR5KG1lc3NhZ2UpIHtcbiAgICAgIGN1c3RvbVZhbGlkYXRpb25NZXNzYWdlID0gbWVzc2FnZTtcbiAgICAgIHNldE1lc3NhZ2UodmFsaWRpdHkudmFsdWVNaXNzaW5nLCBjdXN0b21WYWxpZGF0aW9uTWVzc2FnZSA/IHRydWUgOiBmYWxzZSk7XG4gICAgfSxcbiAgICBjaGVja1ZhbGlkaXR5OiBjaGVja1ZhbGlkaXR5LFxuICAgIHJlcG9ydFZhbGlkaXR5OiBmdW5jdGlvbiByZXBvcnRWYWxpZGl0eSgpIHtcbiAgICAgIHZpc2libGVFbGVtZW50LnJlcG9ydFZhbGlkaXR5KCk7XG4gICAgICByZXR1cm4gY2hlY2tWYWxpZGl0eSgpO1xuICAgIH1cbiAgfTtcbn1cblxudmFyIGRlZlZhbHVlTWlzc2luZ01lc3NhZ2UgPSAnUGxlYXNlIHNlbGVjdCBhbiBpdGVtIGluIHRoZSBsaXN0JztcbmZ1bmN0aW9uIFZhbGlkYXRpb25BcGlQbHVnaW4ocGx1Z2luRGF0YSkge1xuICB2YXIgY29uZmlndXJhdGlvbiA9IHBsdWdpbkRhdGEuY29uZmlndXJhdGlvbixcbiAgICAgIHRyaWdnZXJBc3BlY3QgPSBwbHVnaW5EYXRhLnRyaWdnZXJBc3BlY3QsXG4gICAgICBvbkNoYW5nZUFzcGVjdCA9IHBsdWdpbkRhdGEub25DaGFuZ2VBc3BlY3QsXG4gICAgICBvcHRpb25zQXNwZWN0ID0gcGx1Z2luRGF0YS5vcHRpb25zQXNwZWN0LFxuICAgICAgc3RhdGljRG9tID0gcGx1Z2luRGF0YS5zdGF0aWNEb20sXG4gICAgICBmaWx0ZXJEb20gPSBwbHVnaW5EYXRhLmZpbHRlckRvbSxcbiAgICAgIHVwZGF0ZURhdGFBc3BlY3QgPSBwbHVnaW5EYXRhLnVwZGF0ZURhdGFBc3BlY3Q7IC8vIFRPRE86IHJlcXVpcmVkIGNvdWxkIGJlIGEgZnVuY3Rpb25cblxuICB2YXIgZ2V0SXNWYWx1ZU1pc3NpbmcgPSBjb25maWd1cmF0aW9uLmdldElzVmFsdWVNaXNzaW5nLFxuICAgICAgdmFsdWVNaXNzaW5nTWVzc2FnZSA9IGNvbmZpZ3VyYXRpb24udmFsdWVNaXNzaW5nTWVzc2FnZSxcbiAgICAgIHJlcXVpcmVkID0gY29uZmlndXJhdGlvbi5yZXF1aXJlZCxcbiAgICAgIGdldFZhbHVlUmVxdWlyZWQgPSBjb25maWd1cmF0aW9uLmdldFZhbHVlUmVxdWlyZWQ7XG4gIGlmICghaXNCb29sZWFuKHJlcXVpcmVkKSkgcmVxdWlyZWQgPSBnZXRWYWx1ZVJlcXVpcmVkKCk7XG4gIHZhbHVlTWlzc2luZ01lc3NhZ2UgPSBkZWZDYWxsKHZhbHVlTWlzc2luZ01lc3NhZ2UsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZ2V0RGF0YUd1YXJkZWRXaXRoUHJlZml4KHN0YXRpY0RvbS5pbml0aWFsRWxlbWVudCwgXCJic211bHRpc2VsZWN0XCIsIFwidmFsdWUtbWlzc2luZy1tZXNzYWdlXCIpO1xuICB9LCBkZWZWYWx1ZU1pc3NpbmdNZXNzYWdlKTtcblxuICBpZiAoIWdldElzVmFsdWVNaXNzaW5nKSB7XG4gICAgZ2V0SXNWYWx1ZU1pc3NpbmcgPSBmdW5jdGlvbiBnZXRJc1ZhbHVlTWlzc2luZygpIHtcbiAgICAgIHZhciBjb3VudCA9IDA7XG4gICAgICB2YXIgb3B0aW9uc0FycmF5ID0gb3B0aW9uc0FzcGVjdC5nZXRPcHRpb25zKCk7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb3B0aW9uc0FycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChvcHRpb25zQXJyYXlbaV0uc2VsZWN0ZWQpIGNvdW50Kys7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb3VudCA9PT0gMDtcbiAgICB9O1xuICB9XG5cbiAgdmFyIGlzVmFsdWVNaXNzaW5nT2JzZXJ2YWJsZSA9IE9ic2VydmFibGVMYW1iZGEoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiByZXF1aXJlZCAmJiBnZXRJc1ZhbHVlTWlzc2luZygpO1xuICB9KTtcbiAgdmFyIHZhbGlkYXRpb25BcGlPYnNlcnZhYmxlID0gT2JzZXJ2YWJsZVZhbHVlKCFpc1ZhbHVlTWlzc2luZ09ic2VydmFibGUuZ2V0VmFsdWUoKSk7XG4gIG9uQ2hhbmdlQXNwZWN0Lm9uQ2hhbmdlID0gY29tcG9zZVN5bmMoaXNWYWx1ZU1pc3NpbmdPYnNlcnZhYmxlLmNhbGwsIG9uQ2hhbmdlQXNwZWN0Lm9uQ2hhbmdlKTtcbiAgdXBkYXRlRGF0YUFzcGVjdC51cGRhdGVEYXRhID0gY29tcG9zZVN5bmMoaXNWYWx1ZU1pc3NpbmdPYnNlcnZhYmxlLmNhbGwsIHVwZGF0ZURhdGFBc3BlY3QudXBkYXRlRGF0YSk7XG4gIHBsdWdpbkRhdGEudmFsaWRhdGlvbkFwaVBsdWdpbkRhdGEgPSB7XG4gICAgdmFsaWRhdGlvbkFwaU9ic2VydmFibGU6IHZhbGlkYXRpb25BcGlPYnNlcnZhYmxlXG4gIH07XG4gIHZhciB2YWxpZGF0aW9uQXBpID0gVmFsaWRpdHlBcGkoZmlsdGVyRG9tLmZpbHRlcklucHV0RWxlbWVudCwgaXNWYWx1ZU1pc3NpbmdPYnNlcnZhYmxlLCB2YWx1ZU1pc3NpbmdNZXNzYWdlLCBmdW5jdGlvbiAoaXNWYWxpZCkge1xuICAgIHJldHVybiB2YWxpZGF0aW9uQXBpT2JzZXJ2YWJsZS5zZXRWYWx1ZShpc1ZhbGlkKTtcbiAgfSwgdHJpZ2dlckFzcGVjdC50cmlnZ2VyKTtcbiAgcmV0dXJuIHtcbiAgICBidWlsZEFwaTogZnVuY3Rpb24gYnVpbGRBcGkoYXBpKSB7XG4gICAgICBhcGkudmFsaWRhdGlvbkFwaSA9IHZhbGlkYXRpb25BcGk7XG4gICAgfSxcbiAgICBkaXNwb3NlOiBmdW5jdGlvbiBkaXNwb3NlKCkge1xuICAgICAgaXNWYWx1ZU1pc3NpbmdPYnNlcnZhYmxlLmRldGFjaEFsbCgpO1xuICAgICAgdmFsaWRhdGlvbkFwaU9ic2VydmFibGUuZGV0YWNoQWxsKCk7XG4gICAgfVxuICB9O1xufVxuXG5WYWxpZGF0aW9uQXBpUGx1Z2luLnBsdWdEZWZhdWx0Q29uZmlnID0gZnVuY3Rpb24gKGRlZmF1bHRzKSB7XG4gIGRlZmF1bHRzLmdldFZhbHVlUmVxdWlyZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGRlZmF1bHRzLnZhbHVlTWlzc2luZ01lc3NhZ2UgPSAnJztcbn07XG5cbmZ1bmN0aW9uIGFkZFN0eWxpbmcoZWxlbWVudCwgc3R5bGluZykge1xuICB2YXIgYmFja3VwU3R5bGluZyA9IHtcbiAgICBjbGFzc2VzOiBbXSxcbiAgICBzdHlsZXM6IHt9XG4gIH07XG5cbiAgaWYgKHN0eWxpbmcpIHtcbiAgICB2YXIgY2xhc3NlcyA9IHN0eWxpbmcuY2xhc3NlcyxcbiAgICAgICAgc3R5bGVzID0gc3R5bGluZy5zdHlsZXM7XG4gICAgY2xhc3Nlcy5mb3JFYWNoKGZ1bmN0aW9uIChlKSB7XG4gICAgICByZXR1cm4gZWxlbWVudC5jbGFzc0xpc3QuYWRkKGUpO1xuICAgIH0pOyAvLyB0b2RvIHVzZSBhZGQoY2xhc3NlcylcblxuICAgIGJhY2t1cFN0eWxpbmcuY2xhc3NlcyA9IGNsYXNzZXMuc2xpY2UoKTtcblxuICAgIGZvciAodmFyIHByb3BlcnR5IGluIHN0eWxlcykge1xuICAgICAgYmFja3VwU3R5bGluZy5zdHlsZXNbcHJvcGVydHldID0gZWxlbWVudC5zdHlsZVtwcm9wZXJ0eV07XG4gICAgICBlbGVtZW50LnN0eWxlW3Byb3BlcnR5XSA9IHN0eWxlc1twcm9wZXJ0eV07IC8vIHRvZG8gdXNlIE9iamVjdC5hc3NpZ24gKG5lZWQgcG9seWZpbGwgZm9yIElFMTEpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJhY2t1cFN0eWxpbmc7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxpbmcoZWxlbWVudCwgc3R5bGluZykge1xuICBpZiAoc3R5bGluZykge1xuICAgIHZhciBjbGFzc2VzID0gc3R5bGluZy5jbGFzc2VzLFxuICAgICAgICBzdHlsZXMgPSBzdHlsaW5nLnN0eWxlcztcbiAgICBjbGFzc2VzLmZvckVhY2goZnVuY3Rpb24gKGUpIHtcbiAgICAgIHJldHVybiBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoZSk7XG4gICAgfSk7IC8vIHRvZG8gdXNlIHJlbW92ZShjbGFzc2VzKVxuXG4gICAgZm9yICh2YXIgcHJvcGVydHkgaW4gc3R5bGVzKSB7XG4gICAgICBlbGVtZW50LnN0eWxlW3Byb3BlcnR5XSA9IHN0eWxlc1twcm9wZXJ0eV07XG4gICAgfSAvLyB0b2RvIHVzZSBPYmplY3QuYXNzaWduIChuZWVkIHBvbHlmaWxsIGZvciBJRTExKVxuXG4gIH1cbn1cblxuZnVuY3Rpb24gdG9nZ2xlU3R5bGluZyhlbGVtZW50LCBzdHlsaW5nKSB7XG4gIHZhciBiYWNrdXBTdHlsaW5nID0ge1xuICAgIGNsYXNzZXM6IFtdLFxuICAgIHN0eWxlczoge31cbiAgfTtcbiAgdmFyIGlzT24gPSBmYWxzZTtcbiAgdmFyIGlzRiA9IHN0eWxpbmcgaW5zdGFuY2VvZiBGdW5jdGlvbjtcbiAgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSwgZm9yY2UpIHtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIGlmIChpc09uID09PSBmYWxzZSkge1xuICAgICAgICBiYWNrdXBTdHlsaW5nID0gYWRkU3R5bGluZyhlbGVtZW50LCBpc0YgPyBzdHlsaW5nKCkgOiBzdHlsaW5nKTtcbiAgICAgICAgaXNPbiA9IHRydWU7XG4gICAgICB9IGVsc2UgaWYgKGZvcmNlKSB7XG4gICAgICAgIHJlbW92ZVN0eWxpbmcoZWxlbWVudCwgYmFja3VwU3R5bGluZyk7XG4gICAgICAgIGJhY2t1cFN0eWxpbmcgPSBhZGRTdHlsaW5nKGVsZW1lbnQsIGlzRiA/IHN0eWxpbmcoKSA6IHN0eWxpbmcpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoaXNPbiA9PT0gdHJ1ZSB8fCBmb3JjZSA9PT0gdHJ1ZSkge1xuICAgICAgICByZW1vdmVTdHlsaW5nKGVsZW1lbnQsIGJhY2t1cFN0eWxpbmcpO1xuICAgICAgICBpc09uID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBleHRlbmRDbGFzc2VzKG91dCwgcGFyYW0sIGFjdGlvblN0ciwgYWN0aW9uQXJyLCBpc1JlbW92ZUVtcHR5Q2xhc3Nlcykge1xuICBpZiAoaXNTdHJpbmcocGFyYW0pKSB7XG4gICAgaWYgKHBhcmFtID09PSBcIlwiKSB7XG4gICAgICBpZiAoaXNSZW1vdmVFbXB0eUNsYXNzZXMpIHtcbiAgICAgICAgb3V0LmNsYXNzZXMgPSBbXTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGMgPSBwYXJhbS5zcGxpdCgnICcpO1xuICAgICAgb3V0LmNsYXNzZXMgPSBhY3Rpb25TdHIoYyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSBpZiAocGFyYW0gaW5zdGFuY2VvZiBBcnJheSkge1xuICAgIGlmIChwYXJhbS5sZW5ndGggPT0gMCkge1xuICAgICAgaWYgKGlzUmVtb3ZlRW1wdHlDbGFzc2VzKSB7XG4gICAgICAgIG91dC5jbGFzc2VzID0gW107XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG91dC5jbGFzc2VzID0gYWN0aW9uQXJyKHBhcmFtKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gZXh0ZW5kKHZhbHVlLCBwYXJhbSwgYWN0aW9uU3RyLCBhY3Rpb25BcnIsIGFjdGlvbk9iaiwgaXNSZW1vdmVFbXB0eUNsYXNzZXMpIHtcbiAgdmFyIHN1Y2Nlc3MgPSBleHRlbmRDbGFzc2VzKHZhbHVlLCBwYXJhbSwgYWN0aW9uU3RyLCBhY3Rpb25BcnIsIGlzUmVtb3ZlRW1wdHlDbGFzc2VzKTtcblxuICBpZiAoc3VjY2VzcyA9PT0gZmFsc2UpIHtcbiAgICBpZiAocGFyYW0gaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgIHZhciBjbGFzc2VzID0gcGFyYW0uY2xhc3NlcyxcbiAgICAgICAgICBzdHlsZXMgPSBwYXJhbS5zdHlsZXM7XG4gICAgICBleHRlbmRDbGFzc2VzKHZhbHVlLCBjbGFzc2VzLCBhY3Rpb25TdHIsIGFjdGlvbkFyciwgaXNSZW1vdmVFbXB0eUNsYXNzZXMpO1xuXG4gICAgICBpZiAoc3R5bGVzKSB7XG4gICAgICAgIHZhbHVlLnN0eWxlcyA9IGFjdGlvbk9iaihzdHlsZXMpO1xuICAgICAgfSBlbHNlIGlmICghY2xhc3Nlcykge1xuICAgICAgICB2YWx1ZS5zdHlsZXMgPSBhY3Rpb25PYmoocGFyYW0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBTdHlsaW5nKHBhcmFtKSB7XG4gIHZhciB2YWx1ZSA9IHtcbiAgICBjbGFzc2VzOiBbXSxcbiAgICBzdHlsZXM6IHt9XG4gIH07XG5cbiAgaWYgKHBhcmFtKSB7XG4gICAgZXh0ZW5kKHZhbHVlLCBwYXJhbSwgZnVuY3Rpb24gKGEpIHtcbiAgICAgIHJldHVybiBhO1xuICAgIH0sIGZ1bmN0aW9uIChhKSB7XG4gICAgICByZXR1cm4gYS5zbGljZSgpO1xuICAgIH0sIGZ1bmN0aW9uIChvKSB7XG4gICAgICByZXR1cm4gc2hhbGxvd0NsZWFyQ2xvbmUobyk7XG4gICAgfSwgdHJ1ZSk7XG4gIH1cblxuICByZXR1cm4gT2JqZWN0LmZyZWV6ZSh2YWx1ZSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0eWxpbmcoaXNSZXBsYWNlLCBwYXJhbSkge1xuICB2YXIgdmFsdWUgPSB7XG4gICAgY2xhc3NlczogW10sXG4gICAgc3R5bGVzOiB7fVxuICB9O1xuXG4gIGlmIChwYXJhbSkge1xuICAgIGV4dGVuZCh2YWx1ZSwgcGFyYW0sIGZ1bmN0aW9uIChhKSB7XG4gICAgICByZXR1cm4gYTtcbiAgICB9LCBmdW5jdGlvbiAoYSkge1xuICAgICAgcmV0dXJuIGEuc2xpY2UoKTtcbiAgICB9LCBmdW5jdGlvbiAobykge1xuICAgICAgcmV0dXJuIHNoYWxsb3dDbGVhckNsb25lKG8pO1xuICAgIH0sIHRydWUpO1xuXG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIHBhcmFtcyA9IG5ldyBBcnJheShfbGVuID4gMiA/IF9sZW4gLSAyIDogMCksIF9rZXkgPSAyOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBwYXJhbXNbX2tleSAtIDJdID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIGlmIChwYXJhbXMpIHtcbiAgICAgIHZhciBjbGFzc2VzID0gdmFsdWUuY2xhc3NlcyxcbiAgICAgICAgICBzdHlsZXMgPSB2YWx1ZS5zdHlsZXM7XG4gICAgICB2YXIgZXh0ZW5kSW50ID0gaXNSZXBsYWNlID8gZnVuY3Rpb24gKHApIHtcbiAgICAgICAgcmV0dXJuIGV4dGVuZCh2YWx1ZSwgcCwgZnVuY3Rpb24gKHMpIHtcbiAgICAgICAgICByZXR1cm4gcztcbiAgICAgICAgfSwgZnVuY3Rpb24gKGEpIHtcbiAgICAgICAgICByZXR1cm4gYS5zbGljZSgpO1xuICAgICAgICB9LCBmdW5jdGlvbiAobykge1xuICAgICAgICAgIHJldHVybiBzaGFsbG93Q2xlYXJDbG9uZShzdHlsZXMsIG8pO1xuICAgICAgICB9LCB0cnVlKTtcbiAgICAgIH0gOiBmdW5jdGlvbiAocCkge1xuICAgICAgICByZXR1cm4gZXh0ZW5kKHZhbHVlLCBwLCBmdW5jdGlvbiAoYSkge1xuICAgICAgICAgIHJldHVybiBjbGFzc2VzLmNvbmNhdChhKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGEpIHtcbiAgICAgICAgICByZXR1cm4gY2xhc3Nlcy5jb25jYXQoYSk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChvKSB7XG4gICAgICAgICAgcmV0dXJuIHNoYWxsb3dDbGVhckNsb25lKHN0eWxlcywgbyk7XG4gICAgICAgIH0sIGZhbHNlKTtcbiAgICAgIH07XG4gICAgICBwYXJhbXMuZm9yRWFjaChmdW5jdGlvbiAocCkge1xuICAgICAgICByZXR1cm4gZXh0ZW5kSW50KHApO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIFN0eWxpbmcodmFsdWUpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVDc3Moc3R5bGluZ3MxLCBzdHlsaW5nczIpIHtcbiAgdmFyIGRlc3RpbmF0aW9uID0ge307XG5cbiAgZm9yICh2YXIgcHJvcGVydHkgaW4gc3R5bGluZ3MxKSB7XG4gICAgdmFyIHBhcmFtMSA9IHN0eWxpbmdzMVtwcm9wZXJ0eV07XG4gICAgdmFyIHBhcmFtMiA9IHN0eWxpbmdzMiA/IHN0eWxpbmdzMltwcm9wZXJ0eV0gOiB1bmRlZmluZWQ7XG4gICAgaWYgKHBhcmFtMiA9PT0gdW5kZWZpbmVkKSBkZXN0aW5hdGlvbltwcm9wZXJ0eV0gPSBTdHlsaW5nKHBhcmFtMSk7ZWxzZSB7XG4gICAgICBkZXN0aW5hdGlvbltwcm9wZXJ0eV0gPSBjcmVhdGVTdHlsaW5nKHRydWUsIHBhcmFtMSwgcGFyYW0yKTtcbiAgICB9XG4gIH1cblxuICBpZiAoc3R5bGluZ3MyKSBmb3IgKHZhciBfcHJvcGVydHkgaW4gc3R5bGluZ3MyKSB7XG4gICAgaWYgKCFzdHlsaW5nczFbX3Byb3BlcnR5XSkgZGVzdGluYXRpb25bX3Byb3BlcnR5XSA9IFN0eWxpbmcoc3R5bGluZ3MyW19wcm9wZXJ0eV0pO1xuICB9XG4gIHJldHVybiBkZXN0aW5hdGlvbjtcbn1cbmZ1bmN0aW9uIGV4dGVuZENzcyhzdHlsaW5nczEsIHN0eWxpbmdzMikge1xuICBmb3IgKHZhciBwcm9wZXJ0eSBpbiBzdHlsaW5nczIpIHtcbiAgICB2YXIgcGFyYW0yID0gc3R5bGluZ3MyW3Byb3BlcnR5XTtcbiAgICB2YXIgcGFyYW0xID0gc3R5bGluZ3MxW3Byb3BlcnR5XTtcbiAgICBpZiAocGFyYW0xID09PSB1bmRlZmluZWQpIHN0eWxpbmdzMVtwcm9wZXJ0eV0gPSBTdHlsaW5nKHBhcmFtMik7ZWxzZSB7XG4gICAgICBzdHlsaW5nczFbcHJvcGVydHldID0gY3JlYXRlU3R5bGluZyhmYWxzZSwgcGFyYW0xLCBwYXJhbTIpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBCc0FwcGVhcmFuY2VQbHVnaW4ocGx1Z2luRGF0YSkge1xuICB2YXIgY29uZmlndXJhdGlvbiA9IHBsdWdpbkRhdGEuY29uZmlndXJhdGlvbixcbiAgICAgIHZhbGlkYXRpb25BcGlQbHVnaW5EYXRhID0gcGx1Z2luRGF0YS52YWxpZGF0aW9uQXBpUGx1Z2luRGF0YSxcbiAgICAgIHBpY2tzRG9tID0gcGx1Z2luRGF0YS5waWNrc0RvbSxcbiAgICAgIHN0YXRpY0RvbSA9IHBsdWdpbkRhdGEuc3RhdGljRG9tLFxuICAgICAgZ2V0TGFiZWxFbGVtZW50QXNwZWN0ID0gcGx1Z2luRGF0YS5nZXRMYWJlbEVsZW1lbnRBc3BlY3QsXG4gICAgICB1cGRhdGVBcHBlYXJhbmNlQXNwZWN0ID0gcGx1Z2luRGF0YS51cGRhdGVBcHBlYXJhbmNlQXNwZWN0LFxuICAgICAgY29tcG9uZW50UHJvcGVydGllc0FzcGVjdCA9IHBsdWdpbkRhdGEuY29tcG9uZW50UHJvcGVydGllc0FzcGVjdCxcbiAgICAgIGZsb2F0aW5nTGFiZWxBc3BlY3QgPSBwbHVnaW5EYXRhLmZsb2F0aW5nTGFiZWxBc3BlY3Q7XG4gIHZhciBnZXRWYWxpZGl0eSA9IGNvbmZpZ3VyYXRpb24uZ2V0VmFsaWRpdHksXG4gICAgICBnZXRTaXplID0gY29uZmlndXJhdGlvbi5nZXRTaXplLFxuICAgICAgdXNlQ3NzUGF0Y2ggPSBjb25maWd1cmF0aW9uLnVzZUNzc1BhdGNoLFxuICAgICAgY3NzID0gY29uZmlndXJhdGlvbi5jc3MsXG4gICAgICBjb21wb3NlR2V0U2l6ZSA9IGNvbmZpZ3VyYXRpb24uY29tcG9zZUdldFNpemUsXG4gICAgICBnZXREZWZhdWx0TGFiZWwgPSBjb25maWd1cmF0aW9uLmdldERlZmF1bHRMYWJlbDtcbiAgdmFyIHNlbGVjdEVsZW1lbnQgPSBzdGF0aWNEb20uc2VsZWN0RWxlbWVudDtcbiAgdmFyIGluaXRpYWxFbGVtZW50ID0gc3RhdGljRG9tLmluaXRpYWxFbGVtZW50O1xuICB2YXIgaXNGbG9hdGluZ0xhYmVsID0gZmFsc2U7XG5cbiAgaWYgKGZsb2F0aW5nTGFiZWxBc3BlY3QpIHtcbiAgICBpc0Zsb2F0aW5nTGFiZWwgPSBjbG9zZXN0QnlDbGFzc05hbWUoaW5pdGlhbEVsZW1lbnQsICdmb3JtLWZsb2F0aW5nJyk7XG5cbiAgICBmbG9hdGluZ0xhYmVsQXNwZWN0LmlzRmxvYXRpbmdMYWJlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBpc0Zsb2F0aW5nTGFiZWw7XG4gICAgfTtcbiAgfVxuXG4gIGlmIChnZXRMYWJlbEVsZW1lbnRBc3BlY3QpIHtcbiAgICB2YXIgb3JpZ0dldExhYmVsRWxlbWVudEFzcGVjdCA9IGdldExhYmVsRWxlbWVudEFzcGVjdC5nZXRMYWJlbEVsZW1lbnQ7XG5cbiAgICBnZXRMYWJlbEVsZW1lbnRBc3BlY3QuZ2V0TGFiZWxFbGVtZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGUgPSBvcmlnR2V0TGFiZWxFbGVtZW50QXNwZWN0KCk7XG4gICAgICBpZiAoZSkgcmV0dXJuIGU7ZWxzZSB7XG4gICAgICAgIGlmIChzZWxlY3RFbGVtZW50KSB7XG4gICAgICAgICAgdmFyIGxhYmVsRWxlbWVudCA9IGdldERlZmF1bHRMYWJlbChzZWxlY3RFbGVtZW50KTtcbiAgICAgICAgICByZXR1cm4gbGFiZWxFbGVtZW50O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGlmIChzdGF0aWNEb20uc2VsZWN0RWxlbWVudCkge1xuICAgIGlmICghZ2V0VmFsaWRpdHkpIGdldFZhbGlkaXR5ID0gY29tcG9zZUdldFZhbGlkaXR5KHNlbGVjdEVsZW1lbnQpO1xuICAgIGlmICghZ2V0U2l6ZSkgZ2V0U2l6ZSA9IGNvbXBvc2VHZXRTaXplKHNlbGVjdEVsZW1lbnQpO1xuICB9IGVsc2Uge1xuICAgIGlmICghZ2V0VmFsaWRpdHkpIGdldFZhbGlkaXR5ID0gZnVuY3Rpb24gZ2V0VmFsaWRpdHkoKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICAgIGlmICghZ2V0U2l6ZSkgZ2V0U2l6ZSA9IGZ1bmN0aW9uIGdldFNpemUoKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50UHJvcGVydGllc0FzcGVjdC5nZXRTaXplID0gZ2V0U2l6ZTtcbiAgY29tcG9uZW50UHJvcGVydGllc0FzcGVjdC5nZXRWYWxpZGl0eSA9IGdldFZhbGlkaXR5O1xuICB2YXIgdXBkYXRlU2l6ZTtcblxuICBpZiAoIXVzZUNzc1BhdGNoKSB7XG4gICAgdXBkYXRlU2l6ZSA9IGZ1bmN0aW9uIHVwZGF0ZVNpemUoKSB7XG4gICAgICByZXR1cm4gdXBkYXRlU2l6ZUZvckFkYXB0ZXIocGlja3NEb20ucGlja3NFbGVtZW50LCBnZXRTaXplKTtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIHZhciBwaWNrc19sZyA9IGNzcy5waWNrc19sZyxcbiAgICAgICAgcGlja3Nfc20gPSBjc3MucGlja3Nfc20sXG4gICAgICAgIHBpY2tzX2RlZiA9IGNzcy5waWNrc19kZWYsXG4gICAgICAgIHBpY2tzX2Zsb2F0aW5nX2RlZiA9IGNzcy5waWNrc19mbG9hdGluZ19kZWY7XG4gICAgaWYgKGlzRmxvYXRpbmdMYWJlbCkgcGlja3NfbGcgPSBwaWNrc19zbSA9IHBpY2tzX2RlZiA9IHBpY2tzX2Zsb2F0aW5nX2RlZjtcblxuICAgIHVwZGF0ZVNpemUgPSBmdW5jdGlvbiB1cGRhdGVTaXplKCkge1xuICAgICAgcmV0dXJuIHVwZGF0ZVNpemVKc0ZvckFkYXB0ZXIocGlja3NEb20ucGlja3NFbGVtZW50LCBwaWNrc19sZywgcGlja3Nfc20sIHBpY2tzX2RlZiwgZ2V0U2l6ZSk7XG4gICAgfTtcbiAgfVxuXG4gIGlmICh1c2VDc3NQYXRjaCkge1xuICAgIHZhciBvcmlnVG9nZ2xlRm9jdXNTdHlsaW5nID0gcGlja3NEb20udG9nZ2xlRm9jdXNTdHlsaW5nO1xuXG4gICAgcGlja3NEb20udG9nZ2xlRm9jdXNTdHlsaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHZhbGlkaXR5ID0gdmFsaWRhdGlvbk9ic2VydmFibGUuZ2V0VmFsdWUoKTtcbiAgICAgIHZhciBpc0ZvY3VzSW4gPSBwaWNrc0RvbS5nZXRJc0ZvY3VzSW4oKTtcbiAgICAgIG9yaWdUb2dnbGVGb2N1c1N0eWxpbmcoaXNGb2N1c0luKTtcblxuICAgICAgaWYgKGlzRm9jdXNJbikge1xuICAgICAgICBpZiAodmFsaWRpdHkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgLy8gYnV0IG5vdCB0b2dnbGUgZXZlbnRzIChJIGtub3cgaXQgd2lsbCBiZSBkb25lIGluIGZ1dHVyZSlcbiAgICAgICAgICBwaWNrc0RvbS5zZXRJc0ZvY3VzSW4oaXNGb2N1c0luKTtcbiAgICAgICAgICBhZGRTdHlsaW5nKHBpY2tzRG9tLnBpY2tzRWxlbWVudCwgY3NzLnBpY2tzX2ZvY3VzX2ludmFsaWQpO1xuICAgICAgICB9IGVsc2UgaWYgKHZhbGlkaXR5ID09PSB0cnVlKSB7XG4gICAgICAgICAgLy8gYnV0IG5vdCB0b2dnbGUgZXZlbnRzIChJIGtub3cgaXQgd2lsbCBiZSBkb25lIGluIGZ1dHVyZSlcbiAgICAgICAgICBwaWNrc0RvbS5zZXRJc0ZvY3VzSW4oaXNGb2N1c0luKTtcbiAgICAgICAgICBhZGRTdHlsaW5nKHBpY2tzRG9tLnBpY2tzRWxlbWVudCwgY3NzLnBpY2tzX2ZvY3VzX3ZhbGlkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICB2YXIgZ2V0V2FzVmFsaWRhdGVkID0gZnVuY3Rpb24gZ2V0V2FzVmFsaWRhdGVkKCkge1xuICAgIHZhciB3YXNWYWxpZGF0ZWRFbGVtZW50ID0gY2xvc2VzdEJ5Q2xhc3NOYW1lKHN0YXRpY0RvbS5pbml0aWFsRWxlbWVudCwgJ3dhcy12YWxpZGF0ZWQnKTtcbiAgICByZXR1cm4gd2FzVmFsaWRhdGVkRWxlbWVudCA/IHRydWUgOiBmYWxzZTtcbiAgfTtcblxuICB2YXIgd2FzVXBkYXRlZE9ic2VydmFibGUgPSBPYnNlcnZhYmxlTGFtYmRhKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZ2V0V2FzVmFsaWRhdGVkKCk7XG4gIH0pO1xuICB2YXIgZ2V0TWFudWFsVmFsaWRhdGlvbk9ic2VydmFibGUgPSBPYnNlcnZhYmxlTGFtYmRhKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZ2V0VmFsaWRpdHkoKTtcbiAgfSk7XG4gIHZhciB2YWxpZGF0aW9uQXBpT2JzZXJ2YWJsZSA9IHZhbGlkYXRpb25BcGlQbHVnaW5EYXRhID09IG51bGwgPyB2b2lkIDAgOiB2YWxpZGF0aW9uQXBpUGx1Z2luRGF0YS52YWxpZGF0aW9uQXBpT2JzZXJ2YWJsZTtcbiAgdmFyIHZhbGlkYXRpb25PYnNlcnZhYmxlID0gT2JzZXJ2YWJsZUxhbWJkYShmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHdhc1VwZGF0ZWRPYnNlcnZhYmxlLmdldFZhbHVlKCkgPyB2YWxpZGF0aW9uQXBpT2JzZXJ2YWJsZS5nZXRWYWx1ZSgpIDogZ2V0TWFudWFsVmFsaWRhdGlvbk9ic2VydmFibGUuZ2V0VmFsdWUoKTtcbiAgfSk7XG4gIHZhbGlkYXRpb25PYnNlcnZhYmxlLmF0dGFjaChmdW5jdGlvbiAodmFsdWUpIHtcbiAgICB2YXIgX2dldE1lc3NhZ2VzRWxlbWVudHMgPSBnZXRNZXNzYWdlc0VsZW1lbnRzKHN0YXRpY0RvbS5jb250YWluZXJFbGVtZW50KSxcbiAgICAgICAgdmFsaWRNZXNzYWdlcyA9IF9nZXRNZXNzYWdlc0VsZW1lbnRzLnZhbGlkTWVzc2FnZXMsXG4gICAgICAgIGludmFsaWRNZXNzYWdlcyA9IF9nZXRNZXNzYWdlc0VsZW1lbnRzLmludmFsaWRNZXNzYWdlcztcblxuICAgIHVwZGF0ZVZhbGlkaXR5KHBpY2tzRG9tLnBpY2tzRWxlbWVudCwgdmFsaWRNZXNzYWdlcywgaW52YWxpZE1lc3NhZ2VzLCB2YWx1ZSk7XG4gICAgcGlja3NEb20udG9nZ2xlRm9jdXNTdHlsaW5nKCk7XG4gIH0pO1xuICB3YXNVcGRhdGVkT2JzZXJ2YWJsZS5hdHRhY2goZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB2YWxpZGF0aW9uT2JzZXJ2YWJsZS5jYWxsKCk7XG4gIH0pO1xuICBpZiAodmFsaWRhdGlvbkFwaU9ic2VydmFibGUpIHZhbGlkYXRpb25BcGlPYnNlcnZhYmxlLmF0dGFjaChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHZhbGlkYXRpb25PYnNlcnZhYmxlLmNhbGwoKTtcbiAgfSk7XG4gIGdldE1hbnVhbFZhbGlkYXRpb25PYnNlcnZhYmxlLmF0dGFjaChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHZhbGlkYXRpb25PYnNlcnZhYmxlLmNhbGwoKTtcbiAgfSk7XG4gIHVwZGF0ZUFwcGVhcmFuY2VBc3BlY3QudXBkYXRlQXBwZWFyYW5jZSA9IGNvbXBvc2VTeW5jKHVwZGF0ZUFwcGVhcmFuY2VBc3BlY3QudXBkYXRlQXBwZWFyYW5jZSwgdXBkYXRlU2l6ZSwgdmFsaWRhdGlvbk9ic2VydmFibGUuY2FsbCwgZ2V0TWFudWFsVmFsaWRhdGlvbk9ic2VydmFibGUuY2FsbCk7XG4gIHJldHVybiB7XG4gICAgYnVpbGRBcGk6IGZ1bmN0aW9uIGJ1aWxkQXBpKGFwaSkge1xuICAgICAgYXBpLnVwZGF0ZVNpemUgPSB1cGRhdGVTaXplO1xuXG4gICAgICBhcGkudXBkYXRlVmFsaWRpdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBnZXRNYW51YWxWYWxpZGF0aW9uT2JzZXJ2YWJsZS5jYWxsKCk7XG4gICAgICB9O1xuXG4gICAgICBhcGkudXBkYXRlV2FzVmFsaWRhdGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gd2FzVXBkYXRlZE9ic2VydmFibGUuY2FsbCgpO1xuICAgICAgfTtcbiAgICB9LFxuICAgIGRpc3Bvc2U6IGZ1bmN0aW9uIGRpc3Bvc2UoKSB7XG4gICAgICB3YXNVcGRhdGVkT2JzZXJ2YWJsZS5kZXRhY2hBbGwoKTtcbiAgICAgIHZhbGlkYXRpb25PYnNlcnZhYmxlLmRldGFjaEFsbCgpO1xuICAgICAgZ2V0TWFudWFsVmFsaWRhdGlvbk9ic2VydmFibGUuZGV0YWNoQWxsKCk7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiB1cGRhdGVWYWxpZGl0eShwaWNrc0VsZW1lbnQsIHZhbGlkTWVzc2FnZXMsIGludmFsaWRNZXNzYWdlcywgdmFsaWRpdHkpIHtcbiAgaWYgKHZhbGlkaXR5ID09PSBmYWxzZSkge1xuICAgIHBpY2tzRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdpcy1pbnZhbGlkJyk7XG4gICAgcGlja3NFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLXZhbGlkJyk7XG4gICAgaW52YWxpZE1lc3NhZ2VzLm1hcChmdW5jdGlvbiAoZSkge1xuICAgICAgcmV0dXJuIGUuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfSk7XG4gICAgdmFsaWRNZXNzYWdlcy5tYXAoZnVuY3Rpb24gKGUpIHtcbiAgICAgIHJldHVybiBlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAodmFsaWRpdHkgPT09IHRydWUpIHtcbiAgICBwaWNrc0VsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaXMtaW52YWxpZCcpO1xuICAgIHBpY2tzRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdpcy12YWxpZCcpO1xuICAgIGludmFsaWRNZXNzYWdlcy5tYXAoZnVuY3Rpb24gKGUpIHtcbiAgICAgIHJldHVybiBlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfSk7XG4gICAgdmFsaWRNZXNzYWdlcy5tYXAoZnVuY3Rpb24gKGUpIHtcbiAgICAgIHJldHVybiBlLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHBpY2tzRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1pbnZhbGlkJyk7XG4gICAgcGlja3NFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLXZhbGlkJyk7XG4gICAgaW52YWxpZE1lc3NhZ2VzLm1hcChmdW5jdGlvbiAoZSkge1xuICAgICAgcmV0dXJuIGUuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgIH0pO1xuICAgIHZhbGlkTWVzc2FnZXMubWFwKGZ1bmN0aW9uIChlKSB7XG4gICAgICByZXR1cm4gZS5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlU2l6ZUNsYXNzZXMocGlja3NFbGVtZW50LCBzaXplKSB7XG4gIGlmIChzaXplID09IFwibGdcIikge1xuICAgIHBpY2tzRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdmb3JtLWNvbnRyb2wtbGcnKTtcbiAgICBwaWNrc0VsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZm9ybS1jb250cm9sLXNtJyk7XG4gIH0gZWxzZSBpZiAoc2l6ZSA9PSBcInNtXCIpIHtcbiAgICBwaWNrc0VsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZm9ybS1jb250cm9sLWxnJyk7XG4gICAgcGlja3NFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2Zvcm0tY29udHJvbC1zbScpO1xuICB9IGVsc2Uge1xuICAgIHBpY2tzRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdmb3JtLWNvbnRyb2wtbGcnKTtcbiAgICBwaWNrc0VsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZm9ybS1jb250cm9sLXNtJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlU2l6ZUpzUGlja3MocGlja3NFbGVtZW50LCBwaWNrc0xnU3R5bGluZywgcGlja3NTbVN0eWxpbmcsIHBpY2tzRGVmU3R5bGluZywgc2l6ZSkge1xuICBpZiAoc2l6ZSA9PSBcImxnXCIpIHtcbiAgICBhZGRTdHlsaW5nKHBpY2tzRWxlbWVudCwgcGlja3NMZ1N0eWxpbmcpO1xuICB9IGVsc2UgaWYgKHNpemUgPT0gXCJzbVwiKSB7XG4gICAgYWRkU3R5bGluZyhwaWNrc0VsZW1lbnQsIHBpY2tzU21TdHlsaW5nKTtcbiAgfSBlbHNlIHtcbiAgICBhZGRTdHlsaW5nKHBpY2tzRWxlbWVudCwgcGlja3NEZWZTdHlsaW5nKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVTaXplSnMocGlja3NFbGVtZW50LCBwaWNrc0xnU3R5bGluZywgcGlja3NTbVN0eWxpbmcsIHBpY2tzRGVmU3R5bGluZywgc2l6ZSkge1xuICB1cGRhdGVTaXplQ2xhc3NlcyhwaWNrc0VsZW1lbnQsIHNpemUpO1xuICB1cGRhdGVTaXplSnNQaWNrcyhwaWNrc0VsZW1lbnQsIHBpY2tzTGdTdHlsaW5nLCBwaWNrc1NtU3R5bGluZywgcGlja3NEZWZTdHlsaW5nLCBzaXplKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlU2l6ZUZvckFkYXB0ZXIocGlja3NFbGVtZW50LCBnZXRTaXplKSB7XG4gIHVwZGF0ZVNpemVDbGFzc2VzKHBpY2tzRWxlbWVudCwgZ2V0U2l6ZSgpKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlU2l6ZUpzRm9yQWRhcHRlcihwaWNrc0VsZW1lbnQsIHBpY2tzTGdTdHlsaW5nLCBwaWNrc1NtU3R5bGluZywgcGlja3NEZWZTdHlsaW5nLCBnZXRTaXplKSB7XG4gIHVwZGF0ZVNpemVKcyhwaWNrc0VsZW1lbnQsIHBpY2tzTGdTdHlsaW5nLCBwaWNrc1NtU3R5bGluZywgcGlja3NEZWZTdHlsaW5nLCBnZXRTaXplKCkpO1xufVxuXG5mdW5jdGlvbiBnZXRNZXNzYWdlc0VsZW1lbnRzKGNvbnRhaW5lckVsZW1lbnQpIHtcbiAgdmFyIHNpYmxpbmdzID0gc2libGluZ3NBc0FycmF5KGNvbnRhaW5lckVsZW1lbnQpO1xuICB2YXIgaW52YWxpZE1lc3NhZ2VzID0gc2libGluZ3MuZmlsdGVyKGZ1bmN0aW9uIChlKSB7XG4gICAgcmV0dXJuIGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdpbnZhbGlkLWZlZWRiYWNrJykgfHwgZS5jbGFzc0xpc3QuY29udGFpbnMoJ2ludmFsaWQtdG9vbHRpcCcpO1xuICB9KTtcbiAgdmFyIHZhbGlkTWVzc2FnZXMgPSBzaWJsaW5ncy5maWx0ZXIoZnVuY3Rpb24gKGUpIHtcbiAgICByZXR1cm4gZS5jbGFzc0xpc3QuY29udGFpbnMoJ3ZhbGlkLWZlZWRiYWNrJykgfHwgZS5jbGFzc0xpc3QuY29udGFpbnMoJ3ZhbGlkLXRvb2x0aXAnKTtcbiAgfSk7XG4gIHJldHVybiB7XG4gICAgdmFsaWRNZXNzYWdlczogdmFsaWRNZXNzYWdlcyxcbiAgICBpbnZhbGlkTWVzc2FnZXM6IGludmFsaWRNZXNzYWdlc1xuICB9O1xufVxuXG5mdW5jdGlvbiBjb21wb3NlR2V0VmFsaWRpdHkoc2VsZWN0RWxlbWVudCkge1xuICB2YXIgZ2V0VmFsaWRpdHkgPSBmdW5jdGlvbiBnZXRWYWxpZGl0eSgpIHtcbiAgICByZXR1cm4gc2VsZWN0RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2lzLWludmFsaWQnKSA/IGZhbHNlIDogc2VsZWN0RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2lzLXZhbGlkJykgPyB0cnVlIDogbnVsbDtcbiAgfTtcblxuICByZXR1cm4gZ2V0VmFsaWRpdHk7XG59XG5cbmZ1bmN0aW9uIEhpZGRlbk9wdGlvblBsdWdpbihhc3BlY3RzKSB7XG4gIHZhciBjb25maWd1cmF0aW9uID0gYXNwZWN0cy5jb25maWd1cmF0aW9uLFxuICAgICAgY3JlYXRlV3JhcEFzcGVjdCA9IGFzcGVjdHMuY3JlYXRlV3JhcEFzcGVjdCxcbiAgICAgIGlzQ2hvaWNlU2VsZWN0YWJsZUFzcGVjdCA9IGFzcGVjdHMuaXNDaG9pY2VTZWxlY3RhYmxlQXNwZWN0LFxuICAgICAgd3JhcHNDb2xsZWN0aW9uID0gYXNwZWN0cy53cmFwc0NvbGxlY3Rpb24sXG4gICAgICBidWlsZENob2ljZUFzcGVjdCA9IGFzcGVjdHMuYnVpbGRDaG9pY2VBc3BlY3QsXG4gICAgICBidWlsZEFuZEF0dGFjaENob2ljZUFzcGVjdCA9IGFzcGVjdHMuYnVpbGRBbmRBdHRhY2hDaG9pY2VBc3BlY3QsXG4gICAgICBjb3VudGFibGVDaG9pY2VzTGlzdEluc2VydEFzcGVjdCA9IGFzcGVjdHMuY291bnRhYmxlQ2hvaWNlc0xpc3RJbnNlcnRBc3BlY3QsXG4gICAgICBjb3VudGFibGVDaG9pY2VzTGlzdCA9IGFzcGVjdHMuY291bnRhYmxlQ2hvaWNlc0xpc3Q7XG5cbiAgY291bnRhYmxlQ2hvaWNlc0xpc3RJbnNlcnRBc3BlY3QuY291bnRhYmxlQ2hvaWNlc0xpc3RJbnNlcnQgPSBmdW5jdGlvbiAod3JhcCwga2V5KSB7XG4gICAgaWYgKCF3cmFwLmlzT3B0aW9uSGlkZGVuKSB7XG4gICAgICB2YXIgY2hvaWNlTmV4dCA9IHdyYXBzQ29sbGVjdGlvbi5nZXROZXh0KGtleSwgZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgcmV0dXJuICFjLmlzT3B0aW9uSGlkZGVuO1xuICAgICAgfSk7XG4gICAgICBjb3VudGFibGVDaG9pY2VzTGlzdC5hZGQod3JhcCwgY2hvaWNlTmV4dCk7XG4gICAgfVxuICB9O1xuXG4gIHZhciBvcmlnQnVpbGRBbmRBdHRhY2hDaG9pY2UgPSBidWlsZEFuZEF0dGFjaENob2ljZUFzcGVjdC5idWlsZEFuZEF0dGFjaENob2ljZTtcblxuICBidWlsZEFuZEF0dGFjaENob2ljZUFzcGVjdC5idWlsZEFuZEF0dGFjaENob2ljZSA9IGZ1bmN0aW9uICh3cmFwLCBnZXROZXh0RWxlbWVudCkge1xuICAgIGlmICh3cmFwLmlzT3B0aW9uSGlkZGVuKSB7XG4gICAgICBidWlsZEhpZGRlbkNob2ljZSh3cmFwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3JpZ0J1aWxkQW5kQXR0YWNoQ2hvaWNlKHdyYXAsIGdldE5leHRFbGVtZW50KTtcbiAgICB9XG4gIH07XG5cbiAgdmFyIG9yaWdJc1NlbGVjdGFibGUgPSBpc0Nob2ljZVNlbGVjdGFibGVBc3BlY3QuaXNTZWxlY3RhYmxlO1xuXG4gIGlzQ2hvaWNlU2VsZWN0YWJsZUFzcGVjdC5pc1NlbGVjdGFibGUgPSBmdW5jdGlvbiAod3JhcCkge1xuICAgIHJldHVybiBvcmlnSXNTZWxlY3RhYmxlKHdyYXApICYmICF3cmFwLmlzT3B0aW9uSGlkZGVuO1xuICB9O1xuXG4gIHZhciBnZXRJc09wdGlvbkhpZGRlbiA9IGNvbmZpZ3VyYXRpb24uZ2V0SXNPcHRpb25IaWRkZW4sXG4gICAgICBvcHRpb25zID0gY29uZmlndXJhdGlvbi5vcHRpb25zO1xuXG4gIGlmIChvcHRpb25zKSB7XG4gICAgaWYgKCFnZXRJc09wdGlvbkhpZGRlbikgZ2V0SXNPcHRpb25IaWRkZW4gPSBmdW5jdGlvbiBnZXRJc09wdGlvbkhpZGRlbihvcHRpb24pIHtcbiAgICAgIHJldHVybiBvcHRpb24uaGlkZGVuID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IG9wdGlvbi5oaWRkZW47XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoIWdldElzT3B0aW9uSGlkZGVuKSBnZXRJc09wdGlvbkhpZGRlbiA9IGZ1bmN0aW9uIGdldElzT3B0aW9uSGlkZGVuKG9wdGlvbikge1xuICAgICAgcmV0dXJuIG9wdGlvbi5oaWRkZW47XG4gICAgfTtcbiAgfVxuXG4gIHZhciBvcmlnQ3JlYXRlV3JhcCA9IGNyZWF0ZVdyYXBBc3BlY3QuY3JlYXRlV3JhcDtcblxuICBjcmVhdGVXcmFwQXNwZWN0LmNyZWF0ZVdyYXAgPSBmdW5jdGlvbiAob3B0aW9uKSB7XG4gICAgdmFyIHdyYXAgPSBvcmlnQ3JlYXRlV3JhcChvcHRpb24pO1xuICAgIHdyYXAuaXNPcHRpb25IaWRkZW4gPSBnZXRJc09wdGlvbkhpZGRlbihvcHRpb24pO1xuICAgIHJldHVybiB3cmFwO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgYnVpbGRBcGk6IGZ1bmN0aW9uIGJ1aWxkQXBpKGFwaSkge1xuICAgICAgdmFyIGdldE5leHROb25IaWRkZW4gPSBmdW5jdGlvbiBnZXROZXh0Tm9uSGlkZGVuKGtleSkge1xuICAgICAgICByZXR1cm4gd3JhcHNDb2xsZWN0aW9uLmdldE5leHQoa2V5LCBmdW5jdGlvbiAoYykge1xuICAgICAgICAgIHJldHVybiAhYy5pc09wdGlvbkhpZGRlbjtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBhcGkudXBkYXRlT3B0aW9uc0hpZGRlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHdyYXBzQ29sbGVjdGlvbi5mb3JMb29wKGZ1bmN0aW9uICh3cmFwLCBrZXkpIHtcbiAgICAgICAgICByZXR1cm4gdXBkYXRlQ2hvaWNlSGlkZGVuKHdyYXAsIGtleSwgZ2V0TmV4dE5vbkhpZGRlbiwgY291bnRhYmxlQ2hvaWNlc0xpc3QsIGdldElzT3B0aW9uSGlkZGVuLCBidWlsZENob2ljZUFzcGVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgYXBpLnVwZGF0ZU9wdGlvbkhpZGRlbiA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgcmV0dXJuIHVwZGF0ZUNob2ljZUhpZGRlbih3cmFwc0NvbGxlY3Rpb24uZ2V0KGtleSksIGtleSwgZ2V0TmV4dE5vbkhpZGRlbiwgY291bnRhYmxlQ2hvaWNlc0xpc3QsIGdldElzT3B0aW9uSGlkZGVuLCBidWlsZENob2ljZUFzcGVjdCk7XG4gICAgICB9OyAvLyBUT0RPIGNyZWF0ZSB1cGRhdGVIaWRkZW4gPyBcbiAgICAgIC8vIGl0IGlzIHRvbyBjb21wbGV4IHNpbmNlIHdlIG5lZWQgdG8gZmluZCB0aGUgbmV4dCBub24gaGlkZGVuLCB3aGVuIHRoaXMgZGVwZW5kcyBvbiBrZXkgXG4gICAgICAvLyB0aGVyZSBzaG91bGQgYmUgdGhlIGJhY2tyZWZlcmVuY2UgXCJ3cmFwIC0+IGluZGV4XCIgaW52aXRlZCBiZWZvcmVcbiAgICAgIC8vIGFwaS51cGRhdGVPcHRpb25IaWRkZW4gID0gKGtleSkgPT4gd3JhcHNDb2xsZWN0aW9uLmdldChrZXkpLnVwZGF0ZUhpZGRlbigpO1xuXG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBidWlsZEhpZGRlbkNob2ljZSh3cmFwKSB7XG4gIHdyYXAudXBkYXRlU2VsZWN0ZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHZvaWQgMDtcbiAgfTtcblxuICB3cmFwLmNob2ljZS5pc0Nob2ljZUVsZW1lbnRBdHRhY2hlZCA9IGZhbHNlO1xuICB3cmFwLmNob2ljZS5jaG9pY2VFbGVtZW50ID0gbnVsbDtcbiAgd3JhcC5jaG9pY2UuY2hvaWNlRWxlbWVudEF0dGFjaCA9IG51bGw7XG4gIHdyYXAuY2hvaWNlLnNldFZpc2libGUgPSBudWxsO1xuICB3cmFwLmNob2ljZS5zZXRIb3ZlckluID0gbnVsbDtcbiAgd3JhcC5jaG9pY2UucmVtb3ZlID0gbnVsbDtcblxuICB3cmFwLmNob2ljZS5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xuICAgIHdyYXAuY2hvaWNlLmRpc3Bvc2UgPSBudWxsO1xuICB9O1xuXG4gIHdyYXAuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB3cmFwLmNob2ljZS5kaXNwb3NlKCk7XG4gICAgd3JhcC5kaXNwb3NlID0gbnVsbDtcbiAgfTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQ2hvaWNlSGlkZGVuKHdyYXAsIGtleSwgZ2V0TmV4dE5vbkhpZGRlbiwgY291bnRhYmxlQ2hvaWNlc0xpc3QsIGdldElzT3B0aW9uSGlkZGVuLCBidWlsZENob2ljZUFzcGVjdCkge1xuICB2YXIgbmV3SXNPcHRpb25IaWRkZW4gPSBnZXRJc09wdGlvbkhpZGRlbih3cmFwLm9wdGlvbik7XG5cbiAgaWYgKG5ld0lzT3B0aW9uSGlkZGVuICE9IHdyYXAuaXNPcHRpb25IaWRkZW4pIHtcbiAgICB3cmFwLmlzT3B0aW9uSGlkZGVuID0gbmV3SXNPcHRpb25IaWRkZW47XG5cbiAgICBpZiAod3JhcC5pc09wdGlvbkhpZGRlbikge1xuICAgICAgY291bnRhYmxlQ2hvaWNlc0xpc3QucmVtb3ZlKHdyYXApO1xuICAgICAgd3JhcC5jaG9pY2UucmVtb3ZlKCk7XG4gICAgICBidWlsZEhpZGRlbkNob2ljZSh3cmFwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIG5leHRDaG9pY2UgPSBnZXROZXh0Tm9uSGlkZGVuKGtleSk7XG4gICAgICBjb3VudGFibGVDaG9pY2VzTGlzdC5hZGQod3JhcCwgbmV4dENob2ljZSk7XG4gICAgICBidWlsZENob2ljZUFzcGVjdC5idWlsZENob2ljZSh3cmFwKTtcbiAgICAgIHdyYXAuY2hvaWNlLmNob2ljZUVsZW1lbnRBdHRhY2gobmV4dENob2ljZSA9PSBudWxsID8gdm9pZCAwIDogbmV4dENob2ljZS5jaG9pY2UuY2hvaWNlRWxlbWVudCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIENzc1BhdGNoUGx1Z2luKCkge31cblxuQ3NzUGF0Y2hQbHVnaW4ucGx1Z01lcmdlU2V0dGluZ3MgPSBmdW5jdGlvbiAoY29uZmlndXJhdGlvbiwgZGVmYXVsdHMsIHNldHRpbmdzKSB7XG4gIHZhciBjc3NQYXRjaCA9IHNldHRpbmdzID09IG51bGwgPyB2b2lkIDAgOiBzZXR0aW5ncy5jc3NQYXRjaDtcbiAgaWYgKGlzQm9vbGVhbihjc3NQYXRjaCkpIHRocm93IG5ldyBFcnJvcihcIkJzTXVsdGlTZWxlY3Q6ICdjc3NQYXRjaCcgd2FzIHVzZWQgaW5zdGVhZCBvZiAndXNlQ3NzUGF0Y2gnXCIpOyAvLyBvZnRlbiB0eXBlIG9mIGVycm9yXG5cbiAgY29uZmlndXJhdGlvbi5jc3NQYXRjaCA9IGNyZWF0ZUNzcyhkZWZhdWx0cy5jc3NQYXRjaCwgY3NzUGF0Y2gpOyAvLyByZXBsYWNlIGNsYXNzZXMsIG1lcmdlIHN0eWxlc1xufTtcblxuQ3NzUGF0Y2hQbHVnaW4ucGx1Z1N0YXRpY0RvbSA9IGZ1bmN0aW9uIChjb25maWd1cmF0aW9uUGx1Z2luRGF0YSkge1xuICB2YXIgY29uZmlndXJhdGlvbiA9IGNvbmZpZ3VyYXRpb25QbHVnaW5EYXRhLmNvbmZpZ3VyYXRpb247XG4gIGlmIChjb25maWd1cmF0aW9uLnVzZUNzc1BhdGNoKSBleHRlbmRDc3MoY29uZmlndXJhdGlvbi5jc3MsIGNvbmZpZ3VyYXRpb24uY3NzUGF0Y2gpO1xufTtcblxuZnVuY3Rpb24gUGxhY2Vob2xkZXJQbHVnaW4oYXNwZWN0cykge1xuICB2YXIgY29uZmlndXJhdGlvbiA9IGFzcGVjdHMuY29uZmlndXJhdGlvbixcbiAgICAgIHN0YXRpY01hbmFnZXIgPSBhc3BlY3RzLnN0YXRpY01hbmFnZXIsXG4gICAgICBwaWNrc0xpc3QgPSBhc3BlY3RzLnBpY2tzTGlzdCxcbiAgICAgIHBpY2tzRG9tID0gYXNwZWN0cy5waWNrc0RvbSxcbiAgICAgIGZpbHRlckRvbSA9IGFzcGVjdHMuZmlsdGVyRG9tLFxuICAgICAgc3RhdGljRG9tID0gYXNwZWN0cy5zdGF0aWNEb20sXG4gICAgICB1cGRhdGVEYXRhQXNwZWN0ID0gYXNwZWN0cy51cGRhdGVEYXRhQXNwZWN0LFxuICAgICAgcmVzZXRGaWx0ZXJMaXN0QXNwZWN0ID0gYXNwZWN0cy5yZXNldEZpbHRlckxpc3RBc3BlY3QsXG4gICAgICBmaWx0ZXJNYW5hZ2VyQXNwZWN0ID0gYXNwZWN0cy5maWx0ZXJNYW5hZ2VyQXNwZWN0LFxuICAgICAgZW52aXJvbm1lbnQgPSBhc3BlY3RzLmVudmlyb25tZW50O1xuICB2YXIgaXNJRTExID0gZW52aXJvbm1lbnQuaXNJRTExO1xuICB2YXIgcGxhY2Vob2xkZXIgPSBjb25maWd1cmF0aW9uLnBsYWNlaG9sZGVyLFxuICAgICAgY3NzID0gY29uZmlndXJhdGlvbi5jc3M7XG4gIHZhciBwaWNrc0VsZW1lbnQgPSBwaWNrc0RvbS5waWNrc0VsZW1lbnQ7XG4gIHZhciBmaWx0ZXJJbnB1dEVsZW1lbnQgPSBmaWx0ZXJEb20uZmlsdGVySW5wdXRFbGVtZW50O1xuXG4gIGZ1bmN0aW9uIHNldFBsYWNlaG9sZGVyKHBsYWNlaG9sZGVyKSB7XG4gICAgZmlsdGVySW5wdXRFbGVtZW50LnBsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXI7XG4gIH1cblxuICBpZiAoaXNJRTExKSB7XG4gICAgdmFyIGlnbm9yZU5leHRJbnB1dFJlc2V0YWJsZUZsYWcgPSBSZXNldGFibGVGbGFnKCk7XG4gICAgdmFyIHBsYWNlaG9sZGVyU3RvcElucHV0QXNwZWN0ID0gUGxhY2Vob2xkZXJTdG9wSW5wdXRBc3BlY3QoaWdub3JlTmV4dElucHV0UmVzZXRhYmxlRmxhZyk7XG4gICAgdmFyIHNldFBsYWNlaG9sZGVyT3JpZyA9IHNldFBsYWNlaG9sZGVyO1xuXG4gICAgc2V0UGxhY2Vob2xkZXIgPSBmdW5jdGlvbiBzZXRQbGFjZWhvbGRlcihwbGFjZWhvbGRlcikge1xuICAgICAgaWdub3JlTmV4dElucHV0UmVzZXRhYmxlRmxhZy5zZXQoKTtcbiAgICAgIHNldFBsYWNlaG9sZGVyT3JpZyhwbGFjZWhvbGRlcik7XG4gICAgfTtcblxuICAgIGFzcGVjdHMucGxhY2Vob2xkZXJTdG9wSW5wdXRBc3BlY3QgPSBwbGFjZWhvbGRlclN0b3BJbnB1dEFzcGVjdDtcbiAgfVxuXG4gIGlmICghcGxhY2Vob2xkZXIpIHtcbiAgICBwbGFjZWhvbGRlciA9IGdldERhdGFHdWFyZGVkV2l0aFByZWZpeChzdGF0aWNEb20uaW5pdGlhbEVsZW1lbnQsIFwiYnNtdWx0aXNlbGVjdFwiLCBcInBsYWNlaG9sZGVyXCIpO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0RW1wdHlJbnB1dFdpZHRoKGlzVmlzaWJsZSkge1xuICAgIGlmIChpc1Zpc2libGUpIGZpbHRlcklucHV0RWxlbWVudC5zdHlsZS53aWR0aCA9ICcxMDAlJztlbHNlIGZpbHRlcklucHV0RWxlbWVudC5zdHlsZS53aWR0aCA9ICcyY2gnO1xuICB9XG5cbiAgdmFyIGVtcHR5VG9nZ2xlU3R5bGluZyA9IHRvZ2dsZVN0eWxpbmcoZmlsdGVySW5wdXRFbGVtZW50LCBjc3MuZmlsdGVySW5wdXRfZW1wdHkpO1xuXG4gIGZ1bmN0aW9uIHNob3dQbGFjZWhvZGxlcihpc1Zpc2libGUpIHtcbiAgICBpZiAoaXNWaXNpYmxlKSB7XG4gICAgICBzZXRQbGFjZWhvbGRlcihwbGFjZWhvbGRlciA/IHBsYWNlaG9sZGVyIDogJycpO1xuICAgICAgcGlja3NFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXRQbGFjZWhvbGRlcignJyk7XG4gICAgICBwaWNrc0VsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICB9XG5cbiAgICBlbXB0eVRvZ2dsZVN0eWxpbmcoaXNWaXNpYmxlKTtcbiAgICBzZXRFbXB0eUlucHV0V2lkdGgoaXNWaXNpYmxlKTtcbiAgfVxuXG4gIHNob3dQbGFjZWhvZGxlcih0cnVlKTtcblxuICBmdW5jdGlvbiBzZXREaXNhYmxlZChpc0NvbXBvbmVudERpc2FibGVkKSB7XG4gICAgZmlsdGVySW5wdXRFbGVtZW50LmRpc2FibGVkID0gaXNDb21wb25lbnREaXNhYmxlZDtcbiAgfVxuXG4gIHZhciBpc0VtcHR5ID0gZnVuY3Rpb24gaXNFbXB0eSgpIHtcbiAgICByZXR1cm4gcGlja3NMaXN0LmlzRW1wdHkoKSAmJiBmaWx0ZXJEb20uaXNFbXB0eSgpO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHVwZGF0ZVBsYWNlaG9kbGVyVmlzaWJpbGl0eSgpIHtcbiAgICBzaG93UGxhY2Vob2RsZXIoaXNFbXB0eSgpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZUVtcHR5SW5wdXRXaWR0aCgpIHtcbiAgICBzZXRFbXB0eUlucHV0V2lkdGgoaXNFbXB0eSgpKTtcbiAgfVxuICB2YXIgb3JpZ0Rpc2FibGUgPSBwaWNrc0RvbS5kaXNhYmxlO1xuXG4gIHBpY2tzRG9tLmRpc2FibGUgPSBmdW5jdGlvbiAoaXNDb21wb25lbnREaXNhYmxlZCkge1xuICAgIHNldERpc2FibGVkKGlzQ29tcG9uZW50RGlzYWJsZWQpO1xuICAgIG9yaWdEaXNhYmxlKGlzQ29tcG9uZW50RGlzYWJsZWQpO1xuICB9O1xuXG4gIHN0YXRpY01hbmFnZXIuYXBwZW5kVG9Db250YWluZXIgPSBjb21wb3NlU3luYyhzdGF0aWNNYW5hZ2VyLmFwcGVuZFRvQ29udGFpbmVyLCB1cGRhdGVFbXB0eUlucHV0V2lkdGgpO1xuICBmaWx0ZXJNYW5hZ2VyQXNwZWN0LnByb2Nlc3NFbXB0eUlucHV0ID0gY29tcG9zZVN5bmModXBkYXRlRW1wdHlJbnB1dFdpZHRoLCBmaWx0ZXJNYW5hZ2VyQXNwZWN0LnByb2Nlc3NFbXB0eUlucHV0KTtcbiAgcmVzZXRGaWx0ZXJMaXN0QXNwZWN0LmZvcmNlUmVzZXRGaWx0ZXIgPSBjb21wb3NlU3luYyhyZXNldEZpbHRlckxpc3RBc3BlY3QuZm9yY2VSZXNldEZpbHRlciwgdXBkYXRlUGxhY2Vob2RsZXJWaXNpYmlsaXR5KTtcbiAgdmFyIG9yaWdBZGQgPSBwaWNrc0xpc3QuYWRkO1xuXG4gIHBpY2tzTGlzdC5hZGQgPSBmdW5jdGlvbiAocGljaykge1xuICAgIHZhciByZXR1cm5WYWx1ZSA9IG9yaWdBZGQocGljayk7XG5cbiAgICBpZiAocGlja3NMaXN0LmdldENvdW50KCkgPT0gMSkge1xuICAgICAgLy8gbWFrZSBmbGV4XG4gICAgICBpZiAoZmlsdGVyRG9tLmlzRW1wdHkoKSkge1xuICAgICAgICBzZXRQbGFjZWhvbGRlcignJyk7XG4gICAgICAgIHBpY2tzRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgICAgICBlbXB0eVRvZ2dsZVN0eWxpbmcoZmFsc2UpO1xuICAgICAgICBmaWx0ZXJJbnB1dEVsZW1lbnQuc3R5bGUud2lkdGggPSAnMmNoJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBpY2tzRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgICAgfVxuICAgIH1cblxuICAgIHBpY2suZGlzcG9zZSA9IGNvbXBvc2VTeW5jKHBpY2suZGlzcG9zZSwgZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGlzRW1wdHkoKSkge1xuICAgICAgICBzaG93UGxhY2Vob2RsZXIodHJ1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICB9O1xuXG4gIHVwZGF0ZURhdGFBc3BlY3QudXBkYXRlRGF0YSA9IGNvbXBvc2VTeW5jKHVwZGF0ZURhdGFBc3BlY3QudXBkYXRlRGF0YSwgdXBkYXRlUGxhY2Vob2RsZXJWaXNpYmlsaXR5KTtcbn0gLy8gaWUxMSBzdXBwb3J0XG5cbmZ1bmN0aW9uIFBsYWNlaG9sZGVyU3RvcElucHV0QXNwZWN0KHJlc2V0YWJsZUZsYWcpIHtcbiAgcmV0dXJuIHtcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiByZXNldGFibGVGbGFnLmdldCgpO1xuICAgIH0sXG4gICAgcmVzZXQ6IGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgICAgcmV0dXJuIHJlc2V0YWJsZUZsYWcucmVzZXQoKTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIEpRdWVyeU1ldGhvZHNQbHVnaW4oYXNwZWN0cykge1xuICB2YXIgc3RhdGljRG9tID0gYXNwZWN0cy5zdGF0aWNEb20sXG4gICAgICBjaG9pY2VzRG9tID0gYXNwZWN0cy5jaG9pY2VzRG9tLFxuICAgICAgZmlsdGVyRG9tID0gYXNwZWN0cy5maWx0ZXJEb20sXG4gICAgICBwaWNrc0xpc3QgPSBhc3BlY3RzLnBpY2tzTGlzdCxcbiAgICAgIHBpY2tzRG9tID0gYXNwZWN0cy5waWNrc0RvbTtcbiAgcmV0dXJuIHtcbiAgICBidWlsZEFwaTogZnVuY3Rpb24gYnVpbGRBcGkoYXBpKSB7XG4gICAgICBhcGkuZ2V0Q29udGFpbmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gc3RhdGljRG9tLmNvbnRhaW5lckVsZW1lbnQ7XG4gICAgICB9O1xuXG4gICAgICBhcGkuZ2V0Q2hvaWNlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGNob2ljZXNEb20uY2hvaWNlc0VsZW1lbnQ7XG4gICAgICB9O1xuXG4gICAgICBhcGkuZ2V0Q2hvaWNlc0xpc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBjaG9pY2VzRG9tLmNob2ljZXNMaXN0RWxlbWVudDtcbiAgICAgIH07XG5cbiAgICAgIGFwaS5nZXRGaWx0ZXJJbnB1dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGZpbHRlckRvbS5maWx0ZXJJbnB1dEVsZW1lbnQ7XG4gICAgICB9O1xuXG4gICAgICBhcGkuZ2V0UGlja3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBwaWNrc0RvbS5waWNrc0VsZW1lbnQ7XG4gICAgICB9O1xuXG4gICAgICBhcGkucGlja3NDb3VudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHBpY2tzTGlzdC5nZXRDb3VudCgpO1xuICAgICAgfTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIE9wdGlvbnNBcGlQbHVnaW4ocGx1Z2luRGF0YSkge1xuICB2YXIgYnVpbGRBbmRBdHRhY2hDaG9pY2VBc3BlY3QgPSBwbHVnaW5EYXRhLmJ1aWxkQW5kQXR0YWNoQ2hvaWNlQXNwZWN0LFxuICAgICAgd3JhcHMgPSBwbHVnaW5EYXRhLndyYXBzLFxuICAgICAgd3JhcHNDb2xsZWN0aW9uID0gcGx1Z2luRGF0YS53cmFwc0NvbGxlY3Rpb24sXG4gICAgICBjcmVhdGVXcmFwQXNwZWN0ID0gcGx1Z2luRGF0YS5jcmVhdGVXcmFwQXNwZWN0LFxuICAgICAgY3JlYXRlQ2hvaWNlQmFzZUFzcGVjdCA9IHBsdWdpbkRhdGEuY3JlYXRlQ2hvaWNlQmFzZUFzcGVjdCxcbiAgICAgIG9wdGlvbnNBc3BlY3QgPSBwbHVnaW5EYXRhLm9wdGlvbnNBc3BlY3QsXG4gICAgICByZXNldExheW91dEFzcGVjdCA9IHBsdWdpbkRhdGEucmVzZXRMYXlvdXRBc3BlY3Q7XG4gIHJldHVybiB7XG4gICAgYnVpbGRBcGk6IGZ1bmN0aW9uIGJ1aWxkQXBpKGFwaSkge1xuICAgICAgYXBpLnVwZGF0ZU9wdGlvbkFkZGVkID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAvLyBUT0RPOiBnZW5lcmFsaXplIGluZGV4IGFzIGtleSBcbiAgICAgICAgdmFyIG9wdGlvbnMgPSBvcHRpb25zQXNwZWN0LmdldE9wdGlvbnMoKTtcbiAgICAgICAgdmFyIG9wdGlvbiA9IG9wdGlvbnNba2V5XTtcbiAgICAgICAgdmFyIHdyYXAgPSBjcmVhdGVXcmFwQXNwZWN0LmNyZWF0ZVdyYXAob3B0aW9uKTtcbiAgICAgICAgd3JhcC5jaG9pY2UgPSBjcmVhdGVDaG9pY2VCYXNlQXNwZWN0LmNyZWF0ZUNob2ljZUJhc2Uob3B0aW9uKTtcbiAgICAgICAgd3JhcHMuaW5zZXJ0KGtleSwgd3JhcCk7XG5cbiAgICAgICAgdmFyIG5leHRDaG9pY2UgPSBmdW5jdGlvbiBuZXh0Q2hvaWNlKCkge1xuICAgICAgICAgIHJldHVybiB3cmFwc0NvbGxlY3Rpb24uZ2V0TmV4dChrZXksIGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICByZXR1cm4gYy5jaG9pY2UuY2hvaWNlRWxlbWVudDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICBidWlsZEFuZEF0dGFjaENob2ljZUFzcGVjdC5idWlsZEFuZEF0dGFjaENob2ljZSh3cmFwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIF9uZXh0Q2hvaWNlO1xuXG4gICAgICAgICAgcmV0dXJuIChfbmV4dENob2ljZSA9IG5leHRDaG9pY2UoKSkgPT0gbnVsbCA/IHZvaWQgMCA6IF9uZXh0Q2hvaWNlLmNob2ljZS5jaG9pY2VFbGVtZW50O1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIGFwaS51cGRhdGVPcHRpb25SZW1vdmVkID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAvLyBUT0RPOiBnZW5lcmFsaXplIGluZGV4IGFzIGtleSBcbiAgICAgICAgcmVzZXRMYXlvdXRBc3BlY3QucmVzZXRMYXlvdXQoKTsgLy8gYWx3YXlzIGhpZGUgMXN0LCB0aGVuIHJlc2V0IGZpbHRlclxuXG4gICAgICAgIHZhciB3cmFwID0gd3JhcHMucmVtb3ZlKGtleSk7XG4gICAgICAgIHdyYXAuY2hvaWNlLnJlbW92ZSA9PSBudWxsID8gdm9pZCAwIDogd3JhcC5jaG9pY2UucmVtb3ZlKCk7XG4gICAgICAgIHdyYXAuZGlzcG9zZSA9PSBudWxsID8gdm9pZCAwIDogd3JhcC5kaXNwb3NlKCk7XG4gICAgICB9O1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gRm9ybVJlc3RvcmVPbkJhY2t3YXJkUGx1Z2luKGFzcGVjdHMpIHtcbiAgdmFyIHN0YXRpY0RvbSA9IGFzcGVjdHMuc3RhdGljRG9tLFxuICAgICAgZW52aXJvbm1lbnQgPSBhc3BlY3RzLmVudmlyb25tZW50LFxuICAgICAgbG9hZEFzcGVjdCA9IGFzcGVjdHMubG9hZEFzcGVjdCxcbiAgICAgIHVwZGF0ZU9wdGlvbnNTZWxlY3RlZEFzcGVjdCA9IGFzcGVjdHMudXBkYXRlT3B0aW9uc1NlbGVjdGVkQXNwZWN0O1xuICB2YXIgd2luZG93ID0gZW52aXJvbm1lbnQud2luZG93O1xuXG4gIGlmIChzdGF0aWNEb20uc2VsZWN0RWxlbWVudCAmJiB1cGRhdGVPcHRpb25zU2VsZWN0ZWRBc3BlY3QpIHtcbiAgICBsb2FkQXNwZWN0LmxvYWQgPSBjb21wb3NlU3luYyhsb2FkQXNwZWN0LmxvYWQsIGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIHN1cHBvcnQgYnJvd3NlcidzIFwic3RlcCBiYWNrd2FyZFwiIGFuZCBmb3JtJ3MgdmFsdWVzIHJlc3RvcmVcbiAgICAgIGlmICh3aW5kb3cuZG9jdW1lbnQucmVhZHlTdGF0ZSAhPSBcImNvbXBsZXRlXCIpIHtcbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHVwZGF0ZU9wdGlvbnNTZWxlY3RlZEFzcGVjdC51cGRhdGVPcHRpb25zU2VsZWN0ZWQoKTsgLy8gdGhlcmUgYXJlIG5vIG5lZWQgdG8gYWRkIG1vcmUgdXBkYXRlcyBhcyBhcGkudXBkYXRlV2FzVmFsaWRhdGVkKCkgYmVjYXVzZSBiYWNrd2FyZCBuZXZlciB0cmlnZ2VyIC53YXMtdmFsaWRhdGVcbiAgICAgICAgICAvLyBhbHNvIGJhY2t3YXJkIG5ldmVyIHNldCB0aGUgc3RhdGUgdG8gaW52YWxpZFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBTZWxlY3RFbGVtZW50UGx1Z2luKGFzcGVjdHMpIHtcbiAgdmFyIGxvYWRBc3BlY3QgPSBhc3BlY3RzLmxvYWRBc3BlY3QsXG4gICAgICBlbnZpcm9ubWVudCA9IGFzcGVjdHMuZW52aXJvbm1lbnQ7XG4gIHZhciBvcmlnTG9hZEFzcGVjdExvb3AgPSBsb2FkQXNwZWN0Lmxvb3A7XG4gIHZhciBkb2N1bWVudCA9IGVudmlyb25tZW50LndpbmRvdy5kb2N1bWVudDtcblxuICBsb2FkQXNwZWN0Lmxvb3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgLy8gYnJvd3NlcnMgY2FuIGNoYW5nZSBzZWxlY3QgdmFsdWUgYXMgcGFydCBvZiBcImF1dG9jb21wbGV0ZVwiIChJRTExKSBhdCBsb2FkIHRpbWVcbiAgICAvLyBvciBcInNob3cgcHJlc2VydmVkIG9uIGdvIGJhY2tcIiAoQ2hyb21lKSBhZnRlciBwYWdlIGlzIGxvYWRlZCBidXQgYmVmb3JlIFwicmVhZHlcIiBldmVudDtcbiAgICAvLyBtb3RlOiB0aGV5IG5ldmVyIFwicmVzdG9yZVwiIHNlbGVjdGVkLWRpc2FibGVkIG9wdGlvbnMuXG4gICAgLy8gVE9ETzogbWFrZSB0aGUgRlJPTSBWYWxpZGF0aW9uIGZvciAnc2VsZWN0ZWQtZGlzYWJsZWQnIGVhc3kuXG4gICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgIT0gJ2xvYWRpbmcnKSB7XG4gICAgICBvcmlnTG9hZEFzcGVjdExvb3AoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGRvbUNvbnRlbnRMb2FkZWRIYW5kbGVyID0gZnVuY3Rpb24gZG9tQ29udGVudExvYWRlZEhhbmRsZXIoKSB7XG4gICAgICAgIG9yaWdMb2FkQXNwZWN0TG9vcCgpO1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBkb21Db250ZW50TG9hZGVkSGFuZGxlcik7XG4gICAgICB9O1xuXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZG9tQ29udGVudExvYWRlZEhhbmRsZXIpOyAvLyBJRTkrXG4gICAgfVxuICB9O1xufVxuXG5TZWxlY3RFbGVtZW50UGx1Z2luLnBsdWdTdGF0aWNEb20gPSBmdW5jdGlvbiAoYXNwZWN0cykge1xuICB2YXIgY29uZmlndXJhdGlvbiA9IGFzcGVjdHMuY29uZmlndXJhdGlvbixcbiAgICAgIHN0YXRpY0RvbUZhY3RvcnkgPSBhc3BlY3RzLnN0YXRpY0RvbUZhY3RvcnksXG4gICAgICBjcmVhdGVFbGVtZW50QXNwZWN0ID0gYXNwZWN0cy5jcmVhdGVFbGVtZW50QXNwZWN0LFxuICAgICAgY29tcG9uZW50UHJvcGVydGllc0FzcGVjdCA9IGFzcGVjdHMuY29tcG9uZW50UHJvcGVydGllc0FzcGVjdCxcbiAgICAgIG9uQ2hhbmdlQXNwZWN0ID0gYXNwZWN0cy5vbkNoYW5nZUFzcGVjdCxcbiAgICAgIHRyaWdnZXJBc3BlY3QgPSBhc3BlY3RzLnRyaWdnZXJBc3BlY3QsXG4gICAgICBvcHRpb25zQXNwZWN0ID0gYXNwZWN0cy5vcHRpb25zQXNwZWN0LFxuICAgICAgb3B0R3JvdXBBc3BlY3QgPSBhc3BlY3RzLm9wdEdyb3VwQXNwZWN0LFxuICAgICAgZGlzcG9zZUFzcGVjdCA9IGFzcGVjdHMuZGlzcG9zZUFzcGVjdDtcbiAgdmFyIG9yaWdTdGF0aWNEb21GYWN0b3J5Q3JlYXRlID0gc3RhdGljRG9tRmFjdG9yeS5jcmVhdGU7XG5cbiAgc3RhdGljRG9tRmFjdG9yeS5jcmVhdGUgPSBmdW5jdGlvbiAoY3NzKSB7XG4gICAgdmFyIF9vcmlnU3RhdGljRG9tRmFjdG9yeSA9IG9yaWdTdGF0aWNEb21GYWN0b3J5Q3JlYXRlKGNzcyksXG4gICAgICAgIGNob2ljZXNEb20gPSBfb3JpZ1N0YXRpY0RvbUZhY3RvcnkuY2hvaWNlc0RvbSxcbiAgICAgICAgb3JpZ0NyZWF0ZVN0YXRpY0RvbSA9IF9vcmlnU3RhdGljRG9tRmFjdG9yeS5jcmVhdGVTdGF0aWNEb207XG5cbiAgICB2YXIgY2hvaWNlc0VsZW1lbnQgPSBjaG9pY2VzRG9tLmNob2ljZXNFbGVtZW50O1xuICAgIHJldHVybiB7XG4gICAgICBjaG9pY2VzRG9tOiBjaG9pY2VzRG9tLFxuICAgICAgY3JlYXRlU3RhdGljRG9tOiBmdW5jdGlvbiBjcmVhdGVTdGF0aWNEb20oZWxlbWVudCwgY29udGFpbmVyQ2xhc3MpIHtcbiAgICAgICAgdmFyIHNlbGVjdEVsZW1lbnQgPSBudWxsO1xuICAgICAgICB2YXIgY29udGFpbmVyRWxlbWVudCA9IG51bGw7XG4gICAgICAgIHZhciBwaWNrc0VsZW1lbnQgPSBudWxsO1xuXG4gICAgICAgIGlmIChlbGVtZW50LnRhZ05hbWUgPT0gJ1NFTEVDVCcpIHtcbiAgICAgICAgICBzZWxlY3RFbGVtZW50ID0gZWxlbWVudDtcblxuICAgICAgICAgIGlmIChjb250YWluZXJDbGFzcykge1xuICAgICAgICAgICAgY29udGFpbmVyRWxlbWVudCA9IGNsb3Nlc3RCeUNsYXNzTmFtZShzZWxlY3RFbGVtZW50LCBjb250YWluZXJDbGFzcyk7XG4gICAgICAgICAgICBpZiAoY29udGFpbmVyRWxlbWVudCkgcGlja3NFbGVtZW50ID0gZmluZERpcmVjdENoaWxkQnlUYWdOYW1lKGNvbnRhaW5lckVsZW1lbnQsICdVTCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChlbGVtZW50LnRhZ05hbWUgPT0gJ0RJVicpIHtcbiAgICAgICAgICBzZWxlY3RFbGVtZW50ID0gZmluZERpcmVjdENoaWxkQnlUYWdOYW1lKGVsZW1lbnQsICdTRUxFQ1QnKTtcblxuICAgICAgICAgIGlmIChzZWxlY3RFbGVtZW50KSB7XG4gICAgICAgICAgICBpZiAoY29udGFpbmVyQ2xhc3MpIHtcbiAgICAgICAgICAgICAgY29udGFpbmVyRWxlbWVudCA9IGNsb3Nlc3RCeUNsYXNzTmFtZShlbGVtZW50LCBjb250YWluZXJDbGFzcyk7XG4gICAgICAgICAgICAgIGlmIChjb250YWluZXJFbGVtZW50KSBwaWNrc0VsZW1lbnQgPSBmaW5kRGlyZWN0Q2hpbGRCeVRhZ05hbWUoY29udGFpbmVyRWxlbWVudCwgJ1VMJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBvcmlnQ3JlYXRlU3RhdGljRG9tKGVsZW1lbnQsIGNvbnRhaW5lckNsYXNzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZGlzcG9zYWJsZUNvbnRhaW5lckVsZW1lbnQgPSBmYWxzZTtcblxuICAgICAgICBpZiAoIWNvbnRhaW5lckVsZW1lbnQpIHtcbiAgICAgICAgICBjb250YWluZXJFbGVtZW50ID0gY3JlYXRlRWxlbWVudEFzcGVjdC5jcmVhdGVFbGVtZW50KCdESVYnKTtcbiAgICAgICAgICBjb250YWluZXJFbGVtZW50LmNsYXNzTGlzdC5hZGQoY29udGFpbmVyQ2xhc3MpO1xuICAgICAgICAgIGRpc3Bvc2FibGVDb250YWluZXJFbGVtZW50ID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpc0Rpc3Bvc2FibGVQaWNrc0VsZW1lbnQgPSBmYWxzZTtcblxuICAgICAgICBpZiAoIXBpY2tzRWxlbWVudCkge1xuICAgICAgICAgIHBpY2tzRWxlbWVudCA9IGNyZWF0ZUVsZW1lbnRBc3BlY3QuY3JlYXRlRWxlbWVudCgnVUwnKTtcbiAgICAgICAgICBpc0Rpc3Bvc2FibGVQaWNrc0VsZW1lbnQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlbGVjdEVsZW1lbnQpIHtcbiAgICAgICAgICB2YXIgYmFja3VwRGlzcGxheSA9IHNlbGVjdEVsZW1lbnQuc3R5bGUuZGlzcGxheTtcbiAgICAgICAgICBzZWxlY3RFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgdmFyIGJhY2t1cGVkUmVxdWlyZWQgPSBzZWxlY3RFbGVtZW50LnJlcXVpcmVkO1xuXG4gICAgICAgICAgY29uZmlndXJhdGlvbi5nZXRWYWx1ZVJlcXVpcmVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGJhY2t1cGVkUmVxdWlyZWQ7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGlmIChzZWxlY3RFbGVtZW50LnJlcXVpcmVkID09PSB0cnVlKSBzZWxlY3RFbGVtZW50LnJlcXVpcmVkID0gZmFsc2U7XG4gICAgICAgICAgdmFyIGdldERpc2FibGVkID0gY29uZmlndXJhdGlvbi5nZXREaXNhYmxlZDtcblxuICAgICAgICAgIGlmICghZ2V0RGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHZhciBmaWVsZHNldEVsZW1lbnQgPSBjbG9zZXN0QnlUYWdOYW1lKHNlbGVjdEVsZW1lbnQsICdGSUVMRFNFVCcpO1xuXG4gICAgICAgICAgICBpZiAoZmllbGRzZXRFbGVtZW50KSB7XG4gICAgICAgICAgICAgIGNvbXBvbmVudFByb3BlcnRpZXNBc3BlY3QuZ2V0RGlzYWJsZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGVjdEVsZW1lbnQuZGlzYWJsZWQgfHwgZmllbGRzZXRFbGVtZW50LmRpc2FibGVkO1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29tcG9uZW50UHJvcGVydGllc0FzcGVjdC5nZXREaXNhYmxlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZWN0RWxlbWVudC5kaXNhYmxlZDtcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBvbkNoYW5nZUFzcGVjdC5vbkNoYW5nZSA9IGNvbXBvc2VTeW5jKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0cmlnZ2VyQXNwZWN0LnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgICAgICAgIH0sIG9uQ2hhbmdlQXNwZWN0Lm9uQ2hhbmdlKTtcblxuICAgICAgICAgIG9wdGlvbnNBc3BlY3QuZ2V0T3B0aW9ucyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RFbGVtZW50Lm9wdGlvbnM7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGlmIChvcHRHcm91cEFzcGVjdCkge1xuICAgICAgICAgICAgb3B0R3JvdXBBc3BlY3QuZ2V0T3B0aW9uT3B0R3JvdXAgPSBmdW5jdGlvbiAob3B0aW9uKSB7XG4gICAgICAgICAgICAgIHJldHVybiBvcHRpb24ucGFyZW50Tm9kZTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIG9wdEdyb3VwQXNwZWN0LmdldE9wdEdyb3VwVGV4dCA9IGZ1bmN0aW9uIChvcHRHcm91cCkge1xuICAgICAgICAgICAgICByZXR1cm4gb3B0R3JvdXAubGFiZWw7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBvcHRHcm91cEFzcGVjdC5nZXRPcHRHcm91cElkID0gZnVuY3Rpb24gKG9wdEdyb3VwKSB7XG4gICAgICAgICAgICAgIHJldHVybiBvcHRHcm91cC5pZDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZGlzcG9zZUFzcGVjdC5kaXNwb3NlID0gY29tcG9zZVN5bmMoZGlzcG9zZUFzcGVjdC5kaXNwb3NlLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxlY3RFbGVtZW50LnJlcXVpcmVkID0gYmFja3VwZWRSZXF1aXJlZDtcbiAgICAgICAgICAgIHNlbGVjdEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IGJhY2t1cERpc3BsYXk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHN0YXRpY0RvbToge1xuICAgICAgICAgICAgaW5pdGlhbEVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgICAgICBjb250YWluZXJFbGVtZW50OiBjb250YWluZXJFbGVtZW50LFxuICAgICAgICAgICAgcGlja3NFbGVtZW50OiBwaWNrc0VsZW1lbnQsXG4gICAgICAgICAgICBpc0Rpc3Bvc2FibGVQaWNrc0VsZW1lbnQ6IGlzRGlzcG9zYWJsZVBpY2tzRWxlbWVudCxcbiAgICAgICAgICAgIHNlbGVjdEVsZW1lbnQ6IHNlbGVjdEVsZW1lbnRcbiAgICAgICAgICB9LFxuICAgICAgICAgIHN0YXRpY01hbmFnZXI6IHtcbiAgICAgICAgICAgIGFwcGVuZFRvQ29udGFpbmVyOiBmdW5jdGlvbiBhcHBlbmRUb0NvbnRhaW5lcigpIHtcbiAgICAgICAgICAgICAgaWYgKGRpc3Bvc2FibGVDb250YWluZXJFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0RWxlbWVudC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShjb250YWluZXJFbGVtZW50LCBzZWxlY3RFbGVtZW50Lm5leHRTaWJsaW5nKTtcbiAgICAgICAgICAgICAgICBjb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKGNob2ljZXNFbGVtZW50KTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RFbGVtZW50LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGNob2ljZXNFbGVtZW50LCBzZWxlY3RFbGVtZW50Lm5leHRTaWJsaW5nKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChpc0Rpc3Bvc2FibGVQaWNrc0VsZW1lbnQpIGNvbnRhaW5lckVsZW1lbnQuYXBwZW5kQ2hpbGQocGlja3NFbGVtZW50KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkaXNwb3NlOiBmdW5jdGlvbiBkaXNwb3NlKCkge1xuICAgICAgICAgICAgICBjaG9pY2VzRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGNob2ljZXNFbGVtZW50KTtcbiAgICAgICAgICAgICAgaWYgKGRpc3Bvc2FibGVDb250YWluZXJFbGVtZW50KSBzZWxlY3RFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoY29udGFpbmVyRWxlbWVudCk7XG4gICAgICAgICAgICAgIGlmIChpc0Rpc3Bvc2FibGVQaWNrc0VsZW1lbnQpIGNvbnRhaW5lckVsZW1lbnQucmVtb3ZlQ2hpbGQocGlja3NFbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfTtcbn07XG5cbi8vIHBsdWdpbiBzaG91bGQgb3ZlcmRyaXZlIHRoZW0gOiBjYWxsIHNldFdyYXBTZWxlY3RlZCBhbmQgZXRjXG4vLyB0aGVyZWZvcmUgdGhlcmUgc2hvdWxkIG5ldyBjb21wb25lbnQgQVBJIG1ldGhvZHNcbi8vIGFkZE9wdGlvblBpY2soa2V5KSAtPiBjYWxsIGFkZFBpY2socGljaykgd2hpY2ggcmV0dXJucyByZW1vdmVQaWNrKCkgXG4vLyBTZXRPcHRpb25TZWxlY3RlZEFzcGVjdCwgT3B0aW9uVG9nZ2xlQXNwZWN0IHNob3VsZCBiZSBtb3ZlZCB0aGVyZSBcbi8vIE9wdGlvblRvZ2dsZUFzcGVjdCBvdmVycmlkZWQgaW4gRGlzYWJsZWRPcHRpb25QbHVnaW5cbi8vIHdyYXAuaXNPcHRpb25TZWxlY3RlZCAsICB3cmFwLnVwZGF0ZVNlbGVjdGVkXG5cbmZ1bmN0aW9uIFNlbGVjdGVkT3B0aW9uUGx1Z2luKGFzcGVjdHMpIHtcbiAgdmFyIGNvbmZpZ3VyYXRpb24gPSBhc3BlY3RzLmNvbmZpZ3VyYXRpb24sXG4gICAgICB3cmFwc0NvbGxlY3Rpb24gPSBhc3BlY3RzLndyYXBzQ29sbGVjdGlvbixcbiAgICAgIHVwZGF0ZU9wdGlvbnNTZWxlY3RlZEFzcGVjdCA9IGFzcGVjdHMudXBkYXRlT3B0aW9uc1NlbGVjdGVkQXNwZWN0LFxuICAgICAgY3JlYXRlV3JhcEFzcGVjdCA9IGFzcGVjdHMuY3JlYXRlV3JhcEFzcGVjdCxcbiAgICAgIGJ1aWxkQ2hvaWNlQXNwZWN0ID0gYXNwZWN0cy5idWlsZENob2ljZUFzcGVjdCxcbiAgICAgIHJlbW92ZVBpY2tBc3BlY3QgPSBhc3BlY3RzLnJlbW92ZVBpY2tBc3BlY3QsXG4gICAgICByZXNldExheW91dEFzcGVjdCA9IGFzcGVjdHMucmVzZXRMYXlvdXRBc3BlY3QsXG4gICAgICBwaWNrc0xpc3QgPSBhc3BlY3RzLnBpY2tzTGlzdCxcbiAgICAgIGlzQ2hvaWNlU2VsZWN0YWJsZUFzcGVjdCA9IGFzcGVjdHMuaXNDaG9pY2VTZWxlY3RhYmxlQXNwZWN0LFxuICAgICAgb3B0aW9uVG9nZ2xlQXNwZWN0ID0gYXNwZWN0cy5vcHRpb25Ub2dnbGVBc3BlY3QsXG4gICAgICBjcmVhdGVQaWNrSGFuZGxlcnNBc3BlY3QgPSBhc3BlY3RzLmNyZWF0ZVBpY2tIYW5kbGVyc0FzcGVjdCxcbiAgICAgIGFkZFBpY2tBc3BlY3QgPSBhc3BlY3RzLmFkZFBpY2tBc3BlY3QsXG4gICAgICBmdWxsTWF0Y2hBc3BlY3QgPSBhc3BlY3RzLmZ1bGxNYXRjaEFzcGVjdCxcbiAgICAgIG9uQ2hhbmdlQXNwZWN0ID0gYXNwZWN0cy5vbkNoYW5nZUFzcGVjdCxcbiAgICAgIGZpbHRlclByZWRpY2F0ZUFzcGVjdCA9IGFzcGVjdHMuZmlsdGVyUHJlZGljYXRlQXNwZWN0O1xuICB2YXIgZ2V0SXNPcHRpb25TZWxlY3RlZCA9IGNvbmZpZ3VyYXRpb24uZ2V0U2VsZWN0ZWQsXG4gICAgICBzZXRJc09wdGlvblNlbGVjdGVkID0gY29uZmlndXJhdGlvbi5zZXRTZWxlY3RlZDtcbiAgdmFyIG9yaWdGaWx0ZXJQcmVkaWNhdGUgPSBmaWx0ZXJQcmVkaWNhdGVBc3BlY3QuZmlsdGVyUHJlZGljYXRlO1xuXG4gIGZpbHRlclByZWRpY2F0ZUFzcGVjdC5maWx0ZXJQcmVkaWNhdGUgPSBmdW5jdGlvbiAod3JhcCwgdGV4dCkge1xuICAgIHJldHVybiAhd3JhcC5pc09wdGlvblNlbGVjdGVkICYmIG9yaWdGaWx0ZXJQcmVkaWNhdGUod3JhcCwgdGV4dCk7XG4gIH07XG5cbiAgdmFyIG9yaWdCdWlsZENob2ljZSA9IGJ1aWxkQ2hvaWNlQXNwZWN0LmJ1aWxkQ2hvaWNlO1xuXG4gIGJ1aWxkQ2hvaWNlQXNwZWN0LmJ1aWxkQ2hvaWNlID0gZnVuY3Rpb24gKHdyYXApIHtcbiAgICBvcmlnQnVpbGRDaG9pY2Uod3JhcCk7XG5cbiAgICB3cmFwLnVwZGF0ZVNlbGVjdGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgd3JhcC5jaG9pY2UuY2hvaWNlRG9tTWFuYWdlckhhbmRsZXJzLnVwZGF0ZVNlbGVjdGVkKCk7XG4gICAgICBvbkNoYW5nZUFzcGVjdC5vbkNoYW5nZSgpO1xuICAgIH07XG5cbiAgICB3cmFwLmRpc3Bvc2UgPSBjb21wb3NlU3luYyhmdW5jdGlvbiAoKSB7XG4gICAgICB3cmFwLnVwZGF0ZVNlbGVjdGVkID0gbnVsbDtcbiAgICB9LCB3cmFwLmRpc3Bvc2UpO1xuICB9OyAvLyBUT0RPOiB0ZXN0IHRoaXMgaW5zdGVhZCBvZiB3cmFwLnVwZGF0ZVNlbGVjdGVkXG4gIC8vIGZ1bmN0aW9uIHVwZGF0ZVNlbGVjdGVkKHdyYXApe1xuICAvLyAgICAgaWYgKHdyYXAucGljayl7XG4gIC8vICAgICAgICAgaWYgKHdyYXAuaXNPcHRpb25TZWxlY3RlZClcbiAgLy8gICAgICAgICAgICAgcGlja0hhbmRsZXJzLnByb2R1Y2VQaWNrKCk7XG4gIC8vICAgICAgICAgZWxzZSB7XG4gIC8vICAgICAgICAgICAgIHBpY2tIYW5kbGVycy5yZW1vdmVBbmREaXNwb3NlKCk7XG4gIC8vICAgICAgICAgICAgIHBpY2tIYW5kbGVycy5yZW1vdmVBbmREaXNwb3NlPW51bGw7XG4gIC8vICAgICAgICAgfVxuICAvLyAgICAgfVxuICAvLyAgICAgd3JhcC5jaG9pY2UuY2hvaWNlRG9tTWFuYWdlckhhbmRsZXJzLnVwZGF0ZVNlbGVjdGVkKCk7XG4gIC8vICAgICBvbkNoYW5nZUFzcGVjdC5vbkNoYW5nZSgpO1xuICAvLyB9XG5cblxuICBmdW5jdGlvbiBjb21wb3NlVXBkYXRlU2VsZWN0ZWQod3JhcCwgYm9vbGVhblZhbHVlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHdyYXAuaXNPcHRpb25TZWxlY3RlZCA9IGJvb2xlYW5WYWx1ZTtcbiAgICAgIHdyYXAudXBkYXRlU2VsZWN0ZWQoKTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gdHJ5U2V0V3JhcFNlbGVjdGVkKG9wdGlvbiwgdXBkYXRlU2VsZWN0ZWQsIGJvb2xlYW5WYWx1ZSkge1xuICAgIC8vICB3cmFwLm9wdGlvblxuICAgIHZhciBzdWNjZXNzID0gZmFsc2U7XG4gICAgdmFyIGNvbmZpcm1lZCA9IHNldElzT3B0aW9uU2VsZWN0ZWQob3B0aW9uLCBib29sZWFuVmFsdWUpO1xuXG4gICAgaWYgKCEoY29uZmlybWVkID09PSBmYWxzZSkpIHtcbiAgICAgIHVwZGF0ZVNlbGVjdGVkKCk7XG4gICAgICBzdWNjZXNzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3VjY2VzcztcbiAgfVxuXG4gIHZhciBvcmlnQ3JlYXRlV3JhcCA9IGNyZWF0ZVdyYXBBc3BlY3QuY3JlYXRlV3JhcDtcblxuICBjcmVhdGVXcmFwQXNwZWN0LmNyZWF0ZVdyYXAgPSBmdW5jdGlvbiAob3B0aW9uKSB7XG4gICAgdmFyIHdyYXAgPSBvcmlnQ3JlYXRlV3JhcChvcHRpb24pO1xuICAgIHdyYXAuaXNPcHRpb25TZWxlY3RlZCA9IGdldElzT3B0aW9uU2VsZWN0ZWQob3B0aW9uKTtcbiAgICB3cmFwLnVwZGF0ZVNlbGVjdGVkID0gbnVsbDsgLy8gY2FuIGl0IGJlIGNvbWJpbmVkID9cblxuICAgIHJldHVybiB3cmFwO1xuICB9O1xuXG4gIG9wdGlvblRvZ2dsZUFzcGVjdC50b2dnbGU7IC8vIFRPRE86IGltcHJvdmUgZGVzaWduLCBubyByZXBsYWNlXG5cbiAgb3B0aW9uVG9nZ2xlQXNwZWN0LnRvZ2dsZSA9IGZ1bmN0aW9uICh3cmFwKSB7XG4gICAgcmV0dXJuIHRyeVNldFdyYXBTZWxlY3RlZCh3cmFwLm9wdGlvbiwgY29tcG9zZVVwZGF0ZVNlbGVjdGVkKHdyYXAsICF3cmFwLmlzT3B0aW9uU2VsZWN0ZWQpLCAhd3JhcC5pc09wdGlvblNlbGVjdGVkKTtcbiAgfTtcblxuICBmdWxsTWF0Y2hBc3BlY3QuZnVsbE1hdGNoO1xuXG4gIGZ1bGxNYXRjaEFzcGVjdC5mdWxsTWF0Y2ggPSBmdW5jdGlvbiAod3JhcCkge1xuICAgIHJldHVybiB0cnlTZXRXcmFwU2VsZWN0ZWQod3JhcC5vcHRpb24sIGNvbXBvc2VVcGRhdGVTZWxlY3RlZCh3cmFwLCB0cnVlKSwgdHJ1ZSk7XG4gIH07XG5cbiAgcmVtb3ZlUGlja0FzcGVjdC5yZW1vdmVQaWNrOyAvLyBUT0RPOiBpbXByb3ZlIGRlc2lnbiwgbm8gcmVwbGFjZVxuXG4gIHJlbW92ZVBpY2tBc3BlY3QucmVtb3ZlUGljayA9IGZ1bmN0aW9uICh3cmFwLCBwaWNrKSB7XG4gICAgLy8gVE9ETzogdHJ5IHJlbW92ZSBwaWNrXG4gICAgcmV0dXJuIHRyeVNldFdyYXBTZWxlY3RlZCh3cmFwLm9wdGlvbiwgY29tcG9zZVVwZGF0ZVNlbGVjdGVkKHdyYXAsIGZhbHNlKSwgZmFsc2UpO1xuICB9O1xuXG4gIHZhciBvcmlnQ3JlYXRlUGlja0hhbmRsZXJzID0gY3JlYXRlUGlja0hhbmRsZXJzQXNwZWN0LmNyZWF0ZVBpY2tIYW5kbGVycztcblxuICBjcmVhdGVQaWNrSGFuZGxlcnNBc3BlY3QuY3JlYXRlUGlja0hhbmRsZXJzID0gZnVuY3Rpb24gKHdyYXApIHtcbiAgICB2YXIgcGlja0hhbmRsZXJzID0gb3JpZ0NyZWF0ZVBpY2tIYW5kbGVycyh3cmFwKTtcbiAgICB3cmFwLnVwZGF0ZVNlbGVjdGVkID0gY29tcG9zZVN5bmMoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHdyYXAuaXNPcHRpb25TZWxlY3RlZCkge1xuICAgICAgICB2YXIgcGljayA9IHBpY2tIYW5kbGVycy5wcm9kdWNlUGljaygpO1xuICAgICAgICB3cmFwLnBpY2sgPSBwaWNrO1xuICAgICAgICBwaWNrLmRpc3Bvc2UgPSBjb21wb3NlU3luYyhwaWNrLmRpc3Bvc2UsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB3cmFwLnBpY2sgPSBudWxsO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBpY2tIYW5kbGVycy5yZW1vdmVBbmREaXNwb3NlKCk7XG4gICAgICAgIHBpY2tIYW5kbGVycy5yZW1vdmVBbmREaXNwb3NlID0gbnVsbDtcbiAgICAgIH1cbiAgICB9LCB3cmFwLnVwZGF0ZVNlbGVjdGVkKTtcbiAgICBhZGRQaWNrQXNwZWN0LmFkZFBpY2sod3JhcCwgcGlja0hhbmRsZXJzKTtcbiAgICByZXR1cm4gcGlja0hhbmRsZXJzO1xuICB9O1xuXG4gIHZhciBvcmlnQWRkUGljayA9IGFkZFBpY2tBc3BlY3QuYWRkUGljaztcblxuICBhZGRQaWNrQXNwZWN0LmFkZFBpY2sgPSBmdW5jdGlvbiAod3JhcCwgcGlja0hhbmRsZXJzKSB7XG4gICAgaWYgKHdyYXAuaXNPcHRpb25TZWxlY3RlZCkge1xuICAgICAgdmFyIHBpY2sgPSBvcmlnQWRkUGljayh3cmFwLCBwaWNrSGFuZGxlcnMpO1xuICAgICAgd3JhcC5waWNrID0gcGljaztcbiAgICAgIHBpY2suZGlzcG9zZSA9IGNvbXBvc2VTeW5jKHBpY2suZGlzcG9zZSwgZnVuY3Rpb24gKCkge1xuICAgICAgICB3cmFwLnBpY2sgPSBudWxsO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gcGljaztcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBidWlsZEFwaTogZnVuY3Rpb24gYnVpbGRBcGkoYXBpKSB7XG4gICAgICBhcGkuc2VsZWN0QWxsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXNldExheW91dEFzcGVjdC5yZXNldExheW91dCgpOyAvLyBhbHdheXMgaGlkZSAxc3RcblxuICAgICAgICB3cmFwc0NvbGxlY3Rpb24uZm9yTG9vcChmdW5jdGlvbiAod3JhcCkge1xuICAgICAgICAgIGlmIChpc0Nob2ljZVNlbGVjdGFibGVBc3BlY3QuaXNTZWxlY3RhYmxlKHdyYXApICYmICF3cmFwLmlzT3B0aW9uU2VsZWN0ZWQpIHRyeVNldFdyYXBTZWxlY3RlZCh3cmFwLm9wdGlvbiwgY29tcG9zZVVwZGF0ZVNlbGVjdGVkKHdyYXAsIHRydWUpLCB0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBhcGkuZGVzZWxlY3RBbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJlc2V0TGF5b3V0QXNwZWN0LnJlc2V0TGF5b3V0KCk7IC8vIGFsd2F5cyBoaWRlIDFzdFxuXG4gICAgICAgIHBpY2tzTGlzdC5mb3JFYWNoKGZ1bmN0aW9uIChwaWNrKSB7XG4gICAgICAgICAgcmV0dXJuIHBpY2suc2V0U2VsZWN0ZWRGYWxzZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIGFwaS5zZXRPcHRpb25TZWxlY3RlZCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICAgIHZhciB3cmFwID0gd3JhcHNDb2xsZWN0aW9uLmdldChrZXkpO1xuICAgICAgICByZXR1cm4gdHJ5U2V0V3JhcFNlbGVjdGVkKHdyYXAub3B0aW9uLCBjb21wb3NlVXBkYXRlU2VsZWN0ZWQod3JhcCwgdmFsdWUpLCB2YWx1ZSk7XG4gICAgICB9OyAvLyB1c2VkIGluIEZvcm1SZXN0b3JlT25CYWNrd2FyZFBsdWdpblxuXG5cbiAgICAgIGFwaS51cGRhdGVPcHRpb25zU2VsZWN0ZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB1cGRhdGVPcHRpb25zU2VsZWN0ZWRBc3BlY3QudXBkYXRlT3B0aW9uc1NlbGVjdGVkKCk7XG4gICAgICB9O1xuXG4gICAgICBhcGkudXBkYXRlT3B0aW9uU2VsZWN0ZWQgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHJldHVybiB1cGRhdGVDaG9pY2VTZWxlY3RlZCh3cmFwc0NvbGxlY3Rpb24uZ2V0KGtleSksIGdldElzT3B0aW9uU2VsZWN0ZWQpO1xuICAgICAgfTtcbiAgICB9XG4gIH07XG59XG5cblNlbGVjdGVkT3B0aW9uUGx1Z2luLnBsdWdTdGF0aWNEb20gPSBmdW5jdGlvbiAoYXNwZWN0cykge1xuICB2YXIgY29uZmlndXJhdGlvbiA9IGFzcGVjdHMuY29uZmlndXJhdGlvbixcbiAgICAgIHdyYXBzQ29sbGVjdGlvbiA9IGFzcGVjdHMud3JhcHNDb2xsZWN0aW9uO1xuICB2YXIgZ2V0SXNPcHRpb25TZWxlY3RlZCA9IGNvbmZpZ3VyYXRpb24uZ2V0U2VsZWN0ZWQsXG4gICAgICBzZXRJc09wdGlvblNlbGVjdGVkID0gY29uZmlndXJhdGlvbi5zZXRTZWxlY3RlZCxcbiAgICAgIG9wdGlvbnMgPSBjb25maWd1cmF0aW9uLm9wdGlvbnM7XG5cbiAgaWYgKG9wdGlvbnMpIHtcbiAgICBpZiAoIXNldElzT3B0aW9uU2VsZWN0ZWQpIHtcbiAgICAgIHNldElzT3B0aW9uU2VsZWN0ZWQgPSBmdW5jdGlvbiBzZXRJc09wdGlvblNlbGVjdGVkKG9wdGlvbiwgdmFsdWUpIHtcbiAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gdmFsdWU7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmICghZ2V0SXNPcHRpb25TZWxlY3RlZCkgZ2V0SXNPcHRpb25TZWxlY3RlZCA9IGZ1bmN0aW9uIGdldElzT3B0aW9uU2VsZWN0ZWQob3B0aW9uKSB7XG4gICAgICByZXR1cm4gb3B0aW9uLnNlbGVjdGVkO1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgLy8gc2VsZWN0RWxlbWVudFxuICAgIGlmICghZ2V0SXNPcHRpb25TZWxlY3RlZCkge1xuICAgICAgZ2V0SXNPcHRpb25TZWxlY3RlZCA9IGZ1bmN0aW9uIGdldElzT3B0aW9uU2VsZWN0ZWQob3B0aW9uKSB7XG4gICAgICAgIHJldHVybiBvcHRpb24uc2VsZWN0ZWQ7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmICghc2V0SXNPcHRpb25TZWxlY3RlZCkge1xuICAgICAgc2V0SXNPcHRpb25TZWxlY3RlZCA9IGZ1bmN0aW9uIHNldElzT3B0aW9uU2VsZWN0ZWQob3B0aW9uLCB2YWx1ZSkge1xuICAgICAgICBvcHRpb24uc2VsZWN0ZWQgPSB2YWx1ZTtcbiAgICAgIH07IC8vIE5PVEU6IGFkZGluZyB0aGlzIChzZXRBdHRyaWJ1dGUpIGJyZWFrIENocm9tZSdzIGh0bWwgZm9ybSByZXNldCBmdW5jdGlvbmFsaXR5OlxuICAgICAgLy8gaWYgKHZhbHVlKSBvcHRpb24uc2V0QXR0cmlidXRlKCdzZWxlY3RlZCcsJycpO1xuICAgICAgLy8gZWxzZSBvcHRpb24ucmVtb3ZlQXR0cmlidXRlKCdzZWxlY3RlZCcpO1xuXG4gICAgfVxuICB9XG5cbiAgY29uZmlndXJhdGlvbi5nZXRTZWxlY3RlZCA9IGdldElzT3B0aW9uU2VsZWN0ZWQ7XG4gIGNvbmZpZ3VyYXRpb24uc2V0U2VsZWN0ZWQgPSBzZXRJc09wdGlvblNlbGVjdGVkO1xuICBhc3BlY3RzLnVwZGF0ZU9wdGlvbnNTZWxlY3RlZEFzcGVjdCA9IFVwZGF0ZU9wdGlvbnNTZWxlY3RlZEFzcGVjdCh3cmFwc0NvbGxlY3Rpb24sIGdldElzT3B0aW9uU2VsZWN0ZWQpO1xufTtcblxuZnVuY3Rpb24gVXBkYXRlT3B0aW9uc1NlbGVjdGVkQXNwZWN0KHdyYXBzQ29sbGVjdGlvbiwgZ2V0SXNPcHRpb25TZWxlY3RlZCkge1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZU9wdGlvbnNTZWxlY3RlZDogZnVuY3Rpb24gdXBkYXRlT3B0aW9uc1NlbGVjdGVkKCkge1xuICAgICAgd3JhcHNDb2xsZWN0aW9uLmZvckxvb3AoZnVuY3Rpb24gKHdyYXApIHtcbiAgICAgICAgcmV0dXJuIHVwZGF0ZUNob2ljZVNlbGVjdGVkKHdyYXAsIGdldElzT3B0aW9uU2VsZWN0ZWQpO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiB1cGRhdGVDaG9pY2VTZWxlY3RlZCh3cmFwLCBnZXRJc09wdGlvblNlbGVjdGVkKSB7XG4gIHZhciBuZXdJc1NlbGVjdGVkID0gZ2V0SXNPcHRpb25TZWxlY3RlZCh3cmFwLm9wdGlvbik7XG5cbiAgaWYgKG5ld0lzU2VsZWN0ZWQgIT0gd3JhcC5pc09wdGlvblNlbGVjdGVkKSB7XG4gICAgd3JhcC5pc09wdGlvblNlbGVjdGVkID0gbmV3SXNTZWxlY3RlZDtcbiAgICB3cmFwLnVwZGF0ZVNlbGVjdGVkID09IG51bGwgPyB2b2lkIDAgOiB3cmFwLnVwZGF0ZVNlbGVjdGVkKCk7IC8vIHNvbWUgaGlkZGVuIG9lc24ndCBoYXZlIGVsZW1lbnQgKGFuZCBuZWVkIHRvIGJlIHVwZGF0ZWQpXG4gIH1cbn1cblxuZnVuY3Rpb24gRGlzYWJsZWRPcHRpb25QbHVnaW4ocGx1Z2luRGF0YSkge1xuICB2YXIgY29uZmlndXJhdGlvbiA9IHBsdWdpbkRhdGEuY29uZmlndXJhdGlvbixcbiAgICAgIGlzQ2hvaWNlU2VsZWN0YWJsZUFzcGVjdCA9IHBsdWdpbkRhdGEuaXNDaG9pY2VTZWxlY3RhYmxlQXNwZWN0LFxuICAgICAgY3JlYXRlV3JhcEFzcGVjdCA9IHBsdWdpbkRhdGEuY3JlYXRlV3JhcEFzcGVjdCxcbiAgICAgIGJ1aWxkQ2hvaWNlQXNwZWN0ID0gcGx1Z2luRGF0YS5idWlsZENob2ljZUFzcGVjdCxcbiAgICAgIGZpbHRlclByZWRpY2F0ZUFzcGVjdCA9IHBsdWdpbkRhdGEuZmlsdGVyUHJlZGljYXRlQXNwZWN0LFxuICAgICAgd3JhcHNDb2xsZWN0aW9uID0gcGx1Z2luRGF0YS53cmFwc0NvbGxlY3Rpb24sXG4gICAgICBvcHRpb25Ub2dnbGVBc3BlY3QgPSBwbHVnaW5EYXRhLm9wdGlvblRvZ2dsZUFzcGVjdCxcbiAgICAgIGJ1aWxkUGlja0FzcGVjdCA9IHBsdWdpbkRhdGEuYnVpbGRQaWNrQXNwZWN0O1xuICB2YXIgZ2V0SXNPcHRpb25EaXNhYmxlZCA9IGNvbmZpZ3VyYXRpb24uZ2V0SXNPcHRpb25EaXNhYmxlZCxcbiAgICAgIG9wdGlvbnMgPSBjb25maWd1cmF0aW9uLm9wdGlvbnM7XG5cbiAgaWYgKG9wdGlvbnMpIHtcbiAgICBpZiAoIWdldElzT3B0aW9uRGlzYWJsZWQpIGdldElzT3B0aW9uRGlzYWJsZWQgPSBmdW5jdGlvbiBnZXRJc09wdGlvbkRpc2FibGVkKG9wdGlvbikge1xuICAgICAgcmV0dXJuIG9wdGlvbi5kaXNhYmxlZCA9PT0gdW5kZWZpbmVkID8gZmFsc2UgOiBvcHRpb24uZGlzYWJsZWQ7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICAvLyBzZWxlY3RFbGVtZW50XG4gICAgaWYgKCFnZXRJc09wdGlvbkRpc2FibGVkKSBnZXRJc09wdGlvbkRpc2FibGVkID0gZnVuY3Rpb24gZ2V0SXNPcHRpb25EaXNhYmxlZChvcHRpb24pIHtcbiAgICAgIHJldHVybiBvcHRpb24uZGlzYWJsZWQ7XG4gICAgfTtcbiAgfSAvLyBUT0RPIGNoZWNrIHRoaXMgaW5zdGVhZCBvZiB3cmFwLnVwZGF0ZURpc2FibGVkXG4gIC8vIGZ1bmN0aW9uIHVwZGF0ZURpc2FibGVkKHdyYXApe1xuICAvLyAgICAgd3JhcD8uY2hvaWNlPy5jaG9pY2VEb21NYW5hZ2VySGFuZGxlcnM/LnVwZGF0ZURpc2FibGVkPy4oKTtcbiAgLy8gICAgIHdyYXA/LnBpY2s/LnBpY2tEb21NYW5hZ2VySGFuZGxlcnM/LnVwZGF0ZURpc2FibGVkPy4oKTtcbiAgLy8gfVxuXG5cbiAgdmFyIG9yaWdDcmVhdGVXcmFwID0gY3JlYXRlV3JhcEFzcGVjdC5jcmVhdGVXcmFwO1xuXG4gIGNyZWF0ZVdyYXBBc3BlY3QuY3JlYXRlV3JhcCA9IGZ1bmN0aW9uIChvcHRpb24pIHtcbiAgICB2YXIgd3JhcCA9IG9yaWdDcmVhdGVXcmFwKG9wdGlvbik7XG4gICAgd3JhcC5pc09wdGlvbkRpc2FibGVkID0gZ2V0SXNPcHRpb25EaXNhYmxlZChvcHRpb24pOyAvLyBUT0RPOiByZW1vdmUgdXNhZ2Ugd3JhcC5pc09wdGlvbkRpc2FibGVkXG5cbiAgICB3cmFwLnVwZGF0ZURpc2FibGVkID0gbnVsbDtcbiAgICByZXR1cm4gd3JhcDtcbiAgfTtcblxuICB2YXIgb3JpZ1RvZ2dsZSA9IG9wdGlvblRvZ2dsZUFzcGVjdC50b2dnbGU7XG5cbiAgb3B0aW9uVG9nZ2xlQXNwZWN0LnRvZ2dsZSA9IGZ1bmN0aW9uICh3cmFwKSB7XG4gICAgdmFyIHN1Y2Nlc3MgPSBmYWxzZTtcblxuICAgIGlmICh3cmFwLmlzT3B0aW9uU2VsZWN0ZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKHdyYXAuaXNPcHRpb25TZWxlY3RlZCB8fCAhd3JhcC5pc09wdGlvbkRpc2FibGVkKSAvLyBUT0RPOiBkZWNsYXJlIGRlcGVuZGVuY3kgb24gU2VsZWN0ZWRPcHRpb25QbHVnaW5cbiAgICAgICAgc3VjY2VzcyA9IG9yaWdUb2dnbGUod3JhcCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghd3JhcC5pc09wdGlvbkRpc2FibGVkKSB7XG4gICAgICAgIHN1Y2Nlc3MgPSBvcmlnVG9nZ2xlKHdyYXApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzdWNjZXNzO1xuICB9O1xuXG4gIHZhciBvcmlnSXNTZWxlY3RhYmxlID0gaXNDaG9pY2VTZWxlY3RhYmxlQXNwZWN0LmlzU2VsZWN0YWJsZTtcblxuICBpc0Nob2ljZVNlbGVjdGFibGVBc3BlY3QuaXNTZWxlY3RhYmxlID0gZnVuY3Rpb24gKHdyYXApIHtcbiAgICByZXR1cm4gb3JpZ0lzU2VsZWN0YWJsZSh3cmFwKSAmJiAhd3JhcC5pc09wdGlvbkRpc2FibGVkO1xuICB9O1xuXG4gIHZhciBvcmlnRmlsdGVyUHJlZGljYXRlID0gZmlsdGVyUHJlZGljYXRlQXNwZWN0LmZpbHRlclByZWRpY2F0ZTtcblxuICBmaWx0ZXJQcmVkaWNhdGVBc3BlY3QuZmlsdGVyUHJlZGljYXRlID0gZnVuY3Rpb24gKHdyYXAsIHRleHQpIHtcbiAgICByZXR1cm4gIXdyYXAuaXNPcHRpb25EaXNhYmxlZCAmJiBvcmlnRmlsdGVyUHJlZGljYXRlKHdyYXAsIHRleHQpO1xuICB9O1xuXG4gIHZhciBvcmlnQnVpbGRDaG9pY2UgPSBidWlsZENob2ljZUFzcGVjdC5idWlsZENob2ljZTtcblxuICBidWlsZENob2ljZUFzcGVjdC5idWlsZENob2ljZSA9IGZ1bmN0aW9uICh3cmFwKSB7XG4gICAgb3JpZ0J1aWxkQ2hvaWNlKHdyYXApO1xuICAgIHdyYXAudXBkYXRlRGlzYWJsZWQgPSB3cmFwLmNob2ljZS5jaG9pY2VEb21NYW5hZ2VySGFuZGxlcnMudXBkYXRlRGlzYWJsZWQ7XG4gICAgd3JhcC5jaG9pY2UuZGlzcG9zZSA9IGNvbXBvc2VTeW5jKGZ1bmN0aW9uICgpIHtcbiAgICAgIHdyYXAudXBkYXRlRGlzYWJsZWQgPSBudWxsO1xuICAgIH0sIHdyYXAuY2hvaWNlLmRpc3Bvc2UpO1xuICB9O1xuXG4gIHZhciBvcmlnQnVpbGRQaWNrID0gYnVpbGRQaWNrQXNwZWN0LmJ1aWxkUGljaztcblxuICBidWlsZFBpY2tBc3BlY3QuYnVpbGRQaWNrID0gZnVuY3Rpb24gKHdyYXAsIHJlbW92ZU9uQnV0dG9uKSB7XG4gICAgdmFyIHBpY2sgPSBvcmlnQnVpbGRQaWNrKHdyYXAsIHJlbW92ZU9uQnV0dG9uKTtcblxuICAgIHBpY2sudXBkYXRlRGlzYWJsZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gcGljay5waWNrRG9tTWFuYWdlckhhbmRsZXJzLnVwZGF0ZURpc2FibGVkKCk7XG4gICAgfTtcblxuICAgIHBpY2suZGlzcG9zZSA9IGNvbXBvc2VTeW5jKHBpY2suZGlzcG9zZSwgZnVuY3Rpb24gKCkge1xuICAgICAgcGljay51cGRhdGVEaXNhYmxlZCA9IG51bGw7XG4gICAgfSk7XG4gICAgdmFyIGNob2ljZVVwZGF0ZURpc2FibGVkQmFja3VwID0gd3JhcC51cGRhdGVEaXNhYmxlZDtcbiAgICB3cmFwLnVwZGF0ZURpc2FibGVkID0gY29tcG9zZVN5bmMoY2hvaWNlVXBkYXRlRGlzYWJsZWRCYWNrdXAsIHBpY2sudXBkYXRlRGlzYWJsZWQpOyAvLyBhZGQgcGlja0Rpc2FibGVkXG5cbiAgICBwaWNrLmRpc3Bvc2UgPSBjb21wb3NlU3luYyhwaWNrLmRpc3Bvc2UsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHdyYXAudXBkYXRlRGlzYWJsZWQgPSBjaG9pY2VVcGRhdGVEaXNhYmxlZEJhY2t1cDsgLy8gcmVtb3ZlIHBpY2tEaXNhYmxlZFxuXG4gICAgICB3cmFwLnVwZGF0ZURpc2FibGVkKCk7IC8vIG1ha2UgXCJ0cnVlIGRpc2FibGVkXCIgd2l0aG91dCBpdCBjaGVja2JveCBvbmx5IGxvb2tzIGRpc2FibGVkXG4gICAgfSk7XG4gICAgcmV0dXJuIHBpY2s7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBidWlsZEFwaTogZnVuY3Rpb24gYnVpbGRBcGkoYXBpKSB7XG4gICAgICBhcGkudXBkYXRlT3B0aW9uc0Rpc2FibGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gd3JhcHNDb2xsZWN0aW9uLmZvckxvb3AoZnVuY3Rpb24gKHdyYXApIHtcbiAgICAgICAgICByZXR1cm4gdXBkYXRlQ2hvaWNlRGlzYWJsZWQod3JhcCwgZ2V0SXNPcHRpb25EaXNhYmxlZCk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgYXBpLnVwZGF0ZU9wdGlvbkRpc2FibGVkID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICByZXR1cm4gdXBkYXRlQ2hvaWNlRGlzYWJsZWQod3JhcHNDb2xsZWN0aW9uLmdldChrZXkpLCBnZXRJc09wdGlvbkRpc2FibGVkKTtcbiAgICAgIH07XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiB1cGRhdGVDaG9pY2VEaXNhYmxlZCh3cmFwLCBnZXRJc09wdGlvbkRpc2FibGVkKSB7XG4gIHZhciBuZXdJc0Rpc2FibGVkID0gZ2V0SXNPcHRpb25EaXNhYmxlZCh3cmFwLm9wdGlvbik7XG5cbiAgaWYgKG5ld0lzRGlzYWJsZWQgIT0gd3JhcC5pc09wdGlvbkRpc2FibGVkKSB7XG4gICAgd3JhcC5pc09wdGlvbkRpc2FibGVkID0gbmV3SXNEaXNhYmxlZDtcbiAgICB3cmFwLnVwZGF0ZURpc2FibGVkID09IG51bGwgPyB2b2lkIDAgOiB3cmFwLnVwZGF0ZURpc2FibGVkKCk7IC8vIHNvbWUgaGlkZGVuIG9lc24ndCBoYXZlIGVsZW1lbnQgKGFuZCBuZWVkIHRvIGJlIHVwZGF0ZWQpXG4gIH1cbn1cblxuZnVuY3Rpb24gUGlja3NBcGlQbHVnaW4ocGx1Z2luRGF0YSkge1xuICB2YXIgcGlja3NMaXN0ID0gcGx1Z2luRGF0YS5waWNrc0xpc3QsXG4gICAgICBjcmVhdGVXcmFwQXNwZWN0ID0gcGx1Z2luRGF0YS5jcmVhdGVXcmFwQXNwZWN0LFxuICAgICAgY3JlYXRlUGlja0hhbmRsZXJzQXNwZWN0ID0gcGx1Z2luRGF0YS5jcmVhdGVQaWNrSGFuZGxlcnNBc3BlY3QsXG4gICAgICBhZGRQaWNrQXNwZWN0ID0gcGx1Z2luRGF0YS5hZGRQaWNrQXNwZWN0O1xuICByZXR1cm4ge1xuICAgIGJ1aWxkQXBpOiBmdW5jdGlvbiBidWlsZEFwaShhcGkpIHtcbiAgICAgIGFwaS5mb3JFYWNoUGVhayA9IGZ1bmN0aW9uIChmKSB7XG4gICAgICAgIHJldHVybiBwaWNrc0xpc3QuZm9yRWFjaChmdW5jdGlvbiAod3JhcCkge1xuICAgICAgICAgIHJldHVybiBmKHdyYXAub3B0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgICB9OyAvLyBUT0RPOiBnZXRIZWFkUGVha1xuXG5cbiAgICAgIGFwaS5nZXRUYWlsUGVhayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9waWNrc0xpc3QkZ2V0VGFpbDtcblxuICAgICAgICByZXR1cm4gKF9waWNrc0xpc3QkZ2V0VGFpbCA9IHBpY2tzTGlzdC5nZXRUYWlsKCkpID09IG51bGwgPyB2b2lkIDAgOiBfcGlja3NMaXN0JGdldFRhaWwub3B0aW9uO1xuICAgICAgfTtcblxuICAgICAgYXBpLmNvdW50UGVha3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBwaWNrc0xpc3QuZ2V0Q291bnQoKTtcbiAgICAgIH07XG5cbiAgICAgIGFwaS5pc0VtcHR5UGVha3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBwaWNrc0xpc3QuaXNFbXB0eSgpO1xuICAgICAgfTtcblxuICAgICAgYXBpLmFkZFBpY2sgPSBmdW5jdGlvbiAob3B0aW9uKSB7XG4gICAgICAgIHZhciB3cmFwID0gY3JlYXRlV3JhcEFzcGVjdC5jcmVhdGVXcmFwKG9wdGlvbik7IC8vIFRPRE8gc2hvdWxkIGJlIG1vdmVkIHRvIHNwZWNpZmljIHBsdWdpbnNcblxuICAgICAgICB3cmFwLnVwZGF0ZURpc2FibGVkID0gZnVuY3Rpb24gKCkge307XG5cbiAgICAgICAgd3JhcC51cGRhdGVIaWRkZW4gPSBmdW5jdGlvbiAoKSB7fTtcblxuICAgICAgICB2YXIgcGlja0hhbmRsZXJzID0gY3JlYXRlUGlja0hhbmRsZXJzQXNwZWN0LmNyZWF0ZVBpY2tIYW5kbGVycyh3cmFwKTtcbiAgICAgICAgYWRkUGlja0FzcGVjdC5hZGRQaWNrKHdyYXAsIHBpY2tIYW5kbGVycyk7XG4gICAgICB9O1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gUGlja3NQbHVnaW4oYXNwZWN0cykge1xuICB2YXIgY29uZmlndXJhdGlvbiA9IGFzcGVjdHMuY29uZmlndXJhdGlvbjtcbiAgICAgIGFzcGVjdHMuaW5wdXRBc3BlY3Q7XG4gICAgICBhc3BlY3RzLmZpbHRlckRvbTtcbiAgICAgIGFzcGVjdHMuZmlsdGVyTWFuYWdlckFzcGVjdDtcbiAgY29uZmlndXJhdGlvbi5waWNrcztcbiAgICAgIGNvbmZpZ3VyYXRpb24uYWRkT3B0aW9uUGlja2VkO1xuICAvKlxyXG4gIGlmICghYWRkT3B0aW9uUGlja2VkKXtcclxuICAgICAgYWRkT3B0aW9uUGlja2VkID0gKG9wdGlvbiwgaW5kZXgsIHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICBpZiAodmFsdWUpXHJcbiAgICAgICAgICAgICAgcGlja3MucHVzaChvcHRpb24pO1xyXG4gICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgIHBpY2tzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfTtcclxuICB9XHJcbiAgICBmdW5jdGlvbiB0cnlTZXRXcmFwU2VsZWN0ZWQob3B0aW9uLCB1cGRhdGVTZWxlY3RlZCwgYm9vbGVhblZhbHVlKXtcclxuICAgICAgbGV0IHN1Y2Nlc3MgPSBmYWxzZTtcclxuICAgICAgdmFyIGNvbmZpcm1lZCA9IHNldElzT3B0aW9uU2VsZWN0ZWQob3B0aW9uLCBib29sZWFuVmFsdWUpO1xyXG4gICAgICBpZiAoIShjb25maXJtZWQ9PT1mYWxzZSkpIHtcclxuICAgICAgICAgIHVwZGF0ZVNlbGVjdGVkKCk7XHJcbiAgICAgICAgICBzdWNjZXNzID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gc3VjY2VzcztcclxuICB9XHJcbiAgICBsZXQgb3JpZ1Byb2Nlc3NJbnB1dCA9IGlucHV0QXNwZWN0LnByb2Nlc3NJbnB1dDtcclxuICBpbnB1dEFzcGVjdC5wcm9jZXNzSW5wdXQgPSAoKSA9PiB7XHJcbiAgICAgIGxldCBvcmlnUmVzdWx0ID0gb3JpZ1Byb2Nlc3NJbnB1dCgpO1xyXG4gICAgICBpZiAoIW9yaWdSZXN1bHQuaXNFbXB0eSlcclxuICAgICAge1xyXG4gICAgICAgICAgaWYgKCBmaWx0ZXJNYW5hZ2VyQXNwZWN0LmdldE5hdmlnYXRlTWFuYWdlcigpLmdldENvdW50KCkgPT0gMSlcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAvLyB0b2RvOiBtb3ZlIGV4YWN0IG1hdGNoIHRvIGZpbHRlck1hbmFnZXJcclxuICAgICAgICAgICAgICBsZXQgZnVsbE1hdGNoV3JhcCA9ICBmaWx0ZXJNYW5hZ2VyQXNwZWN0LmdldE5hdmlnYXRlTWFuYWdlcigpLmdldEhlYWQoKTtcclxuICAgICAgICAgICAgICBsZXQgdGV4dCA9IGZpbHRlck1hbmFnZXJBc3BlY3QuZ2V0RmlsdGVyKCk7XHJcbiAgICAgICAgICAgICAgaWYgKGZ1bGxNYXRjaFdyYXAuY2hvaWNlLnNlYXJjaFRleHQgPT0gdGV4dClcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgIGxldCBzdWNjZXNzID0gdHJ5U2V0V3JhcFNlbGVjdGVkKGZ1bGxNYXRjaFdyYXAsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICBpZiAoc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgZmlsdGVyRG9tLnNldEVtcHR5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBvcmlnUmVzdWx0LmlzRW1wdHkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBvcmlnUmVzdWx0O1xyXG4gIH0qL1xufVxuXG5QaWNrc1BsdWdpbi5wbHVnU3RhdGljRG9tID0gZnVuY3Rpb24gKGFzcGVjdHMpIHtcbiAgdmFyIGNvbmZpZ3VyYXRpb24gPSBhc3BlY3RzLmNvbmZpZ3VyYXRpb24sXG4gICAgICBwaWNrc0xpc3QgPSBhc3BlY3RzLnBpY2tzTGlzdDtcbiAgdmFyIHBpY2tzID0gY29uZmlndXJhdGlvbi5waWNrcztcblxuICBpZiAocGlja3MpIHtcbiAgICB2YXIgb3JpZ0FkZCA9IHBpY2tzTGlzdC5hZGQsXG4gICAgICAgIG9yaWdSZXNldCA9IHBpY2tzTGlzdC5yZXNldDtcblxuICAgIHBpY2tzTGlzdC5hZGQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgdmFyIF9vcmlnQWRkID0gb3JpZ0FkZChlKSxcbiAgICAgICAgICByZW1vdmUgPSBfb3JpZ0FkZC5yZW1vdmUsXG4gICAgICAgICAgaW5kZXggPSBfb3JpZ0FkZC5pbmRleDtcblxuICAgICAgcGlja3MucHVzaChlKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJlbW92ZTogY29tcG9zZVN5bmMocmVtb3ZlLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIHZvaWQgcGlja3Muc3BsaWNlKGluZGV4KCksIDEpO1xuICAgICAgICB9KSxcbiAgICAgICAgaW5kZXg6IGluZGV4XG4gICAgICB9O1xuICAgIH07XG5cbiAgICBwaWNrc0xpc3QucmVzZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBvcmlnUmVzZXQoKTtcbiAgICAgIHBpY2tzLmxlbmd0aCA9IDA7XG4gICAgfTtcbiAgfVxufTtcblxuZnVuY3Rpb24gQ3JlYXRlUG9wcGVyUGx1Z2luKGFzcGVjdHMpIHtcbiAgdmFyIGVudmlyb25tZW50ID0gYXNwZWN0cy5lbnZpcm9ubWVudDtcbiAgdmFyIGNyZWF0ZVBvcHBlciA9IGVudmlyb25tZW50LmNyZWF0ZVBvcHBlcixcbiAgICAgIFBvcHBlciA9IGVudmlyb25tZW50LlBvcHBlcixcbiAgICAgIGdsb2JhbFBvcHBlciA9IGVudmlyb25tZW50Lmdsb2JhbFBvcHBlcjtcbiAgdmFyIGNyZWF0ZU1vZGlmaWVyc1ZYID0gbnVsbDtcbiAgdmFyIGNyZWF0ZVBvcHBlclZYID0gbnVsbDtcblxuICBpZiAoUG9wcGVyKSB7XG4gICAgLy8gVjJcbiAgICBjcmVhdGVQb3BwZXJWWCA9IGNyZWF0ZVBvcHBlciA9IGZ1bmN0aW9uIChjcmVhdGVQb3BwZXJDb25zdHJ1Y3Rvcikge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhbmNob3JFbGVtZW50LCBlbGVtZW50LCBwb3BwZXJDb25maWd1cmF0aW9uKSB7XG4gICAgICAgIHJldHVybiBuZXcgY3JlYXRlUG9wcGVyQ29uc3RydWN0b3IoYW5jaG9yRWxlbWVudCwgZWxlbWVudCwgcG9wcGVyQ29uZmlndXJhdGlvbik7XG4gICAgICB9O1xuICAgIH0oUG9wcGVyKTtcbiAgICBjcmVhdGVNb2RpZmllcnNWWCA9IENyZWF0ZU1vZGlmaWVyc1YxO1xuICB9IGVsc2UgaWYgKGNyZWF0ZVBvcHBlcikge1xuICAgIGNyZWF0ZVBvcHBlclZYID0gY3JlYXRlUG9wcGVyO1xuICAgIGNyZWF0ZU1vZGlmaWVyc1ZYID0gQ3JlYXRlTW9kaWZpZXJzVjI7XG4gIH0gZWxzZSBpZiAoZ2xvYmFsUG9wcGVyKSB7XG4gICAgaWYgKGdsb2JhbFBvcHBlci5jcmVhdGVQb3BwZXIpIHtcbiAgICAgIGNyZWF0ZVBvcHBlclZYID0gZ2xvYmFsUG9wcGVyLmNyZWF0ZVBvcHBlcjtcbiAgICAgIGNyZWF0ZU1vZGlmaWVyc1ZYID0gQ3JlYXRlTW9kaWZpZXJzVjI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNyZWF0ZVBvcHBlclZYID0gY3JlYXRlUG9wcGVyID0gZnVuY3Rpb24gKGNyZWF0ZVBvcHBlckNvbnN0cnVjdG9yKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoYW5jaG9yRWxlbWVudCwgZWxlbWVudCwgcG9wcGVyQ29uZmlndXJhdGlvbikge1xuICAgICAgICAgIHJldHVybiBuZXcgY3JlYXRlUG9wcGVyQ29uc3RydWN0b3IoYW5jaG9yRWxlbWVudCwgZWxlbWVudCwgcG9wcGVyQ29uZmlndXJhdGlvbik7XG4gICAgICAgIH07XG4gICAgICB9KGdsb2JhbFBvcHBlcik7XG5cbiAgICAgIGNyZWF0ZU1vZGlmaWVyc1ZYID0gQ3JlYXRlTW9kaWZpZXJzVjE7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkJzTXVsdGlTZWxlY3Q6IFBvcHBlciBjb21wb25lbnQgKGh0dHBzOi8vcG9wcGVyLmpzLm9yZykgaXMgcmVxdWlyZWRcIik7XG4gIH1cblxuICBhc3BlY3RzLmNyZWF0ZVBvcHBlckFzcGVjdCA9IENyZWF0ZVBvcHBlckFzcGVjdChjcmVhdGVQb3BwZXJWWCwgY3JlYXRlTW9kaWZpZXJzVlgpO1xufVxuXG5mdW5jdGlvbiBDcmVhdGVNb2RpZmllcnNWMShwcmV2ZW50T3ZlcmZsb3cpIHtcbiAgcmV0dXJuIHtcbiAgICBwcmV2ZW50T3ZlcmZsb3c6IHtcbiAgICAgIGVuYWJsZWQ6IHByZXZlbnRPdmVyZmxvd1xuICAgIH0sXG4gICAgaGlkZToge1xuICAgICAgZW5hYmxlZDogZmFsc2VcbiAgICB9LFxuICAgIGZsaXA6IHtcbiAgICAgIGVuYWJsZWQ6IGZhbHNlXG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBDcmVhdGVNb2RpZmllcnNWMihwcmV2ZW50T3ZlcmZsb3cpIHtcbiAgdmFyIG1vZGlmaWVycyA9IFt7XG4gICAgbmFtZTogJ2ZsaXAnLFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIGZhbGxiYWNrUGxhY2VtZW50czogWydib3R0b20nXVxuICAgIH1cbiAgfV07XG5cbiAgaWYgKHByZXZlbnRPdmVyZmxvdykge1xuICAgIG1vZGlmaWVycy5wdXNoKHtcbiAgICAgIG5hbWU6ICdwcmV2ZW50T3ZlcmZsb3cnXG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gbW9kaWZpZXJzO1xufVxuXG5mdW5jdGlvbiBDcmVhdGVQb3BwZXJBc3BlY3QoY3JlYXRlUG9wcGVyVlgsIGNyZWF0ZU1vZGlmaWVyc1ZYKSB7XG4gIHJldHVybiB7XG4gICAgY3JlYXRlUG9wcGVyOiBmdW5jdGlvbiBjcmVhdGVQb3BwZXIoZWxlbWVudCwgYW5jaG9yRWxlbWVudCwgcHJldmVudE92ZXJmbG93KSB7XG4gICAgICB2YXIgbW9kaWZpZXJzID0gY3JlYXRlTW9kaWZpZXJzVlgocHJldmVudE92ZXJmbG93KTtcbiAgICAgIHZhciBwb3BwZXJDb25maWd1cmF0aW9uID0ge1xuICAgICAgICBwbGFjZW1lbnQ6ICdib3R0b20tc3RhcnQnLFxuICAgICAgICBtb2RpZmllcnM6IG1vZGlmaWVyc1xuICAgICAgfTtcbiAgICAgIHZhciBwb3BwZXIgPSBudWxsO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgICBwb3BwZXIgPSBjcmVhdGVQb3BwZXJWWChhbmNob3JFbGVtZW50LCBlbGVtZW50LCBwb3BwZXJDb25maWd1cmF0aW9uKTtcbiAgICAgICAgfSxcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgICAgICAgcG9wcGVyLnVwZGF0ZSgpOyAvLyBiZWNvbWUgYXN5bmMgaW4gcG9wcGVyIDI7IHVzZSBmb3JjZVVwZGF0ZSBpZiBzeW5jIGlzIG5lZWRlZD8gXG4gICAgICAgIH0sXG4gICAgICAgIHNldFJ0bDogZnVuY3Rpb24gc2V0UnRsKGlzUnRsKSB7XG4gICAgICAgICAgaWYgKGlzUnRsKSB7XG4gICAgICAgICAgICBwb3BwZXJDb25maWd1cmF0aW9uLnBsYWNlbWVudCA9ICdib3R0b20tZW5kJztcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGRpc3Bvc2U6IGZ1bmN0aW9uIGRpc3Bvc2UoKSB7XG4gICAgICAgICAgcG9wcGVyLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIEZsb2F0aW5nTGFiZWxQbHVnaW4ocGx1Z2luRGF0YSkge1xuICB2YXIgY29uZmlndXJhdGlvbiA9IHBsdWdpbkRhdGEuY29uZmlndXJhdGlvbixcbiAgICAgIHBpY2tzTGlzdCA9IHBsdWdpbkRhdGEucGlja3NMaXN0LFxuICAgICAgcGlja3NEb20gPSBwbHVnaW5EYXRhLnBpY2tzRG9tLFxuICAgICAgZmlsdGVyRG9tID0gcGx1Z2luRGF0YS5maWx0ZXJEb20sXG4gICAgICBzdGF0aWNEb20gPSBwbHVnaW5EYXRhLnN0YXRpY0RvbSxcbiAgICAgIHVwZGF0ZURhdGFBc3BlY3QgPSBwbHVnaW5EYXRhLnVwZGF0ZURhdGFBc3BlY3QsXG4gICAgICByZXNldEZpbHRlckxpc3RBc3BlY3QgPSBwbHVnaW5EYXRhLnJlc2V0RmlsdGVyTGlzdEFzcGVjdCxcbiAgICAgIGZsb2F0aW5nTGFiZWxBc3BlY3QgPSBwbHVnaW5EYXRhLmZsb2F0aW5nTGFiZWxBc3BlY3Q7XG4gIHZhciBjc3MgPSBjb25maWd1cmF0aW9uLmNzcyxcbiAgICAgIGdldERlZmF1bHRMYWJlbCA9IGNvbmZpZ3VyYXRpb24uZ2V0RGVmYXVsdExhYmVsO1xuICB2YXIgaW5pdGlhbEVsZW1lbnQgPSBzdGF0aWNEb20uaW5pdGlhbEVsZW1lbnQ7XG5cbiAgaWYgKGZsb2F0aW5nTGFiZWxBc3BlY3QuaXNGbG9hdGluZ0xhYmVsKCkpIHtcbiAgICB2YXIgbGlmdGVkTGFiZWwgPSBmdW5jdGlvbiBsaWZ0ZWRMYWJlbChpc0VtcHR5KSB7XG4gICAgICBsaWZ0VG9nZ2xlU3R5bGluZzEoaXNFbXB0eSk7XG4gICAgICBsaWZ0VG9nZ2xlU3R5bGluZzIoaXNFbXB0eSk7XG4gICAgfTtcblxuICAgIHZhciB1cGRhdGVMaWZ0ZWRMYWJlbCA9IGZ1bmN0aW9uIHVwZGF0ZUxpZnRlZExhYmVsKCkge1xuICAgICAgbGlmdGVkTGFiZWwoIWlzRW1wdHkoKSk7XG4gICAgfTtcblxuICAgIHZhciBsYWJlbEVsZW1lbnQgPSBnZXREZWZhdWx0TGFiZWwoaW5pdGlhbEVsZW1lbnQpO1xuICAgIHZhciBwaWNrc0VsZW1lbnQgPSBwaWNrc0RvbS5waWNrc0VsZW1lbnQ7XG4gICAgdmFyIGxpZnRUb2dnbGVTdHlsaW5nMSA9IHRvZ2dsZVN0eWxpbmcobGFiZWxFbGVtZW50LCBjc3MubGFiZWxfZmxvYXRpbmdfbGlmdGVkKTtcbiAgICB2YXIgbGlmdFRvZ2dsZVN0eWxpbmcyID0gdG9nZ2xlU3R5bGluZyhwaWNrc0VsZW1lbnQsIGNzcy5waWNrc19mbG9hdGluZ19saWZ0ZWQpO1xuXG4gICAgdmFyIGlzRW1wdHkgPSBmdW5jdGlvbiBpc0VtcHR5KCkge1xuICAgICAgcmV0dXJuIHBpY2tzTGlzdC5pc0VtcHR5KCkgJiYgZmlsdGVyRG9tLmlzRW1wdHkoKSAmJiAhcGlja3NEb20uZ2V0SXNGb2N1c0luKCk7XG4gICAgfTtcbiAgICB1cGRhdGVMaWZ0ZWRMYWJlbCgpO1xuICAgIHJlc2V0RmlsdGVyTGlzdEFzcGVjdC5mb3JjZVJlc2V0RmlsdGVyID0gY29tcG9zZVN5bmMocmVzZXRGaWx0ZXJMaXN0QXNwZWN0LmZvcmNlUmVzZXRGaWx0ZXIsIHVwZGF0ZUxpZnRlZExhYmVsKTtcbiAgICB2YXIgb3JpZ0FkZCA9IHBpY2tzTGlzdC5hZGQ7XG5cbiAgICBwaWNrc0xpc3QuYWRkID0gZnVuY3Rpb24gKHBpY2spIHtcbiAgICAgIHZhciByZXR1cm5WYWx1ZSA9IG9yaWdBZGQocGljayk7XG4gICAgICBpZiAocGlja3NMaXN0LmdldENvdW50KCkgPT0gMSkgdXBkYXRlTGlmdGVkTGFiZWwoKTtcbiAgICAgIHBpY2suZGlzcG9zZSA9IGNvbXBvc2VTeW5jKHBpY2suZGlzcG9zZSwgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAocGlja3NMaXN0LmdldENvdW50KCkgPT0gMCkgdXBkYXRlTGlmdGVkTGFiZWwoKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICAgIH07XG5cbiAgICB2YXIgb3JpZ1RvZ2dsZUZvY3VzU3R5bGluZyA9IHBpY2tzRG9tLnRvZ2dsZUZvY3VzU3R5bGluZztcblxuICAgIHBpY2tzRG9tLnRvZ2dsZUZvY3VzU3R5bGluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBpc0ZvY3VzSW4gPSBwaWNrc0RvbS5nZXRJc0ZvY3VzSW4oKTtcbiAgICAgIG9yaWdUb2dnbGVGb2N1c1N0eWxpbmcoaXNGb2N1c0luKTtcbiAgICAgIHVwZGF0ZUxpZnRlZExhYmVsKCk7XG4gICAgfTtcblxuICAgIHVwZGF0ZURhdGFBc3BlY3QudXBkYXRlRGF0YSA9IGNvbXBvc2VTeW5jKHVwZGF0ZURhdGFBc3BlY3QudXBkYXRlRGF0YSwgdXBkYXRlTGlmdGVkTGFiZWwpO1xuICB9XG59XG5cbkZsb2F0aW5nTGFiZWxQbHVnaW4ucGx1Z1N0YXRpY0RvbSA9IGZ1bmN0aW9uIChhc3BlY3RzKSB7XG4gIGFzcGVjdHMuZmxvYXRpbmdMYWJlbEFzcGVjdCA9IEZsb2F0aW5nTGFiZWxBc3BlY3QoKTtcbn07XG5cbmZ1bmN0aW9uIEZsb2F0aW5nTGFiZWxBc3BlY3QoKSB7XG4gIHJldHVybiB7XG4gICAgaXNGbG9hdGluZ0xhYmVsOiBmdW5jdGlvbiBpc0Zsb2F0aW5nTGFiZWwoKSB7fVxuICB9O1xufVxuXG4vLyBha2EgYXV0byBoZWlnaHQgYW5kIHNjcm9sbGluZ1xuZnVuY3Rpb24gQ2hvaWNlc0R5bmFtaWNTdHlsaW5nUGx1Z2luKGFzcGVjdHMpIHtcbiAgdmFyIGNvbmZpZ3VyYXRpb24gPSBhc3BlY3RzLmNvbmZpZ3VyYXRpb247XG5cbiAgaWYgKGNvbmZpZ3VyYXRpb24udXNlQ2hvaWNlc0R5bmFtaWNTdHlsaW5nKSB7XG4gICAgdmFyIGNob2ljZXNWaXNpYmlsaXR5QXNwZWN0ID0gYXNwZWN0cy5jaG9pY2VzVmlzaWJpbGl0eUFzcGVjdCxcbiAgICAgICAgc3BlY2lhbFBpY2tzRXZlbnRzQXNwZWN0ID0gYXNwZWN0cy5zcGVjaWFsUGlja3NFdmVudHNBc3BlY3Q7XG4gICAgdmFyIG9yaWdTZXRDaG9pY2VzVmlzaWJsZSA9IGNob2ljZXNWaXNpYmlsaXR5QXNwZWN0LnNldENob2ljZXNWaXNpYmxlO1xuXG4gICAgYXNwZWN0cy5jaG9pY2VzVmlzaWJpbGl0eUFzcGVjdC5zZXRDaG9pY2VzVmlzaWJsZSA9IGZ1bmN0aW9uICh2aXNpYmxlKSB7XG4gICAgICBpZiAodmlzaWJsZSkgY2hvaWNlc0R5bmFtaWNTdHlsaW5nKGFzcGVjdHMpO1xuICAgICAgb3JpZ1NldENob2ljZXNWaXNpYmxlKHZpc2libGUpO1xuICAgIH07XG5cbiAgICB2YXIgb3JpZ0JhY2tTcGFjZSA9IHNwZWNpYWxQaWNrc0V2ZW50c0FzcGVjdC5iYWNrU3BhY2U7XG5cbiAgICBzcGVjaWFsUGlja3NFdmVudHNBc3BlY3QuYmFja1NwYWNlID0gZnVuY3Rpb24gKHBpY2spIHtcbiAgICAgIG9yaWdCYWNrU3BhY2UocGljayk7XG4gICAgICBjaG9pY2VzRHluYW1pY1N0eWxpbmcoYXNwZWN0cyk7XG4gICAgfTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjaG9pY2VzRHluYW1pY1N0eWxpbmcoYXNwZWN0cykge1xuICB2YXIgY29uZmlndXJhdGlvbiA9IGFzcGVjdHMuY29uZmlndXJhdGlvbixcbiAgICAgIGVudmlyb25tZW50ID0gYXNwZWN0cy5lbnZpcm9ubWVudCxcbiAgICAgIGNob2ljZXNEb20gPSBhc3BlY3RzLmNob2ljZXNEb20sXG4gICAgICBuYXZpZ2F0ZUFzcGVjdCA9IGFzcGVjdHMubmF2aWdhdGVBc3BlY3Q7XG4gIHZhciB3aW5kb3cgPSBlbnZpcm9ubWVudC53aW5kb3c7XG4gIHZhciBjaG9pY2VzRWxlbWVudCA9IGNob2ljZXNEb20uY2hvaWNlc0VsZW1lbnQ7XG4gIHZhciBtaW5pbWFsQ2hvaWNlc0R5bmFtaWNTdHlsaW5nTWF4SGVpZ2h0ID0gY29uZmlndXJhdGlvbi5taW5pbWFsQ2hvaWNlc0R5bmFtaWNTdHlsaW5nTWF4SGVpZ2h0OyAvL2ZpbmQgaGVpZ2h0IG9mIHRoZSBicm93c2VyIHdpbmRvd1xuXG4gIHZhciBnID0gd2luZG93LmRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF0sXG4gICAgICBlID0gd2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudCxcbiAgICAgIHkgPSB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgZS5jbGllbnRIZWlnaHQgfHwgZy5jbGllbnRIZWlnaHQ7IC8vZmluZCBwb3NpdGlvbiBvZiBjaG9pY2VzRWxlbWVudCwgaWYgaXQncyBhdCB0aGUgYm90dG9tIG9mIHRoZSBwYWdlIG1ha2UgdGhlIGNob2ljZXNFbGVtZW50IHNob3J0ZXJcblxuICB2YXIgcG9zID0gY2hvaWNlc0VsZW1lbnQucGFyZW50Tm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgdmFyIG5ld195ID0geSAtIHBvcy50b3A7IC8vY2FsY3VsYXRlIG11bHRpIHNlbGVjdCBtYXgtaGVpZ2h0XG5cbiAgdmFyIG1zSGVpZ2h0ID0gTWF0aC5tYXgobWluaW1hbENob2ljZXNEeW5hbWljU3R5bGluZ01heEhlaWdodCwgTWF0aC5yb3VuZChuZXdfeSAqIDAuODUpKTsgLy8gTWljaGFsZWs6IDAuODUgaXMgZW1waXJpYyB2YWx1ZSwgd2l0aG91dCBpdCBsaXN0IHdhcyBsb25nZXIgdGhhbiBmb290ZXIgaGVpZ2h0IDsgVE9ETzogcHJvcG9zZSBiZXR0ZXIgd2F5XG4gIC8vYWRkIGNzcyBoZWlnaHQgdmFsdWVcblxuICBjaG9pY2VzRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShcIm1heC1oZWlnaHRcIiwgbXNIZWlnaHQgKyBcInB4XCIpO1xuICBjaG9pY2VzRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShcIm92ZXJmbG93LXlcIiwgXCJhdXRvXCIpO1xuXG4gIGlmICghY2hvaWNlc0RvbS5DaG9pY2VzRHluYW1pY1N0eWxpbmdQbHVnaW5fc2Nyb2xsSGFuZGxlKSB7XG4gICAgY2hvaWNlc0RvbS5DaG9pY2VzRHluYW1pY1N0eWxpbmdQbHVnaW5fc2Nyb2xsSGFuZGxlID0gdHJ1ZTtcbiAgICB2YXIgb3JpZ05hdmlnYXRlQXNwZWN0TmF2aWdhdGUgPSBuYXZpZ2F0ZUFzcGVjdC5uYXZpZ2F0ZTtcblxuICAgIG5hdmlnYXRlQXNwZWN0Lm5hdmlnYXRlID0gZnVuY3Rpb24gKGRvd24pIHtcbiAgICAgIHZhciB3cmFwID0gb3JpZ05hdmlnYXRlQXNwZWN0TmF2aWdhdGUoZG93bik7XG4gICAgICBpZiAod3JhcCAhPSBudWxsICYmIHdyYXAuY2hvaWNlICE9IG51bGwgJiYgd3JhcC5jaG9pY2UuY2hvaWNlRWxlbWVudCAhPSBudWxsKSB3cmFwLmNob2ljZS5jaG9pY2VFbGVtZW50LnNjcm9sbEludG9WaWV3KGZhbHNlKTsgLy8gYWxpZ25UbyBmYWxzZSAtICBzY3JvbGwgdG8gdGhlIHRvcCBib3R0b20gb2YgZHJvcGRvd24gZmlyc3RcbiAgICAgIC8vIFRPRE86IEJVRyBpZiBtb3VzZSBsZWZ0IG9uIHRoZSBkcm9wZG93IHNjcm9sbCB0byBib3R0b20gYW5kIG9uZSBhZnRlciBkb2Vzbid0IHdvcmsgcHJvcGVybHlcblxuICAgICAgcmV0dXJuIHdyYXA7XG4gICAgfTtcbiAgfVxufVxuXG5DaG9pY2VzRHluYW1pY1N0eWxpbmdQbHVnaW4ucGx1Z0RlZmF1bHRDb25maWcgPSBmdW5jdGlvbiAoZGVmYXVsdHMpIHtcbiAgZGVmYXVsdHMudXNlQ2hvaWNlc0R5bmFtaWNTdHlsaW5nID0gZmFsc2U7XG4gIGRlZmF1bHRzLmNob2ljZXNEeW5hbWljU3R5bGluZyA9IGNob2ljZXNEeW5hbWljU3R5bGluZztcbiAgZGVmYXVsdHMubWluaW1hbENob2ljZXNEeW5hbWljU3R5bGluZ01heEhlaWdodCA9IDIwO1xufTtcblxudmFyIGRlZk5vUmVzdWx0c1dhcm5pbmdNZXNzYWdlID0gJ05vIHJlc3VsdHMgZm91bmQnO1xuZnVuY3Rpb24gV2FybmluZ1BsdWdpbihwbHVnaW5EYXRhKSB7XG4gIHZhciBjb25maWd1cmF0aW9uID0gcGx1Z2luRGF0YS5jb25maWd1cmF0aW9uLFxuICAgICAgY2hvaWNlc0RvbSA9IHBsdWdpbkRhdGEuY2hvaWNlc0RvbSxcbiAgICAgIGNyZWF0ZUVsZW1lbnRBc3BlY3QgPSBwbHVnaW5EYXRhLmNyZWF0ZUVsZW1lbnRBc3BlY3QsXG4gICAgICBzdGF0aWNNYW5hZ2VyID0gcGx1Z2luRGF0YS5zdGF0aWNNYW5hZ2VyO1xuICB2YXIgY3NzID0gY29uZmlndXJhdGlvbi5jc3M7XG4gIGlmIChjb25maWd1cmF0aW9uLmlzTm9SZXN1bHRzV2FybmluZ0VuYWJsZWQpIHBsdWdpbkRhdGEud2FybmluZ0FzcGVjdCA9IFdhcm5pbmdBc3BlY3QoY2hvaWNlc0RvbSwgY3JlYXRlRWxlbWVudEFzcGVjdCwgc3RhdGljTWFuYWdlciwgY3NzKTtcbn1cblxuV2FybmluZ1BsdWdpbi5wbHVnRGVmYXVsdENvbmZpZyA9IGZ1bmN0aW9uIChkZWZhdWx0cykge1xuICBkZWZhdWx0cy5ub1Jlc3VsdHNXYXJuaW5nID0gZGVmTm9SZXN1bHRzV2FybmluZ01lc3NhZ2U7XG4gIGRlZmF1bHRzLmlzTm9SZXN1bHRzV2FybmluZ0VuYWJsZWQgPSBmYWxzZTtcbn07XG5cbmZ1bmN0aW9uIFdhcm5pbmdBc3BlY3QoY2hvaWNlc0RvbSwgY3JlYXRlRWxlbWVudEFzcGVjdCwgc3RhdGljTWFuYWdlciwgY3NzKSB7XG4gIHZhciBjaG9pY2VzRWxlbWVudCA9IGNob2ljZXNEb20uY2hvaWNlc0VsZW1lbnQ7XG4gIHZhciB3YXJuaW5nRWxlbWVudCA9IGNyZWF0ZUVsZW1lbnRBc3BlY3QuY3JlYXRlRWxlbWVudCgnRElWJyk7XG4gIHZhciBvcmlnQXBwZW5kVG9Db250YWluZXIgPSBzdGF0aWNNYW5hZ2VyLmFwcGVuZFRvQ29udGFpbmVyO1xuXG4gIHN0YXRpY01hbmFnZXIuYXBwZW5kVG9Db250YWluZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgb3JpZ0FwcGVuZFRvQ29udGFpbmVyKCk7XG4gICAgY2hvaWNlc0VsZW1lbnQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUod2FybmluZ0VsZW1lbnQsIGNob2ljZXNFbGVtZW50Lm5leHRTaWJsaW5nKTsgLy8gaW5zZXJ0IGFmdGVyXG4gIH07XG5cbiAgd2FybmluZ0VsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgYWRkU3R5bGluZyh3YXJuaW5nRWxlbWVudCwgY3NzLndhcm5pbmcpO1xuICByZXR1cm4ge1xuICAgIHdhcm5pbmdFbGVtZW50OiB3YXJuaW5nRWxlbWVudCxcbiAgICBzaG93OiBmdW5jdGlvbiBzaG93KG1lc3NhZ2UpIHtcbiAgICAgIHdhcm5pbmdFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgd2FybmluZ0VsZW1lbnQuaW5uZXJIVE1MID0gbWVzc2FnZTtcbiAgICB9LFxuICAgIGhpZGU6IGZ1bmN0aW9uIGhpZGUoKSB7XG4gICAgICB3YXJuaW5nRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgd2FybmluZ0VsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIEhpZ2hsaWdodFBsdWdpbihhc3BlY3RzKSB7XG4gIHZhciBoaWdobGlnaHRBc3BlY3QgPSBhc3BlY3RzLmhpZ2hsaWdodEFzcGVjdCxcbiAgICAgIGZpbHRlck1hbmFnZXJBc3BlY3QgPSBhc3BlY3RzLmZpbHRlck1hbmFnZXJBc3BlY3QsXG4gICAgICBidWlsZENob2ljZUFzcGVjdCA9IGFzcGVjdHMuYnVpbGRDaG9pY2VBc3BlY3Q7XG5cbiAgaWYgKGhpZ2hsaWdodEFzcGVjdCkge1xuICAgIHZhciBvcmlnUHJvY2Vzc0VtcHR5SW5wdXQgPSBmaWx0ZXJNYW5hZ2VyQXNwZWN0LnByb2Nlc3NFbXB0eUlucHV0O1xuXG4gICAgZmlsdGVyTWFuYWdlckFzcGVjdC5wcm9jZXNzRW1wdHlJbnB1dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGhpZ2hsaWdodEFzcGVjdC5yZXNldCgpO1xuICAgICAgb3JpZ1Byb2Nlc3NFbXB0eUlucHV0KCk7XG4gICAgfTtcblxuICAgIHZhciBvcmlnU2V0RmlsdGVyID0gZmlsdGVyTWFuYWdlckFzcGVjdC5zZXRGaWx0ZXI7XG5cbiAgICBmaWx0ZXJNYW5hZ2VyQXNwZWN0LnNldEZpbHRlciA9IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgICBoaWdobGlnaHRBc3BlY3Quc2V0KHRleHQpO1xuICAgICAgb3JpZ1NldEZpbHRlcih0ZXh0KTtcbiAgICB9O1xuXG4gICAgdmFyIG9yaWdCdWlsZENob2ljZSA9IGJ1aWxkQ2hvaWNlQXNwZWN0LmJ1aWxkQ2hvaWNlO1xuXG4gICAgYnVpbGRDaG9pY2VBc3BlY3QuYnVpbGRDaG9pY2UgPSBmdW5jdGlvbiAod3JhcCkge1xuICAgICAgb3JpZ0J1aWxkQ2hvaWNlKHdyYXApO1xuICAgICAgdmFyIG9yaWdTZXRWaXNpYmxlID0gd3JhcC5jaG9pY2Uuc2V0VmlzaWJsZTtcblxuICAgICAgd3JhcC5jaG9pY2Uuc2V0VmlzaWJsZSA9IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIG9yaWdTZXRWaXNpYmxlKHYpO1xuICAgICAgICB3cmFwLmNob2ljZS5jaG9pY2VEb21NYW5hZ2VySGFuZGxlcnMudXBkYXRlSGlnaGxpZ2h0ZWQoKTtcbiAgICAgIH07XG4gICAgfTtcbiAgfVxufVxuXG5IaWdobGlnaHRQbHVnaW4ucGx1Z1N0YXRpY0RvbSA9IGZ1bmN0aW9uIChhc3BlY3RzKSB7XG4gIGlmIChhc3BlY3RzLmNvbmZpZ3VyYXRpb24udXNlSGlnaGxpZ2h0aW5nKSBhc3BlY3RzLmhpZ2hsaWdodEFzcGVjdCA9IEhpZ2hsaWdodEFzcGVjdCgpO1xufTtcblxuSGlnaGxpZ2h0UGx1Z2luLnBsdWdEZWZhdWx0Q29uZmlnID0gZnVuY3Rpb24gKGRlZmF1bHRzKSB7XG4gIGRlZmF1bHRzLnVzZUhpZ2hsaWdodGluZyA9IGZhbHNlO1xufTtcblxuZnVuY3Rpb24gSGlnaGxpZ2h0QXNwZWN0KCkge1xuICB2YXIgaGlnaGxpZ2h0ZXIgPSBudWxsO1xuICByZXR1cm4ge1xuICAgIGdldEhpZ2hsaWdodGVyOiBmdW5jdGlvbiBnZXRIaWdobGlnaHRlcigpIHtcbiAgICAgIHJldHVybiBoaWdobGlnaHRlcjtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gc2V0KGZpbHRlcikge1xuICAgICAgdmFyIGd1YXJkZWQgPSBmaWx0ZXIucmVwbGFjZSgvWy4qKz9eJHt9KCl8W1xcXVxcXFxdL2csICdcXFxcJCYnKTtcbiAgICAgIHZhciByZWdleCA9IG5ldyBSZWdFeHAoXCIoXCIgKyBndWFyZGVkICsgXCIpXCIsIFwiZ2lcIik7XG5cbiAgICAgIGhpZ2hsaWdodGVyID0gZnVuY3Rpb24gaGlnaGxpZ2h0ZXIoZSwgY2hvaWNlRG9tLCB0ZXh0KSB7XG4gICAgICAgIC8vIFRPRE8gcmVwbGFjZSB3aXRoXG4gICAgICAgIC8vIHZhciBwb3MgPSB0ZXh0LmluZGV4T2YoZmlsdGVyKTtcbiAgICAgICAgZS5pbm5lckhUTUwgPSB0ZXh0LnJlcGxhY2UocmVnZXgsIFwiPHU+JDE8L3U+XCIpOyAvLyBUT0RPIHRvIG1ldGhvZFxuICAgICAgICAvLyB2YXIgbm9kZXMgPSBlLnF1ZXJ5U2VsZWN0b3JBbGwoJ3UnKTtcbiAgICAgICAgLy8gdmFyIGFycmF5ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobm9kZXMpO1xuICAgICAgICAvLyBpZiAoY2hvaWNlRG9tLmhpZ2hsaWdodGVkRWxlbWVudHMpXG4gICAgICAgIC8vICAgICBjaG9pY2VEb20uaGlnaGxpZ2h0ZWRFbGVtZW50cy5jb25jYXQoYXJyYXkpO1xuICAgICAgICAvLyBlbHNlXG4gICAgICAgIC8vICAgICBjaG9pY2VEb20uaGlnaGxpZ2h0ZWRFbGVtZW50cyA9IGFycmF5O1xuICAgICAgfTtcbiAgICB9LFxuICAgIHJlc2V0OiBmdW5jdGlvbiByZXNldCgpIHtcbiAgICAgIGhpZ2hsaWdodGVyID0gbnVsbDtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIEN1c3RvbUNob2ljZVN0eWxpbmdzUGx1Z2luKGFwc2VjdHMpIHtcbiAgdmFyIGNvbmZpZ3VyYXRpb24gPSBhcHNlY3RzLmNvbmZpZ3VyYXRpb24sXG4gICAgICBjaG9pY2VEb21GYWN0b3J5ID0gYXBzZWN0cy5jaG9pY2VEb21GYWN0b3J5O1xuICB2YXIgY3VzdG9tQ2hvaWNlU3R5bGluZ3NBc3BlY3QgPSBDdXN0b21DaG9pY2VTdHlsaW5nc0FzcGVjdChjb25maWd1cmF0aW9uLmN1c3RvbUNob2ljZVN0eWxpbmdzKTtcbiAgdmFyIG9yaWdDaG9pY2VEb21GYWN0b3J5Q3JlYXRlID0gY2hvaWNlRG9tRmFjdG9yeS5jcmVhdGU7XG5cbiAgY2hvaWNlRG9tRmFjdG9yeS5jcmVhdGUgPSBmdW5jdGlvbiAoY2hvaWNlRWxlbWVudCwgd3JhcCwgdG9nZ2xlKSB7XG4gICAgdmFyIG8gPSBvcmlnQ2hvaWNlRG9tRmFjdG9yeUNyZWF0ZShjaG9pY2VFbGVtZW50LCB3cmFwLCB0b2dnbGUpO1xuICAgIGN1c3RvbUNob2ljZVN0eWxpbmdzQXNwZWN0LmN1c3RvbWl6ZSh3cmFwLCBvLmNob2ljZURvbSwgby5jaG9pY2VEb21NYW5hZ2VySGFuZGxlcnMpO1xuICAgIHJldHVybiBvO1xuICB9O1xufVxuXG5DdXN0b21DaG9pY2VTdHlsaW5nc1BsdWdpbi5wbHVnRGVmYXVsdENvbmZpZyA9IGZ1bmN0aW9uIChkZWZhdWx0cykge1xuICBkZWZhdWx0cy5jdXN0b21DaG9pY2VTdHlsaW5ncyA9IG51bGw7XG59O1xuXG5mdW5jdGlvbiBDdXN0b21DaG9pY2VTdHlsaW5nc0FzcGVjdChjdXN0b21DaG9pY2VTdHlsaW5ncykge1xuICByZXR1cm4ge1xuICAgIGN1c3RvbWl6ZTogZnVuY3Rpb24gY3VzdG9taXplKHdyYXAsIGNob2ljZURvbSwgY2hvaWNlRG9tTWFuYWdlckhhbmRsZXJzKSB7XG4gICAgICBpZiAoY3VzdG9tQ2hvaWNlU3R5bGluZ3MpIHtcbiAgICAgICAgdmFyIGhhbmRsZXJzID0gY3VzdG9tQ2hvaWNlU3R5bGluZ3MoY2hvaWNlRG9tLCB3cmFwLm9wdGlvbik7XG5cbiAgICAgICAgaWYgKGhhbmRsZXJzKSB7XG4gICAgICAgICAgdmFyIGN1c3RvbUNob2ljZVN0eWxpbmdzQ2xvc3VyZSA9IGZ1bmN0aW9uIGN1c3RvbUNob2ljZVN0eWxpbmdzQ2xvc3VyZShjdXN0b20pIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIGN1c3RvbSh7XG4gICAgICAgICAgICAgICAgaXNPcHRpb25TZWxlY3RlZDogd3JhcC5pc09wdGlvblNlbGVjdGVkLFxuICAgICAgICAgICAgICAgIGlzT3B0aW9uRGlzYWJsZWQ6IHdyYXAuaXNPcHRpb25EaXNhYmxlZCxcbiAgICAgICAgICAgICAgICBpc0hvdmVySW46IHdyYXAuY2hvaWNlLmlzSG92ZXJJbiAvL2lzSGlnaGxpZ2h0ZWQ6IHdyYXAuY2hvaWNlLmlzSGlnaGxpZ2h0ZWQgIC8vIFRPRE8gaXNIaWdobGlnaHRlZCBzaG91bGQgYmUgZGV2ZWxvcGVkXG5cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICBpZiAoY2hvaWNlRG9tTWFuYWdlckhhbmRsZXJzLnVwZGF0ZUhvdmVySW4gJiYgaGFuZGxlcnMudXBkYXRlSG92ZXJJbikgY2hvaWNlRG9tTWFuYWdlckhhbmRsZXJzLnVwZGF0ZUhvdmVySW4gPSBjb21wb3NlU3luYyhjaG9pY2VEb21NYW5hZ2VySGFuZGxlcnMudXBkYXRlSG92ZXJJbiwgY3VzdG9tQ2hvaWNlU3R5bGluZ3NDbG9zdXJlKGhhbmRsZXJzLnVwZGF0ZUhvdmVySW4pKTtcbiAgICAgICAgICBpZiAoY2hvaWNlRG9tTWFuYWdlckhhbmRsZXJzLnVwZGF0ZVNlbGVjdGVkICYmIGhhbmRsZXJzLnVwZGF0ZVNlbGVjdGVkKSBjaG9pY2VEb21NYW5hZ2VySGFuZGxlcnMudXBkYXRlU2VsZWN0ZWQgPSBjb21wb3NlU3luYyhjaG9pY2VEb21NYW5hZ2VySGFuZGxlcnMudXBkYXRlU2VsZWN0ZWQsIGN1c3RvbUNob2ljZVN0eWxpbmdzQ2xvc3VyZShoYW5kbGVycy51cGRhdGVTZWxlY3RlZCkpO1xuICAgICAgICAgIGlmIChjaG9pY2VEb21NYW5hZ2VySGFuZGxlcnMudXBkYXRlRGlzYWJsZWQgJiYgaGFuZGxlcnMudXBkYXRlRGlzYWJsZWQpIGNob2ljZURvbU1hbmFnZXJIYW5kbGVycy51cGRhdGVEaXNhYmxlZCA9IGNvbXBvc2VTeW5jKGNob2ljZURvbU1hbmFnZXJIYW5kbGVycy51cGRhdGVEaXNhYmxlZCwgY3VzdG9tQ2hvaWNlU3R5bGluZ3NDbG9zdXJlKGhhbmRsZXJzLnVwZGF0ZURpc2FibGVkKSk7XG4gICAgICAgICAgaWYgKGNob2ljZURvbU1hbmFnZXJIYW5kbGVycy51cGRhdGVIaWdobGlnaHRlZCAmJiBoYW5kbGVycy51cGRhdGVIaWdobGlnaHRlZCkgY2hvaWNlRG9tTWFuYWdlckhhbmRsZXJzLnVwZGF0ZUhpZ2hsaWdodGVkID0gY29tcG9zZVN5bmMoY2hvaWNlRG9tTWFuYWdlckhhbmRsZXJzLnVwZGF0ZUhpZ2hsaWdodGVkLCBjdXN0b21DaG9pY2VTdHlsaW5nc0Nsb3N1cmUoaGFuZGxlcnMudXBkYXRlSGlnaGxpZ2h0ZWQpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gQ3VzdG9tUGlja1N0eWxpbmdzUGx1Z2luKGFzcGVjdHMpIHtcbiAgdmFyIGNvbXBvbmVudFByb3BlcnRpZXNBc3BlY3QgPSBhc3BlY3RzLmNvbXBvbmVudFByb3BlcnRpZXNBc3BlY3QsXG4gICAgICBjb25maWd1cmF0aW9uID0gYXNwZWN0cy5jb25maWd1cmF0aW9uLFxuICAgICAgcGlja0RvbUZhY3RvcnkgPSBhc3BlY3RzLnBpY2tEb21GYWN0b3J5O1xuICB2YXIgY3VzdG9tUGlja1N0eWxpbmdzQXNwZWN0ID0gQ3VzdG9tUGlja1N0eWxpbmdzQXNwZWN0KGNvbXBvbmVudFByb3BlcnRpZXNBc3BlY3QsIGNvbmZpZ3VyYXRpb24uY3VzdG9tUGlja1N0eWxpbmdzKTtcbiAgdmFyIG9yaWdQaWNrRG9tRmFjdG9yeUNyZWF0ZSA9IHBpY2tEb21GYWN0b3J5LmNyZWF0ZTtcblxuICBwaWNrRG9tRmFjdG9yeS5jcmVhdGUgPSBmdW5jdGlvbiAocGlja0VsZW1lbnQsIHdyYXAsIHJlbW92ZU9uQnV0dG9uKSB7XG4gICAgdmFyIG8gPSBvcmlnUGlja0RvbUZhY3RvcnlDcmVhdGUocGlja0VsZW1lbnQsIHdyYXAsIHJlbW92ZU9uQnV0dG9uKTtcbiAgICBjdXN0b21QaWNrU3R5bGluZ3NBc3BlY3QuY3VzdG9taXplKHdyYXAsIG8ucGlja0RvbSwgby5waWNrRG9tTWFuYWdlckhhbmRsZXJzKTtcbiAgICByZXR1cm4gbztcbiAgfTtcbn1cblxuQ3VzdG9tUGlja1N0eWxpbmdzUGx1Z2luLnBsdWdEZWZhdWx0Q29uZmlnID0gZnVuY3Rpb24gKGRlZmF1bHRzKSB7XG4gIGRlZmF1bHRzLmN1c3RvbVBpY2tTdHlsaW5ncyA9IG51bGw7XG59O1xuXG5mdW5jdGlvbiBDdXN0b21QaWNrU3R5bGluZ3NBc3BlY3QoY29tcG9uZW50UHJvcGVydGllc0FzcGVjdCwgY3VzdG9tUGlja1N0eWxpbmdzKSB7XG4gIHJldHVybiB7XG4gICAgY3VzdG9taXplOiBmdW5jdGlvbiBjdXN0b21pemUod3JhcCwgcGlja0RvbSwgcGlja0RvbU1hbmFnZXJIYW5kbGVycykge1xuICAgICAgaWYgKGN1c3RvbVBpY2tTdHlsaW5ncykge1xuICAgICAgICB2YXIgaGFuZGxlcnMgPSBjdXN0b21QaWNrU3R5bGluZ3MocGlja0RvbSwgd3JhcC5vcHRpb24pO1xuXG4gICAgICAgIGlmIChoYW5kbGVycykge1xuICAgICAgICAgIHZhciBjdXN0b21QaWNrU3R5bGluZ3NDbG9zdXJlID0gZnVuY3Rpb24gY3VzdG9tUGlja1N0eWxpbmdzQ2xvc3VyZShjdXN0b20pIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIGN1c3RvbSh7XG4gICAgICAgICAgICAgICAgaXNPcHRpb25EaXNhYmxlZDogd3JhcC5pc09wdGlvbkRpc2FibGVkLFxuICAgICAgICAgICAgICAgIGlzQ29tcG9uZW50RGlzYWJsZWQ6IGNvbXBvbmVudFByb3BlcnRpZXNBc3BlY3QuZ2V0RGlzYWJsZWQoKVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGlmIChwaWNrRG9tTWFuYWdlckhhbmRsZXJzLnVwZGF0ZURpc2FibGVkICYmIGhhbmRsZXJzLnVwZGF0ZURpc2FibGVkKSBwaWNrRG9tTWFuYWdlckhhbmRsZXJzLnVwZGF0ZURpc2FibGVkID0gY29tcG9zZVN5bmMocGlja0RvbU1hbmFnZXJIYW5kbGVycy51cGRhdGVEaXNhYmxlZCwgY3VzdG9tUGlja1N0eWxpbmdzQ2xvc3VyZShoYW5kbGVycy51cGRhdGVEaXNhYmxlZCkpO1xuICAgICAgICAgIGlmIChwaWNrRG9tTWFuYWdlckhhbmRsZXJzLnVwZGF0ZUNvbXBvbmVudERpc2FibGVkICYmIGhhbmRsZXJzLnVwZGF0ZUNvbXBvbmVudERpc2FibGVkKSBwaWNrRG9tTWFuYWdlckhhbmRsZXJzLnVwZGF0ZUNvbXBvbmVudERpc2FibGVkID0gY29tcG9zZVN5bmMocGlja0RvbU1hbmFnZXJIYW5kbGVycy51cGRhdGVDb21wb25lbnREaXNhYmxlZCwgY3VzdG9tUGlja1N0eWxpbmdzQ2xvc3VyZShoYW5kbGVycy51cGRhdGVDb21wb25lbnREaXNhYmxlZCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBVcGRhdGVBcHBlYXJhbmNlUGx1Z2luKGFzcGVjdHMpIHtcbiAgdmFyIHVwZGF0ZUFwcGVhcmFuY2VBc3BlY3QgPSBhc3BlY3RzLnVwZGF0ZUFwcGVhcmFuY2VBc3BlY3QsXG4gICAgICB1cGRhdGVBc3BlY3QgPSBhc3BlY3RzLnVwZGF0ZUFzcGVjdCxcbiAgICAgIGxvYWRBc3BlY3QgPSBhc3BlY3RzLmxvYWRBc3BlY3Q7XG4gIHVwZGF0ZUFzcGVjdC51cGRhdGUgPSBjb21wb3NlU3luYyh1cGRhdGVBc3BlY3QudXBkYXRlLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHVwZGF0ZUFwcGVhcmFuY2VBc3BlY3QudXBkYXRlQXBwZWFyYW5jZSgpO1xuICB9KTtcbiAgbG9hZEFzcGVjdC5sb2FkID0gY29tcG9zZVN5bmMobG9hZEFzcGVjdC5sb2FkLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHVwZGF0ZUFwcGVhcmFuY2VBc3BlY3QudXBkYXRlQXBwZWFyYW5jZSgpO1xuICB9KTtcbiAgcmV0dXJuIHtcbiAgICBidWlsZEFwaTogZnVuY3Rpb24gYnVpbGRBcGkoYXBpKSB7XG4gICAgICBhcGkudXBkYXRlQXBwZWFyYW5jZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHVwZGF0ZUFwcGVhcmFuY2VBc3BlY3QudXBkYXRlQXBwZWFyYW5jZSgpO1xuICAgICAgfTtcbiAgICB9XG4gIH07XG59XG5cblVwZGF0ZUFwcGVhcmFuY2VQbHVnaW4ucGx1Z1N0YXRpY0RvbSA9IGZ1bmN0aW9uIChhc3BlY3RzKSB7XG4gIGFzcGVjdHMudXBkYXRlQXBwZWFyYW5jZUFzcGVjdCA9IFVwZGF0ZUFwcGVhcmFuY2VBc3BlY3QoKTtcbn07XG5cbmZ1bmN0aW9uIFVwZGF0ZUFwcGVhcmFuY2VBc3BlY3QoKSB7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlQXBwZWFyYW5jZTogZnVuY3Rpb24gdXBkYXRlQXBwZWFyYW5jZSgpIHt9XG4gIH07XG59XG5cbmZ1bmN0aW9uIERpc2FibGVDb21wb25lbnRQbHVnaW4oYXNwZWN0cykge1xuICB2YXIgdXBkYXRlQXBwZWFyYW5jZUFzcGVjdCA9IGFzcGVjdHMudXBkYXRlQXBwZWFyYW5jZUFzcGVjdCxcbiAgICAgIHBpY2tzTGlzdCA9IGFzcGVjdHMucGlja3NMaXN0LFxuICAgICAgcGlja3NEb20gPSBhc3BlY3RzLnBpY2tzRG9tLFxuICAgICAgY29tcG9uZW50UHJvcGVydGllc0FzcGVjdCA9IGFzcGVjdHMuY29tcG9uZW50UHJvcGVydGllc0FzcGVjdDtcbiAgdmFyIGRpc2FibGVDb21wb25lbnRBc3BlY3QgPSBEaXNhYmxlQ29tcG9uZW50QXNwZWN0KHBpY2tzTGlzdCwgcGlja3NEb20pO1xuICBhc3BlY3RzLmRpc2FibGVDb21wb25lbnRBc3BlY3QgPSBkaXNhYmxlQ29tcG9uZW50QXNwZWN0O1xuICB2YXIgaXNDb21wb25lbnREaXNhYmxlZDsgLy8gc3RhdGUhIFxuXG4gIGZ1bmN0aW9uIHVwZGF0ZURpc2FibGVkKCkge1xuICAgIHZhciBuZXdJc0NvbXBvbmVudERpc2FibGVkID0gY29tcG9uZW50UHJvcGVydGllc0FzcGVjdC5nZXREaXNhYmxlZCgpO1xuXG4gICAgaWYgKGlzQ29tcG9uZW50RGlzYWJsZWQgIT09IG5ld0lzQ29tcG9uZW50RGlzYWJsZWQpIHtcbiAgICAgIGlzQ29tcG9uZW50RGlzYWJsZWQgPSBuZXdJc0NvbXBvbmVudERpc2FibGVkO1xuICAgICAgZGlzYWJsZUNvbXBvbmVudEFzcGVjdC5kaXNhYmxlQ29tcG9uZW50KG5ld0lzQ29tcG9uZW50RGlzYWJsZWQpO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZUFwcGVhcmFuY2VBc3BlY3QudXBkYXRlQXBwZWFyYW5jZSA9IGNvbXBvc2VTeW5jKHVwZGF0ZUFwcGVhcmFuY2VBc3BlY3QudXBkYXRlQXBwZWFyYW5jZSwgdXBkYXRlRGlzYWJsZWQpO1xuICByZXR1cm4ge1xuICAgIGJ1aWxkQXBpOiBmdW5jdGlvbiBidWlsZEFwaShhcGkpIHtcbiAgICAgIGFwaS51cGRhdGVEaXNhYmxlZCA9IHVwZGF0ZURpc2FibGVkO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gRGlzYWJsZUNvbXBvbmVudEFzcGVjdChwaWNrc0xpc3QsIHBpY2tzRG9tKSB7XG4gIHJldHVybiB7XG4gICAgZGlzYWJsZUNvbXBvbmVudDogZnVuY3Rpb24gZGlzYWJsZUNvbXBvbmVudChpc0NvbXBvbmVudERpc2FibGVkKSB7XG4gICAgICBwaWNrc0xpc3QuZm9yRWFjaChmdW5jdGlvbiAocGljaykge1xuICAgICAgICByZXR1cm4gcGljay5waWNrRG9tTWFuYWdlckhhbmRsZXJzLnVwZGF0ZUNvbXBvbmVudERpc2FibGVkKCk7XG4gICAgICB9KTtcbiAgICAgIHBpY2tzRG9tLmRpc2FibGUoaXNDb21wb25lbnREaXNhYmxlZCk7XG4gICAgfVxuICB9O1xufVxuXG52YXIgZGVmYXVsdFBsdWdpbnMgPSB7XG4gIENzc1BhdGNoUGx1Z2luOiBDc3NQYXRjaFBsdWdpbixcbiAgU2VsZWN0RWxlbWVudFBsdWdpbjogU2VsZWN0RWxlbWVudFBsdWdpbixcbiAgTGFiZWxGb3JBdHRyaWJ1dGVQbHVnaW46IExhYmVsRm9yQXR0cmlidXRlUGx1Z2luLFxuICBIaWRkZW5PcHRpb25QbHVnaW46IEhpZGRlbk9wdGlvblBsdWdpbixcbiAgVmFsaWRhdGlvbkFwaVBsdWdpbjogVmFsaWRhdGlvbkFwaVBsdWdpbixcbiAgVXBkYXRlQXBwZWFyYW5jZVBsdWdpbjogVXBkYXRlQXBwZWFyYW5jZVBsdWdpbixcbiAgQnNBcHBlYXJhbmNlUGx1Z2luOiBCc0FwcGVhcmFuY2VQbHVnaW4sXG4gIERpc2FibGVDb21wb25lbnRQbHVnaW46IERpc2FibGVDb21wb25lbnRQbHVnaW4sXG4gIEZvcm1SZXNldFBsdWdpbjogRm9ybVJlc2V0UGx1Z2luLFxuICBDcmVhdGVQb3BwZXJQbHVnaW46IENyZWF0ZVBvcHBlclBsdWdpbixcbiAgV2FybmluZ1BsdWdpbjogV2FybmluZ1BsdWdpbixcbiAgUnRsUGx1Z2luOiBSdGxQbHVnaW4sXG4gIFBsYWNlaG9sZGVyUGx1Z2luOiBQbGFjZWhvbGRlclBsdWdpbixcbiAgRmxvYXRpbmdMYWJlbFBsdWdpbjogRmxvYXRpbmdMYWJlbFBsdWdpbixcbiAgT3B0aW9uc0FwaVBsdWdpbjogT3B0aW9uc0FwaVBsdWdpbixcbiAgSlF1ZXJ5TWV0aG9kc1BsdWdpbjogSlF1ZXJ5TWV0aG9kc1BsdWdpbixcbiAgU2VsZWN0ZWRPcHRpb25QbHVnaW46IFNlbGVjdGVkT3B0aW9uUGx1Z2luLFxuICBGb3JtUmVzdG9yZU9uQmFja3dhcmRQbHVnaW46IEZvcm1SZXN0b3JlT25CYWNrd2FyZFBsdWdpbixcbiAgRGlzYWJsZWRPcHRpb25QbHVnaW46IERpc2FibGVkT3B0aW9uUGx1Z2luLFxuICBQaWNrc0FwaVBsdWdpbjogUGlja3NBcGlQbHVnaW4sXG4gIEhpZ2hsaWdodFBsdWdpbjogSGlnaGxpZ2h0UGx1Z2luLFxuICBDaG9pY2VzRHluYW1pY1N0eWxpbmdQbHVnaW46IENob2ljZXNEeW5hbWljU3R5bGluZ1BsdWdpbixcbiAgQ3VzdG9tUGlja1N0eWxpbmdzUGx1Z2luOiBDdXN0b21QaWNrU3R5bGluZ3NQbHVnaW4sXG4gIEN1c3RvbUNob2ljZVN0eWxpbmdzUGx1Z2luOiBDdXN0b21DaG9pY2VTdHlsaW5nc1BsdWdpblxufTtcbnZhciBwaWNrc1BsdWdpbnMgPSB7XG4gIENzc1BhdGNoUGx1Z2luOiBDc3NQYXRjaFBsdWdpbixcbiAgUGlja3NQbHVnaW46IFBpY2tzUGx1Z2luLFxuICBMYWJlbEZvckF0dHJpYnV0ZVBsdWdpbjogTGFiZWxGb3JBdHRyaWJ1dGVQbHVnaW4sXG4gIFZhbGlkYXRpb25BcGlQbHVnaW46IFZhbGlkYXRpb25BcGlQbHVnaW4sXG4gIFVwZGF0ZUFwcGVhcmFuY2VQbHVnaW46IFVwZGF0ZUFwcGVhcmFuY2VQbHVnaW4sXG4gIEJzQXBwZWFyYW5jZVBsdWdpbjogQnNBcHBlYXJhbmNlUGx1Z2luLFxuICBEaXNhYmxlQ29tcG9uZW50UGx1Z2luOiBEaXNhYmxlQ29tcG9uZW50UGx1Z2luLFxuICBDcmVhdGVQb3BwZXJQbHVnaW46IENyZWF0ZVBvcHBlclBsdWdpbixcbiAgV2FybmluZ1BsdWdpbjogV2FybmluZ1BsdWdpbixcbiAgUnRsUGx1Z2luOiBSdGxQbHVnaW4sXG4gIFBsYWNlaG9sZGVyUGx1Z2luOiBQbGFjZWhvbGRlclBsdWdpbixcbiAgRmxvYXRpbmdMYWJlbFBsdWdpbjogRmxvYXRpbmdMYWJlbFBsdWdpbixcbiAgT3B0aW9uc0FwaVBsdWdpbjogT3B0aW9uc0FwaVBsdWdpbixcbiAgSlF1ZXJ5TWV0aG9kc1BsdWdpbjogSlF1ZXJ5TWV0aG9kc1BsdWdpbixcbiAgUGlja3NBcGlQbHVnaW46IFBpY2tzQXBpUGx1Z2luLFxuICBIaWdobGlnaHRQbHVnaW46IEhpZ2hsaWdodFBsdWdpbixcbiAgQ2hvaWNlc0R5bmFtaWNTdHlsaW5nUGx1Z2luOiBDaG9pY2VzRHluYW1pY1N0eWxpbmdQbHVnaW4sXG4gIEN1c3RvbVBpY2tTdHlsaW5nc1BsdWdpbjogQ3VzdG9tUGlja1N0eWxpbmdzUGx1Z2luLFxuICBDdXN0b21DaG9pY2VTdHlsaW5nc1BsdWdpbjogQ3VzdG9tQ2hvaWNlU3R5bGluZ3NQbHVnaW5cbn07XG52YXIgYWxsUGx1Z2lucyA9IHNoYWxsb3dDbGVhckNsb25lKGRlZmF1bHRQbHVnaW5zLCB7XG4gIFBpY2tzUGx1Z2luOiBQaWNrc1BsdWdpblxufSk7IC8vIHZhciBkZWZhdWx0Q29uZmlnID0ge1xuLy8gICAgIHBsdWdpbnM6IGRlZmF1bHRQbHVnaW5zXG4vLyB9XG4vLyB2YXIgcGlja3NDb25maWcgPSB7XG4vLyAgICAgcGx1Z2luczogcGlja3NQbHVnaW5zXG4vLyB9XG4vLyBleHBvcnQgZnVuY3Rpb24gY3JlYXRlQ29uZmlnKGFyZyl7XG4vLyAgICAgcmV0dXJuIGNvbmZpZztcbi8vIH1cblxudmFyIHV0aWxpdGllcyA9IHtcbiAgY29tcG9zZVN5bmM6IGNvbXBvc2VTeW5jLFxuICBFdmVudEJpbmRlcjogRXZlbnRCaW5kZXIsXG4gIGFkZFN0eWxpbmc6IGFkZFN0eWxpbmcsXG4gIHRvZ2dsZVN0eWxpbmc6IHRvZ2dsZVN0eWxpbmdcbn07XG5cbmZ1bmN0aW9uIFBsdWdpbk1hbmFnZXIocGx1Z2lucywgcGx1Z2luRGF0YSkge1xuICB2YXIgaW5zdGFuY2VzID0gW107XG5cbiAgaWYgKHBsdWdpbnMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBsdWdpbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpbnN0YW5jZSA9IHBsdWdpbnNbaV0ocGx1Z2luRGF0YSk7XG4gICAgICBpZiAoaW5zdGFuY2UpIGluc3RhbmNlcy5wdXNoKGluc3RhbmNlKTtcbiAgICB9XG4gIH1cblxuICB2YXIgZGlzcG9zZXMgPSBbXTtcbiAgcmV0dXJuIHtcbiAgICBidWlsZEFwaTogZnVuY3Rpb24gYnVpbGRBcGkoYXBpKSB7XG4gICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgaW5zdGFuY2VzLmxlbmd0aDsgX2krKykge1xuICAgICAgICB2YXIgX2luc3RhbmNlcyRfaSRidWlsZEFwLCBfaW5zdGFuY2VzJF9pO1xuXG4gICAgICAgIHZhciBkaXNwb3NlID0gKF9pbnN0YW5jZXMkX2kkYnVpbGRBcCA9IChfaW5zdGFuY2VzJF9pID0gaW5zdGFuY2VzW19pXSkuYnVpbGRBcGkpID09IG51bGwgPyB2b2lkIDAgOiBfaW5zdGFuY2VzJF9pJGJ1aWxkQXAuY2FsbChfaW5zdGFuY2VzJF9pLCBhcGkpO1xuICAgICAgICBpZiAoZGlzcG9zZSkgZGlzcG9zZXMucHVzaChkaXNwb3NlKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGRpc3Bvc2U6IGZ1bmN0aW9uIGRpc3Bvc2UoKSB7XG4gICAgICBmb3IgKHZhciBfaTIgPSAwOyBfaTIgPCBkaXNwb3Nlcy5sZW5ndGg7IF9pMisrKSB7XG4gICAgICAgIGRpc3Bvc2VzW19pMl0oKTtcbiAgICAgIH1cblxuICAgICAgZGlzcG9zZXMgPSBudWxsO1xuXG4gICAgICBmb3IgKHZhciBfaTMgPSAwOyBfaTMgPCBpbnN0YW5jZXMubGVuZ3RoOyBfaTMrKykge1xuICAgICAgICB2YXIgX2luc3RhbmNlcyRfaTMkZGlzcG9zLCBfaW5zdGFuY2VzJF9pMjtcblxuICAgICAgICAoX2luc3RhbmNlcyRfaTMkZGlzcG9zID0gKF9pbnN0YW5jZXMkX2kyID0gaW5zdGFuY2VzW19pM10pLmRpc3Bvc2UpID09IG51bGwgPyB2b2lkIDAgOiBfaW5zdGFuY2VzJF9pMyRkaXNwb3MuY2FsbChfaW5zdGFuY2VzJF9pMik7XG4gICAgICB9XG5cbiAgICAgIGluc3RhbmNlcyA9IG51bGw7XG4gICAgfVxuICB9O1xufVxuZnVuY3Rpb24gcGx1Z0RlZmF1bHRDb25maWcoY29uc3RydWN0b3JzLCBkZWZhdWx0cykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbnN0cnVjdG9ycy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBfY29uc3RydWN0b3JzJGkkcGx1Z0QsIF9jb25zdHJ1Y3RvcnMkaTtcblxuICAgIChfY29uc3RydWN0b3JzJGkkcGx1Z0QgPSAoX2NvbnN0cnVjdG9ycyRpID0gY29uc3RydWN0b3JzW2ldKS5wbHVnRGVmYXVsdENvbmZpZykgPT0gbnVsbCA/IHZvaWQgMCA6IF9jb25zdHJ1Y3RvcnMkaSRwbHVnRC5jYWxsKF9jb25zdHJ1Y3RvcnMkaSwgZGVmYXVsdHMpO1xuICB9XG59XG5mdW5jdGlvbiBwbHVnTWVyZ2VTZXR0aW5ncyhjb25zdHJ1Y3RvcnMsIGNvbmZpZ3VyYXRpb24sIGRlZmF1bHRzLCBzZXR0aW5ncykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbnN0cnVjdG9ycy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBfY29uc3RydWN0b3JzJGkkcGx1Z00sIF9jb25zdHJ1Y3RvcnMkaTI7XG5cbiAgICAoX2NvbnN0cnVjdG9ycyRpJHBsdWdNID0gKF9jb25zdHJ1Y3RvcnMkaTIgPSBjb25zdHJ1Y3RvcnNbaV0pLnBsdWdNZXJnZVNldHRpbmdzKSA9PSBudWxsID8gdm9pZCAwIDogX2NvbnN0cnVjdG9ycyRpJHBsdWdNLmNhbGwoX2NvbnN0cnVjdG9ycyRpMiwgY29uZmlndXJhdGlvbiwgZGVmYXVsdHMsIHNldHRpbmdzKTtcbiAgfVxufVxuZnVuY3Rpb24gcGx1Z1N0YXRpY0RvbShjb25zdHJ1Y3RvcnMsIGFzcGVjdHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb25zdHJ1Y3RvcnMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgX2NvbnN0cnVjdG9ycyRpJHBsdWdTLCBfY29uc3RydWN0b3JzJGkzO1xuXG4gICAgKF9jb25zdHJ1Y3RvcnMkaSRwbHVnUyA9IChfY29uc3RydWN0b3JzJGkzID0gY29uc3RydWN0b3JzW2ldKS5wbHVnU3RhdGljRG9tKSA9PSBudWxsID8gdm9pZCAwIDogX2NvbnN0cnVjdG9ycyRpJHBsdWdTLmNhbGwoX2NvbnN0cnVjdG9ycyRpMywgYXNwZWN0cyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gUGlja0RvbUZhY3RvcnkoY3NzLCBjb21wb25lbnRQcm9wZXJ0aWVzQXNwZWN0LCBvcHRpb25Qcm9wZXJ0aWVzQXNwZWN0LCBwaWNrQnV0dG9uQXNwZWN0KSB7XG4gIHJldHVybiB7XG4gICAgY3JlYXRlOiBmdW5jdGlvbiBjcmVhdGUocGlja0VsZW1lbnQsIHdyYXAsIHJlbW92ZSkge1xuICAgICAgdmFyIGV2ZW50QmluZGVyID0gRXZlbnRCaW5kZXIoKTtcbiAgICAgIHZhciBidXR0b25IVE1MID0gcGlja0J1dHRvbkFzcGVjdC5nZXRCdXR0b25IVE1MKCk7XG4gICAgICBwaWNrRWxlbWVudC5pbm5lckhUTUwgPSAnPHNwYW4+PC9zcGFuPicgKyBidXR0b25IVE1MO1xuICAgICAgdmFyIHBpY2tDb250ZW50RWxlbWVudCA9IHBpY2tFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ1NQQU4nKTtcbiAgICAgIHZhciBwaWNrQnV0dG9uRWxlbWVudCA9IHBpY2tFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ0JVVFRPTicpO1xuICAgICAgZXZlbnRCaW5kZXIuYmluZChwaWNrQnV0dG9uRWxlbWVudCwgXCJjbGlja1wiLCByZW1vdmUpO1xuICAgICAgYWRkU3R5bGluZyhwaWNrQ29udGVudEVsZW1lbnQsIGNzcy5waWNrQ29udGVudCk7XG4gICAgICBhZGRTdHlsaW5nKHBpY2tCdXR0b25FbGVtZW50LCBjc3MucGlja0J1dHRvbik7XG4gICAgICB2YXIgZGlzYWJsZVRvZ2dsZSA9IHRvZ2dsZVN0eWxpbmcocGlja0NvbnRlbnRFbGVtZW50LCBjc3MucGlja0NvbnRlbnRfZGlzYWJsZWQpO1xuXG4gICAgICBmdW5jdGlvbiB1cGRhdGVEYXRhKCkge1xuICAgICAgICBwaWNrQ29udGVudEVsZW1lbnQudGV4dENvbnRlbnQgPSBvcHRpb25Qcm9wZXJ0aWVzQXNwZWN0LmdldFRleHQod3JhcC5vcHRpb24pO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiB1cGRhdGVEaXNhYmxlZCgpIHtcbiAgICAgICAgZGlzYWJsZVRvZ2dsZSh3cmFwLmlzT3B0aW9uRGlzYWJsZWQpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiB1cGRhdGVDb21wb25lbnREaXNhYmxlZCgpIHtcbiAgICAgICAgcGlja0J1dHRvbkVsZW1lbnQuZGlzYWJsZWQgPSBjb21wb25lbnRQcm9wZXJ0aWVzQXNwZWN0LmdldERpc2FibGVkKCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBpY2tEb206IHtcbiAgICAgICAgICBwaWNrQ29udGVudEVsZW1lbnQ6IHBpY2tDb250ZW50RWxlbWVudCxcbiAgICAgICAgICBwaWNrQnV0dG9uRWxlbWVudDogcGlja0J1dHRvbkVsZW1lbnRcbiAgICAgICAgfSxcbiAgICAgICAgcGlja0RvbU1hbmFnZXJIYW5kbGVyczoge1xuICAgICAgICAgIHVwZGF0ZURhdGE6IHVwZGF0ZURhdGEsXG4gICAgICAgICAgdXBkYXRlRGlzYWJsZWQ6IHVwZGF0ZURpc2FibGVkLFxuICAgICAgICAgIHVwZGF0ZUNvbXBvbmVudERpc2FibGVkOiB1cGRhdGVDb21wb25lbnREaXNhYmxlZFxuICAgICAgICB9LFxuICAgICAgICBkaXNwb3NlOiBmdW5jdGlvbiBkaXNwb3NlKCkge1xuICAgICAgICAgIGV2ZW50QmluZGVyLnVuYmluZCgpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gQ2hvaWNlRG9tRmFjdG9yeShjc3MsIG9wdGlvblByb3BlcnRpZXNBc3BlY3QsIGhpZ2hsaWdodEFzcGVjdCkge1xuICB2YXIgdXBkYXRlSGlnaGxpZ2h0ZWRJbnRlcm5hbCA9IGZ1bmN0aW9uIHVwZGF0ZUhpZ2hsaWdodGVkSW50ZXJuYWwod3JhcCwgY2hvaWNlRG9tLCBlbGVtZW50KSB7XG4gICAgdmFyIHRleHQgPSBvcHRpb25Qcm9wZXJ0aWVzQXNwZWN0LmdldFRleHQod3JhcC5vcHRpb24pO1xuICAgIHZhciBoaWdobGlnaHRlciA9IGhpZ2hsaWdodEFzcGVjdC5nZXRIaWdobGlnaHRlcigpO1xuICAgIGlmIChoaWdobGlnaHRlcikgaGlnaGxpZ2h0ZXIoZWxlbWVudCwgY2hvaWNlRG9tLCB0ZXh0KTtlbHNlIGVsZW1lbnQudGV4dENvbnRlbnQgPSB0ZXh0O1xuICB9O1xuXG4gIHZhciB1cGRhdGVEYXRhSW50ZXJuYWwgPSBmdW5jdGlvbiB1cGRhdGVEYXRhSW50ZXJuYWwod3JhcCwgZWxlbWVudCkge1xuICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSBvcHRpb25Qcm9wZXJ0aWVzQXNwZWN0LmdldFRleHQod3JhcC5vcHRpb24pO1xuICB9OyAvL1RPRE8gbW92ZSBjaGVjayB3aGljaCBhc3BlY3RzIGF2YWlsYmFsZSBsaWtlIHdyYXAuaGFzT3duUHJvcGVydHkoXCJpc09wdGlvblNlbGVjdGVkXCIpIHRvIHRoZXJlXG5cblxuICByZXR1cm4ge1xuICAgIGNyZWF0ZTogZnVuY3Rpb24gY3JlYXRlKGNob2ljZUVsZW1lbnQsIHdyYXAsIHRvZ2dsZSkge1xuICAgICAgdmFyIGNob2ljZURvbSA9IG51bGw7XG4gICAgICB2YXIgY2hvaWNlRG9tTWFuYWdlckhhbmRsZXJzID0gbnVsbDtcbiAgICAgIHZhciBldmVudEJpbmRlciA9IEV2ZW50QmluZGVyKCk7XG4gICAgICBldmVudEJpbmRlci5iaW5kKGNob2ljZUVsZW1lbnQsIFwiY2xpY2tcIiwgdG9nZ2xlKTtcblxuICAgICAgaWYgKHdyYXAuaGFzT3duUHJvcGVydHkoXCJpc09wdGlvblNlbGVjdGVkXCIpKSB7XG4gICAgICAgIGNob2ljZUVsZW1lbnQuaW5uZXJIVE1MID0gJzxkaXY+PGlucHV0IGZvcm1ub3ZhbGlkYXRlIHR5cGU9XCJjaGVja2JveFwiPjxsYWJlbD48L2xhYmVsPjwvZGl2Pic7XG4gICAgICAgIHZhciBjaG9pY2VDb250ZW50RWxlbWVudCA9IGNob2ljZUVsZW1lbnQucXVlcnlTZWxlY3RvcignRElWJyk7XG4gICAgICAgIHZhciBjaG9pY2VDaGVja0JveEVsZW1lbnQgPSBjaG9pY2VDb250ZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCdJTlBVVCcpO1xuICAgICAgICB2YXIgY2hvaWNlTGFiZWxFbGVtZW50ID0gY2hvaWNlQ29udGVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignTEFCRUwnKTtcbiAgICAgICAgYWRkU3R5bGluZyhjaG9pY2VDb250ZW50RWxlbWVudCwgY3NzLmNob2ljZUNvbnRlbnQpO1xuICAgICAgICBhZGRTdHlsaW5nKGNob2ljZUNoZWNrQm94RWxlbWVudCwgY3NzLmNob2ljZUNoZWNrQm94KTtcbiAgICAgICAgYWRkU3R5bGluZyhjaG9pY2VMYWJlbEVsZW1lbnQsIGNzcy5jaG9pY2VMYWJlbCk7XG4gICAgICAgIGNob2ljZURvbSA9IHtcbiAgICAgICAgICBjaG9pY2VFbGVtZW50OiBjaG9pY2VFbGVtZW50LFxuICAgICAgICAgIGNob2ljZUNvbnRlbnRFbGVtZW50OiBjaG9pY2VDb250ZW50RWxlbWVudCxcbiAgICAgICAgICBjaG9pY2VDaGVja0JveEVsZW1lbnQ6IGNob2ljZUNoZWNrQm94RWxlbWVudCxcbiAgICAgICAgICBjaG9pY2VMYWJlbEVsZW1lbnQ6IGNob2ljZUxhYmVsRWxlbWVudFxuICAgICAgICB9O1xuICAgICAgICB2YXIgY2hvaWNlU2VsZWN0ZWRUb2dnbGUgPSB0b2dnbGVTdHlsaW5nKGNob2ljZUVsZW1lbnQsIGNzcy5jaG9pY2Vfc2VsZWN0ZWQpO1xuXG4gICAgICAgIHZhciB1cGRhdGVTZWxlY3RlZCA9IGZ1bmN0aW9uIHVwZGF0ZVNlbGVjdGVkKCkge1xuICAgICAgICAgIGNob2ljZVNlbGVjdGVkVG9nZ2xlKHdyYXAuaXNPcHRpb25TZWxlY3RlZCk7XG4gICAgICAgICAgY2hvaWNlQ2hlY2tCb3hFbGVtZW50LmNoZWNrZWQgPSB3cmFwLmlzT3B0aW9uU2VsZWN0ZWQ7XG5cbiAgICAgICAgICBpZiAod3JhcC5pc09wdGlvbkRpc2FibGVkIHx8IHdyYXAuY2hvaWNlLmlzSG92ZXJJbikge1xuICAgICAgICAgICAgY2hvaWNlSG92ZXJUb2dnbGUod3JhcC5jaG9pY2UuaXNIb3ZlckluLCB0cnVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGNob2ljZURpc2FibGVkVG9nZ2xlID0gdG9nZ2xlU3R5bGluZyhjaG9pY2VFbGVtZW50LCBjc3MuY2hvaWNlX2Rpc2FibGVkKTtcbiAgICAgICAgdmFyIGNob2ljZUNoZWNrQm94RGlzYWJsZWRUb2dnbGUgPSB0b2dnbGVTdHlsaW5nKGNob2ljZUNoZWNrQm94RWxlbWVudCwgY3NzLmNob2ljZUNoZWNrQm94X2Rpc2FibGVkKTtcbiAgICAgICAgdmFyIGNob2ljZUxhYmVsRGlzYWJsZWRUb2dnbGUgPSB0b2dnbGVTdHlsaW5nKGNob2ljZUxhYmVsRWxlbWVudCwgY3NzLmNob2ljZUxhYmVsX2Rpc2FibGVkKTtcbiAgICAgICAgdmFyIGNob2ljZUN1cnNvckRpc2FibGVkVG9nZ2xlID0gdG9nZ2xlU3R5bGluZyhjaG9pY2VFbGVtZW50LCB7XG4gICAgICAgICAgY2xhc3NlczogW10sXG4gICAgICAgICAgc3R5bGVzOiB7XG4gICAgICAgICAgICBjdXJzb3I6IFwiZGVmYXVsdFwiXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgdXBkYXRlRGlzYWJsZWQgPSBmdW5jdGlvbiB1cGRhdGVEaXNhYmxlZCgpIHtcbiAgICAgICAgICBjaG9pY2VEaXNhYmxlZFRvZ2dsZSh3cmFwLmlzT3B0aW9uRGlzYWJsZWQpO1xuICAgICAgICAgIGNob2ljZUNoZWNrQm94RGlzYWJsZWRUb2dnbGUod3JhcC5pc09wdGlvbkRpc2FibGVkKTtcbiAgICAgICAgICBjaG9pY2VMYWJlbERpc2FibGVkVG9nZ2xlKHdyYXAuaXNPcHRpb25EaXNhYmxlZCk7IC8vIGRvIG5vdCBkZXNhYmxlIGNoZWNrQm94IGlmIG9wdGlvbiBpcyBzZWxlY3RlZCEgdGhlcmUgc2hvdWxkIGJlIHBvc3NpYmlsaXR5IHRvIHVuc2VsZWN0IFwiZGlzYWJsZWRcIlxuXG4gICAgICAgICAgdmFyIGlzQ2hlY2tCb3hEaXNhYmxlZCA9IHdyYXAuaXNPcHRpb25EaXNhYmxlZCAmJiAhd3JhcC5pc09wdGlvblNlbGVjdGVkO1xuICAgICAgICAgIGNob2ljZUNoZWNrQm94RWxlbWVudC5kaXNhYmxlZCA9IGlzQ2hlY2tCb3hEaXNhYmxlZDtcbiAgICAgICAgICBjaG9pY2VDdXJzb3JEaXNhYmxlZFRvZ2dsZShpc0NoZWNrQm94RGlzYWJsZWQpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBjaG9pY2VIb3ZlclRvZ2dsZSA9IHRvZ2dsZVN0eWxpbmcoY2hvaWNlRWxlbWVudCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmIChjc3MuY2hvaWNlX2Rpc2FibGVkX2hvdmVyICYmIHdyYXAuaXNPcHRpb25EaXNhYmxlZCA9PT0gdHJ1ZSAmJiB3cmFwLmlzT3B0aW9uU2VsZWN0ZWQgPT09IGZhbHNlKSByZXR1cm4gY3NzLmNob2ljZV9kaXNhYmxlZF9ob3ZlcjtlbHNlIHJldHVybiBjc3MuY2hvaWNlX2hvdmVyO1xuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgdXBkYXRlSG92ZXJJbiA9IGZ1bmN0aW9uIHVwZGF0ZUhvdmVySW4oKSB7XG4gICAgICAgICAgY2hvaWNlSG92ZXJUb2dnbGUod3JhcC5jaG9pY2UuaXNIb3ZlckluKTtcbiAgICAgICAgfTtcblxuICAgICAgICBjaG9pY2VEb21NYW5hZ2VySGFuZGxlcnMgPSB7XG4gICAgICAgICAgdXBkYXRlRGF0YTogZnVuY3Rpb24gdXBkYXRlRGF0YSgpIHtcbiAgICAgICAgICAgIHJldHVybiB1cGRhdGVEYXRhSW50ZXJuYWwod3JhcCwgY2hvaWNlTGFiZWxFbGVtZW50KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHVwZGF0ZUhpZ2hsaWdodGVkOiBmdW5jdGlvbiB1cGRhdGVIaWdobGlnaHRlZCgpIHtcbiAgICAgICAgICAgIHJldHVybiB1cGRhdGVIaWdobGlnaHRlZEludGVybmFsKHdyYXAsIGNob2ljZURvbSwgY2hvaWNlTGFiZWxFbGVtZW50KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHVwZGF0ZUhvdmVySW46IHVwZGF0ZUhvdmVySW4sXG4gICAgICAgICAgdXBkYXRlRGlzYWJsZWQ6IHVwZGF0ZURpc2FibGVkLFxuICAgICAgICAgIHVwZGF0ZVNlbGVjdGVkOiB1cGRhdGVTZWxlY3RlZFxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIF9jaG9pY2VIb3ZlclRvZ2dsZSA9IHRvZ2dsZVN0eWxpbmcoY2hvaWNlRWxlbWVudCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiB3cmFwLmlzT3B0aW9uRGlzYWJsZWQgJiYgY3NzLmNob2ljZV9kaXNhYmxlZF9ob3ZlciA/IGNzcy5jaG9pY2VfZGlzYWJsZWRfaG92ZXIgOiBjc3MuY2hvaWNlX2hvdmVyO1xuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgX3VwZGF0ZUhvdmVySW4gPSBmdW5jdGlvbiBfdXBkYXRlSG92ZXJJbigpIHtcbiAgICAgICAgICBfY2hvaWNlSG92ZXJUb2dnbGUod3JhcC5jaG9pY2UuaXNIb3ZlckluKTtcbiAgICAgICAgfTtcblxuICAgICAgICBjaG9pY2VFbGVtZW50LmlubmVySFRNTCA9ICc8c3Bhbj48L3NwYW4+JztcblxuICAgICAgICB2YXIgX2Nob2ljZUNvbnRlbnRFbGVtZW50ID0gY2hvaWNlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdTUEFOJyk7XG5cbiAgICAgICAgY2hvaWNlRG9tID0ge1xuICAgICAgICAgIGNob2ljZUVsZW1lbnQ6IGNob2ljZUVsZW1lbnQsXG4gICAgICAgICAgY2hvaWNlQ29udGVudEVsZW1lbnQ6IF9jaG9pY2VDb250ZW50RWxlbWVudFxuICAgICAgICB9O1xuICAgICAgICBjaG9pY2VEb21NYW5hZ2VySGFuZGxlcnMgPSB7XG4gICAgICAgICAgdXBkYXRlRGF0YTogZnVuY3Rpb24gdXBkYXRlRGF0YSgpIHtcbiAgICAgICAgICAgIHJldHVybiB1cGRhdGVEYXRhSW50ZXJuYWwod3JhcCwgX2Nob2ljZUNvbnRlbnRFbGVtZW50KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHVwZGF0ZUhpZ2hsaWdodGVkOiBmdW5jdGlvbiB1cGRhdGVIaWdobGlnaHRlZCgpIHtcbiAgICAgICAgICAgIHJldHVybiB1cGRhdGVIaWdobGlnaHRlZEludGVybmFsKHdyYXAsIGNob2ljZURvbSwgY2hvaWNlRWxlbWVudCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICB1cGRhdGVIb3ZlckluOiBfdXBkYXRlSG92ZXJJblxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBjaG9pY2VEb206IGNob2ljZURvbSxcbiAgICAgICAgY2hvaWNlRG9tTWFuYWdlckhhbmRsZXJzOiBjaG9pY2VEb21NYW5hZ2VySGFuZGxlcnMsXG4gICAgICAgIGRpc3Bvc2U6IGZ1bmN0aW9uIGRpc3Bvc2UoKSB7XG4gICAgICAgICAgZXZlbnRCaW5kZXIudW5iaW5kKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBDcmVhdGVFbGVtZW50QXNwZWN0KGNyZWF0ZUVsZW1lbnQpIHtcbiAgcmV0dXJuIHtcbiAgICBjcmVhdGVFbGVtZW50OiBjcmVhdGVFbGVtZW50XG4gIH07XG59XG5mdW5jdGlvbiBTdGF0aWNEb21GYWN0b3J5KGNob2ljZXNEb21GYWN0b3J5LCBjcmVhdGVFbGVtZW50QXNwZWN0KSB7XG4gIHJldHVybiB7XG4gICAgY3JlYXRlOiBmdW5jdGlvbiBjcmVhdGUoY3NzKSB7XG4gICAgICB2YXIgY2hvaWNlc0RvbSA9IGNob2ljZXNEb21GYWN0b3J5LmNyZWF0ZShjc3MpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY2hvaWNlc0RvbTogY2hvaWNlc0RvbSxcbiAgICAgICAgY3JlYXRlU3RhdGljRG9tOiBmdW5jdGlvbiBjcmVhdGVTdGF0aWNEb20oZWxlbWVudCwgY29udGFpbmVyQ2xhc3MpIHtcbiAgICAgICAgICBmdW5jdGlvbiBzaG93RXJyb3IobWVzc2FnZSkge1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmVkJztcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUuY29sb3IgPSAnd2hpdGUnO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBjb250YWluZXJFbGVtZW50LCBwaWNrc0VsZW1lbnQ7XG4gICAgICAgICAgdmFyIHJlbW92YWJsZUNvbnRhaW5lckNsYXNzID0gZmFsc2U7XG5cbiAgICAgICAgICBpZiAoZWxlbWVudC50YWdOYW1lID09ICdESVYnKSB7XG4gICAgICAgICAgICBjb250YWluZXJFbGVtZW50ID0gZWxlbWVudDtcblxuICAgICAgICAgICAgaWYgKCFjb250YWluZXJFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjb250YWluZXJDbGFzcykpIHtcbiAgICAgICAgICAgICAgY29udGFpbmVyRWxlbWVudC5jbGFzc0xpc3QuYWRkKGNvbnRhaW5lckNsYXNzKTtcbiAgICAgICAgICAgICAgcmVtb3ZhYmxlQ29udGFpbmVyQ2xhc3MgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwaWNrc0VsZW1lbnQgPSBmaW5kRGlyZWN0Q2hpbGRCeVRhZ05hbWUoY29udGFpbmVyRWxlbWVudCwgJ1VMJyk7XG4gICAgICAgICAgfSBlbHNlIGlmIChlbGVtZW50LnRhZ05hbWUgPT0gJ1VMJykge1xuICAgICAgICAgICAgcGlja3NFbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgICAgIGNvbnRhaW5lckVsZW1lbnQgPSBjbG9zZXN0QnlDbGFzc05hbWUoZWxlbWVudCwgY29udGFpbmVyQ2xhc3MpO1xuXG4gICAgICAgICAgICBpZiAoIWNvbnRhaW5lckVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgc2hvd0Vycm9yKCdCc011bHRpU2VsZWN0OiBkZWZpbmVkIG9uIFVMIGJ1dCBwcmVjZWRlbnRhbnQgRElWIGZvciBjb250YWluZXIgbm90IGZvdW5kOyBjbGFzcz0nICsgY29udGFpbmVyQ2xhc3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudC50YWdOYW1lID09IFwiSU5QVVRcIikge1xuICAgICAgICAgICAgc2hvd0Vycm9yKCdCc011bHRpU2VsZWN0OiBJTlBVVCBlbGVtZW50IGlzIG5vdCBzdXBwb3J0ZWQnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgaXNEaXNwb3NhYmxlUGlja3NFbGVtZW50ID0gZmFsc2U7XG5cbiAgICAgICAgICBpZiAoIXBpY2tzRWxlbWVudCkge1xuICAgICAgICAgICAgcGlja3NFbGVtZW50ID0gY3JlYXRlRWxlbWVudEFzcGVjdC5jcmVhdGVFbGVtZW50KCdVTCcpO1xuICAgICAgICAgICAgaXNEaXNwb3NhYmxlUGlja3NFbGVtZW50ID0gdHJ1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY2hvaWNlc0RvbTogY2hvaWNlc0RvbSxcbiAgICAgICAgICAgIHN0YXRpY0RvbToge1xuICAgICAgICAgICAgICBpbml0aWFsRWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgICAgY29udGFpbmVyRWxlbWVudDogY29udGFpbmVyRWxlbWVudCxcbiAgICAgICAgICAgICAgcGlja3NFbGVtZW50OiBwaWNrc0VsZW1lbnQsXG4gICAgICAgICAgICAgIGlzRGlzcG9zYWJsZVBpY2tzRWxlbWVudDogaXNEaXNwb3NhYmxlUGlja3NFbGVtZW50XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3RhdGljTWFuYWdlcjoge1xuICAgICAgICAgICAgICBhcHBlbmRUb0NvbnRhaW5lcjogZnVuY3Rpb24gYXBwZW5kVG9Db250YWluZXIoKSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyRWxlbWVudC5hcHBlbmRDaGlsZChjaG9pY2VzRG9tLmNob2ljZXNFbGVtZW50KTtcbiAgICAgICAgICAgICAgICBpZiAoaXNEaXNwb3NhYmxlUGlja3NFbGVtZW50KSBjb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKHBpY2tzRWxlbWVudCk7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGRpc3Bvc2U6IGZ1bmN0aW9uIGRpc3Bvc2UoKSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyRWxlbWVudC5yZW1vdmVDaGlsZChjaG9pY2VzRG9tLmNob2ljZXNFbGVtZW50KTtcbiAgICAgICAgICAgICAgICBpZiAocmVtb3ZhYmxlQ29udGFpbmVyQ2xhc3MpIGNvbnRhaW5lckVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjb250YWluZXJDbGFzcyk7XG4gICAgICAgICAgICAgICAgaWYgKGlzRGlzcG9zYWJsZVBpY2tzRWxlbWVudCkgY29udGFpbmVyRWxlbWVudC5yZW1vdmVDaGlsZChwaWNrc0VsZW1lbnQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIFBpY2tzRG9tKHBpY2tzRWxlbWVudCwgaXNEaXNwb3NhYmxlUGlja3NFbGVtZW50LCBjcmVhdGVFbGVtZW50QXNwZWN0LCBjc3MpIHtcbiAgdmFyIHBpY2tGaWx0ZXJFbGVtZW50ID0gY3JlYXRlRWxlbWVudEFzcGVjdC5jcmVhdGVFbGVtZW50KCdMSScpO1xuICBhZGRTdHlsaW5nKHBpY2tzRWxlbWVudCwgY3NzLnBpY2tzKTtcbiAgYWRkU3R5bGluZyhwaWNrRmlsdGVyRWxlbWVudCwgY3NzLnBpY2tGaWx0ZXIpO1xuICB2YXIgZGlzYWJsZVRvZ2dsZVN0eWxpbmcgPSB0b2dnbGVTdHlsaW5nKHBpY2tzRWxlbWVudCwgY3NzLnBpY2tzX2Rpc2FibGVkKTtcbiAgdmFyIGZvY3VzVG9nZ2xlU3R5bGluZyA9IHRvZ2dsZVN0eWxpbmcocGlja3NFbGVtZW50LCBjc3MucGlja3NfZm9jdXMpO1xuICB2YXIgaXNGb2N1c0luID0gZmFsc2U7XG4gIHJldHVybiB7XG4gICAgcGlja3NFbGVtZW50OiBwaWNrc0VsZW1lbnQsXG4gICAgcGlja0ZpbHRlckVsZW1lbnQ6IHBpY2tGaWx0ZXJFbGVtZW50LFxuICAgIGNyZWF0ZVBpY2tFbGVtZW50OiBmdW5jdGlvbiBjcmVhdGVQaWNrRWxlbWVudCgpIHtcbiAgICAgIHZhciBwaWNrRWxlbWVudCA9IGNyZWF0ZUVsZW1lbnRBc3BlY3QuY3JlYXRlRWxlbWVudCgnTEknKTtcbiAgICAgIGFkZFN0eWxpbmcocGlja0VsZW1lbnQsIGNzcy5waWNrKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBpY2tFbGVtZW50OiBwaWNrRWxlbWVudCxcbiAgICAgICAgYXR0YWNoOiBmdW5jdGlvbiBhdHRhY2goYmVmb3JlRWxlbWVudCkge1xuICAgICAgICAgIHJldHVybiBwaWNrc0VsZW1lbnQuaW5zZXJ0QmVmb3JlKHBpY2tFbGVtZW50LCBiZWZvcmVFbGVtZW50ICE9IG51bGwgPyBiZWZvcmVFbGVtZW50IDogcGlja0ZpbHRlckVsZW1lbnQpO1xuICAgICAgICB9LFxuICAgICAgICBkZXRhY2g6IGZ1bmN0aW9uIGRldGFjaCgpIHtcbiAgICAgICAgICByZXR1cm4gcGlja3NFbGVtZW50LnJlbW92ZUNoaWxkKHBpY2tFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9LFxuICAgIGRpc2FibGU6IGZ1bmN0aW9uIGRpc2FibGUoaXNDb21wb25lbnREaXNhYmxlZCkge1xuICAgICAgZGlzYWJsZVRvZ2dsZVN0eWxpbmcoaXNDb21wb25lbnREaXNhYmxlZCk7XG4gICAgfSxcbiAgICB0b2dnbGVGb2N1c1N0eWxpbmc6IGZ1bmN0aW9uIHRvZ2dsZUZvY3VzU3R5bGluZygpIHtcbiAgICAgIGZvY3VzVG9nZ2xlU3R5bGluZyhpc0ZvY3VzSW4pO1xuICAgIH0sXG4gICAgZ2V0SXNGb2N1c0luOiBmdW5jdGlvbiBnZXRJc0ZvY3VzSW4oKSB7XG4gICAgICByZXR1cm4gaXNGb2N1c0luO1xuICAgIH0sXG4gICAgc2V0SXNGb2N1c0luOiBmdW5jdGlvbiBzZXRJc0ZvY3VzSW4obmV3SXNGb2N1c0luKSB7XG4gICAgICBpc0ZvY3VzSW4gPSBuZXdJc0ZvY3VzSW47XG4gICAgfSxcbiAgICBkaXNwb3NlOiBmdW5jdGlvbiBkaXNwb3NlKCkge1xuICAgICAgaWYgKCFpc0Rpc3Bvc2FibGVQaWNrc0VsZW1lbnQpIHtcbiAgICAgICAgZGlzYWJsZVRvZ2dsZVN0eWxpbmcoZmFsc2UpO1xuICAgICAgICBmb2N1c1RvZ2dsZVN0eWxpbmcoZmFsc2UpO1xuICAgICAgICBpZiAocGlja0ZpbHRlckVsZW1lbnQucGFyZW50Tm9kZSkgcGlja0ZpbHRlckVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChwaWNrRmlsdGVyRWxlbWVudCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBGaWx0ZXJEb20oaXNEaXNwb3NhYmxlUGlja3NFbGVtZW50LCBjcmVhdGVFbGVtZW50QXNwZWN0LCBjc3MpIHtcbiAgdmFyIGZpbHRlcklucHV0RWxlbWVudCA9IGNyZWF0ZUVsZW1lbnRBc3BlY3QuY3JlYXRlRWxlbWVudCgnSU5QVVQnKTtcbiAgYWRkU3R5bGluZyhmaWx0ZXJJbnB1dEVsZW1lbnQsIGNzcy5maWx0ZXJJbnB1dCk7XG4gIGZpbHRlcklucHV0RWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwic2VhcmNoXCIpO1xuICBmaWx0ZXJJbnB1dEVsZW1lbnQuc2V0QXR0cmlidXRlKFwiYXV0b2NvbXBsZXRlXCIsIFwib2ZmXCIpO1xuICB2YXIgZXZlbnRCaW5kZXIgPSBFdmVudEJpbmRlcigpO1xuICByZXR1cm4ge1xuICAgIGZpbHRlcklucHV0RWxlbWVudDogZmlsdGVySW5wdXRFbGVtZW50LFxuICAgIGlzRW1wdHk6IGZ1bmN0aW9uIGlzRW1wdHkoKSB7XG4gICAgICByZXR1cm4gZmlsdGVySW5wdXRFbGVtZW50LnZhbHVlID8gZmFsc2UgOiB0cnVlO1xuICAgIH0sXG4gICAgc2V0RW1wdHk6IGZ1bmN0aW9uIHNldEVtcHR5KCkge1xuICAgICAgZmlsdGVySW5wdXRFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgfSxcbiAgICBnZXRWYWx1ZTogZnVuY3Rpb24gZ2V0VmFsdWUoKSB7XG4gICAgICByZXR1cm4gZmlsdGVySW5wdXRFbGVtZW50LnZhbHVlO1xuICAgIH0sXG4gICAgc2V0Rm9jdXM6IGZ1bmN0aW9uIHNldEZvY3VzKCkge1xuICAgICAgZmlsdGVySW5wdXRFbGVtZW50LmZvY3VzKCk7XG4gICAgfSxcbiAgICBzZXRXaWR0aDogZnVuY3Rpb24gc2V0V2lkdGgodGV4dCkge1xuICAgICAgZmlsdGVySW5wdXRFbGVtZW50LnN0eWxlLndpZHRoID0gdGV4dC5sZW5ndGggKiAxLjMgKyAyICsgXCJjaFwiO1xuICAgIH0sXG4gICAgLy8gVE9ETzogY2hlY2sgd2h5IEkgbmVlZCB0aGlzIGNvbXBhcmlzaW9uPyBcbiAgICBzZXRGb2N1c0lmTm90VGFyZ2V0OiBmdW5jdGlvbiBzZXRGb2N1c0lmTm90VGFyZ2V0KHRhcmdldCkge1xuICAgICAgaWYgKHRhcmdldCAhPSBmaWx0ZXJJbnB1dEVsZW1lbnQpIGZpbHRlcklucHV0RWxlbWVudC5mb2N1cygpO1xuICAgIH0sXG4gICAgb25JbnB1dDogZnVuY3Rpb24gb25JbnB1dChvbkZpbHRlcklucHV0SW5wdXQpIHtcbiAgICAgIGV2ZW50QmluZGVyLmJpbmQoZmlsdGVySW5wdXRFbGVtZW50LCAnaW5wdXQnLCBvbkZpbHRlcklucHV0SW5wdXQpO1xuICAgIH0sXG4gICAgb25Gb2N1c0luOiBmdW5jdGlvbiBvbkZvY3VzSW4oX29uRm9jdXNJbikge1xuICAgICAgZXZlbnRCaW5kZXIuYmluZChmaWx0ZXJJbnB1dEVsZW1lbnQsICdmb2N1c2luJywgX29uRm9jdXNJbik7XG4gICAgfSxcbiAgICBvbkZvY3VzT3V0OiBmdW5jdGlvbiBvbkZvY3VzT3V0KF9vbkZvY3VzT3V0KSB7XG4gICAgICBldmVudEJpbmRlci5iaW5kKGZpbHRlcklucHV0RWxlbWVudCwgJ2ZvY3Vzb3V0JywgX29uRm9jdXNPdXQpO1xuICAgIH0sXG4gICAgb25LZXlEb3duOiBmdW5jdGlvbiBvbktleURvd24ob25maWx0ZXJJbnB1dEtleURvd24pIHtcbiAgICAgIGV2ZW50QmluZGVyLmJpbmQoZmlsdGVySW5wdXRFbGVtZW50LCAna2V5ZG93bicsIG9uZmlsdGVySW5wdXRLZXlEb3duKTtcbiAgICB9LFxuICAgIG9uS2V5VXA6IGZ1bmN0aW9uIG9uS2V5VXAob25GaWx0ZXJJbnB1dEtleVVwKSB7XG4gICAgICBldmVudEJpbmRlci5iaW5kKGZpbHRlcklucHV0RWxlbWVudCwgJ2tleXVwJywgb25GaWx0ZXJJbnB1dEtleVVwKTtcbiAgICB9LFxuICAgIGRpc3Bvc2U6IGZ1bmN0aW9uIGRpc3Bvc2UoKSB7XG4gICAgICBldmVudEJpbmRlci51bmJpbmQoKTtcblxuICAgICAgaWYgKCFpc0Rpc3Bvc2FibGVQaWNrc0VsZW1lbnQpIHtcbiAgICAgICAgaWYgKGZpbHRlcklucHV0RWxlbWVudC5wYXJlbnROb2RlKSBmaWx0ZXJJbnB1dEVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChmaWx0ZXJJbnB1dEVsZW1lbnQpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gQ2hvaWNlc0RvbUZhY3RvcnkoY3JlYXRlRWxlbWVudEFzcGVjdCkge1xuICByZXR1cm4ge1xuICAgIGNyZWF0ZTogZnVuY3Rpb24gY3JlYXRlKGNzcykge1xuICAgICAgdmFyIGNob2ljZXNFbGVtZW50ID0gY3JlYXRlRWxlbWVudEFzcGVjdC5jcmVhdGVFbGVtZW50KCdESVYnKTtcbiAgICAgIHZhciBjaG9pY2VzTGlzdEVsZW1lbnQgPSBjcmVhdGVFbGVtZW50QXNwZWN0LmNyZWF0ZUVsZW1lbnQoJ1VMJyk7XG4gICAgICBjaG9pY2VzRWxlbWVudC5hcHBlbmRDaGlsZChjaG9pY2VzTGlzdEVsZW1lbnQpO1xuICAgICAgY2hvaWNlc0VsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIGFkZFN0eWxpbmcoY2hvaWNlc0VsZW1lbnQsIGNzcy5jaG9pY2VzKTtcbiAgICAgIGFkZFN0eWxpbmcoY2hvaWNlc0xpc3RFbGVtZW50LCBjc3MuY2hvaWNlc0xpc3QpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY2hvaWNlc0VsZW1lbnQ6IGNob2ljZXNFbGVtZW50LFxuICAgICAgICBjaG9pY2VzTGlzdEVsZW1lbnQ6IGNob2ljZXNMaXN0RWxlbWVudCxcbiAgICAgICAgY3JlYXRlQ2hvaWNlRWxlbWVudDogZnVuY3Rpb24gY3JlYXRlQ2hvaWNlRWxlbWVudCgpIHtcbiAgICAgICAgICB2YXIgY2hvaWNlRWxlbWVudCA9IGNyZWF0ZUVsZW1lbnRBc3BlY3QuY3JlYXRlRWxlbWVudCgnTEknKTtcbiAgICAgICAgICBhZGRTdHlsaW5nKGNob2ljZUVsZW1lbnQsIGNzcy5jaG9pY2UpO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjaG9pY2VFbGVtZW50OiBjaG9pY2VFbGVtZW50LFxuICAgICAgICAgICAgc2V0VmlzaWJsZTogZnVuY3Rpb24gc2V0VmlzaWJsZShpc1Zpc2libGUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGNob2ljZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IGlzVmlzaWJsZSA/ICdibG9jaycgOiAnbm9uZSc7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXR0YWNoOiBmdW5jdGlvbiBhdHRhY2goYmVmb3JlRWxlbWVudCkge1xuICAgICAgICAgICAgICByZXR1cm4gY2hvaWNlc0xpc3RFbGVtZW50Lmluc2VydEJlZm9yZShjaG9pY2VFbGVtZW50LCBiZWZvcmVFbGVtZW50KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXRhY2g6IGZ1bmN0aW9uIGRldGFjaCgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGNob2ljZXNMaXN0RWxlbWVudC5yZW1vdmVDaGlsZChjaG9pY2VFbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gQ2hvaWNlc1Zpc2liaWxpdHlBc3BlY3QoY2hvaWNlc0VsZW1lbnQpIHtcbiAgcmV0dXJuIHtcbiAgICBpc0Nob2ljZXNWaXNpYmxlOiBmdW5jdGlvbiBpc0Nob2ljZXNWaXNpYmxlKCkge1xuICAgICAgcmV0dXJuIGNob2ljZXNFbGVtZW50LnN0eWxlLmRpc3BsYXkgIT0gJ25vbmUnO1xuICAgIH0sXG4gICAgc2V0Q2hvaWNlc1Zpc2libGU6IGZ1bmN0aW9uIHNldENob2ljZXNWaXNpYmxlKHZpc2libGUpIHtcbiAgICAgIGNob2ljZXNFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSB2aXNpYmxlID8gJ2Jsb2NrJyA6ICdub25lJztcbiAgICB9LFxuICAgIHVwZGF0ZVBvcHVwTG9jYXRpb246IGZ1bmN0aW9uIHVwZGF0ZVBvcHVwTG9jYXRpb24oKSB7fVxuICB9O1xufVxuXG5mdW5jdGlvbiBTcGVjaWFsUGlja3NFdmVudHNBc3BlY3QoKSB7XG4gIHJldHVybiB7XG4gICAgYmFja1NwYWNlOiBmdW5jdGlvbiBiYWNrU3BhY2UocGljaykge1xuICAgICAgcGljay5zZXRTZWxlY3RlZEZhbHNlKCk7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBUcmlnZ2VyQXNwZWN0KGVsZW1lbnQsIF90cmlnZ2VyKSB7XG4gIHJldHVybiB7XG4gICAgdHJpZ2dlcjogZnVuY3Rpb24gdHJpZ2dlcihldmVudE5hbWUpIHtcbiAgICAgIF90cmlnZ2VyKGVsZW1lbnQsIGV2ZW50TmFtZSk7XG4gICAgfVxuICB9O1xufVxuZnVuY3Rpb24gT25DaGFuZ2VBc3BlY3QodHJpZ2dlckFzcGVjdCwgbmFtZSkge1xuICByZXR1cm4ge1xuICAgIG9uQ2hhbmdlOiBmdW5jdGlvbiBvbkNoYW5nZSgpIHtcbiAgICAgIHRyaWdnZXJBc3BlY3QudHJpZ2dlcihuYW1lKTtcbiAgICB9XG4gIH07XG59XG5mdW5jdGlvbiBDb21wb25lbnRQcm9wZXJ0aWVzQXNwZWN0KGdldERpc2FibGVkKSB7XG4gIHJldHVybiB7XG4gICAgZ2V0RGlzYWJsZWQ6IGdldERpc2FibGVkXG4gIH07XG59XG5cbmZ1bmN0aW9uIE9wdGlvbnNBc3BlY3Qob3B0aW9ucykge1xuICByZXR1cm4ge1xuICAgIGdldE9wdGlvbnM6IGZ1bmN0aW9uIGdldE9wdGlvbnMoKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucztcbiAgICB9XG4gIH07XG59XG5mdW5jdGlvbiBPcHRpb25Qcm9wZXJ0aWVzQXNwZWN0KGdldFRleHQpIHtcbiAgaWYgKCFnZXRUZXh0KSB7XG4gICAgZ2V0VGV4dCA9IGZ1bmN0aW9uIGdldFRleHQob3B0aW9uKSB7XG4gICAgICByZXR1cm4gb3B0aW9uLnRleHQ7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZ2V0VGV4dDogZ2V0VGV4dFxuICB9O1xufVxuXG5mdW5jdGlvbiBDaG9pY2VzRW51bWVyYWJsZUFzcGVjdChjb3VudGFibGVDaG9pY2VzTGlzdCwgZ2V0TmV4dCkge1xuICByZXR1cm4ge1xuICAgIGZvckVhY2g6IGZ1bmN0aW9uIGZvckVhY2goZikge1xuICAgICAgdmFyIHdyYXAgPSBjb3VudGFibGVDaG9pY2VzTGlzdC5nZXRIZWFkKCk7XG5cbiAgICAgIHdoaWxlICh3cmFwKSB7XG4gICAgICAgIGYod3JhcCk7XG4gICAgICAgIHdyYXAgPSBnZXROZXh0KHdyYXApO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gTmF2aWdhdGVNYW5hZ2VyKGxpc3QsIGdldFByZXYsIGdldE5leHQpIHtcbiAgcmV0dXJuIHtcbiAgICBuYXZpZ2F0ZTogZnVuY3Rpb24gbmF2aWdhdGUoZG93biwgd3JhcFxuICAgIC8qIGhvdmVyZWRDaG9pY2UgKi9cbiAgICApIHtcbiAgICAgIGlmIChkb3duKSB7XG4gICAgICAgIHJldHVybiB3cmFwID8gZ2V0TmV4dCh3cmFwKSA6IGxpc3QuZ2V0SGVhZCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHdyYXAgPyBnZXRQcmV2KHdyYXApIDogbGlzdC5nZXRUYWlsKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBnZXRDb3VudDogZnVuY3Rpb24gZ2V0Q291bnQoKSB7XG4gICAgICByZXR1cm4gbGlzdC5nZXRDb3VudCgpO1xuICAgIH0sXG4gICAgZ2V0SGVhZDogZnVuY3Rpb24gZ2V0SGVhZCgpIHtcbiAgICAgIHJldHVybiBsaXN0LmdldEhlYWQoKTtcbiAgICB9XG4gIH07XG59XG5mdW5jdGlvbiBGaWx0ZXJQcmVkaWNhdGVBc3BlY3QoKSB7XG4gIHJldHVybiB7XG4gICAgZmlsdGVyUHJlZGljYXRlOiBmdW5jdGlvbiBmaWx0ZXJQcmVkaWNhdGUod3JhcCwgdGV4dCkge1xuICAgICAgcmV0dXJuIHdyYXAuY2hvaWNlLnNlYXJjaFRleHQuaW5kZXhPZih0ZXh0KSA+PSAwO1xuICAgIH1cbiAgfTtcbn1cbmZ1bmN0aW9uIEZpbHRlck1hbmFnZXJBc3BlY3QoZW1wdHlOYXZpZ2F0ZU1hbmFnZXIsIGZpbHRlcmVkTmF2aWdhdGVNYW5hZ2VyLCBmaWx0ZXJlZENob2ljZXNMaXN0LCBjaG9pY2VzRW51bWVyYWJsZUFzcGVjdCwgZmlsdGVyUHJlZGljYXRlQXNwZWN0KSB7XG4gIHZhciBzaG93RW1wdHlGaWx0ZXIgPSB0cnVlO1xuICB2YXIgZmlsdGVyVGV4dCA9IFwiXCI7XG4gIHJldHVybiB7XG4gICAgZ2V0TmF2aWdhdGVNYW5hZ2VyOiBmdW5jdGlvbiBnZXROYXZpZ2F0ZU1hbmFnZXIoKSB7XG4gICAgICByZXR1cm4gc2hvd0VtcHR5RmlsdGVyID8gZW1wdHlOYXZpZ2F0ZU1hbmFnZXIgOiBmaWx0ZXJlZE5hdmlnYXRlTWFuYWdlcjtcbiAgICB9LFxuICAgIHByb2Nlc3NFbXB0eUlucHV0OiBmdW5jdGlvbiBwcm9jZXNzRW1wdHlJbnB1dCgpIHtcbiAgICAgIC8vIHJlZGVmaW5lZCBpbiBQbGFjZWhvbGRlclB1bGdpbiwgSGlnaGxpZ2h0UGx1Z2luXG4gICAgICBzaG93RW1wdHlGaWx0ZXIgPSB0cnVlO1xuICAgICAgZmlsdGVyVGV4dCA9IFwiXCI7XG4gICAgICBjaG9pY2VzRW51bWVyYWJsZUFzcGVjdC5mb3JFYWNoKGZ1bmN0aW9uICh3cmFwKSB7XG4gICAgICAgIHdyYXAuY2hvaWNlLnNldFZpc2libGUodHJ1ZSk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIGdldEZpbHRlcjogZnVuY3Rpb24gZ2V0RmlsdGVyKCkge1xuICAgICAgcmV0dXJuIGZpbHRlclRleHQ7XG4gICAgfSxcbiAgICBzZXRGaWx0ZXI6IGZ1bmN0aW9uIHNldEZpbHRlcih0ZXh0KSB7XG4gICAgICAvLyByZWRlZmluZWQgaW4gIEhpZ2hsaWdodFBsdWdpblxuICAgICAgc2hvd0VtcHR5RmlsdGVyID0gZmFsc2U7XG4gICAgICBmaWx0ZXJUZXh0ID0gdGV4dDtcbiAgICAgIGZpbHRlcmVkQ2hvaWNlc0xpc3QucmVzZXQoKTtcbiAgICAgIGNob2ljZXNFbnVtZXJhYmxlQXNwZWN0LmZvckVhY2goZnVuY3Rpb24gKHdyYXApIHtcbiAgICAgICAgd3JhcC5jaG9pY2UuZmlsdGVyZWRQcmV2ID0gd3JhcC5jaG9pY2UuZmlsdGVyZWROZXh0ID0gbnVsbDtcbiAgICAgICAgdmFyIHYgPSBmaWx0ZXJQcmVkaWNhdGVBc3BlY3QuZmlsdGVyUHJlZGljYXRlKHdyYXAsIHRleHQpO1xuICAgICAgICBpZiAodikgZmlsdGVyZWRDaG9pY2VzTGlzdC5hZGQod3JhcCk7XG4gICAgICAgIHdyYXAuY2hvaWNlLnNldFZpc2libGUodik7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIEJ1aWxkQW5kQXR0YWNoQ2hvaWNlQXNwZWN0KGJ1aWxkQ2hvaWNlQXNwZWN0KSB7XG4gIHJldHVybiB7XG4gICAgYnVpbGRBbmRBdHRhY2hDaG9pY2U6IGZ1bmN0aW9uIGJ1aWxkQW5kQXR0YWNoQ2hvaWNlKHdyYXAsIGdldE5leHRFbGVtZW50KSB7XG4gICAgICBidWlsZENob2ljZUFzcGVjdC5idWlsZENob2ljZSh3cmFwKTtcbiAgICAgIHdyYXAuY2hvaWNlLmNob2ljZUVsZW1lbnRBdHRhY2goZ2V0TmV4dEVsZW1lbnQgPT0gbnVsbCA/IHZvaWQgMCA6IGdldE5leHRFbGVtZW50KCkpO1xuICAgIH1cbiAgfTtcbn1cbmZ1bmN0aW9uIEJ1aWxkQ2hvaWNlQXNwZWN0KGNob2ljZXNEb20sIGNob2ljZURvbUZhY3RvcnksIGNob2ljZUNsaWNrQXNwZWN0KSB7XG4gIHJldHVybiB7XG4gICAgYnVpbGRDaG9pY2U6IGZ1bmN0aW9uIGJ1aWxkQ2hvaWNlKHdyYXApIHtcbiAgICAgIHZhciBfY2hvaWNlc0RvbSRjcmVhdGVDaG8gPSBjaG9pY2VzRG9tLmNyZWF0ZUNob2ljZUVsZW1lbnQoKSxcbiAgICAgICAgICBjaG9pY2VFbGVtZW50ID0gX2Nob2ljZXNEb20kY3JlYXRlQ2hvLmNob2ljZUVsZW1lbnQsXG4gICAgICAgICAgc2V0VmlzaWJsZSA9IF9jaG9pY2VzRG9tJGNyZWF0ZUNoby5zZXRWaXNpYmxlLFxuICAgICAgICAgIGF0dGFjaCA9IF9jaG9pY2VzRG9tJGNyZWF0ZUNoby5hdHRhY2gsXG4gICAgICAgICAgZGV0YWNoID0gX2Nob2ljZXNEb20kY3JlYXRlQ2hvLmRldGFjaDtcblxuICAgICAgd3JhcC5jaG9pY2UuY2hvaWNlRWxlbWVudCA9IGNob2ljZUVsZW1lbnQ7XG4gICAgICB3cmFwLmNob2ljZS5jaG9pY2VFbGVtZW50QXR0YWNoID0gYXR0YWNoO1xuICAgICAgd3JhcC5jaG9pY2UuaXNDaG9pY2VFbGVtZW50QXR0YWNoZWQgPSB0cnVlO1xuXG4gICAgICB2YXIgX2Nob2ljZURvbUZhY3RvcnkkY3JlID0gY2hvaWNlRG9tRmFjdG9yeS5jcmVhdGUoY2hvaWNlRWxlbWVudCwgd3JhcCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gY2hvaWNlQ2xpY2tBc3BlY3QuY2hvaWNlQ2xpY2sod3JhcCk7XG4gICAgICB9KSxcbiAgICAgICAgICBkaXNwb3NlID0gX2Nob2ljZURvbUZhY3RvcnkkY3JlLmRpc3Bvc2UsXG4gICAgICAgICAgY2hvaWNlRG9tID0gX2Nob2ljZURvbUZhY3RvcnkkY3JlLmNob2ljZURvbSxcbiAgICAgICAgICBjaG9pY2VEb21NYW5hZ2VySGFuZGxlcnMgPSBfY2hvaWNlRG9tRmFjdG9yeSRjcmUuY2hvaWNlRG9tTWFuYWdlckhhbmRsZXJzO1xuXG4gICAgICB3cmFwLmNob2ljZS5jaG9pY2VEb20gPSBjaG9pY2VEb207XG4gICAgICBjaG9pY2VEb21NYW5hZ2VySGFuZGxlcnMudXBkYXRlRGF0YSgpO1xuICAgICAgaWYgKGNob2ljZURvbU1hbmFnZXJIYW5kbGVycy51cGRhdGVTZWxlY3RlZCkgY2hvaWNlRG9tTWFuYWdlckhhbmRsZXJzLnVwZGF0ZVNlbGVjdGVkKCk7XG4gICAgICBpZiAoY2hvaWNlRG9tTWFuYWdlckhhbmRsZXJzLnVwZGF0ZURpc2FibGVkKSBjaG9pY2VEb21NYW5hZ2VySGFuZGxlcnMudXBkYXRlRGlzYWJsZWQoKTtcbiAgICAgIHdyYXAuY2hvaWNlLmNob2ljZURvbU1hbmFnZXJIYW5kbGVycyA9IGNob2ljZURvbU1hbmFnZXJIYW5kbGVycztcblxuICAgICAgd3JhcC5jaG9pY2UucmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBkZXRhY2goKTtcbiAgICAgIH07XG5cbiAgICAgIHdyYXAuY2hvaWNlLmlzRmlsdGVyZWRJbiA9IHRydWU7XG5cbiAgICAgIHdyYXAuY2hvaWNlLnNldEhvdmVySW4gPSBmdW5jdGlvbiAodikge1xuICAgICAgICB3cmFwLmNob2ljZS5pc0hvdmVySW4gPSB2O1xuICAgICAgICBjaG9pY2VEb21NYW5hZ2VySGFuZGxlcnMudXBkYXRlSG92ZXJJbigpO1xuICAgICAgfTtcblxuICAgICAgd3JhcC5jaG9pY2Uuc2V0VmlzaWJsZSA9IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHdyYXAuY2hvaWNlLmlzRmlsdGVyZWRJbiA9IHY7XG4gICAgICAgIHNldFZpc2libGUod3JhcC5jaG9pY2UuaXNGaWx0ZXJlZEluKTtcbiAgICAgIH07XG5cbiAgICAgIHdyYXAuY2hvaWNlLmRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHdyYXAuY2hvaWNlLmNob2ljZURvbU1hbmFnZXJIYW5kbGVycyA9IG51bGw7XG4gICAgICAgIGRpc3Bvc2UoKTtcbiAgICAgICAgd3JhcC5jaG9pY2UuY2hvaWNlRWxlbWVudCA9IG51bGw7XG4gICAgICAgIHdyYXAuY2hvaWNlLmNob2ljZURvbSA9IG51bGw7XG4gICAgICAgIHdyYXAuY2hvaWNlLmNob2ljZUVsZW1lbnRBdHRhY2ggPSBudWxsO1xuICAgICAgICB3cmFwLmNob2ljZS5pc0Nob2ljZUVsZW1lbnRBdHRhY2hlZCA9IGZhbHNlO1xuICAgICAgICB3cmFwLmNob2ljZS5yZW1vdmUgPSBudWxsOyAvLyBub3QgcmVhbCBkYXRhIG1hbmlwdWxhdGlvbiBidXQgaW50ZXJuYWwgc3RhdGVcblxuICAgICAgICB3cmFwLmNob2ljZS5zZXRWaXNpYmxlID0gbnVsbDsgLy8gVE9ETzogcmVmYWN0b3IgaXQgdGhlcmUgc2hvdWxkIGJlIDMgdHlwZXMgb2Ygbm90IHZpc2liaWxpdHk6IGZvciBoaWRkZW4sIGZvciBmaWx0ZXJlZCBvdXQsIGZvciBvcHRncm91cCwgZm9yIG1lc3NhZ2UgaXRlbVxuXG4gICAgICAgIHdyYXAuY2hvaWNlLnNldEhvdmVySW4gPSBudWxsO1xuICAgICAgICB3cmFwLmNob2ljZS5kaXNwb3NlID0gbnVsbDtcbiAgICAgIH07XG5cbiAgICAgIHdyYXAuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd3JhcC5jaG9pY2UuZGlzcG9zZSgpO1xuICAgICAgICB3cmFwLmRpc3Bvc2UgPSBudWxsO1xuICAgICAgfTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIE9wdGlvbkF0dGFjaEFzcGVjdChjcmVhdGVXcmFwQXNwZWN0LCBjcmVhdGVDaG9pY2VCYXNlQXNwZWN0LCBidWlsZEFuZEF0dGFjaENob2ljZUFzcGVjdCwgd3JhcHMpIHtcbiAgcmV0dXJuIHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIGF0dGFjaChvcHRpb24pIHtcbiAgICAgIHZhciB3cmFwID0gY3JlYXRlV3JhcEFzcGVjdC5jcmVhdGVXcmFwKG9wdGlvbik7XG4gICAgICB3cmFwLmNob2ljZSA9IGNyZWF0ZUNob2ljZUJhc2VBc3BlY3QuY3JlYXRlQ2hvaWNlQmFzZShvcHRpb24pOyAvLyBsZXQgb3B0R3JvdXAgPSBvcHRHcm91cEFzcGVjdC5nZXRPcHRpb25PcHRHcm91cChvcHRpb24pO1xuICAgICAgLy8gaWYgKHByZXZPcHRHcm91cCAhPSBvcHRHcm91cCl7XG4gICAgICAvLyAgICAgY3VycmVudE9wdEdyb3VwID0gb3B0R3JvdXA7XG4gICAgICAvLyAgICAgdmFyIG9wdEdyb3VwV3JhcCA9IG9wdEdyb3VwQnVpbGRBc3BlY3Qud3JhcEFuZEF0dGFjaE9wdEdyb3VwSXRlbShvcHRpb24pO1xuICAgICAgLy8gfVxuICAgICAgLy8gd3JhcC5vcHRHcm91cCA9IGN1cnJlbnRPcHRHcm91cDtcblxuICAgICAgd3JhcHMucHVzaCh3cmFwKTsgLy8gbm90ZTogYmVmb3JlIGF0dGFjaCBiZWNhdXNlIGF0dGFjaCBuZWVkIGl0IGZvciBuYXZpZ2F0aW9uIG1hbmFnZW1lbnRcblxuICAgICAgYnVpbGRBbmRBdHRhY2hDaG9pY2VBc3BlY3QuYnVpbGRBbmRBdHRhY2hDaG9pY2Uod3JhcCk7IC8vd3JhcHMucHVzaCh3cmFwKTtcbiAgICB9XG4gIH07XG59XG5mdW5jdGlvbiBPcHRpb25zTG9vcEFzcGVjdChvcHRpb25zQXNwZWN0LCBvcHRpb25BdHRhY2hBc3BlY3QpIHtcbiAgcmV0dXJuIHtcbiAgICBsb29wOiBmdW5jdGlvbiBsb29wKCkge1xuICAgICAgdmFyIG9wdGlvbnMgPSBvcHRpb25zQXNwZWN0LmdldE9wdGlvbnMoKTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBvcHRpb24gPSBvcHRpb25zW2ldO1xuICAgICAgICBvcHRpb25BdHRhY2hBc3BlY3QuYXR0YWNoKG9wdGlvbik7XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBVcGRhdGVEYXRhQXNwZWN0KGNob2ljZXNEb20sIHdyYXBzLCBwaWNrc0xpc3QsIG9wdGlvbnNMb29wQXNwZWN0LCByZXNldExheW91dEFzcGVjdCkge1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZURhdGE6IGZ1bmN0aW9uIHVwZGF0ZURhdGEoKSB7XG4gICAgICAvLyBjbG9zZSBkcm9wIGRvd24gLCByZW1vdmUgZmlsdGVyXG4gICAgICByZXNldExheW91dEFzcGVjdC5yZXNldExheW91dCgpO1xuICAgICAgY2hvaWNlc0RvbS5jaG9pY2VzTGlzdEVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjsgLy8gVE9ETzogdGhlcmUgc2hvdWxkIGJldHRlciBcIm9wdGltaXphdGlvblwiXG5cbiAgICAgIHdyYXBzLmNsZWFyKCk7XG4gICAgICBwaWNrc0xpc3QuZm9yRWFjaChmdW5jdGlvbiAocGljaykge1xuICAgICAgICByZXR1cm4gcGljay5kaXNwb3NlKCk7XG4gICAgICB9KTtcbiAgICAgIHBpY2tzTGlzdC5yZXNldCgpO1xuICAgICAgb3B0aW9uc0xvb3BBc3BlY3QubG9vcCgpO1xuICAgIH1cbiAgfTtcbn1cbmZ1bmN0aW9uIFVwZGF0ZUFzcGVjdCh1cGRhdGVEYXRhQXNwZWN0KSB7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgICB1cGRhdGVEYXRhQXNwZWN0LnVwZGF0ZURhdGEoKTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIElzQ2hvaWNlU2VsZWN0YWJsZUFzcGVjdCgpIHtcbiAgLy8gVE9ETyByZW5hbWUgdG8gSXNTZWxlY3RhYmxlQnlVc2VyQXNwZWN0ID9cbiAgcmV0dXJuIHtcbiAgICBpc1NlbGVjdGFibGU6IGZ1bmN0aW9uIGlzU2VsZWN0YWJsZSh3cmFwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH07XG59IC8vIHRvZG86IHJlbW92ZT9cblxuZnVuY3Rpb24gQ2hvaWNlQ2xpY2tBc3BlY3Qob3B0aW9uVG9nZ2xlQXNwZWN0LCBmaWx0ZXJEb20pIHtcbiAgcmV0dXJuIHtcbiAgICBjaG9pY2VDbGljazogZnVuY3Rpb24gY2hvaWNlQ2xpY2sod3JhcCkge1xuICAgICAgb3B0aW9uVG9nZ2xlQXNwZWN0LnRvZ2dsZSh3cmFwKTtcbiAgICAgIGZpbHRlckRvbS5zZXRGb2N1cygpO1xuICAgIH1cbiAgfTtcbn0gLy8gLy8gZnVsbE1hdGNoQXNwZWN0IHRyeVNldFdyYXBTZWxlY3RlZChmdWxsTWF0Y2hXcmFwLm9wdGlvbiwgY29tcG9zZVVwZGF0ZVNlbGVjdGVkKGZ1bGxNYXRjaFdyYXAsIHRydWUpLCB0cnVlKTtcblxuZnVuY3Rpb24gT3B0aW9uVG9nZ2xlQXNwZWN0KGNyZWF0ZVBpY2tIYW5kbGVyc0FzcGVjdCwgYWRkUGlja0FzcGVjdFxuLyosIHNldE9wdGlvblNlbGVjdGVkQXNwZWN0Ki9cbikge1xuICByZXR1cm4ge1xuICAgIHRvZ2dsZTogZnVuY3Rpb24gdG9nZ2xlKHdyYXApIHtcbiAgICAgIHZhciBwaWNrSGFuZGxlcnMgPSBjcmVhdGVQaWNrSGFuZGxlcnNBc3BlY3QuY3JlYXRlUGlja0hhbmRsZXJzKHdyYXApO1xuICAgICAgYWRkUGlja0FzcGVjdC5hZGRQaWNrKHdyYXAsIHBpY2tIYW5kbGVycyk7XG4gICAgICByZXR1cm4gdHJ1ZTsgLy8gVE9ETzogcHJvY2VzcyBzZXRPcHRpb25TZWxlY3RlZEFzcGVjdFxuICAgIH1cbiAgfTtcbn1cbmZ1bmN0aW9uIEFkZFBpY2tBc3BlY3QoKSB7XG4gIHJldHVybiB7XG4gICAgYWRkUGljazogZnVuY3Rpb24gYWRkUGljayh3cmFwLCBwaWNrSGFuZGxlcnMpIHtcbiAgICAgIHJldHVybiBwaWNrSGFuZGxlcnMucHJvZHVjZVBpY2soKTtcbiAgICB9XG4gIH07XG59XG5mdW5jdGlvbiBGdWxsTWF0Y2hBc3BlY3QoY3JlYXRlUGlja0hhbmRsZXJzQXNwZWN0LCBhZGRQaWNrQXNwZWN0KSB7XG4gIHJldHVybiB7XG4gICAgZnVsbE1hdGNoOiBmdW5jdGlvbiBmdWxsTWF0Y2god3JhcCkge1xuICAgICAgdmFyIHBpY2tIYW5kbGVycyA9IGNyZWF0ZVBpY2tIYW5kbGVyc0FzcGVjdC5jcmVhdGVQaWNrSGFuZGxlcnMod3JhcCk7XG4gICAgICBhZGRQaWNrQXNwZWN0LmFkZFBpY2sod3JhcCwgcGlja0hhbmRsZXJzKTtcbiAgICAgIHJldHVybiB0cnVlOyAvLyBUT0RPOiBwcm9jZXNzIHNldE9wdGlvblNlbGVjdGVkQXNwZWN0XG4gICAgfVxuICB9O1xufVxuZnVuY3Rpb24gUmVtb3ZlUGlja0FzcGVjdCgpIHtcbiAgcmV0dXJuIHtcbiAgICByZW1vdmVQaWNrOiBmdW5jdGlvbiByZW1vdmVQaWNrKHdyYXAsIHBpY2spIHtcbiAgICAgIHBpY2suZGlzcG9zZSgpOyAvLyBvdmVycmlkZWQgaW4gU2VsZWN0ZWRPcHRpb25QbHVnaW4gd2l0aCB0cnlTZXRXcmFwU2VsZWN0ZWQod3JhcCwgZmFsc2UpO1xuICAgIH1cbiAgfTtcbn1cbmZ1bmN0aW9uIFByb2R1Y2VQaWNrQXNwZWN0KHBpY2tzTGlzdCwgcmVtb3ZlUGlja0FzcGVjdCwgYnVpbGRQaWNrQXNwZWN0KSB7XG4gIHJldHVybiB7XG4gICAgcHJvZHVjZVBpY2s6IGZ1bmN0aW9uIHByb2R1Y2VQaWNrKHdyYXAsIHBpY2tIYW5kbGVycykge1xuICAgICAgdmFyIHBpY2sgPSBidWlsZFBpY2tBc3BlY3QuYnVpbGRQaWNrKHdyYXAsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICByZXR1cm4gcGlja0hhbmRsZXJzLnJlbW92ZU9uQnV0dG9uKGV2ZW50KTtcbiAgICAgIH0pO1xuXG4gICAgICB2YXIgZml4U2VsZWN0ZWRGYWxzZSA9IGZ1bmN0aW9uIGZpeFNlbGVjdGVkRmFsc2UoKSB7XG4gICAgICAgIHJldHVybiByZW1vdmVQaWNrQXNwZWN0LnJlbW92ZVBpY2sod3JhcCwgcGljayk7XG4gICAgICB9O1xuXG4gICAgICBwaWNrSGFuZGxlcnMucmVtb3ZlT25CdXR0b24gPSBmaXhTZWxlY3RlZEZhbHNlO1xuICAgICAgcGljay5waWNrRWxlbWVudEF0dGFjaCgpO1xuXG4gICAgICB2YXIgX3BpY2tzTGlzdCRhZGQgPSBwaWNrc0xpc3QuYWRkKHBpY2spLFxuICAgICAgICAgIHJlbW92ZUZyb21QaWNrc0xpc3QgPSBfcGlja3NMaXN0JGFkZC5yZW1vdmU7XG5cbiAgICAgIHBpY2suc2V0U2VsZWN0ZWRGYWxzZSA9IGZpeFNlbGVjdGVkRmFsc2U7XG4gICAgICBwaWNrLndyYXAgPSB3cmFwO1xuICAgICAgcGljay5kaXNwb3NlID0gY29tcG9zZVN5bmMocmVtb3ZlRnJvbVBpY2tzTGlzdCwgZnVuY3Rpb24gKCkge1xuICAgICAgICBwaWNrLnNldFNlbGVjdGVkRmFsc2UgPSBudWxsO1xuICAgICAgICBwaWNrLndyYXAgPSBudWxsO1xuICAgICAgfSwgcGljay5kaXNwb3NlKTtcblxuICAgICAgcGlja0hhbmRsZXJzLnJlbW92ZUFuZERpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBwaWNrLmRpc3Bvc2UoKTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBwaWNrO1xuICAgIH1cbiAgfTtcbn0gLy8gcmVkZWZpbmVkIGluIE11bHRpU2VsZWN0SW5saW5lTGF5b3V0IHRvIHJlZGVmaW5lIGhhbmRsZXJzIHJlbW92ZU9uQnV0dG9uXG4vLyByZWRlZmluZWQgaW4gU2VsZWN0ZWRPcHRpb25QbHVnaW4gdG8gY29tcG9zZSB3cmFwLnVwZGF0ZVNlbGVjdGVkXG5cbmZ1bmN0aW9uIENyZWF0ZVBpY2tIYW5kbGVyc0FzcGVjdChwcm9kdWNlUGlja0FzcGVjdCkge1xuICByZXR1cm4ge1xuICAgIGNyZWF0ZVBpY2tIYW5kbGVyczogZnVuY3Rpb24gY3JlYXRlUGlja0hhbmRsZXJzKHdyYXApIHtcbiAgICAgIHZhciBwaWNrSGFuZGxlcnMgPSB7XG4gICAgICAgIHByb2R1Y2VQaWNrOiBudWxsLFxuICAgICAgICAvLyBub3QgcmVkZWZpbmVkIGRpcmVjdGx5LCBidXQgcmVkZWZpbmVkIGluIGFkZFBpY2tBc3BlY3RcbiAgICAgICAgcmVtb3ZlQW5kRGlzcG9zZTogbnVsbCxcbiAgICAgICAgLy8gbm90IHJlZGVmaW5lZCwgXG4gICAgICAgIHJlbW92ZU9uQnV0dG9uOiBudWxsIC8vIHJlZGVmaW5lZCBpbiBNdWx0aVNlbGVjdElubGluZUxheW91dFxuXG4gICAgICB9O1xuXG4gICAgICBwaWNrSGFuZGxlcnMucHJvZHVjZVBpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBwcm9kdWNlUGlja0FzcGVjdC5wcm9kdWNlUGljayh3cmFwLCBwaWNrSGFuZGxlcnMpO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIHBpY2tIYW5kbGVycztcbiAgICB9XG4gIH07XG59XG5mdW5jdGlvbiBDcmVhdGVDaG9pY2VCYXNlQXNwZWN0KG9wdGlvblByb3BlcnRpZXNBc3BlY3QpIHtcbiAgcmV0dXJuIHtcbiAgICBjcmVhdGVDaG9pY2VCYXNlOiBmdW5jdGlvbiBjcmVhdGVDaG9pY2VCYXNlKG9wdGlvbikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLy91cGRhdGVEaXNhYmxlZDpudWxsLCAgXG4gICAgICAgIC8vdXBkYXRlSGlkZGVuOm51bGwsXG4gICAgICAgIC8vIG5hdmlnYXRpb24gYW5kIGZpbHRlciBzdXBwb3J0XG4gICAgICAgIGZpbHRlcmVkUHJldjogbnVsbCxcbiAgICAgICAgZmlsdGVyZWROZXh0OiBudWxsLFxuICAgICAgICBzZWFyY2hUZXh0OiBvcHRpb25Qcm9wZXJ0aWVzQXNwZWN0LmdldFRleHQob3B0aW9uKS50b0xvd2VyQ2FzZSgpLnRyaW0oKSxcbiAgICAgICAgLy8gVE9ETyBtYWtlIGFuIGluZGV4IGFic3RyYWN0aW9uXG4gICAgICAgIC8vIGludGVybmFsIHN0YXRlIGhhbmRsZXJzLCBzbyB0aGV5IGRvIG5vdCBoYXZlIFwidXBkYXRlIHNlbWFudGljc1wiXG4gICAgICAgIGlzSG92ZXJJbjogZmFsc2UsXG4gICAgICAgIGlzRmlsdGVyZWRJbjogZmFsc2UsXG4gICAgICAgIHNldFZpc2libGU6IG51bGwsXG4gICAgICAgIHNldEhvdmVySW46IG51bGwsXG4gICAgICAgIC8vIFRPRE86IGlzIGl0IGEgcmVhbGx5IHNlbnNlIHRvIGhhdmUgdGhlbSB0aGVyZT9cbiAgICAgICAgaXNDaG9pY2VFbGVtZW50QXR0YWNoZWQ6IGZhbHNlLFxuICAgICAgICBjaG9pY2VFbGVtZW50OiBudWxsLFxuICAgICAgICBjaG9pY2VEb206IG51bGwsXG4gICAgICAgIGNob2ljZUVsZW1lbnRBdHRhY2g6IG51bGwsXG4gICAgICAgIGl0ZW1QcmV2OiBudWxsLFxuICAgICAgICBpdGVtTmV4dDogbnVsbCxcbiAgICAgICAgcmVtb3ZlOiBudWxsLFxuICAgICAgICBkaXNwb3NlOiBudWxsXG4gICAgICB9O1xuICAgIH1cbiAgfTtcbn1cbmZ1bmN0aW9uIENyZWF0ZVdyYXBBc3BlY3QoKSB7XG4gIHJldHVybiB7XG4gICAgY3JlYXRlV3JhcDogZnVuY3Rpb24gY3JlYXRlV3JhcChvcHRpb24pIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG9wdGlvbjogb3B0aW9uXG4gICAgICB9O1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gSG92ZXJlZENob2ljZUFzcGVjdCgpIHtcbiAgdmFyIGhvdmVyZWRDaG9pY2UgPSBudWxsO1xuICByZXR1cm4ge1xuICAgIGdldEhvdmVyZWRDaG9pY2U6IGZ1bmN0aW9uIGdldEhvdmVyZWRDaG9pY2UoKSB7XG4gICAgICByZXR1cm4gaG92ZXJlZENob2ljZTtcbiAgICB9LFxuICAgIHNldEhvdmVyZWRDaG9pY2U6IGZ1bmN0aW9uIHNldEhvdmVyZWRDaG9pY2Uod3JhcCkge1xuICAgICAgaG92ZXJlZENob2ljZSA9IHdyYXA7XG4gICAgfSxcbiAgICByZXNldEhvdmVyZWRDaG9pY2U6IGZ1bmN0aW9uIHJlc2V0SG92ZXJlZENob2ljZSgpIHtcbiAgICAgIGlmIChob3ZlcmVkQ2hvaWNlKSB7XG4gICAgICAgIGhvdmVyZWRDaG9pY2UuY2hvaWNlLnNldEhvdmVySW4oZmFsc2UpO1xuICAgICAgICBob3ZlcmVkQ2hvaWNlID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG5mdW5jdGlvbiBOYXZpZ2F0ZUFzcGVjdChob3ZlcmVkQ2hvaWNlQXNwZWN0LCBfbmF2aWdhdGUpIHtcbiAgcmV0dXJuIHtcbiAgICBob3ZlckluOiBmdW5jdGlvbiBob3ZlckluKHdyYXApIHtcbiAgICAgIGhvdmVyZWRDaG9pY2VBc3BlY3QucmVzZXRIb3ZlcmVkQ2hvaWNlKCk7XG4gICAgICBob3ZlcmVkQ2hvaWNlQXNwZWN0LnNldEhvdmVyZWRDaG9pY2Uod3JhcCk7XG4gICAgICB3cmFwLmNob2ljZS5zZXRIb3ZlckluKHRydWUpO1xuICAgIH0sXG4gICAgbmF2aWdhdGU6IGZ1bmN0aW9uIG5hdmlnYXRlKGRvd24pIHtcbiAgICAgIHJldHVybiBfbmF2aWdhdGUoZG93biwgaG92ZXJlZENob2ljZUFzcGVjdC5nZXRIb3ZlcmVkQ2hvaWNlKCkpO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gV3JhcHMod3JhcHNDb2xsZWN0aW9uLCBsaXN0RmFjYWRlX3Jlc2V0LCBsaXN0RmFjYWRlX3JlbW92ZSwgbGlzdEZhY2FkZV9hZGQpIHtcbiAgcmV0dXJuIHtcbiAgICBwdXNoOiBmdW5jdGlvbiBwdXNoKHdyYXApIHtcbiAgICAgIHJldHVybiBfcHVzaCh3cmFwLCB3cmFwc0NvbGxlY3Rpb24sIGxpc3RGYWNhZGVfYWRkKTtcbiAgICB9LFxuICAgIGluc2VydDogZnVuY3Rpb24gaW5zZXJ0KGtleSwgd3JhcCkge1xuICAgICAgcmV0dXJuIF9pbnNlcnQoa2V5LCB3cmFwLCB3cmFwc0NvbGxlY3Rpb24sIGxpc3RGYWNhZGVfYWRkKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKGtleSkge1xuICAgICAgdmFyIHdyYXAgPSB3cmFwc0NvbGxlY3Rpb24ucmVtb3ZlKGtleSk7XG4gICAgICBsaXN0RmFjYWRlX3JlbW92ZSh3cmFwKTtcbiAgICAgIHJldHVybiB3cmFwO1xuICAgIH0sXG4gICAgY2xlYXI6IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgd3JhcHNDb2xsZWN0aW9uLnJlc2V0KCk7XG4gICAgICBsaXN0RmFjYWRlX3Jlc2V0KCk7XG4gICAgfSxcbiAgICBkaXNwb3NlOiBmdW5jdGlvbiBkaXNwb3NlKCkge1xuICAgICAgcmV0dXJuIHdyYXBzQ29sbGVjdGlvbi5mb3JMb29wKGZ1bmN0aW9uICh3cmFwKSB7XG4gICAgICAgIHJldHVybiB3cmFwLmRpc3Bvc2UoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gX3B1c2god3JhcCwgd3JhcHNDb2xsZWN0aW9uLCBsaXN0RmFjYWRlX2FkZCkge1xuICB3cmFwc0NvbGxlY3Rpb24ucHVzaCh3cmFwKTtcbiAgbGlzdEZhY2FkZV9hZGQod3JhcCk7XG59XG5cbmZ1bmN0aW9uIF9pbnNlcnQoa2V5LCB3cmFwLCB3cmFwc0NvbGxlY3Rpb24sIGxpc3RGYWNhZGVfYWRkKSB7XG4gIGlmIChrZXkgPj0gd3JhcHNDb2xsZWN0aW9uLmdldENvdW50KCkpIHtcbiAgICBfcHVzaCh3cmFwLCB3cmFwc0NvbGxlY3Rpb24sIGxpc3RGYWNhZGVfYWRkKTtcbiAgfSBlbHNlIHtcbiAgICB3cmFwc0NvbGxlY3Rpb24uYWRkKHdyYXAsIGtleSk7XG4gICAgbGlzdEZhY2FkZV9hZGQod3JhcCwga2V5KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBQaWNrQnV0dG9uQXNwZWN0KGJ1dHRvbkhUTUwpIHtcbiAgcmV0dXJuIHtcbiAgICBnZXRCdXR0b25IVE1MOiBmdW5jdGlvbiBnZXRCdXR0b25IVE1MKCkge1xuICAgICAgcmV0dXJuIGJ1dHRvbkhUTUw7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBCdWlsZFBpY2tBc3BlY3QocGlja3NEb20sIHBpY2tEb21GYWN0b3J5KSB7XG4gIHJldHVybiB7XG4gICAgYnVpbGRQaWNrOiBmdW5jdGlvbiBidWlsZFBpY2sod3JhcCwgcmVtb3ZlT25CdXR0b24pIHtcbiAgICAgIHZhciBfcGlja3NEb20kY3JlYXRlUGlja0UgPSBwaWNrc0RvbS5jcmVhdGVQaWNrRWxlbWVudCgpLFxuICAgICAgICAgIHBpY2tFbGVtZW50ID0gX3BpY2tzRG9tJGNyZWF0ZVBpY2tFLnBpY2tFbGVtZW50LFxuICAgICAgICAgIGF0dGFjaCA9IF9waWNrc0RvbSRjcmVhdGVQaWNrRS5hdHRhY2gsXG4gICAgICAgICAgZGV0YWNoID0gX3BpY2tzRG9tJGNyZWF0ZVBpY2tFLmRldGFjaDtcblxuICAgICAgdmFyIF9waWNrRG9tRmFjdG9yeSRjcmVhdCA9IHBpY2tEb21GYWN0b3J5LmNyZWF0ZShwaWNrRWxlbWVudCwgd3JhcCwgcmVtb3ZlT25CdXR0b24pLFxuICAgICAgICAgIF9kaXNwb3NlID0gX3BpY2tEb21GYWN0b3J5JGNyZWF0LmRpc3Bvc2UsXG4gICAgICAgICAgcGlja0RvbSA9IF9waWNrRG9tRmFjdG9yeSRjcmVhdC5waWNrRG9tLFxuICAgICAgICAgIHBpY2tEb21NYW5hZ2VySGFuZGxlcnMgPSBfcGlja0RvbUZhY3RvcnkkY3JlYXQucGlja0RvbU1hbmFnZXJIYW5kbGVycztcblxuICAgICAgcGlja0RvbU1hbmFnZXJIYW5kbGVycy51cGRhdGVEYXRhKCk7XG4gICAgICBpZiAocGlja0RvbU1hbmFnZXJIYW5kbGVycy51cGRhdGVEaXNhYmxlZCkgcGlja0RvbU1hbmFnZXJIYW5kbGVycy51cGRhdGVEaXNhYmxlZCgpO1xuICAgICAgaWYgKHBpY2tEb21NYW5hZ2VySGFuZGxlcnMudXBkYXRlQ29tcG9uZW50RGlzYWJsZWQpIHBpY2tEb21NYW5hZ2VySGFuZGxlcnMudXBkYXRlQ29tcG9uZW50RGlzYWJsZWQoKTtcbiAgICAgIHZhciBwaWNrID0ge1xuICAgICAgICBwaWNrRG9tOiBwaWNrRG9tLFxuICAgICAgICBwaWNrRG9tTWFuYWdlckhhbmRsZXJzOiBwaWNrRG9tTWFuYWdlckhhbmRsZXJzLFxuICAgICAgICBwaWNrRWxlbWVudEF0dGFjaDogYXR0YWNoLFxuICAgICAgICBkaXNwb3NlOiBmdW5jdGlvbiBkaXNwb3NlKCkge1xuICAgICAgICAgIGRldGFjaCgpO1xuXG4gICAgICAgICAgX2Rpc3Bvc2UoKTtcblxuICAgICAgICAgIHBpY2sucGlja0RvbU1hbmFnZXJIYW5kbGVycyA9IG51bGw7XG4gICAgICAgICAgcGljay5waWNrRG9tID0gcGlja0RvbTtcbiAgICAgICAgICBwaWNrLnBpY2tFbGVtZW50QXR0YWNoID0gbnVsbDtcbiAgICAgICAgICBwaWNrLmRpc3Bvc2UgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHBpY2s7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBJbnB1dEFzcGVjdChmaWx0ZXJEb20sIGZpbHRlck1hbmFnZXJBc3BlY3QsIGZ1bGxNYXRjaEFzcGVjdCkge1xuICByZXR1cm4ge1xuICAgIC8vIG92ZXJyaWRlZCBpbiBTZWxlY3RlZE9wdGlvblBsdWdpblxuICAgIHByb2Nlc3NJbnB1dDogZnVuY3Rpb24gcHJvY2Vzc0lucHV0KCkge1xuICAgICAgdmFyIGZpbHRlcklucHV0VmFsdWUgPSBmaWx0ZXJEb20uZ2V0VmFsdWUoKTtcbiAgICAgIHZhciB0ZXh0ID0gZmlsdGVySW5wdXRWYWx1ZS50cmltKCk7XG4gICAgICB2YXIgaXNFbXB0eSA9IGZhbHNlO1xuICAgICAgaWYgKHRleHQgPT0gJycpIGlzRW1wdHkgPSB0cnVlO2Vsc2Uge1xuICAgICAgICBmaWx0ZXJNYW5hZ2VyQXNwZWN0LnNldEZpbHRlcih0ZXh0LnRvTG93ZXJDYXNlKCkpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzRW1wdHkpIHtcbiAgICAgICAgaWYgKGZpbHRlck1hbmFnZXJBc3BlY3QuZ2V0TmF2aWdhdGVNYW5hZ2VyKCkuZ2V0Q291bnQoKSA9PSAxKSB7XG4gICAgICAgICAgLy8gdG9kbzogbW92ZSBleGFjdCBtYXRjaCB0byBmaWx0ZXJNYW5hZ2VyXG4gICAgICAgICAgdmFyIGZ1bGxNYXRjaFdyYXAgPSBmaWx0ZXJNYW5hZ2VyQXNwZWN0LmdldE5hdmlnYXRlTWFuYWdlcigpLmdldEhlYWQoKTtcblxuICAgICAgICAgIHZhciBfdGV4dCA9IGZpbHRlck1hbmFnZXJBc3BlY3QuZ2V0RmlsdGVyKCk7XG5cbiAgICAgICAgICBpZiAoZnVsbE1hdGNoV3JhcC5jaG9pY2Uuc2VhcmNoVGV4dCA9PSBfdGV4dCkge1xuICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSBmdWxsTWF0Y2hBc3BlY3QuZnVsbE1hdGNoKGZ1bGxNYXRjaFdyYXApO1xuXG4gICAgICAgICAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgICAgICAgICBmaWx0ZXJEb20uc2V0RW1wdHkoKTtcbiAgICAgICAgICAgICAgaXNFbXB0eSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGZpbHRlcklucHV0VmFsdWU6IGZpbHRlcklucHV0VmFsdWUsXG4gICAgICAgIGlzRW1wdHk6IGlzRW1wdHlcbiAgICAgIH07XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBSZXNldEZpbHRlckxpc3RBc3BlY3QoZmlsdGVyRG9tLCBmaWx0ZXJNYW5hZ2VyQXNwZWN0KSB7XG4gIHJldHVybiB7XG4gICAgZm9yY2VSZXNldEZpbHRlcjogZnVuY3Rpb24gZm9yY2VSZXNldEZpbHRlcigpIHtcbiAgICAgIC8vIG92ZXIgaW4gUGxhY2Vob2xkZXJQbHVnaW5cbiAgICAgIGZpbHRlckRvbS5zZXRFbXB0eSgpO1xuICAgICAgZmlsdGVyTWFuYWdlckFzcGVjdC5wcm9jZXNzRW1wdHlJbnB1dCgpOyAvLyBvdmVyIGluIFBsYWNlaG9sZGVyUGx1Z2luXG4gICAgfVxuICB9O1xufVxuZnVuY3Rpb24gUmVzZXRGaWx0ZXJBc3BlY3QoZmlsdGVyRG9tLCByZXNldEZpbHRlckxpc3RBc3BlY3QpIHtcbiAgcmV0dXJuIHtcbiAgICByZXNldEZpbHRlcjogZnVuY3Rpb24gcmVzZXRGaWx0ZXIoKSB7XG4gICAgICAvLyBjYWxsIGluIE9wdGlvbnNBcGlQbHVnaW5cbiAgICAgIGlmICghZmlsdGVyRG9tLmlzRW1wdHkoKSkgLy8gY2FsbCBpbiBQbGFjZWhvbGRlclxuICAgICAgICByZXNldEZpbHRlckxpc3RBc3BlY3QuZm9yY2VSZXNldEZpbHRlcigpOyAvLyBvdmVyIGluIFBsYWNlaG9sZGVyXG4gICAgfVxuICB9O1xufVxuZnVuY3Rpb24gRm9jdXNJbkFzcGVjdChwaWNrc0RvbSkge1xuICByZXR1cm4ge1xuICAgIHNldEZvY3VzSW46IGZ1bmN0aW9uIHNldEZvY3VzSW4oZm9jdXMpIHtcbiAgICAgIC8vIGNhbGwgaW4gT3B0aW9uc0FwaVBsdWdpblxuICAgICAgcGlja3NEb20uc2V0SXNGb2N1c0luKGZvY3VzKTsgLy8gdW5pcXVlIGNhbGwsIGNhbGwgQnNBcHBlYXJhbmNlUGx1Z2luXG5cbiAgICAgIHBpY2tzRG9tLnRvZ2dsZUZvY3VzU3R5bGluZygpOyAvLyBvdmVyIEJzQXBwZWFyYW5jZVBsdWdpblxuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gTXVsdGlTZWxlY3RJbmxpbmVMYXlvdXQoYXNwZWN0cykge1xuICB2YXIgZW52aXJvbm1lbnQgPSBhc3BlY3RzLmVudmlyb25tZW50LFxuICAgICAgZmlsdGVyRG9tID0gYXNwZWN0cy5maWx0ZXJEb20sXG4gICAgICBwaWNrc0RvbSA9IGFzcGVjdHMucGlja3NEb20sXG4gICAgICBjaG9pY2VzRG9tID0gYXNwZWN0cy5jaG9pY2VzRG9tLFxuICAgICAgY2hvaWNlc1Zpc2liaWxpdHlBc3BlY3QgPSBhc3BlY3RzLmNob2ljZXNWaXNpYmlsaXR5QXNwZWN0LFxuICAgICAgaG92ZXJlZENob2ljZUFzcGVjdCA9IGFzcGVjdHMuaG92ZXJlZENob2ljZUFzcGVjdCxcbiAgICAgIG5hdmlnYXRlQXNwZWN0ID0gYXNwZWN0cy5uYXZpZ2F0ZUFzcGVjdCxcbiAgICAgIGZpbHRlck1hbmFnZXJBc3BlY3QgPSBhc3BlY3RzLmZpbHRlck1hbmFnZXJBc3BlY3QsXG4gICAgICBmb2N1c0luQXNwZWN0ID0gYXNwZWN0cy5mb2N1c0luQXNwZWN0LFxuICAgICAgb3B0aW9uVG9nZ2xlQXNwZWN0ID0gYXNwZWN0cy5vcHRpb25Ub2dnbGVBc3BlY3QsXG4gICAgICBjcmVhdGVQaWNrSGFuZGxlcnNBc3BlY3QgPSBhc3BlY3RzLmNyZWF0ZVBpY2tIYW5kbGVyc0FzcGVjdCxcbiAgICAgIHBpY2tzTGlzdCA9IGFzcGVjdHMucGlja3NMaXN0LFxuICAgICAgaW5wdXRBc3BlY3QgPSBhc3BlY3RzLmlucHV0QXNwZWN0LFxuICAgICAgc3BlY2lhbFBpY2tzRXZlbnRzQXNwZWN0ID0gYXNwZWN0cy5zcGVjaWFsUGlja3NFdmVudHNBc3BlY3QsXG4gICAgICBidWlsZENob2ljZUFzcGVjdCA9IGFzcGVjdHMuYnVpbGRDaG9pY2VBc3BlY3QsXG4gICAgICBkaXNhYmxlQ29tcG9uZW50QXNwZWN0ID0gYXNwZWN0cy5kaXNhYmxlQ29tcG9uZW50QXNwZWN0LFxuICAgICAgcmVzZXRMYXlvdXRBc3BlY3QgPSBhc3BlY3RzLnJlc2V0TGF5b3V0QXNwZWN0LFxuICAgICAgcGxhY2Vob2xkZXJTdG9wSW5wdXRBc3BlY3QgPSBhc3BlY3RzLnBsYWNlaG9sZGVyU3RvcElucHV0QXNwZWN0LFxuICAgICAgd2FybmluZ0FzcGVjdCA9IGFzcGVjdHMud2FybmluZ0FzcGVjdCxcbiAgICAgIGNvbmZpZ3VyYXRpb24gPSBhc3BlY3RzLmNvbmZpZ3VyYXRpb24sXG4gICAgICBjcmVhdGVQb3BwZXJBc3BlY3QgPSBhc3BlY3RzLmNyZWF0ZVBvcHBlckFzcGVjdCxcbiAgICAgIHJ0bEFzcGVjdCA9IGFzcGVjdHMucnRsQXNwZWN0LFxuICAgICAgc3RhdGljTWFuYWdlciA9IGFzcGVjdHMuc3RhdGljTWFuYWdlcjtcbiAgdmFyIHBpY2tzRWxlbWVudCA9IHBpY2tzRG9tLnBpY2tzRWxlbWVudDtcbiAgdmFyIGNob2ljZXNFbGVtZW50ID0gY2hvaWNlc0RvbS5jaG9pY2VzRWxlbWVudDsgLy8gcG9wIHVwIGxheW91dCwgcmVxdWlyZSBjcmVhdGVQb3BwZXJQbHVnaW5cblxuICB2YXIgZmlsdGVySW5wdXRFbGVtZW50ID0gZmlsdGVyRG9tLmZpbHRlcklucHV0RWxlbWVudDtcbiAgdmFyIHBvcCA9IGNyZWF0ZVBvcHBlckFzcGVjdC5jcmVhdGVQb3BwZXIoY2hvaWNlc0VsZW1lbnQsIGZpbHRlcklucHV0RWxlbWVudCwgdHJ1ZSk7XG4gIHN0YXRpY01hbmFnZXIuYXBwZW5kVG9Db250YWluZXIgPSBjb21wb3NlU3luYyhzdGF0aWNNYW5hZ2VyLmFwcGVuZFRvQ29udGFpbmVyLCBwb3AuaW5pdCk7XG4gIHZhciBvcmlnQmFja1NwYWNlID0gc3BlY2lhbFBpY2tzRXZlbnRzQXNwZWN0LmJhY2tTcGFjZTtcblxuICBzcGVjaWFsUGlja3NFdmVudHNBc3BlY3QuYmFja1NwYWNlID0gZnVuY3Rpb24gKHBpY2spIHtcbiAgICBvcmlnQmFja1NwYWNlKHBpY2spO1xuICAgIHBvcC51cGRhdGUoKTtcbiAgfTtcblxuICBpZiAocnRsQXNwZWN0KSB7XG4gICAgdmFyIG9yaWdVcGRhdGVSdGwgPSBydGxBc3BlY3QudXBkYXRlUnRsO1xuXG4gICAgcnRsQXNwZWN0LnVwZGF0ZVJ0bCA9IGZ1bmN0aW9uIChpc1J0bCkge1xuICAgICAgb3JpZ1VwZGF0ZVJ0bChpc1J0bCk7XG4gICAgICBwb3Auc2V0UnRsKGlzUnRsKTtcbiAgICB9O1xuICB9XG5cbiAgY2hvaWNlc1Zpc2liaWxpdHlBc3BlY3QudXBkYXRlUG9wdXBMb2NhdGlvbiA9IGNvbXBvc2VTeW5jKGNob2ljZXNWaXNpYmlsaXR5QXNwZWN0LnVwZGF0ZVBvcHVwTG9jYXRpb24sIGZ1bmN0aW9uICgpIHtcbiAgICBwb3AudXBkYXRlKCk7XG4gIH0pO1xuXG4gIGlmICh3YXJuaW5nQXNwZWN0KSB7XG4gICAgdmFyIHBvcDIgPSBjcmVhdGVQb3BwZXJBc3BlY3QuY3JlYXRlUG9wcGVyKHdhcm5pbmdBc3BlY3Qud2FybmluZ0VsZW1lbnQsIGZpbHRlcklucHV0RWxlbWVudCwgZmFsc2UpO1xuICAgIHN0YXRpY01hbmFnZXIuYXBwZW5kVG9Db250YWluZXIgPSBjb21wb3NlU3luYyhzdGF0aWNNYW5hZ2VyLmFwcGVuZFRvQ29udGFpbmVyLCBwb3AyLmluaXQpO1xuXG4gICAgaWYgKHJ0bEFzcGVjdCkge1xuICAgICAgdmFyIG9yaWdVcGRhdGVSdGwyID0gcnRsQXNwZWN0LnVwZGF0ZVJ0bDtcblxuICAgICAgcnRsQXNwZWN0LnVwZGF0ZVJ0bCA9IGZ1bmN0aW9uIChpc1J0bCkge1xuICAgICAgICBvcmlnVXBkYXRlUnRsMihpc1J0bCk7XG4gICAgICAgIHBvcDIuc2V0UnRsKGlzUnRsKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgdmFyIG9yaWdXYXJuaW5nQXNwZWN0U2hvdyA9IHdhcm5pbmdBc3BlY3Quc2hvdztcblxuICAgIHdhcm5pbmdBc3BlY3Quc2hvdyA9IGZ1bmN0aW9uIChtc2cpIHtcbiAgICAgIHBvcDIudXBkYXRlKCk7XG4gICAgICBvcmlnV2FybmluZ0FzcGVjdFNob3cobXNnKTtcbiAgICB9O1xuXG4gICAgcG9wLmRpc3Bvc2UgPSBjb21wb3NlU3luYyhwb3AuZGlzcG9zZSwgcG9wMi5kaXNwb3NlKTtcbiAgfVxuXG4gIHZhciB3aW5kb3cgPSBlbnZpcm9ubWVudC53aW5kb3c7XG4gIHZhciBkb2N1bWVudCA9IHdpbmRvdy5kb2N1bWVudDtcbiAgdmFyIGV2ZW50TG9vcEZsYWcgPSBFdmVudExvb3BQcm9sb25nYWJsZUZsYWcod2luZG93KTtcbiAgdmFyIHNraXBGb2N1c291dCA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGdldFNraXBGb2N1c291dCgpIHtcbiAgICByZXR1cm4gc2tpcEZvY3Vzb3V0O1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRTa2lwRm9jdXNvdXQoKSB7XG4gICAgc2tpcEZvY3Vzb3V0ID0gZmFsc2U7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRTa2lwRm9jdXNvdXQoKSB7XG4gICAgc2tpcEZvY3Vzb3V0ID0gdHJ1ZTtcbiAgfVxuXG4gIHZhciBza2lwb3V0TW91c2Vkb3duID0gZnVuY3Rpb24gc2tpcG91dE1vdXNlZG93bigpIHtcbiAgICBzZXRTa2lwRm9jdXNvdXQoKTtcbiAgfTtcblxuICB2YXIgZG9jdW1lbnRNb3VzZXVwID0gZnVuY3Rpb24gZG9jdW1lbnRNb3VzZXVwKGV2ZW50KSB7XG4gICAgLy8gaWYgd2Ugd291bGQgbGVmdCB3aXRob3V0IGZvY3VzIHRoZW4gXCJjbG9zZSB0aGUgZHJvcFwiIGRvIG5vdCByZW1vdmUgZm9jdXMgYm9yZGVyXG4gICAgaWYgKGNob2ljZXNFbGVtZW50ID09IGV2ZW50LnRhcmdldCkgZmlsdGVyRG9tLnNldEZvY3VzKCk7IC8vIGlmIGNsaWNrIG91dHNpZGUgY29udGFpbmVyIC0gY2xvc2UgZHJvcGRvd25cbiAgICBlbHNlIGlmICghY29udGFpbnNBbmRTZWxmKGNob2ljZXNFbGVtZW50LCBldmVudC50YXJnZXQpICYmICFjb250YWluc0FuZFNlbGYocGlja3NFbGVtZW50LCBldmVudC50YXJnZXQpKSB7XG4gICAgICByZXNldExheW91dEFzcGVjdC5yZXNldExheW91dCgpO1xuICAgICAgZm9jdXNJbkFzcGVjdC5zZXRGb2N1c0luKGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgZnVuY3Rpb24gc2hvd0Nob2ljZXMoKSB7XG4gICAgaWYgKCFjaG9pY2VzVmlzaWJpbGl0eUFzcGVjdC5pc0Nob2ljZXNWaXNpYmxlKCkpIHtcbiAgICAgIGNob2ljZXNWaXNpYmlsaXR5QXNwZWN0LnVwZGF0ZVBvcHVwTG9jYXRpb24oKTtcbiAgICAgIGV2ZW50TG9vcEZsYWcuc2V0KCk7XG4gICAgICBjaG9pY2VzVmlzaWJpbGl0eUFzcGVjdC5zZXRDaG9pY2VzVmlzaWJsZSh0cnVlKTsgLy8gVE9ETzogbW92ZSB0byBzY3JvbGwgcGx1Z2luXG5cbiAgICAgIGNob2ljZXNFbGVtZW50LnNjcm9sbFRvcCA9IDA7IC8vIGFkZCBsaXN0ZW5lcnMgdGhhdCBtYW5hZ2VzIGNsb3NlIGRyb3Bkb3duIG9uICBjbGljayBvdXRzaWRlIGNvbnRhaW5lclxuXG4gICAgICBjaG9pY2VzRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHNraXBvdXRNb3VzZWRvd24pO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgZG9jdW1lbnRNb3VzZXVwKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBoaWRlQ2hvaWNlcygpIHtcbiAgICByZXNldE1vdXNlQ2FuZGlkYXRlQ2hvaWNlKCk7XG4gICAgaG92ZXJlZENob2ljZUFzcGVjdC5yZXNldEhvdmVyZWRDaG9pY2UoKTtcblxuICAgIGlmIChjaG9pY2VzVmlzaWJpbGl0eUFzcGVjdC5pc0Nob2ljZXNWaXNpYmxlKCkpIHtcbiAgICAgIC8vIENPT01FTlQgT1VUIERFQlVHR0lORyBwb3B1cCBsYXlvdXRcbiAgICAgIGNob2ljZXNWaXNpYmlsaXR5QXNwZWN0LnNldENob2ljZXNWaXNpYmxlKGZhbHNlKTtcbiAgICAgIGNob2ljZXNFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgc2tpcG91dE1vdXNlZG93bik7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBkb2N1bWVudE1vdXNldXApO1xuICAgIH1cbiAgfVxuXG4gIHZhciBwcmV2ZW50RGVmYXVsdENsaWNrRXZlbnQgPSBudWxsO1xuICB2YXIgY29tcG9uZW50RGlzYWJsZWRFdmVudEJpbmRlciA9IEV2ZW50QmluZGVyKCk7IC8vIFRPRE86IHJlbW92ZSBzZXRUaW1lb3V0OiBzZXQgb24gc3RhcnQgb2YgbW91c2UgZXZlbnQgcmVzZXQgb24gZW5kXG5cbiAgZnVuY3Rpb24gc2tpcG91dEFuZFJlc2V0TW91c2Vkb3duKCkge1xuICAgIHNraXBvdXRNb3VzZWRvd24oKTtcbiAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gcmVzZXRTa2lwRm9jdXNvdXQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHBpY2tzRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHNraXBvdXRBbmRSZXNldE1vdXNlZG93bik7XG5cbiAgZnVuY3Rpb24gY2xpY2tUb1Nob3dDaG9pY2VzKGV2ZW50KSB7XG4gICAgZmlsdGVyRG9tLnNldEZvY3VzSWZOb3RUYXJnZXQoZXZlbnQudGFyZ2V0KTtcblxuICAgIGlmIChwcmV2ZW50RGVmYXVsdENsaWNrRXZlbnQgIT0gZXZlbnQpIHtcbiAgICAgIGlmIChjaG9pY2VzVmlzaWJpbGl0eUFzcGVjdC5pc0Nob2ljZXNWaXNpYmxlKCkpIHtcbiAgICAgICAgaGlkZUNob2ljZXMoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChmaWx0ZXJNYW5hZ2VyQXNwZWN0LmdldE5hdmlnYXRlTWFuYWdlcigpLmdldENvdW50KCkgPiAwKSBzaG93Q2hvaWNlcygpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHByZXZlbnREZWZhdWx0Q2xpY2tFdmVudCA9IG51bGw7XG4gIH1cblxuICBmdW5jdGlvbiBwcm9jZXNzVW5jaGVjayh1bmNoZWNrT3B0aW9uLCBldmVudCkge1xuICAgIC8vIHdlIGNhbid0IHJlbW92ZSBpdGVtIG9uIFwiY2xpY2tcIiBpbiB0aGUgc2FtZSBsb29wIGl0ZXJhdGlvbiAtIGl0IGlzIHVuZnJlbmRseSBmb3IgM1BQIGV2ZW50IGhhbmRsZXJzICh0aGV5IHdpbGwgZ2V0IGRldGFjaGVkIGVsZW1lbnQpXG4gICAgLy8gbmV2ZXIgcmVtb3ZlIGVsZW1lbnRzIGluIHRoZSBzYW1lIGV2ZW50IGl0ZXJhdGlvblxuICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB1bmNoZWNrT3B0aW9uKCk7XG4gICAgfSk7XG4gICAgcHJldmVudERlZmF1bHRDbGlja0V2ZW50ID0gZXZlbnQ7IC8vIHNldFByZXZlbnREZWZhdWx0TXVsdGlTZWxlY3RFdmVudFxuICB9IC8vIGZ1bmN0aW9uIGhhbmRsZU9uUmVtb3ZlQnV0dG9uKG9uUmVtb3ZlLCBzZXRTZWxlY3RlZEZhbHNlKXtcbiAgLy8gICAgIC8vIHByb2Nlc3NSZW1vdmVCdXR0b25DbGljayByZW1vdmVzIHRoZSBpdGVtXG4gIC8vICAgICAvLyB3aGF0IGlzIGEgcHJvYmxlbSB3aXRoIGNhbGxpbmcgJ3JlbW92ZScgZGlyZWN0bHkgKG5vdCB1c2luZyAgc2V0VGltZW91dCgncmVtb3ZlJywgMCkpOlxuICAvLyAgICAgLy8gY29uc2lkZXIgc2l0dWF0aW9uIFwiTXVsdGlTZWxlY3RcIiBvbiBEUk9QRE9XTiAodGhhdCBzaG91bGQgYmUgY2xvc2VkIG9uIHRoZSBjbGljayBvdXRzaWRlIGRyb3Bkb3duKVxuICAvLyAgICAgLy8gdGhlcmVmb3JlIHdlIGFzbG8gaGF2ZSBkb2N1bWVudCdzIGNsaWNrJ3MgaGFuZGxlciB3aGVyZSB3ZSBkZWNpZGUgdG8gY2xvc2Ugb3IgbGVhdmUgdGhlIERST1BET1dOIG9wZW4uXG4gIC8vICAgICAvLyBiZWNhdXNlIG9mIHRoZSBldmVudCdzIGJ1YmxpbmcgcHJvY2VzcyAncmVtb3ZlJyBydW5zIGZpcnN0LiBcbiAgLy8gICAgIC8vIHRoYXQgbWVhbnMgdGhlIGV2ZW50J3MgdGFyZ2V0IGVsZW1lbnQgb24gd2hpY2ggd2UgY2xpY2sgKHRoZSB4IGJ1dHRvbikgd2lsbCBiZSByZW1vdmVkIGZyb20gdGhlIERPTSB0b2dldGhlciB3aXRoIGJhZGdlIFxuICAvLyAgICAgLy8gYmVmb3JlIHdlIGNvdWxkIGFuYWxpemUgaXMgaXQgYmVsb25nIHRvIG91ciBkcm9wZG93biBvciBub3QuXG4gIC8vICAgICAvLyBpbXBvcnRhbnQgMTogd2UgY2FuJ3QganVzdCB0aGUgc3RvcCBwcm9wb2dhdGlvbiB1c2luZyBzdG9wUHJvcG9nYXRlIGJlY2F1c2UgY2xpY2sgb3V0c2lkZSBkcm9wZG93biBvbiB0aGUgc2ltaWxhciBcbiAgLy8gICAgIC8vIGNvbXBvbmVudCB0aGF0IHVzZSBzdG9wUHJvcG9nYXRpb24gd2lsbCBub3QgY2xvc2UgZHJvcGRvd24gKGVycm9yLCBkcm9wZG93biBzaG91bGQgYmUgY2xvc2VkKVxuICAvLyAgICAgLy8gaW1wb3J0YW50IDI6IHdlIGNhbid0IGNoYW5nZSB0aGUgZHJvcGRvd24ncyBldmVudCBoYW5kbGVyIHRvIGxlYXZlIGRyb3Bkb3duIG9wZW4gaWYgZXZlbnQncyB0YXJnZXQgaXMgbnVsbCBiZWNhdXNlIG9mXG4gIC8vICAgICAvLyB0aGUgc2l0dWF0aW9uIGRlc2NyaWJlZCBhYm92ZTogY2xpY2sgb3V0c2lkZSBkcm9wZG93biBvbiB0aGUgc2FtZSBjb21wb25lbnQuXG4gIC8vICAgICAvLyBBbHRlcm5hdGl2ZWx5IGl0IGNvdWxkIGJlIHBvc3NpYmxlIHRvIHVzZSBzdG9wUHJvcG9nYXRlIGJ1dCB0b2dldGhlciBjcmVhdGUgY3VzdG9tIGNsaWNrIGV2ZW50IHNldHRpbmcgbmV3IHRhcmdldCBcbiAgLy8gICAgIC8vIHRoYXQgYmVsb21ncyB0byBET00gKGUuZy4gcGFuZWwpXG4gIC8vICAgICBvblJlbW92ZShldmVudCA9PiB7XG4gIC8vICAgICAgICAgcHJvY2Vzc1VuY2hlY2soc2V0U2VsZWN0ZWRGYWxzZSwgZXZlbnQpO1xuICAvLyAgICAgICAgIGhpZGVDaG9pY2VzKCk7XG4gIC8vICAgICAgICAgcmVzZXRGaWx0ZXJBc3BlY3QucmVzZXRGaWx0ZXIoKTsgXG4gIC8vICAgICB9KTtcbiAgLy8gfVxuXG5cbiAgZnVuY3Rpb24gaGFuZGxlT25SZW1vdmVCdXR0b24oc2V0U2VsZWN0ZWRGYWxzZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIHByb2Nlc3NVbmNoZWNrKHNldFNlbGVjdGVkRmFsc2UsIGV2ZW50KTtcbiAgICAgIHJlc2V0TGF5b3V0QXNwZWN0LnJlc2V0TGF5b3V0KCk7XG4gICAgfTtcbiAgfVxuXG4gIHZhciBtb3VzZUNhbmRpZGF0ZUV2ZW50QmluZGVyID0gRXZlbnRCaW5kZXIoKTtcblxuICB2YXIgcmVzZXRNb3VzZUNhbmRpZGF0ZUNob2ljZSA9IGZ1bmN0aW9uIHJlc2V0TW91c2VDYW5kaWRhdGVDaG9pY2UoKSB7XG4gICAgbW91c2VDYW5kaWRhdGVFdmVudEJpbmRlci51bmJpbmQoKTtcbiAgfTtcblxuICB2YXIgbW91c2VPdmVyVG9Ib3ZlcmVkQW5kUmVzZXQgPSBmdW5jdGlvbiBtb3VzZU92ZXJUb0hvdmVyZWRBbmRSZXNldCh3cmFwKSB7XG4gICAgaWYgKCF3cmFwLmNob2ljZS5pc0hvdmVySW4pIG5hdmlnYXRlQXNwZWN0LmhvdmVySW4od3JhcCk7XG4gICAgcmVzZXRNb3VzZUNhbmRpZGF0ZUNob2ljZSgpO1xuICB9O1xuXG4gIGZ1bmN0aW9uIGFkb3B0Q2hvaWNlRWxlbWVudCh3cmFwKSB7XG4gICAgdmFyIGNob2ljZUVsZW1lbnQgPSB3cmFwLmNob2ljZS5jaG9pY2VFbGVtZW50OyAvLyBpbiBjaHJvbWUgaXQgaGFwcGVucyBvbiBcImJlY29tZSB2aXNpYmxlXCIgc28gd2UgbmVlZCB0byBza2lwIGl0LCBcbiAgICAvLyBmb3IgSUUxMSBhbmQgZWRnZSBpdCBkb2Vzbid0IGhhcHBlbnMsIGJ1dCBmb3IgSUUxMSBhbmQgRWRnZSBpdCBkb2Vzbid0IGhhcHBlbnMgb24gc21hbGwgXG4gICAgLy8gbW91c2UgbW92ZXMgaW5zaWRlIHRoZSBpdGVtLiBcbiAgICAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy81OTAyMjU2My9icm93c2VyLWV2ZW50cy1tb3VzZW92ZXItZG9lc250LWhhcHBlbi13aGVuLXlvdS1tYWtlLWVsZW1lbnQtdmlzaWJsZS1hbmQtbW91c1xuXG4gICAgdmFyIG9uQ2hvaWNlRWxlbWVudE1vdXNlb3ZlciA9IGZ1bmN0aW9uIG9uQ2hvaWNlRWxlbWVudE1vdXNlb3ZlcigpIHtcbiAgICAgIGlmIChldmVudExvb3BGbGFnLmdldCgpKSB7XG4gICAgICAgIHJlc2V0TW91c2VDYW5kaWRhdGVDaG9pY2UoKTtcbiAgICAgICAgbW91c2VDYW5kaWRhdGVFdmVudEJpbmRlci5iaW5kKGNob2ljZUVsZW1lbnQsICdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIG1vdXNlT3ZlclRvSG92ZXJlZEFuZFJlc2V0KHdyYXApO1xuICAgICAgICB9KTtcbiAgICAgICAgbW91c2VDYW5kaWRhdGVFdmVudEJpbmRlci5iaW5kKGNob2ljZUVsZW1lbnQsICdtb3VzZWRvd24nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIG1vdXNlT3ZlclRvSG92ZXJlZEFuZFJlc2V0KHdyYXApO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghd3JhcC5jaG9pY2UuaXNIb3ZlckluKSB7XG4gICAgICAgICAgLy8gTk9URTogbW91c2VsZWF2ZSBpcyBub3QgZW5vdWdoIHRvIGd1YXJhbnRlZSByZW1vdmUgaG92ZXIgc3R5bGVzIGluIHNpdHVhdGlvbnNcbiAgICAgICAgICAvLyB3aGVuIHN0eWxlIHdhcyBzZXR1cGVkIHdpdGhvdXQgbW91c2UgKGtleWJvYXJkIGFycm93cylcbiAgICAgICAgICAvLyB0aGVyZWZvcmUgZm9yY2UgcmVzZXQgbWFudWFsbHkgKGRvbmUgaW5zaWRlIGhvdmVySW4pXG4gICAgICAgICAgbmF2aWdhdGVBc3BlY3QuaG92ZXJJbih3cmFwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07IC8vIG5vdGUgMTogbW91c2VsZWF2ZSBwcmVmZXJyZWQgdG8gbW91c2VvdXQgLSB3aGljaCBmaXJlcyBvbiBlYWNoIGRlc2NlbmRhbnRcbiAgICAvLyBub3RlIDI6IHNpbmNlIEkgd2FudCBhZGQgYWRpdGlvbmFsIGluZm8gcGFuZWxzIHRvIHRoZSBkcm9wZG93biBwdXQgbW91c2VsZWF2ZSBvbiBkcm9wZHdvbiB3b3VsZCBub3Qgd29ya1xuXG5cbiAgICB2YXIgb25DaG9pY2VFbGVtZW50TW91c2VsZWF2ZSA9IGZ1bmN0aW9uIG9uQ2hvaWNlRWxlbWVudE1vdXNlbGVhdmUoKSB7XG4gICAgICBpZiAoIWV2ZW50TG9vcEZsYWcuZ2V0KCkpIHtcbiAgICAgICAgaG92ZXJlZENob2ljZUFzcGVjdC5yZXNldEhvdmVyZWRDaG9pY2UoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIG92ZXJBbmRMZWF2ZUV2ZW50QmluZGVyID0gRXZlbnRCaW5kZXIoKTtcbiAgICBvdmVyQW5kTGVhdmVFdmVudEJpbmRlci5iaW5kKGNob2ljZUVsZW1lbnQsICdtb3VzZW92ZXInLCBvbkNob2ljZUVsZW1lbnRNb3VzZW92ZXIpO1xuICAgIG92ZXJBbmRMZWF2ZUV2ZW50QmluZGVyLmJpbmQoY2hvaWNlRWxlbWVudCwgJ21vdXNlbGVhdmUnLCBvbkNob2ljZUVsZW1lbnRNb3VzZWxlYXZlKTtcbiAgICByZXR1cm4gb3ZlckFuZExlYXZlRXZlbnRCaW5kZXIudW5iaW5kO1xuICB9XG5cbiAgZmlsdGVyRG9tLm9uRm9jdXNJbihmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGZvY3VzSW5Bc3BlY3Quc2V0Rm9jdXNJbih0cnVlKTtcbiAgfSk7XG4gIGZpbHRlckRvbS5vbkZvY3VzT3V0KGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIWdldFNraXBGb2N1c291dCgpKSB7XG4gICAgICAvLyBza2lwIGluaXRpYXRlZCBieSBtb3VzZSBjbGljayAod2UgbWFuYWdlIGl0IGRpZmZlcmVudCB3YXkpXG4gICAgICByZXNldExheW91dEFzcGVjdC5yZXNldExheW91dCgpOyAvLyBpZiBkbyBub3QgZG8gdGhpcyB3ZSB3aWxsIHJldHVybiB0byBmaWx0ZXJlZCBsaXN0IHdpdGhvdXQgdGV4dCBmaWx0ZXIgaW4gaW5wdXRcblxuICAgICAgZm9jdXNJbkFzcGVjdC5zZXRGb2N1c0luKGZhbHNlKTtcbiAgICB9XG5cbiAgICByZXNldFNraXBGb2N1c291dCgpO1xuICB9KTsgLy8gaXQgY2FuIGJlIGluaXRhdGVkIGJ5IDNQUCBmdW5jdGlvbmFsaXR5XG4gIC8vIHNhbXBsZSAoMSkgQlMgZnVuY3Rpb25hbGl0eSAtIGlucHV0IHggYnV0dG9uIGNsaWNrIC0gY2xlYXJzIGlucHV0XG4gIC8vIHNhbXBsZSAoMikgQlMgZnVuY3Rpb25hbGl0eSAtIGVzYyBrZXlkb3duIC0gY2xlYXJzIGlucHV0XG4gIC8vIGFuZCB0aGVyZSBjb3VsZCBiZSBkaWZmZXJlbmNlIGluIHByb2Nlc3Npbmc6ICgyKSBzaG91bGQgaGlkZSB0aGUgbWVudSwgdGhlbiByZXNldCAsIHdoZW4gKDEpIHNob3VsZCBqdXN0IHJlc2V0IHdpdGhvdXQgaGlkaW5nLlxuXG4gIGZ1bmN0aW9uIGFmdGVySW5wdXQoKSB7XG4gICAgdmFyIHZpc2libGVDb3VudCA9IGZpbHRlck1hbmFnZXJBc3BlY3QuZ2V0TmF2aWdhdGVNYW5hZ2VyKCkuZ2V0Q291bnQoKTtcblxuICAgIGlmICh2aXNpYmxlQ291bnQgPiAwKSB7XG4gICAgICBpZiAod2FybmluZ0FzcGVjdCkge1xuICAgICAgICB3YXJuaW5nQXNwZWN0LmhpZGUoKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHBhbmVsSXNWaXNibGUgPSBjaG9pY2VzVmlzaWJpbGl0eUFzcGVjdC5pc0Nob2ljZXNWaXNpYmxlKCk7XG5cbiAgICAgIGlmICghcGFuZWxJc1Zpc2JsZSkge1xuICAgICAgICBzaG93Q2hvaWNlcygpO1xuICAgICAgfVxuXG4gICAgICBpZiAodmlzaWJsZUNvdW50ID09IDEpIHtcbiAgICAgICAgbmF2aWdhdGVBc3BlY3QuaG92ZXJJbihmaWx0ZXJNYW5hZ2VyQXNwZWN0LmdldE5hdmlnYXRlTWFuYWdlcigpLmdldEhlYWQoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAocGFuZWxJc1Zpc2JsZSkgaG92ZXJlZENob2ljZUFzcGVjdC5yZXNldEhvdmVyZWRDaG9pY2UoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGNob2ljZXNWaXNpYmlsaXR5QXNwZWN0LmlzQ2hvaWNlc1Zpc2libGUoKSkge1xuICAgICAgICBoaWRlQ2hvaWNlcygpO1xuICAgICAgfVxuXG4gICAgICBpZiAod2FybmluZ0FzcGVjdCkge1xuICAgICAgICBpZiAoZmlsdGVyTWFuYWdlckFzcGVjdC5nZXRGaWx0ZXIoKSkgd2FybmluZ0FzcGVjdC5zaG93KGNvbmZpZ3VyYXRpb24ubm9SZXN1bHRzV2FybmluZyk7ZWxzZSB3YXJuaW5nQXNwZWN0LmhpZGUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmaWx0ZXJEb20ub25JbnB1dChmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHBsYWNlaG9sZGVyU3RvcElucHV0QXNwZWN0ICYmIHBsYWNlaG9sZGVyU3RvcElucHV0QXNwZWN0LmdldCgpKSB7XG4gICAgICBwbGFjZWhvbGRlclN0b3BJbnB1dEFzcGVjdC5yZXNldCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBfaW5wdXRBc3BlY3QkcHJvY2Vzc0kgPSBpbnB1dEFzcGVjdC5wcm9jZXNzSW5wdXQoKSxcbiAgICAgICAgZmlsdGVySW5wdXRWYWx1ZSA9IF9pbnB1dEFzcGVjdCRwcm9jZXNzSS5maWx0ZXJJbnB1dFZhbHVlLFxuICAgICAgICBpc0VtcHR5ID0gX2lucHV0QXNwZWN0JHByb2Nlc3NJLmlzRW1wdHk7XG5cbiAgICBpZiAoaXNFbXB0eSkgZmlsdGVyTWFuYWdlckFzcGVjdC5wcm9jZXNzRW1wdHlJbnB1dCgpO2Vsc2UgZmlsdGVyRG9tLnNldFdpZHRoKGZpbHRlcklucHV0VmFsdWUpO1xuICAgIGV2ZW50TG9vcEZsYWcuc2V0KCk7IC8vIG1lYW5zIGRpc2FibGUgbW91c2UgaGFuZGxlcnMgdGhhdCBzZXQgaG92ZXJlZCBpdGVtOyBvdGhlcndpc2Ugd2Ugd2lsbCBnZXQgXCJIb3ZlciBPbiBNb3VzZUVudGVyXCIgd2hlbiBmaWx0ZXIncyBjaGFuZ2VzIHNob3VsZCByZW1vdmUgaG92ZXJcblxuICAgIGFmdGVySW5wdXQoKTtcbiAgfSk7XG5cbiAgZnVuY3Rpb24ga2V5RG93bkFycm93KGRvd24pIHtcbiAgICB2YXIgd3JhcCA9IG5hdmlnYXRlQXNwZWN0Lm5hdmlnYXRlKGRvd24pO1xuXG4gICAgaWYgKHdyYXApIHtcbiAgICAgIC8vIFRPRE86IG5leHQgbGluZSBzaG91bGQgYmUgbW92ZWQgdG8gcGxhbm5lZCAgXCJIZWlnaHRBbmRTY3JvbGxcIiBwbHVnaW4sIGFjdHVhbCBvbmx5IGZvciBzY3JvbGxpbmcgd2l0aCBrZXlEb3duIGZ1bmN0aW9uYWxpdHlcbiAgICAgIGV2ZW50TG9vcEZsYWcuc2V0KDQwMCk7IC8vIG1lYW5zIGRpc2FibGUgbW91c2UgaGFuZGxlcnMgdGhhdCBzZXQgaG92ZXJlZCBjaG9pY2UgaXRlbTsgYXJyb3dEb3duIGNhbiBpbnRpYXRlIHNjcm9sbGluZyB3aGVuIHNjcm9sbGluZyBjYW4gaXRpYXRlIG1vdXNlIGxlYXZlIG9uIGhvdmVyZWQgaXRlbTsgdGhpcyBzdG9wcyBpdFxuXG4gICAgICBuYXZpZ2F0ZUFzcGVjdC5ob3ZlckluKHdyYXApOyAvLyAhXG5cbiAgICAgIHNob3dDaG9pY2VzKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaG92ZXJlZFRvU2VsZWN0ZWQoKSB7XG4gICAgdmFyIGhvdmVyZWRXcmFwID0gaG92ZXJlZENob2ljZUFzcGVjdC5nZXRIb3ZlcmVkQ2hvaWNlKCk7XG5cbiAgICBpZiAoaG92ZXJlZFdyYXApIHtcbiAgICAgIHZhciB3YXNUb2dnbGVkID0gb3B0aW9uVG9nZ2xlQXNwZWN0LnRvZ2dsZShob3ZlcmVkV3JhcCk7XG5cbiAgICAgIGlmICh3YXNUb2dnbGVkKSB7XG4gICAgICAgIHJlc2V0TGF5b3V0QXNwZWN0LnJlc2V0TGF5b3V0KCk7XG4gICAgICB9XG4gICAgfVxuICB9IC8vIFRPRE86IGJpbmQgaXQgbW9yZSBkZWNsYXJhdGl2ZSB3YXk/IChjb21wYWN0IGNvZGUpXG5cblxuICB2YXIgb25LZXlEb3duID0gZnVuY3Rpb24gb25LZXlEb3duKGV2ZW50KSB7XG4gICAgdmFyIGtleUNvZGUgPSBldmVudC53aGljaDtcbiAgICB2YXIgZW1wdHkgPSBmaWx0ZXJEb20uaXNFbXB0eSgpO1xuXG4gICAgaWYgKFsxMywgMjcgLy8gJzI3LWVzYycgdGhlcmUgaXMgXCJqdXN0IGluIGNhc2VcIiwgSSBjYW4gaW1hZ2luZSB0aGF0IHRoZXJlIGFyZSB1c2VyIGFnZW50cyB0aGF0IGRvIFVORE9cbiAgICBdLmluZGV4T2Yoa2V5Q29kZSkgPj0gMCB8fCBrZXlDb2RlID09IDkgJiYgIWVtcHR5IC8vICBvdGhlcndpY2UgdGhlcmUgYXJlIG5vIGtleXVwICh0cnVlIGF0IGxlYXN0IGZvciAnOS10YWInKSxcbiAgICApIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8vICcxMy1lbnRlcicgIC0gcHJldmVudGlvbiBhZ2FpbnN0IGZvcm0ncyBkZWZhdWx0IGJ1dHRvbiBcbiAgICAgIC8vIGJ1dCBkb2Vzbid0IGhlbHAgd2l0aCBib290c3JhcCBtb2RhbCBFU0Mgb3IgRU5URVIgKGNsb3NlIGJlaGF2aW91cik7XG4gICAgfVxuXG4gICAgaWYgKFszOCwgNDBdLmluZGV4T2Yoa2V5Q29kZSkgPj0gMCkgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIGlmIChrZXlDb2RlID09IDhcbiAgICAvKmJhY2tzcGFjZSovXG4gICAgKSB7XG4gICAgICAvLyBOT1RFOiB0aGlzIHdpbGwgcHJvY2VzcyBiYWNrc3BhY2Ugb25seSBpZiB0aGVyZSBhcmUgbm8gdGV4dCBpbiB0aGUgaW5wdXQgZmllbGRcbiAgICAgIC8vIElmIHVzZXIgd2lsbCBmaW5kIHRoaXMgaW5jb252aW5pZW50LCB3ZSB3aWxsIG5lZWQgdG8gY2FsY3VsYXRlIHNvbWV0aGluZyBsaWtlIHRoaXNcbiAgICAgIC8vIGxldCBpc0JhY2tzcGFjZUF0U3RhcnRQb2ludCA9ICh0aGlzLmZpbHRlcklucHV0LnNlbGVjdGlvblN0YXJ0ID09IDAgJiYgdGhpcy5maWx0ZXJJbnB1dC5zZWxlY3Rpb25FbmQgPT0gMCk7XG4gICAgICBpZiAoZW1wdHkpIHtcbiAgICAgICAgdmFyIHBpY2sgPSBwaWNrc0xpc3QuZ2V0VGFpbCgpO1xuXG4gICAgICAgIGlmIChwaWNrKSB7XG4gICAgICAgICAgc3BlY2lhbFBpY2tzRXZlbnRzQXNwZWN0LmJhY2tTcGFjZShwaWNrKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gTk9URTogbm8gcHJldmVudERlZmF1bHQgY2FsbGVkIGluIGNhc2Ugb2YgZW1wdHkgZm9yIDktdGFiXG4gICAgZWxzZSBpZiAoa2V5Q29kZSA9PSA5XG4gICAgLyp0YWIqL1xuICAgICkge1xuICAgICAgLy8gTk9URTogbm8ga2V5ZG93biBmb3IgdGhpcyAod2l0aG91dCBwcmV2ZW50RGVmYXVsIGFmdGVyIFRBQiBrZXl1cCBldmVudCB3aWxsIGJlIHRhcmdldGVkIGFub3RoZXIgZWxlbWVudCkgIFxuICAgICAgaWYgKGVtcHR5KSB7XG4gICAgICAgIGhpZGVDaG9pY2VzKCk7IC8vIGhpZGVDaG9pY2VzIGluc2lkZSAoYW5kIG5vIGZpbHRlciByZXNldCBzaW5jZSBpdCBpcyBlbXB0eSkgXG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChrZXlDb2RlID09IDI3XG4gICAgLyplc2MqL1xuICAgICkge1xuICAgICAgLy8gTk9URTogZm9yYmlkIHRoZSBFU0MgdG8gY2xvc2UgdGhlIG1vZGFsIChpbiBjYXNlIHRoZSBub25lbXB0eSBvciBkcm9wZG93biBpcyBvcGVuKVxuICAgICAgaWYgKCFlbXB0eSB8fCBjaG9pY2VzVmlzaWJpbGl0eUFzcGVjdC5pc0Nob2ljZXNWaXNpYmxlKCkpIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PSAzOCkge1xuICAgICAga2V5RG93bkFycm93KGZhbHNlKTsgLy8gdXBcbiAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT0gNDApIHtcbiAgICAgIGtleURvd25BcnJvdyh0cnVlKTsgLy8gZG93blxuICAgIH1cbiAgfTtcblxuICB2YXIgb25LZXlVcCA9IGZ1bmN0aW9uIG9uS2V5VXAoZXZlbnQpIHtcbiAgICB2YXIga2V5Q29kZSA9IGV2ZW50LndoaWNoOyAvL3ZhciBoYW5kbGVyID0ga2V5VXBbZXZlbnQud2hpY2gvKiBrZXkgY29kZSAqL107XG4gICAgLy9oYW5kbGVyKCk7ICAgIFxuXG4gICAgaWYgKGtleUNvZGUgPT0gOSkge1xuICAgICAgaWYgKGNob2ljZXNWaXNpYmlsaXR5QXNwZWN0LmlzQ2hvaWNlc1Zpc2libGUoKSkge1xuICAgICAgICBob3ZlcmVkVG9TZWxlY3RlZCgpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PSAxMykge1xuICAgICAgaWYgKGNob2ljZXNWaXNpYmlsaXR5QXNwZWN0LmlzQ2hvaWNlc1Zpc2libGUoKSkge1xuICAgICAgICBob3ZlcmVkVG9TZWxlY3RlZCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGZpbHRlck1hbmFnZXJBc3BlY3QuZ2V0TmF2aWdhdGVNYW5hZ2VyKCkuZ2V0Q291bnQoKSA+IDApIHtcbiAgICAgICAgICBzaG93Q2hvaWNlcygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChrZXlDb2RlID09IDI3KSB7XG4gICAgICAvLyBlc2NhcGVcbiAgICAgIC8vIGlzIGl0IGFsd2F5cyBlbXB0eSAoYnMgeCBjYW4gc3RpbGwgaXQpIFxuICAgICAgcmVzZXRMYXlvdXRBc3BlY3QucmVzZXRMYXlvdXQoKTtcbiAgICB9XG4gIH07XG5cbiAgZmlsdGVyRG9tLm9uS2V5RG93bihvbktleURvd24pO1xuICBmaWx0ZXJEb20ub25LZXlVcChvbktleVVwKTtcblxuICBpZiAoZGlzYWJsZUNvbXBvbmVudEFzcGVjdCkge1xuICAgIHZhciBvcmlnRGlzYWJsZUNvbXBvbmVudCA9IGRpc2FibGVDb21wb25lbnRBc3BlY3QuZGlzYWJsZUNvbXBvbmVudDtcblxuICAgIGRpc2FibGVDb21wb25lbnRBc3BlY3QuZGlzYWJsZUNvbXBvbmVudCA9IGZ1bmN0aW9uIChpc0NvbXBvbmVudERpc2FibGVkKSB7XG4gICAgICBvcmlnRGlzYWJsZUNvbXBvbmVudChpc0NvbXBvbmVudERpc2FibGVkKTtcbiAgICAgIGlmIChpc0NvbXBvbmVudERpc2FibGVkKSBjb21wb25lbnREaXNhYmxlZEV2ZW50QmluZGVyLnVuYmluZCgpO2Vsc2UgY29tcG9uZW50RGlzYWJsZWRFdmVudEJpbmRlci5iaW5kKHBpY2tzRWxlbWVudCwgXCJjbGlja1wiLCBjbGlja1RvU2hvd0Nob2ljZXMpO1xuICAgIH07XG4gIH1cblxuICByZXNldExheW91dEFzcGVjdC5yZXNldExheW91dCA9IGNvbXBvc2VTeW5jKGhpZGVDaG9pY2VzLCBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHdhcm5pbmdBc3BlY3QpIHdhcm5pbmdBc3BlY3QuaGlkZSgpO1xuICB9LCByZXNldExheW91dEFzcGVjdC5yZXNldExheW91dCAvLyByZXNldEZpbHRlciBieSBkZWZhdWx0XG4gICk7XG4gIHZhciBvcmlnQ3JlYXRlUGlja0hhbmRsZXJzID0gY3JlYXRlUGlja0hhbmRsZXJzQXNwZWN0LmNyZWF0ZVBpY2tIYW5kbGVycztcblxuICBjcmVhdGVQaWNrSGFuZGxlcnNBc3BlY3QuY3JlYXRlUGlja0hhbmRsZXJzID0gZnVuY3Rpb24gKHdyYXApIHtcbiAgICB2YXIgcGlja0hhbmRsZXJzID0gb3JpZ0NyZWF0ZVBpY2tIYW5kbGVycyh3cmFwKTtcbiAgICBwaWNrSGFuZGxlcnMucmVtb3ZlT25CdXR0b24gPSBoYW5kbGVPblJlbW92ZUJ1dHRvbihwaWNrSGFuZGxlcnMucmVtb3ZlT25CdXR0b24pO1xuICAgIHJldHVybiBwaWNrSGFuZGxlcnM7XG4gIH07XG5cbiAgdmFyIG9yaWdCdWlsZENob2ljZSA9IGJ1aWxkQ2hvaWNlQXNwZWN0LmJ1aWxkQ2hvaWNlO1xuXG4gIGJ1aWxkQ2hvaWNlQXNwZWN0LmJ1aWxkQ2hvaWNlID0gZnVuY3Rpb24gKHdyYXApIHtcbiAgICBvcmlnQnVpbGRDaG9pY2Uod3JhcCk7XG4gICAgdmFyIHBpY2tIYW5kbGVycyA9IGNyZWF0ZVBpY2tIYW5kbGVyc0FzcGVjdC5jcmVhdGVQaWNrSGFuZGxlcnMod3JhcCk7XG4gICAgd3JhcC5jaG9pY2UucmVtb3ZlID0gY29tcG9zZVN5bmMod3JhcC5jaG9pY2UucmVtb3ZlLCBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAocGlja0hhbmRsZXJzLnJlbW92ZUFuZERpc3Bvc2UpIHtcbiAgICAgICAgcGlja0hhbmRsZXJzLnJlbW92ZUFuZERpc3Bvc2UoKTtcbiAgICAgICAgcGlja0hhbmRsZXJzLnJlbW92ZUFuZERpc3Bvc2UgPSBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHZhciB1bmJpbmRDaG9pY2VFbGVtZW50ID0gYWRvcHRDaG9pY2VFbGVtZW50KHdyYXApO1xuICAgIHdyYXAuY2hvaWNlLmRpc3Bvc2UgPSBjb21wb3NlU3luYyh1bmJpbmRDaG9pY2VFbGVtZW50LCB3cmFwLmNob2ljZS5kaXNwb3NlKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGRpc3Bvc2U6IGZ1bmN0aW9uIGRpc3Bvc2UoKSB7XG4gICAgICByZXNldE1vdXNlQ2FuZGlkYXRlQ2hvaWNlKCk7XG4gICAgICBwaWNrc0VsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBza2lwb3V0QW5kUmVzZXRNb3VzZWRvd24pO1xuICAgICAgY29tcG9uZW50RGlzYWJsZWRFdmVudEJpbmRlci51bmJpbmQoKTtcbiAgICAgIHBvcC5kaXNwb3NlKCk7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBSZXNldExheW91dEFzcGVjdChyZXNldExheW91dCkge1xuICByZXR1cm4ge1xuICAgIHJlc2V0TGF5b3V0OiByZXNldExheW91dFxuICB9O1xufVxuXG5mdW5jdGlvbiBMb2FkQXNwZWN0KG9wdGlvbnNMb29wQXNwZWN0KSB7XG4gIHJldHVybiB7XG4gICAgbG9hZDogZnVuY3Rpb24gbG9hZCgpIHtcbiAgICAgIC8vIHJlZHJpdmVuIGluIEFwcGVhcmFuY2VQbHVnaW4sIEZvcm1SZXN0b3JlT25CYWNrd2FyZFBsdWdpblxuICAgICAgb3B0aW9uc0xvb3BBc3BlY3QubG9vcCgpO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gQ291bnRhYmxlQ2hvaWNlc0xpc3RJbnNlcnRBc3BlY3QoY291bnRhYmxlQ2hvaWNlc0xpc3QsIHdyYXBzQ29sbGVjdGlvbikge1xuICByZXR1cm4ge1xuICAgIGNvdW50YWJsZUNob2ljZXNMaXN0SW5zZXJ0OiBmdW5jdGlvbiBjb3VudGFibGVDaG9pY2VzTGlzdEluc2VydCh3cmFwLCBrZXkpIHtcbiAgICAgIHZhciBjaG9pY2VOZXh0ID0gd3JhcHNDb2xsZWN0aW9uLmdldE5leHQoa2V5KTtcbiAgICAgIGNvdW50YWJsZUNob2ljZXNMaXN0LmFkZCh3cmFwLCBjaG9pY2VOZXh0KTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIEJzTXVsdGlTZWxlY3QoZWxlbWVudCwgZW52aXJvbm1lbnQsIHBsdWdpbnMsIGNvbmZpZ3VyYXRpb24sIG9uSW5pdCkge1xuICB2YXIgX2V4dGVuZElmVW5kZWZpbmVkO1xuXG4gIHZhciB3aW5kb3cgPSBlbnZpcm9ubWVudC53aW5kb3c7XG4gIGVudmlyb25tZW50LmlzSUUxMSA9ICEhd2luZG93Lk1TSW5wdXRNZXRob2RDb250ZXh0ICYmICEhZG9jdW1lbnQuZG9jdW1lbnRNb2RlO1xuICB2YXIgY29udGFpbmVyQ2xhc3MgPSBjb25maWd1cmF0aW9uLmNvbnRhaW5lckNsYXNzLFxuICAgICAgY3NzID0gY29uZmlndXJhdGlvbi5jc3MsXG4gICAgICBnZXREaXNhYmxlZCA9IGNvbmZpZ3VyYXRpb24uZ2V0RGlzYWJsZWQsXG4gICAgICBvcHRpb25zID0gY29uZmlndXJhdGlvbi5vcHRpb25zLFxuICAgICAgZ2V0VGV4dCA9IGNvbmZpZ3VyYXRpb24uZ2V0VGV4dDtcbiAgdmFyIGRpc3Bvc2VBc3BlY3QgPSB7XG4gICAgZGlzcG9zZTogZnVuY3Rpb24gZGlzcG9zZSgpIHt9XG4gIH07XG4gIHZhciB0cmlnZ2VyQXNwZWN0ID0gVHJpZ2dlckFzcGVjdChlbGVtZW50LCBlbnZpcm9ubWVudC50cmlnZ2VyKTtcbiAgdmFyIG9uQ2hhbmdlQXNwZWN0ID0gT25DaGFuZ2VBc3BlY3QodHJpZ2dlckFzcGVjdCwgJ2Rhc2hib2FyZGNvZGUubXVsdGlzZWxlY3Q6Y2hhbmdlJyk7XG4gIHZhciBjb21wb25lbnRQcm9wZXJ0aWVzQXNwZWN0ID0gQ29tcG9uZW50UHJvcGVydGllc0FzcGVjdChnZXREaXNhYmxlZCAhPSBudWxsID8gZ2V0RGlzYWJsZWQgOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9KTtcbiAgdmFyIG9wdGlvbnNBc3BlY3QgPSBPcHRpb25zQXNwZWN0KG9wdGlvbnMpO1xuICB2YXIgb3B0aW9uUHJvcGVydGllc0FzcGVjdCA9IE9wdGlvblByb3BlcnRpZXNBc3BlY3QoZ2V0VGV4dCk7XG4gIHZhciBpc0Nob2ljZVNlbGVjdGFibGVBc3BlY3QgPSBJc0Nob2ljZVNlbGVjdGFibGVBc3BlY3QoKTtcbiAgdmFyIGNyZWF0ZVdyYXBBc3BlY3QgPSBDcmVhdGVXcmFwQXNwZWN0KCk7XG4gIHZhciBjcmVhdGVDaG9pY2VCYXNlQXNwZWN0ID0gQ3JlYXRlQ2hvaWNlQmFzZUFzcGVjdChvcHRpb25Qcm9wZXJ0aWVzQXNwZWN0KTsgLy9sZXQgcnRsQXNwZWN0ID0gUnRsQXNwZWN0KCk7XG4gIC8vbGV0IHNldE9wdGlvblNlbGVjdGVkQXNwZWN0ID0gU2V0T3B0aW9uU2VsZWN0ZWRBc3BlY3Qob3B0aW9uUHJvcGVydGllc0FzcGVjdCk7XG5cbiAgdmFyIGFkZFBpY2tBc3BlY3QgPSBBZGRQaWNrQXNwZWN0KCk7XG4gIHZhciByZW1vdmVQaWNrQXNwZWN0ID0gUmVtb3ZlUGlja0FzcGVjdCgpO1xuICB2YXIgY3JlYXRlRWxlbWVudEFzcGVjdCA9IENyZWF0ZUVsZW1lbnRBc3BlY3QoZnVuY3Rpb24gKG5hbWUpIHtcbiAgICByZXR1cm4gd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobmFtZSk7XG4gIH0pO1xuICB2YXIgY2hvaWNlc0RvbUZhY3RvcnkgPSBDaG9pY2VzRG9tRmFjdG9yeShjcmVhdGVFbGVtZW50QXNwZWN0KTtcbiAgdmFyIHN0YXRpY0RvbUZhY3RvcnkgPSBTdGF0aWNEb21GYWN0b3J5KGNob2ljZXNEb21GYWN0b3J5LCBjcmVhdGVFbGVtZW50QXNwZWN0KTtcbiAgdmFyIHdyYXBzQ29sbGVjdGlvbiA9IEFycmF5RmFjYWRlKCk7XG4gIHZhciBjb3VudGFibGVDaG9pY2VzTGlzdCA9IERvdWJseUxpbmtlZExpc3QoZnVuY3Rpb24gKHdyYXApIHtcbiAgICByZXR1cm4gd3JhcC5jaG9pY2UuaXRlbVByZXY7XG4gIH0sIGZ1bmN0aW9uICh3YXJwLCB2KSB7XG4gICAgcmV0dXJuIHdhcnAuY2hvaWNlLml0ZW1QcmV2ID0gdjtcbiAgfSwgZnVuY3Rpb24gKHdyYXApIHtcbiAgICByZXR1cm4gd3JhcC5jaG9pY2UuaXRlbU5leHQ7XG4gIH0sIGZ1bmN0aW9uICh3cmFwLCB2KSB7XG4gICAgcmV0dXJuIHdyYXAuY2hvaWNlLml0ZW1OZXh0ID0gdjtcbiAgfSk7XG4gIHZhciBjb3VudGFibGVDaG9pY2VzTGlzdEluc2VydEFzcGVjdCA9IENvdW50YWJsZUNob2ljZXNMaXN0SW5zZXJ0QXNwZWN0KGNvdW50YWJsZUNob2ljZXNMaXN0LCB3cmFwc0NvbGxlY3Rpb24pO1xuICB2YXIgY2hvaWNlc0VudW1lcmFibGVBc3BlY3QgPSBDaG9pY2VzRW51bWVyYWJsZUFzcGVjdChjb3VudGFibGVDaG9pY2VzTGlzdCwgZnVuY3Rpb24gKHdyYXApIHtcbiAgICByZXR1cm4gd3JhcC5jaG9pY2UuaXRlbU5leHQ7XG4gIH0pO1xuICB2YXIgZmlsdGVyZWRDaG9pY2VzTGlzdCA9IERvdWJseUxpbmtlZExpc3QoZnVuY3Rpb24gKHdyYXApIHtcbiAgICByZXR1cm4gd3JhcC5jaG9pY2UuZmlsdGVyZWRQcmV2O1xuICB9LCBmdW5jdGlvbiAod3JhcCwgdikge1xuICAgIHJldHVybiB3cmFwLmNob2ljZS5maWx0ZXJlZFByZXYgPSB2O1xuICB9LCBmdW5jdGlvbiAod3JhcCkge1xuICAgIHJldHVybiB3cmFwLmNob2ljZS5maWx0ZXJlZE5leHQ7XG4gIH0sIGZ1bmN0aW9uICh3cmFwLCB2KSB7XG4gICAgcmV0dXJuIHdyYXAuY2hvaWNlLmZpbHRlcmVkTmV4dCA9IHY7XG4gIH0pO1xuICB2YXIgZW1wdHlOYXZpZ2F0ZU1hbmFnZXIgPSBOYXZpZ2F0ZU1hbmFnZXIoY291bnRhYmxlQ2hvaWNlc0xpc3QsIGZ1bmN0aW9uICh3cmFwKSB7XG4gICAgcmV0dXJuIHdyYXAuY2hvaWNlLml0ZW1QcmV2O1xuICB9LCBmdW5jdGlvbiAod3JhcCkge1xuICAgIHJldHVybiB3cmFwLmNob2ljZS5pdGVtTmV4dDtcbiAgfSk7XG4gIHZhciBmaWx0ZXJlZE5hdmlnYXRlTWFuYWdlciA9IE5hdmlnYXRlTWFuYWdlcihmaWx0ZXJlZENob2ljZXNMaXN0LCBmdW5jdGlvbiAod3JhcCkge1xuICAgIHJldHVybiB3cmFwLmNob2ljZS5maWx0ZXJlZFByZXY7XG4gIH0sIGZ1bmN0aW9uICh3cmFwKSB7XG4gICAgcmV0dXJuIHdyYXAuY2hvaWNlLmZpbHRlcmVkTmV4dDtcbiAgfSk7XG4gIHZhciBmaWx0ZXJQcmVkaWNhdGVBc3BlY3QgPSBGaWx0ZXJQcmVkaWNhdGVBc3BlY3QoKTtcbiAgdmFyIGZpbHRlck1hbmFnZXJBc3BlY3QgPSBGaWx0ZXJNYW5hZ2VyQXNwZWN0KGVtcHR5TmF2aWdhdGVNYW5hZ2VyLCBmaWx0ZXJlZE5hdmlnYXRlTWFuYWdlciwgZmlsdGVyZWRDaG9pY2VzTGlzdCwgY2hvaWNlc0VudW1lcmFibGVBc3BlY3QsIGZpbHRlclByZWRpY2F0ZUFzcGVjdCk7XG4gIHZhciBob3ZlcmVkQ2hvaWNlQXNwZWN0ID0gSG92ZXJlZENob2ljZUFzcGVjdCgpO1xuICB2YXIgbmF2aWdhdGVBc3BlY3QgPSBOYXZpZ2F0ZUFzcGVjdChob3ZlcmVkQ2hvaWNlQXNwZWN0LCBmdW5jdGlvbiAoZG93biwgaG92ZXJlZENob2ljZSkge1xuICAgIHJldHVybiBmaWx0ZXJNYW5hZ2VyQXNwZWN0LmdldE5hdmlnYXRlTWFuYWdlcigpLm5hdmlnYXRlKGRvd24sIGhvdmVyZWRDaG9pY2UpO1xuICB9KTtcbiAgdmFyIHBpY2tzTGlzdCA9IExpc3QoKTtcbiAgdmFyIHdyYXBzID0gV3JhcHMod3JhcHNDb2xsZWN0aW9uLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGNvdW50YWJsZUNob2ljZXNMaXN0LnJlc2V0KCk7XG4gIH0sIGZ1bmN0aW9uICh3KSB7XG4gICAgcmV0dXJuIGNvdW50YWJsZUNob2ljZXNMaXN0LnJlbW92ZSh3KTtcbiAgfSwgZnVuY3Rpb24gKHcsIGtleSkge1xuICAgIHJldHVybiBjb3VudGFibGVDaG9pY2VzTGlzdEluc2VydEFzcGVjdC5jb3VudGFibGVDaG9pY2VzTGlzdEluc2VydCh3LCBrZXkpO1xuICB9KTtcbiAgdmFyIGFzcGVjdHMgPSB7XG4gICAgZW52aXJvbm1lbnQ6IGVudmlyb25tZW50LFxuICAgIGNvbmZpZ3VyYXRpb246IGNvbmZpZ3VyYXRpb24sXG4gICAgdHJpZ2dlckFzcGVjdDogdHJpZ2dlckFzcGVjdCxcbiAgICBvbkNoYW5nZUFzcGVjdDogb25DaGFuZ2VBc3BlY3QsXG4gICAgY29tcG9uZW50UHJvcGVydGllc0FzcGVjdDogY29tcG9uZW50UHJvcGVydGllc0FzcGVjdCxcbiAgICBkaXNwb3NlQXNwZWN0OiBkaXNwb3NlQXNwZWN0LFxuICAgIGNvdW50YWJsZUNob2ljZXNMaXN0OiBjb3VudGFibGVDaG9pY2VzTGlzdCxcbiAgICBjb3VudGFibGVDaG9pY2VzTGlzdEluc2VydEFzcGVjdDogY291bnRhYmxlQ2hvaWNlc0xpc3RJbnNlcnRBc3BlY3QsXG4gICAgb3B0aW9uc0FzcGVjdDogb3B0aW9uc0FzcGVjdCxcbiAgICBvcHRpb25Qcm9wZXJ0aWVzQXNwZWN0OiBvcHRpb25Qcm9wZXJ0aWVzQXNwZWN0LFxuICAgIGNyZWF0ZVdyYXBBc3BlY3Q6IGNyZWF0ZVdyYXBBc3BlY3QsXG4gICAgY3JlYXRlQ2hvaWNlQmFzZUFzcGVjdDogY3JlYXRlQ2hvaWNlQmFzZUFzcGVjdCxcbiAgICBpc0Nob2ljZVNlbGVjdGFibGVBc3BlY3Q6IGlzQ2hvaWNlU2VsZWN0YWJsZUFzcGVjdCxcbiAgICBjcmVhdGVFbGVtZW50QXNwZWN0OiBjcmVhdGVFbGVtZW50QXNwZWN0LFxuICAgIGNob2ljZXNEb21GYWN0b3J5OiBjaG9pY2VzRG9tRmFjdG9yeSxcbiAgICBzdGF0aWNEb21GYWN0b3J5OiBzdGF0aWNEb21GYWN0b3J5LFxuICAgIGZpbHRlclByZWRpY2F0ZUFzcGVjdDogZmlsdGVyUHJlZGljYXRlQXNwZWN0LFxuICAgIHdyYXBzQ29sbGVjdGlvbjogd3JhcHNDb2xsZWN0aW9uLFxuICAgIGNob2ljZXNFbnVtZXJhYmxlQXNwZWN0OiBjaG9pY2VzRW51bWVyYWJsZUFzcGVjdCxcbiAgICBmaWx0ZXJlZENob2ljZXNMaXN0OiBmaWx0ZXJlZENob2ljZXNMaXN0LFxuICAgIGZpbHRlck1hbmFnZXJBc3BlY3Q6IGZpbHRlck1hbmFnZXJBc3BlY3QsXG4gICAgaG92ZXJlZENob2ljZUFzcGVjdDogaG92ZXJlZENob2ljZUFzcGVjdCxcbiAgICBuYXZpZ2F0ZUFzcGVjdDogbmF2aWdhdGVBc3BlY3QsXG4gICAgcGlja3NMaXN0OiBwaWNrc0xpc3QsXG4gICAgd3JhcHM6IHdyYXBzLFxuICAgIGFkZFBpY2tBc3BlY3Q6IGFkZFBpY2tBc3BlY3QsXG4gICAgcmVtb3ZlUGlja0FzcGVjdDogcmVtb3ZlUGlja0FzcGVjdFxuICB9O1xuICBwbHVnU3RhdGljRG9tKHBsdWdpbnMsIGFzcGVjdHMpOyAvLyBhcHBseSBjc3NQYXRjaCB0byBjc3MsIGFwcGx5IHNlbGVjdEVsZW1lbnQgc3VwcG9ydDsgIFxuXG4gIHZhciBfc3RhdGljRG9tRmFjdG9yeSRjcmUgPSBzdGF0aWNEb21GYWN0b3J5LmNyZWF0ZShjc3MpLFxuICAgICAgY2hvaWNlc0RvbSA9IF9zdGF0aWNEb21GYWN0b3J5JGNyZS5jaG9pY2VzRG9tLFxuICAgICAgY3JlYXRlU3RhdGljRG9tID0gX3N0YXRpY0RvbUZhY3RvcnkkY3JlLmNyZWF0ZVN0YXRpY0RvbTtcblxuICB2YXIgX2NyZWF0ZVN0YXRpY0RvbSA9IGNyZWF0ZVN0YXRpY0RvbShlbGVtZW50LCBjb250YWluZXJDbGFzcyksXG4gICAgICBzdGF0aWNEb20gPSBfY3JlYXRlU3RhdGljRG9tLnN0YXRpY0RvbSxcbiAgICAgIHN0YXRpY01hbmFnZXIgPSBfY3JlYXRlU3RhdGljRG9tLnN0YXRpY01hbmFnZXI7IC8vIGFmdGVyIHRoaXMgd2UgY2FuIHVzZSBzdGF0aWNEb20gKG1lYW5zIGdlbmVyYXRlZCBET00gZWxlbWVudHMpIGluIHBsdWdpbiBjb25zdHJ1dGN0b3IsIHdoYXQgc2ltcGxpZmllcyBwYXJhbWV0ZXJzIHBhc3NpbmcgYSBsb3QgICBcbiAgLy8gVEhJTks6IGdldCBmaWx0ZXJEb20sIHBpY2tzRG9tICBmcm9tIGNyZWF0ZVN0YXRpY0RvbSA/ICBCdXQgdGhpcyB3b3VsZCBjcmVhdGUgZXhjZXNpdmUgZHVibGljYXRlIGNhbGwgaW4gIHNlbGVjdEVsZW1lbnRQbHVnaW5cblxuXG4gIHZhciBmaWx0ZXJEb20gPSBGaWx0ZXJEb20oc3RhdGljRG9tLmlzRGlzcG9zYWJsZVBpY2tzRWxlbWVudCwgY3JlYXRlRWxlbWVudEFzcGVjdCwgY3NzKTtcbiAgdmFyIHBpY2tzRG9tID0gUGlja3NEb20oc3RhdGljRG9tLnBpY2tzRWxlbWVudCwgc3RhdGljRG9tLmlzRGlzcG9zYWJsZVBpY2tzRWxlbWVudCwgY3JlYXRlRWxlbWVudEFzcGVjdCwgY3NzKTtcbiAgdmFyIHNwZWNpYWxQaWNrc0V2ZW50c0FzcGVjdCA9IFNwZWNpYWxQaWNrc0V2ZW50c0FzcGVjdCgpO1xuICB2YXIgY2hvaWNlc1Zpc2liaWxpdHlBc3BlY3QgPSBDaG9pY2VzVmlzaWJpbGl0eUFzcGVjdChjaG9pY2VzRG9tLmNob2ljZXNFbGVtZW50KTtcbiAgdmFyIHJlc2V0RmlsdGVyTGlzdEFzcGVjdCA9IFJlc2V0RmlsdGVyTGlzdEFzcGVjdChmaWx0ZXJEb20sIGZpbHRlck1hbmFnZXJBc3BlY3QpO1xuICB2YXIgcmVzZXRGaWx0ZXJBc3BlY3QgPSBSZXNldEZpbHRlckFzcGVjdChmaWx0ZXJEb20sIHJlc2V0RmlsdGVyTGlzdEFzcGVjdCk7XG4gIHZhciBmb2N1c0luQXNwZWN0ID0gRm9jdXNJbkFzcGVjdChwaWNrc0RvbSk7XG4gIHZhciBwaWNrQnV0dG9uQXNwZWN0ID0gUGlja0J1dHRvbkFzcGVjdChjb25maWd1cmF0aW9uLnBpY2tCdXR0b25IVE1MKTtcbiAgdmFyIHBpY2tEb21GYWN0b3J5ID0gUGlja0RvbUZhY3RvcnkoY3NzLCBjb21wb25lbnRQcm9wZXJ0aWVzQXNwZWN0LCBvcHRpb25Qcm9wZXJ0aWVzQXNwZWN0LCBwaWNrQnV0dG9uQXNwZWN0KTtcbiAgdmFyIGJ1aWxkUGlja0FzcGVjdCA9IEJ1aWxkUGlja0FzcGVjdChwaWNrc0RvbSwgcGlja0RvbUZhY3RvcnkpO1xuICB2YXIgcHJvZHVjZVBpY2tBc3BlY3QgPSBQcm9kdWNlUGlja0FzcGVjdChwaWNrc0xpc3QsIHJlbW92ZVBpY2tBc3BlY3QsIGJ1aWxkUGlja0FzcGVjdCk7XG4gIHZhciBjcmVhdGVQaWNrSGFuZGxlcnNBc3BlY3QgPSBDcmVhdGVQaWNrSGFuZGxlcnNBc3BlY3QocHJvZHVjZVBpY2tBc3BlY3QpO1xuICB2YXIgb3B0aW9uVG9nZ2xlQXNwZWN0ID0gT3B0aW9uVG9nZ2xlQXNwZWN0KGNyZWF0ZVBpY2tIYW5kbGVyc0FzcGVjdCwgYWRkUGlja0FzcGVjdCk7XG4gIHZhciBmdWxsTWF0Y2hBc3BlY3QgPSBGdWxsTWF0Y2hBc3BlY3QoY3JlYXRlUGlja0hhbmRsZXJzQXNwZWN0LCBhZGRQaWNrQXNwZWN0KTtcbiAgdmFyIGlucHV0QXNwZWN0ID0gSW5wdXRBc3BlY3QoZmlsdGVyRG9tLCBmaWx0ZXJNYW5hZ2VyQXNwZWN0LCBmdWxsTWF0Y2hBc3BlY3QpO1xuICB2YXIgY2hvaWNlQ2xpY2tBc3BlY3QgPSBDaG9pY2VDbGlja0FzcGVjdChvcHRpb25Ub2dnbGVBc3BlY3QsIGZpbHRlckRvbSk7XG4gIHZhciBjaG9pY2VEb21GYWN0b3J5ID0gQ2hvaWNlRG9tRmFjdG9yeShjc3MsIG9wdGlvblByb3BlcnRpZXNBc3BlY3QsIGFzcGVjdHMuaGlnaGxpZ2h0QXNwZWN0KTsgLy8gb3B0aW9uYWwgaGlnaGxpZ2h0QXNwZWN0IGFkZGVkIGJ5IGhpZ2hsaWdodFBsdWdpblxuXG4gIHZhciBidWlsZENob2ljZUFzcGVjdCA9IEJ1aWxkQ2hvaWNlQXNwZWN0KGNob2ljZXNEb20sIGNob2ljZURvbUZhY3RvcnksIGNob2ljZUNsaWNrQXNwZWN0KTtcbiAgdmFyIGJ1aWxkQW5kQXR0YWNoQ2hvaWNlQXNwZWN0ID0gQnVpbGRBbmRBdHRhY2hDaG9pY2VBc3BlY3QoYnVpbGRDaG9pY2VBc3BlY3QpO1xuICB2YXIgcmVzZXRMYXlvdXRBc3BlY3QgPSBSZXNldExheW91dEFzcGVjdChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHJlc2V0RmlsdGVyQXNwZWN0LnJlc2V0RmlsdGVyKCk7XG4gIH0pO1xuICB2YXIgb3B0aW9uQXR0YWNoQXNwZWN0ID0gT3B0aW9uQXR0YWNoQXNwZWN0KGNyZWF0ZVdyYXBBc3BlY3QsIGNyZWF0ZUNob2ljZUJhc2VBc3BlY3QsIGJ1aWxkQW5kQXR0YWNoQ2hvaWNlQXNwZWN0LCB3cmFwcyk7XG4gIHZhciBvcHRpb25zTG9vcEFzcGVjdCA9IE9wdGlvbnNMb29wQXNwZWN0KG9wdGlvbnNBc3BlY3QsIG9wdGlvbkF0dGFjaEFzcGVjdCk7XG4gIHZhciB1cGRhdGVEYXRhQXNwZWN0ID0gVXBkYXRlRGF0YUFzcGVjdChjaG9pY2VzRG9tLCB3cmFwcywgcGlja3NMaXN0LCBvcHRpb25zTG9vcEFzcGVjdCwgcmVzZXRMYXlvdXRBc3BlY3QpO1xuICB2YXIgdXBkYXRlQXNwZWN0ID0gVXBkYXRlQXNwZWN0KHVwZGF0ZURhdGFBc3BlY3QpO1xuICB2YXIgbG9hZEFzcGVjdCA9IExvYWRBc3BlY3Qob3B0aW9uc0xvb3BBc3BlY3QpO1xuICBleHRlbmRJZlVuZGVmaW5lZChhc3BlY3RzLCAoX2V4dGVuZElmVW5kZWZpbmVkID0ge1xuICAgIHN0YXRpY0RvbTogc3RhdGljRG9tLFxuICAgIHBpY2tzRG9tOiBwaWNrc0RvbSxcbiAgICBjaG9pY2VzRG9tOiBjaG9pY2VzRG9tLFxuICAgIGZpbHRlckRvbTogZmlsdGVyRG9tLFxuICAgIHJlc2V0TGF5b3V0QXNwZWN0OiByZXNldExheW91dEFzcGVjdCxcbiAgICBwaWNrRG9tRmFjdG9yeTogcGlja0RvbUZhY3RvcnksXG4gICAgY2hvaWNlRG9tRmFjdG9yeTogY2hvaWNlRG9tRmFjdG9yeSxcbiAgICBjaG9pY2VzVmlzaWJpbGl0eUFzcGVjdDogY2hvaWNlc1Zpc2liaWxpdHlBc3BlY3QsXG4gICAgc3RhdGljTWFuYWdlcjogc3RhdGljTWFuYWdlcixcbiAgICBidWlsZENob2ljZUFzcGVjdDogYnVpbGRDaG9pY2VBc3BlY3QsXG4gICAgb3B0aW9uVG9nZ2xlQXNwZWN0OiBvcHRpb25Ub2dnbGVBc3BlY3QsXG4gICAgY2hvaWNlQ2xpY2tBc3BlY3Q6IGNob2ljZUNsaWNrQXNwZWN0LFxuICAgIGJ1aWxkQW5kQXR0YWNoQ2hvaWNlQXNwZWN0OiBidWlsZEFuZEF0dGFjaENob2ljZUFzcGVjdCxcbiAgICBvcHRpb25zTG9vcEFzcGVjdDogb3B0aW9uc0xvb3BBc3BlY3QsXG4gICAgb3B0aW9uQXR0YWNoQXNwZWN0OiBvcHRpb25BdHRhY2hBc3BlY3QsXG4gICAgYnVpbGRQaWNrQXNwZWN0OiBidWlsZFBpY2tBc3BlY3QsXG4gICAgcHJvZHVjZVBpY2tBc3BlY3Q6IHByb2R1Y2VQaWNrQXNwZWN0LFxuICAgIGNyZWF0ZVBpY2tIYW5kbGVyc0FzcGVjdDogY3JlYXRlUGlja0hhbmRsZXJzQXNwZWN0LFxuICAgIGlucHV0QXNwZWN0OiBpbnB1dEFzcGVjdCxcbiAgICByZXNldEZpbHRlckxpc3RBc3BlY3Q6IHJlc2V0RmlsdGVyTGlzdEFzcGVjdCxcbiAgICByZXNldEZpbHRlckFzcGVjdDogcmVzZXRGaWx0ZXJBc3BlY3QsXG4gICAgc3BlY2lhbFBpY2tzRXZlbnRzQXNwZWN0OiBzcGVjaWFsUGlja3NFdmVudHNBc3BlY3RcbiAgfSwgX2V4dGVuZElmVW5kZWZpbmVkW1wicmVzZXRMYXlvdXRBc3BlY3RcIl0gPSByZXNldExheW91dEFzcGVjdCwgX2V4dGVuZElmVW5kZWZpbmVkLmZvY3VzSW5Bc3BlY3QgPSBmb2N1c0luQXNwZWN0LCBfZXh0ZW5kSWZVbmRlZmluZWQubG9hZEFzcGVjdCA9IGxvYWRBc3BlY3QsIF9leHRlbmRJZlVuZGVmaW5lZC51cGRhdGVEYXRhQXNwZWN0ID0gdXBkYXRlRGF0YUFzcGVjdCwgX2V4dGVuZElmVW5kZWZpbmVkLnVwZGF0ZUFzcGVjdCA9IHVwZGF0ZUFzcGVjdCwgX2V4dGVuZElmVW5kZWZpbmVkLmZ1bGxNYXRjaEFzcGVjdCA9IGZ1bGxNYXRjaEFzcGVjdCwgX2V4dGVuZElmVW5kZWZpbmVkKSk7XG4gIHZhciBwbHVnaW5NYW5hZ2VyID0gUGx1Z2luTWFuYWdlcihwbHVnaW5zLCBhc3BlY3RzKTtcbiAgdmFyIG11bHRpU2VsZWN0SW5saW5lTGF5b3V0ID0gTXVsdGlTZWxlY3RJbmxpbmVMYXlvdXQoYXNwZWN0cyk7XG4gIHZhciBhcGkgPSB7XG4gICAgY29tcG9uZW50OiBcIkJzTXVsdGlTZWxlY3QuYXBpXCJcbiAgfTsgLy8ga2V5IHRvIHVzZSBpbiBtZW1vcnkgbGVhayBhbmFseXplc1xuXG4gIHBsdWdpbk1hbmFnZXIuYnVpbGRBcGkoYXBpKTsgLy8gYWZ0ZXIgdGhpcyB3ZSBjYW4gcGFzcyBhc3BlY3RzIG1ldGhvZHMgY2FsbCB3aXRob3V0IHdyYXBwaW5nIC0gdGhlcmUgc2hvdWxkIGJlIG5vIG1vcmUgb3ZlcnJpZGluZ3MuIFRPRE8gZnJlZXplIGFzcGVjdHM/XG5cbiAgYXBpLmRpc3Bvc2UgPSBjb21wb3NlU3luYyhyZXNldExheW91dEFzcGVjdC5yZXNldExheW91dCwgZnVuY3Rpb24gKCkge1xuICAgIGRpc3Bvc2VBc3BlY3QuZGlzcG9zZSgpO1xuICB9LCBwbHVnaW5NYW5hZ2VyLmRpc3Bvc2UsIGZ1bmN0aW9uICgpIHtcbiAgICBwaWNrc0xpc3QuZm9yRWFjaChmdW5jdGlvbiAocGljaykge1xuICAgICAgcmV0dXJuIHBpY2suZGlzcG9zZSgpO1xuICAgIH0pO1xuICB9LCBtdWx0aVNlbGVjdElubGluZUxheW91dC5kaXNwb3NlLCAvLyBUT0RPIG1vdmUgdG8gbGF5b3V0XG4gIHdyYXBzLmRpc3Bvc2UsIHN0YXRpY01hbmFnZXIuZGlzcG9zZSwgcGlja3NEb20uZGlzcG9zZSwgZmlsdGVyRG9tLmRpc3Bvc2UpO1xuXG4gIGFwaS51cGRhdGVEYXRhID0gZnVuY3Rpb24gKCkge1xuICAgIHVwZGF0ZURhdGFBc3BlY3QudXBkYXRlRGF0YSgpO1xuICB9O1xuXG4gIGFwaS51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdXBkYXRlQXNwZWN0LnVwZGF0ZSgpO1xuICB9OyAvLyBUT0RPIGFwaS51cGRhdGVPcHRpb24gPSAoa2V5KSA9PiB7LyogYWxsIHVwZGF0ZXM6IHNlbGVjdGVkLCBkaXNhYmxlZCwgaGlkZGVuLCB0ZXh0ICovfVxuXG5cbiAgb25Jbml0ID09IG51bGwgPyB2b2lkIDAgOiBvbkluaXQoYXBpLCBhc3BlY3RzKTtcbiAgcGlja3NEb20ucGlja0ZpbHRlckVsZW1lbnQuYXBwZW5kQ2hpbGQoZmlsdGVyRG9tLmZpbHRlcklucHV0RWxlbWVudCk7XG4gIHBpY2tzRG9tLnBpY2tzRWxlbWVudC5hcHBlbmRDaGlsZChwaWNrc0RvbS5waWNrRmlsdGVyRWxlbWVudCk7XG4gIHN0YXRpY01hbmFnZXIuYXBwZW5kVG9Db250YWluZXIoKTtcbiAgbG9hZEFzcGVjdC5sb2FkKCk7XG4gIHJldHVybiBhcGk7XG59XG5cbnZhciB0cmFuc2Zvcm1TdHlsZXMgPSBbe1xuICBvbGQ6ICdzZWxlY3RlZFBhbmVsRGlzYWJsZWRCYWNrZ3JvdW5kQ29sb3InLFxuICBvcHQ6ICdwaWNrc19kaXNhYmxlZCcsXG4gIHN0eWxlOiBcImJhY2tncm91bmRDb2xvclwiXG59LCB7XG4gIG9sZDogJ3NlbGVjdGVkUGFuZWxGb2N1c1ZhbGlkQm94U2hhZG93JyxcbiAgb3B0OiAncGlja3NfZm9jdXNfdmFsaWQnLFxuICBzdHlsZTogXCJib3hTaGFkb3dcIlxufSwge1xuICBvbGQ6ICdzZWxlY3RlZFBhbmVsRm9jdXNJbnZhbGlkQm94U2hhZG93JyxcbiAgb3B0OiAncGlja3NfZm9jdXNfaW52YWxpZCcsXG4gIHN0eWxlOiBcImJveFNoYWRvd1wiXG59LCB7XG4gIG9sZDogJ3NlbGVjdGVkUGFuZWxEZWZNaW5IZWlnaHQnLFxuICBvcHQ6ICdwaWNrc19kZWYnLFxuICBzdHlsZTogXCJtaW5IZWlnaHRcIlxufSwge1xuICBvbGQ6ICdzZWxlY3RlZFBhbmVsTGdNaW5IZWlnaHQnLFxuICBvcHQ6ICdwaWNrc19sZycsXG4gIHN0eWxlOiBcIm1pbkhlaWdodFwiXG59LCB7XG4gIG9sZDogJ3NlbGVjdGVkUGFuZWxTbU1pbkhlaWdodCcsXG4gIG9wdDogJ3BpY2tzX3NtJyxcbiAgc3R5bGU6IFwibWluSGVpZ2h0XCJcbn0sIHtcbiAgb2xkOiAnc2VsZWN0ZWRJdGVtQ29udGVudERpc2FibGVkT3BhY2l0eScsXG4gIG9wdDogJ2Nob2ljZUxhYmVsX2Rpc2FibGVkJyxcbiAgc3R5bGU6IFwib3BhY2l0eVwiXG59XTtcbnZhciB0cmFuc2Zvcm1DbGFzc2VzID0gW3tcbiAgb2xkOiAnZHJvcERvd25NZW51Q2xhc3MnLFxuICBvcHQ6ICdjaG9pY2VzJ1xufSwge1xuICBvbGQ6ICdkcm9wRG93bkl0ZW1DbGFzcycsXG4gIG9wdDogJ2Nob2ljZSdcbn0sIHtcbiAgb2xkOiAnZHJvcERvd25JdGVtSG92ZXJDbGFzcycsXG4gIG9wdDogJ2Nob2ljZV9ob3Zlcidcbn0sIHtcbiAgb2xkOiAnc2VsZWN0ZWRQYW5lbENsYXNzJyxcbiAgb3B0OiAncGlja3MnXG59LCB7XG4gIG9sZDogJ3NlbGVjdGVkSXRlbUNsYXNzJyxcbiAgb3B0OiAncGljaydcbn0sIHtcbiAgb2xkOiAncmVtb3ZlU2VsZWN0ZWRJdGVtQnV0dG9uQ2xhc3MnLFxuICBvcHQ6ICdwaWNrQnV0dG9uJ1xufSwge1xuICBvbGQ6ICdmaWx0ZXJJbnB1dEl0ZW1DbGFzcycsXG4gIG9wdDogJ3BpY2tGaWx0ZXInXG59LCB7XG4gIG9sZDogJ2ZpbHRlcklucHV0Q2xhc3MnLFxuICBvcHQ6ICdmaWx0ZXJJbnB1dCdcbn0sIHtcbiAgb2xkOiAnc2VsZWN0ZWRQYW5lbEZvY3VzQ2xhc3MnLFxuICBvcHQ6ICdwaWNrc19mb2N1cydcbn0sIHtcbiAgb2xkOiAnc2VsZWN0ZWRQYW5lbERpc2FibGVkQ2xhc3MnLFxuICBvcHQ6ICdwaWNrc19kaXNhYmxlZCdcbn0sIHtcbiAgb2xkOiAnc2VsZWN0ZWRJdGVtQ29udGVudERpc2FibGVkQ2xhc3MnLFxuICBvcHQ6ICdwaWNrX2Rpc2FibGVkJ1xufV07XG5mdW5jdGlvbiBhZGp1c3RMZWdhY3lTZXR0aW5ncyhzZXR0aW5ncykge1xuICBpZiAoIXNldHRpbmdzLmNzcykgc2V0dGluZ3MuY3NzID0ge307XG4gIHZhciBjc3MgPSBzZXR0aW5ncy5jc3M7XG4gIGlmICghc2V0dGluZ3MuY3NzUGF0Y2gpIHNldHRpbmdzLmNzc1BhdGNoID0ge307XG4gIHZhciBjc3NQYXRjaCA9IHNldHRpbmdzLmNzc1BhdGNoO1xuXG4gIGlmIChzZXR0aW5ncy5zZWxlY3RlZFBhbmVsRm9jdXNCb3JkZXJDb2xvciB8fCBzZXR0aW5ncy5zZWxlY3RlZFBhbmVsRm9jdXNCb3hTaGFkb3cpIHtcbiAgICBjb25zb2xlLmxvZyhcIkRhc2hib2FyQ29kZS5Cc011bHRpU2VsZWN0OiBzZWxlY3RlZFBhbmVsRm9jdXNCb3JkZXJDb2xvciBhbmQgc2VsZWN0ZWRQYW5lbEZvY3VzQm94U2hhZG93IGFyZSBkZXByaWNhdGVkLCB1c2UgLSBjc3NQYXRjaDp7cGlja3NfZm9jdXM6e2JvcmRlckNvbG9yOidteVZhbHVlJywgYm94U2hhZG93OidteVZhbHVlJ319XCIpO1xuXG4gICAgaWYgKCFjc3NQYXRjaC5waWNrc19mb2N1cykge1xuICAgICAgY3NzUGF0Y2gucGlja3NfZm9jdXMgPSB7XG4gICAgICAgIGJveFNoYWRvdzogc2V0dGluZ3Muc2VsZWN0ZWRQYW5lbEZvY3VzQm94U2hhZG93LFxuICAgICAgICBib3JkZXJDb2xvcjogc2V0dGluZ3Muc2VsZWN0ZWRQYW5lbEZvY3VzQm9yZGVyQ29sb3JcbiAgICAgIH07XG4gICAgfVxuXG4gICAgZGVsZXRlIHNldHRpbmdzLnNlbGVjdGVkUGFuZWxGb2N1c0JvcmRlckNvbG9yO1xuICAgIGRlbGV0ZSBzZXR0aW5ncy5zZWxlY3RlZFBhbmVsRm9jdXNCb3hTaGFkb3c7XG4gIH1cblxuICB0cmFuc2Zvcm1TdHlsZXMuZm9yRWFjaChmdW5jdGlvbiAoaSkge1xuICAgIGlmIChzZXR0aW5nc1tpLm9sZF0pIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiRGFzaGJvYXJDb2RlLkJzTXVsdGlTZWxlY3Q6IFwiICsgaS5vbGQgKyBcIiBpcyBkZXByaWNhdGVkLCB1c2UgLSBjc3NQYXRjaDp7XCIgKyBpLm9wdCArIFwiOntcIiArIGkuc3R5bGUgKyBcIjonbXlWYWx1ZSd9fVwiKTtcblxuICAgICAgaWYgKCFzZXR0aW5nc1tpLm9wdF0pIHtcbiAgICAgICAgdmFyIG9wdCA9IHt9O1xuICAgICAgICBvcHRbaS5zdHlsZV0gPSBzZXR0aW5nc1tpLm9sZF07XG4gICAgICAgIHNldHRpbmdzLmNzc1BhdGNoW2kub3B0XSA9IG9wdDtcbiAgICAgIH1cblxuICAgICAgZGVsZXRlIHNldHRpbmdzW2kub2xkXTtcbiAgICB9XG4gIH0pO1xuICB0cmFuc2Zvcm1DbGFzc2VzLmZvckVhY2goZnVuY3Rpb24gKGkpIHtcbiAgICBpZiAoc2V0dGluZ3NbaS5vbGRdKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIkRhc2hib2FyQ29kZS5Cc011bHRpU2VsZWN0OiBcIiArIGkub2xkICsgXCIgaXMgZGVwcmljYXRlZCwgdXNlIC0gY3NzOntcIiArIGkub3B0ICsgXCI6J215VmFsdWUnfVwiKTtcblxuICAgICAgaWYgKCFjc3NbaS5vcHRdKSB7XG4gICAgICAgIGNzc1tpLm9wdF0gPSBzZXR0aW5nc1tpLm9sZF07XG4gICAgICB9XG5cbiAgICAgIGRlbGV0ZSBzZXR0aW5nc1tpLm9sZF07XG4gICAgfVxuICB9KTtcblxuICBpZiAoc2V0dGluZ3MuaW5wdXRDb2xvcikge1xuICAgIGNvbnNvbGUubG9nKFwiRGFzaGJvYXJDb2RlLkJzTXVsdGlTZWxlY3Q6IGlucHV0Q29sb3IgaXMgZGVwcmljYXRlZCwgcmVtb3ZlIHBhcmFtZXRlclwiKTtcbiAgICBkZWxldGUgc2V0dGluZ3MuaW5wdXRDb2xvcjtcbiAgfVxuXG4gIGlmIChzZXR0aW5ncy51c2VDc3MpIHtcbiAgICBjb25zb2xlLmxvZyhcIkRhc2hib2FyQ29kZS5Cc011bHRpU2VsZWN0OiB1c2VDc3MoPXRydWUpIGlzIGRlcHJpY2F0ZWQsIHVzZSAtICd1c2VDc3NQYXRjaDogZmFsc2UnXCIpO1xuXG4gICAgaWYgKCFjc3MucGlja19kaXNhYmxlZCkge1xuICAgICAgc2V0dGluZ3MudXNlQ3NzUGF0Y2ggPSAhc2V0dGluZ3MudXNlQ3NzO1xuICAgIH1cblxuICAgIGRlbGV0ZSBzZXR0aW5ncy51c2VDc3M7XG4gIH1cblxuICBpZiAoc2V0dGluZ3MuZ2V0SXNWYWxpZCB8fCBzZXR0aW5ncy5nZXRJc0luVmFsaWQpIHtcbiAgICB0aHJvdyBcIkRhc2hib2FyQ29kZS5Cc011bHRpU2VsZWN0OiBwYXJhbWV0ZXJzIGdldElzVmFsaWQgYW5kIGdldElzSW5WYWxpZCBhcmUgZGVwcmljYXRlZCBhbmQgcmVtb3ZlZCwgdXNlIC0gZ2V0VmFsaWRpdHkgdGhhdCBzaG91bGQgcmV0dXJuICh0cnVlfGZhbHNlfG51bGwpIFwiO1xuICB9XG59XG5cbmZ1bmN0aW9uIE11bHRpU2VsZWN0QnVpbGRlcihlbnZpcm9ubWVudCwgcGx1Z2lucykge1xuICB2YXIgZGVmYXVsdHMgPSB7XG4gICAgY29udGFpbmVyQ2xhc3M6IFwiZGFzaGJvYXJkY29kZS1ic211bHRpc2VsZWN0XCJcbiAgfTtcblxuICB2YXIgY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB2YXIgX29wdGlvbnMyO1xuXG4gICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5wbHVnaW5zKSBjb25zb2xlLmxvZyhcIkRhc2hib2FyQ29kZS5Cc011bHRpU2VsZWN0OiAnb3B0aW9ucy5wbHVnaW5zJyBpcyBkZXByaWNhdGVkLCB1c2UgLSBNdWx0aVNlbGVjdEJ1aWxkZXIoZW52aXJvbm1lbnQsIHBsdWdpbnMpIGluc3RlYWRcIik7XG4gICAgdmFyIGNvbmZpZ3VyYXRpb24gPSB7fTtcbiAgICB2YXIgYnVpbGRDb25maWd1cmF0aW9uO1xuXG4gICAgaWYgKG9wdGlvbnMgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgYnVpbGRDb25maWd1cmF0aW9uID0gb3B0aW9ucztcbiAgICAgIG9wdGlvbnMgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgX29wdGlvbnM7XG5cbiAgICAgIGJ1aWxkQ29uZmlndXJhdGlvbiA9IChfb3B0aW9ucyA9IG9wdGlvbnMpID09IG51bGwgPyB2b2lkIDAgOiBfb3B0aW9ucy5idWlsZENvbmZpZ3VyYXRpb247XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgIGFkanVzdExlZ2FjeVNldHRpbmdzKG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGNvbmZpZ3VyYXRpb24uY3NzID0gY3JlYXRlQ3NzKGRlZmF1bHRzLmNzcywgKF9vcHRpb25zMiA9IG9wdGlvbnMpID09IG51bGwgPyB2b2lkIDAgOiBfb3B0aW9uczIuY3NzKTtcbiAgICBwbHVnTWVyZ2VTZXR0aW5ncyhwbHVnaW5zLCBjb25maWd1cmF0aW9uLCBkZWZhdWx0cywgb3B0aW9ucyk7IC8vIG1lcmdlIHNldHRpbmdzLmNzc1BhdGNoIGFuZCBkZWZhdWx0cy5jc3NQYXRjaFxuXG4gICAgZXh0ZW5kSWZVbmRlZmluZWQoY29uZmlndXJhdGlvbiwgb3B0aW9ucyk7XG4gICAgZXh0ZW5kSWZVbmRlZmluZWQoY29uZmlndXJhdGlvbiwgZGVmYXVsdHMpO1xuICAgIHZhciBvbkluaXQgPSBidWlsZENvbmZpZ3VyYXRpb24gPT0gbnVsbCA/IHZvaWQgMCA6IGJ1aWxkQ29uZmlndXJhdGlvbihlbGVtZW50LCBjb25maWd1cmF0aW9uKTsgLy8gVE9ETzogY29uZmlndXJhdGlvbiBzaG91bGQgYmVjb21lIGFuIGFzcGVjdFxuXG4gICAgdmFyIG11bHRpU2VsZWN0ID0gQnNNdWx0aVNlbGVjdChlbGVtZW50LCBlbnZpcm9ubWVudCwgcGx1Z2lucywgY29uZmlndXJhdGlvbiwgb25Jbml0KTsgLy8gb25Jbml0KGFwaSwgYXNwZWN0cykgLSBiZWZvcmUgbG9hZCBkYXRhXG5cbiAgICByZXR1cm4gbXVsdGlTZWxlY3Q7XG4gIH07XG5cbiAgcGx1Z0RlZmF1bHRDb25maWcocGx1Z2lucywgZGVmYXVsdHMpO1xuICByZXR1cm4ge1xuICAgIGNyZWF0ZTogY3JlYXRlLFxuICAgIGRlZmF1bHRTZXR0aW5nczogZGVmYXVsdHNcbiAgfTtcbn1cblxuZnVuY3Rpb24gTW9kdWxlRmFjdG9yeShlbnZpcm9ubWVudCkge1xuICBpZiAoIWVudmlyb25tZW50LnRyaWdnZXIpIGVudmlyb25tZW50LnRyaWdnZXIgPSBmdW5jdGlvbiAoZSwgbmFtZSkge1xuICAgIHJldHVybiBlLmRpc3BhdGNoRXZlbnQobmV3IGVudmlyb25tZW50LndpbmRvdy5FdmVudChuYW1lKSk7XG4gIH07XG4gIHZhciBwbHVnaW5zQXJyYXkgPSBPYmplY3RWYWx1ZXMoc2hhbGxvd0NsZWFyQ2xvbmUoe1xuICAgIEJzNVBsdWdpbjogQnM1UGx1Z2luXG4gIH0sIGRlZmF1bHRQbHVnaW5zKSk7XG5cbiAgdmFyIF9NdWx0aVNlbGVjdEJ1aWxkZXIgPSBNdWx0aVNlbGVjdEJ1aWxkZXIoZW52aXJvbm1lbnQsIHBsdWdpbnNBcnJheSksXG4gICAgICBCc011bHRpU2VsZWN0ID0gX011bHRpU2VsZWN0QnVpbGRlci5jcmVhdGUsXG4gICAgICBCc011bHRpU2VsZWN0RGVmYXVsdCA9IF9NdWx0aVNlbGVjdEJ1aWxkZXIuQnNNdWx0aVNlbGVjdERlZmF1bHQ7XG5cbiAgQnNNdWx0aVNlbGVjdC5EZWZhdWx0ID0gQnNNdWx0aVNlbGVjdERlZmF1bHQ7XG4gIHZhciBwaWNrc1BsdWdpbnNBcnJheSA9IE9iamVjdFZhbHVlcyhzaGFsbG93Q2xlYXJDbG9uZSh7XG4gICAgQnM1UGx1Z2luOiBCczVQbHVnaW5cbiAgfSwgcGlja3NQbHVnaW5zKSk7XG5cbiAgdmFyIF9NdWx0aVNlbGVjdEJ1aWxkZXIyID0gTXVsdGlTZWxlY3RCdWlsZGVyKGVudmlyb25tZW50LCBwaWNrc1BsdWdpbnNBcnJheSksXG4gICAgICBCc1BpY2tzID0gX011bHRpU2VsZWN0QnVpbGRlcjIuY3JlYXRlLFxuICAgICAgQnNQaWNrc0RlZmF1bHQgPSBfTXVsdGlTZWxlY3RCdWlsZGVyMi5Cc1BpY2tzRGVmYXVsdDtcblxuICBCc1BpY2tzLkRlZmF1bHQgPSBCc1BpY2tzRGVmYXVsdDtcbiAgcmV0dXJuIHtcbiAgICBCc011bHRpU2VsZWN0OiBCc011bHRpU2VsZWN0LFxuICAgIEJzUGlja3M6IEJzUGlja3MsXG4gICAgTXVsdGlTZWxlY3RUb29sczoge1xuICAgICAgTXVsdGlTZWxlY3RCdWlsZGVyOiBNdWx0aVNlbGVjdEJ1aWxkZXIsXG4gICAgICBwbHVnaW5zOiBzaGFsbG93Q2xlYXJDbG9uZSh7XG4gICAgICAgIEJzNVBsdWdpbjogQnM1UGx1Z2luXG4gICAgICB9LCBhbGxQbHVnaW5zKSxcbiAgICAgIHV0aWxpdGllczogdXRpbGl0aWVzXG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBsZWdhY3lDb25zdHJ1Y3RvcihlbGVtZW50LCBlbnZpcm9ubWVudCwgc2V0dGluZ3MpIHtcbiAgY29uc29sZS5sb2coXCJEYXNoYm9hckNvZGUuQnNNdWx0aVNlbGVjdDogJ0JzTXVsdGlTZWxlY3QnIGlzIGRlcHJpY2F0ZWQsIHVzZSAtIE1vZHVsZUZhY3RvcnkoZW52aXJvbm1lbnQpLkJzTXVsdGlTZWxlY3QoZWxlbWVudCwgc2V0dGluZ3MpXCIpO1xuXG4gIHZhciBfTW9kdWxlRmFjdG9yeSA9IE1vZHVsZUZhY3RvcnkoZW52aXJvbm1lbnQpLFxuICAgICAgQnNNdWx0aVNlbGVjdCA9IF9Nb2R1bGVGYWN0b3J5LkJzTXVsdGlTZWxlY3Q7XG5cbiAgdmFyIGJzTXVsdGlTZWxlY3QgPSBCc011bHRpU2VsZWN0KGVsZW1lbnQsIHNldHRpbmdzKTtcbiAgcmV0dXJuIGJzTXVsdGlTZWxlY3Q7XG59XG5cbmV4cG9ydCB7IGxlZ2FjeUNvbnN0cnVjdG9yIGFzIEJzTXVsdGlTZWxlY3QsIE1vZHVsZUZhY3RvcnkgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUJzTXVsdGlTZWxlY3QuZXNtLmpzLm1hcFxuIiwiaW1wb3J0IGdldENvbXBvc2l0ZVJlY3QgZnJvbSBcIi4vZG9tLXV0aWxzL2dldENvbXBvc2l0ZVJlY3QuanNcIjtcbmltcG9ydCBnZXRMYXlvdXRSZWN0IGZyb20gXCIuL2RvbS11dGlscy9nZXRMYXlvdXRSZWN0LmpzXCI7XG5pbXBvcnQgbGlzdFNjcm9sbFBhcmVudHMgZnJvbSBcIi4vZG9tLXV0aWxzL2xpc3RTY3JvbGxQYXJlbnRzLmpzXCI7XG5pbXBvcnQgZ2V0T2Zmc2V0UGFyZW50IGZyb20gXCIuL2RvbS11dGlscy9nZXRPZmZzZXRQYXJlbnQuanNcIjtcbmltcG9ydCBnZXRDb21wdXRlZFN0eWxlIGZyb20gXCIuL2RvbS11dGlscy9nZXRDb21wdXRlZFN0eWxlLmpzXCI7XG5pbXBvcnQgb3JkZXJNb2RpZmllcnMgZnJvbSBcIi4vdXRpbHMvb3JkZXJNb2RpZmllcnMuanNcIjtcbmltcG9ydCBkZWJvdW5jZSBmcm9tIFwiLi91dGlscy9kZWJvdW5jZS5qc1wiO1xuaW1wb3J0IHZhbGlkYXRlTW9kaWZpZXJzIGZyb20gXCIuL3V0aWxzL3ZhbGlkYXRlTW9kaWZpZXJzLmpzXCI7XG5pbXBvcnQgdW5pcXVlQnkgZnJvbSBcIi4vdXRpbHMvdW5pcXVlQnkuanNcIjtcbmltcG9ydCBnZXRCYXNlUGxhY2VtZW50IGZyb20gXCIuL3V0aWxzL2dldEJhc2VQbGFjZW1lbnQuanNcIjtcbmltcG9ydCBtZXJnZUJ5TmFtZSBmcm9tIFwiLi91dGlscy9tZXJnZUJ5TmFtZS5qc1wiO1xuaW1wb3J0IGRldGVjdE92ZXJmbG93IGZyb20gXCIuL3V0aWxzL2RldGVjdE92ZXJmbG93LmpzXCI7XG5pbXBvcnQgeyBpc0VsZW1lbnQgfSBmcm9tIFwiLi9kb20tdXRpbHMvaW5zdGFuY2VPZi5qc1wiO1xuaW1wb3J0IHsgYXV0byB9IGZyb20gXCIuL2VudW1zLmpzXCI7XG52YXIgSU5WQUxJRF9FTEVNRU5UX0VSUk9SID0gJ1BvcHBlcjogSW52YWxpZCByZWZlcmVuY2Ugb3IgcG9wcGVyIGFyZ3VtZW50IHByb3ZpZGVkLiBUaGV5IG11c3QgYmUgZWl0aGVyIGEgRE9NIGVsZW1lbnQgb3IgdmlydHVhbCBlbGVtZW50Lic7XG52YXIgSU5GSU5JVEVfTE9PUF9FUlJPUiA9ICdQb3BwZXI6IEFuIGluZmluaXRlIGxvb3AgaW4gdGhlIG1vZGlmaWVycyBjeWNsZSBoYXMgYmVlbiBkZXRlY3RlZCEgVGhlIGN5Y2xlIGhhcyBiZWVuIGludGVycnVwdGVkIHRvIHByZXZlbnQgYSBicm93c2VyIGNyYXNoLic7XG52YXIgREVGQVVMVF9PUFRJT05TID0ge1xuICBwbGFjZW1lbnQ6ICdib3R0b20nLFxuICBtb2RpZmllcnM6IFtdLFxuICBzdHJhdGVneTogJ2Fic29sdXRlJ1xufTtcblxuZnVuY3Rpb24gYXJlVmFsaWRFbGVtZW50cygpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIHJldHVybiAhYXJncy5zb21lKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgcmV0dXJuICEoZWxlbWVudCAmJiB0eXBlb2YgZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QgPT09ICdmdW5jdGlvbicpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBvcHBlckdlbmVyYXRvcihnZW5lcmF0b3JPcHRpb25zKSB7XG4gIGlmIChnZW5lcmF0b3JPcHRpb25zID09PSB2b2lkIDApIHtcbiAgICBnZW5lcmF0b3JPcHRpb25zID0ge307XG4gIH1cblxuICB2YXIgX2dlbmVyYXRvck9wdGlvbnMgPSBnZW5lcmF0b3JPcHRpb25zLFxuICAgICAgX2dlbmVyYXRvck9wdGlvbnMkZGVmID0gX2dlbmVyYXRvck9wdGlvbnMuZGVmYXVsdE1vZGlmaWVycyxcbiAgICAgIGRlZmF1bHRNb2RpZmllcnMgPSBfZ2VuZXJhdG9yT3B0aW9ucyRkZWYgPT09IHZvaWQgMCA/IFtdIDogX2dlbmVyYXRvck9wdGlvbnMkZGVmLFxuICAgICAgX2dlbmVyYXRvck9wdGlvbnMkZGVmMiA9IF9nZW5lcmF0b3JPcHRpb25zLmRlZmF1bHRPcHRpb25zLFxuICAgICAgZGVmYXVsdE9wdGlvbnMgPSBfZ2VuZXJhdG9yT3B0aW9ucyRkZWYyID09PSB2b2lkIDAgPyBERUZBVUxUX09QVElPTlMgOiBfZ2VuZXJhdG9yT3B0aW9ucyRkZWYyO1xuICByZXR1cm4gZnVuY3Rpb24gY3JlYXRlUG9wcGVyKHJlZmVyZW5jZSwgcG9wcGVyLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkge1xuICAgICAgb3B0aW9ucyA9IGRlZmF1bHRPcHRpb25zO1xuICAgIH1cblxuICAgIHZhciBzdGF0ZSA9IHtcbiAgICAgIHBsYWNlbWVudDogJ2JvdHRvbScsXG4gICAgICBvcmRlcmVkTW9kaWZpZXJzOiBbXSxcbiAgICAgIG9wdGlvbnM6IE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfT1BUSU9OUywgZGVmYXVsdE9wdGlvbnMpLFxuICAgICAgbW9kaWZpZXJzRGF0YToge30sXG4gICAgICBlbGVtZW50czoge1xuICAgICAgICByZWZlcmVuY2U6IHJlZmVyZW5jZSxcbiAgICAgICAgcG9wcGVyOiBwb3BwZXJcbiAgICAgIH0sXG4gICAgICBhdHRyaWJ1dGVzOiB7fSxcbiAgICAgIHN0eWxlczoge31cbiAgICB9O1xuICAgIHZhciBlZmZlY3RDbGVhbnVwRm5zID0gW107XG4gICAgdmFyIGlzRGVzdHJveWVkID0gZmFsc2U7XG4gICAgdmFyIGluc3RhbmNlID0ge1xuICAgICAgc3RhdGU6IHN0YXRlLFxuICAgICAgc2V0T3B0aW9uczogZnVuY3Rpb24gc2V0T3B0aW9ucyhzZXRPcHRpb25zQWN0aW9uKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gdHlwZW9mIHNldE9wdGlvbnNBY3Rpb24gPT09ICdmdW5jdGlvbicgPyBzZXRPcHRpb25zQWN0aW9uKHN0YXRlLm9wdGlvbnMpIDogc2V0T3B0aW9uc0FjdGlvbjtcbiAgICAgICAgY2xlYW51cE1vZGlmaWVyRWZmZWN0cygpO1xuICAgICAgICBzdGF0ZS5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdE9wdGlvbnMsIHN0YXRlLm9wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgICBzdGF0ZS5zY3JvbGxQYXJlbnRzID0ge1xuICAgICAgICAgIHJlZmVyZW5jZTogaXNFbGVtZW50KHJlZmVyZW5jZSkgPyBsaXN0U2Nyb2xsUGFyZW50cyhyZWZlcmVuY2UpIDogcmVmZXJlbmNlLmNvbnRleHRFbGVtZW50ID8gbGlzdFNjcm9sbFBhcmVudHMocmVmZXJlbmNlLmNvbnRleHRFbGVtZW50KSA6IFtdLFxuICAgICAgICAgIHBvcHBlcjogbGlzdFNjcm9sbFBhcmVudHMocG9wcGVyKVxuICAgICAgICB9OyAvLyBPcmRlcnMgdGhlIG1vZGlmaWVycyBiYXNlZCBvbiB0aGVpciBkZXBlbmRlbmNpZXMgYW5kIGBwaGFzZWBcbiAgICAgICAgLy8gcHJvcGVydGllc1xuXG4gICAgICAgIHZhciBvcmRlcmVkTW9kaWZpZXJzID0gb3JkZXJNb2RpZmllcnMobWVyZ2VCeU5hbWUoW10uY29uY2F0KGRlZmF1bHRNb2RpZmllcnMsIHN0YXRlLm9wdGlvbnMubW9kaWZpZXJzKSkpOyAvLyBTdHJpcCBvdXQgZGlzYWJsZWQgbW9kaWZpZXJzXG5cbiAgICAgICAgc3RhdGUub3JkZXJlZE1vZGlmaWVycyA9IG9yZGVyZWRNb2RpZmllcnMuZmlsdGVyKGZ1bmN0aW9uIChtKSB7XG4gICAgICAgICAgcmV0dXJuIG0uZW5hYmxlZDtcbiAgICAgICAgfSk7IC8vIFZhbGlkYXRlIHRoZSBwcm92aWRlZCBtb2RpZmllcnMgc28gdGhhdCB0aGUgY29uc3VtZXIgd2lsbCBnZXQgd2FybmVkXG4gICAgICAgIC8vIGlmIG9uZSBvZiB0aGUgbW9kaWZpZXJzIGlzIGludmFsaWQgZm9yIGFueSByZWFzb25cblxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgICAgdmFyIG1vZGlmaWVycyA9IHVuaXF1ZUJ5KFtdLmNvbmNhdChvcmRlcmVkTW9kaWZpZXJzLCBzdGF0ZS5vcHRpb25zLm1vZGlmaWVycyksIGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgICAgICAgICB2YXIgbmFtZSA9IF9yZWYubmFtZTtcbiAgICAgICAgICAgIHJldHVybiBuYW1lO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHZhbGlkYXRlTW9kaWZpZXJzKG1vZGlmaWVycyk7XG5cbiAgICAgICAgICBpZiAoZ2V0QmFzZVBsYWNlbWVudChzdGF0ZS5vcHRpb25zLnBsYWNlbWVudCkgPT09IGF1dG8pIHtcbiAgICAgICAgICAgIHZhciBmbGlwTW9kaWZpZXIgPSBzdGF0ZS5vcmRlcmVkTW9kaWZpZXJzLmZpbmQoZnVuY3Rpb24gKF9yZWYyKSB7XG4gICAgICAgICAgICAgIHZhciBuYW1lID0gX3JlZjIubmFtZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5hbWUgPT09ICdmbGlwJztcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoIWZsaXBNb2RpZmllcikge1xuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFsnUG9wcGVyOiBcImF1dG9cIiBwbGFjZW1lbnRzIHJlcXVpcmUgdGhlIFwiZmxpcFwiIG1vZGlmaWVyIGJlJywgJ3ByZXNlbnQgYW5kIGVuYWJsZWQgdG8gd29yay4nXS5qb2luKCcgJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBfZ2V0Q29tcHV0ZWRTdHlsZSA9IGdldENvbXB1dGVkU3R5bGUocG9wcGVyKSxcbiAgICAgICAgICAgICAgbWFyZ2luVG9wID0gX2dldENvbXB1dGVkU3R5bGUubWFyZ2luVG9wLFxuICAgICAgICAgICAgICBtYXJnaW5SaWdodCA9IF9nZXRDb21wdXRlZFN0eWxlLm1hcmdpblJpZ2h0LFxuICAgICAgICAgICAgICBtYXJnaW5Cb3R0b20gPSBfZ2V0Q29tcHV0ZWRTdHlsZS5tYXJnaW5Cb3R0b20sXG4gICAgICAgICAgICAgIG1hcmdpbkxlZnQgPSBfZ2V0Q29tcHV0ZWRTdHlsZS5tYXJnaW5MZWZ0OyAvLyBXZSBubyBsb25nZXIgdGFrZSBpbnRvIGFjY291bnQgYG1hcmdpbnNgIG9uIHRoZSBwb3BwZXIsIGFuZCBpdCBjYW5cbiAgICAgICAgICAvLyBjYXVzZSBidWdzIHdpdGggcG9zaXRpb25pbmcsIHNvIHdlJ2xsIHdhcm4gdGhlIGNvbnN1bWVyXG5cblxuICAgICAgICAgIGlmIChbbWFyZ2luVG9wLCBtYXJnaW5SaWdodCwgbWFyZ2luQm90dG9tLCBtYXJnaW5MZWZ0XS5zb21lKGZ1bmN0aW9uIChtYXJnaW4pIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0KG1hcmdpbik7XG4gICAgICAgICAgfSkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihbJ1BvcHBlcjogQ1NTIFwibWFyZ2luXCIgc3R5bGVzIGNhbm5vdCBiZSB1c2VkIHRvIGFwcGx5IHBhZGRpbmcnLCAnYmV0d2VlbiB0aGUgcG9wcGVyIGFuZCBpdHMgcmVmZXJlbmNlIGVsZW1lbnQgb3IgYm91bmRhcnkuJywgJ1RvIHJlcGxpY2F0ZSBtYXJnaW4sIHVzZSB0aGUgYG9mZnNldGAgbW9kaWZpZXIsIGFzIHdlbGwgYXMnLCAndGhlIGBwYWRkaW5nYCBvcHRpb24gaW4gdGhlIGBwcmV2ZW50T3ZlcmZsb3dgIGFuZCBgZmxpcGAnLCAnbW9kaWZpZXJzLiddLmpvaW4oJyAnKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcnVuTW9kaWZpZXJFZmZlY3RzKCk7XG4gICAgICAgIHJldHVybiBpbnN0YW5jZS51cGRhdGUoKTtcbiAgICAgIH0sXG4gICAgICAvLyBTeW5jIHVwZGF0ZSDigJMgaXQgd2lsbCBhbHdheXMgYmUgZXhlY3V0ZWQsIGV2ZW4gaWYgbm90IG5lY2Vzc2FyeS4gVGhpc1xuICAgICAgLy8gaXMgdXNlZnVsIGZvciBsb3cgZnJlcXVlbmN5IHVwZGF0ZXMgd2hlcmUgc3luYyBiZWhhdmlvciBzaW1wbGlmaWVzIHRoZVxuICAgICAgLy8gbG9naWMuXG4gICAgICAvLyBGb3IgaGlnaCBmcmVxdWVuY3kgdXBkYXRlcyAoZS5nLiBgcmVzaXplYCBhbmQgYHNjcm9sbGAgZXZlbnRzKSwgYWx3YXlzXG4gICAgICAvLyBwcmVmZXIgdGhlIGFzeW5jIFBvcHBlciN1cGRhdGUgbWV0aG9kXG4gICAgICBmb3JjZVVwZGF0ZTogZnVuY3Rpb24gZm9yY2VVcGRhdGUoKSB7XG4gICAgICAgIGlmIChpc0Rlc3Ryb3llZCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBfc3RhdGUkZWxlbWVudHMgPSBzdGF0ZS5lbGVtZW50cyxcbiAgICAgICAgICAgIHJlZmVyZW5jZSA9IF9zdGF0ZSRlbGVtZW50cy5yZWZlcmVuY2UsXG4gICAgICAgICAgICBwb3BwZXIgPSBfc3RhdGUkZWxlbWVudHMucG9wcGVyOyAvLyBEb24ndCBwcm9jZWVkIGlmIGByZWZlcmVuY2VgIG9yIGBwb3BwZXJgIGFyZSBub3QgdmFsaWQgZWxlbWVudHNcbiAgICAgICAgLy8gYW55bW9yZVxuXG4gICAgICAgIGlmICghYXJlVmFsaWRFbGVtZW50cyhyZWZlcmVuY2UsIHBvcHBlcikpIHtcbiAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKElOVkFMSURfRUxFTUVOVF9FUlJPUik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IC8vIFN0b3JlIHRoZSByZWZlcmVuY2UgYW5kIHBvcHBlciByZWN0cyB0byBiZSByZWFkIGJ5IG1vZGlmaWVyc1xuXG5cbiAgICAgICAgc3RhdGUucmVjdHMgPSB7XG4gICAgICAgICAgcmVmZXJlbmNlOiBnZXRDb21wb3NpdGVSZWN0KHJlZmVyZW5jZSwgZ2V0T2Zmc2V0UGFyZW50KHBvcHBlciksIHN0YXRlLm9wdGlvbnMuc3RyYXRlZ3kgPT09ICdmaXhlZCcpLFxuICAgICAgICAgIHBvcHBlcjogZ2V0TGF5b3V0UmVjdChwb3BwZXIpXG4gICAgICAgIH07IC8vIE1vZGlmaWVycyBoYXZlIHRoZSBhYmlsaXR5IHRvIHJlc2V0IHRoZSBjdXJyZW50IHVwZGF0ZSBjeWNsZS4gVGhlXG4gICAgICAgIC8vIG1vc3QgY29tbW9uIHVzZSBjYXNlIGZvciB0aGlzIGlzIHRoZSBgZmxpcGAgbW9kaWZpZXIgY2hhbmdpbmcgdGhlXG4gICAgICAgIC8vIHBsYWNlbWVudCwgd2hpY2ggdGhlbiBuZWVkcyB0byByZS1ydW4gYWxsIHRoZSBtb2RpZmllcnMsIGJlY2F1c2UgdGhlXG4gICAgICAgIC8vIGxvZ2ljIHdhcyBwcmV2aW91c2x5IHJhbiBmb3IgdGhlIHByZXZpb3VzIHBsYWNlbWVudCBhbmQgaXMgdGhlcmVmb3JlXG4gICAgICAgIC8vIHN0YWxlL2luY29ycmVjdFxuXG4gICAgICAgIHN0YXRlLnJlc2V0ID0gZmFsc2U7XG4gICAgICAgIHN0YXRlLnBsYWNlbWVudCA9IHN0YXRlLm9wdGlvbnMucGxhY2VtZW50OyAvLyBPbiBlYWNoIHVwZGF0ZSBjeWNsZSwgdGhlIGBtb2RpZmllcnNEYXRhYCBwcm9wZXJ0eSBmb3IgZWFjaCBtb2RpZmllclxuICAgICAgICAvLyBpcyBmaWxsZWQgd2l0aCB0aGUgaW5pdGlhbCBkYXRhIHNwZWNpZmllZCBieSB0aGUgbW9kaWZpZXIuIFRoaXMgbWVhbnNcbiAgICAgICAgLy8gaXQgZG9lc24ndCBwZXJzaXN0IGFuZCBpcyBmcmVzaCBvbiBlYWNoIHVwZGF0ZS5cbiAgICAgICAgLy8gVG8gZW5zdXJlIHBlcnNpc3RlbnQgZGF0YSwgdXNlIGAke25hbWV9I3BlcnNpc3RlbnRgXG5cbiAgICAgICAgc3RhdGUub3JkZXJlZE1vZGlmaWVycy5mb3JFYWNoKGZ1bmN0aW9uIChtb2RpZmllcikge1xuICAgICAgICAgIHJldHVybiBzdGF0ZS5tb2RpZmllcnNEYXRhW21vZGlmaWVyLm5hbWVdID0gT2JqZWN0LmFzc2lnbih7fSwgbW9kaWZpZXIuZGF0YSk7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgX19kZWJ1Z19sb29wc19fID0gMDtcblxuICAgICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgc3RhdGUub3JkZXJlZE1vZGlmaWVycy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgICAgICBfX2RlYnVnX2xvb3BzX18gKz0gMTtcblxuICAgICAgICAgICAgaWYgKF9fZGVidWdfbG9vcHNfXyA+IDEwMCkge1xuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKElORklOSVRFX0xPT1BfRVJST1IpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc3RhdGUucmVzZXQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHN0YXRlLnJlc2V0ID0gZmFsc2U7XG4gICAgICAgICAgICBpbmRleCA9IC0xO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIF9zdGF0ZSRvcmRlcmVkTW9kaWZpZSA9IHN0YXRlLm9yZGVyZWRNb2RpZmllcnNbaW5kZXhdLFxuICAgICAgICAgICAgICBmbiA9IF9zdGF0ZSRvcmRlcmVkTW9kaWZpZS5mbixcbiAgICAgICAgICAgICAgX3N0YXRlJG9yZGVyZWRNb2RpZmllMiA9IF9zdGF0ZSRvcmRlcmVkTW9kaWZpZS5vcHRpb25zLFxuICAgICAgICAgICAgICBfb3B0aW9ucyA9IF9zdGF0ZSRvcmRlcmVkTW9kaWZpZTIgPT09IHZvaWQgMCA/IHt9IDogX3N0YXRlJG9yZGVyZWRNb2RpZmllMixcbiAgICAgICAgICAgICAgbmFtZSA9IF9zdGF0ZSRvcmRlcmVkTW9kaWZpZS5uYW1lO1xuXG4gICAgICAgICAgaWYgKHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgc3RhdGUgPSBmbih7XG4gICAgICAgICAgICAgIHN0YXRlOiBzdGF0ZSxcbiAgICAgICAgICAgICAgb3B0aW9uczogX29wdGlvbnMsXG4gICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgIGluc3RhbmNlOiBpbnN0YW5jZVxuICAgICAgICAgICAgfSkgfHwgc3RhdGU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgLy8gQXN5bmMgYW5kIG9wdGltaXN0aWNhbGx5IG9wdGltaXplZCB1cGRhdGUg4oCTIGl0IHdpbGwgbm90IGJlIGV4ZWN1dGVkIGlmXG4gICAgICAvLyBub3QgbmVjZXNzYXJ5IChkZWJvdW5jZWQgdG8gcnVuIGF0IG1vc3Qgb25jZS1wZXItdGljaylcbiAgICAgIHVwZGF0ZTogZGVib3VuY2UoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgICBpbnN0YW5jZS5mb3JjZVVwZGF0ZSgpO1xuICAgICAgICAgIHJlc29sdmUoc3RhdGUpO1xuICAgICAgICB9KTtcbiAgICAgIH0pLFxuICAgICAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgICAgY2xlYW51cE1vZGlmaWVyRWZmZWN0cygpO1xuICAgICAgICBpc0Rlc3Ryb3llZCA9IHRydWU7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmICghYXJlVmFsaWRFbGVtZW50cyhyZWZlcmVuY2UsIHBvcHBlcikpIHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihJTlZBTElEX0VMRU1FTlRfRVJST1IpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgfVxuXG4gICAgaW5zdGFuY2Uuc2V0T3B0aW9ucyhvcHRpb25zKS50aGVuKGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgICAgaWYgKCFpc0Rlc3Ryb3llZCAmJiBvcHRpb25zLm9uRmlyc3RVcGRhdGUpIHtcbiAgICAgICAgb3B0aW9ucy5vbkZpcnN0VXBkYXRlKHN0YXRlKTtcbiAgICAgIH1cbiAgICB9KTsgLy8gTW9kaWZpZXJzIGhhdmUgdGhlIGFiaWxpdHkgdG8gZXhlY3V0ZSBhcmJpdHJhcnkgY29kZSBiZWZvcmUgdGhlIGZpcnN0XG4gICAgLy8gdXBkYXRlIGN5Y2xlIHJ1bnMuIFRoZXkgd2lsbCBiZSBleGVjdXRlZCBpbiB0aGUgc2FtZSBvcmRlciBhcyB0aGUgdXBkYXRlXG4gICAgLy8gY3ljbGUuIFRoaXMgaXMgdXNlZnVsIHdoZW4gYSBtb2RpZmllciBhZGRzIHNvbWUgcGVyc2lzdGVudCBkYXRhIHRoYXRcbiAgICAvLyBvdGhlciBtb2RpZmllcnMgbmVlZCB0byB1c2UsIGJ1dCB0aGUgbW9kaWZpZXIgaXMgcnVuIGFmdGVyIHRoZSBkZXBlbmRlbnRcbiAgICAvLyBvbmUuXG5cbiAgICBmdW5jdGlvbiBydW5Nb2RpZmllckVmZmVjdHMoKSB7XG4gICAgICBzdGF0ZS5vcmRlcmVkTW9kaWZpZXJzLmZvckVhY2goZnVuY3Rpb24gKF9yZWYzKSB7XG4gICAgICAgIHZhciBuYW1lID0gX3JlZjMubmFtZSxcbiAgICAgICAgICAgIF9yZWYzJG9wdGlvbnMgPSBfcmVmMy5vcHRpb25zLFxuICAgICAgICAgICAgb3B0aW9ucyA9IF9yZWYzJG9wdGlvbnMgPT09IHZvaWQgMCA/IHt9IDogX3JlZjMkb3B0aW9ucyxcbiAgICAgICAgICAgIGVmZmVjdCA9IF9yZWYzLmVmZmVjdDtcblxuICAgICAgICBpZiAodHlwZW9mIGVmZmVjdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHZhciBjbGVhbnVwRm4gPSBlZmZlY3Qoe1xuICAgICAgICAgICAgc3RhdGU6IHN0YXRlLFxuICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgIGluc3RhbmNlOiBpbnN0YW5jZSxcbiAgICAgICAgICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHZhciBub29wRm4gPSBmdW5jdGlvbiBub29wRm4oKSB7fTtcblxuICAgICAgICAgIGVmZmVjdENsZWFudXBGbnMucHVzaChjbGVhbnVwRm4gfHwgbm9vcEZuKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYW51cE1vZGlmaWVyRWZmZWN0cygpIHtcbiAgICAgIGVmZmVjdENsZWFudXBGbnMuZm9yRWFjaChmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgcmV0dXJuIGZuKCk7XG4gICAgICB9KTtcbiAgICAgIGVmZmVjdENsZWFudXBGbnMgPSBbXTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH07XG59XG5leHBvcnQgdmFyIGNyZWF0ZVBvcHBlciA9IC8qI19fUFVSRV9fKi9wb3BwZXJHZW5lcmF0b3IoKTsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5leHBvcnQgeyBkZXRlY3RPdmVyZmxvdyB9OyIsImltcG9ydCB7IGlzU2hhZG93Um9vdCB9IGZyb20gXCIuL2luc3RhbmNlT2YuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnRhaW5zKHBhcmVudCwgY2hpbGQpIHtcbiAgdmFyIHJvb3ROb2RlID0gY2hpbGQuZ2V0Um9vdE5vZGUgJiYgY2hpbGQuZ2V0Um9vdE5vZGUoKTsgLy8gRmlyc3QsIGF0dGVtcHQgd2l0aCBmYXN0ZXIgbmF0aXZlIG1ldGhvZFxuXG4gIGlmIChwYXJlbnQuY29udGFpbnMoY2hpbGQpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gLy8gdGhlbiBmYWxsYmFjayB0byBjdXN0b20gaW1wbGVtZW50YXRpb24gd2l0aCBTaGFkb3cgRE9NIHN1cHBvcnRcbiAgZWxzZSBpZiAocm9vdE5vZGUgJiYgaXNTaGFkb3dSb290KHJvb3ROb2RlKSkge1xuICAgICAgdmFyIG5leHQgPSBjaGlsZDtcblxuICAgICAgZG8ge1xuICAgICAgICBpZiAobmV4dCAmJiBwYXJlbnQuaXNTYW1lTm9kZShuZXh0KSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IC8vICRGbG93Rml4TWVbcHJvcC1taXNzaW5nXTogbmVlZCBhIGJldHRlciB3YXkgdG8gaGFuZGxlIHRoaXMuLi5cblxuXG4gICAgICAgIG5leHQgPSBuZXh0LnBhcmVudE5vZGUgfHwgbmV4dC5ob3N0O1xuICAgICAgfSB3aGlsZSAobmV4dCk7XG4gICAgfSAvLyBHaXZlIHVwLCB0aGUgcmVzdWx0IGlzIGZhbHNlXG5cblxuICByZXR1cm4gZmFsc2U7XG59IiwiaW1wb3J0IHsgaXNFbGVtZW50LCBpc0hUTUxFbGVtZW50IH0gZnJvbSBcIi4vaW5zdGFuY2VPZi5qc1wiO1xuaW1wb3J0IHsgcm91bmQgfSBmcm9tIFwiLi4vdXRpbHMvbWF0aC5qc1wiO1xuaW1wb3J0IGdldFdpbmRvdyBmcm9tIFwiLi9nZXRXaW5kb3cuanNcIjtcbmltcG9ydCBpc0xheW91dFZpZXdwb3J0IGZyb20gXCIuL2lzTGF5b3V0Vmlld3BvcnQuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldEJvdW5kaW5nQ2xpZW50UmVjdChlbGVtZW50LCBpbmNsdWRlU2NhbGUsIGlzRml4ZWRTdHJhdGVneSkge1xuICBpZiAoaW5jbHVkZVNjYWxlID09PSB2b2lkIDApIHtcbiAgICBpbmNsdWRlU2NhbGUgPSBmYWxzZTtcbiAgfVxuXG4gIGlmIChpc0ZpeGVkU3RyYXRlZ3kgPT09IHZvaWQgMCkge1xuICAgIGlzRml4ZWRTdHJhdGVneSA9IGZhbHNlO1xuICB9XG5cbiAgdmFyIGNsaWVudFJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICB2YXIgc2NhbGVYID0gMTtcbiAgdmFyIHNjYWxlWSA9IDE7XG5cbiAgaWYgKGluY2x1ZGVTY2FsZSAmJiBpc0hUTUxFbGVtZW50KGVsZW1lbnQpKSB7XG4gICAgc2NhbGVYID0gZWxlbWVudC5vZmZzZXRXaWR0aCA+IDAgPyByb3VuZChjbGllbnRSZWN0LndpZHRoKSAvIGVsZW1lbnQub2Zmc2V0V2lkdGggfHwgMSA6IDE7XG4gICAgc2NhbGVZID0gZWxlbWVudC5vZmZzZXRIZWlnaHQgPiAwID8gcm91bmQoY2xpZW50UmVjdC5oZWlnaHQpIC8gZWxlbWVudC5vZmZzZXRIZWlnaHQgfHwgMSA6IDE7XG4gIH1cblxuICB2YXIgX3JlZiA9IGlzRWxlbWVudChlbGVtZW50KSA/IGdldFdpbmRvdyhlbGVtZW50KSA6IHdpbmRvdyxcbiAgICAgIHZpc3VhbFZpZXdwb3J0ID0gX3JlZi52aXN1YWxWaWV3cG9ydDtcblxuICB2YXIgYWRkVmlzdWFsT2Zmc2V0cyA9ICFpc0xheW91dFZpZXdwb3J0KCkgJiYgaXNGaXhlZFN0cmF0ZWd5O1xuICB2YXIgeCA9IChjbGllbnRSZWN0LmxlZnQgKyAoYWRkVmlzdWFsT2Zmc2V0cyAmJiB2aXN1YWxWaWV3cG9ydCA/IHZpc3VhbFZpZXdwb3J0Lm9mZnNldExlZnQgOiAwKSkgLyBzY2FsZVg7XG4gIHZhciB5ID0gKGNsaWVudFJlY3QudG9wICsgKGFkZFZpc3VhbE9mZnNldHMgJiYgdmlzdWFsVmlld3BvcnQgPyB2aXN1YWxWaWV3cG9ydC5vZmZzZXRUb3AgOiAwKSkgLyBzY2FsZVk7XG4gIHZhciB3aWR0aCA9IGNsaWVudFJlY3Qud2lkdGggLyBzY2FsZVg7XG4gIHZhciBoZWlnaHQgPSBjbGllbnRSZWN0LmhlaWdodCAvIHNjYWxlWTtcbiAgcmV0dXJuIHtcbiAgICB3aWR0aDogd2lkdGgsXG4gICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgdG9wOiB5LFxuICAgIHJpZ2h0OiB4ICsgd2lkdGgsXG4gICAgYm90dG9tOiB5ICsgaGVpZ2h0LFxuICAgIGxlZnQ6IHgsXG4gICAgeDogeCxcbiAgICB5OiB5XG4gIH07XG59IiwiaW1wb3J0IHsgdmlld3BvcnQgfSBmcm9tIFwiLi4vZW51bXMuanNcIjtcbmltcG9ydCBnZXRWaWV3cG9ydFJlY3QgZnJvbSBcIi4vZ2V0Vmlld3BvcnRSZWN0LmpzXCI7XG5pbXBvcnQgZ2V0RG9jdW1lbnRSZWN0IGZyb20gXCIuL2dldERvY3VtZW50UmVjdC5qc1wiO1xuaW1wb3J0IGxpc3RTY3JvbGxQYXJlbnRzIGZyb20gXCIuL2xpc3RTY3JvbGxQYXJlbnRzLmpzXCI7XG5pbXBvcnQgZ2V0T2Zmc2V0UGFyZW50IGZyb20gXCIuL2dldE9mZnNldFBhcmVudC5qc1wiO1xuaW1wb3J0IGdldERvY3VtZW50RWxlbWVudCBmcm9tIFwiLi9nZXREb2N1bWVudEVsZW1lbnQuanNcIjtcbmltcG9ydCBnZXRDb21wdXRlZFN0eWxlIGZyb20gXCIuL2dldENvbXB1dGVkU3R5bGUuanNcIjtcbmltcG9ydCB7IGlzRWxlbWVudCwgaXNIVE1MRWxlbWVudCB9IGZyb20gXCIuL2luc3RhbmNlT2YuanNcIjtcbmltcG9ydCBnZXRCb3VuZGluZ0NsaWVudFJlY3QgZnJvbSBcIi4vZ2V0Qm91bmRpbmdDbGllbnRSZWN0LmpzXCI7XG5pbXBvcnQgZ2V0UGFyZW50Tm9kZSBmcm9tIFwiLi9nZXRQYXJlbnROb2RlLmpzXCI7XG5pbXBvcnQgY29udGFpbnMgZnJvbSBcIi4vY29udGFpbnMuanNcIjtcbmltcG9ydCBnZXROb2RlTmFtZSBmcm9tIFwiLi9nZXROb2RlTmFtZS5qc1wiO1xuaW1wb3J0IHJlY3RUb0NsaWVudFJlY3QgZnJvbSBcIi4uL3V0aWxzL3JlY3RUb0NsaWVudFJlY3QuanNcIjtcbmltcG9ydCB7IG1heCwgbWluIH0gZnJvbSBcIi4uL3V0aWxzL21hdGguanNcIjtcblxuZnVuY3Rpb24gZ2V0SW5uZXJCb3VuZGluZ0NsaWVudFJlY3QoZWxlbWVudCwgc3RyYXRlZ3kpIHtcbiAgdmFyIHJlY3QgPSBnZXRCb3VuZGluZ0NsaWVudFJlY3QoZWxlbWVudCwgZmFsc2UsIHN0cmF0ZWd5ID09PSAnZml4ZWQnKTtcbiAgcmVjdC50b3AgPSByZWN0LnRvcCArIGVsZW1lbnQuY2xpZW50VG9wO1xuICByZWN0LmxlZnQgPSByZWN0LmxlZnQgKyBlbGVtZW50LmNsaWVudExlZnQ7XG4gIHJlY3QuYm90dG9tID0gcmVjdC50b3AgKyBlbGVtZW50LmNsaWVudEhlaWdodDtcbiAgcmVjdC5yaWdodCA9IHJlY3QubGVmdCArIGVsZW1lbnQuY2xpZW50V2lkdGg7XG4gIHJlY3Qud2lkdGggPSBlbGVtZW50LmNsaWVudFdpZHRoO1xuICByZWN0LmhlaWdodCA9IGVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICByZWN0LnggPSByZWN0LmxlZnQ7XG4gIHJlY3QueSA9IHJlY3QudG9wO1xuICByZXR1cm4gcmVjdDtcbn1cblxuZnVuY3Rpb24gZ2V0Q2xpZW50UmVjdEZyb21NaXhlZFR5cGUoZWxlbWVudCwgY2xpcHBpbmdQYXJlbnQsIHN0cmF0ZWd5KSB7XG4gIHJldHVybiBjbGlwcGluZ1BhcmVudCA9PT0gdmlld3BvcnQgPyByZWN0VG9DbGllbnRSZWN0KGdldFZpZXdwb3J0UmVjdChlbGVtZW50LCBzdHJhdGVneSkpIDogaXNFbGVtZW50KGNsaXBwaW5nUGFyZW50KSA/IGdldElubmVyQm91bmRpbmdDbGllbnRSZWN0KGNsaXBwaW5nUGFyZW50LCBzdHJhdGVneSkgOiByZWN0VG9DbGllbnRSZWN0KGdldERvY3VtZW50UmVjdChnZXREb2N1bWVudEVsZW1lbnQoZWxlbWVudCkpKTtcbn0gLy8gQSBcImNsaXBwaW5nIHBhcmVudFwiIGlzIGFuIG92ZXJmbG93YWJsZSBjb250YWluZXIgd2l0aCB0aGUgY2hhcmFjdGVyaXN0aWMgb2Zcbi8vIGNsaXBwaW5nIChvciBoaWRpbmcpIG92ZXJmbG93aW5nIGVsZW1lbnRzIHdpdGggYSBwb3NpdGlvbiBkaWZmZXJlbnQgZnJvbVxuLy8gYGluaXRpYWxgXG5cblxuZnVuY3Rpb24gZ2V0Q2xpcHBpbmdQYXJlbnRzKGVsZW1lbnQpIHtcbiAgdmFyIGNsaXBwaW5nUGFyZW50cyA9IGxpc3RTY3JvbGxQYXJlbnRzKGdldFBhcmVudE5vZGUoZWxlbWVudCkpO1xuICB2YXIgY2FuRXNjYXBlQ2xpcHBpbmcgPSBbJ2Fic29sdXRlJywgJ2ZpeGVkJ10uaW5kZXhPZihnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLnBvc2l0aW9uKSA+PSAwO1xuICB2YXIgY2xpcHBlckVsZW1lbnQgPSBjYW5Fc2NhcGVDbGlwcGluZyAmJiBpc0hUTUxFbGVtZW50KGVsZW1lbnQpID8gZ2V0T2Zmc2V0UGFyZW50KGVsZW1lbnQpIDogZWxlbWVudDtcblxuICBpZiAoIWlzRWxlbWVudChjbGlwcGVyRWxlbWVudCkpIHtcbiAgICByZXR1cm4gW107XG4gIH0gLy8gJEZsb3dGaXhNZVtpbmNvbXBhdGlibGUtcmV0dXJuXTogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL2Zsb3cvaXNzdWVzLzE0MTRcblxuXG4gIHJldHVybiBjbGlwcGluZ1BhcmVudHMuZmlsdGVyKGZ1bmN0aW9uIChjbGlwcGluZ1BhcmVudCkge1xuICAgIHJldHVybiBpc0VsZW1lbnQoY2xpcHBpbmdQYXJlbnQpICYmIGNvbnRhaW5zKGNsaXBwaW5nUGFyZW50LCBjbGlwcGVyRWxlbWVudCkgJiYgZ2V0Tm9kZU5hbWUoY2xpcHBpbmdQYXJlbnQpICE9PSAnYm9keSc7XG4gIH0pO1xufSAvLyBHZXRzIHRoZSBtYXhpbXVtIGFyZWEgdGhhdCB0aGUgZWxlbWVudCBpcyB2aXNpYmxlIGluIGR1ZSB0byBhbnkgbnVtYmVyIG9mXG4vLyBjbGlwcGluZyBwYXJlbnRzXG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0Q2xpcHBpbmdSZWN0KGVsZW1lbnQsIGJvdW5kYXJ5LCByb290Qm91bmRhcnksIHN0cmF0ZWd5KSB7XG4gIHZhciBtYWluQ2xpcHBpbmdQYXJlbnRzID0gYm91bmRhcnkgPT09ICdjbGlwcGluZ1BhcmVudHMnID8gZ2V0Q2xpcHBpbmdQYXJlbnRzKGVsZW1lbnQpIDogW10uY29uY2F0KGJvdW5kYXJ5KTtcbiAgdmFyIGNsaXBwaW5nUGFyZW50cyA9IFtdLmNvbmNhdChtYWluQ2xpcHBpbmdQYXJlbnRzLCBbcm9vdEJvdW5kYXJ5XSk7XG4gIHZhciBmaXJzdENsaXBwaW5nUGFyZW50ID0gY2xpcHBpbmdQYXJlbnRzWzBdO1xuICB2YXIgY2xpcHBpbmdSZWN0ID0gY2xpcHBpbmdQYXJlbnRzLnJlZHVjZShmdW5jdGlvbiAoYWNjUmVjdCwgY2xpcHBpbmdQYXJlbnQpIHtcbiAgICB2YXIgcmVjdCA9IGdldENsaWVudFJlY3RGcm9tTWl4ZWRUeXBlKGVsZW1lbnQsIGNsaXBwaW5nUGFyZW50LCBzdHJhdGVneSk7XG4gICAgYWNjUmVjdC50b3AgPSBtYXgocmVjdC50b3AsIGFjY1JlY3QudG9wKTtcbiAgICBhY2NSZWN0LnJpZ2h0ID0gbWluKHJlY3QucmlnaHQsIGFjY1JlY3QucmlnaHQpO1xuICAgIGFjY1JlY3QuYm90dG9tID0gbWluKHJlY3QuYm90dG9tLCBhY2NSZWN0LmJvdHRvbSk7XG4gICAgYWNjUmVjdC5sZWZ0ID0gbWF4KHJlY3QubGVmdCwgYWNjUmVjdC5sZWZ0KTtcbiAgICByZXR1cm4gYWNjUmVjdDtcbiAgfSwgZ2V0Q2xpZW50UmVjdEZyb21NaXhlZFR5cGUoZWxlbWVudCwgZmlyc3RDbGlwcGluZ1BhcmVudCwgc3RyYXRlZ3kpKTtcbiAgY2xpcHBpbmdSZWN0LndpZHRoID0gY2xpcHBpbmdSZWN0LnJpZ2h0IC0gY2xpcHBpbmdSZWN0LmxlZnQ7XG4gIGNsaXBwaW5nUmVjdC5oZWlnaHQgPSBjbGlwcGluZ1JlY3QuYm90dG9tIC0gY2xpcHBpbmdSZWN0LnRvcDtcbiAgY2xpcHBpbmdSZWN0LnggPSBjbGlwcGluZ1JlY3QubGVmdDtcbiAgY2xpcHBpbmdSZWN0LnkgPSBjbGlwcGluZ1JlY3QudG9wO1xuICByZXR1cm4gY2xpcHBpbmdSZWN0O1xufSIsImltcG9ydCBnZXRCb3VuZGluZ0NsaWVudFJlY3QgZnJvbSBcIi4vZ2V0Qm91bmRpbmdDbGllbnRSZWN0LmpzXCI7XG5pbXBvcnQgZ2V0Tm9kZVNjcm9sbCBmcm9tIFwiLi9nZXROb2RlU2Nyb2xsLmpzXCI7XG5pbXBvcnQgZ2V0Tm9kZU5hbWUgZnJvbSBcIi4vZ2V0Tm9kZU5hbWUuanNcIjtcbmltcG9ydCB7IGlzSFRNTEVsZW1lbnQgfSBmcm9tIFwiLi9pbnN0YW5jZU9mLmpzXCI7XG5pbXBvcnQgZ2V0V2luZG93U2Nyb2xsQmFyWCBmcm9tIFwiLi9nZXRXaW5kb3dTY3JvbGxCYXJYLmpzXCI7XG5pbXBvcnQgZ2V0RG9jdW1lbnRFbGVtZW50IGZyb20gXCIuL2dldERvY3VtZW50RWxlbWVudC5qc1wiO1xuaW1wb3J0IGlzU2Nyb2xsUGFyZW50IGZyb20gXCIuL2lzU2Nyb2xsUGFyZW50LmpzXCI7XG5pbXBvcnQgeyByb3VuZCB9IGZyb20gXCIuLi91dGlscy9tYXRoLmpzXCI7XG5cbmZ1bmN0aW9uIGlzRWxlbWVudFNjYWxlZChlbGVtZW50KSB7XG4gIHZhciByZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgdmFyIHNjYWxlWCA9IHJvdW5kKHJlY3Qud2lkdGgpIC8gZWxlbWVudC5vZmZzZXRXaWR0aCB8fCAxO1xuICB2YXIgc2NhbGVZID0gcm91bmQocmVjdC5oZWlnaHQpIC8gZWxlbWVudC5vZmZzZXRIZWlnaHQgfHwgMTtcbiAgcmV0dXJuIHNjYWxlWCAhPT0gMSB8fCBzY2FsZVkgIT09IDE7XG59IC8vIFJldHVybnMgdGhlIGNvbXBvc2l0ZSByZWN0IG9mIGFuIGVsZW1lbnQgcmVsYXRpdmUgdG8gaXRzIG9mZnNldFBhcmVudC5cbi8vIENvbXBvc2l0ZSBtZWFucyBpdCB0YWtlcyBpbnRvIGFjY291bnQgdHJhbnNmb3JtcyBhcyB3ZWxsIGFzIGxheW91dC5cblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRDb21wb3NpdGVSZWN0KGVsZW1lbnRPclZpcnR1YWxFbGVtZW50LCBvZmZzZXRQYXJlbnQsIGlzRml4ZWQpIHtcbiAgaWYgKGlzRml4ZWQgPT09IHZvaWQgMCkge1xuICAgIGlzRml4ZWQgPSBmYWxzZTtcbiAgfVxuXG4gIHZhciBpc09mZnNldFBhcmVudEFuRWxlbWVudCA9IGlzSFRNTEVsZW1lbnQob2Zmc2V0UGFyZW50KTtcbiAgdmFyIG9mZnNldFBhcmVudElzU2NhbGVkID0gaXNIVE1MRWxlbWVudChvZmZzZXRQYXJlbnQpICYmIGlzRWxlbWVudFNjYWxlZChvZmZzZXRQYXJlbnQpO1xuICB2YXIgZG9jdW1lbnRFbGVtZW50ID0gZ2V0RG9jdW1lbnRFbGVtZW50KG9mZnNldFBhcmVudCk7XG4gIHZhciByZWN0ID0gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGVsZW1lbnRPclZpcnR1YWxFbGVtZW50LCBvZmZzZXRQYXJlbnRJc1NjYWxlZCwgaXNGaXhlZCk7XG4gIHZhciBzY3JvbGwgPSB7XG4gICAgc2Nyb2xsTGVmdDogMCxcbiAgICBzY3JvbGxUb3A6IDBcbiAgfTtcbiAgdmFyIG9mZnNldHMgPSB7XG4gICAgeDogMCxcbiAgICB5OiAwXG4gIH07XG5cbiAgaWYgKGlzT2Zmc2V0UGFyZW50QW5FbGVtZW50IHx8ICFpc09mZnNldFBhcmVudEFuRWxlbWVudCAmJiAhaXNGaXhlZCkge1xuICAgIGlmIChnZXROb2RlTmFtZShvZmZzZXRQYXJlbnQpICE9PSAnYm9keScgfHwgLy8gaHR0cHM6Ly9naXRodWIuY29tL3BvcHBlcmpzL3BvcHBlci1jb3JlL2lzc3Vlcy8xMDc4XG4gICAgaXNTY3JvbGxQYXJlbnQoZG9jdW1lbnRFbGVtZW50KSkge1xuICAgICAgc2Nyb2xsID0gZ2V0Tm9kZVNjcm9sbChvZmZzZXRQYXJlbnQpO1xuICAgIH1cblxuICAgIGlmIChpc0hUTUxFbGVtZW50KG9mZnNldFBhcmVudCkpIHtcbiAgICAgIG9mZnNldHMgPSBnZXRCb3VuZGluZ0NsaWVudFJlY3Qob2Zmc2V0UGFyZW50LCB0cnVlKTtcbiAgICAgIG9mZnNldHMueCArPSBvZmZzZXRQYXJlbnQuY2xpZW50TGVmdDtcbiAgICAgIG9mZnNldHMueSArPSBvZmZzZXRQYXJlbnQuY2xpZW50VG9wO1xuICAgIH0gZWxzZSBpZiAoZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgICBvZmZzZXRzLnggPSBnZXRXaW5kb3dTY3JvbGxCYXJYKGRvY3VtZW50RWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB4OiByZWN0LmxlZnQgKyBzY3JvbGwuc2Nyb2xsTGVmdCAtIG9mZnNldHMueCxcbiAgICB5OiByZWN0LnRvcCArIHNjcm9sbC5zY3JvbGxUb3AgLSBvZmZzZXRzLnksXG4gICAgd2lkdGg6IHJlY3Qud2lkdGgsXG4gICAgaGVpZ2h0OiByZWN0LmhlaWdodFxuICB9O1xufSIsImltcG9ydCBnZXRXaW5kb3cgZnJvbSBcIi4vZ2V0V2luZG93LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpIHtcbiAgcmV0dXJuIGdldFdpbmRvdyhlbGVtZW50KS5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xufSIsImltcG9ydCB7IGlzRWxlbWVudCB9IGZyb20gXCIuL2luc3RhbmNlT2YuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldERvY3VtZW50RWxlbWVudChlbGVtZW50KSB7XG4gIC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLXJldHVybl06IGFzc3VtZSBib2R5IGlzIGFsd2F5cyBhdmFpbGFibGVcbiAgcmV0dXJuICgoaXNFbGVtZW50KGVsZW1lbnQpID8gZWxlbWVudC5vd25lckRvY3VtZW50IDogLy8gJEZsb3dGaXhNZVtwcm9wLW1pc3NpbmddXG4gIGVsZW1lbnQuZG9jdW1lbnQpIHx8IHdpbmRvdy5kb2N1bWVudCkuZG9jdW1lbnRFbGVtZW50O1xufSIsImltcG9ydCBnZXREb2N1bWVudEVsZW1lbnQgZnJvbSBcIi4vZ2V0RG9jdW1lbnRFbGVtZW50LmpzXCI7XG5pbXBvcnQgZ2V0Q29tcHV0ZWRTdHlsZSBmcm9tIFwiLi9nZXRDb21wdXRlZFN0eWxlLmpzXCI7XG5pbXBvcnQgZ2V0V2luZG93U2Nyb2xsQmFyWCBmcm9tIFwiLi9nZXRXaW5kb3dTY3JvbGxCYXJYLmpzXCI7XG5pbXBvcnQgZ2V0V2luZG93U2Nyb2xsIGZyb20gXCIuL2dldFdpbmRvd1Njcm9sbC5qc1wiO1xuaW1wb3J0IHsgbWF4IH0gZnJvbSBcIi4uL3V0aWxzL21hdGguanNcIjsgLy8gR2V0cyB0aGUgZW50aXJlIHNpemUgb2YgdGhlIHNjcm9sbGFibGUgZG9jdW1lbnQgYXJlYSwgZXZlbiBleHRlbmRpbmcgb3V0c2lkZVxuLy8gb2YgdGhlIGA8aHRtbD5gIGFuZCBgPGJvZHk+YCByZWN0IGJvdW5kcyBpZiBob3Jpem9udGFsbHkgc2Nyb2xsYWJsZVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXREb2N1bWVudFJlY3QoZWxlbWVudCkge1xuICB2YXIgX2VsZW1lbnQkb3duZXJEb2N1bWVuO1xuXG4gIHZhciBodG1sID0gZ2V0RG9jdW1lbnRFbGVtZW50KGVsZW1lbnQpO1xuICB2YXIgd2luU2Nyb2xsID0gZ2V0V2luZG93U2Nyb2xsKGVsZW1lbnQpO1xuICB2YXIgYm9keSA9IChfZWxlbWVudCRvd25lckRvY3VtZW4gPSBlbGVtZW50Lm93bmVyRG9jdW1lbnQpID09IG51bGwgPyB2b2lkIDAgOiBfZWxlbWVudCRvd25lckRvY3VtZW4uYm9keTtcbiAgdmFyIHdpZHRoID0gbWF4KGh0bWwuc2Nyb2xsV2lkdGgsIGh0bWwuY2xpZW50V2lkdGgsIGJvZHkgPyBib2R5LnNjcm9sbFdpZHRoIDogMCwgYm9keSA/IGJvZHkuY2xpZW50V2lkdGggOiAwKTtcbiAgdmFyIGhlaWdodCA9IG1heChodG1sLnNjcm9sbEhlaWdodCwgaHRtbC5jbGllbnRIZWlnaHQsIGJvZHkgPyBib2R5LnNjcm9sbEhlaWdodCA6IDAsIGJvZHkgPyBib2R5LmNsaWVudEhlaWdodCA6IDApO1xuICB2YXIgeCA9IC13aW5TY3JvbGwuc2Nyb2xsTGVmdCArIGdldFdpbmRvd1Njcm9sbEJhclgoZWxlbWVudCk7XG4gIHZhciB5ID0gLXdpblNjcm9sbC5zY3JvbGxUb3A7XG5cbiAgaWYgKGdldENvbXB1dGVkU3R5bGUoYm9keSB8fCBodG1sKS5kaXJlY3Rpb24gPT09ICdydGwnKSB7XG4gICAgeCArPSBtYXgoaHRtbC5jbGllbnRXaWR0aCwgYm9keSA/IGJvZHkuY2xpZW50V2lkdGggOiAwKSAtIHdpZHRoO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB3aWR0aDogd2lkdGgsXG4gICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgeDogeCxcbiAgICB5OiB5XG4gIH07XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0SFRNTEVsZW1lbnRTY3JvbGwoZWxlbWVudCkge1xuICByZXR1cm4ge1xuICAgIHNjcm9sbExlZnQ6IGVsZW1lbnQuc2Nyb2xsTGVmdCxcbiAgICBzY3JvbGxUb3A6IGVsZW1lbnQuc2Nyb2xsVG9wXG4gIH07XG59IiwiaW1wb3J0IGdldEJvdW5kaW5nQ2xpZW50UmVjdCBmcm9tIFwiLi9nZXRCb3VuZGluZ0NsaWVudFJlY3QuanNcIjsgLy8gUmV0dXJucyB0aGUgbGF5b3V0IHJlY3Qgb2YgYW4gZWxlbWVudCByZWxhdGl2ZSB0byBpdHMgb2Zmc2V0UGFyZW50LiBMYXlvdXRcbi8vIG1lYW5zIGl0IGRvZXNuJ3QgdGFrZSBpbnRvIGFjY291bnQgdHJhbnNmb3Jtcy5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0TGF5b3V0UmVjdChlbGVtZW50KSB7XG4gIHZhciBjbGllbnRSZWN0ID0gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGVsZW1lbnQpOyAvLyBVc2UgdGhlIGNsaWVudFJlY3Qgc2l6ZXMgaWYgaXQncyBub3QgYmVlbiB0cmFuc2Zvcm1lZC5cbiAgLy8gRml4ZXMgaHR0cHM6Ly9naXRodWIuY29tL3BvcHBlcmpzL3BvcHBlci1jb3JlL2lzc3Vlcy8xMjIzXG5cbiAgdmFyIHdpZHRoID0gZWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgdmFyIGhlaWdodCA9IGVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuXG4gIGlmIChNYXRoLmFicyhjbGllbnRSZWN0LndpZHRoIC0gd2lkdGgpIDw9IDEpIHtcbiAgICB3aWR0aCA9IGNsaWVudFJlY3Qud2lkdGg7XG4gIH1cblxuICBpZiAoTWF0aC5hYnMoY2xpZW50UmVjdC5oZWlnaHQgLSBoZWlnaHQpIDw9IDEpIHtcbiAgICBoZWlnaHQgPSBjbGllbnRSZWN0LmhlaWdodDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgeDogZWxlbWVudC5vZmZzZXRMZWZ0LFxuICAgIHk6IGVsZW1lbnQub2Zmc2V0VG9wLFxuICAgIHdpZHRoOiB3aWR0aCxcbiAgICBoZWlnaHQ6IGhlaWdodFxuICB9O1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldE5vZGVOYW1lKGVsZW1lbnQpIHtcbiAgcmV0dXJuIGVsZW1lbnQgPyAoZWxlbWVudC5ub2RlTmFtZSB8fCAnJykudG9Mb3dlckNhc2UoKSA6IG51bGw7XG59IiwiaW1wb3J0IGdldFdpbmRvd1Njcm9sbCBmcm9tIFwiLi9nZXRXaW5kb3dTY3JvbGwuanNcIjtcbmltcG9ydCBnZXRXaW5kb3cgZnJvbSBcIi4vZ2V0V2luZG93LmpzXCI7XG5pbXBvcnQgeyBpc0hUTUxFbGVtZW50IH0gZnJvbSBcIi4vaW5zdGFuY2VPZi5qc1wiO1xuaW1wb3J0IGdldEhUTUxFbGVtZW50U2Nyb2xsIGZyb20gXCIuL2dldEhUTUxFbGVtZW50U2Nyb2xsLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXROb2RlU2Nyb2xsKG5vZGUpIHtcbiAgaWYgKG5vZGUgPT09IGdldFdpbmRvdyhub2RlKSB8fCAhaXNIVE1MRWxlbWVudChub2RlKSkge1xuICAgIHJldHVybiBnZXRXaW5kb3dTY3JvbGwobm9kZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGdldEhUTUxFbGVtZW50U2Nyb2xsKG5vZGUpO1xuICB9XG59IiwiaW1wb3J0IGdldFdpbmRvdyBmcm9tIFwiLi9nZXRXaW5kb3cuanNcIjtcbmltcG9ydCBnZXROb2RlTmFtZSBmcm9tIFwiLi9nZXROb2RlTmFtZS5qc1wiO1xuaW1wb3J0IGdldENvbXB1dGVkU3R5bGUgZnJvbSBcIi4vZ2V0Q29tcHV0ZWRTdHlsZS5qc1wiO1xuaW1wb3J0IHsgaXNIVE1MRWxlbWVudCwgaXNTaGFkb3dSb290IH0gZnJvbSBcIi4vaW5zdGFuY2VPZi5qc1wiO1xuaW1wb3J0IGlzVGFibGVFbGVtZW50IGZyb20gXCIuL2lzVGFibGVFbGVtZW50LmpzXCI7XG5pbXBvcnQgZ2V0UGFyZW50Tm9kZSBmcm9tIFwiLi9nZXRQYXJlbnROb2RlLmpzXCI7XG5pbXBvcnQgZ2V0VUFTdHJpbmcgZnJvbSBcIi4uL3V0aWxzL3VzZXJBZ2VudC5qc1wiO1xuXG5mdW5jdGlvbiBnZXRUcnVlT2Zmc2V0UGFyZW50KGVsZW1lbnQpIHtcbiAgaWYgKCFpc0hUTUxFbGVtZW50KGVsZW1lbnQpIHx8IC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9wb3BwZXJqcy9wb3BwZXItY29yZS9pc3N1ZXMvODM3XG4gIGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkucG9zaXRpb24gPT09ICdmaXhlZCcpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiBlbGVtZW50Lm9mZnNldFBhcmVudDtcbn0gLy8gYC5vZmZzZXRQYXJlbnRgIHJlcG9ydHMgYG51bGxgIGZvciBmaXhlZCBlbGVtZW50cywgd2hpbGUgYWJzb2x1dGUgZWxlbWVudHNcbi8vIHJldHVybiB0aGUgY29udGFpbmluZyBibG9ja1xuXG5cbmZ1bmN0aW9uIGdldENvbnRhaW5pbmdCbG9jayhlbGVtZW50KSB7XG4gIHZhciBpc0ZpcmVmb3ggPSAvZmlyZWZveC9pLnRlc3QoZ2V0VUFTdHJpbmcoKSk7XG4gIHZhciBpc0lFID0gL1RyaWRlbnQvaS50ZXN0KGdldFVBU3RyaW5nKCkpO1xuXG4gIGlmIChpc0lFICYmIGlzSFRNTEVsZW1lbnQoZWxlbWVudCkpIHtcbiAgICAvLyBJbiBJRSA5LCAxMCBhbmQgMTEgZml4ZWQgZWxlbWVudHMgY29udGFpbmluZyBibG9jayBpcyBhbHdheXMgZXN0YWJsaXNoZWQgYnkgdGhlIHZpZXdwb3J0XG4gICAgdmFyIGVsZW1lbnRDc3MgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xuXG4gICAgaWYgKGVsZW1lbnRDc3MucG9zaXRpb24gPT09ICdmaXhlZCcpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHZhciBjdXJyZW50Tm9kZSA9IGdldFBhcmVudE5vZGUoZWxlbWVudCk7XG5cbiAgaWYgKGlzU2hhZG93Um9vdChjdXJyZW50Tm9kZSkpIHtcbiAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLmhvc3Q7XG4gIH1cblxuICB3aGlsZSAoaXNIVE1MRWxlbWVudChjdXJyZW50Tm9kZSkgJiYgWydodG1sJywgJ2JvZHknXS5pbmRleE9mKGdldE5vZGVOYW1lKGN1cnJlbnROb2RlKSkgPCAwKSB7XG4gICAgdmFyIGNzcyA9IGdldENvbXB1dGVkU3R5bGUoY3VycmVudE5vZGUpOyAvLyBUaGlzIGlzIG5vbi1leGhhdXN0aXZlIGJ1dCBjb3ZlcnMgdGhlIG1vc3QgY29tbW9uIENTUyBwcm9wZXJ0aWVzIHRoYXRcbiAgICAvLyBjcmVhdGUgYSBjb250YWluaW5nIGJsb2NrLlxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0NTUy9Db250YWluaW5nX2Jsb2NrI2lkZW50aWZ5aW5nX3RoZV9jb250YWluaW5nX2Jsb2NrXG5cbiAgICBpZiAoY3NzLnRyYW5zZm9ybSAhPT0gJ25vbmUnIHx8IGNzcy5wZXJzcGVjdGl2ZSAhPT0gJ25vbmUnIHx8IGNzcy5jb250YWluID09PSAncGFpbnQnIHx8IFsndHJhbnNmb3JtJywgJ3BlcnNwZWN0aXZlJ10uaW5kZXhPZihjc3Mud2lsbENoYW5nZSkgIT09IC0xIHx8IGlzRmlyZWZveCAmJiBjc3Mud2lsbENoYW5nZSA9PT0gJ2ZpbHRlcicgfHwgaXNGaXJlZm94ICYmIGNzcy5maWx0ZXIgJiYgY3NzLmZpbHRlciAhPT0gJ25vbmUnKSB7XG4gICAgICByZXR1cm4gY3VycmVudE5vZGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUucGFyZW50Tm9kZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn0gLy8gR2V0cyB0aGUgY2xvc2VzdCBhbmNlc3RvciBwb3NpdGlvbmVkIGVsZW1lbnQuIEhhbmRsZXMgc29tZSBlZGdlIGNhc2VzLFxuLy8gc3VjaCBhcyB0YWJsZSBhbmNlc3RvcnMgYW5kIGNyb3NzIGJyb3dzZXIgYnVncy5cblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRPZmZzZXRQYXJlbnQoZWxlbWVudCkge1xuICB2YXIgd2luZG93ID0gZ2V0V2luZG93KGVsZW1lbnQpO1xuICB2YXIgb2Zmc2V0UGFyZW50ID0gZ2V0VHJ1ZU9mZnNldFBhcmVudChlbGVtZW50KTtcblxuICB3aGlsZSAob2Zmc2V0UGFyZW50ICYmIGlzVGFibGVFbGVtZW50KG9mZnNldFBhcmVudCkgJiYgZ2V0Q29tcHV0ZWRTdHlsZShvZmZzZXRQYXJlbnQpLnBvc2l0aW9uID09PSAnc3RhdGljJykge1xuICAgIG9mZnNldFBhcmVudCA9IGdldFRydWVPZmZzZXRQYXJlbnQob2Zmc2V0UGFyZW50KTtcbiAgfVxuXG4gIGlmIChvZmZzZXRQYXJlbnQgJiYgKGdldE5vZGVOYW1lKG9mZnNldFBhcmVudCkgPT09ICdodG1sJyB8fCBnZXROb2RlTmFtZShvZmZzZXRQYXJlbnQpID09PSAnYm9keScgJiYgZ2V0Q29tcHV0ZWRTdHlsZShvZmZzZXRQYXJlbnQpLnBvc2l0aW9uID09PSAnc3RhdGljJykpIHtcbiAgICByZXR1cm4gd2luZG93O1xuICB9XG5cbiAgcmV0dXJuIG9mZnNldFBhcmVudCB8fCBnZXRDb250YWluaW5nQmxvY2soZWxlbWVudCkgfHwgd2luZG93O1xufSIsImltcG9ydCBnZXROb2RlTmFtZSBmcm9tIFwiLi9nZXROb2RlTmFtZS5qc1wiO1xuaW1wb3J0IGdldERvY3VtZW50RWxlbWVudCBmcm9tIFwiLi9nZXREb2N1bWVudEVsZW1lbnQuanNcIjtcbmltcG9ydCB7IGlzU2hhZG93Um9vdCB9IGZyb20gXCIuL2luc3RhbmNlT2YuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFBhcmVudE5vZGUoZWxlbWVudCkge1xuICBpZiAoZ2V0Tm9kZU5hbWUoZWxlbWVudCkgPT09ICdodG1sJykge1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgcmV0dXJuICgvLyB0aGlzIGlzIGEgcXVpY2tlciAoYnV0IGxlc3MgdHlwZSBzYWZlKSB3YXkgdG8gc2F2ZSBxdWl0ZSBzb21lIGJ5dGVzIGZyb20gdGhlIGJ1bmRsZVxuICAgIC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLXJldHVybl1cbiAgICAvLyAkRmxvd0ZpeE1lW3Byb3AtbWlzc2luZ11cbiAgICBlbGVtZW50LmFzc2lnbmVkU2xvdCB8fCAvLyBzdGVwIGludG8gdGhlIHNoYWRvdyBET00gb2YgdGhlIHBhcmVudCBvZiBhIHNsb3R0ZWQgbm9kZVxuICAgIGVsZW1lbnQucGFyZW50Tm9kZSB8fCAoIC8vIERPTSBFbGVtZW50IGRldGVjdGVkXG4gICAgaXNTaGFkb3dSb290KGVsZW1lbnQpID8gZWxlbWVudC5ob3N0IDogbnVsbCkgfHwgLy8gU2hhZG93Um9vdCBkZXRlY3RlZFxuICAgIC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLWNhbGxdOiBIVE1MRWxlbWVudCBpcyBhIE5vZGVcbiAgICBnZXREb2N1bWVudEVsZW1lbnQoZWxlbWVudCkgLy8gZmFsbGJhY2tcblxuICApO1xufSIsImltcG9ydCBnZXRQYXJlbnROb2RlIGZyb20gXCIuL2dldFBhcmVudE5vZGUuanNcIjtcbmltcG9ydCBpc1Njcm9sbFBhcmVudCBmcm9tIFwiLi9pc1Njcm9sbFBhcmVudC5qc1wiO1xuaW1wb3J0IGdldE5vZGVOYW1lIGZyb20gXCIuL2dldE5vZGVOYW1lLmpzXCI7XG5pbXBvcnQgeyBpc0hUTUxFbGVtZW50IH0gZnJvbSBcIi4vaW5zdGFuY2VPZi5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0U2Nyb2xsUGFyZW50KG5vZGUpIHtcbiAgaWYgKFsnaHRtbCcsICdib2R5JywgJyNkb2N1bWVudCddLmluZGV4T2YoZ2V0Tm9kZU5hbWUobm9kZSkpID49IDApIHtcbiAgICAvLyAkRmxvd0ZpeE1lW2luY29tcGF0aWJsZS1yZXR1cm5dOiBhc3N1bWUgYm9keSBpcyBhbHdheXMgYXZhaWxhYmxlXG4gICAgcmV0dXJuIG5vZGUub3duZXJEb2N1bWVudC5ib2R5O1xuICB9XG5cbiAgaWYgKGlzSFRNTEVsZW1lbnQobm9kZSkgJiYgaXNTY3JvbGxQYXJlbnQobm9kZSkpIHtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIHJldHVybiBnZXRTY3JvbGxQYXJlbnQoZ2V0UGFyZW50Tm9kZShub2RlKSk7XG59IiwiaW1wb3J0IGdldFdpbmRvdyBmcm9tIFwiLi9nZXRXaW5kb3cuanNcIjtcbmltcG9ydCBnZXREb2N1bWVudEVsZW1lbnQgZnJvbSBcIi4vZ2V0RG9jdW1lbnRFbGVtZW50LmpzXCI7XG5pbXBvcnQgZ2V0V2luZG93U2Nyb2xsQmFyWCBmcm9tIFwiLi9nZXRXaW5kb3dTY3JvbGxCYXJYLmpzXCI7XG5pbXBvcnQgaXNMYXlvdXRWaWV3cG9ydCBmcm9tIFwiLi9pc0xheW91dFZpZXdwb3J0LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRWaWV3cG9ydFJlY3QoZWxlbWVudCwgc3RyYXRlZ3kpIHtcbiAgdmFyIHdpbiA9IGdldFdpbmRvdyhlbGVtZW50KTtcbiAgdmFyIGh0bWwgPSBnZXREb2N1bWVudEVsZW1lbnQoZWxlbWVudCk7XG4gIHZhciB2aXN1YWxWaWV3cG9ydCA9IHdpbi52aXN1YWxWaWV3cG9ydDtcbiAgdmFyIHdpZHRoID0gaHRtbC5jbGllbnRXaWR0aDtcbiAgdmFyIGhlaWdodCA9IGh0bWwuY2xpZW50SGVpZ2h0O1xuICB2YXIgeCA9IDA7XG4gIHZhciB5ID0gMDtcblxuICBpZiAodmlzdWFsVmlld3BvcnQpIHtcbiAgICB3aWR0aCA9IHZpc3VhbFZpZXdwb3J0LndpZHRoO1xuICAgIGhlaWdodCA9IHZpc3VhbFZpZXdwb3J0LmhlaWdodDtcbiAgICB2YXIgbGF5b3V0Vmlld3BvcnQgPSBpc0xheW91dFZpZXdwb3J0KCk7XG5cbiAgICBpZiAobGF5b3V0Vmlld3BvcnQgfHwgIWxheW91dFZpZXdwb3J0ICYmIHN0cmF0ZWd5ID09PSAnZml4ZWQnKSB7XG4gICAgICB4ID0gdmlzdWFsVmlld3BvcnQub2Zmc2V0TGVmdDtcbiAgICAgIHkgPSB2aXN1YWxWaWV3cG9ydC5vZmZzZXRUb3A7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB3aWR0aDogd2lkdGgsXG4gICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgeDogeCArIGdldFdpbmRvd1Njcm9sbEJhclgoZWxlbWVudCksXG4gICAgeTogeVxuICB9O1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFdpbmRvdyhub2RlKSB7XG4gIGlmIChub2RlID09IG51bGwpIHtcbiAgICByZXR1cm4gd2luZG93O1xuICB9XG5cbiAgaWYgKG5vZGUudG9TdHJpbmcoKSAhPT0gJ1tvYmplY3QgV2luZG93XScpIHtcbiAgICB2YXIgb3duZXJEb2N1bWVudCA9IG5vZGUub3duZXJEb2N1bWVudDtcbiAgICByZXR1cm4gb3duZXJEb2N1bWVudCA/IG93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcgfHwgd2luZG93IDogd2luZG93O1xuICB9XG5cbiAgcmV0dXJuIG5vZGU7XG59IiwiaW1wb3J0IGdldFdpbmRvdyBmcm9tIFwiLi9nZXRXaW5kb3cuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFdpbmRvd1Njcm9sbChub2RlKSB7XG4gIHZhciB3aW4gPSBnZXRXaW5kb3cobm9kZSk7XG4gIHZhciBzY3JvbGxMZWZ0ID0gd2luLnBhZ2VYT2Zmc2V0O1xuICB2YXIgc2Nyb2xsVG9wID0gd2luLnBhZ2VZT2Zmc2V0O1xuICByZXR1cm4ge1xuICAgIHNjcm9sbExlZnQ6IHNjcm9sbExlZnQsXG4gICAgc2Nyb2xsVG9wOiBzY3JvbGxUb3BcbiAgfTtcbn0iLCJpbXBvcnQgZ2V0Qm91bmRpbmdDbGllbnRSZWN0IGZyb20gXCIuL2dldEJvdW5kaW5nQ2xpZW50UmVjdC5qc1wiO1xuaW1wb3J0IGdldERvY3VtZW50RWxlbWVudCBmcm9tIFwiLi9nZXREb2N1bWVudEVsZW1lbnQuanNcIjtcbmltcG9ydCBnZXRXaW5kb3dTY3JvbGwgZnJvbSBcIi4vZ2V0V2luZG93U2Nyb2xsLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRXaW5kb3dTY3JvbGxCYXJYKGVsZW1lbnQpIHtcbiAgLy8gSWYgPGh0bWw+IGhhcyBhIENTUyB3aWR0aCBncmVhdGVyIHRoYW4gdGhlIHZpZXdwb3J0LCB0aGVuIHRoaXMgd2lsbCBiZVxuICAvLyBpbmNvcnJlY3QgZm9yIFJUTC5cbiAgLy8gUG9wcGVyIDEgaXMgYnJva2VuIGluIHRoaXMgY2FzZSBhbmQgbmV2ZXIgaGFkIGEgYnVnIHJlcG9ydCBzbyBsZXQncyBhc3N1bWVcbiAgLy8gaXQncyBub3QgYW4gaXNzdWUuIEkgZG9uJ3QgdGhpbmsgYW55b25lIGV2ZXIgc3BlY2lmaWVzIHdpZHRoIG9uIDxodG1sPlxuICAvLyBhbnl3YXkuXG4gIC8vIEJyb3dzZXJzIHdoZXJlIHRoZSBsZWZ0IHNjcm9sbGJhciBkb2Vzbid0IGNhdXNlIGFuIGlzc3VlIHJlcG9ydCBgMGAgZm9yXG4gIC8vIHRoaXMgKGUuZy4gRWRnZSAyMDE5LCBJRTExLCBTYWZhcmkpXG4gIHJldHVybiBnZXRCb3VuZGluZ0NsaWVudFJlY3QoZ2V0RG9jdW1lbnRFbGVtZW50KGVsZW1lbnQpKS5sZWZ0ICsgZ2V0V2luZG93U2Nyb2xsKGVsZW1lbnQpLnNjcm9sbExlZnQ7XG59IiwiaW1wb3J0IGdldFdpbmRvdyBmcm9tIFwiLi9nZXRXaW5kb3cuanNcIjtcblxuZnVuY3Rpb24gaXNFbGVtZW50KG5vZGUpIHtcbiAgdmFyIE93bkVsZW1lbnQgPSBnZXRXaW5kb3cobm9kZSkuRWxlbWVudDtcbiAgcmV0dXJuIG5vZGUgaW5zdGFuY2VvZiBPd25FbGVtZW50IHx8IG5vZGUgaW5zdGFuY2VvZiBFbGVtZW50O1xufVxuXG5mdW5jdGlvbiBpc0hUTUxFbGVtZW50KG5vZGUpIHtcbiAgdmFyIE93bkVsZW1lbnQgPSBnZXRXaW5kb3cobm9kZSkuSFRNTEVsZW1lbnQ7XG4gIHJldHVybiBub2RlIGluc3RhbmNlb2YgT3duRWxlbWVudCB8fCBub2RlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQ7XG59XG5cbmZ1bmN0aW9uIGlzU2hhZG93Um9vdChub2RlKSB7XG4gIC8vIElFIDExIGhhcyBubyBTaGFkb3dSb290XG4gIGlmICh0eXBlb2YgU2hhZG93Um9vdCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgT3duRWxlbWVudCA9IGdldFdpbmRvdyhub2RlKS5TaGFkb3dSb290O1xuICByZXR1cm4gbm9kZSBpbnN0YW5jZW9mIE93bkVsZW1lbnQgfHwgbm9kZSBpbnN0YW5jZW9mIFNoYWRvd1Jvb3Q7XG59XG5cbmV4cG9ydCB7IGlzRWxlbWVudCwgaXNIVE1MRWxlbWVudCwgaXNTaGFkb3dSb290IH07IiwiaW1wb3J0IGdldFVBU3RyaW5nIGZyb20gXCIuLi91dGlscy91c2VyQWdlbnQuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzTGF5b3V0Vmlld3BvcnQoKSB7XG4gIHJldHVybiAhL14oKD8hY2hyb21lfGFuZHJvaWQpLikqc2FmYXJpL2kudGVzdChnZXRVQVN0cmluZygpKTtcbn0iLCJpbXBvcnQgZ2V0Q29tcHV0ZWRTdHlsZSBmcm9tIFwiLi9nZXRDb21wdXRlZFN0eWxlLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc1Njcm9sbFBhcmVudChlbGVtZW50KSB7XG4gIC8vIEZpcmVmb3ggd2FudHMgdXMgdG8gY2hlY2sgYC14YCBhbmQgYC15YCB2YXJpYXRpb25zIGFzIHdlbGxcbiAgdmFyIF9nZXRDb21wdXRlZFN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KSxcbiAgICAgIG92ZXJmbG93ID0gX2dldENvbXB1dGVkU3R5bGUub3ZlcmZsb3csXG4gICAgICBvdmVyZmxvd1ggPSBfZ2V0Q29tcHV0ZWRTdHlsZS5vdmVyZmxvd1gsXG4gICAgICBvdmVyZmxvd1kgPSBfZ2V0Q29tcHV0ZWRTdHlsZS5vdmVyZmxvd1k7XG5cbiAgcmV0dXJuIC9hdXRvfHNjcm9sbHxvdmVybGF5fGhpZGRlbi8udGVzdChvdmVyZmxvdyArIG92ZXJmbG93WSArIG92ZXJmbG93WCk7XG59IiwiaW1wb3J0IGdldE5vZGVOYW1lIGZyb20gXCIuL2dldE5vZGVOYW1lLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc1RhYmxlRWxlbWVudChlbGVtZW50KSB7XG4gIHJldHVybiBbJ3RhYmxlJywgJ3RkJywgJ3RoJ10uaW5kZXhPZihnZXROb2RlTmFtZShlbGVtZW50KSkgPj0gMDtcbn0iLCJpbXBvcnQgZ2V0U2Nyb2xsUGFyZW50IGZyb20gXCIuL2dldFNjcm9sbFBhcmVudC5qc1wiO1xuaW1wb3J0IGdldFBhcmVudE5vZGUgZnJvbSBcIi4vZ2V0UGFyZW50Tm9kZS5qc1wiO1xuaW1wb3J0IGdldFdpbmRvdyBmcm9tIFwiLi9nZXRXaW5kb3cuanNcIjtcbmltcG9ydCBpc1Njcm9sbFBhcmVudCBmcm9tIFwiLi9pc1Njcm9sbFBhcmVudC5qc1wiO1xuLypcbmdpdmVuIGEgRE9NIGVsZW1lbnQsIHJldHVybiB0aGUgbGlzdCBvZiBhbGwgc2Nyb2xsIHBhcmVudHMsIHVwIHRoZSBsaXN0IG9mIGFuY2Vzb3JzXG51bnRpbCB3ZSBnZXQgdG8gdGhlIHRvcCB3aW5kb3cgb2JqZWN0LiBUaGlzIGxpc3QgaXMgd2hhdCB3ZSBhdHRhY2ggc2Nyb2xsIGxpc3RlbmVyc1xudG8sIGJlY2F1c2UgaWYgYW55IG9mIHRoZXNlIHBhcmVudCBlbGVtZW50cyBzY3JvbGwsIHdlJ2xsIG5lZWQgdG8gcmUtY2FsY3VsYXRlIHRoZVxucmVmZXJlbmNlIGVsZW1lbnQncyBwb3NpdGlvbi5cbiovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxpc3RTY3JvbGxQYXJlbnRzKGVsZW1lbnQsIGxpc3QpIHtcbiAgdmFyIF9lbGVtZW50JG93bmVyRG9jdW1lbjtcblxuICBpZiAobGlzdCA9PT0gdm9pZCAwKSB7XG4gICAgbGlzdCA9IFtdO1xuICB9XG5cbiAgdmFyIHNjcm9sbFBhcmVudCA9IGdldFNjcm9sbFBhcmVudChlbGVtZW50KTtcbiAgdmFyIGlzQm9keSA9IHNjcm9sbFBhcmVudCA9PT0gKChfZWxlbWVudCRvd25lckRvY3VtZW4gPSBlbGVtZW50Lm93bmVyRG9jdW1lbnQpID09IG51bGwgPyB2b2lkIDAgOiBfZWxlbWVudCRvd25lckRvY3VtZW4uYm9keSk7XG4gIHZhciB3aW4gPSBnZXRXaW5kb3coc2Nyb2xsUGFyZW50KTtcbiAgdmFyIHRhcmdldCA9IGlzQm9keSA/IFt3aW5dLmNvbmNhdCh3aW4udmlzdWFsVmlld3BvcnQgfHwgW10sIGlzU2Nyb2xsUGFyZW50KHNjcm9sbFBhcmVudCkgPyBzY3JvbGxQYXJlbnQgOiBbXSkgOiBzY3JvbGxQYXJlbnQ7XG4gIHZhciB1cGRhdGVkTGlzdCA9IGxpc3QuY29uY2F0KHRhcmdldCk7XG4gIHJldHVybiBpc0JvZHkgPyB1cGRhdGVkTGlzdCA6IC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLWNhbGxdOiBpc0JvZHkgdGVsbHMgdXMgdGFyZ2V0IHdpbGwgYmUgYW4gSFRNTEVsZW1lbnQgaGVyZVxuICB1cGRhdGVkTGlzdC5jb25jYXQobGlzdFNjcm9sbFBhcmVudHMoZ2V0UGFyZW50Tm9kZSh0YXJnZXQpKSk7XG59IiwiZXhwb3J0IHZhciB0b3AgPSAndG9wJztcbmV4cG9ydCB2YXIgYm90dG9tID0gJ2JvdHRvbSc7XG5leHBvcnQgdmFyIHJpZ2h0ID0gJ3JpZ2h0JztcbmV4cG9ydCB2YXIgbGVmdCA9ICdsZWZ0JztcbmV4cG9ydCB2YXIgYXV0byA9ICdhdXRvJztcbmV4cG9ydCB2YXIgYmFzZVBsYWNlbWVudHMgPSBbdG9wLCBib3R0b20sIHJpZ2h0LCBsZWZ0XTtcbmV4cG9ydCB2YXIgc3RhcnQgPSAnc3RhcnQnO1xuZXhwb3J0IHZhciBlbmQgPSAnZW5kJztcbmV4cG9ydCB2YXIgY2xpcHBpbmdQYXJlbnRzID0gJ2NsaXBwaW5nUGFyZW50cyc7XG5leHBvcnQgdmFyIHZpZXdwb3J0ID0gJ3ZpZXdwb3J0JztcbmV4cG9ydCB2YXIgcG9wcGVyID0gJ3BvcHBlcic7XG5leHBvcnQgdmFyIHJlZmVyZW5jZSA9ICdyZWZlcmVuY2UnO1xuZXhwb3J0IHZhciB2YXJpYXRpb25QbGFjZW1lbnRzID0gLyojX19QVVJFX18qL2Jhc2VQbGFjZW1lbnRzLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBwbGFjZW1lbnQpIHtcbiAgcmV0dXJuIGFjYy5jb25jYXQoW3BsYWNlbWVudCArIFwiLVwiICsgc3RhcnQsIHBsYWNlbWVudCArIFwiLVwiICsgZW5kXSk7XG59LCBbXSk7XG5leHBvcnQgdmFyIHBsYWNlbWVudHMgPSAvKiNfX1BVUkVfXyovW10uY29uY2F0KGJhc2VQbGFjZW1lbnRzLCBbYXV0b10pLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBwbGFjZW1lbnQpIHtcbiAgcmV0dXJuIGFjYy5jb25jYXQoW3BsYWNlbWVudCwgcGxhY2VtZW50ICsgXCItXCIgKyBzdGFydCwgcGxhY2VtZW50ICsgXCItXCIgKyBlbmRdKTtcbn0sIFtdKTsgLy8gbW9kaWZpZXJzIHRoYXQgbmVlZCB0byByZWFkIHRoZSBET01cblxuZXhwb3J0IHZhciBiZWZvcmVSZWFkID0gJ2JlZm9yZVJlYWQnO1xuZXhwb3J0IHZhciByZWFkID0gJ3JlYWQnO1xuZXhwb3J0IHZhciBhZnRlclJlYWQgPSAnYWZ0ZXJSZWFkJzsgLy8gcHVyZS1sb2dpYyBtb2RpZmllcnNcblxuZXhwb3J0IHZhciBiZWZvcmVNYWluID0gJ2JlZm9yZU1haW4nO1xuZXhwb3J0IHZhciBtYWluID0gJ21haW4nO1xuZXhwb3J0IHZhciBhZnRlck1haW4gPSAnYWZ0ZXJNYWluJzsgLy8gbW9kaWZpZXIgd2l0aCB0aGUgcHVycG9zZSB0byB3cml0ZSB0byB0aGUgRE9NIChvciB3cml0ZSBpbnRvIGEgZnJhbWV3b3JrIHN0YXRlKVxuXG5leHBvcnQgdmFyIGJlZm9yZVdyaXRlID0gJ2JlZm9yZVdyaXRlJztcbmV4cG9ydCB2YXIgd3JpdGUgPSAnd3JpdGUnO1xuZXhwb3J0IHZhciBhZnRlcldyaXRlID0gJ2FmdGVyV3JpdGUnO1xuZXhwb3J0IHZhciBtb2RpZmllclBoYXNlcyA9IFtiZWZvcmVSZWFkLCByZWFkLCBhZnRlclJlYWQsIGJlZm9yZU1haW4sIG1haW4sIGFmdGVyTWFpbiwgYmVmb3JlV3JpdGUsIHdyaXRlLCBhZnRlcldyaXRlXTsiLCJleHBvcnQgKiBmcm9tIFwiLi9lbnVtcy5qc1wiO1xuZXhwb3J0ICogZnJvbSBcIi4vbW9kaWZpZXJzL2luZGV4LmpzXCI7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuZXhwb3J0IHsgcG9wcGVyR2VuZXJhdG9yLCBkZXRlY3RPdmVyZmxvdywgY3JlYXRlUG9wcGVyIGFzIGNyZWF0ZVBvcHBlckJhc2UgfSBmcm9tIFwiLi9jcmVhdGVQb3BwZXIuanNcIjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5leHBvcnQgeyBjcmVhdGVQb3BwZXIgfSBmcm9tIFwiLi9wb3BwZXIuanNcIjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5leHBvcnQgeyBjcmVhdGVQb3BwZXIgYXMgY3JlYXRlUG9wcGVyTGl0ZSB9IGZyb20gXCIuL3BvcHBlci1saXRlLmpzXCI7IiwiaW1wb3J0IGdldE5vZGVOYW1lIGZyb20gXCIuLi9kb20tdXRpbHMvZ2V0Tm9kZU5hbWUuanNcIjtcbmltcG9ydCB7IGlzSFRNTEVsZW1lbnQgfSBmcm9tIFwiLi4vZG9tLXV0aWxzL2luc3RhbmNlT2YuanNcIjsgLy8gVGhpcyBtb2RpZmllciB0YWtlcyB0aGUgc3R5bGVzIHByZXBhcmVkIGJ5IHRoZSBgY29tcHV0ZVN0eWxlc2AgbW9kaWZpZXJcbi8vIGFuZCBhcHBsaWVzIHRoZW0gdG8gdGhlIEhUTUxFbGVtZW50cyBzdWNoIGFzIHBvcHBlciBhbmQgYXJyb3dcblxuZnVuY3Rpb24gYXBwbHlTdHlsZXMoX3JlZikge1xuICB2YXIgc3RhdGUgPSBfcmVmLnN0YXRlO1xuICBPYmplY3Qua2V5cyhzdGF0ZS5lbGVtZW50cykuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgIHZhciBzdHlsZSA9IHN0YXRlLnN0eWxlc1tuYW1lXSB8fCB7fTtcbiAgICB2YXIgYXR0cmlidXRlcyA9IHN0YXRlLmF0dHJpYnV0ZXNbbmFtZV0gfHwge307XG4gICAgdmFyIGVsZW1lbnQgPSBzdGF0ZS5lbGVtZW50c1tuYW1lXTsgLy8gYXJyb3cgaXMgb3B0aW9uYWwgKyB2aXJ0dWFsIGVsZW1lbnRzXG5cbiAgICBpZiAoIWlzSFRNTEVsZW1lbnQoZWxlbWVudCkgfHwgIWdldE5vZGVOYW1lKGVsZW1lbnQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfSAvLyBGbG93IGRvZXNuJ3Qgc3VwcG9ydCB0byBleHRlbmQgdGhpcyBwcm9wZXJ0eSwgYnV0IGl0J3MgdGhlIG1vc3RcbiAgICAvLyBlZmZlY3RpdmUgd2F5IHRvIGFwcGx5IHN0eWxlcyB0byBhbiBIVE1MRWxlbWVudFxuICAgIC8vICRGbG93Rml4TWVbY2Fubm90LXdyaXRlXVxuXG5cbiAgICBPYmplY3QuYXNzaWduKGVsZW1lbnQuc3R5bGUsIHN0eWxlKTtcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICB2YXIgdmFsdWUgPSBhdHRyaWJ1dGVzW25hbWVdO1xuXG4gICAgICBpZiAodmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUgPT09IHRydWUgPyAnJyA6IHZhbHVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGVmZmVjdChfcmVmMikge1xuICB2YXIgc3RhdGUgPSBfcmVmMi5zdGF0ZTtcbiAgdmFyIGluaXRpYWxTdHlsZXMgPSB7XG4gICAgcG9wcGVyOiB7XG4gICAgICBwb3NpdGlvbjogc3RhdGUub3B0aW9ucy5zdHJhdGVneSxcbiAgICAgIGxlZnQ6ICcwJyxcbiAgICAgIHRvcDogJzAnLFxuICAgICAgbWFyZ2luOiAnMCdcbiAgICB9LFxuICAgIGFycm93OiB7XG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJ1xuICAgIH0sXG4gICAgcmVmZXJlbmNlOiB7fVxuICB9O1xuICBPYmplY3QuYXNzaWduKHN0YXRlLmVsZW1lbnRzLnBvcHBlci5zdHlsZSwgaW5pdGlhbFN0eWxlcy5wb3BwZXIpO1xuICBzdGF0ZS5zdHlsZXMgPSBpbml0aWFsU3R5bGVzO1xuXG4gIGlmIChzdGF0ZS5lbGVtZW50cy5hcnJvdykge1xuICAgIE9iamVjdC5hc3NpZ24oc3RhdGUuZWxlbWVudHMuYXJyb3cuc3R5bGUsIGluaXRpYWxTdHlsZXMuYXJyb3cpO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBPYmplY3Qua2V5cyhzdGF0ZS5lbGVtZW50cykuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgdmFyIGVsZW1lbnQgPSBzdGF0ZS5lbGVtZW50c1tuYW1lXTtcbiAgICAgIHZhciBhdHRyaWJ1dGVzID0gc3RhdGUuYXR0cmlidXRlc1tuYW1lXSB8fCB7fTtcbiAgICAgIHZhciBzdHlsZVByb3BlcnRpZXMgPSBPYmplY3Qua2V5cyhzdGF0ZS5zdHlsZXMuaGFzT3duUHJvcGVydHkobmFtZSkgPyBzdGF0ZS5zdHlsZXNbbmFtZV0gOiBpbml0aWFsU3R5bGVzW25hbWVdKTsgLy8gU2V0IGFsbCB2YWx1ZXMgdG8gYW4gZW1wdHkgc3RyaW5nIHRvIHVuc2V0IHRoZW1cblxuICAgICAgdmFyIHN0eWxlID0gc3R5bGVQcm9wZXJ0aWVzLnJlZHVjZShmdW5jdGlvbiAoc3R5bGUsIHByb3BlcnR5KSB7XG4gICAgICAgIHN0eWxlW3Byb3BlcnR5XSA9ICcnO1xuICAgICAgICByZXR1cm4gc3R5bGU7XG4gICAgICB9LCB7fSk7IC8vIGFycm93IGlzIG9wdGlvbmFsICsgdmlydHVhbCBlbGVtZW50c1xuXG4gICAgICBpZiAoIWlzSFRNTEVsZW1lbnQoZWxlbWVudCkgfHwgIWdldE5vZGVOYW1lKGVsZW1lbnQpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgT2JqZWN0LmFzc2lnbihlbGVtZW50LnN0eWxlLCBzdHlsZSk7XG4gICAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChhdHRyaWJ1dGUpIHtcbiAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xufSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnYXBwbHlTdHlsZXMnLFxuICBlbmFibGVkOiB0cnVlLFxuICBwaGFzZTogJ3dyaXRlJyxcbiAgZm46IGFwcGx5U3R5bGVzLFxuICBlZmZlY3Q6IGVmZmVjdCxcbiAgcmVxdWlyZXM6IFsnY29tcHV0ZVN0eWxlcyddXG59OyIsImltcG9ydCBnZXRCYXNlUGxhY2VtZW50IGZyb20gXCIuLi91dGlscy9nZXRCYXNlUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgZ2V0TGF5b3V0UmVjdCBmcm9tIFwiLi4vZG9tLXV0aWxzL2dldExheW91dFJlY3QuanNcIjtcbmltcG9ydCBjb250YWlucyBmcm9tIFwiLi4vZG9tLXV0aWxzL2NvbnRhaW5zLmpzXCI7XG5pbXBvcnQgZ2V0T2Zmc2V0UGFyZW50IGZyb20gXCIuLi9kb20tdXRpbHMvZ2V0T2Zmc2V0UGFyZW50LmpzXCI7XG5pbXBvcnQgZ2V0TWFpbkF4aXNGcm9tUGxhY2VtZW50IGZyb20gXCIuLi91dGlscy9nZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQuanNcIjtcbmltcG9ydCB7IHdpdGhpbiB9IGZyb20gXCIuLi91dGlscy93aXRoaW4uanNcIjtcbmltcG9ydCBtZXJnZVBhZGRpbmdPYmplY3QgZnJvbSBcIi4uL3V0aWxzL21lcmdlUGFkZGluZ09iamVjdC5qc1wiO1xuaW1wb3J0IGV4cGFuZFRvSGFzaE1hcCBmcm9tIFwiLi4vdXRpbHMvZXhwYW5kVG9IYXNoTWFwLmpzXCI7XG5pbXBvcnQgeyBsZWZ0LCByaWdodCwgYmFzZVBsYWNlbWVudHMsIHRvcCwgYm90dG9tIH0gZnJvbSBcIi4uL2VudW1zLmpzXCI7XG5pbXBvcnQgeyBpc0hUTUxFbGVtZW50IH0gZnJvbSBcIi4uL2RvbS11dGlscy9pbnN0YW5jZU9mLmpzXCI7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxudmFyIHRvUGFkZGluZ09iamVjdCA9IGZ1bmN0aW9uIHRvUGFkZGluZ09iamVjdChwYWRkaW5nLCBzdGF0ZSkge1xuICBwYWRkaW5nID0gdHlwZW9mIHBhZGRpbmcgPT09ICdmdW5jdGlvbicgPyBwYWRkaW5nKE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLnJlY3RzLCB7XG4gICAgcGxhY2VtZW50OiBzdGF0ZS5wbGFjZW1lbnRcbiAgfSkpIDogcGFkZGluZztcbiAgcmV0dXJuIG1lcmdlUGFkZGluZ09iamVjdCh0eXBlb2YgcGFkZGluZyAhPT0gJ251bWJlcicgPyBwYWRkaW5nIDogZXhwYW5kVG9IYXNoTWFwKHBhZGRpbmcsIGJhc2VQbGFjZW1lbnRzKSk7XG59O1xuXG5mdW5jdGlvbiBhcnJvdyhfcmVmKSB7XG4gIHZhciBfc3RhdGUkbW9kaWZpZXJzRGF0YSQ7XG5cbiAgdmFyIHN0YXRlID0gX3JlZi5zdGF0ZSxcbiAgICAgIG5hbWUgPSBfcmVmLm5hbWUsXG4gICAgICBvcHRpb25zID0gX3JlZi5vcHRpb25zO1xuICB2YXIgYXJyb3dFbGVtZW50ID0gc3RhdGUuZWxlbWVudHMuYXJyb3c7XG4gIHZhciBwb3BwZXJPZmZzZXRzID0gc3RhdGUubW9kaWZpZXJzRGF0YS5wb3BwZXJPZmZzZXRzO1xuICB2YXIgYmFzZVBsYWNlbWVudCA9IGdldEJhc2VQbGFjZW1lbnQoc3RhdGUucGxhY2VtZW50KTtcbiAgdmFyIGF4aXMgPSBnZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQoYmFzZVBsYWNlbWVudCk7XG4gIHZhciBpc1ZlcnRpY2FsID0gW2xlZnQsIHJpZ2h0XS5pbmRleE9mKGJhc2VQbGFjZW1lbnQpID49IDA7XG4gIHZhciBsZW4gPSBpc1ZlcnRpY2FsID8gJ2hlaWdodCcgOiAnd2lkdGgnO1xuXG4gIGlmICghYXJyb3dFbGVtZW50IHx8ICFwb3BwZXJPZmZzZXRzKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIHBhZGRpbmdPYmplY3QgPSB0b1BhZGRpbmdPYmplY3Qob3B0aW9ucy5wYWRkaW5nLCBzdGF0ZSk7XG4gIHZhciBhcnJvd1JlY3QgPSBnZXRMYXlvdXRSZWN0KGFycm93RWxlbWVudCk7XG4gIHZhciBtaW5Qcm9wID0gYXhpcyA9PT0gJ3knID8gdG9wIDogbGVmdDtcbiAgdmFyIG1heFByb3AgPSBheGlzID09PSAneScgPyBib3R0b20gOiByaWdodDtcbiAgdmFyIGVuZERpZmYgPSBzdGF0ZS5yZWN0cy5yZWZlcmVuY2VbbGVuXSArIHN0YXRlLnJlY3RzLnJlZmVyZW5jZVtheGlzXSAtIHBvcHBlck9mZnNldHNbYXhpc10gLSBzdGF0ZS5yZWN0cy5wb3BwZXJbbGVuXTtcbiAgdmFyIHN0YXJ0RGlmZiA9IHBvcHBlck9mZnNldHNbYXhpc10gLSBzdGF0ZS5yZWN0cy5yZWZlcmVuY2VbYXhpc107XG4gIHZhciBhcnJvd09mZnNldFBhcmVudCA9IGdldE9mZnNldFBhcmVudChhcnJvd0VsZW1lbnQpO1xuICB2YXIgY2xpZW50U2l6ZSA9IGFycm93T2Zmc2V0UGFyZW50ID8gYXhpcyA9PT0gJ3knID8gYXJyb3dPZmZzZXRQYXJlbnQuY2xpZW50SGVpZ2h0IHx8IDAgOiBhcnJvd09mZnNldFBhcmVudC5jbGllbnRXaWR0aCB8fCAwIDogMDtcbiAgdmFyIGNlbnRlclRvUmVmZXJlbmNlID0gZW5kRGlmZiAvIDIgLSBzdGFydERpZmYgLyAyOyAvLyBNYWtlIHN1cmUgdGhlIGFycm93IGRvZXNuJ3Qgb3ZlcmZsb3cgdGhlIHBvcHBlciBpZiB0aGUgY2VudGVyIHBvaW50IGlzXG4gIC8vIG91dHNpZGUgb2YgdGhlIHBvcHBlciBib3VuZHNcblxuICB2YXIgbWluID0gcGFkZGluZ09iamVjdFttaW5Qcm9wXTtcbiAgdmFyIG1heCA9IGNsaWVudFNpemUgLSBhcnJvd1JlY3RbbGVuXSAtIHBhZGRpbmdPYmplY3RbbWF4UHJvcF07XG4gIHZhciBjZW50ZXIgPSBjbGllbnRTaXplIC8gMiAtIGFycm93UmVjdFtsZW5dIC8gMiArIGNlbnRlclRvUmVmZXJlbmNlO1xuICB2YXIgb2Zmc2V0ID0gd2l0aGluKG1pbiwgY2VudGVyLCBtYXgpOyAvLyBQcmV2ZW50cyBicmVha2luZyBzeW50YXggaGlnaGxpZ2h0aW5nLi4uXG5cbiAgdmFyIGF4aXNQcm9wID0gYXhpcztcbiAgc3RhdGUubW9kaWZpZXJzRGF0YVtuYW1lXSA9IChfc3RhdGUkbW9kaWZpZXJzRGF0YSQgPSB7fSwgX3N0YXRlJG1vZGlmaWVyc0RhdGEkW2F4aXNQcm9wXSA9IG9mZnNldCwgX3N0YXRlJG1vZGlmaWVyc0RhdGEkLmNlbnRlck9mZnNldCA9IG9mZnNldCAtIGNlbnRlciwgX3N0YXRlJG1vZGlmaWVyc0RhdGEkKTtcbn1cblxuZnVuY3Rpb24gZWZmZWN0KF9yZWYyKSB7XG4gIHZhciBzdGF0ZSA9IF9yZWYyLnN0YXRlLFxuICAgICAgb3B0aW9ucyA9IF9yZWYyLm9wdGlvbnM7XG4gIHZhciBfb3B0aW9ucyRlbGVtZW50ID0gb3B0aW9ucy5lbGVtZW50LFxuICAgICAgYXJyb3dFbGVtZW50ID0gX29wdGlvbnMkZWxlbWVudCA9PT0gdm9pZCAwID8gJ1tkYXRhLXBvcHBlci1hcnJvd10nIDogX29wdGlvbnMkZWxlbWVudDtcblxuICBpZiAoYXJyb3dFbGVtZW50ID09IG51bGwpIHtcbiAgICByZXR1cm47XG4gIH0gLy8gQ1NTIHNlbGVjdG9yXG5cblxuICBpZiAodHlwZW9mIGFycm93RWxlbWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICBhcnJvd0VsZW1lbnQgPSBzdGF0ZS5lbGVtZW50cy5wb3BwZXIucXVlcnlTZWxlY3RvcihhcnJvd0VsZW1lbnQpO1xuXG4gICAgaWYgKCFhcnJvd0VsZW1lbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgaWYgKCFpc0hUTUxFbGVtZW50KGFycm93RWxlbWVudCkpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoWydQb3BwZXI6IFwiYXJyb3dcIiBlbGVtZW50IG11c3QgYmUgYW4gSFRNTEVsZW1lbnQgKG5vdCBhbiBTVkdFbGVtZW50KS4nLCAnVG8gdXNlIGFuIFNWRyBhcnJvdywgd3JhcCBpdCBpbiBhbiBIVE1MRWxlbWVudCB0aGF0IHdpbGwgYmUgdXNlZCBhcycsICd0aGUgYXJyb3cuJ10uam9pbignICcpKTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWNvbnRhaW5zKHN0YXRlLmVsZW1lbnRzLnBvcHBlciwgYXJyb3dFbGVtZW50KSkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoWydQb3BwZXI6IFwiYXJyb3dcIiBtb2RpZmllclxcJ3MgYGVsZW1lbnRgIG11c3QgYmUgYSBjaGlsZCBvZiB0aGUgcG9wcGVyJywgJ2VsZW1lbnQuJ10uam9pbignICcpKTtcbiAgICB9XG5cbiAgICByZXR1cm47XG4gIH1cblxuICBzdGF0ZS5lbGVtZW50cy5hcnJvdyA9IGFycm93RWxlbWVudDtcbn0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ2Fycm93JyxcbiAgZW5hYmxlZDogdHJ1ZSxcbiAgcGhhc2U6ICdtYWluJyxcbiAgZm46IGFycm93LFxuICBlZmZlY3Q6IGVmZmVjdCxcbiAgcmVxdWlyZXM6IFsncG9wcGVyT2Zmc2V0cyddLFxuICByZXF1aXJlc0lmRXhpc3RzOiBbJ3ByZXZlbnRPdmVyZmxvdyddXG59OyIsImltcG9ydCB7IHRvcCwgbGVmdCwgcmlnaHQsIGJvdHRvbSwgZW5kIH0gZnJvbSBcIi4uL2VudW1zLmpzXCI7XG5pbXBvcnQgZ2V0T2Zmc2V0UGFyZW50IGZyb20gXCIuLi9kb20tdXRpbHMvZ2V0T2Zmc2V0UGFyZW50LmpzXCI7XG5pbXBvcnQgZ2V0V2luZG93IGZyb20gXCIuLi9kb20tdXRpbHMvZ2V0V2luZG93LmpzXCI7XG5pbXBvcnQgZ2V0RG9jdW1lbnRFbGVtZW50IGZyb20gXCIuLi9kb20tdXRpbHMvZ2V0RG9jdW1lbnRFbGVtZW50LmpzXCI7XG5pbXBvcnQgZ2V0Q29tcHV0ZWRTdHlsZSBmcm9tIFwiLi4vZG9tLXV0aWxzL2dldENvbXB1dGVkU3R5bGUuanNcIjtcbmltcG9ydCBnZXRCYXNlUGxhY2VtZW50IGZyb20gXCIuLi91dGlscy9nZXRCYXNlUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgZ2V0VmFyaWF0aW9uIGZyb20gXCIuLi91dGlscy9nZXRWYXJpYXRpb24uanNcIjtcbmltcG9ydCB7IHJvdW5kIH0gZnJvbSBcIi4uL3V0aWxzL21hdGguanNcIjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG52YXIgdW5zZXRTaWRlcyA9IHtcbiAgdG9wOiAnYXV0bycsXG4gIHJpZ2h0OiAnYXV0bycsXG4gIGJvdHRvbTogJ2F1dG8nLFxuICBsZWZ0OiAnYXV0bydcbn07IC8vIFJvdW5kIHRoZSBvZmZzZXRzIHRvIHRoZSBuZWFyZXN0IHN1aXRhYmxlIHN1YnBpeGVsIGJhc2VkIG9uIHRoZSBEUFIuXG4vLyBab29taW5nIGNhbiBjaGFuZ2UgdGhlIERQUiwgYnV0IGl0IHNlZW1zIHRvIHJlcG9ydCBhIHZhbHVlIHRoYXQgd2lsbFxuLy8gY2xlYW5seSBkaXZpZGUgdGhlIHZhbHVlcyBpbnRvIHRoZSBhcHByb3ByaWF0ZSBzdWJwaXhlbHMuXG5cbmZ1bmN0aW9uIHJvdW5kT2Zmc2V0c0J5RFBSKF9yZWYpIHtcbiAgdmFyIHggPSBfcmVmLngsXG4gICAgICB5ID0gX3JlZi55O1xuICB2YXIgd2luID0gd2luZG93O1xuICB2YXIgZHByID0gd2luLmRldmljZVBpeGVsUmF0aW8gfHwgMTtcbiAgcmV0dXJuIHtcbiAgICB4OiByb3VuZCh4ICogZHByKSAvIGRwciB8fCAwLFxuICAgIHk6IHJvdW5kKHkgKiBkcHIpIC8gZHByIHx8IDBcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1hcFRvU3R5bGVzKF9yZWYyKSB7XG4gIHZhciBfT2JqZWN0JGFzc2lnbjI7XG5cbiAgdmFyIHBvcHBlciA9IF9yZWYyLnBvcHBlcixcbiAgICAgIHBvcHBlclJlY3QgPSBfcmVmMi5wb3BwZXJSZWN0LFxuICAgICAgcGxhY2VtZW50ID0gX3JlZjIucGxhY2VtZW50LFxuICAgICAgdmFyaWF0aW9uID0gX3JlZjIudmFyaWF0aW9uLFxuICAgICAgb2Zmc2V0cyA9IF9yZWYyLm9mZnNldHMsXG4gICAgICBwb3NpdGlvbiA9IF9yZWYyLnBvc2l0aW9uLFxuICAgICAgZ3B1QWNjZWxlcmF0aW9uID0gX3JlZjIuZ3B1QWNjZWxlcmF0aW9uLFxuICAgICAgYWRhcHRpdmUgPSBfcmVmMi5hZGFwdGl2ZSxcbiAgICAgIHJvdW5kT2Zmc2V0cyA9IF9yZWYyLnJvdW5kT2Zmc2V0cyxcbiAgICAgIGlzRml4ZWQgPSBfcmVmMi5pc0ZpeGVkO1xuICB2YXIgX29mZnNldHMkeCA9IG9mZnNldHMueCxcbiAgICAgIHggPSBfb2Zmc2V0cyR4ID09PSB2b2lkIDAgPyAwIDogX29mZnNldHMkeCxcbiAgICAgIF9vZmZzZXRzJHkgPSBvZmZzZXRzLnksXG4gICAgICB5ID0gX29mZnNldHMkeSA9PT0gdm9pZCAwID8gMCA6IF9vZmZzZXRzJHk7XG5cbiAgdmFyIF9yZWYzID0gdHlwZW9mIHJvdW5kT2Zmc2V0cyA9PT0gJ2Z1bmN0aW9uJyA/IHJvdW5kT2Zmc2V0cyh7XG4gICAgeDogeCxcbiAgICB5OiB5XG4gIH0pIDoge1xuICAgIHg6IHgsXG4gICAgeTogeVxuICB9O1xuXG4gIHggPSBfcmVmMy54O1xuICB5ID0gX3JlZjMueTtcbiAgdmFyIGhhc1ggPSBvZmZzZXRzLmhhc093blByb3BlcnR5KCd4Jyk7XG4gIHZhciBoYXNZID0gb2Zmc2V0cy5oYXNPd25Qcm9wZXJ0eSgneScpO1xuICB2YXIgc2lkZVggPSBsZWZ0O1xuICB2YXIgc2lkZVkgPSB0b3A7XG4gIHZhciB3aW4gPSB3aW5kb3c7XG5cbiAgaWYgKGFkYXB0aXZlKSB7XG4gICAgdmFyIG9mZnNldFBhcmVudCA9IGdldE9mZnNldFBhcmVudChwb3BwZXIpO1xuICAgIHZhciBoZWlnaHRQcm9wID0gJ2NsaWVudEhlaWdodCc7XG4gICAgdmFyIHdpZHRoUHJvcCA9ICdjbGllbnRXaWR0aCc7XG5cbiAgICBpZiAob2Zmc2V0UGFyZW50ID09PSBnZXRXaW5kb3cocG9wcGVyKSkge1xuICAgICAgb2Zmc2V0UGFyZW50ID0gZ2V0RG9jdW1lbnRFbGVtZW50KHBvcHBlcik7XG5cbiAgICAgIGlmIChnZXRDb21wdXRlZFN0eWxlKG9mZnNldFBhcmVudCkucG9zaXRpb24gIT09ICdzdGF0aWMnICYmIHBvc2l0aW9uID09PSAnYWJzb2x1dGUnKSB7XG4gICAgICAgIGhlaWdodFByb3AgPSAnc2Nyb2xsSGVpZ2h0JztcbiAgICAgICAgd2lkdGhQcm9wID0gJ3Njcm9sbFdpZHRoJztcbiAgICAgIH1cbiAgICB9IC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLWNhc3RdOiBmb3JjZSB0eXBlIHJlZmluZW1lbnQsIHdlIGNvbXBhcmUgb2Zmc2V0UGFyZW50IHdpdGggd2luZG93IGFib3ZlLCBidXQgRmxvdyBkb2Vzbid0IGRldGVjdCBpdFxuXG5cbiAgICBvZmZzZXRQYXJlbnQgPSBvZmZzZXRQYXJlbnQ7XG5cbiAgICBpZiAocGxhY2VtZW50ID09PSB0b3AgfHwgKHBsYWNlbWVudCA9PT0gbGVmdCB8fCBwbGFjZW1lbnQgPT09IHJpZ2h0KSAmJiB2YXJpYXRpb24gPT09IGVuZCkge1xuICAgICAgc2lkZVkgPSBib3R0b207XG4gICAgICB2YXIgb2Zmc2V0WSA9IGlzRml4ZWQgJiYgb2Zmc2V0UGFyZW50ID09PSB3aW4gJiYgd2luLnZpc3VhbFZpZXdwb3J0ID8gd2luLnZpc3VhbFZpZXdwb3J0LmhlaWdodCA6IC8vICRGbG93Rml4TWVbcHJvcC1taXNzaW5nXVxuICAgICAgb2Zmc2V0UGFyZW50W2hlaWdodFByb3BdO1xuICAgICAgeSAtPSBvZmZzZXRZIC0gcG9wcGVyUmVjdC5oZWlnaHQ7XG4gICAgICB5ICo9IGdwdUFjY2VsZXJhdGlvbiA/IDEgOiAtMTtcbiAgICB9XG5cbiAgICBpZiAocGxhY2VtZW50ID09PSBsZWZ0IHx8IChwbGFjZW1lbnQgPT09IHRvcCB8fCBwbGFjZW1lbnQgPT09IGJvdHRvbSkgJiYgdmFyaWF0aW9uID09PSBlbmQpIHtcbiAgICAgIHNpZGVYID0gcmlnaHQ7XG4gICAgICB2YXIgb2Zmc2V0WCA9IGlzRml4ZWQgJiYgb2Zmc2V0UGFyZW50ID09PSB3aW4gJiYgd2luLnZpc3VhbFZpZXdwb3J0ID8gd2luLnZpc3VhbFZpZXdwb3J0LndpZHRoIDogLy8gJEZsb3dGaXhNZVtwcm9wLW1pc3NpbmddXG4gICAgICBvZmZzZXRQYXJlbnRbd2lkdGhQcm9wXTtcbiAgICAgIHggLT0gb2Zmc2V0WCAtIHBvcHBlclJlY3Qud2lkdGg7XG4gICAgICB4ICo9IGdwdUFjY2VsZXJhdGlvbiA/IDEgOiAtMTtcbiAgICB9XG4gIH1cblxuICB2YXIgY29tbW9uU3R5bGVzID0gT2JqZWN0LmFzc2lnbih7XG4gICAgcG9zaXRpb246IHBvc2l0aW9uXG4gIH0sIGFkYXB0aXZlICYmIHVuc2V0U2lkZXMpO1xuXG4gIHZhciBfcmVmNCA9IHJvdW5kT2Zmc2V0cyA9PT0gdHJ1ZSA/IHJvdW5kT2Zmc2V0c0J5RFBSKHtcbiAgICB4OiB4LFxuICAgIHk6IHlcbiAgfSkgOiB7XG4gICAgeDogeCxcbiAgICB5OiB5XG4gIH07XG5cbiAgeCA9IF9yZWY0Lng7XG4gIHkgPSBfcmVmNC55O1xuXG4gIGlmIChncHVBY2NlbGVyYXRpb24pIHtcbiAgICB2YXIgX09iamVjdCRhc3NpZ247XG5cbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uU3R5bGVzLCAoX09iamVjdCRhc3NpZ24gPSB7fSwgX09iamVjdCRhc3NpZ25bc2lkZVldID0gaGFzWSA/ICcwJyA6ICcnLCBfT2JqZWN0JGFzc2lnbltzaWRlWF0gPSBoYXNYID8gJzAnIDogJycsIF9PYmplY3QkYXNzaWduLnRyYW5zZm9ybSA9ICh3aW4uZGV2aWNlUGl4ZWxSYXRpbyB8fCAxKSA8PSAxID8gXCJ0cmFuc2xhdGUoXCIgKyB4ICsgXCJweCwgXCIgKyB5ICsgXCJweClcIiA6IFwidHJhbnNsYXRlM2QoXCIgKyB4ICsgXCJweCwgXCIgKyB5ICsgXCJweCwgMClcIiwgX09iamVjdCRhc3NpZ24pKTtcbiAgfVxuXG4gIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBjb21tb25TdHlsZXMsIChfT2JqZWN0JGFzc2lnbjIgPSB7fSwgX09iamVjdCRhc3NpZ24yW3NpZGVZXSA9IGhhc1kgPyB5ICsgXCJweFwiIDogJycsIF9PYmplY3QkYXNzaWduMltzaWRlWF0gPSBoYXNYID8geCArIFwicHhcIiA6ICcnLCBfT2JqZWN0JGFzc2lnbjIudHJhbnNmb3JtID0gJycsIF9PYmplY3QkYXNzaWduMikpO1xufVxuXG5mdW5jdGlvbiBjb21wdXRlU3R5bGVzKF9yZWY1KSB7XG4gIHZhciBzdGF0ZSA9IF9yZWY1LnN0YXRlLFxuICAgICAgb3B0aW9ucyA9IF9yZWY1Lm9wdGlvbnM7XG4gIHZhciBfb3B0aW9ucyRncHVBY2NlbGVyYXQgPSBvcHRpb25zLmdwdUFjY2VsZXJhdGlvbixcbiAgICAgIGdwdUFjY2VsZXJhdGlvbiA9IF9vcHRpb25zJGdwdUFjY2VsZXJhdCA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJGdwdUFjY2VsZXJhdCxcbiAgICAgIF9vcHRpb25zJGFkYXB0aXZlID0gb3B0aW9ucy5hZGFwdGl2ZSxcbiAgICAgIGFkYXB0aXZlID0gX29wdGlvbnMkYWRhcHRpdmUgPT09IHZvaWQgMCA/IHRydWUgOiBfb3B0aW9ucyRhZGFwdGl2ZSxcbiAgICAgIF9vcHRpb25zJHJvdW5kT2Zmc2V0cyA9IG9wdGlvbnMucm91bmRPZmZzZXRzLFxuICAgICAgcm91bmRPZmZzZXRzID0gX29wdGlvbnMkcm91bmRPZmZzZXRzID09PSB2b2lkIDAgPyB0cnVlIDogX29wdGlvbnMkcm91bmRPZmZzZXRzO1xuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICB2YXIgdHJhbnNpdGlvblByb3BlcnR5ID0gZ2V0Q29tcHV0ZWRTdHlsZShzdGF0ZS5lbGVtZW50cy5wb3BwZXIpLnRyYW5zaXRpb25Qcm9wZXJ0eSB8fCAnJztcblxuICAgIGlmIChhZGFwdGl2ZSAmJiBbJ3RyYW5zZm9ybScsICd0b3AnLCAncmlnaHQnLCAnYm90dG9tJywgJ2xlZnQnXS5zb21lKGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgcmV0dXJuIHRyYW5zaXRpb25Qcm9wZXJ0eS5pbmRleE9mKHByb3BlcnR5KSA+PSAwO1xuICAgIH0pKSB7XG4gICAgICBjb25zb2xlLndhcm4oWydQb3BwZXI6IERldGVjdGVkIENTUyB0cmFuc2l0aW9ucyBvbiBhdCBsZWFzdCBvbmUgb2YgdGhlIGZvbGxvd2luZycsICdDU1MgcHJvcGVydGllczogXCJ0cmFuc2Zvcm1cIiwgXCJ0b3BcIiwgXCJyaWdodFwiLCBcImJvdHRvbVwiLCBcImxlZnRcIi4nLCAnXFxuXFxuJywgJ0Rpc2FibGUgdGhlIFwiY29tcHV0ZVN0eWxlc1wiIG1vZGlmaWVyXFwncyBgYWRhcHRpdmVgIG9wdGlvbiB0byBhbGxvdycsICdmb3Igc21vb3RoIHRyYW5zaXRpb25zLCBvciByZW1vdmUgdGhlc2UgcHJvcGVydGllcyBmcm9tIHRoZSBDU1MnLCAndHJhbnNpdGlvbiBkZWNsYXJhdGlvbiBvbiB0aGUgcG9wcGVyIGVsZW1lbnQgaWYgb25seSB0cmFuc2l0aW9uaW5nJywgJ29wYWNpdHkgb3IgYmFja2dyb3VuZC1jb2xvciBmb3IgZXhhbXBsZS4nLCAnXFxuXFxuJywgJ1dlIHJlY29tbWVuZCB1c2luZyB0aGUgcG9wcGVyIGVsZW1lbnQgYXMgYSB3cmFwcGVyIGFyb3VuZCBhbiBpbm5lcicsICdlbGVtZW50IHRoYXQgY2FuIGhhdmUgYW55IENTUyBwcm9wZXJ0eSB0cmFuc2l0aW9uZWQgZm9yIGFuaW1hdGlvbnMuJ10uam9pbignICcpKTtcbiAgICB9XG4gIH1cblxuICB2YXIgY29tbW9uU3R5bGVzID0ge1xuICAgIHBsYWNlbWVudDogZ2V0QmFzZVBsYWNlbWVudChzdGF0ZS5wbGFjZW1lbnQpLFxuICAgIHZhcmlhdGlvbjogZ2V0VmFyaWF0aW9uKHN0YXRlLnBsYWNlbWVudCksXG4gICAgcG9wcGVyOiBzdGF0ZS5lbGVtZW50cy5wb3BwZXIsXG4gICAgcG9wcGVyUmVjdDogc3RhdGUucmVjdHMucG9wcGVyLFxuICAgIGdwdUFjY2VsZXJhdGlvbjogZ3B1QWNjZWxlcmF0aW9uLFxuICAgIGlzRml4ZWQ6IHN0YXRlLm9wdGlvbnMuc3RyYXRlZ3kgPT09ICdmaXhlZCdcbiAgfTtcblxuICBpZiAoc3RhdGUubW9kaWZpZXJzRGF0YS5wb3BwZXJPZmZzZXRzICE9IG51bGwpIHtcbiAgICBzdGF0ZS5zdHlsZXMucG9wcGVyID0gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuc3R5bGVzLnBvcHBlciwgbWFwVG9TdHlsZXMoT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uU3R5bGVzLCB7XG4gICAgICBvZmZzZXRzOiBzdGF0ZS5tb2RpZmllcnNEYXRhLnBvcHBlck9mZnNldHMsXG4gICAgICBwb3NpdGlvbjogc3RhdGUub3B0aW9ucy5zdHJhdGVneSxcbiAgICAgIGFkYXB0aXZlOiBhZGFwdGl2ZSxcbiAgICAgIHJvdW5kT2Zmc2V0czogcm91bmRPZmZzZXRzXG4gICAgfSkpKTtcbiAgfVxuXG4gIGlmIChzdGF0ZS5tb2RpZmllcnNEYXRhLmFycm93ICE9IG51bGwpIHtcbiAgICBzdGF0ZS5zdHlsZXMuYXJyb3cgPSBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5zdHlsZXMuYXJyb3csIG1hcFRvU3R5bGVzKE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblN0eWxlcywge1xuICAgICAgb2Zmc2V0czogc3RhdGUubW9kaWZpZXJzRGF0YS5hcnJvdyxcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgYWRhcHRpdmU6IGZhbHNlLFxuICAgICAgcm91bmRPZmZzZXRzOiByb3VuZE9mZnNldHNcbiAgICB9KSkpO1xuICB9XG5cbiAgc3RhdGUuYXR0cmlidXRlcy5wb3BwZXIgPSBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5hdHRyaWJ1dGVzLnBvcHBlciwge1xuICAgICdkYXRhLXBvcHBlci1wbGFjZW1lbnQnOiBzdGF0ZS5wbGFjZW1lbnRcbiAgfSk7XG59IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdjb21wdXRlU3R5bGVzJyxcbiAgZW5hYmxlZDogdHJ1ZSxcbiAgcGhhc2U6ICdiZWZvcmVXcml0ZScsXG4gIGZuOiBjb21wdXRlU3R5bGVzLFxuICBkYXRhOiB7fVxufTsiLCJpbXBvcnQgZ2V0V2luZG93IGZyb20gXCIuLi9kb20tdXRpbHMvZ2V0V2luZG93LmpzXCI7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxudmFyIHBhc3NpdmUgPSB7XG4gIHBhc3NpdmU6IHRydWVcbn07XG5cbmZ1bmN0aW9uIGVmZmVjdChfcmVmKSB7XG4gIHZhciBzdGF0ZSA9IF9yZWYuc3RhdGUsXG4gICAgICBpbnN0YW5jZSA9IF9yZWYuaW5zdGFuY2UsXG4gICAgICBvcHRpb25zID0gX3JlZi5vcHRpb25zO1xuICB2YXIgX29wdGlvbnMkc2Nyb2xsID0gb3B0aW9ucy5zY3JvbGwsXG4gICAgICBzY3JvbGwgPSBfb3B0aW9ucyRzY3JvbGwgPT09IHZvaWQgMCA/IHRydWUgOiBfb3B0aW9ucyRzY3JvbGwsXG4gICAgICBfb3B0aW9ucyRyZXNpemUgPSBvcHRpb25zLnJlc2l6ZSxcbiAgICAgIHJlc2l6ZSA9IF9vcHRpb25zJHJlc2l6ZSA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJHJlc2l6ZTtcbiAgdmFyIHdpbmRvdyA9IGdldFdpbmRvdyhzdGF0ZS5lbGVtZW50cy5wb3BwZXIpO1xuICB2YXIgc2Nyb2xsUGFyZW50cyA9IFtdLmNvbmNhdChzdGF0ZS5zY3JvbGxQYXJlbnRzLnJlZmVyZW5jZSwgc3RhdGUuc2Nyb2xsUGFyZW50cy5wb3BwZXIpO1xuXG4gIGlmIChzY3JvbGwpIHtcbiAgICBzY3JvbGxQYXJlbnRzLmZvckVhY2goZnVuY3Rpb24gKHNjcm9sbFBhcmVudCkge1xuICAgICAgc2Nyb2xsUGFyZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGluc3RhbmNlLnVwZGF0ZSwgcGFzc2l2ZSk7XG4gICAgfSk7XG4gIH1cblxuICBpZiAocmVzaXplKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGluc3RhbmNlLnVwZGF0ZSwgcGFzc2l2ZSk7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGlmIChzY3JvbGwpIHtcbiAgICAgIHNjcm9sbFBhcmVudHMuZm9yRWFjaChmdW5jdGlvbiAoc2Nyb2xsUGFyZW50KSB7XG4gICAgICAgIHNjcm9sbFBhcmVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBpbnN0YW5jZS51cGRhdGUsIHBhc3NpdmUpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHJlc2l6ZSkge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGluc3RhbmNlLnVwZGF0ZSwgcGFzc2l2ZSk7XG4gICAgfVxuICB9O1xufSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnZXZlbnRMaXN0ZW5lcnMnLFxuICBlbmFibGVkOiB0cnVlLFxuICBwaGFzZTogJ3dyaXRlJyxcbiAgZm46IGZ1bmN0aW9uIGZuKCkge30sXG4gIGVmZmVjdDogZWZmZWN0LFxuICBkYXRhOiB7fVxufTsiLCJpbXBvcnQgZ2V0T3Bwb3NpdGVQbGFjZW1lbnQgZnJvbSBcIi4uL3V0aWxzL2dldE9wcG9zaXRlUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgZ2V0QmFzZVBsYWNlbWVudCBmcm9tIFwiLi4vdXRpbHMvZ2V0QmFzZVBsYWNlbWVudC5qc1wiO1xuaW1wb3J0IGdldE9wcG9zaXRlVmFyaWF0aW9uUGxhY2VtZW50IGZyb20gXCIuLi91dGlscy9nZXRPcHBvc2l0ZVZhcmlhdGlvblBsYWNlbWVudC5qc1wiO1xuaW1wb3J0IGRldGVjdE92ZXJmbG93IGZyb20gXCIuLi91dGlscy9kZXRlY3RPdmVyZmxvdy5qc1wiO1xuaW1wb3J0IGNvbXB1dGVBdXRvUGxhY2VtZW50IGZyb20gXCIuLi91dGlscy9jb21wdXRlQXV0b1BsYWNlbWVudC5qc1wiO1xuaW1wb3J0IHsgYm90dG9tLCB0b3AsIHN0YXJ0LCByaWdodCwgbGVmdCwgYXV0byB9IGZyb20gXCIuLi9lbnVtcy5qc1wiO1xuaW1wb3J0IGdldFZhcmlhdGlvbiBmcm9tIFwiLi4vdXRpbHMvZ2V0VmFyaWF0aW9uLmpzXCI7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuZnVuY3Rpb24gZ2V0RXhwYW5kZWRGYWxsYmFja1BsYWNlbWVudHMocGxhY2VtZW50KSB7XG4gIGlmIChnZXRCYXNlUGxhY2VtZW50KHBsYWNlbWVudCkgPT09IGF1dG8pIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICB2YXIgb3Bwb3NpdGVQbGFjZW1lbnQgPSBnZXRPcHBvc2l0ZVBsYWNlbWVudChwbGFjZW1lbnQpO1xuICByZXR1cm4gW2dldE9wcG9zaXRlVmFyaWF0aW9uUGxhY2VtZW50KHBsYWNlbWVudCksIG9wcG9zaXRlUGxhY2VtZW50LCBnZXRPcHBvc2l0ZVZhcmlhdGlvblBsYWNlbWVudChvcHBvc2l0ZVBsYWNlbWVudCldO1xufVxuXG5mdW5jdGlvbiBmbGlwKF9yZWYpIHtcbiAgdmFyIHN0YXRlID0gX3JlZi5zdGF0ZSxcbiAgICAgIG9wdGlvbnMgPSBfcmVmLm9wdGlvbnMsXG4gICAgICBuYW1lID0gX3JlZi5uYW1lO1xuXG4gIGlmIChzdGF0ZS5tb2RpZmllcnNEYXRhW25hbWVdLl9za2lwKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIF9vcHRpb25zJG1haW5BeGlzID0gb3B0aW9ucy5tYWluQXhpcyxcbiAgICAgIGNoZWNrTWFpbkF4aXMgPSBfb3B0aW9ucyRtYWluQXhpcyA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJG1haW5BeGlzLFxuICAgICAgX29wdGlvbnMkYWx0QXhpcyA9IG9wdGlvbnMuYWx0QXhpcyxcbiAgICAgIGNoZWNrQWx0QXhpcyA9IF9vcHRpb25zJGFsdEF4aXMgPT09IHZvaWQgMCA/IHRydWUgOiBfb3B0aW9ucyRhbHRBeGlzLFxuICAgICAgc3BlY2lmaWVkRmFsbGJhY2tQbGFjZW1lbnRzID0gb3B0aW9ucy5mYWxsYmFja1BsYWNlbWVudHMsXG4gICAgICBwYWRkaW5nID0gb3B0aW9ucy5wYWRkaW5nLFxuICAgICAgYm91bmRhcnkgPSBvcHRpb25zLmJvdW5kYXJ5LFxuICAgICAgcm9vdEJvdW5kYXJ5ID0gb3B0aW9ucy5yb290Qm91bmRhcnksXG4gICAgICBhbHRCb3VuZGFyeSA9IG9wdGlvbnMuYWx0Qm91bmRhcnksXG4gICAgICBfb3B0aW9ucyRmbGlwVmFyaWF0aW8gPSBvcHRpb25zLmZsaXBWYXJpYXRpb25zLFxuICAgICAgZmxpcFZhcmlhdGlvbnMgPSBfb3B0aW9ucyRmbGlwVmFyaWF0aW8gPT09IHZvaWQgMCA/IHRydWUgOiBfb3B0aW9ucyRmbGlwVmFyaWF0aW8sXG4gICAgICBhbGxvd2VkQXV0b1BsYWNlbWVudHMgPSBvcHRpb25zLmFsbG93ZWRBdXRvUGxhY2VtZW50cztcbiAgdmFyIHByZWZlcnJlZFBsYWNlbWVudCA9IHN0YXRlLm9wdGlvbnMucGxhY2VtZW50O1xuICB2YXIgYmFzZVBsYWNlbWVudCA9IGdldEJhc2VQbGFjZW1lbnQocHJlZmVycmVkUGxhY2VtZW50KTtcbiAgdmFyIGlzQmFzZVBsYWNlbWVudCA9IGJhc2VQbGFjZW1lbnQgPT09IHByZWZlcnJlZFBsYWNlbWVudDtcbiAgdmFyIGZhbGxiYWNrUGxhY2VtZW50cyA9IHNwZWNpZmllZEZhbGxiYWNrUGxhY2VtZW50cyB8fCAoaXNCYXNlUGxhY2VtZW50IHx8ICFmbGlwVmFyaWF0aW9ucyA/IFtnZXRPcHBvc2l0ZVBsYWNlbWVudChwcmVmZXJyZWRQbGFjZW1lbnQpXSA6IGdldEV4cGFuZGVkRmFsbGJhY2tQbGFjZW1lbnRzKHByZWZlcnJlZFBsYWNlbWVudCkpO1xuICB2YXIgcGxhY2VtZW50cyA9IFtwcmVmZXJyZWRQbGFjZW1lbnRdLmNvbmNhdChmYWxsYmFja1BsYWNlbWVudHMpLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBwbGFjZW1lbnQpIHtcbiAgICByZXR1cm4gYWNjLmNvbmNhdChnZXRCYXNlUGxhY2VtZW50KHBsYWNlbWVudCkgPT09IGF1dG8gPyBjb21wdXRlQXV0b1BsYWNlbWVudChzdGF0ZSwge1xuICAgICAgcGxhY2VtZW50OiBwbGFjZW1lbnQsXG4gICAgICBib3VuZGFyeTogYm91bmRhcnksXG4gICAgICByb290Qm91bmRhcnk6IHJvb3RCb3VuZGFyeSxcbiAgICAgIHBhZGRpbmc6IHBhZGRpbmcsXG4gICAgICBmbGlwVmFyaWF0aW9uczogZmxpcFZhcmlhdGlvbnMsXG4gICAgICBhbGxvd2VkQXV0b1BsYWNlbWVudHM6IGFsbG93ZWRBdXRvUGxhY2VtZW50c1xuICAgIH0pIDogcGxhY2VtZW50KTtcbiAgfSwgW10pO1xuICB2YXIgcmVmZXJlbmNlUmVjdCA9IHN0YXRlLnJlY3RzLnJlZmVyZW5jZTtcbiAgdmFyIHBvcHBlclJlY3QgPSBzdGF0ZS5yZWN0cy5wb3BwZXI7XG4gIHZhciBjaGVja3NNYXAgPSBuZXcgTWFwKCk7XG4gIHZhciBtYWtlRmFsbGJhY2tDaGVja3MgPSB0cnVlO1xuICB2YXIgZmlyc3RGaXR0aW5nUGxhY2VtZW50ID0gcGxhY2VtZW50c1swXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHBsYWNlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgcGxhY2VtZW50ID0gcGxhY2VtZW50c1tpXTtcblxuICAgIHZhciBfYmFzZVBsYWNlbWVudCA9IGdldEJhc2VQbGFjZW1lbnQocGxhY2VtZW50KTtcblxuICAgIHZhciBpc1N0YXJ0VmFyaWF0aW9uID0gZ2V0VmFyaWF0aW9uKHBsYWNlbWVudCkgPT09IHN0YXJ0O1xuICAgIHZhciBpc1ZlcnRpY2FsID0gW3RvcCwgYm90dG9tXS5pbmRleE9mKF9iYXNlUGxhY2VtZW50KSA+PSAwO1xuICAgIHZhciBsZW4gPSBpc1ZlcnRpY2FsID8gJ3dpZHRoJyA6ICdoZWlnaHQnO1xuICAgIHZhciBvdmVyZmxvdyA9IGRldGVjdE92ZXJmbG93KHN0YXRlLCB7XG4gICAgICBwbGFjZW1lbnQ6IHBsYWNlbWVudCxcbiAgICAgIGJvdW5kYXJ5OiBib3VuZGFyeSxcbiAgICAgIHJvb3RCb3VuZGFyeTogcm9vdEJvdW5kYXJ5LFxuICAgICAgYWx0Qm91bmRhcnk6IGFsdEJvdW5kYXJ5LFxuICAgICAgcGFkZGluZzogcGFkZGluZ1xuICAgIH0pO1xuICAgIHZhciBtYWluVmFyaWF0aW9uU2lkZSA9IGlzVmVydGljYWwgPyBpc1N0YXJ0VmFyaWF0aW9uID8gcmlnaHQgOiBsZWZ0IDogaXNTdGFydFZhcmlhdGlvbiA/IGJvdHRvbSA6IHRvcDtcblxuICAgIGlmIChyZWZlcmVuY2VSZWN0W2xlbl0gPiBwb3BwZXJSZWN0W2xlbl0pIHtcbiAgICAgIG1haW5WYXJpYXRpb25TaWRlID0gZ2V0T3Bwb3NpdGVQbGFjZW1lbnQobWFpblZhcmlhdGlvblNpZGUpO1xuICAgIH1cblxuICAgIHZhciBhbHRWYXJpYXRpb25TaWRlID0gZ2V0T3Bwb3NpdGVQbGFjZW1lbnQobWFpblZhcmlhdGlvblNpZGUpO1xuICAgIHZhciBjaGVja3MgPSBbXTtcblxuICAgIGlmIChjaGVja01haW5BeGlzKSB7XG4gICAgICBjaGVja3MucHVzaChvdmVyZmxvd1tfYmFzZVBsYWNlbWVudF0gPD0gMCk7XG4gICAgfVxuXG4gICAgaWYgKGNoZWNrQWx0QXhpcykge1xuICAgICAgY2hlY2tzLnB1c2gob3ZlcmZsb3dbbWFpblZhcmlhdGlvblNpZGVdIDw9IDAsIG92ZXJmbG93W2FsdFZhcmlhdGlvblNpZGVdIDw9IDApO1xuICAgIH1cblxuICAgIGlmIChjaGVja3MuZXZlcnkoZnVuY3Rpb24gKGNoZWNrKSB7XG4gICAgICByZXR1cm4gY2hlY2s7XG4gICAgfSkpIHtcbiAgICAgIGZpcnN0Rml0dGluZ1BsYWNlbWVudCA9IHBsYWNlbWVudDtcbiAgICAgIG1ha2VGYWxsYmFja0NoZWNrcyA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY2hlY2tzTWFwLnNldChwbGFjZW1lbnQsIGNoZWNrcyk7XG4gIH1cblxuICBpZiAobWFrZUZhbGxiYWNrQ2hlY2tzKSB7XG4gICAgLy8gYDJgIG1heSBiZSBkZXNpcmVkIGluIHNvbWUgY2FzZXMg4oCTIHJlc2VhcmNoIGxhdGVyXG4gICAgdmFyIG51bWJlck9mQ2hlY2tzID0gZmxpcFZhcmlhdGlvbnMgPyAzIDogMTtcblxuICAgIHZhciBfbG9vcCA9IGZ1bmN0aW9uIF9sb29wKF9pKSB7XG4gICAgICB2YXIgZml0dGluZ1BsYWNlbWVudCA9IHBsYWNlbWVudHMuZmluZChmdW5jdGlvbiAocGxhY2VtZW50KSB7XG4gICAgICAgIHZhciBjaGVja3MgPSBjaGVja3NNYXAuZ2V0KHBsYWNlbWVudCk7XG5cbiAgICAgICAgaWYgKGNoZWNrcykge1xuICAgICAgICAgIHJldHVybiBjaGVja3Muc2xpY2UoMCwgX2kpLmV2ZXJ5KGZ1bmN0aW9uIChjaGVjaykge1xuICAgICAgICAgICAgcmV0dXJuIGNoZWNrO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaWYgKGZpdHRpbmdQbGFjZW1lbnQpIHtcbiAgICAgICAgZmlyc3RGaXR0aW5nUGxhY2VtZW50ID0gZml0dGluZ1BsYWNlbWVudDtcbiAgICAgICAgcmV0dXJuIFwiYnJlYWtcIjtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZm9yICh2YXIgX2kgPSBudW1iZXJPZkNoZWNrczsgX2kgPiAwOyBfaS0tKSB7XG4gICAgICB2YXIgX3JldCA9IF9sb29wKF9pKTtcblxuICAgICAgaWYgKF9yZXQgPT09IFwiYnJlYWtcIikgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgaWYgKHN0YXRlLnBsYWNlbWVudCAhPT0gZmlyc3RGaXR0aW5nUGxhY2VtZW50KSB7XG4gICAgc3RhdGUubW9kaWZpZXJzRGF0YVtuYW1lXS5fc2tpcCA9IHRydWU7XG4gICAgc3RhdGUucGxhY2VtZW50ID0gZmlyc3RGaXR0aW5nUGxhY2VtZW50O1xuICAgIHN0YXRlLnJlc2V0ID0gdHJ1ZTtcbiAgfVxufSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnZmxpcCcsXG4gIGVuYWJsZWQ6IHRydWUsXG4gIHBoYXNlOiAnbWFpbicsXG4gIGZuOiBmbGlwLFxuICByZXF1aXJlc0lmRXhpc3RzOiBbJ29mZnNldCddLFxuICBkYXRhOiB7XG4gICAgX3NraXA6IGZhbHNlXG4gIH1cbn07IiwiaW1wb3J0IHsgdG9wLCBib3R0b20sIGxlZnQsIHJpZ2h0IH0gZnJvbSBcIi4uL2VudW1zLmpzXCI7XG5pbXBvcnQgZGV0ZWN0T3ZlcmZsb3cgZnJvbSBcIi4uL3V0aWxzL2RldGVjdE92ZXJmbG93LmpzXCI7XG5cbmZ1bmN0aW9uIGdldFNpZGVPZmZzZXRzKG92ZXJmbG93LCByZWN0LCBwcmV2ZW50ZWRPZmZzZXRzKSB7XG4gIGlmIChwcmV2ZW50ZWRPZmZzZXRzID09PSB2b2lkIDApIHtcbiAgICBwcmV2ZW50ZWRPZmZzZXRzID0ge1xuICAgICAgeDogMCxcbiAgICAgIHk6IDBcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB0b3A6IG92ZXJmbG93LnRvcCAtIHJlY3QuaGVpZ2h0IC0gcHJldmVudGVkT2Zmc2V0cy55LFxuICAgIHJpZ2h0OiBvdmVyZmxvdy5yaWdodCAtIHJlY3Qud2lkdGggKyBwcmV2ZW50ZWRPZmZzZXRzLngsXG4gICAgYm90dG9tOiBvdmVyZmxvdy5ib3R0b20gLSByZWN0LmhlaWdodCArIHByZXZlbnRlZE9mZnNldHMueSxcbiAgICBsZWZ0OiBvdmVyZmxvdy5sZWZ0IC0gcmVjdC53aWR0aCAtIHByZXZlbnRlZE9mZnNldHMueFxuICB9O1xufVxuXG5mdW5jdGlvbiBpc0FueVNpZGVGdWxseUNsaXBwZWQob3ZlcmZsb3cpIHtcbiAgcmV0dXJuIFt0b3AsIHJpZ2h0LCBib3R0b20sIGxlZnRdLnNvbWUoZnVuY3Rpb24gKHNpZGUpIHtcbiAgICByZXR1cm4gb3ZlcmZsb3dbc2lkZV0gPj0gMDtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGhpZGUoX3JlZikge1xuICB2YXIgc3RhdGUgPSBfcmVmLnN0YXRlLFxuICAgICAgbmFtZSA9IF9yZWYubmFtZTtcbiAgdmFyIHJlZmVyZW5jZVJlY3QgPSBzdGF0ZS5yZWN0cy5yZWZlcmVuY2U7XG4gIHZhciBwb3BwZXJSZWN0ID0gc3RhdGUucmVjdHMucG9wcGVyO1xuICB2YXIgcHJldmVudGVkT2Zmc2V0cyA9IHN0YXRlLm1vZGlmaWVyc0RhdGEucHJldmVudE92ZXJmbG93O1xuICB2YXIgcmVmZXJlbmNlT3ZlcmZsb3cgPSBkZXRlY3RPdmVyZmxvdyhzdGF0ZSwge1xuICAgIGVsZW1lbnRDb250ZXh0OiAncmVmZXJlbmNlJ1xuICB9KTtcbiAgdmFyIHBvcHBlckFsdE92ZXJmbG93ID0gZGV0ZWN0T3ZlcmZsb3coc3RhdGUsIHtcbiAgICBhbHRCb3VuZGFyeTogdHJ1ZVxuICB9KTtcbiAgdmFyIHJlZmVyZW5jZUNsaXBwaW5nT2Zmc2V0cyA9IGdldFNpZGVPZmZzZXRzKHJlZmVyZW5jZU92ZXJmbG93LCByZWZlcmVuY2VSZWN0KTtcbiAgdmFyIHBvcHBlckVzY2FwZU9mZnNldHMgPSBnZXRTaWRlT2Zmc2V0cyhwb3BwZXJBbHRPdmVyZmxvdywgcG9wcGVyUmVjdCwgcHJldmVudGVkT2Zmc2V0cyk7XG4gIHZhciBpc1JlZmVyZW5jZUhpZGRlbiA9IGlzQW55U2lkZUZ1bGx5Q2xpcHBlZChyZWZlcmVuY2VDbGlwcGluZ09mZnNldHMpO1xuICB2YXIgaGFzUG9wcGVyRXNjYXBlZCA9IGlzQW55U2lkZUZ1bGx5Q2xpcHBlZChwb3BwZXJFc2NhcGVPZmZzZXRzKTtcbiAgc3RhdGUubW9kaWZpZXJzRGF0YVtuYW1lXSA9IHtcbiAgICByZWZlcmVuY2VDbGlwcGluZ09mZnNldHM6IHJlZmVyZW5jZUNsaXBwaW5nT2Zmc2V0cyxcbiAgICBwb3BwZXJFc2NhcGVPZmZzZXRzOiBwb3BwZXJFc2NhcGVPZmZzZXRzLFxuICAgIGlzUmVmZXJlbmNlSGlkZGVuOiBpc1JlZmVyZW5jZUhpZGRlbixcbiAgICBoYXNQb3BwZXJFc2NhcGVkOiBoYXNQb3BwZXJFc2NhcGVkXG4gIH07XG4gIHN0YXRlLmF0dHJpYnV0ZXMucG9wcGVyID0gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuYXR0cmlidXRlcy5wb3BwZXIsIHtcbiAgICAnZGF0YS1wb3BwZXItcmVmZXJlbmNlLWhpZGRlbic6IGlzUmVmZXJlbmNlSGlkZGVuLFxuICAgICdkYXRhLXBvcHBlci1lc2NhcGVkJzogaGFzUG9wcGVyRXNjYXBlZFxuICB9KTtcbn0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ2hpZGUnLFxuICBlbmFibGVkOiB0cnVlLFxuICBwaGFzZTogJ21haW4nLFxuICByZXF1aXJlc0lmRXhpc3RzOiBbJ3ByZXZlbnRPdmVyZmxvdyddLFxuICBmbjogaGlkZVxufTsiLCJleHBvcnQgeyBkZWZhdWx0IGFzIGFwcGx5U3R5bGVzIH0gZnJvbSBcIi4vYXBwbHlTdHlsZXMuanNcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgYXJyb3cgfSBmcm9tIFwiLi9hcnJvdy5qc1wiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBjb21wdXRlU3R5bGVzIH0gZnJvbSBcIi4vY29tcHV0ZVN0eWxlcy5qc1wiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBldmVudExpc3RlbmVycyB9IGZyb20gXCIuL2V2ZW50TGlzdGVuZXJzLmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIGZsaXAgfSBmcm9tIFwiLi9mbGlwLmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIGhpZGUgfSBmcm9tIFwiLi9oaWRlLmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIG9mZnNldCB9IGZyb20gXCIuL29mZnNldC5qc1wiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBwb3BwZXJPZmZzZXRzIH0gZnJvbSBcIi4vcG9wcGVyT2Zmc2V0cy5qc1wiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBwcmV2ZW50T3ZlcmZsb3cgfSBmcm9tIFwiLi9wcmV2ZW50T3ZlcmZsb3cuanNcIjsiLCJpbXBvcnQgZ2V0QmFzZVBsYWNlbWVudCBmcm9tIFwiLi4vdXRpbHMvZ2V0QmFzZVBsYWNlbWVudC5qc1wiO1xuaW1wb3J0IHsgdG9wLCBsZWZ0LCByaWdodCwgcGxhY2VtZW50cyB9IGZyb20gXCIuLi9lbnVtcy5qc1wiOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cbmV4cG9ydCBmdW5jdGlvbiBkaXN0YW5jZUFuZFNraWRkaW5nVG9YWShwbGFjZW1lbnQsIHJlY3RzLCBvZmZzZXQpIHtcbiAgdmFyIGJhc2VQbGFjZW1lbnQgPSBnZXRCYXNlUGxhY2VtZW50KHBsYWNlbWVudCk7XG4gIHZhciBpbnZlcnREaXN0YW5jZSA9IFtsZWZ0LCB0b3BdLmluZGV4T2YoYmFzZVBsYWNlbWVudCkgPj0gMCA/IC0xIDogMTtcblxuICB2YXIgX3JlZiA9IHR5cGVvZiBvZmZzZXQgPT09ICdmdW5jdGlvbicgPyBvZmZzZXQoT2JqZWN0LmFzc2lnbih7fSwgcmVjdHMsIHtcbiAgICBwbGFjZW1lbnQ6IHBsYWNlbWVudFxuICB9KSkgOiBvZmZzZXQsXG4gICAgICBza2lkZGluZyA9IF9yZWZbMF0sXG4gICAgICBkaXN0YW5jZSA9IF9yZWZbMV07XG5cbiAgc2tpZGRpbmcgPSBza2lkZGluZyB8fCAwO1xuICBkaXN0YW5jZSA9IChkaXN0YW5jZSB8fCAwKSAqIGludmVydERpc3RhbmNlO1xuICByZXR1cm4gW2xlZnQsIHJpZ2h0XS5pbmRleE9mKGJhc2VQbGFjZW1lbnQpID49IDAgPyB7XG4gICAgeDogZGlzdGFuY2UsXG4gICAgeTogc2tpZGRpbmdcbiAgfSA6IHtcbiAgICB4OiBza2lkZGluZyxcbiAgICB5OiBkaXN0YW5jZVxuICB9O1xufVxuXG5mdW5jdGlvbiBvZmZzZXQoX3JlZjIpIHtcbiAgdmFyIHN0YXRlID0gX3JlZjIuc3RhdGUsXG4gICAgICBvcHRpb25zID0gX3JlZjIub3B0aW9ucyxcbiAgICAgIG5hbWUgPSBfcmVmMi5uYW1lO1xuICB2YXIgX29wdGlvbnMkb2Zmc2V0ID0gb3B0aW9ucy5vZmZzZXQsXG4gICAgICBvZmZzZXQgPSBfb3B0aW9ucyRvZmZzZXQgPT09IHZvaWQgMCA/IFswLCAwXSA6IF9vcHRpb25zJG9mZnNldDtcbiAgdmFyIGRhdGEgPSBwbGFjZW1lbnRzLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBwbGFjZW1lbnQpIHtcbiAgICBhY2NbcGxhY2VtZW50XSA9IGRpc3RhbmNlQW5kU2tpZGRpbmdUb1hZKHBsYWNlbWVudCwgc3RhdGUucmVjdHMsIG9mZnNldCk7XG4gICAgcmV0dXJuIGFjYztcbiAgfSwge30pO1xuICB2YXIgX2RhdGEkc3RhdGUkcGxhY2VtZW50ID0gZGF0YVtzdGF0ZS5wbGFjZW1lbnRdLFxuICAgICAgeCA9IF9kYXRhJHN0YXRlJHBsYWNlbWVudC54LFxuICAgICAgeSA9IF9kYXRhJHN0YXRlJHBsYWNlbWVudC55O1xuXG4gIGlmIChzdGF0ZS5tb2RpZmllcnNEYXRhLnBvcHBlck9mZnNldHMgIT0gbnVsbCkge1xuICAgIHN0YXRlLm1vZGlmaWVyc0RhdGEucG9wcGVyT2Zmc2V0cy54ICs9IHg7XG4gICAgc3RhdGUubW9kaWZpZXJzRGF0YS5wb3BwZXJPZmZzZXRzLnkgKz0geTtcbiAgfVxuXG4gIHN0YXRlLm1vZGlmaWVyc0RhdGFbbmFtZV0gPSBkYXRhO1xufSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnb2Zmc2V0JyxcbiAgZW5hYmxlZDogdHJ1ZSxcbiAgcGhhc2U6ICdtYWluJyxcbiAgcmVxdWlyZXM6IFsncG9wcGVyT2Zmc2V0cyddLFxuICBmbjogb2Zmc2V0XG59OyIsImltcG9ydCBjb21wdXRlT2Zmc2V0cyBmcm9tIFwiLi4vdXRpbHMvY29tcHV0ZU9mZnNldHMuanNcIjtcblxuZnVuY3Rpb24gcG9wcGVyT2Zmc2V0cyhfcmVmKSB7XG4gIHZhciBzdGF0ZSA9IF9yZWYuc3RhdGUsXG4gICAgICBuYW1lID0gX3JlZi5uYW1lO1xuICAvLyBPZmZzZXRzIGFyZSB0aGUgYWN0dWFsIHBvc2l0aW9uIHRoZSBwb3BwZXIgbmVlZHMgdG8gaGF2ZSB0byBiZVxuICAvLyBwcm9wZXJseSBwb3NpdGlvbmVkIG5lYXIgaXRzIHJlZmVyZW5jZSBlbGVtZW50XG4gIC8vIFRoaXMgaXMgdGhlIG1vc3QgYmFzaWMgcGxhY2VtZW50LCBhbmQgd2lsbCBiZSBhZGp1c3RlZCBieVxuICAvLyB0aGUgbW9kaWZpZXJzIGluIHRoZSBuZXh0IHN0ZXBcbiAgc3RhdGUubW9kaWZpZXJzRGF0YVtuYW1lXSA9IGNvbXB1dGVPZmZzZXRzKHtcbiAgICByZWZlcmVuY2U6IHN0YXRlLnJlY3RzLnJlZmVyZW5jZSxcbiAgICBlbGVtZW50OiBzdGF0ZS5yZWN0cy5wb3BwZXIsXG4gICAgc3RyYXRlZ3k6ICdhYnNvbHV0ZScsXG4gICAgcGxhY2VtZW50OiBzdGF0ZS5wbGFjZW1lbnRcbiAgfSk7XG59IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdwb3BwZXJPZmZzZXRzJyxcbiAgZW5hYmxlZDogdHJ1ZSxcbiAgcGhhc2U6ICdyZWFkJyxcbiAgZm46IHBvcHBlck9mZnNldHMsXG4gIGRhdGE6IHt9XG59OyIsImltcG9ydCB7IHRvcCwgbGVmdCwgcmlnaHQsIGJvdHRvbSwgc3RhcnQgfSBmcm9tIFwiLi4vZW51bXMuanNcIjtcbmltcG9ydCBnZXRCYXNlUGxhY2VtZW50IGZyb20gXCIuLi91dGlscy9nZXRCYXNlUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgZ2V0TWFpbkF4aXNGcm9tUGxhY2VtZW50IGZyb20gXCIuLi91dGlscy9nZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQuanNcIjtcbmltcG9ydCBnZXRBbHRBeGlzIGZyb20gXCIuLi91dGlscy9nZXRBbHRBeGlzLmpzXCI7XG5pbXBvcnQgeyB3aXRoaW4sIHdpdGhpbk1heENsYW1wIH0gZnJvbSBcIi4uL3V0aWxzL3dpdGhpbi5qc1wiO1xuaW1wb3J0IGdldExheW91dFJlY3QgZnJvbSBcIi4uL2RvbS11dGlscy9nZXRMYXlvdXRSZWN0LmpzXCI7XG5pbXBvcnQgZ2V0T2Zmc2V0UGFyZW50IGZyb20gXCIuLi9kb20tdXRpbHMvZ2V0T2Zmc2V0UGFyZW50LmpzXCI7XG5pbXBvcnQgZGV0ZWN0T3ZlcmZsb3cgZnJvbSBcIi4uL3V0aWxzL2RldGVjdE92ZXJmbG93LmpzXCI7XG5pbXBvcnQgZ2V0VmFyaWF0aW9uIGZyb20gXCIuLi91dGlscy9nZXRWYXJpYXRpb24uanNcIjtcbmltcG9ydCBnZXRGcmVzaFNpZGVPYmplY3QgZnJvbSBcIi4uL3V0aWxzL2dldEZyZXNoU2lkZU9iamVjdC5qc1wiO1xuaW1wb3J0IHsgbWluIGFzIG1hdGhNaW4sIG1heCBhcyBtYXRoTWF4IH0gZnJvbSBcIi4uL3V0aWxzL21hdGguanNcIjtcblxuZnVuY3Rpb24gcHJldmVudE92ZXJmbG93KF9yZWYpIHtcbiAgdmFyIHN0YXRlID0gX3JlZi5zdGF0ZSxcbiAgICAgIG9wdGlvbnMgPSBfcmVmLm9wdGlvbnMsXG4gICAgICBuYW1lID0gX3JlZi5uYW1lO1xuICB2YXIgX29wdGlvbnMkbWFpbkF4aXMgPSBvcHRpb25zLm1haW5BeGlzLFxuICAgICAgY2hlY2tNYWluQXhpcyA9IF9vcHRpb25zJG1haW5BeGlzID09PSB2b2lkIDAgPyB0cnVlIDogX29wdGlvbnMkbWFpbkF4aXMsXG4gICAgICBfb3B0aW9ucyRhbHRBeGlzID0gb3B0aW9ucy5hbHRBeGlzLFxuICAgICAgY2hlY2tBbHRBeGlzID0gX29wdGlvbnMkYWx0QXhpcyA9PT0gdm9pZCAwID8gZmFsc2UgOiBfb3B0aW9ucyRhbHRBeGlzLFxuICAgICAgYm91bmRhcnkgPSBvcHRpb25zLmJvdW5kYXJ5LFxuICAgICAgcm9vdEJvdW5kYXJ5ID0gb3B0aW9ucy5yb290Qm91bmRhcnksXG4gICAgICBhbHRCb3VuZGFyeSA9IG9wdGlvbnMuYWx0Qm91bmRhcnksXG4gICAgICBwYWRkaW5nID0gb3B0aW9ucy5wYWRkaW5nLFxuICAgICAgX29wdGlvbnMkdGV0aGVyID0gb3B0aW9ucy50ZXRoZXIsXG4gICAgICB0ZXRoZXIgPSBfb3B0aW9ucyR0ZXRoZXIgPT09IHZvaWQgMCA/IHRydWUgOiBfb3B0aW9ucyR0ZXRoZXIsXG4gICAgICBfb3B0aW9ucyR0ZXRoZXJPZmZzZXQgPSBvcHRpb25zLnRldGhlck9mZnNldCxcbiAgICAgIHRldGhlck9mZnNldCA9IF9vcHRpb25zJHRldGhlck9mZnNldCA9PT0gdm9pZCAwID8gMCA6IF9vcHRpb25zJHRldGhlck9mZnNldDtcbiAgdmFyIG92ZXJmbG93ID0gZGV0ZWN0T3ZlcmZsb3coc3RhdGUsIHtcbiAgICBib3VuZGFyeTogYm91bmRhcnksXG4gICAgcm9vdEJvdW5kYXJ5OiByb290Qm91bmRhcnksXG4gICAgcGFkZGluZzogcGFkZGluZyxcbiAgICBhbHRCb3VuZGFyeTogYWx0Qm91bmRhcnlcbiAgfSk7XG4gIHZhciBiYXNlUGxhY2VtZW50ID0gZ2V0QmFzZVBsYWNlbWVudChzdGF0ZS5wbGFjZW1lbnQpO1xuICB2YXIgdmFyaWF0aW9uID0gZ2V0VmFyaWF0aW9uKHN0YXRlLnBsYWNlbWVudCk7XG4gIHZhciBpc0Jhc2VQbGFjZW1lbnQgPSAhdmFyaWF0aW9uO1xuICB2YXIgbWFpbkF4aXMgPSBnZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQoYmFzZVBsYWNlbWVudCk7XG4gIHZhciBhbHRBeGlzID0gZ2V0QWx0QXhpcyhtYWluQXhpcyk7XG4gIHZhciBwb3BwZXJPZmZzZXRzID0gc3RhdGUubW9kaWZpZXJzRGF0YS5wb3BwZXJPZmZzZXRzO1xuICB2YXIgcmVmZXJlbmNlUmVjdCA9IHN0YXRlLnJlY3RzLnJlZmVyZW5jZTtcbiAgdmFyIHBvcHBlclJlY3QgPSBzdGF0ZS5yZWN0cy5wb3BwZXI7XG4gIHZhciB0ZXRoZXJPZmZzZXRWYWx1ZSA9IHR5cGVvZiB0ZXRoZXJPZmZzZXQgPT09ICdmdW5jdGlvbicgPyB0ZXRoZXJPZmZzZXQoT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUucmVjdHMsIHtcbiAgICBwbGFjZW1lbnQ6IHN0YXRlLnBsYWNlbWVudFxuICB9KSkgOiB0ZXRoZXJPZmZzZXQ7XG4gIHZhciBub3JtYWxpemVkVGV0aGVyT2Zmc2V0VmFsdWUgPSB0eXBlb2YgdGV0aGVyT2Zmc2V0VmFsdWUgPT09ICdudW1iZXInID8ge1xuICAgIG1haW5BeGlzOiB0ZXRoZXJPZmZzZXRWYWx1ZSxcbiAgICBhbHRBeGlzOiB0ZXRoZXJPZmZzZXRWYWx1ZVxuICB9IDogT2JqZWN0LmFzc2lnbih7XG4gICAgbWFpbkF4aXM6IDAsXG4gICAgYWx0QXhpczogMFxuICB9LCB0ZXRoZXJPZmZzZXRWYWx1ZSk7XG4gIHZhciBvZmZzZXRNb2RpZmllclN0YXRlID0gc3RhdGUubW9kaWZpZXJzRGF0YS5vZmZzZXQgPyBzdGF0ZS5tb2RpZmllcnNEYXRhLm9mZnNldFtzdGF0ZS5wbGFjZW1lbnRdIDogbnVsbDtcbiAgdmFyIGRhdGEgPSB7XG4gICAgeDogMCxcbiAgICB5OiAwXG4gIH07XG5cbiAgaWYgKCFwb3BwZXJPZmZzZXRzKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGNoZWNrTWFpbkF4aXMpIHtcbiAgICB2YXIgX29mZnNldE1vZGlmaWVyU3RhdGUkO1xuXG4gICAgdmFyIG1haW5TaWRlID0gbWFpbkF4aXMgPT09ICd5JyA/IHRvcCA6IGxlZnQ7XG4gICAgdmFyIGFsdFNpZGUgPSBtYWluQXhpcyA9PT0gJ3knID8gYm90dG9tIDogcmlnaHQ7XG4gICAgdmFyIGxlbiA9IG1haW5BeGlzID09PSAneScgPyAnaGVpZ2h0JyA6ICd3aWR0aCc7XG4gICAgdmFyIG9mZnNldCA9IHBvcHBlck9mZnNldHNbbWFpbkF4aXNdO1xuICAgIHZhciBtaW4gPSBvZmZzZXQgKyBvdmVyZmxvd1ttYWluU2lkZV07XG4gICAgdmFyIG1heCA9IG9mZnNldCAtIG92ZXJmbG93W2FsdFNpZGVdO1xuICAgIHZhciBhZGRpdGl2ZSA9IHRldGhlciA/IC1wb3BwZXJSZWN0W2xlbl0gLyAyIDogMDtcbiAgICB2YXIgbWluTGVuID0gdmFyaWF0aW9uID09PSBzdGFydCA/IHJlZmVyZW5jZVJlY3RbbGVuXSA6IHBvcHBlclJlY3RbbGVuXTtcbiAgICB2YXIgbWF4TGVuID0gdmFyaWF0aW9uID09PSBzdGFydCA/IC1wb3BwZXJSZWN0W2xlbl0gOiAtcmVmZXJlbmNlUmVjdFtsZW5dOyAvLyBXZSBuZWVkIHRvIGluY2x1ZGUgdGhlIGFycm93IGluIHRoZSBjYWxjdWxhdGlvbiBzbyB0aGUgYXJyb3cgZG9lc24ndCBnb1xuICAgIC8vIG91dHNpZGUgdGhlIHJlZmVyZW5jZSBib3VuZHNcblxuICAgIHZhciBhcnJvd0VsZW1lbnQgPSBzdGF0ZS5lbGVtZW50cy5hcnJvdztcbiAgICB2YXIgYXJyb3dSZWN0ID0gdGV0aGVyICYmIGFycm93RWxlbWVudCA/IGdldExheW91dFJlY3QoYXJyb3dFbGVtZW50KSA6IHtcbiAgICAgIHdpZHRoOiAwLFxuICAgICAgaGVpZ2h0OiAwXG4gICAgfTtcbiAgICB2YXIgYXJyb3dQYWRkaW5nT2JqZWN0ID0gc3RhdGUubW9kaWZpZXJzRGF0YVsnYXJyb3cjcGVyc2lzdGVudCddID8gc3RhdGUubW9kaWZpZXJzRGF0YVsnYXJyb3cjcGVyc2lzdGVudCddLnBhZGRpbmcgOiBnZXRGcmVzaFNpZGVPYmplY3QoKTtcbiAgICB2YXIgYXJyb3dQYWRkaW5nTWluID0gYXJyb3dQYWRkaW5nT2JqZWN0W21haW5TaWRlXTtcbiAgICB2YXIgYXJyb3dQYWRkaW5nTWF4ID0gYXJyb3dQYWRkaW5nT2JqZWN0W2FsdFNpZGVdOyAvLyBJZiB0aGUgcmVmZXJlbmNlIGxlbmd0aCBpcyBzbWFsbGVyIHRoYW4gdGhlIGFycm93IGxlbmd0aCwgd2UgZG9uJ3Qgd2FudFxuICAgIC8vIHRvIGluY2x1ZGUgaXRzIGZ1bGwgc2l6ZSBpbiB0aGUgY2FsY3VsYXRpb24uIElmIHRoZSByZWZlcmVuY2UgaXMgc21hbGxcbiAgICAvLyBhbmQgbmVhciB0aGUgZWRnZSBvZiBhIGJvdW5kYXJ5LCB0aGUgcG9wcGVyIGNhbiBvdmVyZmxvdyBldmVuIGlmIHRoZVxuICAgIC8vIHJlZmVyZW5jZSBpcyBub3Qgb3ZlcmZsb3dpbmcgYXMgd2VsbCAoZS5nLiB2aXJ0dWFsIGVsZW1lbnRzIHdpdGggbm9cbiAgICAvLyB3aWR0aCBvciBoZWlnaHQpXG5cbiAgICB2YXIgYXJyb3dMZW4gPSB3aXRoaW4oMCwgcmVmZXJlbmNlUmVjdFtsZW5dLCBhcnJvd1JlY3RbbGVuXSk7XG4gICAgdmFyIG1pbk9mZnNldCA9IGlzQmFzZVBsYWNlbWVudCA/IHJlZmVyZW5jZVJlY3RbbGVuXSAvIDIgLSBhZGRpdGl2ZSAtIGFycm93TGVuIC0gYXJyb3dQYWRkaW5nTWluIC0gbm9ybWFsaXplZFRldGhlck9mZnNldFZhbHVlLm1haW5BeGlzIDogbWluTGVuIC0gYXJyb3dMZW4gLSBhcnJvd1BhZGRpbmdNaW4gLSBub3JtYWxpemVkVGV0aGVyT2Zmc2V0VmFsdWUubWFpbkF4aXM7XG4gICAgdmFyIG1heE9mZnNldCA9IGlzQmFzZVBsYWNlbWVudCA/IC1yZWZlcmVuY2VSZWN0W2xlbl0gLyAyICsgYWRkaXRpdmUgKyBhcnJvd0xlbiArIGFycm93UGFkZGluZ01heCArIG5vcm1hbGl6ZWRUZXRoZXJPZmZzZXRWYWx1ZS5tYWluQXhpcyA6IG1heExlbiArIGFycm93TGVuICsgYXJyb3dQYWRkaW5nTWF4ICsgbm9ybWFsaXplZFRldGhlck9mZnNldFZhbHVlLm1haW5BeGlzO1xuICAgIHZhciBhcnJvd09mZnNldFBhcmVudCA9IHN0YXRlLmVsZW1lbnRzLmFycm93ICYmIGdldE9mZnNldFBhcmVudChzdGF0ZS5lbGVtZW50cy5hcnJvdyk7XG4gICAgdmFyIGNsaWVudE9mZnNldCA9IGFycm93T2Zmc2V0UGFyZW50ID8gbWFpbkF4aXMgPT09ICd5JyA/IGFycm93T2Zmc2V0UGFyZW50LmNsaWVudFRvcCB8fCAwIDogYXJyb3dPZmZzZXRQYXJlbnQuY2xpZW50TGVmdCB8fCAwIDogMDtcbiAgICB2YXIgb2Zmc2V0TW9kaWZpZXJWYWx1ZSA9IChfb2Zmc2V0TW9kaWZpZXJTdGF0ZSQgPSBvZmZzZXRNb2RpZmllclN0YXRlID09IG51bGwgPyB2b2lkIDAgOiBvZmZzZXRNb2RpZmllclN0YXRlW21haW5BeGlzXSkgIT0gbnVsbCA/IF9vZmZzZXRNb2RpZmllclN0YXRlJCA6IDA7XG4gICAgdmFyIHRldGhlck1pbiA9IG9mZnNldCArIG1pbk9mZnNldCAtIG9mZnNldE1vZGlmaWVyVmFsdWUgLSBjbGllbnRPZmZzZXQ7XG4gICAgdmFyIHRldGhlck1heCA9IG9mZnNldCArIG1heE9mZnNldCAtIG9mZnNldE1vZGlmaWVyVmFsdWU7XG4gICAgdmFyIHByZXZlbnRlZE9mZnNldCA9IHdpdGhpbih0ZXRoZXIgPyBtYXRoTWluKG1pbiwgdGV0aGVyTWluKSA6IG1pbiwgb2Zmc2V0LCB0ZXRoZXIgPyBtYXRoTWF4KG1heCwgdGV0aGVyTWF4KSA6IG1heCk7XG4gICAgcG9wcGVyT2Zmc2V0c1ttYWluQXhpc10gPSBwcmV2ZW50ZWRPZmZzZXQ7XG4gICAgZGF0YVttYWluQXhpc10gPSBwcmV2ZW50ZWRPZmZzZXQgLSBvZmZzZXQ7XG4gIH1cblxuICBpZiAoY2hlY2tBbHRBeGlzKSB7XG4gICAgdmFyIF9vZmZzZXRNb2RpZmllclN0YXRlJDI7XG5cbiAgICB2YXIgX21haW5TaWRlID0gbWFpbkF4aXMgPT09ICd4JyA/IHRvcCA6IGxlZnQ7XG5cbiAgICB2YXIgX2FsdFNpZGUgPSBtYWluQXhpcyA9PT0gJ3gnID8gYm90dG9tIDogcmlnaHQ7XG5cbiAgICB2YXIgX29mZnNldCA9IHBvcHBlck9mZnNldHNbYWx0QXhpc107XG5cbiAgICB2YXIgX2xlbiA9IGFsdEF4aXMgPT09ICd5JyA/ICdoZWlnaHQnIDogJ3dpZHRoJztcblxuICAgIHZhciBfbWluID0gX29mZnNldCArIG92ZXJmbG93W19tYWluU2lkZV07XG5cbiAgICB2YXIgX21heCA9IF9vZmZzZXQgLSBvdmVyZmxvd1tfYWx0U2lkZV07XG5cbiAgICB2YXIgaXNPcmlnaW5TaWRlID0gW3RvcCwgbGVmdF0uaW5kZXhPZihiYXNlUGxhY2VtZW50KSAhPT0gLTE7XG5cbiAgICB2YXIgX29mZnNldE1vZGlmaWVyVmFsdWUgPSAoX29mZnNldE1vZGlmaWVyU3RhdGUkMiA9IG9mZnNldE1vZGlmaWVyU3RhdGUgPT0gbnVsbCA/IHZvaWQgMCA6IG9mZnNldE1vZGlmaWVyU3RhdGVbYWx0QXhpc10pICE9IG51bGwgPyBfb2Zmc2V0TW9kaWZpZXJTdGF0ZSQyIDogMDtcblxuICAgIHZhciBfdGV0aGVyTWluID0gaXNPcmlnaW5TaWRlID8gX21pbiA6IF9vZmZzZXQgLSByZWZlcmVuY2VSZWN0W19sZW5dIC0gcG9wcGVyUmVjdFtfbGVuXSAtIF9vZmZzZXRNb2RpZmllclZhbHVlICsgbm9ybWFsaXplZFRldGhlck9mZnNldFZhbHVlLmFsdEF4aXM7XG5cbiAgICB2YXIgX3RldGhlck1heCA9IGlzT3JpZ2luU2lkZSA/IF9vZmZzZXQgKyByZWZlcmVuY2VSZWN0W19sZW5dICsgcG9wcGVyUmVjdFtfbGVuXSAtIF9vZmZzZXRNb2RpZmllclZhbHVlIC0gbm9ybWFsaXplZFRldGhlck9mZnNldFZhbHVlLmFsdEF4aXMgOiBfbWF4O1xuXG4gICAgdmFyIF9wcmV2ZW50ZWRPZmZzZXQgPSB0ZXRoZXIgJiYgaXNPcmlnaW5TaWRlID8gd2l0aGluTWF4Q2xhbXAoX3RldGhlck1pbiwgX29mZnNldCwgX3RldGhlck1heCkgOiB3aXRoaW4odGV0aGVyID8gX3RldGhlck1pbiA6IF9taW4sIF9vZmZzZXQsIHRldGhlciA/IF90ZXRoZXJNYXggOiBfbWF4KTtcblxuICAgIHBvcHBlck9mZnNldHNbYWx0QXhpc10gPSBfcHJldmVudGVkT2Zmc2V0O1xuICAgIGRhdGFbYWx0QXhpc10gPSBfcHJldmVudGVkT2Zmc2V0IC0gX29mZnNldDtcbiAgfVxuXG4gIHN0YXRlLm1vZGlmaWVyc0RhdGFbbmFtZV0gPSBkYXRhO1xufSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAncHJldmVudE92ZXJmbG93JyxcbiAgZW5hYmxlZDogdHJ1ZSxcbiAgcGhhc2U6ICdtYWluJyxcbiAgZm46IHByZXZlbnRPdmVyZmxvdyxcbiAgcmVxdWlyZXNJZkV4aXN0czogWydvZmZzZXQnXVxufTsiLCJpbXBvcnQgeyBwb3BwZXJHZW5lcmF0b3IsIGRldGVjdE92ZXJmbG93IH0gZnJvbSBcIi4vY3JlYXRlUG9wcGVyLmpzXCI7XG5pbXBvcnQgZXZlbnRMaXN0ZW5lcnMgZnJvbSBcIi4vbW9kaWZpZXJzL2V2ZW50TGlzdGVuZXJzLmpzXCI7XG5pbXBvcnQgcG9wcGVyT2Zmc2V0cyBmcm9tIFwiLi9tb2RpZmllcnMvcG9wcGVyT2Zmc2V0cy5qc1wiO1xuaW1wb3J0IGNvbXB1dGVTdHlsZXMgZnJvbSBcIi4vbW9kaWZpZXJzL2NvbXB1dGVTdHlsZXMuanNcIjtcbmltcG9ydCBhcHBseVN0eWxlcyBmcm9tIFwiLi9tb2RpZmllcnMvYXBwbHlTdHlsZXMuanNcIjtcbnZhciBkZWZhdWx0TW9kaWZpZXJzID0gW2V2ZW50TGlzdGVuZXJzLCBwb3BwZXJPZmZzZXRzLCBjb21wdXRlU3R5bGVzLCBhcHBseVN0eWxlc107XG52YXIgY3JlYXRlUG9wcGVyID0gLyojX19QVVJFX18qL3BvcHBlckdlbmVyYXRvcih7XG4gIGRlZmF1bHRNb2RpZmllcnM6IGRlZmF1bHRNb2RpZmllcnNcbn0pOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cbmV4cG9ydCB7IGNyZWF0ZVBvcHBlciwgcG9wcGVyR2VuZXJhdG9yLCBkZWZhdWx0TW9kaWZpZXJzLCBkZXRlY3RPdmVyZmxvdyB9OyIsImltcG9ydCB7IHBvcHBlckdlbmVyYXRvciwgZGV0ZWN0T3ZlcmZsb3cgfSBmcm9tIFwiLi9jcmVhdGVQb3BwZXIuanNcIjtcbmltcG9ydCBldmVudExpc3RlbmVycyBmcm9tIFwiLi9tb2RpZmllcnMvZXZlbnRMaXN0ZW5lcnMuanNcIjtcbmltcG9ydCBwb3BwZXJPZmZzZXRzIGZyb20gXCIuL21vZGlmaWVycy9wb3BwZXJPZmZzZXRzLmpzXCI7XG5pbXBvcnQgY29tcHV0ZVN0eWxlcyBmcm9tIFwiLi9tb2RpZmllcnMvY29tcHV0ZVN0eWxlcy5qc1wiO1xuaW1wb3J0IGFwcGx5U3R5bGVzIGZyb20gXCIuL21vZGlmaWVycy9hcHBseVN0eWxlcy5qc1wiO1xuaW1wb3J0IG9mZnNldCBmcm9tIFwiLi9tb2RpZmllcnMvb2Zmc2V0LmpzXCI7XG5pbXBvcnQgZmxpcCBmcm9tIFwiLi9tb2RpZmllcnMvZmxpcC5qc1wiO1xuaW1wb3J0IHByZXZlbnRPdmVyZmxvdyBmcm9tIFwiLi9tb2RpZmllcnMvcHJldmVudE92ZXJmbG93LmpzXCI7XG5pbXBvcnQgYXJyb3cgZnJvbSBcIi4vbW9kaWZpZXJzL2Fycm93LmpzXCI7XG5pbXBvcnQgaGlkZSBmcm9tIFwiLi9tb2RpZmllcnMvaGlkZS5qc1wiO1xudmFyIGRlZmF1bHRNb2RpZmllcnMgPSBbZXZlbnRMaXN0ZW5lcnMsIHBvcHBlck9mZnNldHMsIGNvbXB1dGVTdHlsZXMsIGFwcGx5U3R5bGVzLCBvZmZzZXQsIGZsaXAsIHByZXZlbnRPdmVyZmxvdywgYXJyb3csIGhpZGVdO1xudmFyIGNyZWF0ZVBvcHBlciA9IC8qI19fUFVSRV9fKi9wb3BwZXJHZW5lcmF0b3Ioe1xuICBkZWZhdWx0TW9kaWZpZXJzOiBkZWZhdWx0TW9kaWZpZXJzXG59KTsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5leHBvcnQgeyBjcmVhdGVQb3BwZXIsIHBvcHBlckdlbmVyYXRvciwgZGVmYXVsdE1vZGlmaWVycywgZGV0ZWN0T3ZlcmZsb3cgfTsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5leHBvcnQgeyBjcmVhdGVQb3BwZXIgYXMgY3JlYXRlUG9wcGVyTGl0ZSB9IGZyb20gXCIuL3BvcHBlci1saXRlLmpzXCI7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuZXhwb3J0ICogZnJvbSBcIi4vbW9kaWZpZXJzL2luZGV4LmpzXCI7IiwiaW1wb3J0IGdldFZhcmlhdGlvbiBmcm9tIFwiLi9nZXRWYXJpYXRpb24uanNcIjtcbmltcG9ydCB7IHZhcmlhdGlvblBsYWNlbWVudHMsIGJhc2VQbGFjZW1lbnRzLCBwbGFjZW1lbnRzIGFzIGFsbFBsYWNlbWVudHMgfSBmcm9tIFwiLi4vZW51bXMuanNcIjtcbmltcG9ydCBkZXRlY3RPdmVyZmxvdyBmcm9tIFwiLi9kZXRlY3RPdmVyZmxvdy5qc1wiO1xuaW1wb3J0IGdldEJhc2VQbGFjZW1lbnQgZnJvbSBcIi4vZ2V0QmFzZVBsYWNlbWVudC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29tcHV0ZUF1dG9QbGFjZW1lbnQoc3RhdGUsIG9wdGlvbnMpIHtcbiAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuXG4gIHZhciBfb3B0aW9ucyA9IG9wdGlvbnMsXG4gICAgICBwbGFjZW1lbnQgPSBfb3B0aW9ucy5wbGFjZW1lbnQsXG4gICAgICBib3VuZGFyeSA9IF9vcHRpb25zLmJvdW5kYXJ5LFxuICAgICAgcm9vdEJvdW5kYXJ5ID0gX29wdGlvbnMucm9vdEJvdW5kYXJ5LFxuICAgICAgcGFkZGluZyA9IF9vcHRpb25zLnBhZGRpbmcsXG4gICAgICBmbGlwVmFyaWF0aW9ucyA9IF9vcHRpb25zLmZsaXBWYXJpYXRpb25zLFxuICAgICAgX29wdGlvbnMkYWxsb3dlZEF1dG9QID0gX29wdGlvbnMuYWxsb3dlZEF1dG9QbGFjZW1lbnRzLFxuICAgICAgYWxsb3dlZEF1dG9QbGFjZW1lbnRzID0gX29wdGlvbnMkYWxsb3dlZEF1dG9QID09PSB2b2lkIDAgPyBhbGxQbGFjZW1lbnRzIDogX29wdGlvbnMkYWxsb3dlZEF1dG9QO1xuICB2YXIgdmFyaWF0aW9uID0gZ2V0VmFyaWF0aW9uKHBsYWNlbWVudCk7XG4gIHZhciBwbGFjZW1lbnRzID0gdmFyaWF0aW9uID8gZmxpcFZhcmlhdGlvbnMgPyB2YXJpYXRpb25QbGFjZW1lbnRzIDogdmFyaWF0aW9uUGxhY2VtZW50cy5maWx0ZXIoZnVuY3Rpb24gKHBsYWNlbWVudCkge1xuICAgIHJldHVybiBnZXRWYXJpYXRpb24ocGxhY2VtZW50KSA9PT0gdmFyaWF0aW9uO1xuICB9KSA6IGJhc2VQbGFjZW1lbnRzO1xuICB2YXIgYWxsb3dlZFBsYWNlbWVudHMgPSBwbGFjZW1lbnRzLmZpbHRlcihmdW5jdGlvbiAocGxhY2VtZW50KSB7XG4gICAgcmV0dXJuIGFsbG93ZWRBdXRvUGxhY2VtZW50cy5pbmRleE9mKHBsYWNlbWVudCkgPj0gMDtcbiAgfSk7XG5cbiAgaWYgKGFsbG93ZWRQbGFjZW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIGFsbG93ZWRQbGFjZW1lbnRzID0gcGxhY2VtZW50cztcblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoWydQb3BwZXI6IFRoZSBgYWxsb3dlZEF1dG9QbGFjZW1lbnRzYCBvcHRpb24gZGlkIG5vdCBhbGxvdyBhbnknLCAncGxhY2VtZW50cy4gRW5zdXJlIHRoZSBgcGxhY2VtZW50YCBvcHRpb24gbWF0Y2hlcyB0aGUgdmFyaWF0aW9uJywgJ29mIHRoZSBhbGxvd2VkIHBsYWNlbWVudHMuJywgJ0ZvciBleGFtcGxlLCBcImF1dG9cIiBjYW5ub3QgYmUgdXNlZCB0byBhbGxvdyBcImJvdHRvbS1zdGFydFwiLicsICdVc2UgXCJhdXRvLXN0YXJ0XCIgaW5zdGVhZC4nXS5qb2luKCcgJykpO1xuICAgIH1cbiAgfSAvLyAkRmxvd0ZpeE1lW2luY29tcGF0aWJsZS10eXBlXTogRmxvdyBzZWVtcyB0byBoYXZlIHByb2JsZW1zIHdpdGggdHdvIGFycmF5IHVuaW9ucy4uLlxuXG5cbiAgdmFyIG92ZXJmbG93cyA9IGFsbG93ZWRQbGFjZW1lbnRzLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBwbGFjZW1lbnQpIHtcbiAgICBhY2NbcGxhY2VtZW50XSA9IGRldGVjdE92ZXJmbG93KHN0YXRlLCB7XG4gICAgICBwbGFjZW1lbnQ6IHBsYWNlbWVudCxcbiAgICAgIGJvdW5kYXJ5OiBib3VuZGFyeSxcbiAgICAgIHJvb3RCb3VuZGFyeTogcm9vdEJvdW5kYXJ5LFxuICAgICAgcGFkZGluZzogcGFkZGluZ1xuICAgIH0pW2dldEJhc2VQbGFjZW1lbnQocGxhY2VtZW50KV07XG4gICAgcmV0dXJuIGFjYztcbiAgfSwge30pO1xuICByZXR1cm4gT2JqZWN0LmtleXMob3ZlcmZsb3dzKS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuIG92ZXJmbG93c1thXSAtIG92ZXJmbG93c1tiXTtcbiAgfSk7XG59IiwiaW1wb3J0IGdldEJhc2VQbGFjZW1lbnQgZnJvbSBcIi4vZ2V0QmFzZVBsYWNlbWVudC5qc1wiO1xuaW1wb3J0IGdldFZhcmlhdGlvbiBmcm9tIFwiLi9nZXRWYXJpYXRpb24uanNcIjtcbmltcG9ydCBnZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQgZnJvbSBcIi4vZ2V0TWFpbkF4aXNGcm9tUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgeyB0b3AsIHJpZ2h0LCBib3R0b20sIGxlZnQsIHN0YXJ0LCBlbmQgfSBmcm9tIFwiLi4vZW51bXMuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbXB1dGVPZmZzZXRzKF9yZWYpIHtcbiAgdmFyIHJlZmVyZW5jZSA9IF9yZWYucmVmZXJlbmNlLFxuICAgICAgZWxlbWVudCA9IF9yZWYuZWxlbWVudCxcbiAgICAgIHBsYWNlbWVudCA9IF9yZWYucGxhY2VtZW50O1xuICB2YXIgYmFzZVBsYWNlbWVudCA9IHBsYWNlbWVudCA/IGdldEJhc2VQbGFjZW1lbnQocGxhY2VtZW50KSA6IG51bGw7XG4gIHZhciB2YXJpYXRpb24gPSBwbGFjZW1lbnQgPyBnZXRWYXJpYXRpb24ocGxhY2VtZW50KSA6IG51bGw7XG4gIHZhciBjb21tb25YID0gcmVmZXJlbmNlLnggKyByZWZlcmVuY2Uud2lkdGggLyAyIC0gZWxlbWVudC53aWR0aCAvIDI7XG4gIHZhciBjb21tb25ZID0gcmVmZXJlbmNlLnkgKyByZWZlcmVuY2UuaGVpZ2h0IC8gMiAtIGVsZW1lbnQuaGVpZ2h0IC8gMjtcbiAgdmFyIG9mZnNldHM7XG5cbiAgc3dpdGNoIChiYXNlUGxhY2VtZW50KSB7XG4gICAgY2FzZSB0b3A6XG4gICAgICBvZmZzZXRzID0ge1xuICAgICAgICB4OiBjb21tb25YLFxuICAgICAgICB5OiByZWZlcmVuY2UueSAtIGVsZW1lbnQuaGVpZ2h0XG4gICAgICB9O1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIGJvdHRvbTpcbiAgICAgIG9mZnNldHMgPSB7XG4gICAgICAgIHg6IGNvbW1vblgsXG4gICAgICAgIHk6IHJlZmVyZW5jZS55ICsgcmVmZXJlbmNlLmhlaWdodFxuICAgICAgfTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSByaWdodDpcbiAgICAgIG9mZnNldHMgPSB7XG4gICAgICAgIHg6IHJlZmVyZW5jZS54ICsgcmVmZXJlbmNlLndpZHRoLFxuICAgICAgICB5OiBjb21tb25ZXG4gICAgICB9O1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIGxlZnQ6XG4gICAgICBvZmZzZXRzID0ge1xuICAgICAgICB4OiByZWZlcmVuY2UueCAtIGVsZW1lbnQud2lkdGgsXG4gICAgICAgIHk6IGNvbW1vbllcbiAgICAgIH07XG4gICAgICBicmVhaztcblxuICAgIGRlZmF1bHQ6XG4gICAgICBvZmZzZXRzID0ge1xuICAgICAgICB4OiByZWZlcmVuY2UueCxcbiAgICAgICAgeTogcmVmZXJlbmNlLnlcbiAgICAgIH07XG4gIH1cblxuICB2YXIgbWFpbkF4aXMgPSBiYXNlUGxhY2VtZW50ID8gZ2V0TWFpbkF4aXNGcm9tUGxhY2VtZW50KGJhc2VQbGFjZW1lbnQpIDogbnVsbDtcblxuICBpZiAobWFpbkF4aXMgIT0gbnVsbCkge1xuICAgIHZhciBsZW4gPSBtYWluQXhpcyA9PT0gJ3knID8gJ2hlaWdodCcgOiAnd2lkdGgnO1xuXG4gICAgc3dpdGNoICh2YXJpYXRpb24pIHtcbiAgICAgIGNhc2Ugc3RhcnQ6XG4gICAgICAgIG9mZnNldHNbbWFpbkF4aXNdID0gb2Zmc2V0c1ttYWluQXhpc10gLSAocmVmZXJlbmNlW2xlbl0gLyAyIC0gZWxlbWVudFtsZW5dIC8gMik7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIGVuZDpcbiAgICAgICAgb2Zmc2V0c1ttYWluQXhpc10gPSBvZmZzZXRzW21haW5BeGlzXSArIChyZWZlcmVuY2VbbGVuXSAvIDIgLSBlbGVtZW50W2xlbl0gLyAyKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9mZnNldHM7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGVib3VuY2UoZm4pIHtcbiAgdmFyIHBlbmRpbmc7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCFwZW5kaW5nKSB7XG4gICAgICBwZW5kaW5nID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcGVuZGluZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICByZXNvbHZlKGZuKCkpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBwZW5kaW5nO1xuICB9O1xufSIsImltcG9ydCBnZXRDbGlwcGluZ1JlY3QgZnJvbSBcIi4uL2RvbS11dGlscy9nZXRDbGlwcGluZ1JlY3QuanNcIjtcbmltcG9ydCBnZXREb2N1bWVudEVsZW1lbnQgZnJvbSBcIi4uL2RvbS11dGlscy9nZXREb2N1bWVudEVsZW1lbnQuanNcIjtcbmltcG9ydCBnZXRCb3VuZGluZ0NsaWVudFJlY3QgZnJvbSBcIi4uL2RvbS11dGlscy9nZXRCb3VuZGluZ0NsaWVudFJlY3QuanNcIjtcbmltcG9ydCBjb21wdXRlT2Zmc2V0cyBmcm9tIFwiLi9jb21wdXRlT2Zmc2V0cy5qc1wiO1xuaW1wb3J0IHJlY3RUb0NsaWVudFJlY3QgZnJvbSBcIi4vcmVjdFRvQ2xpZW50UmVjdC5qc1wiO1xuaW1wb3J0IHsgY2xpcHBpbmdQYXJlbnRzLCByZWZlcmVuY2UsIHBvcHBlciwgYm90dG9tLCB0b3AsIHJpZ2h0LCBiYXNlUGxhY2VtZW50cywgdmlld3BvcnQgfSBmcm9tIFwiLi4vZW51bXMuanNcIjtcbmltcG9ydCB7IGlzRWxlbWVudCB9IGZyb20gXCIuLi9kb20tdXRpbHMvaW5zdGFuY2VPZi5qc1wiO1xuaW1wb3J0IG1lcmdlUGFkZGluZ09iamVjdCBmcm9tIFwiLi9tZXJnZVBhZGRpbmdPYmplY3QuanNcIjtcbmltcG9ydCBleHBhbmRUb0hhc2hNYXAgZnJvbSBcIi4vZXhwYW5kVG9IYXNoTWFwLmpzXCI7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGV0ZWN0T3ZlcmZsb3coc3RhdGUsIG9wdGlvbnMpIHtcbiAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuXG4gIHZhciBfb3B0aW9ucyA9IG9wdGlvbnMsXG4gICAgICBfb3B0aW9ucyRwbGFjZW1lbnQgPSBfb3B0aW9ucy5wbGFjZW1lbnQsXG4gICAgICBwbGFjZW1lbnQgPSBfb3B0aW9ucyRwbGFjZW1lbnQgPT09IHZvaWQgMCA/IHN0YXRlLnBsYWNlbWVudCA6IF9vcHRpb25zJHBsYWNlbWVudCxcbiAgICAgIF9vcHRpb25zJHN0cmF0ZWd5ID0gX29wdGlvbnMuc3RyYXRlZ3ksXG4gICAgICBzdHJhdGVneSA9IF9vcHRpb25zJHN0cmF0ZWd5ID09PSB2b2lkIDAgPyBzdGF0ZS5zdHJhdGVneSA6IF9vcHRpb25zJHN0cmF0ZWd5LFxuICAgICAgX29wdGlvbnMkYm91bmRhcnkgPSBfb3B0aW9ucy5ib3VuZGFyeSxcbiAgICAgIGJvdW5kYXJ5ID0gX29wdGlvbnMkYm91bmRhcnkgPT09IHZvaWQgMCA/IGNsaXBwaW5nUGFyZW50cyA6IF9vcHRpb25zJGJvdW5kYXJ5LFxuICAgICAgX29wdGlvbnMkcm9vdEJvdW5kYXJ5ID0gX29wdGlvbnMucm9vdEJvdW5kYXJ5LFxuICAgICAgcm9vdEJvdW5kYXJ5ID0gX29wdGlvbnMkcm9vdEJvdW5kYXJ5ID09PSB2b2lkIDAgPyB2aWV3cG9ydCA6IF9vcHRpb25zJHJvb3RCb3VuZGFyeSxcbiAgICAgIF9vcHRpb25zJGVsZW1lbnRDb250ZSA9IF9vcHRpb25zLmVsZW1lbnRDb250ZXh0LFxuICAgICAgZWxlbWVudENvbnRleHQgPSBfb3B0aW9ucyRlbGVtZW50Q29udGUgPT09IHZvaWQgMCA/IHBvcHBlciA6IF9vcHRpb25zJGVsZW1lbnRDb250ZSxcbiAgICAgIF9vcHRpb25zJGFsdEJvdW5kYXJ5ID0gX29wdGlvbnMuYWx0Qm91bmRhcnksXG4gICAgICBhbHRCb3VuZGFyeSA9IF9vcHRpb25zJGFsdEJvdW5kYXJ5ID09PSB2b2lkIDAgPyBmYWxzZSA6IF9vcHRpb25zJGFsdEJvdW5kYXJ5LFxuICAgICAgX29wdGlvbnMkcGFkZGluZyA9IF9vcHRpb25zLnBhZGRpbmcsXG4gICAgICBwYWRkaW5nID0gX29wdGlvbnMkcGFkZGluZyA9PT0gdm9pZCAwID8gMCA6IF9vcHRpb25zJHBhZGRpbmc7XG4gIHZhciBwYWRkaW5nT2JqZWN0ID0gbWVyZ2VQYWRkaW5nT2JqZWN0KHR5cGVvZiBwYWRkaW5nICE9PSAnbnVtYmVyJyA/IHBhZGRpbmcgOiBleHBhbmRUb0hhc2hNYXAocGFkZGluZywgYmFzZVBsYWNlbWVudHMpKTtcbiAgdmFyIGFsdENvbnRleHQgPSBlbGVtZW50Q29udGV4dCA9PT0gcG9wcGVyID8gcmVmZXJlbmNlIDogcG9wcGVyO1xuICB2YXIgcG9wcGVyUmVjdCA9IHN0YXRlLnJlY3RzLnBvcHBlcjtcbiAgdmFyIGVsZW1lbnQgPSBzdGF0ZS5lbGVtZW50c1thbHRCb3VuZGFyeSA/IGFsdENvbnRleHQgOiBlbGVtZW50Q29udGV4dF07XG4gIHZhciBjbGlwcGluZ0NsaWVudFJlY3QgPSBnZXRDbGlwcGluZ1JlY3QoaXNFbGVtZW50KGVsZW1lbnQpID8gZWxlbWVudCA6IGVsZW1lbnQuY29udGV4dEVsZW1lbnQgfHwgZ2V0RG9jdW1lbnRFbGVtZW50KHN0YXRlLmVsZW1lbnRzLnBvcHBlciksIGJvdW5kYXJ5LCByb290Qm91bmRhcnksIHN0cmF0ZWd5KTtcbiAgdmFyIHJlZmVyZW5jZUNsaWVudFJlY3QgPSBnZXRCb3VuZGluZ0NsaWVudFJlY3Qoc3RhdGUuZWxlbWVudHMucmVmZXJlbmNlKTtcbiAgdmFyIHBvcHBlck9mZnNldHMgPSBjb21wdXRlT2Zmc2V0cyh7XG4gICAgcmVmZXJlbmNlOiByZWZlcmVuY2VDbGllbnRSZWN0LFxuICAgIGVsZW1lbnQ6IHBvcHBlclJlY3QsXG4gICAgc3RyYXRlZ3k6ICdhYnNvbHV0ZScsXG4gICAgcGxhY2VtZW50OiBwbGFjZW1lbnRcbiAgfSk7XG4gIHZhciBwb3BwZXJDbGllbnRSZWN0ID0gcmVjdFRvQ2xpZW50UmVjdChPYmplY3QuYXNzaWduKHt9LCBwb3BwZXJSZWN0LCBwb3BwZXJPZmZzZXRzKSk7XG4gIHZhciBlbGVtZW50Q2xpZW50UmVjdCA9IGVsZW1lbnRDb250ZXh0ID09PSBwb3BwZXIgPyBwb3BwZXJDbGllbnRSZWN0IDogcmVmZXJlbmNlQ2xpZW50UmVjdDsgLy8gcG9zaXRpdmUgPSBvdmVyZmxvd2luZyB0aGUgY2xpcHBpbmcgcmVjdFxuICAvLyAwIG9yIG5lZ2F0aXZlID0gd2l0aGluIHRoZSBjbGlwcGluZyByZWN0XG5cbiAgdmFyIG92ZXJmbG93T2Zmc2V0cyA9IHtcbiAgICB0b3A6IGNsaXBwaW5nQ2xpZW50UmVjdC50b3AgLSBlbGVtZW50Q2xpZW50UmVjdC50b3AgKyBwYWRkaW5nT2JqZWN0LnRvcCxcbiAgICBib3R0b206IGVsZW1lbnRDbGllbnRSZWN0LmJvdHRvbSAtIGNsaXBwaW5nQ2xpZW50UmVjdC5ib3R0b20gKyBwYWRkaW5nT2JqZWN0LmJvdHRvbSxcbiAgICBsZWZ0OiBjbGlwcGluZ0NsaWVudFJlY3QubGVmdCAtIGVsZW1lbnRDbGllbnRSZWN0LmxlZnQgKyBwYWRkaW5nT2JqZWN0LmxlZnQsXG4gICAgcmlnaHQ6IGVsZW1lbnRDbGllbnRSZWN0LnJpZ2h0IC0gY2xpcHBpbmdDbGllbnRSZWN0LnJpZ2h0ICsgcGFkZGluZ09iamVjdC5yaWdodFxuICB9O1xuICB2YXIgb2Zmc2V0RGF0YSA9IHN0YXRlLm1vZGlmaWVyc0RhdGEub2Zmc2V0OyAvLyBPZmZzZXRzIGNhbiBiZSBhcHBsaWVkIG9ubHkgdG8gdGhlIHBvcHBlciBlbGVtZW50XG5cbiAgaWYgKGVsZW1lbnRDb250ZXh0ID09PSBwb3BwZXIgJiYgb2Zmc2V0RGF0YSkge1xuICAgIHZhciBvZmZzZXQgPSBvZmZzZXREYXRhW3BsYWNlbWVudF07XG4gICAgT2JqZWN0LmtleXMob3ZlcmZsb3dPZmZzZXRzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHZhciBtdWx0aXBseSA9IFtyaWdodCwgYm90dG9tXS5pbmRleE9mKGtleSkgPj0gMCA/IDEgOiAtMTtcbiAgICAgIHZhciBheGlzID0gW3RvcCwgYm90dG9tXS5pbmRleE9mKGtleSkgPj0gMCA/ICd5JyA6ICd4JztcbiAgICAgIG92ZXJmbG93T2Zmc2V0c1trZXldICs9IG9mZnNldFtheGlzXSAqIG11bHRpcGx5O1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIG92ZXJmbG93T2Zmc2V0cztcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBleHBhbmRUb0hhc2hNYXAodmFsdWUsIGtleXMpIHtcbiAgcmV0dXJuIGtleXMucmVkdWNlKGZ1bmN0aW9uIChoYXNoTWFwLCBrZXkpIHtcbiAgICBoYXNoTWFwW2tleV0gPSB2YWx1ZTtcbiAgICByZXR1cm4gaGFzaE1hcDtcbiAgfSwge30pO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZvcm1hdChzdHIpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgcmV0dXJuIFtdLmNvbmNhdChhcmdzKS5yZWR1Y2UoZnVuY3Rpb24gKHAsIGMpIHtcbiAgICByZXR1cm4gcC5yZXBsYWNlKC8lcy8sIGMpO1xuICB9LCBzdHIpO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldEFsdEF4aXMoYXhpcykge1xuICByZXR1cm4gYXhpcyA9PT0gJ3gnID8gJ3knIDogJ3gnO1xufSIsImltcG9ydCB7IGF1dG8gfSBmcm9tIFwiLi4vZW51bXMuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldEJhc2VQbGFjZW1lbnQocGxhY2VtZW50KSB7XG4gIHJldHVybiBwbGFjZW1lbnQuc3BsaXQoJy0nKVswXTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRGcmVzaFNpZGVPYmplY3QoKSB7XG4gIHJldHVybiB7XG4gICAgdG9wOiAwLFxuICAgIHJpZ2h0OiAwLFxuICAgIGJvdHRvbTogMCxcbiAgICBsZWZ0OiAwXG4gIH07XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0TWFpbkF4aXNGcm9tUGxhY2VtZW50KHBsYWNlbWVudCkge1xuICByZXR1cm4gWyd0b3AnLCAnYm90dG9tJ10uaW5kZXhPZihwbGFjZW1lbnQpID49IDAgPyAneCcgOiAneSc7XG59IiwidmFyIGhhc2ggPSB7XG4gIGxlZnQ6ICdyaWdodCcsXG4gIHJpZ2h0OiAnbGVmdCcsXG4gIGJvdHRvbTogJ3RvcCcsXG4gIHRvcDogJ2JvdHRvbSdcbn07XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRPcHBvc2l0ZVBsYWNlbWVudChwbGFjZW1lbnQpIHtcbiAgcmV0dXJuIHBsYWNlbWVudC5yZXBsYWNlKC9sZWZ0fHJpZ2h0fGJvdHRvbXx0b3AvZywgZnVuY3Rpb24gKG1hdGNoZWQpIHtcbiAgICByZXR1cm4gaGFzaFttYXRjaGVkXTtcbiAgfSk7XG59IiwidmFyIGhhc2ggPSB7XG4gIHN0YXJ0OiAnZW5kJyxcbiAgZW5kOiAnc3RhcnQnXG59O1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0T3Bwb3NpdGVWYXJpYXRpb25QbGFjZW1lbnQocGxhY2VtZW50KSB7XG4gIHJldHVybiBwbGFjZW1lbnQucmVwbGFjZSgvc3RhcnR8ZW5kL2csIGZ1bmN0aW9uIChtYXRjaGVkKSB7XG4gICAgcmV0dXJuIGhhc2hbbWF0Y2hlZF07XG4gIH0pO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFZhcmlhdGlvbihwbGFjZW1lbnQpIHtcbiAgcmV0dXJuIHBsYWNlbWVudC5zcGxpdCgnLScpWzFdO1xufSIsImV4cG9ydCB2YXIgbWF4ID0gTWF0aC5tYXg7XG5leHBvcnQgdmFyIG1pbiA9IE1hdGgubWluO1xuZXhwb3J0IHZhciByb3VuZCA9IE1hdGgucm91bmQ7IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWVyZ2VCeU5hbWUobW9kaWZpZXJzKSB7XG4gIHZhciBtZXJnZWQgPSBtb2RpZmllcnMucmVkdWNlKGZ1bmN0aW9uIChtZXJnZWQsIGN1cnJlbnQpIHtcbiAgICB2YXIgZXhpc3RpbmcgPSBtZXJnZWRbY3VycmVudC5uYW1lXTtcbiAgICBtZXJnZWRbY3VycmVudC5uYW1lXSA9IGV4aXN0aW5nID8gT2JqZWN0LmFzc2lnbih7fSwgZXhpc3RpbmcsIGN1cnJlbnQsIHtcbiAgICAgIG9wdGlvbnM6IE9iamVjdC5hc3NpZ24oe30sIGV4aXN0aW5nLm9wdGlvbnMsIGN1cnJlbnQub3B0aW9ucyksXG4gICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHt9LCBleGlzdGluZy5kYXRhLCBjdXJyZW50LmRhdGEpXG4gICAgfSkgOiBjdXJyZW50O1xuICAgIHJldHVybiBtZXJnZWQ7XG4gIH0sIHt9KTsgLy8gSUUxMSBkb2VzIG5vdCBzdXBwb3J0IE9iamVjdC52YWx1ZXNcblxuICByZXR1cm4gT2JqZWN0LmtleXMobWVyZ2VkKS5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgIHJldHVybiBtZXJnZWRba2V5XTtcbiAgfSk7XG59IiwiaW1wb3J0IGdldEZyZXNoU2lkZU9iamVjdCBmcm9tIFwiLi9nZXRGcmVzaFNpZGVPYmplY3QuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1lcmdlUGFkZGluZ09iamVjdChwYWRkaW5nT2JqZWN0KSB7XG4gIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBnZXRGcmVzaFNpZGVPYmplY3QoKSwgcGFkZGluZ09iamVjdCk7XG59IiwiaW1wb3J0IHsgbW9kaWZpZXJQaGFzZXMgfSBmcm9tIFwiLi4vZW51bXMuanNcIjsgLy8gc291cmNlOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80OTg3NTI1NVxuXG5mdW5jdGlvbiBvcmRlcihtb2RpZmllcnMpIHtcbiAgdmFyIG1hcCA9IG5ldyBNYXAoKTtcbiAgdmFyIHZpc2l0ZWQgPSBuZXcgU2V0KCk7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgbW9kaWZpZXJzLmZvckVhY2goZnVuY3Rpb24gKG1vZGlmaWVyKSB7XG4gICAgbWFwLnNldChtb2RpZmllci5uYW1lLCBtb2RpZmllcik7XG4gIH0pOyAvLyBPbiB2aXNpdGluZyBvYmplY3QsIGNoZWNrIGZvciBpdHMgZGVwZW5kZW5jaWVzIGFuZCB2aXNpdCB0aGVtIHJlY3Vyc2l2ZWx5XG5cbiAgZnVuY3Rpb24gc29ydChtb2RpZmllcikge1xuICAgIHZpc2l0ZWQuYWRkKG1vZGlmaWVyLm5hbWUpO1xuICAgIHZhciByZXF1aXJlcyA9IFtdLmNvbmNhdChtb2RpZmllci5yZXF1aXJlcyB8fCBbXSwgbW9kaWZpZXIucmVxdWlyZXNJZkV4aXN0cyB8fCBbXSk7XG4gICAgcmVxdWlyZXMuZm9yRWFjaChmdW5jdGlvbiAoZGVwKSB7XG4gICAgICBpZiAoIXZpc2l0ZWQuaGFzKGRlcCkpIHtcbiAgICAgICAgdmFyIGRlcE1vZGlmaWVyID0gbWFwLmdldChkZXApO1xuXG4gICAgICAgIGlmIChkZXBNb2RpZmllcikge1xuICAgICAgICAgIHNvcnQoZGVwTW9kaWZpZXIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmVzdWx0LnB1c2gobW9kaWZpZXIpO1xuICB9XG5cbiAgbW9kaWZpZXJzLmZvckVhY2goZnVuY3Rpb24gKG1vZGlmaWVyKSB7XG4gICAgaWYgKCF2aXNpdGVkLmhhcyhtb2RpZmllci5uYW1lKSkge1xuICAgICAgLy8gY2hlY2sgZm9yIHZpc2l0ZWQgb2JqZWN0XG4gICAgICBzb3J0KG1vZGlmaWVyKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvcmRlck1vZGlmaWVycyhtb2RpZmllcnMpIHtcbiAgLy8gb3JkZXIgYmFzZWQgb24gZGVwZW5kZW5jaWVzXG4gIHZhciBvcmRlcmVkTW9kaWZpZXJzID0gb3JkZXIobW9kaWZpZXJzKTsgLy8gb3JkZXIgYmFzZWQgb24gcGhhc2VcblxuICByZXR1cm4gbW9kaWZpZXJQaGFzZXMucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHBoYXNlKSB7XG4gICAgcmV0dXJuIGFjYy5jb25jYXQob3JkZXJlZE1vZGlmaWVycy5maWx0ZXIoZnVuY3Rpb24gKG1vZGlmaWVyKSB7XG4gICAgICByZXR1cm4gbW9kaWZpZXIucGhhc2UgPT09IHBoYXNlO1xuICAgIH0pKTtcbiAgfSwgW10pO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlY3RUb0NsaWVudFJlY3QocmVjdCkge1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgcmVjdCwge1xuICAgIGxlZnQ6IHJlY3QueCxcbiAgICB0b3A6IHJlY3QueSxcbiAgICByaWdodDogcmVjdC54ICsgcmVjdC53aWR0aCxcbiAgICBib3R0b206IHJlY3QueSArIHJlY3QuaGVpZ2h0XG4gIH0pO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVuaXF1ZUJ5KGFyciwgZm4pIHtcbiAgdmFyIGlkZW50aWZpZXJzID0gbmV3IFNldCgpO1xuICByZXR1cm4gYXJyLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgIHZhciBpZGVudGlmaWVyID0gZm4oaXRlbSk7XG5cbiAgICBpZiAoIWlkZW50aWZpZXJzLmhhcyhpZGVudGlmaWVyKSkge1xuICAgICAgaWRlbnRpZmllcnMuYWRkKGlkZW50aWZpZXIpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9KTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRVQVN0cmluZygpIHtcbiAgdmFyIHVhRGF0YSA9IG5hdmlnYXRvci51c2VyQWdlbnREYXRhO1xuXG4gIGlmICh1YURhdGEgIT0gbnVsbCAmJiB1YURhdGEuYnJhbmRzKSB7XG4gICAgcmV0dXJuIHVhRGF0YS5icmFuZHMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICByZXR1cm4gaXRlbS5icmFuZCArIFwiL1wiICsgaXRlbS52ZXJzaW9uO1xuICAgIH0pLmpvaW4oJyAnKTtcbiAgfVxuXG4gIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50O1xufSIsImltcG9ydCBmb3JtYXQgZnJvbSBcIi4vZm9ybWF0LmpzXCI7XG5pbXBvcnQgeyBtb2RpZmllclBoYXNlcyB9IGZyb20gXCIuLi9lbnVtcy5qc1wiO1xudmFyIElOVkFMSURfTU9ESUZJRVJfRVJST1IgPSAnUG9wcGVyOiBtb2RpZmllciBcIiVzXCIgcHJvdmlkZWQgYW4gaW52YWxpZCAlcyBwcm9wZXJ0eSwgZXhwZWN0ZWQgJXMgYnV0IGdvdCAlcyc7XG52YXIgTUlTU0lOR19ERVBFTkRFTkNZX0VSUk9SID0gJ1BvcHBlcjogbW9kaWZpZXIgXCIlc1wiIHJlcXVpcmVzIFwiJXNcIiwgYnV0IFwiJXNcIiBtb2RpZmllciBpcyBub3QgYXZhaWxhYmxlJztcbnZhciBWQUxJRF9QUk9QRVJUSUVTID0gWyduYW1lJywgJ2VuYWJsZWQnLCAncGhhc2UnLCAnZm4nLCAnZWZmZWN0JywgJ3JlcXVpcmVzJywgJ29wdGlvbnMnXTtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHZhbGlkYXRlTW9kaWZpZXJzKG1vZGlmaWVycykge1xuICBtb2RpZmllcnMuZm9yRWFjaChmdW5jdGlvbiAobW9kaWZpZXIpIHtcbiAgICBbXS5jb25jYXQoT2JqZWN0LmtleXMobW9kaWZpZXIpLCBWQUxJRF9QUk9QRVJUSUVTKSAvLyBJRTExLWNvbXBhdGlibGUgcmVwbGFjZW1lbnQgZm9yIGBuZXcgU2V0KGl0ZXJhYmxlKWBcbiAgICAuZmlsdGVyKGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgsIHNlbGYpIHtcbiAgICAgIHJldHVybiBzZWxmLmluZGV4T2YodmFsdWUpID09PSBpbmRleDtcbiAgICB9KS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgIGNhc2UgJ25hbWUnOlxuICAgICAgICAgIGlmICh0eXBlb2YgbW9kaWZpZXIubmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZm9ybWF0KElOVkFMSURfTU9ESUZJRVJfRVJST1IsIFN0cmluZyhtb2RpZmllci5uYW1lKSwgJ1wibmFtZVwiJywgJ1wic3RyaW5nXCInLCBcIlxcXCJcIiArIFN0cmluZyhtb2RpZmllci5uYW1lKSArIFwiXFxcIlwiKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnZW5hYmxlZCc6XG4gICAgICAgICAgaWYgKHR5cGVvZiBtb2RpZmllci5lbmFibGVkICE9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZm9ybWF0KElOVkFMSURfTU9ESUZJRVJfRVJST1IsIG1vZGlmaWVyLm5hbWUsICdcImVuYWJsZWRcIicsICdcImJvb2xlYW5cIicsIFwiXFxcIlwiICsgU3RyaW5nKG1vZGlmaWVyLmVuYWJsZWQpICsgXCJcXFwiXCIpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdwaGFzZSc6XG4gICAgICAgICAgaWYgKG1vZGlmaWVyUGhhc2VzLmluZGV4T2YobW9kaWZpZXIucGhhc2UpIDwgMCkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihmb3JtYXQoSU5WQUxJRF9NT0RJRklFUl9FUlJPUiwgbW9kaWZpZXIubmFtZSwgJ1wicGhhc2VcIicsIFwiZWl0aGVyIFwiICsgbW9kaWZpZXJQaGFzZXMuam9pbignLCAnKSwgXCJcXFwiXCIgKyBTdHJpbmcobW9kaWZpZXIucGhhc2UpICsgXCJcXFwiXCIpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdmbic6XG4gICAgICAgICAgaWYgKHR5cGVvZiBtb2RpZmllci5mbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihmb3JtYXQoSU5WQUxJRF9NT0RJRklFUl9FUlJPUiwgbW9kaWZpZXIubmFtZSwgJ1wiZm5cIicsICdcImZ1bmN0aW9uXCInLCBcIlxcXCJcIiArIFN0cmluZyhtb2RpZmllci5mbikgKyBcIlxcXCJcIikpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ2VmZmVjdCc6XG4gICAgICAgICAgaWYgKG1vZGlmaWVyLmVmZmVjdCAhPSBudWxsICYmIHR5cGVvZiBtb2RpZmllci5lZmZlY3QgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZm9ybWF0KElOVkFMSURfTU9ESUZJRVJfRVJST1IsIG1vZGlmaWVyLm5hbWUsICdcImVmZmVjdFwiJywgJ1wiZnVuY3Rpb25cIicsIFwiXFxcIlwiICsgU3RyaW5nKG1vZGlmaWVyLmZuKSArIFwiXFxcIlwiKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAncmVxdWlyZXMnOlxuICAgICAgICAgIGlmIChtb2RpZmllci5yZXF1aXJlcyAhPSBudWxsICYmICFBcnJheS5pc0FycmF5KG1vZGlmaWVyLnJlcXVpcmVzKSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihmb3JtYXQoSU5WQUxJRF9NT0RJRklFUl9FUlJPUiwgbW9kaWZpZXIubmFtZSwgJ1wicmVxdWlyZXNcIicsICdcImFycmF5XCInLCBcIlxcXCJcIiArIFN0cmluZyhtb2RpZmllci5yZXF1aXJlcykgKyBcIlxcXCJcIikpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ3JlcXVpcmVzSWZFeGlzdHMnOlxuICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShtb2RpZmllci5yZXF1aXJlc0lmRXhpc3RzKSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihmb3JtYXQoSU5WQUxJRF9NT0RJRklFUl9FUlJPUiwgbW9kaWZpZXIubmFtZSwgJ1wicmVxdWlyZXNJZkV4aXN0c1wiJywgJ1wiYXJyYXlcIicsIFwiXFxcIlwiICsgU3RyaW5nKG1vZGlmaWVyLnJlcXVpcmVzSWZFeGlzdHMpICsgXCJcXFwiXCIpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdvcHRpb25zJzpcbiAgICAgICAgY2FzZSAnZGF0YSc6XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiUG9wcGVySlM6IGFuIGludmFsaWQgcHJvcGVydHkgaGFzIGJlZW4gcHJvdmlkZWQgdG8gdGhlIFxcXCJcIiArIG1vZGlmaWVyLm5hbWUgKyBcIlxcXCIgbW9kaWZpZXIsIHZhbGlkIHByb3BlcnRpZXMgYXJlIFwiICsgVkFMSURfUFJPUEVSVElFUy5tYXAoZnVuY3Rpb24gKHMpIHtcbiAgICAgICAgICAgIHJldHVybiBcIlxcXCJcIiArIHMgKyBcIlxcXCJcIjtcbiAgICAgICAgICB9KS5qb2luKCcsICcpICsgXCI7IGJ1dCBcXFwiXCIgKyBrZXkgKyBcIlxcXCIgd2FzIHByb3ZpZGVkLlwiKTtcbiAgICAgIH1cblxuICAgICAgbW9kaWZpZXIucmVxdWlyZXMgJiYgbW9kaWZpZXIucmVxdWlyZXMuZm9yRWFjaChmdW5jdGlvbiAocmVxdWlyZW1lbnQpIHtcbiAgICAgICAgaWYgKG1vZGlmaWVycy5maW5kKGZ1bmN0aW9uIChtb2QpIHtcbiAgICAgICAgICByZXR1cm4gbW9kLm5hbWUgPT09IHJlcXVpcmVtZW50O1xuICAgICAgICB9KSA9PSBudWxsKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihmb3JtYXQoTUlTU0lOR19ERVBFTkRFTkNZX0VSUk9SLCBTdHJpbmcobW9kaWZpZXIubmFtZSksIHJlcXVpcmVtZW50LCByZXF1aXJlbWVudCkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59IiwiaW1wb3J0IHsgbWF4IGFzIG1hdGhNYXgsIG1pbiBhcyBtYXRoTWluIH0gZnJvbSBcIi4vbWF0aC5qc1wiO1xuZXhwb3J0IGZ1bmN0aW9uIHdpdGhpbihtaW4sIHZhbHVlLCBtYXgpIHtcbiAgcmV0dXJuIG1hdGhNYXgobWluLCBtYXRoTWluKHZhbHVlLCBtYXgpKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiB3aXRoaW5NYXhDbGFtcChtaW4sIHZhbHVlLCBtYXgpIHtcbiAgdmFyIHYgPSB3aXRoaW4obWluLCB2YWx1ZSwgbWF4KTtcbiAgcmV0dXJuIHYgPiBtYXggPyBtYXggOiB2O1xufSIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgLy8gSHRtbCBFZGl0b3JcbiAgICBsZXQgY2xhc3NpY0VkaXRvclRyaWdnZXJMaXN0ID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaHRtbC1lZGl0b3InKSlcbiAgICBjbGFzc2ljRWRpdG9yVHJpZ2dlckxpc3QubWFwKGZ1bmN0aW9uIChlZGl0b3JUcmlnZ2VyRWwpIHtcbiAgICAgICAgaWYgKENsYXNzaWNFZGl0b3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgZWRpdG9yVHJpZ2dlckVsLnJlcXVpcmVkID0gZmFsc2U7XG4gICAgICAgICAgICBDbGFzc2ljRWRpdG9yLmNyZWF0ZShlZGl0b3JUcmlnZ2VyRWwpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBTbHVnXG4gICAgbGV0IHNsdWdUcmlnZ2VyTGlzdCA9IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbZGF0YS1zbHVnLWlucHV0XScpKVxuICAgIHNsdWdUcmlnZ2VyTGlzdC5tYXAoZnVuY3Rpb24gKHNsdWdUcmlnZ2VyRWwpIHtcbiAgICAgICAgc2x1Z1RyaWdnZXJFbC5vbmlucHV0ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2x1Zy1pbnB1dCcpKTtcbiAgICAgICAgICAgIHRpdGxlLnZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlLnRvU3RyaW5nKClcbiAgICAgICAgICAgICAgICAudG9Mb3dlckNhc2UoKVxuICAgICAgICAgICAgICAgIC5ub3JtYWxpemUoJ05GRCcpICAgICAgICAgICAgICAgICAgIC8vIHNwbGl0IGFuIGFjY2VudGVkIGxldHRlciBpbiB0aGUgYmFzZSBsZXR0ZXIgYW5kIHRoZSBhY2VudFxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9bXFx1MDMwMC1cXHUwMzZmXS9nLCAnJykgICAvLyByZW1vdmUgYWxsIHByZXZpb3VzbHkgc3BsaXQgYWNjZW50c1xuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXHMrL2csICctJykgLy8gUmVwbGFjZSBzcGFjZXMgd2l0aCAtXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoLyYvZywgJy1hbmQtJykgLy8gUmVwbGFjZSAmIHdpdGggJ2FuZCdcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvW15cXHdcXC1dKy9nLCAnJykgLy8gUmVtb3ZlIGFsbCBub24td29yZCBjaGFyYWN0ZXJzXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcLVxcLSsvZywgJy0nKSAvLyBSZXBsYWNlIG11bHRpcGxlIC0gd2l0aCBzaW5nbGUgLVxuICAgICAgICAgICAgICAgIC50cmltKCk7XG5cbiAgICAgICAgICAgIHRpdGxlLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdpbnB1dCcpKTsgLy8gRm9yIGxpdmV3aXJlXG4gICAgICAgIH1cbiAgICB9KTtcblxuXG4gICAgLy8gTGluayB3aXRoIG1ldGhvZFxuICAgIGxldCBsaW5rVHJpZ2dlckxpc3QgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2FbZGF0YS1tZXRob2RdJykpXG4gICAgbGlua1RyaWdnZXJMaXN0Lm1hcChmdW5jdGlvbiAobGlua1RyaWdnZXJFbCkge1xuICAgICAgICBsaW5rVHJpZ2dlckVsLm9uY2xpY2sgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBsZXQgY29uZmlybWF0aW9uID0gZXZlbnQuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29uZmlybS1tZXNzYWdlJyk7XG4gICAgICAgICAgICBpZiAoY29uZmlybWF0aW9uICYmICFjb25maXJtKGNvbmZpcm1hdGlvbikpIHtcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG4gICAgICAgICAgICBsZXQgdG9rZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZXRhW25hbWU9XCJjc3JmLXRva2VuXCJdJykuZ2V0QXR0cmlidXRlKCdjb250ZW50Jyk7XG4gICAgICAgICAgICBmb3JtLnNldEF0dHJpYnV0ZSgnbWV0aG9kJywgJ1BPU1QnKTtcbiAgICAgICAgICAgIGZvcm0uc2V0QXR0cmlidXRlKCdhY3Rpb24nLCBldmVudC5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZSgnaHJlZicpKTtcbiAgICAgICAgICAgIGZvcm0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIGZvcm0uaW5uZXJIVE1MID0gJzxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmFtZT1cIl9tZXRob2RcIiB2YWx1ZT1cIicgKyBldmVudC5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1tZXRob2QnKSArICdcIj4nXG4gICAgICAgICAgICAgICAgKyAnPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwiX3Rva2VuXCIgdmFsdWU9XCInICsgdG9rZW4gKyAnXCI+JztcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZm9ybSk7XG4gICAgICAgICAgICBmb3JtLnN1Ym1pdCgpO1xuXG4gICAgICAgICAgICBsaW5rVHJpZ2dlckVsLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfTtcblxuICAgICAgICBsaW5rVHJpZ2dlckVsLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnYXV0byc7XG4gICAgfSk7XG59LCBmYWxzZSk7XG4iLCIvKiFcbiAgKiBCb290c3RyYXAgYWxlcnQuanMgdjUuMi4yIChodHRwczovL2dldGJvb3RzdHJhcC5jb20vKVxuICAqIENvcHlyaWdodCAyMDExLTIwMjIgVGhlIEJvb3RzdHJhcCBBdXRob3JzIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvZ3JhcGhzL2NvbnRyaWJ1dG9ycylcbiAgKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21haW4vTElDRU5TRSlcbiAgKi9cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKCcuL3V0aWwvaW5kZXgnKSwgcmVxdWlyZSgnLi9kb20vZXZlbnQtaGFuZGxlcicpLCByZXF1aXJlKCcuL2Jhc2UtY29tcG9uZW50JyksIHJlcXVpcmUoJy4vdXRpbC9jb21wb25lbnQtZnVuY3Rpb25zJykpIDpcbiAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKFsnLi91dGlsL2luZGV4JywgJy4vZG9tL2V2ZW50LWhhbmRsZXInLCAnLi9iYXNlLWNvbXBvbmVudCcsICcuL3V0aWwvY29tcG9uZW50LWZ1bmN0aW9ucyddLCBmYWN0b3J5KSA6XG4gIChnbG9iYWwgPSB0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWxUaGlzIDogZ2xvYmFsIHx8IHNlbGYsIGdsb2JhbC5BbGVydCA9IGZhY3RvcnkoZ2xvYmFsLkluZGV4LCBnbG9iYWwuRXZlbnRIYW5kbGVyLCBnbG9iYWwuQmFzZUNvbXBvbmVudCwgZ2xvYmFsLkNvbXBvbmVudEZ1bmN0aW9ucykpO1xufSkodGhpcywgKGZ1bmN0aW9uIChpbmRleCwgRXZlbnRIYW5kbGVyLCBCYXNlQ29tcG9uZW50LCBjb21wb25lbnRGdW5jdGlvbnMpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gIGNvbnN0IF9pbnRlcm9wRGVmYXVsdExlZ2FjeSA9IGUgPT4gZSAmJiB0eXBlb2YgZSA9PT0gJ29iamVjdCcgJiYgJ2RlZmF1bHQnIGluIGUgPyBlIDogeyBkZWZhdWx0OiBlIH07XG5cbiAgY29uc3QgRXZlbnRIYW5kbGVyX19kZWZhdWx0ID0gLyojX19QVVJFX18qL19pbnRlcm9wRGVmYXVsdExlZ2FjeShFdmVudEhhbmRsZXIpO1xuICBjb25zdCBCYXNlQ29tcG9uZW50X19kZWZhdWx0ID0gLyojX19QVVJFX18qL19pbnRlcm9wRGVmYXVsdExlZ2FjeShCYXNlQ29tcG9uZW50KTtcblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQm9vdHN0cmFwICh2NS4yLjIpOiBhbGVydC5qc1xuICAgKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21haW4vTElDRU5TRSlcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG4gIC8qKlxuICAgKiBDb25zdGFudHNcbiAgICovXG5cbiAgY29uc3QgTkFNRSA9ICdhbGVydCc7XG4gIGNvbnN0IERBVEFfS0VZID0gJ2JzLmFsZXJ0JztcbiAgY29uc3QgRVZFTlRfS0VZID0gYC4ke0RBVEFfS0VZfWA7XG4gIGNvbnN0IEVWRU5UX0NMT1NFID0gYGNsb3NlJHtFVkVOVF9LRVl9YDtcbiAgY29uc3QgRVZFTlRfQ0xPU0VEID0gYGNsb3NlZCR7RVZFTlRfS0VZfWA7XG4gIGNvbnN0IENMQVNTX05BTUVfRkFERSA9ICdmYWRlJztcbiAgY29uc3QgQ0xBU1NfTkFNRV9TSE9XID0gJ3Nob3cnO1xuICAvKipcbiAgICogQ2xhc3MgZGVmaW5pdGlvblxuICAgKi9cblxuICBjbGFzcyBBbGVydCBleHRlbmRzIEJhc2VDb21wb25lbnRfX2RlZmF1bHQuZGVmYXVsdCB7XG4gICAgLy8gR2V0dGVyc1xuICAgIHN0YXRpYyBnZXQgTkFNRSgpIHtcbiAgICAgIHJldHVybiBOQU1FO1xuICAgIH0gLy8gUHVibGljXG5cblxuICAgIGNsb3NlKCkge1xuICAgICAgY29uc3QgY2xvc2VFdmVudCA9IEV2ZW50SGFuZGxlcl9fZGVmYXVsdC5kZWZhdWx0LnRyaWdnZXIodGhpcy5fZWxlbWVudCwgRVZFTlRfQ0xPU0UpO1xuXG4gICAgICBpZiAoY2xvc2VFdmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKENMQVNTX05BTUVfU0hPVyk7XG5cbiAgICAgIGNvbnN0IGlzQW5pbWF0ZWQgPSB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhDTEFTU19OQU1FX0ZBREUpO1xuXG4gICAgICB0aGlzLl9xdWV1ZUNhbGxiYWNrKCgpID0+IHRoaXMuX2Rlc3Ryb3lFbGVtZW50KCksIHRoaXMuX2VsZW1lbnQsIGlzQW5pbWF0ZWQpO1xuICAgIH0gLy8gUHJpdmF0ZVxuXG5cbiAgICBfZGVzdHJveUVsZW1lbnQoKSB7XG4gICAgICB0aGlzLl9lbGVtZW50LnJlbW92ZSgpO1xuXG4gICAgICBFdmVudEhhbmRsZXJfX2RlZmF1bHQuZGVmYXVsdC50cmlnZ2VyKHRoaXMuX2VsZW1lbnQsIEVWRU5UX0NMT1NFRCk7XG4gICAgICB0aGlzLmRpc3Bvc2UoKTtcbiAgICB9IC8vIFN0YXRpY1xuXG5cbiAgICBzdGF0aWMgalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZykge1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBBbGVydC5nZXRPckNyZWF0ZUluc3RhbmNlKHRoaXMpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29uZmlnICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkYXRhW2NvbmZpZ10gPT09IHVuZGVmaW5lZCB8fCBjb25maWcuc3RhcnRzV2l0aCgnXycpIHx8IGNvbmZpZyA9PT0gJ2NvbnN0cnVjdG9yJykge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYE5vIG1ldGhvZCBuYW1lZCBcIiR7Y29uZmlnfVwiYCk7XG4gICAgICAgIH1cblxuICAgICAgICBkYXRhW2NvbmZpZ10odGhpcyk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgfVxuICAvKipcbiAgICogRGF0YSBBUEkgaW1wbGVtZW50YXRpb25cbiAgICovXG5cblxuICBjb21wb25lbnRGdW5jdGlvbnMuZW5hYmxlRGlzbWlzc1RyaWdnZXIoQWxlcnQsICdjbG9zZScpO1xuICAvKipcbiAgICogalF1ZXJ5XG4gICAqL1xuXG4gIGluZGV4LmRlZmluZUpRdWVyeVBsdWdpbihBbGVydCk7XG5cbiAgcmV0dXJuIEFsZXJ0O1xuXG59KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hbGVydC5qcy5tYXBcbiIsIi8qIVxuICAqIEJvb3RzdHJhcCBiYXNlLWNvbXBvbmVudC5qcyB2NS4yLjIgKGh0dHBzOi8vZ2V0Ym9vdHN0cmFwLmNvbS8pXG4gICogQ29weXJpZ2h0IDIwMTEtMjAyMiBUaGUgQm9vdHN0cmFwIEF1dGhvcnMgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ncmFwaHMvY29udHJpYnV0b3JzKVxuICAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFpbi9MSUNFTlNFKVxuICAqL1xuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoJy4vZG9tL2RhdGEnKSwgcmVxdWlyZSgnLi91dGlsL2luZGV4JyksIHJlcXVpcmUoJy4vZG9tL2V2ZW50LWhhbmRsZXInKSwgcmVxdWlyZSgnLi91dGlsL2NvbmZpZycpKSA6XG4gIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShbJy4vZG9tL2RhdGEnLCAnLi91dGlsL2luZGV4JywgJy4vZG9tL2V2ZW50LWhhbmRsZXInLCAnLi91dGlsL2NvbmZpZyddLCBmYWN0b3J5KSA6XG4gIChnbG9iYWwgPSB0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWxUaGlzIDogZ2xvYmFsIHx8IHNlbGYsIGdsb2JhbC5CYXNlQ29tcG9uZW50ID0gZmFjdG9yeShnbG9iYWwuRGF0YSwgZ2xvYmFsLkluZGV4LCBnbG9iYWwuRXZlbnRIYW5kbGVyLCBnbG9iYWwuQ29uZmlnKSk7XG59KSh0aGlzLCAoZnVuY3Rpb24gKERhdGEsIGluZGV4LCBFdmVudEhhbmRsZXIsIENvbmZpZykgeyAndXNlIHN0cmljdCc7XG5cbiAgY29uc3QgX2ludGVyb3BEZWZhdWx0TGVnYWN5ID0gZSA9PiBlICYmIHR5cGVvZiBlID09PSAnb2JqZWN0JyAmJiAnZGVmYXVsdCcgaW4gZSA/IGUgOiB7IGRlZmF1bHQ6IGUgfTtcblxuICBjb25zdCBEYXRhX19kZWZhdWx0ID0gLyojX19QVVJFX18qL19pbnRlcm9wRGVmYXVsdExlZ2FjeShEYXRhKTtcbiAgY29uc3QgRXZlbnRIYW5kbGVyX19kZWZhdWx0ID0gLyojX19QVVJFX18qL19pbnRlcm9wRGVmYXVsdExlZ2FjeShFdmVudEhhbmRsZXIpO1xuICBjb25zdCBDb25maWdfX2RlZmF1bHQgPSAvKiNfX1BVUkVfXyovX2ludGVyb3BEZWZhdWx0TGVnYWN5KENvbmZpZyk7XG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIEJvb3RzdHJhcCAodjUuMi4yKTogYmFzZS1jb21wb25lbnQuanNcbiAgICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYWluL0xJQ0VOU0UpXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuICAvKipcbiAgICogQ29uc3RhbnRzXG4gICAqL1xuXG4gIGNvbnN0IFZFUlNJT04gPSAnNS4yLjInO1xuICAvKipcbiAgICogQ2xhc3MgZGVmaW5pdGlvblxuICAgKi9cblxuICBjbGFzcyBCYXNlQ29tcG9uZW50IGV4dGVuZHMgQ29uZmlnX19kZWZhdWx0LmRlZmF1bHQge1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQsIGNvbmZpZykge1xuICAgICAgc3VwZXIoKTtcbiAgICAgIGVsZW1lbnQgPSBpbmRleC5nZXRFbGVtZW50KGVsZW1lbnQpO1xuXG4gICAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgIHRoaXMuX2NvbmZpZyA9IHRoaXMuX2dldENvbmZpZyhjb25maWcpO1xuICAgICAgRGF0YV9fZGVmYXVsdC5kZWZhdWx0LnNldCh0aGlzLl9lbGVtZW50LCB0aGlzLmNvbnN0cnVjdG9yLkRBVEFfS0VZLCB0aGlzKTtcbiAgICB9IC8vIFB1YmxpY1xuXG5cbiAgICBkaXNwb3NlKCkge1xuICAgICAgRGF0YV9fZGVmYXVsdC5kZWZhdWx0LnJlbW92ZSh0aGlzLl9lbGVtZW50LCB0aGlzLmNvbnN0cnVjdG9yLkRBVEFfS0VZKTtcbiAgICAgIEV2ZW50SGFuZGxlcl9fZGVmYXVsdC5kZWZhdWx0Lm9mZih0aGlzLl9lbGVtZW50LCB0aGlzLmNvbnN0cnVjdG9yLkVWRU5UX0tFWSk7XG5cbiAgICAgIGZvciAoY29uc3QgcHJvcGVydHlOYW1lIG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRoaXMpKSB7XG4gICAgICAgIHRoaXNbcHJvcGVydHlOYW1lXSA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgX3F1ZXVlQ2FsbGJhY2soY2FsbGJhY2ssIGVsZW1lbnQsIGlzQW5pbWF0ZWQgPSB0cnVlKSB7XG4gICAgICBpbmRleC5leGVjdXRlQWZ0ZXJUcmFuc2l0aW9uKGNhbGxiYWNrLCBlbGVtZW50LCBpc0FuaW1hdGVkKTtcbiAgICB9XG5cbiAgICBfZ2V0Q29uZmlnKGNvbmZpZykge1xuICAgICAgY29uZmlnID0gdGhpcy5fbWVyZ2VDb25maWdPYmooY29uZmlnLCB0aGlzLl9lbGVtZW50KTtcbiAgICAgIGNvbmZpZyA9IHRoaXMuX2NvbmZpZ0FmdGVyTWVyZ2UoY29uZmlnKTtcblxuICAgICAgdGhpcy5fdHlwZUNoZWNrQ29uZmlnKGNvbmZpZyk7XG5cbiAgICAgIHJldHVybiBjb25maWc7XG4gICAgfSAvLyBTdGF0aWNcblxuXG4gICAgc3RhdGljIGdldEluc3RhbmNlKGVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBEYXRhX19kZWZhdWx0LmRlZmF1bHQuZ2V0KGluZGV4LmdldEVsZW1lbnQoZWxlbWVudCksIHRoaXMuREFUQV9LRVkpO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXRPckNyZWF0ZUluc3RhbmNlKGVsZW1lbnQsIGNvbmZpZyA9IHt9KSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRJbnN0YW5jZShlbGVtZW50KSB8fCBuZXcgdGhpcyhlbGVtZW50LCB0eXBlb2YgY29uZmlnID09PSAnb2JqZWN0JyA/IGNvbmZpZyA6IG51bGwpO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgVkVSU0lPTigpIHtcbiAgICAgIHJldHVybiBWRVJTSU9OO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgREFUQV9LRVkoKSB7XG4gICAgICByZXR1cm4gYGJzLiR7dGhpcy5OQU1FfWA7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBFVkVOVF9LRVkoKSB7XG4gICAgICByZXR1cm4gYC4ke3RoaXMuREFUQV9LRVl9YDtcbiAgICB9XG5cbiAgICBzdGF0aWMgZXZlbnROYW1lKG5hbWUpIHtcbiAgICAgIHJldHVybiBgJHtuYW1lfSR7dGhpcy5FVkVOVF9LRVl9YDtcbiAgICB9XG5cbiAgfVxuXG4gIHJldHVybiBCYXNlQ29tcG9uZW50O1xuXG59KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1iYXNlLWNvbXBvbmVudC5qcy5tYXBcbiIsIi8qIVxuICAqIEJvb3RzdHJhcCBjb2xsYXBzZS5qcyB2NS4yLjIgKGh0dHBzOi8vZ2V0Ym9vdHN0cmFwLmNvbS8pXG4gICogQ29weXJpZ2h0IDIwMTEtMjAyMiBUaGUgQm9vdHN0cmFwIEF1dGhvcnMgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ncmFwaHMvY29udHJpYnV0b3JzKVxuICAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFpbi9MSUNFTlNFKVxuICAqL1xuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoJy4vdXRpbC9pbmRleCcpLCByZXF1aXJlKCcuL2RvbS9ldmVudC1oYW5kbGVyJyksIHJlcXVpcmUoJy4vZG9tL3NlbGVjdG9yLWVuZ2luZScpLCByZXF1aXJlKCcuL2Jhc2UtY29tcG9uZW50JykpIDpcbiAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKFsnLi91dGlsL2luZGV4JywgJy4vZG9tL2V2ZW50LWhhbmRsZXInLCAnLi9kb20vc2VsZWN0b3ItZW5naW5lJywgJy4vYmFzZS1jb21wb25lbnQnXSwgZmFjdG9yeSkgOlxuICAoZ2xvYmFsID0gdHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsVGhpcyA6IGdsb2JhbCB8fCBzZWxmLCBnbG9iYWwuQ29sbGFwc2UgPSBmYWN0b3J5KGdsb2JhbC5JbmRleCwgZ2xvYmFsLkV2ZW50SGFuZGxlciwgZ2xvYmFsLlNlbGVjdG9yRW5naW5lLCBnbG9iYWwuQmFzZUNvbXBvbmVudCkpO1xufSkodGhpcywgKGZ1bmN0aW9uIChpbmRleCwgRXZlbnRIYW5kbGVyLCBTZWxlY3RvckVuZ2luZSwgQmFzZUNvbXBvbmVudCkgeyAndXNlIHN0cmljdCc7XG5cbiAgY29uc3QgX2ludGVyb3BEZWZhdWx0TGVnYWN5ID0gZSA9PiBlICYmIHR5cGVvZiBlID09PSAnb2JqZWN0JyAmJiAnZGVmYXVsdCcgaW4gZSA/IGUgOiB7IGRlZmF1bHQ6IGUgfTtcblxuICBjb25zdCBFdmVudEhhbmRsZXJfX2RlZmF1bHQgPSAvKiNfX1BVUkVfXyovX2ludGVyb3BEZWZhdWx0TGVnYWN5KEV2ZW50SGFuZGxlcik7XG4gIGNvbnN0IFNlbGVjdG9yRW5naW5lX19kZWZhdWx0ID0gLyojX19QVVJFX18qL19pbnRlcm9wRGVmYXVsdExlZ2FjeShTZWxlY3RvckVuZ2luZSk7XG4gIGNvbnN0IEJhc2VDb21wb25lbnRfX2RlZmF1bHQgPSAvKiNfX1BVUkVfXyovX2ludGVyb3BEZWZhdWx0TGVnYWN5KEJhc2VDb21wb25lbnQpO1xuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBCb290c3RyYXAgKHY1LjIuMik6IGNvbGxhcHNlLmpzXG4gICAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFpbi9MSUNFTlNFKVxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cbiAgLyoqXG4gICAqIENvbnN0YW50c1xuICAgKi9cblxuICBjb25zdCBOQU1FID0gJ2NvbGxhcHNlJztcbiAgY29uc3QgREFUQV9LRVkgPSAnYnMuY29sbGFwc2UnO1xuICBjb25zdCBFVkVOVF9LRVkgPSBgLiR7REFUQV9LRVl9YDtcbiAgY29uc3QgREFUQV9BUElfS0VZID0gJy5kYXRhLWFwaSc7XG4gIGNvbnN0IEVWRU5UX1NIT1cgPSBgc2hvdyR7RVZFTlRfS0VZfWA7XG4gIGNvbnN0IEVWRU5UX1NIT1dOID0gYHNob3duJHtFVkVOVF9LRVl9YDtcbiAgY29uc3QgRVZFTlRfSElERSA9IGBoaWRlJHtFVkVOVF9LRVl9YDtcbiAgY29uc3QgRVZFTlRfSElEREVOID0gYGhpZGRlbiR7RVZFTlRfS0VZfWA7XG4gIGNvbnN0IEVWRU5UX0NMSUNLX0RBVEFfQVBJID0gYGNsaWNrJHtFVkVOVF9LRVl9JHtEQVRBX0FQSV9LRVl9YDtcbiAgY29uc3QgQ0xBU1NfTkFNRV9TSE9XID0gJ3Nob3cnO1xuICBjb25zdCBDTEFTU19OQU1FX0NPTExBUFNFID0gJ2NvbGxhcHNlJztcbiAgY29uc3QgQ0xBU1NfTkFNRV9DT0xMQVBTSU5HID0gJ2NvbGxhcHNpbmcnO1xuICBjb25zdCBDTEFTU19OQU1FX0NPTExBUFNFRCA9ICdjb2xsYXBzZWQnO1xuICBjb25zdCBDTEFTU19OQU1FX0RFRVBFUl9DSElMRFJFTiA9IGA6c2NvcGUgLiR7Q0xBU1NfTkFNRV9DT0xMQVBTRX0gLiR7Q0xBU1NfTkFNRV9DT0xMQVBTRX1gO1xuICBjb25zdCBDTEFTU19OQU1FX0hPUklaT05UQUwgPSAnY29sbGFwc2UtaG9yaXpvbnRhbCc7XG4gIGNvbnN0IFdJRFRIID0gJ3dpZHRoJztcbiAgY29uc3QgSEVJR0hUID0gJ2hlaWdodCc7XG4gIGNvbnN0IFNFTEVDVE9SX0FDVElWRVMgPSAnLmNvbGxhcHNlLnNob3csIC5jb2xsYXBzZS5jb2xsYXBzaW5nJztcbiAgY29uc3QgU0VMRUNUT1JfREFUQV9UT0dHTEUgPSAnW2RhdGEtYnMtdG9nZ2xlPVwiY29sbGFwc2VcIl0nO1xuICBjb25zdCBEZWZhdWx0ID0ge1xuICAgIHBhcmVudDogbnVsbCxcbiAgICB0b2dnbGU6IHRydWVcbiAgfTtcbiAgY29uc3QgRGVmYXVsdFR5cGUgPSB7XG4gICAgcGFyZW50OiAnKG51bGx8ZWxlbWVudCknLFxuICAgIHRvZ2dsZTogJ2Jvb2xlYW4nXG4gIH07XG4gIC8qKlxuICAgKiBDbGFzcyBkZWZpbml0aW9uXG4gICAqL1xuXG4gIGNsYXNzIENvbGxhcHNlIGV4dGVuZHMgQmFzZUNvbXBvbmVudF9fZGVmYXVsdC5kZWZhdWx0IHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50LCBjb25maWcpIHtcbiAgICAgIHN1cGVyKGVsZW1lbnQsIGNvbmZpZyk7XG4gICAgICB0aGlzLl9pc1RyYW5zaXRpb25pbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMuX3RyaWdnZXJBcnJheSA9IFtdO1xuICAgICAgY29uc3QgdG9nZ2xlTGlzdCA9IFNlbGVjdG9yRW5naW5lX19kZWZhdWx0LmRlZmF1bHQuZmluZChTRUxFQ1RPUl9EQVRBX1RPR0dMRSk7XG5cbiAgICAgIGZvciAoY29uc3QgZWxlbSBvZiB0b2dnbGVMaXN0KSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdG9yID0gaW5kZXguZ2V0U2VsZWN0b3JGcm9tRWxlbWVudChlbGVtKTtcbiAgICAgICAgY29uc3QgZmlsdGVyRWxlbWVudCA9IFNlbGVjdG9yRW5naW5lX19kZWZhdWx0LmRlZmF1bHQuZmluZChzZWxlY3RvcikuZmlsdGVyKGZvdW5kRWxlbWVudCA9PiBmb3VuZEVsZW1lbnQgPT09IHRoaXMuX2VsZW1lbnQpO1xuXG4gICAgICAgIGlmIChzZWxlY3RvciAhPT0gbnVsbCAmJiBmaWx0ZXJFbGVtZW50Lmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuX3RyaWdnZXJBcnJheS5wdXNoKGVsZW0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2luaXRpYWxpemVDaGlsZHJlbigpO1xuXG4gICAgICBpZiAoIXRoaXMuX2NvbmZpZy5wYXJlbnQpIHtcbiAgICAgICAgdGhpcy5fYWRkQXJpYUFuZENvbGxhcHNlZENsYXNzKHRoaXMuX3RyaWdnZXJBcnJheSwgdGhpcy5faXNTaG93bigpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX2NvbmZpZy50b2dnbGUpIHtcbiAgICAgICAgdGhpcy50b2dnbGUoKTtcbiAgICAgIH1cbiAgICB9IC8vIEdldHRlcnNcblxuXG4gICAgc3RhdGljIGdldCBEZWZhdWx0KCkge1xuICAgICAgcmV0dXJuIERlZmF1bHQ7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBEZWZhdWx0VHlwZSgpIHtcbiAgICAgIHJldHVybiBEZWZhdWx0VHlwZTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IE5BTUUoKSB7XG4gICAgICByZXR1cm4gTkFNRTtcbiAgICB9IC8vIFB1YmxpY1xuXG5cbiAgICB0b2dnbGUoKSB7XG4gICAgICBpZiAodGhpcy5faXNTaG93bigpKSB7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc2hvdygpIHtcbiAgICAgIGlmICh0aGlzLl9pc1RyYW5zaXRpb25pbmcgfHwgdGhpcy5faXNTaG93bigpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgbGV0IGFjdGl2ZUNoaWxkcmVuID0gW107IC8vIGZpbmQgYWN0aXZlIGNoaWxkcmVuXG5cbiAgICAgIGlmICh0aGlzLl9jb25maWcucGFyZW50KSB7XG4gICAgICAgIGFjdGl2ZUNoaWxkcmVuID0gdGhpcy5fZ2V0Rmlyc3RMZXZlbENoaWxkcmVuKFNFTEVDVE9SX0FDVElWRVMpLmZpbHRlcihlbGVtZW50ID0+IGVsZW1lbnQgIT09IHRoaXMuX2VsZW1lbnQpLm1hcChlbGVtZW50ID0+IENvbGxhcHNlLmdldE9yQ3JlYXRlSW5zdGFuY2UoZWxlbWVudCwge1xuICAgICAgICAgIHRvZ2dsZTogZmFsc2VcbiAgICAgICAgfSkpO1xuICAgICAgfVxuXG4gICAgICBpZiAoYWN0aXZlQ2hpbGRyZW4ubGVuZ3RoICYmIGFjdGl2ZUNoaWxkcmVuWzBdLl9pc1RyYW5zaXRpb25pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzdGFydEV2ZW50ID0gRXZlbnRIYW5kbGVyX19kZWZhdWx0LmRlZmF1bHQudHJpZ2dlcih0aGlzLl9lbGVtZW50LCBFVkVOVF9TSE9XKTtcblxuICAgICAgaWYgKHN0YXJ0RXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGZvciAoY29uc3QgYWN0aXZlSW5zdGFuY2Ugb2YgYWN0aXZlQ2hpbGRyZW4pIHtcbiAgICAgICAgYWN0aXZlSW5zdGFuY2UuaGlkZSgpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkaW1lbnNpb24gPSB0aGlzLl9nZXREaW1lbnNpb24oKTtcblxuICAgICAgdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKENMQVNTX05BTUVfQ09MTEFQU0UpO1xuXG4gICAgICB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5hZGQoQ0xBU1NfTkFNRV9DT0xMQVBTSU5HKTtcblxuICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZVtkaW1lbnNpb25dID0gMDtcblxuICAgICAgdGhpcy5fYWRkQXJpYUFuZENvbGxhcHNlZENsYXNzKHRoaXMuX3RyaWdnZXJBcnJheSwgdHJ1ZSk7XG5cbiAgICAgIHRoaXMuX2lzVHJhbnNpdGlvbmluZyA9IHRydWU7XG5cbiAgICAgIGNvbnN0IGNvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgICB0aGlzLl9pc1RyYW5zaXRpb25pbmcgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoQ0xBU1NfTkFNRV9DT0xMQVBTSU5HKTtcblxuICAgICAgICB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5hZGQoQ0xBU1NfTkFNRV9DT0xMQVBTRSwgQ0xBU1NfTkFNRV9TSE9XKTtcblxuICAgICAgICB0aGlzLl9lbGVtZW50LnN0eWxlW2RpbWVuc2lvbl0gPSAnJztcbiAgICAgICAgRXZlbnRIYW5kbGVyX19kZWZhdWx0LmRlZmF1bHQudHJpZ2dlcih0aGlzLl9lbGVtZW50LCBFVkVOVF9TSE9XTik7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBjYXBpdGFsaXplZERpbWVuc2lvbiA9IGRpbWVuc2lvblswXS50b1VwcGVyQ2FzZSgpICsgZGltZW5zaW9uLnNsaWNlKDEpO1xuICAgICAgY29uc3Qgc2Nyb2xsU2l6ZSA9IGBzY3JvbGwke2NhcGl0YWxpemVkRGltZW5zaW9ufWA7XG5cbiAgICAgIHRoaXMuX3F1ZXVlQ2FsbGJhY2soY29tcGxldGUsIHRoaXMuX2VsZW1lbnQsIHRydWUpO1xuXG4gICAgICB0aGlzLl9lbGVtZW50LnN0eWxlW2RpbWVuc2lvbl0gPSBgJHt0aGlzLl9lbGVtZW50W3Njcm9sbFNpemVdfXB4YDtcbiAgICB9XG5cbiAgICBoaWRlKCkge1xuICAgICAgaWYgKHRoaXMuX2lzVHJhbnNpdGlvbmluZyB8fCAhdGhpcy5faXNTaG93bigpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc3RhcnRFdmVudCA9IEV2ZW50SGFuZGxlcl9fZGVmYXVsdC5kZWZhdWx0LnRyaWdnZXIodGhpcy5fZWxlbWVudCwgRVZFTlRfSElERSk7XG5cbiAgICAgIGlmIChzdGFydEV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkaW1lbnNpb24gPSB0aGlzLl9nZXREaW1lbnNpb24oKTtcblxuICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZVtkaW1lbnNpb25dID0gYCR7dGhpcy5fZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVtkaW1lbnNpb25dfXB4YDtcbiAgICAgIGluZGV4LnJlZmxvdyh0aGlzLl9lbGVtZW50KTtcblxuICAgICAgdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QuYWRkKENMQVNTX05BTUVfQ09MTEFQU0lORyk7XG5cbiAgICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShDTEFTU19OQU1FX0NPTExBUFNFLCBDTEFTU19OQU1FX1NIT1cpO1xuXG4gICAgICBmb3IgKGNvbnN0IHRyaWdnZXIgb2YgdGhpcy5fdHJpZ2dlckFycmF5KSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBpbmRleC5nZXRFbGVtZW50RnJvbVNlbGVjdG9yKHRyaWdnZXIpO1xuXG4gICAgICAgIGlmIChlbGVtZW50ICYmICF0aGlzLl9pc1Nob3duKGVsZW1lbnQpKSB7XG4gICAgICAgICAgdGhpcy5fYWRkQXJpYUFuZENvbGxhcHNlZENsYXNzKFt0cmlnZ2VyXSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2lzVHJhbnNpdGlvbmluZyA9IHRydWU7XG5cbiAgICAgIGNvbnN0IGNvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgICB0aGlzLl9pc1RyYW5zaXRpb25pbmcgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoQ0xBU1NfTkFNRV9DT0xMQVBTSU5HKTtcblxuICAgICAgICB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5hZGQoQ0xBU1NfTkFNRV9DT0xMQVBTRSk7XG5cbiAgICAgICAgRXZlbnRIYW5kbGVyX19kZWZhdWx0LmRlZmF1bHQudHJpZ2dlcih0aGlzLl9lbGVtZW50LCBFVkVOVF9ISURERU4pO1xuICAgICAgfTtcblxuICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZVtkaW1lbnNpb25dID0gJyc7XG5cbiAgICAgIHRoaXMuX3F1ZXVlQ2FsbGJhY2soY29tcGxldGUsIHRoaXMuX2VsZW1lbnQsIHRydWUpO1xuICAgIH1cblxuICAgIF9pc1Nob3duKGVsZW1lbnQgPSB0aGlzLl9lbGVtZW50KSB7XG4gICAgICByZXR1cm4gZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoQ0xBU1NfTkFNRV9TSE9XKTtcbiAgICB9IC8vIFByaXZhdGVcblxuXG4gICAgX2NvbmZpZ0FmdGVyTWVyZ2UoY29uZmlnKSB7XG4gICAgICBjb25maWcudG9nZ2xlID0gQm9vbGVhbihjb25maWcudG9nZ2xlKTsgLy8gQ29lcmNlIHN0cmluZyB2YWx1ZXNcblxuICAgICAgY29uZmlnLnBhcmVudCA9IGluZGV4LmdldEVsZW1lbnQoY29uZmlnLnBhcmVudCk7XG4gICAgICByZXR1cm4gY29uZmlnO1xuICAgIH1cblxuICAgIF9nZXREaW1lbnNpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoQ0xBU1NfTkFNRV9IT1JJWk9OVEFMKSA/IFdJRFRIIDogSEVJR0hUO1xuICAgIH1cblxuICAgIF9pbml0aWFsaXplQ2hpbGRyZW4oKSB7XG4gICAgICBpZiAoIXRoaXMuX2NvbmZpZy5wYXJlbnQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjaGlsZHJlbiA9IHRoaXMuX2dldEZpcnN0TGV2ZWxDaGlsZHJlbihTRUxFQ1RPUl9EQVRBX1RPR0dMRSk7XG5cbiAgICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiBjaGlsZHJlbikge1xuICAgICAgICBjb25zdCBzZWxlY3RlZCA9IGluZGV4LmdldEVsZW1lbnRGcm9tU2VsZWN0b3IoZWxlbWVudCk7XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgICAgdGhpcy5fYWRkQXJpYUFuZENvbGxhcHNlZENsYXNzKFtlbGVtZW50XSwgdGhpcy5faXNTaG93bihzZWxlY3RlZCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgX2dldEZpcnN0TGV2ZWxDaGlsZHJlbihzZWxlY3Rvcikge1xuICAgICAgY29uc3QgY2hpbGRyZW4gPSBTZWxlY3RvckVuZ2luZV9fZGVmYXVsdC5kZWZhdWx0LmZpbmQoQ0xBU1NfTkFNRV9ERUVQRVJfQ0hJTERSRU4sIHRoaXMuX2NvbmZpZy5wYXJlbnQpOyAvLyByZW1vdmUgY2hpbGRyZW4gaWYgZ3JlYXRlciBkZXB0aFxuXG4gICAgICByZXR1cm4gU2VsZWN0b3JFbmdpbmVfX2RlZmF1bHQuZGVmYXVsdC5maW5kKHNlbGVjdG9yLCB0aGlzLl9jb25maWcucGFyZW50KS5maWx0ZXIoZWxlbWVudCA9PiAhY2hpbGRyZW4uaW5jbHVkZXMoZWxlbWVudCkpO1xuICAgIH1cblxuICAgIF9hZGRBcmlhQW5kQ29sbGFwc2VkQ2xhc3ModHJpZ2dlckFycmF5LCBpc09wZW4pIHtcbiAgICAgIGlmICghdHJpZ2dlckFycmF5Lmxlbmd0aCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiB0cmlnZ2VyQXJyYXkpIHtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKENMQVNTX05BTUVfQ09MTEFQU0VELCAhaXNPcGVuKTtcbiAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCBpc09wZW4pO1xuICAgICAgfVxuICAgIH0gLy8gU3RhdGljXG5cblxuICAgIHN0YXRpYyBqUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgICBjb25zdCBfY29uZmlnID0ge307XG5cbiAgICAgIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJyAmJiAvc2hvd3xoaWRlLy50ZXN0KGNvbmZpZykpIHtcbiAgICAgICAgX2NvbmZpZy50b2dnbGUgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBDb2xsYXBzZS5nZXRPckNyZWF0ZUluc3RhbmNlKHRoaXMsIF9jb25maWcpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGlmICh0eXBlb2YgZGF0YVtjb25maWddID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgTm8gbWV0aG9kIG5hbWVkIFwiJHtjb25maWd9XCJgKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkYXRhW2NvbmZpZ10oKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gIH1cbiAgLyoqXG4gICAqIERhdGEgQVBJIGltcGxlbWVudGF0aW9uXG4gICAqL1xuXG5cbiAgRXZlbnRIYW5kbGVyX19kZWZhdWx0LmRlZmF1bHQub24oZG9jdW1lbnQsIEVWRU5UX0NMSUNLX0RBVEFfQVBJLCBTRUxFQ1RPUl9EQVRBX1RPR0dMRSwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgLy8gcHJldmVudERlZmF1bHQgb25seSBmb3IgPGE+IGVsZW1lbnRzICh3aGljaCBjaGFuZ2UgdGhlIFVSTCkgbm90IGluc2lkZSB0aGUgY29sbGFwc2libGUgZWxlbWVudFxuICAgIGlmIChldmVudC50YXJnZXQudGFnTmFtZSA9PT0gJ0EnIHx8IGV2ZW50LmRlbGVnYXRlVGFyZ2V0ICYmIGV2ZW50LmRlbGVnYXRlVGFyZ2V0LnRhZ05hbWUgPT09ICdBJykge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBjb25zdCBzZWxlY3RvciA9IGluZGV4LmdldFNlbGVjdG9yRnJvbUVsZW1lbnQodGhpcyk7XG4gICAgY29uc3Qgc2VsZWN0b3JFbGVtZW50cyA9IFNlbGVjdG9yRW5naW5lX19kZWZhdWx0LmRlZmF1bHQuZmluZChzZWxlY3Rvcik7XG5cbiAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2Ygc2VsZWN0b3JFbGVtZW50cykge1xuICAgICAgQ29sbGFwc2UuZ2V0T3JDcmVhdGVJbnN0YW5jZShlbGVtZW50LCB7XG4gICAgICAgIHRvZ2dsZTogZmFsc2VcbiAgICAgIH0pLnRvZ2dsZSgpO1xuICAgIH1cbiAgfSk7XG4gIC8qKlxuICAgKiBqUXVlcnlcbiAgICovXG5cbiAgaW5kZXguZGVmaW5lSlF1ZXJ5UGx1Z2luKENvbGxhcHNlKTtcblxuICByZXR1cm4gQ29sbGFwc2U7XG5cbn0pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbGxhcHNlLmpzLm1hcFxuIiwiLyohXG4gICogQm9vdHN0cmFwIGRhdGEuanMgdjUuMi4yIChodHRwczovL2dldGJvb3RzdHJhcC5jb20vKVxuICAqIENvcHlyaWdodCAyMDExLTIwMjIgVGhlIEJvb3RzdHJhcCBBdXRob3JzIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvZ3JhcGhzL2NvbnRyaWJ1dG9ycylcbiAgKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21haW4vTElDRU5TRSlcbiAgKi9cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpIDpcbiAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKGZhY3RvcnkpIDpcbiAgKGdsb2JhbCA9IHR5cGVvZiBnbG9iYWxUaGlzICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbFRoaXMgOiBnbG9iYWwgfHwgc2VsZiwgZ2xvYmFsLkRhdGEgPSBmYWN0b3J5KCkpO1xufSkodGhpcywgKGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBCb290c3RyYXAgKHY1LjIuMik6IGRvbS9kYXRhLmpzXG4gICAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFpbi9MSUNFTlNFKVxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cblxuICAvKipcbiAgICogQ29uc3RhbnRzXG4gICAqL1xuICBjb25zdCBlbGVtZW50TWFwID0gbmV3IE1hcCgpO1xuICBjb25zdCBkYXRhID0ge1xuICAgIHNldChlbGVtZW50LCBrZXksIGluc3RhbmNlKSB7XG4gICAgICBpZiAoIWVsZW1lbnRNYXAuaGFzKGVsZW1lbnQpKSB7XG4gICAgICAgIGVsZW1lbnRNYXAuc2V0KGVsZW1lbnQsIG5ldyBNYXAoKSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGluc3RhbmNlTWFwID0gZWxlbWVudE1hcC5nZXQoZWxlbWVudCk7IC8vIG1ha2UgaXQgY2xlYXIgd2Ugb25seSB3YW50IG9uZSBpbnN0YW5jZSBwZXIgZWxlbWVudFxuICAgICAgLy8gY2FuIGJlIHJlbW92ZWQgbGF0ZXIgd2hlbiBtdWx0aXBsZSBrZXkvaW5zdGFuY2VzIGFyZSBmaW5lIHRvIGJlIHVzZWRcblxuICAgICAgaWYgKCFpbnN0YW5jZU1hcC5oYXMoa2V5KSAmJiBpbnN0YW5jZU1hcC5zaXplICE9PSAwKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYEJvb3RzdHJhcCBkb2Vzbid0IGFsbG93IG1vcmUgdGhhbiBvbmUgaW5zdGFuY2UgcGVyIGVsZW1lbnQuIEJvdW5kIGluc3RhbmNlOiAke0FycmF5LmZyb20oaW5zdGFuY2VNYXAua2V5cygpKVswXX0uYCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaW5zdGFuY2VNYXAuc2V0KGtleSwgaW5zdGFuY2UpO1xuICAgIH0sXG5cbiAgICBnZXQoZWxlbWVudCwga2V5KSB7XG4gICAgICBpZiAoZWxlbWVudE1hcC5oYXMoZWxlbWVudCkpIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRNYXAuZ2V0KGVsZW1lbnQpLmdldChrZXkpIHx8IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG5cbiAgICByZW1vdmUoZWxlbWVudCwga2V5KSB7XG4gICAgICBpZiAoIWVsZW1lbnRNYXAuaGFzKGVsZW1lbnQpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgaW5zdGFuY2VNYXAgPSBlbGVtZW50TWFwLmdldChlbGVtZW50KTtcbiAgICAgIGluc3RhbmNlTWFwLmRlbGV0ZShrZXkpOyAvLyBmcmVlIHVwIGVsZW1lbnQgcmVmZXJlbmNlcyBpZiB0aGVyZSBhcmUgbm8gaW5zdGFuY2VzIGxlZnQgZm9yIGFuIGVsZW1lbnRcblxuICAgICAgaWYgKGluc3RhbmNlTWFwLnNpemUgPT09IDApIHtcbiAgICAgICAgZWxlbWVudE1hcC5kZWxldGUoZWxlbWVudCk7XG4gICAgICB9XG4gICAgfVxuXG4gIH07XG5cbiAgcmV0dXJuIGRhdGE7XG5cbn0pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGEuanMubWFwXG4iLCIvKiFcbiAgKiBCb290c3RyYXAgZXZlbnQtaGFuZGxlci5qcyB2NS4yLjIgKGh0dHBzOi8vZ2V0Ym9vdHN0cmFwLmNvbS8pXG4gICogQ29weXJpZ2h0IDIwMTEtMjAyMiBUaGUgQm9vdHN0cmFwIEF1dGhvcnMgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ncmFwaHMvY29udHJpYnV0b3JzKVxuICAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFpbi9MSUNFTlNFKVxuICAqL1xuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoJy4uL3V0aWwvaW5kZXgnKSkgOlxuICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoWycuLi91dGlsL2luZGV4J10sIGZhY3RvcnkpIDpcbiAgKGdsb2JhbCA9IHR5cGVvZiBnbG9iYWxUaGlzICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbFRoaXMgOiBnbG9iYWwgfHwgc2VsZiwgZ2xvYmFsLkV2ZW50SGFuZGxlciA9IGZhY3RvcnkoZ2xvYmFsLkluZGV4KSk7XG59KSh0aGlzLCAoZnVuY3Rpb24gKGluZGV4KSB7ICd1c2Ugc3RyaWN0JztcblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQm9vdHN0cmFwICh2NS4yLjIpOiBkb20vZXZlbnQtaGFuZGxlci5qc1xuICAgKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21haW4vTElDRU5TRSlcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG4gIC8qKlxuICAgKiBDb25zdGFudHNcbiAgICovXG5cbiAgY29uc3QgbmFtZXNwYWNlUmVnZXggPSAvW14uXSooPz1cXC4uKilcXC58LiovO1xuICBjb25zdCBzdHJpcE5hbWVSZWdleCA9IC9cXC4uKi87XG4gIGNvbnN0IHN0cmlwVWlkUmVnZXggPSAvOjpcXGQrJC87XG4gIGNvbnN0IGV2ZW50UmVnaXN0cnkgPSB7fTsgLy8gRXZlbnRzIHN0b3JhZ2VcblxuICBsZXQgdWlkRXZlbnQgPSAxO1xuICBjb25zdCBjdXN0b21FdmVudHMgPSB7XG4gICAgbW91c2VlbnRlcjogJ21vdXNlb3ZlcicsXG4gICAgbW91c2VsZWF2ZTogJ21vdXNlb3V0J1xuICB9O1xuICBjb25zdCBuYXRpdmVFdmVudHMgPSBuZXcgU2V0KFsnY2xpY2snLCAnZGJsY2xpY2snLCAnbW91c2V1cCcsICdtb3VzZWRvd24nLCAnY29udGV4dG1lbnUnLCAnbW91c2V3aGVlbCcsICdET01Nb3VzZVNjcm9sbCcsICdtb3VzZW92ZXInLCAnbW91c2VvdXQnLCAnbW91c2Vtb3ZlJywgJ3NlbGVjdHN0YXJ0JywgJ3NlbGVjdGVuZCcsICdrZXlkb3duJywgJ2tleXByZXNzJywgJ2tleXVwJywgJ29yaWVudGF0aW9uY2hhbmdlJywgJ3RvdWNoc3RhcnQnLCAndG91Y2htb3ZlJywgJ3RvdWNoZW5kJywgJ3RvdWNoY2FuY2VsJywgJ3BvaW50ZXJkb3duJywgJ3BvaW50ZXJtb3ZlJywgJ3BvaW50ZXJ1cCcsICdwb2ludGVybGVhdmUnLCAncG9pbnRlcmNhbmNlbCcsICdnZXN0dXJlc3RhcnQnLCAnZ2VzdHVyZWNoYW5nZScsICdnZXN0dXJlZW5kJywgJ2ZvY3VzJywgJ2JsdXInLCAnY2hhbmdlJywgJ3Jlc2V0JywgJ3NlbGVjdCcsICdzdWJtaXQnLCAnZm9jdXNpbicsICdmb2N1c291dCcsICdsb2FkJywgJ3VubG9hZCcsICdiZWZvcmV1bmxvYWQnLCAncmVzaXplJywgJ21vdmUnLCAnRE9NQ29udGVudExvYWRlZCcsICdyZWFkeXN0YXRlY2hhbmdlJywgJ2Vycm9yJywgJ2Fib3J0JywgJ3Njcm9sbCddKTtcbiAgLyoqXG4gICAqIFByaXZhdGUgbWV0aG9kc1xuICAgKi9cblxuICBmdW5jdGlvbiBtYWtlRXZlbnRVaWQoZWxlbWVudCwgdWlkKSB7XG4gICAgcmV0dXJuIHVpZCAmJiBgJHt1aWR9Ojoke3VpZEV2ZW50Kyt9YCB8fCBlbGVtZW50LnVpZEV2ZW50IHx8IHVpZEV2ZW50Kys7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRFbGVtZW50RXZlbnRzKGVsZW1lbnQpIHtcbiAgICBjb25zdCB1aWQgPSBtYWtlRXZlbnRVaWQoZWxlbWVudCk7XG4gICAgZWxlbWVudC51aWRFdmVudCA9IHVpZDtcbiAgICBldmVudFJlZ2lzdHJ5W3VpZF0gPSBldmVudFJlZ2lzdHJ5W3VpZF0gfHwge307XG4gICAgcmV0dXJuIGV2ZW50UmVnaXN0cnlbdWlkXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGJvb3RzdHJhcEhhbmRsZXIoZWxlbWVudCwgZm4pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaGFuZGxlcihldmVudCkge1xuICAgICAgaHlkcmF0ZU9iaihldmVudCwge1xuICAgICAgICBkZWxlZ2F0ZVRhcmdldDogZWxlbWVudFxuICAgICAgfSk7XG5cbiAgICAgIGlmIChoYW5kbGVyLm9uZU9mZikge1xuICAgICAgICBFdmVudEhhbmRsZXIub2ZmKGVsZW1lbnQsIGV2ZW50LnR5cGUsIGZuKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZuLmFwcGx5KGVsZW1lbnQsIFtldmVudF0pO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBib290c3RyYXBEZWxlZ2F0aW9uSGFuZGxlcihlbGVtZW50LCBzZWxlY3RvciwgZm4pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaGFuZGxlcihldmVudCkge1xuICAgICAgY29uc3QgZG9tRWxlbWVudHMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuXG4gICAgICBmb3IgKGxldCB7XG4gICAgICAgIHRhcmdldFxuICAgICAgfSA9IGV2ZW50OyB0YXJnZXQgJiYgdGFyZ2V0ICE9PSB0aGlzOyB0YXJnZXQgPSB0YXJnZXQucGFyZW50Tm9kZSkge1xuICAgICAgICBmb3IgKGNvbnN0IGRvbUVsZW1lbnQgb2YgZG9tRWxlbWVudHMpIHtcbiAgICAgICAgICBpZiAoZG9tRWxlbWVudCAhPT0gdGFyZ2V0KSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBoeWRyYXRlT2JqKGV2ZW50LCB7XG4gICAgICAgICAgICBkZWxlZ2F0ZVRhcmdldDogdGFyZ2V0XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZiAoaGFuZGxlci5vbmVPZmYpIHtcbiAgICAgICAgICAgIEV2ZW50SGFuZGxlci5vZmYoZWxlbWVudCwgZXZlbnQudHlwZSwgc2VsZWN0b3IsIGZuKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gZm4uYXBwbHkodGFyZ2V0LCBbZXZlbnRdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBmaW5kSGFuZGxlcihldmVudHMsIGNhbGxhYmxlLCBkZWxlZ2F0aW9uU2VsZWN0b3IgPSBudWxsKSB7XG4gICAgcmV0dXJuIE9iamVjdC52YWx1ZXMoZXZlbnRzKS5maW5kKGV2ZW50ID0+IGV2ZW50LmNhbGxhYmxlID09PSBjYWxsYWJsZSAmJiBldmVudC5kZWxlZ2F0aW9uU2VsZWN0b3IgPT09IGRlbGVnYXRpb25TZWxlY3Rvcik7XG4gIH1cblxuICBmdW5jdGlvbiBub3JtYWxpemVQYXJhbWV0ZXJzKG9yaWdpbmFsVHlwZUV2ZW50LCBoYW5kbGVyLCBkZWxlZ2F0aW9uRnVuY3Rpb24pIHtcbiAgICBjb25zdCBpc0RlbGVnYXRlZCA9IHR5cGVvZiBoYW5kbGVyID09PSAnc3RyaW5nJzsgLy8gdG9kbzogdG9vbHRpcCBwYXNzZXMgYGZhbHNlYCBpbnN0ZWFkIG9mIHNlbGVjdG9yLCBzbyB3ZSBuZWVkIHRvIGNoZWNrXG5cbiAgICBjb25zdCBjYWxsYWJsZSA9IGlzRGVsZWdhdGVkID8gZGVsZWdhdGlvbkZ1bmN0aW9uIDogaGFuZGxlciB8fCBkZWxlZ2F0aW9uRnVuY3Rpb247XG4gICAgbGV0IHR5cGVFdmVudCA9IGdldFR5cGVFdmVudChvcmlnaW5hbFR5cGVFdmVudCk7XG5cbiAgICBpZiAoIW5hdGl2ZUV2ZW50cy5oYXModHlwZUV2ZW50KSkge1xuICAgICAgdHlwZUV2ZW50ID0gb3JpZ2luYWxUeXBlRXZlbnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtpc0RlbGVnYXRlZCwgY2FsbGFibGUsIHR5cGVFdmVudF07XG4gIH1cblxuICBmdW5jdGlvbiBhZGRIYW5kbGVyKGVsZW1lbnQsIG9yaWdpbmFsVHlwZUV2ZW50LCBoYW5kbGVyLCBkZWxlZ2F0aW9uRnVuY3Rpb24sIG9uZU9mZikge1xuICAgIGlmICh0eXBlb2Ygb3JpZ2luYWxUeXBlRXZlbnQgIT09ICdzdHJpbmcnIHx8ICFlbGVtZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IFtpc0RlbGVnYXRlZCwgY2FsbGFibGUsIHR5cGVFdmVudF0gPSBub3JtYWxpemVQYXJhbWV0ZXJzKG9yaWdpbmFsVHlwZUV2ZW50LCBoYW5kbGVyLCBkZWxlZ2F0aW9uRnVuY3Rpb24pOyAvLyBpbiBjYXNlIG9mIG1vdXNlZW50ZXIgb3IgbW91c2VsZWF2ZSB3cmFwIHRoZSBoYW5kbGVyIHdpdGhpbiBhIGZ1bmN0aW9uIHRoYXQgY2hlY2tzIGZvciBpdHMgRE9NIHBvc2l0aW9uXG4gICAgLy8gdGhpcyBwcmV2ZW50cyB0aGUgaGFuZGxlciBmcm9tIGJlaW5nIGRpc3BhdGNoZWQgdGhlIHNhbWUgd2F5IGFzIG1vdXNlb3ZlciBvciBtb3VzZW91dCBkb2VzXG5cbiAgICBpZiAob3JpZ2luYWxUeXBlRXZlbnQgaW4gY3VzdG9tRXZlbnRzKSB7XG4gICAgICBjb25zdCB3cmFwRnVuY3Rpb24gPSBmbiA9PiB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICBpZiAoIWV2ZW50LnJlbGF0ZWRUYXJnZXQgfHwgZXZlbnQucmVsYXRlZFRhcmdldCAhPT0gZXZlbnQuZGVsZWdhdGVUYXJnZXQgJiYgIWV2ZW50LmRlbGVnYXRlVGFyZ2V0LmNvbnRhaW5zKGV2ZW50LnJlbGF0ZWRUYXJnZXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gZm4uY2FsbCh0aGlzLCBldmVudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfTtcblxuICAgICAgY2FsbGFibGUgPSB3cmFwRnVuY3Rpb24oY2FsbGFibGUpO1xuICAgIH1cblxuICAgIGNvbnN0IGV2ZW50cyA9IGdldEVsZW1lbnRFdmVudHMoZWxlbWVudCk7XG4gICAgY29uc3QgaGFuZGxlcnMgPSBldmVudHNbdHlwZUV2ZW50XSB8fCAoZXZlbnRzW3R5cGVFdmVudF0gPSB7fSk7XG4gICAgY29uc3QgcHJldmlvdXNGdW5jdGlvbiA9IGZpbmRIYW5kbGVyKGhhbmRsZXJzLCBjYWxsYWJsZSwgaXNEZWxlZ2F0ZWQgPyBoYW5kbGVyIDogbnVsbCk7XG5cbiAgICBpZiAocHJldmlvdXNGdW5jdGlvbikge1xuICAgICAgcHJldmlvdXNGdW5jdGlvbi5vbmVPZmYgPSBwcmV2aW91c0Z1bmN0aW9uLm9uZU9mZiAmJiBvbmVPZmY7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdWlkID0gbWFrZUV2ZW50VWlkKGNhbGxhYmxlLCBvcmlnaW5hbFR5cGVFdmVudC5yZXBsYWNlKG5hbWVzcGFjZVJlZ2V4LCAnJykpO1xuICAgIGNvbnN0IGZuID0gaXNEZWxlZ2F0ZWQgPyBib290c3RyYXBEZWxlZ2F0aW9uSGFuZGxlcihlbGVtZW50LCBoYW5kbGVyLCBjYWxsYWJsZSkgOiBib290c3RyYXBIYW5kbGVyKGVsZW1lbnQsIGNhbGxhYmxlKTtcbiAgICBmbi5kZWxlZ2F0aW9uU2VsZWN0b3IgPSBpc0RlbGVnYXRlZCA/IGhhbmRsZXIgOiBudWxsO1xuICAgIGZuLmNhbGxhYmxlID0gY2FsbGFibGU7XG4gICAgZm4ub25lT2ZmID0gb25lT2ZmO1xuICAgIGZuLnVpZEV2ZW50ID0gdWlkO1xuICAgIGhhbmRsZXJzW3VpZF0gPSBmbjtcbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIodHlwZUV2ZW50LCBmbiwgaXNEZWxlZ2F0ZWQpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlSGFuZGxlcihlbGVtZW50LCBldmVudHMsIHR5cGVFdmVudCwgaGFuZGxlciwgZGVsZWdhdGlvblNlbGVjdG9yKSB7XG4gICAgY29uc3QgZm4gPSBmaW5kSGFuZGxlcihldmVudHNbdHlwZUV2ZW50XSwgaGFuZGxlciwgZGVsZWdhdGlvblNlbGVjdG9yKTtcblxuICAgIGlmICghZm4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZUV2ZW50LCBmbiwgQm9vbGVhbihkZWxlZ2F0aW9uU2VsZWN0b3IpKTtcbiAgICBkZWxldGUgZXZlbnRzW3R5cGVFdmVudF1bZm4udWlkRXZlbnRdO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlTmFtZXNwYWNlZEhhbmRsZXJzKGVsZW1lbnQsIGV2ZW50cywgdHlwZUV2ZW50LCBuYW1lc3BhY2UpIHtcbiAgICBjb25zdCBzdG9yZUVsZW1lbnRFdmVudCA9IGV2ZW50c1t0eXBlRXZlbnRdIHx8IHt9O1xuXG4gICAgZm9yIChjb25zdCBoYW5kbGVyS2V5IG9mIE9iamVjdC5rZXlzKHN0b3JlRWxlbWVudEV2ZW50KSkge1xuICAgICAgaWYgKGhhbmRsZXJLZXkuaW5jbHVkZXMobmFtZXNwYWNlKSkge1xuICAgICAgICBjb25zdCBldmVudCA9IHN0b3JlRWxlbWVudEV2ZW50W2hhbmRsZXJLZXldO1xuICAgICAgICByZW1vdmVIYW5kbGVyKGVsZW1lbnQsIGV2ZW50cywgdHlwZUV2ZW50LCBldmVudC5jYWxsYWJsZSwgZXZlbnQuZGVsZWdhdGlvblNlbGVjdG9yKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRUeXBlRXZlbnQoZXZlbnQpIHtcbiAgICAvLyBhbGxvdyB0byBnZXQgdGhlIG5hdGl2ZSBldmVudHMgZnJvbSBuYW1lc3BhY2VkIGV2ZW50cyAoJ2NsaWNrLmJzLmJ1dHRvbicgLS0+ICdjbGljaycpXG4gICAgZXZlbnQgPSBldmVudC5yZXBsYWNlKHN0cmlwTmFtZVJlZ2V4LCAnJyk7XG4gICAgcmV0dXJuIGN1c3RvbUV2ZW50c1tldmVudF0gfHwgZXZlbnQ7XG4gIH1cblxuICBjb25zdCBFdmVudEhhbmRsZXIgPSB7XG4gICAgb24oZWxlbWVudCwgZXZlbnQsIGhhbmRsZXIsIGRlbGVnYXRpb25GdW5jdGlvbikge1xuICAgICAgYWRkSGFuZGxlcihlbGVtZW50LCBldmVudCwgaGFuZGxlciwgZGVsZWdhdGlvbkZ1bmN0aW9uLCBmYWxzZSk7XG4gICAgfSxcblxuICAgIG9uZShlbGVtZW50LCBldmVudCwgaGFuZGxlciwgZGVsZWdhdGlvbkZ1bmN0aW9uKSB7XG4gICAgICBhZGRIYW5kbGVyKGVsZW1lbnQsIGV2ZW50LCBoYW5kbGVyLCBkZWxlZ2F0aW9uRnVuY3Rpb24sIHRydWUpO1xuICAgIH0sXG5cbiAgICBvZmYoZWxlbWVudCwgb3JpZ2luYWxUeXBlRXZlbnQsIGhhbmRsZXIsIGRlbGVnYXRpb25GdW5jdGlvbikge1xuICAgICAgaWYgKHR5cGVvZiBvcmlnaW5hbFR5cGVFdmVudCAhPT0gJ3N0cmluZycgfHwgIWVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBbaXNEZWxlZ2F0ZWQsIGNhbGxhYmxlLCB0eXBlRXZlbnRdID0gbm9ybWFsaXplUGFyYW1ldGVycyhvcmlnaW5hbFR5cGVFdmVudCwgaGFuZGxlciwgZGVsZWdhdGlvbkZ1bmN0aW9uKTtcbiAgICAgIGNvbnN0IGluTmFtZXNwYWNlID0gdHlwZUV2ZW50ICE9PSBvcmlnaW5hbFR5cGVFdmVudDtcbiAgICAgIGNvbnN0IGV2ZW50cyA9IGdldEVsZW1lbnRFdmVudHMoZWxlbWVudCk7XG4gICAgICBjb25zdCBzdG9yZUVsZW1lbnRFdmVudCA9IGV2ZW50c1t0eXBlRXZlbnRdIHx8IHt9O1xuICAgICAgY29uc3QgaXNOYW1lc3BhY2UgPSBvcmlnaW5hbFR5cGVFdmVudC5zdGFydHNXaXRoKCcuJyk7XG5cbiAgICAgIGlmICh0eXBlb2YgY2FsbGFibGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIC8vIFNpbXBsZXN0IGNhc2U6IGhhbmRsZXIgaXMgcGFzc2VkLCByZW1vdmUgdGhhdCBsaXN0ZW5lciBPTkxZLlxuICAgICAgICBpZiAoIU9iamVjdC5rZXlzKHN0b3JlRWxlbWVudEV2ZW50KS5sZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVIYW5kbGVyKGVsZW1lbnQsIGV2ZW50cywgdHlwZUV2ZW50LCBjYWxsYWJsZSwgaXNEZWxlZ2F0ZWQgPyBoYW5kbGVyIDogbnVsbCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzTmFtZXNwYWNlKSB7XG4gICAgICAgIGZvciAoY29uc3QgZWxlbWVudEV2ZW50IG9mIE9iamVjdC5rZXlzKGV2ZW50cykpIHtcbiAgICAgICAgICByZW1vdmVOYW1lc3BhY2VkSGFuZGxlcnMoZWxlbWVudCwgZXZlbnRzLCBlbGVtZW50RXZlbnQsIG9yaWdpbmFsVHlwZUV2ZW50LnNsaWNlKDEpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IgKGNvbnN0IGtleUhhbmRsZXJzIG9mIE9iamVjdC5rZXlzKHN0b3JlRWxlbWVudEV2ZW50KSkge1xuICAgICAgICBjb25zdCBoYW5kbGVyS2V5ID0ga2V5SGFuZGxlcnMucmVwbGFjZShzdHJpcFVpZFJlZ2V4LCAnJyk7XG5cbiAgICAgICAgaWYgKCFpbk5hbWVzcGFjZSB8fCBvcmlnaW5hbFR5cGVFdmVudC5pbmNsdWRlcyhoYW5kbGVyS2V5KSkge1xuICAgICAgICAgIGNvbnN0IGV2ZW50ID0gc3RvcmVFbGVtZW50RXZlbnRba2V5SGFuZGxlcnNdO1xuICAgICAgICAgIHJlbW92ZUhhbmRsZXIoZWxlbWVudCwgZXZlbnRzLCB0eXBlRXZlbnQsIGV2ZW50LmNhbGxhYmxlLCBldmVudC5kZWxlZ2F0aW9uU2VsZWN0b3IpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHRyaWdnZXIoZWxlbWVudCwgZXZlbnQsIGFyZ3MpIHtcbiAgICAgIGlmICh0eXBlb2YgZXZlbnQgIT09ICdzdHJpbmcnIHx8ICFlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICBjb25zdCAkID0gaW5kZXguZ2V0alF1ZXJ5KCk7XG4gICAgICBjb25zdCB0eXBlRXZlbnQgPSBnZXRUeXBlRXZlbnQoZXZlbnQpO1xuICAgICAgY29uc3QgaW5OYW1lc3BhY2UgPSBldmVudCAhPT0gdHlwZUV2ZW50O1xuICAgICAgbGV0IGpRdWVyeUV2ZW50ID0gbnVsbDtcbiAgICAgIGxldCBidWJibGVzID0gdHJ1ZTtcbiAgICAgIGxldCBuYXRpdmVEaXNwYXRjaCA9IHRydWU7XG4gICAgICBsZXQgZGVmYXVsdFByZXZlbnRlZCA9IGZhbHNlO1xuXG4gICAgICBpZiAoaW5OYW1lc3BhY2UgJiYgJCkge1xuICAgICAgICBqUXVlcnlFdmVudCA9ICQuRXZlbnQoZXZlbnQsIGFyZ3MpO1xuICAgICAgICAkKGVsZW1lbnQpLnRyaWdnZXIoalF1ZXJ5RXZlbnQpO1xuICAgICAgICBidWJibGVzID0gIWpRdWVyeUV2ZW50LmlzUHJvcGFnYXRpb25TdG9wcGVkKCk7XG4gICAgICAgIG5hdGl2ZURpc3BhdGNoID0gIWpRdWVyeUV2ZW50LmlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkKCk7XG4gICAgICAgIGRlZmF1bHRQcmV2ZW50ZWQgPSBqUXVlcnlFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKTtcbiAgICAgIH1cblxuICAgICAgbGV0IGV2dCA9IG5ldyBFdmVudChldmVudCwge1xuICAgICAgICBidWJibGVzLFxuICAgICAgICBjYW5jZWxhYmxlOiB0cnVlXG4gICAgICB9KTtcbiAgICAgIGV2dCA9IGh5ZHJhdGVPYmooZXZ0LCBhcmdzKTtcblxuICAgICAgaWYgKGRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChuYXRpdmVEaXNwYXRjaCkge1xuICAgICAgICBlbGVtZW50LmRpc3BhdGNoRXZlbnQoZXZ0KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGV2dC5kZWZhdWx0UHJldmVudGVkICYmIGpRdWVyeUV2ZW50KSB7XG4gICAgICAgIGpRdWVyeUV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBldnQ7XG4gICAgfVxuXG4gIH07XG5cbiAgZnVuY3Rpb24gaHlkcmF0ZU9iaihvYmosIG1ldGEpIHtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhtZXRhIHx8IHt9KSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgICAgIH0gY2F0Y2ggKF91bnVzZWQpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuXG4gICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgIH1cblxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgcmV0dXJuIEV2ZW50SGFuZGxlcjtcblxufSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXZlbnQtaGFuZGxlci5qcy5tYXBcbiIsIi8qIVxuICAqIEJvb3RzdHJhcCBtYW5pcHVsYXRvci5qcyB2NS4yLjIgKGh0dHBzOi8vZ2V0Ym9vdHN0cmFwLmNvbS8pXG4gICogQ29weXJpZ2h0IDIwMTEtMjAyMiBUaGUgQm9vdHN0cmFwIEF1dGhvcnMgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ncmFwaHMvY29udHJpYnV0b3JzKVxuICAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFpbi9MSUNFTlNFKVxuICAqL1xuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuICAoZ2xvYmFsID0gdHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsVGhpcyA6IGdsb2JhbCB8fCBzZWxmLCBnbG9iYWwuTWFuaXB1bGF0b3IgPSBmYWN0b3J5KCkpO1xufSkodGhpcywgKGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBCb290c3RyYXAgKHY1LjIuMik6IGRvbS9tYW5pcHVsYXRvci5qc1xuICAgKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21haW4vTElDRU5TRSlcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZURhdGEodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT09ICd0cnVlJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHZhbHVlID09PSAnZmFsc2UnKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHZhbHVlID09PSBOdW1iZXIodmFsdWUpLnRvU3RyaW5nKCkpIHtcbiAgICAgIHJldHVybiBOdW1iZXIodmFsdWUpO1xuICAgIH1cblxuICAgIGlmICh2YWx1ZSA9PT0gJycgfHwgdmFsdWUgPT09ICdudWxsJykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIEpTT04ucGFyc2UoZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlKSk7XG4gICAgfSBjYXRjaCAoX3VudXNlZCkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZURhdGFLZXkoa2V5KSB7XG4gICAgcmV0dXJuIGtleS5yZXBsYWNlKC9bQS1aXS9nLCBjaHIgPT4gYC0ke2Noci50b0xvd2VyQ2FzZSgpfWApO1xuICB9XG5cbiAgY29uc3QgTWFuaXB1bGF0b3IgPSB7XG4gICAgc2V0RGF0YUF0dHJpYnV0ZShlbGVtZW50LCBrZXksIHZhbHVlKSB7XG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShgZGF0YS1icy0ke25vcm1hbGl6ZURhdGFLZXkoa2V5KX1gLCB2YWx1ZSk7XG4gICAgfSxcblxuICAgIHJlbW92ZURhdGFBdHRyaWJ1dGUoZWxlbWVudCwga2V5KSB7XG4gICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShgZGF0YS1icy0ke25vcm1hbGl6ZURhdGFLZXkoa2V5KX1gKTtcbiAgICB9LFxuXG4gICAgZ2V0RGF0YUF0dHJpYnV0ZXMoZWxlbWVudCkge1xuICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiB7fTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYXR0cmlidXRlcyA9IHt9O1xuICAgICAgY29uc3QgYnNLZXlzID0gT2JqZWN0LmtleXMoZWxlbWVudC5kYXRhc2V0KS5maWx0ZXIoa2V5ID0+IGtleS5zdGFydHNXaXRoKCdicycpICYmICFrZXkuc3RhcnRzV2l0aCgnYnNDb25maWcnKSk7XG5cbiAgICAgIGZvciAoY29uc3Qga2V5IG9mIGJzS2V5cykge1xuICAgICAgICBsZXQgcHVyZUtleSA9IGtleS5yZXBsYWNlKC9eYnMvLCAnJyk7XG4gICAgICAgIHB1cmVLZXkgPSBwdXJlS2V5LmNoYXJBdCgwKS50b0xvd2VyQ2FzZSgpICsgcHVyZUtleS5zbGljZSgxLCBwdXJlS2V5Lmxlbmd0aCk7XG4gICAgICAgIGF0dHJpYnV0ZXNbcHVyZUtleV0gPSBub3JtYWxpemVEYXRhKGVsZW1lbnQuZGF0YXNldFtrZXldKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGF0dHJpYnV0ZXM7XG4gICAgfSxcblxuICAgIGdldERhdGFBdHRyaWJ1dGUoZWxlbWVudCwga2V5KSB7XG4gICAgICByZXR1cm4gbm9ybWFsaXplRGF0YShlbGVtZW50LmdldEF0dHJpYnV0ZShgZGF0YS1icy0ke25vcm1hbGl6ZURhdGFLZXkoa2V5KX1gKSk7XG4gICAgfVxuXG4gIH07XG5cbiAgcmV0dXJuIE1hbmlwdWxhdG9yO1xuXG59KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYW5pcHVsYXRvci5qcy5tYXBcbiIsIi8qIVxuICAqIEJvb3RzdHJhcCBzZWxlY3Rvci1lbmdpbmUuanMgdjUuMi4yIChodHRwczovL2dldGJvb3RzdHJhcC5jb20vKVxuICAqIENvcHlyaWdodCAyMDExLTIwMjIgVGhlIEJvb3RzdHJhcCBBdXRob3JzIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvZ3JhcGhzL2NvbnRyaWJ1dG9ycylcbiAgKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21haW4vTElDRU5TRSlcbiAgKi9cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKCcuLi91dGlsL2luZGV4JykpIDpcbiAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKFsnLi4vdXRpbC9pbmRleCddLCBmYWN0b3J5KSA6XG4gIChnbG9iYWwgPSB0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWxUaGlzIDogZ2xvYmFsIHx8IHNlbGYsIGdsb2JhbC5TZWxlY3RvckVuZ2luZSA9IGZhY3RvcnkoZ2xvYmFsLkluZGV4KSk7XG59KSh0aGlzLCAoZnVuY3Rpb24gKGluZGV4KSB7ICd1c2Ugc3RyaWN0JztcblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQm9vdHN0cmFwICh2NS4yLjIpOiBkb20vc2VsZWN0b3ItZW5naW5lLmpzXG4gICAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFpbi9MSUNFTlNFKVxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cbiAgLyoqXG4gICAqIENvbnN0YW50c1xuICAgKi9cblxuICBjb25zdCBTZWxlY3RvckVuZ2luZSA9IHtcbiAgICBmaW5kKHNlbGVjdG9yLCBlbGVtZW50ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgICByZXR1cm4gW10uY29uY2F0KC4uLkVsZW1lbnQucHJvdG90eXBlLnF1ZXJ5U2VsZWN0b3JBbGwuY2FsbChlbGVtZW50LCBzZWxlY3RvcikpO1xuICAgIH0sXG5cbiAgICBmaW5kT25lKHNlbGVjdG9yLCBlbGVtZW50ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgICByZXR1cm4gRWxlbWVudC5wcm90b3R5cGUucXVlcnlTZWxlY3Rvci5jYWxsKGVsZW1lbnQsIHNlbGVjdG9yKTtcbiAgICB9LFxuXG4gICAgY2hpbGRyZW4oZWxlbWVudCwgc2VsZWN0b3IpIHtcbiAgICAgIHJldHVybiBbXS5jb25jYXQoLi4uZWxlbWVudC5jaGlsZHJlbikuZmlsdGVyKGNoaWxkID0+IGNoaWxkLm1hdGNoZXMoc2VsZWN0b3IpKTtcbiAgICB9LFxuXG4gICAgcGFyZW50cyhlbGVtZW50LCBzZWxlY3Rvcikge1xuICAgICAgY29uc3QgcGFyZW50cyA9IFtdO1xuICAgICAgbGV0IGFuY2VzdG9yID0gZWxlbWVudC5wYXJlbnROb2RlLmNsb3Nlc3Qoc2VsZWN0b3IpO1xuXG4gICAgICB3aGlsZSAoYW5jZXN0b3IpIHtcbiAgICAgICAgcGFyZW50cy5wdXNoKGFuY2VzdG9yKTtcbiAgICAgICAgYW5jZXN0b3IgPSBhbmNlc3Rvci5wYXJlbnROb2RlLmNsb3Nlc3Qoc2VsZWN0b3IpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcGFyZW50cztcbiAgICB9LFxuXG4gICAgcHJldihlbGVtZW50LCBzZWxlY3Rvcikge1xuICAgICAgbGV0IHByZXZpb3VzID0gZWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuXG4gICAgICB3aGlsZSAocHJldmlvdXMpIHtcbiAgICAgICAgaWYgKHByZXZpb3VzLm1hdGNoZXMoc2VsZWN0b3IpKSB7XG4gICAgICAgICAgcmV0dXJuIFtwcmV2aW91c107XG4gICAgICAgIH1cblxuICAgICAgICBwcmV2aW91cyA9IHByZXZpb3VzLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBbXTtcbiAgICB9LFxuXG4gICAgLy8gVE9ETzogdGhpcyBpcyBub3cgdW51c2VkOyByZW1vdmUgbGF0ZXIgYWxvbmcgd2l0aCBwcmV2KClcbiAgICBuZXh0KGVsZW1lbnQsIHNlbGVjdG9yKSB7XG4gICAgICBsZXQgbmV4dCA9IGVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nO1xuXG4gICAgICB3aGlsZSAobmV4dCkge1xuICAgICAgICBpZiAobmV4dC5tYXRjaGVzKHNlbGVjdG9yKSkge1xuICAgICAgICAgIHJldHVybiBbbmV4dF07XG4gICAgICAgIH1cblxuICAgICAgICBuZXh0ID0gbmV4dC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBbXTtcbiAgICB9LFxuXG4gICAgZm9jdXNhYmxlQ2hpbGRyZW4oZWxlbWVudCkge1xuICAgICAgY29uc3QgZm9jdXNhYmxlcyA9IFsnYScsICdidXR0b24nLCAnaW5wdXQnLCAndGV4dGFyZWEnLCAnc2VsZWN0JywgJ2RldGFpbHMnLCAnW3RhYmluZGV4XScsICdbY29udGVudGVkaXRhYmxlPVwidHJ1ZVwiXSddLm1hcChzZWxlY3RvciA9PiBgJHtzZWxlY3Rvcn06bm90KFt0YWJpbmRleF49XCItXCJdKWApLmpvaW4oJywnKTtcbiAgICAgIHJldHVybiB0aGlzLmZpbmQoZm9jdXNhYmxlcywgZWxlbWVudCkuZmlsdGVyKGVsID0+ICFpbmRleC5pc0Rpc2FibGVkKGVsKSAmJiBpbmRleC5pc1Zpc2libGUoZWwpKTtcbiAgICB9XG5cbiAgfTtcblxuICByZXR1cm4gU2VsZWN0b3JFbmdpbmU7XG5cbn0pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNlbGVjdG9yLWVuZ2luZS5qcy5tYXBcbiIsIi8qIVxuICAqIEJvb3RzdHJhcCBkcm9wZG93bi5qcyB2NS4yLjIgKGh0dHBzOi8vZ2V0Ym9vdHN0cmFwLmNvbS8pXG4gICogQ29weXJpZ2h0IDIwMTEtMjAyMiBUaGUgQm9vdHN0cmFwIEF1dGhvcnMgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ncmFwaHMvY29udHJpYnV0b3JzKVxuICAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFpbi9MSUNFTlNFKVxuICAqL1xuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoJ0Bwb3BwZXJqcy9jb3JlJyksIHJlcXVpcmUoJy4vdXRpbC9pbmRleCcpLCByZXF1aXJlKCcuL2RvbS9ldmVudC1oYW5kbGVyJyksIHJlcXVpcmUoJy4vZG9tL21hbmlwdWxhdG9yJyksIHJlcXVpcmUoJy4vZG9tL3NlbGVjdG9yLWVuZ2luZScpLCByZXF1aXJlKCcuL2Jhc2UtY29tcG9uZW50JykpIDpcbiAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKFsnQHBvcHBlcmpzL2NvcmUnLCAnLi91dGlsL2luZGV4JywgJy4vZG9tL2V2ZW50LWhhbmRsZXInLCAnLi9kb20vbWFuaXB1bGF0b3InLCAnLi9kb20vc2VsZWN0b3ItZW5naW5lJywgJy4vYmFzZS1jb21wb25lbnQnXSwgZmFjdG9yeSkgOlxuICAoZ2xvYmFsID0gdHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsVGhpcyA6IGdsb2JhbCB8fCBzZWxmLCBnbG9iYWwuRHJvcGRvd24gPSBmYWN0b3J5KGdsb2JhbFtcIkBwb3BwZXJqcy9jb3JlXCJdLCBnbG9iYWwuSW5kZXgsIGdsb2JhbC5FdmVudEhhbmRsZXIsIGdsb2JhbC5NYW5pcHVsYXRvciwgZ2xvYmFsLlNlbGVjdG9yRW5naW5lLCBnbG9iYWwuQmFzZUNvbXBvbmVudCkpO1xufSkodGhpcywgKGZ1bmN0aW9uIChQb3BwZXIsIGluZGV4LCBFdmVudEhhbmRsZXIsIE1hbmlwdWxhdG9yLCBTZWxlY3RvckVuZ2luZSwgQmFzZUNvbXBvbmVudCkgeyAndXNlIHN0cmljdCc7XG5cbiAgY29uc3QgX2ludGVyb3BEZWZhdWx0TGVnYWN5ID0gZSA9PiBlICYmIHR5cGVvZiBlID09PSAnb2JqZWN0JyAmJiAnZGVmYXVsdCcgaW4gZSA/IGUgOiB7IGRlZmF1bHQ6IGUgfTtcblxuICBmdW5jdGlvbiBfaW50ZXJvcE5hbWVzcGFjZShlKSB7XG4gICAgaWYgKGUgJiYgZS5fX2VzTW9kdWxlKSByZXR1cm4gZTtcbiAgICBjb25zdCBuID0gT2JqZWN0LmNyZWF0ZShudWxsLCB7IFtTeW1ib2wudG9TdHJpbmdUYWddOiB7IHZhbHVlOiAnTW9kdWxlJyB9IH0pO1xuICAgIGlmIChlKSB7XG4gICAgICBmb3IgKGNvbnN0IGsgaW4gZSkge1xuICAgICAgICBpZiAoayAhPT0gJ2RlZmF1bHQnKSB7XG4gICAgICAgICAgY29uc3QgZCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZSwgayk7XG4gICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG4sIGssIGQuZ2V0ID8gZCA6IHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBnZXQ6ICgpID0+IGVba11cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBuLmRlZmF1bHQgPSBlO1xuICAgIHJldHVybiBPYmplY3QuZnJlZXplKG4pO1xuICB9XG5cbiAgY29uc3QgUG9wcGVyX19uYW1lc3BhY2UgPSAvKiNfX1BVUkVfXyovX2ludGVyb3BOYW1lc3BhY2UoUG9wcGVyKTtcbiAgY29uc3QgRXZlbnRIYW5kbGVyX19kZWZhdWx0ID0gLyojX19QVVJFX18qL19pbnRlcm9wRGVmYXVsdExlZ2FjeShFdmVudEhhbmRsZXIpO1xuICBjb25zdCBNYW5pcHVsYXRvcl9fZGVmYXVsdCA9IC8qI19fUFVSRV9fKi9faW50ZXJvcERlZmF1bHRMZWdhY3koTWFuaXB1bGF0b3IpO1xuICBjb25zdCBTZWxlY3RvckVuZ2luZV9fZGVmYXVsdCA9IC8qI19fUFVSRV9fKi9faW50ZXJvcERlZmF1bHRMZWdhY3koU2VsZWN0b3JFbmdpbmUpO1xuICBjb25zdCBCYXNlQ29tcG9uZW50X19kZWZhdWx0ID0gLyojX19QVVJFX18qL19pbnRlcm9wRGVmYXVsdExlZ2FjeShCYXNlQ29tcG9uZW50KTtcblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQm9vdHN0cmFwICh2NS4yLjIpOiBkcm9wZG93bi5qc1xuICAgKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21haW4vTElDRU5TRSlcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG4gIC8qKlxuICAgKiBDb25zdGFudHNcbiAgICovXG5cbiAgY29uc3QgTkFNRSA9ICdkcm9wZG93bic7XG4gIGNvbnN0IERBVEFfS0VZID0gJ2JzLmRyb3Bkb3duJztcbiAgY29uc3QgRVZFTlRfS0VZID0gYC4ke0RBVEFfS0VZfWA7XG4gIGNvbnN0IERBVEFfQVBJX0tFWSA9ICcuZGF0YS1hcGknO1xuICBjb25zdCBFU0NBUEVfS0VZID0gJ0VzY2FwZSc7XG4gIGNvbnN0IFRBQl9LRVkgPSAnVGFiJztcbiAgY29uc3QgQVJST1dfVVBfS0VZID0gJ0Fycm93VXAnO1xuICBjb25zdCBBUlJPV19ET1dOX0tFWSA9ICdBcnJvd0Rvd24nO1xuICBjb25zdCBSSUdIVF9NT1VTRV9CVVRUT04gPSAyOyAvLyBNb3VzZUV2ZW50LmJ1dHRvbiB2YWx1ZSBmb3IgdGhlIHNlY29uZGFyeSBidXR0b24sIHVzdWFsbHkgdGhlIHJpZ2h0IGJ1dHRvblxuXG4gIGNvbnN0IEVWRU5UX0hJREUgPSBgaGlkZSR7RVZFTlRfS0VZfWA7XG4gIGNvbnN0IEVWRU5UX0hJRERFTiA9IGBoaWRkZW4ke0VWRU5UX0tFWX1gO1xuICBjb25zdCBFVkVOVF9TSE9XID0gYHNob3cke0VWRU5UX0tFWX1gO1xuICBjb25zdCBFVkVOVF9TSE9XTiA9IGBzaG93biR7RVZFTlRfS0VZfWA7XG4gIGNvbnN0IEVWRU5UX0NMSUNLX0RBVEFfQVBJID0gYGNsaWNrJHtFVkVOVF9LRVl9JHtEQVRBX0FQSV9LRVl9YDtcbiAgY29uc3QgRVZFTlRfS0VZRE9XTl9EQVRBX0FQSSA9IGBrZXlkb3duJHtFVkVOVF9LRVl9JHtEQVRBX0FQSV9LRVl9YDtcbiAgY29uc3QgRVZFTlRfS0VZVVBfREFUQV9BUEkgPSBga2V5dXAke0VWRU5UX0tFWX0ke0RBVEFfQVBJX0tFWX1gO1xuICBjb25zdCBDTEFTU19OQU1FX1NIT1cgPSAnc2hvdyc7XG4gIGNvbnN0IENMQVNTX05BTUVfRFJPUFVQID0gJ2Ryb3B1cCc7XG4gIGNvbnN0IENMQVNTX05BTUVfRFJPUEVORCA9ICdkcm9wZW5kJztcbiAgY29uc3QgQ0xBU1NfTkFNRV9EUk9QU1RBUlQgPSAnZHJvcHN0YXJ0JztcbiAgY29uc3QgQ0xBU1NfTkFNRV9EUk9QVVBfQ0VOVEVSID0gJ2Ryb3B1cC1jZW50ZXInO1xuICBjb25zdCBDTEFTU19OQU1FX0RST1BET1dOX0NFTlRFUiA9ICdkcm9wZG93bi1jZW50ZXInO1xuICBjb25zdCBTRUxFQ1RPUl9EQVRBX1RPR0dMRSA9ICdbZGF0YS1icy10b2dnbGU9XCJkcm9wZG93blwiXTpub3QoLmRpc2FibGVkKTpub3QoOmRpc2FibGVkKSc7XG4gIGNvbnN0IFNFTEVDVE9SX0RBVEFfVE9HR0xFX1NIT1dOID0gYCR7U0VMRUNUT1JfREFUQV9UT0dHTEV9LiR7Q0xBU1NfTkFNRV9TSE9XfWA7XG4gIGNvbnN0IFNFTEVDVE9SX01FTlUgPSAnLmRyb3Bkb3duLW1lbnUnO1xuICBjb25zdCBTRUxFQ1RPUl9OQVZCQVIgPSAnLm5hdmJhcic7XG4gIGNvbnN0IFNFTEVDVE9SX05BVkJBUl9OQVYgPSAnLm5hdmJhci1uYXYnO1xuICBjb25zdCBTRUxFQ1RPUl9WSVNJQkxFX0lURU1TID0gJy5kcm9wZG93bi1tZW51IC5kcm9wZG93bi1pdGVtOm5vdCguZGlzYWJsZWQpOm5vdCg6ZGlzYWJsZWQpJztcbiAgY29uc3QgUExBQ0VNRU5UX1RPUCA9IGluZGV4LmlzUlRMKCkgPyAndG9wLWVuZCcgOiAndG9wLXN0YXJ0JztcbiAgY29uc3QgUExBQ0VNRU5UX1RPUEVORCA9IGluZGV4LmlzUlRMKCkgPyAndG9wLXN0YXJ0JyA6ICd0b3AtZW5kJztcbiAgY29uc3QgUExBQ0VNRU5UX0JPVFRPTSA9IGluZGV4LmlzUlRMKCkgPyAnYm90dG9tLWVuZCcgOiAnYm90dG9tLXN0YXJ0JztcbiAgY29uc3QgUExBQ0VNRU5UX0JPVFRPTUVORCA9IGluZGV4LmlzUlRMKCkgPyAnYm90dG9tLXN0YXJ0JyA6ICdib3R0b20tZW5kJztcbiAgY29uc3QgUExBQ0VNRU5UX1JJR0hUID0gaW5kZXguaXNSVEwoKSA/ICdsZWZ0LXN0YXJ0JyA6ICdyaWdodC1zdGFydCc7XG4gIGNvbnN0IFBMQUNFTUVOVF9MRUZUID0gaW5kZXguaXNSVEwoKSA/ICdyaWdodC1zdGFydCcgOiAnbGVmdC1zdGFydCc7XG4gIGNvbnN0IFBMQUNFTUVOVF9UT1BDRU5URVIgPSAndG9wJztcbiAgY29uc3QgUExBQ0VNRU5UX0JPVFRPTUNFTlRFUiA9ICdib3R0b20nO1xuICBjb25zdCBEZWZhdWx0ID0ge1xuICAgIGF1dG9DbG9zZTogdHJ1ZSxcbiAgICBib3VuZGFyeTogJ2NsaXBwaW5nUGFyZW50cycsXG4gICAgZGlzcGxheTogJ2R5bmFtaWMnLFxuICAgIG9mZnNldDogWzAsIDJdLFxuICAgIHBvcHBlckNvbmZpZzogbnVsbCxcbiAgICByZWZlcmVuY2U6ICd0b2dnbGUnXG4gIH07XG4gIGNvbnN0IERlZmF1bHRUeXBlID0ge1xuICAgIGF1dG9DbG9zZTogJyhib29sZWFufHN0cmluZyknLFxuICAgIGJvdW5kYXJ5OiAnKHN0cmluZ3xlbGVtZW50KScsXG4gICAgZGlzcGxheTogJ3N0cmluZycsXG4gICAgb2Zmc2V0OiAnKGFycmF5fHN0cmluZ3xmdW5jdGlvbiknLFxuICAgIHBvcHBlckNvbmZpZzogJyhudWxsfG9iamVjdHxmdW5jdGlvbiknLFxuICAgIHJlZmVyZW5jZTogJyhzdHJpbmd8ZWxlbWVudHxvYmplY3QpJ1xuICB9O1xuICAvKipcbiAgICogQ2xhc3MgZGVmaW5pdGlvblxuICAgKi9cblxuICBjbGFzcyBEcm9wZG93biBleHRlbmRzIEJhc2VDb21wb25lbnRfX2RlZmF1bHQuZGVmYXVsdCB7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudCwgY29uZmlnKSB7XG4gICAgICBzdXBlcihlbGVtZW50LCBjb25maWcpO1xuICAgICAgdGhpcy5fcG9wcGVyID0gbnVsbDtcbiAgICAgIHRoaXMuX3BhcmVudCA9IHRoaXMuX2VsZW1lbnQucGFyZW50Tm9kZTsgLy8gZHJvcGRvd24gd3JhcHBlclxuICAgICAgLy8gdG9kbzogdjYgcmV2ZXJ0ICMzNzAxMSAmIGNoYW5nZSBtYXJrdXAgaHR0cHM6Ly9nZXRib290c3RyYXAuY29tL2RvY3MvNS4yL2Zvcm1zL2lucHV0LWdyb3VwL1xuXG4gICAgICB0aGlzLl9tZW51ID0gU2VsZWN0b3JFbmdpbmVfX2RlZmF1bHQuZGVmYXVsdC5uZXh0KHRoaXMuX2VsZW1lbnQsIFNFTEVDVE9SX01FTlUpWzBdIHx8IFNlbGVjdG9yRW5naW5lX19kZWZhdWx0LmRlZmF1bHQucHJldih0aGlzLl9lbGVtZW50LCBTRUxFQ1RPUl9NRU5VKVswXSB8fCBTZWxlY3RvckVuZ2luZV9fZGVmYXVsdC5kZWZhdWx0LmZpbmRPbmUoU0VMRUNUT1JfTUVOVSwgdGhpcy5fcGFyZW50KTtcbiAgICAgIHRoaXMuX2luTmF2YmFyID0gdGhpcy5fZGV0ZWN0TmF2YmFyKCk7XG4gICAgfSAvLyBHZXR0ZXJzXG5cblxuICAgIHN0YXRpYyBnZXQgRGVmYXVsdCgpIHtcbiAgICAgIHJldHVybiBEZWZhdWx0O1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgRGVmYXVsdFR5cGUoKSB7XG4gICAgICByZXR1cm4gRGVmYXVsdFR5cGU7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBOQU1FKCkge1xuICAgICAgcmV0dXJuIE5BTUU7XG4gICAgfSAvLyBQdWJsaWNcblxuXG4gICAgdG9nZ2xlKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2lzU2hvd24oKSA/IHRoaXMuaGlkZSgpIDogdGhpcy5zaG93KCk7XG4gICAgfVxuXG4gICAgc2hvdygpIHtcbiAgICAgIGlmIChpbmRleC5pc0Rpc2FibGVkKHRoaXMuX2VsZW1lbnQpIHx8IHRoaXMuX2lzU2hvd24oKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlbGF0ZWRUYXJnZXQgPSB7XG4gICAgICAgIHJlbGF0ZWRUYXJnZXQ6IHRoaXMuX2VsZW1lbnRcbiAgICAgIH07XG4gICAgICBjb25zdCBzaG93RXZlbnQgPSBFdmVudEhhbmRsZXJfX2RlZmF1bHQuZGVmYXVsdC50cmlnZ2VyKHRoaXMuX2VsZW1lbnQsIEVWRU5UX1NIT1csIHJlbGF0ZWRUYXJnZXQpO1xuXG4gICAgICBpZiAoc2hvd0V2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9jcmVhdGVQb3BwZXIoKTsgLy8gSWYgdGhpcyBpcyBhIHRvdWNoLWVuYWJsZWQgZGV2aWNlIHdlIGFkZCBleHRyYVxuICAgICAgLy8gZW1wdHkgbW91c2VvdmVyIGxpc3RlbmVycyB0byB0aGUgYm9keSdzIGltbWVkaWF0ZSBjaGlsZHJlbjtcbiAgICAgIC8vIG9ubHkgbmVlZGVkIGJlY2F1c2Ugb2YgYnJva2VuIGV2ZW50IGRlbGVnYXRpb24gb24gaU9TXG4gICAgICAvLyBodHRwczovL3d3dy5xdWlya3Ntb2RlLm9yZy9ibG9nL2FyY2hpdmVzLzIwMTQvMDIvbW91c2VfZXZlbnRfYnViLmh0bWxcblxuXG4gICAgICBpZiAoJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ICYmICF0aGlzLl9wYXJlbnQuY2xvc2VzdChTRUxFQ1RPUl9OQVZCQVJfTkFWKSkge1xuICAgICAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgW10uY29uY2F0KC4uLmRvY3VtZW50LmJvZHkuY2hpbGRyZW4pKSB7XG4gICAgICAgICAgRXZlbnRIYW5kbGVyX19kZWZhdWx0LmRlZmF1bHQub24oZWxlbWVudCwgJ21vdXNlb3ZlcicsIGluZGV4Lm5vb3ApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2VsZW1lbnQuZm9jdXMoKTtcblxuICAgICAgdGhpcy5fZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCB0cnVlKTtcblxuICAgICAgdGhpcy5fbWVudS5jbGFzc0xpc3QuYWRkKENMQVNTX05BTUVfU0hPVyk7XG5cbiAgICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LmFkZChDTEFTU19OQU1FX1NIT1cpO1xuXG4gICAgICBFdmVudEhhbmRsZXJfX2RlZmF1bHQuZGVmYXVsdC50cmlnZ2VyKHRoaXMuX2VsZW1lbnQsIEVWRU5UX1NIT1dOLCByZWxhdGVkVGFyZ2V0KTtcbiAgICB9XG5cbiAgICBoaWRlKCkge1xuICAgICAgaWYgKGluZGV4LmlzRGlzYWJsZWQodGhpcy5fZWxlbWVudCkgfHwgIXRoaXMuX2lzU2hvd24oKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlbGF0ZWRUYXJnZXQgPSB7XG4gICAgICAgIHJlbGF0ZWRUYXJnZXQ6IHRoaXMuX2VsZW1lbnRcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuX2NvbXBsZXRlSGlkZShyZWxhdGVkVGFyZ2V0KTtcbiAgICB9XG5cbiAgICBkaXNwb3NlKCkge1xuICAgICAgaWYgKHRoaXMuX3BvcHBlcikge1xuICAgICAgICB0aGlzLl9wb3BwZXIuZGVzdHJveSgpO1xuICAgICAgfVxuXG4gICAgICBzdXBlci5kaXNwb3NlKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgdGhpcy5faW5OYXZiYXIgPSB0aGlzLl9kZXRlY3ROYXZiYXIoKTtcblxuICAgICAgaWYgKHRoaXMuX3BvcHBlcikge1xuICAgICAgICB0aGlzLl9wb3BwZXIudXBkYXRlKCk7XG4gICAgICB9XG4gICAgfSAvLyBQcml2YXRlXG5cblxuICAgIF9jb21wbGV0ZUhpZGUocmVsYXRlZFRhcmdldCkge1xuICAgICAgY29uc3QgaGlkZUV2ZW50ID0gRXZlbnRIYW5kbGVyX19kZWZhdWx0LmRlZmF1bHQudHJpZ2dlcih0aGlzLl9lbGVtZW50LCBFVkVOVF9ISURFLCByZWxhdGVkVGFyZ2V0KTtcblxuICAgICAgaWYgKGhpZGVFdmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gLy8gSWYgdGhpcyBpcyBhIHRvdWNoLWVuYWJsZWQgZGV2aWNlIHdlIHJlbW92ZSB0aGUgZXh0cmFcbiAgICAgIC8vIGVtcHR5IG1vdXNlb3ZlciBsaXN0ZW5lcnMgd2UgYWRkZWQgZm9yIGlPUyBzdXBwb3J0XG5cblxuICAgICAgaWYgKCdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkge1xuICAgICAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgW10uY29uY2F0KC4uLmRvY3VtZW50LmJvZHkuY2hpbGRyZW4pKSB7XG4gICAgICAgICAgRXZlbnRIYW5kbGVyX19kZWZhdWx0LmRlZmF1bHQub2ZmKGVsZW1lbnQsICdtb3VzZW92ZXInLCBpbmRleC5ub29wKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fcG9wcGVyKSB7XG4gICAgICAgIHRoaXMuX3BvcHBlci5kZXN0cm95KCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX21lbnUuY2xhc3NMaXN0LnJlbW92ZShDTEFTU19OQU1FX1NIT1cpO1xuXG4gICAgICB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoQ0xBU1NfTkFNRV9TSE9XKTtcblxuICAgICAgdGhpcy5fZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcblxuICAgICAgTWFuaXB1bGF0b3JfX2RlZmF1bHQuZGVmYXVsdC5yZW1vdmVEYXRhQXR0cmlidXRlKHRoaXMuX21lbnUsICdwb3BwZXInKTtcbiAgICAgIEV2ZW50SGFuZGxlcl9fZGVmYXVsdC5kZWZhdWx0LnRyaWdnZXIodGhpcy5fZWxlbWVudCwgRVZFTlRfSElEREVOLCByZWxhdGVkVGFyZ2V0KTtcbiAgICB9XG5cbiAgICBfZ2V0Q29uZmlnKGNvbmZpZykge1xuICAgICAgY29uZmlnID0gc3VwZXIuX2dldENvbmZpZyhjb25maWcpO1xuXG4gICAgICBpZiAodHlwZW9mIGNvbmZpZy5yZWZlcmVuY2UgPT09ICdvYmplY3QnICYmICFpbmRleC5pc0VsZW1lbnQoY29uZmlnLnJlZmVyZW5jZSkgJiYgdHlwZW9mIGNvbmZpZy5yZWZlcmVuY2UuZ2V0Qm91bmRpbmdDbGllbnRSZWN0ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vIFBvcHBlciB2aXJ0dWFsIGVsZW1lbnRzIHJlcXVpcmUgYSBnZXRCb3VuZGluZ0NsaWVudFJlY3QgbWV0aG9kXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYCR7TkFNRS50b1VwcGVyQ2FzZSgpfTogT3B0aW9uIFwicmVmZXJlbmNlXCIgcHJvdmlkZWQgdHlwZSBcIm9iamVjdFwiIHdpdGhvdXQgYSByZXF1aXJlZCBcImdldEJvdW5kaW5nQ2xpZW50UmVjdFwiIG1ldGhvZC5gKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICB9XG5cbiAgICBfY3JlYXRlUG9wcGVyKCkge1xuICAgICAgaWYgKHR5cGVvZiBQb3BwZXJfX25hbWVzcGFjZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQm9vdHN0cmFwXFwncyBkcm9wZG93bnMgcmVxdWlyZSBQb3BwZXIgKGh0dHBzOi8vcG9wcGVyLmpzLm9yZyknKTtcbiAgICAgIH1cblxuICAgICAgbGV0IHJlZmVyZW5jZUVsZW1lbnQgPSB0aGlzLl9lbGVtZW50O1xuXG4gICAgICBpZiAodGhpcy5fY29uZmlnLnJlZmVyZW5jZSA9PT0gJ3BhcmVudCcpIHtcbiAgICAgICAgcmVmZXJlbmNlRWxlbWVudCA9IHRoaXMuX3BhcmVudDtcbiAgICAgIH0gZWxzZSBpZiAoaW5kZXguaXNFbGVtZW50KHRoaXMuX2NvbmZpZy5yZWZlcmVuY2UpKSB7XG4gICAgICAgIHJlZmVyZW5jZUVsZW1lbnQgPSBpbmRleC5nZXRFbGVtZW50KHRoaXMuX2NvbmZpZy5yZWZlcmVuY2UpO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5fY29uZmlnLnJlZmVyZW5jZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmVmZXJlbmNlRWxlbWVudCA9IHRoaXMuX2NvbmZpZy5yZWZlcmVuY2U7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBvcHBlckNvbmZpZyA9IHRoaXMuX2dldFBvcHBlckNvbmZpZygpO1xuXG4gICAgICB0aGlzLl9wb3BwZXIgPSBQb3BwZXJfX25hbWVzcGFjZS5jcmVhdGVQb3BwZXIocmVmZXJlbmNlRWxlbWVudCwgdGhpcy5fbWVudSwgcG9wcGVyQ29uZmlnKTtcbiAgICB9XG5cbiAgICBfaXNTaG93bigpIHtcbiAgICAgIHJldHVybiB0aGlzLl9tZW51LmNsYXNzTGlzdC5jb250YWlucyhDTEFTU19OQU1FX1NIT1cpO1xuICAgIH1cblxuICAgIF9nZXRQbGFjZW1lbnQoKSB7XG4gICAgICBjb25zdCBwYXJlbnREcm9wZG93biA9IHRoaXMuX3BhcmVudDtcblxuICAgICAgaWYgKHBhcmVudERyb3Bkb3duLmNsYXNzTGlzdC5jb250YWlucyhDTEFTU19OQU1FX0RST1BFTkQpKSB7XG4gICAgICAgIHJldHVybiBQTEFDRU1FTlRfUklHSFQ7XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXJlbnREcm9wZG93bi5jbGFzc0xpc3QuY29udGFpbnMoQ0xBU1NfTkFNRV9EUk9QU1RBUlQpKSB7XG4gICAgICAgIHJldHVybiBQTEFDRU1FTlRfTEVGVDtcbiAgICAgIH1cblxuICAgICAgaWYgKHBhcmVudERyb3Bkb3duLmNsYXNzTGlzdC5jb250YWlucyhDTEFTU19OQU1FX0RST1BVUF9DRU5URVIpKSB7XG4gICAgICAgIHJldHVybiBQTEFDRU1FTlRfVE9QQ0VOVEVSO1xuICAgICAgfVxuXG4gICAgICBpZiAocGFyZW50RHJvcGRvd24uY2xhc3NMaXN0LmNvbnRhaW5zKENMQVNTX05BTUVfRFJPUERPV05fQ0VOVEVSKSkge1xuICAgICAgICByZXR1cm4gUExBQ0VNRU5UX0JPVFRPTUNFTlRFUjtcbiAgICAgIH0gLy8gV2UgbmVlZCB0byB0cmltIHRoZSB2YWx1ZSBiZWNhdXNlIGN1c3RvbSBwcm9wZXJ0aWVzIGNhbiBhbHNvIGluY2x1ZGUgc3BhY2VzXG5cblxuICAgICAgY29uc3QgaXNFbmQgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuX21lbnUpLmdldFByb3BlcnR5VmFsdWUoJy0tYnMtcG9zaXRpb24nKS50cmltKCkgPT09ICdlbmQnO1xuXG4gICAgICBpZiAocGFyZW50RHJvcGRvd24uY2xhc3NMaXN0LmNvbnRhaW5zKENMQVNTX05BTUVfRFJPUFVQKSkge1xuICAgICAgICByZXR1cm4gaXNFbmQgPyBQTEFDRU1FTlRfVE9QRU5EIDogUExBQ0VNRU5UX1RPUDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGlzRW5kID8gUExBQ0VNRU5UX0JPVFRPTUVORCA6IFBMQUNFTUVOVF9CT1RUT007XG4gICAgfVxuXG4gICAgX2RldGVjdE5hdmJhcigpIHtcbiAgICAgIHJldHVybiB0aGlzLl9lbGVtZW50LmNsb3Nlc3QoU0VMRUNUT1JfTkFWQkFSKSAhPT0gbnVsbDtcbiAgICB9XG5cbiAgICBfZ2V0T2Zmc2V0KCkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBvZmZzZXRcbiAgICAgIH0gPSB0aGlzLl9jb25maWc7XG5cbiAgICAgIGlmICh0eXBlb2Ygb2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gb2Zmc2V0LnNwbGl0KCcsJykubWFwKHZhbHVlID0+IE51bWJlci5wYXJzZUludCh2YWx1ZSwgMTApKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBvZmZzZXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIHBvcHBlckRhdGEgPT4gb2Zmc2V0KHBvcHBlckRhdGEsIHRoaXMuX2VsZW1lbnQpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gb2Zmc2V0O1xuICAgIH1cblxuICAgIF9nZXRQb3BwZXJDb25maWcoKSB7XG4gICAgICBjb25zdCBkZWZhdWx0QnNQb3BwZXJDb25maWcgPSB7XG4gICAgICAgIHBsYWNlbWVudDogdGhpcy5fZ2V0UGxhY2VtZW50KCksXG4gICAgICAgIG1vZGlmaWVyczogW3tcbiAgICAgICAgICBuYW1lOiAncHJldmVudE92ZXJmbG93JyxcbiAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICBib3VuZGFyeTogdGhpcy5fY29uZmlnLmJvdW5kYXJ5XG4gICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgbmFtZTogJ29mZnNldCcsXG4gICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgb2Zmc2V0OiB0aGlzLl9nZXRPZmZzZXQoKVxuICAgICAgICAgIH1cbiAgICAgICAgfV1cbiAgICAgIH07IC8vIERpc2FibGUgUG9wcGVyIGlmIHdlIGhhdmUgYSBzdGF0aWMgZGlzcGxheSBvciBEcm9wZG93biBpcyBpbiBOYXZiYXJcblxuICAgICAgaWYgKHRoaXMuX2luTmF2YmFyIHx8IHRoaXMuX2NvbmZpZy5kaXNwbGF5ID09PSAnc3RhdGljJykge1xuICAgICAgICBNYW5pcHVsYXRvcl9fZGVmYXVsdC5kZWZhdWx0LnNldERhdGFBdHRyaWJ1dGUodGhpcy5fbWVudSwgJ3BvcHBlcicsICdzdGF0aWMnKTsgLy8gdG9kbzp2NiByZW1vdmVcblxuICAgICAgICBkZWZhdWx0QnNQb3BwZXJDb25maWcubW9kaWZpZXJzID0gW3tcbiAgICAgICAgICBuYW1lOiAnYXBwbHlTdHlsZXMnLFxuICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlXG4gICAgICAgIH1dO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4geyAuLi5kZWZhdWx0QnNQb3BwZXJDb25maWcsXG4gICAgICAgIC4uLih0eXBlb2YgdGhpcy5fY29uZmlnLnBvcHBlckNvbmZpZyA9PT0gJ2Z1bmN0aW9uJyA/IHRoaXMuX2NvbmZpZy5wb3BwZXJDb25maWcoZGVmYXVsdEJzUG9wcGVyQ29uZmlnKSA6IHRoaXMuX2NvbmZpZy5wb3BwZXJDb25maWcpXG4gICAgICB9O1xuICAgIH1cblxuICAgIF9zZWxlY3RNZW51SXRlbSh7XG4gICAgICBrZXksXG4gICAgICB0YXJnZXRcbiAgICB9KSB7XG4gICAgICBjb25zdCBpdGVtcyA9IFNlbGVjdG9yRW5naW5lX19kZWZhdWx0LmRlZmF1bHQuZmluZChTRUxFQ1RPUl9WSVNJQkxFX0lURU1TLCB0aGlzLl9tZW51KS5maWx0ZXIoZWxlbWVudCA9PiBpbmRleC5pc1Zpc2libGUoZWxlbWVudCkpO1xuXG4gICAgICBpZiAoIWl0ZW1zLmxlbmd0aCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9IC8vIGlmIHRhcmdldCBpc24ndCBpbmNsdWRlZCBpbiBpdGVtcyAoZS5nLiB3aGVuIGV4cGFuZGluZyB0aGUgZHJvcGRvd24pXG4gICAgICAvLyBhbGxvdyBjeWNsaW5nIHRvIGdldCB0aGUgbGFzdCBpdGVtIGluIGNhc2Uga2V5IGVxdWFscyBBUlJPV19VUF9LRVlcblxuXG4gICAgICBpbmRleC5nZXROZXh0QWN0aXZlRWxlbWVudChpdGVtcywgdGFyZ2V0LCBrZXkgPT09IEFSUk9XX0RPV05fS0VZLCAhaXRlbXMuaW5jbHVkZXModGFyZ2V0KSkuZm9jdXMoKTtcbiAgICB9IC8vIFN0YXRpY1xuXG5cbiAgICBzdGF0aWMgalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZykge1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBEcm9wZG93bi5nZXRPckNyZWF0ZUluc3RhbmNlKHRoaXMsIGNvbmZpZyk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb25maWcgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhW2NvbmZpZ10gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgTm8gbWV0aG9kIG5hbWVkIFwiJHtjb25maWd9XCJgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRhdGFbY29uZmlnXSgpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNsZWFyTWVudXMoZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5idXR0b24gPT09IFJJR0hUX01PVVNFX0JVVFRPTiB8fCBldmVudC50eXBlID09PSAna2V5dXAnICYmIGV2ZW50LmtleSAhPT0gVEFCX0tFWSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG9wZW5Ub2dnbGVzID0gU2VsZWN0b3JFbmdpbmVfX2RlZmF1bHQuZGVmYXVsdC5maW5kKFNFTEVDVE9SX0RBVEFfVE9HR0xFX1NIT1dOKTtcblxuICAgICAgZm9yIChjb25zdCB0b2dnbGUgb2Ygb3BlblRvZ2dsZXMpIHtcbiAgICAgICAgY29uc3QgY29udGV4dCA9IERyb3Bkb3duLmdldEluc3RhbmNlKHRvZ2dsZSk7XG5cbiAgICAgICAgaWYgKCFjb250ZXh0IHx8IGNvbnRleHQuX2NvbmZpZy5hdXRvQ2xvc2UgPT09IGZhbHNlKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb21wb3NlZFBhdGggPSBldmVudC5jb21wb3NlZFBhdGgoKTtcbiAgICAgICAgY29uc3QgaXNNZW51VGFyZ2V0ID0gY29tcG9zZWRQYXRoLmluY2x1ZGVzKGNvbnRleHQuX21lbnUpO1xuXG4gICAgICAgIGlmIChjb21wb3NlZFBhdGguaW5jbHVkZXMoY29udGV4dC5fZWxlbWVudCkgfHwgY29udGV4dC5fY29uZmlnLmF1dG9DbG9zZSA9PT0gJ2luc2lkZScgJiYgIWlzTWVudVRhcmdldCB8fCBjb250ZXh0Ll9jb25maWcuYXV0b0Nsb3NlID09PSAnb3V0c2lkZScgJiYgaXNNZW51VGFyZ2V0KSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH0gLy8gVGFiIG5hdmlnYXRpb24gdGhyb3VnaCB0aGUgZHJvcGRvd24gbWVudSBvciBldmVudHMgZnJvbSBjb250YWluZWQgaW5wdXRzIHNob3VsZG4ndCBjbG9zZSB0aGUgbWVudVxuXG5cbiAgICAgICAgaWYgKGNvbnRleHQuX21lbnUuY29udGFpbnMoZXZlbnQudGFyZ2V0KSAmJiAoZXZlbnQudHlwZSA9PT0gJ2tleXVwJyAmJiBldmVudC5rZXkgPT09IFRBQl9LRVkgfHwgL2lucHV0fHNlbGVjdHxvcHRpb258dGV4dGFyZWF8Zm9ybS9pLnRlc3QoZXZlbnQudGFyZ2V0LnRhZ05hbWUpKSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVsYXRlZFRhcmdldCA9IHtcbiAgICAgICAgICByZWxhdGVkVGFyZ2V0OiBjb250ZXh0Ll9lbGVtZW50XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09ICdjbGljaycpIHtcbiAgICAgICAgICByZWxhdGVkVGFyZ2V0LmNsaWNrRXZlbnQgPSBldmVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQuX2NvbXBsZXRlSGlkZShyZWxhdGVkVGFyZ2V0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZGF0YUFwaUtleWRvd25IYW5kbGVyKGV2ZW50KSB7XG4gICAgICAvLyBJZiBub3QgYW4gVVAgfCBET1dOIHwgRVNDQVBFIGtleSA9PiBub3QgYSBkcm9wZG93biBjb21tYW5kXG4gICAgICAvLyBJZiBpbnB1dC90ZXh0YXJlYSAmJiBpZiBrZXkgaXMgb3RoZXIgdGhhbiBFU0NBUEUgPT4gbm90IGEgZHJvcGRvd24gY29tbWFuZFxuICAgICAgY29uc3QgaXNJbnB1dCA9IC9pbnB1dHx0ZXh0YXJlYS9pLnRlc3QoZXZlbnQudGFyZ2V0LnRhZ05hbWUpO1xuICAgICAgY29uc3QgaXNFc2NhcGVFdmVudCA9IGV2ZW50LmtleSA9PT0gRVNDQVBFX0tFWTtcbiAgICAgIGNvbnN0IGlzVXBPckRvd25FdmVudCA9IFtBUlJPV19VUF9LRVksIEFSUk9XX0RPV05fS0VZXS5pbmNsdWRlcyhldmVudC5rZXkpO1xuXG4gICAgICBpZiAoIWlzVXBPckRvd25FdmVudCAmJiAhaXNFc2NhcGVFdmVudCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChpc0lucHV0ICYmICFpc0VzY2FwZUV2ZW50KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTsgLy8gdG9kbzogdjYgcmV2ZXJ0ICMzNzAxMSAmIGNoYW5nZSBtYXJrdXAgaHR0cHM6Ly9nZXRib290c3RyYXAuY29tL2RvY3MvNS4yL2Zvcm1zL2lucHV0LWdyb3VwL1xuXG4gICAgICBjb25zdCBnZXRUb2dnbGVCdXR0b24gPSB0aGlzLm1hdGNoZXMoU0VMRUNUT1JfREFUQV9UT0dHTEUpID8gdGhpcyA6IFNlbGVjdG9yRW5naW5lX19kZWZhdWx0LmRlZmF1bHQucHJldih0aGlzLCBTRUxFQ1RPUl9EQVRBX1RPR0dMRSlbMF0gfHwgU2VsZWN0b3JFbmdpbmVfX2RlZmF1bHQuZGVmYXVsdC5uZXh0KHRoaXMsIFNFTEVDVE9SX0RBVEFfVE9HR0xFKVswXSB8fCBTZWxlY3RvckVuZ2luZV9fZGVmYXVsdC5kZWZhdWx0LmZpbmRPbmUoU0VMRUNUT1JfREFUQV9UT0dHTEUsIGV2ZW50LmRlbGVnYXRlVGFyZ2V0LnBhcmVudE5vZGUpO1xuICAgICAgY29uc3QgaW5zdGFuY2UgPSBEcm9wZG93bi5nZXRPckNyZWF0ZUluc3RhbmNlKGdldFRvZ2dsZUJ1dHRvbik7XG5cbiAgICAgIGlmIChpc1VwT3JEb3duRXZlbnQpIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGluc3RhbmNlLnNob3coKTtcblxuICAgICAgICBpbnN0YW5jZS5fc2VsZWN0TWVudUl0ZW0oZXZlbnQpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGluc3RhbmNlLl9pc1Nob3duKCkpIHtcbiAgICAgICAgLy8gZWxzZSBpcyBlc2NhcGUgYW5kIHdlIGNoZWNrIGlmIGl0IGlzIHNob3duXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBpbnN0YW5jZS5oaWRlKCk7XG4gICAgICAgIGdldFRvZ2dsZUJ1dHRvbi5mb2N1cygpO1xuICAgICAgfVxuICAgIH1cblxuICB9XG4gIC8qKlxuICAgKiBEYXRhIEFQSSBpbXBsZW1lbnRhdGlvblxuICAgKi9cblxuXG4gIEV2ZW50SGFuZGxlcl9fZGVmYXVsdC5kZWZhdWx0Lm9uKGRvY3VtZW50LCBFVkVOVF9LRVlET1dOX0RBVEFfQVBJLCBTRUxFQ1RPUl9EQVRBX1RPR0dMRSwgRHJvcGRvd24uZGF0YUFwaUtleWRvd25IYW5kbGVyKTtcbiAgRXZlbnRIYW5kbGVyX19kZWZhdWx0LmRlZmF1bHQub24oZG9jdW1lbnQsIEVWRU5UX0tFWURPV05fREFUQV9BUEksIFNFTEVDVE9SX01FTlUsIERyb3Bkb3duLmRhdGFBcGlLZXlkb3duSGFuZGxlcik7XG4gIEV2ZW50SGFuZGxlcl9fZGVmYXVsdC5kZWZhdWx0Lm9uKGRvY3VtZW50LCBFVkVOVF9DTElDS19EQVRBX0FQSSwgRHJvcGRvd24uY2xlYXJNZW51cyk7XG4gIEV2ZW50SGFuZGxlcl9fZGVmYXVsdC5kZWZhdWx0Lm9uKGRvY3VtZW50LCBFVkVOVF9LRVlVUF9EQVRBX0FQSSwgRHJvcGRvd24uY2xlYXJNZW51cyk7XG4gIEV2ZW50SGFuZGxlcl9fZGVmYXVsdC5kZWZhdWx0Lm9uKGRvY3VtZW50LCBFVkVOVF9DTElDS19EQVRBX0FQSSwgU0VMRUNUT1JfREFUQV9UT0dHTEUsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgRHJvcGRvd24uZ2V0T3JDcmVhdGVJbnN0YW5jZSh0aGlzKS50b2dnbGUoKTtcbiAgfSk7XG4gIC8qKlxuICAgKiBqUXVlcnlcbiAgICovXG5cbiAgaW5kZXguZGVmaW5lSlF1ZXJ5UGx1Z2luKERyb3Bkb3duKTtcblxuICByZXR1cm4gRHJvcGRvd247XG5cbn0pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRyb3Bkb3duLmpzLm1hcFxuIiwiLyohXG4gICogQm9vdHN0cmFwIHRvb2x0aXAuanMgdjUuMi4yIChodHRwczovL2dldGJvb3RzdHJhcC5jb20vKVxuICAqIENvcHlyaWdodCAyMDExLTIwMjIgVGhlIEJvb3RzdHJhcCBBdXRob3JzIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvZ3JhcGhzL2NvbnRyaWJ1dG9ycylcbiAgKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21haW4vTElDRU5TRSlcbiAgKi9cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKCdAcG9wcGVyanMvY29yZScpLCByZXF1aXJlKCcuL3V0aWwvaW5kZXgnKSwgcmVxdWlyZSgnLi91dGlsL3Nhbml0aXplcicpLCByZXF1aXJlKCcuL2RvbS9ldmVudC1oYW5kbGVyJyksIHJlcXVpcmUoJy4vZG9tL21hbmlwdWxhdG9yJyksIHJlcXVpcmUoJy4vYmFzZS1jb21wb25lbnQnKSwgcmVxdWlyZSgnLi91dGlsL3RlbXBsYXRlLWZhY3RvcnknKSkgOlxuICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoWydAcG9wcGVyanMvY29yZScsICcuL3V0aWwvaW5kZXgnLCAnLi91dGlsL3Nhbml0aXplcicsICcuL2RvbS9ldmVudC1oYW5kbGVyJywgJy4vZG9tL21hbmlwdWxhdG9yJywgJy4vYmFzZS1jb21wb25lbnQnLCAnLi91dGlsL3RlbXBsYXRlLWZhY3RvcnknXSwgZmFjdG9yeSkgOlxuICAoZ2xvYmFsID0gdHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsVGhpcyA6IGdsb2JhbCB8fCBzZWxmLCBnbG9iYWwuVG9vbHRpcCA9IGZhY3RvcnkoZ2xvYmFsW1wiQHBvcHBlcmpzL2NvcmVcIl0sIGdsb2JhbC5JbmRleCwgZ2xvYmFsLlNhbml0aXplciwgZ2xvYmFsLkV2ZW50SGFuZGxlciwgZ2xvYmFsLk1hbmlwdWxhdG9yLCBnbG9iYWwuQmFzZUNvbXBvbmVudCwgZ2xvYmFsLlRlbXBsYXRlRmFjdG9yeSkpO1xufSkodGhpcywgKGZ1bmN0aW9uIChQb3BwZXIsIGluZGV4LCBzYW5pdGl6ZXIsIEV2ZW50SGFuZGxlciwgTWFuaXB1bGF0b3IsIEJhc2VDb21wb25lbnQsIFRlbXBsYXRlRmFjdG9yeSkgeyAndXNlIHN0cmljdCc7XG5cbiAgY29uc3QgX2ludGVyb3BEZWZhdWx0TGVnYWN5ID0gZSA9PiBlICYmIHR5cGVvZiBlID09PSAnb2JqZWN0JyAmJiAnZGVmYXVsdCcgaW4gZSA/IGUgOiB7IGRlZmF1bHQ6IGUgfTtcblxuICBmdW5jdGlvbiBfaW50ZXJvcE5hbWVzcGFjZShlKSB7XG4gICAgaWYgKGUgJiYgZS5fX2VzTW9kdWxlKSByZXR1cm4gZTtcbiAgICBjb25zdCBuID0gT2JqZWN0LmNyZWF0ZShudWxsLCB7IFtTeW1ib2wudG9TdHJpbmdUYWddOiB7IHZhbHVlOiAnTW9kdWxlJyB9IH0pO1xuICAgIGlmIChlKSB7XG4gICAgICBmb3IgKGNvbnN0IGsgaW4gZSkge1xuICAgICAgICBpZiAoayAhPT0gJ2RlZmF1bHQnKSB7XG4gICAgICAgICAgY29uc3QgZCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZSwgayk7XG4gICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG4sIGssIGQuZ2V0ID8gZCA6IHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBnZXQ6ICgpID0+IGVba11cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBuLmRlZmF1bHQgPSBlO1xuICAgIHJldHVybiBPYmplY3QuZnJlZXplKG4pO1xuICB9XG5cbiAgY29uc3QgUG9wcGVyX19uYW1lc3BhY2UgPSAvKiNfX1BVUkVfXyovX2ludGVyb3BOYW1lc3BhY2UoUG9wcGVyKTtcbiAgY29uc3QgRXZlbnRIYW5kbGVyX19kZWZhdWx0ID0gLyojX19QVVJFX18qL19pbnRlcm9wRGVmYXVsdExlZ2FjeShFdmVudEhhbmRsZXIpO1xuICBjb25zdCBNYW5pcHVsYXRvcl9fZGVmYXVsdCA9IC8qI19fUFVSRV9fKi9faW50ZXJvcERlZmF1bHRMZWdhY3koTWFuaXB1bGF0b3IpO1xuICBjb25zdCBCYXNlQ29tcG9uZW50X19kZWZhdWx0ID0gLyojX19QVVJFX18qL19pbnRlcm9wRGVmYXVsdExlZ2FjeShCYXNlQ29tcG9uZW50KTtcbiAgY29uc3QgVGVtcGxhdGVGYWN0b3J5X19kZWZhdWx0ID0gLyojX19QVVJFX18qL19pbnRlcm9wRGVmYXVsdExlZ2FjeShUZW1wbGF0ZUZhY3RvcnkpO1xuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBCb290c3RyYXAgKHY1LjIuMik6IHRvb2x0aXAuanNcbiAgICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYWluL0xJQ0VOU0UpXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuICAvKipcbiAgICogQ29uc3RhbnRzXG4gICAqL1xuXG4gIGNvbnN0IE5BTUUgPSAndG9vbHRpcCc7XG4gIGNvbnN0IERJU0FMTE9XRURfQVRUUklCVVRFUyA9IG5ldyBTZXQoWydzYW5pdGl6ZScsICdhbGxvd0xpc3QnLCAnc2FuaXRpemVGbiddKTtcbiAgY29uc3QgQ0xBU1NfTkFNRV9GQURFID0gJ2ZhZGUnO1xuICBjb25zdCBDTEFTU19OQU1FX01PREFMID0gJ21vZGFsJztcbiAgY29uc3QgQ0xBU1NfTkFNRV9TSE9XID0gJ3Nob3cnO1xuICBjb25zdCBTRUxFQ1RPUl9UT09MVElQX0lOTkVSID0gJy50b29sdGlwLWlubmVyJztcbiAgY29uc3QgU0VMRUNUT1JfTU9EQUwgPSBgLiR7Q0xBU1NfTkFNRV9NT0RBTH1gO1xuICBjb25zdCBFVkVOVF9NT0RBTF9ISURFID0gJ2hpZGUuYnMubW9kYWwnO1xuICBjb25zdCBUUklHR0VSX0hPVkVSID0gJ2hvdmVyJztcbiAgY29uc3QgVFJJR0dFUl9GT0NVUyA9ICdmb2N1cyc7XG4gIGNvbnN0IFRSSUdHRVJfQ0xJQ0sgPSAnY2xpY2snO1xuICBjb25zdCBUUklHR0VSX01BTlVBTCA9ICdtYW51YWwnO1xuICBjb25zdCBFVkVOVF9ISURFID0gJ2hpZGUnO1xuICBjb25zdCBFVkVOVF9ISURERU4gPSAnaGlkZGVuJztcbiAgY29uc3QgRVZFTlRfU0hPVyA9ICdzaG93JztcbiAgY29uc3QgRVZFTlRfU0hPV04gPSAnc2hvd24nO1xuICBjb25zdCBFVkVOVF9JTlNFUlRFRCA9ICdpbnNlcnRlZCc7XG4gIGNvbnN0IEVWRU5UX0NMSUNLID0gJ2NsaWNrJztcbiAgY29uc3QgRVZFTlRfRk9DVVNJTiA9ICdmb2N1c2luJztcbiAgY29uc3QgRVZFTlRfRk9DVVNPVVQgPSAnZm9jdXNvdXQnO1xuICBjb25zdCBFVkVOVF9NT1VTRUVOVEVSID0gJ21vdXNlZW50ZXInO1xuICBjb25zdCBFVkVOVF9NT1VTRUxFQVZFID0gJ21vdXNlbGVhdmUnO1xuICBjb25zdCBBdHRhY2htZW50TWFwID0ge1xuICAgIEFVVE86ICdhdXRvJyxcbiAgICBUT1A6ICd0b3AnLFxuICAgIFJJR0hUOiBpbmRleC5pc1JUTCgpID8gJ2xlZnQnIDogJ3JpZ2h0JyxcbiAgICBCT1RUT006ICdib3R0b20nLFxuICAgIExFRlQ6IGluZGV4LmlzUlRMKCkgPyAncmlnaHQnIDogJ2xlZnQnXG4gIH07XG4gIGNvbnN0IERlZmF1bHQgPSB7XG4gICAgYWxsb3dMaXN0OiBzYW5pdGl6ZXIuRGVmYXVsdEFsbG93bGlzdCxcbiAgICBhbmltYXRpb246IHRydWUsXG4gICAgYm91bmRhcnk6ICdjbGlwcGluZ1BhcmVudHMnLFxuICAgIGNvbnRhaW5lcjogZmFsc2UsXG4gICAgY3VzdG9tQ2xhc3M6ICcnLFxuICAgIGRlbGF5OiAwLFxuICAgIGZhbGxiYWNrUGxhY2VtZW50czogWyd0b3AnLCAncmlnaHQnLCAnYm90dG9tJywgJ2xlZnQnXSxcbiAgICBodG1sOiBmYWxzZSxcbiAgICBvZmZzZXQ6IFswLCAwXSxcbiAgICBwbGFjZW1lbnQ6ICd0b3AnLFxuICAgIHBvcHBlckNvbmZpZzogbnVsbCxcbiAgICBzYW5pdGl6ZTogdHJ1ZSxcbiAgICBzYW5pdGl6ZUZuOiBudWxsLFxuICAgIHNlbGVjdG9yOiBmYWxzZSxcbiAgICB0ZW1wbGF0ZTogJzxkaXYgY2xhc3M9XCJ0b29sdGlwXCIgcm9sZT1cInRvb2x0aXBcIj4nICsgJzxkaXYgY2xhc3M9XCJ0b29sdGlwLWFycm93XCI+PC9kaXY+JyArICc8ZGl2IGNsYXNzPVwidG9vbHRpcC1pbm5lclwiPjwvZGl2PicgKyAnPC9kaXY+JyxcbiAgICB0aXRsZTogJycsXG4gICAgdHJpZ2dlcjogJ2hvdmVyIGZvY3VzJ1xuICB9O1xuICBjb25zdCBEZWZhdWx0VHlwZSA9IHtcbiAgICBhbGxvd0xpc3Q6ICdvYmplY3QnLFxuICAgIGFuaW1hdGlvbjogJ2Jvb2xlYW4nLFxuICAgIGJvdW5kYXJ5OiAnKHN0cmluZ3xlbGVtZW50KScsXG4gICAgY29udGFpbmVyOiAnKHN0cmluZ3xlbGVtZW50fGJvb2xlYW4pJyxcbiAgICBjdXN0b21DbGFzczogJyhzdHJpbmd8ZnVuY3Rpb24pJyxcbiAgICBkZWxheTogJyhudW1iZXJ8b2JqZWN0KScsXG4gICAgZmFsbGJhY2tQbGFjZW1lbnRzOiAnYXJyYXknLFxuICAgIGh0bWw6ICdib29sZWFuJyxcbiAgICBvZmZzZXQ6ICcoYXJyYXl8c3RyaW5nfGZ1bmN0aW9uKScsXG4gICAgcGxhY2VtZW50OiAnKHN0cmluZ3xmdW5jdGlvbiknLFxuICAgIHBvcHBlckNvbmZpZzogJyhudWxsfG9iamVjdHxmdW5jdGlvbiknLFxuICAgIHNhbml0aXplOiAnYm9vbGVhbicsXG4gICAgc2FuaXRpemVGbjogJyhudWxsfGZ1bmN0aW9uKScsXG4gICAgc2VsZWN0b3I6ICcoc3RyaW5nfGJvb2xlYW4pJyxcbiAgICB0ZW1wbGF0ZTogJ3N0cmluZycsXG4gICAgdGl0bGU6ICcoc3RyaW5nfGVsZW1lbnR8ZnVuY3Rpb24pJyxcbiAgICB0cmlnZ2VyOiAnc3RyaW5nJ1xuICB9O1xuICAvKipcbiAgICogQ2xhc3MgZGVmaW5pdGlvblxuICAgKi9cblxuICBjbGFzcyBUb29sdGlwIGV4dGVuZHMgQmFzZUNvbXBvbmVudF9fZGVmYXVsdC5kZWZhdWx0IHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50LCBjb25maWcpIHtcbiAgICAgIGlmICh0eXBlb2YgUG9wcGVyX19uYW1lc3BhY2UgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Jvb3RzdHJhcFxcJ3MgdG9vbHRpcHMgcmVxdWlyZSBQb3BwZXIgKGh0dHBzOi8vcG9wcGVyLmpzLm9yZyknKTtcbiAgICAgIH1cblxuICAgICAgc3VwZXIoZWxlbWVudCwgY29uZmlnKTsgLy8gUHJpdmF0ZVxuXG4gICAgICB0aGlzLl9pc0VuYWJsZWQgPSB0cnVlO1xuICAgICAgdGhpcy5fdGltZW91dCA9IDA7XG4gICAgICB0aGlzLl9pc0hvdmVyZWQgPSBudWxsO1xuICAgICAgdGhpcy5fYWN0aXZlVHJpZ2dlciA9IHt9O1xuICAgICAgdGhpcy5fcG9wcGVyID0gbnVsbDtcbiAgICAgIHRoaXMuX3RlbXBsYXRlRmFjdG9yeSA9IG51bGw7XG4gICAgICB0aGlzLl9uZXdDb250ZW50ID0gbnVsbDsgLy8gUHJvdGVjdGVkXG5cbiAgICAgIHRoaXMudGlwID0gbnVsbDtcblxuICAgICAgdGhpcy5fc2V0TGlzdGVuZXJzKCk7XG5cbiAgICAgIGlmICghdGhpcy5fY29uZmlnLnNlbGVjdG9yKSB7XG4gICAgICAgIHRoaXMuX2ZpeFRpdGxlKCk7XG4gICAgICB9XG4gICAgfSAvLyBHZXR0ZXJzXG5cblxuICAgIHN0YXRpYyBnZXQgRGVmYXVsdCgpIHtcbiAgICAgIHJldHVybiBEZWZhdWx0O1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgRGVmYXVsdFR5cGUoKSB7XG4gICAgICByZXR1cm4gRGVmYXVsdFR5cGU7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBOQU1FKCkge1xuICAgICAgcmV0dXJuIE5BTUU7XG4gICAgfSAvLyBQdWJsaWNcblxuXG4gICAgZW5hYmxlKCkge1xuICAgICAgdGhpcy5faXNFbmFibGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBkaXNhYmxlKCkge1xuICAgICAgdGhpcy5faXNFbmFibGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdG9nZ2xlRW5hYmxlZCgpIHtcbiAgICAgIHRoaXMuX2lzRW5hYmxlZCA9ICF0aGlzLl9pc0VuYWJsZWQ7XG4gICAgfVxuXG4gICAgdG9nZ2xlKCkge1xuICAgICAgaWYgKCF0aGlzLl9pc0VuYWJsZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9hY3RpdmVUcmlnZ2VyLmNsaWNrID0gIXRoaXMuX2FjdGl2ZVRyaWdnZXIuY2xpY2s7XG5cbiAgICAgIGlmICh0aGlzLl9pc1Nob3duKCkpIHtcbiAgICAgICAgdGhpcy5fbGVhdmUoKTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2VudGVyKCk7XG4gICAgfVxuXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLl90aW1lb3V0KTtcbiAgICAgIEV2ZW50SGFuZGxlcl9fZGVmYXVsdC5kZWZhdWx0Lm9mZih0aGlzLl9lbGVtZW50LmNsb3Nlc3QoU0VMRUNUT1JfTU9EQUwpLCBFVkVOVF9NT0RBTF9ISURFLCB0aGlzLl9oaWRlTW9kYWxIYW5kbGVyKTtcblxuICAgICAgaWYgKHRoaXMudGlwKSB7XG4gICAgICAgIHRoaXMudGlwLnJlbW92ZSgpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYnMtb3JpZ2luYWwtdGl0bGUnKSkge1xuICAgICAgICB0aGlzLl9lbGVtZW50LnNldEF0dHJpYnV0ZSgndGl0bGUnLCB0aGlzLl9lbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1icy1vcmlnaW5hbC10aXRsZScpKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fZGlzcG9zZVBvcHBlcigpO1xuXG4gICAgICBzdXBlci5kaXNwb3NlKCk7XG4gICAgfVxuXG4gICAgc2hvdygpIHtcbiAgICAgIGlmICh0aGlzLl9lbGVtZW50LnN0eWxlLmRpc3BsYXkgPT09ICdub25lJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSB1c2Ugc2hvdyBvbiB2aXNpYmxlIGVsZW1lbnRzJyk7XG4gICAgICB9XG5cbiAgICAgIGlmICghKHRoaXMuX2lzV2l0aENvbnRlbnQoKSAmJiB0aGlzLl9pc0VuYWJsZWQpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc2hvd0V2ZW50ID0gRXZlbnRIYW5kbGVyX19kZWZhdWx0LmRlZmF1bHQudHJpZ2dlcih0aGlzLl9lbGVtZW50LCB0aGlzLmNvbnN0cnVjdG9yLmV2ZW50TmFtZShFVkVOVF9TSE9XKSk7XG4gICAgICBjb25zdCBzaGFkb3dSb290ID0gaW5kZXguZmluZFNoYWRvd1Jvb3QodGhpcy5fZWxlbWVudCk7XG5cbiAgICAgIGNvbnN0IGlzSW5UaGVEb20gPSAoc2hhZG93Um9vdCB8fCB0aGlzLl9lbGVtZW50Lm93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KS5jb250YWlucyh0aGlzLl9lbGVtZW50KTtcblxuICAgICAgaWYgKHNob3dFdmVudC5kZWZhdWx0UHJldmVudGVkIHx8ICFpc0luVGhlRG9tKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gLy8gdG9kbyB2NiByZW1vdmUgdGhpcyBPUiBtYWtlIGl0IG9wdGlvbmFsXG5cblxuICAgICAgaWYgKHRoaXMudGlwKSB7XG4gICAgICAgIHRoaXMudGlwLnJlbW92ZSgpO1xuICAgICAgICB0aGlzLnRpcCA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRpcCA9IHRoaXMuX2dldFRpcEVsZW1lbnQoKTtcblxuICAgICAgdGhpcy5fZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZGVzY3JpYmVkYnknLCB0aXAuZ2V0QXR0cmlidXRlKCdpZCcpKTtcblxuICAgICAgY29uc3Qge1xuICAgICAgICBjb250YWluZXJcbiAgICAgIH0gPSB0aGlzLl9jb25maWc7XG5cbiAgICAgIGlmICghdGhpcy5fZWxlbWVudC5vd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jb250YWlucyh0aGlzLnRpcCkpIHtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZCh0aXApO1xuICAgICAgICBFdmVudEhhbmRsZXJfX2RlZmF1bHQuZGVmYXVsdC50cmlnZ2VyKHRoaXMuX2VsZW1lbnQsIHRoaXMuY29uc3RydWN0b3IuZXZlbnROYW1lKEVWRU5UX0lOU0VSVEVEKSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9wb3BwZXIpIHtcbiAgICAgICAgdGhpcy5fcG9wcGVyLnVwZGF0ZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fcG9wcGVyID0gdGhpcy5fY3JlYXRlUG9wcGVyKHRpcCk7XG4gICAgICB9XG5cbiAgICAgIHRpcC5jbGFzc0xpc3QuYWRkKENMQVNTX05BTUVfU0hPVyk7IC8vIElmIHRoaXMgaXMgYSB0b3VjaC1lbmFibGVkIGRldmljZSB3ZSBhZGQgZXh0cmFcbiAgICAgIC8vIGVtcHR5IG1vdXNlb3ZlciBsaXN0ZW5lcnMgdG8gdGhlIGJvZHkncyBpbW1lZGlhdGUgY2hpbGRyZW47XG4gICAgICAvLyBvbmx5IG5lZWRlZCBiZWNhdXNlIG9mIGJyb2tlbiBldmVudCBkZWxlZ2F0aW9uIG9uIGlPU1xuICAgICAgLy8gaHR0cHM6Ly93d3cucXVpcmtzbW9kZS5vcmcvYmxvZy9hcmNoaXZlcy8yMDE0LzAyL21vdXNlX2V2ZW50X2J1Yi5odG1sXG5cbiAgICAgIGlmICgnb250b3VjaHN0YXJ0JyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHtcbiAgICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIFtdLmNvbmNhdCguLi5kb2N1bWVudC5ib2R5LmNoaWxkcmVuKSkge1xuICAgICAgICAgIEV2ZW50SGFuZGxlcl9fZGVmYXVsdC5kZWZhdWx0Lm9uKGVsZW1lbnQsICdtb3VzZW92ZXInLCBpbmRleC5ub29wKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBjb21wbGV0ZSA9ICgpID0+IHtcbiAgICAgICAgRXZlbnRIYW5kbGVyX19kZWZhdWx0LmRlZmF1bHQudHJpZ2dlcih0aGlzLl9lbGVtZW50LCB0aGlzLmNvbnN0cnVjdG9yLmV2ZW50TmFtZShFVkVOVF9TSE9XTikpO1xuXG4gICAgICAgIGlmICh0aGlzLl9pc0hvdmVyZWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgdGhpcy5fbGVhdmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2lzSG92ZXJlZCA9IGZhbHNlO1xuICAgICAgfTtcblxuICAgICAgdGhpcy5fcXVldWVDYWxsYmFjayhjb21wbGV0ZSwgdGhpcy50aXAsIHRoaXMuX2lzQW5pbWF0ZWQoKSk7XG4gICAgfVxuXG4gICAgaGlkZSgpIHtcbiAgICAgIGlmICghdGhpcy5faXNTaG93bigpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgaGlkZUV2ZW50ID0gRXZlbnRIYW5kbGVyX19kZWZhdWx0LmRlZmF1bHQudHJpZ2dlcih0aGlzLl9lbGVtZW50LCB0aGlzLmNvbnN0cnVjdG9yLmV2ZW50TmFtZShFVkVOVF9ISURFKSk7XG5cbiAgICAgIGlmIChoaWRlRXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRpcCA9IHRoaXMuX2dldFRpcEVsZW1lbnQoKTtcblxuICAgICAgdGlwLmNsYXNzTGlzdC5yZW1vdmUoQ0xBU1NfTkFNRV9TSE9XKTsgLy8gSWYgdGhpcyBpcyBhIHRvdWNoLWVuYWJsZWQgZGV2aWNlIHdlIHJlbW92ZSB0aGUgZXh0cmFcbiAgICAgIC8vIGVtcHR5IG1vdXNlb3ZlciBsaXN0ZW5lcnMgd2UgYWRkZWQgZm9yIGlPUyBzdXBwb3J0XG5cbiAgICAgIGlmICgnb250b3VjaHN0YXJ0JyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHtcbiAgICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIFtdLmNvbmNhdCguLi5kb2N1bWVudC5ib2R5LmNoaWxkcmVuKSkge1xuICAgICAgICAgIEV2ZW50SGFuZGxlcl9fZGVmYXVsdC5kZWZhdWx0Lm9mZihlbGVtZW50LCAnbW91c2VvdmVyJywgaW5kZXgubm9vcCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5fYWN0aXZlVHJpZ2dlcltUUklHR0VSX0NMSUNLXSA9IGZhbHNlO1xuICAgICAgdGhpcy5fYWN0aXZlVHJpZ2dlcltUUklHR0VSX0ZPQ1VTXSA9IGZhbHNlO1xuICAgICAgdGhpcy5fYWN0aXZlVHJpZ2dlcltUUklHR0VSX0hPVkVSXSA9IGZhbHNlO1xuICAgICAgdGhpcy5faXNIb3ZlcmVkID0gbnVsbDsgLy8gaXQgaXMgYSB0cmljayB0byBzdXBwb3J0IG1hbnVhbCB0cmlnZ2VyaW5nXG5cbiAgICAgIGNvbnN0IGNvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5faXNXaXRoQWN0aXZlVHJpZ2dlcigpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLl9pc0hvdmVyZWQpIHtcbiAgICAgICAgICB0aXAucmVtb3ZlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1kZXNjcmliZWRieScpO1xuXG4gICAgICAgIEV2ZW50SGFuZGxlcl9fZGVmYXVsdC5kZWZhdWx0LnRyaWdnZXIodGhpcy5fZWxlbWVudCwgdGhpcy5jb25zdHJ1Y3Rvci5ldmVudE5hbWUoRVZFTlRfSElEREVOKSk7XG5cbiAgICAgICAgdGhpcy5fZGlzcG9zZVBvcHBlcigpO1xuICAgICAgfTtcblxuICAgICAgdGhpcy5fcXVldWVDYWxsYmFjayhjb21wbGV0ZSwgdGhpcy50aXAsIHRoaXMuX2lzQW5pbWF0ZWQoKSk7XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgaWYgKHRoaXMuX3BvcHBlcikge1xuICAgICAgICB0aGlzLl9wb3BwZXIudXBkYXRlKCk7XG4gICAgICB9XG4gICAgfSAvLyBQcm90ZWN0ZWRcblxuXG4gICAgX2lzV2l0aENvbnRlbnQoKSB7XG4gICAgICByZXR1cm4gQm9vbGVhbih0aGlzLl9nZXRUaXRsZSgpKTtcbiAgICB9XG5cbiAgICBfZ2V0VGlwRWxlbWVudCgpIHtcbiAgICAgIGlmICghdGhpcy50aXApIHtcbiAgICAgICAgdGhpcy50aXAgPSB0aGlzLl9jcmVhdGVUaXBFbGVtZW50KHRoaXMuX25ld0NvbnRlbnQgfHwgdGhpcy5fZ2V0Q29udGVudEZvclRlbXBsYXRlKCkpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy50aXA7XG4gICAgfVxuXG4gICAgX2NyZWF0ZVRpcEVsZW1lbnQoY29udGVudCkge1xuICAgICAgY29uc3QgdGlwID0gdGhpcy5fZ2V0VGVtcGxhdGVGYWN0b3J5KGNvbnRlbnQpLnRvSHRtbCgpOyAvLyB0b2RvOiByZW1vdmUgdGhpcyBjaGVjayBvbiB2NlxuXG5cbiAgICAgIGlmICghdGlwKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICB0aXAuY2xhc3NMaXN0LnJlbW92ZShDTEFTU19OQU1FX0ZBREUsIENMQVNTX05BTUVfU0hPVyk7IC8vIHRvZG86IG9uIHY2IHRoZSBmb2xsb3dpbmcgY2FuIGJlIGFjaGlldmVkIHdpdGggQ1NTIG9ubHlcblxuICAgICAgdGlwLmNsYXNzTGlzdC5hZGQoYGJzLSR7dGhpcy5jb25zdHJ1Y3Rvci5OQU1FfS1hdXRvYCk7XG4gICAgICBjb25zdCB0aXBJZCA9IGluZGV4LmdldFVJRCh0aGlzLmNvbnN0cnVjdG9yLk5BTUUpLnRvU3RyaW5nKCk7XG4gICAgICB0aXAuc2V0QXR0cmlidXRlKCdpZCcsIHRpcElkKTtcblxuICAgICAgaWYgKHRoaXMuX2lzQW5pbWF0ZWQoKSkge1xuICAgICAgICB0aXAuY2xhc3NMaXN0LmFkZChDTEFTU19OQU1FX0ZBREUpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGlwO1xuICAgIH1cblxuICAgIHNldENvbnRlbnQoY29udGVudCkge1xuICAgICAgdGhpcy5fbmV3Q29udGVudCA9IGNvbnRlbnQ7XG5cbiAgICAgIGlmICh0aGlzLl9pc1Nob3duKCkpIHtcbiAgICAgICAgdGhpcy5fZGlzcG9zZVBvcHBlcigpO1xuXG4gICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgfVxuICAgIH1cblxuICAgIF9nZXRUZW1wbGF0ZUZhY3RvcnkoY29udGVudCkge1xuICAgICAgaWYgKHRoaXMuX3RlbXBsYXRlRmFjdG9yeSkge1xuICAgICAgICB0aGlzLl90ZW1wbGF0ZUZhY3RvcnkuY2hhbmdlQ29udGVudChjb250ZW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3RlbXBsYXRlRmFjdG9yeSA9IG5ldyBUZW1wbGF0ZUZhY3RvcnlfX2RlZmF1bHQuZGVmYXVsdCh7IC4uLnRoaXMuX2NvbmZpZyxcbiAgICAgICAgICAvLyB0aGUgYGNvbnRlbnRgIHZhciBoYXMgdG8gYmUgYWZ0ZXIgYHRoaXMuX2NvbmZpZ2BcbiAgICAgICAgICAvLyB0byBvdmVycmlkZSBjb25maWcuY29udGVudCBpbiBjYXNlIG9mIHBvcG92ZXJcbiAgICAgICAgICBjb250ZW50LFxuICAgICAgICAgIGV4dHJhQ2xhc3M6IHRoaXMuX3Jlc29sdmVQb3NzaWJsZUZ1bmN0aW9uKHRoaXMuX2NvbmZpZy5jdXN0b21DbGFzcylcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLl90ZW1wbGF0ZUZhY3Rvcnk7XG4gICAgfVxuXG4gICAgX2dldENvbnRlbnRGb3JUZW1wbGF0ZSgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIFtTRUxFQ1RPUl9UT09MVElQX0lOTkVSXTogdGhpcy5fZ2V0VGl0bGUoKVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBfZ2V0VGl0bGUoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVzb2x2ZVBvc3NpYmxlRnVuY3Rpb24odGhpcy5fY29uZmlnLnRpdGxlKSB8fCB0aGlzLl9lbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1icy1vcmlnaW5hbC10aXRsZScpO1xuICAgIH0gLy8gUHJpdmF0ZVxuXG5cbiAgICBfaW5pdGlhbGl6ZU9uRGVsZWdhdGVkVGFyZ2V0KGV2ZW50KSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5nZXRPckNyZWF0ZUluc3RhbmNlKGV2ZW50LmRlbGVnYXRlVGFyZ2V0LCB0aGlzLl9nZXREZWxlZ2F0ZUNvbmZpZygpKTtcbiAgICB9XG5cbiAgICBfaXNBbmltYXRlZCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jb25maWcuYW5pbWF0aW9uIHx8IHRoaXMudGlwICYmIHRoaXMudGlwLmNsYXNzTGlzdC5jb250YWlucyhDTEFTU19OQU1FX0ZBREUpO1xuICAgIH1cblxuICAgIF9pc1Nob3duKCkge1xuICAgICAgcmV0dXJuIHRoaXMudGlwICYmIHRoaXMudGlwLmNsYXNzTGlzdC5jb250YWlucyhDTEFTU19OQU1FX1NIT1cpO1xuICAgIH1cblxuICAgIF9jcmVhdGVQb3BwZXIodGlwKSB7XG4gICAgICBjb25zdCBwbGFjZW1lbnQgPSB0eXBlb2YgdGhpcy5fY29uZmlnLnBsYWNlbWVudCA9PT0gJ2Z1bmN0aW9uJyA/IHRoaXMuX2NvbmZpZy5wbGFjZW1lbnQuY2FsbCh0aGlzLCB0aXAsIHRoaXMuX2VsZW1lbnQpIDogdGhpcy5fY29uZmlnLnBsYWNlbWVudDtcbiAgICAgIGNvbnN0IGF0dGFjaG1lbnQgPSBBdHRhY2htZW50TWFwW3BsYWNlbWVudC50b1VwcGVyQ2FzZSgpXTtcbiAgICAgIHJldHVybiBQb3BwZXJfX25hbWVzcGFjZS5jcmVhdGVQb3BwZXIodGhpcy5fZWxlbWVudCwgdGlwLCB0aGlzLl9nZXRQb3BwZXJDb25maWcoYXR0YWNobWVudCkpO1xuICAgIH1cblxuICAgIF9nZXRPZmZzZXQoKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIG9mZnNldFxuICAgICAgfSA9IHRoaXMuX2NvbmZpZztcblxuICAgICAgaWYgKHR5cGVvZiBvZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBvZmZzZXQuc3BsaXQoJywnKS5tYXAodmFsdWUgPT4gTnVtYmVyLnBhcnNlSW50KHZhbHVlLCAxMCkpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIG9mZnNldCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gcG9wcGVyRGF0YSA9PiBvZmZzZXQocG9wcGVyRGF0YSwgdGhpcy5fZWxlbWVudCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBvZmZzZXQ7XG4gICAgfVxuXG4gICAgX3Jlc29sdmVQb3NzaWJsZUZ1bmN0aW9uKGFyZykge1xuICAgICAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbicgPyBhcmcuY2FsbCh0aGlzLl9lbGVtZW50KSA6IGFyZztcbiAgICB9XG5cbiAgICBfZ2V0UG9wcGVyQ29uZmlnKGF0dGFjaG1lbnQpIHtcbiAgICAgIGNvbnN0IGRlZmF1bHRCc1BvcHBlckNvbmZpZyA9IHtcbiAgICAgICAgcGxhY2VtZW50OiBhdHRhY2htZW50LFxuICAgICAgICBtb2RpZmllcnM6IFt7XG4gICAgICAgICAgbmFtZTogJ2ZsaXAnLFxuICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgIGZhbGxiYWNrUGxhY2VtZW50czogdGhpcy5fY29uZmlnLmZhbGxiYWNrUGxhY2VtZW50c1xuICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgIG5hbWU6ICdvZmZzZXQnLFxuICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgIG9mZnNldDogdGhpcy5fZ2V0T2Zmc2V0KClcbiAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICBuYW1lOiAncHJldmVudE92ZXJmbG93JyxcbiAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICBib3VuZGFyeTogdGhpcy5fY29uZmlnLmJvdW5kYXJ5XG4gICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgbmFtZTogJ2Fycm93JyxcbiAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICBlbGVtZW50OiBgLiR7dGhpcy5jb25zdHJ1Y3Rvci5OQU1FfS1hcnJvd2BcbiAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICBuYW1lOiAncHJlU2V0UGxhY2VtZW50JyxcbiAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgIHBoYXNlOiAnYmVmb3JlTWFpbicsXG4gICAgICAgICAgZm46IGRhdGEgPT4ge1xuICAgICAgICAgICAgLy8gUHJlLXNldCBQb3BwZXIncyBwbGFjZW1lbnQgYXR0cmlidXRlIGluIG9yZGVyIHRvIHJlYWQgdGhlIGFycm93IHNpemVzIHByb3Blcmx5LlxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlLCBQb3BwZXIgbWl4ZXMgdXAgdGhlIHdpZHRoIGFuZCBoZWlnaHQgZGltZW5zaW9ucyBzaW5jZSB0aGUgaW5pdGlhbCBhcnJvdyBzdHlsZSBpcyBmb3IgdG9wIHBsYWNlbWVudFxuICAgICAgICAgICAgdGhpcy5fZ2V0VGlwRWxlbWVudCgpLnNldEF0dHJpYnV0ZSgnZGF0YS1wb3BwZXItcGxhY2VtZW50JywgZGF0YS5zdGF0ZS5wbGFjZW1lbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfV1cbiAgICAgIH07XG4gICAgICByZXR1cm4geyAuLi5kZWZhdWx0QnNQb3BwZXJDb25maWcsXG4gICAgICAgIC4uLih0eXBlb2YgdGhpcy5fY29uZmlnLnBvcHBlckNvbmZpZyA9PT0gJ2Z1bmN0aW9uJyA/IHRoaXMuX2NvbmZpZy5wb3BwZXJDb25maWcoZGVmYXVsdEJzUG9wcGVyQ29uZmlnKSA6IHRoaXMuX2NvbmZpZy5wb3BwZXJDb25maWcpXG4gICAgICB9O1xuICAgIH1cblxuICAgIF9zZXRMaXN0ZW5lcnMoKSB7XG4gICAgICBjb25zdCB0cmlnZ2VycyA9IHRoaXMuX2NvbmZpZy50cmlnZ2VyLnNwbGl0KCcgJyk7XG5cbiAgICAgIGZvciAoY29uc3QgdHJpZ2dlciBvZiB0cmlnZ2Vycykge1xuICAgICAgICBpZiAodHJpZ2dlciA9PT0gJ2NsaWNrJykge1xuICAgICAgICAgIEV2ZW50SGFuZGxlcl9fZGVmYXVsdC5kZWZhdWx0Lm9uKHRoaXMuX2VsZW1lbnQsIHRoaXMuY29uc3RydWN0b3IuZXZlbnROYW1lKEVWRU5UX0NMSUNLKSwgdGhpcy5fY29uZmlnLnNlbGVjdG9yLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5faW5pdGlhbGl6ZU9uRGVsZWdhdGVkVGFyZ2V0KGV2ZW50KTtcblxuICAgICAgICAgICAgY29udGV4dC50b2dnbGUoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmICh0cmlnZ2VyICE9PSBUUklHR0VSX01BTlVBTCkge1xuICAgICAgICAgIGNvbnN0IGV2ZW50SW4gPSB0cmlnZ2VyID09PSBUUklHR0VSX0hPVkVSID8gdGhpcy5jb25zdHJ1Y3Rvci5ldmVudE5hbWUoRVZFTlRfTU9VU0VFTlRFUikgOiB0aGlzLmNvbnN0cnVjdG9yLmV2ZW50TmFtZShFVkVOVF9GT0NVU0lOKTtcbiAgICAgICAgICBjb25zdCBldmVudE91dCA9IHRyaWdnZXIgPT09IFRSSUdHRVJfSE9WRVIgPyB0aGlzLmNvbnN0cnVjdG9yLmV2ZW50TmFtZShFVkVOVF9NT1VTRUxFQVZFKSA6IHRoaXMuY29uc3RydWN0b3IuZXZlbnROYW1lKEVWRU5UX0ZPQ1VTT1VUKTtcbiAgICAgICAgICBFdmVudEhhbmRsZXJfX2RlZmF1bHQuZGVmYXVsdC5vbih0aGlzLl9lbGVtZW50LCBldmVudEluLCB0aGlzLl9jb25maWcuc2VsZWN0b3IsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLl9pbml0aWFsaXplT25EZWxlZ2F0ZWRUYXJnZXQoZXZlbnQpO1xuXG4gICAgICAgICAgICBjb250ZXh0Ll9hY3RpdmVUcmlnZ2VyW2V2ZW50LnR5cGUgPT09ICdmb2N1c2luJyA/IFRSSUdHRVJfRk9DVVMgOiBUUklHR0VSX0hPVkVSXSA9IHRydWU7XG5cbiAgICAgICAgICAgIGNvbnRleHQuX2VudGVyKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgRXZlbnRIYW5kbGVyX19kZWZhdWx0LmRlZmF1bHQub24odGhpcy5fZWxlbWVudCwgZXZlbnRPdXQsIHRoaXMuX2NvbmZpZy5zZWxlY3RvciwgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29udGV4dCA9IHRoaXMuX2luaXRpYWxpemVPbkRlbGVnYXRlZFRhcmdldChldmVudCk7XG5cbiAgICAgICAgICAgIGNvbnRleHQuX2FjdGl2ZVRyaWdnZXJbZXZlbnQudHlwZSA9PT0gJ2ZvY3Vzb3V0JyA/IFRSSUdHRVJfRk9DVVMgOiBUUklHR0VSX0hPVkVSXSA9IGNvbnRleHQuX2VsZW1lbnQuY29udGFpbnMoZXZlbnQucmVsYXRlZFRhcmdldCk7XG5cbiAgICAgICAgICAgIGNvbnRleHQuX2xlYXZlKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5faGlkZU1vZGFsSGFuZGxlciA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuX2VsZW1lbnQpIHtcbiAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgRXZlbnRIYW5kbGVyX19kZWZhdWx0LmRlZmF1bHQub24odGhpcy5fZWxlbWVudC5jbG9zZXN0KFNFTEVDVE9SX01PREFMKSwgRVZFTlRfTU9EQUxfSElERSwgdGhpcy5faGlkZU1vZGFsSGFuZGxlcik7XG4gICAgfVxuXG4gICAgX2ZpeFRpdGxlKCkge1xuICAgICAgY29uc3QgdGl0bGUgPSB0aGlzLl9lbGVtZW50LmdldEF0dHJpYnV0ZSgndGl0bGUnKTtcblxuICAgICAgaWYgKCF0aXRsZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5fZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnKSAmJiAhdGhpcy5fZWxlbWVudC50ZXh0Q29udGVudC50cmltKCkpIHtcbiAgICAgICAgdGhpcy5fZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCB0aXRsZSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2VsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLWJzLW9yaWdpbmFsLXRpdGxlJywgdGl0bGUpOyAvLyBETyBOT1QgVVNFIElULiBJcyBvbmx5IGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxuXG5cbiAgICAgIHRoaXMuX2VsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCd0aXRsZScpO1xuICAgIH1cblxuICAgIF9lbnRlcigpIHtcbiAgICAgIGlmICh0aGlzLl9pc1Nob3duKCkgfHwgdGhpcy5faXNIb3ZlcmVkKSB7XG4gICAgICAgIHRoaXMuX2lzSG92ZXJlZCA9IHRydWU7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5faXNIb3ZlcmVkID0gdHJ1ZTtcblxuICAgICAgdGhpcy5fc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLl9pc0hvdmVyZWQpIHtcbiAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgfVxuICAgICAgfSwgdGhpcy5fY29uZmlnLmRlbGF5LnNob3cpO1xuICAgIH1cblxuICAgIF9sZWF2ZSgpIHtcbiAgICAgIGlmICh0aGlzLl9pc1dpdGhBY3RpdmVUcmlnZ2VyKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9pc0hvdmVyZWQgPSBmYWxzZTtcblxuICAgICAgdGhpcy5fc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5faXNIb3ZlcmVkKSB7XG4gICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIH1cbiAgICAgIH0sIHRoaXMuX2NvbmZpZy5kZWxheS5oaWRlKTtcbiAgICB9XG5cbiAgICBfc2V0VGltZW91dChoYW5kbGVyLCB0aW1lb3V0KSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5fdGltZW91dCk7XG4gICAgICB0aGlzLl90aW1lb3V0ID0gc2V0VGltZW91dChoYW5kbGVyLCB0aW1lb3V0KTtcbiAgICB9XG5cbiAgICBfaXNXaXRoQWN0aXZlVHJpZ2dlcigpIHtcbiAgICAgIHJldHVybiBPYmplY3QudmFsdWVzKHRoaXMuX2FjdGl2ZVRyaWdnZXIpLmluY2x1ZGVzKHRydWUpO1xuICAgIH1cblxuICAgIF9nZXRDb25maWcoY29uZmlnKSB7XG4gICAgICBjb25zdCBkYXRhQXR0cmlidXRlcyA9IE1hbmlwdWxhdG9yX19kZWZhdWx0LmRlZmF1bHQuZ2V0RGF0YUF0dHJpYnV0ZXModGhpcy5fZWxlbWVudCk7XG5cbiAgICAgIGZvciAoY29uc3QgZGF0YUF0dHJpYnV0ZSBvZiBPYmplY3Qua2V5cyhkYXRhQXR0cmlidXRlcykpIHtcbiAgICAgICAgaWYgKERJU0FMTE9XRURfQVRUUklCVVRFUy5oYXMoZGF0YUF0dHJpYnV0ZSkpIHtcbiAgICAgICAgICBkZWxldGUgZGF0YUF0dHJpYnV0ZXNbZGF0YUF0dHJpYnV0ZV07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uZmlnID0geyAuLi5kYXRhQXR0cmlidXRlcyxcbiAgICAgICAgLi4uKHR5cGVvZiBjb25maWcgPT09ICdvYmplY3QnICYmIGNvbmZpZyA/IGNvbmZpZyA6IHt9KVxuICAgICAgfTtcbiAgICAgIGNvbmZpZyA9IHRoaXMuX21lcmdlQ29uZmlnT2JqKGNvbmZpZyk7XG4gICAgICBjb25maWcgPSB0aGlzLl9jb25maWdBZnRlck1lcmdlKGNvbmZpZyk7XG5cbiAgICAgIHRoaXMuX3R5cGVDaGVja0NvbmZpZyhjb25maWcpO1xuXG4gICAgICByZXR1cm4gY29uZmlnO1xuICAgIH1cblxuICAgIF9jb25maWdBZnRlck1lcmdlKGNvbmZpZykge1xuICAgICAgY29uZmlnLmNvbnRhaW5lciA9IGNvbmZpZy5jb250YWluZXIgPT09IGZhbHNlID8gZG9jdW1lbnQuYm9keSA6IGluZGV4LmdldEVsZW1lbnQoY29uZmlnLmNvbnRhaW5lcik7XG5cbiAgICAgIGlmICh0eXBlb2YgY29uZmlnLmRlbGF5ID09PSAnbnVtYmVyJykge1xuICAgICAgICBjb25maWcuZGVsYXkgPSB7XG4gICAgICAgICAgc2hvdzogY29uZmlnLmRlbGF5LFxuICAgICAgICAgIGhpZGU6IGNvbmZpZy5kZWxheVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGNvbmZpZy50aXRsZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgY29uZmlnLnRpdGxlID0gY29uZmlnLnRpdGxlLnRvU3RyaW5nKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgY29uZmlnLmNvbnRlbnQgPT09ICdudW1iZXInKSB7XG4gICAgICAgIGNvbmZpZy5jb250ZW50ID0gY29uZmlnLmNvbnRlbnQudG9TdHJpbmcoKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICB9XG5cbiAgICBfZ2V0RGVsZWdhdGVDb25maWcoKSB7XG4gICAgICBjb25zdCBjb25maWcgPSB7fTtcblxuICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5fY29uZmlnKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbnN0cnVjdG9yLkRlZmF1bHRba2V5XSAhPT0gdGhpcy5fY29uZmlnW2tleV0pIHtcbiAgICAgICAgICBjb25maWdba2V5XSA9IHRoaXMuX2NvbmZpZ1trZXldO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbmZpZy5zZWxlY3RvciA9IGZhbHNlO1xuICAgICAgY29uZmlnLnRyaWdnZXIgPSAnbWFudWFsJzsgLy8gSW4gdGhlIGZ1dHVyZSBjYW4gYmUgcmVwbGFjZWQgd2l0aDpcbiAgICAgIC8vIGNvbnN0IGtleXNXaXRoRGlmZmVyZW50VmFsdWVzID0gT2JqZWN0LmVudHJpZXModGhpcy5fY29uZmlnKS5maWx0ZXIoZW50cnkgPT4gdGhpcy5jb25zdHJ1Y3Rvci5EZWZhdWx0W2VudHJ5WzBdXSAhPT0gdGhpcy5fY29uZmlnW2VudHJ5WzBdXSlcbiAgICAgIC8vIGBPYmplY3QuZnJvbUVudHJpZXMoa2V5c1dpdGhEaWZmZXJlbnRWYWx1ZXMpYFxuXG4gICAgICByZXR1cm4gY29uZmlnO1xuICAgIH1cblxuICAgIF9kaXNwb3NlUG9wcGVyKCkge1xuICAgICAgaWYgKHRoaXMuX3BvcHBlcikge1xuICAgICAgICB0aGlzLl9wb3BwZXIuZGVzdHJveSgpO1xuXG4gICAgICAgIHRoaXMuX3BvcHBlciA9IG51bGw7XG4gICAgICB9XG4gICAgfSAvLyBTdGF0aWNcblxuXG4gICAgc3RhdGljIGpRdWVyeUludGVyZmFjZShjb25maWcpIHtcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBkYXRhID0gVG9vbHRpcC5nZXRPckNyZWF0ZUluc3RhbmNlKHRoaXMsIGNvbmZpZyk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb25maWcgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhW2NvbmZpZ10gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgTm8gbWV0aG9kIG5hbWVkIFwiJHtjb25maWd9XCJgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRhdGFbY29uZmlnXSgpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gIH1cbiAgLyoqXG4gICAqIGpRdWVyeVxuICAgKi9cblxuXG4gIGluZGV4LmRlZmluZUpRdWVyeVBsdWdpbihUb29sdGlwKTtcblxuICByZXR1cm4gVG9vbHRpcDtcblxufSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dG9vbHRpcC5qcy5tYXBcbiIsIi8qIVxuICAqIEJvb3RzdHJhcCBjb21wb25lbnQtZnVuY3Rpb25zLmpzIHY1LjIuMiAoaHR0cHM6Ly9nZXRib290c3RyYXAuY29tLylcbiAgKiBDb3B5cmlnaHQgMjAxMS0yMDIyIFRoZSBCb290c3RyYXAgQXV0aG9ycyAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2dyYXBocy9jb250cmlidXRvcnMpXG4gICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYWluL0xJQ0VOU0UpXG4gICovXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBmYWN0b3J5KGV4cG9ydHMsIHJlcXVpcmUoJy4uL2RvbS9ldmVudC1oYW5kbGVyJyksIHJlcXVpcmUoJy4vaW5kZXgnKSkgOlxuICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoWydleHBvcnRzJywgJy4uL2RvbS9ldmVudC1oYW5kbGVyJywgJy4vaW5kZXgnXSwgZmFjdG9yeSkgOlxuICAoZ2xvYmFsID0gdHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsVGhpcyA6IGdsb2JhbCB8fCBzZWxmLCBmYWN0b3J5KGdsb2JhbC5Db21wb25lbnRGdW5jdGlvbnMgPSB7fSwgZ2xvYmFsLkV2ZW50SGFuZGxlciwgZ2xvYmFsLkluZGV4KSk7XG59KSh0aGlzLCAoZnVuY3Rpb24gKGV4cG9ydHMsIEV2ZW50SGFuZGxlciwgaW5kZXgpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gIGNvbnN0IF9pbnRlcm9wRGVmYXVsdExlZ2FjeSA9IGUgPT4gZSAmJiB0eXBlb2YgZSA9PT0gJ29iamVjdCcgJiYgJ2RlZmF1bHQnIGluIGUgPyBlIDogeyBkZWZhdWx0OiBlIH07XG5cbiAgY29uc3QgRXZlbnRIYW5kbGVyX19kZWZhdWx0ID0gLyojX19QVVJFX18qL19pbnRlcm9wRGVmYXVsdExlZ2FjeShFdmVudEhhbmRsZXIpO1xuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBCb290c3RyYXAgKHY1LjIuMik6IHV0aWwvY29tcG9uZW50LWZ1bmN0aW9ucy5qc1xuICAgKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21haW4vTElDRU5TRSlcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgY29uc3QgZW5hYmxlRGlzbWlzc1RyaWdnZXIgPSAoY29tcG9uZW50LCBtZXRob2QgPSAnaGlkZScpID0+IHtcbiAgICBjb25zdCBjbGlja0V2ZW50ID0gYGNsaWNrLmRpc21pc3Mke2NvbXBvbmVudC5FVkVOVF9LRVl9YDtcbiAgICBjb25zdCBuYW1lID0gY29tcG9uZW50Lk5BTUU7XG4gICAgRXZlbnRIYW5kbGVyX19kZWZhdWx0LmRlZmF1bHQub24oZG9jdW1lbnQsIGNsaWNrRXZlbnQsIGBbZGF0YS1icy1kaXNtaXNzPVwiJHtuYW1lfVwiXWAsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgaWYgKFsnQScsICdBUkVBJ10uaW5jbHVkZXModGhpcy50YWdOYW1lKSkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaW5kZXguaXNEaXNhYmxlZCh0aGlzKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRhcmdldCA9IGluZGV4LmdldEVsZW1lbnRGcm9tU2VsZWN0b3IodGhpcykgfHwgdGhpcy5jbG9zZXN0KGAuJHtuYW1lfWApO1xuICAgICAgY29uc3QgaW5zdGFuY2UgPSBjb21wb25lbnQuZ2V0T3JDcmVhdGVJbnN0YW5jZSh0YXJnZXQpOyAvLyBNZXRob2QgYXJndW1lbnQgaXMgbGVmdCwgZm9yIEFsZXJ0IGFuZCBvbmx5LCBhcyBpdCBkb2Vzbid0IGltcGxlbWVudCB0aGUgJ2hpZGUnIG1ldGhvZFxuXG4gICAgICBpbnN0YW5jZVttZXRob2RdKCk7XG4gICAgfSk7XG4gIH07XG5cbiAgZXhwb3J0cy5lbmFibGVEaXNtaXNzVHJpZ2dlciA9IGVuYWJsZURpc21pc3NUcmlnZ2VyO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGV4cG9ydHMsIHsgX19lc01vZHVsZTogeyB2YWx1ZTogdHJ1ZSB9LCBbU3ltYm9sLnRvU3RyaW5nVGFnXTogeyB2YWx1ZTogJ01vZHVsZScgfSB9KTtcblxufSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29tcG9uZW50LWZ1bmN0aW9ucy5qcy5tYXBcbiIsIi8qIVxuICAqIEJvb3RzdHJhcCBjb25maWcuanMgdjUuMi4yIChodHRwczovL2dldGJvb3RzdHJhcC5jb20vKVxuICAqIENvcHlyaWdodCAyMDExLTIwMjIgVGhlIEJvb3RzdHJhcCBBdXRob3JzIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvZ3JhcGhzL2NvbnRyaWJ1dG9ycylcbiAgKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21haW4vTElDRU5TRSlcbiAgKi9cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKCcuL2luZGV4JyksIHJlcXVpcmUoJy4uL2RvbS9tYW5pcHVsYXRvcicpKSA6XG4gIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShbJy4vaW5kZXgnLCAnLi4vZG9tL21hbmlwdWxhdG9yJ10sIGZhY3RvcnkpIDpcbiAgKGdsb2JhbCA9IHR5cGVvZiBnbG9iYWxUaGlzICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbFRoaXMgOiBnbG9iYWwgfHwgc2VsZiwgZ2xvYmFsLkNvbmZpZyA9IGZhY3RvcnkoZ2xvYmFsLkluZGV4LCBnbG9iYWwuTWFuaXB1bGF0b3IpKTtcbn0pKHRoaXMsIChmdW5jdGlvbiAoaW5kZXgsIE1hbmlwdWxhdG9yKSB7ICd1c2Ugc3RyaWN0JztcblxuICBjb25zdCBfaW50ZXJvcERlZmF1bHRMZWdhY3kgPSBlID0+IGUgJiYgdHlwZW9mIGUgPT09ICdvYmplY3QnICYmICdkZWZhdWx0JyBpbiBlID8gZSA6IHsgZGVmYXVsdDogZSB9O1xuXG4gIGNvbnN0IE1hbmlwdWxhdG9yX19kZWZhdWx0ID0gLyojX19QVVJFX18qL19pbnRlcm9wRGVmYXVsdExlZ2FjeShNYW5pcHVsYXRvcik7XG5cbiAgLyoqXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIEJvb3RzdHJhcCAodjUuMi4yKTogdXRpbC9jb25maWcuanNcbiAgICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYWluL0xJQ0VOU0UpXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuICAvKipcbiAgICogQ2xhc3MgZGVmaW5pdGlvblxuICAgKi9cblxuICBjbGFzcyBDb25maWcge1xuICAgIC8vIEdldHRlcnNcbiAgICBzdGF0aWMgZ2V0IERlZmF1bHQoKSB7XG4gICAgICByZXR1cm4ge307XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBEZWZhdWx0VHlwZSgpIHtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IE5BTUUoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBoYXZlIHRvIGltcGxlbWVudCB0aGUgc3RhdGljIG1ldGhvZCBcIk5BTUVcIiwgZm9yIGVhY2ggY29tcG9uZW50IScpO1xuICAgIH1cblxuICAgIF9nZXRDb25maWcoY29uZmlnKSB7XG4gICAgICBjb25maWcgPSB0aGlzLl9tZXJnZUNvbmZpZ09iaihjb25maWcpO1xuICAgICAgY29uZmlnID0gdGhpcy5fY29uZmlnQWZ0ZXJNZXJnZShjb25maWcpO1xuXG4gICAgICB0aGlzLl90eXBlQ2hlY2tDb25maWcoY29uZmlnKTtcblxuICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICB9XG5cbiAgICBfY29uZmlnQWZ0ZXJNZXJnZShjb25maWcpIHtcbiAgICAgIHJldHVybiBjb25maWc7XG4gICAgfVxuXG4gICAgX21lcmdlQ29uZmlnT2JqKGNvbmZpZywgZWxlbWVudCkge1xuICAgICAgY29uc3QganNvbkNvbmZpZyA9IGluZGV4LmlzRWxlbWVudChlbGVtZW50KSA/IE1hbmlwdWxhdG9yX19kZWZhdWx0LmRlZmF1bHQuZ2V0RGF0YUF0dHJpYnV0ZShlbGVtZW50LCAnY29uZmlnJykgOiB7fTsgLy8gdHJ5IHRvIHBhcnNlXG5cbiAgICAgIHJldHVybiB7IC4uLnRoaXMuY29uc3RydWN0b3IuRGVmYXVsdCxcbiAgICAgICAgLi4uKHR5cGVvZiBqc29uQ29uZmlnID09PSAnb2JqZWN0JyA/IGpzb25Db25maWcgOiB7fSksXG4gICAgICAgIC4uLihpbmRleC5pc0VsZW1lbnQoZWxlbWVudCkgPyBNYW5pcHVsYXRvcl9fZGVmYXVsdC5kZWZhdWx0LmdldERhdGFBdHRyaWJ1dGVzKGVsZW1lbnQpIDoge30pLFxuICAgICAgICAuLi4odHlwZW9mIGNvbmZpZyA9PT0gJ29iamVjdCcgPyBjb25maWcgOiB7fSlcbiAgICAgIH07XG4gICAgfVxuXG4gICAgX3R5cGVDaGVja0NvbmZpZyhjb25maWcsIGNvbmZpZ1R5cGVzID0gdGhpcy5jb25zdHJ1Y3Rvci5EZWZhdWx0VHlwZSkge1xuICAgICAgZm9yIChjb25zdCBwcm9wZXJ0eSBvZiBPYmplY3Qua2V5cyhjb25maWdUeXBlcykpIHtcbiAgICAgICAgY29uc3QgZXhwZWN0ZWRUeXBlcyA9IGNvbmZpZ1R5cGVzW3Byb3BlcnR5XTtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBjb25maWdbcHJvcGVydHldO1xuICAgICAgICBjb25zdCB2YWx1ZVR5cGUgPSBpbmRleC5pc0VsZW1lbnQodmFsdWUpID8gJ2VsZW1lbnQnIDogaW5kZXgudG9UeXBlKHZhbHVlKTtcblxuICAgICAgICBpZiAoIW5ldyBSZWdFeHAoZXhwZWN0ZWRUeXBlcykudGVzdCh2YWx1ZVR5cGUpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJHt0aGlzLmNvbnN0cnVjdG9yLk5BTUUudG9VcHBlckNhc2UoKX06IE9wdGlvbiBcIiR7cHJvcGVydHl9XCIgcHJvdmlkZWQgdHlwZSBcIiR7dmFsdWVUeXBlfVwiIGJ1dCBleHBlY3RlZCB0eXBlIFwiJHtleHBlY3RlZFR5cGVzfVwiLmApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gIH1cblxuICByZXR1cm4gQ29uZmlnO1xuXG59KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb25maWcuanMubWFwXG4iLCIvKiFcbiAgKiBCb290c3RyYXAgaW5kZXguanMgdjUuMi4yIChodHRwczovL2dldGJvb3RzdHJhcC5jb20vKVxuICAqIENvcHlyaWdodCAyMDExLTIwMjIgVGhlIEJvb3RzdHJhcCBBdXRob3JzIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvZ3JhcGhzL2NvbnRyaWJ1dG9ycylcbiAgKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21haW4vTElDRU5TRSlcbiAgKi9cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IGZhY3RvcnkoZXhwb3J0cykgOlxuICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoWydleHBvcnRzJ10sIGZhY3RvcnkpIDpcbiAgKGdsb2JhbCA9IHR5cGVvZiBnbG9iYWxUaGlzICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbFRoaXMgOiBnbG9iYWwgfHwgc2VsZiwgZmFjdG9yeShnbG9iYWwuSW5kZXggPSB7fSkpO1xufSkodGhpcywgKGZ1bmN0aW9uIChleHBvcnRzKSB7ICd1c2Ugc3RyaWN0JztcblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQm9vdHN0cmFwICh2NS4yLjIpOiB1dGlsL2luZGV4LmpzXG4gICAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFpbi9MSUNFTlNFKVxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cbiAgY29uc3QgTUFYX1VJRCA9IDEwMDAwMDA7XG4gIGNvbnN0IE1JTExJU0VDT05EU19NVUxUSVBMSUVSID0gMTAwMDtcbiAgY29uc3QgVFJBTlNJVElPTl9FTkQgPSAndHJhbnNpdGlvbmVuZCc7IC8vIFNob3V0LW91dCBBbmd1cyBDcm9sbCAoaHR0cHM6Ly9nb28uZ2wvcHh3UUdwKVxuXG4gIGNvbnN0IHRvVHlwZSA9IG9iamVjdCA9PiB7XG4gICAgaWYgKG9iamVjdCA9PT0gbnVsbCB8fCBvYmplY3QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGAke29iamVjdH1gO1xuICAgIH1cblxuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqZWN0KS5tYXRjaCgvXFxzKFthLXpdKykvaSlbMV0udG9Mb3dlckNhc2UoKTtcbiAgfTtcbiAgLyoqXG4gICAqIFB1YmxpYyBVdGlsIEFQSVxuICAgKi9cblxuXG4gIGNvbnN0IGdldFVJRCA9IHByZWZpeCA9PiB7XG4gICAgZG8ge1xuICAgICAgcHJlZml4ICs9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE1BWF9VSUQpO1xuICAgIH0gd2hpbGUgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHByZWZpeCkpO1xuXG4gICAgcmV0dXJuIHByZWZpeDtcbiAgfTtcblxuICBjb25zdCBnZXRTZWxlY3RvciA9IGVsZW1lbnQgPT4ge1xuICAgIGxldCBzZWxlY3RvciA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWJzLXRhcmdldCcpO1xuXG4gICAgaWYgKCFzZWxlY3RvciB8fCBzZWxlY3RvciA9PT0gJyMnKSB7XG4gICAgICBsZXQgaHJlZkF0dHJpYnV0ZSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdocmVmJyk7IC8vIFRoZSBvbmx5IHZhbGlkIGNvbnRlbnQgdGhhdCBjb3VsZCBkb3VibGUgYXMgYSBzZWxlY3RvciBhcmUgSURzIG9yIGNsYXNzZXMsXG4gICAgICAvLyBzbyBldmVyeXRoaW5nIHN0YXJ0aW5nIHdpdGggYCNgIG9yIGAuYC4gSWYgYSBcInJlYWxcIiBVUkwgaXMgdXNlZCBhcyB0aGUgc2VsZWN0b3IsXG4gICAgICAvLyBgZG9jdW1lbnQucXVlcnlTZWxlY3RvcmAgd2lsbCByaWdodGZ1bGx5IGNvbXBsYWluIGl0IGlzIGludmFsaWQuXG4gICAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2lzc3Vlcy8zMjI3M1xuXG4gICAgICBpZiAoIWhyZWZBdHRyaWJ1dGUgfHwgIWhyZWZBdHRyaWJ1dGUuaW5jbHVkZXMoJyMnKSAmJiAhaHJlZkF0dHJpYnV0ZS5zdGFydHNXaXRoKCcuJykpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9IC8vIEp1c3QgaW4gY2FzZSBzb21lIENNUyBwdXRzIG91dCBhIGZ1bGwgVVJMIHdpdGggdGhlIGFuY2hvciBhcHBlbmRlZFxuXG5cbiAgICAgIGlmIChocmVmQXR0cmlidXRlLmluY2x1ZGVzKCcjJykgJiYgIWhyZWZBdHRyaWJ1dGUuc3RhcnRzV2l0aCgnIycpKSB7XG4gICAgICAgIGhyZWZBdHRyaWJ1dGUgPSBgIyR7aHJlZkF0dHJpYnV0ZS5zcGxpdCgnIycpWzFdfWA7XG4gICAgICB9XG5cbiAgICAgIHNlbGVjdG9yID0gaHJlZkF0dHJpYnV0ZSAmJiBocmVmQXR0cmlidXRlICE9PSAnIycgPyBocmVmQXR0cmlidXRlLnRyaW0oKSA6IG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGVjdG9yO1xuICB9O1xuXG4gIGNvbnN0IGdldFNlbGVjdG9yRnJvbUVsZW1lbnQgPSBlbGVtZW50ID0+IHtcbiAgICBjb25zdCBzZWxlY3RvciA9IGdldFNlbGVjdG9yKGVsZW1lbnQpO1xuXG4gICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcikgPyBzZWxlY3RvciA6IG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG5cbiAgY29uc3QgZ2V0RWxlbWVudEZyb21TZWxlY3RvciA9IGVsZW1lbnQgPT4ge1xuICAgIGNvbnN0IHNlbGVjdG9yID0gZ2V0U2VsZWN0b3IoZWxlbWVudCk7XG4gICAgcmV0dXJuIHNlbGVjdG9yID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcikgOiBudWxsO1xuICB9O1xuXG4gIGNvbnN0IGdldFRyYW5zaXRpb25EdXJhdGlvbkZyb21FbGVtZW50ID0gZWxlbWVudCA9PiB7XG4gICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9IC8vIEdldCB0cmFuc2l0aW9uLWR1cmF0aW9uIG9mIHRoZSBlbGVtZW50XG5cblxuICAgIGxldCB7XG4gICAgICB0cmFuc2l0aW9uRHVyYXRpb24sXG4gICAgICB0cmFuc2l0aW9uRGVsYXlcbiAgICB9ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XG4gICAgY29uc3QgZmxvYXRUcmFuc2l0aW9uRHVyYXRpb24gPSBOdW1iZXIucGFyc2VGbG9hdCh0cmFuc2l0aW9uRHVyYXRpb24pO1xuICAgIGNvbnN0IGZsb2F0VHJhbnNpdGlvbkRlbGF5ID0gTnVtYmVyLnBhcnNlRmxvYXQodHJhbnNpdGlvbkRlbGF5KTsgLy8gUmV0dXJuIDAgaWYgZWxlbWVudCBvciB0cmFuc2l0aW9uIGR1cmF0aW9uIGlzIG5vdCBmb3VuZFxuXG4gICAgaWYgKCFmbG9hdFRyYW5zaXRpb25EdXJhdGlvbiAmJiAhZmxvYXRUcmFuc2l0aW9uRGVsYXkpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH0gLy8gSWYgbXVsdGlwbGUgZHVyYXRpb25zIGFyZSBkZWZpbmVkLCB0YWtlIHRoZSBmaXJzdFxuXG5cbiAgICB0cmFuc2l0aW9uRHVyYXRpb24gPSB0cmFuc2l0aW9uRHVyYXRpb24uc3BsaXQoJywnKVswXTtcbiAgICB0cmFuc2l0aW9uRGVsYXkgPSB0cmFuc2l0aW9uRGVsYXkuc3BsaXQoJywnKVswXTtcbiAgICByZXR1cm4gKE51bWJlci5wYXJzZUZsb2F0KHRyYW5zaXRpb25EdXJhdGlvbikgKyBOdW1iZXIucGFyc2VGbG9hdCh0cmFuc2l0aW9uRGVsYXkpKSAqIE1JTExJU0VDT05EU19NVUxUSVBMSUVSO1xuICB9O1xuXG4gIGNvbnN0IHRyaWdnZXJUcmFuc2l0aW9uRW5kID0gZWxlbWVudCA9PiB7XG4gICAgZWxlbWVudC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChUUkFOU0lUSU9OX0VORCkpO1xuICB9O1xuXG4gIGNvbnN0IGlzRWxlbWVudCA9IG9iamVjdCA9PiB7XG4gICAgaWYgKCFvYmplY3QgfHwgdHlwZW9mIG9iamVjdCAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG9iamVjdC5qcXVlcnkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBvYmplY3QgPSBvYmplY3RbMF07XG4gICAgfVxuXG4gICAgcmV0dXJuIHR5cGVvZiBvYmplY3Qubm9kZVR5cGUgIT09ICd1bmRlZmluZWQnO1xuICB9O1xuXG4gIGNvbnN0IGdldEVsZW1lbnQgPSBvYmplY3QgPT4ge1xuICAgIC8vIGl0J3MgYSBqUXVlcnkgb2JqZWN0IG9yIGEgbm9kZSBlbGVtZW50XG4gICAgaWYgKGlzRWxlbWVudChvYmplY3QpKSB7XG4gICAgICByZXR1cm4gb2JqZWN0LmpxdWVyeSA/IG9iamVjdFswXSA6IG9iamVjdDtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG9iamVjdCA9PT0gJ3N0cmluZycgJiYgb2JqZWN0Lmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG9iamVjdCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG5cbiAgY29uc3QgaXNWaXNpYmxlID0gZWxlbWVudCA9PiB7XG4gICAgaWYgKCFpc0VsZW1lbnQoZWxlbWVudCkgfHwgZWxlbWVudC5nZXRDbGllbnRSZWN0cygpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IGVsZW1lbnRJc1Zpc2libGUgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUoJ3Zpc2liaWxpdHknKSA9PT0gJ3Zpc2libGUnOyAvLyBIYW5kbGUgYGRldGFpbHNgIGVsZW1lbnQgYXMgaXRzIGNvbnRlbnQgbWF5IGZhbHNpZSBhcHBlYXIgdmlzaWJsZSB3aGVuIGl0IGlzIGNsb3NlZFxuXG4gICAgY29uc3QgY2xvc2VkRGV0YWlscyA9IGVsZW1lbnQuY2xvc2VzdCgnZGV0YWlsczpub3QoW29wZW5dKScpO1xuXG4gICAgaWYgKCFjbG9zZWREZXRhaWxzKSB7XG4gICAgICByZXR1cm4gZWxlbWVudElzVmlzaWJsZTtcbiAgICB9XG5cbiAgICBpZiAoY2xvc2VkRGV0YWlscyAhPT0gZWxlbWVudCkge1xuICAgICAgY29uc3Qgc3VtbWFyeSA9IGVsZW1lbnQuY2xvc2VzdCgnc3VtbWFyeScpO1xuXG4gICAgICBpZiAoc3VtbWFyeSAmJiBzdW1tYXJ5LnBhcmVudE5vZGUgIT09IGNsb3NlZERldGFpbHMpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3VtbWFyeSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGVsZW1lbnRJc1Zpc2libGU7XG4gIH07XG5cbiAgY29uc3QgaXNEaXNhYmxlZCA9IGVsZW1lbnQgPT4ge1xuICAgIGlmICghZWxlbWVudCB8fCBlbGVtZW50Lm5vZGVUeXBlICE9PSBOb2RlLkVMRU1FTlRfTk9ERSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNhYmxlZCcpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGVsZW1lbnQuZGlzYWJsZWQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gZWxlbWVudC5kaXNhYmxlZDtcbiAgICB9XG5cbiAgICByZXR1cm4gZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2Rpc2FibGVkJykgJiYgZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJykgIT09ICdmYWxzZSc7XG4gIH07XG5cbiAgY29uc3QgZmluZFNoYWRvd1Jvb3QgPSBlbGVtZW50ID0+IHtcbiAgICBpZiAoIWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hdHRhY2hTaGFkb3cpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gLy8gQ2FuIGZpbmQgdGhlIHNoYWRvdyByb290IG90aGVyd2lzZSBpdCdsbCByZXR1cm4gdGhlIGRvY3VtZW50XG5cblxuICAgIGlmICh0eXBlb2YgZWxlbWVudC5nZXRSb290Tm9kZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc3Qgcm9vdCA9IGVsZW1lbnQuZ2V0Um9vdE5vZGUoKTtcbiAgICAgIHJldHVybiByb290IGluc3RhbmNlb2YgU2hhZG93Um9vdCA/IHJvb3QgOiBudWxsO1xuICAgIH1cblxuICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgU2hhZG93Um9vdCkge1xuICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfSAvLyB3aGVuIHdlIGRvbid0IGZpbmQgYSBzaGFkb3cgcm9vdFxuXG5cbiAgICBpZiAoIWVsZW1lbnQucGFyZW50Tm9kZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpbmRTaGFkb3dSb290KGVsZW1lbnQucGFyZW50Tm9kZSk7XG4gIH07XG5cbiAgY29uc3Qgbm9vcCA9ICgpID0+IHt9O1xuICAvKipcbiAgICogVHJpY2sgdG8gcmVzdGFydCBhbiBlbGVtZW50J3MgYW5pbWF0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAgICogQHJldHVybiB2b2lkXG4gICAqXG4gICAqIEBzZWUgaHR0cHM6Ly93d3cuY2hhcmlzdGhlby5pby9ibG9nLzIwMjEvMDIvcmVzdGFydC1hLWNzcy1hbmltYXRpb24td2l0aC1qYXZhc2NyaXB0LyNyZXN0YXJ0aW5nLWEtY3NzLWFuaW1hdGlvblxuICAgKi9cblxuXG4gIGNvbnN0IHJlZmxvdyA9IGVsZW1lbnQgPT4ge1xuICAgIGVsZW1lbnQub2Zmc2V0SGVpZ2h0OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC1leHByZXNzaW9uc1xuICB9O1xuXG4gIGNvbnN0IGdldGpRdWVyeSA9ICgpID0+IHtcbiAgICBpZiAod2luZG93LmpRdWVyeSAmJiAhZG9jdW1lbnQuYm9keS5oYXNBdHRyaWJ1dGUoJ2RhdGEtYnMtbm8tanF1ZXJ5JykpIHtcbiAgICAgIHJldHVybiB3aW5kb3cualF1ZXJ5O1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9O1xuXG4gIGNvbnN0IERPTUNvbnRlbnRMb2FkZWRDYWxsYmFja3MgPSBbXTtcblxuICBjb25zdCBvbkRPTUNvbnRlbnRMb2FkZWQgPSBjYWxsYmFjayA9PiB7XG4gICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdsb2FkaW5nJykge1xuICAgICAgLy8gYWRkIGxpc3RlbmVyIG9uIHRoZSBmaXJzdCBjYWxsIHdoZW4gdGhlIGRvY3VtZW50IGlzIGluIGxvYWRpbmcgc3RhdGVcbiAgICAgIGlmICghRE9NQ29udGVudExvYWRlZENhbGxiYWNrcy5sZW5ndGgpIHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGNhbGxiYWNrIG9mIERPTUNvbnRlbnRMb2FkZWRDYWxsYmFja3MpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgRE9NQ29udGVudExvYWRlZENhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaXNSVEwgPSAoKSA9PiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuZGlyID09PSAncnRsJztcblxuICBjb25zdCBkZWZpbmVKUXVlcnlQbHVnaW4gPSBwbHVnaW4gPT4ge1xuICAgIG9uRE9NQ29udGVudExvYWRlZCgoKSA9PiB7XG4gICAgICBjb25zdCAkID0gZ2V0alF1ZXJ5KCk7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cblxuICAgICAgaWYgKCQpIHtcbiAgICAgICAgY29uc3QgbmFtZSA9IHBsdWdpbi5OQU1FO1xuICAgICAgICBjb25zdCBKUVVFUllfTk9fQ09ORkxJQ1QgPSAkLmZuW25hbWVdO1xuICAgICAgICAkLmZuW25hbWVdID0gcGx1Z2luLmpRdWVyeUludGVyZmFjZTtcbiAgICAgICAgJC5mbltuYW1lXS5Db25zdHJ1Y3RvciA9IHBsdWdpbjtcblxuICAgICAgICAkLmZuW25hbWVdLm5vQ29uZmxpY3QgPSAoKSA9PiB7XG4gICAgICAgICAgJC5mbltuYW1lXSA9IEpRVUVSWV9OT19DT05GTElDVDtcbiAgICAgICAgICByZXR1cm4gcGx1Z2luLmpRdWVyeUludGVyZmFjZTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBleGVjdXRlID0gY2FsbGJhY2sgPT4ge1xuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGV4ZWN1dGVBZnRlclRyYW5zaXRpb24gPSAoY2FsbGJhY2ssIHRyYW5zaXRpb25FbGVtZW50LCB3YWl0Rm9yVHJhbnNpdGlvbiA9IHRydWUpID0+IHtcbiAgICBpZiAoIXdhaXRGb3JUcmFuc2l0aW9uKSB7XG4gICAgICBleGVjdXRlKGNhbGxiYWNrKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBkdXJhdGlvblBhZGRpbmcgPSA1O1xuICAgIGNvbnN0IGVtdWxhdGVkRHVyYXRpb24gPSBnZXRUcmFuc2l0aW9uRHVyYXRpb25Gcm9tRWxlbWVudCh0cmFuc2l0aW9uRWxlbWVudCkgKyBkdXJhdGlvblBhZGRpbmc7XG4gICAgbGV0IGNhbGxlZCA9IGZhbHNlO1xuXG4gICAgY29uc3QgaGFuZGxlciA9ICh7XG4gICAgICB0YXJnZXRcbiAgICB9KSA9PiB7XG4gICAgICBpZiAodGFyZ2V0ICE9PSB0cmFuc2l0aW9uRWxlbWVudCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNhbGxlZCA9IHRydWU7XG4gICAgICB0cmFuc2l0aW9uRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFRSQU5TSVRJT05fRU5ELCBoYW5kbGVyKTtcbiAgICAgIGV4ZWN1dGUoY2FsbGJhY2spO1xuICAgIH07XG5cbiAgICB0cmFuc2l0aW9uRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFRSQU5TSVRJT05fRU5ELCBoYW5kbGVyKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICghY2FsbGVkKSB7XG4gICAgICAgIHRyaWdnZXJUcmFuc2l0aW9uRW5kKHRyYW5zaXRpb25FbGVtZW50KTtcbiAgICAgIH1cbiAgICB9LCBlbXVsYXRlZER1cmF0aW9uKTtcbiAgfTtcbiAgLyoqXG4gICAqIFJldHVybiB0aGUgcHJldmlvdXMvbmV4dCBlbGVtZW50IG9mIGEgbGlzdC5cbiAgICpcbiAgICogQHBhcmFtIHthcnJheX0gbGlzdCAgICBUaGUgbGlzdCBvZiBlbGVtZW50c1xuICAgKiBAcGFyYW0gYWN0aXZlRWxlbWVudCAgIFRoZSBhY3RpdmUgZWxlbWVudFxuICAgKiBAcGFyYW0gc2hvdWxkR2V0TmV4dCAgIENob29zZSB0byBnZXQgbmV4dCBvciBwcmV2aW91cyBlbGVtZW50XG4gICAqIEBwYXJhbSBpc0N5Y2xlQWxsb3dlZFxuICAgKiBAcmV0dXJuIHtFbGVtZW50fGVsZW19IFRoZSBwcm9wZXIgZWxlbWVudFxuICAgKi9cblxuXG4gIGNvbnN0IGdldE5leHRBY3RpdmVFbGVtZW50ID0gKGxpc3QsIGFjdGl2ZUVsZW1lbnQsIHNob3VsZEdldE5leHQsIGlzQ3ljbGVBbGxvd2VkKSA9PiB7XG4gICAgY29uc3QgbGlzdExlbmd0aCA9IGxpc3QubGVuZ3RoO1xuICAgIGxldCBpbmRleCA9IGxpc3QuaW5kZXhPZihhY3RpdmVFbGVtZW50KTsgLy8gaWYgdGhlIGVsZW1lbnQgZG9lcyBub3QgZXhpc3QgaW4gdGhlIGxpc3QgcmV0dXJuIGFuIGVsZW1lbnRcbiAgICAvLyBkZXBlbmRpbmcgb24gdGhlIGRpcmVjdGlvbiBhbmQgaWYgY3ljbGUgaXMgYWxsb3dlZFxuXG4gICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgcmV0dXJuICFzaG91bGRHZXROZXh0ICYmIGlzQ3ljbGVBbGxvd2VkID8gbGlzdFtsaXN0TGVuZ3RoIC0gMV0gOiBsaXN0WzBdO1xuICAgIH1cblxuICAgIGluZGV4ICs9IHNob3VsZEdldE5leHQgPyAxIDogLTE7XG5cbiAgICBpZiAoaXNDeWNsZUFsbG93ZWQpIHtcbiAgICAgIGluZGV4ID0gKGluZGV4ICsgbGlzdExlbmd0aCkgJSBsaXN0TGVuZ3RoO1xuICAgIH1cblxuICAgIHJldHVybiBsaXN0W01hdGgubWF4KDAsIE1hdGgubWluKGluZGV4LCBsaXN0TGVuZ3RoIC0gMSkpXTtcbiAgfTtcblxuICBleHBvcnRzLmRlZmluZUpRdWVyeVBsdWdpbiA9IGRlZmluZUpRdWVyeVBsdWdpbjtcbiAgZXhwb3J0cy5leGVjdXRlID0gZXhlY3V0ZTtcbiAgZXhwb3J0cy5leGVjdXRlQWZ0ZXJUcmFuc2l0aW9uID0gZXhlY3V0ZUFmdGVyVHJhbnNpdGlvbjtcbiAgZXhwb3J0cy5maW5kU2hhZG93Um9vdCA9IGZpbmRTaGFkb3dSb290O1xuICBleHBvcnRzLmdldEVsZW1lbnQgPSBnZXRFbGVtZW50O1xuICBleHBvcnRzLmdldEVsZW1lbnRGcm9tU2VsZWN0b3IgPSBnZXRFbGVtZW50RnJvbVNlbGVjdG9yO1xuICBleHBvcnRzLmdldE5leHRBY3RpdmVFbGVtZW50ID0gZ2V0TmV4dEFjdGl2ZUVsZW1lbnQ7XG4gIGV4cG9ydHMuZ2V0U2VsZWN0b3JGcm9tRWxlbWVudCA9IGdldFNlbGVjdG9yRnJvbUVsZW1lbnQ7XG4gIGV4cG9ydHMuZ2V0VHJhbnNpdGlvbkR1cmF0aW9uRnJvbUVsZW1lbnQgPSBnZXRUcmFuc2l0aW9uRHVyYXRpb25Gcm9tRWxlbWVudDtcbiAgZXhwb3J0cy5nZXRVSUQgPSBnZXRVSUQ7XG4gIGV4cG9ydHMuZ2V0alF1ZXJ5ID0gZ2V0alF1ZXJ5O1xuICBleHBvcnRzLmlzRGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICBleHBvcnRzLmlzRWxlbWVudCA9IGlzRWxlbWVudDtcbiAgZXhwb3J0cy5pc1JUTCA9IGlzUlRMO1xuICBleHBvcnRzLmlzVmlzaWJsZSA9IGlzVmlzaWJsZTtcbiAgZXhwb3J0cy5ub29wID0gbm9vcDtcbiAgZXhwb3J0cy5vbkRPTUNvbnRlbnRMb2FkZWQgPSBvbkRPTUNvbnRlbnRMb2FkZWQ7XG4gIGV4cG9ydHMucmVmbG93ID0gcmVmbG93O1xuICBleHBvcnRzLnRvVHlwZSA9IHRvVHlwZTtcbiAgZXhwb3J0cy50cmlnZ2VyVHJhbnNpdGlvbkVuZCA9IHRyaWdnZXJUcmFuc2l0aW9uRW5kO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGV4cG9ydHMsIHsgX19lc01vZHVsZTogeyB2YWx1ZTogdHJ1ZSB9LCBbU3ltYm9sLnRvU3RyaW5nVGFnXTogeyB2YWx1ZTogJ01vZHVsZScgfSB9KTtcblxufSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwXG4iLCIvKiFcbiAgKiBCb290c3RyYXAgc2FuaXRpemVyLmpzIHY1LjIuMiAoaHR0cHM6Ly9nZXRib290c3RyYXAuY29tLylcbiAgKiBDb3B5cmlnaHQgMjAxMS0yMDIyIFRoZSBCb290c3RyYXAgQXV0aG9ycyAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2dyYXBocy9jb250cmlidXRvcnMpXG4gICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYWluL0xJQ0VOU0UpXG4gICovXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBmYWN0b3J5KGV4cG9ydHMpIDpcbiAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKFsnZXhwb3J0cyddLCBmYWN0b3J5KSA6XG4gIChnbG9iYWwgPSB0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWxUaGlzIDogZ2xvYmFsIHx8IHNlbGYsIGZhY3RvcnkoZ2xvYmFsLlNhbml0aXplciA9IHt9KSk7XG59KSh0aGlzLCAoZnVuY3Rpb24gKGV4cG9ydHMpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gIC8qKlxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBCb290c3RyYXAgKHY1LjIuMik6IHV0aWwvc2FuaXRpemVyLmpzXG4gICAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFpbi9MSUNFTlNFKVxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKi9cbiAgY29uc3QgdXJpQXR0cmlidXRlcyA9IG5ldyBTZXQoWydiYWNrZ3JvdW5kJywgJ2NpdGUnLCAnaHJlZicsICdpdGVtdHlwZScsICdsb25nZGVzYycsICdwb3N0ZXInLCAnc3JjJywgJ3hsaW5rOmhyZWYnXSk7XG4gIGNvbnN0IEFSSUFfQVRUUklCVVRFX1BBVFRFUk4gPSAvXmFyaWEtW1xcdy1dKiQvaTtcbiAgLyoqXG4gICAqIEEgcGF0dGVybiB0aGF0IHJlY29nbml6ZXMgYSBjb21tb25seSB1c2VmdWwgc3Vic2V0IG9mIFVSTHMgdGhhdCBhcmUgc2FmZS5cbiAgICpcbiAgICogU2hvdXQtb3V0IHRvIEFuZ3VsYXIgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9ibG9iLzEyLjIueC9wYWNrYWdlcy9jb3JlL3NyYy9zYW5pdGl6YXRpb24vdXJsX3Nhbml0aXplci50c1xuICAgKi9cblxuICBjb25zdCBTQUZFX1VSTF9QQVRURVJOID0gL14oPzooPzpodHRwcz98bWFpbHRvfGZ0cHx0ZWx8ZmlsZXxzbXMpOnxbXiMmLzo/XSooPzpbIy8/XXwkKSkvaTtcbiAgLyoqXG4gICAqIEEgcGF0dGVybiB0aGF0IG1hdGNoZXMgc2FmZSBkYXRhIFVSTHMuIE9ubHkgbWF0Y2hlcyBpbWFnZSwgdmlkZW8gYW5kIGF1ZGlvIHR5cGVzLlxuICAgKlxuICAgKiBTaG91dC1vdXQgdG8gQW5ndWxhciBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2Jsb2IvMTIuMi54L3BhY2thZ2VzL2NvcmUvc3JjL3Nhbml0aXphdGlvbi91cmxfc2FuaXRpemVyLnRzXG4gICAqL1xuXG4gIGNvbnN0IERBVEFfVVJMX1BBVFRFUk4gPSAvXmRhdGE6KD86aW1hZ2VcXC8oPzpibXB8Z2lmfGpwZWd8anBnfHBuZ3x0aWZmfHdlYnApfHZpZGVvXFwvKD86bXBlZ3xtcDR8b2dnfHdlYm0pfGF1ZGlvXFwvKD86bXAzfG9nYXxvZ2d8b3B1cykpO2Jhc2U2NCxbXFxkKy9hLXpdKz0qJC9pO1xuXG4gIGNvbnN0IGFsbG93ZWRBdHRyaWJ1dGUgPSAoYXR0cmlidXRlLCBhbGxvd2VkQXR0cmlidXRlTGlzdCkgPT4ge1xuICAgIGNvbnN0IGF0dHJpYnV0ZU5hbWUgPSBhdHRyaWJ1dGUubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcblxuICAgIGlmIChhbGxvd2VkQXR0cmlidXRlTGlzdC5pbmNsdWRlcyhhdHRyaWJ1dGVOYW1lKSkge1xuICAgICAgaWYgKHVyaUF0dHJpYnV0ZXMuaGFzKGF0dHJpYnV0ZU5hbWUpKSB7XG4gICAgICAgIHJldHVybiBCb29sZWFuKFNBRkVfVVJMX1BBVFRFUk4udGVzdChhdHRyaWJ1dGUubm9kZVZhbHVlKSB8fCBEQVRBX1VSTF9QQVRURVJOLnRlc3QoYXR0cmlidXRlLm5vZGVWYWx1ZSkpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IC8vIENoZWNrIGlmIGEgcmVndWxhciBleHByZXNzaW9uIHZhbGlkYXRlcyB0aGUgYXR0cmlidXRlLlxuXG5cbiAgICByZXR1cm4gYWxsb3dlZEF0dHJpYnV0ZUxpc3QuZmlsdGVyKGF0dHJpYnV0ZVJlZ2V4ID0+IGF0dHJpYnV0ZVJlZ2V4IGluc3RhbmNlb2YgUmVnRXhwKS5zb21lKHJlZ2V4ID0+IHJlZ2V4LnRlc3QoYXR0cmlidXRlTmFtZSkpO1xuICB9O1xuXG4gIGNvbnN0IERlZmF1bHRBbGxvd2xpc3QgPSB7XG4gICAgLy8gR2xvYmFsIGF0dHJpYnV0ZXMgYWxsb3dlZCBvbiBhbnkgc3VwcGxpZWQgZWxlbWVudCBiZWxvdy5cbiAgICAnKic6IFsnY2xhc3MnLCAnZGlyJywgJ2lkJywgJ2xhbmcnLCAncm9sZScsIEFSSUFfQVRUUklCVVRFX1BBVFRFUk5dLFxuICAgIGE6IFsndGFyZ2V0JywgJ2hyZWYnLCAndGl0bGUnLCAncmVsJ10sXG4gICAgYXJlYTogW10sXG4gICAgYjogW10sXG4gICAgYnI6IFtdLFxuICAgIGNvbDogW10sXG4gICAgY29kZTogW10sXG4gICAgZGl2OiBbXSxcbiAgICBlbTogW10sXG4gICAgaHI6IFtdLFxuICAgIGgxOiBbXSxcbiAgICBoMjogW10sXG4gICAgaDM6IFtdLFxuICAgIGg0OiBbXSxcbiAgICBoNTogW10sXG4gICAgaDY6IFtdLFxuICAgIGk6IFtdLFxuICAgIGltZzogWydzcmMnLCAnc3Jjc2V0JywgJ2FsdCcsICd0aXRsZScsICd3aWR0aCcsICdoZWlnaHQnXSxcbiAgICBsaTogW10sXG4gICAgb2w6IFtdLFxuICAgIHA6IFtdLFxuICAgIHByZTogW10sXG4gICAgczogW10sXG4gICAgc21hbGw6IFtdLFxuICAgIHNwYW46IFtdLFxuICAgIHN1YjogW10sXG4gICAgc3VwOiBbXSxcbiAgICBzdHJvbmc6IFtdLFxuICAgIHU6IFtdLFxuICAgIHVsOiBbXVxuICB9O1xuICBmdW5jdGlvbiBzYW5pdGl6ZUh0bWwodW5zYWZlSHRtbCwgYWxsb3dMaXN0LCBzYW5pdGl6ZUZ1bmN0aW9uKSB7XG4gICAgaWYgKCF1bnNhZmVIdG1sLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHVuc2FmZUh0bWw7XG4gICAgfVxuXG4gICAgaWYgKHNhbml0aXplRnVuY3Rpb24gJiYgdHlwZW9mIHNhbml0aXplRnVuY3Rpb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBzYW5pdGl6ZUZ1bmN0aW9uKHVuc2FmZUh0bWwpO1xuICAgIH1cblxuICAgIGNvbnN0IGRvbVBhcnNlciA9IG5ldyB3aW5kb3cuRE9NUGFyc2VyKCk7XG4gICAgY29uc3QgY3JlYXRlZERvY3VtZW50ID0gZG9tUGFyc2VyLnBhcnNlRnJvbVN0cmluZyh1bnNhZmVIdG1sLCAndGV4dC9odG1sJyk7XG4gICAgY29uc3QgZWxlbWVudHMgPSBbXS5jb25jYXQoLi4uY3JlYXRlZERvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvckFsbCgnKicpKTtcblxuICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiBlbGVtZW50cykge1xuICAgICAgY29uc3QgZWxlbWVudE5hbWUgPSBlbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgIGlmICghT2JqZWN0LmtleXMoYWxsb3dMaXN0KS5pbmNsdWRlcyhlbGVtZW50TmFtZSkpIHtcbiAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGF0dHJpYnV0ZUxpc3QgPSBbXS5jb25jYXQoLi4uZWxlbWVudC5hdHRyaWJ1dGVzKTtcbiAgICAgIGNvbnN0IGFsbG93ZWRBdHRyaWJ1dGVzID0gW10uY29uY2F0KGFsbG93TGlzdFsnKiddIHx8IFtdLCBhbGxvd0xpc3RbZWxlbWVudE5hbWVdIHx8IFtdKTtcblxuICAgICAgZm9yIChjb25zdCBhdHRyaWJ1dGUgb2YgYXR0cmlidXRlTGlzdCkge1xuICAgICAgICBpZiAoIWFsbG93ZWRBdHRyaWJ1dGUoYXR0cmlidXRlLCBhbGxvd2VkQXR0cmlidXRlcykpIHtcbiAgICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShhdHRyaWJ1dGUubm9kZU5hbWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNyZWF0ZWREb2N1bWVudC5ib2R5LmlubmVySFRNTDtcbiAgfVxuXG4gIGV4cG9ydHMuRGVmYXVsdEFsbG93bGlzdCA9IERlZmF1bHRBbGxvd2xpc3Q7XG4gIGV4cG9ydHMuc2FuaXRpemVIdG1sID0gc2FuaXRpemVIdG1sO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGV4cG9ydHMsIHsgX19lc01vZHVsZTogeyB2YWx1ZTogdHJ1ZSB9LCBbU3ltYm9sLnRvU3RyaW5nVGFnXTogeyB2YWx1ZTogJ01vZHVsZScgfSB9KTtcblxufSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2FuaXRpemVyLmpzLm1hcFxuIiwiLyohXG4gICogQm9vdHN0cmFwIHRlbXBsYXRlLWZhY3RvcnkuanMgdjUuMi4yIChodHRwczovL2dldGJvb3RzdHJhcC5jb20vKVxuICAqIENvcHlyaWdodCAyMDExLTIwMjIgVGhlIEJvb3RzdHJhcCBBdXRob3JzIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvZ3JhcGhzL2NvbnRyaWJ1dG9ycylcbiAgKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21haW4vTElDRU5TRSlcbiAgKi9cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKCcuL3Nhbml0aXplcicpLCByZXF1aXJlKCcuL2luZGV4JyksIHJlcXVpcmUoJy4uL2RvbS9zZWxlY3Rvci1lbmdpbmUnKSwgcmVxdWlyZSgnLi9jb25maWcnKSkgOlxuICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoWycuL3Nhbml0aXplcicsICcuL2luZGV4JywgJy4uL2RvbS9zZWxlY3Rvci1lbmdpbmUnLCAnLi9jb25maWcnXSwgZmFjdG9yeSkgOlxuICAoZ2xvYmFsID0gdHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsVGhpcyA6IGdsb2JhbCB8fCBzZWxmLCBnbG9iYWwuVGVtcGxhdGVGYWN0b3J5ID0gZmFjdG9yeShnbG9iYWwuU2FuaXRpemVyLCBnbG9iYWwuSW5kZXgsIGdsb2JhbC5TZWxlY3RvckVuZ2luZSwgZ2xvYmFsLkNvbmZpZykpO1xufSkodGhpcywgKGZ1bmN0aW9uIChzYW5pdGl6ZXIsIGluZGV4LCBTZWxlY3RvckVuZ2luZSwgQ29uZmlnKSB7ICd1c2Ugc3RyaWN0JztcblxuICBjb25zdCBfaW50ZXJvcERlZmF1bHRMZWdhY3kgPSBlID0+IGUgJiYgdHlwZW9mIGUgPT09ICdvYmplY3QnICYmICdkZWZhdWx0JyBpbiBlID8gZSA6IHsgZGVmYXVsdDogZSB9O1xuXG4gIGNvbnN0IFNlbGVjdG9yRW5naW5lX19kZWZhdWx0ID0gLyojX19QVVJFX18qL19pbnRlcm9wRGVmYXVsdExlZ2FjeShTZWxlY3RvckVuZ2luZSk7XG4gIGNvbnN0IENvbmZpZ19fZGVmYXVsdCA9IC8qI19fUFVSRV9fKi9faW50ZXJvcERlZmF1bHRMZWdhY3koQ29uZmlnKTtcblxuICAvKipcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQm9vdHN0cmFwICh2NS4yLjIpOiB1dGlsL3RlbXBsYXRlLWZhY3RvcnkuanNcbiAgICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYWluL0xJQ0VOU0UpXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuICAvKipcbiAgICogQ29uc3RhbnRzXG4gICAqL1xuXG4gIGNvbnN0IE5BTUUgPSAnVGVtcGxhdGVGYWN0b3J5JztcbiAgY29uc3QgRGVmYXVsdCA9IHtcbiAgICBhbGxvd0xpc3Q6IHNhbml0aXplci5EZWZhdWx0QWxsb3dsaXN0LFxuICAgIGNvbnRlbnQ6IHt9LFxuICAgIC8vIHsgc2VsZWN0b3IgOiB0ZXh0ICwgIHNlbGVjdG9yMiA6IHRleHQyICwgfVxuICAgIGV4dHJhQ2xhc3M6ICcnLFxuICAgIGh0bWw6IGZhbHNlLFxuICAgIHNhbml0aXplOiB0cnVlLFxuICAgIHNhbml0aXplRm46IG51bGwsXG4gICAgdGVtcGxhdGU6ICc8ZGl2PjwvZGl2PidcbiAgfTtcbiAgY29uc3QgRGVmYXVsdFR5cGUgPSB7XG4gICAgYWxsb3dMaXN0OiAnb2JqZWN0JyxcbiAgICBjb250ZW50OiAnb2JqZWN0JyxcbiAgICBleHRyYUNsYXNzOiAnKHN0cmluZ3xmdW5jdGlvbiknLFxuICAgIGh0bWw6ICdib29sZWFuJyxcbiAgICBzYW5pdGl6ZTogJ2Jvb2xlYW4nLFxuICAgIHNhbml0aXplRm46ICcobnVsbHxmdW5jdGlvbiknLFxuICAgIHRlbXBsYXRlOiAnc3RyaW5nJ1xuICB9O1xuICBjb25zdCBEZWZhdWx0Q29udGVudFR5cGUgPSB7XG4gICAgZW50cnk6ICcoc3RyaW5nfGVsZW1lbnR8ZnVuY3Rpb258bnVsbCknLFxuICAgIHNlbGVjdG9yOiAnKHN0cmluZ3xlbGVtZW50KSdcbiAgfTtcbiAgLyoqXG4gICAqIENsYXNzIGRlZmluaXRpb25cbiAgICovXG5cbiAgY2xhc3MgVGVtcGxhdGVGYWN0b3J5IGV4dGVuZHMgQ29uZmlnX19kZWZhdWx0LmRlZmF1bHQge1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgc3VwZXIoKTtcbiAgICAgIHRoaXMuX2NvbmZpZyA9IHRoaXMuX2dldENvbmZpZyhjb25maWcpO1xuICAgIH0gLy8gR2V0dGVyc1xuXG5cbiAgICBzdGF0aWMgZ2V0IERlZmF1bHQoKSB7XG4gICAgICByZXR1cm4gRGVmYXVsdDtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IERlZmF1bHRUeXBlKCkge1xuICAgICAgcmV0dXJuIERlZmF1bHRUeXBlO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgTkFNRSgpIHtcbiAgICAgIHJldHVybiBOQU1FO1xuICAgIH0gLy8gUHVibGljXG5cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LnZhbHVlcyh0aGlzLl9jb25maWcuY29udGVudCkubWFwKGNvbmZpZyA9PiB0aGlzLl9yZXNvbHZlUG9zc2libGVGdW5jdGlvbihjb25maWcpKS5maWx0ZXIoQm9vbGVhbik7XG4gICAgfVxuXG4gICAgaGFzQ29udGVudCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldENvbnRlbnQoKS5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIGNoYW5nZUNvbnRlbnQoY29udGVudCkge1xuICAgICAgdGhpcy5fY2hlY2tDb250ZW50KGNvbnRlbnQpO1xuXG4gICAgICB0aGlzLl9jb25maWcuY29udGVudCA9IHsgLi4udGhpcy5fY29uZmlnLmNvbnRlbnQsXG4gICAgICAgIC4uLmNvbnRlbnRcbiAgICAgIH07XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB0b0h0bWwoKSB7XG4gICAgICBjb25zdCB0ZW1wbGF0ZVdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHRlbXBsYXRlV3JhcHBlci5pbm5lckhUTUwgPSB0aGlzLl9tYXliZVNhbml0aXplKHRoaXMuX2NvbmZpZy50ZW1wbGF0ZSk7XG5cbiAgICAgIGZvciAoY29uc3QgW3NlbGVjdG9yLCB0ZXh0XSBvZiBPYmplY3QuZW50cmllcyh0aGlzLl9jb25maWcuY29udGVudCkpIHtcbiAgICAgICAgdGhpcy5fc2V0Q29udGVudCh0ZW1wbGF0ZVdyYXBwZXIsIHRleHQsIHNlbGVjdG9yKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdGVtcGxhdGUgPSB0ZW1wbGF0ZVdyYXBwZXIuY2hpbGRyZW5bMF07XG5cbiAgICAgIGNvbnN0IGV4dHJhQ2xhc3MgPSB0aGlzLl9yZXNvbHZlUG9zc2libGVGdW5jdGlvbih0aGlzLl9jb25maWcuZXh0cmFDbGFzcyk7XG5cbiAgICAgIGlmIChleHRyYUNsYXNzKSB7XG4gICAgICAgIHRlbXBsYXRlLmNsYXNzTGlzdC5hZGQoLi4uZXh0cmFDbGFzcy5zcGxpdCgnICcpKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRlbXBsYXRlO1xuICAgIH0gLy8gUHJpdmF0ZVxuXG5cbiAgICBfdHlwZUNoZWNrQ29uZmlnKGNvbmZpZykge1xuICAgICAgc3VwZXIuX3R5cGVDaGVja0NvbmZpZyhjb25maWcpO1xuXG4gICAgICB0aGlzLl9jaGVja0NvbnRlbnQoY29uZmlnLmNvbnRlbnQpO1xuICAgIH1cblxuICAgIF9jaGVja0NvbnRlbnQoYXJnKSB7XG4gICAgICBmb3IgKGNvbnN0IFtzZWxlY3RvciwgY29udGVudF0gb2YgT2JqZWN0LmVudHJpZXMoYXJnKSkge1xuICAgICAgICBzdXBlci5fdHlwZUNoZWNrQ29uZmlnKHtcbiAgICAgICAgICBzZWxlY3RvcixcbiAgICAgICAgICBlbnRyeTogY29udGVudFxuICAgICAgICB9LCBEZWZhdWx0Q29udGVudFR5cGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIF9zZXRDb250ZW50KHRlbXBsYXRlLCBjb250ZW50LCBzZWxlY3Rvcikge1xuICAgICAgY29uc3QgdGVtcGxhdGVFbGVtZW50ID0gU2VsZWN0b3JFbmdpbmVfX2RlZmF1bHQuZGVmYXVsdC5maW5kT25lKHNlbGVjdG9yLCB0ZW1wbGF0ZSk7XG5cbiAgICAgIGlmICghdGVtcGxhdGVFbGVtZW50KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29udGVudCA9IHRoaXMuX3Jlc29sdmVQb3NzaWJsZUZ1bmN0aW9uKGNvbnRlbnQpO1xuXG4gICAgICBpZiAoIWNvbnRlbnQpIHtcbiAgICAgICAgdGVtcGxhdGVFbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChpbmRleC5pc0VsZW1lbnQoY29udGVudCkpIHtcbiAgICAgICAgdGhpcy5fcHV0RWxlbWVudEluVGVtcGxhdGUoaW5kZXguZ2V0RWxlbWVudChjb250ZW50KSwgdGVtcGxhdGVFbGVtZW50KTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9jb25maWcuaHRtbCkge1xuICAgICAgICB0ZW1wbGF0ZUVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5fbWF5YmVTYW5pdGl6ZShjb250ZW50KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0ZW1wbGF0ZUVsZW1lbnQudGV4dENvbnRlbnQgPSBjb250ZW50O1xuICAgIH1cblxuICAgIF9tYXliZVNhbml0aXplKGFyZykge1xuICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5zYW5pdGl6ZSA/IHNhbml0aXplci5zYW5pdGl6ZUh0bWwoYXJnLCB0aGlzLl9jb25maWcuYWxsb3dMaXN0LCB0aGlzLl9jb25maWcuc2FuaXRpemVGbikgOiBhcmc7XG4gICAgfVxuXG4gICAgX3Jlc29sdmVQb3NzaWJsZUZ1bmN0aW9uKGFyZykge1xuICAgICAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbicgPyBhcmcodGhpcykgOiBhcmc7XG4gICAgfVxuXG4gICAgX3B1dEVsZW1lbnRJblRlbXBsYXRlKGVsZW1lbnQsIHRlbXBsYXRlRWxlbWVudCkge1xuICAgICAgaWYgKHRoaXMuX2NvbmZpZy5odG1sKSB7XG4gICAgICAgIHRlbXBsYXRlRWxlbWVudC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgdGVtcGxhdGVFbGVtZW50LmFwcGVuZChlbGVtZW50KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0ZW1wbGF0ZUVsZW1lbnQudGV4dENvbnRlbnQgPSBlbGVtZW50LnRleHRDb250ZW50O1xuICAgIH1cblxuICB9XG5cbiAgcmV0dXJuIFRlbXBsYXRlRmFjdG9yeTtcblxufSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGVtcGxhdGUtZmFjdG9yeS5qcy5tYXBcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgRHJvcGRvd24gZnJvbSAnYm9vdHN0cmFwL2pzL2Rpc3QvZHJvcGRvd24nO1xuaW1wb3J0IENvbGxhcHNlIGZyb20gJ2Jvb3RzdHJhcC9qcy9kaXN0L2NvbGxhcHNlJztcbmltcG9ydCBBbGVydCBmcm9tICdib290c3RyYXAvanMvZGlzdC9hbGVydCc7XG5pbXBvcnQgVG9vbHRpcCBmcm9tICdib290c3RyYXAvanMvZGlzdC90b29sdGlwJztcbmltcG9ydCB7Y3JlYXRlUG9wcGVyfSBmcm9tIFwiQHBvcHBlcmpzL2NvcmVcIjtcbmltcG9ydCB7TW9kdWxlRmFjdG9yeX0gZnJvbSAnQGRhc2hib2FyZGNvZGUvYnNtdWx0aXNlbGVjdCc7XG5cbi8vIEluaXQgdG9vbHRpcHNcbmxldCB0b29sdGlwVHJpZ2dlckxpc3QgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWJzLXRvZ2dsZT1cInRvb2x0aXBcIl0nKSlcbnRvb2x0aXBUcmlnZ2VyTGlzdC5tYXAoZnVuY3Rpb24gKHRyaWdnZXJFbCkge1xuICAgIHJldHVybiBuZXcgVG9vbHRpcCh0cmlnZ2VyRWwpXG59KTtcblxuLy8gTXVsdGlzZWxlY3RcbmxldCBtdWx0aXNlbGVjdFRyaWdnZXJMaXN0ID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubXVsdGktc2VsZWN0JykpXG5tdWx0aXNlbGVjdFRyaWdnZXJMaXN0Lm1hcChmdW5jdGlvbiAodHJpZ2dlckVsKSB7XG4gICAgTW9kdWxlRmFjdG9yeSh7d2luZG93LCBjcmVhdGVQb3BwZXJ9KS5Cc011bHRpU2VsZWN0KHRyaWdnZXJFbCwge1xuICAgICAgICB1c2VDc3NQYXRjaDogdHJ1ZSxcbiAgICAgICAgY3NzOiB7XG4gICAgICAgICAgICBwaWNrOiAnJ1xuICAgICAgICB9XG4gICAgfSk7XG59KTtcblxuXG5pbXBvcnQgJy4vaGVscGVycyc7XG5cblxuIl0sIm5hbWVzIjpbImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImNsYXNzaWNFZGl0b3JUcmlnZ2VyTGlzdCIsInNsaWNlIiwiY2FsbCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJtYXAiLCJlZGl0b3JUcmlnZ2VyRWwiLCJDbGFzc2ljRWRpdG9yIiwidW5kZWZpbmVkIiwicmVxdWlyZWQiLCJjcmVhdGUiLCJzbHVnVHJpZ2dlckxpc3QiLCJzbHVnVHJpZ2dlckVsIiwib25pbnB1dCIsImV2ZW50IiwidGl0bGUiLCJxdWVyeVNlbGVjdG9yIiwidGFyZ2V0IiwiZ2V0QXR0cmlidXRlIiwidmFsdWUiLCJ0b1N0cmluZyIsInRvTG93ZXJDYXNlIiwibm9ybWFsaXplIiwicmVwbGFjZSIsInRyaW0iLCJkaXNwYXRjaEV2ZW50IiwiRXZlbnQiLCJsaW5rVHJpZ2dlckxpc3QiLCJsaW5rVHJpZ2dlckVsIiwib25jbGljayIsInByZXZlbnREZWZhdWx0IiwiY29uZmlybWF0aW9uIiwiY3VycmVudFRhcmdldCIsImNvbmZpcm0iLCJzdG9wUHJvcGFnYXRpb24iLCJzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24iLCJmb3JtIiwiY3JlYXRlRWxlbWVudCIsInRva2VuIiwic2V0QXR0cmlidXRlIiwic3R5bGUiLCJkaXNwbGF5IiwiaW5uZXJIVE1MIiwiYm9keSIsImFwcGVuZENoaWxkIiwic3VibWl0IiwicG9pbnRlckV2ZW50cyIsIkRyb3Bkb3duIiwiQ29sbGFwc2UiLCJBbGVydCIsIlRvb2x0aXAiLCJjcmVhdGVQb3BwZXIiLCJNb2R1bGVGYWN0b3J5IiwidG9vbHRpcFRyaWdnZXJMaXN0IiwidHJpZ2dlckVsIiwibXVsdGlzZWxlY3RUcmlnZ2VyTGlzdCIsIndpbmRvdyIsIkJzTXVsdGlTZWxlY3QiLCJ1c2VDc3NQYXRjaCIsImNzcyIsInBpY2siXSwic291cmNlUm9vdCI6IiJ9