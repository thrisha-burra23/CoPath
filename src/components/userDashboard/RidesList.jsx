import RideCard from './RideCard'

const RidesList = () => {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Available Rides</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <RideCard />
        <RideCard />
        <RideCard />
        <RideCard />
        <RideCard />
        <RideCard />
      </div>
    </section>
  )
}

export default RidesList