import { supabase } from "@/lib/supabase";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export const useInsertOrderSubscription = () => {
    const queryClient = useQueryClient();

    useEffect(() => {
        const ordersSubscription = supabase
            .channel("custom-insert-channel")
            .on(
                "postgres_changes",
                { event: "INSERT", schema: "public", table: "orders" },
                (payload) => {
                    console.log("Change received!", payload);
                    queryClient.invalidateQueries(["orders"]);
                }
            )
            .subscribe();

        return () => {
            ordersSubscription.unsubscribe();
        };
    }, []);
};
