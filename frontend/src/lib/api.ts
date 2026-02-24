import { cache } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getHome = cache(
    async () => {
    const res = await fetch(`${BASE_URL}/`);

    if (!res.ok){
        throw new Error('Gagal mengambil data');
    }
    return res.json();
});