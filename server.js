const { stat } = require('fs')
const http = require('http')
const { url } = require('inspector')
const { buffer } = require('node:stream/consumers')

const todos =[{
    id:"1",name:"todo One",
    description:"Ok"
},
{
    id:"2",name:"todo two",
    description:"Ok"
},
{
    id:"3",name:"todo three",
    description:"Ok"
},
{
    id:"4",name:"todo four",
    description:"Ok"
}]

const server = http.createServer((req,res)=>{
    const {method,url}= req;
    
    // const{headers,url,method}=req;
    // console.log(headers,url,method)
    // res.statusCode=404;
   
  
    // res.write('<h1>Hello</h1>')(

    let body = [];
   

    req.on('data',chunk =>{
        body.push(chunk);
    }).on('end',()=>{

        
        body=Buffer.concat(body).toString();

        let status = 404;
        let response = {
            success : false,
            data: null,
            error:null
        }
    
        if(method==='GET'&&url==='/todos'){
            status = 200;
            response.success= true;
            response.data=todos;
        }
        else if(method==='POST'&&url==='/todos'){
            
            const{id,name,description}=JSON.parse(body)
            if((!id)||(!name)||(!description)){
                status =400;
                response.error="Please enter all fields"
            }else{
               todos.push({id,name,description})
                status = 201;
                response.success=true;
                response.data=todos;
            }
            
        }

        res.writeHead(status,{
            'content-Type':' /json',
            'X-Powered-By':'Node.js'
         })
         res.end(JSON.stringify(response)); 
    })
  

  
  

   
    

    console.log(req)
   
})


const PORT = 5000;
server.listen(PORT,()=>{
    console.log(`server Running on port ${PORT}`)
});