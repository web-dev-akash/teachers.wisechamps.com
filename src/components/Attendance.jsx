import {
  Box,
  ChakraProvider,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Header } from "./Header";
import axios from "axios";

export const Attendance = ({ setLoading, setError, setMode, userid }) => {
  const [form, setForm] = useState({
    sessionDate: "",
    zoom: "",
    grade: "",
    explanation: "",
    winner: "",
  });

  const handleAttendanceForm = async (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [name]: value });
  };

  const handleFormSubmit = async (formData, userid) => {
    try {
      setLoading(true);
      const url = `https://backend.wisechamps.com/teachers/attendance`;
      const res = await axios.post(url, {
        contactId: userid,
        sessionDate: formData.sessionDate,
        zoom: formData.zoom,
        grade: formData.grade,
        explanation: formData.explanation,
        winner: formData.winner,
      });
      const mode = res.data.mode;
      setMode(mode);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
    }
  };

  return (
    <ChakraProvider disableGlobalStyle={true}>
      <Header />
      <Box
        marginTop={["4rem", "4rem", "2rem", "2rem", "2rem"]}
        width={["90%", "90%", "100%", "100%"]}
        maxWidth={"800px"}
        borderRadius={"20px"}
        boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}
        padding={["2rem", "3rem 2rem", "3rem", "3rem"]}
      >
        <Heading
          margin={"0 0 20px 0"}
          fontSize={["20px", "20px", "30px", "30px"]}
        >
          Attendance Form
        </Heading>
        <Box>
          <form>
            <FormControl isRequired marginBottom={"2rem"}>
              <FormLabel fontSize={["12px", "12px", "15px", "15px"]}>
                Session Date
              </FormLabel>
              <Input
                onChange={handleAttendanceForm}
                type="date"
                name="sessionDate"
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
            <FormControl isRequired marginBottom={"2rem"}>
              <FormLabel fontSize={["12px", "12px", "15px", "15px"]}>
                Grade
              </FormLabel>
              <Select
                placeholder="Select Grade"
                onChange={handleAttendanceForm}
                name="grade"
                border={"1px solid #8b8b8b"}
                _focus={{
                  outline: "none",
                  border: "1px solid rgba(129, 140, 248)",
                }}
                _hover={{
                  outline: "none",
                  border: "1px solid rgba(129, 140, 248)",
                }}
              >
                <option value={"1;2"}>Grade 1 & 2</option>
                <option value={"3"}>Grade 3</option>
                <option value={"4"}>Grade 4</option>
                <option value={"5"}>Grade 5</option>
                <option value={"6"}>Grade 6</option>
                <option value={"7;8"}>Grade 7 & 8</option>
              </Select>
            </FormControl>
            <FormControl isRequired marginBottom={"2rem"}>
              <FormLabel fontSize={["12px", "12px", "15px", "15px"]}>
                Zoom Meeting Strength
              </FormLabel>
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
            <FormControl isRequired marginBottom={"2rem"}>
              <FormLabel fontSize={["12px", "12px", "15px", "15px"]}>
                Explanation Meeting Strength
              </FormLabel>
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
            <FormControl isRequired marginBottom={"2rem"}>
              <FormLabel fontSize={["12px", "12px", "15px", "15px"]}>
                Winner's Student ID
              </FormLabel>
              <Input
                onChange={handleAttendanceForm}
                type="number"
                name="winner"
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
              onClick={() => handleFormSubmit(form, userid)}
              width={["100%", "120px", "120px", "120px"]}
              type="submit"
              placeholder="Submit"
              marginTop={"10px"}
              cursor={"pointer"}
              bg={"rgba(129, 140, 248)"}
              color={"white"}
              height={"50px"}
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
