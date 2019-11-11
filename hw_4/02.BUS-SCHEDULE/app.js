function solve() {

    let stop = {name: 'Depot', next: '0361'};

    const info = document.querySelector("#info > span");
    const departButton = document.querySelector("#depart");
    const arriveButton = document.querySelector("#arrive");

    function depart() 
    {
        info.textContent = `Next stop - ${stop.name}`;
        departButton.disabled = true;
        arriveButton.disabled = false;
    }
    
    function arrive()
    {
        fetch(`https://judgetests.firebaseio.com/schedule/${stop.next}.json`)
        .then(data => data.json())
        .then(nextStop => 
        {
            stop.name = nextStop.name;
            stop.next = nextStop.next;
            console.log(nextStop);
        })
        .catch();

        info.textContent = `Arriving at ${stop.name}`;
        departButton.disabled = false;
        arriveButton.disabled = true;
    }
    
    return {
        depart,
        arrive
    };
}

let result = solve();