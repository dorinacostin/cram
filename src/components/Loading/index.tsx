import { Box, Skeleton } from '@mui/material';

const Loading = () => { 
    return (
        <Box>
            <Skeleton data-testid="rectangular-skeleton" variant='rectangular' width={210} height={118} sx={{ marginTop: '1rem' }}/>
            <Skeleton data-testid="text-skeleton" width='40%'/>
            <Skeleton data-testid="text-skeleton" width='60%' />
        </Box>
    )
}

export default Loading