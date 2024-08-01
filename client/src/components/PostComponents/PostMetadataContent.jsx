export default function PostMetadataContent({ post }) {
  return (
    <>
      <div className="mx-auto flex w-full max-w-2xl justify-between border-b border-slate-500 py-3 text-xs font-semibold">
        <span>{new Date(post.updatedAt).toLocaleDateString()}</span>
        <span className="italic">
          {(post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>
    </>
  )
}
