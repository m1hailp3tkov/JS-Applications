import {partials, renderBody, updateContext, displayMessage} from '../helpers/globals.js';
import { get } from '../helpers/requester.js';
import { appKey } from '../helpers/storage.js';

export async function getHome(context)
{
    updateContext(context);
    partials.content = './templates/home/home.hbs';

    if(context.loggedIn)
    {
        let data = await get('appdata/' + appKey + '/recipes');
        data.forEach(element => {
            element.ingredients = element.ingredients.slice(0,6);
        });
        context.recipes = data;

        console.log(data);

        await this.loadPartials(partials);
    }
            
    this.loadPartials(partials)
    .then(function()
    {
        renderBody(this);
    });
    
    console.log(context);
}