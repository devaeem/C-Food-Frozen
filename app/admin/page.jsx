"use client";
import React, { useEffect } from "react";
import AdminLayout from "../components/admin/adminLayout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

console.log('session', session)
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);


  return (
    <>
      <AdminLayout>
        <h1 className="text-4xl font-extrabold ">Wellcome Admin คุณ {session.user.username}</h1>

      </AdminLayout>
    </>
  );
};

export default Page;
