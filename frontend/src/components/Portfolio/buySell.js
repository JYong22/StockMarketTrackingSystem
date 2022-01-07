
import {Button, ButtonGroup, Container, Select,Input,Box, Flex,Icon, Spacer,Text, Tabs,Tab, TabList, TabPanels, TabPanel,Stack,InputGroup,InputLeftAddon,InputRightAddon,Textarea,InputLeftElement} from '@chakra-ui/react';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from '@chakra-ui/react';
import { useEffect, useState, useRef } from 'react';
import { AddIcon, CalendarIcon } from '@chakra-ui/icons';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react'
import * as React from 'react';
import { useDisclosure } from '@chakra-ui/react';

function BuySell(){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = useRef()

    const [action, setAction] = useState('buy');
    const [stock, setStock] = useState('');
    const [quantity, setQuantity] = useState(0);

    const buyStock = () =>{
        const data = {  //set the object
            stockName: stock,
            quantity: quantity
        };      
        
        fetch('http://localhost:3001/api/buyStock', {  //connect to backend
            method: 'POST', //post
            credentials: 'include', 
            headers: {
                'Content-Type': 'application/json',
        },
            body: JSON.stringify(data), //body is the set data from earlier
        })
            .then(response => (response.json()))

            .then(data => {
                alert(data.message);       
                window.location.reload();           
         

            })
            .catch((error) => {
                console.error('Error:', error);
        });

    }
    const sellStock = () =>{
        const data = {  //set the object
            stockName: stock,
            quantity: quantity
        };      
        
        fetch('http://localhost:3001/api/sellStock', {  //connect to backend
            method: 'POST', //post
            credentials: 'include', 
            headers: {
                'Content-Type': 'application/json',
        },
            body: JSON.stringify(data), //body is the set data from earlier
        })
            .then(response => (response.json()))

            .then(data => {
                alert(data.message); 
                window.location.reload();           

                   

            })
            .catch((error) => {
                console.error('Error:', error);
        });

    }

    return (
        <Box >
            <Button marginLeft = {'2.5vw'} marginTop={'2.5vw'} w = '15vw' leftIcon={<AddIcon />} colorScheme='blue' onClick={onOpen}>
                Buy or Sell Stock
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='right'
                initialFocusRef={firstField}
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth='1px'>
                    Buy or Sell Stock
                </DrawerHeader>
                <form method = "" onSubmit = {(e) =>{
                    e.preventDefault();
                    
                    if(quantity >0){
                        if (action == 'buy'){
                            buyStock();
                        }
                        else{
                            sellStock();
                        }
                        
                    }
                    else{
                        alert("Number must be greater than 0.")
                    }
                    
                }}>
                    <DrawerBody>
                        
                        <Stack spacing='24px'>
                            <Box>
                                <FormLabel htmlFor='actionStock'>Buy or Sell</FormLabel>
                                <Select id='actionStock' 
                                    defaultValue='buy' 
                                    onChange={(e) =>{
                                        setAction(e.target.value);
                                        
                                    }
                                }> 
                                    <option value='buy'>Buy</option>
                                    <option value='sell'>Sell</option>
                                </Select>
                            </Box>
                            <Box>
                                <FormLabel htmlFor='stockType'>Stock</FormLabel>
                                <Input
                                ref={firstField}
                                id='stockType'
                                placeholder='Enter a Stock (MSFT, AMZN, AAPL)'
                                type = 'text'
                                requried
                                onChange = {(e) =>{
                                    setStock(e.target.value);
                                    
                                }}
                                />
                            </Box>
                            <Box>
                                <FormLabel htmlFor='stockQuantity'>Quantity</FormLabel>
                                <Input
                                ref={firstField}
                                id='stockQuantity'
                                placeholder='How many do you want to buy or sell?'
                                type = 'number'
                                requried
                                onChange = {(e) =>{
                                    setQuantity(e.target.value);
                                   
                                }}
                                />
                            </Box>

                        
                        </Stack>
                    </DrawerBody>

                    <DrawerFooter borderTopWidth='1px'>
                        <Button variant='outline' mr={3} onClick={onClose}>
                        Cancel
                        </Button>
                        <Button colorScheme='blue' type = 'submit'>Submit</Button>
                    </DrawerFooter>
                </form>
                </DrawerContent>
            </Drawer>
        </Box>
    );
}


export default BuySell;