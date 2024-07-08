import { Avatar, Box, Button, Grid, Paper, TextField } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CallIcon from '@mui/icons-material/Call';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';

const Chats = ({ backgroundChat, display,data,clearChats,isMobile }) => {
    // console.log(display,data)
    const getInitials = (name) => {
        return name?.split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2) || '';
    }
    // const [Name, setName] = useState(data?data.creator.name:'');

    return (
        <Paper style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'rgb(45,12,82)' }} sx={{
            backgroundImage: `url(${backgroundChat})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            height: '100vh',
            color: "#fff"
        }}>
            {data&&<Grid container sx={{ display: display?'flex':'none', padding: "10px 20px",backgroundColor:"#212121" }} alignItems="center">
                <Grid item xs={1}>
                    <ArrowBackIcon onClick={clearChats}/>
                </Grid>
                <Grid item xs={isMobile?8:9}>
                    <Grid container >
                        <Grid items xs={isMobile?2:1}>
                            <Avatar>
                            {getInitials(data?.creator?.name)}
                            </Avatar>
                        </Grid>
                        <Grid items xs={isMobile?10:11} >
                            <Box>
                            {data?.creator?.name || 'Anonymous'}
                            </Box>
                            <Box>
                                Last Seen
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={isMobile?3:2} sx={{display:'flex',justifyContent:'flex-end'}}>

                    <Grid container spacing={2} >
                        <Grid item xs={4}><CallIcon /></Grid>
                        <Grid item xs={4}><SearchIcon/></Grid>
                        <Grid item xs={4}><MoreVertIcon /></Grid>
                    </Grid>
                </Grid>
            </Grid>}
        </Paper>
    )
}

export default Chats

// {
//     <Box sx={{ padding: '16px', borderTop: '1px solid #ccc', display: display ? 'block' : 'none' }}>
//           <TextField
//             variant="outlined"
//             placeholder="Type a message"
//             fullWidth
//             multiline
//             rows={2}
//           />
//           <Button variant="contained" color="primary" style={{ marginTop: '8px' }}>
//             Send
//           </Button>
//         </Box>
// }