import dynamic from "next/dynamic"

const Navbar =dynamic(()=>import("./Navbar"),{ssr:false}) 
const Layout = ({ children }) => {
    return (
        <>
        <div className="content">
            <Navbar/>
            {children}
        </div>
        </>
    )
}

export default Layout