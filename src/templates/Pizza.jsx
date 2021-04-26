import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import styled from "styled-components";
import Seo from "../components/common/Seo";

const SinglePizzaPageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 500px;
    margin-right: 3rem;
    border-radius: 10px;
  }
  ul {
    margin-top: 3rem;
  }
`;

const SinglePizzaPage = ({
  data: {
    sanityPizza: { name, image, toppings },
  },
  location,
}) => {
  return (
    <>
      <Seo title={name} image={image?.asset?.url} location={location.href} />
      <SinglePizzaPageWrapper>
        <GatsbyImage image={getImage(image.asset)} alt={name} />
        <div>
          <h2 className="mark">{name}</h2>
          <ul>
            {toppings.map(({ id, name }) => (
              <li key={id}>{name}</li>
            ))}
          </ul>
        </div>
      </SinglePizzaPageWrapper>
    </>
  );
};

export default SinglePizzaPage;

export const query = graphql`
  query($slug: String!) {
    sanityPizza(slug: { current: { eq: $slug } }) {
      id
      name
      image {
        asset {
          gatsbyImageData(width: 800, placeholder: BLURRED)
          url
        }
      }
      toppings {
        id
        name
        vegetarian
      }
    }
  }
`;
