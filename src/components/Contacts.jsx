import { useEffect, useState } from 'react';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Grid, styled } from '@mui/material';
import axios from 'axios';

const ListItemContainer = styled(ListItem)`
    &:hover {
    background-color:"red";
    }
`;

export default function Contacts({ click,isMobile,data }) {
    // console.log(data)
    const [Name, setName] = useState(data?.creator.name);
    const [chats, setChats] = useState({});
    const [lastMessage, setLastMessage] = useState('');
    const [lastMesageTime, setLastMesageTime] = useState('');

    async function getChats(id) {
        let response = await axios.get(`https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${data.id}`);
        response.data.data = response.data.data.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
        setChats(response.data.data)
        setLastMessage(() => {
            if (response.data.data.length > 0) {
                const lastMsg = response.data.data[response.data.data.length - 1].message;
                return lastMsg.length > 15 ? lastMsg.slice(0, 15) + '...' : lastMsg;
            }
            return '';
        });
        setLastMesageTime(() => {
            const date = new Date(response.data.data[response.data.data.length - 1].created_at);
            const hours = date.getUTCHours().toString().padStart(2, '0');
            const minutes = date.getUTCMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
        })
    }

    useEffect(() => {
        getChats(data.id)
    },[])

    return (
        <ListItem alignItems="flex-between" onClick={() => click(data)} >
            <ListItemAvatar>
                <Avatar>
                    {Name&& Name.split(' ')
                        .map(word => word[0])
                        .join('')
                        .toUpperCase()
                        .slice(0, 2)}
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={
                    <Grid container spacing={5} justifyItems="space-between">
                        <Grid item xs={6}>
                            <Grid item xs container direction="column" spacing={0}>
                                <Grid item xs sx={{ color: "white", minWidth: "100px" }}>
                                    {chats.length>0&&Name || 'Anonymous'}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs sx={{ fontSize: "15px", textAlign: "end" }}>
                                    {chats.length>0&&lastMesageTime}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                }
                secondary={
                    <Grid container spacing={0}>
                        <Grid item xs={9}>
                            <Grid item xs container direction="column" spacing={0}>
                                <Grid item xs>
                                    <Typography sx={{ color: "white", fontSize: "13px" }}>
                                        {chats.length > 0 && lastMessage}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={3} sm container>
                            <Grid item xs container direction="column" spacing={2} justifyItems="flex-end">
                                <Grid item xs>
                                    <Typography sx={{ color: "white", fontSize: "13px", textAlign: "right" }}>
                                        {chats.length>0&&data.msg_count}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                }
            />
        </ListItem>
    );
}


