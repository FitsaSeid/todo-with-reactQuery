import axios from "axios"

const BASE_URL = axios.create({
    baseURL: 'http://localhost:4000'
})


export const getTodos = async () => {
    const { data } = await BASE_URL.get('/task');
    return data
}
export const addTodo = async (todo) => {
    await BASE_URL.post('/task', todo);
}
export const updateTodo = async (id) => {
    await BASE_URL.patch(`/tasks/${id}`);
}
export const deleteTodo = async (id) => {
    await BASE_URL.delete(`/tasks/${id}`);
}


export default BASE_URL;

