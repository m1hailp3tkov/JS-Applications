function solve()
{
    class Melon
    {
        constructor(weight, melonSort)
        {
            if(new.target === Melon) throw new TypeError('Abstract class cannot be instantiated directly');
            this.weight = weight;
            this.melonSort = melonSort;
            this._element = '';
        }

        get elementIndex()
        {
            return this.weight * this.melonSort.length;
        }

        toString()
        {
            return `Element: ${this._element}\nSort: ${this.melonSort}\nElement Index: ${this.elementIndex}`;
        }
    }

    class ElementMelon extends Melon
    {
        constructor(weight, melonSort)
        {
            super(weight, melonSort);
        }
    }

    class Watermelon extends ElementMelon
    {
        constructor(weight, melonSort)
        {
            super(weight, melonSort);
            this._element = 'Water';
        }
    }

    class Firemelon extends ElementMelon
    {
        constructor(weight, melonSort)
        {
            super(weight, melonSort);
            this._element = "Fire";
        }
    }

    class Earthmelon extends ElementMelon
    {
        constructor(weight, melonSort)
        {
            super(weight, melonSort);
            this._element = "Earth";
        }
    }

    class Airmelon extends ElementMelon
    {
        constructor(weight, melonSort)
        {
            super(weight, melonSort);
            this._element = "Air";
        }
    }

    class Melolemonmelon extends ElementMelon
    {
        constructor(weight, melonSort)
        {
            super(weight, melonSort);
            this._element = 'Water';
        }

        morph()
        {
            if(this._element == 'Water'){ this._element = 'Fire'; return; }
            if(this._element == 'Fire'){ this._element = 'Earth'; return; }
            if(this._element == 'Earth'){ this._element = 'Air'; return; }
            if(this._element == 'Air'){ this._element = 'Water'; return; }
        }
    }

    return {Melon, Watermelon, Firemelon, Earthmelon, Airmelon, Melolemonmelon};
}