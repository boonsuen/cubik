import React from 'react';
import styled from 'styled-components';

const StyledListCard = styled.div`
  width: 300px;
  height: 180px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 2px 2px 5px rgba(231, 235, 239, 80%);
  margin-bottom: 30px;
  padding: 20px 18px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: relative;

  h3 {
    color: #022773;
    font-weight: 600;
    font-size: 24px;
    margin: 20px 0;
  }

  span:last-child {
    margin-top: auto;
  }
`;

const Underlying = styled.div`
  width: 300px;
  height: 180px;
  border-radius: 10px;
  top: 4px;
  right: -6px;
  background: #c2c4ff;
  z-index: -1;
  position: absolute;
`;

const ListCard = ({ title }) => (
  <StyledListCard>
    <span>30 links, 5 groups</span>
    <h3>{title}</h3>
    <span>Last updated on 29th Sep 18</span>
    <Underlying />
  </StyledListCard>
);

export default ListCard;