export const CheckBoxInput = ({ checked, onChange }) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="cursor-pointer w-4 h-4 rounded-[4px] shadow-md form-checkbox text-red-500"
    />
  );
};
