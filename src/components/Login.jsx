import React, { useState, useEffect } from "react";
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
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Check if the user is already logged in when the component mounts
    const isAuthenticated = sessionStorage.getItem("isLoggedIn") === "true";
    if (isAuthenticated) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    // Hardcoded credentials (for demonstration purposes)
    const hardcodedPassword = "risings123!";

    if (password === hardcodedPassword) {
      // Set authentication status in session storage
      sessionStorage.setItem("isLoggedIn", "true");

      setIsLoggedIn(true);
      onLogin();
    } else {
      alert("Invalid credentials");
    }
  };

  const handleLogout = () => {
    // Remove authentication status from session storage
    sessionStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    onLogout();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div>
      {!isLoggedIn ? (
        <ChakraProvider>
          <VStack minHeight="100vh" justifyContent="center" spacing={6}>
            <Router>
              <Link to="/">
                <Text
                  fontSize="50px" // Increase font size
                  fontWeight="bold"
                  fontFamily="Playfair Display"
                  zIndex={5}
                  cursor="pointer"
                  marginTop="-100px" // Move the text slightly towards the top
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
              marginTop="10px" // Move the box containing inputs and button towards the top
            >
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                width="130%" // Decrease the width of the textboxes
                marginBottom="30px" // Add more spacing below the textbox
                marginTop="10px" // Slightly move the textbox towards the top
                onKeyPress={handleKeyPress} // Handle Enter key press
              />
              <Button
                colorScheme="teal"
                size="md"
                onClick={handleLogin}
                className="login-button"
                width="130%" // Decrease the width of the button
                marginTop="10px" // Slightly move the button towards the top
              >
                Login
              </Button>
            </Box>
          </VStack>
        </ChakraProvider>
      ) : (
        <div>
        </div>
      )}
    </div>
  );
};

export default Login;
