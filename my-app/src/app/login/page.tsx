'use client'
import LoginForm from "@/components/ui/loginform";

export default async function Login(){
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return(
        <>
        <LoginForm />
        </>
    )
}