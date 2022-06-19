const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
const port=7003;

//configure the body parser

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


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
},{tableName:"BankUserDetails"});

BankUserDetails.sync();


//getting simple req

 
app.get("/" ,(req, res) => {
    res.send('it is my first server');
})


/////post/////////Inserting data to a table


app.post('/',async(req, res)=>{
    const username = req.body.username;
    const Job = req.body.Job;
    const WorkingHours= req.body.WorkingHours;
    const Salary = req.body.Salary;
    const saveBlog = BankUserDetails.build({username,Job,WorkingHours,Salary});

    await saveBlog.save()
    res.send("Data Inserted")
});


///////get//////////


app.get("/",async(req, res) =>{
    const alldata =  BankUserDetails.findAll();
    res.json(alldata)
});


////////put/////////////////

app.put("/:id", (req, res) => {
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
    res.redirect("/"); 
    });


////////Delete////////////

app.delete("/:id", (req, res) => {
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

app.listen(port,()=>{
    console.log('server starts at http://localhost:${port}')
    });