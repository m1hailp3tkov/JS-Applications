import { getHome } from "./controllers/homeController.js";
import { getLogin, getRegister, postRegister, postLogin, logout } from "./controllers/identityController.js";
import { getCreate, postCreate, getRecipeDetails, likeRecipe, deleteRecipe, editGet, editConfirm} from "./controllers/recipesController.js";

var app = Sammy('body', function()
{
    this.use('Handlebars', 'hbs');

    this.get('/', getHome);
    this.get('#/', getHome);

    this.get('#/login', getLogin);
    this.post('#/login', postLogin);

    this.get('#/logout', logout);

    this.get('#/register', getRegister);
    this.post('#/register', postRegister);

    this.get('#/create', getCreate);
    this.post('#/create', postCreate);

    this.get('#/details/:id', getRecipeDetails);
    
    this.get('#/like/:id', likeRecipe);
    this.get('#/delete/:id', deleteRecipe);

    this.get('#/edit/:id', editGet);
    this.get('#/editConfirm/:id', editConfirm);
});

app.run();