import WsProvider from "@/components/ws-provider";
import { getAuth } from "@/utils/auth";

export type AuthUser = {
  id: string;
  username: string;
  isGuest: boolean;
};

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, token } = await getAuth();

  console.log("user : ", user);
  console.log("token : ", token);

  return (
    <>
      <WsProvider initialToken={token} initialUser={user}>
        {children}
      </WsProvider>
    </>
  );
}
