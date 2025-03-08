"use client"
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


export default function Register() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post("http://localhost:4000/api/v1/auth/register", { name, email, password });

            if (res.status === 201) {
                alert("Registration successful! Redirecting to login...");
                router.push("/login"); // Redirect to login after success
            }
        } catch (error: any) {
            setError(error.response?.data?.error || "Registration failed!");
        }
    };

    return (
        <div>
            <h2>Register</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col justify-start items-start">
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}
