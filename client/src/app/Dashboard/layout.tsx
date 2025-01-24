import {SideNav} from "../../components/SideNav/SideNav";
import "./Dashboard.css"
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64" style={{margin:0, padding:0 }}>
        <SideNav/>
      </div>
      <div className="flex-1 overflow-auto home-content">
        {children}
      </div>
    </div>
  );
}