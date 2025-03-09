import { SxProps, Theme } from "@mui/material";

export const containerStyles: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: "white",
  minHeight: "100vh",
  padding: 3,
  overflowX: "unset",
};

export const formStyles: SxProps<Theme> = {
  mt: 1,
  width: "100%",
  maxWidth: 400,
  backgroundColor: "white",
  borderRadius: 3,
  padding: 3,
  boxShadow: 3,
};

export const titleStyles: SxProps<Theme> = {
  mb: 3,
  fontWeight: 700,
  color: "primary.main",
  textAlign: "center",
  fontSize: {
    xs: "1.5rem",
    sm: "2rem",
  },
};

export const buttonStyles: SxProps<Theme> = {
  mt: 3,
  mb: 2,
  py: 1.5,
  fontWeight: 600,
};

export const alertStyles: SxProps<Theme> = {
  mt: 2,
  "& .MuiAlert-message": {
    fontSize: {
      xs: "0.7rem",
      sm: "0.9rem",
    },
  },
};
