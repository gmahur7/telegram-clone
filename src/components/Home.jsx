import { Container, Grid, Paper, List, TextField, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';
import backgroundChat from '../assets/background-chat.png'
import { useEffect, useState } from 'react';
import Contacts from './Contacts';
import axios from 'axios';
import Chats from './Chats';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [display, setDisplay] = useState(false)
  const [contacts, setContacts] = useState([])
  const [selectedChat, setSelectedChat] = useState({})

  const checkEmpty = () => {
    const empty = Object.keys(selectedChat).length === 0;
    if (empty) {
      return true
    }
    else {
      return false
    }
  }

  const getContacts = async () => {
    let response = await axios.get('https://devapi.beyondchats.com/api/get_all_chats?page=1')
    // console.log(response)
    setContacts(response.data.data.data)
    return response.data.data.data
  }

  function handleChats(data) {
    setDisplay(true)
    setSelectedChat(data)
  }

  function clearChats() {
    // alert("hii")
    setSelectedChat({})
    setDisplay(false)
  }

  // console.log(contacts)

  useEffect(() => {
    getContacts()
  }, [])
  return (
    <Container
      disableGutters
      maxWidth={false}
      style={{ maxHeight: '100vh', width: '100%' }}>
      <Grid container spacing={0} style={{ height: '100%' }}>
        <Grid item xs={isMobile ? (checkEmpty() ? 12 : 0) : 3} sx={{
          borderRadius: '20px 0 0 20px',
          backgroundColor: 'rgb(23,23,23)',
          display: isMobile && !checkEmpty() ? 'none' : 'block',
          maxHeight:"100vh",
          overflowY:"scroll"
        }}>
          <Paper style={{ height: '100%', overflowY: 'auto', paddingTop: '10px' }} sx={{
            backgroundColor: 'rgb(33, 33, 33)',
          }}>
            <Grid container spacing={2} justifyContent="space-between" alignItems="center" sx={{
              padding: isMobile ? '0px 50px' : '0px 20px'
            }}>
              <Grid item xs={isMobile ? 3 : 2}>
                <MenuIcon sx={{ color: '#AAAAAA' }} />
              </Grid>
              <Grid item xs={isMobile ? 9 : 10} sx={{ textAlign: "end" }}>
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
            <List sx={{ width: '100%', bgcolor: 'rgb(33,33,3  3)', color: '#fff',overflowY:"scroll" }}>
              {contacts.map &&
                contacts.map((item, index) => {
                  return (
                    <Contacts data={item} key={index} click={handleChats} isMobile={isMobile} />
                  )
                })
              }
            </List>
          </Paper>
        </Grid>
        <Grid item xs={isMobile ? (checkEmpty() ? 0 : 12) : 9} sx={{
          display: isMobile && checkEmpty() ? 'none' : 'block',
        }}>
          <Chats data={selectedChat} backgroundChat={backgroundChat} display={display} isMobile={isMobile} clearChats={clearChats} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home