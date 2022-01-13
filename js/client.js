const socket=io('http://localhost:8000');


/*for querySelector, # will select the id and . will select the class  and nothing(just name) will select the CSS thing. like h2.*/

/*
const container2=document.querySelector('#container2');\
const result=container2.querySelector(".box");

first  box class inside the container with id container2,and NOT the one under the whole godamn document.


*/

const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageInp');
const messageContainer=document.querySelector(".container");

var audio=new Audio('HIGHPI_1.WAV');

const append=(message,position)=>{

    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');  
    /*this 'message' here is the class message one, 
    and not the message in the append function*/
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position==left)
    {audio.play();}
    
    
}

form.addEventListener('submit',(e)=>{
    e.preventDefault(); /*page wont reload if you use this*/
    const message = messageInput.value;
    append(`You : ${message}`,'right');
    socket.emit('send',message);
    messageInput.value='';
})


const name=prompt("enter your name to join");

socket.emit('new-user-joined',name);

socket.on('user-joined',data=>{
append(`${name} joined the chat.`,`right`)
})

socket.on('receive',data=>{
    append(`${data.name}:${data.message}`,`left`)
    })

    socket.on('left',name=>{
        append(`${data.name} left the chat`,'left')
        })