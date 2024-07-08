import { Avatar, Box, Button, Grid, IconButton, InputAdornment, Paper, TextField } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CallIcon from '@mui/icons-material/Call';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const Chats = ({ backgroundChat, display, data, clearChats, isMobile }) => {
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
        <Paper style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: "space-between", backgroundColor: 'rgb(45,12,82)' }} sx={{
            backgroundImage: `url(${backgroundChat})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
           
            color: "#fff"
        }}>
            {data && <Grid container spacing={2} sx={{ display: display ? 'flex' : 'none', padding: "10px 20px", backgroundColor: "#212121" }} alignItems="center">
                <Grid item xs={isMobile?1:0} sx={{display:isMobile?'block':'none'}}>
                    <ArrowBackIcon onClick={clearChats} />
                </Grid>
                <Grid item xs={isMobile ? 8 : 10}>
                    <Grid container >
                        <Grid items xs={isMobile ? 2 : 1}>
                            <Avatar>
                                {getInitials(data?.creator?.name)}
                            </Avatar>
                        </Grid>
                        <Grid items xs={isMobile ? 10 : 11} >
                            <Box>
                                {data?.creator?.name || 'Anonymous'}
                            </Box>
                            <Box>
                                Last Seen
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={isMobile ? 3 : 2} sx={{ display: 'flex', justifyContent: 'flex-end', textAlign: 'end' }}>


                    <Grid container spacing={2} >
                        <Grid item xs={4}><CallIcon /></Grid>
                        <Grid item xs={4}><SearchIcon /></Grid>
                        <Grid item xs={4}><MoreVertIcon /></Grid>
                    </Grid>
                </Grid>
            </Grid>}
            {data && <Grid container sx={{
                display: display ? 'flex' : 'none', padding: "10px 20px",
                backgroundColor: "transparent"
            }} alignItems="center" justifyContent="center">
                <Grid xs={12} container alignItems="center" justifyContent="center" sx={{textAlign:"center"}}>
                    <Grid item xs={9}>
                        <TextField
                            placeholder='Message'
                            variant='outlined'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <IconButton>
                                            <SentimentSatisfiedAltIcon sx={{ color: '#AAAAAA', fontWeight: 'bold' }} />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton>
                                            <AttachFileIcon sx={{ color: '#AAAAAA', fontWeight: 'bold' }} />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                style: {
                                    backgroundColor: "#181818"
                                }
                            }}
                            sx={{
                                '& .MuiInputBase-input::placeholder': {

                                },
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '50px',
                                    color: '#fff',
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
                    <Grid item xs={3}>
                        <KeyboardVoiceIcon />
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