(async () => {
     await renderCatTemplate();
     attachButtonEventHandlers();

     async function renderCatTemplate() 
     {
         const catsSection = document.getElementById('allCats');
         const source = await fetch('http://127.0.0.1:5500/02.%20HTTP%20Status%20Cats/cats.hbs')
         .then(x => x.text());

         const template = Handlebars.compile(source);
         const catsHtml = template({cats: window.cats});

         catsSection.innerHTML = catsHtml;
     }

     function attachButtonEventHandlers()
     {
         const buttons = document.getElementsByClassName('showBtn');

         for(let button of buttons)
         {
             button.addEventListener('click', e => showInfo(e.target));
         }
     }

     function showInfo(target)
     {
        target.parentNode.childNodes[3].style.display = 'block';
     }
 
})();
