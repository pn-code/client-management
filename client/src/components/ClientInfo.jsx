import {FaEnvelope, FaPhone, FaIdBadge } from "react-icons/fa"

export default function ClientInfo({client}) {
  return (
    <>
        <h2>Client Information</h2>
        <ul>
            <li className="flex gap-2 items-center"><FaIdBadge/> {client.name}</li>
            <li className="flex gap-2 items-center"><FaEnvelope/> {client.email}</li>
            <li className="flex gap-2 items-center"><FaPhone/> {client.phone}</li>
        </ul>
    </>
  )
}
