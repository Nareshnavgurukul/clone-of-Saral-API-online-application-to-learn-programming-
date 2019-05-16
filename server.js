// to run this code first install all the following commented packages
// npm install init
// npm install express
// npm install fs

const express = require("express");
const fs = require("fs");

let app = express();
app.use(express.json());

// Get method for allcourses
app.get("/allcourses",(req,res)=>{
	let data =  fs.readFileSync("courses.json");
	let Data = JSON.parse(data);
	return res.send(Data);
});

// Post method for updatecourse
app.post("/updatecourse",(req,res)=>{
	if ((req.body.hasOwnProperty("name") && req.body.hasOwnProperty("description")) && req.body.hasOwnProperty("exercise")){
		let data = fs.readFileSync("courses.json");
		let Data = JSON.parse(data);
		let newcourse = req.body;
		newcourse.id = Data.length+1
		Data.push(newcourse);
		fs.writeFileSync("courses.json",JSON.stringify(Data,null,2));
		return res.send(Data);
	}
});

// Post method for update exercise of particulor course
app.post("/allcourses/course/:id/exercise",(req,res)=>{
	let update_EX = req.body;
	let data = fs.readFileSync("courses.json");
	let Data = JSON.parse(data);
	let nowexrcises = Data[req.params.id-1]//it's a object & here I've selected course by id from courses now 
	update_EX.courseid = req.params.id;//id to exercise
	update_EX.exid = nowexrcises.exercise.length+1//id exercise of course
	nowexrcises.exercise.push(update_EX)
	fs.writeFileSync("courses.json",JSON.stringify(Data,null,2));
	return res.send()

});

app.listen(2050,()=>{
	console.log("server is working")
})