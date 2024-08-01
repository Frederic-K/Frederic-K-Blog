export default function PostContent({ content, className }) {
  return (
    <div
      className={`mx-auto w-full max-w-2xl py-2 font-semibold`}
      dangerouslySetInnerHTML={{
        __html: `<div class="${className}">${content}</div>`,
      }}
    ></div>
  )
}
