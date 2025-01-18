import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="max-w-7xl mx-auto max-h-screen mb-36 px-20 pt-[70px] pb-1">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-20">
                <Link href="/" className="hover:text-[#DB4444]">
                    Home
                </Link>
                <span>/</span>
                <span>404 Error</span>
            </nav>

            {/* Main Content */}
            <div className="max-w-2xl mx-auto text-center space-y-6">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-medium">
                    404 Not Found
                </h1>
                <p className="text-lg text-gray-600">
                    Your visited page not found. You may go home page.
                </p>
                <div className="pt-4">
                    <Link
                        href="/"
                        className="inline-block px-8 py-4 bg-[#DB4444] text-white rounded-md hover:bg-opacity-90 transition-colors"
                    >
                        Back to home page
                    </Link>
                </div>
            </div>
        </div>
    )
}

