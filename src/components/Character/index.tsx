import { Link } from 'react-router-dom';
import { Card, CardActions, CardContent,  CardMedia, Button, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText, Grid } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { CharacterType } from './type';

const Character = ({ id, name, image, homePlanet, gender, children, isFavourite, onClick }: CharacterType) => {
    return(
        <Card sx={{ maxWidth: '100%', marginTop:'1.5rem' }}>
            <CardMedia sx={{ height: 300 }} image={image} title='character'/>
            <CardContent>
                <List 
                    sx={{ 
                        width: '100%', 
                        maxWidth: 360, 
                        bgcolor: 'transparent' 
                    }}
                >
                    <Typography gutterBottom variant='h5' component='div'>
                        {name}
                    </Typography>
                    <ListItem sx={{paddingLeft:0}}>
                        <ListItemAvatar>
                            <Avatar sx={{bgcolor:'#eeeee4'}}> 
                                <PublicIcon sx={{ fill:'#f37737' }}/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary='Home planet' secondary={homePlanet ? homePlanet : 'n/a'} sx={{ color:'#f37737' }}/>
                    </ListItem>
                    <ListItem sx={{paddingLeft:0}}>
                        <ListItemAvatar>
                            <Avatar sx={{bgcolor:'#eeeee4'}}>
                                <TransgenderIcon sx={{ fill:'#f37737' }}/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary='gender' secondary={gender} sx={{ color:'#f37737' }}/>
                    </ListItem>
                </List>
            </CardContent>
            <CardActions>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6} md={6}>
                        <Button 
                            sx={{ 
                                fontSize: '.7rem', 
                                textTransform: 'capitalize', 
                                color: isFavourite ? '#ff0000' : '#a6a4a4', 
                                border: '1px solid #041542'
                            }}
                            fullWidth
                            onClick={() => onClick({ name, gender, homePlanet })}
                        >
                            {isFavourite ? 'Remove Favourite': 'Add Favourite'}
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <Button 
                            sx={{ 
                                fontSize: '.7rem', 
                                textTransform: 'capitalize', 
                                color: '#a6a4a4', 
                                bgcolor: '#041542', 
                                border: '1px solid #041542',
                                '&:hover': {
                                    backgroundColor: 'darkblue'
                                }
                            }}
                            fullWidth
                        >
                            <Link to={`/${id}`} style={{ color: 'white', textDecoration: 'none' }}>Character details</Link>
                        </Button>
                    </Grid>  
                </Grid>
            </CardActions>
            {children}
        </Card>
    )
}

export default Character