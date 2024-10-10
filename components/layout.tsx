import { Children } from "react";
import { Nav } from "./nav";
import UserSession from "./user-session";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen w-screen bg-blue-800">
            <div className="">
                <Nav></Nav>
            </div>
            {/* <p className="text-white text-lg py-2 font-semibold">
            Ecommerce admin panel
          </p>
        </div>
  
        <div className="flex flex-col h-full w-full place-content-center bg-blue-100">
          <div className="flex w-full h-fit justify-center bg-blue-200 ">
            <form className="" action={async () => {
              "use server"
              await signIn("github")
            }}>
              <button type="submit" className="text-black bg-white text-lg p-2 rounded-full">
                Login with GitHub
              </button>
            </form>
          </div>
          <div className="flex w-full h-fit justify-center bg-blue-200">
            <form className="" action={async () => {
              "use server"
              await signIn("google")
            }}>
              <button type="submit" className="text-black bg-white text-lg p-2 border-4 border-gray-200 rounded-full">
                Login with Google
              </button>
            </form>
          </div>
          <SignOutButton></SignOutButton> */}
            <div className="flex flex-col h-auto w-full m-2 ml-0 rounded-lg bg-white p-4">
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
}