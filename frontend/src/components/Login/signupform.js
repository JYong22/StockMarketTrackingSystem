import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react';

import {Box, Container, Button, Input} from '@chakra-ui/react';
import {useState} from 'react';


function Signup(){

    const [username, setUsernameSignup] = useState('');
    const [password, setPasswordSignup] = useState('');
    const [cPassword, setConfirmedPassword] = useState('');
    const register = () =>{ //register code
        const data = {  //set the object
            username: username,
            password: password
        };      
        fetch('http://localhost:3001/api/register', {  //connect to backend
            method: 'POST', //post
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
        <div>
            <Container centerContent>
            <Box bg='brand.50' w='xl' p={10} color='#2D3748' margin = {'2vw'} borderRadius='lg' border='2px solid #718096'>
                <form method = "post" onSubmit={(e) =>{
                    e.preventDefault();
                    if (password == cPassword)
                        register();
                    else
                        alert("The confirmed password does not match");

                }}>
                    <FormControl>
                    <FormHelperText fontSize="2xl">Signup</FormHelperText>

                        <FormLabel htmlFor='userName' marginTop={3}>User Name</FormLabel>
                        <Input id='signupUserName' type='userName' required 
                            onChange={(e) =>{
                                setUsernameSignup(e.target.value);
                            }}/>

                        <FormLabel htmlFor='password' marginTop={5}>Password</FormLabel>
                        <Input id='signupPassword' type='password' required 
                            onChange={(e) =>{
                                setPasswordSignup(e.target.value);
                            }}/>
                        <FormLabel htmlFor='password' marginTop={5}>Confirm Password</FormLabel>
                        <Input id='confirmPassword' type='password' required 
                            onChange={(e) =>{
                                setConfirmedPassword(e.target.value);
                            }}/>

                        <Button type = 'submit' colorScheme='#2D3748' variant='outline' marginTop={5}>Signup</Button>
                    </FormControl>
                </form>
            </Box>
            </Container>
        </div>
    )
}

export default Signup;