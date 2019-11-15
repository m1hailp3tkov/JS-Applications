const addButton = document.getElementsByClassName('add')[0];
const loadButton = document.getElementsByClassName('load')[0];
const updateButton = document.getElementsByClassName('update')[0];
const deleteButton = document.getElementsByClassName('delete')[0];

const anglerInput = document.querySelector("#addForm > input.angler");
const weightInput = document.querySelector("#addForm > input.weight");
const speciesInput = document.querySelector("#addForm > input.species");
const locationInput = document.querySelector("#addForm > input.location");
const baitInput = document.querySelector("#addForm > input.bait");
const captureTimeInput = document.querySelector("#addForm > input.captureTime");

const catchesDiv = document.getElementById('catches');
let catchDiv = document.getElementsByClassName('catch')[0];

catchesDiv.innerHTML = '';

function attachEvents() 
{
    loadButton.addEventListener('click', displayCatches);
    addButton.addEventListener('click', addCatch);
}

async function displayCatches()
{
    let catches;
    await fetch('https://fisher-game.firebaseio.com/catches.json')
    .then(x => x.json())
    .then(x => catches = x)
    .catch(x => console.error('Couldnt load catches'));

    createElements(catches);
}

function createElements(catches)
{
    catchesDiv.innerHTML = '';

    for(let c in catches)
    {
        addCatchToDiv(c, catches[c]);
    }
}

function addCatchToDiv(id, catchObj)
{
    let newCatch = catchDiv.cloneNode(true);
        
    newCatch.setAttribute('data-id', id);
    newCatch.children[1].value = catchObj.angler;
    newCatch.children[4].value = catchObj.weight;
    newCatch.children[7].value = catchObj.species;
    newCatch.children[10].value = catchObj.location;
    newCatch.children[13].value = catchObj.bait;
    newCatch.children[16].value = catchObj.captureTime;

    newCatch.children[18].addEventListener('click', e => updateCatch(id));
    newCatch.children[19].addEventListener('click', e => deleteCatch(id));

    catchesDiv.appendChild(newCatch);
}

async function addCatch()
{
    let obj =
    {
        angler: anglerInput.value,
        weight: weightInput.value,
        species: speciesInput.value,
        location: locationInput.value,
        bait: baitInput.value,
        captureTime: captureTimeInput.value
    };

    await fetch('https://fisher-game.firebaseio.com/catches.json', 
    {
        method: 'POST',
        body: JSON.stringify(obj)
    })
    .then(x => x.json())
    .then(x => addCatchToDiv(x.name, obj))
    .catch(() => console.log('Couldnt add new catch'));
}

async function updateCatch(id)
{
    let div = getCatchDivByDataId(id);
    let catchObj =
    {
        angler: div.children[1].value,
        weight: div.children[4].value,
        species: div.children[7].value,
        location: div.children[10].value,
        bait: div.children[13].value,
        captureTime: div.children[16].value
    };

    await fetch(`https://fisher-game.firebaseio.com/catches/${id}.json`, 
    {
        method: 'PUT',
        body: JSON.stringify(catchObj)
    })
    .catch(() => console.error(`Couldnt update catch with id ${id}`));
}

async function deleteCatch(id)
{
    await fetch(`https://fisher-game.firebaseio.com/catches/${id}.json`,
    {
        method: 'DELETE'
    })
    .then(() => 
    {
        let catchToDelete = getCatchDivByDataId(id);

        if(catchToDelete)
        {
            catchToDelete.remove();
        }
    })
    .catch(() => console.log(`Couldnt delete catch with id ${id}`));
}

function getCatchDivByDataId(dataId)
{
    return Array.from(catchesDiv.children)
        .find(x => x.getAttribute('data-id') === dataId);
}

attachEvents();

