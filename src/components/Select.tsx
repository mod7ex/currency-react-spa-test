import { memo, useMemo, useRef } from "react";
import styles from "~/assets/scss/modules/select.module.scss";
import useClickOutside from "~/hooks/useClickOutside";
import useToggle from "~/hooks/useToggle";

interface Option<T = any> {
  symbol: T;
  label: string;
}

interface Props<T = any> {
  options: Option<T>[];
  render?: (option: Option<T>) => React.ReactNode;
  onSelect?: (v: T) => void;
  current?: T;
  className?: string;
}

const _render: React.FC<Option> = ({ label }) => {
  return <button>{label}</button>;
};

const Select = memo<Props>(({ options, render, onSelect, current, className }) => {
  const selectRef = useRef<HTMLDivElement>(null!);

  const [isExpanded, toggle] = useToggle(false);

  useClickOutside(selectRef, () => {
    toggle(false);
  });

  const _onSelect = (v: Option["symbol"]) => {
    onSelect?.(v);
    toggle(false);
  };

  const _label = useMemo(() => {
    return options.find((o) => o.symbol === current)?.label ?? "--select--";
  }, [current]);

  const _class = [styles.wrapper, className].join(" ");

  return (
    <div ref={selectRef} className={_class}>
      <button className={styles.label} onClick={() => toggle()}>
        {_label}
      </button>

      {isExpanded && (
        <div className={styles.optionsWrapper}>
          <div className={styles.inner}>
            <ul className={styles.options}>
              {options.map((o, i) => (
                <li key={i} onClick={() => _onSelect(o.symbol)} className={styles.option}>
                  {render?.(o) ?? _render(o)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
});

export default Select;
