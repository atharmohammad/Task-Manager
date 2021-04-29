import {useState} from 'react';
import classes from './Create.module.css';
import axios from '../../Axios/axios';
const initialData = {
  Name : "",
  Priority:"High",
  DueDate:null
}
export default function Create(props){

  const [notify,setNotify] = useState(false);
  const [data,setData] = useState(initialData);

  const postHandler = ()=>{
    let date;

    if(data.DueDate){
       date = data.DueDate.split('-');
    }

    if(data.Name.trim().length === 0 || !data.DueDate || date[0] < new Date().getFullYear()
    || (date[0] == new Date().getFullYear() && date[1] < new Date().getMonth() + 1)
    || date[0] == new Date().getFullYear() && date[1] == new Date().getMonth() + 1 &&  date[2] < new Date().getDate()){
      setNotify(true);
    }else{
      axios.post('/createTasks',data)
      .then(res=>{
        setNotify(true);
        setData(initialData);
      }).catch(e=>console.log(e));
      console.log(data);
      window.location.reload()
    }
  }

  const changeHandler = (event,type)=>{
    if(type == 'Name'){
      setData((prevState)=>{
        return{...prevState,Name:event.target.value}
      })
    }else if(type == 'Priority'){
      setData((prevState)=>{
        return{...prevState,Priority:event.target.value}
      })
    }else if(type == 'DueDate'){
      setData((prevState)=>{
        return{...prevState,DueDate:event.target.value}
      })
    }
  }

  return(
    <div className={classes.header}>
      {notify ? <div style={{minHeight:'4vh',
      backgroundColor:'#e83f3f',
      color:'#fff',
      fontWeight:'bold',
      borderRadius:'5px',
      textAlign:'center',
    paddingTop:'0.5vh',marginBottom:'1vh'}}>Please fill Correct Date and Name !</div>:null}
      <div className={classes.display}>
        <p>Name :</p>
        <input type='text' onChange={(event)=>changeHandler(event,'Name')}/>
      </div>
      <div className={classes.display}>
        <p>Priority :</p>
        <select onChange={(event)=>changeHandler(event,'Priority')}>
           <option value='High' selected>High</option>
           <option value='Medium' >Medium</option>
           <option value='Low' >Low</option>
        </select>
      </div>
      <div className={classes.display}>
        <p>Due-Date :</p>
        <input type='date' onChange={(event)=>changeHandler(event,'DueDate')}/>
      </div>
      <div className={classes.submit}
      onClick={postHandler}
      >Save</div>
    </div>
  )
}
