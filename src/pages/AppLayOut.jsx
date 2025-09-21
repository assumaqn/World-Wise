import SideBar from "../components/SideBar";
import Map from "../components/Map";
import styles from "./AppLayOut.module.css";

function AppLayOut() {
  return (
    <div className={styles.app}>
      <SideBar />
      <Map />
    </div>
  );
}

export default AppLayOut;
