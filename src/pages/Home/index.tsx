import { ChangeEvent, useEffect, useState } from 'react';
import { Container, Grid, Pagination } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useDebounce } from '../../hooks/useDebounce';
import { getIdFromUrl } from '../../utils';
import { fetchCharacters } from '../../features/characters/charactersSlice';
import { addFavourite, removeFavourite } from '../../features/favourites/favouritesSlice';
import Layout from '../../components/Layout';
import Search from '../../components/Search';
import Character from '../../components/Character';
import Loading from '../../components/Loading';
import image from '../../assets/star-wars-character.jpg';
import NoData from '../../components/NoData';
import { FavouriteCharacterType, ResponseCharacterType, ResponsePlanetType } from '../../type';

const Home = () => {
    const [term, setTerm] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const dispatch = useAppDispatch();
    const query = useDebounce(term, 1000);
    const { characters: { results, count }, planets, loading } = useAppSelector((state) => (state.characters));
    const { favourites } = useAppSelector((state) => state.favourites);
    
    useEffect(() => {
        dispatch(fetchCharacters({ query, page }))
    }, [dispatch, page, query])

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => { 
        setTerm(event.target.value);
        setPage(1);
    }
    const handlePageChange = (_: ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleAdd = (character: FavouriteCharacterType) => {
        dispatch(addFavourite(character));
    }

    const handleRemove = (character: FavouriteCharacterType) => {
        dispatch(removeFavourite(character));
    }

    return (
        <Layout title='Home'>
            <Container maxWidth='xl' sx={{ marginBottom: { xs: '2rem',  md: '5rem' }, marginTop: '2rem' }}>
                <Search query={term} onSearch={handleSearch}/>
                {results?.length 
                    ?
                    <Grid 
                        container 
                        spacing={{ xs: 2, md: 3 }} 
                        columns={{ xs: 2, sm: 8, md: 20 }}
                    >
                        {results?.map(({ name, gender, url, homeworld }: ResponseCharacterType, idx: number) => {
                            const isFavourite = favourites.some(fav => fav.name === name); 
                            const home = planets?.results.find((planet: ResponsePlanetType) => getIdFromUrl(planet.url) === getIdFromUrl(homeworld));
                            
                            return (
                                <Grid key={idx} item xs={2} sm={4} md={4}> 
                                    {!loading
                                        ?
                                        <Character 
                                            id={getIdFromUrl(url)} 
                                            name={name} 
                                            image={image} 
                                            gender={gender} 
                                            homePlanet={home?.name || ''}
                                            isFavourite={isFavourite}
                                            onClick={isFavourite ? handleRemove : handleAdd}
                                        /> 
                                        :
                                        <Loading /> 
                                    }
                                </Grid>   
                            )
                        })}
                    </Grid> 
                    : 
                    <NoData message='No results found. Please try a different search term'/>
                }
                {count > 10 
                    ? 
                    <Pagination 
                        sx={{
                            marginTop: { xs: '2rem',  md: '4rem' }, 
                            justifyContent: 'center', 
                            display: 'flex'
                        }}  
                        variant='outlined' 
                        count={Math.ceil(count / 10)}
                        page={page}
                        onChange={handlePageChange}
                    />
                    : 
                    null
                }
            </Container>
        </Layout>
    )
}

export default Home