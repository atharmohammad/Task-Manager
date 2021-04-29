import classes from './Create/Create.module.css'

export default function Navbar(props){
  return(
    <div style={{minHeight:'8vh',backgroundColor:'#e8ab43',
    textAlign:'center',
  fontSize:'25px',
color:'#fff'}}>
      <div className={classes.navbar} style={{paddingTop:'2vh'}}>
        Task-Manager
      </div>
    </div>
  )
}
