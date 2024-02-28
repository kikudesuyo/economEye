import React, { useEffect, useState } from "react";
import Button from "@/utils/components/Button";
import fetchData from "@/pages/item/helper/dbFetcher";
import itemPrice from "@/pages/item/helper/index";

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
    <div className="w-80 mx-auto flex flex-col pt-4 items-center">
      {dbData &&
        dbData.map((item: any, index: number) => (
          <div key={index} className="flex p-3 border-2 mb-4">
            <p>{item.itemName}</p>
            <p>{item.price.value}</p>
          </div>
        ))}
      <Button label="商品の追加" func={() => itemPrice("4902102072618")} />
    </div>
  );
};

export default ItemList;
