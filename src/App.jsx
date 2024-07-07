import './App.css'
import { Container, Grid, Paper, Typography, List, ListItem, ListItemText, Box, TextField, Button, Input, InputBase, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';
import backgroundChat from './assets/background-chat.png'
import { useEffect, useState } from 'react';
import Contacts from './components/Contacts';
import axios from 'axios';

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [display, setDisplay] = useState(false)
  const [contacts, setContacts] = useState([])

  const getContacts=async()=>{
    let response = await axios.get('https://devapi.beyondchats.com/api/get_all_chats?page=1')
    // console.log(response)
    setContacts(response.data.data.data)
  }

  console.log(contacts)

  useEffect(()=>{
    getContacts()
  },[])

  return (
    <Container
      disableGutters
      maxWidth={false}
      style={{ height: '100vh', width: '100%' }}>
      <Grid container spacing={0} style={{ height: '100%' }}>
        <Grid item xs={!isMobile?3:12} sx={{
          borderRadius: '20px',
          backgroundColor: 'rgb(23,23,23)',
        }}>
          <Paper style={{ height: '100%', overflowY: 'auto', paddingTop: '10px' }} sx={{
            backgroundColor: 'rgb(33, 33, 33)',
          }}>
            <Grid container spacing={2} justifyContent="space-between" alignItems="center" sx={{
              padding: isMobile?'0px 50px':'0px 20px'
            }}>
              <Grid item xs={isMobile?3:2}>
                <MenuIcon sx={{ color: '#AAAAAA' }} />
              </Grid>
              <Grid item xs={isMobile?9:10} sx={{textAlign:"end"}}>
                <TextField placeholder='Search' variant='outlined' InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton>
                        <SearchIcon sx={{ color: '#AAAAAA', fontWeight: 'bold' }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                  style: {
                    backgroundColor: "#181818"
                  }
                }}
                  sx={{
                    '& .MuiInputBase-input::placeholder': {
                      color: '#AAAAAA'
                    },
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '50px',
                      '& fieldset': {
                        borderColor: 'rgb(64, 63, 64)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'rgb(77, 18, 150)',

                      },
                      '&.Mui-focused svg': {
                        color: 'rgb(77, 18, 150)'
                      }
                    },
                    '& .MuiInputLabel-root': {
                      color: 'blue',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: 'red',
                    },
                  }}
                />
              </Grid>
            </Grid>
            <List sx={{ width: '100%', bgcolor: 'rgb(33,33,33)',color:'#fff' }}>
              { contacts.map&&
                contacts.map((item,index)=>{
                  return(
                    <Contacts data={item} key={index}/>
                  )
                })
              }
            </List>
          </Paper>
        </Grid>
        <Grid item xs={!isMobile?9:0}>
          <Paper style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'rgb(45,12,82)' }} sx={{
            backgroundImage: `url(${backgroundChat})`, // Replace with your image URL
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            height: '100vh', // Adjust height as needed
          }}>
            <Box style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
              {/* {messages.map(message => (
                  <Box key={message.id} style={{ marginBottom: '16px' }}>
                    <Typography variant="body2" color="textSecondary">
                      {message.sender}
                    </Typography>
                    <Typography variant="body1">{message.text}</Typography>
                  </Box>
                ))} */}
            </Box>
            <Box sx={{ padding: '16px', borderTop: '1px solid #ccc', display: display ? 'block' : 'none' }}>
              <TextField
                variant="outlined"
                placeholder="Type a message"
                fullWidth
                multiline
                rows={2}
              />
              <Button variant="contained" color="primary" style={{ marginTop: '8px' }}>
                Send
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default App
