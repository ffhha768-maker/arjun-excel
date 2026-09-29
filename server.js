const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
app.use(express.static('public'));
app.use(express.json());

const client = new MongoClient('mongodb://localhost:27017');
let studentsCollection;

// Connect to MongoDB and start the server
client.connect().then(() => {
    studentsCollection = client.db('arjun').collection('students');
    app.listen(3000, () => console.log('Server running on http://localhost:3000'));
});

// GET: Fetch all students
app.get('/api/students', async (req, res) => {
    const students = await studentsCollection.find({}).toArray();
    res.json(students);
});

// POST: Add a new student
app.post('/api/students', async (req, res) => {
    await studentsCollection.insertOne({
        RollNo: parseInt(req.body.rollno),
        Name: req.body.name,
        Department: req.body.department
    });
    res.json({ success: true });
});