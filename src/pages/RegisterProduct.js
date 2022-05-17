import React, { useState } from 'react';
import styled,{keyframes,css} from 'styled-components';

import { Text, Grid, Input, Button,Image } from '../elements/index';
import ImageSlide from '../components/ImageSlide';
import ScrollHorizontal from 'react-scroll-horizontal';
import IconTabs from '../components/IconTabs';
import Noti from '../components/Registerproduct/Noti';
import CategoryNoti from '../components/Registerproduct/CategoryNoti';
import { ItemAPI } from '../shared/api';
import LocationBar from '../components/LocationBar';
import Checkbox from '@mui/material/Checkbox';
import { history } from '../redux/configureStore';
import {IoIosArrowUp} from "react-icons/io";


const Imageitem = ({src})=>{
    return <ImageSlide/>;
};

const RegisterProduct = (props) => {
    
    const categorys_list=[
        {id:1, value:"디지털기기"},
        {id:2, value:"생활가전"},
        {id:3, value:"가구/인테리어"},
        {id:4, value:"유아동"},
        {id:5, value:"유아도서"},
        {id:6, value:"생활/가공식품"},
        {id:7, value:"스포츠/레저"},
        {id:8, value:"여성잡화"},
        {id:9, value:"여성의류"},
        {id:10, value:"남성패션/잡화"},
        {id:11, value:"게임/취미"},
        {id:12, value:"뷰티/미용"},
        {id:13, value:"반려동물용품"},
        {id:14, value:"도서/티켓/음반"},
        {id:15, value:"식물"},
    ];
    const type_list=[
        {id:1, value:"상관없음"},
        {id:2, value:"택배거래"},
        {id:3, value:"직거래"},
    ]
    const [title,setTitle]=React.useState("");
    const [contents,setContents]=React.useState("");
    const [category,setCategory]=React.useState("카테고리 선택하기");
    const [favors,setFavors]=React.useState([]);
    const [fileslist,setFileslist]=React.useState([]);
    const [type,setType]=React.useState("");

    const fileInput=React.useRef();

    const [categoryOpen,setcategoryOpen]=useState(false);
    const [favorsOpen,setFavorsOpen]=useState(false);
    const [typeOpen,setTypeOpen]=useState(false);
    const [preview,setPreview]=useState([]);
    const openCategory = () =>{
        if(categoryOpen){
            setcategoryOpen(false);
        }
        else{
            setcategoryOpen(true);
        }
    }
    const openFavors = () =>{
        if(favorsOpen){
            setFavorsOpen(false);
        }
        else{
            setFavorsOpen(true);
        }
    }
    const openType=()=>{
        if(typeOpen){
            console.log('opentype check');
            setTypeOpen(false);
        }
        else{
            setTypeOpen(true);
        }

    }

    const selectfile=(e)=>{
        let filelist=[...fileInput.current.files];
        setFileslist(filelist);
        if(preview.length>0)
        {
            setPreview([]);
        }
        Array.from(fileInput.current.files).forEach(file => {
        
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setPreview((as)=>[...as,reader.result]);
            }
        });
        
    }
    const deletePreview=(id)=>{
        setPreview(preview.filter((_,idx)=>idx!==id));
        setFileslist(fileslist.filter((_,idx)=>idx!==id));
				console.log('delete check');
				console.log(preview);
				console.log(fileslist);
    }
    
    
    React.useEffect(()=>{
    },[]);
    const handleCategory=(e)=>{
        setCategory(e.target.value);
        setcategoryOpen(false);
    }
    const handleTitle=(e)=>{
        setTitle(e.target.value);
    }
    const handleContents=(e)=>{
        setContents(e.target.value);
    }
    const handleType=(e)=>{
        setType(e.target.value);
    }
    const handleFavor=(e)=>{
        if(e.target.checked)
        {
            setFavors(favors=>[...favors,e.target.value]);
            console.log(e.target.value);
        }
        else
        {   
            setFavors(favors.filter(favor=>favor !== e.target.value));
        }
    }
    const submit=()=>{
        console.log('submit_success')
        const formData = new FormData();
        formData.append('category',category);
        formData.append('favored',favors);
        formData.append('contents',contents);
        formData.append('title',title);
        // formData.append('images',fileslist);
        formData.append('type',type);
       
        console.log(category);
        console.log(favors);
        console.log(contents);
        console.log(title);
        console.log(type);
        
        for (var i = 0; i < fileslist.length; i++) {
            formData.append("images", fileslist[i]);
            console.log('uploading files');
        }
    
        ItemAPI.registerItem(formData)
        .then((res)=>
        {
            console.log(res);
            history.push('/')
        })
        .catch((error)=>{
            console.log(error);
        })
        
    }

    // console.log(preview)
	return (
	<Base>
	<LocationBar title="상품 등록"/>
	<Noti></Noti>

	<Categorywrap>
		<input id="dropdown" type="checkbox" style={{display:"none"}}/>
		<Toggle height='1rem 1rem' htmlFor="dropdown"  onClick={openCategory}>
			<ToggleName>{category}</ToggleName>
			<IoIosArrowUp/>
		</Toggle>
		{categoryOpen?
		<CategoryParentbox >
			<Categorybox >
			<CategoryWrapInputLabel  key={`category_div_default`}> 
					<input style={{display:"none"}} name="category" key={`category_input_default`} id="category_id_default" type="radio" value="카테고리 선택하기" checked={null} onClick={handleCategory}/>
					<Label htmlFor="category_id_default" key={`category_label_default`}
					>
					카테고리 선택하기
					</Label>
			</CategoryWrapInputLabel>
			{   
				categorys_list.map((p,idx)=>{
				return(
				<CategoryWrapInputLabel  key={`category_div_${idx}`} > 
						<input name="category" key={`category_input_${idx}`} id={p.value} type="radio" value={p.value} checked={null} style={{display:'none',}} onClick={handleCategory}/>
						<label htmlFor={p.value} key={`category_label_${idx}`}
						>					
							{p.value}
						</label>
				</CategoryWrapInputLabel>);
				})
										
			}
			</Categorybox>
		</CategoryParentbox>:""}
	</Categorywrap>
	<Empty/>

	<Input border='none' 
			size='1rem' 
			placeholder='제목을 입력해주세요.' 
			type='text'  
			margin='0px'
			padding='1rem'
			onChange={handleTitle}></Input>
	<hr></hr>
	<Input 
			border='none' 
			size='1rem' 
			placeholder='내용을 입력해주세요.' 
			type='text'  
			multiLine rows='8'  
			padding='1rem'
			onChange={handleContents}/>
	
	<Empty/>
	<Grid>
			<span style={{display:'block' , margin:'1.2rem 1.2rem',fontSize:'1.2rem'}}>사진 등록 ({fileslist.length}/8)개</span>

			
			<Imagelist >
			{/* _onclick={deletePreview(idx)} */}
			{preview.map((n,idx) => {
					return <ImageSlide   idx={idx} key={idx} src={n} _onclick={()=>{deletePreview(idx)}}></ImageSlide>;
			
		})}
				<div style={{margin:'10px'}}>
					<PlusItem htmlFor="raised-button-file"><span>+</span></PlusItem>
					<input onChange={selectfile} accept="image/*" id="raised-button-file"  ref={fileInput}  multiple type="file" style={{display:"none"}}/>
				</div>
		</Imagelist>
	</Grid>
	
	<Empty/>
	<input id="dropdown2" type="checkbox" style={{display:"none"}}/>
		<Toggle padding='1rem 1rem 0 1rem' htmlFor="dropdown2"  onClick={openType}>
				<ToggleName>선호하는 교환조건</ToggleName>
				<IoIosArrowUp/>
		</Toggle>
		

	{typeOpen?(<Emptyline margin='1.5rem auto'/>):""}
	{
		typeOpen?
		(<TypeBox>
			{type_list.map((p,idx)=>{
					return(
							<div key={`type_div_${idx}`}>
									<input  key={`type_input_${idx}`} name="type" id={p.value} type="radio" value={p.value} checked={null} onClick={handleType}/>
									<label key={`type_label_${idx}`} htmlFor={p.value}> {p.value} </label>
							</div>
					)
			})}
			</TypeBox>):""
	}
		<Empty/>
	<input id="dropdown1" type="checkbox" style={{display:"none"}}/>
	<Toggle padding='1rem 1rem 0 1rem' htmlFor="dropdown1"  onClick={openFavors}>
			<p>선호하는 교환품목</p>
			<IoIosArrowUp/>
	</Toggle>
	<Tip>Tip) 선호 품목을 선택해주시면 교환이 훨씬 수월해져요!</Tip>
	{favorsOpen?<Emptyline style={{margin:'0px 10px 10px 10px'}}/>:""}
	{favorsOpen?
	<>
	<FavorBox>
			{
				categorys_list.map((p,idx)=>{
						return(
				<div key={`favors_div_${idx}`}> 
						<input name="favors" key={`favors_input_${idx}`} id={p.value} type="checkbox" value={p.value} checked={null} onClick={handleFavor} />
						<label htmlFor={p.value} key={`favors_label_${idx}`}
						>
						{p.value}        
						</label>
				</div>);
				})
												
			}
	</FavorBox>
	<Tip>최대 5개까지 선택 가능합니다.</Tip>
	</>:""}
	<Empty/>
	{/* <div> */}
			{/* <div style={{margin: '20px 0px 20px 0px', display:'flex'}}> */}
			{/* <Text text='물품 거래 주의사항을 모두확인했으며 이에 동의합니다.'></Text><input type='checkbox'/> */}
			{/* </div> */}
			
	{/* </div> */}
			<Button height='4rem' radius='4px' background="yellow" color='black' onClick={submit}>등록하기</Button>
	</Base>
    );
};
const Base=styled.div`
    background: white;
		position:relative;
`;
const Imagelist=styled.div`
	display:flex;
	height:150px;
	overflow:auto;
	align-items: center;
	flex-wrap: nowrap;
	&::-webkit-scrollbar {
		width: 0;
	}
	&::-webkit-scrollbar-thumb {
	display:none;	
	border-radius: 10px;
		background: transparent;
	}
	scroll-behavior: smooth;
`;
const Empty=styled.div`
    width:100%;
    background-color:#F5F5F5;
    height:10px;
`
const Emptyline=styled.hr`
  margin:${props=>props.margin?props.margin:"0 auto"};
	width:90vw;
  background-color:#F5F5F5;
	
`;
const PlusItem = styled.label`
    width: 6rem;
    height: 6rem;
    border: 2px lightgray solid;
    font-color:lightgray;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    cursor: pointer;
    & > span {
        text-indent: -9999;
        color: lightgray;
        font-size: 30px;
    }
`;
const Categorywrap=styled.div`
    position:relative;
    width:100vw;
`;
const Toggle=styled.label`
		position:relative;
    padding: ${props=>props.padding?props.padding:"3vw 3vh"};
    display: flex;
    justify-content: space-between;
    font-size:1.2rem;

    text-align:left; 
    background:white;
    width:inherit;
    border:none;
    & > p{
        font-size:1.2rem;    
    }
    & > svg{
        // background-color: red;
        height:1.2rem;
        width:1.2rem;
        transition: transform 250ms ease-out;
    }
    input:checked + & > svg{
        transform: rotate(-180deg);
    }
    
    
`;
const CategoryParentbox=styled.div`
    box-sizing: border-box;    
    
    display:flex;
    justify-content:center;
    
    width:100vw;
    height: 40vh;


    border-radius:4px;
    z-index:5000;
    position:absolute;

    background-color:white;
    box-shadow:0px 3px 10px grey;
    padding:1.5vh;
`;
const Categorybox=styled.div`
    font-size:1.2rem;
    box-sizing: border-box;
    width:85vw;
        
    display: grid;
    overflow:auto;
    grid-template-columns: repeat(1, 1fr);
    &::-webkit-scrollbar {
        width: 8px;
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: ${props=>props.theme.palette.yellow};
    }
		&::-webkit-scrollbar-track {
			border-radius: 10px;
			background: ${props=>props.theme.palette.gray};
		}
`;
const CategoryWrapInputLabel=styled.div`
    margin:0 0 1.5vh 0;
    cursor:pointer;
    font-weight:500;
    &:active{
        background-color: ${props=>props.theme.palette.yellow};
    }
    &:focus{
        background-color: ${props=>props.theme.palette.yellow};
      }
`;
const FavorBox=styled.div`

    display: grid;
    overflow:auto;
    grid-template-columns: repeat(3, 1fr);
    margin: 0 10px;
`;
const TypeBox=styled.div`

    display: grid;
    overflow:auto;
    grid-template-columns: repeat(4, 1fr);
    margin: 0 10px;
`;
const Label = styled.label`
  &:hover{
    background:${props=>props.theme.palette.yellow};
  }

`;

const ToggleName= styled.p`
	&::after{
		position:absolute;
		display:inline-block;
		-moz-border-radius: 7.5px;
    -webkit-border-radius: 7.5px;
		content:'';
		width: 0.5rem;
		height: 0.5rem;
		top:1rem;
		background-color: red;
		border-radius: 0.5rem;
	}
`;

const Tip=styled.p`
	display:inline-block;
	padding:0 1rem;
	// margin: 0 1.5rem;
	color: #2B9ECF;
	font-size: 0.5rem;
`;
export default RegisterProduct;