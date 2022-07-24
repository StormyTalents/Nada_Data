import { Helmet } from 'react-helmet';
import LandingLayout from './LandingLayout';
import React from 'react';
import Typewriter from 'typewriter-effect';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const StyledDiv = styled.div`
  background-color: #fbf5f2;
  .landing-page-main {
    background-color: #fbf5f2;
  }

  .landing-page-main {
    padding-top: 6.6vmax;

    padding-right: 4vw;
    padding-left: 4vw;
    box-sizing: content-box;
  }

  .landing-big-text {
    font-size: calc((3.2 - 1) * 1.2vh + 1rem);
  }

  .landing-page-main-wrapper {
    margin-left: -17px;
    margin-right: -17px;
  }

  a:hover {
    text-decoration: underline;
  }
  .Typewriter {
    display: inline;
    margin-left: 8px;
    ${(props) => props.theme.breakpoints.down('sm')} {
      margin-left: 6px;
    }
  }

  .landing-page-main p,
  .landing-page-main div,
  .landing-page-main button,
  .landing-page-main span {
    font-family: 'Poppins';
  }

  .early-access-input,
  .early-access-button {
    padding: 1.4rem 2rem;
    line-height: 1.2rem;
    font-size: calc((1 - 1) * 1.2vh + 1rem);
    border: 3px solid black;
    transition: background 0.3s ease-out, border 0.3s ease-out;
    display: inline-block;
    width: auto;
    margin: 1rem 0 0 0;
  }

  .early-access-button-div {
    padding: 0.5rem 0.25rem 0.5rem 0;
    font-size: calc((1 - 1) * 1.2vh + 1rem);
  }

  .early-access-button {
    padding: 1.4rem 2rem;
    line-height: 1.2rem;
  }
  .landing-page-title {
    margin: 1rem 0;
    line-height: 1.8;
    font-size: calc((1.3 - 1) * 1.2vh + 1rem);
    white-space: pre-wrap;
  }
  .landing-page-main h2,
  .landing-big-text,
  .landing-big-text p,
  .landing-big-text span {
    line-height: 1.1856;
    font-size: calc((3.2 - 1) * 1.2vw + 1rem);
    ${(props) => props.theme.breakpoints.down('sm')} {
      font-size: calc((3.2 - 1) * 1.2vh + 1rem);
    }
    font-weight: 600;
    font-family: Poppins;
    font-style: normal;
    letter-spacing: 0em;
    text-transform: none;
  }

  .landing-typewriter-section {
    padding-top: 17px;
    padding-bottom: 17px;
    padding-left: 17px;
    padding-right: 17px;
  }

  .landing-haven-hero-img {
    left: -0.045045%;
    top: 0%;
    width: 100.09%;
    height: 100%;
    position: absolute;
  }

  .landing-hero-container {
    padding-bottom: 99.90998840332031%;
  }

  .landing-image-figure {
    max-width: 1111px;
  }

  .landing-image-block-wrapper:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0.1;
  }

  .landing-middle {
    padding-left: 17px;
    padding-right: 17px;
    position: relative;
    height: auto;
    padding-bottom: 17px;
    padding-top: 0;
    font-size: 1rem;
    line-height: 1.8;
  }
`;
const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <LandingLayout>
      <Helmet>
        <title>Haven | Procurement for Diversity</title>
      </Helmet>
      <div className='relative z-0 '>
        <StyledDiv>
          {/* content goes here */}

          <div className='landing-page-main min-h-screen my-0 mx-auto'>
            <div className='w-full max-w-full'>
              <div className='landing-page-main-wrapper w-auto flex md:flex-row flex-col xl:justify-between xl:items-start lg:justify-start lg:items-start'>
                <div className='md:w-1/2 w-full'>
                  <div className='w-full'>
                    <div className='mx-auto flex flex-col justify-start items-start w-full'>
                      <div className='text-left mx-auto flex-col justify-start items-start '>
                        <section className='landing-typewriter-section h-auto relative float-left text-left'>
                          <h2 className='landing-big-text text-gray-900 m-0'>
                            <span
                              className='block my-4 font-semibold'
                              style={{ marginBottom: 4 }}
                            >
                              Thousands of easy-to-find opportunities for
                              <Typewriter
                                options={{
                                  delay: 40,
                                  loop: true,
                                  cursor: '|',
                                }}
                                onInit={(typewriter) => {
                                  typewriter
                                    .typeString(
                                      "<span style='color: #0A6259'>women-owned</span>"
                                    )
                                    .pauseFor(4000)
                                    .deleteChars(11)
                                    .typeString(
                                      "<span style='color: #7D69FF;'>veteran-owned</span>"
                                    )
                                    .pauseFor(4000)
                                    .deleteChars(13)
                                    .typeString(
                                      "<span style='color: #3970FF;'>minority-owned</span>"
                                    )
                                    .pauseFor(4000)
                                    .deleteChars(14)
                                    .start();
                                }}
                              />
                            </span>
                          </h2>
                          <h2 className='block text-gray-900 font-semibold'>
                            small businesses — all in one place.
                          </h2>
                        </section>
                      </div>

                      {/* <div className="landing-middle">
                        <div className="mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl flex lg:flex-row flex-col justify-start lg:items-center items-start">
                          <div className="flex justify-center items-center">
                            <input
                              placeholder="Email Address"
                              type="email"
                              className="early-access-input"
                            />
                          </div>

                          <div className="early-access-button-div inline-block w-auto flex justify-center items-center md:ml-6 md:mb-0 mb-20">
                            <button className="early-access-button text-white bg-black rounded-0 border-3 border-black font-normal tracking-normal">
                              Get early access
                            </button>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className='w-1/12 float-left landing-middle-wrapper'>
                  <div className='landing-middle'>
                    <div style={{ height: 34 }}></div>
                  </div>
                </div>
                <div className='md:w-5/12 w-full md:my-0 my-6 '>
                  <div className='landing-middle '>
                    <div>
                      <figure className='landing-image-figure my-0 mx-auto block'>
                        <div className='relative overflow-hidden landing-image-block-wrapper'>
                          <div className='landing-hero-container overflow-hidden relative'>
                            <img
                              alt='landingpageImage'
                              src={`/assets/images/hero_haven_original.jpg`}
                              className='landing-haven-hero-img'
                            />
                          </div>
                        </div>
                      </figure>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </StyledDiv>
      </div>
    </LandingLayout>
  );
};

export default LandingPage;
