import './InputField.css';

function InputField({ label, name, type = 'text', placeholder, datalistOptions = [], value, onChange, required, ...props}) {
  const datalistId = `${name}-list`;

  return (
    <div className="input-field">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        list={datalistOptions.length > 0 ? datalistId : undefined}
        value={value}
        onChange={onChange}
        required={required}
        {...props}
      />
      {datalistOptions.length > 0 && (
        <datalist id={datalistId}>
          {datalistOptions.map((option, index) => (
            <option key={index} value={option} />
          ))}
        </datalist>
      )}
    </div>
  );
}

export default InputField;
