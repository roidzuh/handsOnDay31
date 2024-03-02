import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./Menu.module.css";
import Layout from "../components/Layout";

const Menu = () => {
  const [menus, setMenus] = useState([]);

  const getMenuData = () => {
    axios
      .get("https://api.mudoapi.tech/menus?perPage=10")
      .then((res) => setMenus(res.data.data.Data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getMenuData();
  }, []);

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>Menu Page</h1>
        <div className={styles.menuList}>
          {menus.map((item) => (
            <div key={item.id} className={styles.menuItem}>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <img
                className={styles.menuImage}
                src={item.imageUrl}
                alt={item.name}
              />
              <div style={{ display: "flex" }}>
                <Link to={`/menu/${item.id}`}>
                  <button className={styles.button}>Detail</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <Link to="/menu/add">
          <button className={styles.button}>Add Menu</button>
        </Link>
      </div>
    </Layout>
  );
};

export default Menu;
