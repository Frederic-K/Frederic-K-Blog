import { Select } from "flowbite-react"

function FilterSelect({ label, name, value, onChange, options }) {
  return (
    <div className="flex w-full items-center gap-2 lg:w-56">
      <label className="w-36 font-semibold lg:w-32">{label}</label>
      <Select
        onChange={onChange}
        value={value}
        id={name}
        name={name}
        className="w-full"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  )
}

export default FilterSelect
