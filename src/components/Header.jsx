import { useAppContext } from "../context/Context";

export const Header = () => {
  const navigationItems = [
    "기본정보 관리",
    "투자유형 관리",
    "입출금내역 조회",
    "영업내역 조회",
    "투자내역 조회",
    "채권내역 조회",
    "SMS 관리",
    "상담내역 관리",
    "1:1문의내역 조회",
  ];

  const { activeNav, setActiveNav } = useAppContext();

  return (
    <header className="w-full sticky left-0 top-0 bg-white pt-[40px] pb-[16px] h-[92px] z-40 px-4 lg:px-0">
      <div className="flex flex-row items-center py-4 bg-white border-b border-b-[#d7d8da] gap-4 w-full max-w-7xl mx-auto">
        <h1 className="text-[24px] leading-[28.64px] font-bold">회원상세</h1>
        <div className="flex gap-1 relative">
          <div className="bg-[#FF4D4F] w-[6px] h-[6px] rounded-full absolute -left-2 -top-1"></div>
          <span className="text-[#FF4D4F] text-[14px] leading-[16.8px] pl-1">
            필수항목
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <nav className="flex items-center w-full max-w-7xl mx-auto py-3 h-[39px] bg-[#ebeef3] px-4 lg:px-0 overflow-x-auto">
            {navigationItems.map((navItem, index) => (
              <div
                className={`py-[10px] px-3 h-[39px] cursor-pointer hover:bg-primary hover:text-white ${
                  activeNav === navItem
                    ? "bg-primary text-white"
                    : "bg-[#ebeef3] text-[#b1b4bb]"
                }`}
                key={index}
                onClick={() => setActiveNav(navItem)}
              >
                <span className="whitespace-nowrap">{navItem}</span>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};
