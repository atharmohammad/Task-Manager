import {useEffect,useState} from 'react';
import axios from '../Axios/axios';
import Task from '../Component/Task'
import Spinner from '../Component/Spinner/Spinner';
import CreateWrapper from '../Component/Create/CreateWrapper';
import classes from '../Component/Create/Create.module.css'

export default function TaskPage(props){

  const [tasks,setTasks] = useState(null);
  const [show,setShow] = useState(false);
  const [blur,setBlur] = useState(0);

  useEffect(()=>{
      axios.get('/allTasks')
        .then(res=>{
          setTasks(res.data);
        })
        .catch(e=>console.log(e));
  },[show])

  const closeHandler = ()=>{
    setBlur(0)
    setShow(false)
  }

  let allTask = <Spinner/>

  if(tasks){
    if(tasks.length == 0){
      allTask = <p>There is No task</p>
    }else{
      allTask = tasks.map(task=>{
        return(
          <Task key={task._id} task={task} />
        )
      })
    }
  }

  return(
    <div style={{minHeight:'80vh',
  margin:'0 1vh 10vh 1vh',
}}>
    <div style={{filter: `blur(${blur}px)`,}}>
      <button className={classes.create} onClick={()=>{
        setBlur(5)
        setShow(true)}}>Create Task | + </button>
      {allTask}
    </div>
      {show ? <div>
        <button className={classes.button} onClick={closeHandler}>X</button>
          <CreateWrapper/>
        </div> : null}
    </div>
  )
}
