//Node server which will handle socket.io connections.

const io=require('socket.io')(8000);// u can take any port. we have used 8000 here.

const users={};


//this socket.io will listen to the incoming servers.



//io.on is socket.io instance,which will listen to many socket connections. like harry,sejal etc.
//socket.on 

io.on('connection',socket =>{
    socket.on('new-user-joined',name=>{
    //console.log("New User",name);

       users[socket.id]=name;

       socket.broadcast.emit('user-joined',name)
    });

    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message: message,name:users[socket.id]})
    });

    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id])
        delete users[socket.id];
    });
});