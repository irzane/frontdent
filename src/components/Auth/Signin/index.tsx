"use client";
import Link from "next/link";
import React from "react";
import SigninWithPassword from "../SigninWithPassword";

export default function Signin() {
  return (
    <>
      <div>
        <SigninWithPassword />
      </div>

      <div className="mt-6 text-center">
        <p>
          Vous n&apos;avez pas de compte ?{" "}
          <Link href="/auth/signup" className="text-primary">
            Inscrivez-vous
          </Link>
        </p>
      </div>
    </>
  );
}
