import { createContext, useEffect, useState } from 'react';
import axios from "axios";
//import PRODUCTS from '../shop-data.json';
//import SHOP_DATA from '../../../app/app/fixtures/shop-data.js';

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  
  // only run when provider has mounted
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategories(); // db
      console.log(categoryMap.data)
    //  setCategoriesMap(SHOP_DATA )
      setCategoriesMap(categoryMap.data.items)
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
  let categoryMap = await axios.get('products', {

  })
  console.log(categoryMap)
 // let categoryMap = {};
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