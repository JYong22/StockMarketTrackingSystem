
import {Button, ButtonGroup, Container, Select,Input,Box, Flex,Icon, Spacer,Text, Tabs,Tab, TabList, TabPanels, TabPanel,Stack,InputGroup,InputLeftAddon,InputRightAddon,Textarea,InputLeftElement, propNames} from '@chakra-ui/react';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from '@chakra-ui/react';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
} from '@chakra-ui/react'
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

function StockRows(props){
    return(
      <div>
          
          <Table border={'2px solid black'} variant='simple' w = 'xl'>
          <Thead>
              <Tr>
              <Th>Stock</Th>
              <Th>Quantity</Th>
              <Th>Total Amount (USD)</Th>
              </Tr>
          </Thead>
          <Tbody>
          {(props.sub).map((v)=>{
              return(
                  <Tr key = {v.stock}>
                      <Td>{v.stock}</Td>
                      <Td>{v.quantity}</Td>
                      <Td>${(Math.round(v.total * 100) / 100).toFixed(0)}</Td>
                  </Tr>
              );
              

          })}
              
          </Tbody>
      </Table>
      </div>
  );
  
}

function DisplayStocks(){
    const [stocks, setStocks] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost:3001/api/displayStock", { withCredentials: true }) //gets the balance
        .then(response =>{
            console.log(response.data);
            setStocks(response.data);
        })
        
    },[])

    return(
        <div>
            <Box marginLeft = {'2.5vw'} marginTop={'0.5vw'}>
                <Text fontSize={'3xl'} marginBottom={'0.5vw'}>Stocks</Text>
                <StockRows sub = {stocks}/>
            </Box>

        </div>
    );
}

export default DisplayStocks;