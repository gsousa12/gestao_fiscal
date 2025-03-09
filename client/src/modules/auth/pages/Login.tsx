import React, { useState, useEffect } from "react";
import {
  TextField,
  Container,
  Box,
  Typography,
  Alert,
  Button,
} from "@mui/material";
import { useLoginController } from "./login.controller";
import {
  containerStyles,
  formStyles,
  titleStyles,
  buttonStyles,
  alertStyles,
} from "./login.style";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error, handleLogin, token, navigate } = useLoginController();

  useEffect(() => {
    const sessionToken = sessionStorage.getItem("access_token");
    if (token || sessionToken) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    <Container maxWidth="xs" sx={containerStyles}>
      <Box sx={formStyles}>
        <Typography variant="h4" sx={titleStyles}>
          Gestão Fiscal
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            fullWidth
            label="Senha"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <Alert severity="error" sx={alertStyles}>
              {error}
            </Alert>
          )}

          <Button type="submit" disabled={loading} fullWidth sx={buttonStyles}>
            {loading ? "Carregando..." : "Acessar Sistema"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
