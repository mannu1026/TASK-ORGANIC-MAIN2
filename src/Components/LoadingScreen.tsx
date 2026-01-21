const LoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-white text-gray-700">
      <img
        src="https://cdn-icons-png.flaticon.com/512/833/833593.png"
        alt="Loading"
        className="w-28 h-28 mb-6 animate-pulse"
      />

      <div className="flex items-center gap-3 mb-2">
        <svg
          className="animate-spin h-6 w-6 text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
        <span className="text-lg font-medium">Please wait...</span>
      </div>

      <p className="text-sm text-gray-500">Fetching the latest artwork data for you</p>
    </div>
  );
};

export default LoadingScreen;
