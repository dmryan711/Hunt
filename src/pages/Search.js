import React from "react";
import {IonPage, IonContent, IonSearchbar} from "@ionic/react";
import firebase from '../firebase';
import SmallHeader from '../components/Header/SmallHeader';
import LargeHeader from '../components/Header/LargeHeader';
import ProductItem from "../components/Product/ProductItem";

const Search = () => {
    const [filteredProducts, setFilteredProducts] = React.useState([]);
    const [products, setProducts] = React.useState([]);
    const [filter, setFilter] = React.useState("");

    React.useEffect(()=> {
        getInitialProducts();
        // eslint-disable-next-line
    },[]);

    React.useEffect(()=> {
        handleSearch();
        // eslint-disable-next-line
    },[filter]);


    function getInitialProducts() {
        firebase.db
        .collection("products")
        .get()
        .then((snapshot)=>{
            const products = snapshot.docs.map((doc)=>{
                return {id: doc.id, ...doc.data()}
            });
            setProducts(products);
        });
    }


    function handleChange(evt){
        if(evt.key === "Enter"){
            setFilter(evt.target.value);
        }
    }

    function handleSearch(){
        const query = filter.toLowerCase();
        const matchedProducts = products.filter((product) =>{
            return (
                product.description.toLowerCase().includes(query) || product.url.toLowerCase().includes(query) || product.postedBy.name.toLowerCase().includes(query)
            );
        });
        setFilteredProducts(matchedProducts);
    }
    return (

        <IonPage>
            <SmallHeader title = "Search" />
            <IonContent>
                <LargeHeader title = "Search" />
                <IonSearchbar
                    placeholder="Search"
                    spellcheck="false"
                    type="url"
                    value={filter}
                    onKeyPress={handleChange}
                    animated
                />
                {filteredProducts.map((filteredProducts,index)=>(
                    <ProductItem
                        key={filteredProducts.id}
                        showCount={false}
                        product={filteredProducts}
                        index = {index}
                        url = {`/product/${filteredProducts.id}`}
                    />
                ))}
            </IonContent>
        </IonPage>
    );
};

export default Search;