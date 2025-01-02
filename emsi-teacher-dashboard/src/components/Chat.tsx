import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Grid,
  InputAdornment,
  Card,
} from '@mui/material';
import {
  Send as SendIcon,
  Search as SearchIcon,
  AttachFile as AttachFileIcon,
} from '@mui/icons-material';

interface Conversation {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar: string;
}

interface Message {
  id: number;
  sender: string;
  content: string;
  time: string;
  isSender: boolean;
}

// Mock data pour les conversations
const mockConversations: Conversation[] = [
  {
    id: 1,
    name: "Ahmed Bennani",
    lastMessage: "D'accord, je vais préparer ça pour demain",
    time: "10:30",
    unread: 2,
    avatar: "",
  },
  {
    id: 2,
    name: "Sara Alaoui",
    lastMessage: "Merci pour vos retours sur mon rapport",
    time: "09:15",
    unread: 0,
    avatar: "",
  },
  // Ajoutez d'autres conversations ici
];

// Mock data pour les messages
const mockMessages: Message[] = [
  {
    id: 1,
    sender: "Ahmed Bennani",
    content: "Bonjour Madame, j'espère que vous allez bien",
    time: "10:00",
    isSender: false,
  },
  {
    id: 2,
    sender: "Mme. Hajar Sitti",
    content: "Bonjour Ahmed, oui merci. Comment puis-je vous aider ?",
    time: "10:05",
    isSender: true,
  },
  {
    id: 3,
    sender: "Ahmed Bennani",
    content: "Je voulais vous demander concernant la dernière version du rapport de stage",
    time: "10:15",
    isSender: false,
  },
  {
    id: 4,
    sender: "Mme. Hajar Sitti",
    content: "Bien sûr, envoyez-moi votre dernière version et je vous ferai un retour rapidement",
    time: "10:20",
    isSender: true,
  },
];

const Chat: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation>(mockConversations[0]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>(mockMessages);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: messages.length + 1,
        sender: "Mme. Hajar Sitti",
        content: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSender: true,
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };

  return (
    <Box sx={{ 
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      pt: 8,
      height: '100vh',
      bgcolor: '#f5f5f5'
    }}>
      <Container maxWidth="xl" sx={{ flex: 1, display: 'flex', pb: 3 }}>
        <Grid container spacing={2} sx={{ flex: 1 }}>
          {/* Liste des conversations */}
          <Grid item xs={12} md={4} lg={3}>
            <Card sx={{ height: '100%', borderRadius: 2 }}>
              <Box sx={{ p: 2 }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Rechercher une conversation..."
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 2 }}
                />
                <List sx={{ overflow: 'auto', maxHeight: 'calc(100vh - 250px)' }}>
                  {mockConversations.map((conv, index) => (
                    <React.Fragment key={conv.id}>
                      <ListItem 
                        disablePadding
                        sx={{
                          borderRadius: 1,
                          mb: 1,
                          '&.Mui-selected': {
                            bgcolor: 'primary.light',
                            color: 'white',
                            '&:hover': {
                              bgcolor: 'primary.main',
                            }
                          }
                        }}
                      >
                        <ListItemButton
                          selected={selectedConversation.id === conv.id}
                          onClick={() => setSelectedConversation(conv)}
                          sx={{
                            borderRadius: 1,
                            '&.Mui-selected': {
                              bgcolor: 'primary.light',
                              '&:hover': {
                                bgcolor: 'primary.main',
                              }
                            }
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar>{conv.name[0]}</Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={conv.name}
                            secondary={conv.lastMessage}
                            secondaryTypographyProps={{
                              noWrap: true,
                              color: selectedConversation.id === conv.id ? 'white' : 'text.secondary'
                            }}
                          />
                          {conv.unread > 0 && (
                            <Box
                              sx={{
                                bgcolor: 'error.main',
                                color: 'white',
                                borderRadius: '50%',
                                width: 20,
                                height: 20,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.75rem',
                              }}
                            >
                              {conv.unread}
                            </Box>
                          )}
                        </ListItemButton>
                      </ListItem>
                      {index < mockConversations.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </Box>
            </Card>
          </Grid>

          {/* Zone de chat */}
          <Grid item xs={12} md={8} lg={9}>
            <Card sx={{ 
              height: '100%',
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column'
            }}>
              {/* En-tête du chat */}
              <Box sx={{ 
                p: 2,
                borderBottom: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center'
              }}>
                <Avatar sx={{ mr: 2 }}>{selectedConversation.name[0]}</Avatar>
                <Typography variant="h6">
                  {selectedConversation.name}
                </Typography>
              </Box>

              {/* Messages */}
              <Box sx={{ 
                flex: 1,
                overflow: 'auto',
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                bgcolor: '#f8f9fa'
              }}>
                {messages.map((message) => (
                  <Box
                    key={message.id}
                    sx={{
                      display: 'flex',
                      justifyContent: message.isSender ? 'flex-end' : 'flex-start',
                    }}
                  >
                    <Paper
                      sx={{
                        p: 2,
                        maxWidth: '70%',
                        bgcolor: message.isSender ? 'primary.main' : 'white',
                        color: message.isSender ? 'white' : 'text.primary',
                        borderRadius: 2,
                      }}
                    >
                      <Typography variant="body1">
                        {message.content}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          display: 'block',
                          textAlign: 'right',
                          mt: 1,
                          opacity: 0.8
                        }}
                      >
                        {message.time}
                      </Typography>
                    </Paper>
                  </Box>
                ))}
              </Box>

              {/* Zone de saisie */}
              <Box sx={{ 
                p: 2,
                borderTop: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.paper'
              }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton color="primary">
                    <AttachFileIcon />
                  </IconButton>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Écrivez votre message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                  />
                  <IconButton 
                    color="primary"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                  >
                    <SendIcon />
                  </IconButton>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Chat;
