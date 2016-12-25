addStateListener(renderState);

function login() {
    let username = document.querySelector('.login-input').value;
    requestLogin(username).then(user => {
        setState({user});
        route('/dashboard');
    });
}
function logout() {
    requestLogout().then(user => {
        setState({user});
        route('/login');
    });
}

function dashboardMutateRequestClick() {
    requestMutateDashboard().then(dashboard => setState({dashboard}));
}

function renderState(state) {
    const logged = !!state.user;
    const hasActiveRequests = state.activeRequestCounter > 0;
    const scene = state.scene;

    document.querySelector('.app-spinner').classList.toggle('hidden', !hasActiveRequests);
    document.querySelector('.app').classList.toggle('hidden', false);
    document.querySelector('.user-panel').classList.toggle('hidden', !logged);
    document.querySelector('.dashboard-menu-item').classList.toggle('hidden', !logged);
    document.querySelector('.login-menu-item').classList.toggle('hidden', logged);
    document.querySelector('.user-name').textContent = state.user && state.user.username;

    Array.from(document.querySelectorAll(`.app > [class*="-scene"]`)).every(el => el.classList.toggle('hidden', true));
    document.querySelector(`.app > .${scene}`).classList.toggle('hidden', false);


    document.querySelector('.dashboard-items').textContent = JSON.stringify(state.dashboard, null, ' ');
}

requestUser().then(user => setState({user}));