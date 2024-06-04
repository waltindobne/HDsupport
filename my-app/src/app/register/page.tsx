"use client"
import Header from "@/components/ui/header";
import RegisterForm from "@/components/ui/registerform";

export default async function Register(){
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return(
        <>
        <RegisterForm/>
        </>
    )
}