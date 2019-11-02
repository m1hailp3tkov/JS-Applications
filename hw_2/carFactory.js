function solve(requirements)
{
    let engines = 
    [
        { power: 90, volume: 1800 },
        { power: 120, volume: 2400 },
        { power: 200, volume: 3500 }
    ];

    let car =
    {
        model: requirements.model,
        carriage: {type: requirements.carriage, color: requirements.color}
    };

    for(let e of engines)
    {
        if(e.power >= requirements.power)
        {
            car.engine = e;
            break;
        }
    }

    if(requirements.wheelsize % 2 == 0)
    {
        car.wheels = [requirements.wheelsize-1, requirements.wheelsize-1, requirements.wheelsize-1, requirements.wheelsize-1];
    }
    else
    {
        car.wheels = [requirements.wheelsize, requirements.wheelsize, requirements.wheelsize, requirements.wheelsize];
    }

    return car;
}

let a = solve({ model: 'VW Golf II',
power: 90,
color: 'blue',
carriage: 'hatchback',
wheelsize: 14 });

console.log(a);