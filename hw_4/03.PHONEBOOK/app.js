function attachEvents() 
{
    const btnLoad = document.getElementById('btnLoad');
    const btnCreate = document.getElementById('btnCreate');
    btnLoad.addEventListener('click', load);
    btnCreate.addEventListener('click', create);

    const ul = document.getElementById('phonebook');
    const personInput = document.getElementById('person');
    const phoneInput = document.getElementById('phone');

    async function load()
    {
        while(ul.firstChild)
        {
            ul.removeChild(ul.firstChild);
        }

        await fetch('https://phonebook-nakov.firebaseio.com/phonebook.json')
        .then(data => data.json())
        .then(data => 
        {
            for(let entry in data)
            {
                let li = document.createElement('li');
                let div = document.createElement('div');
                div.textContent = `${data[entry].person ? data[entry].person : data[entry].name}: ${data[entry].phone}`;
                    
                let btn = document.createElement('button');
                btn.setAttribute('entryId', entry);
                btn.textContent = 'Delete';
                btn.addEventListener('click', delete_);

                li.appendChild(div);
                li.appendChild(btn);
                ul.appendChild(li);
            }
        });
    }

    async function create()
    {
        let newEntry = 
        {
            person: personInput.value,
            phone: phoneInput.value
        };

        await fetch('https://phonebook-nakov.firebaseio.com/phonebook.json', 
        {
            method: 'POST',
            body: JSON.stringify(newEntry),
            headers: 
            {
                'Content-Type': 'application/json'
            }
        })
        .catch();

        await load();
    }

    async function delete_()
    {
        await fetch(`https://phonebook-nakov.firebaseio.com/phonebook/${this.getAttribute('entryId')}.json`, 
        {
            method: 'DELETE'
        })
        .catch(e => console.log(e));

        this.parentNode.remove();
    }
}

attachEvents();