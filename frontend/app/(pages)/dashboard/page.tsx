"use client";
import { Box, Button, Text, Flex, Heading } from "@chakra-ui/react";
import { redirect } from "next/navigation";
import { MdLogout } from "react-icons/md";

const Page = () => {
  const handleOnClick = () => {
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
  return (
    <Box>
      <nav
        style={{
          marginTop: "20px",
          paddingBottom: "20px",
        }}
      >
        <Flex justify="space-between" align="center">
          <Heading size="2xl" marginX="20px">
            ElectroWorld S.A
          </Heading>
          <Button variant="solid" marginX="20px" onClick={handleOnClick}>
            <MdLogout />
          </Button>
        </Flex>
      </nav>
      <Text fontSize="xl" marginTop="20px">
        Dashboard
      </Text>
    </Box>
  );
};
export default Page;
