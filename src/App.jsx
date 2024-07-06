import './App.css'
import { Container, Grid, Paper, Typography, List, ListItem, ListItemText, Box, TextField, Button, Input, InputBase, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';


function App() {

  return (
    <Container maxWidth="xl" style={{ height: '100vh'}}>
      <Grid container spacing={0} style={{ height: '100%' }}>
        <Grid item xs={3} sx={{
              borderRadius:'20px',
            }}>
          <Paper style={{ height: '100%', overflowY: 'auto' }} sx={{
            backgroundColor:'rgb(64, 63, 64)',
          }}>
            <Grid container spacing={2} justifyContent="space-between" alignItems="center" sx={{
              padding:'0px 20px'
            }}>
              <Grid item xs={2}>
                <MenuIcon />
              </Grid>
              <Grid item xs={10}>
                <TextField variant='outlined' InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '50px',
                      '& fieldset': {
                        borderColor: 'greenrgb(64, 63, 64)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'rgb(77, 18, 150)',
                      },
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
            <List>
              {/* {contacts.map(contact => (
                  <ListItem button key={contact.id}>
                    <ListItemText primary={contact.name} />
                  </ListItem>
                ))} */}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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
            <Box style={{ padding: '16px', borderTop: '1px solid #ccc' }}>
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
