import React from "react";
import {
  Box,
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
  return (
    <ChakraProvider disableGlobalStyle={true} disableEnvironment={true}>
      <Header />
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
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Select Team
                </Heading>
                <Text pt="2" fontSize="sm">
                  Select the team like <b>Boys</b> or <b>Girls</b>.
                </Text>
              </Box>
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
                  Fill all the required details like Zoom, Vevox and Explation
                  Strength
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Vevox Session ID
                </Heading>
                <Text pt="2" fontSize="sm">
                  Enter the Vevox Session ID for today's quiz
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
