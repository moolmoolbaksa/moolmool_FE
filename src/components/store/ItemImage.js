import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { api as productActions } from '../../redux/modules/product';

const ItemImage = ({itemId, image, status}) => {
    const dispatch = useDispatch();

    const onGoDetail = () => {
        dispatch(productActions.getProductApi(itemId));
    };

    return (
        <ImageOutter 
            onClick={onGoDetail}
        >
            <ImageInner 
                src={image}
            />
            {status === 2 && <ProductStatus>교환중</ProductStatus>}
            {status === 3 && <ProductStatus>거래완료</ProductStatus>}
        </ImageOutter>
    );
};

const ImageOutter = styled.div`
    position: relative;
    width: 100%;
    height: 0;
    overflow: hidden;
    padding-bottom: 100%;
`;

const ImageInner = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-image: url('${props => props.src}');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 5px;
    cursor: pointer;

    &:active {
        background: linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05)), url('${props => props.src}');
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }
`;

const ProductStatus = styled.div`
    font-size: 8px;
    padding: 2px 5px;
    border-radius: 10px;
    background-color: white;
    letter-spacing: -0.67px;
    position: absolute;
    z-index: 1;
    top: 5px;
    left: 5px;
`;

export default ItemImage;