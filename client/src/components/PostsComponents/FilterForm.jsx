import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import FilterInput from "./FilterInput"
import FilterSelect from "./FilterSelect"
import SubmitButton from "./FilterSubmitButton"
import {
  updateUrlParams,
  getInitialFilterValues,
} from "../../utils/helpers/urlHelpers"
import { CATEGORIES } from "../../utils/constants/categories"

function FilterForm({ isOpen }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState(
    getInitialFilterValues(location.search),
  )

  const handleChange = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`/posts?${updateUrlParams(formValues)}`)
  }

  return (
    <form
      className={`mt-4 gap-4 ${isOpen ? "flex" : "hidden"} flex-col items-center justify-center lg:mr-12 lg:mt-1 lg:flex-row`}
      onSubmit={handleSubmit}
    >
      <FilterInput
        label="Search Term:"
        name="searchTerm"
        value={formValues.searchTerm}
        onChange={handleChange}
      />
      <FilterSelect
        label="Category:"
        name="category"
        value={formValues.category}
        onChange={handleChange}
        options={CATEGORIES}
      />
      <FilterSelect
        label="Sort:"
        name="sort"
        value={formValues.sort}
        onChange={handleChange}
        options={[
          { value: "desc", label: "Latest" },
          { value: "asc", label: "Oldest" },
        ]}
      />
      <SubmitButton />
    </form>
  )
}

export default FilterForm
