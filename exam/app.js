import {getHome} from './controllers/homeController.js';
import {getLogin, postLogin, getRegister, postRegister, logout, profile} from './controllers/identityController.js';
import { createGet, createPost, details, editGet, editPost, deleteGet, likeTrek} from './controllers/treksController.js';

var app = Sammy('body', function()
{
    this.use('Handlebars', 'hbs');

    this.get('/', getHome);

    this.get('#/login', getLogin);
    this.post('#/login', postLogin);

    this.get('#/register', getRegister);
    this.post('#/register', postRegister);

    this.get('#/profile', profile);

    this.get('#/logout', logout);

    this.get('#/create', createGet);
    this.post('#/create', createPost);

    this.get('#/details/:id', details);

    this.get('#/edit/:id', editGet);
    this.post('#/edit/:id', editPost);

    this.get('#/delete/:id', deleteGet);
    
    this.get('#/like/:id', likeTrek);
});

app.run();