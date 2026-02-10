export default function ComingSoon() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="text-center max-w-md">
        <div className="mb-6 text-emerald-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-16 w-16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 6v6l4 2"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon</h1>

        <p className="text-gray-600 mb-6">
          This admin section is currently under development. It will be
          available very soon.
        </p>

        <button
          disabled
          className="cursor-not-allowed rounded-lg bg-emerald-600/50 px-6 py-2 text-white"
        >
          Feature in Progress
        </button>
      </div>
    </div>
  );
}
