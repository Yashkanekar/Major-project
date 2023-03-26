import React, { Fragment } from 'react'
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useState } from 'react';
import { Text } from "@chakra-ui/react";
import axios from 'axios'
import * as turf from "@turf/turf"
import {ethers} from 'ethers'
import SendFunds from '../../../build/contracts/SendFunds.json'
import Web3 from "web3";

const ConfirmBooking = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [distance, setDistance] = useState(null);
  const [amount, setAmount] = useState("0")

  const handleSend = async () => {
    // try {
    //   const provider = new ethers.providers.Web3Provider(window.ethereum);
    //   await provider.send('eth_requestAccounts', []);
    //   const signer = provider.getSigner();
    //   const contract = new ethers.Contract(
    //     "0x49b6E8bc98708D5a56B6aC054423C8535d70ba4A",
    //     SendFunds.abi,
    //     signer
    //   );
    //   const transaction = await contract.sendTo("0x68F02E914aED556AB4Db7322021fBA7ED322AFE5", {
    //     value: "798",
    //   });
    //   await transaction.wait();
    //   // setMessage(`Successfully sent ${amount} ETH to 0x68F02E914aED556AB4Db7322021fBA7ED322AFE5`);
    // } catch (err) {
    //   console.error(err);
    //   // setMessage(`Error: ${err.message}`);
    // }

    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = SendFunds.networks[networkId];
    const contract = new web3.eth.Contract(
      SendFunds.abi,
      deployedNetwork && deployedNetwork.address
    );

    // await web3.eth.personal.unlockAccount(account, "password", 600);
    const weiAmount = web3.utils.toWei(String(amount), "ether");
    await contract.methods.sendTo("0x68F02E914aED556AB4Db7322021fBA7ED322AFE5").send({ value: weiAmount, from:"0x96b71159C16f949628D5Ff46FC6cA28392F105eA" });
  };

  const fetchData = async (place) => {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=pk.eyJ1IjoieWFzaGthbmVrYXIiLCJhIjoiY2tybmtwY3NkMXg1ajMxcGVtOHo5aGhpNiJ9.3cmOSr3XR555YERjLw0brw&limit=1`
    );
    // console.log(JSON.parse(response.request.response));
    const res = JSON.parse(response.request.response);
    // console.log(res.features[0].geometry.coordinates);
    return [
      res.features[0].geometry.coordinates[1],
      res.features[0].geometry.coordinates[0]
    ];
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const sourcePoints = await fetchData(source);
    const destinationPoints = await fetchData(destination);
    var options = {
      units: "kilometres"
    }; 

    var distance = turf.distance(sourcePoints, destinationPoints, options);
    setDistance(Math.round((distance + Number.EPSILON) * 100) / 100);
    console.log(distance);
    setAmount((Math.round((distance + Number.EPSILON) * 100) / 100)*2);

  };

  return (
    <Box p={4} >
    <form className='confirmForm' onSubmit={handleSubmit}>
      <FormControl id="pickup" w={300} marginRight={30}>
        <FormLabel>Confirm Pickup</FormLabel>
        <Input type="text" value={source} onChange={(e)=>{setSource(e.target.value)}} />
      </FormControl>
      <FormControl w={300} marginRight={30} id="dropoff">
        <FormLabel>Confirm Dropoff</FormLabel>
        <Input type="text" value={destination} onChange={(e)=>{setDestination(e.target.value)}} />
      </FormControl>
      <Button marginTop={1} top={7} colorScheme="teal" type="submit">
        Confirm Ride
      </Button>

      
    </form>
    {
      distance && (
        <Fragment>
        <br/>
        <Text fontSize="xl" color="black" fontStyle="bold">
        Total ride fair will be {distance * 2} ETH
      </Text>
      <Button colorScheme="red" onClick={handleSend}>
        Pay {distance * 2} ETH
      </Button>
        </Fragment>
      )  
    }

  </Box>
    )
}

export default ConfirmBooking