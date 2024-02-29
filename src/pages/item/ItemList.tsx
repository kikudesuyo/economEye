import React, { useEffect, useState } from "react";
import fetchData from "@/pages/item/helper/dbFetcher";

const ItemList: React.FC = () => {
  const [dbData, setDbData] = useState<any>(null);
  useEffect(() => {
    const fetchAsyncData = async () => {
      try {
        const data = await fetchData();
        setDbData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAsyncData();
  }, []);
  return (
    <div className="">
      <div className="w-9/12 mx-auto flex flex-wrap mt-4justify-start">
        {dbData &&
          dbData.map((item: any, index: number) => (
            <div
              key={index}
              className="flex flex-col flex-shrink-0 items-center p-3 border-2 border-slate-300 m-2 gap-2 "
              style={{ width: "80px", height: "200px" }}
            >
              <img src={item.imageId} alt="" />
              <p>{item.itemName}</p>
              <p>{item.price["2024/02/29"]}円</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ItemList;
