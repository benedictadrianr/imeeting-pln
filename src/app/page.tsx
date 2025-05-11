import { getCurrentUser } from "@/auth/currentUser";
import SignInForm from "@/components/landing/sign-in-form";

export default async function Home() {
  await getCurrentUser({ redirectIfFound: true });
  return (
    <div className="flex items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main>
        <h1>Welcome to iMeeting</h1>
        <h3>by GA PLN</h3>
        <SignInForm />
      </main>
    </div>
  );
}
