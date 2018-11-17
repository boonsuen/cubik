import React from 'react';
import styled from 'styled-components';
import { LinkWithIcon } from './index';

import Home from '../../assets/img/icons/home.svg';
import Boxes from '../../assets/img/icons/boxes.svg';
import Trash from '../../assets/img/icons/trash.svg';

const StyledMainRoutes = styled.div`
  padding: 9px 0;
  border-bottom: 1px solid #e6e9ec;
  margin-bottom: 16px;
`;

const MainRoutes = () => (
  <StyledMainRoutes>
    <LinkWithIcon to="/app" prefetch={true}>
      <img src={Home} alt="All Links" />
      <span>All links</span>
    </LinkWithIcon>
    <LinkWithIcon to="/app/unsorted" prefetch={true}>
      <img src={Boxes} alt="Unsorted" />
      <span>Unsorted</span>
    </LinkWithIcon>
    <LinkWithIcon to="/app/trash" prefetch={true}>
      <img src={Trash} alt="Trash" />
      <span>Trash</span>
    </LinkWithIcon>
  </StyledMainRoutes>
);

export default MainRoutes;