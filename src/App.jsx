import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getTodos, addTodo, updateTodo, deleteTodo } from './api/api';
import { Link } from 'react-router-dom';
import edit from './assets/edit.png';
import del from './assets/delete.png'

function App() {


  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [addTask, setAddTask] = useState(false);
  const [expandedTask, setExpandedTask] = useState('');
  const [editTask, setEditTask] = useState({});
  const [newTask, setNewTask] = useState({
    taskTitle: ''
  })
  const queryClient = useQueryClient();



  const { data: todo, isLoading, isError } = useQuery({
    queryKey: ['todo'],
    queryFn: getTodos,
    onSuccess: (value) => {
      setTasks(value);
    }
  });

  const addTodoMutation = useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  })

  const updateMutation = useMutation(updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  })

  const deleteMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  })




  const handleChange = (e) => {
    setEditTask((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleCheck = (e) => {
    setEditTask((prev) => ({
      ...prev,
      isCompleted: e.target.checked
    }))
  }

  const newTaskChange = (e) => {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value
    })
  }



  return (
    <div className="bg-slate-300">
      <div className='container mx-auto w-screen h-screen'>
        <h1 className='text-4xl font-bold text-center text-white py-20'>SIMPLE TODO APP</h1>
        <div className='max-w-4xl flex justify-end mx-auto'>
          <Link onClick={() => {
            addTask ? setAddTask(false) : setAddTask(true);
          }} className='rounded-full bg-slate-500  shadow-lg px-16 py-3 text-white font-black '>Add New</Link>
        </div>

        {addTask &&
          <div className='max-w-4xl text-white justify-between mx-auto m-3 font-bold shadow-md bg-slate-500 p-4'>
            <form className='flex flex-col space-y-4' action="" onSubmit={(e) => { e.preventDefault(); addTodoMutation.mutate(newTask) }}>
              <label htmlFor="taskTitle">Enter Your Task </label>
              <input className='max-w-md py-2 px-3 text-black' placeholder={'Enter your task here'}
                name='taskTitle'
                type="text"
                id="taskTitle"
                required
                onChange={newTaskChange} />

              <button disabled={isLoading ? true : false} className='rounded-full bg-slate-300  shadow-lg px-16 py-3 text-white font-black'>Add Task</button>
            </form>
          </div>}

        {
          tasks?.map((task, index) => (
            <div key={task._id}>

              <div className="flex max-w-4xl text-white justify-between mx-auto m-3 font-bold shadow-md bg-slate-600 p-4 rounded-md">
                <p className='mx-3'>{index + 1}</p>
                <p className={task.isCompleted ? 'mx-3 line-through' : 'mx-3'}>{task.taskTitle}</p>

                <div className='flex'>

                  <div onClick={() => { setExpandedTask(task._id); setIsEditing(!isEditing) }}>
                    <img className='w-7 mx-3' src={edit} alt="" />
                  </div>

                  <div className='cursor-pointer' onClick={() => { deleteMutation.mutate(task._id) }}>
                    <img className='w-7 mx-3' src={del} alt="" />
                  </div>

                </div>
              </div>
              {
                (isEditing && expandedTask === task._id) && <div className='max-w-4xl text-white justify-between mx-auto m-3 font-bold shadow-md bg-slate-500 p-4'>
                  <form className='flex flex-col space-y-4' action="" onSubmit={(e) => { e.preventDefault(); updateMutation.mutate(task._id, editTask) }}>
                    <label htmlFor="taskTitle">Enter Your Task </label>
                    <input className='max-w-md py-2 px-3 text-black' placeholder={task.taskTitle}
                      name='taskTitle'
                      type="text"
                      id="taskTitle"
                      onChange={handleChange} />

                    <label htmlFor="isCompleted">
                      <input className='max-w-md py-2 mr-3 justify-start'
                        type="checkbox"
                        name="isCompleted"
                        onChange={handleCheck}
                        defaultChecked={task.isCompleted}
                      />
                      Completed
                    </label>
                    <button disabled={isLoading ? true : false} className='rounded-full bg-slate-300  shadow-lg px-16 py-3 text-white font-black'>Update</button>
                  </form>
                </div>
              }

            </div>
          ))
        }

      </div>
    </div>
  );
}

export default App
