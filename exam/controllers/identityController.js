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

    post('user/' + appKey + '/login', {username, password})
    .then(data => 
    {
        saveUser(data);
        renderPage(partials, this);
    })
    .catch(console.log);
}

export function getRegister(context)
{
    updateContext(context);
    partials.content = './templates/identity/register.hbs';

    renderPage(partials, this);
}

export function postRegister(context)
{
    let {username, password} = context.params;
    //TODO: add missing params to register

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