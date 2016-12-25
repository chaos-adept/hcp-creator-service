window.addEventListener('popstate', function (e) {
    console.log('popstate', e);
    console.log('popstate.state', e.state);
    let state = e.state;
    if (state !== null) {
    }
});

function routeToDashboard(e) {
    e && e.preventDefault();
    history.pushState({}, null, `/dashboard`);
    setState({scene: 'dashboard-scene'});
    requestDashboard().then((dashboard) => setState({dashboard}));
}

function routeToHome(e) {
    e && e.preventDefault();
    setState({scene: 'home-scene'});
    history.pushState({}, null, `/home`);
}
