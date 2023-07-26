import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { getTodos, addTodo, updateTodo, deleteTodo } from './api/api';

function App() {

  const queryClient = useQueryClient();

  // const { data: todos, isLoading, isError } = useQuery({
  //   queryKey: ["todo"],
  //   keepPreviousData: true,
  //   queryFn: async () => {
  //     const { data } = await BASE_URL.get('/task');
  //     return data
  //   },`

  //   onSuccess: (value) => {
  //     console.log(value)
  //   }
  // })


  const { data: todo, isLoading, isError } = useQuery({
    queryKey: ['todo'],
    queryFn: getTodos
  });

  const addTodoQuery = useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries
    }
  })

  const updateQuery = useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries
    }
  })

  const deleteQuery = useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries
    }
  })
  // const
  return (
    isLoading ? <h1>Loading....</h1> :
      <div>
        ToDo with React Query
      </div>
  )
}

export default App
