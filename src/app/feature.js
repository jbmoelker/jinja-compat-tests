(function engineEnabler(){
    'use strict';

    var CAPABLE_BROWSER = ('addEventListener' in window);
    if (!CAPABLE_BROWSER) {
        return;
    }

    var SUPPORTS_STORAGE = ('localStorage' in window);
    var STORAGE_KEY = 'enabledEngines';
    var FORM_SELECTOR = '[data-engine-enabler]';
    var INPUT_NAME = 'engine';
    var TARGET_ATTR = 'data-engine';
    var ENABLED_ATTR = 'data-engine-enabled';

    var form = document.querySelector(FORM_SELECTOR);
    var inputs = [].slice.call(form[INPUT_NAME]);
    var targets = [].slice.call(document.querySelectorAll('[' + TARGET_ATTR + ']'));

    form.addEventListener('change', onEnableEngines);
    restoreState();

    function onEnableEngines() {
        var state = getEngineState(this);
        enableTargets(state);
        saveState(state);
    }

    function getEngineState(form) {
        return inputs.reduce(function(map, input){
            map[input.value] = input.checked;
            return map;
        }, {});
    }

    function enableTargets(state) {
        targets.forEach(function(target) {
            var key = target.getAttribute(TARGET_ATTR);
            target.setAttribute(ENABLED_ATTR, state[key]);
        });
    }

    function saveState(state) {
        if(!SUPPORTS_STORAGE) {
            return;
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }

    function restoreState() {
        if(!SUPPORTS_STORAGE) {
            return;
        }
        var state = JSON.parse(localStorage.getItem(STORAGE_KEY));
        restoreInputs(state);
        enableTargets(state);
    }

    function restoreInputs(state) {
        inputs.forEach(function(input) {
           input.checked = state[input.value];
        });
    }

}());