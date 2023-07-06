import React, { useState } from 'react';
import { styled } from 'styled-components';

interface TodoItem {
    id: number;
    text: string;
    isCompleted: boolean;
}

const TodoList: React.FC = () => {
    const [todoList, setTodoList] = useState<TodoItem[]>([]);
    const [textInput, setTextInput] = useState('');

    const addTodoItem = () => {
        if (textInput.trim() !== '') {
            const newItem: TodoItem = {
                id: Date.now(),
                text: textInput,
                isCompleted: false,
            };
            setTodoList((prevList) => [...prevList, newItem]);
            setTextInput('');
        }
    };

    const deleteTodoItem = (id: number) => {
        setTodoList((prevList) => prevList.filter((item) => item.id !== id));
    };

    const toggleTodoItem = (id: number) => {
        setTodoList((prevList) =>
            prevList.map((item) =>
                item.id === id ? { ...item, isCompleted: item.isCompleted } : item
            )
        );
    };

    return (
        <Container>
            <StyledH1>Todo List</StyledH1>
            <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Enter your task"
            />
            <button onClick={addTodoItem}>Add</button>
            <ol>
                {todoList.map((item) => (
                    <StyledText
                        key={item.id}
                        style={{ textDecoration: item.isCompleted ? 'line-through' : 'none' }}
                        onClick={() => toggleTodoItem(item.id)}
                    >
                        {item.text}
                        <button onClick={() => deleteTodoItem(item.id)}>X</button>
                    </StyledText>
                ))}
            </ol>
        </Container>
    );
};

export default TodoList;

const Container = styled.div`
    text-align: center;
    & input{
        width: 280px;
        height: 30px;
        border-radius: 10px;
        font-size: 1.3rem;
    }
    & ol{
        position: relative;
        left: 500px;
       width: 420px;
    }
    & button{
        width: 70px;
        height: 35px;
        border-radius: 10px;
        margin-left: 5px;
        font-size: 1.3rem;
    }
`;
const StyledH1 = styled.h1`
 text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const StyledText = styled.li`
    display: flex;
    justify-content: space-between;
    margin-left: 90px;
    font-size: 2rem;
    & button{
        width: 50px;
        height: 30px;
        margin: 5px;
    }
`;