const CurrencySymbol: React.FC<{ symbol: Currency["symbol"] }> = ({ symbol }) => {
  return (
    <b
      style={{
        fontWeight: "bold",
        textDecorationLine: "underline",
        margin: "0 5px",
      }}
    >
      {symbol}
    </b>
  );
};

export default CurrencySymbol;
