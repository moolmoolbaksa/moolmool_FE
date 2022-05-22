import React, { useState } from 'react';
import styled from 'styled-components';

import { Text, Grid, Input, Button,Image } from '../../elements/index';
import {slide as Menu } from 'react-burger-menu';
import './Sidebar.css';



const Sidebar = (props) => {


    return (
        <Menu {...props}>
        <p className="menu-item" ><input type="checkbox"/> 가전제품 </p>
        <p className="menu-item" ><input type="checkbox"/> 생활용품 </p>
        <p className="menu-item" ><input type="checkbox"/> 인테리어 </p>
        <p className="menu-item" ><input type="checkbox"/> 남성패션 </p>
        <p className="menu-item" ><input type="checkbox"/> 여성패션 </p>
    </Menu>
        
        
        

    );
};

export default Sidebar;


