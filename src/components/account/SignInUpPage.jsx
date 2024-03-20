import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  styled,
  Typography,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import logo_image from "./../../assets/images/secondary.png";
import PersonIcon from "@mui/icons-material/Person";
import VpnKeySharpIcon from "@mui/icons-material/VpnKeySharp";
import "./../../styles/sign-in-up-page.css";
import EmailSharpIcon from "@mui/icons-material/EmailSharp";
import { API } from "./../../service/api.js";

//Styled Tags

const StyledBox = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgba(0, 0, 0, 0.2);
  border-radius: 7px;
`;

const StyledImage = styled("img")({
  width: 200,
  margin: "0 auto 30px",
  display: "flex",
  padding: "50px 0 0",
});

// or give margin like ...
// const StyledImage = styled("img")({
//   width: 200,
//   margin: "30px auto",
//   display: "flex",
//   padding: "50px 0 0",
// });

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const StyledButton = styled(Button)`
  text-transform: none;
  background: rgba(138, 154, 91, 1);
  color: white;
  border-radius: 7px;
`;

const StyledOtherButton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 20px;
  border-radius: 7px;
  box-shadow: none;
`;

const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;

const signupInitialValues = JSON.stringify({
    email: "",
    fullname: "",
    password: "",
  });

export default function SignInUpPage() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [account, toggleAccount] = React.useState("signin");
  const [signup, setSignup] = useState(signupInitialValues);
  const [error, setError] = useState("");

  const toggleSignup = () => {
    account === "signup" ? toggleAccount("signin") : toggleAccount("signup");
  };

  const onInputChange = (e) => {
    // setSignup({ ...signup, [e.target.fullname]: e.target.value }); //fullname is key for signup object and .value corresponds to the value of the object
    const { name, value } = e.target;
    setSignup({ ...signup, [name]: value });
  };

  const signupUser = async () => {
    let response = await API.userSignup(signup);
    console.log(response);
    if (response.isSuccess) {
      setError("");
      setSignup(signupInitialValues);
      toggleAccount("signin");
    } else {
      setError("Something went wrong! Please try again later.");
    }
  };

  return (
    <>
      <StyledImage src={logo_image} alt="Secondary Logo" />
      <StyledBox>
        <Box>
          {account === "signin" ? (
            <Wrapper>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <PersonIcon
                  sx={{ color: "action.active", mr: 1, my: 0.5 }}
                ></PersonIcon>
                <TextField
                  id="username-textfield"
                  label="Your Username or Email"
                  variant="standard"
                  sx={{ width: "100%" }}
                ></TextField>
              </Box>

              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <VpnKeySharpIcon
                  sx={{ color: "action.active", mr: 1, my: 0.5 }}
                ></VpnKeySharpIcon>
                <FormControl
                  sx={{ m: 0 }}
                  variant="standard"
                  style={{ width: "100%" }}
                >
                  <InputLabel htmlFor="standard-adornment-password">
                    Your Password
                  </InputLabel>
                  <Input
                    id="standard-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Box>

              <StyledButton variant="contained" style={{ width: "100%" }}>
                Sign in
              </StyledButton>
              {error && <Error>{error}</Error>}
              <Box
                sx={{ display: "flex", alignItems: "flex-end", margin: "auto" }}
              >
                <Typography
                  style={{
                    color: "grey",
                    textAlign: "center",
                    fontSize: "14px",
                  }}
                >
                  New to InkOdy?
                </Typography>

                <StyledOtherButton
                  variant="text"
                  onClick={() => toggleSignup()}
                >
                  Sign Up
                </StyledOtherButton>
              </Box>
            </Wrapper>
          ) : (
            <Wrapper>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <PersonIcon
                  sx={{ color: "action.active", mr: 1, my: 0.5 }}
                ></PersonIcon>
                <TextField
                  id="signup-fullname-textfield"
                  label="Your Firstname & Lastname"
                  variant="standard"
                  //   InputProps={{
                  //     endAdornment: (
                  //       <InputAdornment position="end">
                  //         <PersonIcon />
                  //       </InputAdornment>
                  //     ),
                  //   }}
                  sx={{ width: "100%" }}
                  onChange={(e) => onInputChange(e)}
                  name="fullname"
                  //   size="small"
                ></TextField>
              </Box>

              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <EmailSharpIcon
                  sx={{ color: "action.active", mr: 1, my: 0.5 }}
                ></EmailSharpIcon>
                <TextField
                  id="email-textfield"
                  label="Enter your Email"
                  variant="standard"
                  //   InputProps={{
                  //     endAdornment: (
                  //       <InputAdornment position="end">
                  //         <PersonIcon />
                  //       </InputAdornment>
                  //     ),
                  //   }}
                  style={{ width: "100%" }}
                  onChange={(e) => onInputChange(e)}
                  name="email"
                  //   size="small"
                ></TextField>
              </Box>

              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <VpnKeySharpIcon
                  sx={{ color: "action.active", mr: 1, my: 0.5 }}
                ></VpnKeySharpIcon>
                <FormControl
                  style={{ width: "100%" }}
                  sx={{ m: 0 }}
                  variant="standard"
                  onChange={(e) => onInputChange(e)}
                  name="password"
                >
                  <InputLabel htmlFor="standard-adornment-password">
                    Set Password
                  </InputLabel>
                  <Input
                    id="standard-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Box>

              <StyledButton
                variant="contained"
                style={{ width: "100%" }}
                onClick={() => signupUser()}
              >
                Sign Up
              </StyledButton>

              {error && <Error>{error}</Error>}

              <Box
                sx={{ display: "flex", alignItems: "flex-end", margin: "auto" }}
              >
                <Typography
                  style={{
                    color: "grey",
                    textAlign: "center",
                    fontSize: "14px",
                  }}
                >
                  Already have an account?
                </Typography>
                <StyledOtherButton
                  variant="text"
                  onClick={() => toggleSignup()}
                >
                  Sign In
                </StyledOtherButton>
              </Box>
            </Wrapper>
          )}
        </Box>
      </StyledBox>
    </>
  );
}
