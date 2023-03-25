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
  import axios from "axios";
//   import { useHistory } from "react-router-dom";
  
  const Signup = () => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    // const [confirmPassword, setConfirmpassword] = useState();
    const [walletAddress, setWalletAddress] = useState("");
    // const [pic, setPic] = useState();
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    // const history = useHistory();
  
    const handleClick = () => setShow(!show);
    // const postDetails = (pics) => {
    //   setLoading(true);
    //   if (pics === undefined) {
    //     toast({
    //       title: "Please select an image",
    //       status: "warning",
    //       duration: 5000,
    //       isClosable: true,
    //       position: "bottom",
    //     });
    //     return;
    //   }
    //   if (pics.type === "image/jpeg" || pics.type === "image/png") {
    //     const data = new FormData();
    //     data.append("file", pics);
    //     data.append("upload_preset", "chatsapp");
    //     data.append("cloud_name", "yashkanekar");
    //     fetch("https://api.cloudinary.com/v1_1/yashkanekar/image/upload", {
    //       method: "post",
    //       body: data,
    //     })
    //       .then((res) => res.json())
    //       .then((data) => {
    //         setPic(data.url.toString());
    //         setLoading(false);
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //         setLoading(false);
    //       });
    //   } else {
    //     toast({
    //       title: "Please select an image",
    //       status: "warning",
    //       duration: 5000,
    //       isClosable: true,
    //       position: "bottom",
    //     });
    //     setLoading(false);
    //   }
    // };
  
    const submitHandler = async () => {
      setLoading(true);
      if (!name || !password || !email || !walletAddress) {
        toast({
          title: "Please fill out all the fields",
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
          "http://127.0.0.1:5000/api/user",
          { name, email, password, walletAddress },
          config
        );
  
        toast({
          title: "Registration is successful!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
  
        localStorage.setItem("userInfo", JSON.stringify(data));
        setLoading(false);
        // history.push("/chats");
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
  
    return (
      <VStack spacing="5px">
        <FormControl id="first-name" isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Enter Your Name"
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email Address</FormLabel>
          <Input
            type="email"
            placeholder="Enter Your Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
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
          isLoading={loading}
        >
          Sign Up
        </Button>
      </VStack>
    );
  };
  export default Signup;