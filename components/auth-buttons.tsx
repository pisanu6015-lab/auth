import { signIn, signOut } from "@/auth";

interface AuthButtonsProps {
  isLoggedIn: boolean;
  userName?: string | null;
}

export function AuthButtons({ isLoggedIn, userName }: AuthButtonsProps) {
  if (isLoggedIn) {
    return (
      <div className="user-info">
        <span>สวัสดี <strong>{userName}</strong></span>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button type="submit" className="logout">
            Logout
          </button>
        </form>
      </div>
    );
  }

  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button type="submit" className="logout" style={{ borderColor: "var(--accent)", color: "var(--accent)" }}>
        Login with Google
      </button>
    </form>
  );
}