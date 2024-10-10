import { auth } from "../auth"

export default async function UserSession() {
  const session = await auth()

  if (session) {
    return (
      <div className="w-full h-fit text-xl font-bold text-center p-4">You are Logged In! {session.user?.email}</div>
    )
  } else
    return (
      <div className="w-full h-fit text-xl font-bold text-center p-4">
        You are Logged Out!
      </div>
    );
  
}