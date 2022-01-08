import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react';

import {Box,Text, Table, Container, Button, Input} from '@chakra-ui/react';
import {useState} from 'react';
import AddSubscription from './addSubscription';
import DisplaySubs from './displaySubscriptions';
import DisplayStocks from './displayStocks';
import BuySell from './buySell';


function Portfolio(){
    return(
        <div id = 'portfolio'>
            <Box>
                <AddSubscription/>
                <DisplaySubs/>
                <BuySell/>
                <DisplayStocks/>
                
            </Box>
        </div>
    );

}

export default Portfolio;