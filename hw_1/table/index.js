function solve()
{
   const tbody = document.querySelector("body > table > tbody");
   
   console.log(tbody.children);

   Array.from(tbody.children)
   .forEach(tr =>
   {
         tr.addEventListener('click', e => onSelect(e.target.parentNode));
   });
   
   function onSelect(target)
   {
      if(target.hasAttribute('style'))
      {
         target.removeAttribute('style');
      }
      else
      {
         Array.from(target.parentNode.children)
         .forEach(tr => tr.removeAttribute('style'));  

         target.style.backgroundColor = '#413f5e';
      }
   }
}
