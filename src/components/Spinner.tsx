import url from "~/assets/svg/spinner.svg";

interface Props {
  width?: number;
  height?: number;
}

/**
 *
 * @param width 61
 * @param height 61
 * @returns JSX
 */
const Spinner: React.FC<Props> = ({ height, width }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <img src={url} alt="spinner" height={height ?? 61} width={width ?? 61} loading="lazy" />
    </div>
  );
};

export default Spinner;
