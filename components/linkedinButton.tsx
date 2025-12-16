"use client";

export default function LinkedinButton() {
    return (
        <button
            type="button"
            onClick={() => window.location.href = "https://www.linkedin.com/in/mathieu-f-65b7a6238/"}
            className="py-2 px-4 max-w-md flex justify-center items-center bg-blue-700 hover:bg-blue-800 focus:ring-blue-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg mt-2"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="mr-2"
                viewBox="0 0 16 16"
            >
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.52 1.248 1.327 1.248h.016zm4.908 8.212h2.4V9.359c0-.204.015-.408.075-.553.165-.408.54-.83 1.17-.83.825 0 1.155.627 1.155 1.546v3.872h2.4V9.25c0-2.22-1.185-3.252-2.766-3.252-1.276 0-1.845.7-2.165 1.193h.016V6.169h-2.4c.03.673 0 7.225 0 7.225z" />
            </svg>
            Connect on LinkedIn
        </button>
    );
}
