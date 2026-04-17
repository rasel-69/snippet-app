'use client'


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/router";



export default function LoginPage() {
    const router = useRouter(); // Initialize router

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    function validate(formData: FormData) {
        let valid = true;

        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        //again checking email at login
        if (!emailRegex.test(email)) {
            setEmailError("Enter Valid Email");
            valid = false;
        }
        else {
            setEmailError("");
        }

        // checking password at login

        if (password.length <= 5) {
            setPasswordError("Enter password with proper length");
            valid = false;
        }
        else {
            setPasswordError("");
        }

        return valid;

    }

    async function formHandleSubmit(formData: FormData) {
        if (!validate(formData)) return;

        const res = await fetch("/login-action", {
            method: "POST",
            body: formData,
        })
        console.log("response is from login page", res);

        // waiting for Database Response through use server login action
        const data = await res.json();

        if (!res.ok) {
            alert(data?.error || "Login failed");
            return;
        }


        alert("Login Successfull");


        router.push("/");

    }








    return (
        <div>
            <Button variant="ghost" asChild className="mb-8 text-orange-500">
                <Link href="/">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Link>
            </Button>

            <form
                action={formHandleSubmit}
                className="container mx-auto w-96 border text-center rounded-2xl p-4 flex flex-col gap-4"
            >
                <h1 className="mb-2 font-semibold text-green-500">Login</h1>

                <div>
                    <Label>Email</Label>
                    <Input name="email" type="email" />
                    {
                        emailError && (<p className="text-red-400 text-sm">{emailError}</p>)
                    }
                </div>

                <div>
                    <Label>Password</Label>
                    <Input name="password" type="password" />
                    {
                        passwordError && (<p className="text-red-400 text-sm">{passwordError}</p>)
                    }
                </div>

                <Button type="submit" className="bg-gray-500">
                    Login
                </Button>

                <Link href={"/signup"}>
                    <p className="text-sm text-orange-400 hover:underline">
                        Don't have any account ?
                    </p>
                </Link>
            </form>
        </div>
    )
}