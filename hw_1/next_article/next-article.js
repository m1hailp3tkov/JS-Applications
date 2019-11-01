function getArticleGenerator(articles) 
{
    let count = 0;

    return function()
    {
        if(count < articles.length)
        {
            let contentDiv = document.querySelector("#content");
            
            let newDiv = document.createElement('article');
            newDiv.textContent = articles[count++];

            contentDiv.appendChild(newDiv);
        }
    }
}