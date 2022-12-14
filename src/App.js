import { useState } from 'react';
import './App.scss';
import {List} from "./components/List/List"
import {Listitem} from "./components/Listitem/Listitem"

function App() {
  const [value, setValue] = useState("")
  const [ todo, setTodo ] = useState(JSON.parse(window.localStorage.getItem("todo")) || [])

function func(evt){
  evt.preventDefault();
  if(value.length){
    const newTodo = (
      {
        id:todo.length ? todo[todo.length -1].id + 1 : 1,
        text:value,
        isComplate:false
      }
  )
  setTodo([...todo,newTodo])
  setValue("")
  }
}

  const hendDel = (delId) =>{
    const filterTodo = todo.filter(e => e.id !== delId)
    setTodo([...filterTodo]);
  }

  const henEdit = (delId) =>{
    const newText = prompt("Yangi so'z kiriting");
    const findTodo = todo.find(e => e.id === delId);
    findTodo.text = newText
    setTodo([...todo])
  }

  const henChak = (delId) =>{
    const findTodo = todo.find(e => e.id === delId);
    findTodo.isComplate = !findTodo.isComplate
    setTodo([...todo])
  }

  window.localStorage.setItem("todo", JSON.stringify(todo))
 
  return (
    <div className="App">
       <form onSubmit={func} className='mt-4 w-25 mx-auto d-flex'>
         <input onChange={(evt) => setValue(evt.target.value)} value={value} className='list_input form-control' type="text" name='todo' placeholder='todo list...'/>
         <button type='submit' className='btn btn-primary ms-3'>Add</button>
         </form>

      <List>
        <Listitem>
        {
          todo.map(e => (
            <div key={e.id} className='d-flex align-items-center justify-content-between wrapper'>
            <span>{e.id}</span>
          <input onChange={()=>henChak(e.id)} defaultChecked={e.isComplate} type="checkbox"/>
          <p>{e.text}</p>
          <span>
          <button onClick={() => henEdit(e.id)} className='btn btn-success me-3'>Edit</button>
          <button onClick={() => hendDel(e.id)} className='btn btn-danger'>Delet</button>
          </span>
          </div>
          ))
        }
        </Listitem>
      </List>
    </div>
  );
}

export default App;
