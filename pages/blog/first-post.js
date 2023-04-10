import dynamic from "next/dynamic";
const Layout=dynamic(()=>import("../../Components/BlogInput.js"))


export default function FirstPost() {
  return (<>
    <Layout />
  </>)
}