import Link from "next/link";

export default function Navbar() {
    return (
        <div className="flex h-[60px] px-[100px] justify-between items-center">
            <Link href={'/'}>
                <p>Logo</p>
            </Link>
            <div className="flex gap-2">
                <Link href={'/register'}>Register</Link>
                <Link href={'/login'}>Login</Link>
            </div>
        </div>
    )
}