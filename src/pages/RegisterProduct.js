import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Input, Button } from '../elements/index';
import ImageSlide from '../components/ImageSlide';
import Noti from '../components/registerproduct/Noti';
// import CategoryNoti from '../components/registerproduct/CategoryNoti';
import { ItemAPI } from '../shared/api';
import LocationBar from '../components/LocationBar';
import { history } from '../redux/configureStore';
import {IoIosArrowUp} from "react-icons/io";
import { useParams } from 'react-router-dom';
import { api as productActions } from '../redux/modules/product';
import useError from '../components/registerproduct/useError';
import { ReactComponent as CheckBox } from '../images/check_yellowbox.svg';
import { ReactComponent as UncheckedBox } from '../images/unchecked_emptybox.svg';
import {setAlertModal} from '../redux/modules/modal';
import AlertModal from '../components/modal/AlertModal';
import { api as userActions } from '../redux/modules/user';
const RegisterProduct = (props) => {
  const dispatch=useDispatch();
  const itemId = useParams().itemId;
  const is_edit = itemId?true:false;
  
  React.useEffect(() => {
    dispatch(userActions.getMyInfoApi());
}, []);
const myitem=useSelector(state=>state.user.item_list);
console.log(myitem.length);
  
  //  코드최적화 준비
  //  https://react.vlpt.us/basic/09-multiple-inputs.html   
  // input 의 개수가 여러개가 됐을때는, 단순히 useState 를 여러번 사용하고 onChange 도 여러개 만들어서 구현 할 수 있습니다. 
  // 하지만 그 방법은 가장 좋은 방법은 아닙니다. 
  // 더 좋은 방법은, input 에 name 을 설정하고 이벤트가 발생했을 때 이 값을 참조하는 것입니다. 
  // 그리고, useState 에서는 문자열이 아니라 객체 형태의 상태를 관리해주어야 합니다.
  
  
  // console.log(itemId);
 
  
  const product_info=useSelector(state=>state.product.product_info);
  
    // console.log(is_edit);
  // const list=[1,2,3,4,5];
  //   console.log(list.filter((_,idx)=>1!=idx))
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
    const [ErrorModal,setErrorModal]=useState(false);
    const [preview,setPreview]=useState([]);
//수정위한 사진 URL용 temp array 추가
    const [tempURL,setTempURL]=useState([]);
    const ErrorMessage=useError(title,contents,category,favors,preview,type,myitem.length,is_edit);
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
        setFileslist(state=>state.concat(filelist));
        console.log(filelist);
        console.log(fileInput.current.files);

        filelist.map((file)=>{
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            setPreview(state=>state.concat([reader.result]));
            // setPreview([...preview,reader.result]);

        }})
        
    }
    const deletePreview=(id)=>{
      setTempURL(tempURL.filter((_,idx)=>idx!==id));
      setFileslist(fileslist.filter((_,idx)=>tempURL.length+idx!==id));
      setPreview(preview.filter((_,idx)=>idx!==id));
    }
    React.useEffect(()=>{
      if(is_edit)
      {
        const edit_category=product_info.category;
        const edit_title=product_info.title;
        const edit_contents=product_info.contents;
        const edit_images=product_info.images;
        const edit_type=product_info.type;
        const edit_favors=product_info.favored;
        console.log('edit_type:'+edit_type)
        console.log('edit_favors:'+edit_favors)
        setCategory(edit_category);
        setTitle(edit_title);
        setContents(edit_contents);
        setPreview(edit_images);
        setType(edit_type);
        setFavors(edit_favors)
        setFavorsOpen(true);
        setTypeOpen(true);
        setTempURL(edit_images);

      }
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
        console.log(e.target.value);
    }
    const handleFavor=(e)=>{
        if(e.target.checked)
        {
            setFavors(favors=>[...favors,e.target.value]);
            console.log(favors);
        }
        else
        {   
            setFavors(favors.filter(favor=>favor !== e.target.value));
            console.log(favors);
        }
    }
    const submit=()=>{
        console.log(ErrorMessage[0]);
        if(!ErrorMessage[0])
        {
          dispatch(setAlertModal(true))
          setErrorModal(true);
          return;
        }
        
      const formData = new FormData();
        formData.append('category',category);
        formData.append('favored',favors);
        formData.append('contents',contents);
        formData.append('title',title);
        // formData.append('images',fileslist);
        formData.append('type',type);
        
        for (var i = 0; i < fileslist.length; i++) {
            formData.append("images", fileslist[i]);
            console.log('uploading files');
        }
        ItemAPI.registerItem(formData)
        .then((res)=>
        {
            console.log(res);
            dispatch(productActions.getProductApi(res.data));
            history.replace(`detail/${res.data}`)
        })
        .catch((error)=>{
            console.log(error);
        })
        
    }
    const edit=()=>{
      console.log(ErrorMessage[0]);
        if(!ErrorMessage[0])
        {
          dispatch(setAlertModal(true))
          setErrorModal(true);
          return;
        }
      console.log('edit');
      console.log('submit_success');
      const formData = new FormData();
      formData.append('category',category);
      formData.append('favored',favors);
      formData.append('contents',contents);
      formData.append('title',title);
      formData.append('type',type);
      for (var i = 0; i < fileslist.length; i++) {
        formData.append("images", fileslist[i]);
        console.log('uploading files');
      }
      formData.append('imagesUrl',tempURL);
      ItemAPI.editItem(itemId,formData)
        .then((res)=>
        {
            console.log(res);
            dispatch(productActions.getProductApi(itemId));
            history.replace(`/detail/${itemId}`);
        })
        .catch((error)=>{
            console.log(error);
        })

    }

    // console.log(preview)
	return (
	<Base>
	{ is_edit?<LocationBar title="상품 수정"/>:<LocationBar title="상품 등록"/>}
	<Noti></Noti>

	<Categorywrap>
		<input id="dropdown" type="checkbox" style={{display:"none"}}/>
		<Toggle padding='1rem 1rem' htmlFor="dropdown"  onClick={openCategory}>
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
			onChange={handleTitle}
      value={title}
      ></Input>
  <Emptyline/>
	<Input 
			border='none' 
			size='1rem' 
			placeholder='내용을 입력해주세요.' 
			type='text'  
			multiLine rows='12'  
			padding='1rem'
      value={contents}
			onChange={handleContents}/>
	
	<Empty/>
	<Grid>
			<span style={{display:'block' , margin:'1.2rem 1.2rem',fontSize:'1.2rem'}}>사진 등록 미리보기 ({preview.length}/8)개</span>

			
			<Imagelist >
			{/* _onclick={deletePreview(idx)} */}
			{preview.map((n,idx) => {
					return <ImageSlide   idx={idx} key={idx} src={n} _onclick={()=>{deletePreview(idx)}}></ImageSlide>;
			
		})}
				<div style={{margin:'10px'}}>
					<PlusItem htmlFor="raised-button-file"><span>+</span></PlusItem>
					<input onChange={selectfile} accept=".jpg, .png" id="raised-button-file"  ref={fileInput}  multiple type="file" style={{display:"none"}}/>
				</div>
		</Imagelist>
	</Grid>
	
	<Empty/>
	<input id="dropdown2" type="checkbox" style={{display:"none"}}/>
		<Toggle padding='1rem' htmlFor="dropdown2"  onClick={openType}>
				<ToggleName>선호하는 교환조건</ToggleName>
				<IoIosArrowUp/>
		</Toggle>
		

	{typeOpen?(<Emptyline margin='0 0 1rem 0'/>):""}
	{
		typeOpen?
		(<TypeBox>
			{type_list.map((p,idx)=>{
					return(
							<div key={`type_div_${idx}`}>
                  <CheckInput  key={`type_input_${idx}`} name="type" id={p.value} type="radio" value={p.value} defaultChecked={type.includes(p.value)} onClick={handleType}/>
									<CheckLabel key={`type_label_${idx}`} htmlFor={p.value}>
                    <div>{type.includes(p.value)?<CheckBox width="20" height="20"/>:<UncheckedBox width="20" height="20"/>} <span>{p.value}</span></div> 
                  </CheckLabel>
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
	{favorsOpen?<Emptyline margin='1.5rem 0' />:""}
	{favorsOpen?
	<>
	<FavorBox>
			{
				categorys_list.map((p,idx)=>{
						return(
				<div key={`favors_div_${idx}`}> 
						<CheckInput name="favors" key={`favors_input_${idx}`} id={p.value} type="checkbox" value={p.value} defaultChecked={favors.includes(p.value)}  onClick={handleFavor} />
						<CheckLabel htmlFor={p.value} key={`favors_label_${idx}`}
						>
						<div>{favors.includes(p.value)?<CheckBox width="20" height="20"/>:<UncheckedBox width="20" height="20"/>} {p.value}  </div>      
						</CheckLabel>
				</div>);
				})
												
			}
	</FavorBox>
	<Tip>최대 5개까지 선택 가능합니다.</Tip>
	</>:""}
	<Empty/>

			{is_edit?<Button height='4rem' radius='4px' background="yellow" color='black' onClick={edit}>수정하기</Button>
      :<Button height='4rem' radius='4px' background="yellow" color='black' onClick={submit}>등록하기</Button>}
    {<AlertModal>{ErrorMessage[1]}</AlertModal>}
	</Base>
    );
};
const Base=styled.div`
  background: white;
	position:relative;
  max-width:420px;
  overflow:auto;
  height:100vh;
  max-height:100%;
  // &::-webkit-scrollbar-thumb {
  //   display:none;	}
    &::-webkit-scrollbar {
      width: 0;
      height:0;
    }
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
    max-width:420px;
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
    // width:100%;
    // max-width:420px;   
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
    
    width:100%;
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
    width:100%;
    padding:0 0 0 calc(1rem);
    margin: 0 4px 0 0 ;
        
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
	padding:0 1rem 1rem 1rem;
	// margin: 0 1.5rem;
	color: #2B9ECF;
	font-size: 0.5rem;
`;

const CheckInput=styled.input`
 display:none;
`;
const CheckLabel=styled.label`
  display:inline-block;
  align-items:center;
  justify-content:center;

& > div {
  display:flex;
}
& > svg{
  display:block;
  align-items:center;
}
`;
export default RegisterProduct;