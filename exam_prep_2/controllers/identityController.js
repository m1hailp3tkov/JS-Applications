import {partials, updateContext, renderPage, displayMessage} from '../helpers/globals.js';
import {get, post} from '../helpers/requester.js';
import {appKey, saveUser, removeUser, getData} from '../helpers/storage.js';

export function getLogin(context)
{
    updateContext(context);
    partials.content = './templates/identity/login.hbs';

    renderPage(partials, this);
}

export function postLogin(context)
{
    let {username, password} = context.params;

    displayMessage('Loading', 'loading');

    post('user/' + appKey + '/login', {username, password})
    .then(data => 
    {
        if(data.username === username)
        {
            saveUser(data);
            context.redirect('/');
        }
        else
        {
            displayMessage('wrong credentials', 'error');
        }
    })
    .catch(function()
    {
        displayMessage('login unsuccessful', 'error');
    });
}

export function getRegister(context)
{
    updateContext(context);
    partials.content = './templates/identity/register.hbs';

    renderPage(partials, this);
}

export function postRegister(context)
{
    let {username, password, rePassword} = context.params;

    if(username.length < 3) {displayMessage('username too short', 'error'); return;}
    if(password.length < 6) {displayMessage('password too short', 'error'); return;}
    if(password !== rePassword) {displayMessage('passwords do not match', 'error'); return;}

    post('user/' + appKey, {username, password})
    .then(function()
    {
        context.redirect('#/login');
    })
    .catch(console.log);
}

export function logout(context)
{
    post('user/' + appKey + '/_logout', getData('authToken'))
    .then(data => 
    {
        removeUser();
        context.redirect('/');
    })
    .catch(console.log);
}

export function profile(context)
{
    updateContext(context);
    partials.content = './templates/identity/profile.hbs';

    get('appdata/' + appKey + '/events')
    .then(events =>
    {
        context.events = events.map(e => e.name);
        context.eventCount = events.length;
        renderPage(partials, this);
    });
}