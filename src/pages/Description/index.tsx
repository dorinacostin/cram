import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Typography, Grid, List, ListItem, ListItemText } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchCharacterById } from '../../features/caracter/caracterSlice';
import { addFavourite, removeFavourite } from '../../features/favourites/favouritesSlice';
import Layout from '../../components/Layout';
import Loading from '../../components/Loading';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import image from '../../assets/star-wars-character.jpg';
import { FilmType, StarshipType } from '../../type';

const Description = () => { 
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const { details: { name, eye_color, hair_color, height, gender }, planet, loading, films, starships } = useAppSelector((state) => state.character);
    const { favourites } = useAppSelector((state) => state.favourites);
    const isFavourite = favourites.find(fav => fav.name == name); 

    useEffect(() => {
        dispatch(fetchCharacterById({ id }))
    }, [dispatch, id])
    
    const handleAdd = () => {
        dispatch(addFavourite({ name, gender, homePlanet: planet.name }))
    }

    const handleRemove = () => {
        dispatch(removeFavourite({ name, gender, homePlanet: planet.name }))
    }

    return (
        <Layout title='Description'>
            <Grid 
                container 
                justifyContent='center'
                sx={{ maxWidth:'50rem', margin:'auto' }}
            >
                {!loading ? (
                    <Grid 
                        container 
                        spacing={2}
                        justifyContent='center'
                        alignItems='flex-start'
                        sx={{ marginTop: '3rem' }}
                    >
                        <Grid item xs={12} md={4}>
                            <Box
                                component='img'
                                sx={{
                                    height: { xs: 'auto', md: 450 },
                                    width: '100%',
                                    maxWidth: { xs: '100%', md: 250 },
                                    borderRadius: '8px',
                                    boxShadow: 3,
                                    '&:hover': {
                                        color: 'blue',
                                    },
                                }}
                                alt='Example image'
                                src={image}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant='h5' sx={{ color: 'gray', width:'100%' }}>
                                        {name}
                                    </Typography>
                                    <Button 
                                        sx={{ 
                                            fontSize: '.7rem', 
                                            textTransform: 'capitalize', 
                                            color: '#a6a4a4'
                                        }}
                                        onClick={isFavourite ? handleRemove : handleAdd}
                                        fullWidth
                                    >
                                        {isFavourite ? 'Remove Favourite' : 'Add Favourite'}
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography sx={{ margin: '1rem 0 1rem', display: 'flex', alignItems: 'center' }}>
                                        <AccessibilityIcon sx={{ fill: 'green', marginRight: '.5rem' }} />
                                        Character Details
                                    </Typography>
                                    <List>
                                        <ListItem sx={{ padding: 0 }}>
                                            <ListItemText primary='Home planet' secondary={planet?.name ? planet.name : 'n/a'} sx={{ color: '#f37737' }} />
                                        </ListItem>
                                        <ListItem sx={{ padding: 0 }}>
                                            <ListItemText primary='Eye color' secondary={eye_color} sx={{ color: '#f37737' }} />
                                        </ListItem>
                                        <ListItem sx={{ padding: 0 }}>
                                            <ListItemText primary='Hair color' secondary={hair_color} sx={{ color: '#f37737' }} />
                                        </ListItem>
                                        <ListItem sx={{ padding: 0 }}>
                                            <ListItemText primary='Height' secondary={height} sx={{ color: '#f37737' }} />
                                        </ListItem>
                                        <ListItem sx={{ padding: 0 }}>
                                            <ListItemText primary='Gender' secondary={gender} sx={{ color: '#f37737' }} />
                                        </ListItem>
                                        {films.length 
                                            ?
                                            <ListItem sx={{ padding: 0 }}>
                                                <ListItemText primary='Films' secondary={films.map((film: FilmType) => film.title).join(', ')} sx={{ color: '#f37737' }} />
                                            </ListItem>
                                            : 
                                            null
                                        }
                                        {starships.length 
                                            ?
                                            <ListItem sx={{ padding: 0 }}>
                                                <ListItemText primary='Starships' secondary={starships.map((starship: StarshipType) => starship.name).join(', ')} sx={{ color: '#f37737' }} />
                                            </ListItem>
                                            :
                                            null
                                        }
                                    </List>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                ) : (
                    <Loading />
                )}
            </Grid>
        </Layout>
    );
}

export default Description;