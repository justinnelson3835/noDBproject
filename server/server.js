import express from "express"


const app = express();

// Define your data collection (an array for a simple example)
let tasks = [
    { id: 1, title: "Buy groceries" },
    { id: 2, title: "Walk the dog" },
    { id: 3, title: "Finish homework" },
    { id: 4, title: "Call a friend" }
  ];

// Define your API endpoints
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const newTask = req.body;
  tasks.push(newTask);
  res.json(newTask);
});

app.put('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const updatedTask = req.body;
  res.json(updatedTask);
});

app.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  res.json({ message: 'Task deleted' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
