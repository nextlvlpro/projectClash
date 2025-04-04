import { useUser } from "../../UserContext"
import LoginRequired from "../../utils/LoginRequired";

export default function GlobalChat() {

  const { user, userVerified } = useUser()
  if (!user) {
    return (
      <div>
        <LoginRequired />
      </div>
    )
  }
  if (user && userVerified) {
    return (
      <div>
          welcome {user.name} to the global chat.
      </div>
    )
  }
}
