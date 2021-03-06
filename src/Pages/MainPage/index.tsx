import {
  Box,
  Button,
  HStack,
  Input,
  InputGroup,
  Text,
  VStack,
} from "@chakra-ui/react";

import React, { useEffect } from "react";
import { useState } from "react";
import Task from "../../Components/Task";

type ItemValue = {
  id: number;
  value: string;
  checked: boolean;
};

export default function MainPage() {
  const [items, setItems] = useState<ItemValue[]>([]);
  const [value, setValue] = useState<string>("");
  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem("myList")) || []);
  }, []);

  useEffect(() => {
    localStorage.setItem("myList", JSON.stringify(items));
  }, [items]);

  function handleOnSubmit() {
    const todo = {
      id: items.length + 1,
      value: value,
      checked: false,
    };
    setItems([...items, todo]);
  }
  function handleOnInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  function handleOnDelete(item: ItemValue) {
    const newItems = items.filter((x) => x !== item);
    setItems(newItems);
  }
  function handleOnEdit(id: number, value: string) {
    const newItems = [...items];
    const editItem = newItems.find((item) => item.id === id);

    if (!editItem) {
      return;
    }
    editItem.value = value;
    setItems(newItems);
  }
  function handleOnClickChecked(id: number, checked: boolean) {
    const newItems = [...items];
    const myTodo = items.find((i) => i.id === id);
    myTodo.checked = !myTodo.checked;
    setItems(newItems);
  }

  return (
    <VStack display="flex" flexDirection="column">
      <Text fontSize="50px" color="teal" as="i">
        ToDo
      </Text>
      <Box>
        <InputGroup size="md" display="flex" flexDirection="column">
          <Input
            pr="4.5rem"
            size="lg"
            variant="outline"
            placeholder="Task"
            name="taskToDo"
            value={value}
            onChange={handleOnInputChange}
            type="text"
          />
          <Button
            onClick={handleOnSubmit}
            type="submit"
            colorScheme="teal"
            m={2}
          >
            Add
          </Button>
        </InputGroup>
      </Box>
      <div>
        <Text fontSize="4xl" color="gray.500" p={6} display="flex">
          Tasks
        </Text>
        <Box
          borderColor="gray.400"
          borderBottom="1px"
          minWidth="400px"
          width="100%"
        />
        <HStack display="flex" flexDirection="column" m={5}>
          {items.map((item, index: number) => (
            <Task
              onEditItem={handleOnEdit}
              id={item.id}
              key={index}
              text={item.value}
              checked={item.checked}
              onClick={() => handleOnDelete(item)}
              onChange={() => handleOnClickChecked(item.id, !item.checked)}
            />
          ))}
        </HStack>
      </div>
    </VStack>
  );
}
