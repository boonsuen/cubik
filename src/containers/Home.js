import React from 'react';
import { withSiteData, Link } from 'react-static';
import styled from 'styled-components';

import box from '../img/box.svg';

const HeroWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Hero = styled.div`
  margin-top: 105px;
  color: #102d3e;
`;

const HeroTitle = styled.h1`
  margin: 0 0 6px 0;
`;

const HeroSubtitle = styled.h2`
  font-weight: 400;
  font-size: 25px;
  margin: 10px 0 35px 0;
`;

const HeroButton = styled(Link)`
  text-align: center;
  background-color: #939aff;
  width: 140px;
  height: 55px;
  display: inline-block;
  border-radius: 5px;
  font-weight: 600;
  color: #fff;
  font-size: 16px;
  box-sizing: border-box;
  padding-top: 19px;
`;

const HeroImg = styled.img`
  margin: 82px 100px 0 50px;
  max-width: 175px;
  width: 20%;
  align-self: center;
`;

const PricingWrapper = styled.div`
  margin-top: 150px;
  margin-bottom: 150px;
  position: relative;

  &::before {
    top: -70px;
    left: -70px;
    right: -70px;
    bottom: -70px;
    position: absolute;
    content: '';
    width: 856px;
    background: #ddfaff;
    z-index: -1;
  }
`;

const PricingTitle = styled.h1`
  color: #0b0093;
  border-bottom: #c9c2ff 5px solid;
  display: inline;
  padding-bottom: 8px;
`;

const PricingSubtitle = styled.h2`
  color: #1c1c1c;
  font-size: 25px;
  margin: 35px 0 10px 0;
  font-weight: 600;
`;

const PricingDescription = styled.p`
  color: #3b3b3b;
  font-size: 20px;
  margin: 0;
  line-height: 1.3;
`;

const PricingButton = styled.div`
  margin-top: 28px;
  color: #fff;
  border-radius: 5px;
  height: 55px;
  display: inline-block;
  box-sizing: border-box;
  padding: 20px 20px 0 20px;
  background: #3d96ff;
  font-weight: 600;
`;

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <HeroWrapper>
          <Hero>
            <HeroTitle>Curate & save links</HeroTitle>
            <HeroSubtitle>Stay organized, always be resourceful.</HeroSubtitle>
            <HeroButton to="/signup">Get Started</HeroButton>
          </Hero>
          <HeroImg src={box} />
        </HeroWrapper>
        <PricingWrapper>
          <PricingTitle>Pricing</PricingTitle>
          <PricingSubtitle>Free of charge at this stage.</PricingSubtitle>
          <PricingDescription>
            If you do find Cubik is to be useful, feel free to contribute a small amount of<br />
            money to keep it running. The money will be used to cover the costs of<br />
            hosting and data storage.
          </PricingDescription>
          <a href="/pay">
            <PricingButton>Buy me a coffee</PricingButton>
          </a>
        </PricingWrapper>
      </React.Fragment>
    );
  }
}

export default withSiteData(Home);
