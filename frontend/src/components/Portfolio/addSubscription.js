
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

function AddSubscription(){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = useRef()
    const [stock, setStock] = useState('');

    const addSub = () =>{
        const data = {  //set the object
            stockName: stock
        };      
        
        fetch('http://localhost:3001/api/addSub', {  //connect to backend
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
                Add Subscription
            </Button>
            <Text marginLeft = {'2.5vw'} marginTop={'0.5vw'} fontSize={'3xl'}>Subscriptions</Text>
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
                    Add a Subscription to Watchlist
                </DrawerHeader>
                <form method = "post" onSubmit = {(e) =>{
                    
                    e.preventDefault();
                    addSub();
                    
                }}>
                    <DrawerBody>
                        
                        <Stack spacing='24px'>
                            <Box>
                                <FormLabel htmlFor='addSub'>Stock</FormLabel>
                                <Input
                                ref={firstField}
                                id='addSub'
                                placeholder='Enter a Stock (MSFT, AMZN, AAPL)'
                                type = 'text'
                                requried
                                onChange = {(e) =>{
                                    setStock(e.target.value)
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


export default AddSubscription;