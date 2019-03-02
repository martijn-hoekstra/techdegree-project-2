/***
   Select and create important elements
***/

const container = document.querySelector('.page');
const ul = container.querySelector('.student-list');
const listOfStudents = ul.children;

const div = document.createElement('div');
const pagination = document.createElement('ul');
pagination.className = 'pagination';
div.appendChild(pagination);
container.appendChild(div);

// Sets the amount of students displayed on one page
let amountPerPage = 10;


/***
   Creates search input for users to search through students and
   display only matching results on the page
***/

const searchStudents = list => {
  // Create and append search input and search button
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

  // Filters students
  const filterList = () => {
    let students = [];
    const searchValue = searchInput.value.toLowerCase();
    const listLength = list.length;

    for(let i = 0; i < listLength; i++) {
      const student = list[i];
      const studentName = student.querySelector('h3')
                        .textContent
                        .toLowerCase();
      const studentMail = student.querySelector('.email')
                        .textContent
                        .toLowerCase();

      if(studentName.includes(searchValue) || studentMail.includes(searchValue)) {
        students.push(student);
      }
    }
    // Hide all students
    hideAllStudents(listOfStudents);

    // Display students on page
    let page = showPage(students);
    if(students.length) {
      for(let i = 0; i < page.length; i++) {
        page[i].style.display = '';
      }
      appendPageLinks(students);
    } else {
      appendPageLinks(students);
      const div = document.createElement('div');
      const noResultsMessage = `<p>We couldn't find any results for "${searchInput.value}".</p>`;
      div.innerHTML = noResultsMessage;
      div.id = 'no_results';
      div.style.textAlign = 'center';
      container.appendChild(div);
    }
  };

  searchInput.addEventListener('keyup', filterList);
  searchButton.addEventListener('click', filterList);
};


/***
   Return an array of students that needs to be displayed on the active page
***/

const showPage = (list, page = 1) => {
    const lastItem = page * amountPerPage;
    const firstItem = lastItem - amountPerPage;
    const listLength = list.length;
    let students = [];

    // Loop over items in the list parameter
    if(listLength) {
      for(let i = 0; i < listLength; i++) {
        if(i >= firstItem && i < lastItem) {
          students.push(list[i]);
        }
      }
      return students;
    }
};

// Hide all students
const hideAllStudents = list => {
  for(let i = 0; i < list.length; i++) {
    list[i].style.display = 'none';
  }
};


/***
   Create pagination buttons where every button will listen
   trigger a click event and loads a new page of students based
   on the page number that's been clicked.
***/

const appendPageLinks = list => {
  if(document.getElementById('no_results')) {
    container.removeChild(document.getElementById('no_results'));
  }
  pagination.innerHTML = '';
  const amountOfPages = Math.ceil(list.length / amountPerPage);
  const listLength = list.length;

  if(listLength > amountPerPage) {
    // Create and append pagination buttons
    for(let i = 0; i < amountOfPages; i++) {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.textContent = i + 1;
      link.style.cursor = 'pointer';
      li.appendChild(link);
      pagination.appendChild(li);
    }

    let page = showPage(list);
    for(let i = 0; i < page.length; i++) {
      page[i].style.display = '';
    }

    // Add click event listener to every pagination button
    pagination.addEventListener('click', (e) => {
      const element = e.target;
      const pageNumber = e.target.textContent;
      const allLinks = pagination.getElementsByTagName('a');
      const allLinksLength = allLinks.length;
      if(e.target.tagName === 'A') {
        // Remove all 'active' classes on pagination buttons
        for(let i = 0; i < allLinksLength; i++) {
          allLinks[i].className = '';
        }

        // Hide all students
        hideAllStudents(listOfStudents);

        // Display students on page
        let page = showPage(list, pageNumber);
        for(let i = 0; i < page.length; i++) {
          page[i].style.display = '';
        }
        e.target.className = 'active';
      }
    });
  }
};

hideAllStudents(listOfStudents);
appendPageLinks(listOfStudents);
searchStudents(listOfStudents);
