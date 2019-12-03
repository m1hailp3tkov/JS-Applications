import { getData } from '../helpers/storage.js';

export const partials = 
{
    header: './templates/common/header.hbs',
    footer: './templates/common/footer.hbs',
    notifications: './templates/common/notifications.hbs'
};

export function renderBody(context)
{
    context.partial('./templates/common/body.hbs');
}

export function updateContext(context)
{
    if(getData('authToken'))
    {
        let userInfo = JSON.parse(getData('userInfo'));
        context.loggedIn = true;
        context.names = `${userInfo.firstName} ${userInfo.lastName}`;
    }
}

export function displayMessage(msg, status, context)
{
    
}