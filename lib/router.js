window.addEventListener('popstate', function (e) {
    console.log('popstate', e);
    console.log('popstate.state', e.state);
    let state = e.state;
    if (state !== null) {
    }
});

const homePath = {scene:'home-scene', primaryPath:'/home', onActivate: routeToHome};

const routePaths = {
    '/': homePath,
    '/home': homePath,
    '/login': {scene:'login-scene'},
    '/dashboard': {scene: 'dashboard-scene', onActivate: routeToDashboard},
    'notMatch': homePath
};

function trimLocationToRelative(path) {
    return path.replace(window.location.origin, '');
}

function routeHref(e) {
    let path = e.target.href;
    let isLocalPath = path.includes(window.location.origin);
    if (isLocalPath) {
        e && e.preventDefault();
        route(path);
    }
}

function route(path) {
    let localPath = trimLocationToRelative(path);
    const routePath = routePaths[localPath] || routePaths['notMatch'];
    if (!routePath) {
        console.warn(`route is not found for path ${path} - ${localPath}`);
        return;
    }

    let historyPath = routePath.primaryPath || (localPath);
    console.log('route to history ' , historyPath);
    history.pushState({}, null, historyPath);
    routePath.onActivate && routePath.onActivate();
    setState({scene: routePath.scene})
}

function routeToDashboard(e) {
    requestDashboard().then((dashboard) => setState({dashboard}));
}

function routeToHome(e) {
}


function initiate() {
    route(window.location.href);
}

initiate();