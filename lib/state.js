let state = ({
    scene: 'home-scene'
});

let stateListeners = [];

function setState(newProps) {
    console.log('setState', newProps);
    Object.assign(state, newProps);
    stateListeners.forEach( listener => listener(state) );
}

function addStateListener(listener) {
    stateListeners.push(listener);
}
