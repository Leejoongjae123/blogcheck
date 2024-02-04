import React from "react";
import { Button, Space, Table } from 'antd';


function Status() {
  return (
    <div className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-full">
      <ul
        className="text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg sm:flex dark:divide-gray-600 dark:text-gray-400 rtl:divide-x-reverse"
        id="fullWidthTab"
        data-tabs-toggle="#fullWidthTabContent"
        role="tablist"
      >
        <li className="w-full text-2xl">
          <button
            id="stats-tab"
            data-tabs-target="#stats"
            type="button"
            role="tab"
            aria-controls="stats"
            aria-selected="true"
            className="inline-block w-full p-4 rounded-ss-lg bg-gray-50 "
          >
            현황
          </button>
        </li>
      </ul>
      <div
        id="fullWidthTabContent"
        className="border-t border-gray-200 dark:border-gray-600"
      >
        <div
          className="flex-1  bg-white rounded-lg dark:bg-gray-800"
          id="stats"
          role="tabpanel"
          aria-labelledby="stats-tab"
        >
          <dl className="flex justify-around items-center p-4 text-gray-900 ">
            <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 text-3xl font-extrabold"><p>02.04</p><p>14:00</p></dt>
              <dd className="text-gray-500 dark:text-gray-400">
                최근 확인 시기
              </dd>
            </div>

            <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 text-3xl font-extrabold">3,132</dt>
              <dd className="text-gray-500 dark:text-gray-400">계정수</dd>
            </div>
            <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 text-3xl font-extrabold">43%</dt>
              <dd className="text-gray-500 dark:text-gray-400">만족비율</dd>
            </div>
          </dl>
        </div>
        <div
          className="hidden p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800"
          id="about"
          role="tabpanel"
          aria-labelledby="about-tab"
        >
        </div>
      </div>
    </div>
  );
}

export default Status;
