// import { useParams } from "next/navigation";
// import React, { useEffect, useState } from "react";
import ProductsList from "../_components/ProductsList";
import { getCategories, getProductsByCategory } from "@/app/_utils/Api";
import TopCategoryList from "../_components/TopCategoryList";

interface Category {
  slug: string;
  name: string;
  image: string;
}

interface CategoryPageProps {
  params: {
    categoryName: string;
  };
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { categoryName } = await params;
  // console.log(categoryName);
  const productsByCategoryList = await getProductsByCategory(categoryName);
  const categoryList: Category[] = (await getCategories()) || [];

  // const [productsByCategoryList, setProductsByCategoryList] = useState([]);
  // const [categoryList, setCategoryList] = useState([]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const products = await getProductsByCategory(categoryName);
  //     console.log("productsByCategoryList: ", products);
  //     setProductsByCategoryList(products);
  //   };
  //   fetchProducts();
  // }, [categoryName]);

  // useEffect(() => {
  //   async function fetchCategories() {
  //     try {
  //       const categories = await getCategories();
  //       setCategoryList(categories);
  //     } catch (error) {
  //       console.error("Failed to fetch categories:", error);
  //       return [];
  //     }
  //   }
  //   fetchCategories();
  // }, []);

  //  const categories = await fetchCategories();

  return (
    <div>
      <h2 className="bg-emerald-400 text-black font-bold p-4 text-center text-2xl capitalize ">
        {categoryName && decodeURIComponent(categoryName)}
      </h2>
      <TopCategoryList
        categoryList={categoryList}
        selectedCategory={categoryName && decodeURIComponent(categoryName)}
      />
      <ProductsList
        productsList={productsByCategoryList}
        heading={categoryName}
      />
    </div>
  );
};

export default CategoryPage;
