import React from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  ChakraProvider,
  Heading,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { Header } from "./Header";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userAdded } from "../Redux/reducer";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutUser = () => {
    dispatch(userAdded({}));
    localStorage.removeItem("wise_email");
    localStorage.removeItem("wise_pass");
  };

  return (
    <ChakraProvider disableGlobalStyle={true} disableEnvironment={true}>
      <Header />
      <Box position={"absolute"} top={"20px"} right={"5%"}>
        <Button id="submit-btn" onClick={logoutUser}>
          Logout
        </Button>
      </Box>
      <SimpleGrid
        margin={"0 auto"}
        padding={["20px", "20px", "30px", "20px", "80px"]}
        width={"100%"}
        spacing={2}
        gridTemplateColumns={"repeat(3, 1fr)"}
        marginTop={["150px", "150px", 0, 0]}
      >
        <Card
          onClick={() => navigate("/reports")}
          transition={"0.5s ease"}
          cursor={"pointer"}
          border={"2px solid rgba(129, 140, 248)"}
          _hover={{
            border: "2px solid rgba(129, 140, 248)",
            boxShadow: "0 0 0 5px rgb(129 140 248 / 30%)",
          }}
        >
          <CardHeader>
            <Heading size="md">Reports</Heading>
          </CardHeader>
          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Select Grade
                </Heading>
                <Text pt="2" fontSize="sm">
                  Select the grade for which you want to see the report.
                </Text>
              </Box>
              {/* <Box>
                <Heading size="xs" textTransform="uppercase">
                  Select Team
                </Heading>
                <Text pt="2" fontSize="sm">
                  Select the team.
                </Text>
              </Box> */}
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Share the Report
                </Heading>
                <Text pt="2" fontSize="sm">
                  Share the report with the students.
                </Text>
              </Box>
            </Stack>
          </CardBody>
        </Card>
        <Card
          cursor={"pointer"}
          onClick={() => navigate("/attendance")}
          transition={"0.5s ease"}
          border={"2px solid rgba(129, 140, 248)"}
          _hover={{
            border: "2px solid rgba(129, 140, 248)",
            boxShadow: "0 0 0 5px rgb(129 140 248 / 30%)",
          }}
        >
          <CardHeader>
            <Heading size="md">Attendance</Heading>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Fill Details
                </Heading>
                <Text pt="2" fontSize="sm">
                  Fill all the required details like Zoom and Explation Strength
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Winner's ID
                </Heading>
                <Text pt="2" fontSize="sm">
                  Enter the Winner's ID for today's quiz if required.
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Submit
                </Heading>
                <Text pt="2" fontSize="sm">
                  Submit the Attendance
                </Text>
              </Box>
            </Stack>
          </CardBody>
        </Card>
        <Card
          cursor={"pointer"}
          onClick={() => navigate("/last-session")}
          transition={"0.5s ease"}
          border={"2px solid rgba(129, 140, 248)"}
          _hover={{
            border: "2px solid rgba(129, 140, 248)",
            boxShadow: "0 0 0 5px rgb(129 140 248 / 30%)",
          }}
        >
          <CardHeader>
            <Heading size="md">Students with Last Session</Heading>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Select Grade
                </Heading>
                <Text pt="2" fontSize="sm">
                  Select the grade for which you want to see the students with
                  their last or 2nd last session.
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Engage with the Students
                </Heading>
                <Text pt="2" fontSize="sm">
                  Share with the students that it will be there last or 2nd last
                  session.
                </Text>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </SimpleGrid>
    </ChakraProvider>
  );
};
