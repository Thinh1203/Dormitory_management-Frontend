import Slide from '@mui/material/Slide';
import * as React from 'react';

export const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});