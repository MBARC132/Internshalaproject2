import { useState } from 'react';
import useFetchProducts from '../hooks/useFetchProduct';
import ProductItem from './ProductItem';
import './App.css';

function ProductList() {
    const { products, loading, error } = useFetchProducts();
    const [searchItem, setSearchItem] = useState('');

    if (loading) return <div>Loading Products....</div>;
    if (error) return <div>Error: {error}</div>;

    const filteredProducts = products.filter(product => 
        product.name?.toLowerCase().includes(searchItem.toLowerCase())
    );

    return (
        <>
            <input
                type="text"
                placeholder="Search Products..."
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
                className="search-input"
            />
            <div className="Product-list">
                {filteredProducts.map(product => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </div>
        </>
    );
}

export default ProductList;
