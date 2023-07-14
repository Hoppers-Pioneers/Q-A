import { useEffect, useState, useRef } from "react";
import ItemScroller from "./ItemScroller";
import { Stack } from "@mui/material";
import Request from "./Request";
export default function Related({ current, setCurrent }) {
  // const items = useRef([]);
  const [ items, setItems ] = useState([]);
  const [ related, setRelated] = useState([]);
  const [ itemsRefresh, setItemsRefresh ] = useState(0);

  useEffect(() => {
    if (current !== undefined) {
      if (current.id !== undefined) {
        Request.getRelated( current.id ).then((res) => {
          setRelated(res.data);
        });
      }
    }
  }, [current])

  useEffect(() => {
    const promises = [];
    for (let i = 0; i < related.length; i++) {
      promises.push(Request.getById(related[i]))
      // .then((res) => {
      //   items.current.push(res.data);
      //   setItemsCount(Math.random());
      // })
    }
    Promise.all(promises).then((res) => {
      const data = res.map((data) => {
        return data.data;
      })
      setItems(data);
    })
  }, [related]);

  return (
    <div>
      <Stack sx={{ height: '100%' }}
        justifyContent="center"
        alignItems="center">
        <ItemScroller setCurrent={setCurrent} current={current} type={1} title={'RELATED PRODUCTS'} items={items}/>
        <br/>
        <ItemScroller setCurrent={setCurrent} current={current} type={2} title={'YOUR OUTFIT'} items={items}/>
      </Stack>
    </div>
  );
}