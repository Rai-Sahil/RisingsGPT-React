import React, { useState } from "react";
import "./Login.css"; // Import a CSS file for styling

import {
  ChakraProvider,
  VStack,
  Text,
  Input,
  Button,
  Box,
} from "@chakra-ui/react";
import { BrowserRouter as Router, Link } from "react-router-dom";

const Login = ({ onLogin, onLogout }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Hardcoded credentials (for demonstration purposes)
    const hardcodedUsername = "risings";
    const hardcodedPassword = "risings123!";

    if (username === hardcodedUsername && password === hardcodedPassword) {
      setIsLoggedIn(true);
      onLogin();
    } else {
      alert("Invalid credentials");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    onLogout();
  };

  return (
    <div>
        {!isLoggedIn ? (
          <ChakraProvider>
          <VStack
            minHeight="100vh"
            justifyContent="center"
            spacing={6}
          >
            <Router>
              <Link to="/">
                <Text
                  fontSize="50px" // Increase font size
                  fontWeight="bold"
                  fontFamily="Playfair Display"
                  zIndex={5}
                  cursor="pointer"
                >
                  Risings GPT
                </Text>
              </Link>
            </Router>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            spacing={6} // Add spacing between children
            alignContent="center"
          >
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
              width="130%" // Decrease the width of the textboxes
              marginBottom="10px" // Add more spacing below the textbox
              marginTop="20px" // Add spacing above the textbox
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              width="130%" // Decrease the width of the textboxes
              marginBottom="30px" // Add more spacing below the textbox
              marginTop="20px" // Add spacing above the textbox
            />
            <Button
              colorScheme="teal"
              size="md"
              onClick={handleLogin}
              className="login-button"
              width="130%" // Decrease the width of the button
            >
              Login
            </Button>
          </Box>
          </VStack>
          </ChakraProvider>
        ) : (
          <div></div>
        )}
        </div>
  );
};

export default Login;
