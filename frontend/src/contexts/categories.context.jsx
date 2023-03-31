import { createContext, useEffect, useState } from 'react';

//import PRODUCTS from '../shop-data.json';
import SHOP_DATA from '../shop-data.js';

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  
  // only run when provider has mounted
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategories(); // db
      console.log(categoryMap)
      setCategoriesMap(categoryMap)
    }
    getCategoriesMap();
  }, [])
  
  const value = { categoriesMap };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};


export const getCategories = async () => {
  // db call
  let categoryMap = {};
  return categoryMap;
}
/*
{
    hats: {
      title: 'Hats',
      items: [
        {},
        {}
      ]
    },
    sneakers: {
      title: 'Sneakers',
      items: [
        {},
        {}
      ]
    }.
}
*/