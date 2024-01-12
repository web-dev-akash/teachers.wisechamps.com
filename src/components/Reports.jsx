import React, { useEffect, useState } from "react";
import { Header } from "./Header";
import {
  Box,
  ChakraProvider,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import axios from "axios";
import { RaceBy } from "@uiball/loaders";

export const Reports = () => {
  const [mode, setMode] = useState("");
  const [reportData, setReportData] = useState({
    grade: "",
    team: "",
  });
  const [grades, setGrades] = useState({
    "1;2": "Grade 1 & 2",
    3: "Grade 3",
    4: "Grade 4",
    5: "Grade 5",
    6: "Grade 6",
    "7;8": "Grade 7 & 8",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [report, setReport] = useState({});
  const [winners, setWinners] = useState({});
  const [score, setScore] = useState(0);
  const [flag, setFlag] = useState(false);

  const handleFilters = async (e) => {
    e.preventDefault();
    const name = e.target.name;
    const innerText = e.target.innerText;
    const value = e.target.value;
    setReportData({ ...reportData, [name]: value });
    document.getElementById(`select${name}`).innerText = innerText;
  };

  const getDailyReport = async (reportData) => {
    try {
      setLoading(true);
      // const url = `https://backend.wisechamps.com/teachers/report`;
      const url = `http://localhost:8080/teachers/report`;
      const res = await axios.post(url, {
        grade: reportData.grade,
        team: reportData.team,
      });
      console.log(res.data);
      const data = res.data.reports;
      const previousWinners = res.data.previousWinners;
      const score = res.data.totalScore;
      if (data?.length > 0) {
        setReport(data);
        setFlag(true);
        setScore(score);
        if (previousWinners) {
          setWinners(previousWinners);
        } else {
          setWinners({});
        }
      } else {
        setMode("noReports");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    if (reportData.grade && reportData.team) {
      getDailyReport(reportData);
    }
  }, [reportData]);

  return (
    <ChakraProvider
      disableGlobalStyle={true}
      resetCSS={true}
      disableEnvironment={true}
    >
      <Header />
      <Box
        padding={"5rem 0"}
        width={["95%", "95%", "80%", "80%"]}
        height={["80vh", "80vh", "90vh", "100vh"]}
      >
        <Box
          display={"flex"}
          flexDirection={["column", "row", "row", "row"]}
          gap={3}
          justifyContent={"space-between"}
          width={"100%"}
        >
          <Menu>
            <MenuButton
              px={4}
              py={2}
              color={"#fff"}
              bg={"rgba(129, 140, 248)"}
              borderRadius={"10px"}
              _expanded={{ bg: "white", color: "#000" }}
              transition={"0.5s ease"}
              border={"2px solid rgba(129, 140, 248)"}
              _hover={{
                border: "2px solid rgba(129, 140, 248)",
                boxShadow: "0 0 0 5px rgb(129 140 248 / 30%)",
              }}
            >
              <Text id="selectgrade">
                Select Grade <ChevronDownIcon />
              </Text>
            </MenuButton>
            <MenuList border={"2px solid rgba(129, 140, 248)"}>
              <MenuItem
                name="grade"
                onClick={(e) => handleFilters(e)}
                value={"1;2"}
              >
                Grade 1 & 2
              </MenuItem>
              <MenuItem
                name="grade"
                onClick={(e) => handleFilters(e)}
                value={"3"}
              >
                Grade 3
              </MenuItem>
              <MenuItem
                name="grade"
                onClick={(e) => handleFilters(e)}
                value={"4"}
              >
                Grade 4
              </MenuItem>
              <MenuItem
                name="grade"
                onClick={(e) => handleFilters(e)}
                value={"5"}
              >
                Grade 5
              </MenuItem>
              <MenuItem
                name="grade"
                onClick={(e) => handleFilters(e)}
                value={"6"}
              >
                Grade 6
              </MenuItem>
              <MenuItem
                name="grade"
                onClick={(e) => handleFilters(e)}
                value={"7;8"}
              >
                Grade 7 & 8
              </MenuItem>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              px={4}
              py={2}
              color={"#fff"}
              bg={"rgba(129, 140, 248)"}
              borderRadius={"10px"}
              _expanded={{ bg: "white", color: "#000" }}
              transition={"0.5s ease"}
              border={"2px solid rgba(129, 140, 248)"}
              _hover={{
                border: "2px solid rgba(129, 140, 248)",
                boxShadow: "0 0 0 5px rgb(129 140 248 / 30%)",
              }}
            >
              <Text id="selectteam">
                Select Team <ChevronDownIcon />
              </Text>
            </MenuButton>
            <MenuList border={"2px solid rgba(129, 140, 248)"}>
              <MenuItem
                name="team"
                onClick={(e) => handleFilters(e)}
                value={"Boys"}
              >
                Team Boys
              </MenuItem>
              <MenuItem
                name="team"
                onClick={(e) => handleFilters(e)}
                value={"Girls"}
              >
                Team Girls
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
        <Box
          width={"100%"}
          display={loading ? "flex" : "none"}
          justifyContent={"center"}
          alignItems={"center"}
          height={["70vh", "70vh", "80vh", "80vh"]}
        >
          {loading && (
            <Box
              id="loadingDiv"
              style={{
                width: "fit-content",
              }}
            >
              <p
                style={{
                  marginBottom: "10px",
                }}
              >
                Loading Please Wait...
              </p>
              <RaceBy
                size={300}
                lineWeight={20}
                speed={1.4}
                color="rgba(129, 140, 248)"
              />
            </Box>
          )}
        </Box>
        {!loading && flag ? (
          <>
            <Box>
              <Heading fontSize={"55px"}>
                {grades[reportData.grade]}
                {" - "}
                {reportData.team}
              </Heading>
              <Text marginTop={"20px"} fontSize={"25px"} fontWeight={"600"}>
                Team Score : {score}
              </Text>
            </Box>

            <Box
              display={"flex"}
              justifyContent={"flex-start"}
              padding={"2rem"}
              gap={"20px"}
            >
              <Box
                display={winners?.length > 0 ? "block" : "none"}
                flexBasis={"25%"}
                border={"2px solid rgba(129, 140, 248)"}
                borderRadius={"10px"}
              >
                <Text
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  height={"49px"}
                  fontSize={"17px"}
                  fontWeight={"600"}
                >
                  Previous Winners
                </Text>
                {winners?.length > 0 &&
                  winners.map(({ id, Student_Name }) => (
                    <Text
                      key={id}
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      height={"55px"}
                      className="previosWinners"
                      fontWeight={"500"}
                      textTransform={"capitalize"}
                    >
                      {Student_Name}
                    </Text>
                  ))}
              </Box>
              <TableContainer
                flexBasis={winners?.length > 0 ? "75%" : "100%"}
                borderRadius={"10px"}
                whiteSpace={"unset"}
                maxWidth={"100%"}
                border={"2px solid rgba(129, 140, 248)"}
              >
                <Table variant="striped" colorScheme="purple">
                  <Thead>
                    <Tr height={"50px"}>
                      <Th fontSize={"15px"}>S.No.</Th>
                      <Th fontSize={"15px"}>Student Name</Th>
                      <Th fontSize={"15px"}>Student ID</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {report?.length > 0
                      ? report.map(({ Student_ID, Student_Name }, index) => (
                          <Tr key={Student_ID}>
                            <Td>{index + 1}</Td>
                            <Td textTransform={"capitalize"}>{Student_Name}</Td>
                            <Td>{Student_ID}</Td>
                          </Tr>
                        ))
                      : null}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </>
        ) : (
          mode === "noReports" &&
          !loading && (
            <div
              className="email-not-found"
              style={{
                height: "70vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p>
                There are no Reports available right now <br />
                Please try after 1-2 minutes.
              </p>
            </div>
          )
        )}
      </Box>
    </ChakraProvider>
  );
};
