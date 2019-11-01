class Hex
{
    constructor(value)
    {
        this.value = value;
    }

    valueOf()
    {
        return this.value;
    }

    toString()
    {
        return `0x${this.value.toString(16).toUpperCase()}`;
    }

    plus(obj)
    {
        let result = new Hex(this.value);
        
        if(obj instanceof Hex)
        {
            result.value += obj.value;
        }
        else if(typeof obj === 'number')
        {
            result.value += obj;
        }

        return result;
    }

    minus(obj)
    {
        let result = new Hex(this.value);

        if(obj instanceof Hex)
        {
            result.value -= obj.value;
        }
        else if(typeof obj === 'number')
        {
            result.value -= obj;
        }

        return result;
    }

    parse(str)
    {
        return parseInt(str,16);
    }
}

let FF = new Hex(255);
console.log(FF.toString());
FF.valueOf() + 1 == 256;
let a = new Hex(10);
let b = new Hex(5);
console.log(a.plus(b).toString());
console.log(a.plus(b).toString()==='0xF');
