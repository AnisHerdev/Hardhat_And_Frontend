// client/src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserProvider, Contract } from 'ethers';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  useEffect(() => {
    const loadProviderAndContract = async () => {
      const tempProvider = new BrowserProvider(window.ethereum);
      await tempProvider.send("eth_requestAccounts", []);
      const tempSigner = await tempProvider.getSigner();
      const tempContract = new Contract(
        '0xcffBd567b6af3B9B84102CEA98e13660f7376b58', // Replace with your contract address
        [
          'function getTodos() public view returns (tuple(uint, string, bool)[])',
          'function createTodo(string memory text) public',
          'function toggleTodoCompleted(uint id) public'
        ],
        tempSigner
      );
      setProvider(tempProvider);
      setSigner(tempSigner);
      setContract(tempContract);
      loadTodos(tempContract);
    };
    loadProviderAndContract();
  }, []);

  const loadTodos = async (contract) => {
    const todoList = await contract.getTodos();
    setTodos(todoList);
  };

  const createTodo = async () => {
    await contract.createTodo(newTodo);
    setNewTodo('');
    loadTodos(contract);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={createTodo}>Add Todo</button>

      <ul>
        {todos.map((todo, index) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={async () => {
                await contract.toggleTodoCompleted(todo.id);
                loadTodos(contract);
              }}
            />
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;