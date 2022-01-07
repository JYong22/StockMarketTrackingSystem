
import {Button, ButtonGroup, Container, Select,Input,Box, Flex,Icon, Spacer,Text, Tabs,Tab, TabList, TabPanels, TabPanel,Stack,InputGroup,InputLeftAddon,InputRightAddon,Textarea,InputLeftElement, propNames} from '@chakra-ui/react';
import { Link } from "react-router-dom";

function HomePage(){
    return(
        <div>
            <Container marginTop = "10vw" centerContent>
                <Text fontSize={'6xl'}>STOCKS</Text>
                <Link to = "/login">
                    <Button>
                        Go to Login
                    </Button>
                </Link>
            </Container>
        </div>
    );
}

export default HomePage