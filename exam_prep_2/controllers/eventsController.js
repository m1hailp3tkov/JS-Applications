import {partials, updateContext, renderPage, displayMessage} from '../helpers/globals.js'
import { getData, appKey } from '../helpers/storage.js';
import {get, post, put, del} from '../helpers/requester.js';

export function getCreate(context)
{
    updateContext(context);
    partials.content = './templates/events/create.hbs';
    
    renderPage(partials, this);
}

export function postCreate(context)
{
    if(context.params.name.length < 6) 
    {
        displayMessage('event name must be at least 6 characters', 'error'); 
        return;
    }
    if(!context.params.dateTime.match(/\d{1,2} [A-Z]{1}[a-z]+( - \d{1,2} [AP]M)?/))
    {
        displayMessage('date should be formatted as: 10 February | 10 February - 10 PM', 'error');
        return;
    }
    if(context.params.description.length < 10)
    {
        displayMessage('description should be at least 10 characters', 'error');
        return;
    }
    if(!context.params.imageURL.match(/http(s)?:\/{2}/))
    {
        displayMessage('invalid image URL', 'error');
        return;
    }

    updateContext(context);
    let event = 
    {
        peopleInterestedIn: 0,
        organizer: JSON.parse(getData('userInfo')).username,
        name: context.params.name,
        dateTime: context.params.dateTime,
        description: context.params.description,
        imageURL: context.params.imageURL
    };

    displayMessage('creating event...', 'loading');

    post('appdata/' + appKey + '/events', event)
    .then(() =>
    {
        displayMessage('event created sucessfully', 'success');
        context.redirect('/');
    })
    .catch(console.log);
}

export function details(context)
{
    updateContext(context);
    partials.content = './templates/events/details.hbs';
    let id = context.params.id;

    get('appdata/' + appKey + '/events/' + id)
    .then(data =>
    {
        context.event = data;
        context.isOwner = context.userInfo.username === data.organizer;
        renderPage(partials, this);
    });

    console.log(id);
}

export function editGet(context)
{
    updateContext(context);
    partials.content = './templates/events/edit.hbs';
    let id = context.params.id;

    get('appdata/' + appKey + '/events/' + id)
    .then(data =>
    {
        context.event = data;

        renderPage(partials, this);
        
        console.log(context);
    });
}

export function editPost(context)
{
    updateContext(context);

    let event;

    get('appdata/' + appKey + '/events/' + context.params.id)
    .then(data =>
    {
        event = data;

        event.peopleInterestedIn = context.params.peopleInterestedIn,
        event.organizer= context.params.organizer,
        event.name= context.params.name,
        event.dateTime= context.params.dateTime,
        event.description= context.params.description,
        event.imageURL= context.params.imageURL
    })
    .then(() => 
    {
        console.log(event);

        displayMessage('editing event...', 'loading');

        put('appdata/' + appKey + '/events/' + event._id, event)
        .then(() =>
        {
            displayMessage('event edited sucessfully', 'success');
            context.redirect('/');
        })
        .catch(console.log);
    });
}

export function deleteEvent(context)
{
    del('appdata/' + appKey + '/events/' + context.params.id)
    .then(() => 
    {
        displayMessage('event deleted successfully', 'success');
        context.redirect('/');
    });
}

export function joinEvent(context)
{
    get('appdata/' + appKey + '/events/' + context.params.id)
    .then(event =>
    {
        event.peopleInterestedIn ++;

        put('appdata/' + appKey + '/events/' + event._id, event)
        .then(() =>
        {
            displayMessage('You joined the event successfully', 'success');
            let sm = document.querySelector("body > div.row.event-details > div > div > p:nth-child(5) > small");
            let n = Number(sm.textContent) + 1;
            sm.textContent = n;
        })
        .catch(console.log);
    })
}