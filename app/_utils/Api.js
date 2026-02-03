import supabase from "../supabase";

export const getFeaturedProducts = async () => {
  let { data, error } = await supabase.from("products").select("id");
};
