"use client";
import React from "react";
import { Flip, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

/**
 * Client サイドで利用しなければならないプロバイダー
 */
export default function ClientProviders({ children }: { children: React.ReactNode }) {
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
