function solve()
{
    return { 
        extend:
        function(template)
        {
            for(let f in template)
            {
                if(typeof template[f] === 'function')
                {
                    Object.getPrototypeOf(this)[f] = template[f];
                }
                else
                {
                    this[f] = template[f];
                }
            }
            console.log(this);
        }
    }
}

let a = solve();

a.extend({prop: 1, meme: function(){console.log('memed ')}});
a.meme();
