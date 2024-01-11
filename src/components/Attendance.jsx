import {
  Box,
  Button,
  ChakraProvider,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Header } from "./Header";

export const Attendance = () => {
  const [form, setForm] = useState({
    sessionId: 0,
    zoom: 0,
    vevox: 0,
    explanation: 0,
  });

  const handleAttendanceForm = async (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [name]: value });
  };

  console.log(form);

  return (
    <ChakraProvider disableGlobalStyle={true}>
      <Header />
      <Box
        width={["90%", "90%", "100%", "100%"]}
        maxWidth={"900px"}
        borderRadius={"20px"}
        boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}
        padding={["2rem", "3rem 2rem", "3rem", "3rem"]}
      >
        <Heading
          margin={"0 0 20px 0"}
          fontSize={["20px", "20px", "35px", "35px"]}
        >
          Attendance Form
        </Heading>
        <Box>
          <form>
            <FormControl isRequired isInvalid={false} marginBottom={"2rem"}>
              <FormLabel>Vevox Session ID</FormLabel>
              <Input
                onChange={handleAttendanceForm}
                type="number"
                name="sessionId"
                border={"1px solid #8b8b8b"}
                _focus={{
                  outline: "none",
                  border: "1px solid rgba(129, 140, 248)",
                }}
                _hover={{
                  outline: "none",
                  border: "1px solid rgba(129, 140, 248)",
                }}
              />
            </FormControl>
            <FormControl isRequired isInvalid={false} marginBottom={"2rem"}>
              <FormLabel>Zoom Meeting Strength</FormLabel>
              <Input
                onChange={handleAttendanceForm}
                type="number"
                name="zoom"
                border={"1px solid #8b8b8b"}
                _focus={{
                  outline: "none",
                  border: "1px solid rgba(129, 140, 248)",
                }}
                _hover={{
                  outline: "none",
                  border: "1px solid rgba(129, 140, 248)",
                }}
              />
            </FormControl>
            <FormControl isRequired isInvalid={false} marginBottom={"2rem"}>
              <FormLabel>Vevox Strength</FormLabel>
              <Input
                onChange={handleAttendanceForm}
                type="number"
                name="vevox"
                border={"1px solid #8b8b8b"}
                _focus={{
                  outline: "none",
                  border: "1px solid rgba(129, 140, 248)",
                }}
                _hover={{
                  outline: "none",
                  border: "1px solid rgba(129, 140, 248)",
                }}
              />
            </FormControl>
            <FormControl isRequired isInvalid={false} marginBottom={"2rem"}>
              <FormLabel>Explanation Meeting Strength</FormLabel>
              <Input
                onChange={handleAttendanceForm}
                type="number"
                name="explanation"
                border={"1px solid #8b8b8b"}
                _focus={{
                  outline: "none",
                  border: "1px solid rgba(129, 140, 248)",
                }}
                _hover={{
                  outline: "none",
                  border: "1px solid rgba(129, 140, 248)",
                }}
              />
            </FormControl>
            <Input
              width={["100%", "20%", "20%", "20%"]}
              type="submit"
              placeholder="Submit"
              marginTop={"30px"}
              cursor={"pointer"}
              bg={"rgba(129, 140, 248)"}
              color={"white"}
              transition={"0.5s ease"}
              border={"2px solid transparent"}
              _hover={{
                border: "2px solid rgba(129, 140, 248)",
                background: "white",
                color: "black",
                boxShadow: "0 0 0 5px rgb(129 140 248 / 30%)",
              }}
            />
          </form>
        </Box>
      </Box>
    </ChakraProvider>
  );
};
