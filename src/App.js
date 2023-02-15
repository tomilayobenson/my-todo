import { useEffect, useState } from "react";
import "./styles.css";
import "font-awesome/css/font-awesome.css";
import styled from "styled-components";

import { List } from "./components/List";

const Container = styled.div`
  display: flex;
  height: 50vh;
  justify-content: center;
  align-items: end;
`;
const Label = styled.label`
  font-size: 2rem;
  text-align: center;
  margin: 1rem;
`;

const Button = styled.button`
  border: none;
  padding: 0.8rem 3rem;
  border-radius: 0.4rem;
  margin: 1rem;
  font-size: 1rem;
  background-color: var(--red);
  color: white;
  &:hover {
    background-color: var(--orange);
  }
`;

const Form = styled.form`
  width: 70%;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: none;
  border-radius: 4px;
`;

export default function App() {
  const [todo, setTodo] = useState("");
  const [list, setList] = useState([]);
  const [disabledItems, setdisabledItems] = useState([]);

  const onChange = (e) => setTodo(e.target.value);

  const add = (e) => {
    e.preventDefault();
    setList([...list, todo]);
    setTodo("");
  };
  useEffect(() => {
    const itemId = list.length;
    setdisabledItems([...disabledItems, itemId]);
  }, [list]);

  return (
    <>
      <Container>
        <Form onSubmit={add}>
          <Label>To do</Label>
          <br />
          <Input type="text" value={todo} onChange={onChange} />
          <br />
          <Button>Submit</Button>
        </Form>
      </Container>
      <List
        items={list}
        setList={setList}
        disabledItems={disabledItems}
        setdisabledItems={setdisabledItems}
      />
    </>
  );
}
