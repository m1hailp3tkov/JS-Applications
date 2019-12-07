import {partials, updateContext, renderPage, displayMessage} from '../helpers/globals.js'
import { getData, appKey } from '../helpers/storage.js';
import { get } from '../helpers/requester.js';

export function getHome(context)
{
    updateContext(context);
    
    get('appdata/' + appKey + '/treks')
    .then(treks => 
    {
            if(treks.length>0)
            { 
                context.any = true;
                context.treks = treks.sort((a,b) => b.likes - a.likes);
            }

            partials.content = './templates/home/home.hbs';
            renderPage(partials, this);
    });
}

