import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react';

import {Box, Container, Button, Input} from '@chakra-ui/react';
import {useState} from 'react';



function Login(){
    const [username, setUsernameSignin] = useState('');
    const [password, setPasswordSignin] = useState('');

    const login = () =>{ //register code
        const data = {  //set the object
            username: username,
            password: password
        };      
        fetch('http://localhost:3001/api/login', {  //connect to backend
            method: 'POST', //post
            credentials: 'include', 
            headers: {
                'Content-Type': 'application/json',
        },
            body: JSON.stringify(data), //body is the set data from earlier
        })
            .then(response => (response.json()))

            .then(data => {
                if (data.login != null){
                    alert(data.login);
                    window.location.reload();
                }
                else{
                    alert(data.message);
                }

            })
            .catch((error) => {
                console.error('Error:', error);
        });
        
    }

    return (
        <div>
            <Container centerContent>
            <Box bg='brand.50' w='xl' p={10} color='#2D3748' margin = {'2vw'} borderRadius='lg' border='2px solid #718096'>
                <form method = "post" onSubmit={(e) =>{
                    e.preventDefault();
                    login();

                }}>
                    <FormControl>
                    <FormHelperText fontSize="2xl">Login</FormHelperText>

                        <FormLabel htmlFor='userName' marginTop={3}>User Name</FormLabel>
                        <Input id='signInUserName' type='userName' required onChange={(e) =>{
                            setUsernameSignin(e.target.value);
                        }}/>

                        <FormLabel htmlFor='password' marginTop={5}>Password</FormLabel>
                        <Input id='signInPassword' type='password' required onChange={(e) =>{
                            setPasswordSignin(e.target.value);
                        }}/>

                        <Button type = 'submit' colorScheme='#2D3748' variant='outline' marginTop={5}>Login</Button>
                    </FormControl>
                </form>
            </Box>
            </Container>

            
        </div>
    )
}

export default Login;