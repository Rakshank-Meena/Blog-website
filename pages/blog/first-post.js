import dynamic from "next/dynamic";
const Layout = dynamic(() => import("../../components/BlogInput.js"), { ssr: false })
import NoSSR from '../../components/SSRDisable'

export default function FirstPost() {
  return (
    <NoSSR>
      <Layout />
    </NoSSR>
  )
}