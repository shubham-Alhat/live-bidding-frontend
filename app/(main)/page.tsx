import HomeClient from "@/components/home-page";
import LandingPage from "@/components/landing-page";
import { getAuth } from "@/utils/auth";

export default async function Page() {
  const { user } = await getAuth();

  if (user && user.isGuest) {
    return (
      <>
        <LandingPage />
      </>
    );
  }

  return (
    <>
      <HomeClient />
    </>
  );
}
