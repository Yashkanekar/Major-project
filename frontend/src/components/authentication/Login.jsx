import {
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    VStack,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import { useToast } from "@chakra-ui/react";
//   import { useHistory } from "react-router-dom";
import {useNavigate} from "react-router-dom"
  import axios from "axios";
  
  const Login = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [walletAddress, setWalletAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    // const history = useHistory()
    const navigate = useNavigate();

    const getWalletAddress = async () => {
      // Check if user has a wallet installed
      if (typeof window.ethereum !== 'undefined') {
        try {
          // Connect to the user's wallet
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    
          // Get the user's Ethereum address
          const address = accounts[0];
    
          setWalletAddress(address);
        } catch (error) {
          console.error(error);
        }
      } else {
        // Prompt user to install a wallet like MetaMask
        alert('Please install MetaMask to connect your wallet');
      }
    };
    const handleClick = () => setShow(!show);
    const submitHandler = async () => {
      setLoading(true);
      if (!email || !password || !walletAddress) {
        toast({
          title: "Please provide all the details!",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
        return;
      }
  
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
  
        const { data } = await axios.post(
          "http://127.0.0.1:5000/api/user/login",
          { email, password },
          config
        );
        // console.log(data);
  
        toast({
          title: "Login is successful!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        localStorage.setItem("userInfo", JSON.stringify(data));
        setLoading(false);

        // history.push("/chats");
        navigate('/book')
        
      } catch (error) {
        toast({
          title: "Error occured",
          description: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
      }
    };
  
    return (
      <VStack spacing="5px">
        <FormControl id="email" isRequired>
          <FormLabel>Email Address</FormLabel>
          <Input
            value={email}
            type="email"
            placeholder="Enter Your Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              value={password}
              type={show ? "text" : "password"}
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
  
        {
          walletAddress ? (
            <Button
            colorScheme="green"
            width="100%"
            style={{ marginTop: 15 }}
            // onClick={getWalletAddress}
          //   isLoading={loading}
          >
            Wallet connected
          </Button>
          ):(
            <Button
            colorScheme="red"
            width="100%"
            style={{ marginTop: 15 }}
            onClick={getWalletAddress}
        //   isLoading={loading}
            >
            Connect wallet
            </Button>
          )
        }

        {
          walletAddress && <p>{walletAddress}</p>
        }
        
        <Button
          colorScheme="blue"
          width="100%"
          style={{ marginTop: 15 }}
          onClick={submitHandler}
        //   isLoading={loading}
        >
          Login
        </Button>
      </VStack>
    );
  };
  export default Login;