export const Button = ({
  text,
  onclick,
  type = "button",
  px = "px-3",
  py = "py-2",
  width = "w-[100px]",
}) => {
  return (
    <button
      type={type}
      onClick={onclick}
      className={`bg-primary ${width} h-[39px] text-white rounded-[8px] ${py} ${px} hover:bg-primary/75 hover:text-white cursor-pointer transition-all duration-300 ease-in-out`}
    >
      <span className="text-[16px] leading-[19px] font-semibold">{text}</span>
    </button>
  );
};
