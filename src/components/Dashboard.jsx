import React from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  ChakraProvider,
  Flex,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { Header } from "./Header";
export const Dashboard = ({ setMode }) => {
  const logoutUser = () => {
    setMode(null);
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
      <Flex
        gap={[5, 5, 5, 10]}
        flexDirection={["column", "column", "row", "row"]}
        marginTop={["150px", "150px", 0, 0]}
      >
        <Card
          margin={"0 auto"}
          width={["96%", "96%", "50%", "50%"]}
          onClick={() => setMode("reports")}
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
          margin={"0 auto"}
          onClick={() => setMode("attendance")}
          width={["96%", "96%", "50%", "50%"]}
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
      </Flex>
    </ChakraProvider>
  );
};
