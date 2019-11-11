const textarea = document.getElementById('messages');

function attachEvents() 
{
    const sendBtn = document.getElementById('submit');
    const refreshBtn = document.getElementById('refresh');

    sendBtn.addEventListener('click', sendMessage);
    refreshBtn.addEventListener('click', refresh);
}

async function sendMessage()
{
    const authorField = document.getElementById('author');
    const contentField = document.getElementById('content');

    let message =
    {
        author: authorField.value,
        content: contentField.value
    };

    await fetch('https://rest-messanger.firebaseio.com/messanger.json', 
    {
        method: 'POST',
        body: JSON.stringify(message),
        headers: 
        {
            'Content-Type': 'application/json'
        }
    })
    .then(data => data.json())
    .catch();

    textarea.textContent += `\n${message.author}: ${message.content}`;

    scrollToBottom();
}

async function refresh()
{
    await fetch('https://rest-messanger.firebaseio.com/messanger.json')
    .then(data => data.json())
    .then(data => 
    {
        let messages = [];
        for(let entry in data)
        {
            messages.push(data[entry]);
        }

        let textContent = messages.map(m => `${m.author}: ${m.content}`).join('\n');
        
        textarea.textContent = textContent;
    })
    .catch();

    scrollToBottom();
}

function scrollToBottom()
{
    textarea.scrollTop = textarea.scrollHeight;
}

attachEvents();