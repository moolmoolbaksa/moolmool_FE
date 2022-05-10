import React, { useState } from 'react';
import styled from 'styled-components';

import { Text, Grid, Input, Button,Image } from '../elements/index';
import ImageSlide from '../components/ImageSlide';
import ScrollHorizontal from 'react-scroll-horizontal';
import IconTabs from '../components/IconTabs';
import Noti from '../components/Registerproduct/Noti';
import CategoryNoti from '../components/Registerproduct/CategoryNoti';
import { ItemAPI } from '../shared/api';




const Imageitem = ({src})=>{
    return <ImageSlide/>;
};

const RegisterProduct = (props) => {
    
    
    const categorys_list=[
        {id:1, value:"가전제품"},
        {id:2, value:"여성의류"},
        {id:3, value:"남성의류"},
        {id:4, value:"생활용품"},
        {id:5, value:"욕실용품"},
        {id:6, value:"주방용품"},
        {id:7, value:"서적/음반"},
        {id:8, value:"게임/취미"},
        {id:9, value:"뷰티/미용"},
        {id:10, value:"기타"},
    ];
    const type_list=[
        {id:1, value:"상관없음"},
        {id:2, value:"택배거래"},
        {id:3, value:"직거래"},
    ]
    const [title,setTitle]=React.useState("");
    const [contents,setContents]=React.useState("");
    const [category,setCategory]=React.useState("");
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
    }
    
    
    React.useEffect(()=>{
    },[preview]);
    const handleCategory=(e)=>{
        setCategory(e.target.value);
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
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    console.log(preview)
    return (
        <React.Fragment>
            <h1>바꿀래요?</h1>
            <Noti></Noti>


        <Button height='100px' text='+카테고리 선택하기' onClick={openCategory}></Button>
        <CategoryNoti></CategoryNoti>
        {categoryOpen?<Emptyline style={{margin:'0px 10px 10px 10px'}}/>:""}
        {categoryOpen?
        
        <div style={{display:'flex', flexWrap:'wrap'}}>
            {
                categorys_list.map((p,idx)=>{
                    return(
                <div key={`category_div_${idx}`}> 
                    <input name="category" key={`category_input_${idx}`} id={p.value} type="radio" value={p.value} checked={null} onClick={handleCategory}/>
                    <label htmlFor={p.value} key={`category_label_${idx}`}
                    >
                            
                            {p.value}
                    </label>
                </div>);
                })
                              
            }
            
            
            
            </div>:""}
        <Empty/>

        <Input border='none' size='50px' placeholder='제목을 입력해주세요 (최대 30자)' type='text'  margin='0px' width='100%' onChange={handleTitle}></Input>
        <hr></hr>
        <Input border='none' size='50px' placeholder='내용을 입력해주세요 (최대 30자)' type='text'  multiLine rows='5'  width='100%' onChange={handleContents}/>
        
        <Empty/>
        <Grid>
            <h2>사진 등록 ({fileslist.length}/8)개</h2>

            
            <Imagelist >
            {/* _onclick={deletePreview(idx)} */}
            {preview.map((n,idx) => {
                return <ImageSlide   idx={idx} key={idx} src={n} can_delete></ImageSlide>;
            
          })}
          <UploadLabel htmlFor="raised-button-file">+</UploadLabel>
            <input onChange={selectfile} accept="image/*" id="raised-button-file"  ref={fileInput}  multiple type="file" style={{display:"none"}} />
          </Imagelist>
        </Grid>
        
        <Empty/>
        
        <Button height='50px' text='+선호하는 교환품목' onClick={openFavors}></Button>
        
        {favorsOpen?<Emptyline style={{margin:'0px 10px 10px 10px'}}/>:""}
        {favorsOpen?
        
        <div style={{display:'flex', flexWrap:'wrap'}}>
            {
                categorys_list.map((p,idx)=>{
                    return(
                <div key={`favors_div_${idx}`}> 
                    <input name="favors" key={`favors_input_${idx}`} id={p.value} type="checkbox" value={p.value} checked={null} onClick={handleFavor}/>
                    <label htmlFor={p.value} key={`favors_label_${idx}`}
                    >
                            
                            {p.value}
                    </label>
                </div>);
                })
                              
            }
            
            
            
            </div>:""}
        
        <Empty/>

        <Button height='50px' text='선호하는 거래조건' onClick={openType}></Button>
        
        {typeOpen?(<Emptyline/>):""}
        {
            typeOpen?(
                type_list.map((p,idx)=>{
                    return(
                        <div key={`type_div_${idx}`}>
                            <input  key={`type_input_${idx}`} name="type" id={p.value} type="radio" value={p.value} checked={null} onClick={handleType}/>
                            <label key={`type_label_${idx}`} htmlFor={p.value}> {p.value} </label>
                        </div>
                    )
                })
                ):""
        }
        
        

        <Emptyline/>
        <div>
            <div style={{margin: '20px 0px 20px 0px', display:'flex'}}>
            <Text text='물품 거래 주의사항을 모두확인했으며 이에 동의합니다.'></Text><input type='checkbox'/>
            </div>
            <Button height='40px' radius='4px' background='#FFCA39' color='black' text='바꿀래요' onClick={submit}></Button>
        </div>
        
        <IconTabs></IconTabs>
        
        
        </React.Fragment>
        
        
        

    );
};
const Imagelist=styled.div`
    display:flex;
    overflow:scroll;
    &.no-scroll::-webkit-scrollbar {
        display: none; /* Chrome, Safari and Opera */
    }
    flex-wrap: nowrap;
`;
const UploadLabel=styled.label`
    box-sizing:border-box;
    display:block;
    width:50px;
    height:50px;
    background-color:grey;
    border: 1px solid red;
    text-align:center;
    align-items:center;

`;
const Empty=styled.div`
width:100%;
background-color:#F5F5F5;
height:10px;
`
const Emptyline=styled.hr`
width:90%;
background-color:#F5F5F5;
margin:0 auto;
`
export default RegisterProduct;