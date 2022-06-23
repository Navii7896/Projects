
//importing express,app,bodyparser,sequelize modules and declare port



const express = require('express');
const Var = express();  //middle ware modules.
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
const port=7013;



//configure the body parser


Var.use(bodyParser.json())
Var.use(bodyParser.urlencoded({extended:false}))   //here we have to use urlencoded to get the data in encoded form.



// connecting with database


const sequelize = new Sequelize("NAVEENDB", "NAVEEN", "naveen@123", {dialect: "mysql",})

sequelize.authenticate().then(() =>{
    console.log('connection made succefully')})
.catch((err)=>console.log(err,'this has a err'))


//creating a table


const BankUserDetails = sequelize.define('BankUserDetails',{

    username:Sequelize.STRING,
    Job:Sequelize.TEXT,
    WorkingHours:Sequelize.FLOAT,
    Salary:Sequelize.INTEGER
},{Name:"BankUserDetails"});



//  return BankUserDetails;




BankUserDetails.sync();  //sync is user generate table in mysql



//getting simple req

 
// app.get("/" ,(req, res) => {
//     res.send('it is my first server');
// })


/////post/////////Inserting data to a table


Var.post('/',async(req, res)=>{
    const username = req.body.username;
    const Job = req.body.Job;
    const WorkingHours= req.body.WorkingHours;
    const Salary = req.body.Salary;
    const saveBlog = BankUserDetails.build({username,Job,WorkingHours,Salary});

    await saveBlog.save()
    res.send("Data Inserted")
});


///////get//////////


Var.get("/",async(req, res) =>{
    const alldata = await BankUserDetails.findAll();// whenever we dealing with any third party application we hae to use async.
    res.json(alldata)
});


////////put/////////////////

Var.put("/:id", (req, res) => {m
    const data = req.body.data;
    BankUserDetails.update(
    {
    WorkingHours: data,
    },
    {
    where: {
    id: req.params.id,
    },
    }
    );
    res.redirect("/"); //it will redirect to home page
    });


////////Delete////////////

Var.delete("/:id", (req, res) => {
    BankUserDetails.destroy(
    {
    where: {
    id: req.params.id,
    },
    }
    );
    res.redirect("/");
    
    });



//creating server

Var.listen(port,()=>{
    console.log('server starts at http://localhost:${port}')
    });