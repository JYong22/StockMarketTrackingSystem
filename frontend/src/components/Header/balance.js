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

function Balance(props){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = useRef()
    const [increase, setIncrease] = useState(0);

    const addMoney = () =>{
        const data = {  //set the object
            increase: increase
        };      
        
        fetch('http://localhost:3001/api/balance', {  //connect to backend
            method: 'POST', //post
            credentials: 'include', 
            headers: {
                'Content-Type': 'application/json',
        },
            body: JSON.stringify(data), //body is the set data from earlier
        })
            .then(response => (response.json()))

            .then(data => {
                console.log(data);

            })
            .catch((error) => {
                console.error('Error:', error);
        });

    }

    return (
    <Box>
        <Button w = '10vw' leftIcon={<AddIcon />} colorScheme='blue' onClick={onOpen}>
            Add Money
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
                Add Money to Your Account
            </DrawerHeader>
            <form method = "post" onSubmit = {(e) =>{
                if (increase >0){
                    e.preventDefault();
                    addMoney();
                    window.location.reload();
                }
                else{
                    alert("Number must be > 0");
                }
            }}>
                <DrawerBody>
                    
                    <Stack spacing='24px'>
                        <Box>
                            <FormLabel htmlFor='curBalance'>Your Current Balance: ${props.balance}</FormLabel>
                        </Box>
                        <Box>
                            <FormLabel htmlFor='addBalance'>Amount</FormLabel>
                            <Input
                            ref={firstField}
                            id='addBalance'
                            placeholder='Enter a set amount'
                            type = 'number'
                            requried
                            onChange = {(e) =>{
                                setIncrease(e.target.value)
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

export default Balance;