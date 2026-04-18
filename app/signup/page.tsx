'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";


export default function SignupPage() {

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    function validate(formData: FormData) {
        let valid = true;

        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            setEmailError("Input Valid Email");
            valid = false;
        } else {
            setEmailError("");
        }

        if (password.length <= 5) {
            setPasswordError("Password must be more than 5 characters");
            valid = false;
        } else {
            setPasswordError("");
        }

        return valid;
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget); // Add this line

        if (!validate(formData)) return; // Add validation call

        const res = await fetch("/signup-action", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.error);
            return;
        }

        window.location.href = "/login";
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
                onSubmit={handleSubmit}
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
                    {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                </div>

                <div>
                    <Label>Password</Label>
                    <Input name="password" type="password" />
                    {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                </div>

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
}