import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  IconButton
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ImportIcon from "@mui/icons-material/Download";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const ImportDataDialog = ({ open, onClose, onImport }) => {
  const [importType, setImportType] = useState("grades");
  const [file, setFile] = useState(null);

  const handleImportTypeChange = (event, newType) => {
    if (newType !== null) {
      setImportType(newType);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const handleImport = () => {
    if (file) {
      onImport(file, importType);
      setFile(null);
      onClose();
    }
  };

  const requiredColumns = {
    grades: [
      "student_id",
      "student_name",
      "course_code",
      "assessment_title",
      "score",
      "total_score",
      "date"
    ],
    attendance: [
      "student_id",
      "student_name",
      "course_code",
      "date",
      "status",
      "time"
    ]
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" gap={1}>
            <ImportIcon />
            <Typography variant="h6">Import Data</Typography>
          </Box>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography color="text.secondary" mb={2}>
          Upload CSV or Excel files to import student data.
        </Typography>

        <ToggleButtonGroup
          value={importType}
          exclusive
          onChange={handleImportTypeChange}
          aria-label="import type"
          sx={{ mb: 2, width: "100%" }}
        >
          <ToggleButton value="grades" aria-label="grades" sx={{ width: "50%" }}>
            Grades
          </ToggleButton>
          <ToggleButton value="attendance" aria-label="attendance" sx={{ width: "50%" }}>
            Attendance
          </ToggleButton>
        </ToggleButtonGroup>

        <Box
          sx={{
            border: "2px dashed",
            borderColor: "divider",
            borderRadius: 2,
            p: 3,
            textAlign: "center",
            mb: 2
          }}
        >
          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileChange}
            style={{ display: "none" }}
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <CloudUploadIcon sx={{ fontSize: 48, color: "text.secondary", mb: 1 }} />
            <Typography display="block" mb={1}>
              {file ? file.name : "No file selected"}
            </Typography>
            <Button
              variant="contained"
              component="span"
              startIcon={<CloudUploadIcon />}
            >
              Choose File
            </Button>
          </label>
        </Box>

        <Box bgcolor="action.hover" p={2} borderRadius={1}>
          <Typography variant="subtitle2" mb={1}>
            Required Columns:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {requiredColumns[importType].join(", ")}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleImport}
          variant="contained"
          disabled={!file}
        >
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImportDataDialog;