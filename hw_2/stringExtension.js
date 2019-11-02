(function solve()
{
    String.prototype.ensureStart = 
    function(str)
    {
        if(!this.startsWith(str))
        {
            return `${str}${this}`;
        }

        return this.toString();
    };

    String.prototype.ensureEnd = 
    function(str)
    {
        if(!this.endsWith(str))
        {
            return `${this}${str}`;
        }

        return this.toString();
    };

    String.prototype.isEmpty = function()
    {
        return this.length === 0;
    };

    String.prototype.truncate = function(n)
    {
        if(n <= 3)
        {
            return '.'.repeat(n);
        }

        if(n >= this.length)
        {
            return this.toString();
        }
        else
        {
            let indexOf = this.substr(0, n - 2).lastIndexOf(' ');

            if(indexOf !== -1)
            {
                return this.substr(0, indexOf).toString() + '...';
            }
            else
            {
                return this.substr(0, n - 3) + '...';
            }
        }
    }

    String.format = function(string, ...params)
    {
        return params
        .reduce((prev, current, i) => {
            prev = prev.replace(`{${i}}`, current);

            return prev;
        }, string);
    }
    
}())

let str = 'my string';
console.log(str);
str = str.ensureStart('my');console.log(str);
str = str.ensureStart('hello ');console.log(str);
str = str.truncate(16);console.log(str);
str = str.truncate(14);console.log(str);
str = str.truncate(8);console.log(str);
str = str.truncate(4);console.log(str);
str = str.truncate(2);console.log(str);
