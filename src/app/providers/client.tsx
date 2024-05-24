"use client";
import axios from "axios";
import React from "react";
import { Flip, ToastContainer } from "react-toastify";

import { getBaseUrl } from "@/utils";

import "react-toastify/dist/ReactToastify.css";

/**
 * Client サイドで利用しなければならないプロバイダー
 */
export default function ClientProviders({ children }: { children: React.ReactNode }) {
    const baseUrl = getBaseUrl();

    axios.defaults.baseURL = baseUrl;
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    if (apiKey) {
        axios.defaults.headers.common["x-api-key"] = apiKey;
    }
    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
                theme="light"
                icon={false}
                transition={Flip}
            />
            {children}
        </>
    );
}
