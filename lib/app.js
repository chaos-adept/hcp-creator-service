let state = ({
    username: loadUserName(),
    scene: 'home-scene'
});

function setState(newProps) {
    console.log('setState', newProps);
    Object.assign(state, newProps);
    renderState();
}

function loadUserName() {
    return localStorage.username;
}

function persistUserName(name) {
    localStorage.username = name;
}

function login() {
    let username = document.querySelector('.login-input').value;
    persistUserName(username);
    setState( { username:username } );
}
function logout() {
    persistUserName('');
    setState({username: null});
}

function dashboardMutateRequestClick() {
    requestMutateDashboard().then(dashboard => setState({dashboard}));
}

function renderState() {
    const logged = !!state.username;
    const hasActiveRequests = state.activeRequestCounter > 0;
    const scene = state.scene;

    document.querySelector('.app-spinner').classList.toggle('hidden', !hasActiveRequests);
    document.querySelector('.app').classList.toggle('hidden', false);
    document.querySelector('.user-panel').classList.toggle('hidden', !logged);
    document.querySelector('.dashboard-menu-item').classList.toggle('hidden', !logged);
    document.querySelector('.user-name').textContent = state.username;

    document.querySelector('.login-panel').classList.toggle('hidden', logged);
    document.querySelector('.login-input').value = state.username;

    Array.from(document.querySelectorAll(`[class*="-scene"]`)).every( el => el.classList.toggle('hidden', true) );
    document.querySelector(`.${scene}`).classList.toggle('hidden', false);


    document.querySelector('.dashboard-items').textContent = JSON.stringify(state.dashboard, null, ' ');
}

renderState();