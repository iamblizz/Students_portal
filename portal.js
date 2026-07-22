const express = require ('express');
const app = express();
const PORT= 3005;

// i Tell express to understand JSON (middleware)
app.use(express.json());

//i create an in memory database to temporarly save student information
let students = [];

// i make a route to POST or Add  new student
app.post('/students', (req, res) => {
	const { Fullname, Department, Gender } = req.body;

	const newStudent = {
		id: Date.now(),
		Fullname,
		Department,
		Gender,
		enrolled: true,
	};

	students.push(newStudent);


	res.status(201).json(newStudent);
});



//i make a route to GET or Read all student information
app.get('/students', (req, res) => {
	res.json(students);
});


//i make a route to Update Studunts information
app.put('/students/:id', (req, res) => {
	const student = students.find(n => n.id === parseInt(req.params.id));
	
	if (!student) return res.status(404).json({error: 'student not found'});

	const { Fullname, Department, Gender } = req.body;

	if(Fullname) student.Fullname = Fullname;
	if(Department) student.Department = Department;
	if(Gender) student.Gender = Gender;
	
	res.status(200).json({message: 'Student successfully updated'});

	
	
});

//i make a route to Delete student details
app.delete('/students/:id', (req, res) => {

    const initialLength = students.length;
	students = students.filter(n => n.id !== parseInt(req.params.id));
	if(students.length === initialLength)
	 return res.status(404).json({error: 'Student not found'})

	res.status(200).json({message: 'Student deleted'});
	

	
});




app.listen(PORT, () => {
	console.log(`Server is running on http://localhost: ${PORT}`)
})
