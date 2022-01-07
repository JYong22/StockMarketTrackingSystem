import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import {Button,Text, Container, Select,Input,Box, Flex,Icon, Spacer,Menu,MenuButton,MenuItem,MenuDivider,MenuList, propNames} from '@chakra-ui/react';

import Login from './loginform';
import Signup from './signupform';

function LoginPage(){

    return(
        <div>
            <Tabs>
                <TabList>
                    <Tab>Login</Tab>
                    <Tab>SignUp</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <Login/>
                    </TabPanel>
                    <TabPanel>
                        <Signup/>
                    </TabPanel>

                </TabPanels>
            </Tabs>
        </div>
    );
}
export default LoginPage;