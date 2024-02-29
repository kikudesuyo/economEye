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
    <div className="w-80 mx-auto flex flex-row mt-4 items-center">
      {dbData &&
        dbData.map((item: any, index: number) => (
          <div
            key={index}
            className="flex flex-col items-center p-3 border-4 m-2 gap-2"
            style={{ width: "200px", height: "200px" }}
          >
            <img src={item.imageId} alt="" />
            <p>{item.itemName}</p>
            <p>{item.price.value}円</p>
          </div>
        ))}
    </div>
  );
};

export default ItemList;
