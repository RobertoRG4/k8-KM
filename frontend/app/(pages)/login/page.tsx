"use client";
import { useEffect, useState } from "react";
import { PasswordInput } from "@/components/ui/password-input";
import {
  Box,
  Field,
  Input,
  Flex,
  Heading,
  Button,
  useEditable,
} from "@chakra-ui/react";
import { InputGroup } from "@chakra-ui/react";
import { LuUser } from "react-icons/lu";
import { redirect } from "next/navigation";

const Page = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });
    response.then((value) => {
      if (value.ok) {
        redirect("/dashboard");
      } else alert("invalid credentials!");
    });
  };
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    switch (target.name) {
      case "username":
        setUsername(target.value);
        break;
      case "password":
        setPassword(target.value);
        break;
      default:
        console.log("Not option valided!");
        break;
    }
  };

  return (
    <Box minHeight="100vh">
      <Flex
        justify="center"
        alignItems="center"
        w="100vw"
        h="100vh"
        direction="column"
      >
        <Heading maxW="200px">Login</Heading>
        <form style={{ minWidth: "500px" }} onSubmit={handleOnSubmit}>
          <Field.Root marginY="10px">
            <Field.Label>Username</Field.Label>
            <InputGroup startElement={<LuUser />}>
              <Input
                placeholder="Username"
                onChange={handleOnChange}
                name="username"
              />
            </InputGroup>
            <Field.HelperText>
              We&apos;ll never share your username.
            </Field.HelperText>
          </Field.Root>
          <Field.Root marginY="10px">
            <Field.Label>Password</Field.Label>
            <PasswordInput onChange={handleOnChange} name="password" />
            <Field.HelperText>
              We&apos;ll never share your email.
            </Field.HelperText>
          </Field.Root>
          <Flex justifyContent="end">
            <Button type="submit">Submit</Button>
          </Flex>
        </form>
      </Flex>
    </Box>
  );
};
export default Page;
