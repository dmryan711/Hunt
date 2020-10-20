import React from 'react';
import firebase from '../../firebase';
import ProductItem from './ProductItem';
import formatDate from 'date-fns/format';
import isYesterday from 'date-fns/isYesterday';
import isToday from 'date-fns/isToday';
import {IonItem, IonLabel} from '@ionic/react';

const ProductList = (props)=> {
    const [products,setProducts] = React.useState([]);
    const isTrending = props.location.pathname.includes("trending");

    React.useEffect(()=> {
        const unsubscribe = getProducts();
        return () => unsubscribe();
    },[isTrending]
    );
}