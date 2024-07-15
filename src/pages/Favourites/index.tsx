import { Link } from 'react-router-dom';
import { Container, Grid, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { removeFavourite } from '../../features/favourites/favouritesSlice';
import Layout from '../../components/Layout';
import NoData from '../../components/NoData';
import Character from '../../components/Character';
import image from '../../assets/star-wars-character.jpg';
import { FavouriteCharacterType } from '../../type';

const Favourites = () => {
    const dispatch = useAppDispatch();
    const { favourites } = useAppSelector((state) => state.favourites);

    const handleRemove = (character: FavouriteCharacterType) => {
        dispatch(removeFavourite(character))
    }

    return (
        <Layout title='Home'>
            <Container 
                maxWidth='lg' 
                sx={{
                    marginBottom:'5rem', 
                    marginTop:'5rem'
                }}
            >
                {favourites.length > 0 
                    ? 
                    <Grid 
                        container 
                        spacing={{ xs: 2, md: 3 }} 
                        columns={{ xs: 2, sm: 8, md:16 }}
                    >
                        {favourites?.map(({ name, gender, homePlanet }) => {
                            return (
                                <Grid 
                                    item 
                                    xs={2} 
                                    sm={4} 
                                    md={4}
                                >
                                    <Character 
                                        name={name} 
                                        image={image} 
                                        gender={gender} 
                                        homePlanet={homePlanet}
                                        onClick={handleRemove}
                                        isFavourite={true}
                                    />
                                </Grid>
                            )
                        })}
                    </Grid> 
                    : 
                    <>
                    <NoData message='It looks like there is nothing to display here'>
                        <Typography variant='h6' component='h2'>
                           To add a favourite go to <Link to='/' style={{ textDecoration:'none', cursor:'pointer' }}> Home</Link> page
                        </Typography>
                    </NoData>
                    </>
                }
            </Container>
        </Layout>
    )
}

export default Favourites