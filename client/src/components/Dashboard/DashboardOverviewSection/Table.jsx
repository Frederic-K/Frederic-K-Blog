import { Table } from "flowbite-react"

const TableComponent = ({ headers, data, renderRow }) => {
  return (
    <Table hoverable>
      <Table.Head>
        {headers.map((header, index) => (
          <Table.HeadCell key={index}>{header}</Table.HeadCell>
        ))}
      </Table.Head>
      <Table.Body className="divide-y">
        {data.map((item, index) => (
          <Table.Row
            key={index}
            className="bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-800"
          >
            {renderRow(item)}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default TableComponent
