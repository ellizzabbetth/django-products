import { useContext, Fragment } from 'react';

import { CategoriesContext } from '../../contexts/categories.context';
import CategoryPreview from '../../components/category-preview/category-preview.component';

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);
  

  return (
    <Fragment>
     {
          Object.values(categoriesMap).map((i) => {
            return (
              <CategoryPreview key={i.title} title={i.title} products={i.products} />
            )        
        })
     }
    </Fragment>
  );
};

export default CategoriesPreview;