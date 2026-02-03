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
