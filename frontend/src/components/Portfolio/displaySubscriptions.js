
import {Button, ButtonGroup, Container, Select,Input,Box, Flex,Icon, Spacer,Text, Tabs,Tab, TabList, TabPanels, TabPanel,Stack,InputGroup,InputLeftAddon,InputRightAddon,Textarea,InputLeftElement, propNames} from '@chakra-ui/react';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from '@chakra-ui/react';
import { useEffect, useState, useRef } from 'react';
import { AddIcon, CalendarIcon } from '@chakra-ui/icons';
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
import axios from 'axios';


function StockRows(props){
    
    const removeSub = (stock) =>{
        axios.delete(`http://localhost:3001/api/deleteSub/${stock}`, { withCredentials: true })
        .then(response =>{
            alert(response.data.message);
        })
        window.location.reload();           
    }
    return(
        <div>
            
            <Table border={'2px solid black'} variant='simple' w = 'xl'>
            <Thead>
                <Tr>
                    <Th>Stock</Th>
                    <Th>Current Price (USD)</Th>
                </Tr>
            </Thead>
            <Tbody>
            {(props.sub).map((v)=>{
                return(
                    <Tr key = {v.stockName}>
                        <Td>{v.stockName}</Td>
                        <Td> ${(Math.round(v.price * 100) / 100).toFixed(0)}{}
                            <Button value = {v.stockName} float = 'right'
                                onClick = {() =>{removeSub(v.stockName)}}>
                                Remove
                            </Button>
                        </Td>
                    </Tr>
                );
                

            })}
                
            </Tbody>
        </Table>
        </div>
    );
    
}


function DisplaySubs(){
    var subscriptions = [];
    var prices = [];
    var combine = [];
    const [subs, setSub] = useState([]);
   
    useEffect(()=>{
        axios.get("http://localhost:3001/api/subscription", { withCredentials: true }) //gets the balance
        .then(response =>{
            Object.keys(response.data).forEach((v)=>{
                subscriptions.push(v);
            })
            Object.values(response.data).forEach((v)=>{
                
                prices.push(v.price);
            })
            subscriptions.forEach((v, index)=>{
                const p = prices[index];
                
                combine.push({"stockName": v, "price": p})
                
                
            })
            setSub(combine);
        })
        
    },[])
    

    return(
        <div>
            <Box marginLeft = {'2.5vw'} marginTop = {'1vw'}>
                <StockRows sub = {subs}/>
            </Box>
        
        </div>
    );

}

export default DisplaySubs;