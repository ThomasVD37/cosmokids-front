
import HeroHeader from "../../components/HeroHeader/HeroHeader";
import SelectedContents from "../../components/HomeSelectedContents/HomeSelectedContents";
import styles from "./Home.module.scss";

const Home = () => {
    return (
        <div className={styles.homeContainer}>
            <HeroHeader />
            <SelectedContents />
        </div>
    )
};

export default Home;



