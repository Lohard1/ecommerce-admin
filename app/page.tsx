import { signIn } from "@/auth";
import Layout from "@/components/layout";
import { Nav } from "@/components/nav";
import { SignOutButton } from "@/components/signout-button";
import UserSession from "@/components/user-session";
import Link from "next/link";

export default async function Home({}) {
  return (
      <div>
        <Layout>
          Hi
        </Layout>

      </div>
  );
}
