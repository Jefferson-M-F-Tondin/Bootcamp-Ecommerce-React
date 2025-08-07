import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import { v4 } from "uuid";
import Title from "./components/Title";

// Componente principal da aplicação
function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  // Hook useEffect para salvar as tarefas no localStorage sempre que a lista de tarefas mudar
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // interacao do useEffect para interagir com uma api
  // e ainda armazenar os dados no state
  useEffect(() => {
    const fetchTasks = async () => {
      // chamar api
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10",
        { method: "GET" }
      );
      // pegar os dados que ela retorna
      const data = await response.json();

      // armazenar esses dados no state
      setTasks(data);
    };
    // se vc quiser chamar uma api para pegar as tarefas
    //  fetchTasks();
  }, []);

  // Função para alternar o status de conclusão da tarefa
  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTasks(newTasks);
  }

  // Função para excluir uma tarefa
  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }

  // Função para adicionar uma nova tarefa
  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(), // Gera um ID único usando a biblioteca uuid
      title,
      description,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  }

  // Renderização do componente
  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <Title>
          Gerenciador de Tarefas
        </Title>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;

// Exemplo de uso da function useState, que serve para que o componente reaja a certas ações que mudam seu status!

// import { useState } from 'react';

// function App() {
//   const {message, setMessage} = useState("Olá, Mundo!");

//   return (
//     <div>
//       <h1>{message}</h1>
//       <button
//          onClick={() =>
//           {setMessage("Olá, fui clicado!");
//           }}
//       >
//            Mudar mensagem!
//          </button>
//     </div>
//   );
// }
