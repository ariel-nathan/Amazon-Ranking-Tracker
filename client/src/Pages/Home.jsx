import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { getItems } from "../redux/actions/itemsAction";
import { Table } from "react-bootstrap";
import styled from "styled-components";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  const { latestItems, allItems } = useSelector((state) => state.items);

  return (
    <MainDiv>
      <TableDiv>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>SKU</th>
              <th>ASIN</th>
              <th>RANK 1</th>
              <th>RANK 2</th>
              <th>RANK 3</th>
              <th>View</th>
              <th>Updated</th>
            </tr>
          </thead>
          {latestItems.map((item) => (
            <tbody>
              <tr>
                <td>{item.parent_sku}</td>
                <td>
                  {item.parent_asin ? (
                    item.parent_asin
                  ) : (
                    <span className="NA">N/A</span>
                  )}
                </td>
                <td>
                  {item.rank[0] ? (
                    `${item.rank[0].rank} in ${item.rank[0].category}`
                  ) : (
                    <span className="NA">N/A</span>
                  )}
                </td>
                <td>
                  {item.rank[1] ? (
                    `${item.rank[1].rank} in ${item.rank[1].category}`
                  ) : (
                    <span className="NA">N/A</span>
                  )}
                </td>
                <td>
                  {item.rank[2] ? (
                    `${item.rank[2].rank} in ${item.rank[2].category}` ===
                    "null in null" ? (
                      <span className="NA">N/A</span>
                    ) : (
                      `${item.rank[2].rank} in ${item.rank[2].category}`
                    )
                  ) : (
                    <span className="NA">N/A</span>
                  )}
                </td>
                <td>
                  <Link to={`/item/${item.parent_asin}`}>View History</Link>
                </td>
                <td>{moment(item.timestamp, "m").fromNow()}</td>
              </tr>
            </tbody>
          ))}
        </Table>
      </TableDiv>
    </MainDiv>
  );
};

const MainDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  h6 {
    align-text: right;
  }
  .NA {
    color: gray;
  }
  overflow-y: auto;
`;

const TableDiv = styled.div`
  width: 98%;
`;

export default Home;
