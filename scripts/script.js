
// Burger Menu

burgerMenu = document.querySelector('.navLabel');
navBar = document.querySelector('.nav-bar')

burgerMenu.addEventListener ('click', () => {
    navBar.classList.toggle('active')
    burgerMenu.classList.toggle('animation')
})

// Progress Bar

const progressBar = document.querySelector('#progress-bar');
const body = document.querySelector('.body');
let wasDisplayed = localStorage.getItem('newsletterDisplayed');
console.log(wasDisplayed)

const animateProgressBar = () => {
    let scrollDistance = -body.getBoundingClientRect().top;
    let progressWidth = (scrollDistance / (body.getBoundingClientRect().height - document.documentElement.clientHeight))*100;
    let value = (progressWidth.toFixed(0));
    progressBar.style.width = value + '%';
    if (value < 0) {
        progressBar.style.width = '0%'; 
    }
    
    if ((wasDisplayed != 'true') && (value > 25)) {
        newsletter.style.display ='block';
        localStorage.setItem ('newsletterDisplayed', true);
    }
};

window.addEventListener('scroll', animateProgressBar);

// Scroll to Top

window.addEventListener('scroll', function() {
    let scroll = this.document.querySelector ('.scrollToTop');
    scroll.classList.toggle('active', window.scrollY > 500)
});

const returnToTopBtn = document.querySelector ('.scrollToTop');

returnToTopBtn.addEventListener("click", () => {
    setTimeout(() => {
        window.scroll({
            top: 0,
            behavior: "smooth",
        })
    }, 200)
})

// Contact Form

const form = document.getElementById('form');
const nombre = document.getElementById('name');
const email = document.getElementById('email');
const btnSubmit = document.getElementById('btn-submit');
const parrafo = document.getElementById('warnings');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    let warnings = '';
    let enter = false;
    let regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if ((nombre.value.length < 2) || (nombre.value.length > 100)) {
        warnings += `The field name is not valid <br>`;
        nombre.style.border = '2px solid red';
        enter = true;
    } else {
        nombre.style.border = '2px solid green';
    }
    if (!regexEmail.test(email.value)) {
        warnings += `The field e-mail is not valid <br>`;
        email.style.border = '2px solid red';
        enter = true;
    } else {
        email.style.border = '2px solid green';
    }

    const isChecked = document.getElementById('checkbox').checked;
    if (!isChecked) {
        warnings += `You have to accept our policies <br>`;
        // checkbox.style.border = '2px solid red';
        enter = true;
    }
    if (enter) {
        parrafo.innerHTML = warnings;  
    } else {
        parrafo.innerHTML = '';
        btnSubmit.innerHTML = 'Sent'
        // btnSubmit.style.background = '$green';
    }

})

//Newsletter Modal

const newsletter = document.querySelector('.newsletter-modal');
const newsForm = document.querySelector('#news-form');
const newsletterCloseBtn = document.querySelector ('.newsletter-closeBtn');
const submitBtn = document.querySelector ('submit-btn');

if (wasDisplayed != 'true') {
    window.addEventListener ('load', () => {
        setTimeout (()=> {
            newsletter.style.display ='block';
            localStorage.setItem ('newsletterDisplayed', true);
        }, 5000);
    });
}

newsletter.addEventListener ('click', e => {
    if (e.target == newsletter) {
        newsletter.style.display = 'none';
    }
});

newsletterCloseBtn.addEventListener ('click', () => {
    newsletter.style.display = 'none';
})

newsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    newsletter.style.display = 'none';
})
