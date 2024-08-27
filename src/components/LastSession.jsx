import React, { useEffect, useState } from "react";
import { Header } from "./Header";
import {
  Box,
  Button,
  ChakraProvider,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Loading } from "./Loading";
import { useDispatch, useSelector } from "react-redux";
import { fetchLastSessionByGrade } from "../Redux/action";
import { useNavigate } from "react-router-dom";

export const LastSession = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toast = useToast();
  const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.loading);
  const status = useSelector((state) => state.lastSession.status);
  const report = useSelector((state) => state.lastSession.users);
  const [filteredReport, setFilteredReport] = useState([]);

  const [reportData, setReportData] = useState({
    grade: "",
  });

  const [grades, setGrades] = useState({
    "1;2": "Grade 1 & 2",
    3: "Grade 3",
    4: "Grade 4",
    5: "Grade 5",
    6: "Grade 6",
    "7;8": "Grade 7 & 8",
  });

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
      dispatch(fetchLastSessionByGrade({ grade: reportData.grade }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterBySession = async (e) => {
    const value = e.target.value;
    if (value && value !== "") {
      const newReport = report.filter(
        (user) => Number(user.Credits) === Number(value)
      );
      setFilteredReport(newReport);
    } else {
      setFilteredReport(report);
    }
  };

  useEffect(() => {
    if (reportData.grade) {
      getDailyReport(reportData);
    }
  }, [reportData]);

  useEffect(() => {
    setFilteredReport(report);
  }, [report]);

  if (error) {
    toast({
      title: "Something Went Wrong",
      description: "Please refresh and try again",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  }

  return (
    <ChakraProvider
      disableGlobalStyle={true}
      resetCSS={true}
      disableEnvironment={true}
    >
      <Header />

      <Box
        padding={"5rem 0 5rem 0"}
        width={["95%", "95%", "90%", "90%"]}
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
              px={3}
              py={2}
              color={"#fff"}
              bg={"#5853fc"}
              borderRadius={"10px"}
              _expanded={{ bg: "white", color: "#000" }}
              transition={"0.5s ease"}
              border={"2px solid #5853fc"}
              _hover={{
                border: "2px solid #5853fc",
                boxShadow: "0 0 0 5px rgb(129 140 248 / 30%)",
              }}
              fontSize={"14px"}
            >
              <Text id="selectgrade">
                Select Grade <ChevronDownIcon />
              </Text>
            </MenuButton>
            <MenuList border={"2px solid #5853fc"}>
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
          <Box>
            <Button
              color={"white"}
              backgroundColor={"#5853fc"}
              onClick={() => navigate("/")}
            >
              Back
            </Button>
          </Box>
        </Box>
        <Box
          width={"100%"}
          display={loading ? "flex" : "none"}
          justifyContent={"center"}
          alignItems={"center"}
          height={["70vh", "70vh", "60vh", "60vh"]}
        >
          {loading && <Loading />}
        </Box>
        {!loading && status === 200 ? (
          <>
            <Box>
              <Heading fontSize={"35px"}>{grades[reportData.grade]}</Heading>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                marginTop={"10px"}
              >
                <Text id="subHeading">
                  Date :{" "}
                  {new Date().toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </Text>
                <Box>
                  <Select
                    placeholder="Filter By Session"
                    onChange={handleFilterBySession}
                  >
                    <option value="1">Last Session</option>
                    <option value="2">2nd Last Session</option>
                  </Select>
                </Box>
              </Box>
            </Box>

            <Box
              padding={"2rem 0"}
              display={"flex"}
              justifyContent={"flex-start"}
              gap={"20px"}
            >
              <TableContainer
                flexBasis={"100%"}
                borderRadius={"10px"}
                whiteSpace={"unset"}
                maxWidth={"100%"}
                border={"2px solid #5853fc"}
              >
                <Table variant="striped" colorScheme="purple">
                  <Thead>
                    <Tr height={"50px"}>
                      <Th fontSize={"15px"}>S.No.</Th>
                      <Th fontSize={"15px"}>Parent Name</Th>
                      <Th fontSize={"15px"}>Student Name</Th>
                      <Th fontSize={"15px"}>Phone</Th>
                      <Th fontSize={"15px"}>Session</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {filteredReport?.length > 0
                      ? filteredReport.map(
                          (
                            {
                              Student_ID,
                              Student_Name,
                              Last_Name,
                              Phone,
                              Credits,
                            },
                            index
                          ) => (
                            <Tr key={Student_ID}>
                              <Td>{index + 1}</Td>
                              <Td textTransform={"capitalize"}>{Last_Name}</Td>
                              <Td textTransform={"capitalize"}>
                                {Student_Name}
                              </Td>
                              <Td textTransform={"capitalize"}>{Phone}</Td>
                              <Td textTransform={"capitalize"}>
                                {Credits === 1
                                  ? "Last Session"
                                  : "2nd Last Session"}
                              </Td>
                            </Tr>
                          )
                        )
                      : null}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </>
        ) : (
          status !== 0 &&
          status !== 200 &&
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
