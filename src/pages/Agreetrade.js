import React from 'react';
import styled from 'styled-components';
import { Image } from '../elements';
const Agreetrade = (props) => {
    return (
        <React.Fragment>
            <div>
                    <div style={{width:'70%', display:'flex', margin:'0 auto', justifyContent:'center'}} >
                        {
                            Array.from({length:5},(item,idx)=>{
                                return( <Image/>)
                            })
                        }
                    </div>
                    <div style={{width:'70%', margin:'0 auto', justifyContent:'center', textAlign:'center'}}>
                        화살표
                    </div>
                    <div>
                    <div style={{width:'70%', display:'flex', margin:'0 auto', justifyContent:'center'}} >
                        {
                            Array.from({length:3},(item,idx)=>{
                                return( <Image/>)
                            })
                        }
                    </div>
                    </div>
                </div>
        </React.Fragment>
    );
};




export default Agreetrade;