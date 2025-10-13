// import { Box, IconButton, Typography, useTheme } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { tokens } from "../../theme";
import { mockDataTeam } from "../../model/mockData";
import { Box, IconButton, Typography, useTheme, TextField, MenuItem, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/header";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";

const Students = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [blockFilter, setBlockFilter] = useState("all");

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const handleStatusFilter = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleBlockFilter = (event) => {
    setBlockFilter(event.target.value);
  };

  const columns = [
    {
      field: "name",
      headerName: "Student",
      flex: 1,
      headerAlign: "center",
      cellClassName: "name-column-cell"
    },
    {
      field: "attendance",
      headerName: "Attendance",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: ({ row: { attendance } }) => {
        return (
          <Box
            width="100%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
          >
            <Typography color={attendance >= 75 ? "#00C54A" : "#DC2626"}>
              {attendance}%
            </Typography>
          </Box>
        );
      }
    },
    {
      field: "status",
      headerName: "Status",
      align: "center",
      headerAlign: "center",
      flex: 1,
      renderCell: ({ row: { status } }) => {
        const statusBgColors = {
          "Excellent": colors.greenCard[500],
          "At Risk": colors.orangeCard[500],
          "Critical": colors.redCard[500],
          // "Active": colors.blueCard[500],
        };
        const statusTextColors = {
          "Excellent": "#00C54A",   
          "At Risk": "#F59E0B",   
          "Critical": "#DC2626",    
          // "Active": "#3B82F6",      
        };
        return (
          <Box
            width="50%"
            m="10px auto"
            p="5px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            backgroundColor={statusBgColors[status] || "#0284C7"} 
            borderRadius="7px"
          >
            <Typography
              color={statusTextColors[status] || "#ffffff"} 
              sx={{ ml: "5px", fontWeight: "400"}}
            >
              {status}
            </Typography>
          </Box>
        );
      },
    },

    // {
    //   field: "actions",
    //   headerName: "Actions",
    //   align: "center",
    //   headerAlign: "center",
    //   flex: 0.5,
    //   renderCell: ({ row }) => {
    //     return (
    //       <IconButton onClick={() => handleEdit(row)}>
    //         <EditIcon />
    //       </IconButton>
    //     );
    //   }
    // },

    {
      field: "block",
      headerName: "Block",
      flex: 1,
      headerAlign: "center",
      cellClassName: "name-column-cell"
    },
  ];

  const handleEdit = (row) => {
    console.log("Edit student:", row);
    // Implement edit functionality
  };

  const filteredRows = mockDataTeam.filter((row) => {
    const matchesSearch = 
      row.name.toLowerCase().includes(searchText.toLowerCase()) ||
      row.id.toString().includes(searchText) ||
      row.email.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || row.status === statusFilter;

    const matchesBlock = blockFilter === "all" || row.block === blockFilter;
    
    return matchesSearch && matchesStatus && matchesBlock;
  });

  const getStatusCounts = () => {
    return mockDataTeam.reduce(
      (acc, student) => {
        acc.total += 1;
        acc[student.status.toLowerCase()] = (acc[student.status.toLowerCase()] || 0) + 1;
        return acc;
      },
      { total: 0, excellent: 0, active: 0, "at risk": 0, critical: 0 }
    );
  };

  const statusCounts = getStatusCounts();

  return (
    <Box m="30px">
      <Header title="Students" subtitle="View and manage all students records" />
      
      {/* Search and Filter Controls */}
      <Box display="flex" gap="20px" mt="40px" mb="20px">
        <TextField
          label="Search students"
          variant="outlined"
          value={searchText}
          onChange={handleSearch}
          sx={{
            flex: 1,
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",   
          }
  }}
        />
        <TextField
          select
          label="Filter by Status"
          value={statusFilter}
          onChange={handleStatusFilter}
          sx={{
            width: "200px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px", 
          }
  }}
        >
          <MenuItem value="all">All Students</MenuItem>
          <MenuItem value="Excellent">Excellent</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="At Risk">At Risk</MenuItem>
          <MenuItem value="Critical">Critical</MenuItem>
        </TextField>

        <TextField
          select
          label="Filter by Block"
          value={blockFilter}
          onChange={handleBlockFilter}
          sx={{
            width: "200px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px", 
            }
          }}
        >
          <MenuItem value="all">All Blocks</MenuItem>
          <MenuItem value="BSIT3-SYSDEV-01">BSIT3-SYSDEV-01</MenuItem>
          <MenuItem value="BSIT3-SYSDEV-02">BSIT3-SYSDEV-02</MenuItem>
          <MenuItem value="BSIT3-SYSDEV-03">BSIT3-SYSDEV-03</MenuItem>
          <MenuItem value="BSIT3-SYSDEV-04">BSIT3-SYSDEV-04</MenuItem>
        </TextField>
      </Box>

      {/* Statistics Boxes */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(4, 1fr)"
        gap="20px"
        mb="20px"
        mt="20px"
      >
        <Box
          bgcolor={colors.blueCard[500]}
          p="20px"
          borderRadius="10px"
          textAlign="center"
        >
          <Typography color= "#0284C7" fontWeight={600}> Total Students</Typography>
          <Typography fontSize="36px" color= "#0284C7" fontWeight="bold" mt="5px" >{statusCounts.total}</Typography>
        </Box>
        <Box
          bgcolor={colors.greenCard[500]}
          p="20px"
          borderRadius="10px"
          textAlign="center"
        >
          <Typography color= "#00C54A" fontWeight={600}>Excellent</Typography>
          <Typography fontSize="36px" color="#00C54A" fontWeight="bold" mt="5px" >{statusCounts.excellent}</Typography>
        </Box>
        <Box
          bgcolor={colors.orangeCard[500]}
          p="20px"
          borderRadius="10px"
          textAlign="center"
        >
          <Typography color= "#F59E0B" fontWeight={600}>At Risk</Typography>
          <Typography fontSize="36px" color="#F59E0B" fontWeight="bold" mt="5px" >{statusCounts["at risk"]}</Typography>
        </Box>
        <Box
          bgcolor={colors.redCard[500]}
          p="20px"
          borderRadius="10px"
          textAlign="center"
        >
          <Typography color= "#DC2626" fontWeight={600}>Critical</Typography>
          <Typography fontSize="36px" color="#DC2626" fontWeight="bold" mt="5px" >{statusCounts.critical}</Typography>
        </Box>
      </Box>

      {/* DataGrid */}
      <Box 
        height="600px" 
        sx={{ borderRadius: "10px", overflow: "hidden" }}
      >
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          components={{ Toolbar: GridToolbar }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          disableSelectionOnClick
          sx={{
            border: "none",
            "& .MuiDataGrid-main": {
              borderRadius: "16px",
            },

            "& .MuiDataGrid-cell": {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center"
            },

            "& .MuiDataGrid-columnHeaderTitle": {
              textAlign: "center",
              width: "100%",
            },

            "& .MuiDataGrid-columnHeader": {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              
            },
          }}
        />
      </Box>
      {/* Footer */}
        <Box textAlign="center" pb="20px" mt= "20px">
            <Typography variant="body2" color="text.secondary">
                © 2025 GROUP 8. All rights reserved.
            </Typography>
        </Box>
    </Box>
  );
}
export default Students;