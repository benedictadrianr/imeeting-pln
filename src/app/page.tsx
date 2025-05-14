import { getCurrentUser } from "@/auth/currentUser";
import SignInForm from "@/components/landing/sign-in-form";
import Image from "next/image";
import Icon from "../../public/icon.png";

export default async function Home() {
  const currentUser = await getCurrentUser({ redirectIfFound: true });
  console.log("currentUser", currentUser);
  return (
    <div className="flex items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-[#4fd8f0]">
      <main className="border-1 border-zinc-300 drop-shadow-xl rounded-lg bg-white p-4 flex flex-col">
        <Image width={80} className="self-center" alt="PLN ICON" src={Icon} />
        <h1 className="self-center text-lg font-semibold">
          Welcome to iMeeting
        </h1>
        <h3 className="self-center mb-4 text-sm text-zinc-300">by GA PLN</h3>
        <SignInForm />
      </main>
    </div>
  );
}
