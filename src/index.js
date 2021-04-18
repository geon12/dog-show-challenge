const BASE_URL = 'http://localhost:3000/dogs';




document.addEventListener('DOMContentLoaded', () => {
    fetchDogs().then(appendDogsToDOM);
    
    
})

function fetchDogs() {
    return fetch(`${BASE_URL}`)
        .then(resp => resp.json())
}

function createTableEntry(dog) {
    const tr = document.createElement('tr');
    const tdName = document.createElement('td');
    const tdBreed = document.createElement('td');
    const tdSex = document.createElement('td');
    const tdEdit = document.createElement('td');
    const button = document.createElement('button');

    tdName.textContent = dog.name;
    tdBreed.textContent = dog.breed;
    tdSex.textContent = dog.sex;

    button.textContent = 'Edit Dog';
    
    button.addEventListener('click', () => {
        populateForm(dog)
    });

    tr.appendChild(tdName);
    tr.appendChild(tdBreed);
    tr.appendChild(tdSex);

    tdEdit.appendChild(button);
    tr.appendChild(tdEdit);

    return tr;

}

function populateForm(dog) {
    
    const form = document.getElementById("dog-form");
    const tableBody = document.getElementById("table-body");
    form.name.value = dog.name;
    form.breed.value = dog.breed;
    form.sex.value = dog.sex;
    function edit(event){
        event.preventDefault();
        const dogEdits = {
            "name": form.name.value,
            "breed": form.breed.value,
            "sex": form.sex.value
        }
        editDogTable(dogEdits,dog.id).then((resp) => {
            //console.log(resp)
            fetchDogs().then((dogs) => {
            tableBody.innerHTML = "";
        
            appendDogsToDOM(dogs);
            form.reset();
            form.removeEventListener('submit',edit);
            }) 
        })

        
        
        

    }
    form.addEventListener('submit', edit);
}

function editDogTable(edits,id) {
    
    configObj = {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(edits)

    }
    return fetch(`${BASE_URL}/${id}`,configObj)
        .then(resp => resp.json())
        
    
}

function appendDogsToDOM(dogs) {
    const tableBody = document.getElementById("table-body");
    dogs.forEach( (dog) => {
        
        const dogEntry = createTableEntry(dog);
        tableBody.appendChild(dogEntry)
    });
    
}

