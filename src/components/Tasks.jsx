import { ChevronRightIcon, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

// Componente para exibir a lista de tarefas
function Tasks({ tasks, onTaskClick, onDeleteTaskClick }) {
  const navigate = useNavigate();

  // Função para navegar para a página de detalhes da tarefa
  // Passa o título e a descrição da tarefa como parâmetros de consulta na URL
//   onSeeDetailsClick é uma função que recebe uma tarefa como parâmetro e usa o useNavigate para navegar para a página de detalhes da tarefa, passando o título e a descrição como parâmetros de consulta na URL.
  function onSeeDetailsClick(task) {
    // Cria uma instância do objeto URLSearchParams para construir a query string
    // O URLSearchParams é usado para manipular os parâmetros de consulta da URL.
    const query = new URLSearchParams();
    query.set("title", task.title);
    query.set("description", task.description);
    navigate(`/task?${query.toString()}`);
  }

  return (
    // Usa o props para acessar as tarefas e as funções de clique
    // Renderiza cada tarefa como um item de lista
    <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">
      {tasks.map((task) => (
        <li key={task.id} className="flex gap-2">
          <button
            onClick={() => onTaskClick(task.id)}
            className={`bg-slate-400 text-left w-full text-white p-2 rounded-md ${
              task.isCompleted && "line-through"
            }`}
          >
            {task.title}
          </button>
          <Button
            onClick={() => onSeeDetailsClick(task)}
            
          >
            <ChevronRightIcon />
          </Button>

          <Button
            onClick={() => onDeleteTaskClick(task.id)}
            
          >
            <Trash />
          </Button>
        </li>
      ))}
    </ul>
  );
}

export default Tasks;

// quando uso o props, eu estou pegando as propriedades que foram passadas para o componente Tasks e usando elas dentro do componente.
// No caso, estou pegando a propriedade tasks e mapeando cada tarefa para um item de lista.
// O método map é usado para iterar sobre cada tarefa e retornar um elemento <li> com o título da tarefa.
