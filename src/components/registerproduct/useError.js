import React, { useEffect } from "react";
const useError = (title,contents,category,favors,preview,type) => {
  React.useEffect(()=>{ 

  },[])
  if((title.length===0))
  {
    return [false,'제목을 입력해주세요'];
  }
  else if(contents.length===0)
  {
    return [false,'내용을 입력해주세요'];
  }
  else if(category==='카테고리 선택하기')
  {
    return [false,'카테고리를 입력해주세요'];
  }
  else if(favors.length>5)
  {
    return [false,'선호 카테고리는 5개 이하로 선택해주세요'];
  }
  else if(preview.length===0)
  {
    return [false,'물품의 사진을 선택해주세요'];
  }
  else if(preview.length>8)
  {
    return [false,'사진은 8개이하로 선택가능합니다'];
  }
  else if(type.length===0)
  {
    return [false,'교환방식을 선택해주세요'];
  }
  else{
    return [true];
  }
  

    
};


export default useError;
