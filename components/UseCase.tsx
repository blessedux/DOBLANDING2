import Image from "next/image"

export default function UseCase() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
          Real World Application
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-4">EV Charger Network</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-500">
              <li>50% increase in operational efficiency</li>
              <li>30% boost in investor returns</li>
              <li>100% transparent profit distribution</li>
            </ul>
          </div>
          <div className="flex justify-center">
            <Image
              src="/placeholder.svg?height=300&width=400"
              alt="EV Charger Network Demonstration"
              width={400}
              height={300}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

