import "react-native-url-polyfill/auto";
import * as SecureStore from "expo-secure-store";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/database.types";

const ExpoSecureStoreAdapter = {
    getItem: (key: string) => {
        return SecureStore.getItemAsync(key);
    },
    setItem: (key: string, value: string) => {
        SecureStore.setItemAsync(key, value);
    },
    removeItem: (key: string) => {
        SecureStore.deleteItemAsync(key);
    },
};

const supabaseUrl = "https://fdlnqyojnbybbjjuhsrv.supabase.co";
const supabaseAnonKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkbG5xeW9qbmJ5YmJqanVoc3J2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgxOTkzMDcsImV4cCI6MjA0Mzc3NTMwN30.gLSnCC7cN7uyYGAjFKWQ-RmfR3jlnGm7FEHtwqoz-hQ";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: ExpoSecureStoreAdapter as any,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});
