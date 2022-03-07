const express = require("express");
const app = express();
const port = 3000;


app.get('/',(req,res) => {
    res.send('hey');
})


app.listen(port);


// const { json } = require('express');
// const http = require('http');

// const server = http.createServer((req,res) => {
//     const user = {
//             Name : "Adhavan",
//             Age : "20"
//         } 
//     res.setHeader('Content-Type', 'application/json');
//     res.end(JSON.stringify(user))
    
// })
// server.listen(3000);

// const express = require("express");
// const app = express();
// const port = 3000;
// const user = {
//    Name : "Adhavan",
//    Age : "20"
// }

// app.post('/',(rep,res) => {
//    res.setHeader('Content-Type','application/json');
//    res.end(JSON.stringify(user))
// })

// app.listen(port, console.log(`Your server listening on localhost ${port}`));
// app.listen(port, () => { 
//    console.log(`Your server listening on localhost ${port}`)
// });


// const express = require("express");
// const app = express()
// const port = 3000;
// const user = {
//     name: "adhavan",
//     age:20
// }
// const user1 = {
//     name: "adhavan",
//     age:21
// }
// //get
// app.get('/', (req,res)=> {
//     // res.setHeader("Content-Type","application/json");
//     // res.end(JSON.stringify(user))
//     res.send(user);
//     console.log("Hey");
// })

// //post
// app.post('/', (req,res)=> {
//     res.send(user1);
// })

// //

// app.listen(port, console.log(`Your server listening on localhost ${port}`));