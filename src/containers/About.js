import React from 'react';
import { Head } from 'react-static';
import styled from 'styled-components';

import { AboutBoxTitle, AboutBoxParagraph } from './public.css';
import avatar from '../img/avatar.png';
import ethereum from '../img/ethereum.png';

const Header = styled.div`
  
  p {
    color: #102d3e;
    font-size: 25px;
  }
`;

const FirstRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Bio = styled.div`
  width: 340px;
  height: 170px;
  background: #fffafa;
  border: 1px solid #ffd1d1;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
  box-sizing: border-box;
`;

const BioText = styled.div`
  width: 172px;
  margin-left: auto;

  h3 {
    color: #102d3e;
    margin: 0;
    font-size: 25px;
    font-weight: 400;
  }

  p {
    margin: 4px 0 0 0;
    color: #2b2b77;
  }
`;

const BioImg = styled.img`
  width: 85px;
  height: 85px;
  border-radius: 50%;
`;

const WhyBox = styled.div`
  box-sizing: border-box;
  width: 670px;
  height: 406px;
  box-shadow: 1px 1px 8px rgba(171, 133, 255, .5);
  padding: 42px;
  display: flex;
  font-weight: 500;
  flex-direction: column;
  justify-content: center;
`;

const SecondRow = styled.div`
  display: flex;
  align-items: center;
`;

const HowBox = styled.div`
  margin: 30px 0 30px 0;
  width: 548px;
  height: 250px;
  box-shadow: 1px 1px 8px rgba(171, 133, 255, .5);
  padding: 42px;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  justify-content: center;

  a {
    width: 198px;
    height: 55px;
    background: #939aff;
    text-align: center;
    display: inline-block;
    border-radius: 5px;
    font-weight: 600;
    color: #fff;
    font-size: 16px;
    box-sizing: border-box;
    padding-top: 19px;
  }
`;

const About = () => (
  <React.Fragment>
    <Head>
      <title>About Cubik</title>
    </Head>
    <Header>    
      <h1>About</h1>
      <p>Hey there, this is Boonsuen, I build and design Cubik.</p>
    </Header>  
    <FirstRow>
      <Bio>
        <BioImg src={avatar} />
        <BioText>
          <h3>Boonsuen Oh</h3>
          <p>Not sure how much caffeine I've consumed.</p>
        </BioText>
      </Bio>
      <WhyBox>
        <AboutBoxTitle>Why I built it.</AboutBoxTitle>
        <AboutBoxParagraph>
          I always wanted to build 'something', since the very early day I
          started learning to code and craft websites. By then, I had several 
          ideas in mind but I didn't really execute on them or simply postspone 
          them, mainly due to lack of required knowledge and skills.
        </AboutBoxParagraph>
        <AboutBoxParagraph>
          Cubik is a right mix of both, in my opinion. It's neither too complex,
          nor too simple. It's out of the reach of my domain of expertise. 
        </AboutBoxParagraph>
        <AboutBoxParagraph>
          Also, Cubik served well as a project that let me practice my coding 
          skill. Side projects are always the best way to let us developers
          learn new stuff while actually building something useful.
        </AboutBoxParagraph>
      </WhyBox>
    </FirstRow>
    <SecondRow>
      <HowBox>
        <AboutBoxTitle>How I built it.</AboutBoxTitle>
        <AboutBoxParagraph>
          I wrote an blog post about some interesting technical 
          challenges and process I've gone through when 
          developing the webapp. 
        </AboutBoxParagraph>
        <a href="#">Read it on Medium</a>
      </HowBox>
      <img src={ethereum} style={{width: 300}} alt="ethereum" />
    </SecondRow>
  </React.Fragment>
);

export default About;