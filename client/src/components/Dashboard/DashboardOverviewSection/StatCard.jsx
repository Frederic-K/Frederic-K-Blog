import { HiArrowNarrowUp } from "react-icons/hi"

const StatCard = ({ title, total, lastMonth, Icon, bgIconColor }) => {
  return (
    <div className="flex w-full flex-col gap-4 rounded-md p-3 shadow-md md:w-72 dark:bg-slate-800">
      <div className="flex justify-between">
        <div>
          <h3 className="text-md uppercase text-zinc-500">Total {title}</h3>
          <p className="text-2xl">{total}</p>
        </div>
        <Icon
          className={`rounded-full ${bgIconColor} p-3 text-5xl text-zinc-200 shadow-lg`}
        />
      </div>
      <div className="flex gap-2 text-sm">
        <span className="flex items-center text-green-500">
          <HiArrowNarrowUp />
          {lastMonth}
        </span>
        <div className="text-zinc-500">Last month</div>
      </div>
    </div>
  )
}

export default StatCard
