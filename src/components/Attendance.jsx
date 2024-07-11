import {
  Box,
  Button,
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
import { FaMinus, FaPlus } from "react-icons/fa";

export const Attendance = ({ setLoading, setError, setMode, userid }) => {
  const [form, setForm] = useState({
    sessionDate: "",
    zoom: "",
    grade: "",
    explanation: "",
    criteria: "",
    winners: [""],
  });

  const handleAttendanceForm = (e, index) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name.startsWith("winner")) {
      const winners = [...form.winners];
      winners[index] = value;
      setForm({ ...form, winners });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleFormSubmit = async (e, form, userid) => {
    e.preventDefault();
    try {
      const { sessionDate, zoom, grade, explanation, criteria, winners } = form;
      if (!sessionDate || !zoom || !grade || !explanation) {
        alert("Please Fill the Required Details");
        return;
      }
      setLoading(true);
      const url = `https://backend.wisechamps.com/teachers/attendance`;
      const res = await axios.post(url, {
        contactId: userid,
        sessionDate,
        zoom,
        grade,
        explanation,
        criteria,
        winners,
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

  const addNewWinnerInput = () => {
    setForm({ ...form, winners: [...form.winners, ""] });
  };

  const removeWinnerInput = (index) => {
    const winners = form.winners.filter((_, i) => i !== index);
    setForm({ ...form, winners });
  };

  return (
    <ChakraProvider disableGlobalStyle={true}>
      <Header />
      <Box position={"absolute"} top={"20px"} right={"20px"}>
        <Button
          color={"white"}
          backgroundColor={"#4E47E5"}
          onClick={() => setMode("reports")}
        >
          Reports
        </Button>
      </Box>
      <Box
        marginTop={["20px", "20px", "20px", "70px", "50px"]}
        marginBottom={"20px"}
        width={["90%", "90%", "100%", "100%"]}
        maxWidth={"800px"}
        borderRadius={"20px"}
        boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}
        padding={["2rem", "3rem 2rem", "3rem", "3rem"]}
      >
        <Heading
          margin={"0 0 20px 0"}
          fontSize={["20px", "20px", "25px", "25px"]}
        >
          Attendance Form
        </Heading>
        <Box>
          <form>
            <FormControl isRequired marginBottom={"1.3rem"}>
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
                  border: "1px solid #5838fc",
                }}
                _hover={{
                  outline: "none",
                  border: "1px solid #5838fc",
                }}
              />
            </FormControl>
            <FormControl isRequired marginBottom={"1.3rem"}>
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
                  border: "1px solid #5838fc",
                }}
                _hover={{
                  outline: "none",
                  border: "1px solid #5838fc",
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
            <FormControl isRequired marginBottom={"1.3rem"}>
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
                  border: "1px solid #5838fc",
                }}
                _hover={{
                  outline: "none",
                  border: "1px solid #5838fc",
                }}
              />
            </FormControl>
            <FormControl isRequired marginBottom={"1.3rem"}>
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
                  border: "1px solid #5838fc",
                }}
                _hover={{
                  outline: "none",
                  border: "1px solid #5838fc",
                }}
              />
            </FormControl>
            <FormControl marginBottom={"1.3rem"}>
              <FormLabel fontSize={["12px", "12px", "15px", "15px"]}>
                Lucky Draw Criteria
              </FormLabel>
              <Input
                onChange={handleAttendanceForm}
                type="text"
                name="criteria"
                border={"1px solid #8b8b8b"}
                _focus={{
                  outline: "none",
                  border: "1px solid #5838fc",
                }}
                _hover={{
                  outline: "none",
                  border: "1px solid #5838fc",
                }}
              />
            </FormControl>
            <Box
              display={"flex"}
              justifyContent={"center"}
              flexDirection={"column"}
            >
              {form.winners.map((winner, index) => (
                <FormControl key={index} marginBottom={"1.3rem"}>
                  <FormLabel fontSize={["12px", "12px", "15px", "15px"]}>
                    Winner's Student ID {index + 1}
                  </FormLabel>
                  <Box display="flex" alignItems="center">
                    <Input
                      onChange={(e) => handleAttendanceForm(e, index)}
                      type="number"
                      name={`winner${index}`}
                      value={winner}
                      border={"1px solid #8b8b8b"}
                      _focus={{
                        outline: "none",
                        border: "1px solid #5838fc",
                      }}
                      _hover={{
                        outline: "none",
                        border: "1px solid #5838fc",
                      }}
                    />
                    {form.winners.length > 1 && (
                      <Button
                        onClick={() => removeWinnerInput(index)}
                        marginLeft="10px"
                        colorScheme="red"
                      >
                        <FaMinus />
                      </Button>
                    )}
                  </Box>
                </FormControl>
              ))}
            </Box>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              gap={"10px"}
            >
              <Button
                leftIcon={<FaPlus />}
                onClick={addNewWinnerInput}
                border={"1px solid #5838fc"}
                background={"transparent"}
                color={"#5838fc"}
              >
                Add Another Winner
              </Button>
              <Input
                onClick={(e) => handleFormSubmit(e, form, userid)}
                width={["auto", "150px", "150px", "150px"]}
                type="submit"
                placeholder="Submit"
                cursor={"pointer"}
                bg={"#5838fc"}
                color={"white"}
                height={"43px"}
                transition={"0.5s ease"}
                border={"2px solid transparent"}
                _hover={{
                  border: "2px solid #5838fc",
                  background: "white",
                  color: "black",
                  boxShadow: "0 0 0 5px rgb(129 140 248 / 30%)",
                }}
              />
            </Box>
          </form>
        </Box>
      </Box>
    </ChakraProvider>
  );
};
