import {partials, updateContext, renderPage, displayMessage} from '../helpers/globals.js'

export function getHome(context)
{
    updateContext(context);
    partials.content = './templates/home/home.hbs';
    
    renderPage(partials, this);
}

