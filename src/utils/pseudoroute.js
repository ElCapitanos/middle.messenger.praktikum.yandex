let currentURL = window.location.pathname;

const createNewScript = (url) => {
    if (document.querySelector("#script")) {
        document.body.removeChild(document.querySelector('#script'));
    } 
    const script = document.createElement('script');
    script.src = url;
    script.type = 'module';
    script.id = 'script';
    document.body.appendChild(script);
}

document.addEventListener("DOMContentLoaded", () => {
    if (currentURL === '/' || currentURL === '/auth') {
        createNewScript('pages/auth/index.js');
    } else if (currentURL === '/chating') {
        createNewScript('pages/chating/index.js');
    } else if (currentURL === '/profile') {
        createNewScript('pages/profile/index.js');
    } else if (currentURL === '/registration') {
        createNewScript('pages/registration/index.js');
    } else if (currentURL === '/passwordChange') {
        createNewScript('pages/passwordChange/index.js');
    } else if (currentURL === '/error500') {
        createNewScript('pages/error500/index.js');
    } else {
        createNewScript('pages/error404/index.js');
    }
});