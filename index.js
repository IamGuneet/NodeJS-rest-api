const Joi = require('joi');
const express = require('express');
const app = express();


app.use(express.json());

//
const courses = [{ id: 1, name: "course1" }, { id: 2, name: "course2" },]

app.get('/', (req, res) => {
    res.send("hello")
});

app.get('/api/courses', (req, res) => { res.send([1, 2, 3, 4, 5, 6]) });


app.post('/api/courses', (req, res) => {
    //schema for data validation using Joi package
    const schema = {
        name:Joi.string().min(3).required()
    };


    // const result = new Joi.ValidationError(req.body,schema);
    // console.log(result);
    //data validation 
    if (!req.body.name || req.body.name.length < 3) {
        res.status(400).json({ error: "invalid data" });
    } else {

        const course = {
            id: courses.length + 1,
            name: req.body.name
        }
        courses.push(course);
        res.send(course);
    }
})

app.put('/api/courses/:id',(req,res) =>{
    //Look up the course
    if(!courses[parseInt(req.body.id -1)]){
        res.status(404).json({error:"no such data found."})
    }
    if (!req.body.name || req.body.name.length < 3) {
            res.status(400).json({ error: "invalid data" });
        }
     else{
        courses[req.body.id-1].name = toString(req.body.name);
        res.send(courses[req.body.id -1]) 
        }   


    }

)


// api/courses/id







const port = process.env.PORT || 3000

app.listen(port, () => { console.log(`listening on port ${port}`); })









