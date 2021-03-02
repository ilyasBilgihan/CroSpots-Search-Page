const body = document.querySelector('body');
const selectboxes = document.querySelectorAll('.selectbox');
const hamburger = document.querySelector('header .hamburger');
const options = document.querySelectorAll('.options li');
const searchField = document.querySelector('.search-field');
const input = document.querySelector('.input input');
const form = document.querySelector('.search-field form');
const searchResults = document.querySelector('.search-field .search-results');

selectboxes.forEach((selectbox)=>{
  selectbox.addEventListener('click', (e)=>{
    selectbox.classList.toggle('active');
  })
})

options.forEach((option)=>{
  option.addEventListener('click', (e)=>{
    var beforeSelect = e.path[2].children[1].children[0]; // Already Selected
	var afterSelect = e.target // New selected
	var input = e.path[2].children[0]; // Hidden Input
    var temp = afterSelect.innerText;

	// If the alredy selected value is not the default, swap it with new selected one.
    if(beforeSelect.innerText.toLowerCase() == "tagged by" || beforeSelect.innerText.toLowerCase() == "location"){
      afterSelect.remove();
    }else {
      afterSelect.innerText = beforeSelect.innerText;
    }

    beforeSelect.innerText = temp;
	
	// Change the input value to 'all' if selected options are 'all website' or 'whatever'
    if(temp.toLowerCase() == "all website" || temp.toLowerCase() == "all tags"){
      temp = "all";
    }
    input.value = temp.toLowerCase();
    
  })
})


input.addEventListener('focus', () => {
  
  // If 'searchResults' is closing then do not apply 'focus' 
  if(!body.classList.contains('closed')){
    searchField.classList.add('focused')
  }
})

input.addEventListener('blur', () => {
  window.addEventListener('click', (e)=> {
	// If input has filled or the click is inside the '.search-field' then do not remove 'focused' status. 

    if(!e.target.closest('.search-field') && !input.value){
      searchField.classList.remove('focused')
    }
  })
})


form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Query stuff here ..
  // Also close the hamburgerMenu here if it is open
  
  if(input.value){
    body.classList.add('searched');
    searchResults.classList.add('searched');

    setTimeout(()=>{ 
      hamburger.classList.add('searched');
      searchResults.classList.add('show-results');
    }, 1000)
  }


})

hamburger.addEventListener('click', ()=> {
  if(hamburger.classList.contains("searched")){
	
    body.classList.add('closed');
    input.value = ""; // Erase the searched words
    searchResults.classList.remove('show-results');
    
    setTimeout(()=> { 
      body.classList.remove('searched'); 
      body.classList.remove('closed');
      searchResults.classList.remove('searched');

    }, 500)
    setTimeout(()=>{ 
      hamburger.classList.remove('searched')
    }, 1500)
    
  }else {
	  
	// Open/close hamburgerMenu or something ..
  }
})

