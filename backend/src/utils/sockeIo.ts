import {Server} from "socket.io";
var cron = require('node-cron');



export const SocketConnection = (io:any) =>{
    io.on("connection", (socket:any) => {
        console.log("New client connectedkkkkk");
       // console.log("New client connected",cron.validate());
       // console.log("New client connected",cron.getTasks());
      
        cron.schedule('* * * * *', () => {
          console.log('running a task every minute');
        //  getApiAndEmit(socket)
        });
        socket.on("disconnect", () => {
          console.log("Client disconnected");
        });
      });
}

  
  
  
  const getApiAndEmit = (socket:any) => {
    console.log('Send to the client');
    
    const response = {
      date:new Date(),
      time:5
    }
    // Emitting a new message. Will be consumed by the client
    socket.emit("FromAPI", response);
  };
  