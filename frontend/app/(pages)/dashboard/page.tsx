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
import { useEffect, useState } from "react";
const Page = () => {
  const [modelTitle, setModalTitle] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [items, setItems] = useState([]);

  const logout = () => {
    const response = fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/logout`, {
      method: "POST",
      credentials: "include",
    });
    response.then((res) => {
      if (res.ok) {
        redirect("/login");
      } else {
        alert("Error 404");
      }
    });
  };
  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.currentTarget;
    const action = target.id;
    const itemId = target.dataset.itemId;

    if (!itemId) return;

    switch (action) {
      case "delete":
        setModalTitle("Delete");
        console.log(`Borrando item con id ${itemId}`);
        break;
      case "edit":
        setModalTitle("Edit");
        console.log(`Editando item con id ${itemId}`);
        break;
      default:
        break;
    }
    setIsOpen(true);
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
        } else {
          console.log("Error fetching items");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getItems();
  }, []);

  return (
    <Box overflow="hidden">
      <nav
        style={{
          margin: "30px",
          paddingBottom: "20px",
        }}
      >
        <Flex justify="space-between" align="center">
          <Heading size="2xl" marginX="20px">
            ElectroWorld S.A
          </Heading>
          <Box>
            <ColorModeButton
              _dark={{ bg: "white", color: "black" }}
              w="50px"
              backgroundColor="gray.200"
            />
            <Button
              variant="solid"
              marginX="20px"
              onClick={logout}
              color="white"
              bg="green.400"
            >
              <MdLogout />
            </Button>
          </Box>
        </Flex>
      </nav>
      <Flex justifyContent="center">
        <Dialog.Root
          size="lg"
          placement="center"
          motionPreset="slide-in-bottom"
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
                    _hover={{ bg: "gray.400", color: "#fff" }}
                    onClick={() => setIsOpen((prev) => !prev)}
                  />
                </Dialog.CloseTrigger>
                {modelTitle === "Delete" ? (
                  <Dialog.Body>
                    <Text fontSize="xl" textAlign="center">
                      ¿Estás seguro de que deseas eliminar este ítem?
                    </Text>
                    <Flex justifyContent="space-between" paddingTop="20px">
                      <Button bg="red.400">Confirmar</Button>
                      <Button onClick={() => setIsOpen((prev) => !prev)}>
                        Cancelar
                      </Button>
                    </Flex>
                  </Dialog.Body>
                ) : (
                  <Dialog.Body>
                    <form>
                      <Field.Root>
                        <Field.Label>Name</Field.Label>
                        <Input type="text" id="name" />
                        <Field.Label>Category</Field.Label>
                        <Input type="text" id="category" />
                        <Field.Label>Price</Field.Label>
                        <Input type="number" id="price" step="0.01" />
                      </Field.Root>

                      <Flex justifyContent="space-between" paddingTop="20px">
                        <Button>Guardar</Button>
                        <Button>Cancelar</Button>
                      </Flex>
                    </form>
                  </Dialog.Body>
                )}
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>

        <Box width="80vw" height="80vh">
          <Table.ScrollArea borderWidth="1px" rounded="md" height="80vh">
            <Table.Root variant="outline">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>Product</Table.ColumnHeader>
                  <Table.ColumnHeader>Category</Table.ColumnHeader>
                  <Table.ColumnHeader>Price</Table.ColumnHeader>
                  <Table.ColumnHeader maxW="100px">Options</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {items.map(
                  (item: {
                    id: number;
                    name: string;
                    category: string;
                    price: number;
                  }) => (
                    <Table.Row key={item.id}>
                      <Table.Cell>{item.name}</Table.Cell>
                      <Table.Cell>{item.category}</Table.Cell>
                      <Table.Cell>$ {item.price}</Table.Cell>
                      <Table.Cell maxW="80px">
                        <Button
                          onClick={handleOnClick}
                          id="delete"
                          background="red.400"
                          borderRadius="4xl"
                          _dark={{ color: "white" }}
                          data-item-id={item.id}
                        >
                          <FaTrash style={{ pointerEvents: "none" }} />
                        </Button>
                        <Button
                          onClick={handleOnClick}
                          data-item-id={item.id}
                          id="edit"
                          background="blue.400"
                          borderRadius="4xl"
                          marginX="20px"
                          _dark={{ color: "white" }}
                        >
                          <FaPencilAlt style={{ pointerEvents: "none" }} />
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
