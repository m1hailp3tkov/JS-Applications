(function()
{
    document.getElementById('btnLoadTowns')
    .addEventListener('click', async function()
    {
        const townsInput = document.getElementById('towns');
        let townNames = townsInput.value.split(', ');

        const source = await fetch('http://127.0.0.1:5500/01.%20List%20Towns/towns.hbs')
        .then(x => x.text());

        const template = Handlebars.compile(source);
        const context = {towns: townNames};

        const townsHtml = template(context);

        document.getElementById('root').innerHTML = townsHtml;
    });
})();
