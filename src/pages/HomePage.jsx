import React, { useState } from "react";
import DropDown from "../images/dropdown.svg";
import DropDownUp from "../images/dropdownup.svg";
import DoubleArrowLeft from "../images/double-chevron-left.svg";
import ArrowLeft from "../images/arrow-chevron-left.svg";
import Filter from "../images/filter3.svg";
import { useFormik } from "formik";
import { Button, CheckBoxInput } from "../components";
import { useAppContext } from "../context/Context";

const HomePage = () => {
  const { activeNav } = useAppContext();

  const [showApproval, setShowApproval] = useState(false);
  const approvalArray = ["승인여부 전체", "승인대기", "승인완료", "승인거부"];
  const [showDate, setShowDate] = useState(false);
  const dateArray = ["신청일시순", "승인일시순"];
  const [showApprovalStatus, setShowApprovalStatus] = useState(false);
  const approvalStatusArray = ["승인상태 변경", "승인완료", "승인거부"];
  const [showView, setShowView] = useState(false);
  const viewArray = ["50개씩 보기", "8개씩 보기"];
  const [showMobileFilter, setShowModalFilter] = useState(false);

  const handleDropDown = (dropDownType) => {
    if (dropDownType === "approval") {
      setShowApproval((prev) => !prev);
      setShowApprovalStatus(false);
      setShowDate(false);
      setShowView(false);
    } else if (dropDownType === "date") {
      setShowDate((prev) => !prev);
      setShowApproval(false);
      setShowApprovalStatus(false);
      setShowView(false);
    } else if (dropDownType === "approvalStatus") {
      setShowApprovalStatus((prev) => !prev);
      setShowApproval(false);
      setShowDate(false);
      setShowView(false);
    } else if (dropDownType === "view") {
      setShowView((prev) => !prev);
      setShowApproval(false);
      setShowDate(false);
      setShowApprovalStatus(false);
    }
  };

  const { values, setFieldValue } = useFormik({
    initialValues: {
      approval: "승인여부 전체",
      dateTime: "신청일시순",
      approvalStatus: "승인상태 변경",
      view: "50개씩 보기",
    },
    onSubmit: (values) => {},
  });

  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowData, setRowData] = useState(generateData());

  const rowsPerPage = parseInt(values.view.match(/\d+/)[0]);
  const totalPages = Math.ceil(rowData.length / rowsPerPage);

  function generateData() {
    let data = [];
    for (let i = 0; i < 100; i++) {
      const number = (i % 3) + 1;
      let fValue = `서류 식별 불가 금융투자업자에 계좌를 개설한지 1년 미만으로 전문투자자 승인 불가`;
      let bValue = `개인전문`;
      let eValue = `승인대기`;
      let gValue = `2023-01-10 09:00:00`;
      let hValue = `김관리자`;
      if (number === 1 || number === 3) {
        fValue = ""; // Empty value for f for numbers 1 and 3
      }

      if (number === 1) {
        gValue = "";
        hValue = "";
      }

      if (number === 2) {
        bValue = `소득적격`;
        eValue = `승인거부`;
      }

      if (number === 3) {
        eValue = `승인완료`;
      }
      data.push({
        number: i + 1,
        a: `소득적격`,
        b: bValue,
        c: `보기`,
        d: `2023-01-10 09:00:00`,
        e: eValue,
        f: fValue,
        g: gValue,
        h: hValue,
        selected: false,
      });
    }
    return data;
  }

  const handleHeaderCheckboxChange = () => {
    setRowData(
      rowData.map((row) => ({
        ...row,
        selected: !selectAll,
      }))
    );
    setSelectAll(!selectAll);
  };

  const handleCheckboxChange = (index) => {
    const newData = [...rowData];
    newData[index].selected = !newData[index].selected;
    setRowData(newData);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderRows = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    if (activeNav === "투자유형 관리") {
      return rowData.slice(startIndex, endIndex).map((row, index) => (
        <tr
          key={index}
          className={`h-[44px] w-full px-3 text-center text-[14px] leading-[18px] font-medium ${
            row.number % 2 === 0 && "bg-[#f9f9fb]"
          }`}
        >
          <td className="w-[39px] px-3 whitespace-nowrap">
            <CheckBoxInput
              checked={row.selected}
              onChange={() => handleCheckboxChange(index + startIndex)}
            />
          </td>
          <td className="whitespace-nowrap px-2">{row.number}</td>
          <td className="whitespace-nowrap px-2">{row.a}</td>
          <td className="whitespace-nowrap px-2">{row.b}</td>
          <td className="whitespace-nowrap px-2">
            <span className="text-center w-[61px] h-[29px] px-[18px] py-[6px] rounded-[8px] bg-[#EBEEF3] border border-[#D7D8DA]">
              {row.c}
            </span>
          </td>
          <td className="whitespace-nowrap px-2">{row.d}</td>
          <td className="whitespace-nowrap px-2">
            <span
              className={`py-[2px] px-[10px] rounded-[10px] font-medium ${
                row.e === "승인거부"
                  ? "bg-[#FEE2E2] text-[#991B1B]"
                  : row.e === "승인완료"
                  ? "bg-[#DCFCE7] text-[#166534]"
                  : "bg-[#FFEDD5] text-[#9A3412]"
              }`}
            >
              {row.e}
            </span>
          </td>
          <td className="w-[341px] text-left whitespace-nowrap px-2">
            {row.f}
          </td>
          <td className="whitespace-nowrap px-2">{row.g}</td>
          <td className="whitespace-nowrap px-2">{row.h}</td>
        </tr>
      ));
    } else {
      return (
        <tr className="h-[204px] w-full px-3 text-center">
          <td colSpan="8" rowSpan="5" className="text-center">
            조회 결과가 없습니다.
          </td>
        </tr>
      );
    }
  };

  const renderPagination = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - 4);
    let endPage = Math.min(startPage + 9, totalPages);

    if (endPage - startPage < 9) {
      startPage = Math.max(1, endPage - 9);
    }

    if (totalPages > 10 && currentPage > 5) {
      endPage = Math.min(currentPage + 4, totalPages);
      startPage = endPage - 9;
    }

    for (let i = startPage; i <= endPage; i++) {
      const isActive = i === currentPage;
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`mx-1 px-3 py-1 rounded-lg ${
            isActive ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  const selectedCheckboxCount = rowData.filter((row) => row.selected).length;

  return (
    <div className="pt-[93px] flex flex-col max-w-7xl mx-auto px-4 lg:px-0">
      <div className="w-full flex items-center justify-between flex-row pb-4 bg-white  border-b border-b-[#d7d8da]">
        <div className="flex flex-row gap-2 items-center">
          <h2 className="text-[20px] leading-[23.87px] font-semibold">
            신청 목록
          </h2>
          <p className="text-[14px] leading-[16.71px] font-medium">
            (총 100명 | 승인대기 1건)
          </p>
        </div>
        <div className="hidden w-[458.58px] items-center gap-1 h-[39px] lg:flex">
          {/*Approval*/}
          <div
            className="bg-white relative h-[39px] w-[150.15px] rounded-[8px] px-3 py-[10px] border border-[#b1b4bb] cursor-pointer"
            onClick={() => {
              handleDropDown("approval");
            }}
          >
            <div className="flex items-center justify-between gap-2 w-full">
              <span className="text-[16px] leading-[19.09px] tracking-[-0.02px]">
                {values.approval}
              </span>
              <img
                src={showApproval === false ? DropDown : DropDownUp}
                alt="dropdown"
              />
            </div>

            {showApproval && (
              <div className="absolute top-[43px] left-0 w-full bg-white border border-[#b1b4bb] rounded-[8px] overflow-hidden z-[50]">
                {approvalArray.map((approval, index) => (
                  <div
                    className={`py-2 px-3 hover:bg-primary hover:text-white cursor-pointer ${
                      approval === values.approval && "bg-primary text-white"
                    }`}
                    onClick={() => {
                      setFieldValue("approval", approval);
                    }}
                    key={index}
                  >
                    {approval}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/*Date and Time*/}
          <div
            className="bg-white relative h-[39px] w-[150.15px] rounded-[8px] px-3 py-[10px] border border-[#b1b4bb] cursor-pointer"
            onClick={() => {
              handleDropDown("date");
            }}
          >
            <div className="flex items-center justify-between gap-2 w-full">
              <span className="text-[16px] leading-[19.09px] tracking-[-0.02px]">
                {values.dateTime}
              </span>
              <img
                src={showDate === false ? DropDown : DropDownUp}
                alt="dropdown"
              />
            </div>

            {showDate && (
              <div className="absolute top-[43px] left-0 w-full bg-white border border-[#b1b4bb] rounded-[8px] overflow-hidden z-50">
                {dateArray.map((date, index) => (
                  <div
                    className={`py-2 px-3 hover:bg-primary hover:text-white cursor-pointer ${
                      date === values.dateTime && "bg-primary text-white"
                    }`}
                    onClick={() => {
                      setFieldValue("dateTime", date);
                    }}
                    key={index}
                  >
                    {date}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/*View*/}
          <div
            className="bg-white relative h-[39px] w-[150.15px] rounded-[8px] px-3 py-[10px] border border-[#b1b4bb] cursor-pointer"
            onClick={() => {
              handleDropDown("view");
            }}
          >
            <div className="flex items-center justify-between gap-2 w-full">
              <span className="text-[16px] leading-[19.09px] tracking-[-0.02px]">
                {values.view}
              </span>
              <img
                src={showView === false ? DropDown : DropDownUp}
                alt="dropdown"
              />
            </div>

            {showView && (
              <div className="absolute top-[43px] left-0 w-full bg-white border border-[#b1b4bb] rounded-[8px] overflow-hidden z-50">
                {viewArray.map((viewValue, index) => (
                  <div
                    className={`py-2 px-3 hover:bg-primary hover:text-white cursor-pointer ${
                      viewValue === values.view && "bg-primary text-white"
                    }`}
                    onClick={() => {
                      setFieldValue("view", viewValue);
                    }}
                    key={index}
                  >
                    {viewValue}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div
          className="flex items-center justify-center cursor-pointer md:hidden"
          onClick={() => {
            setShowModalFilter((prev) => !prev);
          }}
        >
          <img src={Filter} alt="filter" />
        </div>

        {/*Filter Mobile Container */}

        {showMobileFilter && (
          <div className="bg-white absolute top-[150px] left-0 right-0 bottom-0 z-[60]">
            <div className="flex flex-col gap-4 px-4">
              <div className="flex items-end justify-end w-full">
                <img
                  src={Filter}
                  alt="filter"
                  onClick={() => {
                    setShowModalFilter(false);
                  }}
                />
              </div>
              {/*Approval*/}
              <div
                className="bg-white relative h-[39px] w-[150.15px] rounded-[8px] px-3 py-[10px] border border-[#b1b4bb] cursor-pointer"
                onClick={() => {
                  handleDropDown("approval");
                }}
              >
                <div className="flex items-center justify-between gap-2 w-full">
                  <span className="text-[16px] leading-[19.09px] tracking-[-0.02px]">
                    {values.approval}
                  </span>
                  <img
                    src={showApproval === false ? DropDown : DropDownUp}
                    alt="dropdown"
                  />
                </div>

                {showApproval && (
                  <div className="absolute top-[43px] left-0 w-full bg-white border border-[#b1b4bb] rounded-[8px] overflow-hidden z-[50]">
                    {approvalArray.map((approval, index) => (
                      <div
                        className={`py-2 px-3 hover:bg-primary hover:text-white cursor-pointer ${
                          approval === values.approval &&
                          "bg-primary text-white"
                        }`}
                        onClick={() => {
                          setFieldValue("approval", approval);
                        }}
                        key={index}
                      >
                        {approval}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/*Date and Time*/}
              <div
                className="bg-white relative h-[39px] w-[150.15px] rounded-[8px] px-3 py-[10px] border border-[#b1b4bb] cursor-pointer"
                onClick={() => {
                  handleDropDown("date");
                }}
              >
                <div className="flex items-center justify-between gap-2 w-full">
                  <span className="text-[16px] leading-[19.09px] tracking-[-0.02px]">
                    {values.dateTime}
                  </span>
                  <img
                    src={showDate === false ? DropDown : DropDownUp}
                    alt="dropdown"
                  />
                </div>

                {showDate && (
                  <div className="absolute top-[43px] left-0 w-full bg-white border border-[#b1b4bb] rounded-[8px] overflow-hidden z-50">
                    {dateArray.map((date, index) => (
                      <div
                        className={`py-2 px-3 hover:bg-primary hover:text-white cursor-pointer ${
                          date === values.dateTime && "bg-primary text-white"
                        }`}
                        onClick={() => {
                          setFieldValue("dateTime", date);
                        }}
                        key={index}
                      >
                        {date}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/*View*/}
              <div
                className="bg-white relative h-[39px] w-[150.15px] rounded-[8px] px-3 py-[10px] border border-[#b1b4bb] cursor-pointer"
                onClick={() => {
                  handleDropDown("view");
                }}
              >
                <div className="flex items-center justify-between gap-2 w-full">
                  <span className="text-[16px] leading-[19.09px] tracking-[-0.02px]">
                    {values.view}
                  </span>
                  <img
                    src={showView === false ? DropDown : DropDownUp}
                    alt="dropdown"
                  />
                </div>

                {showView && (
                  <div className="absolute top-[43px] left-0 w-full bg-white border border-[#b1b4bb] rounded-[8px] overflow-hidden z-50">
                    {viewArray.map((viewValue, index) => (
                      <div
                        className={`py-2 px-3 hover:bg-primary hover:text-white cursor-pointer ${
                          viewValue === values.view && "bg-primary text-white"
                        }`}
                        onClick={() => {
                          setFieldValue("view", viewValue);
                        }}
                        key={index}
                      >
                        {viewValue}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="w-full flex items-center justify-between flex-row pt-4 pb-2">
        <Button text={"등록"} onclick={() => {}} type="button" />

        <div className="flex flex-row items-center gap-4">
          <span className="text-[#5a616a] text-[16px] leading-[19.2px] whitespace-nowrap">
            선택한 {selectedCheckboxCount}건
          </span>
          <div className="flex flex-row items-center gap-2">
            {/*Approval Status*/}
            <div
              className="bg-white relative h-[39px] w-[150.15px] rounded-[8px] px-3 py-[10px] border border-[#b1b4bb] cursor-pointer z-0"
              onClick={() => {
                handleDropDown("approvalStatus");
              }}
            >
              <div className="flex items-center justify-between gap-2 w-full">
                <span className="text-[16px] leading-[19.09px] tracking-[-0.02px]">
                  {values.approvalStatus}
                </span>
                <img
                  src={showApprovalStatus === false ? DropDown : DropDownUp}
                  alt="dropdown"
                />
              </div>

              {showApprovalStatus && (
                <div className="absolute top-[43px] left-0 w-full bg-white border border-[#b1b4bb] rounded-[8px] overflow-hidden">
                  {approvalStatusArray.map((approvalStatus, index) => (
                    <div
                      className={`py-2 px-3 hover:bg-primary hover:text-white cursor-pointer ${
                        approvalStatus === values.approvalStatus &&
                        "bg-primary text-white"
                      }`}
                      onClick={() => {
                        setFieldValue("approval", approvalStatus);
                      }}
                      key={index}
                    >
                      {approvalStatus}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Button
              text={"저장"}
              onclick={() => {}}
              type="button"
              px={"px-2 md:px-3"}
              py={"py-1 md:py-3"}
              width="w-[60px] md:w-[100px]"
            />
          </div>
        </div>
      </div>

      {/*Table*/}
      <div className="px-4 overflow-x-auto md:px-0">
        <div className="inline-block min-w-full align-middle">
          <table className="w-full">
            <thead className="w-full">
              <tr
                className={`w-full h-[60px] bg-[#eef0f4] divide-x divide-white whitespace-norap ${
                  activeNav !== "투자유형 관리" && "flex"
                }`}
              >
                <th className="w-full">
                  <CheckBoxInput
                    checked={selectAll}
                    onChange={handleHeaderCheckboxChange}
                  />
                </th>
                <th className="whitespace-nowrap w-full">NO</th>
                <th className="whitespace-nowrap w-full">기존유형</th>
                <th className="whitespace-nowrap w-full">신청유형</th>
                <th className="whitespace-nowrap w-full">제출서류</th>
                <th className="whitespace-nowrap w-full">신청일시</th>
                <th className="whitespace-nowrap w-full">승인여부</th>
                <th className="whitespace-nowrap w-full">승인거부 사유</th>
                <th className="whitespace-nowrap w-full">승인일시</th>
                <th className="whitespace-nowrap w-full">관리자</th>
              </tr>
            </thead>
            <tbody className="w-full min-w-full scrollbar-thin">
              {renderRows()}
            </tbody>
          </table>
        </div>
      </div>

      {/*Pagination*/}
      {}
      <div
        className={`w-full py-3 flex items-center justify-center gap-4 ${
          activeNav !== "투자유형 관리" && "hidden"
        }`}
      >
        <div className="flex items-center justify-center gap-3">
          <img
            src={DoubleArrowLeft}
            alt="double left arrow"
            className="h-5 w-5 cursor-pointer"
            onClick={() => handlePageChange(1)}
          />

          <img
            src={ArrowLeft}
            alt="left arrow"
            className="h-5 w-5 cursor-pointer"
            onClick={() => handlePageChange(currentPage - 1)}
          />
        </div>
        {renderPagination()}

        <div className="flex items-center justify-center gap-3 rotate-180">
          <img
            src={DoubleArrowLeft}
            alt="double right arrow"
            className="h-5 w-5 cursor-pointer"
            onClick={() => handlePageChange(totalPages)}
          />

          <img
            src={ArrowLeft}
            alt="right arrow"
            className="h-5 w-5 cursor-pointer"
            onClick={() => handlePageChange(currentPage + 1)}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
