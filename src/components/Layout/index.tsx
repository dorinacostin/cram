import { Box } from '@mui/material';
import Header from '../Header';
import { LayoutType } from './type';

const Layout = ({ children, title }: LayoutType) => { 
    return (
        <Box data-testid="layout-container">
            <Header title={title}/>
            <Box data-testid="layout-children">
                {children}
            </Box>
        </Box>
    )
}
export default Layout