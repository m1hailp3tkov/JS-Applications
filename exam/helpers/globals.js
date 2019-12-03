import { getData } from '../helpers/storage.js';

export const partials = 
{
    header: './templates/common/header.hbs',
    footer: './templates/common/footer.hbs',
    notifications: './templates/common/notifications.hbs'
};

export function renderPage(partials, this_)
{
    return this_.loadPartials(partials)
    .then(function()
    {
        this.partial('./templates/common/body.hbs');
    });
}

export function updateContext(context)
{
    if(getData('authToken'))
    {
        let userInfo = JSON.parse(getData('userInfo'));
        context.loggedIn = true;
    }
}

export function displayMessage(msg, status)
{
    let notificationBox = document.getElementById(`${status}Box`);
    notificationBox.style.display = 'block';
    notificationBox.textContent = msg;
}

export function hideMessage(status)
{
    let notificationBox = document.getElementById(`${status}Box`);
    notificationBox.style.display = 'none';
}