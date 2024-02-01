export const customStyles = randomStyle => ({
  control: (base, state) => ({
    ...base,

    borderRadius: 14,
    padding: '0 14px 0 18px',
    border: 'none',
    cursor: 'pointer',
    borderColor: state.isFocused ? randomStyle.btn : 'gray',
    boxShadow: state.isFocused ? null : null,
    '&:hover': {
      borderColor: state.isFocused ? randomStyle.btn : 'gray',
    },
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    padding: 0,
    margin: 0,
  }),
  singleValue: (provided, state) => ({
    ...provided,
    padding: 0,
    margin: 0,
  }),
  input: (provided, state) => ({
    ...provided,
    padding: 0,
    margin: 0,
  }),
  indicatorContainer: (provided, state) => ({
    ...provided,
    padding: 0,
    margin: 0,
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    padding: 0,
    margin: 0,
    transition: 'transform .3s ease',
    transform: state.selectProps.menuIsOpen && 'rotate(180deg)',
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isSelected ? randomStyle.btn : null,
      color: isSelected ? 'white' : 'black',
      cursor: 'pointer',
    };
  },
  menu: (provided, state) => ({
    ...provided,
    width: 198,
    borderRadius: 12,
    marginTop: 0,
  }),
  menuList: (provided, state) => ({
    ...provided,
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: '#f1f1f1',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#888',
      borderRadius: '8px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#555',
    },
  }),
});