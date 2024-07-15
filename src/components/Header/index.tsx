import { Link } from 'react-router-dom';
import { Typography, Box, List, ListItem } from '@mui/material';
import { HeaderType } from './type';
import image from '../../assets/star-wars.jpg';

const Header = ({ title }: HeaderType) => {
    return(
        <header role='banner'>
            <Box 
                display='flex'
                justifyContent='center'
                alignItems='center'
                sx={{ 
                    backgroundImage: `url(${image})`,
                    height: '20rem',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100%',
                    backgroundPositionY: 'center'
                }}>
                <Typography 
                    variant='h3' 
                    component='h2' 
                    data-testid='header-title'
                    sx={{
                        color: 'white', 
                        marginTop: 'auto', 
                        marginBottom: 'auto'
                    }}
                >
                    {title}
                </Typography>
            </Box>
            <nav style={{ margin: '0 2rem 0', textAlign: 'center' }}>
                <List sx={{ padding: 0, marginTop: '1rem', fontWeight: 'bold' }}>
                    <ListItem sx={{ display: 'inline', marginRight: 2 }} key='home'>
                        <Link to='/' style={{ textDecoration: 'none', color: 'black', cursor: 'pointer' }} data-testid='home-link'>Home</Link>
                    </ListItem>
                    <ListItem sx={{ display: 'inline', marginRight: 2 }} key='favourites'>
                        <Link to='/favourites' style={{ textDecoration: 'none', color: 'black', cursor: 'pointer' }} data-testid='favourites-link'>Favourites</Link>
                    </ListItem>
                </List>
            </nav>
        </header>
    )
}

export default Header