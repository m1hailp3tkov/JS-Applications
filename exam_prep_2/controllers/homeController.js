import {partials, updateContext, renderPage, displayMessage} from '../helpers/globals.js'
import { get } from '../helpers/requester.js';
import { appKey } from '../helpers/storage.js';

export function getHome(context)
{
    updateContext(context);
    partials.content = './templates/home/home.hbs';

    get('appdata/' + appKey + '/events')
    .then(events => 
    {
        context.events = events.sort((a,b) => b.peopleInterestedIn - a.peopleInterestedIn);
        renderPage(partials, this);
    });
}

