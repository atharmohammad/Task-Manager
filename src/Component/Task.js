import {useEffect,useState} from 'react';
import axios from '../Axios/axios';
import classes from './Create/Create.module.css'
export default function Task(props){

  const [status,setStatus] = useState(props.task.TaskStatus)
  let selectOptions;
  if(props.task.TaskStatus == 'To Do'){
    selectOptions = {
      first : 'To Do',
      second : 'Review',
      third : 'Completed'
    }
  }else if(props.task.TaskStatus == 'Review'){
    selectOptions = {
      third : null,
      second : 'Completed',
      first : 'Review',
    }
  }else if(props.task.TaskStatus == 'Completed'){
    selectOptions = {
      third : null,
      first : 'Completed',
      second : 'Review'
    }
  }
  const changeHandler = (event)=>{
    setStatus(event.target.value)
    axios.patch('/update/' + props.task._id,{status:event.target.value})
      .then(res=>{
        console.log(res);
        window.location.reload();
      }).catch(e=>console.log(e))
  }

  const deleteHandler = ()=>{
    axios.delete('/delete/' + props.task._id)
      .then(res=>{
        console.log(res);
        window.location.reload();
      }).catch(e=>console.log(e))
  }

  return(
    <div style={{minHeight:'9vh',background:'#152e57',
    boxShadow: '0 5px 15px 0px rgba(0,0,0,0.6)',
    border:'2px double black',
    borderRadius:'20px',
    color:'#fff',
    textAlign:'left',marginTop:'5vh'}}>
      <div style={{padding:'0 4vh 0 4vh',
      display:'flex',
      justifyContent:'space-between',
      flexDirection:'column'}}>
      <div style={{display:'flex',flexDirection:'row'}}>
        <p><span className={classes.title}>Name : </span>{props.task.Name} </p>
        <div className={classes.delete} onClick={deleteHandler}>Delete</div>
      </div>
      <div style={{display:'flex',flexDirection:'row'}}>
          <p><span className={classes.title}>Priority : </span>{props.task.Priority}</p>
          <p><span className={classes.title}>Due-Date : </span>{props.task.DueDate.split('T')[0]}</p>
          <div style={{display:'flex',flexDirection:'row'}}>
          <p><span className={classes.title}>Status : </span></p>
          <select onChange={(e)=>changeHandler(e)} style={{outline:'none',
            cursor:'pointer',
            height:'4vh',borderRadius:'10px',
            margin:'1.5vh 3vh 0 1vh'}}>
            <option value={selectOptions.first} defaultValue>
              {selectOptions.first}
            </option>
            <option value={selectOptions.second}>
              {selectOptions.second}
            </option>
            {selectOptions.third ?<option value={selectOptions.third}>
              {selectOptions.third}
            </option> : null}
          </select>
          </div>
          <p><span className={classes.title}>Created at : </span>{props.task.createdAt.split('T')[0]}</p>
          <p><span className={classes.title}>Updated at : </span>{props.task.updatedAt.split('T')[0]}</p>

        </div>
      </div>
    </div>
  )
}
