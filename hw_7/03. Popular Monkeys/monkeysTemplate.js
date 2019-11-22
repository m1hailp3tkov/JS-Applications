(async () => 
{
    let source = await fetch('http://127.0.0.1:5500/03.%20Popular%20Monkeys/monkeys.hbs')
    .then(x => x.text());

    const monkeysDiv = document.querySelector("body > section > div");
    const buttons = document.getElementsByTagName('button');

    let template = Handlebars.compile(source);

    monkeysDiv.innerHTML = template({monkeys: window.monkeys});

    for(let button of buttons)
    {
        button.addEventListener('click', e =>
        {
            e.target.parentNode.querySelector('p').style.display = 'block';
        });
    }
})();