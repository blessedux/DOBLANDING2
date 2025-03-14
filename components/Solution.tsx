import Image from "next/image"

export default function Solution() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6 dark:text-gray-100">
              Now you can own a piece of the digital future
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              DobProtocol splits ownership of valuable machines into affordable digital shares, giving you access to steady income from technology that's building tomorrow's world.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-500 dark:text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="dark:text-gray-300">Invest in real-world machines with as little as $10</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-500 dark:text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="dark:text-gray-300">Receive automatic payments as your devices generate revenue</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-500 dark:text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="dark:text-gray-300">Build a diverse portfolio of income-producing technology</span>
              </li>
            </ul>
          </div>
          
          {/* Right side placeholder for illustration */}
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-8 flex items-center justify-center min-h-[400px] transition-colors duration-300">
            <div className="text-center">
              <p className="font-semibold text-blue-800 dark:text-blue-300 mb-4">Illustration Suggestion:</p>
              <p className="text-blue-700 dark:text-blue-400">
                Create an animation showing a physical device (solar panel or router) breaking into digital tokens/shares that flow to diverse people's wallets. Show the machine continuing to operate while sending income to multiple owners.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

