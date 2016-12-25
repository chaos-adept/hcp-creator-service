let state = ({
    username: loadUserName(),
    dashboard: { items: [1, 2, 3] }
});

function setState(newProps) {
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

function renderState() {
    const logged = !!state.username;

    document.querySelector('.app').classList.toggle('hidden', false);
    document.querySelector('.user-panel').classList.toggle('hidden', !logged);
    document.querySelector('.dashboard-menu-item').classList.toggle('hidden', !logged);
    document.querySelector('.user-name').textContent = state.username;

    document.querySelector('.login-panel').classList.toggle('hidden', logged);
    document.querySelector('.login-input').value = state.username;
    document.querySelector('.dashboard-items').textContent = JSON.stringify(state.dashboard, null, ' ');
}

renderState();