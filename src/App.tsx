import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

enum Status {
  TO_DO = 1,
  IN_PROGRESS = 2,
  DONE = 3,
}

interface CardProps {
  status: Status;     
  task: string;
  onMove: any
}


interface ColumnProps {
  status: Status;
  tasks: Array<string>;
  onMove: any
}

function getToDOs() {
  return ["task A", "task B"]
}

function getInProgress() {
  return ["task A1", "task B1"]
}

function getDone() {
  return []
}

function App() {
  const [toDoTasks, setToDoTasks] = useState(getToDOs());
  const [inProgressTasks, setInProgressTasks] = useState(getInProgress());
  const [doneTasks, setDoneTasks] = useState(getDone());
    console.log("toDoTasks", toDoTasks)
    console.log("inProgressTasks", inProgressTasks)
    console.log("doneTasks", doneTasks)
  const onMove = function(task: string, oldStatus: Status, newStatus: number) {
    
      // update task from oldstatus to newStatus
      // remove from oldstatus
      if (newStatus < 1 || newStatus > 3) {
        return
      }
      const statusMap = {
        [Status.TO_DO] : setToDoTasks,
        [Status.IN_PROGRESS]: setInProgressTasks,
        [Status.DONE]: setDoneTasks
      }
      statusMap[oldStatus]((tasks: any[])=> tasks.filter((task1: string)=> task1 != task));
      statusMap[newStatus]((tasks: any)=> tasks.concat(task));
  }
 
  return (
    <>
      <div style={{display:"flex",gap:50}}>
        <Column status={Status.TO_DO} tasks={toDoTasks} onMove={onMove} />
        <Column status={Status.IN_PROGRESS} tasks={inProgressTasks} onMove={onMove}/>
        <Column status={Status.DONE} tasks={doneTasks} onMove={onMove}/>
      </div>
    </>
  );
}

function Column({status, tasks, onMove} :ColumnProps) {
  const tasksLabels = {
    [Status.TO_DO]: "To Do",
    [Status.IN_PROGRESS]: "In Progress",
    [Status.DONE]: "Done",
  }
  const taskLabel = tasksLabels[status];
  const tasksComponents = tasks.map(task=> (
    <Card status={status} task={task} onMove={onMove}></Card>
  ))
  return (
    <div>
    <h1>{taskLabel}</h1>
    {tasksComponents}
  </div>
  );
  
}



function Card({status, task, onMove} : CardProps) {
   return (
    <>
      <div style={{flexDirection:"column",display:"flex"}}>
        <p>{task}</p>
        {status !== Status.TO_DO && <button onClick={()=> onMove(task, status, status - 1)}> &larr; </button>}
        {status !== Status.DONE && <button onClick={()=> onMove(task, status, status + 1)}> &rarr;</button>}
      </div>
    </>
  )
}

export default App
