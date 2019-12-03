import {appKey, removeUser, saveUser, getData} from '../helpers/storage.js';
import {partials, renderBody, displayMessage} from '../helpers/globals.js';
import {post} from '../helpers/requester.js';

export function getLogin(context)
{
    partials.content = './templates/identity/login.hbs';

    this.loadPartials(partials)
    .then(function()
    {
        renderBody(this);
    });
}

export function postLogin(context)
{
    let {username, password} = context.params;

    displayMessage('', 'loading', context);
    console.log(context);

    post('user/' + appKey + '/login', {username, password})
    .then(data => 
    {
        console.log(data);
        saveUser(data);
        context.loggedIn = true;
        context.redirect('#/');
        displayMessage('Login successful', 'success', context);
    });
}

export function logout(context)
{
    displayMessage('', 'loading', context);

    post('user/' + appKey + '/_logout', getData('authToken'))
    .then(data => 
    {
        console.log(data);
        removeUser();
        context.loggedIn = false;
        context.redirect('#/');
        displayMessage('Logout successful', 'success', context);
    });

    console.log(context);
}

export function getRegister(context)
{
    partials.content = './templates/identity/register.hbs';

    this.loadPartials(partials)
    .then(function()
    {
        renderBody(this);
    });
}

export function postRegister(context)
{
    let {firstName, lastName, username, password, repeatPassword} = context.params;

    if(firstName.length < 2)
    {
        displayMessage("First name must be at least 2 characters", 'error', context);
    }
    else if(lastName.length < 2)
    {
        displayMessage("Last name must be at least 2 characters", 'error', context);
    }
    else if(username.length < 2)
    {
        displayMessage("Username name must be at least 2 characters", 'error', context);
    }
    else if(password.length < 6)
    {
        displayMessage("Password must be at least 6 characters", 'error', context);
    }
    else if(password != repeatPassword)
    {
        displayMessage("Passwords do not match", 'error', context);
    }
    else
    {
        displayMessage('', 'loading', context);

        post('user/' + appKey, {username, password, firstName, lastName})
        .then(function()
        {
            context.redirect('#/login');
            displayMessage('Registration successful', 'success', context);
        })
        .catch(console.log);
    }
}