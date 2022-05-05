import React, { useState } from 'react';
// import styled from 'styled-components';
import { styled, alpha } from '@mui/material/styles';
import { Text, Grid, Input, Button,Image } from '../elements/index';
import IconTabs from '../components/IconTabs';
import Card from '../components/Main/Card'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import BsEye from 'react-icons/bs'

import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import { ItemAPI } from '../shared/api';


import { set } from 'lodash';
import { useSelector } from 'react-redux';
// Instantiation


const Main = (props) => {
  // console.log(localStorage.getItem('token'));
  const [filter,setfilter] = useState('전체');
  const [openFilter,setopenfilter] = useState(false);
  // console.log(filter);
  const [cardList, setCardlist]=useState([]);
  const {nickname, profile} = useSelector(state => state.user.user_info);
  
  React.useEffect(()=>{
    let category_string=null;
    
    if (filter=='전체')
    {
      category_string='/items?category'
      console.log(category_string)
    }
    else{
      category_string=`/items?category=${filter}`
      console.log(category_string)
      
    }
    ItemAPI.getItems(category_string)
    .then((res)=>{
      console.log(res);
      setCardlist(res.data);

    })
    .catch((error)=>{
      console.log(error);
      console.log(category_string);
    })


  },[openFilter])
  const Drawers =()=>{
    if(openFilter)
    {setopenfilter(false);}
    else{
      setopenfilter(true);
    }
  }

    return (
        <React.Fragment>
            <AppBar position="static" sx={{bgcolor:'#FFBB00'}}>
               <Toolbar>
                   <IconButton onClick={Drawers} size="large"edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                            <SearchIcon />
                    <Badge badgeContent={4} color="success">
                        <MailIcon color="action" />
                    </Badge>

                </Toolbar>
            </AppBar>
            
            <Drawer
            PaperProps={{ style: { height: "500px",}}}
            open={openFilter}
            onClose={Drawers}
            
            
            >
              <div style={{width:'250px'}}>
                <List>
                  {['전체','category1','category2','category3','category4','category5','category6','category7'].map((text,index)=>(
                    <ListItem key={text}>
                    <input type='checkbox'/>
                    <ListItemIcon>
                      <MailIcon/>
                    </ListItemIcon>
                    <ListItemText primary={text} onClick={()=>{
                      setfilter(text);
                      console.log(text);
                      setopenfilter(false);
                      }}/>
                    </ListItem>
                  ))}

                </List>
                <Button text='적용' height='40px' background='black' color='white'></Button>
              </div>
            

            </Drawer>
            <div style={{display:'flex', width:'100%', margin:'', backgroundColor:'#FFBB00'}}>
                <Image size='100' src={profile} margin='20px 20px'/>

                <div>
                    <p>안녕하세요, {nickname}님 </p>
                    <p>물물 교환을 시작해 볼까요?</p>
                </div> 
            </div>     

                
            {
              cardList.map((p,idx)=>{ 
                return <Card key={p.itemId} itemId={p.itemId} title={p.title} image={p.image} address={p.address} contents={p.contents} scrab={p.scrab} scrabCnt={p.scrabCnt} viewCnt={p.viewCnt} />

              })

            }
            
            <IconTabs/>
        </React.Fragment>
        
        
        

    );
};

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
export default Main;