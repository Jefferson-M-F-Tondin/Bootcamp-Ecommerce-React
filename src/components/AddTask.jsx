import { useState } from "react";
import Input from "./Input";

// Componente para adicionar uma nova tarefa
function AddTask({ onAddTaskSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  return (
    <div className="space-y-4 p-6 bg-slate-200 rounded-md shadow flex flex-col">
      <Input
        
        type="text"
        placeholder="Digite o Título da tarefa"
        
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <Input

        type="text"
        placeholder="Digite a Descrição da tarefa"
        
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <button
        onClick={() => {
          // Validação simples para garantir que os campos não estejam vazios
          if (!title.trim() || !description.trim()) {
            return alert("Preencha o Título e a Descrição da Tarefa!");
          }
          // Chama a função passada via props para adicionar a nova tarefa
          onAddTaskSubmit(title, description);
          setTitle("");
          setDescription("");
        }}
        className="bg-slate-500 px-4 py-2 rounded-md text-white font-medium"
      >
        Adicionar Tarefa
      </button>
    </div>
  );
}

export default AddTask;
