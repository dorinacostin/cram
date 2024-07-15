import { SearchType } from "./type";
import { Input } from '@mui/material';

const Search = ({ query, onSearch }: SearchType) => {
    return(
        <div>      
            <Input
                type='text'
                value={query}
                onChange={onSearch}
                placeholder='Search character by name'
                sx={{
                    width: '100%',
                    maxWidth: { xs: '100%', md: '15rem' }, 
                    padding: '0.75rem 1rem',
                    marginBottom: '1rem',
                    border: '1px solid #ccc',
                    borderRadius: '.5rem .5rem 0 0',
                    outline: 'none',
                    fontSize: '1rem',
                }}
            />
      </div>
    )
}

export default Search