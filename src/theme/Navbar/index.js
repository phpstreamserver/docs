import React from 'react';
import {useLocation} from '@docusaurus/router';
import Navbar from '@theme-original/Navbar';

export default function NavbarWrapper(props) {
    const {pathname} = useLocation();

    if (pathname === '/') {
        return null;
    }

    return <Navbar {...props} />;
}
