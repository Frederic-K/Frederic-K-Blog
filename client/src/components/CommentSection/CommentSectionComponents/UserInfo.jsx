export default function UserInfo({ user }) {
  return (
    <div className="mb-3 flex items-center gap-1 text-sm">
      <p>Signed in as:</p>
      <img
        className="h-5 w-5 rounded-full object-cover"
        src={user.profilePicture}
        alt={user.username}
      />
      <span className="font-bold">{user.username}</span>
    </div>
  )
}
