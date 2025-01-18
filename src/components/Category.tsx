import { Smartphone, Monitor, Watch, Camera, Headphones, Gamepad, ChevronLeft, ChevronRight } from 'lucide-react'

const categories = [
  {
    icon: Smartphone,
    name: 'Phones',
    active: false
  },
  {
    icon: Monitor,
    name: 'Computers',
    active: false
  },
  {
    icon: Watch,
    name: 'SmartWatch',
    active: false
  },
  {
    icon: Camera,
    name: 'Camera',
    active: false
  },
  {
    icon: Headphones,
    name: 'HeadPhones',
    active: false
  },
  {
    icon: Gamepad,
    name: 'Gaming',
    active: false
  }
]

export default function BrowseCategories() {
  return (
    <div className="max-w-[1170px] mx-auto px-4 py-8">
      <div className="flex flex-col mb-8">
        <div className="flex items-center gap-2">
          <div className="w-5 h-8 rounded-[4px] bg-[#DB4444]" />
          <span className="text-[#DB4444] font-medium">Categories</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mt-4">
          <h2 className="text-2xl sm:text-3xl font-bold">Browse By Category</h2>
          <div className="flex gap-2">
            <button className="p-2 rounded-full border hover:bg-gray-100">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full border hover:bg-gray-100">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 border rounded-[4px] cursor-pointer transition-colors hover:bg-[#DB4444] hover:text-white group ${
              category.active ? 'bg-[#DB4444] text-white' : 'bg-white'
            }`}
          >
            <category.icon 
              className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 mb-2 sm:mb-3 lg:mb-4 ${
                category.active ? 'text-white' : 'text-black group-hover:text-white'
              }`}
            />
            <span className="text-xs sm:text-sm font-medium text-center">{category.name}</span>
          </div>
        ))}
      </div>
      <div className="w-full h-px bg-gray-200 mt-12 sm:mt-16 lg:mt-20" />
    </div>
  )
}

