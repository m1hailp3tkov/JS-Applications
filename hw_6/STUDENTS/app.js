const username = 'mihail';
const password = '123456';
const url = 'https://baas.kinvey.com/appdata/kid_SJRQa2ehB/students';

const tBody = document.querySelector("#results > tbody");

function generateHeaders(type, body)
{
    let obj = 
    {
        method: type,
        headers:
        {
            'Authorization': `Basic ${btoa(`${username}:${password}`)}`
        }
    }

    if(type !== 'GET') obj.headers['Content-Type'] = 'application/json';
    if(body) obj.body = body;

    return obj;
}

async function displayStudents()
{
    let students;

    await fetch(url, generateHeaders('GET'))
    .then(x => x.json())
    .then(x => students = x);

    students.sort((a,b) => a.ID - b.ID);

    for(let s of students)
    {
        let tr = document.createElement('tr');
        
        let id = createTd();
        id.textContent = s.ID;
        let firstName = createTd();
        firstName.textContent = s.FirstName;
        let lastName = createTd();
        lastName.textContent = s.LastName;
        let facNum = createTd();
        facNum.textContent = s.FacultyNumber;
        let grade = createTd();
        grade.textContent = s.Grade;

        tr.appendChild(id);
        tr.appendChild(firstName);
        tr.appendChild(lastName);
        tr.appendChild(facNum);
        tr.appendChild(grade);

        tBody.appendChild(tr);
    }
}

function createTd()
{
    return document.createElement('td');
}

displayStudents();
