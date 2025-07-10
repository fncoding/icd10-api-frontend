import Logo from './Logo.jsx';
export default function Navbar() {
    return (
        <div className="navbar bg-base-100 shadow-sm fixed top-0 left-0 right-0 z-50">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">icd10-api</a>
            </div>
            <div className="flex-none">

        <button>
            <Logo/>
        </button>
            </div>
        </div>
    )
}