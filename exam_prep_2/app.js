import { getHome } from "./controllers/homeController.js";
import { getLogin, getRegister, postRegister, postLogin, logout, profile } from "./controllers/identityController.js";
import { getCreate, postCreate, details, editGet, editPost, deleteEvent, joinEvent} from "./controllers/eventsController.js";

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

    this.get('#/create', getCreate);
    this.post('#/create', postCreate);

    this.get('#/details/:id', details);
    this.get('#/edit/:id', editGet);
    this.post('#/edit/:id', editPost);
    this.get('#/delete/:id', deleteEvent);
    this.get('#/join/:id', joinEvent);
});

app.run();