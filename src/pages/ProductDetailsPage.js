import React from 'react';
import Navvar from '../features/nav/Navvar';
import ProductDetails from '../features/product/component/ProductDetails';
import Footer from '../features/common/Footer';

function ProductDetailsPage() {
  return (
    <div>
      <Navvar>
        <ProductDetails />
      </Navvar>
      <Footer />
    </div>
  );
}

export default ProductDetailsPage;
