(function()
{
    Array.prototype.last = function()
    {
        return this[this.length-1];
    }
    
    Array.prototype.skip = function(n)
    {
        return this.slice(n);
    }
    
    Array.prototype.take = function(n)
    {
        return this.slice(0, n);
    }
    
    Array.prototype.sum = function()
    {
        let n = 0;
        for(let i=0; i<this.length; i++)
        {
            n+=this[i];
        }
    
        return n;
    }
    
    Array.prototype.average = function()
    {
        return this.sum()/this.length;
    }
}())
