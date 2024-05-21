const form = document.querySelector(".feedback-form");
const LS_KEY = "feedback-form-state";

form.addEventListener('input', () => {
    const formData = new FormData(form);
   
    const userData = {
        email: formData.get('email').trim(),
        message: formData.get('message').trim(),
    };
    
    saveToLS(LS_KEY, userData);
})

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);

    const email = formData.get('email').trim();
    const message = formData.get('message').trim();

    if (email && message ) {
        console.log({ email, message });  
    } else {
        alert("Fill please all fields.");
    };
    localStorage.removeItem(LS_KEY);
    form.reset();   
})

function saveToLS(key, value) {
    const json = JSON.stringify(value);
    localStorage.setItem(key, json);
}

function loadFromLS(key) {
    const data = localStorage.getItem(key);
    try { return JSON.parse(data); }
    catch {
        return data;
    }
}

function formElem() {
    
    const result = loadFromLS(LS_KEY);
    // console.log(result.email, result.message);
    if (result === null) {
        return;
    }
    
    form.elements.email.value = result.email;
    form.elements.message.value = result.message;
    
}

formElem();
