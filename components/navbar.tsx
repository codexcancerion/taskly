export default function Navbar() {
    return (
        <header className="w-full bg-slate-100">
            <nav className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
                <a
                    href="/"
                    className="text-lg font-extrabold tracking-wide"
                >
                    Taskly.
                </a>

                <div className="flex gap-6 text-sm">
                    <a href="/tasks">
                        Tasks
                    </a>
                </div>

            </nav>
        </header>
    )
}
