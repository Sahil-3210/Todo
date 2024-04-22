import { useEffect, useState } from "react";
import "./App.css";
import { TodoProvider } from "./context";
import { TodoForm } from "./component/TodoForm";
import TodoItem from "./component/TodoItem";

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = () => {
    setTodos((prev) => [{id: Date.now(), ...todo},...prev])
  }

  const updatedTodo = (id, todo) => {
    setTodos((prev)=> prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo=== id ? {...prevTodo, completed: !prevTodo.completed}: prevTodo))
  }

   useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if(todos && todos.length>0){
      setTodos(todos)
    }
   },[])

   useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))  // with the help of stringfy method we are converting value of todos from array to String. because localStorage needs sting to process.
   },[todos])



  return (
    <TodoProvider value={{todos, addTodo, deleteTodo, updatedTodo, toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">{/* Todo form goes here */}
          <TodoForm/>
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id}
              className="w-full">
              <TodoItem todo={todo}></TodoItem>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
