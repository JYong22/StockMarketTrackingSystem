import {Button,Text, Container, Select,Input,Box, Flex,Icon, Spacer,Menu,MenuButton,MenuItem,MenuDivider,MenuList, propNames} from '@chakra-ui/react';

import { createBreakpoints } from '@chakra-ui/theme-tools';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Balance from './balance';
import { Link } from "react-router-dom";


// This is the default breakpoint
const breakpoints = createBreakpoints({
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
})


function Header(props){
    const username = props.name;
    const [balance, setBalance] = useState(0);

    
    useEffect(()=>{
        axios.get("http://localhost:3001/api/balance", { withCredentials: true }) //gets the balance
        .then(response =>{
            if(response.data.message == ""){
                
            }
            else{
                setBalance(response.data[0].balance);
            }
        })
        
    },[])
    

    const signout = () =>{
        axios.get("http://localhost:3001/api/signout", { withCredentials: true })
        .then(response =>{
           alert(response.data)
        })
        window.location.reload();
    }
    
   
    return(
        <div id = "header" style = {props.dis}>
           <Flex justify='center' align = 'center'  w = '100vw' h = '10vh' >
                <Flex justify='center' align = 'center' dir = 'row' >
                    <Box w = '50vw' >
                        <Flex dir = 'row'>
                            <Box marginLeft = {'2.5vw'}>
                                <Text>Hello {props.name}</Text>
                                <Text>Current Balance: ${balance}</Text>
                            </Box>
                            <Box marginLeft = {'2.5vw'}>
                                <Balance balance = {balance}/>
                            </Box>
                        </Flex>
                    </Box>
                    
                    <Box w = '50vw'>
                       
                        <Button marginRight = '2.5vw' float={'right'} 
                            onClick={() =>{
                                signout();
                            }}
                        >
                            Signout
                        </Button>
                        <Link to = {"/portfolio"}>
                            <Button marginRight = '2.5vw' float={'right'} >
                                View Portfolio
                            </Button>
                        </Link>
                    </Box>
                    
                </Flex>
           </Flex>
        </div>
    );
}

export default Header;