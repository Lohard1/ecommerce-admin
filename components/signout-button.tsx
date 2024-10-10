import { signOut } from "@/auth"
 
export function SignOutButton() {
  return (
    <div className="flex w-full h-fit justify-center bg-blue-200">
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <button type="submit" className="text-black bg-white text-lg p-2 border-4 border-gray-200 rounded-full">Sign Out</button>
    </form>
    </div>
  )
}