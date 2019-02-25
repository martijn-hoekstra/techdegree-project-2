/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/***
   Add your global variables that store the DOM elements you will
   need to reference and/or manipulate.

   But be mindful of which variables should be global and which
   should be locally scoped to one of the two main functions you're
   going to create. A good general rule of thumb is if the variable
   will only be used inside of a function, then it can be locally
   scoped to that function.
***/

const container = document.querySelector('.page');
const ul = document.querySelector('.student-list');
const list = ul.children;
let amountPerPage = 10;
let amountOfPages = Math.ceil(list.length / amountPerPage);

/***
   Create the `showPage` function to hide all of the items in the
   list except for the ten you want to show.

   Pro Tips:
     - Keep in mind that with a list of 54 students, the last page
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when
       you initially define the function, and it acts as a variable
       or a placeholder to represent the actual function `argument`
       that will be passed into the parens later when you call or
       "invoke" the function
***/

const showPage = (list, page) => {
    let lastItem = page * amountPerPage;
    let firstItem = lastItem - amountPerPage;
    // Loop over items in the list parameter
    for(let i = 0; i < list.length; i += 1) {
      if(i >= firstItem && i < lastItem) {
        list[i].style.display = '';
      } else {
        list[i].style.display = 'none';
      }
    }
};
showPage(list, 1);
/***
   Create the `appendPageLinks function` to generate, append, and add
   functionality to the pagination buttons.
***/

const appendPageLinks = (list) => {
  /*
  1. ​Determine how many pages are needed for the list by dividing the
  ​total number of list items by the max number of items per page
  2. ​Create a d​iv,​ give it the “pagination” class, and append it to the .page div
  3. ​Add a u​ l​ to the “pagination” div to store the pagination links
  4. ​for​ every page, add l​i​ and ​a​ tags with the page number text
  5. ​Add an event listener to each a​ tag. When they are clicked
  ​call the showPage function to display the appropriate page
  6. Loop over pagination links to remove active class from all links
  7. Add the active class to the link that was just clicked. You can identify that
  clicked link using ​event.target ​
  */
  let div = document.createElement('div');
  let ul = document.createElement('ul');
  div.className = 'pagination';
  div.appendChild(ul);
  container.appendChild(div);

  for(let i = 0; i < amountOfPages; i++) {
    let li = document.createElement('li');
    let link = document.createElement('a');
    link.textContent = i + 1;
    li.appendChild(link);
    ul.appendChild(li);
  }

  ul.addEventListener('click', (e) => {
    const element = e.target;
    if(e.target.tagName === 'A') {
      const allLinks = ul.querySelectorAll('a');
      for(let i = 0; i < allLinks.length; i++) {
        allLinks[i].className = '';
      }
      showPage(list, e.target.textContent);
      e.target.className = 'active';
    }
  });
};
appendPageLinks(list);

const searchList = (list) => {
  
};

// Remember to delete the comments that came with this file, and replace them with your own code comments.
