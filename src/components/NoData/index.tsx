import { Box, Typography } from '@mui/material';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { NoDataType } from './type';

const NoData = ({ message, children }: NoDataType) => { 
    return (
        <Box sx={{ margin: 'auto', textAlign: 'center', color: '#757575' }}>
            <ManageSearchIcon sx={{ fill: 'orange', width: '10rem', height: 'auto' }}/>
            <Typography variant='h6' component='h2'>
                {message}
            </Typography>
            {children}
        </Box>
    )
}

export default NoData