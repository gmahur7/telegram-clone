import React, { useEffect, useState } from 'react';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import axios from 'axios';

export default function Contacts({ data }) {

    const [Name, setName] = useState(data.creator.name);
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
        console.log(response.data.data)
        setLastMesageTime(() => {
            const date = new Date(response.data.data[response.data.data.length - 1].created_at);
            const hours = date.getUTCHours().toString().padStart(2, '0');
            const minutes = date.getUTCMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
        })
    }

    useEffect(() => {
        getChats(data.id)
    })
    return (
        <ListItem alignItems="flex-between">
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
                                    {Name || 'Anonymous'}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs sx={{ fontSize: "15px", textAlign: "end" }}>
                                    {lastMesageTime}
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
                                        {data.msg_count}
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


// const ChatList = ({ jsonData }) => {
//   const chats = jsonData.data.data;

//   const getAvatarLabel = (creator) => {
//     if (creator.name) {
//       return creator.name.charAt(0)2.toUpperCase();
//     } else if (creator.email) {
//       return creator.email.charAt(0).toUpperCase();
//     } else {
//       return '?';
//     }
//   };

//   // Note: Last message isn't provided in the data structure.
//   // You'd need to fetch this separately or modify your backend to include it.

//   return (
//     <div>
//       {chats.map((chat) => (
//         <div key={chat.id} style={{ marginBottom: '20px' }}>
//           <div style={{
//             width: '40px',
//             height: '40px',
//             borderRadius: '50%',
//             backgroundColor: '#ccc',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             marginRight: '10px'
//           }}>
//             {getAvatarLabel(chat.creator)}
//           </div>
//           <div>
//             <p>Name: {chat.creator.name || 'Anonymous'}</p>
//             <p>Message Count: {chat.msg_count}</p>
//             <p>Last Active: {new Date(chat.updated_at).toLocaleString()}</p>
//             {/* If you had the last message, you'd display it here */}
//             {/* <p>Last Message: {chat.lastMessage}</p> */}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ChatList;
