'use client'


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import prisma from "@/lib/db";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";



export default function SignupPage() {

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    function validate(singUpFormData: FormData) {
        let valid = true;

        const email = singUpFormData.get("email") as string;
        const password = singUpFormData.get("password") as string;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // email ar jonno regular expression

        //email valiation
        if (!emailRegex.test(email)) {
            setEmailError("Input Valid Email");
            valid = false;
        } else {
            setEmailError("");
        }

        //password validation

        if (password.length <= 5) {
            setPasswordError("Password must me more than 5 charecters");
            valid = false;
        }
        else {
            setPasswordError("");
        }

        return valid;

    }



    async function handleFormSubmit(formData: FormData) {
        if (!validate(formData)) return;

        // calling our signUp server action
        await fetch("/signup-action", {
            method: "POST",
            body: formData,
        })

        alert("Registration Successfull");

        redirect("/login");
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
                action={handleFormSubmit}
                className="container mx-auto w-96 border text-center rounded-2xl p-4 flex flex-col gap-4"
            >
                <h1 className="mb-2 font-semibold text-green-500">Please Sign Up</h1>

                <div>
                    <Label>Name</Label>
                    <Input name="name" />
                </div>

                <div>
                    <Label>Email</Label>
                    <Input name="email" type="email" />

                    {emailError && (
                        <p className="text-red-500 text-sm mt-1">{emailError}</p>
                    )}
                </div>

                <div>
                    <Label>Password</Label>
                    <Input name="password" type="password" />

                    {passwordError && (
                        <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                    )}
                </div>

                <Button type="submit" className="bg-gray-500">
                    Sign Up
                </Button>

                <Link href={"/login"}>
                    <p className="text-sm text-orange-400 hover:underline">
                        Allready have an account?
                    </p>
                </Link>

            </form>
        </div>
    )

}