import {updateContext, partials, renderPage, displayMessage} from '../helpers/globals.js';
import { post, get, put, del} from '../helpers/requester.js';
import { appKey } from '../helpers/storage.js';

export function createGet(context)
{
    updateContext(context);
    partials.content = './templates/treks/create.hbs';
    
    renderPage(partials, this);
}

export function createPost(context)
{
    updateContext(context);
    const {location, dateTime, description, imageURL } = context.params;

    if(location.length<6)
    {
        displayMessage('Location must be at least 6 chars', 'error');
        return;
    }

    if(description.length<10)
    {
        displayMessage('Description must be at least 6 chars', 'error');
        return;
    }

    const trek =
    {
        location,
        dateTime,
        description,
        imageURL,
        organizer: context.userInfo.username,
        likes: 0
    }

    post('appdata/' + appKey + '/treks', trek)
    .then(() => 
    {
        displayMessage('Trek added successfully', 'success');
        context.redirect('/');
    });
}

export function details(context)
{
    updateContext(context);
    partials.content = './templates/treks/details.hbs';

    get('appdata/' + appKey + '/treks/' + context.params.id)
    .then(data => 
    {
        context.isOwner = context.userInfo.username === data.organizer;
        context.trek = data;
        renderPage(partials, this);
    });
}

export function editGet(context)
{
    updateContext(context);
    partials.content = './templates/treks/edit.hbs';
    let id = context.params.id;

    get('appdata/' + appKey + '/treks/' + id)
    .then(data =>
    {
        context.trek = data;

        renderPage(partials, this);
        
        console.log(context);
    });
}

export function editPost(context)
{
    updateContext(context);

    let trek;

    get('appdata/' + appKey + '/treks/' + context.params.id)
    .then(data =>
    {
        trek = data;

        trek.location = context.params.location;
        trek.likes = context.params.likes;
        trek.organizer = context.params.organizer,
        trek.dateTime = context.params.dateTime,
        trek.description = context.params.description,
        trek.imageURL = context.params.imageURL
    })
    .then(() => 
    {
        console.log(trek);

        put('appdata/' + appKey + '/treks/' + trek._id, trek)
        .then(() =>
        {
            displayMessage('trek edited sucessfully', 'success');
            context.redirect('/');
        })
        .catch(console.log);
    });
}

export function deleteGet(context)
{
    del('appdata/' + appKey + '/treks/' + context.params.id)
    .then(() => 
    {
        displayMessage('Trek deleted successfully', 'success');
        context.redirect('/');
    });
}

export function likeTrek(context)
{
    get('appdata/' + appKey + '/treks/' + context.params.id)
    .then(trek =>
    {
        trek.likes++;

        put('appdata/' + appKey + '/treks/' + trek._id, trek)
        .then(() =>
        {
            displayMessage('You liked this trek', 'success');
            let likes = document.querySelector("body > div.row.single-trek-details.text-center > div > div.overflow-hidden.my-3.p-3 > p:nth-child(5) > large");
            let n = Number(likes.textContent) + 1;
            likes.textContent = n;
        });
    });
}