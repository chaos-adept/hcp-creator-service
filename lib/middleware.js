const requestDelayMs = 500;
let activeRequestCounter = 0;
let requestCounter = 0;

function mutateDashboard() {
    const value = _ => (Math.random() * 100).toFixed(2);
    return {
        items: [value(), value(), value()]
    }
}

function requestUser() {
    return (localStorage.username && requestAspect({username: localStorage.username}))
            || requestAspect(null);
};

function requestLogin(username) {
    localStorage.username = username;
    return requestAspect({username});
}

function requestLogout() {
    localStorage.username = '';
    return requestAspect();
}

function requestAspect(reqPromise) {
    requestCounter++;
    let wrapPromise = new Promise((resolve) => setTimeout(resolve, requestDelayMs, reqPromise));
    let updateAspectState = _ => setState({activeRequestCounter, requestCounter});
    activeRequestCounter++;
    updateAspectState();

    return wrapPromise.then(res => {
        activeRequestCounter--;
        updateAspectState();
        console.log('request result', res);
        return res;
    }).catch(err => {
        activeRequestCounter--;
        updateAspectState();
        throw err;
    });
}

function requestDashboard() {
    return requestAspect(Promise.resolve(mutateDashboard()))
}

function requestMutateDashboard() {
    return requestDashboard();
}