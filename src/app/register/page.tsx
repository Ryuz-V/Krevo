"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";

function CustomGoogleButton({ onSuccess, onError }: { onSuccess: (res: any) => void, onError: () => void }) {
  const [isLoading, setIsLoading] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setIsLoading(true);
      onSuccess(codeResponse);
    },
    onError: () => {
      setIsLoading(false);
      onError();
    },
  });

  return (
    <button
      onClick={() => login()}
      disabled={isLoading}
      type="button"
      className="flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white py-2.5 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
    >
      <div className="flex items-center gap-3 -ml-4">
        {isLoading ? (
          <div className="h-5 w-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
        ) : (
          <svg className="h-5 w-5" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          <path d="M1 1h22v22H1z" fill="none" />
        </svg>
        )}
        <span className="text-sm font-semibold text-gray-500 tracking-wide font-sans">
          Google
        </span>
      </div>
    </button>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("register clicked");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();
    console.log(data);
    router.push("/login");
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: credentialResponse.credential, accessToken: credentialResponse.access_token })
      });
      const data = await res.json();
      if (data.token) {
        document.cookie = `token=${data.token}; path=/`;
        const searchParams = new URLSearchParams(window.location.search);
        const redirectPath = searchParams.get("redirect") || "/home";
        router.push(redirectPath);
        router.refresh();
      } else {
        alert(data.message || "Google Register failed");
      }
    } catch (err) {
      console.error("Google Register Error:", err);
      alert("Terjadi kesalahan saat otentikasi dengan Google");
    }
  };

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "dummy_client_id"}>
      <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-white px-4 mt-6">
        <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-2xl border border-gray-200">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Daftar <span className="font-black tracking-tighter">KREVO.ID</span>
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Buat akun baru untuk memulai
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  placeholder="Masukkan nama"
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Masukan Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Masukan Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Daftar Sekarang
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-gray-500">
                  Atau daftar menggunakan
                </span>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <CustomGoogleButton
                onSuccess={handleGoogleSuccess}
                onError={() => alert("Google Login Failed")}
              />
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-600">
            Sudah memiliki akun?{" "}
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              Masuk
            </Link>
          </p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}