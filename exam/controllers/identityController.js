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
        if(data.username === username)
        {
            displayMessage('Logged in successfully', 'success');
            saveUser(data);
            context.redirect('/');
        }
        else
        {
            displayMessage('Wrong credentials', 'error');
        }
    })
    .catch(function()
    {
        displayMessage('An error occured while trying to login.', 'error');
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
    
    if(username.length < 3)
    {
        displayMessage('Username must be at least 3 chars', 'error');
        return;
    }
    if(password.length < 6)
    {
        displayMessage('Password must be at least 6 chars', 'error');
        return;
    }
    if(password !== rePassword)
    {
        displayMessage('Passwords do not match', 'error');
        return;
    }

    post('user/' + appKey, {username, password})
    .then(data => 
    {
        saveUser(data);
        displayMessage('Registration successful', 'success');
        context.redirect('/');
    })
    .catch(function()
    {
        displayMessage('An error occured while trying to register', 'error');
    });
}

export function logout(context)
{
    post('user/' + appKey + '/_logout', getData('authToken'))
    .then(data => 
    {
        removeUser();
        context.redirect('/');
        displayMessage('Logged out successfully', 'success');
    })
    .catch(console.log);
}

export function profile(context)
{
    updateContext(context);
    partials.content = './templates/identity/profile.hbs';

    get('appdata/' + appKey + '/treks')
    .then(treks =>
    {
        treks = treks.filter(t => t.organizer === context.userInfo.username);
        context.treks = treks.map(e => e.location);
        context.trekCount = treks.length;
        renderPage(partials, this);
    });
}