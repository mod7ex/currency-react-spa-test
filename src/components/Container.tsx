import styles from "~/assets/scss/modules/container.module.scss";

type Props = React.ComponentProps<"div">;

const Container: React.FC<React.PropsWithChildren<Props>> = ({ children, className, ...props }) => {
  const _className = [styles.container, className ?? ""].join(" ");

  return (
    <div className={_className} {...props}>
      {children}
    </div>
  );
};

export default Container;
