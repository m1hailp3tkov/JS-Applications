function getInfo() 
{
    let value = document.querySelector("#stopId").value;
    let url = `https://judgetests.firebaseio.com/businfo/${value}.json`;

    const stopName = document.querySelector("#stopName");
    const busesUl = document.querySelector("#buses")

    fetch(url)
    .then(result => result.json())
    .then(data => 
    {
        const {name, buses} = data;

        stopName.textContent = name;
        
        for(let bus in buses)
        {
            let li = document.createElement('li');
            li.textContent = `Bus ${bus} arrives in ${buses[bus]} minutes`;
            busesUl.appendChild(li);
        }
    })
    .catch();
}