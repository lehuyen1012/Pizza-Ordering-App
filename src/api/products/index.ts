import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../lib/supabase";
import { Product } from "../../types";

export const useProductList = () => {
    return useQuery<Product[]>({
        queryKey: ["products"],
        queryFn: async () => {
            const { data, error } = await supabase.from("products").select("*");
            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
    });
};
