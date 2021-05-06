import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { loadDetail } from "../redux/actions/itemAction";
import Graph from "../components/Graph";
import styled from "styled-components";

const Item = () => {
  const location = useLocation();
  const pathASIN = location.pathname.split("/")[2];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadDetail(pathASIN));
  }, [dispatch]);

  const { isLoading, item } = useSelector((state) => state.item);

  return (
    <>
      {!isLoading && (
        <MainDiv>
          <ItemInfo>
            <h1>{item.data[0].parent_sku}</h1>
            <h2>{item.data[0].parent_asin}</h2>
          </ItemInfo>
          <GraphDiv>
            <Graph item={item.data} />
          </GraphDiv>
        </MainDiv>
      )}
    </>
  );
};

const MainDiv = styled.div`
  width: 100%;
  height: 100vh;
`;

const ItemInfo = styled.div`
  width: 100%;
  height: 10vh;
`;

const GraphDiv = styled.div`
  width: 100%;
  height: 80vh;
`;

export default Item;
