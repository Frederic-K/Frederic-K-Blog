import { TextInput } from "flowbite-react"

function FilterInput({ label, name, value, onChange }) {
  return (
    <div className="flex w-full items-center gap-2 lg:w-72">
      <label className="w-36 whitespace-nowrap font-semibold lg:w-32">
        {label}
      </label>
      <TextInput
        placeholder="Search..."
        id={name}
        name={name}
        type="text"
        value={value}
        onChange={onChange}
        className="w-full"
      />
    </div>
  )
}

export default FilterInput
