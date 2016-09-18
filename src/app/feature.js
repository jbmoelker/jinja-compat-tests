(function engineEnabler(){
    'use strict';

    var CAPABLE_BROWSER = ('addEventListener' in window);
    if (!CAPABLE_BROWSER) {
        return;
    }

    var SUPPORTS_STORAGE = ('localStorage' in window);
    var STORAGE_KEY = 'enabledEngines';

    var form = document.querySelector('[data-engine-enabler]');
    var inputs = [].slice.call(form.engine);
    var targets = [].slice.call(document.querySelectorAll('[data-engine]'));

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
            var engine = target.getAttribute('data-engine');
            target.setAttribute('data-engine-enabled', state[engine]);
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