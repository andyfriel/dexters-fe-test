export async function fetchTodos() {
    try {
        const response = await fetch('https://dummyjson.com/todos?limit=10');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function deleteTodo(id) {
    try {
        const response = await fetch(`https://dummyjson.com/todos/${id}`, { method: 'DELETE' });
        const data = await response.json();
        if(data.isDeleted) {
            return true;
        }
    } catch (error) {
        console.error(error);
    }
};

export async function updateTodo(id, completed, todo) {
    try {
        const response = await fetch(`https://dummyjson.com/todos/${id}`, { 
            method: 'PUT', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify({ completed: completed, todo: todo }) 
        });
        const data = await response.json();
        if(data.completed == completed) {
            return true;
        }
    } catch (error) {
        console.error(error);
    }
};

export async function postTodo(todo) {
    try {
        const response = await fetch(`https://dummyjson.com/todos/add`, { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify({ completed: false, todo: todo, userId: 5 }) 
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

