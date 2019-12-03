import {partials, renderBody, updateContext} from '../helpers/globals.js';
import { get, post, put, del } from '../helpers/requester.js';
import { appKey, getData } from '../helpers/storage.js';

export function getCreate(context)
{
    updateContext(context);
    partials.content = './templates/recipes/createRecipe.hbs';

    this.loadPartials(partials)
    .then(function()
    {
        renderBody(this);
    });
}

export function postCreate(context)
{
    let {category, description, foodImageURL, ingredients, meal, prepMethod} = context.params;

    post('appdata/' + appKey + '/recipes', 
    {
        category,
        categoryImageURL: getCategoryImgURL(category),
        description, 
        foodImageURL, 
        ingredients: ingredients.split(', '), 
        meal, 
        prepMethod,
        likesCounter: 0
    })
    .then(console.log);
}

export async function getRecipeDetails(context)
{
    updateContext(context);
    
    let recipeData = await getRecipeDataById(this.params['id']);

    context.isOwner = JSON.parse(getData('userInfo'))._id === recipeData._acl.creator;
    context.recipeData = recipeData;

    partials.content = './templates/recipes/recipeDetails.hbs';
    this.loadPartials(partials)
    .then(function()
    {
        renderBody(this);
    });
}

export async function likeRecipe(context)
{
    let url = 'appdata/' + appKey + '/recipes/' + this.params['id'];
    let recipeData = await get(url);
    recipeData.likesCounter++;

    put(url, recipeData)
    .then(function()
    {
        document.querySelector("#rooter > main > div.row.form-layout.p-5 > div > div.recepieInfo > div.actions > a")
        .textContent = recipeData.likesCounter + " Likes";
    })
    .catch(console.log);
}

export async function deleteRecipe(context)
{
    let url = 'appdata/' + appKey + '/recipes/' + this.params['id'];
    del(url)
    .then(function()
    {
        context.redirect('#/');
    })
    .catch(console.log);
}

export async function editGet(context)
{
    let url = 'appdata/' + appKey + '/recipes/' + this.params['id'];
    let recipeData = await get(url);
    recipeData.ingredients = recipeData.ingredients.join(', ');

    updateContext(context);
    partials.content = './templates/recipes/editRecipe.hbs';
    context.recipeData = recipeData;

    this.loadPartials(partials)
    .then(function()
    {
        renderBody(this);
    })
}

export async function editConfirm(context)
{
    let url = 'appdata/' + appKey + '/recipes/' + this.params['id'];
    console.log(this.params.id);
    let recipeData = await get(url);
    console.log('stignaxme');

    recipeData.category = context.params.category;
    recipeData.description = context.params.description;
    recipeData.foodImageURL = context.params.foodImageURL;
    recipeData.ingredients = context.params.ingredients.split(', ');
    recipeData.meal = context.params.meal;
    recipeData.prepMethod = context.params.prepMethod;

    await put(url, recipeData);

    context.redirect('#/details/'+this.params.id);
}

function getCategoryImgURL(category)
{
    return Array.from(document.getElementsByTagName('select')[0].children)
    .find(x => x.textContent === category)
    .getAttribute('imgUrl');
}

async function getRecipeDataById(id)
{
    return await get('appdata/' + appKey + '/recipes/' + id);
}