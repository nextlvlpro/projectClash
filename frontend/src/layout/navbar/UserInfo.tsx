import { useState } from "react"


export default function UserInfo() {
    const [expandUserInfo, setExpandUserInfo] = useState(false)
  return (
    <div className="hover:cursor-pointer">
       UserInfo
    </div>
  )
}
