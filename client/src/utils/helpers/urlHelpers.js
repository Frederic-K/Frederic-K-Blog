export const getInitialFilterValues = (searchParams) => {
  const params = new URLSearchParams(searchParams)
  return {
    searchTerm: params.get("searchTerm") || "",
    category: params.get("category") || "",
    sort: params.get("sort") || "desc",
  }
}

export const updateUrlParams = (filterData) => {
  const params = new URLSearchParams()
  Object.entries(filterData).forEach(([key, value]) => {
    if (value) params.append(key, value)
  })
  return params.toString()
}
