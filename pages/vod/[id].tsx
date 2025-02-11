import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SingleVod from '@/components/SingleVod/SingleVod';
import { getProductById } from 'services/productServices';
import { IProducts } from '@/ts/models/Product.service';

const Vod = () => {
  const router = useRouter();
  const { id: productId } = router.query;
  const [product, setProduct] = useState<IProducts | null>(null);

  useEffect(() => {
    if (productId) {
      getProductById(productId)
        .then((response: any) => {
          setProduct(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [productId]);

  return (
    <div>
      {productId && product && (
        <SingleVod productIdVod={productId} productVod={product} />
      )}
    </div>
  );
};

export default Vod;
