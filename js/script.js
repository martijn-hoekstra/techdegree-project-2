/***
   Comment
***/

const container = document.querySelector('.page');
const ul = document.querySelector('.student-list');
const list = ul.children;

let div = document.createElement('div');
let pagination = document.createElement('ul');
pagination.className = 'pagination';
div.appendChild(pagination);
container.appendChild(div);

let amountPerPage = 10;

/***
   Comment
***/

const searchStudents = (list) => {
  const pageHeader = container.firstElementChild;
  const studentSearchDiv = document.createElement('div');
  studentSearchDiv.className = 'student-search';
  const searchInput = document.createElement('input');
  searchInput.placeholder = 'Search for students...';
  studentSearchDiv.appendChild(searchInput);
  const searchButton = document.createElement('button');
  searchButton.textContent = 'Search';
  studentSearchDiv.appendChild(searchButton);
  pageHeader.appendChild(studentSearchDiv);

  const filterList = () => {
    let searchValue = searchInput.value.toLowerCase();

    for(let i = 0; i < list.length; i++) {
      let student = list[i];
      let studentName = student.querySelector('h3').textContent.toLowerCase();
      let studentEmail = student.querySelector('.email').textContent.toLowerCase();

      if(studentName.includes(searchValue) || studentEmail.includes(searchValue)) {
        //console.log(studentName.search(searchValue));
        list[i].style.display = 'block';
      } else {
        list[i].style.display = 'none';
      }
    }
    let searchResult = ul.querySelectorAll('li[style*="display: block;"]');
    //console.log(searchResult);
    showPage(searchResult, 1);
  };

  searchInput.addEventListener('keyup', filterList);
  searchButton.addEventListener('click', filterList);
};


/***
   Comment
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
    appendPageLinks(list);
};


/***
   Comment
***/

const appendPageLinks = (list) => {
  pagination.innerHTML = '';
  let amountOfPages = Math.ceil(list.length / amountPerPage);

  if(!(list.length < 10)) {
    for(let i = 0; i < amountOfPages; i++) {
      let li = document.createElement('li');
      let link = document.createElement('a');
      link.textContent = i + 1;
      li.appendChild(link);
      pagination.appendChild(li);
    }
    pagination.addEventListener('click', (e) => {
      const element = e.target;
      if(e.target.tagName === 'A') {
        const allLinks = pagination.querySelectorAll('a');
        for(let i = 0; i < allLinks.length; i++) {
          allLinks[i].className = '';
        }
        showPage(list, e.target.textContent);
        e.target.className = 'active';
      }
    });
  }
};

showPage(list, 1);
searchStudents(list);
