import { useState } from 'react';
import './App.css';
import Tasks from './components/Tasks';

function App() {

  const [task,setTask] = useState({});
  const [title,setTitle] = useState('');

  const newTask = () => {
    const obj = {
      title:title,
      completed:false,
      id:Date.now()
    }
 
    
    setTask(obj);
    setTitle('');

  }

  return (
    <div className="App">
			<div className="todo-bar-container">
				<div className="todo-bar">
					<div style={{ borderRadius: "10px 0 0 10px" }} className="icon-container">
						<i className="fa-solid fa-list"></i>
					</div>
					<input  onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder="Enter the task" autoComplete="off"/>
					<div style={{ borderRadius: "0 10px 10px 0" }} className="icon-container" id="add-btn" onClick={newTask}>
						<i className="fa-solid fa-plus"></i>
					</div>
				</div>
			</div>
			<Tasks task={task} />
		</div>
  );
}

export default App;
