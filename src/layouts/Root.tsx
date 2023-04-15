import { Outlet } from "react-router-dom";
import styles from "~/assets/scss/modules/layout.module.scss";
import Container from "@/Container";
import CurrencySelector from "@/Partials/CurrencySelector";

const Root = () => {
  return (
    <>
      <header className={styles.header}>
        <Container>
          <CurrencySelector className={styles.selector} />
        </Container>
      </header>
      <main className={styles.main}>
        <Container className={styles.content}>
          <Outlet />
        </Container>
      </main>
      <footer className={styles.footer}>
        <Container>
          <p className={styles.content}>Copyright &copy;2023 CURRENCY</p>
        </Container>
      </footer>
    </>
  );
};

export default Root;
