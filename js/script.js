/***
   Creates an element based on four parameters:
   1. The name of the element, for example 'div'
   2. What element to append it to (the parent) (optional)
   3. The textContent of the element (optional)
   4. The class name to be used (optional)
***/

const createElement = (elementName, appendTo, text, className) => {
  let element = document.createElement(elementName);
  if(appendTo !== undefined) {
    appendTo.appendChild(element);
  }
  if(text !== undefined && text !== '') {
    element.textContent = text;
  }
  if(className !== undefined && className !== '') {
    element.className = className;
  }
  return element;
};


/***
   Select and create important elements for use further in the script
***/

const container = document.querySelector('.page');
const ul = container.querySelector('.student-list');
const listOfStudents = ul.children;
const div = createElement('div', container);
const pagination = createElement('ul', div, '', 'pagination');

// Sets the amount of students displayed on one page
let amountPerPage = 10;


/***
   Creates search input for users to search through students and
   display only matching results on the page
***/

const searchStudents = list => {
  // Create and append search input and search button
  const pageHeader = container.firstElementChild;
  const studentSearchDiv = createElement('div', pageHeader, '','student-search');
  const searchInput = createElement('input', studentSearchDiv);
  searchInput.placeholder = 'Search for students...';
  const searchButton = createElement('button', studentSearchDiv, 'Search');

  // Filters students based on input value
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

      // Search through both the name and email and adds the student to the array
      // if there are matching values
      if(studentName.includes(searchValue) || studentMail.includes(searchValue)) {
        students.push(student);
      }
    }
    // Hide all students
    hideAllStudents(listOfStudents);

    // Display students on page if showPage() returns an array,
    // otherwise display to the user no results were found.
    let page = showPage(students);
    if(students.length) {
      for(let i = 0; i < page.length; i++) {
        page[i].style.display = '';
      }
      appendPageLinks(students);
    } else {
      appendPageLinks(students);
      const div = createElement('div', container);
      const noResultsMessage = `<p>We couldn't find any results for "${searchInput.value}".</p>`;
      div.innerHTML = noResultsMessage;
      div.id = 'no_results';
      div.style.textAlign = 'center';
    }
  };

  // Event listeners for both the search textfield and the button
  searchInput.addEventListener('keyup', filterList);
  searchButton.addEventListener('click', filterList);
};


/***
   Return an array of students that needs to be displayed on the active page
***/

const showPage = (list, page = 1) => {
    // Calculate the indexes of the students that
    // needs to be displayed
    const lastItem = page * amountPerPage;
    const firstItem = lastItem - amountPerPage;

    const listLength = list.length;
    let students = [];

    // Loop over students in the list parameter and add
    // them to the students array if the conditions apply
    if(listLength) {
      for(let i = 0; i < listLength; i++) {
        if(i >= firstItem && i < lastItem) {
          students.push(list[i]);
        }
      }
      return students;
    }
};

// Hides all students
const hideAllStudents = list => {
  for(let i = 0; i < list.length; i++) {
    list[i].style.display = 'none';
  }
};


/***
   Create pagination buttons where every button will
   trigger a click event and loads a new page of students based
   on the page number that's been clicked.
***/

const appendPageLinks = list => {
  // Checks if the 'no results' message is displayed,
  // and removes if it is
  if(document.getElementById('no_results')) {
    container.removeChild(document.getElementById('no_results'));
  }
  pagination.innerHTML = '';

  // Calculate how many pages there needs to be
  const amountOfPages = Math.ceil(list.length / amountPerPage);
  const listLength = list.length;

  if(listLength > amountPerPage) {
    // Create and append pagination buttons
    for(let i = 0; i < amountOfPages; i++) {
      const li = createElement('li', pagination);
      const link = createElement('a', li, i + 1);
      link.style.cursor = 'pointer';
    }

    // Display the first page
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

        // Set clicked button's class to active
        e.target.className = 'active';
      }
    });
  }
};

hideAllStudents(listOfStudents);
appendPageLinks(listOfStudents);
searchStudents(listOfStudents);
