import supabase from "../supabase";

export const getFeaturedProducts = async () => {
  try {
    let { data, error } = await supabase.from("products").select("*");

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error Get Featured Products :", error.message);
    return null;
  }
};

export const getCategories = async () => {
  try {
    let { data, error } = await supabase.from("categories").select("*");

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error Get Featured Products :", error.message);
    return null;
  }
};

export const getProductById = async (productId) => {
  try {
    let { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error fetching product by id:", error.message);
    return [];
  }
};


export const getProductsByCategory = async(categoryName)=>{
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*, categories!inner(*)")
      .eq("categories.slug", categoryName);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error fetching products by category:", error.message);
    return [];
  }
}