import React, { useEffect , useState } from 'react'


const Tasks = (props) => {
    const [totalTasks, setTotalTasks] = useState([]);
	const [editDetail,setEditDetail] = useState({});
    const [title,setTitle] = useState('');
    const [checkEdit,setCheckEdit] = useState(false);
    const [editClass, setEditClass] = useState("fa-solid fa-pen-to-square");


   
    // fetch data from api 
	useEffect(() => {

        const fetchData = async () => {
            const response = await fetch("https://jsonplaceholder.typicode.com/todos");
            const data = await response.json();
            setTotalTasks(data.slice(0,10));
            
        } 
        fetchData();
	}, []);
    // check if any new task is added
    useEffect(() => {
        
        setTotalTasks((prevTask => [props.task,...prevTask]));
        
	}, [props.task]);
    // check if our task is completed 
    const completeTask = (id) => (e) => {
        e.preventDefault();
		const objs = totalTasks.map(task => {
            if(task.id == id) {
                task.completed = task.completed ? false : true;
                return task;
            }
            return task;
        });
        setTotalTasks(objs);
        
	};
    // for deleting the task
    const deleteTask = (id) => (e) => {
        e.preventDefault();
        const tasks = totalTasks.filter(task => task.id != id);
        setTotalTasks(tasks);
    } 
    
    // edit detailks of the task
    const editDetails = (id) => (e) => {
        e.preventDefault();
        const obj = totalTasks.find(task => task.id === id);
        setTitle(obj.title);
        setEditDetail(obj);
        setCheckEdit(true);
    }
    // click on the edit button
    const onChangeDetail = (e) => {
        e.preventDefault();
        console.log("ghjghjg ",editDetail);
        const objs = totalTasks.map(task => {
            if(task.id === editDetail.id) {
                task.title = title;
                console.log("Change inputm inside");
                return task;
            }
            return task;
        });
        setTotalTasks(objs);
        setCheckEdit(false);
    }
    return (
        <div className='todo-container'>
            <div className={checkEdit ? "todo-bar" : 'hide'}>
                <input  onChange={(e) => setTitle(e.target.value)} value={title} type="text" autoComplete="off"/>
                <div style={{ borderRadius: "0 10px 10px 0" }} className="icon-container" id="add-btn" >
                    <i onClick={onChangeDetail} className="fa-solid fa-plus"></i>
                </div>
            </div>
            
            {totalTasks.map((task, index) => (
                <div className='todo-item' key={index}>
                    <div className="icon-tasks">
                            <i className="fa-solid fa-circle-check" onClick={completeTask(task.id)}  style={{color:task.completed ? "green" : "#2c2c2c"}}></i>
                            <div className="task-name"  style={{textDecoration:task.completed ? "line-through 2px hsl(199deg 31% 14%)" : "none"}}>{task.title}</div>
                        </div>
                        <div className="icons">
                            {task.completed ? <i className={editClass} onClick={() => alert("Completed Task can't be edited")}></i> : <i className={editClass} onClick={editDetails(task.id)}></i>}
                            <i className="fa-solid fa-trash" onClick={deleteTask(task.id)} ></i>
                        </div>
                </div>
            )) 
            }
        </div>
    )
}

export default Tasks