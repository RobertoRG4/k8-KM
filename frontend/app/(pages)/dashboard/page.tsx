"use client";
import {
  Box,
  Button,
  Table,
  Flex,
  Heading,
  Portal,
  CloseButton,
  Dialog,
  Text,
  Input,
  Field,
} from "@chakra-ui/react";
import { redirect } from "next/navigation";
import { MdLogout } from "react-icons/md";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import { ColorModeButton } from "@/components/ui/color-mode";
import { useCallback, useEffect, useState } from "react";

interface Item {
  action: string;
  itemId: string;
}

const Page = () => {
  const [modelTitle, setModalTitle] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [items, setItems] = useState([]);
  const [item, setItem] = useState<Item>({ action: "", itemId: "" });
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);

  const logout = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/logout`, {
      method: "POST",
      credentials: "include",
    }).then((res) => {
      if (res.ok) redirect("/login");
      else alert("Error 404");
    });
  };

  const deleteItem = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/item/${item.itemId}`, {
      method: "DELETE",
      credentials: "include",
    }).then((res) => {
      if (res.ok) window.location.reload();
      else alert("Error 404");
    });
  };

  const editItem = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/item/${item.itemId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name, price, category }),
    }).then((res) => {
      if (res.ok) window.location.reload();
    });
  };

  const getItem = async (itemId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/item/${itemId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      if (!response.ok) {
        console.error("Error al obtener el ítem:", response.statusText);
        return;
      }
      const data = await response.json();
      setName(data.name);
      setCategory(data.category);
      setPrice(data.price);
      console.log("Item cargado:", data);
    } catch (error) {
      console.error("Error en getItem:", error);
    }
  };

  const handleOnEdit = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = event.target;
      if (id === "name") setName(value);
      if (id === "category") setCategory(value);
      if (id === "price") setPrice(parseFloat(value) || 0);
    },
    []
  );

  const handleOnClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const action = event.currentTarget.id as "edit" | "delete";
    const itemId = event.currentTarget.dataset.itemId;
    if (!itemId) return;

    setName("");
    setCategory("");
    setPrice(0);

    setItem({ action, itemId });
    setModalTitle(action === "edit" ? "Edit" : "Delete");
    setIsOpen(true);

    if (action === "edit") {
      await getItem(itemId);
    }
  };

  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/items`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setItems(data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getItems();
  }, []);

  return (
    <Box overflow="hidden">
      <nav style={{ margin: 30, paddingBottom: 20 }}>
        <Flex justify="space-between" align="center">
          <Heading size="2xl" mx={5}>
            ElectroWorld S.A
          </Heading>
          <Box>
            <ColorModeButton _dark={{ bg: "white", color: "black" }} w="50px" />
            <Button
              variant="solid"
              mx={5}
              onClick={logout}
              color="white"
              bg="green.400"
            >
              <MdLogout />
            </Button>
          </Box>
        </Flex>
      </nav>

      <Flex justify="center">
        <Dialog.Root
          open={isOpen}
          onOpenChange={() => setIsOpen((prev) => prev)}
        >
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>{modelTitle}</Dialog.Title>
                </Dialog.Header>
                <Dialog.CloseTrigger asChild>
                  <CloseButton
                    size="sm"
                    position="absolute"
                    top="4"
                    right="4"
                    onClick={() => setIsOpen(false)}
                  />
                </Dialog.CloseTrigger>

                <Dialog.Body>
                  {modelTitle === "Delete" ? (
                    <>
                      <Text fontSize="xl" textAlign="center">
                        ¿Estás seguro de que deseas eliminar este ítem?
                      </Text>
                      <Flex justify="space-between" pt={4}>
                        <Button colorScheme="red" onClick={deleteItem}>
                          Confirmar
                        </Button>
                        <Button onClick={() => setIsOpen(false)}>
                          Cancelar
                        </Button>
                      </Flex>
                    </>
                  ) : (
                    <form>
                      <Field.Root>
                        <Field.Label>Name</Field.Label>
                        <Input id="name" value={name} onChange={handleOnEdit} />
                        <Field.Label>Category</Field.Label>
                        <Input
                          id="category"
                          value={category}
                          onChange={handleOnEdit}
                        />
                        <Field.Label>Price</Field.Label>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          value={price}
                          onChange={handleOnEdit}
                        />
                      </Field.Root>
                      <Flex justify="space-between" pt={4}>
                        <Button onClick={editItem}>Guardar</Button>
                        <Button onClick={() => setIsOpen(false)}>
                          Cancelar
                        </Button>
                      </Flex>
                    </form>
                  )}
                </Dialog.Body>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>

        <Box w="80vw" h="80vh">
          <Table.ScrollArea borderWidth="1px" rounded="md" h="80vh">
            <Table.Root variant="outline">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>Product</Table.ColumnHeader>
                  <Table.ColumnHeader>Category</Table.ColumnHeader>
                  <Table.ColumnHeader>Price</Table.ColumnHeader>
                  <Table.ColumnHeader>Options</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {items.map(
                  (it: {
                    id: number;
                    name: string;
                    category: string;
                    price: number;
                  }) => (
                    <Table.Row key={it.id}>
                      <Table.Cell>{it.name}</Table.Cell>
                      <Table.Cell>{it.category}</Table.Cell>
                      <Table.Cell>$ {it.price}</Table.Cell>
                      <Table.Cell>
                        <Button
                          id="delete"
                          data-item-id={it.id}
                          onClick={handleOnClick}
                          bg="red.400"
                          mr={2}
                        >
                          <FaTrash style={{ color: "#fff" }} />
                        </Button>
                        <Button
                          id="edit"
                          data-item-id={it.id}
                          onClick={handleOnClick}
                          bg="blue.300"
                        >
                          <FaPencilAlt style={{ color: "#fff" }} />
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  )
                )}
              </Table.Body>
            </Table.Root>
          </Table.ScrollArea>
        </Box>
      </Flex>
    </Box>
  );
};

export default Page;
